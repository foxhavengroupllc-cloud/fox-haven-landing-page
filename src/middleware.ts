import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Enforce basic auth on admin routes at the middleware level
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const auth = request.headers.get('authorization');
    if (!auth || !auth.startsWith('Basic ')) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Fox Haven Admin"' },
      });
    }
    const decoded = Buffer.from(auth.slice(6), 'base64').toString();
    const [user, pass] = decoded.split(':');
    if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Fox Haven Admin"' },
      });
    }
  }

  const response = NextResponse.next();

  // Prevent clickjacking, block iframe embedding on other sites
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

  // Content Security Policy, allow your own assets + the external services you use
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org",
      "font-src 'self' data:",
      "connect-src 'self' https://api.open-meteo.com https://api.weather.gov https://yusezaanxcehwofdagvk.supabase.co https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org",
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
