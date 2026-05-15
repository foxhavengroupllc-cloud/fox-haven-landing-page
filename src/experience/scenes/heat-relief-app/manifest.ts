/**
 * Heat Relief App Experience, Manifest
 *
 * ExperienceManifest: The complete narrative, visual, and technical definition.
 * SceneManifest:      The engine runtime contract.
 *
 * Registration: registerExperience(experienceManifest, sceneManifest)
 * in src/experience/core/registry.ts
 *
 * Visual grammar deliberately differs from solar-shelter:
 *   - Shelter:  rising orange heat particles → atmospheric / physical
 *   - This:     cyan city-grid dot map → wayfinding / utility / decision support
 */

import type { ExperienceManifest } from '../../authoring/types';
import type { SceneManifest } from '../../types/core';
import { HeatReliefAppFallback } from './HeatReliefAppFallback';

// ─── Experience Manifest ──────────────────────────────────────────────────────

export const experienceManifest: ExperienceManifest = {
  // ── Identity ────────────────────────────────────────────────────────────────
  id: 'heat-relief-app-experience',
  title: 'Heat Relief App',
  status: 'complete',

  // ── Audience ────────────────────────────────────────────────────────────────
  audience: {
    primary:
      'Phoenix-area residents, especially elderly, low-income, and outdoor-working individuals who lack reliable access to air conditioning during extreme heat events.',
    secondary:
      'City and county public health staff, community health workers, and developers interested in contributing to or partnering on the app.',
    painContext:
      'During a heat emergency, people need to locate a cooling center in under 60 seconds, without requiring local knowledge, a car, or a reliable data connection. Current information is scattered across city websites that are slow, outdated, and not mobile-optimized.',
  },

  // ── Narrative Model ──────────────────────────────────────────────────────────
  narrative: {
    problem:
      'During a 116°F Phoenix heat event, a person without air conditioning has roughly 20 minutes of safe outdoor exposure. Finding an open, accessible cooling center today requires searching multiple city websites, calling ahead, and guessing at routes, a process that takes far longer than is safe.',
    contrast:
      'The current patchwork of city resource pages, 311 hotlines, and printed flyers is designed for desktop browsing in comfortable conditions, not for a person in heat distress with a phone and limited data. Most resources list addresses but not real-time capacity, hours, or ADA accessibility.',
    solution:
      'The Heat Relief App shows every verified open cooling center within 1 mile on a real-time map, sorted by walk time. Capacity, accessibility, and hours update every 5 minutes from a unified data feed. Route guidance works offline.',
    proof:
      'Beta testing in Phoenix summer 2025: median time from app open to route start was 47 seconds. 17 active cooling centers mapped within a 1-mile radius of a typical Phoenix residential block. NWS heat alert integration tested across 3 counties.',
    action: 'Join the beta. Be among the first to test the app in the field this summer.',
    emotionalArc: 'urgency-to-action',
  },

  // ── CTA Goal ────────────────────────────────────────────────────────────────
  ctaGoal: {
    primaryAction: 'Join the Beta, submit contact info to receive early access',
    destination: '/#contact',
    successMetric: 'Contact form submission from Phoenix-area resident or public health partner',
    secondaryAction: 'Return to Heat Relief App overview on the main site',
  },

  // ── Visual Style ─────────────────────────────────────────────────────────────
  visualStyle: {
    theme: 'wayfinding-cyan',
    motif:
      'A sparse city-block dot grid where cooling center dots ping to life as resources are discovered, shifting from emergency red to navigational cyan as the narrative moves from crisis to empowerment. Designed to feel like a public transit map or emergency dispatch screen, not an ambient atmosphere.',
    colorPrimary: '#06b6d4',
    colorSecondary: '#ef4444',
    typography: 'technical-monospace',
    moodKeywords: ['urgent', 'clear', 'navigable', 'useful', 'calm-under-pressure'],
  },

  // ── Environment ──────────────────────────────────────────────────────────────
  environment: {
    setting:
      'Abstract city grid, Phoenix street network at the scale of a neighborhood, rendered as a sparse dot map. Not an atmospheric scene; a utility interface in extremis.',
    lighting:
      'Phase 0: red-tinted emergency mode, danger is present. Phases 1–4: neutral dark with cyan as the only light source, communicating precision and navigability.',
    atmosphere:
      'Phase 0: oppressive urgency. Phase 1–2: purposeful, scanning. Phase 3: analytical clarity. Phase 4: resolved calm, you know what to do.',
    soundscape: 'No audio, experience is designed for users in public, often without headphones.',
  },

  // ── Technical Requirements ────────────────────────────────────────────────────
  minimumTier: 'standard',
  mountType: 'full-experience',

  requiredModules: [
    {
      name: 'Canvas2DRenderer',
      purpose: 'Base class for CityGridRenderer, dot grid background with ping animations and path draw',
    },
    {
      name: 'NarrativeSequencer',
      purpose: 'Phase management, 5-phase story arc with keyboard and click navigation',
    },
    {
      name: 'PhoneMockup',
      purpose: 'Reusable phone frame, renders app screen UI inside narrative phases. Also reusable for Family Hub.',
    },
    {
      name: 'ImmersiveLayout',
      purpose: 'Full-experience route wrapper with back navigation and body scroll lock',
    },
  ],

  assetRequirements: [
    // No external assets, experience uses Canvas 2D + CSS + inline JSX only.
  ],

  fallbackMode: {
    description:
      'Static dark page with cyan ambient gradient, 4 stat cards (centers found, walk time, uptime, response time), 6 feature cards, and a Join the Beta CTA button. Visually coherent with the main site shell.',
    visualApproximation: 'simplified',
    reducedMotionBehavior: 'static-fallback',
  },

  // ── Metadata ─────────────────────────────────────────────────────────────────
  createdAt: '2026-03-28T00:00:00.000Z',
  updatedAt: '2026-03-28T00:00:00.000Z',
  author: 'Fox Haven Platform Team',
  initiativeId: 'heat-relief-app',
  notes:
    'Phase 5 second flagship experience. Proves the platform adapts to a digital/public-health product (not just physical infrastructure). ' +
    'Visual grammar deliberately inverted from solar-shelter: cyan dot-grid wayfinding vs orange heat particles. ' +
    'PhoneMockup module is new and genuinely reusable for Family Hub (Phase 6). ' +
    'CityGridRenderer is experience-specific (Manhattan path logic, ping system, alert wave) but extends Canvas2DRenderer cleanly. ' +
    'Zero external assets, instant first paint.',
};

// ─── Scene Manifest ───────────────────────────────────────────────────────────

export const sceneManifest: SceneManifest = {
  id: experienceManifest.id,
  displayName: experienceManifest.title,
  description:
    'Five-phase immersive narrative: heat emergency context → cooling center discovery → route navigation → resource comparison → app download CTA.',
  mountType: 'full-experience',
  minimumTier: 'standard',
  assets: {
    totalBytes: 0,
    files: [],
  },
  component: () =>
    import('./HeatReliefAppScene').then((m) => ({ default: m.HeatReliefAppScene })),
  fallback: HeatReliefAppFallback,
  analyticsLabel: 'heat-relief-app-experience',
  reducedMotionBehavior: 'static-fallback',
  initiativeId: 'heat-relief-app',
  seoMetadata: {
    title: 'Heat Relief App, Fox Haven Group',
    description:
      'Find the nearest open cooling center in under a minute. The Fox Haven Heat Relief App maps every verified shelter in real time, designed for heat emergencies.',
  },
};
