import { NextResponse } from 'next/server';
import { supabase } from '@/db';
import { generateToken } from '@/lib/utils/tokens';
import { checkRateLimit, getClientIp } from '@/lib/utils/rateLimit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 200, email: 320, company: 200, title: 200, industry: 100, revenue: 50 };

function sanitize(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(`start:${ip}`, 5, 3600_000))
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });

    const body = await request.json();

    const companyName = sanitize(body.companyName, MAX_LEN.company);
    const industry = sanitize(body.industry, MAX_LEN.industry);
    const revenueRange = sanitize(body.revenueRange, MAX_LEN.revenue);
    const respondentName = sanitize(body.respondentName, MAX_LEN.name);
    const respondentEmail = sanitize(body.respondentEmail, MAX_LEN.email).toLowerCase();
    const respondentTitle = sanitize(body.respondentTitle, MAX_LEN.title);

    if (!companyName || !respondentName || !respondentEmail)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    if (!EMAIL_RE.test(respondentEmail))
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });

    const { data: company, error: companyErr } = await supabase
      .from('audit_companies')
      .insert({ name: companyName, industry: industry || null, revenue_band: revenueRange || null })
      .select()
      .single();

    if (companyErr || !company)
      throw new Error(companyErr?.message ?? 'Failed to create company');

    const { data: contact, error: contactErr } = await supabase
      .from('audit_contacts')
      .insert({ company_id: company.id, name: respondentName, email: respondentEmail, title: respondentTitle || null })
      .select()
      .single();

    if (contactErr || !contact)
      throw new Error(contactErr?.message ?? 'Failed to create contact');

    const token = generateToken();

    const { error: sessionErr } = await supabase
      .from('audit_sessions')
      .insert({ company_id: company.id, contact_id: contact.id, token, status: 'started', current_step: 0, answers: {} });

    if (sessionErr) throw new Error(sessionErr.message);

    await supabase
      .from('audit_follow_ups')
      .insert({ session_id: (await supabase.from('audit_sessions').select('id').eq('token', token).single()).data?.id, stage: 'new' });

    return NextResponse.json({ token });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'unknown';
    console.error('Audit start error:', msg);
    return NextResponse.json({ error: 'Failed to start audit', debug: msg }, { status: 500 });
  }
}
