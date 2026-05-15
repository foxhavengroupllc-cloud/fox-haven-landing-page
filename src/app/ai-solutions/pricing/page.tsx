import Link from 'next/link';
import styles from '@/styles/design-system.module.css';
import LeadForm from '@/components/ai-small-biz/LeadForm';
import { PRICING_TIERS, FAQ_ITEMS } from '@/lib/ai-solutions-config';

/**
 * Pricing page, restyled to use design-system archetypes.
 * Data unchanged: PRICING_TIERS (4) + first 3 pricing-category FAQ items.
 */

const pricingFAQ = FAQ_ITEMS.filter((f) => f.category === 'pricing').slice(0, 3);

export default function PricingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ PRICING</p>
          <h2>Every engagement starts with a free audit.</h2>
          <p>
            Know your ROI before you commit. The audit is free, and every plan is scoped to your
            specific needs, not a one-size-fits-all package.
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

      {/* ── Pricing tiers ── */}
      <div className={styles.pricingGrid}>
        {PRICING_TIERS.map((tier) => (
          <article
            key={tier.name}
            className={`${styles.pricingTier} ${tier.highlighted ? styles.pricingTierHighlighted : ''}`}
          >
            {tier.highlighted && <span className={styles.pricingPopular}>Most Popular</span>}
            <h3 className={styles.pricingTierName}>{tier.name}</h3>
            <div className={styles.pricingPriceRow}>
              <span className={styles.pricingPrice}>{tier.price}</span>
              {tier.priceNote && (
                <span className={styles.pricingPriceNote}>{tier.priceNote}</span>
              )}
            </div>
            <p className={styles.pricingDescription}>{tier.description}</p>
            <ul className={styles.pricingFeatures}>
              {tier.features.map((feature, i) => (
                <li key={i}>
                  <span className={styles.pricingCheck} aria-hidden="true">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className={styles.pricingCtaRow}>
              {tier.cta.href.startsWith('/') ? (
                <Link
                  className={tier.highlighted ? styles.solidButton : styles.outlineButton}
                  href={tier.cta.href}
                >
                  {tier.cta.label}
                  <span className={styles.linkArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              ) : (
                <a
                  className={tier.highlighted ? styles.solidButton : styles.outlineButton}
                  href={tier.cta.href}
                >
                  {tier.cta.label}
                  <span className={styles.linkArrow} aria-hidden="true">
                    →
                  </span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* ── Pricing FAQ ── */}
      {pricingFAQ.length > 0 && (
        <section className={styles.detailSection}>
          <div className={styles.detailIntro}>
            <p className={styles.eyebrow}>◉ COMMON PRICING QUESTIONS</p>
            <h2>Quick answers.</h2>
            <p>The questions teams ask most before signing on. The full FAQ has the rest.</p>
            <div className={styles.detailActions}>
              <Link className={styles.outlineButton} href="/ai-solutions/faq">
                See all FAQ
                <span className={styles.linkArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          <ul className={styles.detailFeatures}>
            {pricingFAQ.map((faq, i) => (
              <li key={i}>
                <strong>{faq.question}</strong>
                <span>{faq.answer}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── CTA + Lead form ── */}
      <section id="contact" className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ TALK TO US</p>
          <h2>Ready to scope your project?</h2>
          <p>
            Tell us about your business and we&rsquo;ll send you the audit link, or book a call
            to discuss your needs directly.
          </p>
        </div>

        <div className={styles.detailLeadForm}>
          <LeadForm source="ai-solutions-pricing" />
        </div>
      </section>
    </>
  );
}
