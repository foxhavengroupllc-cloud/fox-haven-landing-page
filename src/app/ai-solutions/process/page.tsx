import Link from 'next/link';
import styles from '@/styles/design-system.module.css';
import { PROCESS_STEPS } from '@/lib/ai-solutions-config';

/**
 * Process page — full six-step timeline using design-system archetypes.
 * Pulls PROCESS_STEPS from src/lib/ai-solutions-config.ts (unchanged).
 */

export default function ProcessPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ OUR PROCESS</p>
          <h2>From discovery to deployment in six clear steps.</h2>
          <p>
            Every engagement follows the same proven process — designed to minimise risk,
            maximise ROI, and get you to results as fast as possible.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/audit">
              Start at step one
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <ol className={styles.processTimeline}>
        {PROCESS_STEPS.map((step) => (
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

      {/* ── CTA ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ READY TO START?</p>
          <h2>The free audit takes 12 minutes.</h2>
          <p>
            You get a scored report with concrete recommendations — no commitment required, no
            sales-call pressure.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/audit">
              Start the free audit
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={styles.outlineButton} href="/ai-solutions/pricing">
              View pricing
              <span className={styles.playArrow} aria-hidden="true">
                ▷
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
