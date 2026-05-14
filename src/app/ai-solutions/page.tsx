'use client';

import Link from 'next/link';
import HubHero from '@/components/ai-solutions/HubHero';
import ServiceCard from '@/components/ai-solutions/ServiceCard';
import LeadForm from '@/components/ai-small-biz/LeadForm';
import { AI_SERVICES, PROCESS_STEPS } from '@/lib/ai-solutions-config';

const FEATURED_SLUGS = ['lead-response', 'custom-ai-agents', 'ai-strategy', 'chatbots'];
const featuredServices = AI_SERVICES.filter((s) => FEATURED_SLUGS.includes(s.slug));

export default function AISolutionsPage() {
  return (
    <>
      <HubHero />

      {/* ── Featured Services ── */}
      <section className="py-16 px-4">
        <div className="max-w-[900px] mx-auto">
          <div className="reveal">
            <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
              ◉ WHAT WE BUILD
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-[28px] text-[#F1F5F9]">
              AI solutions that{' '}
              <em className="text-[#e05e14] not-italic">actually move the needle</em>
            </h2>
            <p className="text-[14px] text-[#94A3B8] mt-3 leading-relaxed max-w-[600px]">
              From automated lead response to custom AI agents — we focus on the
              operational gaps that cost businesses the most.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {featuredServices.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>

          <div className="reveal text-center mt-8">
            <Link
              href="/ai-solutions/services"
              className="inline-flex items-center gap-2 text-[#e05e14] font-medium text-[14px] hover:text-[#f07033] transition-colors"
            >
              See all 8 services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mini Process ── */}
      <section className="py-16 px-4">
        <div className="max-w-[600px] mx-auto">
          <div className="reveal">
            <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
              ◉ HOW IT WORKS
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-[28px] text-[#F1F5F9]">
              From <em className="text-[#e05e14] not-italic">audit to automation</em> in
              six weeks
            </h2>
          </div>

          <div className="relative mt-8">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-[#1E293B]" />
            <div className="space-y-6">
              {PROCESS_STEPS.slice(0, 4).map((step) => (
                <div key={step.num} className="reveal flex items-start gap-4">
                  <div className="relative z-[1] flex-shrink-0 w-8 h-8 rounded-full bg-[#161D2E] border border-[#1E293B] flex items-center justify-center">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] font-bold text-[#e05e14]">
                      {step.num}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[#F1F5F9] font-semibold text-[14px]">
                      {step.title}
                    </h4>
                    <p className="text-[#94A3B8] text-[13px] mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal text-center mt-8">
            <Link
              href="/ai-solutions/process"
              className="inline-flex items-center gap-2 text-[#e05e14] font-medium text-[14px] hover:text-[#f07033] transition-colors"
            >
              See the full process &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Social Proof Metrics ── */}
      <section className="py-16 px-4">
        <div className="max-w-[900px] mx-auto">
          <div className="reveal border border-[#1E293B] rounded-xl bg-[#112440]/50 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="font-[family-name:var(--font-display)] font-semibold text-[24px] text-[#F1F5F9]">
                Built for businesses that can&apos;t afford to waste time
              </h2>
              <p className="text-[14px] text-[#94A3B8] mt-2">
                Real results from real deployments.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '$28K–65K', label: 'Avg Annual Recovery' },
                { value: '3–6 wk', label: 'Typical Deployment' },
                { value: '40%+', label: 'Conversion Lift' },
                { value: '14 hrs', label: 'Avg Weekly Time Saved' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-[family-name:var(--font-display)] font-bold text-[28px] md:text-[32px] text-[#e05e14]">
                    {stat.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.08em] text-[#94A3B8] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA + Lead Form ── */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-[520px] mx-auto">
          <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
            ◉ GET STARTED
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-[28px] text-[#F1F5F9]">
            Ready to see <em className="text-[#e05e14] not-italic">your numbers?</em>
          </h2>
          <p className="text-[14px] text-[#94A3B8] mt-2 mb-6 leading-relaxed">
            Tell us where to send the audit link — or jump straight to booking a
            call. Every engagement starts with a free assessment.
          </p>
          <LeadForm source="ai-solutions-hub" />
        </div>
      </section>
    </>
  );
}
