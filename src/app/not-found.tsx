import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-deep-slate flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="display-text text-heat-amber/20 leading-none mb-4" style={{ fontSize: '8rem' }}>
          404
        </div>
        <h1 className="display-text text-white mb-3" style={{ fontSize: '1.75rem' }}>
          Page not found
        </h1>
        <p className="font-body text-white/50 text-sm leading-relaxed mb-8">
          This page doesn&apos;t exist. Return home to explore Fox Haven&apos;s initiatives.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-heat-amber hover:bg-heat-amber-light text-white rounded-full font-body text-sm font-semibold transition-colors"
        >
          ← Back home
        </Link>
      </div>
    </div>
  );
}
