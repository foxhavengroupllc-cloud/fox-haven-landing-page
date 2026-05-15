/**
 * Heat Relief App Full Experience, /initiatives/heat-relief-app
 *
 * Hosts the immersive Heat Relief App experience.
 * Uses ImmersiveLayout (body scroll lock + back navigation) and
 * SceneHost (tier-aware scene loading with fallback chain).
 *
 * Server component, all client logic is inside the engine.
 */

import type { Metadata } from 'next';
import { ImmersiveLayout, SceneHost } from '@/experience';

export const metadata: Metadata = {
  title: 'Heat Relief App, Fox Haven Group',
  description:
    'Find the nearest open cooling center in under a minute. The Fox Haven Heat Relief App maps every verified shelter in real time, designed for heat emergencies in Phoenix, AZ.',
  openGraph: {
    title: 'Heat Relief App, Fox Haven Group',
    description:
      'An interactive look at how the Fox Haven Heat Relief App guides Phoenix residents to cooling centers during extreme heat emergencies.',
    type: 'website',
    url: 'https://foxhavengroup.org/initiatives/heat-relief-app',
  },
};

export default function HeatReliefAppPage() {
  return (
    <ImmersiveLayout
      backHref="/#initiatives"
      backLabel="Back to Heat Relief App"
    >
      <SceneHost
        sceneId="heat-relief-app-experience"
        mountType="full-experience"
      />
    </ImmersiveLayout>
  );
}
