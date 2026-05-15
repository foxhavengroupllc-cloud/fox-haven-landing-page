import Link from 'next/link';
import { Layers, GitBranch, BarChart3, TrendingUp } from 'lucide-react';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

/**
 * /operational-worlds — Platform layer detail page
 *
 * Companion to /population-flow, /civic-infrastructure, /ai-concierge,
 * /ai-coordination-layer. Linked from the homepage Platform card for
 * "OPERATIONAL WORLDS".
 */

const STATS = [
  { value: '12+', label: 'Scenario templates ready' },
  { value: '~30 s', label: 'Median scenario run time' },
  { value: '1:1', label: 'Sim model ↔ live model parity' },
  { value: 'Open', label: 'Scenario library, partner-shareable' },
];

const CAPABILITIES = [
  {
    Icon: Layers,
    title: 'What-if simulation',
    body: 'Run scenarios against real population and infrastructure data — without touching production. See the consequence before committing the operation.',
  },
  {
    Icon: GitBranch,
    title: 'Scenario library',
    body: 'Heat emergencies, grid outages, surge events, staffing changes — pre-built scenarios partners can fork and adapt to their own context.',
  },
  {
    Icon: BarChart3,
    title: 'Pipes into live operations',
    body: 'When a simulation is ready to act on, it pipes directly into the Civic Infrastructure layer so the actual deployment is the same code path that was tested.',
  },
  {
    Icon: TrendingUp,
    title: 'Post-mortems with the same tools',
    body: 'After-action review replays the day with the signals you had, the recommendations made, and the decisions taken. Same engine, different timestamp.',
  },
];

const USE_CASES = [
  {
    title: 'Stress-test the heat plan',
    body: 'Model what happens when a cooling center goes offline at 2 PM on a 116°F day. Get the answer before the actual outage.',
  },
  {
    title: 'Plan staffing against a heat dome',
    body: 'Forecast the next 7-day operating period and see which neighborhoods need more outreach hours and which mobile units belong where.',
  },
  {
    title: 'Train new operators safely',
    body: 'New partner-org staff run through a season&rsquo;s worth of historical scenarios before they touch a live decision.',
  },
  {
    title: 'Pitch leadership with evidence',
    body: 'Show city council exactly what last summer would have looked like with two more shelters — same data, modeled forward.',
  },
];

export default function OperationalWorldsPage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      <section
        aria-label="Operational Worlds"
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
                Platform · Layer 04
              </p>
              <h1 className="mt-2 font-display text-[2.55rem] font-light leading-[0.94] text-[#fff4df]">
                Operational Worlds
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#f4ede0]/62">
                Design, simulate, and operate living worlds. A simulation layer for the
                operations teams behind every Fox Haven deployment — run a scenario before
                committing to it.
              </p>
            </div>

            <div className="rounded-[8px] border border-[#f1a13a]/20 bg-[#02070d]/66 p-4">
              <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                Why a simulation layer
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#f4ede0]/62">
                Heat operations have no rehearsal. The first day a heat dome arrives is when
                the plan gets tested. Operational Worlds gives partner teams a place to test
                the plan before the heat does.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f26b1d] to-[#c4500f] px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]"
                href="/partner"
              >
                Run a sim with us <span aria-hidden="true">→</span>
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
                  Four capabilities that take partner operations from improvised to rehearsed.
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
                  What partners use it for
                </p>
                <p className="mt-1 text-sm text-[#f4ede0]/52">
                  Four jobs partners run on day one.
                </p>
              </div>
              <ul className="grid gap-3 md:grid-cols-2">
                {USE_CASES.map((u) => (
                  <li
                    key={u.title}
                    className="rounded-[8px] border border-[#f4ede0]/8 bg-[#02070d]/52 p-4"
                  >
                    <h3 className="font-display text-base font-light leading-tight text-[#fff4df]">
                      {u.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#f4ede0]/58">
                      {u.body}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="grid gap-3 rounded-[8px] border border-[#f1a13a]/20 bg-[#04101a]/74 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                  Want to model next summer&rsquo;s operating plan?
                </p>
                <h2 className="mt-2 font-display text-[1.5rem] font-light leading-tight text-[#fff4df]">
                  Run a scenario with the live data behind it.
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-[#f4ede0]/56">
                  Bring your last season&rsquo;s data. We&rsquo;ll model the alternatives.
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
                  href="/ai-coordination-layer"
                >
                  Upstream: Coordination Layer <span aria-hidden="true">→</span>
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
