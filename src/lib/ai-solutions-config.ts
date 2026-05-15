import type { LucideIcon } from 'lucide-react';
import {
  Zap,
  BarChart3,
  CalendarClock,
  Link2,
  Bot,
  FileText,
  Compass,
  MessageSquare,
} from 'lucide-react';

/* ─── Icon Lookup ─── */

export const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  BarChart3,
  CalendarClock,
  Link2,
  Bot,
  FileText,
  Compass,
  MessageSquare,
};

/* ─── Service ─── */

export type ServiceCategory = 'automation' | 'ai-agents' | 'consulting';

export interface AIService {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  outcome: string;
  tagline: string;
  description: string;
  problemStatement: string;
  features: string[];
  metrics: { value: string; label: string }[];
  /** Key into ICON_MAP, use getServiceIcon() to resolve */
  iconName: string;
  isNew?: boolean;
}

export function getServiceIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] ?? Zap;
}

export const AI_SERVICES: AIService[] = [
  /* ── Existing 4 (Automation) ── */
  {
    slug: 'lead-response',
    title: 'Lead Response & Follow-up',
    shortTitle: 'Lead Response',
    category: 'automation',
    outcome: 'Avg 40% more conversions',
    tagline:
      'Automated qualification and follow-up sequences that respond in seconds, not hours.',
    description:
      'Most teams take 5+ hours to respond to inbound leads. By then, your prospect has already called three competitors. We build AI-powered response systems that qualify, score, and follow up with leads within seconds, keeping your pipeline alive while your team focuses on closing.',
    problemStatement:
      'Every hour you wait to respond to a lead, your close rate drops by 10%. Manual follow-up is inconsistent, slow, and the first thing your team drops when they get busy.',
    features: [
      'Instant lead qualification and scoring based on your ideal customer profile',
      'Automated multi-channel follow-up sequences (email, SMS, voicemail)',
      'Smart routing to the right team member based on lead type and availability',
      'Real-time notifications for high-intent prospects',
      'CRM integration so nothing falls through the cracks',
      'Performance dashboards tracking response time, conversion, and ROI',
    ],
    metrics: [
      { value: '40%', label: 'More Conversions' },
      { value: '<60s', label: 'Response Time' },
      { value: '$28K', label: 'Avg Annual Recovery' },
    ],
    iconName: 'Zap',
  },
  {
    slug: 'data-reporting',
    title: 'Data & Reporting',
    shortTitle: 'Data & Reporting',
    category: 'automation',
    outcome: 'Avg 8 hrs/wk recovered',
    tagline:
      'Live dashboards pulling from all your tools, no more manual Excel pulls on Friday afternoon.',
    description:
      'Your data is scattered across a dozen tools and nobody has time to pull it together. We connect your systems and build live dashboards that update automatically, so your team stops wasting hours on manual reporting and starts making decisions based on real-time data.',
    problemStatement:
      'Manual reporting eats 8+ hours every week. The numbers are stale by the time they reach a decision-maker, and half the data lives in someone\'s inbox or a spreadsheet nobody else can find.',
    features: [
      'Automated data pipelines connecting your CRM, accounting, and ops tools',
      'Real-time dashboards accessible to your whole team',
      'Scheduled report generation and email delivery',
      'Custom KPI tracking tailored to your business goals',
      'Data quality monitoring and anomaly alerts',
      'Historical trend analysis and forecasting',
    ],
    metrics: [
      { value: '8', label: 'Hrs/Wk Recovered' },
      { value: '100%', label: 'Data Accuracy' },
      { value: 'Real-time', label: 'Updates' },
    ],
    iconName: 'BarChart3',
  },
  {
    slug: 'scheduling-ops',
    title: 'Scheduling & Ops',
    shortTitle: 'Scheduling & Ops',
    category: 'automation',
    outcome: 'Avg 6 hrs/wk recovered',
    tagline:
      'Smart booking, reminders, and routing that keeps the calendar from eating your team\'s time.',
    description:
      'Scheduling shouldn\'t be a full-time job. We deploy AI-powered booking, routing, and reminder systems that handle the back-and-forth so your team can focus on the work, not the calendar gymnastics required to do it.',
    problemStatement:
      'Your team spends hours every week on scheduling conflicts, missed reminders, and manual coordination. Double-bookings frustrate clients and no-shows cost you revenue.',
    features: [
      'AI-powered scheduling that accounts for team capacity and client preferences',
      'Automated reminders via email, SMS, and calendar notifications',
      'Smart routing to assign the right person to the right job',
      'No-show prediction and proactive re-engagement',
      'Integration with Google Calendar, Outlook, and popular booking tools',
      'Capacity planning dashboards for resource optimization',
    ],
    metrics: [
      { value: '6', label: 'Hrs/Wk Recovered' },
      { value: '35%', label: 'Fewer No-shows' },
      { value: '90%', label: 'Booking Automation' },
    ],
    iconName: 'CalendarClock',
  },
  {
    slug: 'systems-integration',
    title: 'Systems Integration',
    shortTitle: 'Integration',
    category: 'automation',
    outcome: 'Eliminate duplicate entry',
    tagline:
      'Connect your CRM, email, accounting, and ops tools so data flows automatically.',
    description:
      'Your team enters the same data into three different systems because none of them talk to each other. We build the connective tissue between your tools so information flows once and updates everywhere, no more copy-paste, no more missed updates.',
    problemStatement:
      'Disconnected systems mean duplicate data entry, sync errors, and hours wasted keeping everything consistent. When systems don\'t talk, people fill the gap, and people make mistakes.',
    features: [
      'Custom API integrations between your existing tools',
      'Bi-directional data sync across CRM, email, accounting, and ops',
      'Automated workflows triggered by events across systems',
      'Error monitoring and automatic conflict resolution',
      'Migration support for legacy system transitions',
      'Documentation and runbooks for your team',
    ],
    metrics: [
      { value: '0', label: 'Duplicate Entries' },
      { value: '99.9%', label: 'Sync Accuracy' },
      { value: '3+', label: 'Systems Connected' },
    ],
    iconName: 'Link2',
  },

  /* ── New 4 ── */
  {
    slug: 'custom-ai-agents',
    title: 'Custom AI Agents',
    shortTitle: 'AI Agents',
    category: 'ai-agents',
    outcome: 'Purpose-built AI that works for you',
    tagline:
      'Intelligent agents designed for your workflows, customer service, internal ops, sales qualification, and more.',
    description:
      'Off-the-shelf AI tools are built for everyone, which means they\'re optimized for no one. We design and deploy custom AI agents that understand your business context, follow your processes, and get smarter over time, handling the tasks that used to require your most expensive people.',
    problemStatement:
      'Generic AI tools don\'t understand your products, your processes, or your customers. They hallucinate, give wrong answers, and create more work than they save. You need AI that was built for how you actually operate.',
    features: [
      'Custom-trained agents built on your business data and processes',
      'Customer-facing agents for support, pre-sales, and onboarding',
      'Internal agents for knowledge retrieval, process automation, and decision support',
      'Sales qualification agents that score and route leads intelligently',
      'Guardrails and monitoring to prevent hallucination and brand risk',
      'Continuous learning from interactions to improve accuracy over time',
    ],
    metrics: [
      { value: '70%', label: 'Task Automation' },
      { value: '24/7', label: 'Availability' },
      { value: '95%', label: 'Accuracy Rate' },
    ],
    iconName: 'Bot',
    isNew: true,
  },
  {
    slug: 'document-automation',
    title: 'Document & Content Automation',
    shortTitle: 'Doc Automation',
    category: 'ai-agents',
    outcome: 'Hours to minutes',
    tagline:
      'AI-powered document generation, proposal writing, and content pipelines that eliminate the blank page.',
    description:
      'Your team spends hours drafting proposals, reports, and content that follows the same patterns every time. We build AI pipelines that generate first drafts, populate templates, and produce consistent documentation, letting your team focus on refining instead of starting from scratch.',
    problemStatement:
      'Document creation is one of the biggest hidden time sinks in any business. Proposals take hours, reports are always late, and quality varies wildly depending on who writes them.',
    features: [
      'Automated proposal and quote generation from CRM data',
      'Templated report generation with live data integration',
      'Content pipeline for marketing, social, and communications',
      'Brand voice and style enforcement across all generated content',
      'Document review and quality scoring before delivery',
      'Version control and approval workflow integration',
    ],
    metrics: [
      { value: '80%', label: 'Faster Drafts' },
      { value: '10x', label: 'Content Output' },
      { value: '100%', label: 'Brand Consistent' },
    ],
    iconName: 'FileText',
    isNew: true,
  },
  {
    slug: 'ai-strategy',
    title: 'AI Strategy Consulting',
    shortTitle: 'AI Strategy',
    category: 'consulting',
    outcome: 'Clarity before commitment',
    tagline:
      'Readiness assessments, roadmapping, vendor selection, and governance planning, so you invest in AI that actually pays off.',
    description:
      'Before you spend a dollar on AI tools, you need to know where the real opportunities are and which investments will actually move the needle. We provide hands-on strategic consulting that cuts through the hype and gives you a concrete plan based on your business reality.',
    problemStatement:
      'The AI market is flooded with tools promising to transform your business, but most teams don\'t know where to start, what to prioritize, or how to avoid expensive mistakes. Strategy without context is just noise.',
    features: [
      'Comprehensive AI readiness assessment across all business functions',
      'Prioritized roadmap based on ROI and implementation complexity',
      'Vendor evaluation and tool selection guidance',
      'AI governance framework for responsible deployment',
      'Team training and change management planning',
      'Quarterly strategy reviews and roadmap updates',
    ],
    metrics: [
      { value: '90-day', label: 'Clear Roadmap' },
      { value: '3x', label: 'Avg ROI on AI Spend' },
      { value: 'Zero', label: 'Wasted Investment' },
    ],
    iconName: 'Compass',
    isNew: true,
  },
  {
    slug: 'chatbots',
    title: 'Chatbots & Conversational AI',
    shortTitle: 'Chatbots',
    category: 'ai-agents',
    outcome: '60% ticket deflection',
    tagline:
      'Customer-facing chatbots, internal knowledge bots, and FAQ automation that actually understand your business.',
    description:
      'Traditional chatbots frustrate customers with scripted responses that never answer the real question. We build conversational AI that understands context, handles complex queries, and knows when to hand off to a human, delivering the instant, 24/7 support your customers expect without the call center overhead.',
    problemStatement:
      'Your customers expect instant answers, but your team can\'t be online 24/7. Generic chatbot platforms are rigid, expensive, and deliver a poor experience that damages your brand more than it helps.',
    features: [
      'Custom-trained chatbots that understand your products, services, and policies',
      'Multi-channel deployment (website, SMS, social, email)',
      'Intelligent handoff to human agents with full conversation context',
      'Internal knowledge bots for team FAQ and process questions',
      'Analytics dashboard tracking deflection rates, satisfaction, and common queries',
      'Continuous improvement from conversation data and feedback loops',
    ],
    metrics: [
      { value: '60%', label: 'Ticket Deflection' },
      { value: '24/7', label: 'Availability' },
      { value: '<3s', label: 'Response Time' },
    ],
    iconName: 'MessageSquare',
    isNew: true,
  },
];

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  automation: 'Automation',
  'ai-agents': 'AI Agents',
  consulting: 'Consulting',
};

/* ─── Process Steps ─── */

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  timeframe: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '1',
    title: 'Discovery Call',
    desc: 'A 15-minute conversation to understand your business, your pain points, and whether AI automation is the right fit.',
    timeframe: '15 min',
  },
  {
    num: '2',
    title: 'Free Operational Audit',
    desc: 'Answer 16 questions about how your team handles leads, operations, communication, and admin work today.',
    timeframe: '12 min',
  },
  {
    num: '3',
    title: 'Results Review',
    desc: 'Walk through your scored audit report with a Fox Haven consultant. See your inefficiency cost, top opportunities, and recommended roadmap.',
    timeframe: '30 min call',
  },
  {
    num: '4',
    title: 'Custom Automation Plan',
    desc: 'We scope a prioritized build plan targeting your highest-ROI opportunities first, with clear timelines, deliverables, and pricing.',
    timeframe: '3–5 days',
  },
  {
    num: '5',
    title: 'Build & Deploy',
    desc: 'Our team builds, tests, and deploys your automation. Full handoff includes documentation, team training, and a dedicated consultant.',
    timeframe: '3–6 weeks',
  },
  {
    num: '6',
    title: 'Optimize & Scale',
    desc: 'We monitor performance, tune your systems, and identify new opportunities as your business grows.',
    timeframe: 'Ongoing',
  },
];

/* ─── Pricing Tiers ─── */

export interface PricingTier {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Audit Only',
    price: 'Free',
    description:
      'A scored assessment of your operational efficiency with concrete recommendations.',
    features: [
      '16-question readiness assessment',
      'Scored report across 7 dimensions',
      'Estimated annual cost of inefficiency',
      '90-day opportunity map',
      'No commitment required',
    ],
    cta: { label: 'Start Free Audit', href: '/audit' },
  },
  {
    name: 'Starter',
    price: 'From $2,500',
    priceNote: 'one-time',
    description:
      'One focused automation deployment to prove the value before scaling.',
    features: [
      'Everything in Audit Only',
      '1 automation focus area',
      '4-week deployment timeline',
      'Full documentation & team training',
      '30 days post-launch support',
      'Dedicated project consultant',
    ],
    cta: { label: 'Book a Call', href: '#contact' },
  },
  {
    name: 'Growth',
    price: 'From $7,500',
    priceNote: 'one-time',
    description:
      'Multi-area automation with custom AI agents and ongoing optimization.',
    features: [
      'Everything in Starter',
      'Up to 3 automation areas',
      'Custom AI agent deployment',
      'Systems integration across tools',
      '90 days post-launch support',
      'Monthly performance reviews',
      'Priority response time',
    ],
    cta: { label: 'Book a Call', href: '#contact' },
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description:
      'Full-stack AI transformation with dedicated support and SLA.',
    features: [
      'Everything in Growth',
      'Unlimited automation areas',
      'AI strategy & governance consulting',
      'Custom chatbot & conversational AI',
      'Dedicated account manager',
      'SLA with guaranteed response times',
      'Quarterly roadmap reviews',
      'On-site training available',
    ],
    cta: { label: 'Contact Us', href: '#contact' },
  },
];

/* ─── Case Studies ─── */

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  services: string[];
  metrics: { value: string; label: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'phoenix-hvac',
    title: 'Phoenix HVAC Company',
    industry: 'Home Services',
    challenge:
      'Missed 40% of inbound leads because the office manager couldn\'t answer every call. Scheduling was done by hand on a whiteboard, leading to constant double-bookings during peak summer months.',
    solution:
      'Deployed AI-powered lead response with automated follow-up sequences, plus a smart scheduling system that accounts for technician location, skill set, and travel time.',
    services: ['lead-response', 'scheduling-ops'],
    metrics: [
      { value: '47%', label: 'More Booked Jobs' },
      { value: '12', label: 'Hrs/Wk Saved' },
      { value: '$38K', label: 'Annual Recovery' },
    ],
  },
  {
    slug: 'regional-property-mgmt',
    title: 'Regional Property Management',
    industry: 'Real Estate',
    challenge:
      'Managing 200+ units across 3 cities with data spread across spreadsheets, email, and a legacy property management system. Monthly reporting took the team 2 full days.',
    solution:
      'Built automated data pipelines connecting their property management system, accounting software, and maintenance tracking, with real-time dashboards replacing manual reports.',
    services: ['data-reporting', 'systems-integration'],
    metrics: [
      { value: '85%', label: 'Less Manual Reporting' },
      { value: '3', label: 'Systems Connected' },
      { value: '$52K', label: 'Annual Recovery' },
    ],
  },
  {
    slug: 'ecommerce-retailer',
    title: 'E-commerce Retailer',
    industry: 'Retail',
    challenge:
      'Customer support volume doubled after a product line expansion, but the team couldn\'t hire fast enough. Response times stretched to 48+ hours, driving negative reviews.',
    solution:
      'Deployed a custom AI agent for first-line customer support and a conversational chatbot handling order status, returns, and product questions, with seamless handoff to humans for complex issues.',
    services: ['custom-ai-agents', 'chatbots'],
    metrics: [
      { value: '60%', label: 'Ticket Deflection' },
      { value: '24/7', label: 'Response Coverage' },
      { value: '35%', label: 'More Repeat Orders' },
    ],
  },
];

/* ─── FAQ ─── */

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'process' | 'pricing' | 'technical';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is an AI readiness audit?',
    answer:
      'It\'s a 16-question assessment that evaluates how your business handles leads, operations, communication, and admin work today. You get an instant scored report showing where you\'re losing time and money, plus concrete recommendations for automation.',
    category: 'general',
  },
  {
    question: 'Who is this for?',
    answer:
      'Small and mid-size businesses (typically 5–200 employees) that rely on manual processes for lead management, reporting, scheduling, or customer communication. If your team spends hours on repetitive tasks, we can help.',
    category: 'general',
  },
  {
    question: 'Do I need technical knowledge to work with you?',
    answer:
      'Not at all. We handle the technical implementation end-to-end. Your role is to tell us how your business works today and what\'s not working, we take it from there.',
    category: 'general',
  },
  {
    question: 'How long does a typical engagement take?',
    answer:
      'Most projects deploy in 3–6 weeks from kickoff. The audit itself takes about 12 minutes, the results review is a 30-minute call, and planning takes 3–5 days before we start building.',
    category: 'process',
  },
  {
    question: 'What happens after the audit?',
    answer:
      'You get an instant scored report and we schedule a 30-minute results review call. There\'s no obligation, if you want to move forward, we scope a custom plan. If not, you keep the report and roadmap.',
    category: 'process',
  },
  {
    question: 'Do you replace our existing tools?',
    answer:
      'Rarely. We integrate with the tools you already use, CRM, email, accounting, scheduling. The goal is to make your current stack work better together, not to rip and replace.',
    category: 'process',
  },
  {
    question: 'Will AI replace my team?',
    answer:
      'No. We automate the repetitive, manual tasks that drain your team\'s time, so they can focus on the work that actually requires human judgment, creativity, and relationships.',
    category: 'general',
  },
  {
    question: 'How much does it cost?',
    answer:
      'The audit is free. Engagements start at $2,500 for a single automation focus area. Multi-area projects and custom AI agent deployments are scoped based on complexity. Every engagement starts with a free audit so you know the potential ROI before committing.',
    category: 'pricing',
  },
  {
    question: 'What\'s included in post-launch support?',
    answer:
      'Starter plans include 30 days of support. Growth plans include 90 days with monthly performance reviews. Enterprise plans include dedicated account management and SLA-backed response times.',
    category: 'pricing',
  },
  {
    question: 'Can I start with the audit and decide later?',
    answer:
      'Absolutely. The audit is free with no commitment. You get a scored report and roadmap regardless. Most clients take a week or two to review before deciding on next steps.',
    category: 'pricing',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. All data is encrypted in transit and at rest. We follow SOC 2-aligned practices, never share client data with third parties, and can sign NDAs or BAAs as needed.',
    category: 'technical',
  },
  {
    question: 'What AI models do you use?',
    answer:
      'We select models based on your specific use case, balancing capability, cost, and data privacy requirements. We work with leading providers including Anthropic, OpenAI, and open-source models when appropriate.',
    category: 'technical',
  },
  {
    question: 'Can you integrate with our existing systems?',
    answer:
      'Yes. We specialize in connecting the tools teams already use, HubSpot, Salesforce, QuickBooks, Google Workspace, Outlook, Slack, and hundreds more through custom API integrations.',
    category: 'technical',
  },
  {
    question: 'What if the automation doesn\'t work as expected?',
    answer:
      'Every deployment includes a testing and validation phase before going live. Post-launch, we monitor performance and make adjustments. Our goal is measurable improvement, if something isn\'t working, we fix it.',
    category: 'technical',
  },
];

export const FAQ_CATEGORIES: { key: FAQItem['category']; label: string }[] = [
  { key: 'general', label: 'General' },
  { key: 'process', label: 'Process' },
  { key: 'pricing', label: 'Pricing' },
  { key: 'technical', label: 'Technical' },
];

/* ─── Helpers ─── */

export function getServiceBySlug(slug: string): AIService | undefined {
  return AI_SERVICES.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string, count = 3): AIService[] {
  const current = getServiceBySlug(slug);
  if (!current) return AI_SERVICES.slice(0, count);
  // Prefer same category, then others
  const sameCategory = AI_SERVICES.filter(
    (s) => s.slug !== slug && s.category === current.category,
  );
  const otherCategory = AI_SERVICES.filter(
    (s) => s.slug !== slug && s.category !== current.category,
  );
  return [...sameCategory, ...otherCategory].slice(0, count);
}
