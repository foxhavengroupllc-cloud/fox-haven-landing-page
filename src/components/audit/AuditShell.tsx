'use client';

import { ConstellationBg } from '@/components/ui/ConstellationBg';
import { ProgressBar } from './ProgressBar';
import Link from 'next/link';

interface AuditShellProps {
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  sectionLabel?: string;
}

export function AuditShell({ children, currentStep, totalSteps, sectionLabel }: AuditShellProps) {
  const showProgress = currentStep !== undefined && totalSteps !== undefined;

  return (
    <div className="relative min-h-screen bg-[var(--color-navy)]">
      <ConstellationBg />
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-8 h-8 rounded-md bg-[var(--color-orange)] flex items-center justify-center">
              <span className="text-white font-[family-name:var(--font-display)] font-bold text-sm">F</span>
            </div>
            <span className="text-[var(--color-cream)] font-[family-name:var(--font-body)] font-medium text-sm tracking-wide">
              Fox Haven Group
            </span>
          </Link>
          {showProgress && (
            <span className="text-[var(--color-warm-gray)] font-[family-name:var(--font-body)] text-sm">
              Question {currentStep! + 1} of {totalSteps}
            </span>
          )}
        </div>
        {showProgress && <ProgressBar current={currentStep! + 1} total={totalSteps!} />}
        {sectionLabel && (
          <div className="text-center mt-6">
            <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-orange)] font-[family-name:var(--font-body)]">
              {sectionLabel}
            </span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
