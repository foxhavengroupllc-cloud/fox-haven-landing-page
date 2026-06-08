import type { Metadata } from 'next';
import { DM_Sans, DM_Mono, Playfair_Display, Anton } from 'next/font/google';
import './globals.css';
import ScrollRevealProvider from '@/components/ScrollRevealProvider';

// Heavy condensed "poster" display face for the Civic Grit headlines.
const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

// Editorial serif kept available for interior pages.
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fox Haven Group | Evidence into Action. Systems into Motion.',
  description:
    'Fox Haven Group helps public agencies, nonprofits, coalitions, and community systems turn evidence, policy, and strategy into implementation that works in real-world conditions.',
  keywords:
    'Fox Haven Group, implementation science, systems change, technical assistance, policy translation, public health, public safety, behavioral health, strategic planning, evaluation, Phoenix',
  openGraph: {
    title: 'Fox Haven Group | Evidence into Action. Systems into Motion.',
    description:
      'An implementation and systems-change firm for public health, public safety, behavioral health, and community systems. We close the gap between what works and what happens.',
    type: 'website',
    url: 'https://foxhavengrouphq.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="antialiased">
        <ScrollRevealProvider />
        {children}
      </body>
    </html>
  );
}
