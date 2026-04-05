import { Resend } from 'resend';
import type { InternalPlan } from '@/lib/audit/generatePlan';

function getResend() { return new Resend(process.env.RESEND_API_KEY); }

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

interface InternalReportData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  industry: string;
  revenueBand: string;
  score: number;
  tier: string;
  inefficiencyLow: number;
  inefficiencyHigh: number;
  opportunities: Array<{ title: string; description: string; impact: string; savingsEstimate?: string }>;
  blockers: Array<{ title: string; description: string; severity: string }>;
  plan: InternalPlan;
  resultsUrl: string;
}

export async function sendInternalReport(data: InternalReportData) {
  const tierColors: Record<string, string> = {
    critical: '#E05555', 'needs-work': '#F0A030', moderate: '#3B6FCF', strong: '#3DB87A',
  };
  const tierColor = tierColors[data.tier] || '#F0A030';

  const toolRows = data.plan.toolRecommendations.map((t) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #243352;color:white;font-size:14px;">${esc(t.tool)}</td><td style="padding:8px 12px;border-bottom:1px solid #243352;color:#9BAAC2;font-size:13px;">${esc(t.purpose)}</td><td style="padding:8px 12px;border-bottom:1px solid #243352;color:#e05e14;font-size:13px;font-weight:600;">${esc(t.monthlyCost)}</td><td style="padding:8px 12px;border-bottom:1px solid #243352;color:#9BAAC2;font-size:13px;">${esc(t.setupNotes)}</td></tr>`
  ).join('');

  const phaseRows = data.plan.implementationPhases.map((p) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #243352;color:#e05e14;font-size:14px;font-weight:600;">${esc(p.phase)}</td><td style="padding:8px 12px;border-bottom:1px solid #243352;color:#9BAAC2;font-size:13px;">${esc(p.description)}</td><td style="padding:8px 12px;border-bottom:1px solid #243352;color:white;font-size:13px;">${esc(p.timeline)}</td><td style="padding:8px 12px;border-bottom:1px solid #243352;color:#9BAAC2;font-size:13px;">${p.deliverables.map(esc).join(', ')}</td></tr>`
  ).join('');

  const oppRows = data.opportunities.map((o) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #243352;color:white;font-size:14px;">${esc(o.title)}</td><td style="padding:8px 12px;border-bottom:1px solid #243352;color:#e05e14;font-size:13px;">${esc(o.impact)}</td><td style="padding:8px 12px;border-bottom:1px solid #243352;color:#e05e14;font-size:13px;font-weight:600;">${esc(o.savingsEstimate || 'N/A')}</td></tr>`
  ).join('');

  const blockerRows = data.blockers.map((b) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #243352;color:white;font-size:14px;">${esc(b.title)}</td><td style="padding:8px 12px;border-bottom:1px solid #243352;color:${b.severity === 'CRITICAL' ? '#E05555' : '#F0A030'};font-size:13px;">${esc(b.severity)}</td></tr>`
  ).join('');

  const quickWinsList = data.plan.quickWins.map((w) => `<li style="color:#9BAAC2;font-size:13px;margin-bottom:6px;">${esc(w)}</li>`).join('');

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0b1c2e;font-family:'DM Sans',system-ui,sans-serif;">
<div style="max-width:700px;margin:0 auto;padding:32px 24px;">

<!-- Header -->
<div style="text-align:center;margin-bottom:24px;">
  <div style="display:inline-block;width:40px;height:40px;background-color:#e05e14;border-radius:8px;line-height:40px;text-align:center;"><span style="color:white;font-weight:bold;font-size:18px;">F</span></div>
  <p style="color:#e05e14;font-size:11px;margin-top:8px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">INTERNAL AUDIT LEAD REPORT</p>
</div>

<!-- Company Info -->
<div style="background-color:#112440;border:1px solid #243352;border-radius:12px;padding:20px;margin-bottom:20px;">
  <p style="color:white;font-size:18px;font-weight:700;margin:0 0 12px;">${esc(data.companyName)}</p>
  <table style="width:100%;"><tbody>
    <tr><td style="color:#9BAAC2;font-size:12px;padding:2px 0;">Contact:</td><td style="color:white;font-size:13px;padding:2px 0;">${esc(data.contactName)} &mdash; <a href="mailto:${esc(data.contactEmail)}" style="color:#e05e14;">${esc(data.contactEmail)}</a></td></tr>
    <tr><td style="color:#9BAAC2;font-size:12px;padding:2px 0;">Industry:</td><td style="color:white;font-size:13px;padding:2px 0;">${esc(data.industry || 'Not specified')}</td></tr>
    <tr><td style="color:#9BAAC2;font-size:12px;padding:2px 0;">Revenue:</td><td style="color:white;font-size:13px;padding:2px 0;">${esc(data.revenueBand || 'Not specified')}</td></tr>
  </tbody></table>
</div>

<!-- Score -->
<div style="text-align:center;margin-bottom:20px;">
  <p style="color:white;font-size:56px;font-weight:700;margin:0;line-height:1;">${data.score}<span style="color:#9BAAC2;font-size:20px;">/100</span></p>
  <span style="display:inline-block;padding:4px 16px;border-radius:9999px;background-color:${tierColor}20;color:${tierColor};font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-top:8px;">${data.tier.replace('-', ' ')}</span>
  <p style="color:#9BAAC2;font-size:14px;margin-top:8px;">Estimated inefficiency: <span style="color:#e05e14;font-weight:600;">$${data.inefficiencyLow.toLocaleString()}&ndash;$${data.inefficiencyHigh.toLocaleString()}/year</span></p>
</div>

<!-- Opportunities -->
<div style="margin-bottom:20px;">
  <p style="color:#e05e14;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;margin-bottom:12px;">TOP OPPORTUNITIES</p>
  <table style="width:100%;border-collapse:collapse;"><thead><tr>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Opportunity</th>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Impact</th>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Est. Savings</th>
  </tr></thead><tbody>${oppRows}</tbody></table>
</div>

<!-- Blockers -->
${data.blockers.length > 0 ? `<div style="margin-bottom:20px;">
  <p style="color:#E05555;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;margin-bottom:12px;">BLOCKERS</p>
  <table style="width:100%;border-collapse:collapse;"><thead><tr>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Blocker</th>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Severity</th>
  </tr></thead><tbody>${blockerRows}</tbody></table>
</div>` : ''}

<!-- Tool Recommendations -->
<div style="margin-bottom:20px;">
  <p style="color:#e05e14;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;margin-bottom:12px;">RECOMMENDED TOOLS</p>
  <table style="width:100%;border-collapse:collapse;"><thead><tr>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Tool</th>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Purpose</th>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Cost</th>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Setup</th>
  </tr></thead><tbody>${toolRows}</tbody></table>
</div>

<!-- Implementation Phases -->
<div style="margin-bottom:20px;">
  <p style="color:#e05e14;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;margin-bottom:12px;">IMPLEMENTATION PLAN</p>
  <table style="width:100%;border-collapse:collapse;"><thead><tr>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Phase</th>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Description</th>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Timeline</th>
    <th style="text-align:left;padding:8px 12px;border-bottom:2px solid #243352;color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Deliverables</th>
  </tr></thead><tbody>${phaseRows}</tbody></table>
</div>

<!-- Cost Breakdown -->
<div style="margin-bottom:20px;">
  <p style="color:#e05e14;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;margin-bottom:12px;">COST / PRICING BREAKDOWN</p>
  <div style="background-color:#112440;border:1px solid #243352;border-radius:12px;padding:20px;">
    <table style="width:100%;"><tbody>
      <tr><td colspan="2" style="color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;padding:4px 0 8px;border-bottom:1px solid #243352;font-weight:600;">Fox Haven Cost (Our Cost)</td></tr>
      <tr><td style="color:#9BAAC2;font-size:13px;padding:6px 0;">Setup:</td><td style="color:white;font-size:13px;padding:6px 0;">${data.plan.costBreakdown.foxHavenCost.setup}</td></tr>
      <tr><td style="color:#9BAAC2;font-size:13px;padding:6px 0 12px;">Monthly:</td><td style="color:white;font-size:13px;padding:6px 0 12px;">${data.plan.costBreakdown.foxHavenCost.monthly}</td></tr>
      <tr><td colspan="2" style="color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;padding:4px 0 8px;border-bottom:1px solid #243352;font-weight:600;">Suggested Client Billing</td></tr>
      <tr><td style="color:#9BAAC2;font-size:13px;padding:6px 0;">Setup:</td><td style="color:#e05e14;font-size:14px;font-weight:700;padding:6px 0;">${data.plan.costBreakdown.suggestedClientPrice.setup}</td></tr>
      <tr><td style="color:#9BAAC2;font-size:13px;padding:6px 0;">Monthly:</td><td style="color:#e05e14;font-size:14px;font-weight:700;padding:6px 0;">${data.plan.costBreakdown.suggestedClientPrice.monthly}</td></tr>
      <tr><td style="color:#9BAAC2;font-size:13px;padding:6px 0;">Margin:</td><td style="color:#3DB87A;font-size:14px;font-weight:700;padding:6px 0;">${data.plan.costBreakdown.margin}</td></tr>
    </tbody></table>
  </div>
</div>

<!-- Quick Wins -->
<div style="margin-bottom:20px;">
  <p style="color:#e05e14;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;margin-bottom:12px;">QUICK WINS (FIRST 48 HOURS)</p>
  <ul style="padding-left:20px;margin:0;">${quickWinsList}</ul>
</div>

<!-- Results Link -->
<div style="text-align:center;margin-top:24px;padding-top:20px;border-top:1px solid #243352;">
  <a href="${data.resultsUrl}" style="display:inline-block;background-color:#e05e14;color:white;text-decoration:none;padding:12px 28px;border-radius:9999px;font-size:14px;font-weight:600;">View Full Results &rarr;</a>
  <p style="color:#4A5A78;font-size:12px;margin-top:16px;">&mdash; Fox Haven Group AI Audit System</p>
</div>

</div></body></html>`;

  const result = await getResend().emails.send({
    from: 'Fox Haven Audit <audit@foxhavengrouphq.com>',
    to: process.env.INTERNAL_REPORT_EMAIL || 'foxhavengroupllc@gmail.com',
    subject: `[AUDIT LEAD] ${data.companyName} \u2014 Score: ${data.score}/100 \u2014 ${data.tier.replace('-', ' ').toUpperCase()}`,
    html,
  });
  if (result.error) {
    throw new Error(`Email send failed: ${result.error.message}`);
  }
}
