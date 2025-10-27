/**
 * PropertyTypeStep.tsx - Enterprise Modular Property Type Step
 *
 * Καθαρό modular property type step που δείχνει τους τύπους ακινήτων
 */

import React, { useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { PropertyTypeCard } from './PropertyTypeCard';
import { Flex } from '@layera/layout';
import type { StepProps } from '../types';
import type { PropertyType, PropertyTypeStepData, PropertyTypeOption } from './types';

export interface PropertyTypeStepProps extends StepProps {
  /** Property type selection callback */
  onPropertyTypeSelected?: (propertyType: PropertyType) => void;
}

/**
 * Enterprise Property Type Step - Καθαρό modular component για Property Type επιλογή
 */
export const PropertyTypeStep: React.FC<PropertyTypeStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onPropertyTypeSelected,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();

  const propertyTypes: PropertyTypeOption[] = [
    {
      id: 'apartment',
      title: 'Διαμέρισμα',
      description: 'Κατοικία σε συγκρότημα'
    },
    {
      id: 'house',
      title: 'Μονοκατοικία',
      description: 'Ανεξάρτητη κατοικία'
    },
    {
      id: 'office',
      title: 'Γραφείο',
      description: 'Επαγγελματικός χώρος'
    },
    {
      id: 'store',
      title: 'Κατάστημα',
      description: 'Εμπορικός χώρος'
    },
    {
      id: 'warehouse',
      title: 'Αποθήκη',
      description: 'Χώρος αποθήκευσης'
    },
    {
      id: 'factory',
      title: 'Εργοστάσιο',
      description: 'Βιομηχανικός χώρος'
    },
    {
      id: 'land',
      title: 'Οικόπεδο',
      description: 'Γη για οικοδόμηση'
    },
    {
      id: 'studio',
      title: 'Studio',
      description: 'Μικρή κατοικία'
    }
  ];

  const handlePropertyTypeSelection = useCallback(async (propertyType: PropertyType) => {
    console.log(`🎯 PROPERTY TYPE UI: Selected property type: ${propertyType}`);

    try {
      // Ενημερώνουμε το StepOrchestrator
      if (onStepComplete) {
        const stepData: PropertyTypeStepData = {
          selectedPropertyType: propertyType
        };
        onStepComplete('propertyType', stepData);
      }

      // Legacy callback
      onPropertyTypeSelected?.(propertyType);

      // Auto-advance
      setTimeout(() => {
        onNext?.();
      }, 300);

    } catch (error) {
      console.error('Property type selection failed:', error);
    }
  }, [onStepComplete, onPropertyTypeSelected, onNext]);

  if (!isVisible) {
    return null;
  }

  return (
    // LEGO:JUSTIFIED(reason=MOBILE_STEP_OVERLAY_FIXED; owner=@team-geo; expires=2026-01-31)
    <Box
      position="fixed"
      top="var(--layera-overlay-top, var(--layera-cards-top, 64px))"
      left="var(--layera-side-margins, 16px)"
      right="var(--layera-side-margins, 16px)"
      zIndex="var(--layera-z-overlay)"
      maxHeight="var(--layera-height-calc-max, calc(100vh - var(--layera-overlay-vertical-offset, 200px)))"
      overflow="var(--layera-overflow-auto, auto)"
    >
      <Flex direction="column" gap="xs" padding="none">
      {propertyTypes.map((type) => (
        <PropertyTypeCard
          key={type.id}
          propertyType={type.id}
          title={type.title}
          description={type.description}
          onClick={() => handlePropertyTypeSelection(type.id)}
          data-testid={`property-type-card-${type.id}`}
        />
      ))}
      </Flex>
    </Box>
  );
};