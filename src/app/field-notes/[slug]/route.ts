import { supabase } from '@/db';

// Issues are published at request time; never cache a stale copy.
export const dynamic = 'force-dynamic';

// Serve a published newsletter issue's self-contained HTML (its own locked
// design + fonts) at /field-notes/<slug>. 404 for unknown or unpublished slugs.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from('newsletter_issues')
    .select('web_html, status')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error || !data?.web_html) {
    return new Response('Issue not found', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  return new Response(data.web_html, {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
