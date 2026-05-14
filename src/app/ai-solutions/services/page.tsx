import Link from 'next/link';
import {
  Zap,
  BarChart3,
  CalendarClock,
  Link2,
  Bot,
  FileText,
  Compass,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';
import styles from '@/styles/design-system.module.css';
import { AI_SERVICES } from '@/lib/ai-solutions-config';

/**
 * Full 8-service catalog. Restyled to use design-system archetypes
 * (.detailSection / .serviceGrid / .serviceCard).
 */

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  BarChart3,
  CalendarClock,
  Link2,
  Bot,
  FileText,
  Compass,
  MessageSquare,
};

const CATEGORY_LABEL: Record<string, string> = {
  automation: 'Automation',
  'ai-agents': 'AI Agents',
  consulting: 'Consulting',
};

export default function ServicesPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ ALL SERVICES</p>
          <h2>Eight ways AI can move the needle.</h2>
          <p>
            From automated lead response to custom AI agents and strategic consulting — every
            service is designed for teams that need results, not demos.
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

      {/* ── Service grid (all 8) ── */}
      <div className={styles.serviceGrid}>
        {AI_SERVICES.map((svc) => {
          const Icon = ICON_MAP[svc.iconName] ?? Zap;
          return (
            <Link
              key={svc.slug}
              className={styles.serviceCard}
              href={`/ai-solutions/services/${svc.slug}`}
            >
              <span className={styles.serviceIcon} aria-hidden="true">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <span className={styles.serviceCategory}>
                {CATEGORY_LABEL[svc.category]}
                {svc.isNew && <span className={styles.serviceNewBadge}>New</span>}
              </span>
              <h3 className={styles.serviceTitle}>{svc.title}</h3>
              <p className={styles.serviceOutcome}>{svc.outcome}</p>
            </Link>
          );
        })}
      </div>

      {/* ── Helper CTA ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ NOT SURE WHERE TO START?</p>
          <h2>Start with the free audit.</h2>
          <p>
            We&rsquo;ll identify exactly where automation can help — no commitment required.
            Sixteen questions, five minutes, a scored report at the end.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/audit">
              Start the free audit
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={styles.outlineButton} href="/ai-solutions/process">
              See the process
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
