import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/db';
import { requireBasicAuth } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
  const authResponse = requireBasicAuth(request);
  if (authResponse) return authResponse;

  try {
    const { data: sessions, error } = await supabase
      .from('audit_sessions')
      .select('id, token, status, scores, answers, created_at, updated_at, company_id, contact_id')
      .order('updated_at', { ascending: false });

    if (error) throw new Error(error.message);

    // Fetch companies and contacts for all sessions
    const companyIds = [...new Set((sessions ?? []).map((s) => s.company_id).filter(Boolean))];
    const contactIds = [...new Set((sessions ?? []).map((s) => s.contact_id).filter(Boolean))];

    const { data: companiesData } = companyIds.length > 0
      ? await supabase.from('audit_companies').select('id, name').in('id', companyIds)
      : { data: [] };

    const { data: contactsData } = contactIds.length > 0
      ? await supabase.from('audit_contacts').select('id, name, email').in('id', contactIds)
      : { data: [] };

    const companyMap = new Map((companiesData ?? []).map((c) => [c.id, c]));
    const contactMap = new Map((contactsData ?? []).map((c) => [c.id, c]));

    const enriched = (sessions ?? []).map((s) => {
      const company = companyMap.get(s.company_id);
      const contact = contactMap.get(s.contact_id);
      const scores = s.scores as Record<string, unknown> | null;

      return {
        id: s.id,
        token: s.token,
        companyName: company?.name ?? '',
        respondentName: contact?.name ?? '',
        respondentEmail: contact?.email ?? '',
        score: scores?.total ?? null,
        inefficiencyLow: scores?.inefficiencyLow ?? null,
        inefficiencyHigh: scores?.inefficiencyHigh ?? null,
        status: s.status,
        completedAt: s.status === 'completed' ? s.updated_at : null,
        createdAt: s.created_at,
      };
    });

    return NextResponse.json({ sessions: enriched });
  } catch (error) {
    console.error('Admin sessions error:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const authResponse = requireBasicAuth(request);
  if (authResponse) return authResponse;

  try {
    const { id, outreachStage } = await request.json();
    if (!id || !outreachStage)
      return NextResponse.json({ error: 'Missing id or outreachStage' }, { status: 400 });

    // Update the follow-up stage
    const { data: session } = await supabase
      .from('audit_sessions')
      .select('id')
      .eq('id', id)
      .single();

    if (!session)
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    await supabase
      .from('audit_follow_ups')
      .update({ stage: outreachStage, updated_at: new Date().toISOString() })
      .eq('session_id', id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Admin patch error:', error);
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
  }
}
