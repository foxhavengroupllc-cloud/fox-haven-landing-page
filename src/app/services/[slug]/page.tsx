import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from '@/styles/fhg.module.css';
import { Header, Footer } from '@/components/fhg/SiteChrome';
import PricingTable from '@/components/fhg/PricingTable';
import PricingNote from '@/components/fhg/PricingNote';
import { services, getServiceBySlug } from '@/lib/services-data';

const CONTACT_EMAIL = 'hello@foxhavengrouphq.com';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service not found | Fox Haven Group' };
  return {
    title: `${service.title} | Fox Haven Group`,
    description: service.tileBlurb,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const { Icon } = service;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Inquiry: ${service.title}`,
  )}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.tileBlurb,
    provider: {
      '@type': 'Organization',
      name: 'Fox Haven Group',
      url: 'https://foxhavengrouphq.com',
    },
    areaServed: 'US',
    offers: service.products.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD' },
      description: p.price,
    })),
  };

  return (
    <main className={styles.shell}>
      <div className={styles.grain} aria-hidden="true" />
      <Header />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className={styles.pageHero}>
        <div className={styles.container}>
          <Link href="/services" className={styles.backLink}>
            <ArrowLeft size={14} />
            All services
          </Link>
          <span className={`${styles.cardIcon} ${styles.serviceHeroIcon}`}>
            <Icon size={26} strokeWidth={1.5} />
          </span>
          <p className={styles.eyebrow}>Capability</p>
          <h1 className={styles.display}>{service.title}</h1>
          <p className={styles.pageHeroLead}>{service.longDescription}</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>What you can buy</p>
            <h2 className={styles.h2}>Priced products</h2>
            <p className={styles.body}>
              Each product below is a defined deliverable with transparent pricing — scoped per
              engagement, never a percentage of your award.
            </p>
          </div>

          <PricingTable products={service.products} />
          <PricingNote />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPlum}`}>
        <div className={styles.container}>
          <div className={styles.ctaBand}>
            <div>
              <p className={styles.eyebrow}>Ready when you are.</p>
              <h2 className={styles.h2}>Request this service.</h2>
            </div>
            <div className={styles.btnRow}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href={mailto}>
                Request this service
                <ArrowRight size={16} className="arrow" />
              </a>
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
