'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Map, Users } from 'lucide-react';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { ConstellationBg } from '@/components/ui/ConstellationBg';
import ServiceGrid from '@/components/ai-small-biz/ServiceGrid';
import ProcessSteps from '@/components/ai-small-biz/ProcessSteps';
import LeadForm from '@/components/ai-small-biz/LeadForm';

const HERO_STATS = [
  { value: '$28K–65K', label: 'Avg annual loss from process drag' },
  { value: '12 min', label: 'To complete the audit' },
  { value: '3–6 wk', label: 'Typical deployment' },
];

const DELIVERABLES = [
  {
    Icon: FileText,
    title: 'Scored audit report',
    body: 'A detailed breakdown of your inefficiency score by category, with estimated dollar impact for each gap.',
  },
  {
    Icon: Map,
    title: 'Prioritized roadmap',
    body: 'A ranked list of automation opportunities, ordered by ROI — highest-value fixes first.',
  },
  {
    Icon: Users,
    title: 'Dedicated consultant',
    body: 'One person owns your engagement. No call-center handoffs. No lost context between meetings.',
  },
];

function fade(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  };
}

export default function AIForSmallBusinessPage() {
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#0b1c2e';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  return (
    <div className="relative min-h-screen text-[#F1F5F9] hide-nav-cta">
      {/* Constellation canvas */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <ConstellationBg />
      </div>

      <div className="relative z-10">
        <Nav />

        {/* ── Hero ── */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-[680px] mx-auto text-center">
            <motion.div {...fade(0)} className="flex items-center justify-center gap-2 mb-6">
              <div className="w-5 h-px bg-[#e05e14]" />
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#e05e14] font-semibold">
                ◈ AI SOLUTIONS FOR EVERYONE
              </span>
            </motion.div>

            <motion.h1
              {...fade(0.1)}
              className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-5xl leading-[1.15]"
            >
              Your team is working hard.
              <br />
              The <em className="text-[#e05e14] not-italic font-bold">systems</em> shouldn&apos;t be.
            </motion.h1>

            <motion.p
              {...fade(0.2)}
              className="text-[16px] text-[#94A3B8] max-w-[520px] mx-auto mt-5 leading-[1.75]"
            >
              Fox Haven builds AI-powered automation that eliminates the repetitive, manual drag
              costing your business time and money — without replacing the people who make it run.
            </motion.p>

            <motion.div {...fade(0.3)} className="flex flex-wrap items-center justify-center gap-3 mt-7">
              <Link
                href="/audit"
                className="bg-[#e05e14] hover:bg-[#c4500f] text-white font-semibold text-[14px] px-6 py-3 rounded-full transition-colors"
              >
                Start the free audit →
              </Link>
              <a
                href="#contact"
                className="border border-[#1E293B] text-[#F1F5F9] font-medium text-[14px] px-6 py-3 rounded-full hover:border-[#e05e14]/40 transition-colors"
              >
                Talk to a consultant
              </a>
            </motion.div>

            <motion.div
              {...fade(0.4)}
              className="mt-10 border border-[#1E293B] rounded-[10px] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#1E293B]"
            >
              {HERO_STATS.map((s) => (
                <div key={s.label} className="flex-1 py-4 px-4 text-center">
                  <div className="font-[family-name:var(--font-display)] font-bold text-[22px] text-[#e05e14]">
                    {s.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.08em] text-[#94A3B8] mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── What we do ── */}
        <section className="py-16 px-4">
          <div className="max-w-[760px] mx-auto">
            <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
              ◉ WHAT WE DO
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-[28px] text-[#F1F5F9]">
              Four areas where AI{' '}
              <em className="text-[#e05e14] not-italic">actually moves the needle</em>
            </h2>
            <p className="text-[14px] text-[#94A3B8] mt-3 leading-relaxed max-w-[600px]">
              We focus exclusively on the operational gaps that cost businesses the most — not
              trendy tech for its own sake.
            </p>
            <ServiceGrid />
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-16 px-4">
          <div className="max-w-[560px] mx-auto">
            <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
              ◉ HOW IT WORKS
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-[28px] text-[#F1F5F9]">
              From <em className="text-[#e05e14] not-italic">audit to automation</em> in six weeks
            </h2>
            <ProcessSteps />
          </div>
        </section>

        {/* ── What you get ── */}
        <section className="py-16 px-4">
          <div className="max-w-[760px] mx-auto">
            <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
              ◉ WHAT YOU GET
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-[28px] text-[#F1F5F9] mb-8">
              Three things in your hands after the audit
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              {DELIVERABLES.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex-1 bg-[#112440] border border-[#1E293B] rounded-xl p-6"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[rgba(249,115,22,0.12)] rounded-lg mb-4">
                    <d.Icon size={20} className="text-[#e05e14]" />
                  </div>
                  <h3 className="text-[#F1F5F9] font-semibold text-[15px]">{d.title}</h3>
                  <p className="text-[#94A3B8] text-[13px] mt-2 leading-relaxed">{d.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Lead form ── */}
        <section id="contact" className="py-16 px-4">
          <div className="max-w-[520px] mx-auto">
            <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
              ◉ GET STARTED
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-[28px] text-[#F1F5F9]">
              Ready to see <em className="text-[#e05e14] not-italic">your numbers?</em>
            </h2>
            <p className="text-[14px] text-[#94A3B8] mt-2 mb-6 leading-relaxed">
              Tell us where to send the audit link — or jump straight to booking a call.
            </p>
            <LeadForm source="ai-small-biz-page" />
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
