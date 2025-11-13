import { assign } from 'xstate';
import { PipelineEvent } from './types';

/**
 * Enterprise Actions - XState Machine
 * Purpose: Reusable actions for state mutations
 * Complexity: Low (< 5)
 * Lines: < 50 (Enterprise Standard)
 */

export const assignCategory = assign({
  category: (_, event: Extract<PipelineEvent, { type: 'SET_CATEGORY' }>) => event.category
});

export const assignIntent = assign({
  intent: (_, event: Extract<PipelineEvent, { type: 'SET_INTENT' }>) => event.intent
});

export const assignTransactionType = assign({
  transactionType: (_, event: Extract<PipelineEvent, { type: 'SET_TRANSACTION_TYPE' }>) => event.transactionType
});

export const assignEmploymentType = assign({
  employmentType: (_, event: Extract<PipelineEvent, { type: 'SET_EMPLOYMENT_TYPE' }>) => event.employmentType
});

export const assignAvailability = assign({
  availability: (_, event: Extract<PipelineEvent, { type: 'SET_AVAILABILITY' }>) => event.availability
});

export const assignAvailabilityDetails = assign({
  availabilityDetails: (_, event: Extract<PipelineEvent, { type: 'SET_AVAILABILITY_DETAILS' }>) => ({
    date: event.date,
    duration: event.duration,
    unit: event.unit
  })
});

export const markLocationReady = assign({ hasLocation: true });
export const markLayoutReady = assign({ hasLayout: true });
export const markDetailsReady = assign({ hasDetails: true });

export const resetContext = assign({
  category: null,
  intent: null,
  transactionType: null,
  employmentType: null,
  availability: null,
  availabilityDetails: undefined,
  hasLocation: false,
  hasLayout: false,
  hasDetails: false
});