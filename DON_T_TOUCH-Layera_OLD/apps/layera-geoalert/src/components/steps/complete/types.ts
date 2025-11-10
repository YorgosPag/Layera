/**
 * complete/types.ts - Enterprise Complete Step Types
 */

export interface CompleteStepData {
  isComplete: boolean;
  completedAt: Date;
  category: 'property' | 'job';
  intent: 'offer' | 'search';
}

export interface CompletionSummary {
  category: 'property' | 'job';
  intent: 'offer' | 'search';
  successMessage: string;
  nextSteps: string[];
}