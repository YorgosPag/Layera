/**
 * availabilityDetails/types.ts - Enterprise Availability Details Step Types
 */

export interface AvailabilityDetails {
  date: string;
  duration: number;
  unit: 'months' | 'years';
}

export interface AvailabilityDetailsStepData {
  availabilityDetails: AvailabilityDetails;
  isComplete: boolean;
}

export interface AvailabilityDetailsFormField {
  id: keyof AvailabilityDetails;
  label: string;
  type: 'date' | 'number' | 'select';
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  options?: Array<{ value: string; label: string }>;
}