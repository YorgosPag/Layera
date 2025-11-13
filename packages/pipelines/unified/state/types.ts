import type { Category, Intent, TransactionType, EmploymentType, Availability } from '../../../domain/unified/types';

/**
 * Enterprise State Types - XState Machine
 * Purpose: Type definitions for state machine
 * Complexity: Low (< 5)
 * Lines: < 50 (Enterprise Standard)
 */

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