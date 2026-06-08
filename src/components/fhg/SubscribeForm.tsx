'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/fhg.module.css';

type Status = 'idle' | 'submitting' | 'ok' | 'error';

/** Lightweight newsletter signup for the footer; posts to the existing /api/leads. */
export default function SubscribeForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Newsletter subscriber',
          email,
          painPoint: 'Field Notes subscription',
          source: 'newsletter',
        }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return <p className={styles.subscribeOk}>You&rsquo;re on the list. Field notes incoming.</p>;
  }

  return (
    <form className={styles.subscribe} onSubmit={handleSubmit}>
      <input
        className={styles.subscribeInput}
        type="email"
        name="email"
        required
        placeholder="Your email address"
        aria-label="Your email address"
      />
      <button className={styles.subscribeBtn} type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Subscribe'}
        <ArrowRight size={15} className="arrow" />
      </button>
      {status === 'error' && <span className={styles.subscribeErr}>Something went wrong — try again.</span>}
    </form>
  );
}
