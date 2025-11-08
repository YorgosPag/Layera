/**
 * EmploymentTypeStep.tsx - Enterprise Modular Employment Type Step
 *
 * Καθαρό modular employment type step για εργασία (Full-time/Part-time/Freelance/Seasonal)
 */

import React, { useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { EmploymentTypeCard } from './EmploymentTypeCard';
import { Box } from '@layera/layout';
import { CONFIG } from '@layera/constants';
import type { StepProps } from '../types';
import type { EmploymentType, EmploymentTypeStepData, EmploymentTypeOption } from './types';

export interface EmploymentTypeStepProps extends StepProps {
  /** Employment type selection callback */
  onEmploymentTypeSelected?: (employmentType: EmploymentType) => void;
}

/**
 * Enterprise Employment Type Step - Καθαρό modular component για Employment Type επιλογή
 */
export const EmploymentTypeStep: React.FC<EmploymentTypeStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onEmploymentTypeSelected,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();

  const employmentTypes: EmploymentTypeOption[] = [
    {
      id: 'full_time',
      title: 'Πλήρης Απασχόληση',
      description: `${DEMO_PROPERTY_DATA.FULL_TIME_HOURS_THRESHOLD}+ ώρες την εβδομάδα`
    },
    {
      id: 'part_time',
      title: 'Μερική Απασχόληση',
      description: `Λιγότερες από ${DEMO_PROPERTY_DATA.FULL_TIME_HOURS_THRESHOLD} ώρες την εβδομάδα`
    },
    {
      id: 'freelance',
      title: 'Freelancing',
      description: 'Αυτοτελής εργασία/συνεργασία'
    },
    {
      id: 'seasonal',
      title: 'Εποχιακή Εργασία',
      description: 'Προσωρινή/εποχιακή απασχόληση'
    }
  ];

  const handleEmploymentTypeSelection = useCallback(async (employmentType: EmploymentType) => {
    try {
      // Ενημερώνουμε το StepOrchestrator
      if (onStepComplete) {
        const stepData: EmploymentTypeStepData = {
          selectedEmploymentType: employmentType
        };
        onStepComplete('employmentType', stepData);
      }

      // Legacy callback
      onEmploymentTypeSelected?.(employmentType);

      // Auto-advance
      setTimeout((): void => {
        onNext?.();
      }, 300);

    } catch (error) {
      console.error('Employment type selection failed:', error);
    }
  }, [onStepComplete, onEmploymentTypeSelected, onNext]);

  if (!isVisible) {
    return null;
  }

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 'var(--la-cards-top)',
    left: 'var(--la-side-margins)',
    right: 'var(--la-side-margins)',
    zIndex: 'var(--la-z-index-modal)', // Enterprise z-index system
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--la-cards-gap)',
    padding: '0'
  };

  return (
    <Box>
      {employmentTypes.map((type: unknown) => (
        <EmploymentTypeCard
          key={type.id}
          employmentType={type.id}
          title={type.title}
          description={type.description}
          onClick={(): void => handleEmploymentTypeSelection(type.id)}
          data-testid={`employment-type-card-${type.id}`}
        />
      ))}
    </Box>
  );
};