'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import type { CompanyInput } from '@/lib/pitch/types';

const INDUSTRIES = [
  'Home Services',
  'Professional Services',
  'Law Firm',
  'Healthcare Practice',
  'Small Defense Contractor',
  'Local Services',
  'Other',
] as const;

const EMPLOYEE_RANGES = ['1-5', '6-20', '21-50', '51-100', '101-250', '250+'] as const;

const REVENUE_BANDS = [
  'Under $250K',
  '$250K-$1M',
  '$1M-$5M',
  '$5M-$20M',
  '$20M+',
] as const;

interface Props {
  onSubmit: (input: CompanyInput) => void;
  isLoading: boolean;
}

export default function CompanyInputForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState<CompanyInput>({
    companyName: '',
    websiteUrl: '',
    industry: 'Professional Services',
    employeeRange: undefined,
    revenueBand: undefined,
    contactName: '',
    contactTitle: '',
    notes: '',
    auditFindings: '',
    useWebsiteEnrichment: true,
  });
  const [showAudit, setShowAudit] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof CompanyInput>(key: K, value: CompanyInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.companyName.trim()) errs.companyName = 'Required';
    if (!form.industry) errs.industry = 'Required';
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Company Name"
          required
          error={errors.companyName}
        >
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => update('companyName', e.target.value)}
            placeholder="Acme Plumbing Co."
            className={inputClass}
            disabled={isLoading}
          />
        </Field>

        <Field label="Website URL">
          <input
            type="url"
            value={form.websiteUrl}
            onChange={(e) => update('websiteUrl', e.target.value)}
            placeholder="https://acmeplumbing.com"
            className={inputClass}
            disabled={isLoading}
          />
        </Field>

        <Field label="Industry" required error={errors.industry}>
          <select
            value={form.industry}
            onChange={(e) => update('industry', e.target.value as CompanyInput['industry'])}
            className={inputClass}
            disabled={isLoading}
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Employee Range">
          <select
            value={form.employeeRange ?? ''}
            onChange={(e) =>
              update(
                'employeeRange',
                (e.target.value || undefined) as CompanyInput['employeeRange'],
              )
            }
            className={inputClass}
            disabled={isLoading}
          >
            <option value="">Select...</option>
            {EMPLOYEE_RANGES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Revenue Band">
          <select
            value={form.revenueBand ?? ''}
            onChange={(e) =>
              update(
                'revenueBand',
                (e.target.value || undefined) as CompanyInput['revenueBand'],
              )
            }
            className={inputClass}
            disabled={isLoading}
          >
            <option value="">Select...</option>
            {REVENUE_BANDS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Contact Name">
          <input
            type="text"
            value={form.contactName}
            onChange={(e) => update('contactName', e.target.value)}
            placeholder="Jane Smith"
            className={inputClass}
            disabled={isLoading}
          />
        </Field>

        <Field label="Contact Title">
          <input
            type="text"
            value={form.contactTitle}
            onChange={(e) => update('contactTitle', e.target.value)}
            placeholder="VP of Operations"
            className={inputClass}
            disabled={isLoading}
          />
        </Field>
      </div>

      <Field label="Notes">
        <textarea
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Additional context, specific pain points mentioned, or meeting notes..."
          rows={3}
          className={cn(inputClass, 'resize-none')}
          disabled={isLoading}
        />
      </Field>

      <div className="border border-white/[.08] rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowAudit(!showAudit)}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[.02] transition-colors"
          disabled={isLoading}
        >
          <span className="text-[12px] tracking-[.06em] uppercase text-white/50 font-medium">
            AI Audit Results
          </span>
          <span className={cn(
            'text-white/30 text-[13px] transition-transform',
            showAudit && 'rotate-180',
          )}>
            ▼
          </span>
        </button>
        {showAudit && (
          <div className="px-4 pb-4">
            <p className="text-[12px] text-white/30 mb-2">
              Paste findings from a completed AI Solutions Audit. The deck will use verified data instead of estimates.
            </p>
            <textarea
              value={form.auditFindings}
              onChange={(e) => update('auditFindings', e.target.value)}
              placeholder={`Score: 42/100 (Needs Work)\nInefficiency estimate: $28K–$56K/year\n\nOpportunities:\n- Automate sales follow-up ($8K–$30K/yr)\n- Eliminate duplicate data entry ($5K–$20K/yr)\n\nBlockers:\n- No owner for process improvement (Critical)\n- High resistance to change (Moderate)\n\nKey findings:\n- Lead response time > 24 hours\n- 10+ hours/week on manual admin\n- All follow-up is manual`}
              rows={8}
              className={cn(inputClass, 'resize-none text-[13px]')}
              disabled={isLoading}
            />
          </div>
        )}
      </div>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={form.useWebsiteEnrichment}
          onChange={(e) => update('useWebsiteEnrichment', e.target.checked)}
          className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#e05e14] focus:ring-[#e05e14]/30"
          disabled={isLoading}
        />
        <span className="text-[13px] text-white/60 group-hover:text-white/80 transition-colors">
          Enrich from website (infer services and friction points)
        </span>
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          'w-full py-3.5 rounded-xl font-semibold text-[14px] tracking-[.03em] transition-all',
          'bg-[#e05e14] text-white hover:bg-[#c4500f] active:scale-[.98]',
          isLoading && 'opacity-50 cursor-not-allowed',
        )}
      >
        {isLoading ? 'Generating...' : 'Generate Pitch Deck'}
      </button>
    </form>
  );
}

const inputClass =
  'w-full bg-white/[.04] border border-white/[.1] rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:border-[#e05e14]/50 focus:ring-2 focus:ring-[#e05e14]/20 focus:outline-none transition-colors disabled:opacity-40';

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] tracking-[.08em] uppercase text-white/40 mb-1.5 font-medium">
        {label}
        {required && <span className="text-[#e05e14] ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
