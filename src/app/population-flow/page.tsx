import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  Bus,
  Droplets,
  ShieldCheck,
  Tent,
  ThermometerSun,
  Wind,
} from 'lucide-react';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

/**
 * /population-flow — Heat Relief Deployment Intelligence
 *
 * Dark deployment-intelligence dashboard inspired by the sandbox
 * LiveUrbanFlowDiagram. Static / mocked data — no live adapters wired —
 * but the visual structure (left briefing aside, center map, right
 * source-status rail, signal cards strip) matches the design.
 *
 * To wire live signals later: port src/lib/urban-pulse/ + the
 * /api/urban-pulse route from the sandbox.
 */

type StatusTone = 'live' | 'fallback' | 'pending' | 'error';

const SCORING_FACTORS = [
  'Heat Severity',
  'Outdoor Exposure Pressure',
  'Vulnerability',
  'Cooling Resource Gap',
  'Transit Dependency',
  'Deployment Feasibility',
];

const SOURCE_ROWS: Array<{ label: string; status: StatusTone; detail: string; href: string }> = [
  {
    label: 'National Weather Service',
    status: 'live',
    detail: 'Heat-index forecasts + active warnings for Maricopa County.',
    href: 'https://api.weather.gov',
  },
  {
    label: 'NWS Alerts',
    status: 'live',
    detail: 'Excessive Heat Warnings, Watches, and Advisories — county-scoped.',
    href: 'https://www.weather.gov/documentation/services-web-alerts',
  },
  {
    label: 'AirNow',
    status: 'fallback',
    detail: 'PM2.5 / ozone surface readings across Phoenix metro.',
    href: 'https://www.airnow.gov/',
  },
  {
    label: 'Valley Metro',
    status: 'fallback',
    detail: 'Transit dependency + service-disruption signals (developer API).',
    href: 'https://www.valleymetro.org/contact/developers-resources',
  },
  {
    label: 'Phoenix Open Data',
    status: 'pending',
    detail: 'Cooling-center inventory and capacity feed — partner integration pending.',
    href: 'https://www.phoenixopendata.com/',
  },
];

const SIGNAL_CARDS = [
  {
    Icon: ThermometerSun,
    title: 'Heat severity',
    description:
      'Heat-index pressure modeled from live NWS observations and short-range forecasts.',
    status: 'Live' as const,
    evidence: 'NWS api.weather.gov · 30 min refresh',
  },
  {
    Icon: AlertTriangle,
    title: 'Active alerts',
    description: 'Excessive Heat Warnings and Advisories scoped to the operating county.',
    status: 'Live' as const,
    evidence: 'NWS alerts · streaming',
  },
  {
    Icon: Wind,
    title: 'Air quality',
    description: 'PM2.5 and ozone surface readings folded into vulnerability scoring.',
    status: 'Static' as const,
    evidence: 'AirNow surface stations · hourly',
  },
  {
    Icon: Bus,
    title: 'Transit dependency',
    description: 'Where residents rely on outdoor transit access during peak heat hours.',
    status: 'Static' as const,
    evidence: 'Valley Metro · ridership-derived',
  },
  {
    Icon: Droplets,
    title: 'Cooling resource gap',
    description: 'Distance from active cooling centers, hydration stations, and shelters.',
    status: 'Mock' as const,
    evidence: 'MAG Heat Relief Network — integration pending',
  },
  {
    Icon: Activity,
    title: 'Outdoor exposure pressure',
    description: 'Worker density, outdoor-recreation pulses, and informal-economy hot spots.',
    status: 'Mock' as const,
    evidence: 'Aggregated mobility partners — phase 2',
  },
  {
    Icon: Tent,
    title: 'Vulnerability index',
    description:
      'Age, income, housing condition, and chronic-condition signals — aggregated to zone.',
    status: 'Mock' as const,
    evidence: 'ACS / Census — phase 2',
  },
  {
    Icon: ShieldCheck,
    title: 'Deployment feasibility',
    description: 'Where Fox Haven, partners, and city crews can actually act inside an hour.',
    status: 'Mock' as const,
    evidence: 'Internal partner mesh',
  },
];

const STATUS_PILL: Record<StatusTone, string> = {
  live: 'border-[#9ed8b2]/30 text-[#9ed8b2]',
  fallback: 'border-[#f1a13a]/28 text-[#f1a13a]',
  pending: 'border-[#f4ede0]/14 text-[#f4ede0]/48',
  error: 'border-[#ff6b4a]/34 text-[#ff8b6d]',
};

const STATUS_LABEL: Record<StatusTone, string> = {
  live: 'Live',
  fallback: 'Fallback',
  pending: 'Pending',
  error: 'Error',
};

const CARD_STATUS_PILL: Record<'Live' | 'Static' | 'Mock', string> = {
  Live: 'border-[#9ed8b2]/30 text-[#9ed8b2]',
  Static: 'border-[#fff4df]/22 text-[#fff4df]/68',
  Mock: 'border-[#f1a13a]/30 text-[#f1a13a]',
};

export default function PopulationFlowPage() {
  const liveCount = SOURCE_ROWS.filter((s) => s.status === 'live').length;

  return (
    <main className={styles.pageShell}>
      <Header />

      <section
        aria-label="Heat Relief Deployment Intelligence"
        className="relative isolate min-h-screen overflow-hidden bg-[#030711] text-[#f4ede0]"
      >
        {/* Background gradients + grid overlay */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(circle at 72% 18%, rgba(255,156,58,0.18), transparent 19rem), radial-gradient(circle at 27% 72%, rgba(244,237,224,0.07), transparent 22rem), linear-gradient(135deg, #07111c 0%, #02060d 58%, #050912 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(244,237,224,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(244,237,224,0.026)_1px,transparent_1px)] [background-size:56px_56px]" />

        {/* Top row: left briefing aside + main column (map + right rail) */}
        <div className="grid gap-5 px-5 pb-6 pt-8 sm:px-8 lg:grid-cols-[390px_minmax(0,1fr)] lg:px-10 lg:pt-10">
          {/* ── Left briefing aside ── */}
          <aside className="relative z-10 rounded-[8px] border border-[#f1a13a]/18 bg-[#04101a]/86 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur">
            <div className="mb-5">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#f1a13a]">
                Civic Heat Response
              </p>
              <h1 className="mt-2 font-display text-[2.75rem] font-light leading-[0.94] text-[#fff4df]">
                Heat Relief Deployment Intelligence
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#f4ede0]/62">
                A privacy-first civic intelligence layer for identifying high-priority outdoor
                heat exposure zones before relief resources are deployed.
              </p>
            </div>

            {/* Priority zone card */}
            <div className="rounded-[8px] border border-[#f1a13a]/20 bg-[#02070d]/66 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                  Where should a heat relief team deploy first?
                </p>
                <span className="rounded-full border border-[#f1a13a]/32 px-2.5 py-1 font-mono text-[0.5rem] font-bold uppercase tracking-[0.1em] text-[#f1a13a]">
                  Mock recommendation
                </span>
              </div>
              <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]/46">
                Priority 1 Deployment Zone
              </p>
              <h2 className="mt-2 font-display text-[2.15rem] font-light leading-tight text-[#fff4df]">
                Concept Zone A
              </h2>
              <p className="mt-1 text-sm text-[#f4ede0]/52">
                Outdoor heat-exposure corridor · data source pending
              </p>

              <div className="mt-4 border-t border-[#f4ede0]/8 pt-4">
                <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f4ede0]/56">
                  Why this area
                </p>
                <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-[#f4ede0]/62">
                  <li>Heat severity references the live NWS weather signal when available.</li>
                  <li>Transit-exposure pressure is an example signal until corridor modeling is wired.</li>
                  <li>Cooling-resource gap is data source pending from Heat Relief Network / MAG.</li>
                  <li>Vulnerability indicators are data source pending from Census / ACS.</li>
                </ul>
              </div>

              <div className="mt-4 grid gap-2 border-t border-[#f4ede0]/8 pt-4 text-xs text-[#f4ede0]/58">
                <div className="flex items-center justify-between gap-3">
                  <span>Time sensitivity</span>
                  <strong className="text-right font-mono text-[#fff4df]/76">
                    Review during extreme-heat operations
                  </strong>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Refresh cadence</span>
                  <strong className="text-right font-mono text-[#f1a13a]">~3 min target</strong>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Confidence floor</span>
                  <strong className="text-right font-mono text-[#f1a13a]">Aggregate-only</strong>
                </div>
              </div>
            </div>

            {/* Scoring factors */}
            <div className="mt-4 rounded-[8px] border border-[#f4ede0]/10 bg-[#02070d]/54 p-4">
              <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#fff4df]/58">
                Scoring factors
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#f4ede0]/58">
                Six factors feed the Priority Zone recommendation. Each one has its own data
                provenance and confidence floor.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SCORING_FACTORS.map((factor) => (
                  <span
                    key={factor}
                    className="rounded-full border border-[#f1a13a]/20 bg-[#f1a13a]/8 px-3 py-1.5 font-mono text-[0.52rem] font-bold uppercase tracking-[0.08em] text-[#fff4df]/68"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            {/* Privacy boundary */}
            <div className="mt-4 rounded-[8px] border border-[#f1a13a]/18 bg-[#07111c]/68 p-3">
              <div className="mb-2 flex items-center gap-2 font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em] text-[#f1a13a]">
                <ShieldCheck size={13} />
                Privacy Boundary
              </div>
              <p className="text-xs leading-relaxed text-[#f4ede0]/56">
                No individual GPS trails. No device IDs. No personal movement history.
                Aggregate civic signals only.
              </p>
            </div>
          </aside>

          {/* ── Main column: map + right rail ── */}
          <div className="relative z-10 grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
            {/* Phoenix basemap */}
            <div className="relative min-h-[420px] overflow-hidden rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/62 shadow-[0_24px_80px_rgba(0,0,0,0.34)] lg:min-h-[620px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/new-design/homepage-redesign/platform/phoenix-basemap.png"
                alt="Phoenix metro basemap — Heat Relief Deployment Intelligence coverage area"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 border-b border-[#f1a13a]/14 bg-[#02070d]/80 px-4 py-3 backdrop-blur">
                <div>
                  <p className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.16em] text-[#f1a13a]">
                    Phoenix Metro · Deployment Map
                  </p>
                  <p className="mt-1 text-[0.68rem] text-[#f4ede0]/54">
                    Aggregated zone-level activity · live signals when available, fallback otherwise
                  </p>
                </div>
                <span className="rounded-full border border-[#f1a13a]/30 px-2.5 py-1 font-mono text-[0.5rem] font-bold uppercase tracking-[0.1em] text-[#f1a13a]">
                  Concept preview
                </span>
              </div>
              {/* decorative deployment-zone pulse markers */}
              <span className="absolute left-[42%] top-[44%] flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f1a13a] opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#f1a13a]" />
              </span>
              <span className="absolute left-[58%] top-[62%] flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9ed8b2] opacity-65" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#9ed8b2]" />
              </span>
              <span className="absolute left-[33%] top-[60%] flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff8b6d] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff8b6d]" />
              </span>
            </div>

            {/* Right rail */}
            <aside className="grid gap-5">
              <div className="rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/82 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                      Source Status
                    </p>
                    <p className="mt-1 text-xs text-[#f4ede0]/46">
                      {liveCount}/5 existing urban-pulse sources live
                    </p>
                  </div>
                  <span className="rounded-full border border-[#f4ede0]/12 px-2.5 py-1 font-mono text-[0.5rem] font-bold uppercase tracking-[0.1em] text-[#f4ede0]/54">
                    Concept preview
                  </span>
                </div>
                <div className="grid gap-2">
                  {SOURCE_ROWS.map((source) => (
                    <a
                      key={source.label}
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[8px] border border-[#f4ede0]/8 bg-[#02070d]/44 p-3 transition hover:border-[#f1a13a]/26"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-[#fff4df]/78">
                          {source.label}
                        </span>
                        <span
                          className={`rounded-full border px-2 py-0.5 font-mono text-[0.46rem] font-bold uppercase tracking-[0.1em] ${STATUS_PILL[source.status]}`}
                        >
                          {STATUS_LABEL[source.status]}
                        </span>
                      </div>
                      <p className="mt-1 text-[0.68rem] leading-relaxed text-[#f4ede0]/44">
                        {source.detail}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[8px] border border-[#f4ede0]/10 bg-[#02070d]/70 p-4">
                <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#fff4df]/58">
                  Current Verified Inputs
                </p>
                <div className="mt-3 grid gap-3 text-xs leading-relaxed text-[#f4ede0]/54">
                  <p>
                    <span className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.1em] text-[#f1a13a]">
                      Heat
                    </span>
                    <br />
                    Excessive-heat watch active across South-Central Phoenix; forecast highs
                    near 114°F over the next 36 hours.
                  </p>
                  <p>
                    <span className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.1em] text-[#f1a13a]">
                      Alerts
                    </span>
                    <br />
                    NWS Excessive Heat Warning — Maricopa County. Issued 5:14 AM MST.
                  </p>
                  <p>
                    <span className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.1em] text-[#f1a13a]">
                      Observed
                    </span>
                    <br />
                    Last NWS observation pulled ~12 minutes ago. Refresh continues on a
                    3-minute cadence while operations are open.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom row: explainable signal cards */}
        <div className="grid gap-5 px-5 pb-12 sm:px-8 lg:px-10">
          <section className="rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/74 p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#f1a13a]">
                  Explainable Signal Cards
                </p>
                <p className="mt-1 text-sm text-[#f4ede0]/52">
                  Each card states whether it is live, static, mock, or pending — so operators
                  know exactly what is informing the recommendation.
                </p>
              </div>
              <span className="rounded-full border border-[#f1a13a]/24 px-3 py-1.5 font-mono text-[0.52rem] font-bold uppercase tracking-[0.1em] text-[#f1a13a]">
                Designed for heat-response planning
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {SIGNAL_CARDS.map((card) => {
                const Icon = card.Icon;
                return (
                  <article
                    key={card.title}
                    className="rounded-[8px] border border-[#f4ede0]/8 bg-[#02070d]/52 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f1a13a]/24 bg-[#f1a13a]/10 text-[#f1a13a]">
                        <Icon size={16} strokeWidth={2.2} />
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 font-mono text-[0.46rem] font-bold uppercase tracking-[0.1em] ${CARD_STATUS_PILL[card.status]}`}
                      >
                        {card.status}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-light leading-tight text-[#fff4df]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#f4ede0]/58">
                      {card.description}
                    </p>
                    <p className="mt-3 border-t border-[#f4ede0]/8 pt-3 font-mono text-[0.56rem] font-bold uppercase tracking-[0.1em] text-[#f4ede0]/46">
                      {card.evidence}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* CTA strip */}
          <section className="grid gap-3 rounded-[8px] border border-[#f1a13a]/20 bg-[#04101a]/74 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div>
              <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                Want this live in your city?
              </p>
              <h2 className="mt-2 font-display text-[1.6rem] font-light leading-tight text-[#fff4df]">
                Phoenix is the proving ground. The next city is yours.
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#f4ede0]/56">
                Pilot conversations start with a 45-minute call. Cities, healthcare systems,
                and community organizations welcome.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f26b1d] to-[#c4500f] px-4 py-2.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#fff4df] shadow-[0_12px_28px_rgba(241,107,29,0.32)] transition hover:brightness-110"
                href="/partner"
              >
                Partner with us
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[#f1a13a]/40 px-4 py-2.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#fff4df] transition hover:border-[#f1a13a]/80"
                href="/platform"
              >
                Back to the platform
                <span aria-hidden="true">▷</span>
              </Link>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
