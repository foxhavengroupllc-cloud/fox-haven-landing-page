import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Mission — Fox Haven Group',
  description:
    'A haven isn\'t just a place — it\'s a feeling of safety, connection, and possibility. The values and principles behind Fox Haven Group\'s civic systems.',
  openGraph: {
    title: 'Our Mission — Fox Haven Group',
    description:
      'Why we build civic systems for a hotter world: community first, innovation with purpose, scalable impact.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/mission',
  },
};

export default function MissionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
