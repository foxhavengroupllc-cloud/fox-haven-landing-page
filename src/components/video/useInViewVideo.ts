'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewVideoOptions {
  /** IntersectionObserver rootMargin (default: '0px') */
  rootMargin?: string;
  /** Fraction of element visible before triggering (default: 0.25) */
  threshold?: number;
}

interface UseInViewVideoResult {
  /** Attach to the container element you want to observe. */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** True while the container is intersecting the viewport. Updates each frame. */
  isInView: boolean;
  /**
   * One-way trigger, flips to true the first time the container enters
   * the viewport and stays true forever. Use this to imperatively set
   * `videoRef.current.src` so the video is only fetched once.
   */
  hasEnteredOnce: boolean;
}

/**
 * Lightweight IntersectionObserver hook for lazy-loading video elements.
 *
 * Pattern:
 *   const { containerRef, isInView, hasEnteredOnce } = useInViewVideo();
 *
 *   // Lazy-load: set src only after first entry
 *   useEffect(() => {
 *     if (hasEnteredOnce && videoRef.current && !videoRef.current.src) {
 *       videoRef.current.src = CDN_URL;
 *       videoRef.current.load();
 *     }
 *   }, [hasEnteredOnce]);
 *
 *   // Play / pause on visibility
 *   useEffect(() => {
 *     if (isInView) videoRef.current?.play().catch(() => {});
 *     else          videoRef.current?.pause();
 *   }, [isInView]);
 */
export function useInViewVideo(
  options: UseInViewVideoOptions = {},
): UseInViewVideoResult {
  const { rootMargin = '0px', threshold = 0.25 } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView]           = useState(false);
  const [hasEnteredOnce, setHasEnteredOnce] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);
        if (visible) setHasEnteredOnce(true);
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { containerRef, isInView, hasEnteredOnce };
}
