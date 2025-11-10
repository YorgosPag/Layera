/**
 * employmentType/types.ts - Enterprise Employment Type Step Types
 */

export type EmploymentType = 'full_time' | 'part_time' | 'freelance' | 'seasonal';

export interface EmploymentTypeStepData {
  selectedEmploymentType: EmploymentType;
}

export interface EmploymentTypeOption {
  id: EmploymentType;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}