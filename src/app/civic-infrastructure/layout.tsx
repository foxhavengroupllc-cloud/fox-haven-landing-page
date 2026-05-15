import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Civic Infrastructure | Fox Haven Group',
  description:
    'Civic Infrastructure: the connective tissue that lets cities, healthcare providers, and community organizations share operational signals without sharing silos.',
  openGraph: {
    title: 'Civic Infrastructure | Fox Haven Group',
    description:
      'The connective tissue layer of the Fox Haven platform. Resilient systems, smarter communities.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/civic-infrastructure',
  },
};

export default function CivicInfrastructureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
