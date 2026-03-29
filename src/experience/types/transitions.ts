/**
 * Transition types for the Experience Engine.
 * Transitions govern how scenes enter and exit.
 */

// ─── Transition Direction ─────────────────────────────────────────────────────

export type TransitionDirection = 'enter' | 'exit';

// ─── Transition Style ─────────────────────────────────────────────────────────

export type TransitionStyle =
  | 'fade'          // Opacity 0→1 or 1→0
  | 'slide-up'      // Translate Y + fade
  | 'slide-down'
  | 'zoom-in'       // Scale + fade
  | 'zoom-out'
  | 'iris'          // Circular reveal/close
  | 'none';         // Instant, no animation

// ─── Easing ───────────────────────────────────────────────────────────────────

export type TransitionEasing =
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'spring';       // Physics-based (cubic-bezier approximation)

// ─── Transition Profile ───────────────────────────────────────────────────────

/**
 * Defines how a scene enters and exits.
 * Applied by TransitionManager at mount/unmount time.
 */
export interface TransitionProfile {
  enter: TransitionConfig;
  exit: TransitionConfig;
}

export interface TransitionConfig {
  style: TransitionStyle;
  /** Duration in milliseconds */
  duration: number;
  /** Delay before transition starts, in milliseconds */
  delay: number;
  easing: TransitionEasing;
  /** Custom cubic-bezier for 'spring' easing: [x1, y1, x2, y2] */
  springCurve?: [number, number, number, number];
}

// ─── Transition State ─────────────────────────────────────────────────────────

export type TransitionState =
  | 'idle'
  | 'entering'
  | 'entered'
  | 'exiting'
  | 'exited';

// ─── Default Profiles ─────────────────────────────────────────────────────────

export const DEFAULT_ENTER_TRANSITION: TransitionConfig = {
  style: 'fade',
  duration: 600,
  delay: 0,
  easing: 'ease-out',
};

export const DEFAULT_EXIT_TRANSITION: TransitionConfig = {
  style: 'fade',
  duration: 400,
  delay: 0,
  easing: 'ease-in',
};

export const DEFAULT_TRANSITION_PROFILE: TransitionProfile = {
  enter: DEFAULT_ENTER_TRANSITION,
  exit: DEFAULT_EXIT_TRANSITION,
};

export const INSTANT_TRANSITION_PROFILE: TransitionProfile = {
  enter: { style: 'none', duration: 0, delay: 0, easing: 'linear' },
  exit:  { style: 'none', duration: 0, delay: 0, easing: 'linear' },
};
