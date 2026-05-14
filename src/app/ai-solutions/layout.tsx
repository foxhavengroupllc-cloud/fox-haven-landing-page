import type { Metadata } from 'next';
import AISolutionsShell from '@/components/ai-solutions/AISolutionsShell';

export const metadata: Metadata = {
  title: 'AI Solutions | Fox Haven Group',
  description:
    'AI-powered automation, custom agents, and strategy consulting for everyone. Start with a free audit and see where AI can move the needle.',
  openGraph: {
    title: 'AI Solutions — Fox Haven Group',
    description:
      'Eight specialized AI services designed to eliminate process drag and recover lost revenue — for everyone.',
    url: 'https://foxhavengrouphq.com/ai-solutions',
  },
};

export default function AISolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AISolutionsShell>{children}</AISolutionsShell>;
}
