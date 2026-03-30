'use client';

import useTiltCard from '@/hooks/useTiltCard';

const PILLARS = [
  {
    num: '01',
    title: 'Community First',
    desc: 'Every product we build starts with a real community need. We work alongside the people we serve — not just for them.',
  },
  {
    num: '02',
    title: 'Innovation with Purpose',
    desc: 'Technology is a tool, not a goal. We harness innovation to solve problems that matter: heat, safety, and family wellbeing.',
  },
  {
    num: '03',
    title: 'Scalable Impact',
    desc: 'We design every solution to grow. What starts in Phoenix becomes a model for resilient, connected communities nationwide.',
  },
] as const;

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[number]; index: number }) {
  const tiltRef = useTiltCard<HTMLDivElement>({ maxTilt: 10, scale: 1.03 });

  return (
    <div
      ref={tiltRef}
      className="reveal group border border-cream/[0.08] bg-white/[0.025] px-9 py-11 transition-[background,border-color] duration-300 hover:bg-white/[0.045] hover:border-orange/20"
      style={{ transitionDelay: `${index * 0.12}s`, transformStyle: 'preserve-3d' }}
    >
      <div className="mb-7 font-mono text-[11px] tracking-[.1em] text-orange">
        {pillar.num}
      </div>
      <div className="mb-3.5 font-display text-[26px] font-semibold leading-[1.15] text-cream">
        {pillar.title}
      </div>
      <p className="text-sm font-light leading-[1.8] text-cream/50">
        {pillar.desc}
      </p>
    </div>
  );
}

export default function Pillars() {
  return (
    <section className="bg-navy-mid px-16 pb-[100px] max-md:px-6 max-md:pb-16" data-cursor="dark">
      <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-[2px] max-md:grid-cols-1">
        {PILLARS.map((p, i) => (
          <PillarCard key={p.num} pillar={p} index={i} />
        ))}
      </div>
    </section>
  );
}
