'use client';
/**
 * Family Brain Experience — Main Scene Component
 *
 * Hybrid architecture:
 *   Layer 1 (canvas): OrbitalRenderer — node constellation shifts from chaotic
 *                     scatter to calm orbital system as narrative progresses
 *   Layer 2 (DOM):    Phase content — narrative text, phone mockup, AI insights
 *   Layer 3 (DOM):    Phase navigation — purple dots, prev/next controls
 *
 * Five narrative phases:
 *   0 Chaos → 1 Fragmentation → 2 Organize → 3 Intelligence → 4 Clarity
 *
 * Visual grammar: purple/blue orbital nodes — distinct from shelter (orange
 * particles) and heat app (cyan city grid).
 */

import { useEffect, useRef, useMemo } from 'react';
import { CanvasContainer, SceneCanvas, useScene } from '../../index';
import { useNarrativeSequencer } from '../../modules/narrative/NarrativeSequencer';
import { usePhaseTracking } from '../../analytics/usePhaseTracking';
import {
  Phase0Chaos,
  Phase1Fragmentation,
  Phase2Organize,
  Phase3Intelligence,
  Phase4Clarity,
  BrainPhaseNavigation,
} from './FamilyBrainPhases';
import { OrbitalRenderer } from './OrbitalRenderer';
import type { SceneProps } from '../../types/core';

const NODE_COUNT_STANDARD = 48;
const NODE_COUNT_PREMIUM = 90;

export function FamilyBrainScene({
  tier,
  reducedMotion,
  isVisible,
  onError,
}: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<OrbitalRenderer | null>(null);

  const { shouldAnimate } = useScene({ tier, reducedMotion, onError });

  const nodeCount = useMemo(
    () => (tier === 'premium' ? NODE_COUNT_PREMIUM : NODE_COUNT_STANDARD),
    [tier]
  );

  const sequencer = useNarrativeSequencer({
    totalPhases: 5,
    transitionDurationMs: 500,
    onPhaseChange: (phase) => {
      rendererRef.current?.setPhase(phase);
    },
  });
  usePhaseTracking(sequencer, 'family-brain-experience', {
    phaseLabels: ['Chaos', 'Fragmentation', 'Organize', 'Intelligence', 'Clarity'],
  });

  // Start orbital renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new OrbitalRenderer(canvas, {
      dpr: window.devicePixelRatio || 1,
      nodeCount,
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
  }, [shouldAnimate, nodeCount, onError]);

  // Pause / resume on tab visibility
  useEffect(() => {
    const r = rendererRef.current;
    if (!r) return;
    if (isVisible) r.resume();
    else r.pause();
  }, [isVisible]);

  function handleBack() {
    window.location.href = '/#initiatives';
  }

  const {
    phase,
    transitionState,
    canGoPrev,
    canGoNext,
    isTransitioning,
    nextPhase,
    prevPhase,
    goToPhase,
  } = sequencer;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#020408]">

      {/* ── Layer 1: Orbital Canvas ───────────────────────── */}
      <CanvasContainer className="absolute inset-0">
        <SceneCanvas ref={canvasRef} />
      </CanvasContainer>

      {/* ── Layer 2: Vignette overlay ─────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 25%, rgba(2,4,8,0.60) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Phase content ────────────────────────── */}
      <div className="absolute inset-0 flex flex-col pb-24" aria-live="polite">
        {phase === 0 && <Phase0Chaos transitionState={transitionState} />}
        {phase === 1 && <Phase1Fragmentation transitionState={transitionState} />}
        {phase === 2 && <Phase2Organize transitionState={transitionState} />}
        {phase === 3 && <Phase3Intelligence transitionState={transitionState} />}
        {phase === 4 && <Phase4Clarity transitionState={transitionState} onBack={handleBack} />}
      </div>

      {/* ── Layer 4: Navigation ───────────────────────────── */}
      <BrainPhaseNavigation
        phase={phase}
        totalPhases={5}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        isTransitioning={isTransitioning}
        onPrev={prevPhase}
        onNext={nextPhase}
        onGoTo={goToPhase}
      />

      {/* ── Keyboard hint (phase 0 only) ──────────────────── */}
      {phase === 0 && !isTransitioning && (
        <div
          className="absolute top-6 right-6 text-xs font-mono text-slate-700 flex items-center gap-1.5"
          aria-hidden="true"
        >
          <kbd className="border border-slate-800 rounded px-1.5 py-0.5 text-[10px]">→</kbd>
          advance
        </div>
      )}

      {/* ── Accessibility announcer ───────────────────────── */}
      <div className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
        {`Now showing: ${
          ['Chaos', 'Fragmentation', 'Organize', 'Intelligence', 'Clarity'][phase] ?? ''
        } — use arrow keys or navigation buttons to move between phases`}
      </div>
    </div>
  );
}
