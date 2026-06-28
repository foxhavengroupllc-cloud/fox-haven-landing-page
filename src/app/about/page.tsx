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
  { title: 'Rigor', body: 'We bring implementation science and evaluation discipline to messy, real-world conditions, not theory for its own sake.' },
  { title: 'Relationships', body: 'Trust is the infrastructure implementation runs on. We build it with the people closest to the work and keep it.' },
  { title: 'Results', body: 'We measure what matters and stay until strategy becomes systems that hold, from insight to impact.' },
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
            In public service, there is often a gap between theory and reality. Most groups work on
            just one side, focusing strictly on research, policy, or strategy. At Fox Haven Group, we
            bridge that divide by actively moving between planning and real-world implementation.
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
              visible application of what we do, but our deeper capability is driving implementation
              across complex systems.
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

      <section className={`${styles.section} ${styles.sectionAsphalt} ${styles.gridLines}`}>
        <div className={styles.container}>
          <div className={`${styles.bioBlock} reveal`}>
            <div className={styles.bioPhoto}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/sydney-fox.jpg" alt="Sydney Fox, Fox Haven Group" />
            </div>
            <div className={styles.bioBody}>
              <p className={styles.eyebrow}>Who&rsquo;s behind the work</p>
              <h2 className={styles.h2}>Sydney Fox, Ph.D.</h2>
              <p className={styles.bioTitle}>Founder &amp; Principal</p>
              <ul className={styles.bioList}>
                <li>PhD-trained policy and implementation thinker.</li>
                <li>Public health and overdose prevention technical assistance experience.</li>
                <li>Experience supporting multi-state teams, coalitions, and cross-sector partners.</li>
                <li>
                  Background in translating policy, evidence, and strategy into field-ready
                  implementation support.
                </li>
              </ul>
              <p className={styles.bioNote}>
                Placeholder — swap in headshot, name, title, and final bio before launch.
              </p>
            </div>
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
              <h2 className={styles.h2}>Let&rsquo;s move your strategy from paper to practice.</h2>
            </div>
            <div className={styles.btnRow}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/contact">
                Start the conversation
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
