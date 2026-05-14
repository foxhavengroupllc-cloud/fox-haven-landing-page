export type SectionKey =
  | 'leadership' | 'sales' | 'operations'
  | 'admin' | 'communication' | 'ai_usage' | 'readiness';

export type QuestionOption = {
  value: string;
  label: string;
  scoreImpact: number;
  hint?: string;
};

export type Question = {
  id: string;
  section: SectionKey;
  text: string;
  subtext?: string;
  type: 'single' | 'scale' | 'multi';
  options: QuestionOption[];
  branchIf?: { questionId: string; value: string };
  weight: number;
};

export const SECTION_LABELS: Record<SectionKey, string> = {
  leadership: 'Leadership & Decision-Making',
  sales: 'Sales & Lead Response',
  operations: 'Operations & Workflow',
  admin: 'Admin & Reporting',
  communication: 'Customer Communication',
  ai_usage: 'AI Usage & Policy',
  readiness: 'Change Readiness',
};

export const QUESTIONS: Question[] = [
  { id: 'lead_01', section: 'leadership', text: 'Who owns process improvement at your company right now?', subtext: 'We want to understand where operational change actually comes from.', type: 'single', weight: 2, options: [
    { value: 'dedicated_role', label: 'We have a dedicated ops or systems role', scoreImpact: 8, hint: 'Clear ownership accelerates implementation.' },
    { value: 'owner_founder', label: 'It falls to the owner or founder', scoreImpact: 3, hint: 'Common in small companies \u2014 creates bottlenecks.' },
    { value: 'shared_informally', label: 'Shared informally across the team', scoreImpact: 1 },
    { value: 'nobody_really', label: 'Honestly, nobody owns it', scoreImpact: -8, hint: 'No ownership = no sustained improvement. A key risk.' },
  ]},
  { id: 'lead_02', section: 'leadership', text: 'If a tool change could save your team 5 hours a week, how long would it take to approve and implement?', type: 'single', weight: 2, options: [
    { value: 'days', label: 'Days \u2014 we move fast', scoreImpact: 8 },
    { value: 'weeks', label: 'A few weeks \u2014 normal review cycle', scoreImpact: 4 },
    { value: 'months', label: 'Months \u2014 lots of stakeholders involved', scoreImpact: -4 },
    { value: 'never_tried', label: 'We rarely make changes like this', scoreImpact: -8, hint: 'Change resistance is the #1 barrier to AI adoption.' },
  ]},
  { id: 'lead_03', section: 'leadership', text: 'Where would leadership most want time back first?', type: 'single', weight: 1, options: [
    { value: 'admin_reporting', label: 'Administrative and reporting tasks', scoreImpact: 0 },
    { value: 'customer_comms', label: 'Customer communication and follow-up', scoreImpact: 0 },
    { value: 'sales_pipeline', label: 'Sales and pipeline management', scoreImpact: 0 },
    { value: 'team_coordination', label: 'Managing and coordinating the team', scoreImpact: 0 },
    { value: 'scheduling_ops', label: 'Scheduling and operations', scoreImpact: 0 },
  ]},
  { id: 'sales_01', section: 'sales', text: 'When a new inbound lead comes in, how quickly does someone on your team respond?', subtext: 'Research shows lead conversion drops by 80% after the first 5 minutes.', type: 'single', weight: 3, options: [
    { value: 'under_5min', label: 'Under 5 minutes \u2014 automated or always-on', scoreImpact: 10 },
    { value: 'under_hour', label: 'Within an hour', scoreImpact: 6 },
    { value: 'same_day', label: 'Same day, usually', scoreImpact: 2 },
    { value: 'next_day', label: 'Next business day', scoreImpact: -4, hint: 'Most leads have moved on by the next day.' },
    { value: 'days_plus', label: 'Several days or whenever we get to it', scoreImpact: -10, hint: 'This is one of the largest revenue leaks for any business.' },
  ]},
  { id: 'sales_02', section: 'sales', text: 'How are leads qualified before reaching a salesperson or owner?', type: 'single', weight: 2, options: [
    { value: 'automated_scoring', label: 'Automatically \u2014 we have scoring or intake filters', scoreImpact: 8 },
    { value: 'intake_form', label: 'We use an intake form they must complete', scoreImpact: 5 },
    { value: 'first_call', label: 'During the first call or discovery conversation', scoreImpact: 1 },
    { value: 'no_process', label: "We don't qualify \u2014 everyone gets the same response", scoreImpact: -6 },
  ]},
  { id: 'sales_03', section: 'sales', text: 'How much of your sales follow-up relies on someone manually remembering to send a message?', type: 'single', weight: 3, options: [
    { value: 'none_automated', label: "Almost none \u2014 it's automated", scoreImpact: 10 },
    { value: 'some_manual', label: 'Some automated, some manual', scoreImpact: 4 },
    { value: 'mostly_manual', label: "Mostly manual \u2014 it's on us to remember", scoreImpact: -6 },
    { value: 'all_manual', label: "All of it \u2014 if we forget, it doesn't happen", scoreImpact: -10, hint: 'Manual follow-up is one of the highest-cost inefficiencies we see.' },
  ]},
  { id: 'ops_01', section: 'operations', text: 'Where does the most repetitive manual work happen in your business?', type: 'single', weight: 2, options: [
    { value: 'data_entry', label: 'Data entry or transfer between systems', scoreImpact: -6 },
    { value: 'scheduling', label: 'Scheduling, booking, or calendar management', scoreImpact: -4 },
    { value: 'reporting', label: 'Building reports or pulling data together', scoreImpact: -5 },
    { value: 'internal_comms', label: 'Internal communications and status updates', scoreImpact: -3 },
    { value: 'not_sure', label: "Not sure \u2014 it's everywhere", scoreImpact: -7, hint: 'No visibility into bottlenecks makes improvement nearly impossible.' },
  ]},
  { id: 'ops_02', section: 'operations', text: 'How many different software systems does your team use day-to-day?', subtext: 'More systems usually means more duplicate entry and more cracks things fall through.', type: 'single', weight: 2, options: [
    { value: '1_3', label: '1\u20133 tools', scoreImpact: 6 },
    { value: '4_6', label: '4\u20136 tools', scoreImpact: 2 },
    { value: '7_10', label: '7\u201310 tools', scoreImpact: -4 },
    { value: '10_plus', label: "More than 10 \u2014 it's a lot", scoreImpact: -8, hint: 'Tool sprawl creates data silos and significantly increases labor cost.' },
  ]},
  { id: 'ops_03', section: 'operations', text: 'How often does the same information get entered into more than one place?', type: 'single', weight: 3, options: [
    { value: 'rarely', label: 'Rarely \u2014 our systems talk to each other', scoreImpact: 8 },
    { value: 'sometimes', label: 'Sometimes \u2014 a few things require duplicate entry', scoreImpact: 2 },
    { value: 'often', label: "Often \u2014 it's a constant frustration", scoreImpact: -6 },
    { value: 'constantly', label: 'Constantly \u2014 everything gets entered multiple times', scoreImpact: -10, hint: 'Duplicate entry is one of the fastest wins for automation.' },
  ]},
  { id: 'admin_01', section: 'admin', text: 'How are your weekly or monthly business reports put together?', type: 'single', weight: 2, options: [
    { value: 'auto_dashboard', label: 'Automatically \u2014 live dashboards we check anytime', scoreImpact: 8 },
    { value: 'semi_auto', label: 'Semi-automatically \u2014 exports with some manual cleanup', scoreImpact: 4 },
    { value: 'manual_compile', label: 'Manually \u2014 someone builds them every time', scoreImpact: -6, hint: 'Manual reporting typically costs 2\u20135 hours per report.' },
    { value: 'dont_have', label: "We don't have formal reports", scoreImpact: -5 },
  ]},
  { id: 'admin_02', section: 'admin', text: 'How much time does your team spend per week on purely administrative tasks \u2014 not serving customers or growing the business?', type: 'single', weight: 3, options: [
    { value: 'under_2', label: 'Under 2 hours', scoreImpact: 8 },
    { value: '2_5', label: '2\u20135 hours', scoreImpact: 4 },
    { value: '5_10', label: '5\u201310 hours', scoreImpact: -4 },
    { value: '10_plus', label: 'More than 10 hours', scoreImpact: -10, hint: 'At $35/hr fully-loaded, 10 hrs/week = $18,200/year in pure admin cost.' },
  ]},
  { id: 'comm_01', section: 'communication', text: 'How quickly does your business respond to customer inquiries or support requests?', type: 'single', weight: 2, options: [
    { value: 'immediate', label: 'Immediately \u2014 automated or near-instant', scoreImpact: 10 },
    { value: 'within_hour', label: 'Within an hour', scoreImpact: 6 },
    { value: 'same_day', label: 'Same day', scoreImpact: 2 },
    { value: 'next_day', label: 'Next day or longer', scoreImpact: -6, hint: 'Slow response is the #1 reason customers choose competitors.' },
  ]},
  { id: 'comm_02', section: 'communication', text: 'When your team responds to common customer questions, are the answers consistent across team members?', type: 'single', weight: 2, options: [
    { value: 'very_consistent', label: 'Very consistent \u2014 we have scripts or templates', scoreImpact: 8 },
    { value: 'mostly', label: 'Mostly consistent \u2014 similar but not identical', scoreImpact: 4 },
    { value: 'varies', label: 'It varies a lot depending on who responds', scoreImpact: -5, hint: 'Inconsistency erodes trust and creates support loops.' },
    { value: 'no_idea', label: "We're not sure \u2014 we don't review responses", scoreImpact: -7 },
  ]},
  { id: 'ai_01', section: 'ai_usage', text: 'Are people on your team already using AI tools like ChatGPT, Claude, or Copilot for work tasks?', subtext: "There's no wrong answer \u2014 this tells us your starting point.", type: 'single', weight: 2, options: [
    { value: 'yes_formally', label: 'Yes \u2014 with approved tools and clear guidelines', scoreImpact: 8, hint: 'Formal AI usage with governance is best-in-class.' },
    { value: 'yes_informally', label: 'Yes \u2014 informally, on their own', scoreImpact: -2, hint: 'Informal AI without oversight creates data and quality risk.' },
    { value: 'some_do', label: "Some do, some don't \u2014 no consistency", scoreImpact: -3 },
    { value: 'no_not_yet', label: 'No \u2014 not yet', scoreImpact: 2 },
  ]},
  { id: 'ai_02', section: 'ai_usage', text: 'Does your company have any policy or guidelines covering how AI tools should be used?', type: 'single', weight: 2, options: [
    { value: 'yes_formal', label: 'Yes \u2014 a formal written policy', scoreImpact: 10 },
    { value: 'informal_guidance', label: 'Informal guidance \u2014 verbal expectations', scoreImpact: 4 },
    { value: 'no_but_thinking', label: 'No, but we know we should create one', scoreImpact: 0 },
    { value: 'no_not_needed', label: "No \u2014 we don't think we need one", scoreImpact: -8, hint: 'Without policy, companies expose themselves to data leakage and compliance risk.' },
  ]},
  { id: 'ai_03', section: 'ai_usage', text: 'Are the outputs from AI tools your team uses ever reviewed before going into work products?', branchIf: { questionId: 'ai_01', value: 'yes_informally' }, type: 'single', weight: 1, options: [
    { value: 'yes_reviewed', label: 'Yes \u2014 outputs are reviewed before use', scoreImpact: 6 },
    { value: 'sometimes', label: 'Sometimes \u2014 depends on the person', scoreImpact: 0 },
    { value: 'no', label: 'No \u2014 outputs go straight into work', scoreImpact: -5, hint: 'Unreviewed AI outputs in customer-facing work is a quality and liability risk.' },
  ]},
  { id: 'ready_01', section: 'readiness', text: "How would you describe your team's comfort level with adopting new tools or software?", type: 'single', weight: 2, options: [
    { value: 'love_new_tools', label: 'We like trying new tools \u2014 low resistance', scoreImpact: 8 },
    { value: 'open_if_simple', label: "Open to it if it's simple and clearly explained", scoreImpact: 4 },
    { value: 'some_resistance', label: 'Some resistance \u2014 people like how things are now', scoreImpact: -4 },
    { value: 'significant_resistance', label: 'Significant resistance \u2014 this would be a challenge', scoreImpact: -8, hint: 'Team adoption is the #1 reason AI initiatives fail.' },
  ]},
  { id: 'ready_02', section: 'readiness', text: 'If you improved one area in the next 90 days, which would have the biggest impact on your business?', type: 'single', weight: 1, options: [
    { value: 'speed', label: 'Speed \u2014 responding faster to leads and customers', scoreImpact: 0 },
    { value: 'consistency', label: 'Consistency \u2014 same quality every time', scoreImpact: 0 },
    { value: 'visibility', label: "Visibility \u2014 knowing what's actually happening", scoreImpact: 0 },
    { value: 'capacity', label: 'Capacity \u2014 doing more without adding headcount', scoreImpact: 0 },
    { value: 'cost', label: 'Cost \u2014 reducing overhead and admin spend', scoreImpact: 0 },
  ]},
];

export function getVisibleQuestions(answers: Record<string, string>): Question[] {
  return QUESTIONS.filter((q) => {
    if (!q.branchIf) return true;
    return answers[q.branchIf.questionId] === q.branchIf.value;
  });
}
