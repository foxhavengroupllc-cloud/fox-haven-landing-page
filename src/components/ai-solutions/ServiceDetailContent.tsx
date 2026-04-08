'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import type { AIService } from '@/lib/ai-solutions-config';
import ServiceDetailHero from './ServiceDetailHero';
import ServiceCard from './ServiceCard';
import LeadForm from '@/components/ai-small-biz/LeadForm';

interface Props {
  service: AIService;
  related: AIService[];
}

export default function ServiceDetailContent({ service, related }: Props) {
  return (
    <>
      <ServiceDetailHero service={service} />

      {/* ── Problem Statement ── */}
      <section className="pb-12 px-4">
        <div className="max-w-[720px] mx-auto">
          <div className="reveal bg-[#112440] border border-[#1E293B] rounded-xl p-6 md:p-8">
            <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
              ◉ THE PROBLEM
            </div>
            <p className="text-[15px] text-[#94A3B8] leading-relaxed">
              {service.problemStatement}
            </p>
          </div>
        </div>
      </section>

      {/* ── Solution + Features ── */}
      <section className="py-12 px-4">
        <div className="max-w-[720px] mx-auto">
          <div className="reveal">
            <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
              ◉ THE SOLUTION
            </div>
            <p className="text-[15px] text-[#94A3B8] leading-relaxed mb-8">
              {service.description}
            </p>
          </div>

          <div className="space-y-3">
            {service.features.map((feature, i) => (
              <div key={i} className="reveal flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center bg-[rgba(249,115,22,0.12)] rounded">
                  <Check size={12} className="text-[#e05e14]" />
                </div>
                <span className="text-[14px] text-[#F1F5F9] leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="py-12 px-4">
        <div className="max-w-[720px] mx-auto">
          <div className="reveal border border-[#1E293B] rounded-xl bg-[#112440]/50 p-6 md:p-8">
            <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-6 text-center">
              ◉ EXPECTED RESULTS
            </div>
            <div className="grid grid-cols-3 gap-4">
              {service.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="font-[family-name:var(--font-display)] font-bold text-[28px] md:text-[32px] text-[#e05e14]">
                    {m.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.08em] text-[#94A3B8] mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Services ── */}
      {related.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-[900px] mx-auto">
            <div className="reveal">
              <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
                ◉ RELATED SERVICES
              </div>
              <h2 className="font-[family-name:var(--font-display)] font-semibold text-[24px] text-[#F1F5F9] mb-6">
                You might also need
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-[520px] mx-auto">
          <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
            ◉ GET STARTED
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-[28px] text-[#F1F5F9]">
            See how this applies to{' '}
            <em className="text-[#e05e14] not-italic">your business</em>
          </h2>
          <p className="text-[14px] text-[#94A3B8] mt-2 mb-6 leading-relaxed">
            Start with a free audit to identify your biggest opportunities —
            then we&apos;ll scope a plan together.
          </p>
          <div className="flex gap-3 mb-8">
            <Link
              href="/audit"
              className="bg-[#e05e14] hover:bg-[#c4500f] text-white font-semibold text-[14px] px-6 py-3 rounded-full transition-colors"
            >
              Start free audit &rarr;
            </Link>
          </div>
          <LeadForm source={`ai-solutions-${service.slug}`} />
        </div>
      </section>
    </>
  );
}
