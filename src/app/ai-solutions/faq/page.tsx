'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import styles from '@/styles/design-system.module.css';
import LeadForm from '@/components/ai-small-biz/LeadForm';
import { FAQ_ITEMS, FAQ_CATEGORIES, type FAQItem } from '@/lib/ai-solutions-config';

/**
 * FAQ page, restyled to use design-system archetypes.
 * Replaces the legacy FAQAccordion component with an inline accordion
 * built on design-system classes (cream cards on cream background).
 * Same filtering UX (All + categories from FAQ_CATEGORIES).
 */

type CategoryFilter = FAQItem['category'] | 'all';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === 'all'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((f) => f.category === activeCategory);

  function selectCategory(cat: CategoryFilter) {
    setActiveCategory(cat);
    setOpenIndex(null);
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ FAQ</p>
          <h2>Frequently asked questions.</h2>
          <p>
            Everything you need to know about our AI solutions, process, and pricing, in one
            place.
          </p>
        </div>
      </section>

      {/* ── Filter pills ── */}
      <div className={styles.faqFilters}>
        <button
          type="button"
          onClick={() => selectCategory('all')}
          className={`${styles.faqFilter} ${activeCategory === 'all' ? styles.faqFilterActive : ''}`}
        >
          All
        </button>
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => selectCategory(cat.key)}
            className={`${styles.faqFilter} ${activeCategory === cat.key ? styles.faqFilterActive : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Accordion ── */}
      <ul className={styles.faqList}>
        {filtered.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <li key={faq.question} className={styles.faqItem}>
              <button
                type="button"
                className={styles.faqQuestion}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={16}
                  className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`}
                />
              </button>
              {isOpen && <p className={styles.faqAnswer}>{faq.answer}</p>}
            </li>
          );
        })}
      </ul>

      {/* ── CTA + LeadForm ── */}
      <section id="contact" className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ STILL HAVE QUESTIONS?</p>
          <h2>Talk to a consultant.</h2>
          <p>
            Drop us your info and we&rsquo;ll get back to you within 24 hours, or start with the
            free audit to see your numbers first.
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

        <div className={styles.detailLeadForm}>
          <LeadForm source="ai-solutions-faq" />
        </div>
      </section>
    </>
  );
}
