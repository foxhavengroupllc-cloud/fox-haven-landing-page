import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/db';
import { checkAdminAuth } from '@/lib/utils/admin-auth';

const BUCKET = 'pitch-decks';

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

    const { data: fileData, error: downloadErr } = await supabase.storage
      .from(BUCKET)
      .download(run.pptx_file_path);

    if (downloadErr || !fileData) {
      console.error('[pitch/download] storage error:', downloadErr);
      return NextResponse.json({ error: 'File not found in storage' }, { status: 404 });
    }

    const buffer = Buffer.from(await fileData.arrayBuffer());
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
