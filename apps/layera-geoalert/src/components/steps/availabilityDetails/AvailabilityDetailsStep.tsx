/**
 * AvailabilityDetailsStep.tsx - Enterprise Modular Availability Details Step
 *
 * Καθαρό modular availability details step για μελλοντική διαθεσιμότητα (ημερομηνία, διάρκεια)
 */

import React, { useCallback, useState } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Box } from '@layera/layout';
import { AvailabilityDetailsForm } from './AvailabilityDetailsForm';
import { BaseCard } from '@layera/cards';
import { CheckIcon, CheckIcon as FormIcon, CheckIcon as CalendarIcon } from '@layera/icons';
import type { StepProps } from '../types';
import type { AvailabilityDetails, AvailabilityDetailsStepData } from './types';

export interface AvailabilityDetailsStepProps extends StepProps {
  /** Availability details submission callback */
  onAvailabilityDetailsSubmitted?: (details: AvailabilityDetails) => void;
}

/**
 * Enterprise Availability Details Step - Καθαρό modular component για Availability Details φόρμα
 */
export const AvailabilityDetailsStep: React.FC<AvailabilityDetailsStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onAvailabilityDetailsSubmitted,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();
  const [details, setDetails] = useState<AvailabilityDetails>({
    date: '',
    duration: 12,
    unit: 'months'
  });
  const [showForm, setShowForm] = useState(false);

  const handleFieldChange = useCallback((field: keyof AvailabilityDetails, value: unknown) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleShowForm = useCallback(() => {
    setShowForm(true);
  }, []);

  const handleSubmit = useCallback(async () => {
    console.log('🎯 AVAILABILITY DETAILS UI: Submitting details', details);

    try {
      // Ενημερώνουμε το StepOrchestrator
      if (onStepComplete) {
        const stepData: AvailabilityDetailsStepData = {
          availabilityDetails: details,
          isComplete: true
        };
        onStepComplete('availabilityDetails', stepData);
      }

      // Legacy callback
      onAvailabilityDetailsSubmitted?.(details);

      // Auto-advance
      setTimeout(() => {
        onNext?.();
      }, 300);

    } catch (error) {
      console.error('Availability details submission failed:', error);
    }
  }, [details, onStepComplete, onAvailabilityDetailsSubmitted, onNext]);

  if (!isVisible) {
    return null;
  }

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 'var(--la-cards-top)',
    left: 'var(--la-side-margins)',
    right: 'var(--la-side-margins)',
    zIndex: 10002,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--la-cards-gap)',
    padding: '0',
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto'
  };

  const hasRequiredFields = Boolean(details.date && details.duration > 0);

  return (
    <Box style={containerStyles}>
      {!showForm ? (
        <>
          {/* Show Form Card */}
          <BaseCard
            variant="job"
            title={t('pipeline.steps.availabilityDetails.title', 'Λεπτομέρειες')}
            description={t('availabilityDetails.description', 'Καθορίστε πότε θα είστε διαθέσιμοι')}
            icon={<CalendarIcon size="sm" theme="neutral" />}
            onClick={handleShowForm}
            data-testid="availability-details-show-form"
          />
        </>
      ) : (
        <>
          {/* Form */}
          <AvailabilityDetailsForm
            details={details}
            onChange={handleFieldChange}
          />

          {/* Submit Card */}
          <BaseCard
            variant="job"
            title={t('availabilityDetails.save', 'Αποθήκευση')}
            description={hasRequiredFields ? t('availabilityDetails.saveDetails', 'Αποθήκευση λεπτομερειών') : t('availabilityDetails.fillAllFields', 'Συμπληρώστε όλα τα πεδία')}
            icon={<CheckIcon size="sm" theme="neutral" />}
            onClick={handleSubmit}
            data-testid="availability-details-submit"
          />

          {/* Back to Menu */}
          <BaseCard
            variant="job"
            title={t('actions.back')}
            description={t('actions.backToMenu')}
            onClick={() => setShowForm(false)}
            data-testid="availability-details-back"
          />
        </>
      )}
    </Box>
  );
};