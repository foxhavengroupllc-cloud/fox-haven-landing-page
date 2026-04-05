import type { PitchBrief, CompanyInput } from './types';

export type PlaceholderMap = Record<string, string>;

export function buildPlaceholderMap(
  brief: PitchBrief,
  input: CompanyInput,
): PlaceholderMap {
  const map: PlaceholderMap = {
    '{{company_name}}': input.companyName,
    '{{industry}}': input.industry,
    '{{positioning_headline}}': brief.positioningHeadline,
    '{{company_summary}}': brief.companySummary,
    '{{quick_win}}': brief.recommendedQuickWin,
    '{{impact_low}}': brief.impactEstimate.low,
    '{{impact_high}}': brief.impactEstimate.high,
    '{{impact_label}}': brief.impactEstimate.label,
    '{{month_1}}': brief.ninetyDayPlan.month1,
    '{{month_2}}': brief.ninetyDayPlan.month2,
    '{{month_3}}': brief.ninetyDayPlan.month3,
  };

  // Contact info
  if (input.contactName) map['{{contact_name}}'] = input.contactName;
  if (input.contactTitle) map['{{contact_title}}'] = input.contactTitle;

  // Pains (indexed)
  brief.likelyPains.forEach((pain, i) => {
    map[`{{pain_${i + 1}}}`] = pain;
  });

  // Inefficiencies (indexed)
  brief.inefficiencies.forEach((ineff, i) => {
    map[`{{inefficiency_area_${i + 1}}}`] = ineff.area;
    map[`{{inefficiency_issue_${i + 1}}}`] = ineff.issue;
    map[`{{inefficiency_impact_${i + 1}}}`] = ineff.impact;
  });

  // Opportunities (indexed)
  brief.opportunities.forEach((opp, i) => {
    map[`{{opportunity_${i + 1}}}`] = opp;
  });

  // Engagement options (indexed)
  brief.engagementOptions.forEach((eng, i) => {
    map[`{{engagement_${i + 1}_name}}`] = eng.name;
    map[`{{engagement_${i + 1}_desc}}`] = eng.description;
  });

  // Risk and governance (indexed)
  brief.riskAndGovernance.forEach((risk, i) => {
    map[`{{risk_${i + 1}}}`] = risk;
  });

  // Evidence notes (indexed)
  brief.evidenceNotes.forEach((note, i) => {
    map[`{{evidence_${i + 1}}}`] = note;
  });

  // Fill any missing optional placeholders with empty strings
  for (let i = brief.likelyPains.length + 1; i <= 3; i++) {
    map[`{{pain_${i}}}`] ??= '';
  }
  for (let i = brief.inefficiencies.length + 1; i <= 3; i++) {
    map[`{{inefficiency_area_${i}}}`] ??= '';
    map[`{{inefficiency_issue_${i}}}`] ??= '';
    map[`{{inefficiency_impact_${i}}}`] ??= '';
  }
  for (let i = brief.opportunities.length + 1; i <= 3; i++) {
    map[`{{opportunity_${i}}}`] ??= '';
  }
  for (let i = brief.engagementOptions.length + 1; i <= 3; i++) {
    map[`{{engagement_${i}_name}}`] ??= '';
    map[`{{engagement_${i}_desc}}`] ??= '';
  }
  for (let i = brief.riskAndGovernance.length + 1; i <= 3; i++) {
    map[`{{risk_${i}}}`] ??= '';
  }
  for (let i = brief.evidenceNotes.length + 1; i <= 4; i++) {
    map[`{{evidence_${i}}}`] ??= '';
  }

  map['{{contact_name}}'] ??= '';
  map['{{contact_title}}'] ??= '';

  return map;
}
