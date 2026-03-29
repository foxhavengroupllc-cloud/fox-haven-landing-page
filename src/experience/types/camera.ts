/**
 * Camera types for the Experience Engine.
 * Used by CameraController in full-experience and card-panel scenes.
 */

// ─── Camera Mode ──────────────────────────────────────────────────────────────

export type CameraMode =
  | 'fixed'          // Static camera, no user control
  | 'orbit'          // Orbits around a focal point (mouse-driven)
  | 'first-person'   // WASD/pointer-lock first-person
  | 'guided'         // Engine drives camera along a path, user can look around
  | 'cinematic';     // Engine-driven only, no user control (scripted sequence)

// ─── Camera Constraints ───────────────────────────────────────────────────────

export interface CameraConstraints {
  /** Minimum polar angle in radians (0 = top, Math.PI = bottom) */
  minPolarAngle?: number;
  /** Maximum polar angle in radians */
  maxPolarAngle?: number;
  /** Minimum azimuth angle in radians */
  minAzimuthAngle?: number;
  /** Maximum azimuth angle in radians */
  maxAzimuthAngle?: number;
  /** Minimum zoom distance */
  minDistance?: number;
  /** Maximum zoom distance */
  maxDistance?: number;
  /** If true, user cannot zoom at all */
  lockZoom?: boolean;
  /** If true, user cannot rotate at all */
  lockRotation?: boolean;
}

// ─── Camera Position ──────────────────────────────────────────────────────────

export interface CameraPosition {
  x: number;
  y: number;
  z: number;
}

export interface CameraTarget {
  x: number;
  y: number;
  z: number;
}

// ─── Camera Profile ───────────────────────────────────────────────────────────

/**
 * Defines the camera behavior for a scene.
 * Referenced by SceneManifest and applied by CameraController.
 */
export interface CameraProfile {
  mode: CameraMode;
  /** Initial camera world position */
  initialPosition: CameraPosition;
  /** Point the camera looks at initially */
  initialTarget: CameraTarget;
  /** Field of view in degrees */
  fov: number;
  /** Near clipping plane */
  near: number;
  /** Far clipping plane */
  far: number;
  /** Lerp factor for smooth camera movement (0–1, lower = smoother) */
  lerpFactor: number;
  /** Auto-rotation speed in radians/second (orbit mode only, 0 = off) */
  autoRotateSpeed: number;
  constraints?: CameraConstraints;
  /** Whether user input is active (can be toggled at runtime) */
  userControlEnabled: boolean;
}

// ─── Camera State ─────────────────────────────────────────────────────────────

/** Runtime camera state managed by CameraController */
export interface CameraState {
  position: CameraPosition;
  target: CameraTarget;
  /** Current polar angle (orbit mode) */
  polarAngle: number;
  /** Current azimuth angle (orbit mode) */
  azimuthAngle: number;
  /** Current zoom distance (orbit mode) */
  distance: number;
  isDragging: boolean;
}
