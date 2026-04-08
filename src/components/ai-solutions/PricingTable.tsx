'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { PRICING_TIERS } from '@/lib/ai-solutions-config';

export default function PricingTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {PRICING_TIERS.map((tier) => (
        <div
          key={tier.name}
          className={`reveal relative bg-[#112440] rounded-xl p-6 flex flex-col ${
            tier.highlighted
              ? 'border-2 border-[#e05e14] ring-1 ring-[#e05e14]/20'
              : 'border border-[#1E293B]'
          }`}
        >
          {tier.highlighted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e05e14] text-white text-[10px] tracking-[0.08em] uppercase font-semibold rounded-full px-3 py-1">
              Most Popular
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-[#F1F5F9] font-semibold text-[16px]">{tier.name}</h3>
            <div className="mt-2">
              <span className="font-[family-name:var(--font-display)] font-bold text-[28px] text-[#e05e14]">
                {tier.price}
              </span>
              {tier.priceNote && (
                <span className="text-[12px] text-[#475569] ml-1">{tier.priceNote}</span>
              )}
            </div>
            <p className="text-[13px] text-[#94A3B8] mt-2 leading-relaxed">
              {tier.description}
            </p>
          </div>

          <ul className="space-y-2.5 mb-6 flex-1">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check size={14} className="text-[#e05e14] mt-0.5 flex-shrink-0" />
                <span className="text-[13px] text-[#F1F5F9] leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href={tier.cta.href}
            className={`block text-center font-semibold text-[13px] py-2.5 rounded-lg transition-colors ${
              tier.highlighted
                ? 'bg-[#e05e14] hover:bg-[#c4500f] text-white'
                : 'border border-[#1E293B] text-[#F1F5F9] hover:border-[#e05e14]/40'
            }`}
          >
            {tier.cta.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
