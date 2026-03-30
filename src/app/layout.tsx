import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import ScrollRevealProvider from '@/components/ScrollRevealProvider';
import IntentWidget from '@/components/intent-widget/IntentWidget';
import { ExperienceProviders } from '@/components/ExperienceProviders';

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant-garamond',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
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
  title: 'Fox Haven Group — Building a Better Haven for Every Family',
  description:
    'Fox Haven Group develops technology and infrastructure that protect lives, empower communities, and simplify modern family life — starting in Phoenix, AZ.',
  keywords:
    'Fox Haven Group, heat relief, solar shelters, Phoenix, family app, community innovation, heat emergency',
  openGraph: {
    title: 'Fox Haven Group — Building a Better Haven for Every Family',
    description:
      'Solar heat relief shelters, a life-saving mobile app, and a family management platform — built for real communities.',
    type: 'website',
    url: 'https://foxhavengroup.org',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <ExperienceProviders>
          <ScrollRevealProvider />
          {children}
          <IntentWidget />
        </ExperienceProviders>
      </body>
    </html>
  );
}
