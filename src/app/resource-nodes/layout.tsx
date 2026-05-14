import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resource Nodes — Phoenix Heat Relief Network',
  description:
    'Live map of cooling centers, hydration stations, mobile units, and shelters across the Phoenix metro — the resource network powering the Fox Haven Heat Relief App.',
  openGraph: {
    title: 'Resource Nodes — Phoenix Heat Relief Network',
    description:
      'Cooling centers, hydration stations, mobile units, and shelters across Phoenix.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/resource-nodes',
  },
};

export default function ResourceNodesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
