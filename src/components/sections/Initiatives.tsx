'use client';

import { useState } from 'react';
import { INITIATIVES } from '@/lib/intent-config';
import InitiativeCard from '@/components/initiatives/InitiativeCard';
import LearnMoreModal from '@/components/ai-small-biz/LearnMoreModal';

export default function Initiatives() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="initiatives" className="py-[120px] bg-[#ede3d2]" data-cursor="light">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* 2-column header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[60px] items-end mb-[72px] reveal">
          <div>
            <div className="inline-flex items-center gap-2 px-[13px] py-[5px] rounded-full border border-[#e05e14]/30 text-[#e05e14] text-[11px] font-semibold tracking-[.14em] uppercase mb-5">
              <span className="w-[5px] h-[5px] rounded-full bg-[#e05e14] animate-pulse" />
              Our Work
            </div>
            <h2
              className="font-display font-light text-[#0b1c2e] leading-[1.08] tracking-[-0.015em]"
              style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}
            >
              Four ways we&apos;re
              <br />
              <em className="italic text-[#e05e14] font-normal">building</em> a better future
            </h2>
          </div>
          <p className="text-[17px] leading-[1.75] text-[#0b1c2e]/55 font-light self-end">
            Each initiative addresses a real, urgent need — and every one is designed to scale beyond Phoenix to communities everywhere.
          </p>
        </div>

        {/* Initiative cards */}
        <div className="flex flex-col gap-7">
          {INITIATIVES.map((initiative, i) => (
            <InitiativeCard
              key={initiative.id}
              initiative={initiative}
              index={i}
              onLearnMoreClick={
                initiative.id === 'ai-consulting'
                  ? () => setModalOpen(true)
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      <LearnMoreModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
