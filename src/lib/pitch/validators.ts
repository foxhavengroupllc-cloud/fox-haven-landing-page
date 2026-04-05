import { companyInputSchema, type CompanyInput } from './types';

export function validateCompanyInput(data: unknown): {
  success: true;
  data: CompanyInput;
} | {
  success: false;
  errors: string[];
} {
  const result = companyInputSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    errors: result.error.issues.map(
      (i) => `${i.path.join('.')}: ${i.message}`,
    ),
  };
}
