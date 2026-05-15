/**
 * Performance types for the Experience Engine.
 */

import type { DeviceTier } from './core';

// ─── Render Mode ──────────────────────────────────────────────────────────────

/**
 * The rendering technology selected for a scene instance.
 * Determined by tier, browser capability, and scene minimumTier.
 */
export type RenderMode =
  | 'css-only'     // No canvas, CSS animations and DOM only (Lite)
  | 'canvas-2d'    // HTML5 Canvas 2D context (Standard)
  | 'webgl'        // WebGL context, typically Three.js/R3F (Premium)
  | 'webgl2';      // WebGL2 context (Premium, higher capability)

// ─── Performance Profile ──────────────────────────────────────────────────────

/**
 * Quality settings for a running scene, derived from the device tier.
 * Scene components read these to scale their work.
 */
export interface PerformanceProfile {
  tier: DeviceTier;
  renderMode: RenderMode;
  /** Target frames per second */
  targetFPS: number;
  /** Canvas resolution multiplier relative to CSS pixels */
  devicePixelRatio: number;
  /** Maximum number of particles / instances */
  maxParticles: number;
  /** Whether post-processing passes are allowed */
  allowPostProcessing: boolean;
  /** Whether HDR textures are allowed */
  allowHDR: boolean;
  /** Whether shadows are rendered */
  allowShadows: boolean;
  /** Maximum texture resolution (width or height in px) */
  maxTextureSize: number;
}

// ─── FPS Watchdog Config ──────────────────────────────────────────────────────

export interface FPSWatchdogConfig {
  /** FPS below which frames are considered "low" */
  lowFPSThreshold: number;
  /** Number of consecutive low-FPS frames before downgrade is triggered */
  consecutiveFramesBeforeDowngrade: number;
  /** Frames to ignore at scene start (GPU warmup period) */
  gracePeriodFrames: number;
  /** How many low-FPS frames are forgiven per good frame (recovery rate) */
  recoveryRate: number;
  enabled: boolean;
}

export const DEFAULT_FPS_WATCHDOG: FPSWatchdogConfig = {
  lowFPSThreshold: 30,
  consecutiveFramesBeforeDowngrade: 180,
  gracePeriodFrames: 120,
  recoveryRate: 1,
  enabled: true,
};

// ─── Performance Policy ───────────────────────────────────────────────────────

/**
 * Maps device tiers to their PerformanceProfile defaults.
 */
export const PERFORMANCE_PROFILES: Record<DeviceTier, Omit<PerformanceProfile, 'tier'>> = {
  lite: {
    renderMode: 'css-only',
    targetFPS: 60,
    devicePixelRatio: 1,
    maxParticles: 0,
    allowPostProcessing: false,
    allowHDR: false,
    allowShadows: false,
    maxTextureSize: 0,
  },
  standard: {
    renderMode: 'canvas-2d',
    targetFPS: 30,
    devicePixelRatio: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2),
    maxParticles: 500,
    allowPostProcessing: false,
    allowHDR: false,
    allowShadows: false,
    maxTextureSize: 1024,
  },
  premium: {
    renderMode: 'webgl2',
    targetFPS: 60,
    devicePixelRatio: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2),
    maxParticles: 5000,
    allowPostProcessing: true,
    allowHDR: false,
    allowShadows: true,
    maxTextureSize: 2048,
  },
};

export function getPerformanceProfile(tier: DeviceTier): PerformanceProfile {
  return { tier, ...PERFORMANCE_PROFILES[tier] };
}
