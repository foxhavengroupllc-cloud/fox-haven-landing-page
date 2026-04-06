import { NextResponse } from 'next/server';
import { supabase } from '@/db';
import { scoreAudit } from '@/lib/audit/scoring';
import { generateOpportunities, generateBlockers } from '@/lib/audit/recommendations';
import { sendResultsEmail } from '@/lib/email/sendResults';
import { checkRateLimit } from '@/lib/utils/rateLimit';
import { isValidToken } from '@/lib/utils/tokens';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    if (!isValidToken(token)) return NextResponse.json({ error: 'Invalid token' }, { status: 400 });

    if (!checkRateLimit(`complete:${token}`, 3, 3600_000))
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    const { data: session, error: fetchErr } = await supabase
      .from('audit_sessions')
      .select('id, answers, company_id, contact_id')
      .eq('token', token)
      .single();

    if (fetchErr || !session)
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const answers = (session.answers as Record<string, string>) || {};
    const score = scoreAudit(answers);
    const opportunities = generateOpportunities(answers);
    const blockers = generateBlockers(answers);

    const scores = {
      total: score.total,
      tier: score.tier,
      sections: score.sections,
      inefficiencyLow: score.inefficiencyLow,
      inefficiencyHigh: score.inefficiencyHigh,
      recommendations: { opportunities, blockers },
    };

    const { error: updateErr } = await supabase
      .from('audit_sessions')
      .update({ status: 'completed', scores, updated_at: new Date().toISOString() })
      .eq('token', token);

    if (updateErr) throw new Error(updateErr.message);

    // Update follow-up stage
    await supabase
      .from('audit_follow_ups')
      .update({ stage: 'scored', updated_at: new Date().toISOString() })
      .eq('session_id', session.id);

    // Fetch contact for email
    const { data: contact } = await supabase
      .from('audit_contacts')
      .select('name, email')
      .eq('id', session.contact_id)
      .single();

    if (contact?.email && process.env.RESEND_API_KEY) {
      try {
        await sendResultsEmail({
          to: contact.email,
          name: contact.name || 'there',
          score: score.total,
          tier: score.tier,
          topOpportunity: opportunities[0]?.title || 'Operational improvements',
          token,
        });
      } catch (emailError) {
        console.error('Failed to send results email:', emailError instanceof Error ? emailError.message : 'unknown');
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Audit complete error:', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'Failed to complete audit' }, { status: 500 });
  }
}
