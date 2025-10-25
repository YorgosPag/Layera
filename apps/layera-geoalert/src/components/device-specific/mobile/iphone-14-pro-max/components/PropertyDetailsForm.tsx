/**
 * PropertyDetailsForm.tsx - MVP Property Details Form για iPhone 14 Pro Max
 *
 * Βασικά πεδία που χρειάζονται όλοι οι τύποι ακινήτων.
 * Progressive Enhancement - ξεκινάμε με το απαραίτητο minimum.
 */

import React, { useState } from 'react';
import { Stack } from '@layera/layout';
import { Button } from '@layera/buttons';
import { Text } from '@layera/typography';
import { SPACING_SCALE } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';

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

  const handleSubmit = () => {
    console.log('🔧 PropertyDetailsForm: Submit clicked', { propertyType, formData });

    const isValid = validateForm();
    console.log('🔧 PropertyDetailsForm: Validation result:', isValid);

    if (isValid) {
      console.log('✅ PropertyDetailsForm: Validation passed - calling onSubmit');
      onSubmit(formData);
    } else {
      console.log('❌ PropertyDetailsForm: Validation failed - showing errors:', errors);
    }
  };

  // Check if floor field should be shown
  const showFloorField = propertyType === 'apartment' || propertyType === 'office';

  // Check if rooms field should be shown
  const showRoomsField = propertyType === 'apartment';

  return (
    <div style={{
      padding: `${SPACING_SCALE.MD}px`,
      backgroundColor: 'var(--color-bg-canvas)',
      borderRadius: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
      border: '1px solid var(--color-border-default)',
      boxShadow: BOX_SHADOW_SCALE.cardDefault
    }}>
      <Stack spacing="md">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px` }}>
          <Text size="lg" weight="bold" style={{ color: 'var(--color-text-primary)' }}>
            Στοιχεία {propertyTypeLabels[propertyType]}
          </Text>
          <Text size="sm" style={{ color: 'var(--color-text-secondary)', marginTop: `${SPACING_SCALE.XS}px` }}>
            Συμπληρώστε τα βασικά στοιχεία του ακινήτου
          </Text>
        </div>

        {/* Universal Fields - Simplified Native HTML inputs για debugging */}
        <div style={{ marginBottom: `${SPACING_SCALE.MD}px` }}>
          <Text as="label" size="sm" weight="bold" style={{ display: 'block', marginBottom: `${SPACING_SCALE.XS}px` }}>
            Τίτλος Ακινήτου *
          </Text>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="π.χ. Διαμέρισμα 85τμ στο κέντρο"
            style={{
              width: '100%',
              padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
              border: '1px solid var(--color-border-input)',
              borderRadius: `${SPACING_SCALE.XS + 2}px`,
              backgroundColor: 'var(--color-bg-surface)'
            }}
          />
          {errors.title && (
            <Text as="div" size="xs" style={{ color: 'var(--color-semantic-error)', marginTop: `${SPACING_SCALE.XS}px` }}>
              {errors.title}
            </Text>
          )}
        </div>

        <div style={{ marginBottom: `${SPACING_SCALE.MD}px` }}>
          <Text as="label" size="sm" weight="bold" style={{ display: 'block', marginBottom: `${SPACING_SCALE.XS}px` }}>
            Τετραγωνικά Μέτρα *
          </Text>
          <input
            type="number"
            value={formData.squareMeters}
            onChange={(e) => handleInputChange('squareMeters', parseFloat(e.target.value) || 0)}
            placeholder="85"
            style={{
              width: '100%',
              padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
              border: '1px solid var(--color-border-input)',
              borderRadius: `${SPACING_SCALE.XS + 2}px`,
              backgroundColor: 'var(--color-bg-surface)'
            }}
          />
          {errors.squareMeters && (
            <Text as="div" size="xs" style={{ color: 'var(--color-semantic-error)', marginTop: `${SPACING_SCALE.XS}px` }}>
              {errors.squareMeters}
            </Text>
          )}
        </div>

        <div style={{ marginBottom: `${SPACING_SCALE.MD}px` }}>
          <Text as="label" size="sm" weight="bold" style={{ display: 'block', marginBottom: `${SPACING_SCALE.XS}px` }}>
            Τιμή (€) *
          </Text>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
            placeholder="150000"
            style={{
              width: '100%',
              padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
              border: '1px solid var(--color-border-input)',
              borderRadius: `${SPACING_SCALE.XS + 2}px`,
              backgroundColor: 'var(--color-bg-surface)'
            }}
          />
          {errors.price && (
            <Text as="div" size="xs" style={{ color: 'var(--color-semantic-error)', marginTop: `${SPACING_SCALE.XS}px` }}>
              {errors.price}
            </Text>
          )}
        </div>

        {/* Conditional Fields - Simplified για debugging */}
        {showFloorField && (
          <div style={{ marginBottom: `${SPACING_SCALE.MD}px` }}>
            <Text as="label" size="sm" weight="bold" style={{ display: 'block', marginBottom: `${SPACING_SCALE.XS}px` }}>
              Όροφος
            </Text>
            <select
              value={formData.floor || ''}
              onChange={(e) => handleInputChange('floor', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
                  border: '1px solid var(--color-border-input)',
                borderRadius: `${SPACING_SCALE.XS + 2}px`,
                backgroundColor: 'var(--color-bg-surface)'
              }}
            >
              <option value="">Επιλέξτε όροφο</option>
              <option value="2">2ος όροφος</option>
              <option value="1">1ος όροφος</option>
              <option value="0">Ισόγειο</option>
              <option value="-1">Υπόγειο</option>
            </select>
          </div>
        )}

        {showRoomsField && (
          <div style={{ marginBottom: `${SPACING_SCALE.MD}px` }}>
            <Text as="label" size="sm" weight="bold" style={{ display: 'block', marginBottom: `${SPACING_SCALE.XS}px` }}>
              Αριθμός Δωματίων
            </Text>
            <select
              value={formData.rooms || ''}
              onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
                  border: '1px solid var(--color-border-input)',
                borderRadius: `${SPACING_SCALE.XS + 2}px`,
                backgroundColor: 'var(--color-bg-surface)'
              }}
            >
              <option value="">Επιλέξτε αριθμό δωματίων</option>
              <option value="3">3 δωμάτια</option>
              <option value="2">2 δωμάτια</option>
              <option value="1">1 δωμάτιο (Studio)</option>
              <option value="4">4 δωμάτια</option>
              <option value="5">5+ δωμάτια</option>
            </select>
          </div>
        )}

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: `${SPACING_SCALE.SM}px`,
          marginTop: `${SPACING_SCALE.MD}px`
        }}>
          {onCancel && (
            <Button
              variant="outline"
              size="md"
              onClick={onCancel}
              style={{
                flex: 1,
                  padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.MD}px`
              }}
            >
              Ακύρωση
            </Button>
          )}

          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            style={{
              flex: 2,
              padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.MD}px`,
              backgroundColor: 'var(--color-primary-500)'
            }}
          >
            Αποθήκευση Στοιχείων
          </Button>
        </div>

        {/* Validation Status */}
        <div style={{
          marginTop: `${SPACING_SCALE.SM}px`,
          padding: `${SPACING_SCALE.SM}px`,
          backgroundColor: Object.keys(errors).length === 0 ? 'var(--color-semantic-success-bg)' : 'var(--color-semantic-error-bg)',
          border: Object.keys(errors).length === 0 ? '1px solid var(--color-semantic-success-border)' : '1px solid var(--color-semantic-error-border)',
          borderRadius: `${SPACING_SCALE.XS + 2}px`,
          color: Object.keys(errors).length === 0 ? 'var(--color-semantic-success)' : 'var(--color-semantic-error)'
        }}>
          <strong>
            {Object.keys(errors).length === 0 ? '✅ Φόρμα έτοιμη για αποθήκευση' : '❌ Υπάρχουν σφάλματα'}
          </strong>
          {Object.keys(errors).length > 0 && (
            <div style={{ marginTop: `${SPACING_SCALE.XS}px` }}>
              {Object.entries(errors).map(([field, error]) => (
                <div key={field}>• {error}</div>
              ))}
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div style={{
          marginTop: `${SPACING_SCALE.SM}px`,
          padding: `${SPACING_SCALE.SM}px`,
          backgroundColor: 'var(--color-neutral-100)',
          borderRadius: `${SPACING_SCALE.XS + 2}px`,
          color: 'var(--color-neutral-600)'
        }}>
          <Text size="xs" weight="bold">MVP Property Details Form</Text>
          <div>Type: {propertyTypeLabels[propertyType]}</div>
          <div>Universal: title, squareMeters, price</div>
          {showFloorField && <div>+ floor (apartment/office)</div>}
          {showRoomsField && <div>+ rooms (apartment only)</div>}
        </div>
      </Stack>
    </div>
  );
};