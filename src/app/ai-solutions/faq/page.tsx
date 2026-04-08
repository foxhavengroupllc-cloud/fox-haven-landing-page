'use client';

import FAQAccordion from '@/components/ai-solutions/FAQAccordion';
import LeadForm from '@/components/ai-small-biz/LeadForm';

export default function FAQPage() {
  return (
    <>
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-[680px] mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6 hero-line-anim" style={{ '--hero-delay': '0s' } as React.CSSProperties}>
            <div className="w-5 h-px bg-[#e05e14]" />
            <span className="text-[10px] tracking-[0.16em] uppercase text-[#e05e14] font-semibold">
              ◈ FAQ
            </span>
          </div>

          <h1
            className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-[1.15] hero-line-anim"
            style={{ '--hero-delay': '0.1s' } as React.CSSProperties}
          >
            Frequently asked{' '}
            <em className="text-[#e05e14] not-italic">questions</em>
          </h1>

          <p
            className="text-[16px] text-[#94A3B8] max-w-[520px] mx-auto mt-5 leading-[1.75] hero-line-anim"
            style={{ '--hero-delay': '0.2s' } as React.CSSProperties}
          >
            Everything you need to know about our AI solutions, process, and
            pricing — in one place.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-[720px] mx-auto">
          <FAQAccordion />
        </div>
      </section>

      <section id="contact" className="py-16 px-4">
        <div className="max-w-[520px] mx-auto">
          <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
            ◉ STILL HAVE QUESTIONS?
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-[28px] text-[#F1F5F9]">
            Talk to a <em className="text-[#e05e14] not-italic">consultant</em>
          </h2>
          <p className="text-[14px] text-[#94A3B8] mt-2 mb-6 leading-relaxed">
            Drop us your info and we&apos;ll get back to you within 24 hours —
            or start with the free audit to see your numbers first.
          </p>
          <LeadForm source="ai-solutions-faq" />
        </div>
      </section>
    </>
  );
}
