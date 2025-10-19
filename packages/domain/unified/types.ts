/**
 * Enterprise Domain Types - UnifiedPipeline
 * Purpose: Type-safe discriminated unions for business logic
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 */

export type Category = 'property' | 'job';
export type Intent = 'offer' | 'search';
export type TransactionType = 'sale' | 'rent';
export type EmploymentType = 'full_time' | 'part_time' | 'freelance' | 'seasonal';
export type Availability = 'now' | 'future';
export type PipelineStep =
  | 'category'
  | 'intent'
  | 'transactionType'
  | 'employmentType'
  | 'availability'
  | 'availabilityDetails'
  | 'location'
  | 'layout'
  | 'details'
  | 'complete';

export interface AvailabilityDetails {
  date: string;
  duration: number;
  unit: 'months' | 'years';
}

export interface LocationData {
  method: 'detect' | 'search';
  coordinates?: [number, number];
  address?: string;
}

export interface LayoutData {
  rotation: number;
  scales: {
    cmToM: number;
    mmToM: number;
    mToM: number;
  };
  uploadedFiles?: File[];
}

export interface FormData {
  title?: string;
  description?: string;
  location?: string;
  price?: number;
  size?: number;
  jobTitle?: string;
  company?: string;
  salary?: number;
}

// Discriminated Union Base
interface PipelineBase {
  step: PipelineStep;
  availability: Availability | null;
  availabilityDetails?: AvailabilityDetails;
  locationData?: LocationData;
  formData?: FormData;
}

// Property Pipeline States
export interface PropertyOffer extends PipelineBase {
  category: 'property';
  intent: 'offer';
  transactionType: TransactionType;
  layoutData?: LayoutData; // Only for Property + Offer + Now
}

export interface PropertySearch extends PipelineBase {
  category: 'property';
  intent: 'search';
  // No transaction type needed for search
}

// Job Pipeline States
export interface JobOffer extends PipelineBase {
  category: 'job';
  intent: 'offer';
  employmentType: EmploymentType;
}

export interface JobSearch extends PipelineBase {
  category: 'job';
  intent: 'search';
  employmentType: EmploymentType;
}

// Main Pipeline Union Type
export type Pipeline = PropertyOffer | PropertySearch | JobOffer | JobSearch;

// API DTO Type
export interface UnifiedPipelineDTO {
  category: Category;
  intent: Intent;
  transactionType?: TransactionType;
  employmentType?: EmploymentType;
  availability: Availability;
  availabilityDetails?: AvailabilityDetails;
  locationData: LocationData;
  layoutData?: LayoutData;
  formData: FormData;
}