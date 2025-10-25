/**
 * PropertyDetailsStep.tsx - Enterprise Modular Property Details Step
 *
 * Καθαρό modular property details step που διαχειρίζεται φόρμα με στοιχεία ακινήτου
 */

import React, { useCallback, useState } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { PropertyDetailsForm } from './PropertyDetailsForm';
import { BaseCard } from '@layera/cards';
import { CheckIcon, CheckIcon as FormIcon } from '@layera/icons';
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
      placeholder: 'π.χ. 150000',
      min: 0
    },
    {
      id: 'squareMeters',
      label: 'Τετραγωνικά Μέτρα',
      type: 'number',
      required: true,
      placeholder: 'π.χ. 85',
      min: 1
    },
    {
      id: 'rooms',
      label: 'Δωμάτια',
      type: 'number',
      placeholder: 'π.χ. 3',
      min: 1,
      max: 20
    },
    {
      id: 'bathrooms',
      label: 'Μπάνια',
      type: 'number',
      placeholder: 'π.χ. 2',
      min: 1,
      max: 10
    },
    {
      id: 'floor',
      label: 'Όροφος',
      type: 'number',
      placeholder: 'π.χ. 3',
      min: -2,
      max: 50
    },
    {
      id: 'yearBuilt',
      label: 'Έτος Κατασκευής',
      type: 'number',
      placeholder: 'π.χ. 2005',
      min: 1800,
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
    console.log('🎯 PROPERTY DETAILS UI: Submitting details', details);

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
      setTimeout(() => {
        onNext?.();
      }, 300);

    } catch (error) {
      console.error('Property details submission failed:', error);
    }
  }, [details, onStepComplete, onPropertyDetailsSubmitted, onNext]);

  const handleSkip = useCallback(async () => {
    console.log('🎯 PROPERTY DETAILS UI: Skipping details');

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
      setTimeout(() => {
        onNext?.();
      }, 300);

    } catch (error) {
      console.error('Property details skip failed:', error);
    }
  }, [onStepComplete, onNext]);

  if (!isVisible) {
    return null;
  }

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 'var(--layera-cards-top)',
    left: 'var(--layera-side-margins)',
    right: 'var(--layera-side-margins)',
    zIndex: 10002,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--layera-cards-gap)',
    padding: '0',
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto'
  };

  const hasRequiredFields = Boolean(details.price && details.squareMeters);

  return (
    <div style={containerStyles}>
      {!showForm ? (
        <>
          {/* Show Form Card */}
          <BaseCard
            variant="info"
            title="Στοιχεία Ακινήτου"
            description="Συμπληρώστε τα στοιχεία του ακινήτου"
            icon={<FormIcon size="sm" theme="neutral" />}
            onClick={handleShowForm}
            data-testid="property-details-show-form"
          />

          {/* Skip Card */}
          <BaseCard
            variant="neutral"
            title="Παράλειψη"
            description="Συνέχεια χωρίς στοιχεία"
            icon={<CheckIcon size="sm" theme="neutral" />}
            onClick={handleSkip}
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
            title="Αποθήκευση"
            description={hasRequiredFields ? "Αποθήκευση στοιχείων" : "Συμπληρώστε τιμή και τ.μ."}
            icon={<CheckIcon size="sm" theme="neutral" />}
            onClick={handleSubmit}
            data-testid="property-details-submit"
          />

          {/* Back to Menu */}
          <BaseCard
            variant="neutral"
            title="Πίσω"
            description="Επιστροφή στο μενού"
            onClick={() => setShowForm(false)}
            data-testid="property-details-back"
          />
        </>
      )}
    </div>
  );
};