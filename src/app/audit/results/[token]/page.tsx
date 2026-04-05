'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ConstellationBg } from '@/components/ui/ConstellationBg';
import { ResultsHero } from '@/components/results/ResultsHero';
import { ImpactEstimate } from '@/components/results/ImpactEstimate';
import { ScoreBreakdown } from '@/components/results/ScoreBreakdown';
import { OpportunityCards } from '@/components/results/OpportunityCards';
import { BlockerCards } from '@/components/results/BlockerCards';
import { ResultsCTA } from '@/components/results/ResultsCTA';
import type { ScoreTier } from '@/lib/audit/scoring';
import type { SectionKey } from '@/lib/audit/questions';
import Link from 'next/link';

interface ResultsData {
  token: string;
  companyName: string;
  respondentName: string;
  score: number;
  sections: Array<{ section: SectionKey; normalized: number; raw: number; maxPossible: number }>;
  inefficiencyLow: number;
  inefficiencyHigh: number;
  recommendations: {
    opportunities: Array<{ title: string; description: string; impact: 'HIGH' | 'MEDIUM'; savingsEstimate?: string }>;
    blockers: Array<{ title: string; description: string; severity: 'CRITICAL' | 'MODERATE' }>;
  };
  status: string;
}

function getTierFromScore(score: number): ScoreTier {
  if (score < 35) return 'critical';
  if (score < 55) return 'needs-work';
  if (score < 75) return 'moderate';
  return 'strong';
}

export default function ResultsPage() {
  const params = useParams();
  const token = params.token as string;
  const [data, setData] = useState<ResultsData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/audit/results/${token}`)
      .then((res) => { if (!res.ok) throw new Error('Results not found'); return res.json(); })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [token]);

  if (error) return (
    <div className="min-h-screen bg-[var(--color-navy)] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#E05555] text-lg font-[family-name:var(--font-body)] mb-4">{error}</p>
        <Link href="/audit" className="text-[var(--color-orange)] font-[family-name:var(--font-body)] hover:underline">Take the audit &rarr;</Link>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-[var(--color-navy)] flex items-center justify-center">
      <p className="text-[#9BAAC2] font-[family-name:var(--font-body)]">Loading results...</p>
    </div>
  );

  if (data.status !== 'completed') return (
    <div className="min-h-screen bg-[var(--color-navy)] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#9BAAC2] text-lg font-[family-name:var(--font-body)] mb-4">This audit is still in progress.</p>
        <Link href={`/audit/${token}`} className="text-[var(--color-orange)] font-[family-name:var(--font-body)] hover:underline">Continue your audit &rarr;</Link>
      </div>
    </div>
  );

  const tier = getTierFromScore(data.score);

  return (
    <div className="min-h-screen bg-[var(--color-navy)]">
      <div className="relative">
        <ConstellationBg />
        <div className="relative" style={{ zIndex: 10 }}>
          <div className="flex items-center px-6 py-4">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <div className="w-8 h-8 rounded-md bg-[var(--color-orange)] flex items-center justify-center">
                <span className="text-white font-[family-name:var(--font-display)] font-bold text-sm">F</span>
              </div>
              <span className="text-[var(--color-cream)] font-[family-name:var(--font-body)] font-medium text-sm tracking-wide">Fox Haven Group</span>
            </Link>
          </div>
          <ResultsHero score={data.score} tier={tier} inefficiencyLow={data.inefficiencyLow} inefficiencyHigh={data.inefficiencyHigh} />
          <ImpactEstimate low={data.inefficiencyLow} high={data.inefficiencyHigh} />
          <ScoreBreakdown sections={data.sections} />
          <OpportunityCards opportunities={data.recommendations.opportunities} />
          <BlockerCards blockers={data.recommendations.blockers} />
        </div>
      </div>
      <ResultsCTA token={token} />
    </div>
  );
}
