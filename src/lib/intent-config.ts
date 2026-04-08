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
    id: 'heat-relief-app',
    number: '01',
    name: 'Heat Relief App',
    shortName: 'Heat Relief App',
    tagline: 'Real-time alerts that save lives.',
    description:
      'A live dashboard connecting Phoenix residents to verified cooling centers, 3-day heat forecasts, real-time temperature data, and 52+ mapped locations — updated weekly from official sources.',
    details: [
      'Push alerts for extreme heat warnings',
      'Live map of cooling centers & misting stations',
      'Wellness check-ins for elderly residents',
      'Walking routes scored by heat exposure risk',
    ],
    status: 'Live now — free to use',
    statusType: 'beta',
    primaryAction: { label: 'Open the app', href: 'https://heat-relief-web-4ureop3cma-uc.a.run.app/' },
    accentColor: '#1A6B9A',
    bgClass: 'bg-sky-blue',
    experienceHref: '/initiatives/heat-relief-app',
    experienceLabel: 'Experience the app',
    performanceStats: [
      { value: '52+', label: 'Verified Centers' },
      { value: 'Live', label: 'Heat Data' },
      { value: '3-Day', label: 'Forecast' },
      { value: 'Free', label: 'Always' },
    ],
  },
  {
    id: 'heat-relief-shelters',
    number: '02',
    name: 'Open Solar Cooling Shelters',
    shortName: 'Solar Shelters',
    tagline: 'Permit-ready thermal relief — where people need it most.',
    description:
      'Open, noncombustible, solar-powered public shade and cooling shelters designed for Phoenix permitting. 24 ft × 24 ft steel-frame footprint with high-airflow DC fans, optional perimeter mist, 4.4 kWdc PV array, 14.3 kWh LFP battery — 100% off-grid, field-assembled in under 4 hours after site prep.',
    details: [
      '576 sq ft open-perimeter shelter — six HSS steel columns, four prefabricated roof cassettes',
      'Three-layer cooling: high-SRI roof shade, low-wattage ceiling fans, optional perimeter mist line',
      '4.4 kWdc solar + 14.3 kWh LFP battery + 6 kW off-grid inverter — runs during outages',
      '16 seated / 24–30 standing capacity with ADA 60-inch turning circle and accessible approach',
      'Under 4 hours field assembly (after foundations, permits, and site prep are complete)',
      'Framed against 2024 Phoenix Building Construction Code, 2023 NEC, and ICC A117.1 accessibility',
    ],
    status: 'Concept package complete — seeking partners',
    statusType: 'development',
    primaryAction: { label: 'Partner with us', scrollTo: '#cta' },
    accentColor: '#E8821A',
    bgClass: 'bg-heat-amber',
    experienceHref: '/initiatives/solar-shelter',
    experienceLabel: 'Experience the shelter',
    crisisContext:
      'Phoenix has institutionalized extreme-heat response as a municipal priority, but people still die on the walk to relief — not inside it. Our shelters fill the critical gap between indoor cooling centers and simple shade canopies.',
    performanceStats: [
      { value: '576', label: 'Sq Ft Footprint' },
      { value: '4.4kW', label: 'Solar Array' },
      { value: '<4 hrs', label: 'Field Assembly' },
      { value: '100%', label: 'Off-Grid' },
    ],
  },
  {
    id: 'ai-consulting',
    number: '03',
    name: 'AI for Small Business',
    shortName: 'AI Consulting',
    tagline: 'Smarter operations. Smaller footprint.',
    description:
      'We help small businesses bridge the gap between where they are today and where AI can take them — with strategies that are practical, affordable, and environmentally conscious. No bloated enterprise tools. No wasted compute. Just the right technology, deployed the right way.',
    details: [
      'AI readiness assessments tailored to your current tech stack and budget',
      'Workflow automation that reduces manual effort and energy consumption',
      'Green-first model selection — right-sized AI that minimizes compute waste',
      'Hands-on implementation with staff training, not just slide decks',
      'Ongoing optimization to keep costs down and sustainability up',
      'Data strategy consulting — organize what you have before buying what you don\'t need',
    ],
    status: 'Now accepting clients',
    statusType: 'beta',
    primaryAction: { label: 'Take the free assessment', href: '/audit' },
    accentColor: '#16a34a',
    bgClass: 'bg-green-600',
    experienceHref: '/ai-solutions',
    experienceLabel: 'Explore AI Solutions',
    performanceStats: [
      { value: '40%', label: 'Avg Cost Savings' },
      { value: '60%', label: 'Less Compute' },
      { value: 'SMB', label: 'Focused' },
      { value: 'Green', label: 'AI First' },
    ],
  },
  {
    id: 'family-hub',
    number: '04',
    name: 'Balm — Family Control Center',
    shortName: 'Balm',
    tagline: 'Stop carrying it alone.',
    description:
      'Balm tracks your family\'s mental load, syncs schedules, and gives everyone a way to contribute — powered by an AI that takes action, not just suggests. 200+ task templates, shared calendar, mental load dashboards.',
    details: [
      '200+ task templates, recurring tasks, assign to anyone including kids',
      'Mental load dashboard — weekly reports showing who carries what',
      'Shared calendar with Google & Outlook sync, color-coded by person',
      'AI assistant (GPT-4o) that acts on your behalf, not just suggests',
    ],
    status: 'Live now — free to join',
    statusType: 'beta',
    primaryAction: { label: 'Try Balm free', href: 'https://balm-1092892651956.us-central1.run.app/signup' },
    accentColor: '#0D4F73',
    bgClass: 'bg-sky-blue-deep',
    experienceHref: '/initiatives/family-brain',
    experienceLabel: 'Experience the hub',
    performanceStats: [
      { value: '68%', label: 'Avg Mental Load' },
      { value: '200+', label: 'Task Templates' },
      { value: 'Free', label: 'To Join' },
      { value: 'AI', label: 'Powered' },
    ],
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
