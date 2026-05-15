import Link from 'next/link';
import {
  Zap,
  BarChart3,
  CalendarClock,
  Link2,
  Bot,
  FileText,
  Compass,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';
import styles from '@/styles/design-system.module.css';
import LeadForm from '@/components/ai-small-biz/LeadForm';
import { AI_SERVICES, PROCESS_STEPS } from '@/lib/ai-solutions-config';

/**
 * AI Solutions hub, restyled to use the new design-system archetypes
 * (.detailSection / .detailIntro / .detailShots / .detailFeatures /
 * .detailStats / .serviceGrid / .serviceCard).
 *
 * Wrapped by AISolutionsShell which provides the Header + SubNav.
 * Data unchanged: pulls AI_SERVICES (all 8) and PROCESS_STEPS from
 * src/lib/ai-solutions-config.ts. LeadForm component is unchanged , 
 * still posts to /api/leads.
 */

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  BarChart3,
  CalendarClock,
  Link2,
  Bot,
  FileText,
  Compass,
  MessageSquare,
};

const CATEGORY_LABEL: Record<string, string> = {
  automation: 'Automation',
  'ai-agents': 'AI Agents',
  consulting: 'Consulting',
};

const HERO_STATS = [
  { value: '8', label: 'AI Services' },
  { value: '40%', label: 'Avg Cost Savings' },
  { value: '3–6 wk', label: 'Deployment' },
  { value: 'Free', label: 'Initial Audit' },
];

const HERO_FEATURES = [
  {
    title: 'Right-sized for your stack',
    body: 'AI readiness assessments tailored to your current tech stack and budget.',
  },
  {
    title: 'Hands-on implementation',
    body: 'Staff training and rollout support, not just slide decks.',
  },
  {
    title: 'Green-first model selection',
    body: 'Right-sized AI that minimises compute waste, no wasted cycles, no wasted spend.',
  },
  {
    title: 'Ongoing optimisation',
    body: 'We stay on after launch to keep costs down and sustainability up.',
  },
];

const TRUST_STATS = [
  { value: '$28K–65K', label: 'Avg Annual Recovery' },
  { value: '3–6 wk', label: 'Typical Deployment' },
  { value: '40%+', label: 'Conversion Lift' },
  { value: '14 hrs', label: 'Avg Weekly Time Saved' },
];

export default function AISolutionsHubPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section id="overview" className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ AI SOLUTIONS FOR EVERYONE</p>
          <h2>AI that works for your business, not the other way around.</h2>
          <p>
            Fox Haven builds AI-powered automation, custom agents, and strategic consulting that
            eliminates the repetitive drag costing your business time and money. Eight specialised
            services. One partner who gets it done.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/audit">
              Start the free audit
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={styles.outlineButton} href="/ai-solutions/services">
              Explore services
              <span className={styles.playArrow} aria-hidden="true">
                ▷
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.detailShots}>
          <figure className={styles.detailShotPrimary}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/new-design/homepage-redesign/system-solutions/system-globe.png"
              alt="AI Solutions, a network of connected systems orchestrated by AI."
            />
            <figcaption>Now accepting clients · Smarter operations, smaller footprint.</figcaption>
          </figure>

          <ul className={styles.detailFeatures}>
            {HERO_FEATURES.map((f) => (
              <li key={f.title}>
                <strong>{f.title}</strong>
                <span>{f.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Hero stats strip ── */}
      <div className={styles.detailStats}>
        {HERO_STATS.map((s) => (
          <div key={s.label} className={styles.detailStat}>
            <span className={styles.detailStatValue}>{s.value}</span>
            <span className={styles.detailStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── All 8 services ── */}
      <div className={styles.serviceGrid}>
        {AI_SERVICES.map((svc) => {
          const Icon = ICON_MAP[svc.iconName] ?? Zap;
          return (
            <Link
              key={svc.slug}
              className={styles.serviceCard}
              href={`/ai-solutions/services/${svc.slug}`}
            >
              <span className={styles.serviceIcon} aria-hidden="true">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <span className={styles.serviceCategory}>
                {CATEGORY_LABEL[svc.category]}
                {svc.isNew && <span className={styles.serviceNewBadge}>New</span>}
              </span>
              <h3 className={styles.serviceTitle}>{svc.shortTitle}</h3>
              <p className={styles.serviceOutcome}>{svc.outcome}</p>
            </Link>
          );
        })}
      </div>

      {/* ── Process ── */}
      <section id="process" className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ HOW IT WORKS</p>
          <h2>From audit to automation in six weeks.</h2>
          <p>
            Six structured steps from first conversation to live automation. No surprises, no
            opaque scoping, no theatrical demos.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.outlineButton} href="/ai-solutions/process">
              See the full process
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <ul className={styles.detailFeatures}>
          {PROCESS_STEPS.slice(0, 4).map((step) => (
            <li key={step.num}>
              <strong>
                {step.num} · {step.title}
              </strong>
              <span>{step.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Trust stats strip ── */}
      <div className={styles.detailStats}>
        {TRUST_STATS.map((s) => (
          <div key={s.label} className={styles.detailStat}>
            <span className={styles.detailStatValue}>{s.value}</span>
            <span className={styles.detailStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── CTA + Lead Form ── */}
      <section id="contact" className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ GET STARTED</p>
          <h2>Ready to see your numbers?</h2>
          <p>
            Tell us where to send the audit link, or jump straight to booking a call. Every
            engagement starts with a free assessment.
          </p>
        </div>

        <div className={styles.detailLeadForm}>
          <LeadForm source="ai-solutions-hub" />
        </div>
      </section>
    </>
  );
}
