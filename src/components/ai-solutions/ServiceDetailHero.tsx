'use client';

import type { AIService } from '@/lib/ai-solutions-config';
import { CATEGORY_LABELS, getServiceIcon } from '@/lib/ai-solutions-config';
import TextScramble from '@/components/ui/TextScramble';

interface ServiceDetailHeroProps {
  service: AIService;
}

export default function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const Icon = getServiceIcon(service.iconName);

  return (
    <section className="pt-24 pb-12 px-4">
      <div className="max-w-[720px] mx-auto">
        <div className="flex items-center gap-2 mb-4 hero-line-anim" style={{ '--hero-delay': '0s' } as React.CSSProperties}>
          <div className="w-8 h-8 flex items-center justify-center bg-[rgba(249,115,22,0.12)] rounded-lg">
            <Icon size={16} className="text-[#e05e14]" />
          </div>
          <span className="text-[10px] tracking-[0.12em] uppercase text-[#475569] font-medium">
            {CATEGORY_LABELS[service.category]}
          </span>
          {service.isNew && (
            <span className="text-[9px] tracking-[0.08em] uppercase bg-[#e05e14] text-white rounded px-1.5 py-[2px] font-semibold">
              New
            </span>
          )}
        </div>

        <div className="hero-line-anim" style={{ '--hero-delay': '0.1s' } as React.CSSProperties}>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-[1.15]">
            <TextScramble
              text={service.title}
              as="span"
              className="font-[family-name:var(--font-display)] font-bold"
            />
          </h1>
        </div>

        <p
          className="text-[16px] text-[#94A3B8] mt-4 leading-[1.75] hero-line-anim"
          style={{ '--hero-delay': '0.15s' } as React.CSSProperties}
        >
          {service.tagline}
        </p>

        <div className="hero-line-anim" style={{ '--hero-delay': '0.2s' } as React.CSSProperties}>
          <span className="inline-block mt-4 bg-[rgba(249,115,22,0.10)] text-[#e05e14] text-[11px] tracking-[0.1em] uppercase rounded px-3 py-[5px] font-medium">
            {service.outcome}
          </span>
        </div>
      </div>
    </section>
  );
}
