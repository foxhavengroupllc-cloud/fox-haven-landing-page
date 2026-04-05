import { NextResponse } from 'next/server';
import { supabase } from '@/db';
import { checkRateLimit, getClientIp } from '@/lib/utils/rateLimit';
import { isValidToken } from '@/lib/utils/tokens';

export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params;

    if (!isValidToken(token))
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });

    const ip = getClientIp(_request);
    if (!checkRateLimit(`results:${ip}`, 20, 3600_000))
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    const { data: session, error: sessionErr } = await supabase
      .from('audit_sessions')
      .select('*')
      .eq('token', token)
      .single();

    if (sessionErr || !session)
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    // Fetch company name
    let companyName = '';
    if (session.company_id) {
      const { data: company } = await supabase
        .from('audit_companies')
        .select('name')
        .eq('id', session.company_id)
        .single();
      companyName = company?.name || '';
    }

    // Fetch contact name
    let respondentName = '';
    if (session.contact_id) {
      const { data: contact } = await supabase
        .from('audit_contacts')
        .select('name')
        .eq('id', session.contact_id)
        .single();
      respondentName = contact?.name || '';
    }

    const scores = session.scores as Record<string, unknown> | null;

    return NextResponse.json({
      token: session.token,
      companyName,
      respondentName,
      status: session.status,
      score: scores?.total ?? null,
      sections: scores?.sections ?? null,
      inefficiencyLow: scores?.inefficiencyLow ?? null,
      inefficiencyHigh: scores?.inefficiencyHigh ?? null,
      recommendations: scores?.recommendations ?? null,
      completedAt: session.updated_at,
    });
  } catch (error) {
    console.error('Results fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}
