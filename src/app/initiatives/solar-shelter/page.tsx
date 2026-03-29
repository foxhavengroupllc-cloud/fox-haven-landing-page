/**
 * Solar Shelter Full Experience — /initiatives/solar-shelter
 *
 * This page hosts the flagship solar shelter immersive experience.
 * It uses ImmersiveLayout (body scroll lock + back navigation) and
 * SceneHost (tier-aware scene loading with fallback chain).
 *
 * The page is a server component. All client logic is inside the
 * engine components (ImmersiveLayout, SceneHost, TierProvider — the
 * TierProvider is provided by ExperienceProviders in layout.tsx).
 */

import type { Metadata } from 'next';
import { ImmersiveLayout, SceneHost } from '@/experience';

export const metadata: Metadata = {
  title: 'Solar Heat Relief Shelters — Fox Haven Group',
  description:
    "Fox Haven's network of enclosed, solar-powered cooling shelters — designed to save lives in the communities that need them most. Learn about the shelter design and partner with us.",
  openGraph: {
    title: 'Solar Heat Relief Shelters — Fox Haven Group',
    description:
      "An interactive look at Fox Haven's solar-powered cooling shelters for extreme heat relief in Phoenix, AZ.",
    type: 'website',
    url: 'https://foxhavengroup.org/initiatives/solar-shelter',
  },
};

export default function SolarShelterPage() {
  return (
    <ImmersiveLayout
      backHref="/#initiatives"
      backLabel="Back to Solar Shelters"
    >
      <SceneHost
        sceneId="solar-shelter-experience"
        mountType="full-experience"
      />
    </ImmersiveLayout>
  );
}
