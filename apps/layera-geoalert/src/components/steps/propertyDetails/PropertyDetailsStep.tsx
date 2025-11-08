/**
 * PropertyDetailsStep.tsx - Enterprise Modular Property Details Step
 *
 * Καθαρό modular property details step που διαχειρίζεται φόρμα με στοιχεία ακινήτου
 */

import React, { useCallback, useState } from 'react';
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import { PropertyDetailsForm } from './PropertyDetailsForm';
import { BaseCard } from '@layera/cards';
import { CheckIcon, CheckIcon as FormIcon } from '@layera/icons';
import { getCardInfoColor, FIXED_DIMENSIONS, DEMO_PROPERTY_DATA, ANIMATION_DURATIONS } from '@layera/constants';
import type { StepProps } from '../types';
import type { PropertyDetails, PropertyDetailsStepData, PropertyDetailsFormField } from './types';

export interface PropertyDetailsStepProps extends StepProps {
  /** Property details submission callback */
  onPropertyDetailsSubmitted?: (details: PropertyDetails) => void;
}

/**
 * Enterprise Property Details Step - Καθαρό modular component για Property Details φόρμα
 */
export const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onPropertyDetailsSubmitted,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();
  const [details, setDetails] = useState<PropertyDetails>({});
  const [showForm, setShowForm] = useState(false);

  const formFields: PropertyDetailsFormField[] = [
    {
      id: 'price',
      label: 'Τιμή (€)',
      type: 'number',
      required: true,
      placeholder: `π.χ. ${DEMO_PROPERTY_DATA.PRICE}`,
      min: DEMO_PROPERTY_DATA.MIN_PRICE  // SSOT για minimum price
    },
    {
      id: 'squareMeters',
      label: 'Τετραγωνικά Μέτρα',
      type: 'number',
      required: true,
      placeholder: `π.χ. ${DEMO_PROPERTY_DATA.SQUARE_METERS}`,
      min: DEMO_PROPERTY_DATA.MIN_SQUARE_METERS  // SSOT για minimum square meters
    },
    {
      id: 'rooms',
      label: 'Δωμάτια',
      type: 'number',
      placeholder: `π.χ. ${DEMO_PROPERTY_DATA.DEFAULT_ROOMS_PLACEHOLDER}`,  // SSOT placeholder
      min: DEMO_PROPERTY_DATA.MIN_ROOMS,  // SSOT validation
      max: DEMO_PROPERTY_DATA.MAX_BEDROOMS
    },
    {
      id: 'bathrooms',
      label: 'Μπάνια',
      type: 'number',
      placeholder: `π.χ. ${DEMO_PROPERTY_DATA.DEFAULT_BATHROOMS_PLACEHOLDER}`,  // SSOT placeholder
      min: DEMO_PROPERTY_DATA.MIN_BATHROOMS,  // SSOT validation
      max: DEMO_PROPERTY_DATA.MAX_BATHROOMS
    },
    {
      id: 'floor',
      label: 'Όροφος',
      type: 'number',
      placeholder: `π.χ. ${DEMO_PROPERTY_DATA.DEFAULT_FLOOR_PLACEHOLDER}`,  // SSOT placeholder
      min: DEMO_PROPERTY_DATA.MIN_FLOOR,  // SSOT basement levels validation
      max: DEMO_PROPERTY_DATA.MAX_PARKING_SPACES
    },
    {
      id: 'yearBuilt',
      label: 'Έτος Κατασκευής',
      type: 'number',
      placeholder: `π.χ. ${DEMO_PROPERTY_DATA.BUILDING_YEAR_PLACEHOLDER}`,
      min: DEMO_PROPERTY_DATA.BUILDING_YEAR_MIN, // Earliest reasonable building year
      max: new Date().getFullYear()
    },
    {
      id: 'hasParking',
      label: 'Θέση Στάθμευσης',
      type: 'boolean'
    },
    {
      id: 'hasGarden',
      label: 'Κήπος',
      type: 'boolean'
    },
    {
      id: 'hasBalcony',
      label: 'Μπαλκόνι',
      type: 'boolean'
    },
    {
      id: 'description',
      label: 'Περιγραφή',
      type: 'textarea',
      placeholder: 'Περιγράψτε το ακίνητο...'
    }
  ];

  const handleFieldChange = useCallback((field: keyof PropertyDetails, value: unknown) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleShowForm = useCallback(() => {
    setShowForm(true);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      // Ενημερώνουμε το StepOrchestrator
      if (onStepComplete) {
        const stepData: PropertyDetailsStepData = {
          propertyDetails: details,
          isComplete: true
        };
        onStepComplete('propertyDetails', stepData);
      }

      // Legacy callback
      onPropertyDetailsSubmitted?.(details);

      // Auto-advance
      setTimeout((): void => {
        onNext?.();
      }, ANIMATION_DURATIONS.NORMAL);  // SSOT για animation timing

    } catch (error) {
      console.error('Property details submission failed:', error);
    }
  }, [details, onStepComplete, onPropertyDetailsSubmitted, onNext]);

  const handleSkip = useCallback(async () => {
    try {
      // Ενημερώνουμε το StepOrchestrator με κενά details
      if (onStepComplete) {
        const stepData: PropertyDetailsStepData = {
          propertyDetails: {},
          isComplete: true
        };
        onStepComplete('propertyDetails', stepData);
      }

      // Auto-advance
      setTimeout((): void => {
        onNext?.();
      }, ANIMATION_DURATIONS.NORMAL);  // SSOT για animation timing

    } catch (error) {
      console.error('Property details skip failed:', error);
    }
  }, [onStepComplete, onNext]);

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
    padding: '0',
    maxHeight: `calc(100vh - ${FIXED_DIMENSIONS.MIN_BUTTON_WIDTH}px)`,
    overflowY: 'auto'
  };

  const hasRequiredFields = Boolean(details.price && details.squareMeters);

  return (
    <Box>
      {!showForm ? (
        <>
          {/* Show Form Card */}
          <BaseCard
            title={t('propertyDetails.title')}
            description={t('property-details.fill-details')}
            icon={<FormIcon size="sm" theme="neutral" />}
            onClick={handleShowForm}
            backgroundColor="card-info" // 🎯 SST: Info card color από design tokens
            className="layera-card-uniform"
            data-testid="property-details-show-form"
          />

          {/* Skip Card */}
          <BaseCard
            variant="neutral"
            title={t('actions.skip')}
            description={t('property-details.continue-without-details')}
            icon={<CheckIcon size="sm" theme="neutral" />}
            onClick={handleSkip}
            className="layera-card-uniform"
            data-testid="property-details-skip"
          />
        </>
      ) : (
        <>
          {/* Form */}
          <PropertyDetailsForm
            details={details}
            onChange={handleFieldChange}
            fields={formFields}
          />

          {/* Submit Card */}
          <BaseCard
            variant={hasRequiredFields ? "success" : "warning"}
            title={t('actions.save')}
            description={hasRequiredFields ? t('property-details.save-details') : t('property-details.fill-price-and-sqm')}
            icon={<CheckIcon size="sm" theme="neutral" />}
            onClick={handleSubmit}
            className="layera-card-uniform"
            data-testid="property-details-submit"
          />

          {/* Back to Menu */}
          <BaseCard
            variant="neutral"
            title={t('actions.back')}
            description={t('actions.back-to-menu')}
            onClick={(): void => setShowForm(false)}
            className="layera-card-uniform"
            data-testid="property-details-back"
          />
        </>
      )}
    </Box>
  );
};