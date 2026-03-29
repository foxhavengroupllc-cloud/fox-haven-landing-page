/**
 * Integration Gate — The enforced checkpoint between authoring and the scene registry.
 *
 * PURPOSE
 * -------
 * The integration gate prevents incomplete or invalid experience manifests from
 * being registered in the scene registry. It is the single enforcement point
 * for the authoring system's completeness requirements.
 *
 * Without the gate, a team member could import a draft manifest and register it
 * without filling in required narrative fields, asset requirements, or delivery
 * confirmation — silently shipping an incomplete experience.
 *
 * USAGE
 * -----
 * Replace direct registerScene() calls with registerExperience():
 *
 *   // Before (Phase 2 — no authoring gate):
 *   _registry.set(sceneManifest.id, sceneManifest)
 *
 *   // After (Phase 3 — gated registration):
 *   registerExperience(experienceManifest, sceneManifest)
 *
 * registerExperience() will throw IntegrationBlockedError if the experience
 * manifest has any blockers. The thrown error includes the full list of
 * blockers to guide the author toward resolution.
 *
 * OVERRIDE (development only)
 * ---------------------------
 * In development, you can bypass the gate using registerExperienceForced():
 *
 *   if (process.env.NODE_ENV === 'development') {
 *     registerExperienceForced(experienceManifest, sceneManifest)
 *   }
 *
 * This logs a loud warning and still runs validation, but does not throw on
 * blockers. Never use this in production.
 */

import type { SceneManifest } from '../types/core';
import type { ExperienceManifest } from './types';
import { checkExperienceCompleteness, formatCompletenessReport } from './completenessChecker';
import { registerScene } from '../core/registry';

// ─── Error Type ───────────────────────────────────────────────────────────────

/**
 * Thrown by registerExperience() when the experience manifest is not integration-ready.
 * The blockers property contains the full list of issues to resolve.
 */
export class IntegrationBlockedError extends Error {
  readonly experienceId: string;
  readonly blockers: string[];
  readonly report: ReturnType<typeof checkExperienceCompleteness>;

  constructor(
    experienceId: string,
    blockers: string[],
    report: ReturnType<typeof checkExperienceCompleteness>
  ) {
    const blockList = blockers.map((b) => `  - ${b}`).join('\n');
    super(
      `[experience-engine] Integration blocked for "${experienceId}".\n` +
      `Resolve the following blockers before calling registerExperience():\n` +
      `${blockList}\n\n` +
      `See AUTHORING_GUIDE.md and EXPERIENCE_CHECKLIST.md for guidance.`
    );
    this.name = 'IntegrationBlockedError';
    this.experienceId = experienceId;
    this.blockers = blockers;
    this.report = report;
  }
}

// ─── Integration Result ───────────────────────────────────────────────────────

export interface IntegrationResult {
  success: boolean;
  experienceId: string;
  sceneId: string;
  /** Present when success is false */
  error?: IntegrationBlockedError;
}

// ─── Gated Registration ───────────────────────────────────────────────────────

/**
 * Register an experience and its scene manifest, enforcing the integration gate.
 *
 * This is the required path for all new experiences after Phase 3.
 * Direct registerScene() calls bypass the authoring gate and should only be
 * used for engine-internal test scenes.
 *
 * @param experienceManifest - The fully authored ExperienceManifest.
 * @param sceneManifest - The corresponding SceneManifest for the engine to render.
 * @throws IntegrationBlockedError if the experience manifest has any blockers.
 */
export function registerExperience(
  experienceManifest: ExperienceManifest,
  sceneManifest: SceneManifest
): void {
  const report = checkExperienceCompleteness(experienceManifest);

  if (!report.isIntegrationReady) {
    throw new IntegrationBlockedError(
      experienceManifest.id,
      report.blockers,
      report
    );
  }

  // Log gaps as warnings (non-blocking quality debt)
  if (report.gaps.length > 0) {
    console.warn(
      `[experience-engine] "${experienceManifest.id}" registered with ${report.gaps.length} gap(s):\n` +
      report.gaps.map((g) => `  ⚠ ${g}`).join('\n')
    );
  }

  // Verify ID consistency between the two manifests
  if (experienceManifest.id !== sceneManifest.id) {
    console.warn(
      `[experience-engine] ExperienceManifest id "${experienceManifest.id}" does not match ` +
      `SceneManifest id "${sceneManifest.id}". Using SceneManifest id for the registry.`
    );
  }

  registerScene(sceneManifest);
}

/**
 * Development-only bypass for registerExperience().
 * Logs loud warnings but does not throw on blockers.
 * NEVER call this in production code.
 */
export function registerExperienceForced(
  experienceManifest: ExperienceManifest,
  sceneManifest: SceneManifest
): void {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      '[experience-engine] registerExperienceForced() cannot be called in production. ' +
      'Use registerExperience() and resolve all blockers.'
    );
  }

  const report = checkExperienceCompleteness(experienceManifest);

  console.warn(
    `\n⚠️  [experience-engine] FORCED REGISTRATION — "${experienceManifest.id}"\n` +
    `This bypasses the integration gate. DO NOT use in production.\n\n` +
    formatCompletenessReport(report) +
    `\n`
  );

  registerScene(sceneManifest);
}

/**
 * Check whether an experience manifest would pass the integration gate
 * without actually registering anything. Useful for CI validation scripts.
 *
 * @returns An IntegrationResult with success status and optional error.
 */
export function checkIntegrationEligibility(
  experienceManifest: ExperienceManifest,
  sceneManifest: SceneManifest
): IntegrationResult {
  const report = checkExperienceCompleteness(experienceManifest);

  if (report.isIntegrationReady) {
    return {
      success: true,
      experienceId: experienceManifest.id,
      sceneId: sceneManifest.id,
    };
  }

  const error = new IntegrationBlockedError(experienceManifest.id, report.blockers, report);
  return {
    success: false,
    experienceId: experienceManifest.id,
    sceneId: sceneManifest.id,
    error,
  };
}
