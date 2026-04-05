'use client';

import { useState } from 'react';

interface AnswerOptionProps {
  letter: string;
  label: string;
  hint?: string;
  selected: boolean;
  onSelect: () => void;
}

export function AnswerOption({ letter, label, hint, selected, onSelect }: AnswerOptionProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <button
      onClick={onSelect}
      className={`
        w-full min-h-[62px] flex items-center gap-4 px-5 py-4 rounded-xl
        border transition-all duration-200 text-left relative group
        font-[family-name:var(--font-body)]
        ${selected
          ? 'bg-[rgba(224,94,20,0.15)] border-[var(--color-orange)] border-l-[3px]'
          : 'bg-[var(--color-navy-mid)] border-[#243352] hover:border-[rgba(224,94,20,0.5)] hover:border-l-[3px] hover:border-l-[var(--color-orange)]'
        }
      `}
    >
      <span className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[13px] font-medium ${selected ? 'text-[var(--color-orange)] bg-[rgba(224,94,20,0.2)]' : 'text-[#4A5A78] bg-[var(--color-navy-deep)] group-hover:text-[var(--color-orange)]'}`}>
        {letter}
      </span>
      <span className={`text-[15px] flex-1 ${selected ? 'text-white' : 'text-[#F0F2F5]'}`}>{label}</span>
      {hint && (
        <span
          className="flex-shrink-0 w-5 h-5 rounded-full border border-[#4A5A78] text-[#4A5A78] text-[11px] flex items-center justify-center cursor-help hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition-colors"
          onMouseEnter={() => setShowHint(true)}
          onMouseLeave={() => setShowHint(false)}
        >
          ?
        </span>
      )}
      {hint && showHint && (
        <div className="absolute right-0 top-full mt-2 z-50 max-w-[280px] p-3 rounded-lg bg-[var(--color-navy-deep)] border border-[#243352] text-[13px] text-[#9BAAC2] shadow-lg font-[family-name:var(--font-body)]">
          {hint}
        </div>
      )}
    </button>
  );
}
