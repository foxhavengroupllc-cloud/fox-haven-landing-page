'use client';
/**
 * ExperienceProviders — Client boundary wrapper for the experience engine.
 *
 * Next.js App Router server layouts cannot import client components directly
 * as wrappers. This component provides the client boundary so TierProvider
 * can wrap the entire app from a server layout.
 *
 * Usage in layout.tsx:
 *   import { ExperienceProviders } from '@/components/ExperienceProviders'
 *   <ExperienceProviders>{children}</ExperienceProviders>
 */

import { TierProvider } from '@/experience';

export function ExperienceProviders({ children }: { children: React.ReactNode }) {
  return <TierProvider>{children}</TierProvider>;
}
