import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/db';
import { checkAdminAuth } from '@/lib/utils/admin-auth';
import { runPitchGenerationPipeline } from '@/lib/pitch/run-pipeline';
import type { CompanyInput } from '@/lib/pitch/types';

export async function POST(req: NextRequest) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  let body: { runId: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.runId) {
    return NextResponse.json({ error: 'runId is required' }, { status: 400 });
  }

  try {
    const { data: existingRun, error } = await supabase
      .from('pitch_runs')
      .select('input_json')
      .eq('id', body.runId)
      .single();

    if (error || !existingRun) {
      return NextResponse.json({ error: 'Run not found' }, { status: 404 });
    }

    const input = existingRun.input_json as CompanyInput;
    if (!input?.companyName) {
      return NextResponse.json(
        { error: 'Original input is missing or invalid' },
        { status: 400 },
      );
    }

    const result = await runPitchGenerationPipeline(input);
    return NextResponse.json(result, {
      status: result.status === 'completed' ? 200 : 500,
    });
  } catch (err) {
    console.error('[pitch/regenerate] error:', err);
    return NextResponse.json(
      {
        error: 'Regeneration failed',
        message: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
