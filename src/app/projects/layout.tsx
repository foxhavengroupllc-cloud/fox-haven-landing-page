import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Fox Haven Group',
  description:
    'What Fox Haven Group is building right now: Heat Relief App, Solar Cooling Shelters, System Solutions, and the Phoenix Heat Relief Network.',
  openGraph: {
    title: 'Projects — Fox Haven Group',
    description:
      'Active Fox Haven Group initiatives — Heat Relief App, Solar Cooling Shelters, and System Solutions, deploying in Phoenix.',
    type: 'website',
    url: 'https://foxhavengrouphq.com/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
