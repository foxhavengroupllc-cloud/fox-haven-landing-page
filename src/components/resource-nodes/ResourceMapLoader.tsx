'use client';

import dynamic from 'next/dynamic';

/**
 * Client-side wrapper around the Leaflet ResourceMap. In Next.js 16,
 * `dynamic(..., { ssr: false })` can only be used from a Client
 * Component, so this thin wrapper exists to hold the dynamic import
 * boundary. The Resource Nodes page (a Server Component) imports this
 * loader instead of the map directly.
 */
const ResourceMap = dynamic(() => import('./ResourceMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#0a1628]">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#f1a13a]">
        Loading Phoenix map…
      </p>
    </div>
  ),
});

export default function ResourceMapLoader() {
  return <ResourceMap />;
}
