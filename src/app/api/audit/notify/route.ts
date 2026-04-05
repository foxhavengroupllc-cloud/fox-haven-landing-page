import { NextResponse } from 'next/server';
import { supabase } from '@/db';
import { generateImplementationPlan } from '@/lib/audit/generatePlan';
import { sendInternalReport } from '@/lib/email/sendInternalReport';
import { isValidToken } from '@/lib/utils/tokens';

// Vercel Hobby plan: max 10s. Pro plan: set to 60.
export const maxDuration = 10;

async function processNotification(token: string) {
  const { data: session } = await supabase
    .from('audit_sessions')
    .select('id, scores, answers, company_id, contact_id')
    .eq('token', token)
    .single();

  if (!session) throw new Error('Session not found');

  const { data: company } = await supabase
    .from('audit_companies')
    .select('name, industry, revenue_band')
    .eq('id', session.company_id)
    .single();

  const { data: contact } = await supabase
    .from('audit_contacts')
    .select('name, email')
    .eq('id', session.contact_id)
    .single();

  if (!company || !contact) throw new Error('Missing company or contact data');

  const scores = session.scores as Record<string, unknown> | null;
  if (!scores) throw new Error('No scores on session');

  const recommendations = scores.recommendations as {
    opportunities: Array<{ title: string; description: string; impact: string; savingsEstimate?: string }>;
    blockers: Array<{ title: string; description: string; severity: string }>;
  } | null;

  const sections = (scores.sections as Array<{ section: string; normalized: number }>) || [];
  const answers = (session.answers as Record<string, string>) || {};

  const plan = await generateImplementationPlan({
    companyName: company.name,
    industry: company.industry || '',
    revenueBand: company.revenue_band || '',
    score: (scores.total as number) || 0,
    tier: (scores.tier as string) || 'moderate',
    sections,
    opportunities: recommendations?.opportunities || [],
    blockers: recommendations?.blockers || [],
    inefficiencyLow: (scores.inefficiencyLow as number) || 8000,
    inefficiencyHigh: (scores.inefficiencyHigh as number) || 18000,
    answers,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://foxhavengrouphq.com';

  await sendInternalReport({
    companyName: company.name,
    contactName: contact.name,
    contactEmail: contact.email,
    industry: company.industry || '',
    revenueBand: company.revenue_band || '',
    score: (scores.total as number) || 0,
    tier: (scores.tier as string) || 'moderate',
    inefficiencyLow: (scores.inefficiencyLow as number) || 8000,
    inefficiencyHigh: (scores.inefficiencyHigh as number) || 18000,
    opportunities: recommendations?.opportunities || [],
    blockers: recommendations?.blockers || [],
    plan,
    resultsUrl: `${siteUrl}/audit/results/${token}`,
  });

  await supabase
    .from('audit_follow_ups')
    .update({ stage: 'notified', updated_at: new Date().toISOString() })
    .eq('session_id', session.id);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = typeof body.token === 'string' ? body.token.trim() : '';

    if (!token)
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });

    if (!isValidToken(token))
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });

    const { data: session } = await supabase
      .from('audit_sessions')
      .select('id, status')
      .eq('token', token)
      .single();

    if (!session)
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    if (session.status !== 'completed')
      return NextResponse.json({ error: 'Audit not yet completed' }, { status: 400 });

    const { data: followUp } = await supabase
      .from('audit_follow_ups')
      .select('stage')
      .eq('session_id', session.id)
      .single();

    if (followUp?.stage === 'notified')
      return NextResponse.json({ ok: true, alreadySent: true });

    await processNotification(token);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Audit notify error:', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
