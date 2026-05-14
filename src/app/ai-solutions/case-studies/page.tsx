'use client';

import Link from 'next/link';
import { CASE_STUDIES } from '@/lib/ai-solutions-config';
import CaseStudyCard from '@/components/ai-solutions/CaseStudyCard';

export default function CaseStudiesPage() {
  return (
    <>
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-[680px] mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6 hero-line-anim" style={{ '--hero-delay': '0s' } as React.CSSProperties}>
            <div className="w-5 h-px bg-[#e05e14]" />
            <span className="text-[10px] tracking-[0.16em] uppercase text-[#e05e14] font-semibold">
              ◈ CASE STUDIES
            </span>
          </div>

          <h1
            className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-[1.15] hero-line-anim"
            style={{ '--hero-delay': '0.1s' } as React.CSSProperties}
          >
            Real results from{' '}
            <em className="text-[#e05e14] not-italic">real businesses</em>
          </h1>

          <p
            className="text-[16px] text-[#94A3B8] max-w-[520px] mx-auto mt-5 leading-[1.75] hero-line-anim"
            style={{ '--hero-delay': '0.2s' } as React.CSSProperties}
          >
            See how teams like yours recovered revenue, saved time,
            and eliminated operational drag with Fox Haven AI solutions.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CASE_STUDIES.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-[600px] mx-auto text-center">
          <div className="reveal bg-[#112440]/50 border border-[#1E293B] rounded-xl p-8">
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-[24px] text-[#F1F5F9] mb-2">
              Want to be the next success story?
            </h2>
            <p className="text-[14px] text-[#94A3B8] mb-6">
              Start with the free audit and we&apos;ll show you exactly where
              your biggest opportunities are.
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
