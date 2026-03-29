/**
 * FPS Watchdog for the Experience Engine.
 * Monitors frame rate during scene rendering and triggers a downgrade
 * callback if FPS drops below the configured threshold for too long.
 *
 * Usage:
 *   const watchdog = new FPSWatchdog(config, () => onDowngrade())
 *   watchdog.start()
 *   // Inside your RAF loop:
 *   watchdog.tick()
 *   // On cleanup:
 *   watchdog.stop()
 */

import type { FPSWatchdogConfig } from '../types/performance';
import { DEFAULT_FPS_WATCHDOG } from '../types/performance';

export class FPSWatchdog {
  private config: FPSWatchdogConfig;
  private onDowngrade: () => void;

  private frameCount = 0;
  private lowFPSCount = 0;
  private lastTime = 0;
  private running = false;
  private triggered = false;

  /** Rolling FPS over the last N frames */
  private recentFPS = 0;

  constructor(
    config: Partial<FPSWatchdogConfig> = {},
    onDowngrade: () => void
  ) {
    this.config = { ...DEFAULT_FPS_WATCHDOG, ...config };
    this.onDowngrade = onDowngrade;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.triggered = false;
    this.frameCount = 0;
    this.lowFPSCount = 0;
    this.lastTime = performance.now();
  }

  stop(): void {
    this.running = false;
  }

  reset(): void {
    this.frameCount = 0;
    this.lowFPSCount = 0;
    this.triggered = false;
    this.lastTime = performance.now();
  }

  /**
   * Call once per animation frame.
   * Returns the instantaneous FPS at this frame.
   */
  tick(): number {
    if (!this.running || !this.config.enabled || this.triggered) return 0;

    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;
    this.frameCount++;

    const fps = delta > 0 ? 1000 / delta : 60;
    this.recentFPS = fps;

    // Ignore grace period
    if (this.frameCount <= this.config.gracePeriodFrames) {
      return fps;
    }

    if (fps < this.config.lowFPSThreshold) {
      this.lowFPSCount++;
    } else {
      // Recover slowly
      this.lowFPSCount = Math.max(
        0,
        this.lowFPSCount - this.config.recoveryRate
      );
    }

    if (this.lowFPSCount >= this.config.consecutiveFramesBeforeDowngrade) {
      this.triggered = true;
      this.running = false;
      this.onDowngrade();
    }

    return fps;
  }

  get currentFPS(): number {
    return this.recentFPS;
  }

  get isRunning(): boolean {
    return this.running;
  }

  get hasTriggered(): boolean {
    return this.triggered;
  }
}
