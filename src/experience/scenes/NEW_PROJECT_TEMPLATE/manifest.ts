/**
 * NEW PROJECT TEMPLATE, Experience Manifest
 *
 * INSTRUCTIONS
 * ────────────
 * 1. Copy this entire folder to src/experience/scenes/[your-project-id]/
 * 2. Rename this file to manifest.ts (it already is)
 * 3. Fill in EVERY field below, no placeholders allowed
 * 4. Run: npx ts-node -e "import('./manifest').then(m => console.log(require('../authoring').formatCompletenessReport(require('../authoring').checkExperienceCompleteness(m.experienceManifest)))"
 * 5. Fix all blockers, then set status to 'complete'
 * 6. In registry.ts: replace registerScene() with registerExperience(experienceManifest, sceneManifest)
 *
 * WHAT EACH FIELD MEANS
 * ─────────────────────
 * See AUTHORING_GUIDE.md for detailed guidance on each field.
 * See MANIFEST_SCHEMA.md for the full type reference.
 * See EXPERIENCE_CHECKLIST.md for the review checklist.
 *
 * SEARCH FOR "TODO" to find every field that needs your input.
 */

import type { ExperienceManifest } from '../../authoring';
import type { SceneManifest, FallbackProps } from '../../types/core';
// TODO: import your Fallback component once created
// import { YourFallback } from './Fallback';

// ─── Experience Manifest ──────────────────────────────────────────────────────

export const experienceManifest: ExperienceManifest = {
  // ── Identity ──────────────────────────────────────────────────────────────
  id: 'TODO-your-project-id',          // kebab-case, unique, permanent once set
  title: 'TODO Your Project Title',
  status: 'draft',                     // Change to 'complete' when all fields are authored

  // ── Audience ──────────────────────────────────────────────────────────────
  audience: {
    primary: 'TODO, Who specifically is this for? Occupation, circumstances, need.',
    secondary: 'TODO, Who else might encounter this? Omit this field if truly none.',
    painContext: 'TODO, What specific pain or situation does this audience arrive with?',
  },

  // ── Narrative Model ───────────────────────────────────────────────────────
  narrative: {
    problem: 'TODO, The core problem, stated plainly in one sentence.',
    contrast: 'TODO, What life looks like without this solution. Make inaction feel costly.',
    solution: 'TODO, What Fox Haven specifically provides. One to two sentences.',
    proof: 'TODO, Evidence or credibility. Include a number or named reference.',
    action: 'TODO, What the user should do next. Write as an invitation, not a command.',
    emotionalArc: 'TODO, e.g., "fear-to-relief" or "confusion-to-clarity"',
  },

  // ── CTA Goal ──────────────────────────────────────────────────────────────
  ctaGoal: {
    primaryAction: 'TODO, e.g., "Sign up for early access"',
    destination: 'TODO, e.g., "/get-involved" or "https://form.url"',
    successMetric: 'TODO, How is success measured? e.g., "Email collected via sign-up form"',
    secondaryAction: 'TODO, Lower-friction option. e.g., "Learn more about the initiative"',
  },

  // ── Visual Style ──────────────────────────────────────────────────────────
  visualStyle: {
    theme: 'TODO, e.g., "heat-amber", "sky-blue", "family-purple"',
    motif: 'TODO, The central visual metaphor. e.g., "solar geometry", "data flow particles"',
    colorPrimary: '#000000',           // TODO, Replace with actual hex color
    colorSecondary: '#000000',         // TODO, Replace or remove this field
    typography: 'TODO, e.g., "technical-monospace", "humanist-sans"',
    moodKeywords: ['TODO', 'TODO', 'TODO'],  // TODO, 3–5 adjectives
  },

  // ── Environment ───────────────────────────────────────────────────────────
  environment: {
    setting: 'TODO, Physical or conceptual setting. e.g., "Phoenix rooftop at dusk"',
    lighting: 'TODO, Lighting quality and direction. e.g., "Harsh midday sun, heat shimmer"',
    atmosphere: 'TODO, What the scene communicates emotionally.',
    soundscape: 'TODO, Audio direction. Remove this field if no audio planned.',
  },

  // ── Technical Requirements ────────────────────────────────────────────────
  minimumTier: 'standard',             // TODO, 'lite' | 'standard' | 'premium'
  mountType: 'section-bg',             // TODO, 'section-bg' | 'card-panel' | 'full-experience'

  requiredModules: [
    // TODO, List every engine module this experience needs
    // { name: 'Canvas2DRenderer', purpose: 'Particle animation for the background effect' },
    // { name: 'InteractionManager', purpose: 'Parallax on pointer move' },
  ],

  assetRequirements: [
    // TODO, List every asset this experience needs, with honest delivery status
    // {
    //   id: 'bg-texture',
    //   type: 'texture',
    //   path: '/scenes/your-project/bg.jpg',
    //   sizeEstimateKB: 120,
    //   required: true,
    //   deliveryStatus: 'planned',
    //   owner: 'Design team',
    // },
  ],

  fallbackMode: {
    description: 'TODO, What the fallback looks like. Written for a non-engineer reader.',
    visualApproximation: 'simplified', // 'identical' | 'close' | 'simplified' | 'minimal'
    reducedMotionBehavior: 'static-fallback', // 'hide' | 'static-fallback' | 'slow-animation'
  },

  // ── Metadata ──────────────────────────────────────────────────────────────
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  author: 'TODO, Your name or team name',
  initiativeId: undefined,             // TODO, Set if this links to an existing initiative
  notes: 'TODO, Any decisions, tradeoffs, or context reviewers should know.',
};

// ─── Scene Manifest ───────────────────────────────────────────────────────────
// The SceneManifest is the runtime rendering contract.
// Fill this out once the Experience Manifest is complete and you begin building the scene.

// TODO: Replace YourFallback with your actual Fallback component import
const PlaceholderFallback = (_props: FallbackProps) => null;

export const sceneManifest: SceneManifest = {
  id: experienceManifest.id,  // Always mirrors the experience ID
  displayName: experienceManifest.title,
  description: 'TODO, One sentence describing what this scene renders.',
  mountType: experienceManifest.mountType,
  minimumTier: experienceManifest.minimumTier,
  assets: {
    totalBytes: 0,  // TODO, Sum of all required asset bytes
    files: [
      // TODO, Mirror required assets from experienceManifest.assetRequirements
      // {
      //   path: '/scenes/your-project/bg.jpg',
      //   type: 'texture',
      //   bytes: 122880,
      //   required: true,
      // },
    ],
  },
  component: () =>
    // TODO, Replace with your actual scene component import
    import('./Scene').then((m) => ({ default: m.YourScene })) as never,
  fallback: PlaceholderFallback, // TODO, Replace with your actual Fallback component
  analyticsLabel: experienceManifest.id,
  reducedMotionBehavior: experienceManifest.fallbackMode.reducedMotionBehavior,
  initiativeId: experienceManifest.initiativeId,
};
