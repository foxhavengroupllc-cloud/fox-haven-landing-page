import Link from 'next/link';
import { MessageSquare, Languages, UserCheck, AlertTriangle } from 'lucide-react';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

/**
 * /ai-concierge — Platform layer detail page
 *
 * Companion to /population-flow, /civic-infrastructure, /ai-coordination-layer.
 * Linked from the homepage Platform card for "AI CONCIERGE".
 */

const CAPABILITIES = [
  {
    Icon: MessageSquare,
    title: 'Text, web, or in person',
    body: 'A resident can ask a question over SMS, from a web page, or by walking up to a tablet at a partner site. No install, no account, no friction for a basic question.',
  },
  {
    Icon: Languages,
    title: 'English and Spanish at launch',
    body: 'New languages get prioritized by what partner populations actually speak, not by what the underlying model happens to handle well.',
  },
  {
    Icon: UserCheck,
    title: 'Grounded in real Phoenix data',
    body: 'Concierge answers from the live Resource Nodes catalog and partner integrations. It is not a generic chatbot that reads Wikipedia and guesses.',
  },
  {
    Icon: AlertTriangle,
    title: 'Says when it does not know',
    body: 'When the model is unsure, it stops trying to answer and hands over a real phone number to a real person. We would rather hear about that escalation than read a wrong answer.',
  },
];

const BOUNDARIES = [
  {
    title: 'A person handles anything safety-critical',
    body: 'Clinical, legal, and safety questions are always routed to a named human responder. Concierge drafts a suggestion, never the decision.',
  },
  {
    title: 'No identifying questions by default',
    body: 'A resident can ask "where is the nearest cooling center" without giving a name or phone number. Concierge collects what is needed, when it is needed, and not before.',
  },
  {
    title: 'Audit log on every conversation',
    body: 'Every exchange is logged for partner review — both the model output and the operator decisions that followed. Partner orgs get quarterly reviews.',
  },
  {
    title: 'Bad answers get flagged in one tap',
    body: 'Operators and residents can mark an answer as wrong, off-context, or harmful. Flags feed directly into the next round of grounding data and prompt updates.',
  },
];

export default function AiConciergePage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      <section
        aria-label="AI Concierge"
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
                Platform · Layer 03
              </p>
              <h1 className="mt-2 font-display text-[2.55rem] font-light leading-[0.94] text-[#fff4df]">
                AI Concierge
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#f4ede0]/62">
                A conversational layer for residents and operators. It answers from real
                Phoenix data, in plain language, and hands off to a person whenever the
                question is one a chatbot should not be answering.
              </p>
            </div>

            <div className="rounded-[8px] border border-[#f1a13a]/20 bg-[#02070d]/66 p-4">
              <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                What we are not building
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#f4ede0]/62">
                A general-purpose AI assistant. Concierge is narrowly scoped to the heat
                relief network: where to cool off, how to get there, what help is available
                this hour. Anything outside that boundary, it bounces to a person.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f26b1d] to-[#c4500f] px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]"
                href="/partner"
              >
                Pilot Concierge with us <span aria-hidden="true">→</span>
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
            <section className="rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/74 p-5">
              <div className="mb-4">
                <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#f1a13a]">
                  What Concierge does
                </p>
                <p className="mt-1 text-sm text-[#f4ede0]/52">
                  Four capabilities that show up in every Concierge deployment.
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
                  Boundaries
                </p>
                <p className="mt-1 text-sm text-[#f4ede0]/52">
                  Concierge has guardrails. Hard ones.
                </p>
              </div>
              <ul className="grid gap-3 md:grid-cols-2">
                {BOUNDARIES.map((b) => (
                  <li
                    key={b.title}
                    className="rounded-[8px] border border-[#f4ede0]/8 bg-[#02070d]/52 p-4"
                  >
                    <h3 className="font-display text-base font-light leading-tight text-[#fff4df]">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#f4ede0]/58">
                      {b.body}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="grid gap-3 rounded-[8px] border border-[#f1a13a]/20 bg-[#04101a]/74 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]">
                  Need a concierge that knows your network?
                </p>
                <h2 className="mt-2 font-display text-[1.5rem] font-light leading-tight text-[#fff4df]">
                  Bring Concierge to your residents.
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-[#f4ede0]/56">
                  Pilots ship grounded in your partner directory and resident-facing services
                  on day one.
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
                  href="/ai-solutions/services"
                >
                  AI Services catalog <span aria-hidden="true">→</span>
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
