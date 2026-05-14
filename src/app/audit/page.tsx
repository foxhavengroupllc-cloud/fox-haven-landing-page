'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConstellationBg } from '@/components/ui/ConstellationBg';
import Link from 'next/link';

const INDUSTRIES = [
  'Professional Services',
  'Healthcare',
  'Real Estate',
  'Construction',
  'Restaurants',
  'Retail',
  'Other',
];

const REVENUE_RANGES = [
  'Under $500K',
  '$500K\u2013$2M',
  '$2M\u2013$10M',
  '$10M+',
  'Prefer not to say',
];

export default function AuditIntakePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    respondentName: '',
    respondentTitle: '',
    companyName: '',
    respondentEmail: '',
    industry: '',
    revenueRange: '',
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/audit/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to start audit');
      }

      const { token } = await res.json();
      router.push(`/audit/${token}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[var(--color-navy-mid)] border border-[#243352] rounded-[10px] text-[var(--color-cream)] font-[family-name:var(--font-body)] px-[18px] py-[14px] transition-colors focus:border-[var(--color-orange)] focus:outline-none placeholder:text-[#4A5A78]';

  return (
    <div className="relative min-h-screen bg-[var(--color-navy)]">
      <ConstellationBg />

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Nav */}
        <div className="flex items-center px-6 py-4">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-8 h-8 rounded-md bg-[var(--color-orange)] flex items-center justify-center">
              <span className="text-white font-[family-name:var(--font-display)] font-bold text-sm">F</span>
            </div>
            <span className="text-[var(--color-cream)] font-[family-name:var(--font-body)] font-medium text-sm tracking-wide">
              Fox Haven Group
            </span>
          </Link>
        </div>

        {/* Content */}
        <div className="max-w-[560px] mx-auto px-6 py-12">
          {/* Section tag */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--color-orange)]" />
            <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-orange)] font-[family-name:var(--font-body)]">
              AI SOLUTIONS FOR EVERYONE &middot; FREE ASSESSMENT
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[36px] md:text-[44px] text-white leading-[1.1] mb-4">
            Find out what your business is{' '}
            <em className="text-[var(--color-orange)]">losing</em> to inefficiency.
          </h1>

          <p className="text-[16px] text-[#9BAAC2] font-[family-name:var(--font-body)] leading-relaxed mb-4">
            Answer 12&ndash;15 questions. Get a scored report with concrete opportunities &mdash; in under 5 minutes.
          </p>

          {/* Estimate callout */}
          <div className="inline-block border border-[#243352] rounded-full px-5 py-2 mb-10">
            <span className="text-[13px] text-[#9BAAC2] font-[family-name:var(--font-body)]">
              Most businesses we assess are losing <span className="text-[var(--color-orange)] font-semibold">$28K&ndash;$65K/year</span> to fixable process drag.
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] text-[#9BAAC2] font-[family-name:var(--font-body)] mb-1.5">
                Full Name <span className="text-[var(--color-orange)]">*</span>
              </label>
              <input
                type="text"
                required
                value={form.respondentName}
                onChange={(e) => update('respondentName', e.target.value)}
                className={inputClass}
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label className="block text-[13px] text-[#9BAAC2] font-[family-name:var(--font-body)] mb-1.5">
                Your Role / Title <span className="text-[var(--color-orange)]">*</span>
              </label>
              <input
                type="text"
                required
                value={form.respondentTitle}
                onChange={(e) => update('respondentTitle', e.target.value)}
                className={inputClass}
                placeholder="Operations Manager"
              />
            </div>

            <div>
              <label className="block text-[13px] text-[#9BAAC2] font-[family-name:var(--font-body)] mb-1.5">
                Company Name <span className="text-[var(--color-orange)]">*</span>
              </label>
              <input
                type="text"
                required
                value={form.companyName}
                onChange={(e) => update('companyName', e.target.value)}
                className={inputClass}
                placeholder="Acme Corp"
              />
            </div>

            <div>
              <label className="block text-[13px] text-[#9BAAC2] font-[family-name:var(--font-body)] mb-1.5">
                Work Email <span className="text-[var(--color-orange)]">*</span>
              </label>
              <input
                type="email"
                required
                value={form.respondentEmail}
                onChange={(e) => update('respondentEmail', e.target.value)}
                className={inputClass}
                placeholder="jane@acmecorp.com"
              />
              <p className="text-[11px] text-[#4A5A78] font-[family-name:var(--font-body)] mt-1">
                Results sent here. No spam.
              </p>
            </div>

            <div>
              <label className="block text-[13px] text-[#9BAAC2] font-[family-name:var(--font-body)] mb-1.5">
                Industry
              </label>
              <select
                value={form.industry}
                onChange={(e) => update('industry', e.target.value)}
                className={inputClass}
              >
                <option value="">Select your industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[13px] text-[#9BAAC2] font-[family-name:var(--font-body)] mb-1.5">
                Approximate Annual Revenue
              </label>
              <select
                value={form.revenueRange}
                onChange={(e) => update('revenueRange', e.target.value)}
                className={inputClass}
              >
                <option value="">Select a range</option>
                {REVENUE_RANGES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {error && (
              <p className="text-[#E05555] text-[14px] font-[family-name:var(--font-body)]">{error}</p>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-orange)] text-white font-[family-name:var(--font-body)] font-semibold px-7 py-3.5 rounded-full hover:brightness-110 transition-all text-[15px] tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Starting...' : 'Start the Audit \u2192'}
              </button>
              <p className="text-[11px] text-[#4A5A78] font-[family-name:var(--font-body)] mt-4 text-center leading-relaxed">
                By starting this assessment, you agree that Fox Haven Group may use your responses to generate a personalized report. Your information is kept confidential and never sold to third parties. See our{' '}
                <a href="https://foxhavengrouphq.com/privacy" className="text-[#9BAAC2] underline hover:text-[var(--color-orange)] transition-colors">
                  privacy policy
                </a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
