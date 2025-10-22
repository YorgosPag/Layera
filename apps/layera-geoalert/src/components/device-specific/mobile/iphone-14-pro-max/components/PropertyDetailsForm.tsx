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
      padding: '16px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <Stack spacing="md">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <Text size="lg" weight="bold" style={{ color: '#1e293b' }}>
            Στοιχεία {propertyTypeLabels[propertyType]}
          </Text>
          <Text size="sm" style={{ color: '#64748b', marginTop: '4px' }}>
            Συμπληρώστε τα βασικά στοιχεία του ακινήτου
          </Text>
        </div>

        {/* Universal Fields - Simplified Native HTML inputs για debugging */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>
            Τίτλος Ακινήτου *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="π.χ. Διαμέρισμα 85τμ στο κέντρο"
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '14px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white'
            }}
          />
          {errors.title && (
            <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
              {errors.title}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>
            Τετραγωνικά Μέτρα *
          </label>
          <input
            type="number"
            value={formData.squareMeters}
            onChange={(e) => handleInputChange('squareMeters', parseFloat(e.target.value) || 0)}
            placeholder="85"
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '14px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white'
            }}
          />
          {errors.squareMeters && (
            <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
              {errors.squareMeters}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>
            Τιμή (€) *
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
            placeholder="150000"
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '14px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white'
            }}
          />
          {errors.price && (
            <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
              {errors.price}
            </div>
          )}
        </div>

        {/* Conditional Fields - Simplified για debugging */}
        {showFloorField && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>
              Όροφος
            </label>
            <select
              value={formData.floor || ''}
              onChange={(e) => handleInputChange('floor', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white'
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
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>
              Αριθμός Δωματίων
            </label>
            <select
              value={formData.rooms || ''}
              onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white'
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
          gap: '8px',
          marginTop: '16px'
        }}>
          {onCancel && (
            <Button
              variant="outline"
              size="md"
              onClick={onCancel}
              style={{
                flex: 1,
                fontSize: '14px',
                padding: '8px 16px'
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
              fontSize: '14px',
              padding: '8px 16px',
              backgroundColor: '#3b82f6'
            }}
          >
            Αποθήκευση Στοιχείων
          </Button>
        </div>

        {/* Validation Status */}
        <div style={{
          marginTop: '8px',
          padding: '8px',
          backgroundColor: Object.keys(errors).length === 0 ? '#dcfce7' : '#fef2f2',
          border: Object.keys(errors).length === 0 ? '1px solid #16a34a' : '1px solid #dc2626',
          borderRadius: '6px',
          fontSize: '12px',
          color: Object.keys(errors).length === 0 ? '#15803d' : '#dc2626'
        }}>
          <strong>
            {Object.keys(errors).length === 0 ? '✅ Φόρμα έτοιμη για αποθήκευση' : '❌ Υπάρχουν σφάλματα'}
          </strong>
          {Object.keys(errors).length > 0 && (
            <div style={{ marginTop: '4px' }}>
              {Object.entries(errors).map(([field, error]) => (
                <div key={field}>• {error}</div>
              ))}
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div style={{
          marginTop: '8px',
          padding: '8px',
          backgroundColor: '#f1f5f9',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#475569'
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