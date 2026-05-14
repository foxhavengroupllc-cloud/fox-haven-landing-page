import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner With Us — Fox Haven Group',
  description:
    'Build the first deployable heat resilience network in Phoenix. Fox Haven Group partners with city agencies, community organizations, healthcare providers, and mission-aligned businesses.',
  openGraph: {
    title: 'Partner With Us — Fox Haven Group',
    description:
      'Build the first deployable heat resilience network in Phoenix. We partner with cities, communities, healthcare, and businesses ready to move now.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/partner',
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
