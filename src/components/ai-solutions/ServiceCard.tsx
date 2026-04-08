'use client';

import Link from 'next/link';
import type { AIService } from '@/lib/ai-solutions-config';
import { CATEGORY_LABELS, getServiceIcon } from '@/lib/ai-solutions-config';

interface ServiceCardProps {
  service: AIService;
  index?: number;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = getServiceIcon(service.iconName);

  return (
    <div className="reveal">
      <Link
        href={`/ai-solutions/services/${service.slug}`}
        className="block bg-[#112440] border border-[#1E293B] rounded-[10px] p-5 border-l-[3px] border-l-[#e05e14] hover:bg-[#152a4a] hover:border-[#2a3d5c] transition-all duration-200 group h-full"
      >
        {/* Top row: icon + category + new badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 flex items-center justify-center bg-[rgba(249,115,22,0.12)] rounded-lg">
            <Icon size={16} className="text-[#e05e14]" />
          </div>
          <span className="text-[9px] tracking-[0.12em] uppercase text-[#475569] font-medium">
            {CATEGORY_LABELS[service.category]}
          </span>
          {service.isNew && (
            <span className="ml-auto text-[9px] tracking-[0.08em] uppercase bg-[#e05e14] text-white rounded px-1.5 py-[2px] font-semibold">
              New
            </span>
          )}
        </div>

        <h3 className="text-[#F1F5F9] font-semibold text-[15px] group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-[#94A3B8] text-[13px] mt-2 leading-relaxed">
          {service.tagline}
        </p>
        <span className="inline-block mt-3 bg-[rgba(249,115,22,0.10)] text-[#e05e14] text-[10px] tracking-[0.1em] uppercase rounded px-2 py-[3px] font-medium">
          {service.outcome}
        </span>
      </Link>
    </div>
  );
}
