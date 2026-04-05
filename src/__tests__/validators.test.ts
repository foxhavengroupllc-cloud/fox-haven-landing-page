import { describe, it, expect } from 'vitest';
import { validateCompanyInput } from '@/lib/pitch/validators';

describe('validateCompanyInput', () => {
  it('accepts valid input', () => {
    const result = validateCompanyInput({
      companyName: 'Acme Corp',
      industry: 'Home Services',
      useWebsiteEnrichment: false,
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing companyName', () => {
    const result = validateCompanyInput({
      companyName: '',
      industry: 'Home Services',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid industry', () => {
    const result = validateCompanyInput({
      companyName: 'Test',
      industry: 'Not A Real Industry',
    });
    expect(result.success).toBe(false);
  });

  it('accepts all valid industries', () => {
    const industries = [
      'Home Services',
      'Professional Services',
      'Law Firm',
      'Healthcare Practice',
      'Small Defense Contractor',
      'Local Services',
      'Other',
    ];
    for (const industry of industries) {
      const result = validateCompanyInput({
        companyName: 'Test',
        industry,
      });
      expect(result.success).toBe(true);
    }
  });

  it('accepts valid optional fields', () => {
    const result = validateCompanyInput({
      companyName: 'Test Corp',
      industry: 'Law Firm',
      websiteUrl: 'https://example.com',
      employeeRange: '21-50',
      revenueBand: '$1M-$5M',
      contactName: 'John',
      contactTitle: 'CEO',
      notes: 'Some notes',
      useWebsiteEnrichment: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid websiteUrl', () => {
    const result = validateCompanyInput({
      companyName: 'Test',
      industry: 'Other',
      websiteUrl: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });

  it('accepts empty websiteUrl', () => {
    const result = validateCompanyInput({
      companyName: 'Test',
      industry: 'Other',
      websiteUrl: '',
    });
    expect(result.success).toBe(true);
  });
});
