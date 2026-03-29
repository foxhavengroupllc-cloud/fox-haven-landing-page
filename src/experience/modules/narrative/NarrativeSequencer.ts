/**
 * NarrativeSequencer — Reusable multi-phase narrative state manager
 *
 * Manages progression through a fixed sequence of narrative phases.
 * Used by full-experience scenes that guide the user through a story arc.
 *
 * Reusable: any scene with a linear narrative can use this module.
 * Does NOT contain any project-specific content.
 *
 * Usage:
 *   const sequencer = useNarrativeSequencer({ totalPhases: 5 })
 *   sequencer.nextPhase()
 *   sequencer.phase // 0–4
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

/** Whether a phase is currently in transition or stable. */
export type PhaseTransitionState = 'entering' | 'active' | 'exiting';

export interface NarrativeSequencerOptions {
  /** Total number of phases. Phases are indexed 0 to totalPhases-1. */
  totalPhases: number;
  /** Duration of the entering/exiting transition in ms. Default: 400 */
  transitionDurationMs?: number;
  /** Initial phase index. Default: 0 */
  initialPhase?: number;
  /** Called when a phase transition completes (new phase becomes active). */
  onPhaseChange?: (phase: number, prevPhase: number) => void;
  /** If true, attach left/right keyboard listeners. Default: true */
  enableKeyboard?: boolean;
}

export interface NarrativeSequencerState {
  /** Current phase index (0-based). */
  phase: number;
  /** Whether the phase is entering, active, or exiting. */
  transitionState: PhaseTransitionState;
  /** Whether a transition is currently in progress. */
  isTransitioning: boolean;
  /** True if there is a previous phase to go to. */
  canGoPrev: boolean;
  /** True if there is a next phase to go to. */
  canGoNext: boolean;
  /** Progress 0–1 through all phases combined. */
  totalProgress: number;
  /** Phase label for accessibility (e.g., "Phase 2 of 5"). */
  phaseLabel: string;
  /** Advance to the next phase. No-op if already at last phase or transitioning. */
  nextPhase: () => void;
  /** Go back to the previous phase. No-op if at first phase or transitioning. */
  prevPhase: () => void;
  /** Jump to a specific phase. No-op if out of range or transitioning. */
  goToPhase: (index: number) => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * React hook for managing multi-phase narrative sequence state.
 * Handles transitions, keyboard navigation, and accessibility labels.
 */
export function useNarrativeSequencer(
  options: NarrativeSequencerOptions
): NarrativeSequencerState {
  const {
    totalPhases,
    transitionDurationMs = 400,
    initialPhase = 0,
    onPhaseChange,
    enableKeyboard = true,
  } = options;

  const [phase, setPhase] = useState(initialPhase);
  const [transitionState, setTransitionState] = useState<PhaseTransitionState>('active');
  const isTransitioning = transitionState !== 'active';
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onPhaseChangeRef = useRef(onPhaseChange);
  onPhaseChangeRef.current = onPhaseChange;

  const goToPhase = useCallback(
    (targetIndex: number) => {
      if (isTransitioning) return;
      if (targetIndex < 0 || targetIndex >= totalPhases) return;
      if (targetIndex === phase) return;

      const prevPhase = phase;

      // Start exit transition
      setTransitionState('exiting');

      transitionRef.current = setTimeout(() => {
        // Switch phase and start enter transition
        setPhase(targetIndex);
        setTransitionState('entering');

        transitionRef.current = setTimeout(() => {
          setTransitionState('active');
          onPhaseChangeRef.current?.(targetIndex, prevPhase);
        }, transitionDurationMs);
      }, transitionDurationMs);
    },
    [isTransitioning, phase, totalPhases, transitionDurationMs]
  );

  const nextPhase = useCallback(() => {
    goToPhase(phase + 1);
  }, [goToPhase, phase]);

  const prevPhase = useCallback(() => {
    goToPhase(phase - 1);
  }, [goToPhase, phase]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextPhase();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevPhase();
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [enableKeyboard, nextPhase, prevPhase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (transitionRef.current) clearTimeout(transitionRef.current);
    };
  }, []);

  return {
    phase,
    transitionState,
    isTransitioning,
    canGoPrev: phase > 0,
    canGoNext: phase < totalPhases - 1,
    totalProgress: totalPhases > 1 ? phase / (totalPhases - 1) : 1,
    phaseLabel: `Phase ${phase + 1} of ${totalPhases}`,
    nextPhase,
    prevPhase,
    goToPhase,
  };
}
