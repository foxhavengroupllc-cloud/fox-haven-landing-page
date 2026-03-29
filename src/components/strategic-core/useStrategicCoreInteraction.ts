'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Rot { x: number; y: number }

const IDLE_SPEED_Y = 0.10;  // degrees/frame — slow ambient drift
const FRICTION      = 0.93;  // per-frame velocity damping after drag release
const DRAG_SENS     = 0.38;  // mouse/touch drag sensitivity (degrees per pixel)
const DRAG_VEL_MULT = 0.18;  // drag velocity carried to post-drag inertia

/**
 * Manages rotation state and pointer/touch interaction for the strategic sphere.
 * Returns the current rotation angles and event handlers.
 *
 * Interaction model:
 *   - Idle: slow ambient Y-axis rotation + any residual velocity from drag
 *   - Drag: direct rotation control with velocity accumulation
 *   - Release: inertia from last drag velocity, decaying via FRICTION
 *   - Reduced-motion: no RAF loop, static pose
 */
export function useStrategicCoreInteraction(reducedMotion: boolean) {
  // Start at a slight angle so all nodes are clearly visible on first load
  const [rot, setRot] = useState<Rot>({ x: -18, y: 22 });
  const vel       = useRef<Rot>({ x: 0, y: 0 });
  const dragging  = useRef(false);
  const lastPt    = useRef({ x: 0, y: 0 });
  const startPt   = useRef({ x: 0, y: 0 });
  const movedFar  = useRef(false); // distinguishes click from drag

  // ── Animation loop ────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    let alive = true;

    function tick() {
      if (!alive) return;
      if (!dragging.current) {
        vel.current.x *= FRICTION;
        vel.current.y *= FRICTION;
        setRot(prev => ({
          x: prev.x + vel.current.x,
          y: prev.y + vel.current.y + IDLE_SPEED_Y,
        }));
      }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    return () => { alive = false; };
  }, [reducedMotion]);

  // ── Drag handlers ─────────────────────────────────────────────────────
  const startDrag = useCallback((x: number, y: number) => {
    dragging.current = true;
    movedFar.current = false;
    lastPt.current = startPt.current = { x, y };
    vel.current = { x: 0, y: 0 };
  }, []);

  const moveDrag = useCallback((x: number, y: number) => {
    if (!dragging.current) return;
    const dx = x - lastPt.current.x;
    const dy = y - lastPt.current.y;

    // Mark as a genuine drag if pointer moved more than 5px
    if (Math.hypot(x - startPt.current.x, y - startPt.current.y) > 5) {
      movedFar.current = true;
    }

    // Accumulate velocity for post-drag inertia
    vel.current = { x: dy * DRAG_VEL_MULT, y: dx * DRAG_VEL_MULT };

    setRot(prev => ({
      x: Math.max(-75, Math.min(75, prev.x + dy * DRAG_SENS)), // clamp to avoid polar flip
      y: prev.y + dx * DRAG_SENS,
    }));

    lastPt.current = { x, y };
  }, []);

  const endDrag = useCallback(() => {
    dragging.current = false;
    // velocity carries for post-drag inertia (decays via FRICTION in tick)
  }, []);

  /** True if the last pointer sequence was a drag rather than a tap/click */
  const wasDrag = useCallback(() => movedFar.current, []);

  return { rot, startDrag, moveDrag, endDrag, wasDrag };
}
