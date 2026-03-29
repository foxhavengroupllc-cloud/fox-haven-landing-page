'use client';
/**
 * NEW PROJECT TEMPLATE — Scene Component
 *
 * Rename this file to match your project, e.g., HeroAmbientScene.tsx
 * Export the component with a descriptive name, e.g., export function HeroAmbientScene
 *
 * This is a minimal Canvas 2D starter. Replace with WebGL/Three.js for premium tier.
 * See ENGINE_README.md for the full scene authoring guide.
 * See ENGINE_API.md for Canvas2DRenderer, CameraController, and InteractionManager docs.
 */

import { useEffect, useRef } from 'react';
import { CanvasContainer, SceneCanvas, useScene, Canvas2DRenderer } from '../../index';
import type { SceneProps } from '../../types/core';

// ─── Renderer (2D Canvas) ─────────────────────────────────────────────────────
// Extend Canvas2DRenderer for Standard tier.
// For Lite tier: render nothing here — show Fallback instead.
// For Premium tier: swap in WebGL/Three.js.

class YourSceneRenderer extends Canvas2DRenderer {
  protected onStart(): void {
    // Initialize particles, textures, or scene graph here.
    // Called once when the renderer starts.
  }

  protected draw(ctx: CanvasRenderingContext2D, dt: number): void {
    // Called every animation frame.
    // ctx is pre-scaled for device pixel ratio.
    // dt is elapsed time in milliseconds since last frame.

    // TODO: Replace this with your actual scene drawing code.
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = 'rgba(255, 100, 0, 0.02)';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  protected onResize(width: number, height: number): void {
    // Called when the canvas dimensions change.
    // Re-layout any position-dependent scene elements here.
    void width;
    void height;
  }

  protected onDestroy(): void {
    // Clean up any scene-specific resources (textures, audio, etc.)
  }
}

// ─── Scene Component ──────────────────────────────────────────────────────────

/**
 * TODO: Rename this export to match your scene, e.g., HeroAmbientScene
 * Update the import in manifest.ts to match.
 */
export function YourScene({ tier, reducedMotion, width, height, isVisible, onError }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<YourSceneRenderer | null>(null);

  // useScene gives you the performance profile and render mode for this tier
  const { shouldAnimate } = useScene({ tier, reducedMotion, onError });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shouldAnimate) return;

    const renderer = new YourSceneRenderer(canvas, {
      dpr: window.devicePixelRatio || 1,
      onDowngrade: () => onError(new Error('fps-watchdog')),
    });

    renderer.start();
    rendererRef.current = renderer;

    return () => {
      renderer.destroy();
      rendererRef.current = null;
    };
  }, [shouldAnimate, onError]);

  // Pause / resume on tab visibility
  useEffect(() => {
    const r = rendererRef.current;
    if (!r) return;
    if (isVisible) {
      r.resume();
    } else {
      r.pause();
    }
  }, [isVisible]);

  // Respond to resize
  useEffect(() => {
    void width;
    void height;
    // Canvas2DRenderer handles resize internally via ResizeObserver.
    // This effect is here if you need to do additional layout work on size change.
  }, [width, height]);

  return (
    <CanvasContainer className="absolute inset-0">
      <SceneCanvas ref={canvasRef} />
    </CanvasContainer>
  );
}
