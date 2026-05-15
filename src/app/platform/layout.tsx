import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Platform | Fox Haven Group',
  description:
    'Systems for human-centered outcomes. Civic infrastructure, population flow, AI concierge, and operational worlds, the platform behind every Fox Haven Group initiative.',
  openGraph: {
    title: 'The Platform | Fox Haven Group',
    description:
      'Systems for human-centered outcomes. The platform behind every Fox Haven Group initiative.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/platform',
  },
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return children;
}
