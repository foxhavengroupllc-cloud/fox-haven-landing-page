import Link from 'next/link';
import styles from '@/styles/design-system.module.css';
import { CASE_STUDIES, AI_SERVICES } from '@/lib/ai-solutions-config';

/**
 * Case studies page, restyled to use design-system archetypes.
 * Data unchanged: CASE_STUDIES from src/lib/ai-solutions-config.ts.
 */

const SERVICE_LABEL: Record<string, string> = Object.fromEntries(
  AI_SERVICES.map((s) => [s.slug, s.shortTitle]),
);

export default function CaseStudiesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ CASE STUDIES</p>
          <h2>Real results from real businesses.</h2>
          <p>
            See how teams like yours recovered revenue, saved time, and eliminated operational
            drag with Fox Haven AI solutions.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/audit">
              Get your assessment
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Case study grid ── */}
      <div className={styles.caseStudyGrid}>
        {CASE_STUDIES.map((study) => (
          <article key={study.slug} className={styles.caseStudyCard}>
            <p className={styles.caseStudyIndustry}>{study.industry}</p>
            <h3 className={styles.caseStudyTitle}>{study.title}</h3>

            <p className={styles.caseStudyLabel}>Challenge</p>
            <p className={styles.caseStudyBody}>{study.challenge}</p>

            <p className={styles.caseStudyLabel}>Solution</p>
            <p className={styles.caseStudyBody}>{study.solution}</p>

            <div className={styles.caseStudyMetrics}>
              {study.metrics.map((m) => (
                <div key={m.label} className={styles.caseStudyMetric}>
                  <span className={styles.caseStudyMetricValue}>{m.value}</span>
                  <span className={styles.caseStudyMetricLabel}>{m.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.caseStudyServices}>
              <span className={styles.caseStudyServicesLabel}>Services used</span>
              <ul>
                {study.services.map((slug) => (
                  <li key={slug}>
                    <Link href={`/ai-solutions/services/${slug}`}>
                      {SERVICE_LABEL[slug] ?? slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* ── CTA ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ NEXT</p>
          <h2>Want to be the next success story?</h2>
          <p>
            Start with the free audit and we&rsquo;ll show you exactly where your biggest
            opportunities are.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/audit">
              Start the free audit
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
