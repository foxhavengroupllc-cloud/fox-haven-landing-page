import { NextResponse, type NextRequest } from 'next/server';

const SUPABASE_URL = 'https://yusezaanxcehwofdagvk.supabase.co';

const isDev = process.env.NODE_ENV !== 'production';

// ── Private-preview gate (secret-link unlock) ─────────────────────
// While SITE_UNLOCK_KEY is set (Vercel production), the public sees the
// Coming Soon splash on every route. Visiting any URL with
// ?key=<SITE_UNLOCK_KEY> sets a year-long cookie that unlocks the full
// site. Leave the var unset (e.g. local dev) and the gate is off.
// To open the site to everyone at launch, delete the env var.
const UNLOCK_KEY = process.env.SITE_UNLOCK_KEY;
const UNLOCK_COOKIE = 'fhg_unlock';

function withSecurityHeaders(response: NextResponse): NextResponse {
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

export function middleware(request: NextRequest) {
  if (UNLOCK_KEY) {
    const url = request.nextUrl;
    const providedKey = url.searchParams.get('key');
    const unlocked = request.cookies.get(UNLOCK_COOKIE)?.value === UNLOCK_KEY;

    // Secret link: stash the unlock cookie, then redirect to a clean URL
    // so the key doesn't linger in the address bar or get shared by accident.
    if (providedKey === UNLOCK_KEY) {
      const clean = new URL(url);
      clean.searchParams.delete('key');
      const res = NextResponse.redirect(clean);
      res.cookies.set(UNLOCK_COOKIE, UNLOCK_KEY, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
      return res;
    }

    // Not unlocked → serve the Coming Soon splash on every route, while
    // keeping the visited URL intact (rewrite, not redirect).
    if (!unlocked) {
      return withSecurityHeaders(NextResponse.rewrite(new URL('/coming-soon', request.url)));
    }
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  // Run on all routes except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
