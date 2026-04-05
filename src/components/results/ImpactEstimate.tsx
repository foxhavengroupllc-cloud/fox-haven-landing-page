export function ImpactEstimate({ low, high }: { low: number; high: number }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <div className="border border-[var(--color-orange)] rounded-2xl bg-[var(--color-navy-mid)] p-8">
        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#9BAAC2] font-[family-name:var(--font-body)]">LOW ESTIMATE</span>
            <p className="mt-2 text-[36px] md:text-[40px] font-bold text-[var(--color-orange)] font-[family-name:var(--font-body)] tabular-nums">${low.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#9BAAC2] font-[family-name:var(--font-body)]">HIGH ESTIMATE</span>
            <p className="mt-2 text-[36px] md:text-[40px] font-bold text-[var(--color-orange)] font-[family-name:var(--font-body)] tabular-nums">${high.toLocaleString()}</p>
          </div>
        </div>
        <p className="mt-6 text-[14px] text-[#9BAAC2] font-[family-name:var(--font-body)] leading-relaxed text-center">
          Estimated annual cost of operational inefficiency based on your reported admin hours, sales follow-up gaps, and data duplication patterns.
        </p>
      </div>
    </div>
  );
}
