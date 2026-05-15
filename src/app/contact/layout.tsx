import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Fox Haven Group',
  description:
    'Get in touch with Fox Haven Group. Partner inquiries, AI assessment requests, press, and general questions, every message reaches a real human.',
  openGraph: {
    title: 'Contact | Fox Haven Group',
    description:
      'Get in touch with Fox Haven Group. Every message reaches a real human within two business days.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
