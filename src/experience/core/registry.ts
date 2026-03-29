/**
 * Scene Registry — central Map of all registered SceneManifests.
 *
 * Scene authors add one line here to make their scene available to SceneHost.
 * The engine reads this Map; it never writes to it after boot.
 *
 * To add a new scene:
 *   1. Create src/experience/scenes/[id]/manifest.ts
 *   2. Import the manifest here
 *   3. Add it to SCENE_REGISTRY
 */

import type { SceneManifest } from '../types/core';

// ─── Registry ─────────────────────────────────────────────────────────────────

const _registry = new Map<string, SceneManifest>();

// ─── Scene Registrations ──────────────────────────────────────────────────────
// Use registerExperience() (from authoring system) for all new experiences.
// This enforces the integration gate — incomplete manifests cannot register.

import { registerExperience } from '../authoring/integrationGate';
import { experienceManifest as solarExperience, sceneManifest as solarScene }
  from '../scenes/solar-shelter/manifest';
import { experienceManifest as heatAppExperience, sceneManifest as heatAppScene }
  from '../scenes/heat-relief-app/manifest';
import { experienceManifest as familyBrainExperience, sceneManifest as familyBrainScene }
  from '../scenes/family-brain/manifest';

registerExperience(solarExperience, solarScene);
registerExperience(heatAppExperience, heatAppScene);
registerExperience(familyBrainExperience, familyBrainScene);

// ─── Public API ───────────────────────────────────────────────────────────────

export const SCENE_REGISTRY = _registry;

/** Look up a scene manifest by ID. Returns undefined if not found. */
export function getSceneManifest(id: string): SceneManifest | undefined {
  return _registry.get(id);
}

/** Returns all registered scene IDs */
export function listSceneIds(): string[] {
  return Array.from(_registry.keys());
}

/** Returns all registered manifests */
export function listSceneManifests(): SceneManifest[] {
  return Array.from(_registry.values());
}

/**
 * Register a scene manifest at runtime.
 * Prefer static imports above, but this is useful for testing.
 */
export function registerScene(manifest: SceneManifest): void {
  if (_registry.has(manifest.id)) {
    console.warn(
      `[experience-engine] Scene "${manifest.id}" is already registered. Overwriting.`
    );
  }
  _registry.set(manifest.id, manifest);
}

/** Remove a scene from the registry (testing only) */
export function unregisterScene(id: string): void {
  _registry.delete(id);
}
