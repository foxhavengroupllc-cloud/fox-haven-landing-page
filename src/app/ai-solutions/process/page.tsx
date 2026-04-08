'use client';

import Link from 'next/link';
import { PROCESS_STEPS } from '@/lib/ai-solutions-config';

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-[680px] mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6 hero-line-anim" style={{ '--hero-delay': '0s' } as React.CSSProperties}>
            <div className="w-5 h-px bg-[#e05e14]" />
            <span className="text-[10px] tracking-[0.16em] uppercase text-[#e05e14] font-semibold">
              ◈ OUR PROCESS
            </span>
          </div>

          <h1
            className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-[1.15] hero-line-anim"
            style={{ '--hero-delay': '0.1s' } as React.CSSProperties}
          >
            From <em className="text-[#e05e14] not-italic">discovery to deployment</em>
            <br />in six clear steps
          </h1>

          <p
            className="text-[16px] text-[#94A3B8] max-w-[520px] mx-auto mt-5 leading-[1.75] hero-line-anim"
            style={{ '--hero-delay': '0.2s' } as React.CSSProperties}
          >
            Every engagement follows the same proven process — designed to
            minimize risk, maximize ROI, and get you to results as fast as
            possible.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-[620px] mx-auto">
          <div className="relative">
            <div className="absolute left-5 top-5 bottom-5 w-px bg-[#1E293B]" />
            <div className="space-y-10">
              {PROCESS_STEPS.map((step) => (
                <div key={step.num} className="reveal flex items-start gap-5">
                  <div className="relative z-[1] flex-shrink-0 w-10 h-10 rounded-full bg-[#161D2E] border border-[#1E293B] flex items-center justify-center">
                    <span className="font-[family-name:var(--font-mono)] text-[13px] font-bold text-[#e05e14]">
                      {step.num}
                    </span>
                  </div>
                  <div className="pt-1.5 flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="text-[#F1F5F9] font-semibold text-[16px]">{step.title}</h3>
                      <span className="text-[10px] tracking-[0.08em] uppercase bg-[rgba(249,115,22,0.10)] text-[#e05e14] rounded px-2 py-[3px] font-medium">
                        {step.timeframe}
                      </span>
                    </div>
                    <p className="text-[#94A3B8] text-[14px] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-[600px] mx-auto text-center">
          <div className="reveal bg-[#112440]/50 border border-[#1E293B] rounded-xl p-8">
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-[24px] text-[#F1F5F9] mb-2">
              Ready to start with Step 1?
            </h2>
            <p className="text-[14px] text-[#94A3B8] mb-6">
              The free audit takes 12 minutes and gives you a scored report with
              concrete recommendations — no commitment required.
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
