import { NextRequest, NextResponse } from 'next/server';
import { validateCompanyInput } from '@/lib/pitch/validators';
import { runPitchGenerationPipeline } from '@/lib/pitch/run-pipeline';
import { checkAdminAuth } from '@/lib/utils/admin-auth';

export async function POST(req: NextRequest) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const validation = validateCompanyInput(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validation.errors },
      { status: 400 },
    );
  }

  try {
    const result = await runPitchGenerationPipeline(validation.data);
    const status = result.status === 'completed' ? 200 : 500;
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error('[pitch/generate] Pipeline error:', err);
    return NextResponse.json(
      {
        error: 'Pipeline failed',
        message: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
