'use client';
/**
 * HotspotLayer, Reusable interactive hotspot overlay
 *
 * Renders labeled, accessible hotspot markers over a scene at percentage-based
 * positions. Clicking a hotspot opens an inline detail panel.
 *
 * Reusable: position-independent, content-agnostic. Works on any scene size.
 * Does NOT contain any project-specific content.
 *
 * Usage:
 *   <HotspotLayer
 *     hotspots={[{ id: 'solar', x: 50, y: 20, label: 'Solar Array', description: '...' }]}
 *     visible={phase === 2}
 *   />
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Hotspot {
  /** Unique identifier for this hotspot. */
  id: string;
  /** Horizontal position as percentage (0 = left, 100 = right). */
  x: number;
  /** Vertical position as percentage (0 = top, 100 = bottom). */
  y: number;
  /** Short label shown on the marker and as the panel title. */
  label: string;
  /** Full description shown when the hotspot is expanded. */
  description: string;
  /** Optional icon displayed in the detail panel header. */
  icon?: React.ReactNode;
  /** Optional accent color class (Tailwind). Default: orange. */
  accentClass?: string;
}

export interface HotspotLayerProps {
  hotspots: Hotspot[];
  /** Whether the hotspot layer is visible. Handles its own enter/exit CSS. */
  visible?: boolean;
  className?: string;
  /** Called when a hotspot is opened. */
  onOpen?: (id: string) => void;
  /** Called when a hotspot is closed. */
  onClose?: (id: string) => void;
}

// ─── Marker ───────────────────────────────────────────────────────────────────

function HotspotMarker({
  hotspot,
  isOpen,
  onClick,
}: {
  hotspot: Hotspot;
  isOpen: boolean;
  onClick: () => void;
}) {
  const accent = hotspot.accentClass ?? 'border-orange-500/70 bg-orange-500/20 text-orange-300';
  const accentRing = hotspot.accentClass ? '' : 'ring-orange-500/30';

  return (
    <button
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={`${hotspot.label}: ${isOpen ? 'close detail' : 'open detail'}`}
      className={`
        absolute w-8 h-8 rounded-full border flex items-center justify-center
        font-mono text-xs font-bold transition-all duration-200 cursor-pointer
        ${accent}
        ${isOpen ? `ring-2 ${accentRing} scale-110` : 'hover:scale-110 hover:ring-2 ' + accentRing}
      `}
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <span className="sr-only">{hotspot.label}</span>
      {/* Pulse ring */}
      {!isOpen && (
        <span
          className="absolute inset-0 rounded-full border border-orange-400/40 animate-ping"
          aria-hidden="true"
        />
      )}
      +
    </button>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function HotspotPanel({
  hotspot,
  onClose,
}: {
  hotspot: Hotspot;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap: focus panel on open
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={hotspot.label}
      tabIndex={-1}
      className="
        absolute bottom-8 left-1/2 -translate-x-1/2 w-80 max-w-[90vw]
        bg-slate-900/95 backdrop-blur-xl border border-orange-500/30
        rounded-2xl p-5 shadow-2xl shadow-black/50
        outline-none z-10
        animate-in fade-in slide-in-from-bottom-4 duration-200
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {hotspot.icon && (
            <div className="w-8 h-8 bg-orange-500/15 border border-orange-500/20 rounded-lg flex items-center justify-center text-orange-400">
              {hotspot.icon}
            </div>
          )}
          <h3 className="text-white font-semibold text-sm">{hotspot.label}</h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Close detail"
          className="text-slate-500 hover:text-white transition-colors ml-2 shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed">{hotspot.description}</p>
    </div>
  );
}

// ─── HotspotLayer ─────────────────────────────────────────────────────────────

export function HotspotLayer({
  hotspots,
  visible = true,
  className = '',
  onOpen,
  onClose,
}: HotspotLayerProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleOpen = useCallback(
    (id: string) => {
      setOpenId((prev) => {
        if (prev === id) {
          onClose?.(id);
          return null;
        }
        if (prev) onClose?.(prev);
        onOpen?.(id);
        return id;
      });
    },
    [onOpen, onClose]
  );

  const handleClose = useCallback(() => {
    if (openId) {
      onClose?.(openId);
      setOpenId(null);
    }
  }, [openId, onClose]);

  // Close open panel when layer is hidden
  useEffect(() => {
    if (!visible) setOpenId(null);
  }, [visible]);

  const activeHotspot = hotspots.find((h) => h.id === openId) ?? null;

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${className}`}
      aria-hidden={!visible}
    >
      {/* Backdrop to close panel */}
      {activeHotspot && (
        <div
          className="absolute inset-0"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Markers */}
      {hotspots.map((hotspot) => (
        <HotspotMarker
          key={hotspot.id}
          hotspot={hotspot}
          isOpen={openId === hotspot.id}
          onClick={() => handleOpen(hotspot.id)}
        />
      ))}

      {/* Open detail panel */}
      {activeHotspot && (
        <HotspotPanel hotspot={activeHotspot} onClose={handleClose} />
      )}

      {/* Keyboard hint */}
      {!activeHotspot && visible && hotspots.length > 0 && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-600 font-mono pointer-events-none">
          TAP ANY MARKER TO EXPLORE
        </p>
      )}
    </div>
  );
}
