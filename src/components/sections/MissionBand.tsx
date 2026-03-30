'use client';

import TextScramble from '@/components/ui/TextScramble';

export default function MissionBand() {
  return (
    <section
      id="mission-band"
      className="relative overflow-hidden bg-cream py-[100px] px-16 max-md:px-6 max-md:py-[72px]"
      data-cursor="light"
    >
      <div className="reveal mx-auto grid max-w-[1200px] grid-cols-[1fr_2fr] items-start gap-[80px] max-md:grid-cols-1 max-md:gap-9">
        {/* Left column */}
        <div>
          <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-orange">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange animate-pulse-slow" />
            Our Mission
          </div>
          <div className="font-mono text-xs leading-[2] tracking-[.04em] text-navy/45">
            <TextScramble text="PHOENIX · ARIZONA" delay={200} className="block" />
            <TextScramble text="FOUNDED 2024" delay={400} className="block" />
            <TextScramble text="3 ACTIVE INITIATIVES" delay={600} className="block" />
            <TextScramble text="50K+ AT RISK DAILY" delay={800} className="block" />
          </div>
        </div>

        {/* Right column */}
        <div>
          <p className="font-display text-[clamp(28px,3.5vw,52px)] font-light leading-[1.25] tracking-[-0.01em] text-navy">
            We create{' '}
            <em className="italic text-orange">innovative solutions</em> to the
            challenges defining community life — from life-saving heat relief
            infrastructure to the family coordination tools that help people{' '}
            <em className="italic text-orange">thrive.</em>
          </p>
          <div className="mt-7 flex items-center gap-2.5 text-[13px] tracking-[.04em] text-navy/40">
            <span className="block h-px w-6 bg-current" />
            Fox Haven Group &middot; Phoenix, AZ
          </div>
        </div>
      </div>
    </section>
  );
}
