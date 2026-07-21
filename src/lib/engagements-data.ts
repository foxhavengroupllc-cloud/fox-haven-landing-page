/* ══════════════════════════════════════════════════════════════
   FOX HAVEN GROUP — the four engagement areas.

   Source of truth for the engagement cards on /services and the
   detail pages at /services/<slug>. Copy is taken verbatim from the
   June 28, 2026 "Website Updates To Do" punch list (Pages 1–4).

   The old six capability detail pages are retired; the capability
   tiles on /services are static. The former product catalog lives
   on in services-data.ts as reference only.
   ══════════════════════════════════════════════════════════════ */

export interface BridgeStepUse {
  name: string;
  desc: string;
}

export interface Engagement {
  slug: string;
  title: string;
  price: string; // "Starting at $4,500"
  tagline: string; // hero subtitle
  intro: string[]; // hero paragraphs
  whatItIs: string[];
  bridgeSteps: BridgeStepUse[];
  bridgeLead: string;
  bestForIntro: string;
  bestFor: string[];
  notFitIntro: string;
  notFit: string[];
  notFitOutro?: string;
  whatWeDoIntro: string;
  whatWeDo: string[];
  deliverablesIntro: string;
  deliverables: string[];
  timeline: string;
  pricing: string[];
  walkAway: string;
  cta: string;
  /** Standing ethics/boundaries note (shown on TA per the 6/28 list). */
  note?: string;
}

export const ETHICS_NOTE =
  'Fox Haven Group accepts engagements that are independently scoped, non-conflicting, and aligned with appropriate professional and ethical boundaries.';

export const engagements: Engagement[] = [
  {
    slug: 'systems-diagnostic',
    title: 'Systems Diagnostic',
    price: 'Starting at $4,500',
    tagline: 'Before you build the solution, understand the system.',
    intro: [
      'A Systems Diagnostic is a focused first engagement that helps your team understand what is really happening before you invest time, trust, and resources into a strategy.',
      'Many communities see something that worked somewhere else and think, "We should do that here." Sometimes that instinct is right. Sometimes the strategy is not evidence-based, does not match the local need, or requires readiness conditions that are not in place yet.',
      'The Systems Diagnostic helps you slow down in the right places so the work can move faster later.',
    ],
    whatItIs: [
      'The Systems Diagnostic is a clear, practical read of your current landscape. We look at the problem you are trying to solve, the strategy you are considering, the people involved, the barriers in the way, and the conditions that need to be in place for implementation to work.',
      'This is not a long academic study. It is a focused implementation assessment designed to help your team make better decisions and choose the next right step.',
    ],
    bridgeLead: 'The Systems Diagnostic uses the early steps of The Implementation Bridge.',
    bridgeSteps: [
      {
        name: 'Clarify',
        desc: 'We define the problem, the proposed strategy, who it is meant to serve, and what success should look like.',
      },
      {
        name: 'Engage',
        desc: 'We identify who needs to be part of the conversation, who will be affected by the work, and who will be expected to carry it out.',
      },
      {
        name: 'Prepare',
        desc: 'We look at readiness conditions, including capacity, governance, staffing, workflows, data, funding alignment, partner roles, and implementation risks.',
      },
    ],
    bestForIntro: 'A Systems Diagnostic is a good fit if your team is:',
    bestFor: [
      'Exploring a new strategy or program.',
      'Responding to a grant requirement.',
      'Trying to decide whether an evidence-based strategy fits your local context.',
      'Feeling pressure to act but unsure what should come first.',
      'Seeing partner enthusiasm but not enough shared direction.',
      'Stuck between a good idea and a workable plan.',
      'Trying to understand why prior efforts have stalled.',
      'Preparing to apply for funding and needing a stronger implementation foundation.',
    ],
    notFitIntro: 'This may not be the right starting point if:',
    notFit: [
      'You already have a fully developed implementation plan and only need someone to deliver a one-time training.',
      'You are looking for someone to rubber-stamp a strategy that has already been chosen.',
      'You need a full community needs assessment, program evaluation, or long-term facilitation process.',
      'You need urgent crisis response or direct services.',
    ],
    whatWeDoIntro: 'A typical Systems Diagnostic may include:',
    whatWeDo: [
      'Kickoff meeting with your core team.',
      'Review of relevant documents, grant requirements, policies, workplans, data summaries, or prior assessments.',
      'Stakeholder mapping.',
      'A focused set of interviews or listening sessions.',
      'Review of the proposed strategy and available evidence.',
      'Readiness scan.',
      'Barrier and facilitator analysis.',
      'Implementation risk review.',
      'Practical recommendations for next steps.',
    ],
    deliverablesIntro: 'You will receive:',
    deliverables: [
      'A short written diagnostic memo.',
      'A stakeholder map.',
      'A readiness and implementation conditions summary.',
      'Key barriers, risks, and opportunities.',
      'Recommended next steps.',
      'A readout session with time for questions and discussion.',
    ],
    timeline:
      'Most Systems Diagnostics take 2 to 4 weeks, depending on the number of partners involved and the materials available for review.',
    pricing: [
      'Systems Diagnostic engagements start at $4,500.',
      'Final pricing depends on the number of interviews or listening sessions, the amount of document review needed, and whether your team needs a short memo, full briefing deck, or facilitated readout.',
    ],
    walkAway:
      'You will leave with a clearer understanding of what your community needs, whether the proposed strategy is the right fit, what conditions need to be strengthened, and what should happen next.',
    cta: 'Start a Systems Diagnostic',
  },
  {
    slug: 'implementation-blueprint',
    title: 'Implementation Blueprint',
    price: 'Starting at $9,500',
    tagline: 'Turn the idea into a plan people can actually carry.',
    intro: [
      'An Implementation Blueprint is a practical planning engagement for teams that know what they want to move but need help turning it into real-world action.',
      'This is where evidence becomes a workplan. We help your team define the strategy, build shared understanding, prepare the system, and create the structure needed to implement with fidelity, fit, and buy-in.',
    ],
    whatItIs: [
      'The Implementation Blueprint is a detailed implementation plan for a specific strategy, program, policy, grant requirement, or systems-change effort.',
      'It is built for real conditions, not ideal ones. That means we pay attention to capacity, partner roles, trust, funding alignment, workflows, governance, communication, data, and sustainability from the beginning.',
    ],
    bridgeLead:
      'The Implementation Blueprint uses the middle of The Implementation Bridge while still grounding the work in clarity and trust.',
    bridgeSteps: [
      {
        name: 'Clarify',
        desc: 'We confirm what is being implemented, why it matters, who it serves, and what success looks like.',
      },
      {
        name: 'Engage',
        desc: 'We bring the right people into the process so the plan is not built in a vacuum.',
      },
      {
        name: 'Design',
        desc: 'We translate research, policy, and best practice into a local implementation strategy.',
      },
      {
        name: 'Prepare',
        desc: 'We strengthen the conditions needed to carry the work, including roles, governance, capacity, data, funding alignment, communication, and implementation support.',
      },
    ],
    bestForIntro: 'An Implementation Blueprint is a good fit if your team:',
    bestFor: [
      'Has selected a strategy but does not yet have a practical implementation plan.',
      'Needs to turn a grant requirement into field-ready work.',
      'Has a coalition or workgroup with energy but not enough structure.',
      'Needs clarity on roles, sequencing, governance, or partner responsibilities.',
      'Wants to adapt an evidence-based strategy without losing the parts that make it work.',
      'Needs a plan that can be used by staff, partners, funders, and community members.',
      'Wants to move from "we should do this" to "here is how we will do this."',
    ],
    notFitIntro: 'This may not be the right starting point if:',
    notFit: [
      'The team has not yet clarified the problem or selected a direction.',
      'There is major disagreement among partners that needs to be addressed first.',
      'The community need is unclear.',
      'You need a neutral assessment before planning begins.',
    ],
    notFitOutro: 'In those cases, a Systems Diagnostic may be the better first step.',
    whatWeDoIntro: 'A typical Implementation Blueprint engagement may include:',
    whatWeDo: [
      'Kickoff and planning session.',
      'Review of evidence, policy, funding requirements, and existing materials.',
      'Stakeholder engagement or partner input sessions.',
      'Strategy fit and adaptation review.',
      'Implementation planning.',
      'Role and governance design.',
      'Workgroup model development.',
      'Timeline and sequencing.',
      'Communication and buy-in planning.',
      'Fidelity and adaptation guidance.',
      'Early evaluation and learning measures.',
      'Sustainability considerations.',
    ],
    deliverablesIntro: 'You will receive:',
    deliverables: [
      'Implementation roadmap.',
      'Roles and responsibilities.',
      'Timeline and sequencing plan.',
      'Partner or workgroup structure.',
      'Fidelity and adaptation guidance.',
      'Communication and buy-in plan.',
      'Implementation risk log.',
      'Early learning measures.',
      'Sustainability considerations.',
      'Final readout or planning session.',
    ],
    timeline: 'Most Implementation Blueprint engagements take 4 to 8 weeks.',
    pricing: [
      'Implementation Blueprint engagements start at $9,500.',
      'Final pricing depends on the number of partners involved, the level of facilitation needed, the complexity of the strategy, and whether the final product is a concise implementation roadmap or a full implementation package.',
    ],
    walkAway:
      'You will leave with a practical plan that explains what will happen, who is responsible, what needs to be protected, what can be adapted, what should happen first, and how the work can keep moving after the planning process ends.',
    cta: 'Build an Implementation Blueprint',
  },
  {
    slug: 'technical-assistance-partner',
    title: 'Technical Assistance Partner',
    price: 'Starting at $2,250/month',
    tagline: 'Support for the messy middle of implementation.',
    intro: [
      'Plans rarely fail because people do not care. They fail because conditions change, partners get stuck, roles are unclear, questions come up, and the work gets harder once it leaves the planning table.',
      'The Technical Assistance Partner engagement provides ongoing support as your team moves from plan to practice.',
    ],
    whatItIs: [
      'This is a recurring support model for teams that are implementing, adapting, troubleshooting, or sustaining complex work.',
      'Technical assistance may include coaching, meeting support, workplan review, implementation troubleshooting, resource development, training support, partner facilitation, and practical recommendations as the work unfolds.',
      'It is not another binder. It is support that helps your team make decisions, solve problems, and keep moving.',
    ],
    bridgeLead:
      'Technical Assistance Partner engagements focus on the later steps of The Implementation Bridge while returning to earlier steps when the work needs it.',
    bridgeSteps: [
      {
        name: 'Prepare',
        desc: 'We help strengthen the structures that hold the work, including roles, meeting rhythms, workflows, partner communication, and readiness conditions.',
      },
      {
        name: 'Implement',
        desc: 'We support execution through coaching, troubleshooting, adaptation tracking, fidelity support, workplan review, and practical next steps.',
      },
      {
        name: 'Learn & Adapt',
        desc: 'We help teams notice what is working, what is not, and what needs to change without losing the core components that make the strategy effective.',
      },
    ],
    bestForIntro: 'A Technical Assistance Partner engagement is a good fit if your team:',
    bestFor: [
      'Is actively implementing a strategy or grant-funded project.',
      'Needs regular implementation support.',
      'Has partners who need help staying aligned.',
      'Needs help translating plans into weekly or monthly action.',
      'Is running into barriers and needs structured troubleshooting.',
      'Needs support adapting a strategy without drifting from what makes it work.',
      'Wants help with meeting structure, implementation tracking, or partner communication.',
      'Needs practical support for harm reduction, overdose prevention, public health, public safety collaboration, coalition work, or other complex community implementation efforts.',
    ],
    notFitIntro: 'This may not be the right fit if:',
    notFit: [
      'You only need a one-time training.',
      'You do not yet know what problem you are trying to solve.',
      'You need someone to manage your full program operations.',
      'You need direct clinical, legal, or crisis response services.',
      'You need support that creates a conflict of interest with another active role or obligation.',
    ],
    whatWeDoIntro: 'A Technical Assistance Partner engagement may include:',
    whatWeDo: [
      'Monthly or biweekly TA sessions.',
      'Implementation coaching.',
      'Workplan review.',
      'Meeting design or facilitation support.',
      'Partner troubleshooting.',
      'Adaptation logs.',
      'Fidelity support.',
      'Resource development.',
      'Training or learning session support.',
      'Brief written recommendations.',
      'Support preparing for funder check-ins or internal progress reviews.',
      'Learning and improvement support.',
    ],
    deliverablesIntro: 'Depending on the scope, you may receive:',
    deliverables: [
      'Defined monthly advisory hours.',
      'Scheduled TA sessions.',
      'Written recommendations.',
      'Workplan or document review.',
      'Implementation troubleshooting notes.',
      'Adaptation log or decision tracker.',
      'Meeting agendas or facilitation plans.',
      'Resource tools or templates.',
      'Monthly progress summary.',
    ],
    timeline:
      'Technical Assistance Partner engagements are usually structured as monthly retainers. A 3-month minimum can support focused troubleshooting or early implementation support. A 6-month engagement is recommended for deeper implementation coaching and partner support.',
    pricing: [
      'Focused TA Retainer starts at $2,250/month for up to 15 hours per month.',
      'Expanded TA Retainer starts at $4,500/month for up to 30 hours per month.',
      'Custom scopes are available for larger implementation efforts, training series, or multi-partner support.',
    ],
    walkAway:
      'You will have practical support while the work is actually happening, including a thought partner who can help your team make sense of barriers, adapt responsibly, keep partners aligned, and move from activity to progress.',
    cta: 'Discuss TA Support',
    note: ETHICS_NOTE,
  },
  {
    slug: 'systems-change-initiative',
    title: 'Systems Change Initiative',
    price: 'Starting at $20,000',
    tagline: 'For work that is bigger than one program.',
    intro: [
      'Some challenges cannot be solved by a single training, workplan, coalition meeting, or agency decision. They require multiple partners, shared direction, clear governance, practical infrastructure, and a learning process that helps the work improve over time.',
      'A Systems Change Initiative is a larger engagement for funders, agencies, coalitions, and cross-sector partners working to move complex community change.',
    ],
    whatItIs: [
      'This engagement helps partners build the structure needed to move a complex issue across organizations, sectors, and community conditions.',
      'That may include shared strategy, governance design, implementation infrastructure, partner facilitation, workgroup models, communication structures, readiness-building, and learning loops.',
      'The goal is not to make the work look impressive on paper. The goal is to make the work hold in practice.',
    ],
    bridgeLead: 'Systems Change Initiatives use the full Implementation Bridge.',
    bridgeSteps: [
      {
        name: 'Clarify',
        desc: 'We help partners define the problem, shared purpose, desired outcomes, and scope of the work.',
      },
      {
        name: 'Engage',
        desc: 'We identify who needs to be involved, who has been left out, who carries the work, and who is affected by the decisions being made.',
      },
      {
        name: 'Design',
        desc: 'We translate evidence, policy, funding priorities, and local knowledge into a shared strategy.',
      },
      {
        name: 'Prepare',
        desc: 'We build the conditions needed to carry the work, including governance, roles, workgroups, meeting rhythms, communication, capacity, data, and funding alignment.',
      },
      {
        name: 'Implement',
        desc: 'We support partners as the work moves into action through facilitation, technical assistance, troubleshooting, adaptation tracking, and fidelity support.',
      },
      {
        name: 'Learn & Adapt',
        desc: 'We help build the learning system that allows partners to understand what is changing, where the work is getting stuck, and how to improve over time.',
      },
    ],
    bestForIntro: 'A Systems Change Initiative is a good fit if your team is:',
    bestFor: [
      'Leading a multi-agency or multi-sector effort.',
      'Trying to move a complex public health or community issue.',
      'Working across public health, public safety, behavioral health, healthcare, education, local government, or community partners.',
      'Managing a grant-funded initiative with multiple partners and moving pieces.',
      'Trying to build governance, infrastructure, and accountability around a shared strategy.',
      'Facing a challenge where the issue is not lack of effort, but lack of alignment and structure.',
      'Preparing for a major implementation effort that needs to last beyond one funding cycle.',
    ],
    notFitIntro: 'This may not be the right fit if:',
    notFit: [
      'You need a small, one-time deliverable.',
      'You do not yet have leadership support or partner willingness to participate.',
      'You need someone to provide direct services.',
      'You are not ready for honest feedback about barriers, readiness, trust, or implementation conditions.',
    ],
    notFitOutro:
      'If your team is not sure whether you are ready for this level of work, a Systems Diagnostic is usually the better first step.',
    whatWeDoIntro: 'A Systems Change Initiative may include:',
    whatWeDo: [
      'Discovery and system mapping.',
      'Stakeholder interviews or listening sessions.',
      'Partner engagement strategy.',
      'Governance structure.',
      'Workgroup model design.',
      'Implementation infrastructure.',
      'Strategy and action planning.',
      'Facilitation of cross-sector meetings.',
      'Policy and funding alignment review.',
      'Communication and buy-in support.',
      'Technical assistance during implementation.',
      'Evaluation and learning framework.',
      'Sustainability planning.',
    ],
    deliverablesIntro: 'Depending on the scope, you may receive:',
    deliverables: [
      'Systems map or landscape summary.',
      'Shared strategy document.',
      'Governance and workgroup structure.',
      'Implementation roadmap.',
      'Partner roles and responsibilities.',
      'Meeting cadence and facilitation plan.',
      'Communication and engagement plan.',
      'Implementation risk and readiness summary.',
      'Evaluation and learning framework.',
      'Sustainability plan.',
      'Final briefing or partner readout.',
    ],
    timeline:
      'Systems Change Initiatives are typically scoped over 3 to 6 months or longer, depending on the number of partners, issue complexity, and level of facilitation needed.',
    pricing: [
      'Systems Change Initiatives start at $20,000.',
      'Larger multi-partner efforts are quoted based on scope, timeline, facilitation needs, deliverables, and implementation support.',
    ],
    walkAway:
      'You will have a shared structure for moving complex work, not just a shared desire to do something good. Partners will leave with clearer roles, stronger alignment, practical infrastructure, and a path for learning and adapting as the work moves forward.',
    cta: 'Scope a Systems Change Initiative',
  },
];

export function getEngagementBySlug(slug: string): Engagement | undefined {
  return engagements.find((e) => e.slug === slug);
}
