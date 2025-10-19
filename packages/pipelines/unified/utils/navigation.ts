/**
 * @layera/pipelines - Enterprise Navigation Utilities
 * Purpose: Pure navigation rules - from→to logic
 * Architecture: Functional, stateless, testable
 */

import type { Category, Intent, Availability } from '../../../domain/unified/types';

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

export interface NavigationContext {
  category: Category | null;
  intent: Intent | null;
  availability: Availability | null;
}

/**
 * Pure function: Next step after category selection
 */
export function getNextStepAfterCategory(): PipelineStep {
  return 'intent';
}

/**
 * Pure function: Next step after intent selection
 */
export function getNextStepAfterIntent(category: Category | null): PipelineStep {
  return category === 'property' ? 'transactionType' : 'employmentType';
}

/**
 * Pure function: Next step after transaction/employment type
 */
export function getNextStepAfterType(): PipelineStep {
  return 'availability';
}

/**
 * Pure function: Next step after availability selection
 * Complex business logic extracted από το original
 */
export function getNextStepAfterAvailability(
  availability: Availability,
  category: Category | null,
  intent: Intent | null
): PipelineStep {
  // Future availability requires details for property offers and all jobs
  const needsAvailabilityDetails = availability === 'future' &&
    ((category === 'property' && intent === 'offer') || category === 'job');

  return needsAvailabilityDetails ? 'availabilityDetails' : 'location';
}

/**
 * Pure function: Next step after availability details
 */
export function getNextStepAfterAvailabilityDetails(): PipelineStep {
  return 'location';
}

/**
 * Pure function: Next step after location
 * Complex conditional logic από το original UnifiedPipeline.tsx
 */
export function getNextStepAfterLocation(context: NavigationContext): PipelineStep {
  const { category, intent, availability } = context;

  if (category === 'property' && intent === 'offer' && availability === 'now') {
    return 'layout';
  } else if (category === 'job' && intent === 'search') {
    return 'complete';
  } else {
    return 'details';
  }
}

/**
 * Pure function: Next step after layout
 */
export function getNextStepAfterLayout(): PipelineStep {
  return 'details';
}

/**
 * Pure function: Next step after details (submission)
 */
export function getNextStepAfterDetails(): PipelineStep {
  return 'complete';
}

/**
 * Pure function: Previous step navigation
 * Handles all back navigation logic
 */
export function getPreviousStep(
  currentStep: PipelineStep,
  context: NavigationContext
): PipelineStep | null {
  const { category, availability, intent } = context;

  switch (currentStep) {
    case 'intent':
      return 'category';

    case 'transactionType':
      return 'intent';

    case 'employmentType':
      return 'intent';

    case 'availability':
      return category === 'job' ? 'employmentType' : 'transactionType';

    case 'availabilityDetails':
      return 'availability';

    case 'location':
      // Complex back navigation
      return (availability === 'future' &&
              ((category === 'property' && intent === 'offer') || category === 'job'))
        ? 'availabilityDetails'
        : 'availability';

    case 'layout':
      return 'location';

    case 'details':
      return (category === 'property' && intent === 'offer' && availability === 'now')
        ? 'layout'
        : 'location';

    case 'category':
    case 'complete':
      return null; // Cannot go back

    default:
      return null;
  }
}

/**
 * Pure function: Check if step transition is valid
 */
export function isValidTransition(
  from: PipelineStep,
  to: PipelineStep,
  context: NavigationContext
): boolean {
  // Basic validation - ensure we don't skip required steps
  const stepOrder: PipelineStep[] = [
    'category',
    'intent',
    'transactionType', // or employmentType
    'availability',
    'availabilityDetails', // conditional
    'location',
    'layout', // conditional
    'details',
    'complete'
  ];

  const fromIndex = stepOrder.indexOf(from);
  const toIndex = stepOrder.indexOf(to);

  // Allow going back or forward by 1 step
  return Math.abs(toIndex - fromIndex) <= 1;
}

/**
 * Pure function: Get all required steps for current context
 */
export function getRequiredSteps(context: NavigationContext): PipelineStep[] {
  const { category, intent, availability } = context;

  const baseSteps: PipelineStep[] = ['category', 'intent'];

  // Add type step
  if (category === 'property') {
    baseSteps.push('transactionType');
  } else if (category === 'job') {
    baseSteps.push('employmentType');
  }

  // Add availability
  baseSteps.push('availability');

  // Conditional availability details
  if (availability === 'future' &&
      ((category === 'property' && intent === 'offer') || category === 'job')) {
    baseSteps.push('availabilityDetails');
  }

  // Add location
  baseSteps.push('location');

  // Conditional layout
  if (category === 'property' && intent === 'offer' && availability === 'now') {
    baseSteps.push('layout');
  }

  // Skip details for job search
  if (!(category === 'job' && intent === 'search')) {
    baseSteps.push('details');
  }

  // Add complete
  baseSteps.push('complete');

  return baseSteps;
}

/**
 * Pure function: Calculate progress percentage
 */
export function getProgressPercentage(
  currentStep: PipelineStep,
  context: NavigationContext
): number {
  const requiredSteps = getRequiredSteps(context);
  const currentIndex = requiredSteps.indexOf(currentStep);

  if (currentIndex === -1) return 0;

  return Math.round(((currentIndex + 1) / requiredSteps.length) * 100);
}