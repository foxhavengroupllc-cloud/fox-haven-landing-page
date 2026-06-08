import type { Metadata } from 'next';
import styles from '@/styles/fhg.module.css';
import { Header, Footer } from '@/components/fhg/SiteChrome';
import LeadForm from '@/components/fhg/LeadForm';

export const metadata: Metadata = {
  title: 'Contact | Fox Haven Group',
  description:
    'Tell us about the system you’re trying to move. Fox Haven Group brings rigor, focus, and practical support — from strategy to measurable outcomes.',
};

export default function ContactPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.grain} aria-hidden="true" />
      <Header />

      <section className={styles.pageHero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Contact</p>
          <h1 className={styles.display}>Let&rsquo;s build what works.</h1>
          <p className={styles.pageHeroLead}>
            Tell us about the system you&rsquo;re trying to move — who&rsquo;s involved, what&rsquo;s
            stuck, and where you want it to go. We&rsquo;ll bring rigor, focus, and practical support.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark} ${styles.gridLines}`}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <div className={styles.contactAside}>
              <div className={styles.contactItem}>
                <p className={styles.label}>Email</p>
                <a href="mailto:hello@foxhavengrouphq.com">hello@foxhavengrouphq.com</a>
              </div>
              <div className={styles.contactItem}>
                <p className={styles.label}>What to expect</p>
                <p>We reply within two business days. First conversations are short, specific, and free.</p>
              </div>
              <div className={styles.contactItem}>
                <p className={styles.label}>Where to start</p>
                <p>
                  Most partnerships open with a <strong style={{ color: 'var(--bone)' }}>Systems Diagnostic</strong> —
                  a focused read on barriers, stakeholders, and the practical next steps.
                </p>
              </div>
              <div className={styles.contactItem}>
                <p className={styles.label}>Based in</p>
                <p>Phoenix, Arizona — working nationally.</p>
              </div>
            </div>

            <LeadForm source="contact-page" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
