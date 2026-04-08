'use client';

import Link from 'next/link';
import ServicesGrid from '@/components/ai-solutions/ServicesGrid';

export default function ServicesPage() {
  return (
    <>
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center gap-2 mb-4 hero-line-anim" style={{ '--hero-delay': '0s' } as React.CSSProperties}>
            <div className="w-5 h-px bg-[#e05e14]" />
            <span className="text-[10px] tracking-[0.16em] uppercase text-[#e05e14] font-semibold">
              ◈ ALL SERVICES
            </span>
          </div>

          <h1
            className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-[1.15] mb-3 hero-line-anim"
            style={{ '--hero-delay': '0.1s' } as React.CSSProperties}
          >
            Eight ways AI can{' '}
            <em className="text-[#e05e14] not-italic">move the needle</em>
          </h1>

          <p
            className="text-[16px] text-[#94A3B8] max-w-[560px] leading-[1.75] mb-10 hero-line-anim"
            style={{ '--hero-delay': '0.15s' } as React.CSSProperties}
          >
            From automated lead response to custom AI agents and strategic
            consulting — every service is designed for small businesses that need
            results, not demos.
          </p>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-[1000px] mx-auto">
          <ServicesGrid />

          <div className="reveal mt-12 text-center bg-[#112440]/50 border border-[#1E293B] rounded-xl p-8">
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-[20px] text-[#F1F5F9] mb-2">
              Not sure which service you need?
            </h3>
            <p className="text-[14px] text-[#94A3B8] mb-5">
              Start with the free audit. We&apos;ll identify exactly where
              automation can help — no commitment required.
            </p>
            <Link
              href="/audit"
              className="inline-block bg-[#e05e14] hover:bg-[#c4500f] text-white font-semibold text-[14px] px-6 py-3 rounded-full transition-colors"
            >
              Start the free audit &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
