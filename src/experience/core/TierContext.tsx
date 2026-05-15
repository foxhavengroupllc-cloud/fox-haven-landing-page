'use client';

/**
 * TierContext, React context that provides the DeviceTier to all
 * engine components and scene authors.
 *
 * TierProvider runs the capability probe once at mount and distributes
 * the result downward. Scene components never call assignDeviceTier() directly.
 *
 * Usage:
 *   // In layout.tsx or a page:
 *   <TierProvider>
 *     <SceneHost sceneId="hero-ambient" ... />
 *   </TierProvider>
 *
 *   // In any nested component:
 *   const tier = useDeviceTier();
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { DeviceTier } from '../types/core';
import { getDeviceTier } from '../utils/capability';
import { getReducedMotion, useReducedMotion } from '../utils/reducedMotion';
import { emitTierAssigned } from '../utils/analytics';
import { probeGPUScore } from '../utils/capability';

// ─── Context Shape ────────────────────────────────────────────────────────────

interface TierContextValue {
  tier: DeviceTier;
  reducedMotion: boolean;
  /** Whether the initial capability probe has completed */
  ready: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const TierContext = createContext<TierContextValue>({
  tier: 'lite',
  reducedMotion: false,
  ready: false,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

interface TierProviderProps {
  children: React.ReactNode;
  /** Override the tier (for testing/Storybook) */
  forceTier?: DeviceTier;
}

export function TierProvider({ children, forceTier }: TierProviderProps) {
  const reducedMotion = useReducedMotion();

  const [value, setValue] = useState<TierContextValue>({
    tier: 'lite',         // Safe default until probe runs
    reducedMotion: false,
    ready: false,
  });

  useEffect(() => {
    const tier = forceTier ?? getDeviceTier();
    const rm = getReducedMotion();

    // Emit analytics
    emitTierAssigned(tier, probeGPUScore());

    setValue({
      tier: rm ? 'lite' : tier, // Reduced motion always → lite
      reducedMotion: rm,
      ready: true,
    });
  }, [forceTier]);

  // Sync reducedMotion changes (user toggles preference at runtime)
  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      reducedMotion,
      tier: reducedMotion ? 'lite' : (forceTier ?? getDeviceTier()),
    }));
  }, [reducedMotion, forceTier]);

  return (
    <TierContext.Provider value={value}>
      {children}
    </TierContext.Provider>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Returns the device tier assigned by the capability probe */
export function useDeviceTier(): DeviceTier {
  return useContext(TierContext).tier;
}

/** Returns the full tier context value */
export function useTierContext(): TierContextValue {
  return useContext(TierContext);
}
