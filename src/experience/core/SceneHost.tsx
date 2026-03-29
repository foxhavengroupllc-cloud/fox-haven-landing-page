'use client';

/**
 * SceneHost — the single component that page code uses to mount a scene.
 *
 * Responsibilities:
 * - Reads TierContext to get the device tier
 * - Looks up the SceneManifest from the registry
 * - Decides whether to load the scene or render the fallback immediately
 * - Lazily imports the scene component (browser-only, code-split)
 * - Manages the SceneLifecycleManager instance
 * - Catches errors via SceneErrorBoundary
 * - Provides SceneProps to the mounted scene component
 *
 * Usage:
 *   <SceneHost sceneId="hero-ambient" mountType="section-bg" targetId="hero" />
 *
 * IMPORTANT: This is a client component. It renders null on the server.
 * If you need to avoid even the SSR placeholder, wrap with next/dynamic ssr:false.
 */

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ComponentType,
} from 'react';
import type {
  SceneHostProps,
  SceneProps,
  FallbackProps,
  FallbackReason,
  DeviceTier,
  SceneManifest,
} from '../types/core';
import { useTierContext } from './TierContext';
import { getSceneManifest } from './registry';
import { ExperienceRuntime } from './ExperienceRuntime';
import { SceneLifecycleManager } from './SceneLifecycleManager';
import { SceneErrorBoundary } from '../shared/SceneErrorBoundary';
import { loadAssetManifest } from '../utils/assetLoader';
import { SceneChunkError, SceneAssetError } from '../utils/errors';
import { getPerformanceProfile } from '../types/performance';

// ─── Scene Mount ──────────────────────────────────────────────────────────────

interface MountedScene {
  Component: ComponentType<SceneProps>;
  manifest: SceneManifest;
  manager: SceneLifecycleManager;
  instanceKey: string;
}

// ─── SceneHost ────────────────────────────────────────────────────────────────

export function SceneHost({
  sceneId,
  mountType,
  targetId: _targetId,
  onReady,
  onFallback,
  className,
}: SceneHostProps) {
  const { tier, reducedMotion, ready } = useTierContext();
  const [mounted, setMounted] = useState<MountedScene | null>(null);
  const [fallback, setFallback] = useState<{
    reason: FallbackReason;
    manifest: SceneManifest | null;
  } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const loadStartRef = useRef<number>(0);
  const runtimeRef = useRef<ExperienceRuntime>(ExperienceRuntime.getInstance());

  // ─── Fallback helper ────────────────────────────────────────────────────────

  const triggerFallback = useCallback(
    (reason: FallbackReason, manifest: SceneManifest | null) => {
      setFallback({ reason, manifest });
      setMounted(null);
      onFallback?.(reason);
    },
    [onFallback]
  );

  // ─── Resize observer ────────────────────────────────────────────────────────

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(el);
    setDimensions({ width: el.offsetWidth, height: el.offsetHeight });
    return () => observer.disconnect();
  }, []);

  // ─── Visibility observer ─────────────────────────────────────────────────────

  useEffect(() => {
    const handler = () => {
      setIsVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  // ─── Fire onReady after first mount of scene ─────────────────────────────────

  useEffect(() => {
    if (!mounted) return;
    const { manager } = mounted;
    const loadTimeMs = performance.now() - loadStartRef.current;
    manager.setRunning({ loadTimeMs });
    onReady?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // ─── Scene loading ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!ready) return;

    // Cancel any in-flight load
    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;

    // Reset state
    setMounted(null);
    setFallback(null);
    loadStartRef.current = performance.now();

    const manifest = getSceneManifest(sceneId);

    // 1. Scene not in registry
    if (!manifest) {
      console.warn(`[SceneHost] Scene "${sceneId}" not found in registry.`);
      return; // Render nothing — SceneHost is inert when scene is unregistered
    }

    // 2. Reduced motion handling
    if (reducedMotion) {
      if (manifest.reducedMotionBehavior === 'hide') return;
      triggerFallback('reduced-motion', manifest);
      return;
    }

    // 3. Tier check
    const tierOrder: DeviceTier[] = ['lite', 'standard', 'premium'];
    const tierRank = (t: DeviceTier) => tierOrder.indexOf(t);
    if (tierRank(tier) < tierRank(manifest.minimumTier)) {
      triggerFallback('tier-too-low', manifest);
      return;
    }

    // 4. Mount lifecycle manager
    const { manager, instanceKey } = runtimeRef.current.mountScene(sceneId);
    manager.setLoading();

    // 5. Load assets (required only blocks)
    async function load() {
      try {
        await loadAssetManifest(manifest!.assets, { signal: abort.signal });
      } catch (err) {
        if (abort.signal.aborted) return;
        manager.setError(
          new SceneAssetError(sceneId, (err as Error).message),
          'asset-load-failed'
        );
        triggerFallback('asset-load-failed', manifest!);
        runtimeRef.current.unmountScene(instanceKey);
        return;
      }

      if (abort.signal.aborted) return;

      // 6. Load scene component chunk
      let SceneComponent: ComponentType<SceneProps>;
      try {
        const mod = await manifest!.component();
        SceneComponent = mod.default;
      } catch (err) {
        if (abort.signal.aborted) return;
        manager.setError(
          new SceneChunkError(sceneId, err as Error),
          'chunk-load-failed'
        );
        triggerFallback('chunk-load-failed', manifest!);
        runtimeRef.current.unmountScene(instanceKey);
        return;
      }

      if (abort.signal.aborted) return;

      manager.setReady();
      setMounted({ Component: SceneComponent, manifest: manifest!, manager, instanceKey });
    }

    void load();

    return () => {
      abort.abort();
      runtimeRef.current.unmountScene(instanceKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId, tier, reducedMotion, ready]);

  // ─── Container style by mountType ────────────────────────────────────────────

  const containerStyle: React.CSSProperties =
    mountType === 'section-bg'
      ? {
          position: 'absolute',
          inset: 0,
          zIndex: 'var(--z-immersive-bg)' as string,
          pointerEvents: 'none',
        }
      : mountType === 'card-panel'
      ? { position: 'relative', width: '100%', height: '100%' }
      : { position: 'fixed', inset: 0, zIndex: 'var(--z-immersive-bg)' as string };

  // ─── Render: not ready yet ───────────────────────────────────────────────────

  if (!ready) return null;

  // ─── Render: fallback ────────────────────────────────────────────────────────

  if (fallback && fallback.manifest) {
    const FallbackComponent = fallback.manifest.fallback;
    return (
      <div ref={containerRef} style={containerStyle} className={className}>
        <FallbackComponent
          reason={fallback.reason}
          tier={tier}
          reducedMotion={reducedMotion}
        />
      </div>
    );
  }

  // ─── Render: scene ────────────────────────────────────────────────────────────

  if (mounted) {
    const { Component, manifest, manager } = mounted;
    const perfProfile = getPerformanceProfile(tier);

    const handleSceneError = (err: Error) => {
      manager.setError(err, 'scene-error');
      triggerFallback('scene-error', manifest);
    };

    return (
      <div
        ref={containerRef}
        style={containerStyle}
        className={className}
        aria-hidden="true"
      >
        <SceneErrorBoundary
          sceneId={sceneId}
          fallback={
            <manifest.fallback
              reason="scene-error"
              tier={tier}
              reducedMotion={reducedMotion}
            />
          }
          onError={handleSceneError}
        >
          <Component
            tier={tier}
            reducedMotion={reducedMotion}
            width={dimensions.width}
            height={dimensions.height}
            isVisible={isVisible}
            onError={handleSceneError}
          />
        </SceneErrorBoundary>
      </div>
    );
  }

  // ─── Render: nothing (loading or unregistered) ────────────────────────────

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      className={className}
      aria-hidden="true"
    />
  );
}
