import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Population Flow | Fox Haven Group',
  description:
    'Heat Relief Deployment Intelligence, a privacy-first civic intelligence layer for identifying high-priority outdoor heat-exposure zones across Phoenix before relief resources are deployed.',
  openGraph: {
    title: 'Population Flow | Fox Haven Group',
    description:
      'Urban activity pulse from public signals. A Fox Haven platform layer for operators who need to act, not surveil.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/population-flow',
  },
};

export default function PopulationFlowLayout({ children }: { children: React.ReactNode }) {
  return children;
}
