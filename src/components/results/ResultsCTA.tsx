'use client';

import { useState } from 'react';

export function ResultsCTA({ token }: { token: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleClick = async () => {
    if (status === 'sent' || status === 'sending') return;
    setStatus('sending');

    try {
      const res = await fetch('/api/audit/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="py-20 px-6 text-center bg-[var(--color-navy-deep)]">
      {status === 'sent' ? (
        <>
          <div className="w-16 h-16 rounded-full bg-[#3DB87A]/20 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3DB87A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-[26px] md:text-[32px] text-white leading-snug max-w-lg mx-auto">
            Thank you for your interest!
          </h2>
          <p className="mt-4 text-[16px] text-[#9BAAC2] font-[family-name:var(--font-body)] max-w-md mx-auto leading-relaxed">
            Someone from Fox Haven Group will reach out within 24 hours to walk through your results and discuss next steps.
          </p>
          <a
            href={`/audit/results/${token}`}
            className="inline-block mt-8 border border-white/30 text-white/90 font-[family-name:var(--font-body)] font-medium px-7 py-3.5 rounded-full hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition-colors text-[15px] no-underline"
          >
            Share this report
          </a>
        </>
      ) : (
        <>
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-[26px] md:text-[32px] text-white leading-snug max-w-lg mx-auto">
            See how these savings could <em className="text-[var(--color-orange)]">actually</em> be captured.
          </h2>
          <p className="mt-4 text-[16px] text-[#9BAAC2] font-[family-name:var(--font-body)] max-w-md mx-auto leading-relaxed">
            A 30-minute guided review with Fox Haven turns your results into a concrete action plan &mdash; no commitment required.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={handleClick}
              disabled={status === 'sending'}
              className="bg-[var(--color-orange)] text-white font-[family-name:var(--font-body)] font-semibold px-7 py-3.5 rounded-full hover:brightness-110 transition-all text-[15px] tracking-wide disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === 'sending' ? 'Sending...' : 'Walk through your automation opportunities \u2192'}
            </button>
            {status === 'error' && (
              <p className="text-[#E05555] text-[13px] font-[family-name:var(--font-body)]">
                Something went wrong. Please try again.
              </p>
            )}
            <a
              href={`/audit/results/${token}`}
              className="inline-block border border-white/30 text-white/90 font-[family-name:var(--font-body)] font-medium px-7 py-3.5 rounded-full hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition-colors text-[15px] no-underline"
            >
              Share this report
            </a>
          </div>
          <p className="mt-6 text-[13px] text-[#4A5A78] font-[family-name:var(--font-body)]">Free. No sales pressure. Just results.</p>
        </>
      )}
    </div>
  );
}
