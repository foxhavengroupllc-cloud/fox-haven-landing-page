/**
 * Session reporter, aggregates raw interaction events into structured summaries.
 *
 * All exported functions are pure: they accept event arrays and return report
 * objects. They never modify the store or emit events.
 *
 * Usage in browser DevTools (development):
 *   import { generateSessionReport } from '.../analytics/reporter';
 *   const report = generateSessionReport(window.__foxhavenAnalytics.getEvents());
 *   console.table(report.experiences[0].phaseStats);
 *
 * Usage in automated reporting:
 *   Forward events to your analytics backend and run generateSessionReport()
 *   server-side over the aggregated dataset.
 */

import type { StoredEvent } from './store';
import type { PhaseEventPayload } from './interactionEvents';

// ─── Report Types ─────────────────────────────────────────────────────────────

export interface PhaseStats {
  phase: number;
  phaseLabel: string;
  /** Number of times this phase was entered (viewed). */
  viewCount: number;
  /** Total milliseconds spent on this phase across all views. */
  totalDwellMs: number;
  /** Average dwell time per view in milliseconds. */
  avgDwellMs: number;
  /** Times a user advanced FROM this phase. */
  advanceCount: number;
  /** Times a user retreated FROM this phase. */
  retreatCount: number;
  /** Times a user exited the experience while on this phase. */
  exitCount: number;
  /** exitCount / viewCount, probability of exiting from this phase. */
  exitRate: number;
  /** advanceCount / viewCount, probability of advancing from this phase (non-final phases). */
  completionRate: number;
}

export interface ExperienceReport {
  sceneId: string;
  /** Estimated number of distinct user sessions. */
  sessionCount: number;
  /** Times experience:complete was emitted. */
  completionCount: number;
  /** completionCount / sessionCount. */
  completionRate: number;
  /** Average number of phases viewed before exit. */
  avgSessionPhases: number;
  phaseStats: PhaseStats[];
  generatedAt: string;
}

export interface SessionReport {
  experiences: ExperienceReport[];
  totalEvents: number;
  generatedAt: string;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function generateSessionReport(events: readonly StoredEvent[]): SessionReport {
  const byScene = new Map<string, StoredEvent[]>();

  for (const ev of events) {
    const sid = ev.payload.sceneId;
    if (!byScene.has(sid)) byScene.set(sid, []);
    byScene.get(sid)!.push(ev);
  }

  const experiences: ExperienceReport[] = [];
  for (const [sceneId, sceneEvents] of byScene) {
    experiences.push(buildExperienceReport(sceneId, sceneEvents));
  }

  return {
    experiences,
    totalEvents: events.length,
    generatedAt: new Date().toISOString(),
  };
}

// ─── Internal aggregation ─────────────────────────────────────────────────────

interface MutablePhaseStats {
  label: string;
  views: number;
  dwells: number[];
  advances: number;
  retreats: number;
  exits: number;
}

function buildExperienceReport(sceneId: string, events: StoredEvent[]): ExperienceReport {
  const phaseMap = new Map<number, MutablePhaseStats>();
  let completionCount = 0;

  const ensurePhase = (p: number, label: string): MutablePhaseStats => {
    if (!phaseMap.has(p)) {
      phaseMap.set(p, { label, views: 0, dwells: [], advances: 0, retreats: 0, exits: 0 });
    }
    return phaseMap.get(p)!;
  };

  for (const ev of events) {
    const p = ev.payload as PhaseEventPayload;

    switch (ev.event) {
      case 'phase:viewed':
        ensurePhase(p.phase, p.phaseLabel).views++;
        break;

      case 'phase:advanced':
      case 'phase:jumped': {
        // Dwell and advance recorded on the FROM phase
        if (typeof p.fromPhase === 'number') {
          const from = ensurePhase(p.fromPhase, `Phase ${p.fromPhase}`);
          from.advances++;
          if (p.dwellMs > 0) from.dwells.push(p.dwellMs);
        }
        break;
      }

      case 'phase:retreated': {
        if (typeof p.fromPhase === 'number') {
          const from = ensurePhase(p.fromPhase, `Phase ${p.fromPhase}`);
          from.retreats++;
          if (p.dwellMs > 0) from.dwells.push(p.dwellMs);
        }
        break;
      }

      case 'phase:exit': {
        const ph = ensurePhase(p.phase, p.phaseLabel);
        ph.exits++;
        if (p.dwellMs > 0) ph.dwells.push(p.dwellMs);
        break;
      }

      case 'experience:complete':
        completionCount++;
        break;
    }
  }

  // Build sorted phase stats array
  const phaseStats: PhaseStats[] = Array.from(phaseMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([phase, s]) => {
      const totalDwellMs = s.dwells.reduce((sum, d) => sum + d, 0);
      const avgDwellMs = s.dwells.length > 0 ? totalDwellMs / s.dwells.length : 0;
      return {
        phase,
        phaseLabel: s.label,
        viewCount: s.views,
        totalDwellMs,
        avgDwellMs,
        advanceCount: s.advances,
        retreatCount: s.retreats,
        exitCount: s.exits,
        exitRate: s.views > 0 ? s.exits / s.views : 0,
        completionRate: s.views > 0 ? s.advances / s.views : 0,
      };
    });

  const totalExits = phaseStats.reduce((sum, p) => sum + p.exitCount, 0);
  const sessionCount = Math.max(totalExits, completionCount, 1);
  const totalViews = phaseStats.reduce((sum, p) => sum + p.viewCount, 0);
  const avgSessionPhases = totalViews / sessionCount;

  return {
    sceneId,
    sessionCount,
    completionCount,
    completionRate: completionCount / sessionCount,
    avgSessionPhases,
    phaseStats,
    generatedAt: new Date().toISOString(),
  };
}
