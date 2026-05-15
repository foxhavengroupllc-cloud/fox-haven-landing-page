import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Concierge — Fox Haven Group',
  description:
    'AI Concierge: the conversational layer that meets residents where they are — text, web, or in person — and routes them to real help, with a human always one tap away.',
  openGraph: {
    title: 'AI Concierge — Fox Haven Group',
    description:
      'Ask. Understand. Get things done. The Fox Haven conversational layer for residents and operators.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/ai-concierge',
  },
};

export default function AiConciergeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
