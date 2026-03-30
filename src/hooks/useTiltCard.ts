"use client";

import { useRef, useEffect, useCallback } from "react";

interface TiltOptions {
  maxTilt?: number;
  glareColor?: string;
  perspective?: number;
  scale?: number;
}

function useTiltCard<T extends HTMLElement = HTMLDivElement>(
  options?: TiltOptions
): React.RefObject<T> {
  const {
    maxTilt = 8,
    glareColor = "rgba(224,94,20,0.06)",
    perspective = 800,
    scale = 1.02,
  } = options ?? {};

  const ref = useRef<T>(null!);
  const rafId = useRef<number>(0);
  const prefersReducedMotion = useRef(false);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion.current) return;
      const el = ref.current;
      if (!el) return;

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const ratioX = (e.clientX - centerX) / (rect.width / 2);
        const ratioY = (e.clientY - centerY) / (rect.height / 2);

        const rotateX = -ratioY * maxTilt;
        const rotateY = ratioX * maxTilt;

        el.style.transition = "none";
        el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
        el.style.backgroundImage = `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glareColor}, transparent 60%)`;
      });
    },
    [maxTilt, glareColor, perspective, scale]
  );

  const onMouseLeave = useCallback(() => {
    if (prefersReducedMotion.current) return;
    const el = ref.current;
    if (!el) return;

    cancelAnimationFrame(rafId.current);
    el.style.transition = "transform 0.5s ease-out, background-image 0.5s ease-out";
    el.style.transform = "";
    el.style.backgroundImage = "";
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mql.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
      if (e.matches) {
        const el = ref.current;
        if (el) {
          cancelAnimationFrame(rafId.current);
          el.style.transition = "";
          el.style.transform = "";
          el.style.backgroundImage = "";
        }
      }
    };

    mql.addEventListener("change", handleMotionChange);

    const el = ref.current;
    if (!el) return;

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      mql.removeEventListener("change", handleMotionChange);
      cancelAnimationFrame(rafId.current);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  return ref;
}

export default useTiltCard;
export type { TiltOptions };
