import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Prevent clickjacking — block iframe embedding on other sites
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // Prevent MIME-type sniffing attacks
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Force HTTPS for 1 year (Vercel already does this, but belt-and-suspenders)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );

  // Control what info is sent in the Referer header
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Block access to browser features you don't use
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );

  // Content Security Policy — allow your own assets + the external services you use
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.open-meteo.com https://api.weather.gov",
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
