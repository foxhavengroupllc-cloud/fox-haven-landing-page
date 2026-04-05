import { NextRequest, NextResponse } from 'next/server';

export function checkAdminAuth(req: NextRequest): NextResponse | null {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Admin"' } },
    );
  }

  const decoded = atob(auth.slice(6));
  const colonIndex = decoded.indexOf(':');
  if (colonIndex === -1) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = decoded.slice(0, colonIndex);
  const pass = decoded.slice(colonIndex + 1);

  if (
    user !== process.env.ADMIN_USER ||
    pass !== process.env.ADMIN_PASS
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null; // Auth passed
}
