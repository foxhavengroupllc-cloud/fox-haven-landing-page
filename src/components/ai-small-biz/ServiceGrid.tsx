'use client';

import { motion } from 'framer-motion';

const SERVICES = [
  {
    title: 'Lead response & follow-up',
    outcome: 'Avg 40% more conversions',
    description:
      'Automated qualification and follow-up sequences that respond in seconds, not hours.',
  },
  {
    title: 'Data & reporting',
    outcome: 'Avg 8 hrs/wk recovered',
    description:
      'Live dashboards pulling from all your tools — no more manual Excel pulls on Friday afternoon.',
  },
  {
    title: 'Scheduling & ops',
    outcome: 'Avg 6 hrs/wk recovered',
    description:
      'Smart booking, reminders, and routing that keeps the calendar from eating your team\'s time.',
  },
  {
    title: 'Systems integration',
    outcome: 'Eliminate duplicate entry',
    description:
      'Connect your CRM, email, accounting, and ops tools so data flows automatically.',
  },
];

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
      {SERVICES.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="bg-[#112440] border border-[#1E293B] rounded-[10px] p-5 border-l-[3px] border-l-[#e05e14]"
        >
          <h3 className="text-[#F1F5F9] font-semibold text-[15px]">{s.title}</h3>
          <p className="text-[#94A3B8] text-[13px] mt-2 leading-relaxed">{s.description}</p>
          <span className="inline-block mt-3 bg-[rgba(249,115,22,0.10)] text-[#e05e14] text-[10px] tracking-[0.1em] uppercase rounded px-2 py-[3px] font-medium">
            {s.outcome}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
