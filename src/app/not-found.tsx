import Link from 'next/link';

export default function NotFound() {
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
            fontFamily: 'var(--fhg-display)',
            fontSize: 'clamp(6rem, 18vw, 10rem)',
            lineHeight: 1,
            color: 'var(--teal)',
          }}
        >
          404
        </div>
        <h1 style={{ fontFamily: 'var(--fhg-display)', fontSize: '1.9rem', margin: '0.5rem 0 0.75rem' }}>
          Page not found
        </h1>
        <p style={{ color: 'var(--concrete)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          This page doesn&rsquo;t exist. Head back home to explore how we close the implementation gap.
        </p>
        <Link
          href="/"
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
          ← Back home
        </Link>
      </div>
    </div>
  );
}
