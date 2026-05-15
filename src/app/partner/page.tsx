import Link from 'next/link';
import { Building2, Users, Stethoscope, Briefcase } from 'lucide-react';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import PartnerLeadForm from '@/components/partner/PartnerLeadForm';
import styles from '@/styles/design-system.module.css';

/**
 * /partner, Partner With Us
 *
 * Detailed landing page for cities, community orgs, healthcare providers,
 * mission-aligned businesses, funders, and beta testers who want to work
 * with Fox Haven on the Phoenix heat resilience network.
 *
 * All "Partner With Us" / "Join the Beta" CTAs across the site route here.
 */

const HERO_STATS = [
  { value: '110°+', label: 'Days per year Phoenix exceeds critical heat' },
  { value: '600+', label: 'Heat-related deaths in Maricopa County (2023)' },
  { value: '4', label: 'Initiatives ready to deploy now' },
  { value: '0', label: 'Cost to start a conversation' },
];

const PARTNER_TYPES = [
  {
    Icon: Building2,
    category: 'Public sector',
    title: 'City & County Agencies',
    body: 'Pilot deployments, data integrations, and resident-facing services. We work with public works, parks, transit, libraries, and emergency management.',
  },
  {
    Icon: Users,
    category: 'Mission alignment',
    title: 'Community Organizations',
    body: 'Faith groups, mutual-aid networks, refugee services, and outreach nonprofits. We extend your reach with tools your team can actually run.',
  },
  {
    Icon: Stethoscope,
    category: 'Care delivery',
    title: 'Healthcare Providers',
    body: 'Hospitals, urgent care, federally qualified health centers, and public health departments, heat is a clinical problem and we treat it like one.',
  },
  {
    Icon: Briefcase,
    category: 'Capital & infrastructure',
    title: 'Mission-Aligned Businesses',
    body: 'Local employers, sponsors, and tech partners who want their dollars in the field, not a marketing line item. We&rsquo;ll show you exactly where it lands.',
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery call',
    timeframe: 'Week 1',
    desc: 'A 45-minute conversation to align on the population you serve, where the gaps are today, and whether Fox Haven is the right fit.',
  },
  {
    num: '02',
    title: 'Pilot scope',
    timeframe: 'Weeks 2–3',
    desc: 'A short written scope. Which initiative (Heat Relief App, Solar Shelters, System Solutions), which neighborhoods, what success looks like, and who owns what.',
  },
  {
    num: '03',
    title: 'Deploy',
    timeframe: 'Weeks 4–8',
    desc: 'Build, integrate, train, install. We do not hand off code and disappear, we stay on the ground until the system is running and your team owns it.',
  },
  {
    num: '04',
    title: 'Measure & iterate',
    timeframe: 'Ongoing',
    desc: 'Weekly metrics, quarterly reviews, and a roadmap for what to deploy next. Every Phoenix partner shapes what we ship to the next city.',
  },
];

const WHAT_YOU_GET = [
  {
    title: 'A dedicated partner lead',
    body: 'One named person at Fox Haven owns your engagement from first call to long-term operation. No ticket queues. No handoffs.',
  },
  {
    title: 'Working systems, not pilots-as-PR',
    body: 'We do not run pilots that quietly die. Every deployment is built to keep running after the press release fades.',
  },
  {
    title: 'Open data & shared learning',
    body: 'Anonymized impact data flows back to you, your community, and (with consent) the broader network so every Phoenix deployment makes the next one cheaper.',
  },
  {
    title: 'Veteran-owned, locally rooted',
    body: 'SDVOSB-eligible for public-sector procurement, headquartered in Phoenix, and accountable to the same neighborhoods we serve.',
  },
];

export default function PartnerPage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      {/* ── Hero ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ PARTNERS · COMMUNITIES · CHANGE MAKERS</p>
          <h2>
            Help build the first deployable heat resilience network in Phoenix.
          </h2>
          <p>
            Fox Haven Group is moving fast and building in the open. We&rsquo;re looking for
            partners who want to put working systems on the ground, not commission another
            report.
          </p>
          <div className={styles.detailActions}>
            <a className={styles.solidButton} href="#partner-form">
              Start the conversation
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </a>
            <Link className={styles.outlineButton} href="/initiatives/heat-relief-app">
              See what we&rsquo;re building
              <span className={styles.playArrow} aria-hidden="true">
                ▷
              </span>
            </Link>
          </div>
        </div>

        <ul className={styles.detailFeatures}>
          {WHAT_YOU_GET.map((d) => (
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

      {/* ── Who we partner with ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ WHO WE PARTNER WITH</p>
          <h2>Four kinds of partners. One mission.</h2>
          <p>
            We work with the organizations closest to the people heat hurts first, and the
            ones with the resources to act on what they see.
          </p>
        </div>
      </section>

      <div className={styles.serviceGrid}>
        {PARTNER_TYPES.map((p) => (
          <article key={p.title} className={styles.serviceCard}>
            <span className={styles.serviceCategory}>
              <p.Icon size={14} strokeWidth={2.2} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
              {p.category}
            </span>
            <h3 className={styles.serviceTitle}>{p.title}</h3>
            <p className={styles.serviceOutcome}>{p.body}</p>
          </article>
        ))}
      </div>

      {/* ── How partnerships work ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ HOW IT WORKS</p>
          <h2>From first call to running system in eight weeks.</h2>
          <p>
            Every partnership follows the same shape. No mystery, no scope creep, no surprise
            invoices. You will always know exactly where we are.
          </p>
        </div>
      </section>

      <ol className={styles.processTimeline}>
        {PROCESS_STEPS.map((step) => (
          <li key={step.num} className={styles.processTimelineItem}>
            <span className={styles.processTimelineNumber} aria-hidden="true">
              {step.num}
            </span>
            <div className={styles.processTimelineBody}>
              <div className={styles.processTimelineTitleRow}>
                <h3 className={styles.processTimelineTitle}>{step.title}</h3>
                <span className={styles.processTimelineTimeframe}>{step.timeframe}</span>
              </div>
              <p className={styles.processTimelineDesc}>{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Form ── */}
      <section id="partner-form" className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ GET IN TOUCH</p>
          <h2>Tell us what you&rsquo;re trying to build.</h2>
          <p>
            One form. One real human reading it. We reply within two business days with next
            steps, or an honest &ldquo;we&rsquo;re not the right fit, here&rsquo;s who is.&rdquo;
          </p>
          <p className={styles.auditFooterCopy} style={{ textAlign: 'left', marginTop: '0.6rem' }}>
            Prefer email? Write us at{' '}
            <a className={styles.auditFooterLink} href="mailto:hello@foxhavengrouphq.com">
              hello@foxhavengrouphq.com
            </a>
            .
          </p>
        </div>

        <PartnerLeadForm source="partner-page" />
      </section>

      <Footer />
    </main>
  );
}
