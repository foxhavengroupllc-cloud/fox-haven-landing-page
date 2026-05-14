import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Settings, Shield, Target } from 'lucide-react';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

/**
 * AI Solutions for Everyone landing — restyled on design archetypes.
 * Functionally a marketing entry point for the audit funnel: the
 * primary CTA always points at /audit.
 */

export const metadata: Metadata = {
  title: 'AI Solutions for Everyone — Fox Haven Group',
  description:
    'Find out where AI can move the needle for your business. Take a free 5-minute AI readiness audit and get a clear picture of where you\'re losing time and revenue.',
  openGraph: {
    title: 'AI Solutions for Everyone — Fox Haven Group',
    description:
      'A free AI readiness assessment for any business — 16 questions, instant results, actionable next steps.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/initiatives/ai-for-business',
  },
};

const STEPS = [
  {
    number: '01',
    title: 'Answer 16 questions',
    description:
      'About how your team handles leads, operations, communication, and admin work today.',
  },
  {
    number: '02',
    title: 'Get your score instantly',
    description:
      'See where you stand across 7 operational dimensions — scored and weighted by business impact.',
  },
  {
    number: '03',
    title: 'See where to focus',
    description:
      'Top opportunities, biggest blockers, and a dollar estimate of what inefficiency is costing you.',
  },
];

const LEARN_CARDS = [
  {
    Icon: Zap,
    title: 'Lead Response Gaps',
    description:
      'How fast you respond to inbound leads — and how much that speed gap costs you.',
  },
  {
    Icon: Settings,
    title: 'Operational Bottlenecks',
    description:
      'Where manual work, duplicate entry, and scheduling gaps are eating your team\'s time.',
  },
  {
    Icon: Shield,
    title: 'AI Risk Exposure',
    description:
      'Whether your team is using AI tools without guardrails — and what that means for quality and liability.',
  },
  {
    Icon: Target,
    title: '90-Day Opportunity Map',
    description:
      'The three highest-impact changes you could make in the next quarter, ranked by ROI.',
  },
];

export default function AIForBusinessPage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      {/* ── Hero ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ NOW ACCEPTING CLIENTS</p>
          <h2>Find out where AI can move the needle for your business.</h2>
          <p>
            16 questions. 5 minutes. A clear picture of where you&rsquo;re losing time and
            revenue — and exactly where automation can help.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/audit">
              Take the free assessment
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={styles.outlineButton} href="/ai-solutions">
              Explore AI Solutions
              <span className={styles.playArrow} aria-hidden="true">
                ▷
              </span>
            </Link>
          </div>
        </div>

        <ul className={styles.detailFeatures}>
          {STEPS.map((s) => (
            <li key={s.number}>
              <strong>
                {s.number} · {s.title}
              </strong>
              <span>{s.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Stats strip ── */}
      <div className={styles.detailStats}>
        <div className={styles.detailStat}>
          <span className={styles.detailStatValue}>16</span>
          <span className={styles.detailStatLabel}>Questions</span>
        </div>
        <div className={styles.detailStat}>
          <span className={styles.detailStatValue}>5 min</span>
          <span className={styles.detailStatLabel}>To Complete</span>
        </div>
        <div className={styles.detailStat}>
          <span className={styles.detailStatValue}>7</span>
          <span className={styles.detailStatLabel}>Operational Dimensions</span>
        </div>
        <div className={styles.detailStat}>
          <span className={styles.detailStatValue}>Free</span>
          <span className={styles.detailStatLabel}>Always</span>
        </div>
      </div>

      {/* ── What you'll learn ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ WHAT YOU&rsquo;LL LEARN</p>
          <h2>Your report covers four dimensions.</h2>
          <p>
            Concrete, business-specific findings — not generic AI advice. Sized so you can read
            it in one sitting and act on it the same week.
          </p>
        </div>

        <div className={styles.learnGrid}>
          {LEARN_CARDS.map((card) => {
            const Icon = card.Icon;
            return (
              <article key={card.title} className={styles.learnCard}>
                <span className={styles.learnCardIcon} aria-hidden="true">
                  <Icon size={20} strokeWidth={2.2} />
                </span>
                <h3 className={styles.learnCardTitle}>{card.title}</h3>
                <p className={styles.learnCardBody}>{card.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ READY?</p>
          <h2>See your score.</h2>
          <p>
            No sales pressure. No commitment. Just a clear view of where your business stands —
            and where it could go.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/audit">
              Start the assessment
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
          <p className={styles.auditFooterCopy} style={{ textAlign: 'left', marginTop: '0.6rem' }}>
            Free · 5 minutes · Instant results
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
