/**
 * AvailabilityStep.tsx - Enterprise Modular Availability Step
 *
 * Καθαρό modular availability step που δείχνει τις 2 επιλογές (Τώρα/Μελλοντικά)
 */

import React, { useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Box } from '@layera/layout';
import { AvailabilityCard } from './AvailabilityCard';
import type { StepProps } from '../types';
import type { AvailabilityType, AvailabilityStepData } from './types';

export interface AvailabilityStepProps extends StepProps {
  /** Availability selection callback */
  onAvailabilitySelected?: (availability: AvailabilityType) => void;
}

/**
 * Enterprise Availability Step - Καθαρό modular component για Availability επιλογή
 */
export const AvailabilityStep: React.FC<AvailabilityStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onAvailabilitySelected,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();

  const handleAvailabilitySelection = useCallback(async (availability: AvailabilityType) => {
    try {
      // Ενημερώνουμε το StepOrchestrator
      if (onStepComplete) {
        const stepData: AvailabilityStepData = {
          selectedAvailability: availability
        };
        onStepComplete('availability', stepData);
      }

      // Legacy callback
      onAvailabilitySelected?.(availability);

      // Auto-advance
      setTimeout((): void => {
        onNext?.();
      }, 300);

    } catch (error) {
      console.error('Availability selection failed:', error);
    }
  }, [onStepComplete, onAvailabilitySelected, onNext]);

  if (!isVisible) {
    return null;
  }

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 'var(--la-cards-top)',
    left: 'var(--la-side-margins)',
    right: 'var(--la-side-margins)',
    zIndex: Z_INDEX_LAYERS.COMPLETION_OVERLAY,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--la-cards-gap)',
    padding: '0'
  };

  return (
    <Box>
      {/* Τώρα Card */}
      <AvailabilityCard
        availability="now"
        title={t('availability.now.title', 'Τώρα')}
        description={t('availability.now.description', 'Άμεσα διαθέσιμο')}
        onClick={(): void => handleAvailabilitySelection('now')}
        data-testid="availability-card-now"
      />

      {/* Μελλοντικά Card */}
      <AvailabilityCard
        availability="future"
        title={t('availability.future.title', 'Μελλοντικά')}
        description={t('availability.future.description', 'Διαθέσιμο στο μέλλον')}
        onClick={(): void => handleAvailabilitySelection('future')}
        data-testid="availability-card-future"
      />
    </Box>
  );
};