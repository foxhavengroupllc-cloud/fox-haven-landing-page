"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { PortalId } from "./portalConfig";
import { PORTALS } from "./portalConfig";
import PortalOverlayContent from "./PortalOverlayContent";

interface PortalOverlayProps {
  portalId: PortalId;
  isOpen: boolean;
  onClose: () => void;
}

export default function PortalOverlay({
  portalId,
  isOpen,
  onClose,
}: PortalOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const config = PORTALS.find((p) => p.id === portalId)!;

  // Focus close button after enter animation
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => closeRef.current?.focus(), 450);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const overlay = (
    <div
      className="fixed inset-0"
      style={{ zIndex: 300 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-overlay-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#060f1d]/90 backdrop-blur-sm"
        style={{
          opacity: isOpen ? 1 : 0,
          transition: "opacity 400ms cubic-bezier(0.22,1,0.36,1)",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content panel */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? "scale(1) translateY(0)"
            : "scale(0.92) translateY(24px)",
          transition:
            "opacity 400ms cubic-bezier(0.22,1,0.36,1), transform 400ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto pointer-events-auto rounded-2xl border border-white/[0.06] bg-[#0b1c2e]/95 backdrop-blur-xl p-8 sm:p-10"
          style={{
            boxShadow: `0 0 60px ${config.accentGlow}, 0 25px 50px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Close button */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-[#f4ede0]/50 hover:text-[#f4ede0] transition-colors duration-200 cursor-pointer"
            aria-label="Close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 2L14 14M14 2L2 14" />
            </svg>
          </button>

          {/* Accent line at top */}
          <div
            className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${config.accentColor}, transparent)`,
              opacity: 0.5,
            }}
            aria-hidden="true"
          />

          <PortalOverlayContent portalId={portalId} onClose={onClose} />
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}
