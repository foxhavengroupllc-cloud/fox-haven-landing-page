/**
 * Phoenix Heat Relief Network, Resource Nodes
 *
 * Static seed data backing the Resource Nodes map on /resource-nodes.
 * The Heat Relief App scene currently references a subset of these (see
 * src/experience/scenes/heat-relief-app/HeatReliefAppPhases.tsx); this
 * module is the canonical source we will migrate live data through once
 * the partner integration (MAG Heat Relief Network / Phoenix Open Data)
 * is wired up.
 *
 * x/y are positions on the Phoenix basemap image expressed in percent.
 * (0,0) is top-left, (100,100) is bottom-right. Tuned by eye against
 * /images/new-design/homepage-redesign/platform/phoenix-basemap.png so
 * markers sit roughly where each location is in Phoenix metro.
 */

export type ResourceNodeType = 'cooling-center' | 'hydration-station' | 'mobile-unit' | 'shelter';

export type ResourceNode = {
  id: string;
  name: string;
  type: ResourceNodeType;
  district: string;
  hours: string;
  status: 'Open' | 'Limited' | 'Closed' | 'Roving';
  /** Real-world geographic position used by the interactive map. */
  lat: number;
  lng: number;
};

/** Center + initial zoom level for the Phoenix metro map view. */
export const PHOENIX_MAP_CENTER: { lat: number; lng: number; zoom: number } = {
  lat: 33.475,
  lng: -112.066,
  zoom: 11,
};

export const RESOURCE_TYPE_META: Record<
  ResourceNodeType,
  { label: string; color: string; pinColor: string; description: string }
> = {
  'cooling-center': {
    label: 'Cooling Centers',
    color: '#22d3ee', // cyan-400
    pinColor: '#06b6d4',
    description: 'Air-conditioned indoor space with seating, water, and staff on-site.',
  },
  'hydration-station': {
    label: 'Hydration Stations',
    color: '#60a5fa', // blue-400
    pinColor: '#3b82f6',
    description: 'Free water, electrolytes, and shade, staffed during peak heat hours.',
  },
  'mobile-unit': {
    label: 'Mobile Units',
    color: '#f59e0b', // amber-500
    pinColor: '#f97316',
    description: 'Roving vehicles deploying cooling, hydration, and outreach across the metro.',
  },
  shelter: {
    label: 'Shelters',
    color: '#a78bfa', // violet-400
    pinColor: '#8b5cf6',
    description: 'Overnight shelter with cooling, hydration, and connection to services.',
  },
};

export const RESOURCE_NODES: ResourceNode[] = [
  // ── Cooling Centers ──────────────────────────────────────────
  {
    id: 'cc-burton-barr',
    name: 'Burton Barr Central Library',
    type: 'cooling-center',
    district: 'Downtown',
    hours: 'Open until 9:00 PM',
    status: 'Open',
    lat: 33.4671,
    lng: -112.0735,
  },
  {
    id: 'cc-maryvale',
    name: 'Maryvale Community Center',
    type: 'cooling-center',
    district: 'West Phoenix',
    hours: 'Open until midnight',
    status: 'Open',
    lat: 33.4951,
    lng: -112.181,
  },
  {
    id: 'cc-south-mountain',
    name: 'S. Mountain Park Visitor Center',
    type: 'cooling-center',
    district: 'South Phoenix',
    hours: 'Open until 6:00 PM',
    status: 'Open',
    lat: 33.3711,
    lng: -112.066,
  },
  {
    id: 'cc-cesar-chavez',
    name: 'Cesar Chavez Community Center',
    type: 'cooling-center',
    district: 'South Mountain Village',
    hours: 'Open until 8:00 PM',
    status: 'Open',
    lat: 33.3974,
    lng: -112.0635,
  },
  {
    id: 'cc-devonshire',
    name: 'Devonshire Senior Center',
    type: 'cooling-center',
    district: 'North Central',
    hours: 'Open until 5:00 PM',
    status: 'Limited',
    lat: 33.5358,
    lng: -112.0747,
  },
  {
    id: 'cc-mountain-view',
    name: 'Mountain View Community Center',
    type: 'cooling-center',
    district: 'Sunnyslope',
    hours: 'Open until 9:00 PM',
    status: 'Open',
    lat: 33.5859,
    lng: -112.075,
  },

  // ── Hydration Stations ───────────────────────────────────────
  {
    id: 'hs-hance',
    name: 'Margaret T. Hance Park',
    type: 'hydration-station',
    district: 'Roosevelt Row',
    hours: '6 AM – 10 PM',
    status: 'Open',
    lat: 33.4665,
    lng: -112.075,
  },
  {
    id: 'hs-encanto',
    name: 'Encanto Park',
    type: 'hydration-station',
    district: 'Encanto Village',
    hours: '6 AM – 9 PM',
    status: 'Open',
    lat: 33.4775,
    lng: -112.0908,
  },
  {
    id: 'hs-steele',
    name: 'Steele Indian School Park',
    type: 'hydration-station',
    district: 'Midtown',
    hours: '5 AM – 11 PM',
    status: 'Open',
    lat: 33.4956,
    lng: -112.0723,
  },
  {
    id: 'hs-papago',
    name: 'Papago Park · Hydration Hub',
    type: 'hydration-station',
    district: 'East Phoenix',
    hours: '5 AM – 10 PM',
    status: 'Open',
    lat: 33.4561,
    lng: -111.9527,
  },
  {
    id: 'hs-cortez',
    name: 'Cortez Park · Hydration Tent',
    type: 'hydration-station',
    district: 'North Phoenix',
    hours: '6 AM – 9 PM',
    status: 'Limited',
    lat: 33.5747,
    lng: -112.105,
  },

  // ── Mobile Units (rove between fixed sites) ──────────────────
  {
    id: 'mu-downtown',
    name: 'Mobile Unit A · Downtown route',
    type: 'mobile-unit',
    district: 'Downtown core',
    hours: 'Active 10 AM – 8 PM',
    status: 'Roving',
    lat: 33.4484,
    lng: -112.074,
  },
  {
    id: 'mu-west',
    name: 'Mobile Unit B · West Phoenix route',
    type: 'mobile-unit',
    district: 'Maryvale / Estrella',
    hours: 'Active 9 AM – 7 PM',
    status: 'Roving',
    lat: 33.45,
    lng: -112.185,
  },
  {
    id: 'mu-south',
    name: 'Mobile Unit C · South Phoenix route',
    type: 'mobile-unit',
    district: 'Laveen / South Mountain',
    hours: 'Active 11 AM – 9 PM',
    status: 'Roving',
    lat: 33.39,
    lng: -112.105,
  },

  // ── Overnight Shelters ───────────────────────────────────────
  {
    id: 'sh-andre',
    name: 'Andre House',
    type: 'shelter',
    district: 'Madison Street corridor',
    hours: 'Overnight · daily intake',
    status: 'Open',
    lat: 33.4516,
    lng: -112.0843,
  },
  {
    id: 'sh-svdp',
    name: 'St. Vincent de Paul · Phoenix',
    type: 'shelter',
    district: 'Watkins Street',
    hours: 'Overnight · daily intake',
    status: 'Open',
    lat: 33.4285,
    lng: -112.0716,
  },
  {
    id: 'sh-cass',
    name: 'Central Arizona Shelter Services',
    type: 'shelter',
    district: 'Madison Street corridor',
    hours: 'Overnight · daily intake',
    status: 'Open',
    lat: 33.4506,
    lng: -112.0858,
  },
  {
    id: 'sh-madison',
    name: 'Madison Street Shelter Annex',
    type: 'shelter',
    district: 'Capitol Mall',
    hours: 'Overnight · partner intake',
    status: 'Limited',
    lat: 33.4488,
    lng: -112.0808,
  },
];

export function nodesByType(type: ResourceNodeType): ResourceNode[] {
  return RESOURCE_NODES.filter((n) => n.type === type);
}

export function countsByType(): Record<ResourceNodeType, number> {
  return {
    'cooling-center': nodesByType('cooling-center').length,
    'hydration-station': nodesByType('hydration-station').length,
    'mobile-unit': nodesByType('mobile-unit').length,
    shelter: nodesByType('shelter').length,
  };
}
