import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AI Solutions for Everyone — Fox Haven Group',
  description:
    'Find out where AI can move the needle for your business. Take a free 5-minute AI readiness audit and get a clear picture of where you\'re losing time and revenue.',
  openGraph: {
    title: 'AI Solutions for Everyone — Fox Haven Group',
    description:
      'A free AI readiness assessment for any business — 16 questions, instant results, actionable next steps.',
    type: 'website',
    url: 'https://foxhavengroup.org/initiatives/ai-for-business',
  },
};

const STEPS = [
  {
    number: '01',
    title: 'Answer 16 questions',
    description: 'About how your team handles leads, operations, communication, and admin work today.',
  },
  {
    number: '02',
    title: 'Get your score instantly',
    description: 'See where you stand across 7 operational dimensions — scored and weighted by business impact.',
  },
  {
    number: '03',
    title: 'See where to focus',
    description: 'Top opportunities, biggest blockers, and a dollar estimate of what inefficiency is costing you.',
  },
];

const LEARN_CARDS = [
  {
    icon: '⚡',
    title: 'Lead Response Gaps',
    description: 'How fast you respond to inbound leads — and how much that speed gap costs you.',
  },
  {
    icon: '⚙️',
    title: 'Operational Bottlenecks',
    description: 'Where manual work, duplicate entry, and scheduling gaps are eating your team\'s time.',
  },
  {
    icon: '🛡️',
    title: 'AI Risk Exposure',
    description: 'Whether your team is using AI tools without guardrails — and what that means for quality and liability.',
  },
  {
    icon: '🎯',
    title: '90-Day Opportunity Map',
    description: 'The three highest-impact changes you could make in the next quarter, ranked by ROI.',
  },
];

export default function AIForBusinessPage() {
  return (
    <main className="bg-[#f4ede0]">
      <Nav />

      {/* ── Hero ── */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 py-32 lg:py-40 relative z-[1]">
          <div className="reveal">
            <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[.1em] uppercase text-[#e05e14] font-semibold mb-6">
              <span className="w-[5px] h-[5px] rounded-full bg-[#e05e14] animate-pulse" />
              Now Accepting Clients
            </div>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light text-white leading-[1.08] tracking-[-0.025em] mb-6">
              Find out where AI can{' '}
              <em className="text-[#e05e14] font-light">move the needle</em>{' '}
              for your business.
            </h1>
            <p className="font-body text-lg text-white/60 leading-relaxed max-w-2xl mb-10">
              16 questions. 5 minutes. A clear picture of where you&rsquo;re
              losing time and revenue &mdash; and exactly where automation
              can help.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-[#e05e14] hover:bg-[#c4500f] text-white font-semibold text-[15px] px-8 py-4 rounded-full transition-colors"
            >
              Take the Free Assessment
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Gradient fade to cream */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4ede0] to-transparent" />
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal mb-16">
            <p className="text-[11px] tracking-[.1em] uppercase text-[#e05e14] font-semibold mb-3">
              How It Works
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-[#0b1c2e] leading-tight">
              Three steps to{' '}
              <em className="display-italic">clarity</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.number} className="reveal">
                <div
                  className="font-display text-[56px] font-light leading-none -mb-1"
                  style={{ color: 'rgba(224,94,20,.12)' }}
                  aria-hidden="true"
                >
                  {step.number}
                </div>
                <h3 className="font-display text-[22px] font-semibold text-[#0b1c2e] mb-2">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.8] text-[#0b1c2e]/60 font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="py-24 lg:py-32 bg-[#0b1c2e]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal mb-16">
            <p className="text-[11px] tracking-[.1em] uppercase text-[#e05e14] font-semibold mb-3">
              What You&rsquo;ll Learn
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-white leading-tight">
              Your report covers{' '}
              <em className="display-italic">four dimensions</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {LEARN_CARDS.map((card) => (
              <div
                key={card.title}
                className="reveal bg-white/[.04] border border-white/[.08] rounded-2xl p-7 hover:border-[#e05e14]/20 transition-colors"
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-display text-[18px] font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-[14px] leading-[1.8] text-white/50 font-light">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="reveal">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-[#0b1c2e] leading-tight mb-4">
              Ready to see your score?
            </h2>
            <p className="text-[16px] text-[#0b1c2e]/50 font-light mb-8 max-w-xl mx-auto leading-relaxed">
              No sales pressure. No commitment. Just a clear view of where your
              business stands &mdash; and where it could go.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-[#e05e14] hover:bg-[#c4500f] text-white font-semibold text-[15px] px-8 py-4 rounded-full transition-colors"
            >
              Start the Assessment
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <p className="text-[12px] text-[#0b1c2e]/30 mt-4">
              Free &middot; 5 minutes &middot; Instant results
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
