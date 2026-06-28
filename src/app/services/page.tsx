import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/fhg.module.css';
import { Header, Footer } from '@/components/fhg/SiteChrome';
import { services } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'Services & Engagements | Fox Haven Group',
  description:
    'Implementation science, policy translation, stakeholder engagement, technical assistance, strategic planning, and evaluation — packaged into four ways to engage.',
};

const offers = [
  {
    kicker: 'Entry',
    title: 'Systems Diagnostic',
    body: 'A clear first engagement that identifies the problem, system barriers, stakeholder landscape, and practical next steps.',
    items: ['Capabilities & constraints analysis', 'Stakeholder map', 'Readiness assessment', 'Implementation risks', 'Recommended next steps'],
  },
  {
    kicker: 'Core — Flagship',
    title: 'Implementation Blueprint',
    body: 'The full plan to take a strategy from intention to durable execution, with the infrastructure to carry it.',
    items: ['Implementation roadmap', 'Roles and responsibilities', 'Fidelity/adaptation guidance', 'Timeline', 'Communication and buy-in plan', 'Sustainability considerations'],
  },
  {
    kicker: 'Recurring',
    title: 'Technical Assistance Partner',
    body: 'Ongoing support to help partners implement, adapt, and sustain the work as conditions change.',
    items: ['Monthly TA sessions', 'Implementation coaching', 'Troubleshooting support', 'Resource development', 'Partner facilitation', 'Learning sessions'],
  },
  {
    kicker: 'Premium',
    title: 'Systems Change Initiative',
    body: 'A larger engagement for funders, agencies, coalitions, and multi-sector efforts driving change at scale.',
    items: ['Multi-partner strategy', 'Governance structure', 'Implementation infrastructure', 'Cross-sector facilitation', 'Evaluation/learning loops'],
  },
];

export default function ServicesPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.grain} aria-hidden="true" />
      <Header />

      <section className={styles.pageHero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Our Services</p>
          <h1 className={styles.display}>Services that move evidence-based strategies into practice.</h1>
          <p className={styles.pageHeroLead}>
            Six transferable capabilities, and four clear ways to put them to work. What you buy is
            implementation capacity — the ability to move complex systems under real-world conditions.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`}>
            <p className={styles.eyebrow}>Core Capabilities</p>
            <h2 className={styles.h2}>What we do.</h2>
          </div>
          <div className={`${styles.cardGrid} reveal`}>
            {services.map(({ Icon, slug, title, tileBlurb }) => (
              <Link
                className={`${styles.card} ${styles.cardLink}`}
                key={slug}
                href={`/services/${slug}`}
              >
                <span className={styles.cardIcon}>
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <h3>{title}</h3>
                <p>{tileBlurb}</p>
                <span className={styles.cardArrow}>
                  Explore
                  <ArrowRight size={14} className="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark} ${styles.gridLines}`}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`}>
            <p className={styles.eyebrow}>Engagements</p>
            <h2 className={styles.h2}>Four ways to engage.</h2>
            <p className={styles.body}>
              From a focused first diagnostic to a multi-sector systems-change initiative — each
              engagement is scoped to where your system is and where it needs to go.
            </p>
          </div>
          <div className={`${styles.offerGrid} reveal`}>
            {offers.map((o) => (
              <article className={styles.offer} key={o.title}>
                <span className={styles.cardKicker}>{o.kicker}</span>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
                <ul className={styles.offerList}>
                  {o.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className={`${styles.body} reveal`} style={{ maxWidth: '74ch', margin: '2.75rem auto 0', textAlign: 'center' }}>
            Fox Haven Group works with organizations through scoped consulting projects, technical
            assistance partnerships, and grant-aligned implementation support. For funded projects,
            we can help determine whether a contractor, consultant, or subaward role is the
            appropriate fit.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPlum}`}>
        <div className={styles.container}>
          <div className={styles.ctaBand}>
            <div>
              <p className={styles.eyebrow}>From insight to impact.</p>
              <h2 className={styles.h2}>Not sure which engagement fits? Start with a diagnostic.</h2>
            </div>
            <div className={styles.btnRow}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/contact">
                Start with a readiness diagnostic.
                <ArrowRight size={16} className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
