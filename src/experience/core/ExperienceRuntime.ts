/**
 * ExperienceRuntime — singleton that tracks all active scene instances.
 *
 * Responsibilities:
 * - Maintains a registry of all mounted SceneLifecycleManagers
 * - Provides a global pause/resume mechanism (e.g., during route transitions)
 * - Exposes engine diagnostics in development
 *
 * Usage:
 *   const runtime = ExperienceRuntime.getInstance();
 *   runtime.pauseAll();
 *   runtime.resumeAll();
 */

import { SceneLifecycleManager } from './SceneLifecycleManager';

export class ExperienceRuntime {
  private static _instance: ExperienceRuntime | null = null;

  private _scenes = new Map<string, SceneLifecycleManager>();
  private _instanceCounter = 0;

  private constructor() {
    if (process.env.NODE_ENV === 'development') {
      // Expose on window for debugging
      if (typeof window !== 'undefined') {
        (window as Window & { __foxhavenRuntime?: ExperienceRuntime }).__foxhavenRuntime = this;
      }
    }
  }

  static getInstance(): ExperienceRuntime {
    if (!ExperienceRuntime._instance) {
      ExperienceRuntime._instance = new ExperienceRuntime();
    }
    return ExperienceRuntime._instance;
  }

  // ─── Scene Management ──────────────────────────────────────────────────────

  /**
   * Create and register a new SceneLifecycleManager.
   * Returns the manager and a unique instance key.
   */
  mountScene(sceneId: string): { manager: SceneLifecycleManager; instanceKey: string } {
    const instanceKey = `${sceneId}::${++this._instanceCounter}`;
    const manager = new SceneLifecycleManager(sceneId);
    this._scenes.set(instanceKey, manager);
    return { manager, instanceKey };
  }

  /**
   * Destroy and unregister a scene instance.
   * Called by SceneHost on unmount.
   */
  unmountScene(instanceKey: string): void {
    const manager = this._scenes.get(instanceKey);
    if (manager) {
      manager.destroy();
      this._scenes.delete(instanceKey);
    }
  }

  // ─── Global Controls ───────────────────────────────────────────────────────

  /** Pause all running scenes */
  pauseAll(): void {
    this._scenes.forEach((manager) => {
      if (manager.isRunning) manager.setPaused();
    });
  }

  /** Resume all paused scenes */
  resumeAll(): void {
    this._scenes.forEach((manager) => {
      if (manager.state === 'paused') manager.setResumed();
    });
  }

  // ─── Diagnostics ──────────────────────────────────────────────────────────

  get activeSceneCount(): number {
    return this._scenes.size;
  }

  get runningScenes(): string[] {
    const running: string[] = [];
    this._scenes.forEach((manager, key) => {
      if (manager.isRunning) running.push(key);
    });
    return running;
  }

  /** Returns a diagnostic snapshot for dev tools */
  getDiagnostics(): object {
    const scenes: Record<string, string> = {};
    this._scenes.forEach((manager, key) => {
      scenes[key] = manager.state;
    });
    return {
      totalMounted: this._scenes.size,
      scenes,
    };
  }

  /** Reset the singleton — for testing only */
  static reset(): void {
    ExperienceRuntime._instance = null;
  }
}
