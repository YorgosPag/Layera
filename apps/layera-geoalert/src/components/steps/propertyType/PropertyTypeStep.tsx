/**
 * PropertyTypeStep.tsx - Enterprise Modular Property Type Step
 *
 * Καθαρό modular property type step που δείχνει τους τύπους ακινήτων
 */

import React, { useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { PropertyTypeCard } from './PropertyTypeCard';
import { Box, Flex } from '@layera/layout';
import { useGeoAlertLayout } from '@layera/layout';
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

  // Enterprise LEGO Layout με CSS variables
  const { utils } = useGeoAlertLayout();
  const containerStyles = utils.getCardStyles('vertical');
  const containerClass = utils.getCardContainerClass('vertical');

  const propertyTypes: PropertyTypeOption[] = [
    {
      id: 'apartment',
      title: t('propertyType.apartment'),
      description: t('propertyType.descriptions.apartment')
    },
    {
      id: 'house',
      title: t('propertyType.house'),
      description: t('propertyType.descriptions.house')
    },
    {
      id: 'office',
      title: t('propertyType.office'),
      description: t('propertyType.descriptions.office')
    },
    {
      id: 'store',
      title: t('propertyType.store'),
      description: t('propertyType.descriptions.store')
    },
    {
      id: 'warehouse',
      title: t('propertyType.warehouse'),
      description: t('propertyType.descriptions.warehouse')
    },
    {
      id: 'factory',
      title: t('propertyType.factory'),
      description: t('propertyType.descriptions.factory')
    },
    {
      id: 'land',
      title: t('propertyType.land'),
      description: t('propertyType.descriptions.land')
    },
    {
      id: 'studio',
      title: t('propertyType.studio'),
      description: t('propertyType.descriptions.studio')
    }
  ];

  const handlePropertyTypeSelection = useCallback(async (propertyType: PropertyType) => {
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
      setTimeout((): void => {
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
    <Box style={containerStyles} className={containerClass}>
      {propertyTypes.map((type: PropertyTypeOption) => (
        <PropertyTypeCard
          key={type.id}
          propertyType={type.id}
          title={type.title}
          description={type.description}
          onClick={(): void => handlePropertyTypeSelection(type.id)}
          data-testid={`property-type-card-${type.id}`}
        />
      ))}
    </Box>
  );
};