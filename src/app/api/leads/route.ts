import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/db';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL ?? 'hello@foxhavengrouphq.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, company, painPoint, source } = body;

    if (!fullName?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const { error: dbError } = await supabase.from('leads').insert({
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      pain_point: painPoint?.trim() || null,
      source: source ?? 'ai-small-biz-page',
    });

    if (dbError) {
      console.error('[leads/route] DB insert error:', dbError);
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }

    await resend.emails.send({
      from: 'Fox Haven HQ <noreply@foxhavengrouphq.com>',
      to: NOTIFY_EMAIL,
      subject: `New lead: ${fullName} — ${company ?? 'Unknown company'}`,
      html: `
        <h2>New AI for Small Business Lead</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company ?? '—'}</p>
        <p><strong>Biggest pain point:</strong> ${painPoint ?? '—'}</p>
        <p><strong>Source:</strong> ${source ?? 'ai-small-biz-page'}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[leads/route]', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
