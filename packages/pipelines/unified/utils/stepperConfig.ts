import type { StepConfig } from '@layera/progress-stepper';
import type { Category } from '../../../domain/unified/types';

export type PipelineStep = 'category' | 'intent' | 'transactionType' | 'employmentType' | 'availability' | 'availabilityDetails' | 'location' | 'layout' | 'details' | 'complete';

/**
 * Enterprise stepper configuration for pipeline steps
 */
export const createStepperConfig = (category: Category | null, t?: (key: string) => string): StepConfig[] => {
  // Smart fallback: if translation returns the key itself, use Greek fallback
  const smartTranslate = (key: string, fallback: string): string => {
    if (!t) return fallback;
    const translated = t(key);
    // If translation fails, i18next returns the key itself
    return translated === key ? fallback : translated;
  };

  const baseSteps: StepConfig[] = [
    {
      id: 'category',
      label: smartTranslate('progress.stepper.labels.category', 'Κατηγορία'),
      description: smartTranslate('progress.stepper.descriptions.category', 'Τύπος')
    },
    {
      id: 'intent',
      label: t ? t('progress.stepper.labels.intent') : 'Σκοπός',
      description: t ? t('progress.stepper.descriptions.intent') : 'Δράση'
    }
  ];

  if (category === 'property') {
    return [
      ...baseSteps,
      {
        id: 'transactionType',
        label: t ? t('progress.stepper.labels.transactionType') : 'Συναλλαγή',
        description: t ? t('progress.stepper.descriptions.transactionType') : 'Τύπος'
      },
      {
        id: 'location',
        label: t ? t('progress.stepper.labels.location') : 'Τοποθεσία',
        description: t ? t('progress.stepper.descriptions.location') : 'Χάρτης'
      },
      {
        id: 'layout',
        label: t ? t('progress.stepper.labels.layout') : 'Κάτοψη',
        description: t ? t('progress.stepper.descriptions.layout') : 'Διάταξη',
        optional: true
      },
      {
        id: 'details',
        label: t ? t('progress.stepper.labels.details') : 'Στοιχεία',
        description: t ? t('progress.stepper.descriptions.details') : 'Περιγραφή'
      },
      {
        id: 'complete',
        label: t ? t('progress.stepper.labels.complete') : 'Τέλος',
        description: t ? t('progress.stepper.descriptions.complete') : 'Επιβεβαίωση'
      }
    ];
  }

  if (category === 'job') {
    return [
      ...baseSteps,
      {
        id: 'employmentType',
        label: t ? t('progress.stepper.labels.employmentType') : 'Εργασία',
        description: t ? t('progress.stepper.descriptions.employmentType') : 'Τύπος'
      },
      {
        id: 'availability',
        label: t ? t('progress.stepper.labels.availability') : 'Διαθεσιμότητα',
        description: t ? t('progress.stepper.descriptions.availability') : 'Πότε'
      },
      {
        id: 'availabilityDetails',
        label: t ? t('progress.stepper.labels.availabilityDetails') : 'Λεπτομέρειες',
        description: t ? t('progress.stepper.descriptions.availabilityDetails') : 'Ημερομηνίες'
      },
      {
        id: 'location',
        label: t ? t('progress.stepper.labels.location') : 'Τοποθεσία',
        description: t ? t('progress.stepper.descriptions.location') : 'Περιοχή'
      },
      {
        id: 'details',
        label: t ? t('progress.stepper.labels.details') : 'Στοιχεία',
        description: t ? t('progress.stepper.descriptions.details') : 'Περιγραφή'
      },
      {
        id: 'complete',
        label: t ? t('progress.stepper.labels.complete') : 'Τέλος',
        description: t ? t('progress.stepper.descriptions.complete') : 'Επιβεβαίωση'
      }
    ];
  }

  return baseSteps;
};

/**
 * Get the index of current step in stepper
 */
export const getStepIndex = (currentStep: PipelineStep, steps: StepConfig[]): number => {
  return steps.findIndex(step => step.id === currentStep);
};

/**
 * Update step completion status
 */
export const updateStepCompletion = (
  steps: StepConfig[],
  completedSteps: PipelineStep[]
): StepConfig[] => {
  return steps.map(step => ({
    ...step,
    completed: completedSteps.includes(step.id as PipelineStep)
  }));
};