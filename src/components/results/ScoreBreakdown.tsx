'use client';

import { motion } from 'framer-motion';
import { SECTION_LABELS, type SectionKey } from '@/lib/audit/questions';
import type { SectionScore } from '@/lib/audit/scoring';

function barColor(pct: number): string {
  if (pct < 35) return '#E05555';
  if (pct < 55) return '#F0A030';
  if (pct < 75) return '#3B6FCF';
  return '#3DB87A';
}

export function ScoreBreakdown({ sections }: { sections: SectionScore[] }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="font-[family-name:var(--font-display)] font-semibold text-[26px] md:text-[30px] text-white mb-8">Where the gaps are</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s, i) => (
          <motion.div key={s.section} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} className="bg-[var(--color-navy-mid)] border border-[#243352] rounded-xl p-5">
            <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#9BAAC2] font-[family-name:var(--font-body)]">{SECTION_LABELS[s.section as SectionKey]}</span>
            <p className="mt-2 text-[28px] font-bold text-white font-[family-name:var(--font-body)] tabular-nums">{s.normalized}</p>
            <div className="mt-3 w-full h-[6px] rounded-full bg-[#243352]">
              <motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${s.normalized}%` }} transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: 'easeOut' }} style={{ backgroundColor: barColor(s.normalized) }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
