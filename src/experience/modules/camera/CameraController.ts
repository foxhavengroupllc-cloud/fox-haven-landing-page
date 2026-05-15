/**
 * CameraController, manages camera state and user interaction for 3D scenes.
 *
 * Works independently of any specific 3D library.
 * Scene components apply the output state to their Three.js/R3F camera each frame.
 *
 * Supports orbit, first-person, fixed, guided, and cinematic modes.
 */

import type {
  CameraProfile,
  CameraState,
  CameraPosition,
  CameraTarget,
} from '../../types/camera';

export class CameraController {
  private profile: CameraProfile;
  private state: CameraState;

  // Pointer drag tracking
  private _isDragging = false;
  private _lastPointerX = 0;
  private _lastPointerY = 0;

  // Target state (we lerp toward these)
  private _targetPolarAngle: number;
  private _targetAzimuthAngle: number;
  private _targetDistance: number;
  private _targetPosition: CameraPosition;
  private _targetLookAt: CameraTarget;

  // Bound event handlers (for cleanup)
  private _onPointerDown: (e: PointerEvent) => void;
  private _onPointerMove: (e: PointerEvent) => void;
  private _onPointerUp: (e: PointerEvent) => void;
  private _onWheel: (e: WheelEvent) => void;
  private _surface: HTMLElement | null = null;

  constructor(profile: CameraProfile) {
    this.profile = { ...profile };

    // Initialize state from profile
    this._targetPolarAngle = Math.PI / 3; // 60° from top
    this._targetAzimuthAngle = 0;
    this._targetDistance = this._vectorLength(
      profile.initialPosition,
      profile.initialTarget
    );
    this._targetPosition = { ...profile.initialPosition };
    this._targetLookAt = { ...profile.initialTarget };

    this.state = {
      position: { ...profile.initialPosition },
      target: { ...profile.initialTarget },
      polarAngle: this._targetPolarAngle,
      azimuthAngle: this._targetAzimuthAngle,
      distance: this._targetDistance,
      isDragging: false,
    };

    // Bind event handlers
    this._onPointerDown = this._handlePointerDown.bind(this);
    this._onPointerMove = this._handlePointerMove.bind(this);
    this._onPointerUp = this._handlePointerUp.bind(this);
    this._onWheel = this._handleWheel.bind(this);
  }

  // ─── Attachment ───────────────────────────────────────────────────────────

  attach(surface: HTMLElement): void {
    this._surface = surface;
    if (this.profile.userControlEnabled) {
      surface.addEventListener('pointerdown', this._onPointerDown);
      surface.addEventListener('pointermove', this._onPointerMove);
      surface.addEventListener('pointerup', this._onPointerUp);
      surface.addEventListener('pointercancel', this._onPointerUp);
      surface.addEventListener('wheel', this._onWheel, { passive: false });
    }
  }

  detach(): void {
    if (!this._surface) return;
    this._surface.removeEventListener('pointerdown', this._onPointerDown);
    this._surface.removeEventListener('pointermove', this._onPointerMove);
    this._surface.removeEventListener('pointerup', this._onPointerUp);
    this._surface.removeEventListener('pointercancel', this._onPointerUp);
    this._surface.removeEventListener('wheel', this._onWheel);
    this._surface = null;
  }

  // ─── Per-frame Update ────────────────────────────────────────────────────

  /**
   * Call once per animation frame.
   * Returns the current camera state after lerping toward targets.
   */
  update(deltaTime: number): CameraState {
    const lf = Math.min(1, this.profile.lerpFactor * deltaTime * 60);
    void deltaTime;

    if (this.profile.mode === 'orbit') {
      // Auto-rotate when not dragging
      if (this.profile.autoRotateSpeed !== 0 && !this._isDragging) {
        this._targetAzimuthAngle += this.profile.autoRotateSpeed * (1 / 60);
      }

      // Lerp angles and distance
      this.state.polarAngle = this._lerp(this.state.polarAngle, this._targetPolarAngle, lf);
      this.state.azimuthAngle = this._lerp(this.state.azimuthAngle, this._targetAzimuthAngle, lf);
      this.state.distance = this._lerp(this.state.distance, this._targetDistance, lf);

      // Convert spherical to Cartesian
      const { target } = this.state;
      const r = this.state.distance;
      const phi = this.state.polarAngle;
      const theta = this.state.azimuthAngle;
      this.state.position = {
        x: target.x + r * Math.sin(phi) * Math.sin(theta),
        y: target.y + r * Math.cos(phi),
        z: target.z + r * Math.sin(phi) * Math.cos(theta),
      };
    } else {
      // Fixed / guided / cinematic: lerp position and target directly
      this.state.position = this._lerpVec(
        this.state.position,
        this._targetPosition,
        lf
      );
      this.state.target = this._lerpVec(
        this.state.target,
        this._targetLookAt,
        lf
      );
    }

    this.state.isDragging = this._isDragging;
    return { ...this.state };
  }

  // ─── Programmatic Controls ───────────────────────────────────────────────

  /** Move camera to a position (with lerp) */
  moveTo(position: CameraPosition, target?: CameraTarget): void {
    this._targetPosition = { ...position };
    if (target) this._targetLookAt = { ...target };
  }

  /** Set orbit distance (with lerp) */
  setDistance(distance: number): void {
    const { minDistance = 1, maxDistance = 100 } = this.profile.constraints ?? {};
    this._targetDistance = Math.max(minDistance, Math.min(maxDistance, distance));
  }

  /** Set orbit angles (with lerp) */
  setAngles(polar: number, azimuth: number): void {
    this._applyConstraints(polar, azimuth);
  }

  // ─── Pointer Handlers ─────────────────────────────────────────────────────

  private _handlePointerDown(e: PointerEvent): void {
    if (!this.profile.userControlEnabled) return;
    this._isDragging = true;
    this._lastPointerX = e.clientX;
    this._lastPointerY = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  private _handlePointerMove(e: PointerEvent): void {
    if (!this._isDragging || !this.profile.userControlEnabled) return;
    const dx = e.clientX - this._lastPointerX;
    const dy = e.clientY - this._lastPointerY;
    this._lastPointerX = e.clientX;
    this._lastPointerY = e.clientY;

    if (this.profile.mode === 'orbit') {
      const sensitivity = 0.005;
      this._applyConstraints(
        this._targetPolarAngle + dy * sensitivity,
        this._targetAzimuthAngle + dx * sensitivity
      );
    }
  }

  private _handlePointerUp(): void {
    this._isDragging = false;
  }

  private _handleWheel(e: WheelEvent): void {
    if (!this.profile.userControlEnabled || this.profile.constraints?.lockZoom) return;
    e.preventDefault();
    const delta = e.deltaY * 0.01;
    this.setDistance(this._targetDistance + delta);
  }

  // ─── Utils ────────────────────────────────────────────────────────────────

  private _applyConstraints(polar: number, azimuth: number): void {
    const c = this.profile.constraints;
    this._targetPolarAngle = c
      ? Math.max(c.minPolarAngle ?? 0.1, Math.min(c.maxPolarAngle ?? Math.PI - 0.1, polar))
      : Math.max(0.1, Math.min(Math.PI - 0.1, polar));
    this._targetAzimuthAngle = c
      ? Math.max(c.minAzimuthAngle ?? -Infinity, Math.min(c.maxAzimuthAngle ?? Infinity, azimuth))
      : azimuth;
  }

  private _lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  private _lerpVec(
    a: CameraPosition,
    b: CameraPosition,
    t: number
  ): CameraPosition {
    return {
      x: this._lerp(a.x, b.x, t),
      y: this._lerp(a.y, b.y, t),
      z: this._lerp(a.z, b.z, t),
    };
  }

  private _vectorLength(a: CameraPosition, b: CameraTarget): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz) || 5;
  }
}
