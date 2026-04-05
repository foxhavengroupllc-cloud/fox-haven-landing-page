'use client';

import { cn } from '@/lib/utils/cn';
import type { PipelineResult } from '@/lib/pitch/types';
import PitchBriefPreview from './pitch-brief-preview';

interface Props {
  result: PipelineResult;
  className?: string;
}

export default function GenerationResult({ result, className }: Props) {
  const isSuccess = result.status === 'completed';

  return (
    <div className={cn('space-y-5', className)}>
      {/* Status card */}
      <div
        className={cn(
          'rounded-2xl border p-5',
          isSuccess
            ? 'bg-[#16a34a]/10 border-[#16a34a]/20'
            : 'bg-red-500/10 border-red-500/20',
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <h3
            className={cn(
              'font-semibold text-[15px]',
              isSuccess ? 'text-[#16a34a]' : 'text-red-400',
            )}
          >
            {isSuccess ? 'Deck Generated' : 'Generation Failed'}
          </h3>
          <span
            className={cn(
              'text-[10px] tracking-[.1em] uppercase px-2.5 py-1 rounded-full font-semibold',
              isSuccess
                ? 'bg-[#16a34a]/20 text-[#16a34a]'
                : 'bg-red-500/20 text-red-400',
            )}
          >
            {result.status}
          </span>
        </div>

        {result.error && (
          <p className="text-[13px] text-red-400/80 mb-3">{result.error}</p>
        )}

        {result.runId && isSuccess && (
          <a
            href={`/api/pitch/download/${result.runId}`}
            className="inline-flex items-center gap-2 bg-white/[.06] border border-white/10 hover:border-[#e05e14]/30 rounded-xl px-4 py-2.5 text-[13px] text-white/80 hover:text-white transition-all group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#e05e14]"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Pitch Deck (.pptx)
            <span className="text-white/30 group-hover:text-[#e05e14] transition-colors">
              &darr;
            </span>
          </a>
        )}
      </div>

      {/* Pitch brief preview */}
      {result.pitchBrief && <PitchBriefPreview brief={result.pitchBrief} />}
    </div>
  );
}
