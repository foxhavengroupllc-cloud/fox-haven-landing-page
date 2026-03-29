/**
 * Fox Haven Experience Engine — Public API
 *
 * Import engine components and utilities from '@/experience'.
 *
 * Page-level code typically only needs:
 *   - TierProvider (wrap your page or layout)
 *   - SceneHost (mount a scene in a section)
 *   - ImmersiveLayout (for /initiatives/* pages)
 *
 * Scene authors additionally use:
 *   - SceneManifest type
 *   - SceneProps / FallbackProps types
 *   - useScene hook
 *   - CanvasContainer / SceneCanvas
 *   - Canvas2DRenderer base class
 *   - CameraController
 *   - InteractionManager
 *   - TransitionManager
 *   - FPSWatchdog
 */

// ─── Core ─────────────────────────────────────────────────────────────────────
export { SceneHost } from './core/SceneHost';
export { TierProvider, useDeviceTier, useTierContext } from './core/TierContext';
export { ExperienceRuntime } from './core/ExperienceRuntime';
export { SCENE_REGISTRY, getSceneManifest, registerScene, listSceneIds } from './core/registry';
export { SceneLifecycleManager } from './core/SceneLifecycleManager';

// ─── Shared ───────────────────────────────────────────────────────────────────
export { SceneErrorBoundary } from './shared/SceneErrorBoundary';
export { CanvasContainer, SceneCanvas } from './shared/CanvasContainer';
export { ImmersiveLayout } from './shared/ImmersiveLayout';
export { useScene } from './shared/useScene';

// ─── Modules ──────────────────────────────────────────────────────────────────
export { CameraController } from './modules/camera/CameraController';
export { InteractionManager } from './modules/interaction/InteractionManager';
export { TransitionManager } from './modules/transitions/TransitionManager';

// ─── Renderers ────────────────────────────────────────────────────────────────
export { Canvas2DRenderer } from './renderers/Canvas2DRenderer';
export { selectRenderMode, create2DContext, createWebGL2Context } from './renderers/RenderMode';

// ─── Utils ────────────────────────────────────────────────────────────────────
export { getDeviceTier, assignDeviceTier, probeWebGL, probeGPUScore } from './utils/capability';
export { useReducedMotion, getReducedMotion, setUserReduceMotion } from './utils/reducedMotion';
export { loadAssetManifest, isAssetCached, clearAssetCache } from './utils/assetLoader';
export { emitSceneEvent, emitTierAssigned } from './utils/analytics';
export { FPSWatchdog } from './utils/fpsWatchdog';
export { SceneError, SceneNotFoundError, SceneAssetError, SceneChunkError, SceneRenderError, isSceneError } from './utils/errors';

// ─── Types ────────────────────────────────────────────────────────────────────
export type {
  DeviceTier,
  MountType,
  SceneState,
  ReducedMotionBehavior,
  SceneManifest,
  SceneProps,
  FallbackProps,
  FallbackReason,
  SceneHostProps,
  AssetManifest,
  AssetFile,
} from './types/core';

export type {
  CameraProfile,
  CameraMode,
  CameraConstraints,
  CameraState,
} from './types/camera';

export type {
  InteractionModule,
  InteractionEvent,
  InteractionConfig,
} from './types/interaction';

export type {
  TransitionProfile,
  TransitionConfig,
  TransitionStyle,
} from './types/transitions';

export type {
  RenderMode,
  PerformanceProfile,
  FPSWatchdogConfig,
} from './types/performance';

export {
  DEFAULT_TRANSITION_PROFILE,
  INSTANT_TRANSITION_PROFILE,
  DEFAULT_FPS_WATCHDOG,
  PERFORMANCE_PROFILES,
  getPerformanceProfile,
} from './types/index';

// ─── Authoring System ─────────────────────────────────────────────────────────
export {
  validateExperienceManifest,
  assertValidManifest,
  formatValidationResult,
  checkExperienceCompleteness,
  formatCompletenessReport,
  registerExperience,
  registerExperienceForced,
  checkIntegrationEligibility,
  IntegrationBlockedError,
} from './authoring/index';

export type {
  ExperienceManifest,
  ExperienceStatus,
  AudienceProfile,
  NarrativeModel,
  EmotionalArc,
  CTAGoal,
  VisualStyle,
  EnvironmentSpec,
  RequiredModule,
  AssetRequirement,
  AssetType,
  FallbackMode,
  ValidationResult,
  ValidationIssue,
  CompletenessReport,
  IntegrationResult,
} from './authoring/index';
