/**
 * Family Brain Full Experience — /initiatives/family-brain
 *
 * Hosts the immersive Family Brain App experience.
 * Uses ImmersiveLayout (body scroll lock + back navigation) and
 * SceneHost (tier-aware scene loading with fallback chain).
 *
 * Server component — all client logic is inside the engine.
 */

import type { Metadata } from 'next';
import { ImmersiveLayout, SceneHost } from '@/experience';

export const metadata: Metadata = {
  title: 'Family Brain App — Fox Haven Group',
  description:
    'From six scattered apps to one organized family hub. Family Brain unifies your calendar, tasks, groceries, budget, documents, and messaging — with AI that quietly connects the dots.',
  openGraph: {
    title: 'Family Brain App — Fox Haven Group',
    description:
      'An interactive look at how Family Brain organizes the chaos of modern family life into one calm, intelligent hub.',
    type: 'website',
    url: 'https://foxhavengroup.org/initiatives/family-brain',
  },
};

export default function FamilyBrainPage() {
  return (
    <ImmersiveLayout
      backHref="/#initiatives"
      backLabel="Back to Family Brain"
    >
      <SceneHost
        sceneId="family-brain-experience"
        mountType="full-experience"
      />
    </ImmersiveLayout>
  );
}
