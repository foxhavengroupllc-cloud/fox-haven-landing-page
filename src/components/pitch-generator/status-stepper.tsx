'use client';

import { cn } from '@/lib/utils/cn';
import type { RunStatus } from '@/lib/pitch/types';

const STEPS: { status: RunStatus; label: string }[] = [
  { status: 'enriching', label: 'Enriching' },
  { status: 'generating_brief', label: 'Generating' },
  { status: 'validating', label: 'Validating' },
  { status: 'rendering_placeholders', label: 'Mapping' },
  { status: 'creating_deck', label: 'Building Deck' },
  { status: 'completed', label: 'Complete' },
];

interface Props {
  currentStatus: RunStatus;
  className?: string;
}

export default function StatusStepper({ currentStatus, className }: Props) {
  const currentIndex = STEPS.findIndex((s) => s.status === currentStatus);
  const isFailed = currentStatus === 'failed';

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {STEPS.map((step, i) => {
        const isActive = i === currentIndex;
        const isDone = currentIndex > i;
        const isFailedStep = isFailed && i === currentIndex;

        return (
          <div key={step.status} className="flex items-center gap-1">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-colors',
                  isDone && 'bg-[#16a34a]',
                  isActive && !isFailed && 'bg-[#e05e14] animate-pulse',
                  isFailedStep && 'bg-red-500',
                  !isDone && !isActive && 'bg-white/10',
                )}
              />
              <span
                className={cn(
                  'text-[9px] tracking-[.08em] uppercase whitespace-nowrap',
                  isDone && 'text-[#16a34a]',
                  isActive && !isFailed && 'text-[#e05e14]',
                  isFailedStep && 'text-red-500',
                  !isDone && !isActive && 'text-white/30',
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-6 h-px mb-4',
                  isDone ? 'bg-[#16a34a]/40' : 'bg-white/10',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
