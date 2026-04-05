'use client';

import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { ScoreTierBadge } from '@/components/ui/ScoreTierBadge';
import type { ScoreTier } from '@/lib/audit/scoring';

export function ResultsHero({ score, tier, inefficiencyLow, inefficiencyHigh }: {
  score: number; tier: ScoreTier; inefficiencyLow: number; inefficiencyHigh: number;
}) {
  const showDollarRange = tier === 'critical' || tier === 'needs-work';

  return (
    <div className="text-center py-16 px-6">
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-2 h-2 rounded-full bg-[var(--color-orange)]" />
        <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-orange)] font-[family-name:var(--font-body)]">
          YOUR AUDIT RESULTS
        </span>
      </div>
      <div className="mb-4">
        <AnimatedNumber target={score} className="font-[family-name:var(--font-body)] font-bold text-[96px] md:text-[112px] text-white tabular-nums leading-none" />
        <span className="text-[32px] md:text-[36px] text-[#9BAAC2] font-[family-name:var(--font-body)] font-bold ml-1">/ 100</span>
      </div>
      <div className="mb-8"><ScoreTierBadge tier={tier} /></div>
      {showDollarRange ? (
        <h1 className="font-[family-name:var(--font-display)] font-semibold text-[24px] md:text-[30px] text-white leading-snug max-w-xl mx-auto">
          Your business is losing an estimated{' '}
          <em className="text-[var(--color-orange)]">${inefficiencyLow.toLocaleString()}&ndash;${inefficiencyHigh.toLocaleString()}/year</em>{' '}
          to operational inefficiency.
        </h1>
      ) : (
        <h1 className="font-[family-name:var(--font-display)] font-semibold text-[24px] md:text-[30px] text-white leading-snug max-w-xl mx-auto">
          Your operations are in good shape &mdash; targeted improvements could still unlock meaningful gains.
        </h1>
      )}
      <p className="mt-4 text-[16px] text-[#9BAAC2] font-[family-name:var(--font-body)] max-w-lg mx-auto leading-relaxed">
        This score measures operational efficiency across leadership, sales, operations, admin, communication, AI readiness, and change capacity.
      </p>
    </div>
  );
}
