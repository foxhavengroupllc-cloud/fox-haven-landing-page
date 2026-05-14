import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Operational Worlds — Fox Haven Group',
  description:
    'Operational Worlds: a simulation layer for the operations teams running heat-relief deployments. Model what happens before committing to it.',
  openGraph: {
    title: 'Operational Worlds — Fox Haven Group',
    description:
      'Design, simulate, and operate living worlds. The Fox Haven simulation layer for operations teams.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/operational-worlds',
  },
};

export default function OperationalWorldsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
