'use client';

import { ConstellationBg } from '@/components/ui/ConstellationBg';
import { Header } from '@/components/new-home/SiteChrome';
import { ProgressBar } from './ProgressBar';

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
        <Header />
        {showProgress && (
          <div className="flex items-center justify-end px-6 py-3">
            <span className="text-[var(--color-warm-gray)] font-[family-name:var(--font-body)] text-sm">
              Question {currentStep! + 1} of {totalSteps}
            </span>
          </div>
        )}
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
