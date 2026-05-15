/**
 * Interaction event types for the narrative sequencer.
 *
 * Separation rationale: engine events (scene:loaded, tier:assigned, etc.) are emitted
 * by infrastructure and live in utils/analytics.ts. Interaction events are emitted by
 * the usePhaseTracking hook and live here. The two sets can be forwarded to the same
 * real analytics provider without conflict.
 */

// ─── Event Names ──────────────────────────────────────────────────────────────

export type InteractionEvent =
  | 'phase:viewed'        // User entered a phase (first frame after transition completes)
  | 'phase:advanced'      // User moved forward (phase N → N+1)
  | 'phase:retreated'     // User moved backward (phase N → N-1)
  | 'phase:jumped'        // User jumped to a non-adjacent phase (dot navigation)
  | 'phase:exit'          // User left the experience from this phase
  | 'cta:click'           // User clicked a call-to-action button
  | 'experience:complete'; // User reached and viewed the final phase

// ─── Payloads ─────────────────────────────────────────────────────────────────

export interface PhaseEventPayload {
  sceneId: string;
  phase: number;
  phaseLabel: string;
  totalPhases: number;
  /** Time spent on the phase being left. 0 for phase:viewed. */
  dwellMs: number;
  /** Only present for phase:jumped, the phase the user jumped from. */
  fromPhase?: number;
}

export interface CtaEventPayload {
  sceneId: string;
  phase: number;
  phaseLabel: string;
  /** Machine-readable identifier for the CTA (e.g., 'waitlist', 'back-to-hub'). */
  ctaId: string;
  /** Human-readable label for the CTA button. */
  ctaLabel: string;
}
