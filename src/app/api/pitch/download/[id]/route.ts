import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/db';
import { readFile } from 'fs/promises';
import { checkAdminAuth } from '@/lib/utils/admin-auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const { id } = await params;

  try {
    const { data: run, error } = await supabase
      .from('pitch_runs')
      .select('pptx_file_path, company_id')
      .eq('id', id)
      .single();

    if (error || !run?.pptx_file_path) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const { data: company } = await supabase
      .from('companies')
      .select('name')
      .eq('id', run.company_id)
      .single();

    const buffer = await readFile(run.pptx_file_path);
    const slug = (company?.name ?? 'deck')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="fox-haven-pitch-${slug}.pptx"`,
      },
    });
  } catch (err) {
    console.error('[pitch/download] error:', err);
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 },
    );
  }
}
