/**
 * PropertyTypeStep.tsx - Enterprise Modular Property Type Step
 *
 * Καθαρό modular property type step που δείχνει τους τύπους ακινήτων
 */

import React, { useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { PropertyTypeSelector } from './PropertyTypeSelector';
import { Box, Flex } from '@layera/layout';
import { useGeoAlertLayout } from '@layera/layout';
import type { StepProps } from '../types';
import type { PropertyType, PropertyTypeStepData, PropertyTypeOption } from './types';

export interface PropertyTypeStepProps extends StepProps {
  /** Property type selection callback */
  onPropertyTypeSelected?: (propertyType: PropertyType) => void;
}

/**
 * Enterprise Property Type Step - Combo Box με SST Select Integration
 */
export const PropertyTypeStep: React.FC<PropertyTypeStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onPropertyTypeSelected,
  isVisible = true,
  deviceProps = {}
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <PropertyTypeSelector
      context={context}
      onNext={onNext}
      onStepComplete={onStepComplete}
      onPropertyTypeSelected={onPropertyTypeSelected}
      isVisible={isVisible}
      deviceProps={deviceProps}
    />
  );
};