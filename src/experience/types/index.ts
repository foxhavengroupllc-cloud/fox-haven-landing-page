/**
 * Public type exports for the Fox Haven Experience Engine.
 * Import from '@/experience/types' in engine consumers.
 */

export type {
  DeviceTier,
  MountType,
  SceneState,
  ReducedMotionBehavior,
  AssetFile,
  AssetManifest,
  SceneManifest,
  SceneProps,
  FallbackProps,
  FallbackReason,
  SceneHostProps,
} from './core';

export type {
  CameraMode,
  CameraConstraints,
  CameraPosition,
  CameraTarget,
  CameraProfile,
  CameraState,
} from './camera';

export type {
  InteractionEventType,
  InteractionEvent,
  InteractionHandler,
  InteractionModule,
  InteractionConfig,
} from './interaction';

export type {
  TransitionDirection,
  TransitionStyle,
  TransitionEasing,
  TransitionProfile,
  TransitionConfig,
  TransitionState,
} from './transitions';

export {
  DEFAULT_ENTER_TRANSITION,
  DEFAULT_EXIT_TRANSITION,
  DEFAULT_TRANSITION_PROFILE,
  INSTANT_TRANSITION_PROFILE,
} from './transitions';

export type {
  RenderMode,
  PerformanceProfile,
  FPSWatchdogConfig,
} from './performance';

export {
  DEFAULT_FPS_WATCHDOG,
  PERFORMANCE_PROFILES,
  getPerformanceProfile,
} from './performance';
