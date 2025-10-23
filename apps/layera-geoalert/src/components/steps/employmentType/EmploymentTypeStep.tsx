/**
 * EmploymentTypeStep.tsx - Enterprise Modular Employment Type Step
 *
 * Καθαρό modular employment type step για εργασία (Full-time/Part-time/Freelance/Seasonal)
 */

import React, { useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { EmploymentTypeCard } from './EmploymentTypeCard';
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
      description: '40+ ώρες την εβδομάδα'
    },
    {
      id: 'part_time',
      title: 'Μερική Απασχόληση',
      description: 'Λιγότερες από 40 ώρες την εβδομάδα'
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
    console.log(`🎯 EMPLOYMENT TYPE UI: Selected employment type: ${employmentType}`);

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
      setTimeout(() => {
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
    top: '161px',
    left: '8px',
    right: '8px',
    zIndex: 10002,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0'
  };

  return (
    <div style={containerStyles}>
      {employmentTypes.map((type) => (
        <EmploymentTypeCard
          key={type.id}
          employmentType={type.id}
          title={type.title}
          description={type.description}
          onClick={() => handleEmploymentTypeSelection(type.id)}
          data-testid={`employment-type-card-${type.id}`}
        />
      ))}
    </div>
  );
};