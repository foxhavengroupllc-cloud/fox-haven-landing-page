'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '1',
    title: 'Free Operational Audit',
    desc: 'Answer 15 questions. Get a scored report identifying your top inefficiencies and estimated annual cost.',
  },
  {
    num: '2',
    title: '30-min results review',
    desc: 'Walk through your audit results with a Fox Haven consultant. No pitch, just your roadmap.',
  },
  {
    num: '3',
    title: 'Custom automation plan',
    desc: 'We scope a prioritized build plan targeting your highest-ROI opportunities first.',
  },
  {
    num: '4',
    title: 'Build & deploy',
    desc: '3–6 week deployment with full handoff, documentation, and team training included.',
  },
];

export default function ProcessSteps() {
  return (
    <div className="relative mt-8">
      {/* Vertical line */}
      <div className="absolute left-4 top-4 bottom-4 w-px bg-[#1E293B]" />

      <div className="space-y-6">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-start gap-4"
          >
            {/* Number circle */}
            <div className="relative z-[1] flex-shrink-0 w-8 h-8 rounded-full bg-[#161D2E] border border-[#1E293B] flex items-center justify-center">
              <span className="font-[family-name:var(--font-mono)] text-[11px] font-bold text-[#e05e14]">
                {step.num}
              </span>
            </div>

            <div className="pt-1">
              <h4 className="text-[#F1F5F9] font-semibold text-[14px]">{step.title}</h4>
              <p className="text-[#94A3B8] text-[13px] mt-1 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
