import type { Opportunity } from '@/lib/audit/recommendations';

export function OpportunityCards({ opportunities }: { opportunities: Opportunity[] }) {
  if (opportunities.length === 0) return null;
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="font-[family-name:var(--font-display)] font-semibold text-[26px] md:text-[30px] text-white mb-8">
        Your top <em className="text-[var(--color-orange)]">opportunities</em>
      </h2>
      <div className="flex flex-col gap-4">
        {opportunities.map((opp, i) => (
          <div key={i} className="bg-[var(--color-navy-mid)] border border-[#243352] rounded-xl p-6 border-l-[3px] border-l-[var(--color-orange)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-[family-name:var(--font-body)] font-semibold text-[16px]">{opp.title}</h3>
                  <span className={`text-[10px] font-medium tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full ${opp.impact === 'HIGH' ? 'bg-[rgba(224,94,20,0.2)] text-[var(--color-orange)]' : 'bg-[rgba(59,111,207,0.2)] text-[#3B6FCF]'}`}>{opp.impact} IMPACT</span>
                </div>
                <p className="text-[15px] text-[#9BAAC2] font-[family-name:var(--font-body)] leading-relaxed">{opp.description}</p>
              </div>
              {opp.savingsEstimate && <span className="flex-shrink-0 text-[var(--color-orange)] font-[family-name:var(--font-body)] font-semibold text-[14px] whitespace-nowrap">{opp.savingsEstimate}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
