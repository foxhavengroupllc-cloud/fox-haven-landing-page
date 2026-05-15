'use client';
/**
 * usePhaseTracking, drop-in phase observation hook for NarrativeSequencer.
 *
 * Observes the phase value returned by useNarrativeSequencer and automatically
 * emits interaction analytics events. Does NOT wrap or replace the sequencer , 
 * all existing scene code continues to work unchanged.
 *
 * Usage (add one line to any scene):
 *   const sequencer = useNarrativeSequencer({ ... });
 *   usePhaseTracking(sequencer, 'my-scene-id', { phaseLabels: ['Phase 0', ...] });
 *   const { phase, nextPhase, ... } = sequencer; // unchanged
 *
 * Events emitted:
 *   phase:viewed     , on mount and on each phase change
 *   phase:advanced   , user moved forward (N → N+1)
 *   phase:retreated  , user moved backward (N → N-1)
 *   phase:jumped     , user jumped to non-adjacent phase
 *   experience:complete, user reached the final phase
 *   phase:exit       , on unmount, from whichever phase the user is on
 */

import { useEffect, useRef } from 'react';
import { storeEvent } from './store';
import type { InteractionEvent } from './interactionEvents';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PhaseTrackingOptions {
  /** Human-readable label per phase index. Must match the scene's phase count. */
  phaseLabels: string[];
}

/** Minimal interface, accepts any object with a numeric `phase` property. */
interface SequencerLike {
  phase: number;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePhaseTracking(
  sequencer: SequencerLike,
  sceneId: string,
  options: PhaseTrackingOptions
): void {
  const { phase } = sequencer;

  // Use refs for values accessed in effects/cleanup to prevent stale closures.
  // Labels and totalPhases are treated as stable after mount (they don't change).
  const prevPhaseRef = useRef<number | null>(null);
  const phaseStartRef = useRef<number>(Date.now());
  const labelsRef = useRef(options.phaseLabels);
  const sceneIdRef = useRef(sceneId);
  const totalPhasesRef = useRef(options.phaseLabels.length);

  // Keep refs in sync (defensive, in practice these never change after mount)
  labelsRef.current = options.phaseLabels;
  totalPhasesRef.current = options.phaseLabels.length;

  // ── Phase observation ──────────────────────────────────────────────────────

  useEffect(() => {
    const now = Date.now();
    const prevPhase = prevPhaseRef.current;
    const dwellMs = prevPhase !== null ? now - phaseStartRef.current : 0;
    const labels = labelsRef.current;
    const totalPhases = totalPhasesRef.current;
    const sid = sceneIdRef.current;

    const label = (p: number) => labels[p] ?? `Phase ${p}`;

    if (prevPhase === null) {
      // Initial mount: emit view for starting phase
      storeEvent('phase:viewed', {
        sceneId: sid,
        phase,
        phaseLabel: label(phase),
        totalPhases,
        dwellMs: 0,
      });
    } else if (phase !== prevPhase) {
      // Determine navigation direction
      let navEvent: InteractionEvent;
      if (phase === prevPhase + 1) {
        navEvent = 'phase:advanced';
      } else if (phase === prevPhase - 1) {
        navEvent = 'phase:retreated';
      } else {
        navEvent = 'phase:jumped';
      }

      storeEvent(navEvent, {
        sceneId: sid,
        phase,
        phaseLabel: label(phase),
        totalPhases,
        dwellMs,
        fromPhase: prevPhase,
      });

      storeEvent('phase:viewed', {
        sceneId: sid,
        phase,
        phaseLabel: label(phase),
        totalPhases,
        dwellMs: 0,
      });

      // Final phase reached
      if (phase === totalPhases - 1) {
        storeEvent('experience:complete', {
          sceneId: sid,
          phase,
          phaseLabel: label(phase),
          totalPhases,
          dwellMs: 0,
        });
      }

      phaseStartRef.current = now;
    }

    prevPhaseRef.current = phase;
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps
  // Only re-run when phase changes. Stable refs handle the rest.

  // ── Exit tracking ──────────────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      const dwellMs = Date.now() - phaseStartRef.current;
      const currentPhase = prevPhaseRef.current ?? 0;
      const labels = labelsRef.current;
      const totalPhases = totalPhasesRef.current;
      const sid = sceneIdRef.current;

      storeEvent('phase:exit', {
        sceneId: sid,
        phase: currentPhase,
        phaseLabel: labels[currentPhase] ?? `Phase ${currentPhase}`,
        totalPhases,
        dwellMs,
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Empty deps: runs only on unmount. All values accessed via refs.
}
