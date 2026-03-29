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
    <div className="min-h-screen bg-deep-slate flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-14 h-14 bg-heat-amber/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="display-text text-heat-amber text-2xl">!</span>
        </div>
        <h1 className="display-text text-white mb-3" style={{ fontSize: '1.75rem' }}>
          Something went wrong
        </h1>
        <p className="font-body text-white/50 text-sm leading-relaxed mb-8">
          We encountered an unexpected error. If you need immediate assistance, please contact us directly.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-heat-amber hover:bg-heat-amber-light text-white rounded-full font-body text-sm font-semibold transition-colors cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
