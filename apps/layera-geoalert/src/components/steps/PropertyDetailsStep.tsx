/**
 * PropertyDetailsStep.tsx - Dynamic Property Details Workflow Step
 *
 * Τρίτο βήμα του workflow που δείχνει τα κατάλληλα πεδία details
 * βασισμένο στην επιλογή του Property Type από το πρώτο βήμα
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  SPACING_SCALE,
  BORDER_RADIUS_SCALE,
  CSS_DESIGN_TOKENS,
  ANIMATION_DURATIONS,
  EASING_FUNCTIONS,
  MENU_POSITIONS,
  getWorkflowCardStepStyle,
  getCardInfoBorder,
  getCardPrimaryColor
} from '@layera/constants';
import { Box, Flex, FlexCenter } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { Input, Select } from '@layera/forms';
import {
  HomeIcon,
  EditIcon,
  SettingsIcon
} from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';
import type { PropertyType } from '../../types';
import { QuickSearchState } from './types';

export interface PropertyDetailsStepProps {
  /** Property type που επιλέχθηκε από το πρώτο step */
  selectedPropertyType: PropertyType;
  /** QuickSearch state για context */
  quickSearchState: QuickSearchState;
  /** Callback όταν ο χρήστης θέλει να επιστρέψει */
  onBack?: () => void;
  /** Callback όταν ο χρήστης θέλει να συνεχίσει */
  onNext?: () => void;
  /** Callback όταν τα details ολοκληρωθούν */
  onDetailsComplete?: (details: PropertyDetailsData) => void;
}

export interface PropertyDetailsData {
  propertyType: PropertyType;

  // 📐 Βασικά στοιχεία
  squareMeters?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  yearBuilt?: number;

  // 🏢 Χαρακτηριστικά κτιρίου
  hasElevator?: boolean;
  heating?: string; // 'central', 'individual', 'air_conditioning', 'fireplace', 'none'
  energyClass?: string; // 'A+', 'A', 'B+', 'B', 'C', 'D', 'E', 'pending'
  condition?: string; // 'excellent', 'very_good', 'good', 'fair', 'needs_renovation'

  // 🌟 Επιπλέον χαρακτηριστικά
  hasBalcony?: boolean;
  hasParking?: boolean;
  furnished?: string; // 'fully', 'partial', 'unfurnished'
  orientation?: string; // 'north', 'south', 'east', 'west', 'southeast', 'southwest'

  // 💰 Οικονομικά στοιχεία
  commonExpenses?: number;
  autonomousHeating?: boolean;

  // Πεδία για οικόπεδα
  buildable?: boolean;
  buildingCoefficient?: number;
  frontage?: number;

  // Πεδία για εμπορικά
  hasAirConditioning?: boolean;
  hasSecuritySystem?: boolean;
  parkingSpaces?: number;

  // Πεδία για ειδικά (γκαράζ, υπόγειο κλπ)
  accessibility?: string; // "ground", "stairs", "elevator"
  dimensions?: string; // "3x6m" για parking κλπ
}

// 🔧 Validation error interface
interface ValidationErrors {
  [key: string]: string;
}

// 🔧 Required fields για κάθε property type
const getRequiredFieldsForPropertyType = (propertyType: PropertyType): Array<keyof PropertyDetailsData> => {
  switch (propertyType) {
    case 'apartment':
    case 'studio':
    case 'maisonette':
    case 'house':
    case 'villa':
    case 'cottage':
    case 'penthouse':
    case 'loft':
      return ['squareMeters', 'bedrooms', 'bathrooms', 'floor'];

    case 'residential_plot':
    case 'commercial_plot':
    case 'agricultural_land':
    case 'forest_land':
    case 'land':
      return ['squareMeters'];

    case 'store':
    case 'office':
    case 'warehouse':
    case 'factory':
      return ['squareMeters'];

    case 'garage':
    case 'parking_space':
    case 'storage_unit':
    case 'basement':
    case 'rooftop':
      return ['dimensions'];

    default:
      return [];
  }
};

/**
 * Enterprise Property Details Step - Dynamic Form βασισμένο στο Property Type
 */
export const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({
  selectedPropertyType,
  quickSearchState,
  onBack,
  onNext,
  onDetailsComplete
}) => {
  const { t } = useLayeraTranslation();
  const [details, setDetails] = useState<PropertyDetailsData>({
    propertyType: selectedPropertyType
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // 🔧 Validation function
  const validateForm = useCallback((): ValidationErrors => {
    const errors: ValidationErrors = {};
    const requiredFields = getRequiredFieldsForPropertyType(selectedPropertyType);

    requiredFields.forEach(field => {
      const value = details[field];

      if (value === undefined || value === null || value === '' || value === 0) {
        const fieldName = t(`propertyDetails.${field}`) || field;
        errors[field] = t('validation.required', { field: fieldName }) ||
                       `Το πεδίο "${fieldName}" είναι υποχρεωτικό`;
      }
    });

    // Επιπλέον validation rules
    if (details.squareMeters && details.squareMeters < 1) {
      errors.squareMeters = t('validation.minValue') || 'Τα τετραγωνικά πρέπει να είναι μεγαλύτερα από 0';
    }

    if (details.yearBuilt && (details.yearBuilt < 1800 || details.yearBuilt > new Date().getFullYear())) {
      errors.yearBuilt = t('validation.validYear') || 'Παρακαλώ εισάγετε έγκυρο έτος κατασκευής';
    }

    return errors;
  }, [details, selectedPropertyType, t]);

  // 🏠 Update detail field με validation clear
  const updateDetail = useCallback((field: keyof PropertyDetailsData, value: any) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear validation error για το field που άλλαξε
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [validationErrors]);

  // 🏠 Handle form completion με validation
  const handleComplete = useCallback(() => {
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Καμία validation error, προχωράμε
      onDetailsComplete?.(details);
      onNext?.();
    } else {
      // Υπάρχουν errors, scroll στο πρώτο λάθος πεδίο
      const firstErrorField = Object.keys(errors)[0];
      const firstErrorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [details, onDetailsComplete, onNext, validateForm]);

  // 🔧 Check if form is valid (για το button state)
  const isFormValid = useMemo(() => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  }, [validateForm]);

  // 🏠 Get property type specific fields based on selected type
  const getFieldsForPropertyType = () => {
    switch (selectedPropertyType) {
      case 'apartment':
      case 'studio':
      case 'maisonette':
      case 'house':
      case 'villa':
      case 'cottage':
      case 'penthouse':
      case 'loft':
        return (
          <>
            {/* 📐 ΒΑΣΙΚΑ ΣΤΟΙΧΕΙΑ */}
            <Box style={{
              backgroundColor: 'var(--la-color-bg-elevated)',
              padding: `${SPACING_SCALE.MD}px`,
              borderRadius: `${BORDER_RADIUS_SCALE.MD}px`,
              marginBottom: `${SPACING_SCALE.LG}px`
            }}>
              <Text size="sm" weight="medium" style={{
                color: 'var(--la-text-primary)',
                marginBottom: `${SPACING_SCALE.MD}px`,
                display: 'block'
              }}>
                📐 Βασικά Χαρακτηριστικά
              </Text>

              <Flex direction="column" gap="md">
                {/* Τετραγωνικά */}
                <Box>
                  <label style={{
                    display: 'block',
                    fontSize: 'var(--la-font-size-sm)',
                    fontWeight: 'var(--la-font-weight-medium)',
                    color: validationErrors.squareMeters ? 'var(--la-color-error)' : 'var(--la-text-primary)',
                    marginBottom: 'var(--la-space-2)'
                  }}>
                    {t('propertyDetails.squareMeters') || 'Τετραγωνικά μέτρα (τ.μ.) *'}
                  </label>
                  <Input
                    name="squareMeters"
                    type="number"
                    value={details.squareMeters || ''}
                    onChange={(e) => updateDetail('squareMeters', Number(e.target.value))}
                    placeholder="π.χ. 85"
                    size="large"
                    fullWidth
                    style={{
                      borderColor: validationErrors.squareMeters ? 'var(--la-color-error)' : undefined
                    }}
                  />
                  {validationErrors.squareMeters && (
                    <Text size="xs" style={{
                      color: 'var(--la-color-error)',
                      marginTop: 'var(--la-space-1)',
                      display: 'block'
                    }}>
                      {validationErrors.squareMeters}
                    </Text>
                  )}
                </Box>

                <Flex gap="md">
                  {/* Δωμάτια */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: validationErrors.bedrooms ? 'var(--la-color-error)' : 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.bedrooms') || 'Υπνοδωμάτια *'}
                    </label>
                    <Select
                      name="bedrooms"
                      value={details.bedrooms || ''}
                      onChange={(value) => updateDetail('bedrooms', Number(value))}
                      options={[
                        { value: '1', label: '1 δωμάτιο' },
                        { value: '2', label: '2 δωμάτια' },
                        { value: '3', label: '3 δωμάτια' },
                        { value: '4', label: '4 δωμάτια' },
                        { value: '5', label: '5+ δωμάτια' }
                      ]}
                      placeholder="Δωμάτια"
                      size="large"
                      fullWidth
                      style={{
                        borderColor: validationErrors.bedrooms ? 'var(--la-color-error)' : undefined
                      }}
                    />
                    {validationErrors.bedrooms && (
                      <Text size="xs" style={{
                        color: 'var(--la-color-error)',
                        marginTop: 'var(--la-space-1)',
                        display: 'block'
                      }}>
                        {validationErrors.bedrooms}
                      </Text>
                    )}
                  </Box>

                  {/* Μπάνια */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: validationErrors.bathrooms ? 'var(--la-color-error)' : 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.bathrooms') || 'Μπάνια/WC *'}
                    </label>
                    <Select
                      name="bathrooms"
                      value={details.bathrooms || ''}
                      onChange={(value) => updateDetail('bathrooms', Number(value))}
                      options={[
                        { value: '1', label: '1 μπάνιο' },
                        { value: '2', label: '2 μπάνια' },
                        { value: '3', label: '3+ μπάνια' }
                      ]}
                      placeholder="Μπάνια"
                      size="large"
                      fullWidth
                      style={{
                        borderColor: validationErrors.bathrooms ? 'var(--la-color-error)' : undefined
                      }}
                    />
                    {validationErrors.bathrooms && (
                      <Text size="xs" style={{
                        color: 'var(--la-color-error)',
                        marginTop: 'var(--la-space-1)',
                        display: 'block'
                      }}>
                        {validationErrors.bathrooms}
                      </Text>
                    )}
                  </Box>
                </Flex>

                <Flex gap="md">
                  {/* Όροφος */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: validationErrors.floor ? 'var(--la-color-error)' : 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.floor') || 'Όροφος *'}
                    </label>
                    <Select
                      name="floor"
                      value={details.floor !== undefined ? String(details.floor) : ''}
                      onChange={(value) => updateDetail('floor', Number(value))}
                      options={[
                        { value: '-1', label: 'Υπόγειο' },
                        { value: '0', label: 'Ισόγειο' },
                        { value: '1', label: '1ος όροφος' },
                        { value: '2', label: '2ος όροφος' },
                        { value: '3', label: '3ος όροφος' },
                        { value: '4', label: '4ος όροφος' },
                        { value: '5', label: '5ος όροφος' },
                        { value: '6', label: '6ος+ όροφος' }
                      ]}
                      placeholder="Όροφος"
                      size="large"
                      fullWidth
                      style={{
                        borderColor: validationErrors.floor ? 'var(--la-color-error)' : undefined
                      }}
                    />
                    {validationErrors.floor && (
                      <Text size="xs" style={{
                        color: 'var(--la-color-error)',
                        marginTop: 'var(--la-space-1)',
                        display: 'block'
                      }}>
                        {validationErrors.floor}
                      </Text>
                    )}
                  </Box>

                  {/* Έτος κατασκευής */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: validationErrors.yearBuilt ? 'var(--la-color-error)' : 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.yearBuilt') || 'Έτος κατασκευής'}
                    </label>
                    <Input
                      name="yearBuilt"
                      type="number"
                      value={details.yearBuilt || ''}
                      onChange={(e) => updateDetail('yearBuilt', Number(e.target.value))}
                      placeholder="π.χ. 2005"
                      size="large"
                      fullWidth
                      style={{
                        borderColor: validationErrors.yearBuilt ? 'var(--la-color-error)' : undefined
                      }}
                    />
                    {validationErrors.yearBuilt && (
                      <Text size="xs" style={{
                        color: 'var(--la-color-error)',
                        marginTop: 'var(--la-space-1)',
                        display: 'block'
                      }}>
                        {validationErrors.yearBuilt}
                      </Text>
                    )}
                  </Box>
                </Flex>
              </Flex>
            </Box>

            {/* 🏢 ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ ΚΤΙΡΙΟΥ */}
            <Box style={{
              backgroundColor: 'var(--la-color-bg-elevated)',
              padding: `${SPACING_SCALE.MD}px`,
              borderRadius: `${BORDER_RADIUS_SCALE.MD}px`,
              marginBottom: `${SPACING_SCALE.LG}px`
            }}>
              <Text size="sm" weight="medium" style={{
                color: 'var(--la-text-primary)',
                marginBottom: `${SPACING_SCALE.MD}px`,
                display: 'block'
              }}>
                🏢 Χαρακτηριστικά Κτιρίου
              </Text>

              <Flex direction="column" gap="md">
                <Flex gap="md">
                  {/* Ασανσέρ */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.hasElevator') || 'Ασανσέρ'}
                    </label>
                    <Select
                      value={details.hasElevator ? 'yes' : details.hasElevator === false ? 'no' : ''}
                      onChange={(value) => updateDetail('hasElevator', value === 'yes')}
                      options={[
                        { value: 'yes', label: 'Ναι, υπάρχει ασανσέρ' },
                        { value: 'no', label: 'Όχι, χωρίς ασανσέρ' }
                      ]}
                      placeholder="Επιλέξτε"
                      size="large"
                      fullWidth
                    />
                  </Box>

                  {/* Θέρμανση */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.heating') || 'Θέρμανση'}
                    </label>
                    <Select
                      value={details.heating || ''}
                      onChange={(value) => updateDetail('heating', value)}
                      options={[
                        { value: 'central', label: 'Κεντρική θέρμανση' },
                        { value: 'individual', label: 'Ατομική θέρμανση' },
                        { value: 'air_conditioning', label: 'Κλιματισμός' },
                        { value: 'fireplace', label: 'Τζάκι' },
                        { value: 'none', label: 'Χωρίς θέρμανση' }
                      ]}
                      placeholder="Τύπος θέρμανσης"
                      size="large"
                      fullWidth
                    />
                  </Box>
                </Flex>

                <Flex gap="md">
                  {/* Ενεργειακή κλάση */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.energyClass') || 'Ενεργειακή κλάση'}
                    </label>
                    <Select
                      value={details.energyClass || ''}
                      onChange={(value) => updateDetail('energyClass', value)}
                      options={[
                        { value: 'A+', label: 'A+ (Εξαιρετική)' },
                        { value: 'A', label: 'A (Πολύ καλή)' },
                        { value: 'B+', label: 'B+ (Καλή)' },
                        { value: 'B', label: 'B (Μέτρια)' },
                        { value: 'C', label: 'C (Μέτρια)' },
                        { value: 'D', label: 'D (Χαμηλή)' },
                        { value: 'E', label: 'E (Πολύ χαμηλή)' },
                        { value: 'pending', label: 'Εν αναμονή έκδοσης' }
                      ]}
                      placeholder="Επιλέξτε ενεργειακή κλάση"
                      size="large"
                      fullWidth
                    />
                  </Box>

                  {/* Κατάσταση ακινήτου */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.condition') || 'Κατάσταση ακινήτου'}
                    </label>
                    <Select
                      value={details.condition || ''}
                      onChange={(value) => updateDetail('condition', value)}
                      options={[
                        { value: 'excellent', label: 'Άριστη κατάσταση' },
                        { value: 'very_good', label: 'Πολύ καλή κατάσταση' },
                        { value: 'good', label: 'Καλή κατάσταση' },
                        { value: 'fair', label: 'Μέτρια κατάσταση' },
                        { value: 'needs_renovation', label: 'Χρειάζεται ανακαίνιση' }
                      ]}
                      placeholder="Κατάσταση"
                      size="large"
                      fullWidth
                    />
                  </Box>
                </Flex>
              </Flex>
            </Box>

            {/* 🌟 ΕΠΙΠΛΕΟΝ ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ */}
            <Box style={{
              backgroundColor: 'var(--la-color-bg-elevated)',
              padding: `${SPACING_SCALE.MD}px`,
              borderRadius: `${BORDER_RADIUS_SCALE.MD}px`,
              marginBottom: `${SPACING_SCALE.LG}px`
            }}>
              <Text size="sm" weight="medium" style={{
                color: 'var(--la-text-primary)',
                marginBottom: `${SPACING_SCALE.MD}px`,
                display: 'block'
              }}>
                🌟 Επιπλέον Χαρακτηριστικά
              </Text>

              <Flex direction="column" gap="md">
                <Flex gap="md">
                  {/* Μπαλκόνι */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.hasBalcony') || 'Μπαλκόνι/Βεράντα'}
                    </label>
                    <Select
                      value={details.hasBalcony ? 'yes' : details.hasBalcony === false ? 'no' : ''}
                      onChange={(value) => updateDetail('hasBalcony', value === 'yes')}
                      options={[
                        { value: 'yes', label: 'Ναι, έχει μπαλκόνι' },
                        { value: 'no', label: 'Όχι, χωρίς μπαλκόνι' }
                      ]}
                      placeholder="Επιλέξτε"
                      size="large"
                      fullWidth
                    />
                  </Box>

                  {/* Θέση στάθμευσης */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.hasParking') || 'Θέση στάθμευσης'}
                    </label>
                    <Select
                      value={details.hasParking ? 'yes' : details.hasParking === false ? 'no' : ''}
                      onChange={(value) => updateDetail('hasParking', value === 'yes')}
                      options={[
                        { value: 'yes', label: 'Ναι, έχει στάθμευση' },
                        { value: 'no', label: 'Όχι, χωρίς στάθμευση' }
                      ]}
                      placeholder="Επιλέξτε"
                      size="large"
                      fullWidth
                    />
                  </Box>
                </Flex>

                <Flex gap="md">
                  {/* Επιπλωμένο */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.furnished') || 'Επίπλωση'}
                    </label>
                    <Select
                      value={details.furnished || ''}
                      onChange={(value) => updateDetail('furnished', value)}
                      options={[
                        { value: 'fully', label: 'Πλήρως επιπλωμένο' },
                        { value: 'partial', label: 'Μερικώς επιπλωμένο' },
                        { value: 'unfurnished', label: 'Χωρίς έπιπλα' }
                      ]}
                      placeholder="Κατάσταση επίπλωσης"
                      size="large"
                      fullWidth
                    />
                  </Box>

                  {/* Προσανατολισμός */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.orientation') || 'Προσανατολισμός'}
                    </label>
                    <Select
                      value={details.orientation || ''}
                      onChange={(value) => updateDetail('orientation', value)}
                      options={[
                        { value: 'north', label: 'Βόρεια όψη' },
                        { value: 'south', label: 'Νότια όψη' },
                        { value: 'east', label: 'Ανατολική όψη' },
                        { value: 'west', label: 'Δυτική όψη' },
                        { value: 'southeast', label: 'Νοτιοανατολική όψη' },
                        { value: 'southwest', label: 'Νοτιοδυτική όψη' }
                      ]}
                      placeholder="Κύρια όψη"
                      size="large"
                      fullWidth
                    />
                  </Box>
                </Flex>
              </Flex>
            </Box>

            {/* 💰 ΟΙΚΟΝΟΜΙΚΑ ΣΤΟΙΧΕΙΑ */}
            <Box style={{
              backgroundColor: 'var(--la-color-bg-elevated)',
              padding: `${SPACING_SCALE.MD}px`,
              borderRadius: `${BORDER_RADIUS_SCALE.MD}px`
            }}>
              <Text size="sm" weight="medium" style={{
                color: 'var(--la-text-primary)',
                marginBottom: `${SPACING_SCALE.MD}px`,
                display: 'block'
              }}>
                💰 Οικονομικά Στοιχεία
              </Text>

              <Flex direction="column" gap="md">
                <Flex gap="md">
                  {/* Κοινόχρηστα */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.commonExpenses') || 'Κοινόχρηστα (€/μήνα)'}
                    </label>
                    <Input
                      type="number"
                      value={details.commonExpenses || ''}
                      onChange={(e) => updateDetail('commonExpenses', Number(e.target.value))}
                      placeholder="π.χ. 50"
                      size="large"
                      fullWidth
                    />
                  </Box>

                  {/* ΔΕΗ */}
                  <Box style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'var(--la-font-size-sm)',
                      fontWeight: 'var(--la-font-weight-medium)',
                      color: 'var(--la-text-primary)',
                      marginBottom: 'var(--la-space-2)'
                    }}>
                      {t('propertyDetails.autonomousHeating') || 'Αυτόνομη θέρμανση'}
                    </label>
                    <Select
                      value={details.autonomousHeating ? 'yes' : details.autonomousHeating === false ? 'no' : ''}
                      onChange={(value) => updateDetail('autonomousHeating', value === 'yes')}
                      options={[
                        { value: 'yes', label: 'Ναι, αυτόνομη' },
                        { value: 'no', label: 'Όχι, κεντρική' }
                      ]}
                      placeholder="Τύπος θέρμανσης"
                      size="large"
                      fullWidth
                    />
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </>
        );

      case 'residential_plot':
      case 'commercial_plot':
      case 'agricultural_land':
      case 'forest_land':
      case 'land':
        return (
          <>
            {/* Τετραγωνικά οικοπέδου */}
            <Box>
              <label style={{
                display: 'block',
                fontSize: 'var(--la-font-size-sm)',
                fontWeight: 'var(--la-font-weight-medium)',
                color: 'var(--la-text-primary)',
                marginBottom: 'var(--la-space-2)'
              }}>
                {t('propertyDetails.plotSquareMeters') || 'Εμβαδόν οικοπέδου (τ.μ.)'}
              </label>
              <Input
                type="number"
                value={details.squareMeters || ''}
                onChange={(e) => updateDetail('squareMeters', Number(e.target.value))}
                placeholder="π.χ. 500"
                size="large"
                fullWidth
              />
            </Box>

            {/* Δομήσιμο */}
            <Box>
              <label style={{
                display: 'block',
                fontSize: 'var(--la-font-size-sm)',
                fontWeight: 'var(--la-font-weight-medium)',
                color: 'var(--la-text-primary)',
                marginBottom: 'var(--la-space-2)'
              }}>
                {t('propertyDetails.buildable') || 'Δομήσιμο'}
              </label>
              <Select
                value={details.buildable ? 'yes' : details.buildable === false ? 'no' : ''}
                onChange={(value) => updateDetail('buildable', value === 'yes')}
                options={[
                  { value: 'yes', label: 'Ναι, είναι δομήσιμο' },
                  { value: 'no', label: 'Όχι, δεν είναι δομήσιμο' }
                ]}
                placeholder="Επιλέξτε αν είναι δομήσιμο"
                size="large"
                fullWidth
              />
            </Box>

            {/* Πρόσοψη */}
            <Box>
              <label style={{
                display: 'block',
                fontSize: 'var(--la-font-size-sm)',
                fontWeight: 'var(--la-font-weight-medium)',
                color: 'var(--la-text-primary)',
                marginBottom: 'var(--la-space-2)'
              }}>
                {t('propertyDetails.frontage') || 'Πρόσοψη (μέτρα)'}
              </label>
              <Input
                type="number"
                value={details.frontage || ''}
                onChange={(e) => updateDetail('frontage', Number(e.target.value))}
                placeholder="π.χ. 20"
                size="large"
                fullWidth
              />
            </Box>
          </>
        );

      case 'store':
      case 'office':
      case 'warehouse':
      case 'factory':
        return (
          <>
            {/* Τετραγωνικά */}
            <Box>
              <label style={{
                display: 'block',
                fontSize: 'var(--la-font-size-sm)',
                fontWeight: 'var(--la-font-weight-medium)',
                color: 'var(--la-text-primary)',
                marginBottom: 'var(--la-space-2)'
              }}>
                {t('propertyDetails.squareMeters') || 'Τετραγωνικά μέτρα (τ.μ.)'}
              </label>
              <Input
                type="number"
                value={details.squareMeters || ''}
                onChange={(e) => updateDetail('squareMeters', Number(e.target.value))}
                placeholder="π.χ. 120"
                size="large"
                fullWidth
              />
            </Box>

            {/* Κλιματισμός */}
            <Box>
              <label style={{
                display: 'block',
                fontSize: 'var(--la-font-size-sm)',
                fontWeight: 'var(--la-font-weight-medium)',
                color: 'var(--la-text-primary)',
                marginBottom: 'var(--la-space-2)'
              }}>
                {t('propertyDetails.airConditioning') || 'Κλιματισμός'}
              </label>
              <Select
                value={details.hasAirConditioning ? 'yes' : details.hasAirConditioning === false ? 'no' : ''}
                onChange={(value) => updateDetail('hasAirConditioning', value === 'yes')}
                options={[
                  { value: 'yes', label: 'Ναι, υπάρχει κλιματισμός' },
                  { value: 'no', label: 'Όχι, δεν υπάρχει κλιματισμός' }
                ]}
                placeholder="Επιλέξτε αν υπάρχει κλιματισμός"
                size="large"
                fullWidth
              />
            </Box>

            {/* Θέσεις στάθμευσης */}
            <Box>
              <label style={{
                display: 'block',
                fontSize: 'var(--la-font-size-sm)',
                fontWeight: 'var(--la-font-weight-medium)',
                color: 'var(--la-text-primary)',
                marginBottom: 'var(--la-space-2)'
              }}>
                {t('propertyDetails.parkingSpaces') || 'Θέσεις στάθμευσης'}
              </label>
              <Select
                value={details.parkingSpaces || ''}
                onChange={(value) => updateDetail('parkingSpaces', Number(value))}
                options={[
                  { value: '0', label: 'Καμία θέση στάθμευσης' },
                  { value: '1', label: '1 θέση στάθμευσης' },
                  { value: '2', label: '2 θέσεις στάθμευσης' },
                  { value: '3', label: '3+ θέσεις στάθμευσης' }
                ]}
                placeholder="Επιλέξτε αριθμό θέσεων"
                size="large"
                fullWidth
              />
            </Box>
          </>
        );

      case 'garage':
      case 'parking_space':
      case 'storage_unit':
      case 'basement':
      case 'rooftop':
        return (
          <>
            {/* Διαστάσεις */}
            <Box>
              <label style={{
                display: 'block',
                fontSize: 'var(--la-font-size-sm)',
                fontWeight: 'var(--la-font-weight-medium)',
                color: 'var(--la-text-primary)',
                marginBottom: 'var(--la-space-2)'
              }}>
                {t('propertyDetails.dimensions') || 'Διαστάσεις'}
              </label>
              <Input
                value={details.dimensions || ''}
                onChange={(e) => updateDetail('dimensions', e.target.value)}
                placeholder="π.χ. 3x6 μέτρα ή 25 τ.μ."
                size="large"
                fullWidth
              />
            </Box>

            {/* Προσβασιμότητα */}
            <Box>
              <label style={{
                display: 'block',
                fontSize: 'var(--la-font-size-sm)',
                fontWeight: 'var(--la-font-weight-medium)',
                color: 'var(--la-text-primary)',
                marginBottom: 'var(--la-space-2)'
              }}>
                {t('propertyDetails.accessibility') || 'Πρόσβαση'}
              </label>
              <Select
                value={details.accessibility || ''}
                onChange={(value) => updateDetail('accessibility', value)}
                options={[
                  { value: 'ground', label: 'Ισόγειο - άμεση πρόσβαση' },
                  { value: 'stairs', label: 'Με σκάλες' },
                  { value: 'elevator', label: 'Με ασανσέρ' }
                ]}
                placeholder="Επιλέξτε τύπο πρόσβασης"
                size="large"
                fullWidth
              />
            </Box>
          </>
        );

      default:
        return (
          <Box textAlign="center">
            <Text>{t('propertyDetails.noSpecificFields') || 'Δεν υπάρχουν ειδικά πεδία για αυτόν τον τύπο ακινήτου'}</Text>
          </Box>
        );
    }
  };

  return (
    <div
      style={{
        ...getWorkflowCardStepStyle(),
        backdropFilter: 'none',
        boxShadow: `var(--la-shadow-xl)`,
        display: 'block',
        width: SPACING_SCALE.FULL,
        animation: `slideIn ${ANIMATION_DURATIONS.FAST}ms ${EASING_FUNCTIONS.EASE_OUT}`,
        border: `3px solid ${getCardInfoBorder()}`,
        padding: `${SPACING_SCALE.LG}px`
      }}
    >
      <Flex direction="column" gap="xl" style={{ alignItems: 'stretch' }}>
        {/* Header */}
        <Box textAlign={MENU_POSITIONS.CENTER}>
          <Flex align="center" gap="md" style={{ justifyContent: 'center', marginBottom: `${SPACING_SCALE.MD}px` }}>
            <Box style={{ color: getCardPrimaryColor() }}>
              <EditIcon size="lg" />
            </Box>
            <Heading size="lg" style={{
              color: 'var(--color-text-primary)'
            }}>
              {t('propertyDetails.title') || 'Στοιχεία Ακινήτου'}
            </Heading>
          </Flex>
          <Text size="md" style={{
            color: 'var(--color-text-secondary)'
          }}>
            {t('propertyDetails.subtitle') || `Συμπληρώστε τα χαρακτηριστικά για ${t(`propertyType.${selectedPropertyType}`) || selectedPropertyType}`}
          </Text>
        </Box>

        {/* Dynamic Fields Based on Property Type */}
        <Flex direction="column" gap="lg">
          {getFieldsForPropertyType()}
        </Flex>

        {/* Actions */}
        <Box textAlign={MENU_POSITIONS.CENTER}>
          <Flex gap="lg" justifyContent="center" wrap="wrap" style={{ alignItems: 'center' }}>
            <Button
              variant="secondary"
              size="lg"
              onClick={onBack}
            >
              {t('workflow.actions.backToPropertyType') || '← Πίσω στον Τύπο'}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={handleComplete}
              disabled={!isFormValid}
              style={{
                opacity: isFormValid ? 1 : 0.6,
                cursor: isFormValid ? 'pointer' : 'not-allowed'
              }}
            >
              {isFormValid
                ? (t('workflow.actions.continueToLocation') || 'Συνέχεια στην Τοποθεσία →')
                : (t('workflow.actions.completeRequiredFields') || 'Συμπληρώστε τα απαιτούμενα πεδία')
              }
            </Button>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};