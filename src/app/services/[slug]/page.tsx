import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from '@/styles/fhg.module.css';
import { Header, Footer } from '@/components/fhg/SiteChrome';
import PricingNote from '@/components/fhg/PricingNote';
import { engagements, getEngagementBySlug } from '@/lib/engagements-data';

export function generateStaticParams() {
  return engagements.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const engagement = getEngagementBySlug(slug);
  if (!engagement) return { title: 'Engagement not found | Fox Haven Group' };
  return {
    title: `${engagement.title} | Fox Haven Group`,
    description: `${engagement.tagline} ${engagement.price}.`,
  };
}

export default async function EngagementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const engagement = getEngagementBySlug(slug);
  if (!engagement) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: engagement.title,
    description: engagement.tagline,
    provider: {
      '@type': 'Organization',
      name: 'Fox Haven Group',
      url: 'https://foxhavengrouphq.com',
    },
    areaServed: 'US',
    offers: {
      '@type': 'Offer',
      name: engagement.title,
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD' },
      description: engagement.price,
    },
  };

  return (
    <main className={styles.shell}>
      <div className={styles.grain} aria-hidden="true" />
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <Link href="/services" className={styles.backLink}>
            <ArrowLeft size={14} />
            All services
          </Link>
          <p className={styles.eyebrow}>Engagement</p>
          <h1 className={styles.display}>{engagement.title}</h1>
          <p className={styles.offerSub}>{engagement.tagline}</p>
          <p className={styles.offerPrice}>{engagement.price}</p>
          {engagement.intro.map((p) => (
            <p className={styles.pageHeroLead} key={p.slice(0, 32)}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── What it is ── */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`}>
            <p className={styles.eyebrow}>What it is</p>
            {engagement.whatItIs.map((p) => (
              <p className={styles.body} key={p.slice(0, 32)}>
                {p}
              </p>
            ))}
          </div>

          <div className={`${styles.engBridge} reveal`}>
            <h2 className={styles.h2}>How The Bridge is used</h2>
            <p className={styles.body}>{engagement.bridgeLead}</p>
            <div className={styles.engBridgeSteps}>
              {engagement.bridgeSteps.map((s) => (
                <div className={styles.engBridgeStep} key={s.name}>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Fit ── */}
      <section className={`${styles.section} ${styles.sectionDark} ${styles.gridLines}`}>
        <div className={styles.container}>
          <div className={`${styles.fitGrid} reveal`}>
            <div>
              <p className={styles.eyebrow}>Best for</p>
              <p className={styles.body}>{engagement.bestForIntro}</p>
              <ul className={styles.bioList}>
                {engagement.bestFor.map((li) => (
                  <li key={li.slice(0, 32)}>{li}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.eyebrow}>Not the best fit if</p>
              <p className={styles.body}>{engagement.notFitIntro}</p>
              <ul className={styles.bioList}>
                {engagement.notFit.map((li) => (
                  <li key={li.slice(0, 32)}>{li}</li>
                ))}
              </ul>
              {engagement.notFitOutro && <p className={styles.engOutro}>{engagement.notFitOutro}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ── Scope + deliverables ── */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={`${styles.fitGrid} reveal`}>
            <div>
              <p className={styles.eyebrow}>What we do</p>
              <p className={styles.body}>{engagement.whatWeDoIntro}</p>
              <ul className={styles.bioList}>
                {engagement.whatWeDo.map((li) => (
                  <li key={li.slice(0, 32)}>{li}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.eyebrow}>Deliverables</p>
              <p className={styles.body}>{engagement.deliverablesIntro}</p>
              <ul className={styles.bioList}>
                {engagement.deliverables.map((li) => (
                  <li key={li.slice(0, 32)}>{li}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`${styles.engFacts} reveal`}>
            <div>
              <h3>Timeline</h3>
              <p>{engagement.timeline}</p>
            </div>
            <div>
              <h3>Pricing</h3>
              {engagement.pricing.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <div>
              <h3>What you walk away with</h3>
              <p>{engagement.walkAway}</p>
            </div>
          </div>

          {engagement.note && (
            <aside className={`${styles.priceNoteBlock} reveal`}>
              <p>{engagement.note}</p>
            </aside>
          )}

          <PricingNote />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`${styles.section} ${styles.sectionPlum}`}>
        <div className={styles.container}>
          <div className={styles.ctaBand}>
            <div>
              <p className={styles.eyebrow}>Ready when you are.</p>
              <h2 className={styles.h2}>{engagement.tagline}</h2>
            </div>
            <div className={styles.btnRow}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/contact">
                {engagement.cta}
                <ArrowRight size={16} className="arrow" />
              </Link>
              <Link className={`${styles.btn} ${styles.btnGhost}`} href="/services">
                <ArrowLeft size={16} />
                Back to services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
