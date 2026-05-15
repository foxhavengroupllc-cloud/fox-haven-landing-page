/**
 * Device capability probe.
 * Runs once at SceneHost first mount to assign a DeviceTier.
 * All checks are synchronous where possible to minimize layout delay.
 *
 * IMPORTANT: This module must only be imported in client components.
 * It uses window/navigator which are unavailable in Node.js/SSR.
 */

import type { DeviceTier } from '../types/core';

// ─── WebGL Probe ──────────────────────────────────────────────────────────────

export type WebGLLevel = 'none' | 'webgl1' | 'webgl2';

export function probeWebGL(): WebGLLevel {
  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    if (gl2) {
      gl2.getExtension('EXT_color_buffer_float'); // warm up
      return 'webgl2';
    }
    const gl1 =
      canvas.getContext('webgl') ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (gl1) return 'webgl1';
    return 'none';
  } catch {
    return 'none';
  }
}

// ─── GPU Score ────────────────────────────────────────────────────────────────

/**
 * Returns a 0–100 GPU capability score derived from the renderer string.
 * 0–29  → lite tier
 * 30–69 → standard tier
 * 70+   → premium tier
 */
export function probeGPUScore(): number {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      (canvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (canvas.getContext('webgl') as WebGLRenderingContext | null);
    if (!gl) return 0;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 50; // Unknown GPU → assume standard

    const renderer = gl.getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL
    ) as string;
    const r = renderer.toLowerCase();

    // Software renderers → lite
    if (/swiftshader|llvmpipe|softpipe|mesa offscreen|angle \(.*software/i.test(r)) return 5;
    // Very old integrated → lite
    if (/intel hd graphics [234][0-9]{3}/i.test(r)) return 20;
    // Mid-range mobile Adreno/Mali/PowerVR → standard
    if (/adreno [45][0-9]{2}/i.test(r)) return 40;
    if (/mali-[gt][57][0-9]/i.test(r)) return 35;
    if (/powervr series[67]/i.test(r)) return 38;
    // Modern mobile (Adreno 6xx+, Mali-G7x+) → standard/premium boundary
    if (/adreno 6[0-9]{2}/i.test(r)) return 60;
    if (/adreno 7[0-9]{2}/i.test(r)) return 75;
    if (/mali-g[789][0-9]/i.test(r)) return 65;
    // Apple Silicon / A-series → premium
    if (/apple gpu|apple m[0-9]|a1[4567]/i.test(r)) return 92;
    // Modern discrete desktop → premium
    if (/rtx [23456789]|rx 6[0-9]{3}|rx 7[0-9]{3}|geforce rtx/i.test(r)) return 98;
    // Older discrete → standard/premium boundary
    if (/gtx 1[0-9]{3}|rx 5[0-9]{3}/i.test(r)) return 68;

    return 50; // Unknown → standard
  } catch {
    return 50;
  }
}

// ─── Tier Assignment ──────────────────────────────────────────────────────────

/**
 * Main entry point. Runs synchronously and returns the assigned DeviceTier.
 * Call once at SceneHost mount and cache the result via TierContext.
 */
export function assignDeviceTier(): DeviceTier {
  // Guard: must be in browser
  if (typeof window === 'undefined') return 'lite';

  // 1. Reduced motion, immediate lite (checked separately via useReducedMotion)
  //    but we also short-circuit here so tier assignment is consistent
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'lite';
  }

  // 2. Save-data / slow network
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (connection?.saveData === true) return 'lite';
  if (
    connection?.effectiveType === '2g' ||
    connection?.effectiveType === 'slow-2g'
  ) {
    return 'lite';
  }

  // 3. Hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency ?? 2;
  if (cores <= 2) return 'lite';

  // 4. Device memory (Chrome-only)
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (memory !== undefined && memory < 2) return 'lite';

  // 5. Battery (Chrome Android)
  // Note: getBattery() is async so we can't use it here synchronously.
  // Battery check is handled post-mount via useBatteryGate hook (Phase 3+).

  // 6. WebGL availability
  const webglLevel = probeWebGL();
  if (webglLevel === 'none') return 'lite';

  // 7. GPU score
  const gpuScore = probeGPUScore();
  if (gpuScore < 30) return 'lite';
  if (gpuScore < 70) return 'standard';
  return 'premium';
}

// ─── Cached Tier ──────────────────────────────────────────────────────────────

let _cachedTier: DeviceTier | null = null;

/**
 * Returns the tier, computing it once and caching for the page lifetime.
 * Use this instead of calling assignDeviceTier() directly.
 */
export function getDeviceTier(): DeviceTier {
  if (_cachedTier !== null) return _cachedTier;
  _cachedTier = assignDeviceTier();
  return _cachedTier;
}

/** Clears the cached tier, for testing only */
export function resetDeviceTierCache(): void {
  _cachedTier = null;
}
