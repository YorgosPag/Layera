/**
 * PropertyDetailsForm.tsx - MVP Property Details Form για iPhone 14 Pro Max
 *
 * Βασικά πεδία που χρειάζονται όλοι οι τύποι ακινήτων.
 * Progressive Enhancement - ξεκινάμε με το απαραίτητο minimum.
 */

import React, { useState } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Stack, Flex, Box } from '@layera/layout';
import { Button } from '@layera/buttons';
import { Text } from '@layera/typography';
import { SPACING_SCALE } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { BaseCard } from '@layera/cards';
import { Input, Select } from '@layera/forms';

export interface PropertyDetailsData {
  title: string;
  squareMeters: number;
  price: number;
  floor?: number;  // Conditional for apartments/offices
  rooms?: number;  // Conditional for apartments only
}

export interface PropertyDetailsFormProps {
  propertyType: 'apartment' | 'office' | 'factory' | 'land' | 'building' | 'store';
  onSubmit: (data: PropertyDetailsData) => void;
  onCancel?: () => void;
}

/**
 * MVP Property Details Form
 *
 * Universal Fields (όλα τα ακίνητα):
 * - Τίτλος (title)
 * - Τετραγωνικά μέτρα (squareMeters)
 * - Τιμή (price)
 *
 * Conditional Fields:
 * - Όροφος (floor): apartments, offices
 * - Δωμάτια (rooms): apartments only
 */
export const PropertyDetailsForm: React.FC<PropertyDetailsFormProps> = ({
  propertyType,
  onSubmit,
  onCancel
}) => {
  const { t } = useLayeraTranslation();
  // Property type labels - moved before useState to avoid reference error
  const propertyTypeLabels = {
    apartment: 'Διαμέρισμα',
    office: 'Γραφείο',
    factory: 'Εργοστάσιο',
    land: 'Οικόπεδο',
    building: 'Κτίριο',
    store: 'Κατάστημα'
  };

  const [formData, setFormData] = useState<PropertyDetailsData>({
    title: `${propertyTypeLabels[propertyType]} στο κέντρο`,  // Default title για γρήγορο testing
    squareMeters: 85,  // Default value για γρήγορο testing
    price: 150000,     // Default value για γρήγορο testing
    floor: propertyType === 'apartment' ? 2 : undefined,    // Default floor for apartments
    rooms: propertyType === 'apartment' ? 3 : undefined     // Default rooms for apartments
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PropertyDetailsData, string>>>({});

  const handleInputChange = (field: keyof PropertyDetailsData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PropertyDetailsData, string>> = {};

    // Required fields validation
    if (!formData.title.trim()) {
      newErrors.title = 'Ο τίτλος είναι υποχρεωτικός';
    }

    if (formData.squareMeters <= 0) {
      newErrors.squareMeters = 'Τα τετραγωνικά μέτρα πρέπει να είναι μεγαλύτερα από 0';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Η τιμή πρέπει να είναι μεγαλύτερη από 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (): void => {
    const isValid = validateForm();
    if (isValid) {

      onSubmit(formData);
    } else {
    }
  };

  // Check if floor field should be shown
  const showFloorField = propertyType === 'apartment' || propertyType === 'office';

  // Check if rooms field should be shown
  const showRoomsField = propertyType === 'apartment';

  return (
    <BaseCard
      padding="md"
      variant="default"
      shadow="cardDefault"
    >
      <Stack spacing="md">
        {/* Header */}
        <Box textAlign="center" marginBottom="lg">
          <Text size="lg" weight="bold" color="primary">
            Στοιχεία {propertyTypeLabels[propertyType]}
          </Text>
          <Box marginTop="xs">
            <Text size="sm" color="secondary">
              Συμπληρώστε τα βασικά στοιχεία του ακινήτου
            </Text>
          </Box>
        </Box>

        {/* Universal Fields - LEGO Forms Components */}
        <Box marginBottom="md">
          <Text as="label" size="sm" weight="bold" display="block" marginBottom="xs">
            Τίτλος Ακινήτου *
          </Text>
          <Input
            type="text"
            value={formData.title}
            onChange={(e: React.FormEvent<HTMLFormElement>) => handleInputChange('title', e.target.value)}
            placeholder={t('property.form.title.placeholder')}
            variant="outline"
            size="md"
            fullWidth
            error={!!errors.title}
          />
          {errors.title && (
            <Box marginTop="xs">
              <Text size="xs" color="error">
                {errors.title}
              </Text>
            </Box>
          )}
        </Box>

        <Box marginBottom="md">
          <Text as="label" size="sm" weight="bold" display="block" marginBottom="xs">
            Τετραγωνικά Μέτρα *
          </Text>
          <Input
            type="number"
            value={formData.squareMeters}
            onChange={(e: React.FormEvent<HTMLFormElement>) => handleInputChange('squareMeters', parseFloat(e.target.value) || 0)}
            placeholder="85"
            variant="outline"
            size="md"
            fullWidth
            error={!!errors.squareMeters}
          />
          {errors.squareMeters && (
            <Box marginTop="xs">
              <Text size="xs" color="error">
                {errors.squareMeters}
              </Text>
            </Box>
          )}
        </Box>

        <Box marginBottom="md">
          <Text as="label" size="sm" weight="bold" display="block" marginBottom="xs">
            Τιμή (€) *
          </Text>
          <Input
            type="number"
            value={formData.price}
            onChange={(e: React.FormEvent<HTMLFormElement>) => handleInputChange('price', parseFloat(e.target.value) || 0)}
            placeholder="150000"
            variant="outline"
            size="md"
            fullWidth
            error={!!errors.price}
          />
          {errors.price && (
            <Box marginTop="xs">
              <Text size="xs" color="error">
                {errors.price}
              </Text>
            </Box>
          )}
        </Box>

        {/* Conditional Fields - Simplified για debugging */}
        {showFloorField && (
          <Box marginBottom="md">
            <Text as="label" size="sm" weight="bold" display="block" marginBottom="xs">
              Όροφος
            </Text>
            <Select
              value={formData.floor || ''}
              onChange={(e: React.FormEvent<HTMLFormElement>) => handleInputChange('floor', parseInt(e.target.value))}
              variant="outline"
              size="md"
              fullWidth
              placeholder={t('property.form.floor.placeholder')}
            >
              <option value="2">2ος όροφος</option>
              <option value="1">1ος όροφος</option>
              <option value="0">Ισόγειο</option>
              <option value="-1">Υπόγειο</option>
            </Select>
          </Box>
        )}

        {showRoomsField && (
          <Box marginBottom="md">
            <Text as="label" size="sm" weight="bold" display="block" marginBottom="xs">
              Αριθμός Δωματίων
            </Text>
            <Select
              value={formData.rooms || ''}
              onChange={(e: React.FormEvent<HTMLFormElement>) => handleInputChange('rooms', parseInt(e.target.value))}
              variant="outline"
              size="md"
              fullWidth
              placeholder={t('property.form.rooms.placeholder')}
            >
              <option value="3">3 δωμάτια</option>
              <option value="2">2 δωμάτια</option>
              <option value="1">1 δωμάτιο (Studio)</option>
              <option value="4">4 δωμάτια</option>
              <option value="5">5+ δωμάτια</option>
            </Select>
          </Box>
        )}

        {/* Actions */}
        <Flex gap="sm" marginTop="md">
          {onCancel && (
            <Button
              variant="outline"
              size="md"
              onClick={onCancel}
              flex="1"
            >
              Ακύρωση
            </Button>
          )}

          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            flex="2"
          >
            Αποθήκευση Στοιχείων
          </Button>
        </Flex>

        {/* Validation Status */}
        <BaseCard
          variant={Object.keys(errors).length === 0 ? "success" : "error"}
          padding="sm"
          marginTop="sm"
        >
          <Text weight="bold" color={Object.keys(errors).length === 0 ? "success" : "error"}>
            {Object.keys(errors).length === 0 ? '✅ Φόρμα έτοιμη για αποθήκευση' : '❌ Υπάρχουν σφάλματα'}
          </Text>
          {Object.keys(errors).length > 0 && (
            <Box marginTop="xs">
              {Object.entries(errors).map(([field, error]) => (
                <Text key={field} size="sm">• {error}</Text>
              ))}
            </Box>
          )}
        </BaseCard>

        {/* Debug Info */}
        <BaseCard
          variant="neutral"
          padding="sm"
          marginTop="sm"
        >
          <Text size="xs" weight="bold" color="neutral">MVP Property Details Form</Text>
          <Text size="xs" color="neutral">Type: {propertyTypeLabels[propertyType]}</Text>
          <Text size="xs" color="neutral">Universal: title, squareMeters, price</Text>
          {showFloorField && <Text size="xs" color="neutral">+ floor (apartment/office)</Text>}
          {showRoomsField && <Text size="xs" color="neutral">+ rooms (apartment only)</Text>}
        </BaseCard>
      </Stack>
    </BaseCard>
  );
};