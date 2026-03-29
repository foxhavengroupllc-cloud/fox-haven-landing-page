/**
 * Rule-based recommendation generator.
 *
 * Each rule has:
 *   - A stable ID (e.g., RULE-EXIT-RATE-CRITICAL-P2) for auditability
 *   - A threshold that triggers it
 *   - Evidence extracted from the aggregated report
 *   - A recommended action (always for human review — never auto-applied)
 *   - A priority level
 *
 * CONSTRAINTS:
 *   - Rules NEVER modify files, components, or configuration
 *   - All recommendations carry requiresHumanReview: true — this is not a flag,
 *     it is a type-enforced invariant
 *   - Rules are conservative: they flag anomalies, not prescribe solutions
 */

import type { ExperienceReport, PhaseStats } from './reporter';

// ─── Types ────────────────────────────────────────────────────────────────────

export type RecommendationPriority = 'critical' | 'high' | 'medium' | 'low';

export interface Recommendation {
  /** Stable rule identifier. Survives across report runs. */
  id: string;
  /** Human-readable description of the rule that triggered this. */
  ruleDescription: string;
  sceneId: string;
  /** Concrete numbers and observations that triggered the rule. */
  evidence: string;
  /** What a human should consider doing. NOT automatically applied. */
  recommendedAction: string;
  priority: RecommendationPriority;
  /** Type-enforced: always true. No auto-apply path exists. */
  requiresHumanReview: true;
}

// ─── Thresholds ───────────────────────────────────────────────────────────────

const THRESHOLDS = {
  /** Exit rate above this on a non-final phase → 'medium' flag. */
  highExitRate: 0.50,
  /** Exit rate above this on a non-final phase → 'critical' flag. */
  criticalExitRate: 0.70,
  /** Average dwell below this (ms) suggests content is being skipped. */
  lowDwellMs: 3_000,
  /** Average dwell above this (ms) may indicate navigation confusion. */
  highDwellMs: 120_000,
  /** Overall completion rate below this → flag. */
  lowCompletionRate: 0.30,
  /** Retreat rate above this on a phase → narrative continuity issue. */
  highRetreatRate: 0.25,
  /** Minimum sessions before recommendations are considered reliable. */
  minSessions: 10,
} as const;

// ─── Public API ───────────────────────────────────────────────────────────────

export function generateRecommendations(report: ExperienceReport): Recommendation[] {
  // Guard: insufficient data
  if (report.sessionCount < THRESHOLDS.minSessions) {
    return [
      {
        id: 'RULE-INSUFFICIENT-DATA',
        ruleDescription: 'Not enough sessions for reliable recommendations',
        sceneId: report.sceneId,
        evidence: `Only ${report.sessionCount} session(s) recorded. Minimum required: ${THRESHOLDS.minSessions}.`,
        recommendedAction:
          'Continue collecting data. Do not act on analytics until the minimum session threshold is met.',
        priority: 'low',
        requiresHumanReview: true,
      },
    ];
  }

  const recs: Recommendation[] = [];

  // Rule: overall completion
  if (report.completionRate < THRESHOLDS.lowCompletionRate) {
    recs.push({
      id: 'RULE-LOW-COMPLETION',
      ruleDescription: `Overall completion rate below ${THRESHOLDS.lowCompletionRate * 100}%`,
      sceneId: report.sceneId,
      evidence: `${pct(report.completionRate)} of sessions reached the final phase. Average session covered ${report.avgSessionPhases.toFixed(1)} of ${report.phaseStats.length} phases.`,
      recommendedAction:
        'Review the overall arc. Check whether Phase 0 sets clear expectations. Verify that the first phase transition feels rewarding enough to continue.',
      priority: report.completionRate < 0.15 ? 'critical' : 'high',
      requiresHumanReview: true,
    });
  }

  // Per-phase rules (all non-final phases)
  const nonFinalPhases = report.phaseStats.slice(0, -1);
  for (const phase of nonFinalPhases) {
    checkExitRate(phase, report.sceneId, recs);
    checkDwellTime(phase, report.sceneId, recs);
    checkRetreatRate(phase, report.sceneId, recs);
  }

  return recs;
}

// ─── Per-rule checks ──────────────────────────────────────────────────────────

function checkExitRate(
  phase: PhaseStats,
  sceneId: string,
  recs: Recommendation[]
): void {
  if (phase.exitRate > THRESHOLDS.criticalExitRate) {
    recs.push({
      id: `RULE-EXIT-RATE-CRITICAL-P${phase.phase}`,
      ruleDescription: `Exit rate on Phase ${phase.phase} (${phase.phaseLabel}) exceeds ${THRESHOLDS.criticalExitRate * 100}%`,
      sceneId,
      evidence: `${pct(phase.exitRate)} of users who viewed "${phase.phaseLabel}" exited without advancing. Avg dwell: ${secs(phase.avgDwellMs)}.`,
      recommendedAction: `Investigate Phase ${phase.phase} urgently. Check: (1) Is the visual transition from the previous phase clear? (2) Is content too dense or abstract? (3) Is the navigation affordance visible?`,
      priority: 'critical',
      requiresHumanReview: true,
    });
  } else if (phase.exitRate > THRESHOLDS.highExitRate) {
    recs.push({
      id: `RULE-EXIT-RATE-HIGH-P${phase.phase}`,
      ruleDescription: `Exit rate on Phase ${phase.phase} (${phase.phaseLabel}) exceeds ${THRESHOLDS.highExitRate * 100}%`,
      sceneId,
      evidence: `${pct(phase.exitRate)} of users who viewed "${phase.phaseLabel}" exited without advancing.`,
      recommendedAction: `Monitor Phase ${phase.phase}. If the rate persists above 50% after more sessions, revise content or transition.`,
      priority: 'medium',
      requiresHumanReview: true,
    });
  }
}

function checkDwellTime(
  phase: PhaseStats,
  sceneId: string,
  recs: Recommendation[]
): void {
  if (phase.viewCount < 3) return; // Insufficient data for dwell analysis

  if (phase.avgDwellMs > 0 && phase.avgDwellMs < THRESHOLDS.lowDwellMs) {
    recs.push({
      id: `RULE-LOW-DWELL-P${phase.phase}`,
      ruleDescription: `Average dwell on Phase ${phase.phase} (${phase.phaseLabel}) below ${THRESHOLDS.lowDwellMs / 1000}s`,
      sceneId,
      evidence: `Users spend an average of ${secs(phase.avgDwellMs)} on "${phase.phaseLabel}" across ${phase.viewCount} views. Content may not be read.`,
      recommendedAction: `Review content density for Phase ${phase.phase}. Consider merging it with an adjacent phase or increasing content volume.`,
      priority: 'medium',
      requiresHumanReview: true,
    });
  }

  if (phase.avgDwellMs > THRESHOLDS.highDwellMs) {
    recs.push({
      id: `RULE-HIGH-DWELL-P${phase.phase}`,
      ruleDescription: `Average dwell on Phase ${phase.phase} (${phase.phaseLabel}) exceeds ${THRESHOLDS.highDwellMs / 60_000}min`,
      sceneId,
      evidence: `Users spend an average of ${mins(phase.avgDwellMs)} on "${phase.phaseLabel}". This may indicate confusion about how to advance.`,
      recommendedAction: `Review navigation affordance visibility on Phase ${phase.phase}. Consider adding a subtle NEXT button pulse animation after 30s idle.`,
      priority: 'medium',
      requiresHumanReview: true,
    });
  }
}

function checkRetreatRate(
  phase: PhaseStats,
  sceneId: string,
  recs: Recommendation[]
): void {
  const retreatRate = phase.viewCount > 0 ? phase.retreatCount / phase.viewCount : 0;
  if (retreatRate > THRESHOLDS.highRetreatRate) {
    recs.push({
      id: `RULE-HIGH-RETREAT-P${phase.phase}`,
      ruleDescription: `High retreat rate on Phase ${phase.phase} (${phase.phaseLabel})`,
      sceneId,
      evidence: `${pct(retreatRate)} of users retreated back from "${phase.phaseLabel}". May indicate narrative discontinuity from the previous phase.`,
      recommendedAction: `Review the transition between Phase ${phase.phase - 1} and Phase ${phase.phase}. Strengthen copy or visual cue to establish continuity.`,
      priority: 'medium',
      requiresHumanReview: true,
    });
  }
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

function pct(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}

function secs(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`;
}

function mins(ms: number): string {
  return `${(ms / 60_000).toFixed(1)} min`;
}
