"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { PortalId } from "@/components/portal/portalConfig";

export interface PortalExpansionState {
  activePortal: PortalId | null;
  isOpen: boolean;
  open: (id: PortalId, cardEl: HTMLElement) => void;
  close: () => void;
}

export function usePortalExpansion(): PortalExpansionState {
  const [activePortal, setActivePortal] = useState<PortalId | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const previousFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((id: PortalId, cardEl: HTMLElement) => {
    previousFocus.current = document.activeElement as HTMLElement;
    setActivePortal(id);
    document.body.style.overflow = "hidden";

    // Trigger enter animation on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);

    // Wait for exit animation, then unmount
    setTimeout(() => {
      setActivePortal(null);
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    }, 400);
  }, []);

  // Escape key
  useEffect(() => {
    if (!activePortal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [activePortal, close]);

  return { activePortal, isOpen, open, close };
}
