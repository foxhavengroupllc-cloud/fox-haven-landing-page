'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AnswerOption } from './AnswerOption';
import type { Question } from '@/lib/audit/questions';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export function QuestionCard({ question, selectedValue, onSelect, direction }: {
  question: Question;
  selectedValue?: string;
  onSelect: (value: string) => void;
  direction: 'forward' | 'back';
}) {
  const xEnter = direction === 'forward' ? 40 : -40;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ x: xEnter, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -xEnter, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="max-w-[600px] mx-auto px-6 py-10"
      >
        <h2 className="font-[family-name:var(--font-display)] font-semibold text-[28px] md:text-[34px] text-white leading-tight">
          {question.text}
        </h2>
        {question.subtext && (
          <p className="mt-3 text-[14px] text-[#9BAAC2] font-[family-name:var(--font-body)] leading-relaxed">
            {question.subtext}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3">
          {question.options.map((opt, i) => (
            <AnswerOption
              key={opt.value}
              letter={LETTERS[i]}
              label={opt.label}
              hint={opt.hint}
              selected={selectedValue === opt.value}
              onSelect={() => onSelect(opt.value)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
