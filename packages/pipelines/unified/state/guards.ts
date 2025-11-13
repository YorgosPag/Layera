import type { PipelineContext } from './types';

/**
 * Enterprise Guards - XState Machine
 * Purpose: Reusable navigation guards for state transitions
 * Complexity: Low (< 5)
 * Lines: < 50 (Enterprise Standard)
 */

export const isProperty = (context: PipelineContext) => context.category === 'property';
export const isJob = (context: PipelineContext) => context.category === 'job';
export const isOffer = (context: PipelineContext) => context.intent === 'offer';
export const isNow = (context: PipelineContext) => context.availability === 'now';
export const isFuture = (context: PipelineContext) => context.availability === 'future';

export const needsLayout = (context: PipelineContext) =>
  isProperty(context) && isOffer(context) && isNow(context);

export const needsTransactionType = (context: PipelineContext) => isProperty(context);
export const needsEmploymentType = (context: PipelineContext) => isJob(context);