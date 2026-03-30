import { useRef, useEffect, useCallback } from "react";

interface MagneticOptions {
  strength?: number;
  maxDistance?: number;
  maxTranslate?: number;
}

function useMagneticHover<T extends HTMLElement>(
  options?: MagneticOptions
): React.RefObject<T | null> {
  const {
    strength = 0.3,
    maxDistance = 80,
    maxTranslate = 12,
  } = options ?? {};

  const ref = useRef<T>(null);
  const rafId = useRef<number>(0);
  const isInRange = useRef(false);

  const applyTransform = useCallback(
    (x: number, y: number, transition: boolean) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.transition = transition ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "transform 0s";
    },
    []
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Distance from element center
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Effective range: half the element size + maxDistance
      const effectiveRange = Math.max(rect.width, rect.height) / 2 + maxDistance;

      if (distance > effectiveRange) {
        if (isInRange.current) {
          isInRange.current = false;
          cancelAnimationFrame(rafId.current);
          applyTransform(0, 0, true);
        }
        return;
      }

      isInRange.current = true;

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        // Normalize distance: 1 at center, 0 at edge of range
        const normalizedProximity = 1 - Math.min(distance / effectiveRange, 1);

        // Ease the proximity for a smoother falloff
        const eased = normalizedProximity * normalizedProximity;

        const translateX = (dx / distance || 0) * eased * strength * maxTranslate;
        const translateY = (dy / distance || 0) * eased * strength * maxTranslate;

        applyTransform(translateX, translateY, false);
      });
    };

    const handleMouseLeave = () => {
      if (isInRange.current) {
        isInRange.current = false;
        cancelAnimationFrame(rafId.current);
        applyTransform(0, 0, true);
      }
    };

    // Listen on document so we detect approach before the cursor enters the element
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId.current);
      // Reset transform on cleanup
      if (el) {
        el.style.transform = "";
        el.style.transition = "";
      }
    };
  }, [strength, maxDistance, maxTranslate, applyTransform]);

  return ref;
}

export default useMagneticHover;
export type { MagneticOptions };
