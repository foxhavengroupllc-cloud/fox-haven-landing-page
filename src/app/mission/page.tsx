import Link from 'next/link';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

/**
 * /mission, Our Mission
 *
 * Standalone page that expands the "haven isn't just a place" mission
 * statement, lists the three core values, and connects to the partner
 * funnel. Replaces the inline Mission section that used to live on the
 * homepage.
 */

const MISSION_VALUES = [
  {
    number: '1',
    title: 'Community First',
    body: 'Every product we build starts with a real community need. We work alongside the people we serve, not just for them.',
  },
  {
    number: '2',
    title: 'Innovation with Purpose',
    body: 'Technology is a tool, not a goal. We harness innovation to solve problems that matter: heat, safety, and family wellbeing.',
  },
  {
    number: '3',
    title: 'Scalable Impact',
    body: 'We design every solution to grow. What starts in Phoenix becomes a model for resilient, connected communities nationwide.',
  },
];

const PRINCIPLES = [
  {
    title: 'Build with, not for',
    body: 'No system survives if the people it serves had no hand in shaping it. Every initiative starts with community input and stays accountable to it.',
  },
  {
    title: 'Ship working systems',
    body: 'We do not run pilots that quietly die. Every deployment is built to keep running long after the press release fades.',
  },
  {
    title: 'Measure what matters',
    body: 'Lives kept safe. Hours saved. Connections made. We publish the metrics that prove the work, not the ones that flatter it.',
  },
  {
    title: 'Open by default',
    body: 'Code, data, methods, and lessons learned flow back to the community and the broader network so every Phoenix deployment makes the next one cheaper.',
  },
];

export default function MissionPage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      {/* ── Hero / mission statement ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ OUR MISSION</p>
          <h2>
            A haven isn&rsquo;t just a place, it&rsquo;s a feeling of safety, connection, and
            possibility.
          </h2>
          <p>
            We&rsquo;re a group of innovators, designers, and community advocates who believe
            that thoughtful technology and purposeful infrastructure can fundamentally improve
            lives.
          </p>
          <p>
            Fox Haven Group exists to build the civic systems a hotter, faster-changing world
            actually needs, starting with extreme heat in Phoenix, and designed from day one
            to travel.
          </p>
          <p className={styles.missionCite}>,  Fox Haven Group Team, Phoenix AZ</p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/partner">
              Work with us
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={styles.outlineButton} href="/#building-now">
              See what we&rsquo;re building
              <span className={styles.playArrow} aria-hidden="true">
                ▷
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.learnGrid}>
          {MISSION_VALUES.map((v) => (
            <article key={v.number} className={styles.learnCard}>
              <span className={styles.learnCardIcon} aria-hidden="true">
                {v.number}
              </span>
              <h3 className={styles.learnCardTitle}>{v.title}</h3>
              <p className={styles.learnCardBody}>{v.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Why this work, why now ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ WHY THIS WORK, WHY NOW</p>
          <h2>The systems we have were not built for the world we live in.</h2>
          <p>
            Phoenix crossed 110°F on more than 50 days in a single recent summer. Heat is now
            the deadliest weather hazard in the United States, and the response, from public
            agencies, healthcare systems, and the communities most affected, is still being
            improvised one summer at a time.
          </p>
          <p>
            Fox Haven Group builds the infrastructure that connects those efforts: a heat
            relief app for residents, solar-powered shelters for the hours that matter most,
            and AI-native operational tools so the people doing the work can spend their time
            on people, not paperwork.
          </p>
        </div>
      </section>

      {/* ── How we work ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ HOW WE WORK</p>
          <h2>Four principles. Every initiative. No exceptions.</h2>
          <p>
            These are the rules we wrote down the day we started and the rules we audit
            ourselves against before we ship anything.
          </p>
        </div>

        <ul className={styles.detailFeatures}>
          {PRINCIPLES.map((p) => (
            <li key={p.title}>
              <strong>{p.title}</strong>
              <span>{p.body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Who we are ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ WHO WE ARE</p>
          <h2>Veteran-owned. Phoenix-headquartered. Accountable.</h2>
          <p>
            Fox Haven Group is a Service-Disabled Veteran-Owned Small Business (SDVOSB)
            headquartered in Phoenix, Arizona. We are technologists, designers, and operators
            who share a conviction that civic infrastructure is too important to leave to
            chance, or to vendors who disappear after the contract closes.
          </p>
          <p>
            We are small on purpose. Every engagement is owned end-to-end by a named person at
            Fox Haven, and we take on only the work we can deliver well.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ WORK WITH US</p>
          <h2>Help build the first deployable heat resilience network in Phoenix.</h2>
          <p>
            If any of this resonates, as a city agency, a community organization, a
            healthcare provider, a mission-aligned business, or a person who wants to test
            what we&rsquo;re building, we want to hear from you.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/partner">
              Partner with us
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={styles.outlineButton} href="/audit">
              Take the free assessment
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
