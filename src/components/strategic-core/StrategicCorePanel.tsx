'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { scrollToSection } from '@/lib/scroll';
import type { CoreNode } from './strategicCoreConfig';

interface Props {
  node: CoreNode | null;
  onClose: () => void;
  /** SVG-space coordinates [0–400] of the activated node, frozen at click time. */
  projPos: { x: number; y: number } | null;
}

/**
 * Compact contextual panel anchored near the activated sphere node.
 * Position is frozen at click time — it doesn't chase the rotating sphere.
 * Rendered as an absolutely-positioned overlay within the sphere's relative container.
 */
export function StrategicCorePanel({ node, onClose, projPos }: Props) {
  const router = useRouter();

  // Keyboard dismiss
  useEffect(() => {
    if (!node) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [node, onClose]);

  if (!node) return null;
  const { panel, action } = node;

  function handleCta() {
    const cta = panel?.cta;
    if (!cta) return;
    onClose();
    if (cta.scrollTo) {
      setTimeout(() => scrollToSection(cta.scrollTo!), 80);
    } else if (cta.href) {
      if (cta.href.startsWith('http')) {
        window.open(cta.href, '_blank', 'noopener,noreferrer');
      } else {
        setTimeout(() => router.push(cta.href!), 80);
      }
    }
  }

  function handleDirectAction() {
    onClose();
    if (action.kind === 'route') setTimeout(() => router.push(action.href), 80);
    else if (action.kind === 'scroll') setTimeout(() => scrollToSection(action.targetId), 80);
  }

  // ── Panel positioning ─────────────────────────────────────────────────
  // Convert SVG coordinates [0–400] → percentage of the container [0–100%].
  // Place the panel on the opposite side from the node to avoid overlap,
  // and clamp vertically so it stays within the sphere container.
  const xFrac = projPos ? projPos.x / 400 : 0.5;
  const yFrac = projPos ? projPos.y / 400 : 0.5;

  const onRight = xFrac > 0.52;

  // Clamp vertical centre: panel is ~150px tall max; keep inside sphere bounds
  const yPct = Math.min(Math.max(yFrac * 100, 14), 82);

  const posStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 20,
    // Vertical: centre panel on the node's y position
    // translateY(-50%) is embedded in the CSS animation so it persists after completion
    top: `${yPct}%`,
    maxWidth: '264px',
    width: '264px',
    // Visual treatment
    background: 'rgba(7, 12, 22, 0.93)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255, 255, 255, 0.07)',
    borderRadius: '13px',
    padding: '13px 14px 14px',
    boxShadow: '0 0 32px rgba(242, 201, 76, 0.08), 0 8px 40px rgba(0, 0, 0, 0.60)',
  };

  // Horizontal: panel appears on the opposite side from the node
  if (onRight) {
    // Node on right → panel to the left of it
    posStyle.right = `${(1 - xFrac) * 100 + 7}%`;
  } else {
    // Node on left → panel to the right of it
    posStyle.left = `${xFrac * 100 + 7}%`;
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={panel.title}
      className="sc-panel-enter"
      style={posStyle}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="font-display text-white text-[12.5px] leading-snug">
            {panel.title}
          </h3>
          <p className="font-body text-white/32 text-[9px] mt-[3px] uppercase tracking-[0.12em]">
            {node.sublabel}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white/22 hover:text-white/55 transition-colors duration-150 text-[18px] leading-none shrink-0 mt-0.5 cursor-pointer"
          aria-label="Close panel"
        >
          ×
        </button>
      </div>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <p className="font-body text-white/48 text-[10.5px] leading-[1.55] mb-3">
        {panel.body}
      </p>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div className="flex items-center">
        {panel.cta ? (
          <button
            onClick={handleCta}
            className="inline-flex items-center gap-1 px-3 py-[5px] bg-heat-amber/10 hover:bg-heat-amber/20 border border-heat-amber/22 hover:border-heat-amber/48 text-heat-amber rounded-full font-body text-[10px] font-semibold transition-all duration-150 cursor-pointer"
          >
            {panel.cta.label}
            <span aria-hidden="true" className="ml-0.5">→</span>
          </button>
        ) : action.kind !== 'panel' ? (
          <button
            onClick={handleDirectAction}
            className="inline-flex items-center gap-1 px-3 py-[5px] bg-heat-amber/10 hover:bg-heat-amber/20 border border-heat-amber/22 hover:border-heat-amber/48 text-heat-amber rounded-full font-body text-[10px] font-semibold transition-all duration-150 cursor-pointer"
          >
            {action.kind === 'route' ? 'Explore' : 'Go'}
            <span aria-hidden="true" className="ml-0.5">→</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
