/**
 * SceneLifecycleManager — state machine for a single mounted scene instance.
 *
 * States:
 *   unregistered → loading → ready → running → paused → destroyed
 *                    ↓                  ↓         ↓
 *                  error              error     error
 *                    ↓                  ↓         ↓
 *                 fallback           fallback  fallback
 *
 * One manager instance per mounted SceneHost.
 */

import type { SceneState, FallbackReason } from '../types/core';
import { emitSceneEvent } from '../utils/analytics';

// ─── Event Map ────────────────────────────────────────────────────────────────

type LifecycleEventMap = {
  stateChange: { from: SceneState; to: SceneState };
  fallback: { reason: FallbackReason };
  error: { error: Error };
};

type LifecycleListener<K extends keyof LifecycleEventMap> = (
  payload: LifecycleEventMap[K]
) => void;

// ─── Manager ──────────────────────────────────────────────────────────────────

export class SceneLifecycleManager {
  readonly sceneId: string;
  private _state: SceneState = 'unregistered';
  private _listeners = new Map<string, Set<(...args: unknown[]) => void>>();
  private _visibilityHandler: (() => void) | null = null;

  constructor(sceneId: string) {
    this.sceneId = sceneId;
    this._attachVisibilityListener();
  }

  // ─── State ──────────────────────────────────────────────────────────────────

  get state(): SceneState {
    return this._state;
  }

  get isRunning(): boolean {
    return this._state === 'running';
  }

  get isFallback(): boolean {
    return this._state === 'fallback';
  }

  // ─── Transitions ────────────────────────────────────────────────────────────

  setLoading(): void {
    this._transition('loading');
    emitSceneEvent('scene:loading', { sceneId: this.sceneId });
  }

  setReady(): void {
    this._transition('ready');
  }

  setRunning(timings?: { loadTimeMs?: number; firstFrameMs?: number }): void {
    this._transition('running');
    emitSceneEvent('scene:loaded', {
      sceneId: this.sceneId,
      ...timings,
    });
  }

  setPaused(): void {
    if (this._state !== 'running') return;
    this._transition('paused');
    emitSceneEvent('scene:paused', { sceneId: this.sceneId });
  }

  setResumed(): void {
    if (this._state !== 'paused') return;
    this._transition('running');
    emitSceneEvent('scene:resumed', { sceneId: this.sceneId });
  }

  setFallback(reason: FallbackReason, sourceError?: Error): void {
    const prev = this._state;
    this._transition('fallback');
    emitSceneEvent('scene:fallback', {
      sceneId: this.sceneId,
      fallbackReason: reason,
      error: sourceError?.message,
    });
    this._emit('fallback', { reason });
    void prev; // suppress unused warning
  }

  setError(error: Error, reason: FallbackReason = 'scene-error'): void {
    this._transition('error');
    emitSceneEvent('scene:error', {
      sceneId: this.sceneId,
      error: error.message,
      fallbackReason: reason,
    });
    this._emit('error', { error });
    // Automatically transition to fallback after an error
    this.setFallback(reason, error);
  }

  destroy(): void {
    this._detachVisibilityListener();
    this._transition('destroyed');
    emitSceneEvent('scene:destroyed', { sceneId: this.sceneId });
    this._listeners.clear();
  }

  // ─── Event Emitter ──────────────────────────────────────────────────────────

  on<K extends keyof LifecycleEventMap>(
    event: K,
    listener: LifecycleListener<K>
  ): () => void {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    const set = this._listeners.get(event)!;
    set.add(listener as (...args: unknown[]) => void);

    return () => {
      set.delete(listener as (...args: unknown[]) => void);
    };
  }

  // ─── Internal ───────────────────────────────────────────────────────────────

  private _transition(to: SceneState): void {
    const from = this._state;
    this._state = to;
    this._emit('stateChange', { from, to });
  }

  private _emit<K extends keyof LifecycleEventMap>(
    event: K,
    payload: LifecycleEventMap[K]
  ): void {
    const set = this._listeners.get(event);
    if (!set) return;
    set.forEach((listener) => {
      try {
        (listener as LifecycleListener<K>)(payload);
      } catch (e) {
        console.error('[SceneLifecycleManager] Listener error:', e);
      }
    });
  }

  private _attachVisibilityListener(): void {
    if (typeof document === 'undefined') return;
    this._visibilityHandler = () => {
      if (document.visibilityState === 'hidden') {
        this.setPaused();
      } else if (document.visibilityState === 'visible') {
        this.setResumed();
      }
    };
    document.addEventListener('visibilitychange', this._visibilityHandler);
  }

  private _detachVisibilityListener(): void {
    if (this._visibilityHandler) {
      document.removeEventListener('visibilitychange', this._visibilityHandler);
      this._visibilityHandler = null;
    }
  }
}
