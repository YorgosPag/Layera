import React, { useState } from 'react';
import { Text, Heading } from '@layera/typography';
import { Stack } from '@layera/layout';
import { FormField, Input, FormActions } from '@layera/forms';
import { Button } from '@layera/buttons';
import { useLayeraTranslation } from '@layera/tolgee';

export interface AvailabilityDetails {
  date: string;
  duration: number;
  unit: 'months' | 'years';
}

export interface AvailabilityDetailsStepProps {
  onNext: (details: AvailabilityDetails) => void;
}

/**
 * AvailabilityDetailsStep - Enterprise LEGO Component
 * Purpose: Future availability details form
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const AvailabilityDetailsStep: React.FC<AvailabilityDetailsStepProps> = ({ onNext }) => {
  const { t } = useLayeraTranslation();
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState<number>(12);
  const [unit, setUnit] = useState<'months' | 'years'>('months');

  const handleNext = () => {
    if (date && duration > 0) {
      onNext({ date, duration, unit });
    }
  };

  const isValid = date && duration > 0;

  return (
    <Stack spacing="lg">
      <Heading as="h2" size="xl" color="primary">
        {t('pipelines.steps.availability.title')}
      </Heading>

      <Text size="lg" color="secondary">
        {t('pipelines.steps.availability.subtitle')}
      </Text>

      <Stack spacing="md">
        <FormField label={t('pipelines.steps.availability.fields.startDate')} required>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder={t('pipelines.steps.availability.placeholders.datePlaceholder')}
            size="lg"
            variant="outline"
          />
        </FormField>

        <FormField label={t('pipelines.steps.availability.fields.duration')} required>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            placeholder={t('pipelines.steps.availability.placeholders.duration')}
            size="lg"
            variant="outline"
          />
        </FormField>

        <FormField label={t('pipelines.steps.availability.fields.unit')} required>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'months' | 'years')}
            style={{ padding: '12px', fontSize: '16px', borderRadius: '4px' }}
          >
            <option value="months">{t('pipelines.steps.availability.units.months')}</option>
            <option value="years">{t('pipelines.steps.availability.units.years')}</option>
          </select>
        </FormField>
      </Stack>

      <FormActions>
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!isValid}
        >
          {t('pipelines.actions.continue')}
        </Button>
      </FormActions>
    </Stack>
  );
};