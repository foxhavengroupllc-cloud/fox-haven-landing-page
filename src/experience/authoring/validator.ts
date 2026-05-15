/**
 * Experience Manifest Validator
 *
 * validateExperienceManifest() performs two levels of checks:
 *
 *   1. STRUCTURAL, required fields present and of the correct type
 *   2. CONTENT, no placeholder values (TODO, [insert], empty strings, defaults)
 *
 * It does NOT check completeness (whether a project is integration-ready).
 * For that, use checkExperienceCompleteness() in completenessChecker.ts.
 *
 * Usage:
 *   const result = validateExperienceManifest(manifest)
 *   if (!result.valid) { result.errors.forEach(e => console.error(e.message)) }
 */

import type { ExperienceManifest, AssetRequirement, RequiredModule } from './types';

// ─── Result Types ─────────────────────────────────────────────────────────────

export type ValidationSeverity = 'error' | 'warning';

export interface ValidationIssue {
  severity: ValidationSeverity;
  field: string;
  message: string;
  /** Suggested fix, if deterministic. */
  fix?: string;
}

export interface ValidationResult {
  /** True only when there are zero errors (warnings are allowed). */
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  /** All issues sorted: errors first, then warnings. */
  allIssues: ValidationIssue[];
}

// ─── Placeholder Detection ────────────────────────────────────────────────────

const PLACEHOLDER_PATTERNS = [
  /^\[.*\]$/,           // [insert something]
  /^TODO/i,             // TODO, todo
  /^FIXME/i,            // FIXME
  /^TBD$/i,             // TBD
  /^placeholder/i,      // placeholder text
  /^lorem/i,            // Lorem ipsum
  /^xxx/i,              // xxx
  /^<.*>$/,             // <fill in>
  /^\s*$/,              // empty or whitespace only
];

function isPlaceholder(value: string): boolean {
  return PLACEHOLDER_PATTERNS.some((p) => p.test(value.trim()));
}

function checkString(
  field: string,
  value: unknown,
  issues: ValidationIssue[],
  opts: { minLength?: number; required?: boolean } = {}
): boolean {
  const { minLength = 10, required = true } = opts;

  if (typeof value !== 'string') {
    if (required) {
      issues.push({ severity: 'error', field, message: `${field} must be a string` });
    }
    return false;
  }

  if (isPlaceholder(value)) {
    issues.push({
      severity: 'error',
      field,
      message: `${field} appears to be a placeholder, fill in real content`,
      fix: `Replace with specific, authored content (min ${minLength} characters)`,
    });
    return false;
  }

  if (value.trim().length < minLength) {
    issues.push({
      severity: 'error',
      field,
      message: `${field} is too short (${value.trim().length} chars), minimum ${minLength} characters`,
      fix: `Expand with specific detail`,
    });
    return false;
  }

  return true;
}

function checkHex(field: string, value: unknown, issues: ValidationIssue[]): void {
  if (typeof value !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(value)) {
    issues.push({
      severity: 'error',
      field,
      message: `${field} must be a valid 6-digit hex color (e.g., #F97316)`,
      fix: `Set to a hex color like "#F97316"`,
    });
  }
}

function checkDate(field: string, value: unknown, issues: ValidationIssue[]): void {
  if (typeof value !== 'string' || isNaN(Date.parse(value))) {
    issues.push({
      severity: 'error',
      field,
      message: `${field} must be a valid ISO 8601 date string (e.g., "2026-03-28")`,
      fix: `Set to new Date().toISOString()`,
    });
  }
}

// ─── Section Validators ───────────────────────────────────────────────────────

function validateIdentity(m: ExperienceManifest, issues: ValidationIssue[]): void {
  if (typeof m.id !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(m.id)) {
    issues.push({
      severity: 'error',
      field: 'id',
      message: 'id must be a kebab-case string (lowercase letters, numbers, hyphens only)',
      fix: 'e.g., "solar-shelter-experience" or "heat-relief-app"',
    });
  }

  checkString('title', m.title, issues, { minLength: 3 });

  const validStatuses = ['draft', 'in-progress', 'review', 'complete'];
  if (!validStatuses.includes(m.status)) {
    issues.push({
      severity: 'error',
      field: 'status',
      message: `status must be one of: ${validStatuses.join(', ')}`,
    });
  }
}

function validateAudience(m: ExperienceManifest, issues: ValidationIssue[]): void {
  if (!m.audience || typeof m.audience !== 'object') {
    issues.push({ severity: 'error', field: 'audience', message: 'audience is required' });
    return;
  }
  checkString('audience.primary', m.audience.primary, issues, { minLength: 15 });
  checkString('audience.painContext', m.audience.painContext, issues, { minLength: 20 });
  if (m.audience.secondary !== undefined) {
    checkString('audience.secondary', m.audience.secondary, issues, { minLength: 10 });
  }
}

function validateNarrative(m: ExperienceManifest, issues: ValidationIssue[]): void {
  if (!m.narrative || typeof m.narrative !== 'object') {
    issues.push({ severity: 'error', field: 'narrative', message: 'narrative is required' });
    return;
  }
  const n = m.narrative;
  checkString('narrative.problem', n.problem, issues, { minLength: 20 });
  checkString('narrative.contrast', n.contrast, issues, { minLength: 20 });
  checkString('narrative.solution', n.solution, issues, { minLength: 20 });
  checkString('narrative.proof', n.proof, issues, { minLength: 20 });
  checkString('narrative.action', n.action, issues, { minLength: 10 });

  if (!n.emotionalArc || isPlaceholder(String(n.emotionalArc))) {
    issues.push({
      severity: 'error',
      field: 'narrative.emotionalArc',
      message: 'narrative.emotionalArc is required, choose a canonical arc or describe a custom one',
      fix: 'e.g., "fear-to-relief" or "skepticism → evidence → action"',
    });
  }
}

function validateCtaGoal(m: ExperienceManifest, issues: ValidationIssue[]): void {
  if (!m.ctaGoal || typeof m.ctaGoal !== 'object') {
    issues.push({ severity: 'error', field: 'ctaGoal', message: 'ctaGoal is required' });
    return;
  }
  checkString('ctaGoal.primaryAction', m.ctaGoal.primaryAction, issues, { minLength: 5 });
  checkString('ctaGoal.destination', m.ctaGoal.destination, issues, { minLength: 1 });
  checkString('ctaGoal.successMetric', m.ctaGoal.successMetric, issues, { minLength: 10 });
}

function validateVisualStyle(m: ExperienceManifest, issues: ValidationIssue[]): void {
  if (!m.visualStyle || typeof m.visualStyle !== 'object') {
    issues.push({ severity: 'error', field: 'visualStyle', message: 'visualStyle is required' });
    return;
  }
  const vs = m.visualStyle;
  checkString('visualStyle.theme', vs.theme, issues, { minLength: 3 });
  checkString('visualStyle.motif', vs.motif, issues, { minLength: 10 });
  checkHex('visualStyle.colorPrimary', vs.colorPrimary, issues);
  if (vs.colorSecondary !== undefined) {
    checkHex('visualStyle.colorSecondary', vs.colorSecondary, issues);
  }
  checkString('visualStyle.typography', vs.typography, issues, { minLength: 3 });

  if (!Array.isArray(vs.moodKeywords) || vs.moodKeywords.length < 3) {
    issues.push({
      severity: 'error',
      field: 'visualStyle.moodKeywords',
      message: 'moodKeywords must be an array with at least 3 adjectives',
      fix: 'e.g., ["urgent", "protective", "precise", "hopeful"]',
    });
  } else if (vs.moodKeywords.some((k) => isPlaceholder(k))) {
    issues.push({
      severity: 'error',
      field: 'visualStyle.moodKeywords',
      message: 'moodKeywords contains placeholder values, replace with real adjectives',
    });
  }
}

function validateEnvironment(m: ExperienceManifest, issues: ValidationIssue[]): void {
  if (!m.environment || typeof m.environment !== 'object') {
    issues.push({ severity: 'error', field: 'environment', message: 'environment is required' });
    return;
  }
  checkString('environment.setting', m.environment.setting, issues, { minLength: 15 });
  checkString('environment.lighting', m.environment.lighting, issues, { minLength: 15 });
  checkString('environment.atmosphere', m.environment.atmosphere, issues, { minLength: 15 });
}

function validateTechnical(m: ExperienceManifest, issues: ValidationIssue[]): void {
  const validTiers = ['lite', 'standard', 'premium'];
  if (!validTiers.includes(m.minimumTier)) {
    issues.push({
      severity: 'error',
      field: 'minimumTier',
      message: `minimumTier must be one of: ${validTiers.join(', ')}`,
    });
  }

  const validMountTypes = ['section-bg', 'card-panel', 'full-experience'];
  if (!validMountTypes.includes(m.mountType)) {
    issues.push({
      severity: 'error',
      field: 'mountType',
      message: `mountType must be one of: ${validMountTypes.join(', ')}`,
    });
  }

  if (!Array.isArray(m.requiredModules) || m.requiredModules.length === 0) {
    issues.push({
      severity: 'warning',
      field: 'requiredModules',
      message: 'requiredModules is empty, if this experience uses no engine modules, that may be intentional',
    });
  } else {
    m.requiredModules.forEach((mod: RequiredModule, i: number) => {
      checkString(`requiredModules[${i}].name`, mod.name, issues, { minLength: 3 });
      checkString(`requiredModules[${i}].purpose`, mod.purpose, issues, { minLength: 10 });
    });
  }

  if (!Array.isArray(m.assetRequirements)) {
    issues.push({
      severity: 'error',
      field: 'assetRequirements',
      message: 'assetRequirements must be an array (may be empty if experience needs no assets)',
    });
  } else {
    const validDelivery = ['planned', 'in-production', 'delivered'];
    const validAssetTypes = ['texture', 'model', 'audio', 'video', 'data', 'shader', 'font'];

    m.assetRequirements.forEach((asset: AssetRequirement, i: number) => {
      checkString(`assetRequirements[${i}].id`, asset.id, issues, { minLength: 2 });
      if (!validAssetTypes.includes(asset.type)) {
        issues.push({
          severity: 'error',
          field: `assetRequirements[${i}].type`,
          message: `type must be one of: ${validAssetTypes.join(', ')}`,
        });
      }
      checkString(`assetRequirements[${i}].path`, asset.path, issues, { minLength: 5 });
      if (typeof asset.sizeEstimateKB !== 'number' || asset.sizeEstimateKB <= 0) {
        issues.push({
          severity: 'error',
          field: `assetRequirements[${i}].sizeEstimateKB`,
          message: 'sizeEstimateKB must be a positive number',
          fix: 'Estimate in KB, rough is fine, order-of-magnitude accuracy required',
        });
      }
      if (!validDelivery.includes(asset.deliveryStatus)) {
        issues.push({
          severity: 'error',
          field: `assetRequirements[${i}].deliveryStatus`,
          message: `deliveryStatus must be one of: ${validDelivery.join(', ')}`,
        });
      }
    });

    // Budget check: warn if total asset estimate exceeds tier budget
    const totalKB = m.assetRequirements.reduce((sum, a) => sum + (a.sizeEstimateKB || 0), 0);
    const budgetKB = m.minimumTier === 'premium' ? 5120 : m.minimumTier === 'standard' ? 2048 : 256;
    if (totalKB > budgetKB) {
      issues.push({
        severity: 'warning',
        field: 'assetRequirements (budget)',
        message: `Total estimated asset size (${totalKB} KB) exceeds ${m.minimumTier}-tier budget (${budgetKB} KB)`,
        fix: 'Reduce asset sizes, mark non-critical assets optional, or upgrade minimumTier',
      });
    }
  }

  if (!m.fallbackMode || typeof m.fallbackMode !== 'object') {
    issues.push({ severity: 'error', field: 'fallbackMode', message: 'fallbackMode is required' });
  } else {
    checkString('fallbackMode.description', m.fallbackMode.description, issues, { minLength: 15 });
    const validApprox = ['identical', 'close', 'simplified', 'minimal'];
    if (!validApprox.includes(m.fallbackMode.visualApproximation)) {
      issues.push({
        severity: 'error',
        field: 'fallbackMode.visualApproximation',
        message: `visualApproximation must be one of: ${validApprox.join(', ')}`,
      });
    }
    const validRMB = ['hide', 'static-fallback', 'slow-animation'];
    if (!validRMB.includes(m.fallbackMode.reducedMotionBehavior)) {
      issues.push({
        severity: 'error',
        field: 'fallbackMode.reducedMotionBehavior',
        message: `reducedMotionBehavior must be one of: ${validRMB.join(', ')}`,
      });
    }
  }
}

function validateMetadata(m: ExperienceManifest, issues: ValidationIssue[]): void {
  checkDate('createdAt', m.createdAt, issues);
  checkDate('updatedAt', m.updatedAt, issues);
  checkString('author', m.author, issues, { minLength: 2 });
}

// ─── Cross-field Consistency Checks ──────────────────────────────────────────

function validateConsistency(m: ExperienceManifest, issues: ValidationIssue[]): void {
  // Warn if narrative.action doesn't align with ctaGoal.primaryAction
  if (
    m.narrative?.action &&
    m.ctaGoal?.primaryAction &&
    !isPlaceholder(m.narrative.action) &&
    !isPlaceholder(m.ctaGoal.primaryAction)
  ) {
    const actionWords = m.narrative.action.toLowerCase().split(/\s+/);
    const ctaWords = m.ctaGoal.primaryAction.toLowerCase().split(/\s+/);
    const overlap = actionWords.filter((w) => ctaWords.includes(w) && w.length > 3);
    if (overlap.length === 0) {
      issues.push({
        severity: 'warning',
        field: 'narrative.action / ctaGoal.primaryAction',
        message: 'narrative.action and ctaGoal.primaryAction share no keywords, verify they describe the same user action',
      });
    }
  }

  // Warn if premium tier has no asset requirements
  if (m.minimumTier === 'premium' && Array.isArray(m.assetRequirements) && m.assetRequirements.length === 0) {
    issues.push({
      severity: 'warning',
      field: 'minimumTier / assetRequirements',
      message: 'Premium-tier experience has no asset requirements, typical premium scenes use at least one texture or model',
    });
  }

  // Warn if lite tier has module requirements that need WebGL
  const webglModules = ['WebGLRenderer', 'three', 'r3f', 'WebGL'];
  const hasWebGLModule = (m.requiredModules ?? []).some((mod) =>
    webglModules.some((wgl) => mod.name.toLowerCase().includes(wgl.toLowerCase()))
  );
  if (m.minimumTier === 'lite' && hasWebGLModule) {
    issues.push({
      severity: 'warning',
      field: 'minimumTier / requiredModules',
      message: 'Lite-tier minimum with WebGL module, lite tier only runs CSS. Raise minimumTier to "standard" or "premium".',
    });
  }
}

// ─── Public Validator ─────────────────────────────────────────────────────────

/**
 * Validate a manifest for structural correctness and content quality.
 *
 * Returns a ValidationResult with errors and warnings separated.
 * The manifest is considered valid only when `result.valid === true` (no errors).
 * Warnings do not block validation but should be reviewed.
 */
export function validateExperienceManifest(manifest: unknown): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!manifest || typeof manifest !== 'object') {
    return {
      valid: false,
      errors: [{ severity: 'error', field: 'manifest', message: 'manifest must be a non-null object' }],
      warnings: [],
      allIssues: [{ severity: 'error', field: 'manifest', message: 'manifest must be a non-null object' }],
    };
  }

  const m = manifest as ExperienceManifest;

  validateIdentity(m, issues);
  validateAudience(m, issues);
  validateNarrative(m, issues);
  validateCtaGoal(m, issues);
  validateVisualStyle(m, issues);
  validateEnvironment(m, issues);
  validateTechnical(m, issues);
  validateMetadata(m, issues);
  validateConsistency(m, issues);

  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    allIssues: [...errors, ...warnings],
  };
}

/**
 * Throw if the manifest does not pass validation.
 * Use in build scripts or CI where you want a hard failure.
 */
export function assertValidManifest(manifest: unknown): asserts manifest is ExperienceManifest {
  const result = validateExperienceManifest(manifest);
  if (!result.valid) {
    const messages = result.errors.map((e) => `  [${e.field}] ${e.message}`).join('\n');
    throw new Error(`Experience manifest validation failed:\n${messages}`);
  }
}

/**
 * Format a ValidationResult as a human-readable string for logging or CLI output.
 */
export function formatValidationResult(result: ValidationResult, manifestId?: string): string {
  const header = manifestId
    ? `Validation result for "${manifestId}":`
    : 'Validation result:';

  if (result.valid && result.warnings.length === 0) {
    return `${header}\n  ✓ All checks passed`;
  }

  const lines = [header];

  if (result.errors.length > 0) {
    lines.push(`\n  ERRORS (${result.errors.length}):`);
    result.errors.forEach((e) => {
      lines.push(`    ✗ [${e.field}] ${e.message}`);
      if (e.fix) lines.push(`      → ${e.fix}`);
    });
  }

  if (result.warnings.length > 0) {
    lines.push(`\n  WARNINGS (${result.warnings.length}):`);
    result.warnings.forEach((w) => {
      lines.push(`    ⚠ [${w.field}] ${w.message}`);
      if (w.fix) lines.push(`      → ${w.fix}`);
    });
  }

  lines.push(`\n  ${result.valid ? '✓ Valid' : '✗ Invalid'}, ${result.errors.length} error(s), ${result.warnings.length} warning(s)`);
  return lines.join('\n');
}
