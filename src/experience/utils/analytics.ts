/**
 * Analytics abstraction for the Experience Engine.
 *
 * Phase 2: no-op implementation. All emit calls are logged in development only.
 * To integrate a real provider, replace the body of emitSceneEvent()
 * with calls to window.gtag, plausible(), posthog.capture(), etc.
 * The event names and shapes are stable — consumers never need to change.
 */

import type { DeviceTier, FallbackReason, SceneState } from '../types/core';
import type { RenderMode } from '../types/performance';

// ─── Event Types ──────────────────────────────────────────────────────────────

export type SceneAnalyticsEvent =
  | 'scene:registered'      // Scene added to registry
  | 'scene:loading'         // Asset fetch started
  | 'scene:loaded'          // Scene is RUNNING
  | 'scene:fallback'        // Scene degraded to fallback
  | 'scene:error'           // Scene threw an error
  | 'scene:paused'          // Tab backgrounded
  | 'scene:resumed'         // Tab foregrounded
  | 'scene:destroyed'       // SceneHost unmounted
  | 'tier:assigned'         // Device tier determined
  | 'fps:watchdog-trigger'  // FPS watchdog fired
  | 'asset:load-complete'   // All assets loaded
  | 'asset:load-failed';    // Asset load failed

// ─── Payload ──────────────────────────────────────────────────────────────────

export interface SceneEventPayload {
  sceneId: string;
  tier?: DeviceTier;
  renderMode?: RenderMode;
  state?: SceneState;
  fallbackReason?: FallbackReason;
  error?: string;
  loadTimeMs?: number;
  firstFrameMs?: number;
  assetsBytes?: number;
  gpuScore?: number;
  [key: string]: unknown; // Allow additional fields per event
}

// ─── Emitter ──────────────────────────────────────────────────────────────────

/**
 * Emit a scene analytics event.
 *
 * Phase 2: logs to console in development, no-ops in production.
 * Replace the implementation body to forward to a real analytics provider.
 */
export function emitSceneEvent(
  event: SceneAnalyticsEvent,
  payload: SceneEventPayload
): void {
  if (process.env.NODE_ENV === 'development') {
    console.debug(
      `%c[scene-analytics] ${event}`,
      'color: #E8821A; font-weight: bold',
      payload
    );
  }

  // ─── Real provider integration point ──────────────────────────────────────
  // Uncomment and adapt for your provider:
  //
  // window.gtag?.('event', event, { ...payload });
  // plausible?.(event, { props: payload });
  // posthog?.capture(event, payload);
  // ──────────────────────────────────────────────────────────────────────────
}

// ─── Tier Event Helper ────────────────────────────────────────────────────────

export function emitTierAssigned(tier: DeviceTier, gpuScore: number): void {
  emitSceneEvent('tier:assigned', {
    sceneId: '__engine__',
    tier,
    gpuScore,
  });
}
