'use client';

import { motion } from 'framer-motion';

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="w-full h-[3px] bg-[var(--color-navy-mid)]">
      <motion.div
        className="h-full bg-[var(--color-orange)]"
        style={{ boxShadow: '0 0 8px var(--color-orange)' }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  );
}
