'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

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
  '$500K–$2M',
  '$2M–$10M',
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

  return (
    <main className={styles.pageShell}>
      <Header />

      {/* ── Hero + form ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ AI SOLUTIONS FOR EVERYONE · FREE ASSESSMENT</p>
          <h2>Find out what your business is losing to inefficiency.</h2>
          <p>
            Answer 12&ndash;15 questions. Get a scored report with concrete opportunities — in
            under 5 minutes. No commitment, no spam, no sales-call pressure.
          </p>

          <div className={styles.auditCallout}>
            <span className={styles.auditCalloutValue}>$28K – $65K</span>
            <span className={styles.auditCalloutLabel}>
              Average annual loss to fixable process drag in the businesses we assess
            </span>
          </div>
        </div>

        <form className={styles.detailLeadForm} onSubmit={handleSubmit}>
          <div className={styles.auditField}>
            <label className={styles.auditLabel} htmlFor="audit-name">
              Full Name <span className={styles.auditRequired}>*</span>
            </label>
            <input
              id="audit-name"
              type="text"
              required
              value={form.respondentName}
              onChange={(e) => update('respondentName', e.target.value)}
              className={styles.auditInput}
              placeholder="Jane Smith"
            />
          </div>

          <div className={styles.auditField}>
            <label className={styles.auditLabel} htmlFor="audit-title">
              Your Role / Title <span className={styles.auditRequired}>*</span>
            </label>
            <input
              id="audit-title"
              type="text"
              required
              value={form.respondentTitle}
              onChange={(e) => update('respondentTitle', e.target.value)}
              className={styles.auditInput}
              placeholder="Operations Manager"
            />
          </div>

          <div className={styles.auditField}>
            <label className={styles.auditLabel} htmlFor="audit-company">
              Company Name <span className={styles.auditRequired}>*</span>
            </label>
            <input
              id="audit-company"
              type="text"
              required
              value={form.companyName}
              onChange={(e) => update('companyName', e.target.value)}
              className={styles.auditInput}
              placeholder="Acme Corp"
            />
          </div>

          <div className={styles.auditField}>
            <label className={styles.auditLabel} htmlFor="audit-email">
              Work Email <span className={styles.auditRequired}>*</span>
            </label>
            <input
              id="audit-email"
              type="email"
              required
              value={form.respondentEmail}
              onChange={(e) => update('respondentEmail', e.target.value)}
              className={styles.auditInput}
              placeholder="jane@acmecorp.com"
            />
            <p className={styles.auditHelper}>Results sent here. No spam.</p>
          </div>

          <div className={styles.auditField}>
            <label className={styles.auditLabel} htmlFor="audit-industry">
              Industry
            </label>
            <select
              id="audit-industry"
              value={form.industry}
              onChange={(e) => update('industry', e.target.value)}
              className={styles.auditInput}
            >
              <option value="">Select your industry</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.auditField}>
            <label className={styles.auditLabel} htmlFor="audit-revenue">
              Approximate Annual Revenue
            </label>
            <select
              id="audit-revenue"
              value={form.revenueRange}
              onChange={(e) => update('revenueRange', e.target.value)}
              className={styles.auditInput}
            >
              <option value="">Select a range</option>
              {REVENUE_RANGES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {error && <p className={styles.auditError}>{error}</p>}

          <button type="submit" disabled={loading} className={styles.auditSubmit}>
            {loading ? 'Starting…' : 'Start the Audit'}
            <span className={styles.linkArrow} aria-hidden="true">
              →
            </span>
          </button>

          <p className={styles.auditFooterCopy}>
            By starting this assessment, you agree that Fox Haven Group may use your responses to
            generate a personalised report. Your information is kept confidential and never sold
            to third parties. See our{' '}
            <Link href="https://foxhavengrouphq.com/privacy" className={styles.auditFooterLink}>
              privacy policy
            </Link>
            .
          </p>
        </form>
      </section>

      <Footer />
    </main>
  );
}
