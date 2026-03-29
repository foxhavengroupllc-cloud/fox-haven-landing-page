/**
 * Experience Authoring System — Public API
 *
 * The authoring system sits above the rendering engine (Phase 2) and ensures
 * every project experience is fully defined before it can be integrated.
 *
 * Primary consumers:
 *   - Experience authors filling out manifest.ts files
 *   - Engineers calling registerExperience() instead of registerScene()
 *   - CI scripts calling checkIntegrationEligibility()
 */

// ─── Types ────────────────────────────────────────────────────────────────────
export type {
  ExperienceManifest,
  ExperienceStatus,
  AudienceProfile,
  NarrativeModel,
  EmotionalArc,
  CTAGoal,
  VisualStyle,
  TypographyCharacter,
  EnvironmentSpec,
  RequiredModule,
  AssetRequirement,
  AssetType,
  FallbackMode,
} from './types';

// ─── Validator ────────────────────────────────────────────────────────────────
export {
  validateExperienceManifest,
  assertValidManifest,
  formatValidationResult,
} from './validator';

export type {
  ValidationResult,
  ValidationIssue,
  ValidationSeverity,
} from './validator';

// ─── Completeness Checker ─────────────────────────────────────────────────────
export {
  checkExperienceCompleteness,
  formatCompletenessReport,
} from './completenessChecker';

export type {
  CompletenessReport,
  AssetDeliverySummary,
} from './completenessChecker';

// ─── Integration Gate ─────────────────────────────────────────────────────────
export {
  registerExperience,
  registerExperienceForced,
  checkIntegrationEligibility,
  IntegrationBlockedError,
} from './integrationGate';

export type { IntegrationResult } from './integrationGate';
