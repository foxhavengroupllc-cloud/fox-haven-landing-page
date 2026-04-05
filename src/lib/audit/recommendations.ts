export interface Opportunity { title: string; description: string; impact: 'HIGH' | 'MEDIUM'; savingsEstimate?: string; }
export interface Blocker { title: string; description: string; severity: 'CRITICAL' | 'MODERATE'; }

export function generateOpportunities(answers: Record<string, string>): Opportunity[] {
  const opps: Opportunity[] = [];
  if (answers['sales_03'] === 'all_manual' || answers['sales_03'] === 'mostly_manual')
    opps.push({ title: 'Automate Sales Follow-Up Sequences', description: 'Your team is manually managing follow-ups \u2014 the single largest revenue leak we see in small businesses. Automated sequences ensure no lead falls through the cracks.', impact: 'HIGH', savingsEstimate: '$8K\u2013$30K/yr' });
  if (answers['sales_01'] === 'next_day' || answers['sales_01'] === 'days_plus')
    opps.push({ title: 'Implement Instant Lead Response', description: 'Your current response time is costing you conversions. An automated first-touch response within 5 minutes can recover up to 80% of leads that currently go cold.', impact: 'HIGH', savingsEstimate: '$12K\u2013$25K/yr' });
  if (answers['ops_03'] === 'constantly' || answers['ops_03'] === 'often')
    opps.push({ title: 'Eliminate Duplicate Data Entry', description: 'Your team is entering the same information into multiple systems. Simple integrations can eliminate this entirely and reduce errors.', impact: 'HIGH', savingsEstimate: '$5K\u2013$20K/yr' });
  if (answers['admin_02'] === '10_plus' || answers['admin_02'] === '5_10')
    opps.push({ title: 'Reduce Administrative Overhead', description: 'Your team is spending significant time on admin tasks. Automation and better tooling can cut this by 40\u201360%.', impact: answers['admin_02'] === '10_plus' ? 'HIGH' : 'MEDIUM', savingsEstimate: answers['admin_02'] === '10_plus' ? '$12K\u2013$24K/yr' : '$6K\u2013$12K/yr' });
  if (answers['admin_01'] === 'manual_compile')
    opps.push({ title: 'Automate Business Reporting', description: 'Manual report building typically costs 2\u20135 hours per report. Automated dashboards eliminate the compile cycle entirely.', impact: 'MEDIUM', savingsEstimate: '$4K\u2013$8K/yr' });
  if (answers['comm_02'] === 'varies' || answers['comm_02'] === 'no_idea')
    opps.push({ title: 'Standardize Customer Communication', description: 'Inconsistent responses erode trust and create repeat support loops. Templates or an AI-assisted response system can bring consistency.', impact: 'MEDIUM' });
  return opps.slice(0, 3);
}

export function generateBlockers(answers: Record<string, string>): Blocker[] {
  const blockers: Blocker[] = [];
  if (answers['lead_01'] === 'nobody_really')
    blockers.push({ title: 'No Owner for Process Improvement', description: 'Without someone responsible for operational improvement, initiatives stall.', severity: 'CRITICAL' });
  if (answers['lead_02'] === 'never_tried')
    blockers.push({ title: 'High Resistance to Change', description: 'Your organization rarely adopts new tools or processes. This is the #1 barrier to capturing efficiency gains.', severity: 'CRITICAL' });
  if (answers['ready_01'] === 'significant_resistance')
    blockers.push({ title: 'Team Adoption Risk', description: 'Significant team resistance means any changes need careful rollout with clear training and visible ROI.', severity: 'CRITICAL' });
  if (answers['ai_01'] === 'yes_informally' && answers['ai_03'] === 'no')
    blockers.push({ title: 'Unreviewed AI Outputs in Work Products', description: 'AI-generated content is going directly into work without review. This creates quality and liability risks.', severity: 'CRITICAL' });
  if (answers['ops_02'] === '10_plus')
    blockers.push({ title: 'Excessive Tool Sprawl', description: 'Using 10+ systems day-to-day creates data silos and makes process improvement exponentially harder.', severity: 'MODERATE' });
  return blockers.slice(0, 3);
}
