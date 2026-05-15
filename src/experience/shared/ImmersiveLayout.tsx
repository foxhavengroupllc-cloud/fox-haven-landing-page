'use client';

/**
 * ImmersiveLayout, layout wrapper for full-experience routes (/initiatives/*).
 *
 * Differences from the default Next.js layout:
 * - Body scroll is locked (overflow: hidden)
 * - Content area is full-viewport, no padding
 * - Provides a styled back-navigation affordance
 * - Nav and IntentWidget remain in the DOM (they're in the root layout)
 *
 * Usage in /initiatives/[slug]/page.tsx:
 *   <ImmersiveLayout backHref="/" backLabel="Back to overview">
 *     <SceneHost sceneId="solar-shelter-scene" mountType="full-experience" />
 *   </ImmersiveLayout>
 */

import React, { useEffect } from 'react';
import Link from 'next/link';

interface ImmersiveLayoutProps {
  children: React.ReactNode;
  /** URL to navigate back to */
  backHref?: string;
  /** Label for the back button */
  backLabel?: string;
}

export function ImmersiveLayout({
  children,
  backHref = '/',
  backLabel = 'Back to overview',
}: ImmersiveLayoutProps) {
  // Lock body scroll while immersive layout is mounted
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      className="relative w-full"
      style={{ height: '100dvh', overflow: 'hidden' }}
    >
      {/* Back navigation, positioned above the scene */}
      {backHref && (
        <div
          className="absolute top-20 left-6 z-10"
          style={{ zIndex: 'var(--z-content)' }}
        >
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm font-medium text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/10 transition-all duration-200"
            aria-label={backLabel}
          >
            <span aria-hidden="true">←</span>
            {backLabel}
          </Link>
        </div>
      )}

      {/* Scene mount area, full viewport */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 'var(--z-immersive-bg)' }}
      >
        {children}
      </div>
    </div>
  );
}
