'use client';

import type { CaseStudy } from '@/lib/ai-solutions-config';
import { getServiceBySlug } from '@/lib/ai-solutions-config';

interface CaseStudyCardProps {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  const serviceNames = study.services
    .map((slug) => getServiceBySlug(slug)?.shortTitle)
    .filter(Boolean);

  return (
    <div className="reveal bg-[#112440] border border-[#1E293B] rounded-xl p-6 flex flex-col h-full">
      {/* Industry tag */}
      <span className="inline-block self-start text-[10px] tracking-[0.1em] uppercase bg-[rgba(249,115,22,0.10)] text-[#e05e14] rounded px-2 py-[3px] font-medium mb-4">
        {study.industry}
      </span>

      <h3 className="text-[#F1F5F9] font-semibold text-[18px] font-[family-name:var(--font-display)] mb-3">
        {study.title}
      </h3>

      {/* Challenge */}
      <div className="mb-4">
        <div className="text-[10px] tracking-[0.1em] uppercase text-[#475569] font-medium mb-1">
          Challenge
        </div>
        <p className="text-[13px] text-[#94A3B8] leading-relaxed">{study.challenge}</p>
      </div>

      {/* Solution */}
      <div className="mb-5">
        <div className="text-[10px] tracking-[0.1em] uppercase text-[#475569] font-medium mb-1">
          Solution
        </div>
        <p className="text-[13px] text-[#94A3B8] leading-relaxed">{study.solution}</p>
      </div>

      {/* Services used */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {serviceNames.map((name) => (
          <span
            key={name}
            className="text-[10px] tracking-[0.06em] uppercase bg-[#161D2E] text-[#94A3B8] border border-[#1E293B] rounded px-2 py-[3px] font-medium"
          >
            {name}
          </span>
        ))}
      </div>

      {/* Metrics bar */}
      <div className="mt-auto border-t border-[#1E293B] pt-4 grid grid-cols-3 gap-3">
        {study.metrics.map((m) => (
          <div key={m.label} className="text-center">
            <div className="font-[family-name:var(--font-display)] font-bold text-[20px] text-[#e05e14]">
              {m.value}
            </div>
            <div className="text-[9px] uppercase tracking-[0.08em] text-[#94A3B8] mt-0.5">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
