import type { Initiative, Action } from './intent-types';

export interface PerformanceStat {
  value: string;
  label: string;
}

export interface InitiativeConfig {
  id: Initiative;
  number: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  details: string[];
  status: string;
  statusType: 'development' | 'beta' | 'coming-soon';
  primaryAction: Action;
  accentColor: string;
  bgClass: string;
  /** Route for the full immersive experience page */
  experienceHref: string;
  /** CTA label for the experience entry link */
  experienceLabel: string;
  /** Optional performance stats for initiatives with measurable targets */
  performanceStats?: PerformanceStat[];
  /** Optional crisis context blurb */
  crisisContext?: string;
}

export const INITIATIVES: InitiativeConfig[] = [
  {
    id: 'heat-relief-shelters',
    number: '01',
    name: 'Heat Relief Solar Shelters',
    shortName: 'Solar Shelters',
    tagline: 'Thermal-relief micro-infrastructure — where people need it most.',
    description:
      'Modular, solar-powered cooling shelters that deliver measurable thermal-stress reduction at bus stops, park nodes, and the last-mile walking routes where heat exposure is highest. Not just shade — insulated R-16 panels, radiant cooling surfaces, high-airflow fans, and emergency charging, all powered 100% off-grid by rooftop PV.',
    details: [
      'Measurable ≥30% thermal stress reduction, benchmarked against unshaded conditions',
      'Rapid deploy: two-person crew, under 2 hours, no permanent foundation required',
      'ADA-compliant design with wheelchair-integrated seating and QR emergency call',
      'Pre-packaged municipal compliance: NRTL-listed electrical, permitting-aligned, documented O&M',
      '8–12 seated capacity plus 6–10 standing in a 150–200 sq ft modular footprint',
      'Solar + battery: operational during grid outages with PV surplus to spare',
    ],
    status: 'In development — pilot launching Summer 2026',
    statusType: 'development',
    primaryAction: { label: 'Partner with us', scrollTo: '#cta' },
    accentColor: '#E8821A',
    bgClass: 'bg-heat-amber',
    experienceHref: '/initiatives/solar-shelter',
    experienceLabel: 'Experience the shelter',
    crisisContext:
      'Phoenix has institutionalized extreme-heat response as a municipal priority, but people still die on the walk to relief — not inside it. Our shelters fill the critical gap between indoor cooling centers and simple shade canopies.',
    performanceStats: [
      { value: '≥30%', label: 'Thermal stress reduction' },
      { value: '30–40°F', label: 'MRT reduction' },
      { value: '<2 hrs', label: 'Deployment time' },
      { value: '100%', label: 'Solar powered' },
    ],
  },
  {
    id: 'heat-relief-app',
    number: '02',
    name: 'Heat Relief App',
    shortName: 'Heat Relief App',
    tagline: 'Real-time alerts that save lives.',
    description:
      'A mobile platform connecting Phoenix residents to life-saving heat emergency alerts, live cooling center maps, automated wellness check-ins for vulnerable residents, and route safety scores.',
    details: [
      'Push alerts for extreme heat warnings',
      'Live map of cooling centers & misting stations',
      'Wellness check-ins for elderly residents',
      'Walking routes scored by heat exposure risk',
    ],
    status: 'Beta launching soon — join the waitlist',
    statusType: 'beta',
    primaryAction: { label: 'Join the beta', scrollTo: '#cta' },
    accentColor: '#1A6B9A',
    bgClass: 'bg-sky-blue',
    experienceHref: '/initiatives/heat-relief-app',
    experienceLabel: 'Experience the app',
  },
  {
    id: 'family-hub',
    number: '03',
    name: 'Balm — Family Control Center',
    shortName: 'Balm',
    tagline: 'Stop carrying it alone.',
    description:
      'Balm is a live family coordination platform that tracks mental load, syncs schedules, and gives every household member a way to contribute — powered by AI that takes action, not just chat.',
    details: [
      '200+ task templates, recurring tasks, assign to anyone including kids',
      'Mental load dashboard — weekly reports showing who carries what',
      'Shared calendar with Google & Outlook sync, color-coded by person',
      'AI assistant (GPT-4o) that acts on your behalf, not just suggests',
    ],
    status: 'Live now — free to join',
    statusType: 'beta',
    primaryAction: { label: 'Try Balm free', href: 'https://balm-puyebvbqba-uc.a.run.app/signup' },
    accentColor: '#0D4F73',
    bgClass: 'bg-sky-blue-deep',
    experienceHref: '/initiatives/family-brain',
    experienceLabel: 'Experience the hub',
  },
];

export const EMERGENCY_KEYWORDS = [
  'emergency',
  'dying',
  'heat stroke',
  'heatstroke',
  'unconscious',
  'collapsed',
  'passed out',
  'not breathing',
  'heart attack',
  'ambulance',
  '911',
  'help me',
  'need help now',
  'critical',
  'life threatening',
  'overheating',
  'heat exhaustion',
  'fainted',
  'seizure',
  'can\'t breathe',
  'can\'t stand',
  'dizziness severe',
];

export function isEmergencyIntent(input: string): boolean {
  const lower = input.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

export function getInitiativeContext(): string {
  return INITIATIVES.map((init) => {
    const lines = [
      `Initiative: ${init.name}`,
      `Tagline: ${init.tagline}`,
      `Description: ${init.description}`,
      `Status: ${init.status}`,
    ];
    if (init.primaryAction.href) {
      lines.push(`Link: ${init.primaryAction.href}`);
    }
    return lines.join('\n');
  }).join('\n\n');
}
