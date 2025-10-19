import React, { useState } from 'react';
import { Text, Heading } from '@layera/typography';
import { Stack } from '@layera/layout';
import { FormField, Input, FormActions } from '@layera/forms';
import { Button } from '@layera/buttons';

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
        Λεπτομέρειες Διαθεσιμότητας
      </Heading>

      <Text size="lg" color="secondary">
        Παρακαλώ ορίστε την ημερομηνία και διάρκεια διαθεσιμότητας
      </Text>

      <Stack spacing="md">
        <FormField label="Ημερομηνία Έναρξης" required>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            size="lg"
            variant="outline"
          />
        </FormField>

        <FormField label="Διάρκεια" required>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            placeholder="12"
            size="lg"
            variant="outline"
          />
        </FormField>

        <FormField label="Μονάδα" required>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'months' | 'years')}
            style={{ padding: '12px', fontSize: '16px', borderRadius: '4px' }}
          >
            <option value="months">Μήνες</option>
            <option value="years">Χρόνια</option>
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
          Συνέχεια
        </Button>
      </FormActions>
    </Stack>
  );
};