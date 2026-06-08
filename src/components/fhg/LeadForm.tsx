'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/fhg.module.css';

const interests = [
  { value: 'systems-diagnostic', label: 'Systems Diagnostic' },
  { value: 'implementation-blueprint', label: 'Implementation Blueprint' },
  { value: 'ta-partner', label: 'Technical Assistance Partnership' },
  { value: 'systems-change', label: 'Systems Change Initiative' },
  { value: 'training', label: 'Training or Facilitation' },
  { value: 'other', label: 'Something else' },
];

type Status = 'idle' | 'submitting' | 'ok' | 'error';

export default function LeadForm({ source = 'contact-page' }: { source?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const interestValue = String(data.get('interest') ?? '');
    const interestLabel = interests.find((i) => i.value === interestValue)?.label ?? 'General';
    const note = String(data.get('message') ?? '').trim();

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.get('fullName'),
          email: data.get('email'),
          company: data.get('organization'),
          painPoint: note ? `${interestLabel} — ${note}` : interestLabel,
          source,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Submission failed.');
      }

      setStatus('ok');
      form.reset();
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fieldRow}>
        <label className={styles.field}>
          <span className={styles.label}>Name <span>*</span></span>
          <input className={styles.input} name="fullName" type="text" required maxLength={200} autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email <span>*</span></span>
          <input className={styles.input} name="email" type="email" required maxLength={254} autoComplete="email" />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Organization</span>
        <input className={styles.input} name="organization" type="text" maxLength={200} autoComplete="organization" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>What can we help with?</span>
        <select className={styles.select} name="interest" defaultValue="systems-diagnostic">
          {interests.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Tell us about the work</span>
        <textarea
          className={styles.textarea}
          name="message"
          maxLength={500}
          placeholder="The system you're trying to move, who's involved, and where it's stuck."
        />
      </label>

      {status === 'ok' && (
        <p className={`${styles.formStatus} ${styles.formStatusOk}`}>
          Your message is in. We&rsquo;ll reply within two business days.
        </p>
      )}
      {status === 'error' && (
        <p className={`${styles.formStatus} ${styles.formStatusErr}`}>{message}</p>
      )}

      <button className={`${styles.btn} ${styles.btnPrimary} ${styles.submit}`} type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Start a Conversation'}
        <ArrowRight size={16} className="arrow" />
      </button>

      <p className={styles.formNote}>
        Prefer email? Reach us at{' '}
        <a href="mailto:hello@foxhavengrouphq.com" style={{ color: 'var(--teal)' }}>
          hello@foxhavengrouphq.com
        </a>
        .
      </p>
    </form>
  );
}
