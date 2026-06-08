import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/fhg.module.css';
import { Header, Footer } from '@/components/fhg/SiteChrome';

export const metadata: Metadata = {
  title: 'About | Fox Haven Group',
  description:
    'Fox Haven Group bridges research, policy, implementation, public health, public safety, and community systems. Rigor. Relationships. Results.',
};

const worlds: [string, string][] = [
  ['Research', 'Practice'],
  ['Policy', 'Implementation'],
  ['Strategy', 'Field reality'],
  ['Public health', 'Public safety'],
  ['Evidence', 'Trust'],
  ['Plans', 'Execution'],
  ['Systems', 'People'],
];

const values = [
  { title: 'Rigor', body: 'We bring implementation science and evaluation discipline to messy, real-world conditions — not theory for its own sake.' },
  { title: 'Relationships', body: 'Trust is the infrastructure implementation runs on. We build it with the people closest to the work and keep it.' },
  { title: 'Results', body: 'We measure what matters and stay until strategy becomes systems that hold — from insight to impact.' },
];

export default function AboutPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.grain} aria-hidden="true" />
      <Header />

      <section className={styles.pageHero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>About</p>
          <h1 className={styles.display}>
            Where evidence survives contact with the <span className={styles.gold}>real world.</span>
          </h1>
          <p className={styles.pageHeroLead}>
            Most firms live on one side of a divide — research or practice, policy or implementation,
            strategy or field reality. Fox Haven Group&rsquo;s value is the rare ability to move
            between them.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`}>
            <p className={styles.eyebrow}>The Bridge</p>
            <h2 className={styles.h2}>We work in the tension between two worlds.</h2>
            <p className={styles.body}>
              We help mission-driven leaders close the implementation gap by translating research,
              policy, and strategy into practical systems-change work. Overdose prevention is one
              visible application — the deeper capability is implementation across complex systems.
            </p>
          </div>
          <div className={`${styles.worlds} reveal`}>
            {worlds.map(([a, b]) => (
              <div className={styles.worldsRow} key={a}>
                <span>{a}</span>
                <span className={styles.worldsArrow} aria-hidden="true">⇌</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark} ${styles.gridLines}`}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`}>
            <p className={styles.eyebrow}>How We Work</p>
            <h2 className={styles.h2}>Rigor. Relationships. Results.</h2>
          </div>
          <div className={`${styles.values} reveal`}>
            {values.map((v) => (
              <div className={styles.value} key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPlum}`}>
        <div className={styles.container}>
          <div className={styles.ctaBand}>
            <div>
              <p className={styles.eyebrow}>Rooted in Phoenix. Built for the field.</p>
              <h2 className={styles.h2}>Let&rsquo;s move your mission from insight to impact.</h2>
            </div>
            <div className={styles.btnRow}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/contact">
                Start a Conversation
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
