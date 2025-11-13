/**
 * Enterprise State Types - XState Machine
 * Purpose: Type definitions for state machine
 * Complexity: Low (< 5)
 * Lines: < 50 (Enterprise Standard)
 */

// Basic domain types
export type Category = 'property' | 'job';
export type Intent = 'offer' | 'demand';
export type TransactionType = 'rent' | 'sale';
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'freelance';
export type Availability = 'now' | 'future';

// Events
export type PipelineEvent =
  | { type: 'SET_CATEGORY'; category: Category }
  | { type: 'SET_INTENT'; intent: Intent }
  | { type: 'SET_TRANSACTION_TYPE'; transactionType: TransactionType }
  | { type: 'SET_EMPLOYMENT_TYPE'; employmentType: EmploymentType }
  | { type: 'SET_AVAILABILITY'; availability: Availability }
  | { type: 'SET_AVAILABILITY_DETAILS'; date: string; duration: number; unit: 'months' | 'years' }
  | { type: 'LOCATION_READY' }
  | { type: 'LAYOUT_READY' }
  | { type: 'DETAILS_READY' }
  | { type: 'BACK' }
  | { type: 'RESET' };

// Context
export interface PipelineContext {
  category: Category | null;
  intent: Intent | null;
  transactionType: TransactionType | null;
  employmentType: EmploymentType | null;
  availability: Availability | null;
  availabilityDetails?: { date: string; duration: number; unit: 'months' | 'years' };
  hasLocation: boolean;
  hasLayout: boolean;
  hasDetails: boolean;
}