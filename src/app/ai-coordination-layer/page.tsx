import Link from 'next/link';
import {
  Brain,
  Activity,
  Compass,
  Radio,
  ShieldCheck,
  AlertTriangle,
  Workflow,
  Eye,
} from 'lucide-react';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

/**
 * /ai-coordination-layer — Heat Relief Network coordination brain
 *
 * Dark deployment-intelligence page (matches /population-flow and
 * /resource-nodes) that expands the homepage hero's "AI COORDINATION
 * LAYER · Active operations across 128 zones" tile. Explains the
 * reasoning layer that sits between Population Flow signals, the
 * Resource Nodes inventory, and the people actually running heat
 * operations on the ground.
 *
 * Content is static for now. When the operations backend lands, the
 * zone count + status sources here become the read surface for the
 * coordinator's daily ops view.
 */

const COORDINATION_STATS = [
  { value: '128', label: 'Active operational zones' },
  { value: '5', label: 'Live signal sources orchestrated' },
  { value: '~12 s', label: 'Median signal → recommendation time' },
  { value: '100%', label: 'Recommendations routed through a human' },
];

const SIGNALS_IN = [
  {
    Icon: Activity,
    title: 'Population Flow pulse',
    body: 'Aggregated zone-level activity, heat severity, and pressure signals from the Population Flow layer.',
  },
  {
    Icon: Compass,
    title: 'Resource Nodes inventory',
    body: 'Live status of every cooling center, hydration station, shelter, and mobile unit in the network.',
  },
  {
    Icon: AlertTriangle,
    title: 'Alerts & advisories',
    body: 'NWS excessive heat warnings, air-quality alerts, transit disruptions, and partner-flagged incidents.',
  },
  {
    Icon: Radio,
    title: 'Operator field reports',
    body: 'Free-text dispatches from field teams, intake updates from shelters, and partner-system event streams.',
  },
];

const REASONING_STEPS = [
  {
    num: '01',
    title: 'Ingest',
    desc: 'Every signal source is normalized to a common schema and scored for freshness and confidence the moment it arrives.',
  },
  {
    num: '02',
    title: 'Score',
    desc: 'A heat-response model fuses signal severity, vulnerability, and resource-gap factors into a priority score per zone.',
  },
  {
    num: '03',
    title: 'Recommend',
    desc: 'For each high-priority zone the layer drafts a recommendation: which resource to move, when, and why — citing the underlying signals.',
  },
  {
    num: '04',
    title: 'Hand to operator',
    desc: 'Recommendations queue into the operator interface with full provenance. A human approves, declines, or edits — every time, no exceptions.',
  },
  {
    num: '05',
    title: 'Close the loop',
    desc: 'Operator decisions and field outcomes feed back into the scoring model so the next recommendation is better than the last.',
  },
];

const GUARDRAILS = [
  {
    Icon: ShieldCheck,
    title: 'Privacy boundary holds',
    body: 'The coordination layer inherits Population Flow’s aggregate-only contract. No individual GPS trails, no device IDs, no personal movement history — at any layer of the stack.',
  },
  {
    Icon: Eye,
    title: 'Every recommendation is explainable',
    body: 'Every recommendation is rendered with the signals that produced it, the model confidence, and the alternatives it considered. Operators see the reasoning, not just the answer.',
  },
  {
    Icon: AlertTriangle,
    title: 'Refusal is a first-class output',
    body: 'When the signal stack is too thin or contradictory, the layer says so — and falls back to a published, lower-confidence playbook instead of fabricating a confident-sounding recommendation.',
  },
  {
    Icon: Workflow,
    title: 'Human-in-the-loop, always',
    body: 'No clinical, dispatch, or safety-critical action is automated end-to-end. The layer drafts; a named operator decides; the system logs both the draft and the decision.',
  },
];

const OPERATIONS_FACETS = [
  {
    label: 'Resource dispatch',
    body: 'Mobile units, water deliveries, and outreach teams routed against the live priority picture instead of yesterday’s plan.',
  },
  {
    label: 'Shelter capacity',
    body: 'Real-time view of overnight intake, queue length, and supply levels so partners can flex before a site is overwhelmed.',
  },
  {
    label: 'Resident escalation',
    body: 'Concierge conversations that detect a clinical or safety signal trigger a warm hand-off to a named human responder.',
  },
  {
    label: 'Cross-partner briefings',
    body: 'A single live ops view assembled for mayors, hospital ops chiefs, and community-org directors — not a stack of agency PDFs.',
  },
];

export default function AiCoordinationLayerPage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      <section
        aria-label="AI Coordination Layer"
        className="relative isolate min-h-screen overflow-hidden bg-[#030711] text-[#f4ede0]"
      >
        {/* Background gradients + grid overlay (matches /population-flow chrome) */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(circle at 72% 18%, rgba(255,156,58,0.18), transparent 19rem), radial-gradient(circle at 27% 72%, rgba(244,237,224,0.07), transparent 22rem), linear-gradient(135deg, #07111c 0%, #02060d 58%, #050912 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(244,237,224,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(244,237,224,0.026)_1px,transparent_1px)] [background-size:56px_56px]" />

        {/* Top row */}
        <div className="grid gap-5 px-5 pb-6 pt-8 sm:px-8 lg:grid-cols-[390px_minmax(0,1fr)] lg:px-10 lg:pt-10">
          {/* ── Left briefing aside ── */}
          <aside className="relative z-10 rounded-[8px] border border-[#f1a13a]/18 bg-[#04101a]/86 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur">
            <div className="mb-5">
              <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#f1a13a]">
                Heat Relief Network
              </p>
              <h1 className="mt-2 font-display text-[2.55rem] font-light leading-[0.94] text-[#fff4df]">
                AI Coordination Layer
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#f4ede0]/62">
                The reasoning layer that connects civic signals, resource inventory, and the
                people running heat operations on the ground. Every recommendation it produces
                is explainable, every action it surfaces is approved by a human.
              </p>
            </div>

            {/* Active operations card */}
            <div className="rounded-[8px] border border-[#f1a13a]/20 bg-[#02070d]/66 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                  Active operations · today
                </p>
                <span className="rounded-full border border-[#f1a13a]/32 px-2.5 py-1 font-mono text-[0.5rem] font-bold uppercase tracking-[0.1em] text-[#f1a13a]">
                  Concept preview
                </span>
              </div>
              <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]/46">
                Coordinated zones
              </p>
              <h2 className="mt-2 font-display text-[2.6rem] font-light leading-tight text-[#fff4df]">
                128
              </h2>
              <p className="mt-1 text-sm text-[#f4ede0]/52">
                Across the Phoenix metro pilot · refreshed every 3 minutes
              </p>

              <div className="mt-4 grid gap-2 border-t border-[#f4ede0]/8 pt-4 text-xs text-[#f4ede0]/58">
                <div className="flex items-center justify-between gap-3">
                  <span>Signal sources orchestrated</span>
                  <strong className="text-right font-mono text-[#fff4df]/82">5 live</strong>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Median ingest → recommend</span>
                  <strong className="text-right font-mono text-[#f1a13a]">~12 s</strong>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Human approval rate</span>
                  <strong className="text-right font-mono text-[#f1a13a]">100%</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[8px] border border-[#f1a13a]/18 bg-[#07111c]/68 p-3">
              <div className="mb-2 flex items-center gap-2 font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em] text-[#f1a13a]">
                <Brain size={13} />
                Reasoning principle
              </div>
              <p className="text-xs leading-relaxed text-[#f4ede0]/56">
                Operator decides. The layer drafts, scores, and explains — but never
                auto-executes a heat-response action.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f26b1d] to-[#c4500f] px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]"
                href="/partner"
              >
                Bring this to your city <span aria-hidden="true">→</span>
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[#f1a13a]/40 px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]"
                href="/population-flow"
              >
                Upstream: Population Flow <span aria-hidden="true">▷</span>
              </Link>
            </div>
          </aside>

          {/* ── Main column ── */}
          <div className="relative z-10 grid gap-5">
            {/* Stats strip */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {COORDINATION_STATS.map((s) => (
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

            {/* Signals in */}
            <section className="rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/74 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#f1a13a]">
                    Signals in
                  </p>
                  <p className="mt-1 text-sm text-[#f4ede0]/52">
                    Four families of inputs feed the coordination layer at all times.
                  </p>
                </div>
                <span className="rounded-full border border-[#f1a13a]/24 px-3 py-1.5 font-mono text-[0.52rem] font-bold uppercase tracking-[0.1em] text-[#f1a13a]">
                  Live where available · fallback otherwise
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {SIGNALS_IN.map((s) => {
                  const Icon = s.Icon;
                  return (
                    <article
                      key={s.title}
                      className="rounded-[8px] border border-[#f4ede0]/8 bg-[#02070d]/52 p-4"
                    >
                      <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#f1a13a]/24 bg-[#f1a13a]/10 text-[#f1a13a]">
                        <Icon size={16} strokeWidth={2.2} />
                      </span>
                      <h3 className="font-display text-base font-light leading-tight text-[#fff4df]">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#f4ede0]/58">
                        {s.body}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Reasoning pipeline */}
            <section className="rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/74 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#f1a13a]">
                    How a recommendation is made
                  </p>
                  <p className="mt-1 text-sm text-[#f4ede0]/52">
                    Five stages from raw signal to operator decision. Every stage is logged
                    with its inputs and outputs.
                  </p>
                </div>
              </div>
              <ol className="grid gap-3 md:grid-cols-5">
                {REASONING_STEPS.map((step, i) => (
                  <li
                    key={step.num}
                    className="relative rounded-[8px] border border-[#f4ede0]/8 bg-[#02070d]/52 p-4"
                  >
                    <span
                      className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]"
                      aria-hidden="true"
                    >
                      {step.num}
                    </span>
                    <h3 className="mt-2 font-display text-base font-light leading-tight text-[#fff4df]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#f4ede0]/58">
                      {step.desc}
                    </p>
                    {i < REASONING_STEPS.length - 1 && (
                      <span
                        className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 font-mono text-[1rem] text-[#f1a13a]/55 md:inline"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            {/* Guardrails */}
            <section className="rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/74 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#f1a13a]">
                    Guardrails
                  </p>
                  <p className="mt-1 text-sm text-[#f4ede0]/52">
                    The constraints we apply before anything reaches a partner or a resident.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {GUARDRAILS.map((g) => {
                  const Icon = g.Icon;
                  return (
                    <article
                      key={g.title}
                      className="rounded-[8px] border border-[#f4ede0]/8 bg-[#02070d]/52 p-4"
                    >
                      <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#9ed8b2]/30 bg-[#9ed8b2]/10 text-[#9ed8b2]">
                        <Icon size={16} strokeWidth={2.2} />
                      </span>
                      <h3 className="font-display text-base font-light leading-tight text-[#fff4df]">
                        {g.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#f4ede0]/58">
                        {g.body}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Operations facets */}
            <section className="rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/74 p-5">
              <div className="mb-4">
                <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#f1a13a]">
                  What the layer coordinates
                </p>
                <p className="mt-1 text-sm text-[#f4ede0]/52">
                  Four operational surfaces the coordination layer keeps in sync across
                  partners.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {OPERATIONS_FACETS.map((f) => (
                  <article
                    key={f.label}
                    className="rounded-[8px] border border-[#f4ede0]/8 bg-[#02070d]/52 p-4"
                  >
                    <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                      {f.label}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#f4ede0]/58">{f.body}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* CTA strip */}
            <section className="grid gap-3 rounded-[8px] border border-[#f1a13a]/20 bg-[#04101a]/74 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                  Want the coordination layer live in your city?
                </p>
                <h2 className="mt-2 font-display text-[1.5rem] font-light leading-tight text-[#fff4df]">
                  Pilot conversations start with one 45-minute call.
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-[#f4ede0]/56">
                  Cities, healthcare systems, and community organizations welcome. We start
                  with your existing signals and grow from there.
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
                  Downstream: Resource Nodes <span aria-hidden="true">→</span>
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
