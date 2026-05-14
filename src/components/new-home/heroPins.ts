export type HeroPin = {
  id: string;
  label: string;
  href: string;
  desktop: { x: string; y: string };
  tablet: { x: string; y: string };
  mobile: { x: string; y: string };
};

export const heroPins: HeroPin[] = [
  {
    id: 'heat-relief-app',
    label: 'Phoenix Heat Relief App',
    href: '/preview/new-home/heat-relief-app',
    desktop: { x: '42%', y: '51%' },
    tablet: { x: '38%', y: '52%' },
    mobile: { x: '34%', y: '56%' },
  },
  {
    id: 'solar-shelters',
    label: 'Solar Shelters',
    href: '/preview/new-home/solar-shelters',
    desktop: { x: '68%', y: '59%' },
    tablet: { x: '66%', y: '58%' },
    mobile: { x: '64%', y: '62%' },
  },
];
