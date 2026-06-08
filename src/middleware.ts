import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://yusezaanxcehwofdagvk.supabase.co';

const isDev = process.env.NODE_ENV !== 'production';

export function middleware() {
  const response = NextResponse.next();

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  // Prevent MIME-type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // Force HTTPS for 1 year (Vercel also does this)
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // Limit referrer info
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Block unused browser features
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  // Content Security Policy — self-hosted assets + Supabase (lead capture).
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      // React dev mode needs eval() for debugging; production never uses it.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      `connect-src 'self' ${SUPABASE_URL}`,
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  return response;
}

export const config = {
  // Run on all routes except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
