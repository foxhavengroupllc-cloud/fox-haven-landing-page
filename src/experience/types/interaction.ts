/**
 * Interaction types for the Experience Engine.
 * Interaction modules are composable handlers attached to a scene.
 */

// ─── Interaction Event Types ──────────────────────────────────────────────────

export type InteractionEventType =
  | 'hover'
  | 'hover-end'
  | 'click'
  | 'drag-start'
  | 'drag'
  | 'drag-end'
  | 'pinch'
  | 'key-down'
  | 'key-up'
  | 'scroll-enter'   // element scrolled into viewport
  | 'scroll-leave';  // element scrolled out of viewport

// ─── Normalized Interaction Event ────────────────────────────────────────────

/**
 * All pointer/keyboard/scroll events are normalized to this shape
 * before being passed to interaction handlers.
 */
export interface InteractionEvent {
  type: InteractionEventType;
  /** Normalized pointer x position in scene space (0–1) */
  x: number;
  /** Normalized pointer y position in scene space (0–1) */
  y: number;
  /** Delta since last event (drag/scroll) */
  deltaX: number;
  deltaY: number;
  /** Pinch scale delta (pinch events only) */
  scaleDelta: number;
  /** Key pressed (key events only) */
  key?: string;
  /** Raw DOM event for cases where engine normalization is insufficient */
  originalEvent?: MouseEvent | TouchEvent | KeyboardEvent | WheelEvent;
  /** Timestamp (performance.now()) */
  timestamp: number;
}

// ─── Interaction Handler ──────────────────────────────────────────────────────

export type InteractionHandler = (event: InteractionEvent) => void;

// ─── Interaction Module ───────────────────────────────────────────────────────

/**
 * An interaction module is a composable unit of behavior attached to a scene.
 * Examples: ParallaxModule, HoverRevealModule, DragOrbitModule, ScrollProgressModule.
 *
 * Scene authors create modules by implementing this interface.
 * The InteractionManager orchestrates all active modules.
 */
export interface InteractionModule {
  /** Unique name for debugging */
  name: string;
  /** Event types this module handles */
  handles: InteractionEventType[];
  /**
   * Called by InteractionManager when a matching event occurs.
   * Return true to stop propagation to subsequent modules.
   */
  onEvent: (event: InteractionEvent) => boolean | void;
  /** Called when the interaction surface is mounted */
  onMount?: (surface: HTMLElement) => void;
  /** Called when the interaction surface is unmounted */
  onUnmount?: () => void;
  /** Called every animation frame, for modules that need continuous updates */
  onFrame?: (deltaTime: number) => void;
  /** Whether this module is currently active */
  enabled: boolean;
}

// ─── Interaction Config ───────────────────────────────────────────────────────

export interface InteractionConfig {
  /** Whether mouse/touch events are active at all */
  enabled: boolean;
  /** Whether pointer events on the surface should prevent page scroll */
  preventScroll: boolean;
  /** Whether to emit hover events (can be disabled for performance) */
  trackHover: boolean;
  /** Whether to emit keyboard events */
  trackKeyboard: boolean;
  /** Pointer move throttle in ms (0 = no throttle) */
  moveThrottleMs: number;
}
