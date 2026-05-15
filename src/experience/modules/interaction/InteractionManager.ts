/**
 * InteractionManager, orchestrates multiple InteractionModules on a surface element.
 *
 * Normalizes pointer, touch, keyboard, and wheel events into InteractionEvents,
 * then dispatches them to all registered modules in order.
 *
 * Usage:
 *   const manager = new InteractionManager(config)
 *   manager.addModule(new MyParallaxModule())
 *   manager.attach(surfaceElement)
 *   // In RAF loop:
 *   manager.tick(deltaTime)
 *   // On cleanup:
 *   manager.detach()
 */

import type {
  InteractionModule,
  InteractionEvent,
  InteractionEventType,
  InteractionConfig,
} from '../../types/interaction';

const DEFAULT_CONFIG: InteractionConfig = {
  enabled: true,
  preventScroll: false,
  trackHover: true,
  trackKeyboard: false,
  moveThrottleMs: 0,
};

export class InteractionManager {
  private config: InteractionConfig;
  private modules: InteractionModule[] = [];
  private surface: HTMLElement | null = null;

  // Pointer state
  private _pointerX = 0;
  private _pointerY = 0;
  private _isDragging = false;
  private _dragStartX = 0;
  private _dragStartY = 0;
  private _lastMoveTime = 0;

  // Bound listeners (for cleanup)
  private _handlers: Array<[string, EventListener]> = [];

  constructor(config: Partial<InteractionConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ─── Module Management ────────────────────────────────────────────────────

  addModule(module: InteractionModule): void {
    this.modules.push(module);
    if (this.surface) module.onMount?.(this.surface);
  }

  removeModule(name: string): void {
    const idx = this.modules.findIndex((m) => m.name === name);
    if (idx !== -1) {
      this.modules[idx].onUnmount?.();
      this.modules.splice(idx, 1);
    }
  }

  getModule<T extends InteractionModule>(name: string): T | undefined {
    return this.modules.find((m) => m.name === name) as T | undefined;
  }

  // ─── Attachment ───────────────────────────────────────────────────────────

  attach(element: HTMLElement): void {
    this.detach(); // Clean up any previous attachment
    this.surface = element;

    const on = (type: string, handler: EventListener, opts?: AddEventListenerOptions) => {
      element.addEventListener(type, handler, opts);
      this._handlers.push([type, handler]);
    };

    if (this.config.enabled) {
      on('pointermove', this._onPointerMove.bind(this) as EventListener);
      on('pointerdown', this._onPointerDown.bind(this) as EventListener);
      on('pointerup', this._onPointerUp.bind(this) as EventListener);
      on('pointerleave', this._onPointerLeave.bind(this) as EventListener);
      on('click', this._onClick.bind(this) as EventListener);

      if (this.config.preventScroll) {
        on('wheel', ((e: WheelEvent) => e.preventDefault()) as EventListener, { passive: false });
      }

      if (this.config.trackKeyboard) {
        const kd = this._onKeyDown.bind(this) as EventListener;
        const ku = this._onKeyUp.bind(this) as EventListener;
        window.addEventListener('keydown', kd);
        window.addEventListener('keyup', ku);
        this._handlers.push(['__window_keydown', kd]);
        this._handlers.push(['__window_keyup', ku]);
      }
    }

    this.modules.forEach((m) => m.onMount?.(element));
  }

  detach(): void {
    if (!this.surface) return;

    this._handlers.forEach(([type, handler]) => {
      if (type.startsWith('__window_')) {
        const eventType = type.replace('__window_', '');
        window.removeEventListener(eventType, handler);
      } else {
        this.surface!.removeEventListener(type, handler);
      }
    });
    this._handlers = [];

    this.modules.forEach((m) => m.onUnmount?.());
    this.surface = null;
  }

  // ─── Per-frame Tick ───────────────────────────────────────────────────────

  tick(deltaTime: number): void {
    this.modules.forEach((m) => {
      if (m.enabled && m.onFrame) {
        m.onFrame(deltaTime);
      }
    });
  }

  // ─── Event Normalization ──────────────────────────────────────────────────

  private _normalizePointer(e: PointerEvent, type: InteractionEventType): InteractionEvent {
    const rect = this.surface!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    return {
      type,
      x,
      y,
      deltaX: 0,
      deltaY: 0,
      scaleDelta: 0,
      originalEvent: e,
      timestamp: performance.now(),
    };
  }

  private _dispatch(event: InteractionEvent): void {
    for (const module of this.modules) {
      if (!module.enabled) continue;
      if (!module.handles.includes(event.type)) continue;
      const stop = module.onEvent(event);
      if (stop === true) break;
    }
  }

  // ─── Event Handlers ───────────────────────────────────────────────────────

  private _onPointerMove(e: PointerEvent): void {
    if (!this.config.trackHover) return;

    const now = performance.now();
    if (this.config.moveThrottleMs > 0 && now - this._lastMoveTime < this.config.moveThrottleMs) {
      return;
    }
    this._lastMoveTime = now;

    const rect = this.surface!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const dx = x - this._pointerX;
    const dy = y - this._pointerY;
    this._pointerX = x;
    this._pointerY = y;

    if (this._isDragging) {
      this._dispatch({
        type: 'drag',
        x,
        y,
        deltaX: dx,
        deltaY: dy,
        scaleDelta: 0,
        originalEvent: e,
        timestamp: now,
      });
    } else {
      this._dispatch({
        type: 'hover',
        x,
        y,
        deltaX: dx,
        deltaY: dy,
        scaleDelta: 0,
        originalEvent: e,
        timestamp: now,
      });
    }
  }

  private _onPointerDown(e: PointerEvent): void {
    this._isDragging = true;
    this._dragStartX = this._pointerX;
    this._dragStartY = this._pointerY;
    this._dispatch(this._normalizePointer(e, 'drag-start'));
  }

  private _onPointerUp(e: PointerEvent): void {
    if (this._isDragging) {
      this._isDragging = false;
      this._dispatch(this._normalizePointer(e, 'drag-end'));
    }
    void this._dragStartX;
    void this._dragStartY;
  }

  private _onPointerLeave(e: PointerEvent): void {
    this._isDragging = false;
    this._dispatch(this._normalizePointer(e, 'hover-end'));
  }

  private _onClick(e: MouseEvent): void {
    const rect = this.surface!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    this._dispatch({
      type: 'click',
      x,
      y,
      deltaX: 0,
      deltaY: 0,
      scaleDelta: 0,
      originalEvent: e as unknown as MouseEvent,
      timestamp: performance.now(),
    });
  }

  private _onKeyDown(e: KeyboardEvent): void {
    this._dispatch({
      type: 'key-down',
      x: this._pointerX,
      y: this._pointerY,
      deltaX: 0,
      deltaY: 0,
      scaleDelta: 0,
      key: e.key,
      originalEvent: e,
      timestamp: performance.now(),
    });
  }

  private _onKeyUp(e: KeyboardEvent): void {
    this._dispatch({
      type: 'key-up',
      x: this._pointerX,
      y: this._pointerY,
      deltaX: 0,
      deltaY: 0,
      scaleDelta: 0,
      key: e.key,
      originalEvent: e,
      timestamp: performance.now(),
    });
  }
}
