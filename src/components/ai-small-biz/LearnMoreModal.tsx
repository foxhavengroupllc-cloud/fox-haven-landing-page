'use client';

import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Link2, Zap, Activity } from 'lucide-react';
import Link from 'next/link';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VALUE_PROPS = [
  {
    Icon: Link2,
    title: 'Systems integration',
    desc: 'We connect your existing tools so data flows automatically, no more duplicate entry or manual handoffs.',
  },
  {
    Icon: Zap,
    title: 'AI workflow automation',
    desc: 'Repetitive tasks, follow-ups, scheduling, reporting, handled automatically so your team focuses on what matters.',
  },
  {
    Icon: Activity,
    title: 'Ongoing intelligence layer',
    desc: 'Live dashboards and alerts so you always know what\'s happening, not just what happened last month.',
  },
];

const STATS = [
  { value: '$42K', label: 'Avg annual recovery' },
  { value: '3–6 wk', label: 'Typical deployment' },
  { value: 'Free', label: 'Initial audit' },
];

export default function LearnMoreModal({ isOpen, onClose }: LearnMoreModalProps) {
  const router = useRouter();

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(5, 9, 18, 0.85)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-[#112440] border border-[#1E293B] rounded-2xl p-6 sm:p-7 max-sm:min-h-screen max-sm:rounded-none"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center bg-[#161D2E] border border-[#1E293B] rounded-md text-[#94A3B8] hover:text-[#F1F5F9] transition-colors cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>

            {/* Header */}
            <div className="mb-5">
              <div className="text-[10px] tracking-[0.14em] uppercase text-[#e05e14] font-semibold mb-3">
                ◉ AI SOLUTIONS FOR EVERYONE
              </div>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-[22px] text-[#F1F5F9] leading-tight">
                Stop losing revenue to{' '}
                <em className="text-[#e05e14] not-italic font-bold">process drag.</em>
              </h2>
              <p className="text-[13px] text-[#94A3B8] mt-2 leading-relaxed">
                Fox Haven identifies exactly where your business is bleeding time and money, then
                builds the AI systems to stop it.
              </p>
            </div>

            {/* Stats bar */}
            <div className="flex gap-2 mb-5">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex-1 bg-[rgba(249,115,22,0.07)] border border-[rgba(249,115,22,0.2)] rounded-lg px-3 py-2.5 text-center"
                >
                  <div className="font-[family-name:var(--font-display)] font-bold text-[18px] text-[#e05e14]">
                    {s.value}
                  </div>
                  <div className="text-[10px] uppercase text-[#94A3B8] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Value props */}
            <div className="space-y-2.5 mb-6">
              {VALUE_PROPS.map((vp, i) => (
                <motion.div
                  key={vp.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.06 }}
                  className="flex items-start gap-3 bg-[#161D2E] border border-[#1E293B] rounded-lg px-3 py-2.5"
                >
                  <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-[rgba(249,115,22,0.12)] rounded-md">
                    <vp.Icon size={14} className="text-[#e05e14]" />
                  </div>
                  <div>
                    <h4 className="text-[#F1F5F9] text-[13px] font-semibold">{vp.title}</h4>
                    <p className="text-[#94A3B8] text-[12px] mt-0.5 leading-relaxed">{vp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex gap-3">
              <Link
                href="/audit"
                className="flex-1 text-center bg-[#e05e14] hover:bg-[#c4500f] text-white font-semibold rounded-lg py-2.5 text-[13px] transition-colors"
                onClick={onClose}
              >
                Take the free audit →
              </Link>
              <button
                onClick={() => {
                  onClose();
                  router.push('/ai-solutions');
                }}
                className="flex-1 text-center border border-[#1E293B] text-[#F1F5F9] font-medium rounded-lg py-2.5 text-[13px] hover:border-[#e05e14]/40 transition-colors cursor-pointer"
              >
                Learn more about the service
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
