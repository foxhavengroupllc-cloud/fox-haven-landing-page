'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS, FAQ_CATEGORIES } from '@/lib/ai-solutions-config';
import type { FAQItem } from '@/lib/ai-solutions-config';

export default function FAQAccordion() {
  const [activeCategory, setActiveCategory] = useState<FAQItem['category'] | 'all'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === 'all'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((f) => f.category === activeCategory);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-none">
        <button
          onClick={() => { setActiveCategory('all'); setOpenIndex(null); }}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-medium tracking-[0.04em] transition-all duration-200 cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#e05e14] text-white'
              : 'bg-[#161D2E] text-[#94A3B8] border border-[#1E293B] hover:text-[#F1F5F9] hover:border-[#2a3d5c]'
          }`}
        >
          All
        </button>
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => { setActiveCategory(cat.key); setOpenIndex(null); }}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-medium tracking-[0.04em] transition-all duration-200 cursor-pointer ${
              activeCategory === cat.key
                ? 'bg-[#e05e14] text-white'
                : 'bg-[#161D2E] text-[#94A3B8] border border-[#1E293B] hover:text-[#F1F5F9] hover:border-[#2a3d5c]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion items */}
      <div className="space-y-2">
        {filtered.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.question}
              className="bg-[#112440] border border-[#1E293B] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
              >
                <span className="text-[14px] font-semibold text-[#F1F5F9]">
                  {faq.question}
                </span>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 text-[#94A3B8] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#e05e14]' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-5 pb-4">
                      <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
