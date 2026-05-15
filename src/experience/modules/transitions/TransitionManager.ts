/**
 * TransitionManager, applies CSS-based entry and exit transitions to a scene container.
 *
 * Works by manipulating CSS custom properties and class names on the container element.
 * Does not depend on any animation library.
 *
 * Usage:
 *   const tm = new TransitionManager(profile, containerElement)
 *   await tm.enter()
 *   // ... scene runs ...
 *   await tm.exit()
 *   tm.destroy()
 */

import type { TransitionProfile, TransitionConfig, TransitionState } from '../../types/transitions';
import { DEFAULT_TRANSITION_PROFILE, INSTANT_TRANSITION_PROFILE } from '../../types/transitions';

export class TransitionManager {
  private profile: TransitionProfile;
  private container: HTMLElement;
  private _state: TransitionState = 'idle';

  constructor(
    profile: TransitionProfile = DEFAULT_TRANSITION_PROFILE,
    container: HTMLElement
  ) {
    this.profile = profile;
    this.container = container;
    this._applyBaseStyles();
  }

  get state(): TransitionState {
    return this._state;
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  /** Play the entry transition. Resolves when complete. */
  async enter(reducedMotion = false): Promise<void> {
    const config = reducedMotion
      ? INSTANT_TRANSITION_PROFILE.enter
      : this.profile.enter;

    this._state = 'entering';
    await this._playTransition(config, 'enter');
    this._state = 'entered';
  }

  /** Play the exit transition. Resolves when complete. */
  async exit(reducedMotion = false): Promise<void> {
    const config = reducedMotion
      ? INSTANT_TRANSITION_PROFILE.exit
      : this.profile.exit;

    this._state = 'exiting';
    await this._playTransition(config, 'exit');
    this._state = 'exited';
  }

  /** Jump to entered state instantly (skip animation) */
  snapEntered(): void {
    this.container.style.opacity = '1';
    this.container.style.transform = 'none';
    this._state = 'entered';
  }

  /** Reset to idle state */
  reset(): void {
    this._applyBaseStyles();
    this._state = 'idle';
  }

  destroy(): void {
    this.reset();
  }

  // ─── Internal ─────────────────────────────────────────────────────────────

  private _applyBaseStyles(): void {
    this.container.style.opacity = '0';
    this.container.style.transform = 'none';
    this.container.style.transition = '';
  }

  private async _playTransition(
    config: TransitionConfig,
    direction: 'enter' | 'exit'
  ): Promise<void> {
    if (config.style === 'none') {
      if (direction === 'enter') this.container.style.opacity = '1';
      else this.container.style.opacity = '0';
      return;
    }

    const { duration, delay, easing, springCurve } = config;

    // Determine easing string
    const easingStr = easing === 'spring'
      ? `cubic-bezier(${(springCurve ?? [0.34, 1.56, 0.64, 1]).join(', ')})`
      : easing === 'ease-in-out' ? 'ease-in-out'
      : easing === 'ease-in' ? 'ease-in'
      : easing === 'ease-out' ? 'ease-out'
      : 'linear';

    // Apply transitions
    const transitions: string[] = [
      `opacity ${duration}ms ${easingStr} ${delay}ms`,
    ];

    if (config.style !== 'fade') {
      transitions.push(`transform ${duration}ms ${easingStr} ${delay}ms`);
    }

    this.container.style.transition = transitions.join(', ');

    if (direction === 'enter') {
      // Set start state
      this._applyTransformStart(config);
      this.container.style.opacity = '0';

      // Force reflow
      void this.container.offsetHeight;

      // Animate to end state
      this.container.style.opacity = '1';
      this.container.style.transform = 'none';
    } else {
      // Exit: animate to hidden
      this.container.style.opacity = '0';
      this._applyTransformEnd(config);
    }

    await this._waitForTransition(duration + delay);
  }

  private _applyTransformStart(config: TransitionConfig): void {
    switch (config.style) {
      case 'slide-up':   this.container.style.transform = 'translateY(32px)'; break;
      case 'slide-down': this.container.style.transform = 'translateY(-32px)'; break;
      case 'zoom-in':    this.container.style.transform = 'scale(0.95)'; break;
      case 'zoom-out':   this.container.style.transform = 'scale(1.05)'; break;
      default:           this.container.style.transform = 'none'; break;
    }
  }

  private _applyTransformEnd(config: TransitionConfig): void {
    switch (config.style) {
      case 'slide-up':   this.container.style.transform = 'translateY(-32px)'; break;
      case 'slide-down': this.container.style.transform = 'translateY(32px)'; break;
      case 'zoom-in':    this.container.style.transform = 'scale(1.05)'; break;
      case 'zoom-out':   this.container.style.transform = 'scale(0.95)'; break;
      default:           this.container.style.transform = 'none'; break;
    }
  }

  private _waitForTransition(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
