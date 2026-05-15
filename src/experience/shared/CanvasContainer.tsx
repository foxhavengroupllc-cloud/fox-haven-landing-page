'use client';

/**
 * CanvasContainer, standardized wrapper for immersive canvas elements.
 *
 * Enforces:
 * - aria-hidden="true" on the canvas (always decorative)
 * - tabIndex={-1} (never receives keyboard focus)
 * - pointer-events: none (never intercepts page interaction)
 * - z-index: var(--z-immersive-bg) (always below content)
 *
 * Scene components render their <canvas> inside this container.
 */

import React, { forwardRef } from 'react';

interface CanvasContainerProps {
  /** Additional classes for sizing/positioning (e.g. "absolute inset-0") */
  className?: string;
  /** Inline styles for uncommon overrides */
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const CanvasContainer = forwardRef<HTMLDivElement, CanvasContainerProps>(
  function CanvasContainer({ className, style, children }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 'var(--z-immersive-bg)',
          pointerEvents: 'none',
          overflow: 'hidden',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

// ─── Canvas Element Helper ────────────────────────────────────────────────────

interface SceneCanvasProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders a <canvas> element with the correct accessibility attributes.
 * Always aria-hidden and never focusable.
 */
export const SceneCanvas = forwardRef<HTMLCanvasElement, SceneCanvasProps>(
  function SceneCanvas({ className, style }, ref) {
    return (
      <canvas
        ref={ref}
        aria-hidden="true"
        tabIndex={-1}
        className={className}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          ...style,
        }}
      />
    );
  }
);
