'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ConstellationBg } from '@/components/ui/ConstellationBg';

const MESSAGES = [
  { text: 'Analyzing your responses\u2026', delay: 500 },
  { text: 'Calculating your efficiency score\u2026', delay: 1400 },
  { text: 'Building your opportunity report\u2026', delay: 2400 },
];

export function AuditComplete({ onFinish }: { onFinish: () => void }) {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    const timers = MESSAGES.map((msg, i) =>
      setTimeout(() => setVisibleMessages(i + 1), msg.delay)
    );
    const redirect = setTimeout(onFinish, 3600);
    return () => { timers.forEach(clearTimeout); clearTimeout(redirect); };
  }, [onFinish]);

  return (
    <div className="relative min-h-screen bg-[var(--color-navy)] flex items-center justify-center">
      <ConstellationBg />
      <div className="relative text-center px-6" style={{ zIndex: 10 }}>
        <div className="w-80 max-w-full h-1 rounded-full bg-[var(--color-navy-mid)] mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-orange)] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.2, ease: 'easeOut' }}
          />
        </div>
        <div className="mt-8 space-y-3 min-h-[100px]">
          {MESSAGES.slice(0, visibleMessages).map((msg, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[15px] text-[#9BAAC2] font-[family-name:var(--font-body)]"
            >
              {msg.text}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
