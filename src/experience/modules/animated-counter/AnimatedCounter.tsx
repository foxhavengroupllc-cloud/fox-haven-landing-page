'use client';
/**
 * AnimatedCounter — shared animated number display.
 *
 * Counts from 0 to `target` using an ease-out cubic curve over `duration` ms.
 * Includes a brief startup delay so the animation begins after the phase has
 * fully entered the viewport.
 *
 * React Strict Mode safe: cleanup resets `startedRef.current` so the effect
 * can re-run after the double-mount cycle.
 *
 * Used by:
 *   - SolarShelterPhases (Phase 3 — proof metrics)
 *   - HeatReliefAppPhases (Phase 1 — cooling center count)
 */

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  /** Animation duration in milliseconds. */
  duration?: number;
  /** Delay before counting starts, in milliseconds. */
  startDelay?: number;
}

export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 1500,
  startDelay = 300,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let startTime: number | null = null;
    let rafId: number;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic — decelerates toward the target
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    }

    const timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      // Reset guard so the effect can re-run after React Strict Mode's
      // double-mount cycle (mount → cleanup → mount).
      startedRef.current = false;
    };
  }, [target, duration, startDelay]);

  return (
    <span>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}
