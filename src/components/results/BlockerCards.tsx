import type { Blocker } from '@/lib/audit/recommendations';

export function BlockerCards({ blockers }: { blockers: Blocker[] }) {
  if (blockers.length === 0) return null;
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="font-[family-name:var(--font-display)] font-semibold text-[26px] md:text-[30px] text-white mb-8">
        What could <em className="text-[var(--color-orange)]">slow you down</em>
      </h2>
      <div className="flex flex-col gap-4">
        {blockers.map((b, i) => (
          <div key={i} className={`bg-[var(--color-navy-mid)] border border-[#243352] rounded-xl p-6 border-l-[3px] ${b.severity === 'CRITICAL' ? 'border-l-[#E05555]' : 'border-l-[#F0A030]'}`}>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-white font-[family-name:var(--font-body)] font-semibold text-[16px]">{b.title}</h3>
              <span className={`text-[10px] font-medium tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full ${b.severity === 'CRITICAL' ? 'bg-[rgba(224,85,85,0.2)] text-[#E05555]' : 'bg-[rgba(240,160,48,0.2)] text-[#F0A030]'}`}>{b.severity}</span>
            </div>
            <p className="text-[15px] text-[#9BAAC2] font-[family-name:var(--font-body)] leading-relaxed">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
