import type { EnrichmentResult } from './types';

const MAX_BODY_LENGTH = 8000;
const FETCH_TIMEOUT = 8000;

export async function enrichFromWebsite(
  url: string,
): Promise<EnrichmentResult> {
  const html = await fetchPage(url);
  const title = extractTag(html, 'title');
  const metaDescription = extractMeta(html, 'description');
  const bodyText = extractBodyText(html);
  const truncated = bodyText.slice(0, MAX_BODY_LENGTH);

  const summary = buildSummary(title, metaDescription, truncated);
  const inferredServices = inferServices(truncated);
  const inferredFrictionPoints = inferFriction(truncated);

  return {
    title,
    metaDescription,
    summary,
    inferredServices,
    inferredFrictionPoints,
  };
}

/**
 * Blocked IP ranges: private, loopback, link-local, metadata services.
 * Prevents SSRF attacks targeting internal infrastructure.
 */
function isBlockedHost(hostname: string): boolean {
  // Block obvious internal hostnames
  const blocked = ['localhost', '0.0.0.0', '127.0.0.1', '[::1]', 'metadata.google.internal'];
  if (blocked.includes(hostname.toLowerCase())) return true;

  // Block IP addresses in private/reserved ranges
  const ipv4Match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [, a, b] = ipv4Match.map(Number);
    if (a === 10) return true;                          // 10.0.0.0/8
    if (a === 172 && b >= 16 && b <= 31) return true;   // 172.16.0.0/12
    if (a === 192 && b === 168) return true;             // 192.168.0.0/16
    if (a === 127) return true;                          // 127.0.0.0/8
    if (a === 169 && b === 254) return true;             // 169.254.0.0/16 (link-local + cloud metadata)
    if (a === 0) return true;                            // 0.0.0.0/8
    if (a >= 224) return true;                           // multicast + reserved
  }

  return false;
}

const MAX_REDIRECTS = 3;
const MAX_RESPONSE_BYTES = 2 * 1024 * 1024; // 2MB

async function fetchPage(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    let parsed: URL;
    try {
      parsed = new URL(normalizedUrl);
    } catch {
      throw new Error('Invalid URL');
    }

    // Only allow http/https
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      throw new Error('Only HTTP/HTTPS URLs are allowed');
    }

    // Block internal/private hosts
    if (isBlockedHost(parsed.hostname)) {
      throw new Error('URL targets a blocked address');
    }

    const res = await fetch(normalizedUrl, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; FoxHavenBot/1.0; +https://foxhavengroup.org)',
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Check final redirect destination isn't internal
    if (res.url) {
      try {
        const finalUrl = new URL(res.url);
        if (isBlockedHost(finalUrl.hostname)) {
          throw new Error('Redirect targets a blocked address');
        }
      } catch (e) {
        if (e instanceof Error && e.message.includes('blocked')) throw e;
      }
    }

    // Limit response size
    const contentLength = res.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_RESPONSE_BYTES) {
      throw new Error('Response too large');
    }

    const text = await res.text();
    if (text.length > MAX_RESPONSE_BYTES) {
      return text.slice(0, MAX_RESPONSE_BYTES);
    }
    return text;
  } finally {
    clearTimeout(timeout);
  }
}

function extractTag(html: string, tag: string): string {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match?.[1]?.trim() ?? '';
}

function extractMeta(html: string, name: string): string {
  const match = html.match(
    new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i'),
  );
  if (match) return match[1].trim();
  // Try reversed attribute order
  const alt = html.match(
    new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["']`, 'i'),
  );
  return alt?.[1]?.trim() ?? '';
}

function extractBodyText(html: string): string {
  let text = html;
  // Remove script and style blocks
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  text = text.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  // Decode common entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

function buildSummary(
  title: string,
  meta: string,
  body: string,
): string {
  const parts: string[] = [];
  if (title) parts.push(title);
  if (meta) parts.push(meta);
  // Take first ~300 chars of body for context
  if (body) parts.push(body.slice(0, 300));
  return parts.join(' — ').slice(0, 600);
}

const SERVICE_KEYWORDS: Record<string, string[]> = {
  'HVAC / Plumbing': ['hvac', 'plumbing', 'heating', 'cooling', 'air conditioning'],
  'Legal Services': ['attorney', 'lawyer', 'legal', 'law firm', 'litigation'],
  'Healthcare': ['medical', 'health', 'clinic', 'patient', 'doctor', 'dental'],
  'Construction': ['construction', 'contractor', 'remodel', 'renovation', 'building'],
  'Real Estate': ['real estate', 'realtor', 'property', 'listing'],
  'Landscaping': ['landscaping', 'lawn', 'garden', 'outdoor'],
  'Auto Services': ['auto', 'mechanic', 'repair', 'vehicle'],
  'Consulting': ['consulting', 'advisory', 'strategy'],
  'IT Services': ['it services', 'managed services', 'cybersecurity', 'tech support'],
  'Defense': ['defense', 'government', 'federal', 'dod', 'military'],
};

function inferServices(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const [service, keywords] of Object.entries(SERVICE_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      found.push(service);
    }
  }
  return found.slice(0, 4);
}

const FRICTION_SIGNALS: Record<string, string> = {
  'call us': 'Phone-dependent lead capture',
  'fill out': 'Form-based intake with no automation',
  'get a quote': 'Manual quoting process',
  'schedule a': 'Scheduling likely manual or semi-automated',
  'email us': 'Email-dependent communication',
  'request a callback': 'Callback request flow — likely manual dispatch',
  'free estimate': 'Estimate process may involve manual follow-up',
  'contact us': 'General contact form — no automated routing',
};

function inferFriction(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const [signal, friction] of Object.entries(FRICTION_SIGNALS)) {
    if (lower.includes(signal)) {
      found.push(friction);
    }
  }
  return found.slice(0, 4);
}
