'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[Fox Haven] Page error:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100svh',
        background: 'var(--asphalt)',
        color: 'var(--bone)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '30rem' }}>
        <div
          style={{
            width: '3.5rem',
            height: '3.5rem',
            margin: '0 auto 1.5rem',
            display: 'grid',
            placeItems: 'center',
            border: '1px solid var(--gold)',
            borderRadius: '3px',
            color: 'var(--gold)',
            fontFamily: 'var(--fhg-display)',
            fontSize: '1.6rem',
          }}
        >
          !
        </div>
        <h1 style={{ fontFamily: 'var(--fhg-display)', fontSize: '1.9rem', margin: '0 0 0.75rem' }}>
          Something went wrong
        </h1>
        <p style={{ color: 'var(--concrete)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          We hit an unexpected error. Try again, or reach us directly at{' '}
          <a href="mailto:hello@foxhavengrouphq.com" style={{ color: 'var(--teal)' }}>
            hello@foxhavengrouphq.com
          </a>
          .
        </p>
        <button
          onClick={reset}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.9rem 1.5rem',
            background: 'var(--teal)',
            color: 'var(--asphalt)',
            borderRadius: '2px',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
