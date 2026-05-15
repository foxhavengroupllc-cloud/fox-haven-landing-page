/**
 * Experience Authoring Types, Fox Haven Experience Platform
 *
 * An ExperienceManifest is the authoring-time definition of a project experience.
 * It captures narrative, visual, and technical requirements before any code is written.
 *
 * Relationship to SceneManifest (Phase 2):
 *   ExperienceManifest  → authored by experience designers (this file)
 *   SceneManifest       → implemented by engineers (types/core.ts)
 *   registerExperience  → bridges them via the integration gate
 */

import type { DeviceTier, MountType, ReducedMotionBehavior } from '../types/core';

// ─── Status ───────────────────────────────────────────────────────────────────

/**
 * Lifecycle status of an experience manifest.
 * Only 'complete' manifests may be registered into the scene registry.
 */
export type ExperienceStatus =
  | 'draft'         // Initial skeleton, do not build yet
  | 'in-progress'   // Actively being authored, incomplete fields expected
  | 'review'        // Content complete, awaiting sign-off
  | 'complete';     // Signed off, integration allowed

// ─── Audience ─────────────────────────────────────────────────────────────────

export interface AudienceProfile {
  /** Who this experience is primarily for. Be specific: occupation, circumstance, need. */
  primary: string;
  /** Secondary audience who may encounter this experience. Optional. */
  secondary?: string;
  /**
   * The specific pain, context, or emotional state the audience arrives with.
   * This is what the experience meets them at, not a generic description.
   */
  painContext: string;
}

// ─── Narrative Model ──────────────────────────────────────────────────────────

/**
 * Canonical emotional arcs. Choose the one that best describes the journey
 * from where the audience arrives to where they should leave.
 */
export type EmotionalArc =
  | 'fear-to-relief'        // Threat → protection → safety
  | 'confusion-to-clarity'  // Complexity → explanation → understanding
  | 'isolation-to-connection' // Alone with problem → community → belonging
  | 'urgency-to-action'     // Crisis → immediate path → empowerment
  | 'aspiration-to-achievement' // Dream → proof → belief it's real
  | 'doubt-to-trust'        // Skepticism → evidence → confidence
  | string;                 // Custom arc, describe in plain language

export interface NarrativeModel {
  /**
   * The core problem, stated plainly and specifically.
   * One sentence. No jargon. Write it as the audience would say it.
   */
  problem: string;
  /**
   * What life looks like without this solution, the contrast that makes the solution valuable.
   * Should make the cost of inaction visceral, not theoretical.
   */
  contrast: string;
  /**
   * What Fox Haven provides. Specific, credible, not generic.
   * One to two sentences maximum.
   */
  solution: string;
  /**
   * Evidence, credibility, or social proof. Numbers, locations, testimonials, partnerships.
   * This is what moves an audience from interest to trust.
   */
  proof: string;
  /**
   * What the user should do next. Matches ctaGoal.primaryAction.
   * Written as an invitation, not a command.
   */
  action: string;
  /** The emotional journey from audience arrival state to desired exit state. */
  emotionalArc: EmotionalArc;
}

// ─── CTA Goal ─────────────────────────────────────────────────────────────────

export interface CTAGoal {
  /** The single primary action the user should take. Be specific. */
  primaryAction: string;
  /** Where the CTA navigates or submits to. */
  destination: string;
  /**
   * How success is measured. Quantifiable preferred.
   * e.g., "Email collected", "App store redirect", "Contact form submitted"
   */
  successMetric: string;
  /**
   * A secondary action for users not ready for the primary.
   * e.g., "Learn more", "Watch video"
   */
  secondaryAction?: string;
}

// ─── Visual Style ─────────────────────────────────────────────────────────────

/**
 * Typography character that defines the experience tone.
 */
export type TypographyCharacter =
  | 'technical-monospace'  // Data-driven, precision, engineering
  | 'humanist-sans'        // Warm, accessible, community-oriented
  | 'editorial-serif'      // Authority, trust, longform
  | 'display-expressive'   // Impact, motion, bold statements
  | string;               // Custom, describe the character

export interface VisualStyle {
  /**
   * The primary color theme. Use Fox Haven brand tokens where possible.
   * e.g., 'heat-amber', 'sky-blue', 'family-purple', 'emergency-red'
   */
  theme: string;
  /**
   * The central visual metaphor or motif.
   * e.g., 'solar geometry', 'data flow particles', 'thermal heatmap', 'shelter architecture'
   * This guides what gets rendered, not just how it looks.
   */
  motif: string;
  /** Primary brand hex color for this experience. */
  colorPrimary: string;
  /** Secondary accent hex color. Optional, inherit from theme if omitted. */
  colorSecondary?: string;
  /** Typography character that sets the emotional register. */
  typography: TypographyCharacter;
  /**
   * 3–5 adjectives that describe the mood.
   * e.g., ['urgent', 'clinical', 'protective', 'precise']
   */
  moodKeywords: string[];
}

// ─── Environment ──────────────────────────────────────────────────────────────

export interface EnvironmentSpec {
  /**
   * Physical or conceptual setting of the scene.
   * e.g., 'Phoenix rooftop at dusk', 'Abstract data space', 'Interior living room, summer'
   */
  setting: string;
  /**
   * Lighting direction and quality.
   * e.g., 'Harsh midday sun, long shadows, heat shimmer near ground'
   */
  lighting: string;
  /**
   * Atmospheric qualities the scene should communicate.
   * e.g., 'Oppressive heat giving way to cool shelter'
   */
  atmosphere: string;
  /**
   * Audio or soundscape direction. Optional, for experiences that include audio.
   * e.g., 'City ambient with AC hum, children laughing faintly in background'
   */
  soundscape?: string;
}

// ─── Module Requirements ──────────────────────────────────────────────────────

/** A capability or behavior module this experience requires from the engine. */
export interface RequiredModule {
  /**
   * Module identifier. Should match an existing engine module or describe a new one needed.
   * e.g., 'CameraController', 'InteractionManager', 'custom:heat-particle-system'
   */
  name: string;
  /** Why this module is needed, makes gaps visible during authoring review. */
  purpose: string;
}

// ─── Asset Requirements ───────────────────────────────────────────────────────

export type AssetType = 'texture' | 'model' | 'audio' | 'video' | 'data' | 'shader' | 'font';

export interface AssetRequirement {
  /** Unique ID within this manifest. Used to track delivery status. */
  id: string;
  type: AssetType;
  /**
   * Intended path under /public.
   * e.g., '/scenes/solar-shelter/model.glb'
   */
  path: string;
  /** Estimated file size in kilobytes. Used for budget planning. */
  sizeEstimateKB: number;
  /** If true, the scene cannot start without this asset. */
  required: boolean;
  /**
   * Current delivery status. Set to 'delivered' when the file is in /public.
   * Integration is blocked if any required asset is not 'delivered'.
   */
  deliveryStatus: 'planned' | 'in-production' | 'delivered';
  /** Who is responsible for producing this asset. Optional tracking field. */
  owner?: string;
}

// ─── Fallback Mode ────────────────────────────────────────────────────────────

export interface FallbackMode {
  /**
   * What the fallback looks like, written for a non-engineer reader.
   * e.g., 'Static orange gradient with headline text only. No animation.'
   */
  description: string;
  /**
   * How closely the fallback approximates the full experience.
   * Used to set stakeholder expectations.
   */
  visualApproximation: 'identical' | 'close' | 'simplified' | 'minimal';
  /** Which reduced-motion behavior applies. */
  reducedMotionBehavior: ReducedMotionBehavior;
}

// ─── Experience Manifest ──────────────────────────────────────────────────────

/**
 * The complete authoring definition for a Fox Haven project experience.
 *
 * Fill out every field before marking status as 'complete'.
 * Use PROJECT_VALIDATOR to check completeness.
 * The integration gate will block registration if any required field is a placeholder.
 *
 * Authoring workflow:
 *   1. Copy NEW_PROJECT_TEMPLATE
 *   2. Fill in this manifest
 *   3. Run validateExperienceManifest() → fix all errors
 *   4. Run checkExperienceCompleteness() → fix all blockers
 *   5. Set status to 'complete'
 *   6. Call registerExperience(manifest, sceneManifest)
 */
export interface ExperienceManifest {
  // ── Identity ────────────────────────────────────────────────────────────────

  /** Kebab-case unique identifier. Never changes after first integration. */
  id: string;
  /** Human-readable project title used in documentation and tooling. */
  title: string;
  /**
   * Current workflow status.
   * Only 'complete' manifests pass the integration gate.
   */
  status: ExperienceStatus;

  // ── Narrative ───────────────────────────────────────────────────────────────

  /** Who this experience is designed for. */
  audience: AudienceProfile;
  /** The 5-element narrative structure: problem, contrast, solution, proof, action. */
  narrative: NarrativeModel;
  /** What the user should do, where it leads, and how success is measured. */
  ctaGoal: CTAGoal;

  // ── Visual Direction ────────────────────────────────────────────────────────

  /** Color palette, motif, typography, and mood direction. */
  visualStyle: VisualStyle;
  /** Scene environment: setting, lighting, atmosphere. */
  environment: EnvironmentSpec;

  // ── Technical Requirements ──────────────────────────────────────────────────

  /**
   * Minimum device tier this experience targets.
   * 'lite'     → CSS-only fallback is the primary experience
   * 'standard' → 2D Canvas is the standard experience
   * 'premium'  → WebGL/WebGL2 is the standard experience
   */
  minimumTier: DeviceTier;
  /** How this experience is mounted in the page. */
  mountType: MountType;
  /** Engine modules this experience needs. List all, gaps surface integration risk. */
  requiredModules: RequiredModule[];
  /**
   * All assets this experience needs.
   * Required assets with deliveryStatus !== 'delivered' block integration.
   */
  assetRequirements: AssetRequirement[];
  /** How the experience degrades for lower-tier devices or reduced-motion users. */
  fallbackMode: FallbackMode;

  // ── Metadata ────────────────────────────────────────────────────────────────

  /** ISO 8601 date when this manifest was first created. */
  createdAt: string;
  /** ISO 8601 date when this manifest was last updated. */
  updatedAt: string;
  /** Name of the person or team responsible for this experience. */
  author: string;
  /**
   * Initiative ID from src/lib/intent-config.ts.
   * Required if this experience corresponds to an existing Fox Haven initiative.
   * Omit only for standalone experiences with no initiative counterpart.
   */
  initiativeId?: string;
  /**
   * Notes for reviewers: decisions made, tradeoffs accepted, known constraints.
   * Not validated, for human readers only.
   */
  notes?: string;
}
