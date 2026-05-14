import Anthropic from '@anthropic-ai/sdk';

export interface ToolRecommendation {
  tool: string;
  purpose: string;
  monthlyCost: string;
  setupNotes: string;
}

export interface ImplementationPhase {
  phase: string;
  description: string;
  timeline: string;
  deliverables: string[];
}

export interface CostBreakdown {
  foxHavenCost: { setup: string; monthly: string };
  suggestedClientPrice: { setup: string; monthly: string };
  margin: string;
}

export interface InternalPlan {
  toolRecommendations: ToolRecommendation[];
  implementationPhases: ImplementationPhase[];
  costBreakdown: CostBreakdown;
  quickWins: string[];
}

const FALLBACK_PLAN: InternalPlan = {
  toolRecommendations: [
    { tool: 'Zapier or Make.com', purpose: 'Workflow automation between existing tools', monthlyCost: '$20–$69/mo', setupNotes: '2–4 hours to configure initial workflows' },
    { tool: 'HubSpot CRM (Free/Starter)', purpose: 'Lead tracking and sales follow-up automation', monthlyCost: '$0–$50/mo', setupNotes: '4–8 hours for setup and data migration' },
    { tool: 'Calendly', purpose: 'Automated scheduling and meeting booking', monthlyCost: '$0–$16/mo', setupNotes: '1–2 hours to configure' },
  ],
  implementationPhases: [
    { phase: 'Phase 1: Quick Wins', description: 'Implement immediate automation for highest-impact gaps', timeline: '1–2 weeks', deliverables: ['Workflow automation setup', 'Lead response automation', 'Scheduling system'] },
    { phase: 'Phase 2: System Integration', description: 'Connect tools and eliminate duplicate data entry', timeline: '2–4 weeks', deliverables: ['Tool integrations', 'Reporting dashboards', 'Process documentation'] },
    { phase: 'Phase 3: Optimization', description: 'Refine automations and train team', timeline: '2–4 weeks', deliverables: ['Team training', 'Performance monitoring', 'AI policy documentation'] },
  ],
  costBreakdown: {
    foxHavenCost: { setup: '$2,500–$5,000 (15–30 hrs @ $150–175/hr)', monthly: '$500–$1,000 retainer' },
    suggestedClientPrice: { setup: '$5,000–$12,000', monthly: '$1,000–$2,500' },
    margin: '50–60%',
  },
  quickWins: [
    'Set up automated lead response within 24 hours',
    'Create email templates for top 5 common customer questions',
    'Configure basic CRM pipeline for sales tracking',
  ],
};

export async function generateImplementationPlan(auditData: {
  companyName: string;
  industry: string;
  revenueBand: string;
  score: number;
  tier: string;
  sections: Array<{ section: string; normalized: number }>;
  opportunities: Array<{ title: string; description: string; impact: string; savingsEstimate?: string }>;
  blockers: Array<{ title: string; description: string; severity: string }>;
  inefficiencyLow: number;
  inefficiencyHigh: number;
  answers: Record<string, string>;
}): Promise<InternalPlan> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.includes('ROTATE')) return FALLBACK_PLAN;

  const client = new Anthropic({ apiKey });

  const prompt = `You are a business automation consultant. Based on this audit data, generate a JSON implementation plan.

Company: ${auditData.companyName}
Industry: ${auditData.industry || 'Not specified'}
Revenue: ${auditData.revenueBand || 'Not specified'}
Score: ${auditData.score}/100 (${auditData.tier})
Inefficiency estimate: $${auditData.inefficiencyLow.toLocaleString()}–$${auditData.inefficiencyHigh.toLocaleString()}/year

Top opportunities: ${auditData.opportunities.map((o) => `${o.title} (${o.impact}, ${o.savingsEstimate || 'N/A'})`).join('; ')}
Blockers: ${auditData.blockers.map((b) => `${b.title} (${b.severity})`).join('; ')}

Key answers:
- Lead response time: ${auditData.answers['sales_01'] || 'N/A'}
- Sales follow-up: ${auditData.answers['sales_03'] || 'N/A'}
- Duplicate data entry: ${auditData.answers['ops_03'] || 'N/A'}
- Admin hours/week: ${auditData.answers['admin_02'] || 'N/A'}
- Software tools count: ${auditData.answers['ops_02'] || 'N/A'}
- AI usage: ${auditData.answers['ai_01'] || 'N/A'}
- Team adoption readiness: ${auditData.answers['ready_01'] || 'N/A'}

Reference rates:
- Fox Haven consulting: $150–175/hr
- Typical setup: 10–40 hours
- Common tools: HubSpot ($0–50/mo), Zapier ($20–69/mo), Make.com ($9–29/mo), Calendly ($0–16/mo), ActiveCampaign ($29–149/mo), ChatGPT Team ($25/user/mo)

Respond in JSON only. Be concise. No explanations outside the JSON structure.

Return exactly this JSON structure:
{
  "toolRecommendations": [{ "tool": "", "purpose": "", "monthlyCost": "", "setupNotes": "" }],
  "implementationPhases": [{ "phase": "", "description": "", "timeline": "", "deliverables": [""] }],
  "costBreakdown": { "foxHavenCost": { "setup": "", "monthly": "" }, "suggestedClientPrice": { "setup": "", "monthly": "" }, "margin": "" },
  "quickWins": [""]
}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await client.messages.create(
      {
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      },
      { signal: controller.signal }
    );

    clearTimeout(timeout);

    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return FALLBACK_PLAN;

    const parsed = JSON.parse(jsonMatch[0]) as InternalPlan;

    if (!parsed.toolRecommendations || !parsed.implementationPhases || !parsed.costBreakdown) {
      return FALLBACK_PLAN;
    }

    return parsed;
  } catch (error) {
    console.error('Claude plan generation failed, using fallback:', error instanceof Error ? error.message : 'unknown');
    return FALLBACK_PLAN;
  }
}
