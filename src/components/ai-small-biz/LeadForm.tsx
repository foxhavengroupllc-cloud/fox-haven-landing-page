'use client';

import { useState } from 'react';

const PAIN_POINTS = [
  { value: '', label: 'Select the biggest drag...' },
  { value: 'lead_response', label: 'Slow lead response & follow-up' },
  { value: 'reporting', label: 'Manual reporting & data pulls' },
  { value: 'scheduling', label: 'Scheduling & calendar chaos' },
  { value: 'duplicate_entry', label: 'Duplicate data entry between systems' },
  { value: 'not_sure', label: 'Not sure, need the audit first' },
];

interface LeadFormProps {
  source?: string;
}

export default function LeadForm({ source = 'ai-small-biz-page' }: LeadFormProps) {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  function validate() {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Name is required.';
    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Enter a valid email address.';
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    setServerError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          painPoint: painPoint || undefined,
          source,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="text-[#e05e14] text-xl font-semibold font-[family-name:var(--font-display)] mb-2">
          ✓ Audit link on its way.
        </div>
        <p className="text-[#94A3B8] text-sm">
          Check your inbox in the next few minutes. No spam, ever.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.08em] text-[#94A3B8] mb-1.5">
          Full Name *
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full bg-[#161D2E] border border-[#1E293B] rounded-lg px-[13px] py-[10px] text-[#F1F5F9] font-[family-name:var(--font-body)] text-sm focus:border-[#e05e14] focus:outline-none transition-colors placeholder:text-[#475569]"
          placeholder="Jane Doe"
        />
        {errors.fullName && (
          <p className="text-[#e05e14] text-xs mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.08em] text-[#94A3B8] mb-1.5">
          Company
        </label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full bg-[#161D2E] border border-[#1E293B] rounded-lg px-[13px] py-[10px] text-[#F1F5F9] font-[family-name:var(--font-body)] text-sm focus:border-[#e05e14] focus:outline-none transition-colors placeholder:text-[#475569]"
          placeholder="Acme Inc."
        />
      </div>

      {/* Work Email */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.08em] text-[#94A3B8] mb-1.5">
          Work Email *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#161D2E] border border-[#1E293B] rounded-lg px-[13px] py-[10px] text-[#F1F5F9] font-[family-name:var(--font-body)] text-sm focus:border-[#e05e14] focus:outline-none transition-colors placeholder:text-[#475569]"
          placeholder="jane@acme.com"
        />
        {errors.email && (
          <p className="text-[#e05e14] text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Pain Point */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.08em] text-[#94A3B8] mb-1.5">
          Biggest pain point
        </label>
        <select
          value={painPoint}
          onChange={(e) => setPainPoint(e.target.value)}
          className="w-full bg-[#161D2E] border border-[#1E293B] rounded-lg px-[13px] py-[10px] text-[#F1F5F9] font-[family-name:var(--font-body)] text-sm focus:border-[#e05e14] focus:outline-none transition-colors appearance-none"
        >
          {PAIN_POINTS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-[#e05e14] text-white font-semibold rounded-md px-6 py-2 text-[13px] transition-opacity disabled:opacity-60 cursor-pointer hover:bg-[#c4500f]"
      >
        {status === 'loading' ? 'Sending...' : 'Get your free audit →'}
      </button>

      {status === 'error' && serverError && (
        <p className="text-[#e05e14] text-xs text-center">{serverError}</p>
      )}
    </form>
  );
}
