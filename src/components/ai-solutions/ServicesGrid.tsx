'use client';

import { useState } from 'react';
import { AI_SERVICES, CATEGORY_LABELS } from '@/lib/ai-solutions-config';
import type { ServiceCategory } from '@/lib/ai-solutions-config';
import ServiceCard from './ServiceCard';

const FILTERS: { key: ServiceCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'automation', label: CATEGORY_LABELS.automation },
  { key: 'ai-agents', label: CATEGORY_LABELS['ai-agents'] },
  { key: 'consulting', label: CATEGORY_LABELS.consulting },
];

export default function ServicesGrid() {
  const [active, setActive] = useState<ServiceCategory | 'all'>('all');

  const filtered =
    active === 'all'
      ? AI_SERVICES
      : AI_SERVICES.filter((s) => s.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-none">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-medium tracking-[0.04em] transition-all duration-200 cursor-pointer ${
              active === f.key
                ? 'bg-[#e05e14] text-white'
                : 'bg-[#161D2E] text-[#94A3B8] border border-[#1E293B] hover:text-[#F1F5F9] hover:border-[#2a3d5c]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
