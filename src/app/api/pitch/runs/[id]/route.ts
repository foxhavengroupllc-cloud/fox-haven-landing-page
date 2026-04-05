import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/db';
import { checkAdminAuth } from '@/lib/utils/admin-auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    const { data: run, error: runErr } = await supabase
      .from('pitch_runs')
      .select('*')
      .eq('id', id)
      .single();

    if (runErr || !run) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const { data: company } = await supabase
      .from('companies')
      .select('*')
      .eq('id', run.company_id)
      .single();

    const { data: events } = await supabase
      .from('pitch_run_events')
      .select('*')
      .eq('pitch_run_id', id)
      .order('created_at', { ascending: true });

    return NextResponse.json({
      run,
      company,
      events: events ?? [],
    });
  } catch (err) {
    console.error('[pitch/runs/id] error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch run' },
      { status: 500 },
    );
  }
}
