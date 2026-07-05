import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/fhg.module.css';
import { Header, Footer } from '@/components/fhg/SiteChrome';
import { bridgeSteps } from '@/components/fhg/ImplementationBridge';

export const metadata: Metadata = {
  title: 'The Implementation Bridge | Fox Haven Group',
  description:
    'Our method: a six-step path — Clarify, Engage, Design, Prepare, Implement, Learn & Adapt — that carries strategy across the implementation gap and into systems that hold.',
};

export default function MethodPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.grain} aria-hidden="true" />
      <Header />

      <section className={styles.pageHero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Our Approach</p>
          <h1 className={styles.display}>
            The Implementation Bridge
          </h1>
          <p className={styles.pageHeroLead}>
            Good strategy fails at the same place again and again: the gap between what is decided and
            what gets done. The Implementation Bridge is our practical framework for helping
            communities move from evidence and policy to real-world implementation with fidelity,
            fit, and buy-in.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`}>
            <p className={styles.eyebrow}>Six Steps</p>
            <h2 className={styles.h2}>From what is known to what is possible.</h2>
            <p className={styles.body}>
              The Bridge is sequential but not rigid. We meet partners where they are, and work
              together to design an implementation plan that works for their unique needs.
            </p>
          </div>

          <div className={styles.bridgeDetail}>
            {bridgeSteps.map(({ num, title, long, Icon }) => (
              <article className={`${styles.bridgeDetailRow} reveal`} key={num}>
                <span className={styles.bridgeBigNum}>{num}</span>
                <div>
                  <h3>
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      style={{ display: 'inline', verticalAlign: '-3px', marginRight: '0.6rem', color: 'var(--gold)' }}
                    />
                    {title}
                  </h3>
                  <p>{long}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPlum}`}>
        <div className={styles.container}>
          <div className={styles.ctaBand}>
            <div>
              <p className={styles.eyebrow}>Map the system. Build the roadmap.</p>
              <h2 className={styles.h2}>See how The Bridge applies to your system.</h2>
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
