export function ResultsCTA({ token }: { token: string }) {
  return (
    <div className="py-20 px-6 text-center bg-[var(--color-navy-deep)]">
      <h2 className="font-[family-name:var(--font-display)] font-semibold text-[26px] md:text-[32px] text-white leading-snug max-w-lg mx-auto">
        See how these savings could <em className="text-[var(--color-orange)]">actually</em> be captured.
      </h2>
      <p className="mt-4 text-[16px] text-[#9BAAC2] font-[family-name:var(--font-body)] max-w-md mx-auto leading-relaxed">
        A 30-minute guided review with Fox Haven turns your results into a concrete action plan &mdash; no commitment required.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <a href="https://foxhavengrouphq.com/#contact" className="inline-block bg-[var(--color-orange)] text-white font-[family-name:var(--font-body)] font-semibold px-7 py-3.5 rounded-full hover:brightness-110 transition-all text-[15px] tracking-wide no-underline">
          Walk through your automation opportunities &rarr;
        </a>
        <a href={`/audit/results/${token}`} className="inline-block border border-white/30 text-white/90 font-[family-name:var(--font-body)] font-medium px-7 py-3.5 rounded-full hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition-colors text-[15px] no-underline">
          Share this report
        </a>
      </div>
      <p className="mt-6 text-[13px] text-[#4A5A78] font-[family-name:var(--font-body)]">Free. No sales pressure. Just results.</p>
    </div>
  );
}
