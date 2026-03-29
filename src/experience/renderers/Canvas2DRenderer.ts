/**
 * Canvas2DRenderer — base class for Standard-tier scenes using HTML5 Canvas 2D.
 *
 * Scene authors extend this class to build their Standard-tier scene.
 * The renderer handles canvas sizing, DPR scaling, RAF loop management,
 * visibility-based pausing, and FPS watchdog integration.
 *
 * Usage:
 *   class MyScene extends Canvas2DRenderer {
 *     protected draw(ctx: CanvasRenderingContext2D, dt: number): void {
 *       ctx.fillStyle = 'red'
 *       ctx.fillRect(0, 0, this.width, this.height)
 *     }
 *   }
 *   const renderer = new MyScene(canvas, { dpr: 2 })
 *   renderer.start()
 */

import { FPSWatchdog } from '../utils/fpsWatchdog';
import type { FPSWatchdogConfig } from '../types/performance';
import { DEFAULT_FPS_WATCHDOG } from '../types/performance';

export interface Canvas2DRendererOptions {
  /** Device pixel ratio for high-DPI screens (default: window.devicePixelRatio) */
  dpr?: number;
  /** FPS watchdog config — pass enabled:false to disable */
  watchdog?: Partial<FPSWatchdogConfig>;
  /** Called when FPS watchdog triggers a downgrade */
  onDowngrade?: () => void;
}

export abstract class Canvas2DRenderer {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected dpr: number;

  /** CSS logical width of the canvas */
  protected width = 0;
  /** CSS logical height of the canvas */
  protected height = 0;

  private _rafId: number | null = null;
  private _running = false;
  private _lastTime = 0;
  private _watchdog: FPSWatchdog;
  private _resizeObserver: ResizeObserver;

  constructor(canvas: HTMLCanvasElement, options: Canvas2DRendererOptions = {}) {
    this.canvas = canvas;
    this.dpr = options.dpr ?? Math.min(window.devicePixelRatio || 1, 2);

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas2DRenderer: Failed to get 2D context');
    this.ctx = ctx;

    this._watchdog = new FPSWatchdog(
      { ...DEFAULT_FPS_WATCHDOG, ...(options.watchdog ?? {}) },
      () => options.onDowngrade?.()
    );

    this._resizeObserver = new ResizeObserver(() => this._handleResize());
    this._resizeObserver.observe(canvas);
    this._handleResize();
  }

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  start(): void {
    if (this._running) return;
    this._running = true;
    this._lastTime = performance.now();
    this._watchdog.start();
    this.onStart();
    this._rafId = requestAnimationFrame(this._loop.bind(this));
  }

  pause(): void {
    if (!this._running) return;
    this._running = false;
    this._watchdog.stop();
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  resume(): void {
    if (this._running) return;
    this._lastTime = performance.now();
    this.start();
  }

  destroy(): void {
    this.pause();
    this._resizeObserver.disconnect();
    this._watchdog.stop();
    this.onDestroy();
  }

  get isRunning(): boolean {
    return this._running;
  }

  // ─── Override Points ──────────────────────────────────────────────────────

  /** Called once before the first frame */
  protected onStart(): void {}

  /**
   * Called every frame. Override this in your scene class.
   * @param ctx - The 2D rendering context (pre-scaled for DPR)
   * @param dt  - Delta time in seconds since the last frame
   */
  protected abstract draw(ctx: CanvasRenderingContext2D, dt: number): void;

  /** Called when the renderer is destroyed */
  protected onDestroy(): void {}

  /** Called when the canvas is resized */
  protected onResize(width: number, height: number): void {
    void width;
    void height;
  }

  // ─── Internal ─────────────────────────────────────────────────────────────

  private _loop(timestamp: number): void {
    if (!this._running) return;

    const dt = Math.min((timestamp - this._lastTime) / 1000, 0.1); // cap at 100ms
    this._lastTime = timestamp;

    this._watchdog.tick();

    // Clear
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw
    this.draw(this.ctx, dt);

    this._rafId = requestAnimationFrame(this._loop.bind(this));
  }

  private _handleResize(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.onResize(this.width, this.height);
  }
}
