import { getVisibleQuestions, type SectionKey } from './questions';

export const SECTION_WEIGHTS: Record<SectionKey, number> = {
  leadership: 1.2, sales: 1.5, operations: 1.4, admin: 1.1,
  communication: 1.3, ai_usage: 1.0, readiness: 1.0,
};

export type ScoreTier = 'critical' | 'needs-work' | 'moderate' | 'strong';

export interface SectionScore {
  section: SectionKey;
  raw: number;
  normalized: number;
  maxPossible: number;
}

export interface AuditScore {
  total: number;
  tier: ScoreTier;
  sections: SectionScore[];
  inefficiencyLow: number;
  inefficiencyHigh: number;
}

export function getTier(score: number): ScoreTier {
  if (score < 35) return 'critical';
  if (score < 55) return 'needs-work';
  if (score < 75) return 'moderate';
  return 'strong';
}

export function scoreAudit(answers: Record<string, string>): AuditScore {
  const visible = getVisibleQuestions(answers);
  const sectionScores = new Map<SectionKey, { raw: number; maxPossible: number }>();

  for (const q of visible) {
    const entry = sectionScores.get(q.section) ?? { raw: 0, maxPossible: 0 };
    const maxImpact = Math.max(...q.options.map((o) => o.scoreImpact));
    const minImpact = Math.min(...q.options.map((o) => o.scoreImpact));
    const chosenOption = q.options.find((o) => o.value === answers[q.id]);
    const chosenImpact = chosenOption?.scoreImpact ?? 0;
    const range = maxImpact - minImpact;
    const normalized = range > 0 ? (chosenImpact - minImpact) / range : 0.5;
    entry.raw += normalized * q.weight;
    entry.maxPossible += q.weight;
    sectionScores.set(q.section, entry);
  }

  const sections: SectionScore[] = [];
  let weightedSum = 0;
  let totalSectionWeight = 0;

  for (const [section, data] of sectionScores) {
    const sectionNormalized = data.maxPossible > 0 ? (data.raw / data.maxPossible) * 100 : 50;
    const sectionWeight = SECTION_WEIGHTS[section];
    sections.push({ section, raw: data.raw, normalized: Math.round(sectionNormalized), maxPossible: data.maxPossible });
    weightedSum += sectionNormalized * sectionWeight;
    totalSectionWeight += sectionWeight;
  }

  const total = totalSectionWeight > 0 ? Math.round(weightedSum / totalSectionWeight) : 50;
  const { low, high } = calculateInefficiency(answers);

  return { total, tier: getTier(total), sections, inefficiencyLow: low, inefficiencyHigh: high };
}

function calculateInefficiency(answers: Record<string, string>): { low: number; high: number } {
  let low = 8000, high = 18000;
  if (answers['admin_02'] === '10_plus') { low += 12000; high += 24000; }
  else if (answers['admin_02'] === '5_10') { low += 6000; high += 12000; }
  if (answers['sales_03'] === 'all_manual') { low += 15000; high += 30000; }
  else if (answers['sales_03'] === 'mostly_manual') { low += 8000; high += 18000; }
  if (answers['ops_03'] === 'constantly') { low += 10000; high += 20000; }
  else if (answers['ops_03'] === 'often') { low += 5000; high += 10000; }
  return { low, high };
}
