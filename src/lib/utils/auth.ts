import { NextRequest, NextResponse } from 'next/server';

export function requireBasicAuth(request: NextRequest): NextResponse | null {
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

  return null;
}
