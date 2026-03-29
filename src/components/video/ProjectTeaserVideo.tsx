'use client';

/**
 * ProjectTeaserVideo
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps an initiative's illustrated visual with an optional teaser video layer.
 *
 * Behaviour:
 *  - Poster-first: the illustrated `children` is always rendered and acts as the
 *    natural poster. There is zero layout shift — the children drive the height.
 *  - Lazy load: video `src` is set imperatively only after the container enters
 *    the viewport for the first time (`hasEnteredOnce`). Before that, `preload`
 *    is "none" and no bytes are fetched.
 *  - Muted autoplay: starts playing when `isInView && !reducedMotion`. Pauses
 *    automatically when scrolled away.
 *  - Poster-only fallback: when `teaserSrc` is null the component renders the
 *    children unchanged plus a subtle translucent play button that links to the
 *    initiative's experience/CTA URL.
 *  - Reduced motion: respects `prefers-reduced-motion`. No autoplay; video src
 *    is never fetched. Poster + play button only.
 *  - SSR safe: `reducedMotion` detection is deferred client-side to avoid
 *    hydration mismatch.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useInViewVideo } from './useInViewVideo';
import { PROJECT_VIDEOS } from './projectVideoConfig';

interface Props {
  /** Must match a key in PROJECT_VIDEOS (= initiative.id from InitiativeConfig). */
  projectId: string;
  /** The illustrated SVG visual — rendered as the persistent poster layer. */
  children: React.ReactNode;
}

// ── Small helpers ─────────────────────────────────────────────────────────────

/** Minimal wrapper that opens in a new tab for external hrefs. */
function ExternalCta({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  );
}

/** Internal Next.js Link wrapper. */
function InternalCta({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} aria-label={label}>
      {children}
    </Link>
  );
}

// ── Play button icon (centred triangle) ──────────────────────────────────────

function PlayIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 4.5L20 12L6 19.5V4.5Z" fill="white" fillOpacity="0.92" />
    </svg>
  );
}

// ── Muted speaker icon ────────────────────────────────────────────────────────

function MutedIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 9v6h4l5 5V4L7 9H3zm16.59 3L23 8.41 21.59 7 18 10.59
           14.41 7 13 8.41 16.59 12 13 15.59 14.41 17
           18 13.41 21.59 17 23 15.59 19.59 12z"
        fill="white"
        fillOpacity="0.65"
      />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function ProjectTeaserVideo({ projectId, children }: Props) {
  const config = PROJECT_VIDEOS[projectId];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { containerRef, isInView, hasEnteredOnce } = useInViewVideo({
    threshold: 0.3,
    rootMargin: '0px 0px -60px 0px', // trigger slightly before fully in view
  });

  const [videoReady,    setVideoReady]    = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // ── Detect reduced-motion client-side (avoids SSR/hydration mismatch) ──────
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    // Listen for changes (user can toggle the OS preference at runtime)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── Lazy-load: set src imperatively on first viewport entry ─────────────────
  useEffect(() => {
    if (reducedMotion) return;
    if (!hasEnteredOnce) return;
    if (!config?.teaserSrc) return;
    const video = videoRef.current;
    if (!video) return;
    // Guard: only set once
    if (video.getAttribute('data-src-loaded')) return;
    video.setAttribute('data-src-loaded', '1');
    video.src = config.teaserSrc;
    video.load();
  }, [hasEnteredOnce, reducedMotion, config]);

  // ── Play / pause based on viewport visibility ────────────────────────────────
  useEffect(() => {
    if (reducedMotion || !videoReady) return;
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {
        // Autoplay may be blocked in some browsers; fail silently.
      });
    } else {
      video.pause();
    }
  }, [isInView, videoReady, reducedMotion]);

  // ── No config: render children as-is ────────────────────────────────────────
  if (!config) return <>{children}</>;

  const { teaserSrc, posterSrc, ctaHref, ctaLabel, ctaExternal, accentHex } =
    config;

  const hasVideo   = Boolean(teaserSrc) && !reducedMotion;
  const showVideo  = hasVideo;

  // Wrapper for the play button CTA
  const CtaWrapper = ctaExternal
    ? ({ children: c }: { children: React.ReactNode }) => (
        <ExternalCta href={ctaHref} label={ctaLabel}>
          {c}
        </ExternalCta>
      )
    : ({ children: c }: { children: React.ReactNode }) => (
        <InternalCta href={ctaHref} label={ctaLabel}>
          {c}
        </InternalCta>
      );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl group"
    >
      {/* ── Poster layer: illustrated visual ────────────────────────────── */}
      {/*  Always rendered. Fades out when the real video is ready.         */}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: videoReady ? 0 : 1 }}
        aria-hidden={videoReady}
      >
        {children}
      </div>

      {/* ── Video layer ──────────────────────────────────────────────────── */}
      {showVideo && (
        <video
          ref={videoRef}
          // src is NOT set in JSX — lazy-loaded imperatively in useEffect
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="none"
          onCanPlayThrough={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: videoReady ? 1 : 0 }}
          aria-hidden="true"
        />
      )}

      {/* ── Bottom gradient overlay ──────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(7, 12, 22, 0.60) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Play button (links to experience / CTA) ──────────────────────── */}
      <CtaWrapper>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center
                       transition-all duration-300
                       group-hover:scale-110 group-hover:opacity-100
                       opacity-75"
            style={{
              background: 'rgba(7, 12, 22, 0.58)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: `1.5px solid ${accentHex}55`,
              boxShadow: `0 0 24px ${accentHex}33, 0 4px 16px rgba(0,0,0,0.45)`,
            }}
          >
            <PlayIcon />
          </div>
        </div>
      </CtaWrapper>

      {/* ── Status badge (top-right) ─────────────────────────────────────── */}
      <div className="absolute top-3 right-3 pointer-events-none" aria-hidden="true">
        {videoReady ? (
          /* Video is playing — show muted indicator */
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm">
            <MutedIcon />
            <span className="font-body text-[9px] text-white/65 font-medium">
              Muted
            </span>
          </div>
        ) : (
          /* Poster-only mode — show "Preview" label */
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: `${accentHex}18`,
              border: `1px solid ${accentHex}35`,
            }}
          >
            <span
              className="font-body text-[9px] font-medium"
              style={{ color: accentHex }}
            >
              Preview
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
