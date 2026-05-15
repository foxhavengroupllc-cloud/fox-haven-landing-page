'use client';
/**
 * NEW PROJECT TEMPLATE, Fallback Component
 *
 * Rename this file to match your project, e.g., HeroAmbientFallback.tsx
 * Export the component with a descriptive name, e.g., export function HeroAmbientFallback
 *
 * The fallback renders when:
 *   - The device tier is below minimumTier
 *   - prefers-reduced-motion is active (when reducedMotionBehavior is 'static-fallback')
 *   - WebGL is unavailable
 *   - Assets fail to load
 *   - The scene throws an unhandled error
 *   - The FPS watchdog triggers
 *
 * REQUIREMENTS
 * ─────────────
 * 1. Must render synchronously, no async, no useEffect on first paint
 * 2. Must never throw
 * 3. Must be visually acceptable as the permanent state (not a loading spinner)
 * 4. Must be indistinguishable from the full experience on reduced-motion devices
 *
 * For section-bg fallbacks: match the CSS background you're replacing.
 * For full-experience fallbacks: provide meaningful static content.
 */

import type { FallbackProps } from '../../types/core';

/**
 * TODO: Rename this export to match your scene, e.g., HeroAmbientFallback
 * Update the import in manifest.ts to match.
 */
export function YourFallback({ reason, tier, reducedMotion }: FallbackProps) {
  // TODO: Replace this entire return with your actual fallback design.
  // The fallback should match your experienceManifest.fallbackMode.description.
  //
  // Reasons you might want to handle differently:
  //   'reduced-motion'    → user prefers no animation, show static version
  //   'tier-too-low'      → lite device, show CSS-only version
  //   'scene-error'       → something crashed, show graceful static state
  //   'fps-watchdog'      → thermal throttle, show lighter static version
  //
  // For most section-bg scenes, the fallback is identical for all reasons.

  void reason;
  void tier;
  void reducedMotion;

  return (
    <div
      className="absolute inset-0"
      style={{
        // TODO: Replace with the CSS that approximates your scene.
        // For a hero background: match the exact gradient/image CSS from globals.css.
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      }}
      aria-hidden="true"
    />
  );
}
