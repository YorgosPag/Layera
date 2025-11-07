/**
 * PropertyTypeSelector.tsx - Enterprise Property Type Combo Box με SST Select Integration
 *
 * Combo box επιλογή τύπου ακινήτου με εκτενή λίστα όλων των δυνατών τύπων
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Select } from '@layera/forms';
import { Box, Flex } from '@layera/layout';
import type { PropertyType, PropertyTypeStepData } from './types';
import type { StepProps } from '../types';

export interface PropertyTypeSelectorProps extends StepProps {
  /** Property type selection callback */
  onPropertyTypeSelected?: (propertyType: PropertyType) => void;
}

/**
 * Ελληνικοί Τύποι Ακινήτων - Single Source of Truth για Real Estate
 */
const PROPERTY_TYPE_OPTIONS = [
  // Κατοικίες
  { value: 'apartment', label: 'Διαμέρισμα' },
  { value: 'studio', label: 'Γκαρσονιέρα/Studio' },
  { value: 'maisonette', label: 'Μεζονέτα' },
  { value: 'house', label: 'Μονοκατοικία' },
  { value: 'villa', label: 'Βίλλα' },
  { value: 'cottage', label: 'Εξοχικό' },
  { value: 'penthouse', label: 'Ρετιρέ' },
  { value: 'loft', label: 'Loft' },

  // Εμπορικά
  { value: 'store', label: 'Κατάστημα' },
  { value: 'office', label: 'Γραφείο' },
  { value: 'warehouse', label: 'Αποθήκη' },
  { value: 'factory', label: 'Βιοτεχνία/Εργοστάσιο' },

  // Οικόπεδα & Γη
  { value: 'residential_plot', label: 'Οικόπεδο' },
  { value: 'commercial_plot', label: 'Εμπορικό Οικόπεδο' },
  { value: 'agricultural_land', label: 'Αγροτεμάχιο' },
  { value: 'forest_land', label: 'Δασικό Τεμάχιο' },
  { value: 'land', label: 'Γη' },

  // Ειδικά
  { value: 'garage', label: 'Γκαράζ' },
  { value: 'parking_space', label: 'Θέση Στάθμευσης' },
  { value: 'storage_unit', label: 'Αποθηκευτικός Χώρος' },
  { value: 'basement', label: 'Υπόγειο' },
  { value: 'rooftop', label: 'Ταράτσα' }
] as const;

/**
 * Enterprise Property Type Selector - SST Select Integration με εκτενή λίστα τύπων ακινήτων
 */
export const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({
  context,
  onNext,
  onStepComplete,
  onPropertyTypeSelected,
  isVisible = true
}) => {
  const { t } = useLayeraTranslation();
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | ''>('');

  const handlePropertyTypeChange = useCallback(async (value: string) => {
    const propertyType = value as PropertyType;
    setSelectedPropertyType(propertyType);

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

      // Auto-advance μετά από μικρή καθυστέρηση
      setTimeout((): void => {
        onNext?.();
      }, 500);

    } catch (error) {
      console.error('Property type selection failed:', error);
    }
  }, [onStepComplete, onPropertyTypeSelected, onNext]);

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      padding="lg"
      backgroundColor="var(--la-color-bg-elevated)"
      borderRadius="var(--la-radius-lg)"
      marginBottom="md"
    >
      <Flex direction="column" gap="md">
        {/* Τίτλος */}
        <Box textAlign="center">
          <Heading
            size="xl"
            weight="semibold"
            color="primary"
            marginBottom="2"
            margin="0"
          >
            {t('propertyType.title', { defaultValue: 'Καταχώρηση Ακινήτου για Ενοικίαση' })}
          </Heading>
          <Text
            size="sm"
            color="secondary"
            margin="0"
            marginBottom="4"
          >
            {t('propertyType.selectType', { defaultValue: 'Επιλέξτε τον τύπο του ακινήτου από την παρακάτω λίστα' })}
          </Text>
        </Box>

        {/* Property Type Combo Box - SST Select Integration */}
        <Box>
          <Text
            as="label"
            display="block"
            fontSize="base"
            fontWeight="medium"
            color="primary"
            marginBottom="2"
          >
            {t('propertyType.label', { defaultValue: 'Τύπος Ακινήτου' })}
          </Text>

          <Select
            value={selectedPropertyType}
            onChange={handlePropertyTypeChange}
            options={PROPERTY_TYPE_OPTIONS.map(option => ({
              value: option.value,
              label: option.label
            }))}
            placeholder={t('propertyType.placeholder', { defaultValue: 'Επιλέξτε τύπο ακινήτου...' })}
            size="large"
            variant="outline"
            fullWidth
          />
        </Box>

        {/* Helper Text */}
        <Box textAlign="center">
          <Text
            fontSize="xs"
            color="tertiary"
            margin="0"
          >
            {t('propertyType.helper', {
              defaultValue: 'Η επιλογή σας θα καθορίσει τα επόμενα βήματα της καταχώρησης'
            })}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};