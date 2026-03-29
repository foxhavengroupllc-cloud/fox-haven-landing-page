/**
 * Render mode selection for the Experience Engine.
 * Maps DeviceTier and scene requirements to a concrete rendering approach.
 */

import type { DeviceTier } from '../types/core';
import type { RenderMode } from '../types/performance';
import { probeWebGL } from '../utils/capability';

// ─── Mode Selection ───────────────────────────────────────────────────────────

/**
 * Selects the appropriate RenderMode for a given tier.
 * Also re-probes WebGL to catch cases where the tier probe and the actual
 * render attempt disagree (e.g., context lost between probe and use).
 */
export function selectRenderMode(tier: DeviceTier): RenderMode {
  switch (tier) {
    case 'lite':
      return 'css-only';

    case 'standard': {
      // Double-check that canvas 2D is available
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return 'css-only';
      } catch {
        return 'css-only';
      }
      return 'canvas-2d';
    }

    case 'premium': {
      const webglLevel = probeWebGL();
      if (webglLevel === 'webgl2') return 'webgl2';
      if (webglLevel === 'webgl1') return 'webgl';
      // WebGL disappeared (context lost?) — fall back to 2D
      return 'canvas-2d';
    }
  }
}

// ─── Canvas Context Factory ───────────────────────────────────────────────────

/** Creates and returns a configured 2D canvas context */
export function create2DContext(
  canvas: HTMLCanvasElement,
  dpr: number
): CanvasRenderingContext2D | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  ctx.scale(dpr, dpr);

  return ctx;
}

/** Creates and returns a configured WebGL2 context */
export function createWebGL2Context(
  canvas: HTMLCanvasElement
): WebGL2RenderingContext | null {
  try {
    const gl = canvas.getContext('webgl2', {
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    });
    return gl;
  } catch {
    return null;
  }
}

/** Creates and returns a configured WebGL1 context */
export function createWebGL1Context(
  canvas: HTMLCanvasElement
): WebGLRenderingContext | null {
  try {
    const gl =
      canvas.getContext('webgl', {
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
        powerPreference: 'high-performance',
      }) ||
      canvas.getContext('experimental-webgl');
    return gl as WebGLRenderingContext | null;
  } catch {
    return null;
  }
}
