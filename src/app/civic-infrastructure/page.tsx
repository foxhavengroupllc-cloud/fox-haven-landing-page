import Link from 'next/link';
import { Building2, Cable, Database, Workflow } from 'lucide-react';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

/**
 * /civic-infrastructure — Platform layer detail page
 *
 * Companion to /population-flow, /ai-coordination-layer. Dark
 * deployment-intelligence look. Links from the homepage Platform card
 * for "CIVIC INFRASTRUCTURE".
 */

const STATS = [
  { value: '5+', label: 'Partner agency systems wired' },
  { value: '128', label: 'Active operational zones' },
  { value: '<60 s', label: 'Status propagation latency' },
  { value: '0', label: 'Individual records stored' },
];

const CAPABILITIES = [
  {
    Icon: Cable,
    title: 'Open data ingestion',
    body: 'Schema-normalized adapters for city, county, and partner systems. New feeds onboarded in days, not quarters.',
  },
  {
    Icon: Database,
    title: 'Single operational picture',
    body: 'Cooling-center status, hydration-station inventory, shelter capacity, and resident-facing notifications in one live view.',
  },
  {
    Icon: Workflow,
    title: 'Resident services routed cleanly',
    body: 'Privacy-preserving APIs route requests from the Heat Relief App to the right partner without exposing PII.',
  },
  {
    Icon: Building2,
    title: 'Field-tested, designed to travel',
    body: 'Phoenix is the proving ground. Every signal contract and integration shape is built to ship to the next metro.',
  },
];

const PRINCIPLES = [
  {
    title: 'Aggregate at the source',
    body: 'Partners aggregate before sending — Fox Haven never receives individual records. The product physically cannot answer questions at the household level.',
  },
  {
    title: 'Consent travels with the signal',
    body: 'Every feed is documented with the consent terms it operates under. Withdrawal removes the signal within one refresh cycle.',
  },
  {
    title: 'Open by default',
    body: 'Schemas, methods, and as much code as we can responsibly publish flow back to partners — making the next metro cheaper.',
  },
  {
    title: 'Auditable end-to-end',
    body: 'Every signal in, every recommendation out, every operator decision is logged for quarterly review with partner organizations.',
  },
];

export default function CivicInfrastructurePage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      <section
        aria-label="Civic Infrastructure"
        className="relative isolate min-h-screen overflow-hidden bg-[#030711] text-[#f4ede0]"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(circle at 72% 18%, rgba(255,156,58,0.18), transparent 19rem), radial-gradient(circle at 27% 72%, rgba(244,237,224,0.07), transparent 22rem), linear-gradient(135deg, #07111c 0%, #02060d 58%, #050912 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(244,237,224,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(244,237,224,0.026)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="grid gap-5 px-5 pb-6 pt-8 sm:px-8 lg:grid-cols-[390px_minmax(0,1fr)] lg:px-10 lg:pt-10">
          <aside className="relative z-10 rounded-[8px] border border-[#f1a13a]/18 bg-[#04101a]/86 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur">
            <div className="mb-5">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#f1a13a]">
                Platform · Layer 01
              </p>
              <h1 className="mt-2 font-display text-[2.55rem] font-light leading-[0.94] text-[#fff4df]">
                Civic Infrastructure
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#f4ede0]/62">
                Resilient systems. Smarter communities. The connective tissue that lets
                cities, healthcare providers, and community organizations share signals
                without sharing silos.
              </p>
            </div>

            <div className="rounded-[8px] border border-[#f1a13a]/20 bg-[#02070d]/66 p-4">
              <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                Why it matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#f4ede0]/62">
                Heat doesn&rsquo;t care that the cooling-center inventory lives in one
                agency&rsquo;s spreadsheet and the shelter capacity feed lives in
                another&rsquo;s CRM. Civic Infrastructure stitches those into one operational
                picture — without forcing any partner to migrate systems.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f26b1d] to-[#c4500f] px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]"
                href="/partner"
              >
                Wire up your city <span aria-hidden="true">→</span>
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[#f1a13a]/40 px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]"
                href="/platform"
              >
                Back to the platform <span aria-hidden="true">▷</span>
              </Link>
            </div>
          </aside>

          <div className="relative z-10 grid gap-5">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-[8px] border border-[#f4ede0]/10 bg-[#02070d]/56 p-4"
                >
                  <p className="font-display text-2xl font-light leading-none text-[#fff4df]">
                    {s.value}
                  </p>
                  <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.13em] text-[#f4ede0]/56">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <section className="rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/74 p-5">
              <div className="mb-4">
                <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#f1a13a]">
                  What this layer does
                </p>
                <p className="mt-1 text-sm text-[#f4ede0]/52">
                  Four capabilities partners turn on as they onboard.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {CAPABILITIES.map((c) => {
                  const Icon = c.Icon;
                  return (
                    <article
                      key={c.title}
                      className="rounded-[8px] border border-[#f4ede0]/8 bg-[#02070d]/52 p-4"
                    >
                      <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#f1a13a]/24 bg-[#f1a13a]/10 text-[#f1a13a]">
                        <Icon size={16} strokeWidth={2.2} />
                      </span>
                      <h3 className="font-display text-base font-light leading-tight text-[#fff4df]">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#f4ede0]/58">
                        {c.body}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/74 p-5">
              <div className="mb-4">
                <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#f1a13a]">
                  Operating principles
                </p>
                <p className="mt-1 text-sm text-[#f4ede0]/52">
                  Hard rules. Every partner integration is shaped around them.
                </p>
              </div>
              <ul className="grid gap-3 md:grid-cols-2">
                {PRINCIPLES.map((p) => (
                  <li
                    key={p.title}
                    className="rounded-[8px] border border-[#f4ede0]/8 bg-[#02070d]/52 p-4"
                  >
                    <h3 className="font-display text-base font-light leading-tight text-[#fff4df]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#f4ede0]/58">
                      {p.body}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="grid gap-3 rounded-[8px] border border-[#f1a13a]/20 bg-[#04101a]/74 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                  Run a system that should plug in?
                </p>
                <h2 className="mt-2 font-display text-[1.5rem] font-light leading-tight text-[#fff4df]">
                  Onboard your data feed in one short conversation.
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-[#f4ede0]/56">
                  We start with what you already have — no migration, no rip-and-replace.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f26b1d] to-[#c4500f] px-4 py-2.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#fff4df] shadow-[0_12px_28px_rgba(241,107,29,0.32)]"
                  href="/partner"
                >
                  Partner with us <span aria-hidden="true">→</span>
                </Link>
                <Link
                  className="inline-flex items-center gap-2 rounded-full border border-[#f1a13a]/40 px-4 py-2.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]"
                  href="/resource-nodes"
                >
                  See the Resource Network <span aria-hidden="true">→</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
