import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { CheckIcon, RefreshIcon } from '@layera/icons';

export type Availability = 'now' | 'future';

export interface AvailabilityStepProps {
  onNext: (availability: Availability) => void;
}

/**
 * AvailabilityStep - Enterprise LEGO Component
 * Purpose: Availability selection (Now vs Future)
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const AvailabilityStep: React.FC<AvailabilityStepProps> = ({ onNext }) => {
  return (
    <Stack spacing="lg">
      <Heading as="h2" size="xl" color="primary">
        Πότε είστε διαθέσιμοι;
      </Heading>

      <Text size="lg" color="secondary">
        Επιλέξτε την περίοδο διαθεσιμότητάς σας
      </Text>

      <Stack spacing="md">
        <BaseCard
          clickable
          onClick={() => onNext('now')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <CheckIcon size="xl" theme="primary" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">Τώρα</Text>
              <Text size="base" color="secondary" className="card-text">
                Είμαι διαθέσιμος άμεσα για συνεργασία
              </Text>
            </Stack>
          </Flex>
        </BaseCard>

        <BaseCard
          clickable
          onClick={() => onNext('future')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <RefreshIcon size="xl" theme="secondary" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">Στο Μέλλον</Text>
              <Text size="base" color="secondary" className="card-text">
                Θα είμαι διαθέσιμος σε συγκεκριμένη μελλοντική ημερομηνία
              </Text>
            </Stack>
          </Flex>
        </BaseCard>
      </Stack>
    </Stack>
  );
};