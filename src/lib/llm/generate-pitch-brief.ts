import Anthropic from '@anthropic-ai/sdk';
import { pitchBriefSchema, type PitchBrief, type CompanyInput, type EnrichmentResult } from '@/lib/pitch/types';
import { buildSystemPrompt, buildUserPrompt, buildCorrectionPrompt } from './prompts';

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

function getModel() {
  return process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-5';
}

interface GenerationResult {
  brief: PitchBrief | null;
  raw: string;
  validationErrors: string[] | null;
  model: string;
  retried: boolean;
}

export async function generatePitchBrief(
  input: CompanyInput,
  enrichment?: EnrichmentResult | null,
): Promise<GenerationResult> {
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(input, enrichment);

  const firstResponse = await callLLM(systemPrompt, [
    { role: 'user' as const, content: userPrompt },
  ]);
  const firstParsed = tryParse(firstResponse);

  if (firstParsed.success) {
    return {
      brief: firstParsed.data,
      raw: firstResponse,
      validationErrors: null,
      model: getModel(),
      retried: false,
    };
  }

  // Retry once with correction prompt appended to conversation
  const correctionPrompt = buildCorrectionPrompt(
    firstParsed.errors,
    firstResponse,
  );
  const secondResponse = await callLLM(systemPrompt, [
    { role: 'user' as const, content: userPrompt },
    { role: 'assistant' as const, content: firstResponse },
    { role: 'user' as const, content: correctionPrompt },
  ]);
  const secondParsed = tryParse(secondResponse);

  if (secondParsed.success) {
    return {
      brief: secondParsed.data,
      raw: secondResponse,
      validationErrors: null,
      model: getModel(),
      retried: true,
    };
  }

  return {
    brief: null,
    raw: secondResponse,
    validationErrors: secondParsed.errors,
    model: getModel(),
    retried: true,
  };
}

async function callLLM(
  system: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
): Promise<string> {
  const response = await getClient().messages.create({
    model: getModel(),
    max_tokens: 2048,
    system,
    messages,
  });

  const block = response.content[0];
  if (block.type === 'text') {
    return block.text.trim();
  }
  return '';
}

function tryParse(raw: string): { success: true; data: PitchBrief } | { success: false; errors: string[] } {
  // Strip markdown code fences if present
  let cleaned = raw;
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return { success: false, errors: ['Invalid JSON: ' + raw.slice(0, 200)] };
  }

  const result = pitchBriefSchema.safeParse(parsed);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.issues.map(
    (issue) => `${issue.path.join('.')}: ${issue.message}`,
  );
  return { success: false, errors };
}
