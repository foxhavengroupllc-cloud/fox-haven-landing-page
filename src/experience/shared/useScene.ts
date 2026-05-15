'use client';

/**
 * useScene, hook for scene components to access engine state.
 *
 * Provides:
 * - tier and reducedMotion from TierContext
 * - performance profile derived from tier
 * - a stable onError callback to report errors to SceneHost
 *
 * Usage inside a scene component:
 *   function MyScene({ tier, reducedMotion, onError }: SceneProps) {
 *     const { perfProfile } = useScene({ tier, reducedMotion, onError })
 *     // Use perfProfile.maxParticles, perfProfile.allowPostProcessing, etc.
 *   }
 */

import { useMemo, useCallback } from 'react';
import type { SceneProps } from '../types/core';
import type { PerformanceProfile } from '../types/performance';
import { getPerformanceProfile } from '../types/performance';
import { selectRenderMode } from '../renderers/RenderMode';

interface UseSceneResult {
  /** Full performance profile for this tier */
  perfProfile: PerformanceProfile;
  /** Convenience flag: true if scene should run at all */
  shouldAnimate: boolean;
  /** The render mode to use for this scene */
  renderMode: ReturnType<typeof selectRenderMode>;
  /** Stable error reporter, call this to trigger graceful fallback */
  reportError: (err: Error) => void;
}

export function useScene(props: Pick<SceneProps, 'tier' | 'reducedMotion' | 'onError'>): UseSceneResult {
  const { tier, reducedMotion, onError } = props;

  const perfProfile = useMemo(() => getPerformanceProfile(tier), [tier]);

  const renderMode = useMemo(() => selectRenderMode(tier), [tier]);

  const shouldAnimate = !reducedMotion && tier !== 'lite';

  const reportError = useCallback(
    (err: Error) => {
      console.error('[useScene] Scene error reported:', err);
      onError(err);
    },
    [onError]
  );

  return { perfProfile, renderMode, shouldAnimate, reportError };
}
