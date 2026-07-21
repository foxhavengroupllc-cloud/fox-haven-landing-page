import type { Metadata } from 'next';
import styles from '@/styles/fhg.module.css';

export const metadata: Metadata = {
  title: 'Fox Haven Group | Coming Soon',
  description: 'Evidence into action. Systems into motion. Our new site is on the way.',
  robots: { index: false, follow: false },
};

// Shown to the public on every route while the site is in private preview
// (see middleware.ts). The team unlocks the real site via the secret link.
export default function ComingSoonPage() {
  return (
    <main className={styles.comingSoon}>
      <div className={styles.gritBg} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.comingInner}>
        <p className={styles.comingKicker}>Coming soon</p>
        <h1 className={styles.comingTitle}>
          Evidence into action.
          <span>Systems into motion.</span>
        </h1>
        <p className={styles.comingLead}>
          We&rsquo;re building something new — implementation and systems-change support for public
          health, public safety, behavioral health, and the communities they serve.
        </p>
        <a className={styles.comingMail} href="mailto:hello@foxhavengrouphq.com">
          hello@foxhavengrouphq.com
        </a>
      </div>
    </main>
  );
}
