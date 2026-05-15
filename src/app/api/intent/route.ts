import { NextRequest, NextResponse } from 'next/server';
import { classifyAndRespond } from '@/lib/claude-client';
import { isEmergencyIntent } from '@/lib/intent-config';

// In-memory rate limiter, resets on server restart (fine for edge/serverless)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_MINUTE = 20;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= MAX_PER_MINUTE) return false;

  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    );
  }

  let body: {
    message?: string;
    history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { message, history = [] } = body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  if (message.length > 600) {
    return NextResponse.json({ error: 'Message too long' }, { status: 400 });
  }

  const safeHistory = history.slice(-10).filter(
    (m) =>
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string'
  );

  const isEmergency = isEmergencyIntent(message);

  try {
    const result = await classifyAndRespond(message, safeHistory, isEmergency);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[intent] API error:', error);
    return NextResponse.json(
      {
        classification: 'general',
        response:
          "Something went wrong on our end. Please scroll down to explore our initiatives, or contact us directly.",
        actions: [
          { label: 'Explore initiatives', scrollTo: '#initiatives' },
          { label: 'Contact us', scrollTo: '#cta' },
        ],
      },
      { status: 200 }
    );
  }
}
