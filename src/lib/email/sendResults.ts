import { Resend } from 'resend';
import type { ScoreTier } from '@/lib/audit/scoring';

function getResend() { return new Resend(process.env.RESEND_API_KEY); }

const TIER_LABELS: Record<ScoreTier, string> = {
  critical: 'Critical Gaps Identified', 'needs-work': 'Significant Opportunity',
  moderate: 'Room to Improve', strong: 'Well Optimized',
};

interface SendResultsParams { to: string; name: string; score: number; tier: ScoreTier; topOpportunity: string; token: string; }

export async function sendResultsEmail({ to, name, score, tier, topOpportunity, token }: SendResultsParams) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foxhavengrouphq.com';
  const resultsUrl = `${siteUrl}/audit/results/${token}`;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin:0;padding:0;background-color:#0b1c2e;font-family:'DM Sans',system-ui,sans-serif;"><div style="max-width:560px;margin:0 auto;padding:40px 24px;"><div style="text-align:center;margin-bottom:32px;"><div style="display:inline-block;width:40px;height:40px;background-color:#e05e14;border-radius:8px;line-height:40px;text-align:center;"><span style="color:white;font-weight:bold;font-size:18px;">F</span></div><p style="color:#9BAAC2;font-size:13px;margin-top:8px;letter-spacing:0.1em;">FOX HAVEN GROUP</p></div><div style="text-align:center;margin-bottom:24px;"><p style="color:#9BAAC2;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 8px;">Your Audit Score</p><p style="color:white;font-size:72px;font-weight:700;margin:0;line-height:1;">${score}<span style="color:#9BAAC2;font-size:24px;font-weight:700;">/100</span></p></div><div style="text-align:center;margin-bottom:32px;"><span style="display:inline-block;padding:6px 20px;border-radius:9999px;background-color:rgba(224,94,20,0.2);color:#e05e14;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">${TIER_LABELS[tier]}</span></div><div style="background-color:#112440;border:1px solid #243352;border-radius:12px;padding:20px;margin-bottom:32px;"><p style="color:#9BAAC2;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Top Opportunity</p><p style="color:white;font-size:16px;font-weight:600;margin:0;">${topOpportunity}</p></div><div style="text-align:center;margin-bottom:32px;"><a href="${resultsUrl}" style="display:inline-block;background-color:#e05e14;color:white;text-decoration:none;padding:14px 32px;border-radius:9999px;font-size:15px;font-weight:600;">View Your Full Results &rarr;</a></div><div style="text-align:center;border-top:1px solid #243352;padding-top:24px;"><p style="color:#4A5A78;font-size:13px;margin:0;">&mdash; The Fox Haven Group AI Team</p><p style="color:#4A5A78;font-size:12px;margin:4px 0 0;">foxhavengrouphq.com</p></div></div></body></html>`;
  await getResend().emails.send({ from: 'Fox Haven Audit <audit@foxhavengrouphq.com>', to, subject: `Your Fox Haven AI Audit \u2014 Score: ${score}/100`, html });
}
