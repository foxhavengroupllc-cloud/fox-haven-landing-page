'use client';

import { useState } from 'react';
import styles from '@/styles/design-system.module.css';

const PARTNER_TYPES = [
  { value: '', label: 'Select your organization type…' },
  { value: 'city_agency', label: 'City / county / agency' },
  { value: 'community_org', label: 'Community organization / nonprofit' },
  { value: 'healthcare', label: 'Healthcare provider' },
  { value: 'business', label: 'Mission-aligned business' },
  { value: 'funder', label: 'Funder / sponsor' },
  { value: 'beta', label: 'Beta tester / individual' },
  { value: 'other', label: 'Other' },
];

interface PartnerLeadFormProps {
  source?: string;
}

/**
 * Partner / beta interest form. Submits to /api/leads with a partner-specific
 * source so the inbox can route it correctly. Reuses the cream-themed audit
 * form styles for visual consistency with the rest of the design system.
 */
export default function PartnerLeadForm({ source = 'partner-page' }: PartnerLeadFormProps) {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [partnerType, setPartnerType] = useState('');
  const [message, setMessage] = useState('');
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
      // Combine partner type + free-form note into pain_point so it shows up
      // in the lead email without changing the leads table schema.
      const painPointParts = [partnerType, message.trim()].filter(Boolean);
      const composedPainPoint = painPointParts.length > 0 ? painPointParts.join(' — ') : undefined;

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          company: organization.trim() || undefined,
          painPoint: composedPainPoint,
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
      <div className={styles.detailLeadForm} style={{ textAlign: 'center', padding: '2rem 1.4rem' }}>
        <p className={styles.eyebrow} style={{ marginBottom: '0.4rem' }}>◆ THANK YOU</p>
        <h3 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
          Your message is in.
        </h3>
        <p className={styles.auditFooterCopy} style={{ marginTop: 0 }}>
          We&rsquo;ll reply within two business days. No automated drip — a real human at Fox
          Haven will read it.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.detailLeadForm} onSubmit={handleSubmit}>
      <div className={styles.auditField}>
        <label className={styles.auditLabel} htmlFor="partner-name">
          Full Name <span className={styles.auditRequired}>*</span>
        </label>
        <input
          id="partner-name"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={styles.auditInput}
          placeholder="Jane Doe"
        />
        {errors.fullName && <p className={styles.auditHelper} style={{ color: '#b81d1d' }}>{errors.fullName}</p>}
      </div>

      <div className={styles.auditField}>
        <label className={styles.auditLabel} htmlFor="partner-org">
          Organization
        </label>
        <input
          id="partner-org"
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className={styles.auditInput}
          placeholder="City of Phoenix · ASU · Acme Co."
        />
      </div>

      <div className={styles.auditField}>
        <label className={styles.auditLabel} htmlFor="partner-email">
          Work Email <span className={styles.auditRequired}>*</span>
        </label>
        <input
          id="partner-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.auditInput}
          placeholder="jane@example.com"
        />
        {errors.email && <p className={styles.auditHelper} style={{ color: '#b81d1d' }}>{errors.email}</p>}
      </div>

      <div className={styles.auditField}>
        <label className={styles.auditLabel} htmlFor="partner-type">
          Partnership type
        </label>
        <select
          id="partner-type"
          value={partnerType}
          onChange={(e) => setPartnerType(e.target.value)}
          className={styles.auditInput}
        >
          {PARTNER_TYPES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.auditField}>
        <label className={styles.auditLabel} htmlFor="partner-message">
          What would you like to build together?
        </label>
        <textarea
          id="partner-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.auditInput}
          rows={4}
          placeholder="A short note about your goals, audience, or scope. We read every message."
          style={{ resize: 'vertical' }}
        />
      </div>

      {status === 'error' && serverError && (
        <p className={styles.auditError}>{serverError}</p>
      )}

      <button type="submit" disabled={status === 'loading'} className={styles.auditSubmit}>
        {status === 'loading' ? 'Sending…' : 'Send your message'}
        <span aria-hidden="true">→</span>
      </button>

      <p className={styles.auditFooterCopy}>
        Free · Two business-day reply · Real human on the other end
      </p>
    </form>
  );
}
