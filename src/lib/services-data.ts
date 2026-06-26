/* ══════════════════════════════════════════════════════════════
   FOX HAVEN GROUP — services + pricing source of truth.

   The six capability tiles on /services and their detail pages at
   /services/<slug> both read from here, so the grid and the detail
   pages never drift. Prices are lifted verbatim (dollar figures)
   from the June 9, 2026 Product Catalog & Pricing Report (P1–P10).

   To re-map a tile to different products, edit the `products`
   array on that Service — nothing else changes. To change how a
   price is shown, set `priceDisplay` on the Product.
   ══════════════════════════════════════════════════════════════ */

import type { LucideIcon } from 'lucide-react';
import { Microscope, Scale, Users, LifeBuoy, Compass, LineChart } from 'lucide-react';

export type PriceDisplay = 'range' | 'from' | 'quote';

export interface Product {
  id: string; // "P1"…"P10"
  name: string;
  whatItIs: string; // 1–2 plain-language sentences
  delivered: string; // the deliverable
  whoBuys: string;
  price: string; // exact string from the catalog
  model: string; // "Flat per application", "Retainer (6-mo min)", etc.
  priceDisplay?: PriceDisplay; // default "range"
  note?: string; // optional clarification shown under the price block
}

export interface Service {
  slug: string;
  title: string;
  Icon: LucideIcon; // existing icon system is lucide-react
  tileBlurb: string; // short text on the /services grid card
  longDescription: string; // intro paragraph on the detail page
  products: Product[];
}

/* ── Product library (P1–P10), verbatim pricing ── */
const PRODUCTS: Record<string, Product> = {
  P1: {
    id: 'P1',
    name: 'Federal Grant Application Development',
    whatItIs:
      'We write your federal grant application with you, strategy, narrative, work plan, logic model, budget and justification, attachments, and submission support. You stay the applicant and own the award.',
    delivered:
      'Submission-ready application package, compliance checklist, and submission confirmation.',
    whoBuys:
      'Rural health networks, county health departments, behavioral-health providers, law enforcement agencies, coalitions, and small nonprofits.',
    price: '$8,500–$15,000 flat per federal application.',
    model: 'Flat per application',
  },
  P2: {
    id: 'P2',
    name: 'Grant Readiness & Funding Strategy Assessment',
    whatItIs:
      'Before you spend money chasing grants, we tell you honestly what you can win and hand you a ranked 12-month funding roadmap.',
    delivered:
      'Written assessment, ranked opportunity pipeline, registration and compliance punch list, and go/no-go criteria.',
    whoBuys: 'Organizations new to federal funding; agencies burned by a failed application.',
    price: '$2,500–$4,000 flat.',
    model: 'Flat',
  },
  P3: {
    id: 'P3',
    name: 'Community Needs Assessment & Data Analysis',
    whatItIs:
      'The evidence base your program or application stands on — overdose surveillance and service-gap data, stakeholder interviews, and a needs assessment that satisfies federal reviewers and guides your plan.',
    delivered:
      'Needs-assessment report with cited data, gap and asset map, stakeholder findings, and priority recommendations.',
    whoBuys:
      'RCORP-type applicants; counties and coalitions in strategic planning; opioid-settlement recipients.',
    price: '$7,500–$15,000 per assessment.',
    model: 'Project',
  },
  P4: {
    id: 'P4',
    name: 'Training Design & Delivery',
    whatItIs:
      'Professional training your staff will actually use — overdose prevention, harm-reduction policy, trauma-informed approaches, and public health–public safety collaboration — tailored to your agency.',
    delivered:
      'Custom curriculum, materials, delivery (in person or virtual), and a post-training evaluation summary.',
    whoBuys: 'Law enforcement, health departments, treatment providers, and conferences.',
    price: '$2,500–$3,500 per training day; $1,200 per webinar; curriculum-only at $150/hr.',
    model: 'Per event',
  },
  P5: {
    id: 'P5',
    name: 'Technical Assistance Retainer',
    whatItIs:
      'Your on-call expert — a monthly block of advisory hours for implementation troubleshooting, work-plan reviews, report feedback, and facilitation.',
    delivered:
      'Defined monthly hours, scheduled check-ins, written recommendations, and a response-time commitment.',
    whoBuys:
      'Grant recipients needing TA capacity; coalitions; health departments standing up new programs.',
    price: '$2,250/month (15 hrs) or $4,400/month (30 hrs); 6-month minimum.',
    model: 'Retainer (6-mo min)',
  },
  P6: {
    id: 'P6',
    name: 'Strategic Planning & Action Plan Facilitation',
    whatItIs:
      'We get your coalition from talk to a plan — facilitation producing a strategic or state/county action plan with goals, owners, timelines, and a sustainability framework.',
    delivered:
      'Facilitated sessions, written plan, implementation calendar, and sustainability framework.',
    whoBuys: 'Coalitions, counties, opioid abatement councils, and state programs.',
    price: '$6,000–$15,000 per engagement.',
    model: 'Project',
  },
  P7: {
    id: 'P7',
    name: 'External Program Evaluation',
    whatItIs:
      'Independent, credible measurement of whether your program works, logic model, measures, instruments, data analysis, and the reports your funder requires.',
    delivered:
      'Evaluation plan, instruments, ongoing data analysis, and quarterly and annual evaluation reports.',
    whoBuys:
      'Federal grant recipients (RCORP, SAMHSA, COPS/OJP), foundations, and settlement-fund programs.',
    price: 'Budgeted at 10–15% of total program cost (industry standard); floor $10,000/yr; quoted per project.',
    model: '% of program budget / project',
    note: 'The 10–15%-of-program-budget figure is the funder-standard way to size an evaluation line. It is not contingency or success-fee pricing.',
  },
  P8: {
    id: 'P8',
    name: 'Policy Analysis & Briefing Papers',
    whatItIs:
      'A decision-ready answer to a hard policy question, drug-checking law, Good Samaritan provisions, health–law-enforcement data-sharing legality — written for officials, not academics.',
    delivered: 'An 8–15 page policy brief with options analysis and recommendations, plus a briefing session.',
    whoBuys:
      'State and county officials, courts and court administrators, associations, and abatement councils.',
    price: '$3,500–$6,500 per brief.',
    model: 'Per brief',
  },
  P9: {
    id: 'P9',
    name: 'PH–PS Data Integration/ODMAP Implementation',
    whatItIs:
      'Stand up real-time overdose data sharing between your health department and law enforcement — governance, agreements, spike-response protocols, and stakeholder buy-in — led by someone with published Arizona case studies.',
    delivered:
      'Data-sharing agreement package, governance structure, spike-response protocol, and implementation support.',
    whoBuys: 'Counties, HIDTA-adjacent task forces, and regional health collaboratives.',
    price: '$10,000–$20,000 per implementation (then optional retainer for sustainment).',
    model: 'Project',
  },
  P10: {
    id: 'P10',
    name: 'Speaking, Keynotes & Expert Panels',
    whatItIs:
      'A national-caliber speaker on overdose response, prevention science, and public health–public safety collaboration.',
    delivered: 'Keynote, plenary, or workshop, plus slide deck and Q&A.',
    whoBuys: 'State and association conferences, summits, and agency convenings.',
    price: '$2,000–$3,500 + travel per event; $750–$1,000 for short virtual panels.',
    model: 'Per event',
  },
};

/* ── The six capability tiles. tileBlurb wording matches the live grid. ── */
export const services: Service[] = [
  {
    slug: 'implementation-science',
    title: 'Implementation Science',
    Icon: Microscope,
    tileBlurb:
      'Apply rigorous science to real-world contexts — fidelity, adaptation, and the conditions that determine whether evidence-based practice actually takes hold.',
    longDescription:
      'Evidence-based practice rarely fails on the merits — it fails in the gap between what works in a study and what holds in a county, a clinic, or a task force. We bring implementation science to that gap, starting with the evidence base your program stands on: surveillance and service-gap data, stakeholder findings, and a needs assessment rigorous enough to satisfy federal reviewers and to guide where the work actually lands.',
    products: [PRODUCTS.P3],
  },
  {
    slug: 'policy-translation',
    title: 'Policy Translation',
    Icon: Scale,
    tileBlurb:
      'Bridge research and policy into decisions, guidance, and field-ready action. We turn mandates and grant requirements into work the field can execute.',
    longDescription:
      'Mandates, statutes, and grant requirements do not implement themselves. We translate policy into decisions officials can act on and applications funders can fund — turning a hard legal or regulatory question into a clear recommendation, and a funding opportunity into a submission-ready package with an honest readiness assessment behind it.',
    products: [PRODUCTS.P8, PRODUCTS.P1, PRODUCTS.P2],
  },
  {
    slug: 'stakeholder-engagement',
    title: 'Stakeholder Engagement',
    Icon: Users,
    tileBlurb:
      'Center the voices closest to the work, build durable partnerships, and drive collective action across agencies, providers, and community.',
    longDescription:
      'Durable change runs on trust across agencies that do not usually share a table — health departments, law enforcement, providers, and community. We build that connective tissue: governance and data-sharing agreements that let public health and public safety act on the same overdose picture in real time, and the platform to carry the message to the field.',
    products: [PRODUCTS.P9, PRODUCTS.P10],
  },
  {
    slug: 'technical-assistance',
    title: 'Technical Assistance',
    Icon: LifeBuoy,
    tileBlurb:
      'Expert guidance, coaching, troubleshooting, and hands-on support. Technical assistance that changes execution — not another training binder.',
    longDescription:
      'Plans stall in execution. Technical assistance is on-call expertise for the messy middle — troubleshooting implementation, reviewing work plans and reports, facilitating partners, and building staff capability through training they will actually use. Not another binder; support that changes what happens next week.',
    products: [PRODUCTS.P5, PRODUCTS.P4],
  },
  {
    slug: 'strategic-planning',
    title: 'Strategic Planning',
    Icon: Compass,
    tileBlurb:
      'Chart bold, feasible paths toward systems change — plans built for field reality, with the governance and sequencing to make them hold.',
    longDescription:
      'Coalitions and agencies often have intent and energy but no shared plan to point them. We facilitate the move from talk to a strategic or action plan with goals, owners, timelines, and a sustainability framework — grounded in an honest read of what you are positioned to fund and win.',
    products: [PRODUCTS.P6, PRODUCTS.P2],
  },
  {
    slug: 'evaluation-learning',
    title: 'Evaluation & Learning',
    Icon: LineChart,
    tileBlurb:
      'Measure what matters, generate insight, and build the learning systems that turn activity into evidence and continuous improvement.',
    longDescription:
      'Funders increasingly require credible evidence that a program works — and your own learning depends on it. We design independent evaluation: logic models, measures, instruments, analysis, and the reports your funder expects, built on a sound needs assessment so you are measuring against the right baseline.',
    products: [PRODUCTS.P7, PRODUCTS.P3],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Render a product's price per its priceDisplay (default "range"). */
export function formatPrice(product: Product): string {
  switch (product.priceDisplay) {
    case 'quote':
      return 'Request a quote';
    case 'from': {
      const first = product.price.match(/\$[\d,]+/);
      return first ? `From ${first[0]}` : product.price;
    }
    case 'range':
    default:
      return product.price;
  }
}
