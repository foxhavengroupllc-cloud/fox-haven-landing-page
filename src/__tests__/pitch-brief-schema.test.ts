import { describe, it, expect } from 'vitest';
import { pitchBriefSchema } from '@/lib/pitch/types';

const validBrief = {
  companySummary: 'Regional plumbing company serving Phoenix metro area.',
  positioningHeadline: 'Speed is where revenue is slipping.',
  likelyPains: [
    'Slow response to inbound leads',
    'Manual scheduling coordination',
  ],
  inefficiencies: [
    {
      area: 'Sales' as const,
      issue: 'Delayed response to new inquiries',
      impact: 'Missed bookings and lower conversion',
    },
    {
      area: 'Operations' as const,
      issue: 'Manual dispatch and scheduling',
      impact: 'Wasted drive time and double-bookings',
    },
  ],
  opportunities: [
    'Automated lead qualification and response',
    'AI-assisted scheduling workflows',
  ],
  recommendedQuickWin:
    'Implement automated lead response and qualification system',
  impactEstimate: {
    low: '$80K',
    high: '$220K',
    label: 'annual recoverable value',
  },
  ninetyDayPlan: {
    month1: 'Audit and workflow design',
    month2: 'Implement first AI workflow',
    month3: 'Optimize and expand',
  },
  engagementOptions: [
    {
      name: 'AI Opportunity Audit',
      description: 'Identify the highest-value first move',
    },
    {
      name: 'Implementation Sprint',
      description: 'Build and deploy your first automation',
    },
  ],
  riskAndGovernance: [
    'Employees may already be using AI without guardrails',
    'Customer data handling must comply with state regulations',
  ],
  evidenceNotes: [
    'Based on industry benchmarks for home services companies of similar size',
  ],
};

describe('PitchBrief schema validation', () => {
  it('accepts a valid brief', () => {
    const result = pitchBriefSchema.safeParse(validBrief);
    expect(result.success).toBe(true);
  });

  it('rejects missing companySummary', () => {
    const invalid = { ...validBrief, companySummary: '' };
    const result = pitchBriefSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects companySummary exceeding 240 chars', () => {
    const invalid = { ...validBrief, companySummary: 'x'.repeat(241) };
    const result = pitchBriefSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects too few likelyPains', () => {
    const invalid = { ...validBrief, likelyPains: ['only one'] };
    const result = pitchBriefSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects too many likelyPains', () => {
    const invalid = {
      ...validBrief,
      likelyPains: ['one', 'two', 'three', 'four'],
    };
    const result = pitchBriefSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects invalid inefficiency area', () => {
    const invalid = {
      ...validBrief,
      inefficiencies: [
        { area: 'InvalidArea', issue: 'test', impact: 'test' },
        { area: 'Sales', issue: 'test', impact: 'test' },
      ],
    };
    const result = pitchBriefSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('accepts 3 items for array fields', () => {
    const withThree = {
      ...validBrief,
      likelyPains: ['one', 'two', 'three'],
      opportunities: ['a', 'b', 'c'],
      engagementOptions: [
        { name: 'A', description: 'a' },
        { name: 'B', description: 'b' },
        { name: 'C', description: 'c' },
      ],
      riskAndGovernance: ['r1', 'r2', 'r3'],
    };
    const result = pitchBriefSchema.safeParse(withThree);
    expect(result.success).toBe(true);
  });

  it('rejects missing ninetyDayPlan fields', () => {
    const invalid = {
      ...validBrief,
      ninetyDayPlan: { month1: 'test', month2: 'test' },
    };
    const result = pitchBriefSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects empty evidenceNotes', () => {
    const invalid = { ...validBrief, evidenceNotes: [] };
    const result = pitchBriefSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
