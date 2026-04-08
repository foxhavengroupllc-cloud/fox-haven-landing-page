'use client';

import Link from 'next/link';
import PricingTable from '@/components/ai-solutions/PricingTable';
import LeadForm from '@/components/ai-small-biz/LeadForm';
import { FAQ_ITEMS } from '@/lib/ai-solutions-config';

const pricingFAQ = FAQ_ITEMS.filter((f) => f.category === 'pricing').slice(0, 3);

export default function PricingPage() {
  return (
    <>
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-[680px] mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6 hero-line-anim" style={{ '--hero-delay': '0s' } as React.CSSProperties}>
            <div className="w-5 h-px bg-[#e05e14]" />
            <span className="text-[10px] tracking-[0.16em] uppercase text-[#e05e14] font-semibold">
              ◈ PRICING
            </span>
          </div>

          <h1
            className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-[1.15] hero-line-anim"
            style={{ '--hero-delay': '0.1s' } as React.CSSProperties}
          >
            Every engagement starts with a{' '}
            <em className="text-[#e05e14] not-italic">free audit</em>
          </h1>

          <p
            className="text-[16px] text-[#94A3B8] max-w-[520px] mx-auto mt-5 leading-[1.75] hero-line-anim"
            style={{ '--hero-delay': '0.2s' } as React.CSSProperties}
          >
            Know your ROI before you commit. The audit is free, and every plan
            is scoped to your specific needs — not a one-size-fits-all package.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-[1100px] mx-auto">
          <PricingTable />
        </div>
      </section>

      {pricingFAQ.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-[680px] mx-auto">
            <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-4">
              ◉ COMMON PRICING QUESTIONS
            </div>
            <div className="space-y-4">
              {pricingFAQ.map((faq, i) => (
                <div key={i} className="reveal bg-[#112440] border border-[#1E293B] rounded-lg p-5">
                  <h3 className="text-[#F1F5F9] font-semibold text-[14px] mb-2">{faq.question}</h3>
                  <p className="text-[#94A3B8] text-[13px] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/ai-solutions/faq"
                className="inline-flex items-center gap-2 text-[#e05e14] font-medium text-[14px] hover:text-[#f07033] transition-colors"
              >
                See all FAQ &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="py-16 px-4">
        <div className="max-w-[520px] mx-auto">
          <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
            ◉ TALK TO US
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-[28px] text-[#F1F5F9]">
            Ready to scope <em className="text-[#e05e14] not-italic">your project?</em>
          </h2>
          <p className="text-[14px] text-[#94A3B8] mt-2 mb-6 leading-relaxed">
            Tell us about your business and we&apos;ll send you the audit link
            — or book a call to discuss your needs directly.
          </p>
          <LeadForm source="ai-solutions-pricing" />
        </div>
      </section>
    </>
  );
}
