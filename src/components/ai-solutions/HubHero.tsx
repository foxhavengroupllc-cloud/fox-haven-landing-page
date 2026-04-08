'use client';

import Link from 'next/link';
import TextScramble from '@/components/ui/TextScramble';

const STATS = [
  { value: '8', label: 'AI Services' },
  { value: '40%', label: 'Avg Cost Savings' },
  { value: '3–6 wk', label: 'Deployment' },
  { value: 'Free', label: 'Initial Audit' },
];

export default function HubHero() {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="max-w-[720px] mx-auto text-center hero-anim">
        <div className="flex items-center justify-center gap-2 mb-6 hero-line-anim" style={{ '--hero-delay': '0s' } as React.CSSProperties}>
          <div className="w-5 h-px bg-[#e05e14]" />
          <span className="text-[10px] tracking-[0.16em] uppercase text-[#e05e14] font-semibold">
            ◈ AI SOLUTIONS
          </span>
        </div>

        <div className="hero-line-anim" style={{ '--hero-delay': '0.1s' } as React.CSSProperties}>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-5xl leading-[1.15]">
            <TextScramble
              text="AI that works for your business"
              as="span"
              className="font-[family-name:var(--font-display)] font-bold"
            />
            <br />
            <span className="text-[#e05e14]">&mdash; not the other way around</span>
          </h1>
        </div>

        <p
          className="text-[16px] text-[#94A3B8] max-w-[560px] mx-auto mt-5 leading-[1.75] hero-line-anim"
          style={{ '--hero-delay': '0.2s' } as React.CSSProperties}
        >
          Fox Haven builds AI-powered automation, custom agents, and strategic
          consulting that eliminates the repetitive drag costing your business
          time and money. Eight specialized services. One partner who gets it
          done.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-7 hero-line-anim"
          style={{ '--hero-delay': '0.3s' } as React.CSSProperties}
        >
          <Link
            href="/audit"
            className="bg-[#e05e14] hover:bg-[#c4500f] text-white font-semibold text-[14px] px-6 py-3 rounded-full transition-colors"
          >
            Start the free audit &rarr;
          </Link>
          <Link
            href="/ai-solutions/services"
            className="border border-[#1E293B] text-[#F1F5F9] font-medium text-[14px] px-6 py-3 rounded-full hover:border-[#e05e14]/40 transition-colors"
          >
            Explore services
          </Link>
        </div>

        <div
          className="mt-10 border border-[#1E293B] rounded-[10px] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#1E293B] hero-line-anim"
          style={{ '--hero-delay': '0.4s' } as React.CSSProperties}
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex-1 py-4 px-4 text-center">
              <div className="font-[family-name:var(--font-display)] font-bold text-[22px] text-[#e05e14]">
                {s.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.08em] text-[#94A3B8] mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
