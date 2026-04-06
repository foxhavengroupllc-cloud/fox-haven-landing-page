import { z } from 'zod';

/* ── PitchBrief schema ── */

export const pitchBriefSchema = z.object({
  companySummary: z.string().min(1).max(240),
  positioningHeadline: z.string().min(1).max(120),
  likelyPains: z.array(z.string().min(1).max(100)).min(2).max(3),
  inefficiencies: z
    .array(
      z.object({
        area: z.enum([
          'Sales',
          'Operations',
          'Admin',
          'Customer Experience',
          'Reporting',
          'Compliance',
        ]),
        issue: z.string().min(1).max(120),
        impact: z.string().min(1).max(120),
      }),
    )
    .min(2)
    .max(3),
  opportunities: z.array(z.string().min(1).max(120)).min(2).max(3),
  recommendedQuickWin: z.string().min(1).max(140),
  impactEstimate: z.object({
    low: z.string().min(1).max(40),
    high: z.string().min(1).max(40),
    label: z.string().min(1).max(60),
  }),
  ninetyDayPlan: z.object({
    month1: z.string().min(1).max(100),
    month2: z.string().min(1).max(100),
    month3: z.string().min(1).max(100),
  }),
  engagementOptions: z
    .array(
      z.object({
        name: z.string().min(1).max(60),
        description: z.string().min(1).max(100),
      }),
    )
    .min(2)
    .max(3),
  riskAndGovernance: z.array(z.string().min(1).max(100)).min(2).max(3),
  evidenceNotes: z.array(z.string().min(1).max(140)).min(1).max(4),
});

export type PitchBrief = z.infer<typeof pitchBriefSchema>;

/* ── Company input ── */

export const companyInputSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  industry: z.enum([
    'Home Services',
    'Professional Services',
    'Law Firm',
    'Healthcare Practice',
    'Small Defense Contractor',
    'Local Services',
    'Other',
  ]),
  employeeRange: z
    .enum(['1-5', '6-20', '21-50', '51-100', '101-250', '250+'])
    .optional(),
  revenueBand: z
    .enum([
      'Under $250K',
      '$250K-$1M',
      '$1M-$5M',
      '$5M-$20M',
      '$20M+',
    ])
    .optional(),
  contactName: z.string().optional(),
  contactTitle: z.string().optional(),
  notes: z.string().optional(),
  auditFindings: z.string().optional(),
  useWebsiteEnrichment: z.boolean().default(false),
});

export type CompanyInput = z.infer<typeof companyInputSchema>;

/* ── Run statuses ── */

export const RUN_STATUSES = [
  'draft',
  'enriching',
  'generating_brief',
  'validating',
  'rendering_placeholders',
  'creating_deck',
  'completed',
  'failed',
] as const;

export type RunStatus = (typeof RUN_STATUSES)[number];

/* ── Enrichment result ── */

export interface EnrichmentResult {
  title: string;
  metaDescription: string;
  summary: string;
  inferredServices: string[];
  inferredFrictionPoints: string[];
}

/* ── Pipeline result ── */

export interface PipelineResult {
  runId: string;
  status: RunStatus;
  pitchBrief: PitchBrief | null;
  pptxFilePath: string | null;
  error?: string;
}
