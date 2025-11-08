/**
 * AvailabilityDetailsForm.tsx - Reusable Availability Details Form
 *
 * 🏗️ ENTERPRISE LEGO INTEGRATION:
 * Χρησιμοποιεί @layera/forms DatePicker για single source of truth
 */

import React from 'react';
import { DatePicker, NumericInput, Select, FormField } from '@layera/forms';
import { Stack } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import { FORM_CONFIG } from '../../../constants';
import type { AvailabilityDetails } from './types';

interface AvailabilityDetailsFormProps {
  details: AvailabilityDetails;
  onChange: (field: keyof AvailabilityDetails, value: unknown) => void;
}

export const AvailabilityDetailsForm: React.FC<AvailabilityDetailsFormProps> = ({
  details,
  onChange
}) => {
  const { t } = useLayeraTranslation();

  return (
    <Stack spacing="lg" className="availability-details-form">
      {/* Ημερομηνία Έναρξης - LEGO FormField + DatePicker */}
      <FormField
        label={t('availabilityDetails.startDate', 'Ημερομηνία Έναρξης')}
        required
      >
        <DatePicker
          value={details.date || ''}
          onChange={(e: React.FormEvent<HTMLFormElement>) => onChange('date', e.target.value)}
          placeholder={t('availabilityDetails.selectStartDate', 'Επιλέξτε ημερομηνία έναρξης')}
          minDate={new Date().toISOString().split('T')[0]}
          size="md"
          variant="outline"
          fullWidth
        />
      </FormField>

      {/* Διάρκεια - LEGO FormField + NumericInput */}
      <FormField
        label={t('availabilityDetails.duration', 'Διάρκεια')}
        required
      >
        <NumericInput
          value={details.duration || 0}
          onChange={(e: React.FormEvent<HTMLFormElement>) => onChange('duration', e.target.value ? Number(e.target.value) : 0)}
          placeholder={t('availabilityDetails.durationPlaceholder', 'π.χ. 12')}
          min={1}
          max={FORM_CONFIG.validation.maxValues.duration}
          size="md"
          variant="outline"
          fullWidth
        />
      </FormField>

      {/* Μονάδα - LEGO FormField + Select */}
      <FormField
        label={t('availabilityDetails.unit', 'Μονάδα')}
        required
      >
        <Select
          value={details.unit || 'months'}
          onChange={(e: React.FormEvent<HTMLFormElement>) => onChange('unit', e.target.value as 'months' | 'years')}
          options={[
            { value: 'months', label: t('availabilityDetails.months', 'Μήνες') },
            { value: 'years', label: t('availabilityDetails.years', 'Χρόνια') }
          ]}
          size="md"
          variant="outline"
          fullWidth
        />
      </FormField>
    </Stack>
  );
};