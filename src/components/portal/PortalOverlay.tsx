"use client";

import { useEffect, useRef, useState } from "react";
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
  const [showContent, setShowContent] = useState(false);

  // Stagger: show content after panel has settled
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  // Focus close button after full entrance
  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => closeRef.current?.focus(), 200);
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  const overlay = (
    <div
      className="fixed inset-0"
      style={{ zIndex: 300 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-overlay-title"
    >
      {/* Backdrop — fades in first */}
      <div
        className="absolute inset-0 bg-[#060f1d]/85"
        style={{
          opacity: isOpen ? 1 : 0,
          backdropFilter: isOpen ? "blur(8px)" : "blur(0px)",
          WebkitBackdropFilter: isOpen ? "blur(8px)" : "blur(0px)",
          transition: "opacity 500ms ease-out, backdrop-filter 500ms ease-out, -webkit-backdrop-filter 500ms ease-out",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel container — rises up after backdrop */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? "translateY(0) scale(1)"
            : "translateY(40px) scale(0.96)",
          transition: isOpen
            ? "opacity 550ms cubic-bezier(0.16,1,0.3,1) 100ms, transform 550ms cubic-bezier(0.16,1,0.3,1) 100ms"
            : "opacity 300ms ease-in, transform 300ms ease-in",
        }}
      >
        <div
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto pointer-events-auto rounded-2xl border border-white/[0.06] bg-[#0b1c2e]/95 backdrop-blur-xl"
          style={{
            boxShadow: isOpen
              ? `0 0 80px ${config.accentGlow}, 0 30px 60px rgba(0,0,0,0.6)`
              : "none",
            transition: "box-shadow 600ms ease-out 150ms",
          }}
        >
          {/* Accent line at top — grows in */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent 5%, ${config.accentColor} 50%, transparent 95%)`,
              opacity: isOpen ? 0.6 : 0,
              transform: isOpen ? "scaleX(1)" : "scaleX(0)",
              transition: "opacity 400ms ease-out 300ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 300ms",
            }}
            aria-hidden="true"
          />

          <div className="p-8 sm:p-10">
            {/* Close button — fades in late */}
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-[#f4ede0]/50 hover:text-[#f4ede0] cursor-pointer"
              style={{
                opacity: showContent ? 1 : 0,
                transition: "opacity 300ms ease-out, background-color 200ms ease",
              }}
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

            {/* Content — staggers in after panel lands */}
            <div
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 450ms cubic-bezier(0.16,1,0.3,1), transform 450ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <PortalOverlayContent portalId={portalId} onClose={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}
