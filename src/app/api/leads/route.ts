import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/db';
import { Resend } from 'resend';

const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL ?? 'hello@foxhavengrouphq.com';

/**
 * Lazily construct the Resend client so a missing RESEND_API_KEY does not
 * crash `next build` while collecting page data for this route. Returns
 * null if the key is missing; the POST handler degrades to a database-only
 * write and logs a warning instead of failing the request.
 */
function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

/* ── Rate limiter (per IP, 5 submissions per 15 min) ── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

/* ── HTML sanitizer — escape all user input before embedding in HTML ── */
function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ── Allowed source values (prevent injection via source field) ── */
const ALLOWED_SOURCES = [
  'ai-small-biz-page',
  'ai-solutions-hub',
  'ai-solutions-pricing',
  'ai-solutions-faq',
  'partner-page',
  'home-bottom-cta',
];

function sanitizeSource(source: unknown): string {
  if (
    typeof source === 'string' &&
    (ALLOWED_SOURCES.includes(source) ||
      source.startsWith('ai-solutions-') ||
      source.startsWith('partner-'))
  ) {
    return source.replace(/[^a-z0-9-]/gi, '');
  }
  return 'ai-small-biz-page';
}

export async function POST(req: NextRequest) {
  try {
    /* Rate limiting */
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { fullName, email, company, painPoint, source } = body;

    if (!fullName?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    /* Input length limits */
    if (fullName.length > 200 || email.length > 254 || (company && company.length > 200) || (painPoint && painPoint.length > 500)) {
      return NextResponse.json({ error: 'Input too long.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const safeName = fullName.trim();
    const safeEmail = email.trim().toLowerCase();
    const safeCompany = company?.trim() || null;
    const safePainPoint = painPoint?.trim() || null;
    const safeSource = sanitizeSource(source);

    const { error: dbError } = await supabase.from('leads').insert({
      full_name: safeName,
      email: safeEmail,
      company: safeCompany,
      pain_point: safePainPoint,
      source: safeSource,
    });

    if (dbError) {
      console.error('[leads/route] DB insert error:', dbError);
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }

    const isPartner = safeSource.startsWith('partner-') || safeSource === 'home-bottom-cta';
    const leadHeading = isPartner ? 'New Partner / Beta Lead' : 'New AI Solutions Lead';
    const detailLabel = isPartner ? 'Partner type / note' : 'Biggest pain point';
    const subjectPrefix = isPartner ? 'New partner lead' : 'New lead';

    const resend = getResendClient();
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Fox Haven HQ <noreply@foxhavengrouphq.com>',
          to: NOTIFY_EMAIL,
          subject: `${subjectPrefix}: ${esc(safeName)} — ${esc(safeCompany ?? 'Unknown organization')}`,
          html: `
            <h2>${leadHeading}</h2>
            <p><strong>Name:</strong> ${esc(safeName)}</p>
            <p><strong>Email:</strong> ${esc(safeEmail)}</p>
            <p><strong>Organization:</strong> ${esc(safeCompany ?? '—')}</p>
            <p><strong>${detailLabel}:</strong> ${esc(safePainPoint ?? '—')}</p>
            <p><strong>Source:</strong> ${esc(safeSource)}</p>
          `,
        });
      } catch (emailErr) {
        // Don't fail the user-facing submission if the email send blows up —
        // the lead is already in the database. Surface for monitoring only.
        console.error('[leads/route] Resend send failed:', emailErr);
      }
    } else {
      console.warn('[leads/route] RESEND_API_KEY not configured — lead saved to DB without notification email');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[leads/route]', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
