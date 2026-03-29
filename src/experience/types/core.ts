/**
 * Core types for the Fox Haven Experience Engine.
 * All engine consumers interact with these types — never with internal implementations.
 */

import type React from 'react';

// ─── Device Tier ──────────────────────────────────────────────────────────────

/** Hardware capability classification assigned at boot by the capability probe. */
export type DeviceTier = 'lite' | 'standard' | 'premium';

// ─── Scene Mount ──────────────────────────────────────────────────────────────

/** How and where a scene is mounted in the page layout. */
export type MountType =
  | 'section-bg'       // Absolute/fixed background behind a page section
  | 'card-panel'       // Contained visual panel inside an initiative card
  | 'full-experience'; // Full-viewport scene on a dedicated route

// ─── Scene State ──────────────────────────────────────────────────────────────

/** Lifecycle state of a mounted scene instance. */
export type SceneState =
  | 'unregistered'
  | 'loading'
  | 'ready'
  | 'running'
  | 'paused'
  | 'error'
  | 'fallback'
  | 'destroyed';

// ─── Reduced Motion Behavior ──────────────────────────────────────────────────

/**
 * How a scene should respond when prefers-reduced-motion is active.
 * - 'hide'             → render nothing (scene mount is skipped entirely)
 * - 'static-fallback' → render the fallback component (default)
 * - 'slow-animation'  → run but with reduced animation intensity
 */
export type ReducedMotionBehavior = 'hide' | 'static-fallback' | 'slow-animation';

// ─── Asset Manifest ───────────────────────────────────────────────────────────

export interface AssetFile {
  /** Path relative to /public, e.g. '/scenes/solar-shelter/model.glb' */
  path: string;
  type: 'texture' | 'model' | 'audio' | 'json';
  /** Approximate size in bytes for budget tracking */
  bytes: number;
  /** If true, scene waits for this asset before starting */
  required: boolean;
}

export interface AssetManifest {
  /** Total estimated bytes across all files */
  totalBytes: number;
  files: AssetFile[];
}

// ─── Scene Manifest ───────────────────────────────────────────────────────────

export interface SceneManifest {
  /** Unique slug identifier — used as registry key */
  id: string;
  /** Human-readable name for dev tooling and analytics */
  displayName: string;
  /** Internal documentation string */
  description: string;
  mountType: MountType;
  /** Scene will not run below this tier; falls back instead */
  minimumTier: DeviceTier;
  assets: AssetManifest;
  /**
   * Dynamic import factory for the scene component.
   * Must not be called at module initialization time (SSR-safe).
   */
  component: () => Promise<{ default: React.ComponentType<SceneProps> }>;
  /** Always-sync fallback component — rendered when scene cannot run */
  fallback: React.ComponentType<FallbackProps>;
  /** Label forwarded to analytics events */
  analyticsLabel: string;
  reducedMotionBehavior: ReducedMotionBehavior;
  /** Links this scene to an initiative in intent-config.ts */
  initiativeId?: string;
  /** SEO metadata for full-experience routes */
  seoMetadata?: {
    title: string;
    description: string;
    ogImage?: string;
  };
}

// ─── Scene Props ──────────────────────────────────────────────────────────────

/** Props passed to every scene component by SceneHost */
export interface SceneProps {
  /** Assigned hardware tier — scene should adjust quality accordingly */
  tier: DeviceTier;
  /** Whether prefers-reduced-motion is active */
  reducedMotion: boolean;
  /** Canvas width in CSS pixels */
  width: number;
  /** Canvas height in CSS pixels */
  height: number;
  /** Tab visibility state — scene should pause work when false */
  isVisible: boolean;
  /** Call this to trigger graceful fallback from within the scene */
  onError: (err: Error) => void;
}

// ─── Fallback Props ───────────────────────────────────────────────────────────

/** Props passed to the fallback component when the scene cannot run */
export interface FallbackProps {
  /** Why the fallback is showing */
  reason: FallbackReason;
  tier: DeviceTier;
  reducedMotion: boolean;
}

export type FallbackReason =
  | 'tier-too-low'
  | 'reduced-motion'
  | 'webgl-unavailable'
  | 'asset-load-failed'
  | 'chunk-load-failed'
  | 'scene-error'
  | 'fps-watchdog'
  | 'unknown';

// ─── SceneHost Props ──────────────────────────────────────────────────────────

export interface SceneHostProps {
  /** Registry key — must match a registered SceneManifest.id */
  sceneId: string;
  mountType: MountType;
  /** Section element ID to position against (section-bg only) */
  targetId?: string;
  /** Called when scene transitions to RUNNING */
  onReady?: () => void;
  /** Called when scene transitions to FALLBACK */
  onFallback?: (reason: FallbackReason) => void;
  className?: string;
}
