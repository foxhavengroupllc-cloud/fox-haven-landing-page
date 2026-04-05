import { supabase } from '@/db';
import type {
  CompanyInput,
  PipelineResult,
  RunStatus,
  EnrichmentResult,
} from './types';
import { enrichFromWebsite } from './enrichment';
import { generatePitchBrief } from '@/lib/llm/generate-pitch-brief';
import { buildPlaceholderMap } from './placeholder-map';
import { generatePitchDeck } from '@/lib/pptx/generate-deck';
import { saveDeck } from '@/lib/pptx/save-deck';

export async function runPitchGenerationPipeline(
  input: CompanyInput,
): Promise<PipelineResult> {
  let runId = '';

  try {
    // 1. Create company record
    const { data: company, error: companyErr } = await supabase
      .from('companies')
      .insert({
        name: input.companyName,
        website_url: input.websiteUrl || null,
        industry: input.industry,
        employee_range: input.employeeRange ?? null,
        revenue_band: input.revenueBand ?? null,
        contact_name: input.contactName ?? null,
        contact_title: input.contactTitle ?? null,
        notes: input.notes ?? null,
      })
      .select()
      .single();

    if (companyErr || !company) throw new Error(companyErr?.message ?? 'Failed to create company');

    // 2. Create pitch run row
    const { data: run, error: runErr } = await supabase
      .from('pitch_runs')
      .insert({
        company_id: company.id,
        status: 'draft',
        input_json: input,
      })
      .select()
      .single();

    if (runErr || !run) throw new Error(runErr?.message ?? 'Failed to create run');

    runId = run.id;

    // 3. Enrichment
    let enrichment: EnrichmentResult | null = null;
    if (input.useWebsiteEnrichment && input.websiteUrl) {
      await setStatus(runId, 'enriching');
      await logEvent(runId, 'enrichment_start', { url: input.websiteUrl });
      try {
        enrichment = await enrichFromWebsite(input.websiteUrl);
        await supabase
          .from('pitch_runs')
          .update({
            website_summary: enrichment.summary,
            enrichment_json: enrichment,
            updated_at: new Date().toISOString(),
          })
          .eq('id', runId);
        await logEvent(runId, 'enrichment_complete', enrichment);
      } catch (err) {
        await logEvent(runId, 'enrichment_failed', {
          error: err instanceof Error ? err.message : String(err),
        });
        // Continue without enrichment
      }
    }

    // 4. Generate pitch brief via LLM
    await setStatus(runId, 'generating_brief');
    await logEvent(runId, 'generation_start', null);

    const generation = await generatePitchBrief(input, enrichment);

    // 5. Validate
    await setStatus(runId, 'validating');

    if (!generation.brief) {
      await supabase
        .from('pitch_runs')
        .update({
          status: 'failed',
          validation_errors_json: generation.validationErrors,
          llm_model: generation.model,
          updated_at: new Date().toISOString(),
        })
        .eq('id', runId);
      await logEvent(runId, 'validation_failed', {
        errors: generation.validationErrors,
        retried: generation.retried,
      });
      return {
        runId,
        status: 'failed',
        pitchBrief: null,
        pptxFilePath: null,
        error: `Validation failed: ${generation.validationErrors?.join(', ')}`,
      };
    }

    await supabase
      .from('pitch_runs')
      .update({
        pitch_brief_json: generation.brief,
        llm_model: generation.model,
        updated_at: new Date().toISOString(),
      })
      .eq('id', runId);
    await logEvent(runId, 'generation_complete', {
      retried: generation.retried,
    });

    // 6. Build placeholder map
    await setStatus(runId, 'rendering_placeholders');
    const placeholders = buildPlaceholderMap(generation.brief, input);
    await supabase
      .from('pitch_runs')
      .update({
        placeholder_map_json: placeholders,
        updated_at: new Date().toISOString(),
      })
      .eq('id', runId);
    await logEvent(runId, 'placeholders_rendered', {
      count: Object.keys(placeholders).length,
    });

    // 7. Generate PPTX deck
    await setStatus(runId, 'creating_deck');
    const buffer = await generatePitchDeck(placeholders, input.companyName);
    const filePath = await saveDeck(buffer, input.companyName);

    // 8. Mark complete
    await supabase
      .from('pitch_runs')
      .update({
        status: 'completed',
        pptx_file_path: filePath,
        updated_at: new Date().toISOString(),
      })
      .eq('id', runId);
    await logEvent(runId, 'deck_created', { filePath });

    return {
      runId,
      status: 'completed',
      pitchBrief: generation.brief,
      pptxFilePath: filePath,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (runId) {
      await supabase
        .from('pitch_runs')
        .update({ status: 'failed', updated_at: new Date().toISOString() })
        .eq('id', runId)
        .then(() => {});
      await logEvent(runId, 'pipeline_error', { error: message }).catch(
        () => {},
      );
    }
    return {
      runId,
      status: 'failed',
      pitchBrief: null,
      pptxFilePath: null,
      error: message,
    };
  }
}

async function setStatus(runId: string, status: RunStatus) {
  await supabase
    .from('pitch_runs')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', runId);
}

async function logEvent(
  runId: string,
  eventType: string,
  data: unknown,
) {
  await supabase.from('pitch_run_events').insert({
    pitch_run_id: runId,
    event_type: eventType,
    event_json: data,
  });
}
