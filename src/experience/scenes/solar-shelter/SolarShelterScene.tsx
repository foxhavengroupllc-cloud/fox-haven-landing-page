'use client';
/**
 * Solar Shelter Experience, Main Scene Component
 *
 * Hybrid architecture:
 *   Layer 1 (canvas): HeatRenderer, particle field shifts from hot orange
 *                     to cool blue-white as the narrative progresses
 *   Layer 2 (DOM):    Phase content, narrative text, stats, diagrams, hotspots
 *   Layer 3 (DOM):    Phase navigation, progress dots, prev/next controls
 *
 * Five narrative phases:
 *   0 Problem → 1 Contrast → 2 Solution → 3 Proof → 4 Action
 */

import { useEffect, useRef, useMemo } from 'react';
import { CanvasContainer, SceneCanvas, useScene } from '../../index';
import { useNarrativeSequencer } from '../../modules/narrative/NarrativeSequencer';
import { usePhaseTracking } from '../../analytics/usePhaseTracking';
import {
  Phase0Problem,
  Phase1Contrast,
  Phase2Solution,
  Phase3Proof,
  Phase4Action,
  PhaseNavigation,
} from './SolarShelterPhases';
import { HeatRenderer } from './HeatRenderer';
import type { SceneProps } from '../../types/core';

// Heat level per phase, drops as narrative moves toward resolution
const HEAT_LEVELS = [1.0, 0.72, 0.42, 0.18, 0.07] as const;

// Particle count: standard tier vs premium tier
const PARTICLE_COUNT_STANDARD = 80;
const PARTICLE_COUNT_PREMIUM = 160;

export function SolarShelterScene({
  tier,
  reducedMotion,
  isVisible,
  onError,
}: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<HeatRenderer | null>(null);

  const { shouldAnimate } = useScene({ tier, reducedMotion, onError });

  const sequencer = useNarrativeSequencer({
    totalPhases: 5,
    transitionDurationMs: 450,
    onPhaseChange: (phase) => {
      rendererRef.current?.setHeatLevel(HEAT_LEVELS[phase] ?? 0.07);
    },
  });
  usePhaseTracking(sequencer, 'solar-shelter-experience', {
    phaseLabels: ['Problem', 'Contrast', 'Solution', 'Proof', 'Action'],
  });

  const particleCount = useMemo(
    () => (tier === 'premium' ? PARTICLE_COUNT_PREMIUM : PARTICLE_COUNT_STANDARD),
    [tier]
  );

  // Start canvas renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new HeatRenderer(canvas, {
      dpr: window.devicePixelRatio || 1,
      initialHeatLevel: HEAT_LEVELS[0],
      particleCount,
      onDowngrade: () => onError(new Error('fps-watchdog')),
    });

    if (shouldAnimate) {
      renderer.start();
    }

    rendererRef.current = renderer;

    return () => {
      renderer.destroy();
      rendererRef.current = null;
    };
  }, [shouldAnimate, particleCount, onError]);

  // Pause / resume on visibility change
  useEffect(() => {
    const r = rendererRef.current;
    if (!r) return;
    if (isVisible) {
      r.resume();
    } else {
      r.pause();
    }
  }, [isVisible]);

  // Navigate back to overview
  function handleBack() {
    window.location.href = '/#initiatives';
  }

  const { phase, transitionState, canGoPrev, canGoNext, isTransitioning, nextPhase, prevPhase, goToPhase } = sequencer;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#020408]">

      {/* ── Layer 1: Heat Canvas ─────────────────────────────────── */}
      <CanvasContainer className="absolute inset-0">
        <SceneCanvas ref={canvasRef} />
      </CanvasContainer>

      {/* ── Layer 2: Dark overlay for text legibility ────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(2,4,8,0.6) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Phase content ───────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col pb-24" aria-live="polite">
        {phase === 0 && (
          <Phase0Problem transitionState={transitionState} />
        )}
        {phase === 1 && (
          <Phase1Contrast transitionState={transitionState} />
        )}
        {phase === 2 && (
          <Phase2Solution transitionState={transitionState} />
        )}
        {phase === 3 && (
          <Phase3Proof transitionState={transitionState} />
        )}
        {phase === 4 && (
          <Phase4Action transitionState={transitionState} onBack={handleBack} />
        )}
      </div>

      {/* ── Layer 4: Navigation ──────────────────────────────────── */}
      <PhaseNavigation
        phase={phase}
        totalPhases={5}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        isTransitioning={isTransitioning}
        onPrev={prevPhase}
        onNext={nextPhase}
        onGoTo={goToPhase}
      />

      {/* ── Keyboard hint (first phase only) ────────────────────── */}
      {phase === 0 && !isTransitioning && (
        <div
          className="absolute top-6 right-6 text-xs font-mono text-slate-700 flex items-center gap-1.5"
          aria-hidden="true"
        >
          <kbd className="border border-slate-800 rounded px-1.5 py-0.5 text-[10px]">→</kbd>
          advance
        </div>
      )}

      {/* ── Accessibility: hidden phase announcer ────────────────── */}
      <div className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
        {`Now showing: ${['Problem', 'Contrast', 'Solution', 'Proof', 'Action'][phase] ?? ''}, use arrow keys or navigation buttons to move between phases`}
      </div>
    </div>
  );
}
