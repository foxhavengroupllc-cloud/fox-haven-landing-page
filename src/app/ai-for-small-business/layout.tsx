import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Solutions for Everyone | Fox Haven Group HQ',
  description:
    'Fox Haven builds AI-powered automation that eliminates the repetitive, manual drag costing your business time and money. Start with a free operational audit.',
  openGraph: {
    title: 'AI Solutions for Everyone | Fox Haven Group HQ',
    description:
      'Stop losing $28K–$65K/year to fixable process drag. Get a free scored audit in 15 minutes.',
    url: 'https://foxhavengrouphq.com/ai-for-small-business',
  },
};

export default function AISmallBizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
