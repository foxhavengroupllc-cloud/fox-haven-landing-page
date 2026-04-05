import { describe, it, expect } from 'vitest';
import { buildPlaceholderMap } from '@/lib/pitch/placeholder-map';
import type { PitchBrief, CompanyInput } from '@/lib/pitch/types';

const mockBrief: PitchBrief = {
  companySummary: 'A regional plumbing company.',
  positioningHeadline: 'Speed is where revenue slips.',
  likelyPains: ['Slow lead response', 'Manual scheduling'],
  inefficiencies: [
    { area: 'Sales', issue: 'Delayed inquiry response', impact: 'Missed bookings' },
    { area: 'Operations', issue: 'Manual dispatch', impact: 'Wasted drive time' },
  ],
  opportunities: ['Automated lead response', 'AI scheduling'],
  recommendedQuickWin: 'Auto-respond to inbound leads',
  impactEstimate: { low: '$80K', high: '$220K', label: 'annual recoverable value' },
  ninetyDayPlan: { month1: 'Audit', month2: 'Implement', month3: 'Optimize' },
  engagementOptions: [
    { name: 'AI Audit', description: 'Find the first move' },
    { name: 'Sprint', description: 'Build first automation' },
  ],
  riskAndGovernance: ['Uncontrolled AI use', 'Data compliance'],
  evidenceNotes: ['Based on industry benchmarks'],
};

const mockInput: CompanyInput = {
  companyName: 'Acme Plumbing',
  industry: 'Home Services',
  contactName: 'Jane Smith',
  contactTitle: 'VP Ops',
  useWebsiteEnrichment: false,
};

describe('buildPlaceholderMap', () => {
  const map = buildPlaceholderMap(mockBrief, mockInput);

  it('maps company name', () => {
    expect(map['{{company_name}}']).toBe('Acme Plumbing');
  });

  it('maps industry', () => {
    expect(map['{{industry}}']).toBe('Home Services');
  });

  it('maps positioning headline', () => {
    expect(map['{{positioning_headline}}']).toBe('Speed is where revenue slips.');
  });

  it('maps indexed pains', () => {
    expect(map['{{pain_1}}']).toBe('Slow lead response');
    expect(map['{{pain_2}}']).toBe('Manual scheduling');
    expect(map['{{pain_3}}']).toBe(''); // filled with empty
  });

  it('maps inefficiency fields', () => {
    expect(map['{{inefficiency_area_1}}']).toBe('Sales');
    expect(map['{{inefficiency_issue_1}}']).toBe('Delayed inquiry response');
    expect(map['{{inefficiency_impact_2}}']).toBe('Wasted drive time');
  });

  it('maps impact estimate', () => {
    expect(map['{{impact_low}}']).toBe('$80K');
    expect(map['{{impact_high}}']).toBe('$220K');
    expect(map['{{impact_label}}']).toBe('annual recoverable value');
  });

  it('maps 90-day plan', () => {
    expect(map['{{month_1}}']).toBe('Audit');
    expect(map['{{month_2}}']).toBe('Implement');
    expect(map['{{month_3}}']).toBe('Optimize');
  });

  it('maps contact info', () => {
    expect(map['{{contact_name}}']).toBe('Jane Smith');
    expect(map['{{contact_title}}']).toBe('VP Ops');
  });

  it('fills missing optional slots with empty strings', () => {
    expect(map['{{inefficiency_area_3}}']).toBe('');
    expect(map['{{opportunity_3}}']).toBe('');
    expect(map['{{engagement_3_name}}']).toBe('');
    expect(map['{{risk_3}}']).toBe('');
    expect(map['{{evidence_2}}']).toBe('');
    expect(map['{{evidence_3}}']).toBe('');
    expect(map['{{evidence_4}}']).toBe('');
  });

  it('produces no undefined values', () => {
    const undefinedKeys = Object.entries(map)
      .filter(([, v]) => v === undefined)
      .map(([k]) => k);
    expect(undefinedKeys).toEqual([]);
  });
});
