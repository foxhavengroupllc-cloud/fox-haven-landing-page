import Link from 'next/link';
import { FileText, Map, Users } from 'lucide-react';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';
import LeadForm from '@/components/ai-small-biz/LeadForm';
import { AI_SERVICES, PROCESS_STEPS } from '@/lib/ai-solutions-config';

/**
 * AI for Small Business landing — restyled on design archetypes.
 * Same content beats as before (hero stats, what-we-do, how-it-works,
 * what-you-get, lead form). Now uses .detailSection / .detailStats /
 * .serviceGrid / .processTimeline / .learnGrid.
 */

const HERO_STATS = [
  { value: '$28K–65K', label: 'Avg Annual Loss from Process Drag' },
  { value: '12 min', label: 'To Complete the Audit' },
  { value: '3–6 wk', label: 'Typical Deployment' },
  { value: 'Free', label: 'Initial Audit' },
];

const DELIVERABLES = [
  {
    Icon: FileText,
    title: 'Scored audit report',
    body: 'A detailed breakdown of your inefficiency score by category, with estimated dollar impact for each gap.',
  },
  {
    Icon: Map,
    title: 'Prioritised roadmap',
    body: 'A ranked list of automation opportunities, ordered by ROI — highest-value fixes first.',
  },
  {
    Icon: Users,
    title: 'Dedicated consultant',
    body: 'One person owns your engagement. No call-center handoffs. No lost context between meetings.',
  },
];

// Use a slim 4-up subset of the full AI_SERVICES catalog for this
// landing page so it reads as "four focus areas" rather than the
// full 8-service grid that lives on /ai-solutions/services.
const FOCUS_SLUGS = ['lead-response', 'data-reporting', 'scheduling-ops', 'custom-ai-agents'];

export default function AIForSmallBusinessPage() {
  const focus = AI_SERVICES.filter((s) => FOCUS_SLUGS.includes(s.slug));

  return (
    <main className={styles.pageShell}>
      <Header />

      {/* ── Hero ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ AI SOLUTIONS FOR EVERYONE</p>
          <h2>
            Your team is working hard. The systems shouldn&rsquo;t be.
          </h2>
          <p>
            Fox Haven builds AI-powered automation that eliminates the repetitive, manual drag
            costing your business time and money — without replacing the people who make it run.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/audit">
              Start the free audit
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <a className={styles.outlineButton} href="#contact">
              Talk to a consultant
              <span className={styles.playArrow} aria-hidden="true">
                ▷
              </span>
            </a>
          </div>
        </div>

        <ul className={styles.detailFeatures}>
          {DELIVERABLES.map((d) => (
            <li key={d.title}>
              <strong>{d.title}</strong>
              <span>{d.body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Stats strip ── */}
      <div className={styles.detailStats}>
        {HERO_STATS.map((s) => (
          <div key={s.label} className={styles.detailStat}>
            <span className={styles.detailStatValue}>{s.value}</span>
            <span className={styles.detailStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── What we do (4-up focus areas) ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ WHAT WE DO</p>
          <h2>Four areas where AI actually moves the needle.</h2>
          <p>
            We focus exclusively on the operational gaps that cost businesses the most — not
            trendy tech for its own sake.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.outlineButton} href="/ai-solutions/services">
              See all 8 services
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.serviceGrid}>
        {focus.map((svc) => (
          <Link
            key={svc.slug}
            className={styles.serviceCard}
            href={`/ai-solutions/services/${svc.slug}`}
          >
            <span className={styles.serviceCategory}>{svc.category.replace('-', ' ')}</span>
            <h3 className={styles.serviceTitle}>{svc.shortTitle}</h3>
            <p className={styles.serviceOutcome}>{svc.outcome}</p>
          </Link>
        ))}
      </div>

      {/* ── How it works ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ HOW IT WORKS</p>
          <h2>From audit to automation in six weeks.</h2>
          <p>The same proven process we run with every client. No surprises, no fluff.</p>
          <div className={styles.detailActions}>
            <Link className={styles.outlineButton} href="/ai-solutions/process">
              See the full process
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <ol className={styles.processTimeline}>
        {PROCESS_STEPS.slice(0, 4).map((step) => (
          <li key={step.num} className={styles.processTimelineItem}>
            <span className={styles.processTimelineNumber} aria-hidden="true">
              {step.num}
            </span>
            <div className={styles.processTimelineBody}>
              <div className={styles.processTimelineTitleRow}>
                <h3 className={styles.processTimelineTitle}>{step.title}</h3>
                {step.timeframe && (
                  <span className={styles.processTimelineTimeframe}>{step.timeframe}</span>
                )}
              </div>
              <p className={styles.processTimelineDesc}>{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Lead form ── */}
      <section id="contact" className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ GET STARTED</p>
          <h2>Ready to see your numbers?</h2>
          <p>
            Tell us where to send the audit link — or jump straight to booking a call.
          </p>
        </div>

        <div className={styles.detailLeadForm}>
          <LeadForm source="ai-small-biz-page" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
