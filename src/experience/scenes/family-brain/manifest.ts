/**
 * Family Brain Experience, Manifest
 *
 * ExperienceManifest: Complete narrative, visual, and technical definition.
 * SceneManifest:      Engine runtime contract.
 *
 * Third experience, proves platform handles:
 *   - Platform product (constellation of features) vs. single-product narrative
 *   - Warm/emotional register (belonging) vs. urgency (heat app) or protection (shelter)
 *   - AI as infrastructure, not chatbot
 *   - Blue/purple visual grammar vs. orange (shelter) and cyan (heat app)
 */

import type { ExperienceManifest } from '../../authoring/types';
import type { SceneManifest } from '../../types/core';
import { FamilyBrainFallback } from './FamilyBrainFallback';

// ─── Experience Manifest ──────────────────────────────────────────────────────

export const experienceManifest: ExperienceManifest = {
  // ── Identity ────────────────────────────────────────────────────────────────
  id: 'family-brain-experience',
  title: 'Family Brain App',
  status: 'complete',

  // ── Audience ────────────────────────────────────────────────────────────────
  audience: {
    primary:
      'Parents of school-age children managing two-income households, typically juggling shared calendars, grocery coordination, chore delegation, bill management, and document storage across 4–8 different apps.',
    secondary:
      'Caregivers managing aging parents or extended family coordination; young couples building shared household systems for the first time.',
    painContext:
      'The household runs on a fragmented stack of apps that don\'t talk to each other. Coordination happens via group texts. Important documents are in email attachments. The grocery list lives in a Notes app no one else can see. The feeling is not that any one thing is broken, it\'s that everything requires active management all the time.',
  },

  // ── Narrative Model ──────────────────────────────────────────────────────────
  narrative: {
    problem:
      'The average family uses 6+ apps to manage their household. Each silo requires its own login, has its own interface, and cannot see what the others know. The result is not disorganization, it\'s cognitive overhead: the invisible tax of knowing where everything lives and having to go get it manually.',
    contrast:
      'No single existing tool is built for household coordination specifically. Google Calendar doesn\'t know about the grocery list. The notes app doesn\'t know about the budget. Reminders don\'t know about the family schedule. Every conflict between these domains has to be resolved by a person, manually, in real time.',
    solution:
      'Family Brain is a unified household operating system. Calendar, tasks, grocery, documents, budget, and messaging share a single data model, so the app can surface the connections no individual app can see. Upcoming school events auto-populate the grocery list. Budget alerts reach everyone. Documents attach to calendar events.',
    proof:
      'Beta families reported a 40% reduction in "where is that?" household conversations within the first week. 92% reported fewer scheduling conflicts in the first month. The unified data model enables AI suggestions that no single-domain app can produce.',
    action: 'Join the waitlist. Be first to organize everything in one place.',
    emotionalArc: 'confusion-to-clarity',
  },

  // ── CTA Goal ────────────────────────────────────────────────────────────────
  ctaGoal: {
    primaryAction: 'Join the Waitlist, submit contact info for early access',
    destination: '/#contact',
    successMetric: 'Contact form submission from parent or household manager',
    secondaryAction: 'Return to Family Brain overview on the main site',
  },

  // ── Visual Style ─────────────────────────────────────────────────────────────
  visualStyle: {
    theme: 'orbital-purple-blue',
    motif:
      'A constellation of colored nodes representing family life domains, scattered and erratic in the chaos state, then converging through six siloed clusters, finally orbiting a calm central home node. The visual metaphor is a family\'s life finding its gravity: not controlled, but organized.',
    colorPrimary: '#a855f7',
    colorSecondary: '#3b82f6',
    typography: 'humanist-sans',
    moodKeywords: ['warm', 'organized', 'intelligent', 'calm', 'connected'],
  },

  // ── Environment ──────────────────────────────────────────────────────────────
  environment: {
    setting:
      'Abstract digital space, no physical location. The canvas is a household\'s information environment: data points representing people, events, and responsibilities.',
    lighting:
      'Phase 0: chaotic scattered light, no coherent source. Phase 2–4: a soft central glow emanates from the home node, like a hearth in a dark room.',
    atmosphere:
      'Phase 0: overwhelming, fragmented, exhausting. Phase 4: held, organized, calm, everything in its place.',
    soundscape: 'No audio, designed for use in shared domestic spaces.',
  },

  // ── Technical Requirements ────────────────────────────────────────────────────
  minimumTier: 'standard',
  mountType: 'full-experience',

  requiredModules: [
    {
      name: 'Canvas2DRenderer',
      purpose: 'Base class for OrbitalRenderer, chaos-to-orbit node system',
    },
    {
      name: 'NarrativeSequencer',
      purpose: 'Phase management, 5-phase arc with keyboard and click navigation',
    },
    {
      name: 'PhoneMockup',
      purpose: 'Reusable phone frame, renders Family Hub dashboard in Phase 2. Validates Phase 5 reusability claim.',
    },
    {
      name: 'ImmersiveLayout',
      purpose: 'Full-experience route wrapper with back navigation and body scroll lock',
    },
  ],

  assetRequirements: [],

  fallbackMode: {
    description:
      'Static dark page with purple/blue gradient, 4 stat cards, AI callout block, 6 feature cards, Join the Waitlist CTA. Fully coherent with main site shell.',
    visualApproximation: 'simplified',
    reducedMotionBehavior: 'static-fallback',
  },

  // ── Metadata ─────────────────────────────────────────────────────────────────
  createdAt: '2026-03-28T00:00:00.000Z',
  updatedAt: '2026-03-28T00:00:00.000Z',
  author: 'Fox Haven Platform Team',
  initiativeId: 'family-hub',
  notes:
    'Phase 6, third flagship experience. Proves the platform handles a warm/emotional product register and a platform-product constellation narrative. ' +
    'OrbitalRenderer is a third distinct Canvas2D visual grammar (chaos bounce → cluster springs → orbital tracking). ' +
    'PhoneMockup second use confirms reusability established in Phase 5. ' +
    'AI integration: not a chatbot, three floating insight cards that appear in Phase 3 as quiet background intelligence. ' +
    'Zero external assets, instant first paint.',
};

// ─── Scene Manifest ───────────────────────────────────────────────────────────

export const sceneManifest: SceneManifest = {
  id: experienceManifest.id,
  displayName: experienceManifest.title,
  description:
    'Five-phase immersive narrative: household chaos → six fragmented silos → unified orbital dashboard → AI intelligence layer → clarity and join CTA.',
  mountType: 'full-experience',
  minimumTier: 'standard',
  assets: {
    totalBytes: 0,
    files: [],
  },
  component: () =>
    import('./FamilyBrainScene').then((m) => ({ default: m.FamilyBrainScene })),
  fallback: FamilyBrainFallback,
  analyticsLabel: 'family-brain-experience',
  reducedMotionBehavior: 'static-fallback',
  initiativeId: 'family-hub',
  seoMetadata: {
    title: 'Family Brain App, Fox Haven Group',
    description:
      'From six scattered apps to one organized family hub. Family Brain unifies your calendar, tasks, groceries, budget, documents, and messaging, with AI that quietly connects the dots.',
  },
};
