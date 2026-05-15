// strategicCoreConfig.ts
// Config-driven node data for the Foxhaven Strategic Core.
// Add new nodes here, no other files need changing for basic additions.

export type NodeAction =
  | { kind: 'panel' }
  | { kind: 'route'; href: string }
  | { kind: 'scroll'; targetId: string };

export type NodeAccent = 'amber' | 'blue' | 'teal' | 'green';

/**
 * Orbital tier determines visual hierarchy and orbit radius.
 * primary   → outer orbit (R_PRIMARY),  larger node, always-visible label
 * secondary → inner orbit (R_SECONDARY), smaller node, contextual label
 */
export type NodeTier = 'primary' | 'secondary';

export interface CoreNode {
  id: string;
  label: string;
  sublabel: string;
  /** Polar angle: 0 = top, 90 = equator, 180 = bottom */
  phi: number;
  /** Azimuthal angle around Y axis (0–360) */
  theta: number;
  action: NodeAction;
  accent: NodeAccent;
  /** Visual + orbital tier */
  tier: NodeTier;
  /** Panel content shown when node is activated */
  panel: {
    title: string;
    body: string;
    cta?: { label: string; scrollTo?: string; href?: string };
  };
}

/** SVG/CSS color values per accent */
export const ACCENT: Record<NodeAccent, { dot: string; ring: string; label: string; line: string }> = {
  amber: { dot: '#F2C94C', ring: '#E8821A40', label: '#F5A64A', line: '#F2C94C30' },
  blue:  { dot: '#38bdf8', ring: '#1A6B9A40', label: '#7dd3fc', line: '#38bdf830' },
  teal:  { dot: '#22d3ee', ring: '#0D4F7340', label: '#67e8f9', line: '#22d3ee30' },
  green: { dot: '#4ade80', ring: '#16a34a40', label: '#86efac', line: '#4ade8030' },
};

export const STRATEGIC_NODES: CoreNode[] = [
  {
    id: 'mission',
    label: 'Mission',
    sublabel: 'Why we exist',
    phi: 52, theta: 10,
    action: { kind: 'panel' },
    accent: 'amber',
    tier: 'secondary',
    panel: {
      title: 'Our Mission',
      body: 'Fox Haven Group builds technology and infrastructure to protect lives, empower communities, and simplify modern family life, starting in Phoenix, scaling everywhere.',
      cta: { label: 'Learn more', scrollTo: '#mission' },
    },
  },
  {
    id: 'solar-shelters',
    label: 'Solar Shelters',
    sublabel: 'Initiative 01',
    phi: 55, theta: 130,
    action: { kind: 'route', href: '/initiatives/solar-shelter' },
    accent: 'amber',
    tier: 'primary',
    panel: {
      title: 'Heat Relief Solar Shelters',
      body: 'Solar-powered cooling stations across Phoenix, free air conditioning, water, and emergency resources during extreme heat events. No ID required.',
      cta: { label: 'Explore initiative', href: '/initiatives/solar-shelter' },
    },
  },
  {
    id: 'heat-relief-app',
    label: 'Heat Relief App',
    sublabel: 'Initiative 02',
    phi: 55, theta: 250,
    action: { kind: 'route', href: '/initiatives/heat-relief-app' },
    accent: 'blue',
    tier: 'primary',
    panel: {
      title: 'Heat Relief App',
      body: 'Real-time alerts, live cooling center maps, wellness check-ins, and walking route safety scores for Phoenix residents during extreme heat.',
      cta: { label: 'Explore initiative', href: '/initiatives/heat-relief-app' },
    },
  },
  {
    id: 'balm',
    label: 'Balm',
    sublabel: 'Live now · Family Hub',
    phi: 125, theta: 70,
    action: { kind: 'route', href: '/initiatives/family-brain' },
    accent: 'teal',
    tier: 'primary',
    panel: {
      title: 'Balm, Family Control Center',
      body: "Stop carrying it alone. Balm tracks your family's mental load, syncs schedules, and uses AI to ensure household work gets shared, live and free.",
      cta: { label: 'Try Balm free', href: 'https://balm-1092892651956.us-central1.run.app/signup' },
    },
  },
  {
    id: 'ai-consulting',
    label: 'AI for Business',
    sublabel: 'Initiative 04',
    phi: 90, theta: 340,
    action: { kind: 'scroll', targetId: '#initiatives' },
    accent: 'green',
    tier: 'primary',
    panel: {
      title: 'AI Solutions for Everyone',
      body: 'We help everyone bridge the gap to AI, with strategies that are practical, affordable, and environmentally conscious. Right-sized technology, no wasted compute.',
      cta: { label: 'Start a conversation', scrollTo: '#cta' },
    },
  },
  {
    id: 'partnerships',
    label: 'Partnerships',
    sublabel: 'Build with us',
    phi: 128, theta: 190,
    action: { kind: 'panel' },
    accent: 'amber',
    tier: 'secondary',
    panel: {
      title: 'Work With Us',
      body: 'We partner with city agencies, community organizations, healthcare providers, and mission-aligned businesses to extend our reach and deepen our impact.',
      cta: { label: 'Get in touch', scrollTo: '#cta' },
    },
  },
  {
    id: 'contact',
    label: 'Contact',
    sublabel: 'Get involved',
    phi: 125, theta: 310,
    action: { kind: 'scroll', targetId: '#cta' },
    accent: 'teal',
    tier: 'secondary',
    panel: {
      title: 'Get Involved',
      body: "Whether you're a community partner, investor, future user, or just someone who cares, we'd love to hear from you.",
      cta: { label: 'Contact us', scrollTo: '#cta' },
    },
  },
];
