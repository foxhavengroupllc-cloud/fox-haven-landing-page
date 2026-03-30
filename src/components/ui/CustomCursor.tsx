'use client';

import { useEffect, useRef, useCallback } from 'react';

// --- Types ---

type CursorContext = 'default' | 'text' | 'interactive' | 'image';
type CursorTheme = 'dark' | 'light' | 'auto';

// --- Constants ---

const DOT_SIZE = 10;
const RING_SIZE = 34;
const RING_LAG = 0.12;
const CLICK_PULSE_SCALE = 1.5;
const CLICK_PULSE_DURATION = 350;
const TRANSITION_DURATION = '0.2s';
const TRANSITION_EASING = 'cubic-bezier(0.25, 0.1, 0.25, 1)';

const TEXT_SELECTORS = 'p, h1, h2, h3, h4, h5, h6, span, blockquote, li, td, th, label, figcaption';
const INTERACTIVE_SELECTORS = 'a, button, [role="button"], input, textarea, select, [tabindex]';
const IMAGE_SELECTORS = 'img, video, picture, svg, canvas, [role="img"]';

// --- Helpers ---

function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function getElementContext(el: Element | null): CursorContext {
  if (!el) return 'default';
  let current: Element | null = el;
  while (current && current !== document.body) {
    if (current.matches(INTERACTIVE_SELECTORS)) return 'interactive';
    if (current.matches(IMAGE_SELECTORS)) return 'image';
    if (current.matches(TEXT_SELECTORS)) return 'text';
    current = current.parentElement;
  }
  return 'default';
}

function getCursorTheme(el: Element | null): CursorTheme {
  if (!el) return 'auto';
  let current: Element | null = el;
  while (current && current !== document.documentElement) {
    const attr = current.getAttribute('data-cursor');
    if (attr === 'dark') return 'dark';
    if (attr === 'light') return 'light';
    current = current.parentElement;
  }
  return 'auto';
}

// --- Component ---

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringTextRef = useRef<HTMLSpanElement>(null);

  // Animation state
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const context = useRef<CursorContext>('default');
  const theme = useRef<CursorTheme>('auto');
  const rafId = useRef<number>(0);
  const clicking = useRef(false);
  const clickTime = useRef(0);

  const applyContextStyles = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringText = ringTextRef.current;
    if (!dot || !ring || !ringText) return;

    const ctx = context.current;
    const thm = theme.current;

    // Theme-based ring border color
    let ringBorderColor = 'rgba(224, 94, 20, 0.45)';
    if (thm === 'dark') {
      ringBorderColor = 'rgba(255, 253, 240, 0.6)';
    } else if (thm === 'light') {
      ringBorderColor = 'rgba(15, 23, 42, 0.6)';
    }

    // Reset mix-blend-mode
    ring.style.mixBlendMode = '';
    ring.style.background = 'transparent';
    ringText.style.opacity = '0';

    switch (ctx) {
      case 'text':
        dot.style.width = `${DOT_SIZE}px`;
        dot.style.height = `${DOT_SIZE}px`;
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.border = `1.5px solid ${ringBorderColor}`;
        ring.style.background = 'rgba(224, 94, 20, 0.06)';
        ring.style.mixBlendMode = 'difference';
        break;

      case 'interactive':
        dot.style.width = '16px';
        dot.style.height = '16px';
        ring.style.width = '24px';
        ring.style.height = '24px';
        ring.style.border = 'none';
        ring.style.background = 'rgba(224, 94, 20, 0.2)';
        break;

      case 'image':
        dot.style.width = `${DOT_SIZE}px`;
        dot.style.height = `${DOT_SIZE}px`;
        ring.style.width = '80px';
        ring.style.height = '80px';
        ring.style.border = `1px solid ${ringBorderColor}`;
        ring.style.background = 'rgba(224, 94, 20, 0.03)';
        ringText.style.opacity = '0.7';
        break;

      default:
        dot.style.width = `${DOT_SIZE}px`;
        dot.style.height = `${DOT_SIZE}px`;
        ring.style.width = `${RING_SIZE}px`;
        ring.style.height = `${RING_SIZE}px`;
        ring.style.border = `1.5px solid ${ringBorderColor}`;
        break;
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Inject global cursor-hide style
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    // --- Event handlers ---

    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (!visible.current) {
        visible.current = true;
        ringPos.current = { x: e.clientX, y: e.clientY };
        if (dot) dot.style.opacity = '1';
        if (ring) ring.style.opacity = '1';
      }

      // Detect context from element under cursor
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const newContext = getElementContext(target);
      const newTheme = getCursorTheme(target);

      if (newContext !== context.current || newTheme !== theme.current) {
        context.current = newContext;
        theme.current = newTheme;
        applyContextStyles();
      }
    }

    function onMouseLeave() {
      visible.current = false;
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    }

    function onMouseDown() {
      clicking.current = true;
      clickTime.current = performance.now();
    }

    function onMouseUp() {
      // Click animation handled in RAF loop via clickTime
    }

    // --- RAF loop ---

    function tick() {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // --- Dot position (instant) ---
      if (dot) {
        dot.style.left = `${mx}px`;
        dot.style.top = `${my}px`;
        dot.style.transform = 'translate(-50%, -50%)';
      }

      // --- Ring position (lagged) ---
      const rdx = mx - ringPos.current.x;
      const rdy = my - ringPos.current.y;
      ringPos.current.x += rdx * RING_LAG;
      ringPos.current.y += rdy * RING_LAG;

      if (ring) {
        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;

        // Click pulse animation
        if (clicking.current) {
          const elapsed = performance.now() - clickTime.current;
          if (elapsed < CLICK_PULSE_DURATION) {
            const progress = elapsed / CLICK_PULSE_DURATION;
            const eased = 1 - (1 - progress) * (1 - progress);
            const scale = 1 + (CLICK_PULSE_SCALE - 1) * (1 - eased);
            ring.style.transform = `translate(-50%, -50%) scale(${scale})`;
            ring.style.borderColor = `rgba(224, 94, 20, ${0.45 + 0.3 * (1 - eased)})`;
          } else {
            clicking.current = false;
            ring.style.transform = 'translate(-50%, -50%)';
            applyContextStyles();
          }
        } else {
          ring.style.transform = 'translate(-50%, -50%)';
        }
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    // --- Listeners ---

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    // --- MutationObserver for DOM changes ---
    const observer = new MutationObserver(() => {
      if (visible.current) {
        const target = document.elementFromPoint(
          mouse.current.x,
          mouse.current.y
        );
        const newContext = getElementContext(target);
        const newTheme = getCursorTheme(target);
        if (newContext !== context.current || newTheme !== theme.current) {
          context.current = newContext;
          theme.current = newTheme;
          applyContextStyles();
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // --- Cleanup ---

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
      styleEl.remove();
    };
  }, [applyContextStyles]);

  return (
    <div aria-hidden="true">
      {/* Ring */}
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
          transition: `width ${TRANSITION_DURATION} ${TRANSITION_EASING}, height ${TRANSITION_DURATION} ${TRANSITION_EASING}, border ${TRANSITION_DURATION} ${TRANSITION_EASING}, background ${TRANSITION_DURATION} ${TRANSITION_EASING}, mix-blend-mode ${TRANSITION_DURATION}`,
          opacity: 0,
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'left, top, width, height, transform, opacity',
        }}
      >
        <span
          ref={ringTextRef}
          style={{
            fontSize: 10,
            fontFamily: 'monospace',
            color: 'rgba(224, 94, 20, 0.85)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            opacity: 0,
            transition: `opacity ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          View
        </span>
      </div>

      {/* Dot */}
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
          transition: `width ${TRANSITION_DURATION} ${TRANSITION_EASING}, height ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
          opacity: 0,
          top: 0,
          left: 0,
          willChange: 'left, top, transform, opacity',
        }}
      />
    </div>
  );
}
