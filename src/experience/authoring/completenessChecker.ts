/**
 * Experience Completeness Checker
 *
 * checkExperienceCompleteness() answers a different question than the validator:
 *
 *   Validator  → "Is this manifest structurally correct with real content?"
 *   Checker    → "Is this project actually ready to be integrated?"
 *
 * A manifest can be valid but still not integration-ready because:
 *   - status is not 'complete'
 *   - required assets have not been delivered
 *   - the SceneManifest has not been provided
 *
 * Integration-ready means all three gates pass:
 *   1. validateExperienceManifest() returns valid === true
 *   2. All required assets have deliveryStatus === 'delivered'
 *   3. status === 'complete'
 */

import type { ExperienceManifest, AssetRequirement } from './types';
import { validateExperienceManifest } from './validator';

// ─── Result Types ─────────────────────────────────────────────────────────────

export interface CompletenessReport {
  /** The manifest ID, for identification in logs. */
  id: string;
  /** True when the manifest passes structural validation (no errors). */
  isValid: boolean;
  /**
   * True only when the project is fully ready for engine integration:
   *   - isValid === true
   *   - status === 'complete'
   *   - all required assets delivered
   */
  isIntegrationReady: boolean;
  /**
   * Hard blockers that prevent integration.
   * Every blocker must be resolved before registerExperience() will succeed.
   */
  blockers: string[];
  /**
   * Non-blocking gaps that should be addressed but won't stop integration.
   * These represent quality or completeness debt.
   */
  gaps: string[];
  /**
   * Informational notes about the project state.
   */
  notes: string[];
  /** Asset delivery summary */
  assetSummary: AssetDeliverySummary;
  /** Validation error count */
  validationErrors: number;
  /** Validation warning count */
  validationWarnings: number;
}

export interface AssetDeliverySummary {
  total: number;
  delivered: number;
  inProduction: number;
  planned: number;
  /** Required assets that have not been delivered, these block integration. */
  requiredUndelivered: AssetRequirement[];
  /** Estimated total size of all required assets in KB. */
  requiredKB: number;
  /** Estimated total size of all optional assets in KB. */
  optionalKB: number;
}

// ─── Asset Summary Builder ────────────────────────────────────────────────────

function buildAssetSummary(assets: AssetRequirement[]): AssetDeliverySummary {
  const delivered = assets.filter((a) => a.deliveryStatus === 'delivered');
  const inProd = assets.filter((a) => a.deliveryStatus === 'in-production');
  const planned = assets.filter((a) => a.deliveryStatus === 'planned');
  const requiredUndelivered = assets.filter(
    (a) => a.required && a.deliveryStatus !== 'delivered'
  );

  const requiredKB = assets
    .filter((a) => a.required)
    .reduce((sum, a) => sum + a.sizeEstimateKB, 0);

  const optionalKB = assets
    .filter((a) => !a.required)
    .reduce((sum, a) => sum + a.sizeEstimateKB, 0);

  return {
    total: assets.length,
    delivered: delivered.length,
    inProduction: inProd.length,
    planned: planned.length,
    requiredUndelivered,
    requiredKB,
    optionalKB,
  };
}

// ─── Completeness Checker ─────────────────────────────────────────────────────

/**
 * Check whether an experience manifest is complete and integration-ready.
 *
 * @param manifest - The ExperienceManifest to check.
 * @returns A CompletenessReport with blockers, gaps, and integration-ready status.
 */
export function checkExperienceCompleteness(manifest: ExperienceManifest): CompletenessReport {
  const blockers: string[] = [];
  const gaps: string[] = [];
  const notes: string[] = [];

  // ── 1. Structural validation ──────────────────────────────────────────────

  const validationResult = validateExperienceManifest(manifest);
  if (!validationResult.valid) {
    validationResult.errors.forEach((e) => {
      blockers.push(`Validation error [${e.field}]: ${e.message}`);
    });
  }
  validationResult.warnings.forEach((w) => {
    gaps.push(`Validation warning [${w.field}]: ${w.message}`);
  });

  // ── 2. Status gate ────────────────────────────────────────────────────────

  if (manifest.status !== 'complete') {
    blockers.push(
      `status is "${manifest.status}", must be "complete" before integration. ` +
      `Set status to "complete" only when all content is authored and reviewed.`
    );
  }

  if (manifest.status === 'draft') {
    notes.push('This manifest is in "draft" status, authoring has not started.');
  } else if (manifest.status === 'in-progress') {
    notes.push('This manifest is "in-progress", content is being authored.');
  } else if (manifest.status === 'review') {
    notes.push('This manifest is in "review", awaiting sign-off to become "complete".');
  }

  // ── 3. Asset delivery gate ────────────────────────────────────────────────

  const assets = Array.isArray(manifest.assetRequirements) ? manifest.assetRequirements : [];
  const assetSummary = buildAssetSummary(assets);

  assetSummary.requiredUndelivered.forEach((asset) => {
    blockers.push(
      `Required asset "${asset.id}" (${asset.path}) has deliveryStatus "${asset.deliveryStatus}", must be "delivered" before integration`
    );
  });

  if (assetSummary.inProduction > 0) {
    notes.push(
      `${assetSummary.inProduction} asset(s) are "in-production", these will not block integration unless marked required`
    );
  }
  if (assetSummary.planned > 0) {
    notes.push(
      `${assetSummary.planned} asset(s) are still "planned", verify whether any are required`
    );
  }

  // ── 4. Narrative quality gaps ─────────────────────────────────────────────

  if (manifest.narrative) {
    const n = manifest.narrative;

    // Proof should ideally contain a number or proper noun
    if (n.proof && !/\d|[A-Z][a-z]/.test(n.proof)) {
      gaps.push(
        'narrative.proof contains no numbers or named references, proof is stronger with specific data (e.g., "143 families served") or named partners'
      );
    }

    // Contrast should feel visceral, warn if it's short
    if (n.contrast && n.contrast.trim().length < 40) {
      gaps.push(
        'narrative.contrast is brief, a stronger contrast makes the problem feel real. Consider expanding with specific consequences.'
      );
    }
  }

  // ── 5. CTA alignment gap ─────────────────────────────────────────────────

  if (manifest.ctaGoal && !manifest.ctaGoal.secondaryAction) {
    gaps.push(
      'ctaGoal.secondaryAction is not set, consider providing a lower-friction option for users not ready to take the primary action'
    );
  }

  // ── 6. initiativeId check ─────────────────────────────────────────────────

  if (!manifest.initiativeId) {
    notes.push(
      'initiativeId is not set, this experience will not be linked to an initiative in intent-config.ts. ' +
      'Set if this corresponds to an existing Fox Haven initiative.'
    );
  }

  // ── 7. Visual completeness ────────────────────────────────────────────────

  if (manifest.visualStyle && !manifest.visualStyle.colorSecondary) {
    gaps.push(
      'visualStyle.colorSecondary is not set, a secondary color helps art direction. Set if the experience uses two colors.'
    );
  }

  if (manifest.environment && !manifest.environment.soundscape && manifest.minimumTier === 'premium') {
    gaps.push(
      'environment.soundscape is not set for a premium-tier experience, consider whether audio direction is needed'
    );
  }

  // ── 8. Summary notes ─────────────────────────────────────────────────────

  const totalKB = assetSummary.requiredKB + assetSummary.optionalKB;
  if (totalKB > 0) {
    notes.push(`Estimated total asset size: ${totalKB} KB (required: ${assetSummary.requiredKB} KB, optional: ${assetSummary.optionalKB} KB)`);
  }

  const isIntegrationReady = blockers.length === 0;

  return {
    id: manifest.id ?? '(unknown)',
    isValid: validationResult.valid,
    isIntegrationReady,
    blockers,
    gaps,
    notes,
    assetSummary,
    validationErrors: validationResult.errors.length,
    validationWarnings: validationResult.warnings.length,
  };
}

/**
 * Format a CompletenessReport as a human-readable string for logging or CLI output.
 */
export function formatCompletenessReport(report: CompletenessReport): string {
  const lines: string[] = [];

  lines.push(`Completeness report for "${report.id}":`);
  lines.push(`  Status: ${report.isIntegrationReady ? '✓ INTEGRATION READY' : '✗ NOT READY'}`);
  lines.push(`  Validation: ${report.isValid ? '✓ valid' : '✗ invalid'} (${report.validationErrors} errors, ${report.validationWarnings} warnings)`);

  const { assetSummary: a } = report;
  lines.push(`  Assets: ${a.delivered}/${a.total} delivered (${a.requiredUndelivered.length} required missing)`);

  if (report.blockers.length > 0) {
    lines.push(`\n  BLOCKERS (${report.blockers.length}), must resolve before integration:`);
    report.blockers.forEach((b) => lines.push(`    ✗ ${b}`));
  }

  if (report.gaps.length > 0) {
    lines.push(`\n  GAPS (${report.gaps.length}), not blocking but should be addressed:`);
    report.gaps.forEach((g) => lines.push(`    ⚠ ${g}`));
  }

  if (report.notes.length > 0) {
    lines.push(`\n  NOTES:`);
    report.notes.forEach((n) => lines.push(`    · ${n}`));
  }

  return lines.join('\n');
}
