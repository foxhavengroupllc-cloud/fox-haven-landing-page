import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/db';
import { checkAdminAuth } from '@/lib/utils/admin-auth';

export async function GET(req: NextRequest) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') ?? '';
  const statusFilter = searchParams.get('status') ?? '';

  try {
    let query = supabase
      .from('pitch_runs')
      .select(`
        id,
        status,
        pptx_file_path,
        llm_model,
        created_at,
        updated_at,
        company_id
      `)
      .order('created_at', { ascending: false });

    if (statusFilter) {
      query = query.eq('status', statusFilter);
    }

    const { data: rows, error } = await query;

    if (error) throw error;

    // Fetch all companies for the runs
    const companyIds = [...new Set((rows ?? []).map((r) => r.company_id))];
    const { data: companiesData } = companyIds.length > 0
      ? await supabase.from('companies').select('id, name, industry').in('id', companyIds)
      : { data: [] };

    const companyMap = new Map(
      (companiesData ?? []).map((c) => [c.id, c]),
    );

    const runs = (rows ?? []).map((r) => {
      const company = companyMap.get(r.company_id);
      return {
        id: r.id,
        status: r.status,
        companyName: company?.name ?? '',
        industry: company?.industry ?? '',
        pptxFilePath: r.pptx_file_path,
        llmModel: r.llm_model,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      };
    });

    // Client-side search filter
    const filtered = search
      ? runs.filter(
          (r) =>
            r.companyName.toLowerCase().includes(search.toLowerCase()) ||
            r.industry.toLowerCase().includes(search.toLowerCase()),
        )
      : runs;

    return NextResponse.json({ runs: filtered });
  } catch (err) {
    console.error('[pitch/runs] error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch runs' },
      { status: 500 },
    );
  }
}
