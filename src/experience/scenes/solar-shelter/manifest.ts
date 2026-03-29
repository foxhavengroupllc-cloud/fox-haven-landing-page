/**
 * Solar Shelter Experience — Manifest
 *
 * ExperienceManifest: The complete narrative, visual, and technical definition.
 * SceneManifest: The engine runtime contract.
 *
 * Registration: registerExperience(experienceManifest, sceneManifest)
 * in src/experience/core/registry.ts
 */

import type { ExperienceManifest } from '../../authoring/types';
import type { SceneManifest } from '../../types/core';
import { SolarShelterFallback } from './SolarShelterFallback';

// ─── Experience Manifest ──────────────────────────────────────────────────────

export const experienceManifest: ExperienceManifest = {
  // ── Identity ────────────────────────────────────────────────────────────────
  id: 'solar-shelter-experience',
  title: 'Solar Heat Relief Shelter',
  status: 'complete',

  // ── Audience ────────────────────────────────────────────────────────────────
  audience: {
    primary:
      'Municipal and nonprofit decision-makers evaluating heat relief infrastructure partnerships in Phoenix and Maricopa County, AZ.',
    secondary:
      'Community members, journalists, and prospective donors researching Fox Haven\'s infrastructure work.',
    painContext:
      'Stakeholders are aware heat deaths are rising and existing bus-stop shade structures are inadequate, but lack a concrete, fundable alternative to advocate for.',
  },

  // ── Narrative Model ──────────────────────────────────────────────────────────
  narrative: {
    problem:
      'Phoenix recorded 480+ heat-related deaths in Maricopa County in 2023. The city averages 108 days above 100°F per year, yet no adequate public cooling infrastructure exists within walking distance of most high-risk residents.',
    contrast:
      'Existing bus stop shade structures reach 130°F+ on metal surfaces within 30 minutes, offer partial overhead shade for 1–2 people, and provide zero active cooling. They radiate heat rather than relieve it. Relying on them in an emergency is not survivable.',
    solution:
      'Fox Haven Solar Shelters are enclosed 8′×12′ structures with solar-powered AC, emergency charging, ADA accessibility, and real-time occupancy monitoring — designed to operate 24/7 with no utility cost.',
    proof:
      'Engineering specs confirm 37°F average interior temperature reduction vs. outdoor peak. Capacity: 12 simultaneous occupants. Maricopa County planning documents identify 50+ priority siting locations for Phase 1 deployment.',
    action:
      'Partner with Fox Haven to site, fund, or operate shelters in your jurisdiction or service area.',
    emotionalArc: 'fear-to-relief',
  },

  // ── CTA Goal ────────────────────────────────────────────────────────────────
  ctaGoal: {
    primaryAction: 'Partner With Us — contact Fox Haven about shelter placement or funding',
    destination: '/#contact',
    successMetric: 'Contact form submission from decision-maker or donor',
    secondaryAction: 'Return to Solar Shelters overview on the main site',
  },

  // ── Visual Style ─────────────────────────────────────────────────────────────
  visualStyle: {
    theme: 'heat-amber',
    motif:
      'Rising heat particles that shift from dense hot orange to cool blue-white as the narrative moves from crisis to resolution — visualizing the thermal relief the shelter provides.',
    colorPrimary: '#f97316',
    colorSecondary: '#06b6d4',
    typography: 'technical-monospace',
    moodKeywords: ['urgent', 'precise', 'protective', 'hopeful', 'human-scale'],
  },

  // ── Environment ──────────────────────────────────────────────────────────────
  environment: {
    setting: 'Phoenix, Arizona — open street, exposed concrete, mid-afternoon July. Transitioning to the interior of a solar-powered shelter.',
    lighting: 'Phase 0–1: harsh overhead sun, bleached surfaces, heat shimmer near ground. Phase 2–4: controlled interior diffuse light, cool temperature visual register.',
    atmosphere: 'Phase 0: oppressive and dangerous. Phase 4: calm, purposeful, and achievable.',
  },

  // ── Technical Requirements ────────────────────────────────────────────────────
  minimumTier: 'standard',
  mountType: 'full-experience',

  requiredModules: [
    {
      name: 'Canvas2DRenderer',
      purpose: 'Base class for HeatRenderer particle system — heat shimmer background effect',
    },
    {
      name: 'NarrativeSequencer',
      purpose: 'Phase management — 5-phase story arc with keyboard and click navigation',
    },
    {
      name: 'HotspotLayer',
      purpose: 'Interactive shelter component diagram in Phase 2 — reusable DOM overlay hotspots',
    },
    {
      name: 'ImmersiveLayout',
      purpose: 'Full-experience route wrapper with back navigation and body scroll lock',
    },
  ],

  assetRequirements: [
    // No external assets required — experience renders from Canvas 2D + CSS + inline SVG.
    // The solar-shelter-design.png (1.9 MB) is intentionally NOT used here per RISK-04.
  ],

  fallbackMode: {
    description:
      'Static dark page with orange ambient gradient, 4 stat cards (heat deaths, shelter size, solar power, capacity), 4 feature cards, and a Partner With Us CTA button. Visually coherent with the main site shell.',
    visualApproximation: 'simplified',
    reducedMotionBehavior: 'static-fallback',
  },

  // ── Metadata ─────────────────────────────────────────────────────────────────
  createdAt: '2026-03-28T00:00:00.000Z',
  updatedAt: '2026-03-28T00:00:00.000Z',
  author: 'Fox Haven Platform Team',
  initiativeId: 'solar-shelters',
  notes:
    'Phase 4 first flagship experience. Hybrid Canvas 2D + React DOM overlay. ' +
    'RISK-04 (solar-shelter-design.png 1.9 MB) intentionally avoided — scene uses inline SVG schematic. ' +
    'No external assets means instant first paint. NarrativeSequencer and HotspotLayer are reusable for all future experiences.',
};

// ─── Scene Manifest ───────────────────────────────────────────────────────────

export const sceneManifest: SceneManifest = {
  id: experienceManifest.id,
  displayName: experienceManifest.title,
  description:
    'Five-phase immersive narrative experience: heat crisis context → contrast with existing shelters → interactive shelter diagram → proof metrics → partner CTA.',
  mountType: 'full-experience',
  minimumTier: 'standard',
  assets: {
    totalBytes: 0, // No external assets — Canvas 2D + CSS only
    files: [],
  },
  component: () =>
    import('./SolarShelterScene').then((m) => ({ default: m.SolarShelterScene })),
  fallback: SolarShelterFallback,
  analyticsLabel: 'solar-shelter-experience',
  reducedMotionBehavior: 'static-fallback',
  initiativeId: 'solar-shelters',
  seoMetadata: {
    title: 'Solar Heat Relief Shelters — Fox Haven Group',
    description:
      'Fox Haven\'s network of enclosed, solar-powered cooling shelters — designed to save lives in the communities that need them most. Learn more and partner with us.',
  },
};
