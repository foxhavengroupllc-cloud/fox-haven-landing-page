import type { ScoreTier } from '@/lib/audit/scoring';

const TIER_CONFIG: Record<ScoreTier, { label: string; bg: string; text: string }> = {
  critical: { label: 'CRITICAL GAPS IDENTIFIED', bg: 'bg-[#E05555]', text: 'text-white' },
  'needs-work': { label: 'SIGNIFICANT OPPORTUNITY', bg: 'bg-[#F0A030]', text: 'text-[#1A2035]' },
  moderate: { label: 'ROOM TO IMPROVE', bg: 'bg-[#3B6FCF]', text: 'text-white' },
  strong: { label: 'WELL OPTIMIZED', bg: 'bg-[#3DB87A]', text: 'text-white' },
};

export function ScoreTierBadge({ tier }: { tier: ScoreTier }) {
  const config = TIER_CONFIG[tier];
  return (
    <span className={`inline-block px-5 py-1.5 rounded-full text-[11px] font-medium tracking-[0.12em] uppercase ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
