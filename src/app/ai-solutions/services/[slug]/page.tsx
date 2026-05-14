import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Zap,
  BarChart3,
  CalendarClock,
  Link2,
  Bot,
  FileText,
  Compass,
  MessageSquare,
  Check,
  type LucideIcon,
} from 'lucide-react';
import {
  AI_SERVICES,
  getServiceBySlug,
  getRelatedServices,
  type AIService,
} from '@/lib/ai-solutions-config';
import styles from '@/styles/design-system.module.css';
import LeadForm from '@/components/ai-small-biz/LeadForm';

interface Props {
  params: Promise<{ slug: string }>;
}

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

export async function generateStaticParams() {
  return AI_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | AI Solutions — Fox Haven Group`,
    description: service.tagline,
    openGraph: {
      title: `${service.title} — Fox Haven Group AI Solutions`,
      description: service.tagline,
      url: `https://foxhavengrouphq.com/ai-solutions/services/${slug}`,
    },
  };
}

function RelatedCard({ service }: { service: AIService }) {
  const Icon = ICON_MAP[service.iconName] ?? Zap;
  return (
    <Link
      key={service.slug}
      className={styles.serviceCard}
      href={`/ai-solutions/services/${service.slug}`}
    >
      <span className={styles.serviceIcon} aria-hidden="true">
        <Icon size={18} strokeWidth={2.2} />
      </span>
      <span className={styles.serviceCategory}>
        {CATEGORY_LABEL[service.category]}
        {service.isNew && <span className={styles.serviceNewBadge}>New</span>}
      </span>
      <h3 className={styles.serviceTitle}>{service.shortTitle}</h3>
      <p className={styles.serviceOutcome}>{service.outcome}</p>
    </Link>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(slug, 3);
  const Icon = ICON_MAP[service.iconName] ?? Zap;

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>
            <span className={styles.serviceIcon} aria-hidden="true" style={{ width: 22, height: 22, marginRight: '0.4rem', verticalAlign: '-6px' }}>
              <Icon size={14} strokeWidth={2.2} />
            </span>
            {CATEGORY_LABEL[service.category]}
            {service.isNew && <span className={styles.serviceNewBadge}>New</span>}
          </p>
          <h2>{service.title}</h2>
          <p>{service.tagline}</p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/audit">
              Start the free audit
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={styles.outlineButton} href="/ai-solutions/services">
              All services
              <span className={styles.playArrow} aria-hidden="true">
                ▷
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.detailShots}>
          <div className={styles.serviceDetailProblem}>
            <p className={styles.eyebrow}>◉ THE PROBLEM</p>
            <p>{service.problemStatement}</p>
          </div>
        </div>
      </section>

      {/* ── Metrics strip ── */}
      <div className={styles.detailStats}>
        {service.metrics.map((m) => (
          <div key={m.label} className={styles.detailStat}>
            <span className={styles.detailStatValue}>{m.value}</span>
            <span className={styles.detailStatLabel}>{m.label}</span>
          </div>
        ))}
      </div>

      {/* ── Solution + features ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ THE SOLUTION</p>
          <h2>What you get.</h2>
          <p>{service.description}</p>
        </div>

        <ul className={styles.detailFeatures}>
          {service.features.map((feature, i) => (
            <li key={i} className={styles.serviceDetailFeatureItem}>
              <span className={styles.serviceDetailFeatureCheck} aria-hidden="true">
                <Check size={14} strokeWidth={2.5} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Related ── */}
      {related.length > 0 && (
        <>
          <section className={styles.detailSection}>
            <div className={styles.detailIntro}>
              <p className={styles.eyebrow}>◉ RELATED SERVICES</p>
              <h2>You might also need.</h2>
              <p>
                Common pairings teams reach for once {service.shortTitle.toLowerCase()} is in
                place.
              </p>
            </div>
          </section>

          <div className={styles.serviceGrid}>
            {related.map((s) => (
              <RelatedCard key={s.slug} service={s} />
            ))}
          </div>
        </>
      )}

      {/* ── CTA + LeadForm ── */}
      <section id="contact" className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ GET STARTED</p>
          <h2>See how this applies to your business.</h2>
          <p>
            Start with a free audit to identify your biggest opportunities — then we&rsquo;ll
            scope a plan together.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/audit">
              Start free audit
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.detailLeadForm}>
          <LeadForm source={`ai-solutions-${service.slug}`} />
        </div>
      </section>
    </>
  );
}
