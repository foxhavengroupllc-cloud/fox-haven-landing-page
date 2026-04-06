'use client';

import { useEffect, useRef } from 'react';

const DOT_SIZE = 10;
const RING_SIZE = 34;

function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function getCursorTheme(el: Element | null): 'dark' | 'light' | 'auto' {
  let current: Element | null = el;
  while (current && current !== document.documentElement) {
    const attr = current.getAttribute('data-cursor');
    if (attr === 'dark') return 'dark';
    if (attr === 'light') return 'light';
    current = current.parentElement;
  }
  return 'auto';
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (isTouchDevice()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const styleEl = document.createElement('style');
    styleEl.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(styleEl);

    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (!visible.current) {
        visible.current = true;
        if (dot) dot.style.opacity = '1';
        if (ring) ring.style.opacity = '1';
      }

      // Update ring border color based on section theme
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const theme = getCursorTheme(target);
      if (ring) {
        if (theme === 'dark') {
          ring.style.borderColor = 'rgba(255, 253, 240, 0.6)';
        } else if (theme === 'light') {
          ring.style.borderColor = 'rgba(15, 23, 42, 0.6)';
        } else {
          ring.style.borderColor = 'rgba(224, 94, 20, 0.45)';
        }
      }
    }

    function onMouseLeave() {
      visible.current = false;
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    }

    function tick() {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      if (dot) {
        dot.style.left = `${mx}px`;
        dot.style.top = `${my}px`;
      }

      if (ring) {
        ring.style.left = `${mx}px`;
        ring.style.top = `${my}px`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      styleEl.remove();
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: RING_SIZE,
          height: RING_SIZE,
          border: '1.5px solid rgba(224, 94, 20, 0.45)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          top: 0,
          left: 0,
          willChange: 'left, top',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: DOT_SIZE,
          height: DOT_SIZE,
          background: '#e05e14',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          top: 0,
          left: 0,
          willChange: 'left, top',
        }}
      />
    </div>
  );
}
