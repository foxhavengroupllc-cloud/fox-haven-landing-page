import type { CompanyInput, EnrichmentResult } from '@/lib/pitch/types';

export function buildSystemPrompt(): string {
  return `You are a senior AI strategy analyst generating structured sales-analysis content for Fox Haven Group's internal pitch engine. Fox Haven is a premium SMB AI consulting firm.

RULES:
- Return valid JSON only. No markdown, no extra text, no code fences.
- Do not claim exact internal company facts unless provided in the input.
- Use directional language: "likely", "typically", "often", "based on companies of similar size".
- Keep every string concise and presentation-safe. No paragraphs.
- Avoid buzzwords. Be specific and concrete.
- Focus on: time loss, revenue leakage, slow response, manual process burden, uncontrolled AI use risk.
- When AI Audit Results are provided, treat them as verified evidence — use confident language ("the audit revealed", "assessment confirmed") rather than directional language for audit-backed claims.
- When audit results include inefficiency estimates, use those figures for impactEstimate instead of generating new ones.
- Cite audit findings in evidenceNotes (e.g. "AI Solutions Audit scored operations at 32/100").
- Never include bullet markers in strings.
- Never exceed the character limits specified in the schema.
- All content must fit on presentation slides — short, punchy, clear.

OUTPUT SCHEMA:
{
  "companySummary": string (max 240 chars),
  "positioningHeadline": string (max 120 chars),
  "likelyPains": [2-3 strings, max 100 chars each],
  "inefficiencies": [2-3 objects with { area, issue, impact }],
  "opportunities": [2-3 strings, max 120 chars each],
  "recommendedQuickWin": string (max 140 chars),
  "impactEstimate": { low: string, high: string, label: string },
  "ninetyDayPlan": { month1: string, month2: string, month3: string },
  "engagementOptions": [2-3 objects with { name, description }],
  "riskAndGovernance": [2-3 strings, max 100 chars each],
  "evidenceNotes": [1-4 strings, max 140 chars each]
}

"area" must be one of: Sales, Operations, Admin, Customer Experience, Reporting, Compliance.
"impactEstimate" values should use range language, e.g. "$80K", "$220K", "annual recoverable value".
"evidenceNotes" should cite reasoning or data sources for key claims.`;
}

export function buildUserPrompt(
  input: CompanyInput,
  enrichment?: EnrichmentResult | null,
): string {
  const parts: string[] = [
    '=== COMPANY INFORMATION ===',
    `Company Name: ${input.companyName}`,
    `Industry: ${input.industry}`,
  ];

  if (input.employeeRange) parts.push(`Employee Range: ${input.employeeRange}`);
  if (input.revenueBand) parts.push(`Revenue Band: ${input.revenueBand}`);
  if (input.contactName) parts.push(`Contact: ${input.contactName}`);
  if (input.contactTitle) parts.push(`Title: ${input.contactTitle}`);
  if (input.notes) parts.push(`Notes: ${input.notes}`);

  if (input.auditFindings) {
    parts.push('');
    parts.push('=== AI SOLUTIONS AUDIT RESULTS (verified, from structured assessment) ===');
    parts.push(input.auditFindings);
    parts.push('(These are verified findings from a completed audit — prioritize them over inferred data when building pains, inefficiencies, opportunities, and impact estimates.)');
  }

  if (enrichment) {
    parts.push('');
    parts.push('=== WEBSITE ENRICHMENT (inferred, not confirmed) ===');
    parts.push(`Website Title: ${enrichment.title}`);
    parts.push(`Meta Description: ${enrichment.metaDescription}`);
    parts.push(`Summary: ${enrichment.summary}`);
    if (enrichment.inferredServices.length > 0) {
      parts.push(`Inferred Services: ${enrichment.inferredServices.join(', ')}`);
    }
    if (enrichment.inferredFrictionPoints.length > 0) {
      parts.push(
        `Inferred Friction Points: ${enrichment.inferredFrictionPoints.join(', ')}`,
      );
    }
    parts.push('(All inferred data is approximate and should be treated as directional.)');
  }

  parts.push('');
  parts.push(
    'Generate the PitchBrief JSON object. Return JSON only, no extra text.',
  );

  return parts.join('\n');
}

export function buildCorrectionPrompt(
  errors: string[],
  previousOutput: string,
): string {
  return `Your previous output failed validation. Fix the following errors and return corrected JSON only.

ERRORS:
${errors.map((e) => `- ${e}`).join('\n')}

PREVIOUS OUTPUT:
${previousOutput}

Return corrected JSON only. No extra text.`;
}
