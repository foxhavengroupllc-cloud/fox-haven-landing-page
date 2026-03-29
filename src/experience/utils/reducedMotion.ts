'use client';

/**
 * Reduced motion detection for the Experience Engine.
 * Tracks both the OS/browser preference and an optional user override stored
 * in localStorage under 'foxhaven-reduce-motion'.
 */

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'foxhaven-reduce-motion';

// ─── useReducedMotion hook ────────────────────────────────────────────────────

/**
 * Returns true if the user or OS has requested reduced motion.
 * Reactively updates when the OS preference changes.
 * Reads localStorage for the user's manual override.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    // Safe default during SSR
    if (typeof window === 'undefined') return false;
    return resolveReducedMotion();
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    function update() {
      setReduced(resolveReducedMotion());
    }

    mq.addEventListener('change', update);

    // Also listen for localStorage changes (user toggle in another tab)
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) update();
    });

    // Initial sync (covers SSR mismatch)
    update();

    return () => {
      mq.removeEventListener('change', update);
    };
  }, []);

  return reduced;
}

// ─── Imperative helpers ───────────────────────────────────────────────────────

/**
 * Returns the current reduced-motion state without a hook.
 * Safe to call outside React.
 */
export function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return resolveReducedMotion();
}

/** User manually enables reduced motion (persists to localStorage) */
export function setUserReduceMotion(value: boolean): void {
  if (typeof window === 'undefined') return;
  if (value) {
    localStorage.setItem(STORAGE_KEY, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  // Dispatch a storage event so other tabs/hooks react
  window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
}

// ─── Internal ─────────────────────────────────────────────────────────────────

function resolveReducedMotion(): boolean {
  // User override takes precedence
  try {
    if (localStorage.getItem(STORAGE_KEY) === 'true') return true;
  } catch {
    // localStorage may be blocked (private browsing, security policy)
  }
  // Fall back to OS/browser preference
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
