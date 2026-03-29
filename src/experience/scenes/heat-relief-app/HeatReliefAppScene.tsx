'use client';
/**
 * Heat Relief App Experience — Main Scene Component
 *
 * Hybrid architecture:
 *   Layer 1 (canvas): CityGridRenderer — dot grid shifts from emergency red
 *                     to navigational cyan as the narrative progresses
 *   Layer 2 (DOM):    Phase content — narrative text, phone mockups, resource cards
 *   Layer 3 (DOM):    Phase navigation — progress dots, prev/next controls
 *
 * Five narrative phases:
 *   0 Emergency → 1 Discovery → 2 Navigate → 3 Decide → 4 Act
 *
 * Visual grammar: cyan dot-grid (wayfinding) vs shelter's orange particles (atmospheric).
 */

import { useEffect, useRef, useMemo } from 'react';
import { CanvasContainer, SceneCanvas, useScene } from '../../index';
import { useNarrativeSequencer } from '../../modules/narrative/NarrativeSequencer';
import { usePhaseTracking } from '../../analytics/usePhaseTracking';
import {
  Phase0Emergency,
  Phase1Discovery,
  Phase2Navigate,
  Phase3Decide,
  Phase4Act,
  AppPhaseNavigation,
} from './HeatReliefAppPhases';
import { CityGridRenderer } from './CityGridRenderer';
import type { SceneProps } from '../../types/core';

// Dot counts: standard vs premium tier
const DOT_COUNT_STANDARD = 55;
const DOT_COUNT_PREMIUM = 110;

export function HeatReliefAppScene({
  tier,
  reducedMotion,
  isVisible,
  onError,
}: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<CityGridRenderer | null>(null);

  const { shouldAnimate } = useScene({ tier, reducedMotion, onError });

  const dotCount = useMemo(
    () => (tier === 'premium' ? DOT_COUNT_PREMIUM : DOT_COUNT_STANDARD),
    [tier]
  );

  const sequencer = useNarrativeSequencer({
    totalPhases: 5,
    transitionDurationMs: 450,
    onPhaseChange: (phase) => {
      rendererRef.current?.setPhase(phase);
    },
  });
  usePhaseTracking(sequencer, 'heat-relief-app-experience', {
    phaseLabels: ['Emergency', 'Discovery', 'Navigate', 'Decide', 'Act'],
  });

  // ── Deep-link: ?phase=N jumps straight to that phase on load ──────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('phase');
    if (!raw) return;
    const target = parseInt(raw, 10);
    if (!isNaN(target) && target > 0 && target < 5) {
      sequencer.goToPhase(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount only

  // Start canvas renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new CityGridRenderer(canvas, {
      dpr: window.devicePixelRatio || 1,
      dotCount,
      resourceCount: 7,
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
  }, [shouldAnimate, dotCount, onError]);

  // Pause / resume on visibility change
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

      {/* ── Layer 1: City Grid Canvas ─────────────────────── */}
      <CanvasContainer className="absolute inset-0">
        <SceneCanvas ref={canvasRef} />
      </CanvasContainer>

      {/* ── Layer 2: Vignette for text legibility ──────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, rgba(2,4,8,0.65) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Phase content ─────────────────────────── */}
      <div className="absolute inset-0 flex flex-col pb-24" aria-live="polite">
        {phase === 0 && (
          <Phase0Emergency transitionState={transitionState} />
        )}
        {phase === 1 && (
          <Phase1Discovery transitionState={transitionState} />
        )}
        {phase === 2 && (
          <Phase2Navigate transitionState={transitionState} />
        )}
        {phase === 3 && (
          <Phase3Decide
            transitionState={transitionState}
            onSelectCenter={() => goToPhase(4)}
          />
        )}
        {phase === 4 && (
          <Phase4Act transitionState={transitionState} onBack={handleBack} />
        )}
      </div>

      {/* ── Layer 4: Navigation ────────────────────────────── */}
      <AppPhaseNavigation
        phase={phase}
        totalPhases={5}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        isTransitioning={isTransitioning}
        onPrev={prevPhase}
        onNext={nextPhase}
        onGoTo={goToPhase}
      />

      {/* ── Keyboard hint (phase 0 only) ───────────────────── */}
      {phase === 0 && !isTransitioning && (
        <div
          className="absolute top-6 right-6 text-xs font-mono text-slate-700 flex items-center gap-1.5"
          aria-hidden="true"
        >
          <kbd className="border border-slate-800 rounded px-1.5 py-0.5 text-[10px]">→</kbd>
          advance
        </div>
      )}

      {/* ── Accessibility: hidden phase announcer ──────────── */}
      <div className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
        {`Now showing: ${
          ['Emergency', 'Discovery', 'Navigate', 'Decide', 'Act'][phase] ?? ''
        } — use arrow keys or navigation buttons to move between phases`}
      </div>
    </div>
  );
}
