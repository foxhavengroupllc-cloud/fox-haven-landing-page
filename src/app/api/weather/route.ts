/**
 * /api/weather — Live Phoenix weather for the Heat Relief App experience.
 *
 * Sources (both free, no API key required):
 *   • Open-Meteo   — current temperature + apparent temperature (heat index)
 *   • NWS          — active heat alerts for the Phoenix metro zone (AZZ023)
 *
 * Cached for 5 minutes via Next.js fetch revalidation so we don't hammer
 * third-party APIs on every page load.
 */

import { NextRequest, NextResponse } from 'next/server';

// --- Rate limiter (30 req/min per IP) ---
const hits = new Map<string, { count: number; reset: number }>();
function rateOk(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  entry.count++;
  return entry.count <= 30;
}

// Phoenix, AZ
const LAT = 33.4484;
const LON = -112.074;
const NWS_ZONE = 'AZZ023'; // Phoenix metro forecast zone

export type HeatRisk = 'EXTREME' | 'DANGEROUS' | 'HIGH' | 'MODERATE' | 'NORMAL';

export interface WeatherPayload {
  temp: number;              // Current °F
  feelsLike: number;         // Apparent temperature / heat index °F
  heatRisk: HeatRisk;
  safeOutdoorMinutes: number;
  hasHeatAlert: boolean;
  alertTitle: string | null; // e.g. "Excessive Heat Warning"
  alertArea: string | null;  // e.g. "Maricopa County"
  alertCount: number;        // Active heat-related alerts for the zone
  location: string;
  updatedAt: string;         // ISO timestamp
}

function getHeatRisk(temp: number): HeatRisk {
  if (temp >= 115) return 'EXTREME';
  if (temp >= 105) return 'DANGEROUS';
  if (temp >= 98)  return 'HIGH';
  if (temp >= 90)  return 'MODERATE';
  return 'NORMAL';
}

function getSafeOutdoorMinutes(temp: number): number {
  if (temp >= 115) return 10;
  if (temp >= 110) return 15;
  if (temp >= 105) return 20;
  if (temp >= 100) return 30;
  if (temp >= 95)  return 45;
  if (temp >= 90)  return 60;
  return 90;
}

// NWS requires a meaningful User-Agent string
const NWS_HEADERS = {
  'User-Agent': '(foxhavengroup.org, info@foxhavengroup.org)',
  Accept: 'application/geo+json',
};

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!rateOk(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Try again in a minute.' },
      { status: 429 },
    );
  }

  try {
    const [weatherRes, alertsRes] = await Promise.all([
      fetch(
        `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${LAT}&longitude=${LON}` +
          `&current=temperature_2m,apparent_temperature` +
          `&temperature_unit=fahrenheit` +
          `&timezone=America%2FPhoenix`,
        { next: { revalidate: 300 } },
      ),
      fetch(
        `https://api.weather.gov/alerts/active?zone=${NWS_ZONE}`,
        { next: { revalidate: 300 }, headers: NWS_HEADERS },
      ),
    ]);

    if (!weatherRes.ok) {
      throw new Error(`Open-Meteo ${weatherRes.status}`);
    }

    const weatherJson = await weatherRes.json();
    const alertsJson  = alertsRes.ok ? await alertsRes.json() : { features: [] };

    const temp      = Math.round(weatherJson.current?.temperature_2m      ?? 0);
    const feelsLike = Math.round(weatherJson.current?.apparent_temperature ?? temp);

    // Filter to heat-related alerts only
    const heatAlerts = ((alertsJson.features as unknown[]) ?? []).filter((f) => {
      const event: string =
        (f as { properties?: { event?: string } }).properties?.event ?? '';
      return /heat|excessive/i.test(event);
    });

    const topAlert = heatAlerts[0] as
      | { properties: { event: string; areaDesc: string } }
      | undefined;

    const payload: WeatherPayload = {
      temp,
      feelsLike,
      heatRisk:            getHeatRisk(temp),
      safeOutdoorMinutes:  getSafeOutdoorMinutes(temp),
      hasHeatAlert:        heatAlerts.length > 0,
      alertTitle:          topAlert?.properties.event ?? null,
      alertArea:           topAlert?.properties.areaDesc?.split(';')[0]?.trim() ?? null,
      alertCount:          heatAlerts.length,
      location:            'Phoenix, AZ',
      updatedAt:           new Date().toISOString(),
    };

    return NextResponse.json(payload, {
      headers: {
        // Allow the client to know if it's stale
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (err) {
    console.error('[weather] fetch error:', err);
    // Return 503 — UI will fall back to demo values
    return NextResponse.json(
      { error: 'Weather service temporarily unavailable.' },
      { status: 503 },
    );
  }
}
