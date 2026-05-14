import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Coordination Layer — Fox Haven Group',
  description:
    'The AI coordination layer that orchestrates Fox Haven Heat Relief operations: ingesting civic signals, scoring zone priority, dispatching resources, and keeping humans in the loop.',
  openGraph: {
    title: 'AI Coordination Layer — Fox Haven Group',
    description:
      'The reasoning layer that turns civic signals and resource inventory into operator-ready decisions across 128 active zones.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/ai-coordination-layer',
  },
};

export default function AiCoordinationLayerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
