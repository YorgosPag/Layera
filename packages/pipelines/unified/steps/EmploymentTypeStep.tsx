import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { ToolIcon, HospitalIcon, TruckIcon, StoreIcon } from '@layera/icons';

export type EmploymentType = 'full_time' | 'part_time' | 'freelance' | 'seasonal';

export interface EmploymentTypeStepProps {
  onNext: (employmentType: EmploymentType) => void;
  onBack: () => void;
}

/**
 * EmploymentTypeStep - Enterprise LEGO Component
 * Purpose: Employment type selection - EXACT from original UnifiedPipeline.tsx
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const EmploymentTypeStep: React.FC<EmploymentTypeStepProps> = ({ onNext, onBack }) => {
  return (
    <Stack spacing="md">
      <Heading as="h3" size="lg" color="primary">
        Εργασία - Είδος Απασχόλησης
      </Heading>

      <Stack spacing="md">
        <BaseCard
          clickable
          onClick={() => onNext('full_time')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <ToolIcon size="xl" theme="primary" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">Πλήρης Απασχόληση</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                40 ώρες την εβδομάδα με πλήρη παροχές
              </Text>
            </Stack>
          </Flex>
        </BaseCard>

        <BaseCard
          clickable
          onClick={() => onNext('part_time')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <HospitalIcon size="xl" theme="info" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">Μερική Απασχόληση</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                Λιγότερες από 40 ώρες την εβδομάδα
              </Text>
            </Stack>
          </Flex>
        </BaseCard>

        <BaseCard
          clickable
          onClick={() => onNext('freelance')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <TruckIcon size="xl" theme="success" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">Freelance</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                Ανεξάρτητος συνεργάτης με ευελιξία
              </Text>
            </Stack>
          </Flex>
        </BaseCard>

        <BaseCard
          clickable
          onClick={() => onNext('seasonal')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <StoreIcon size="xl" theme="warning" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">Εποχιακή</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                Προσωρινή εργασία για ορισμένη περίοδο
              </Text>
            </Stack>
          </Flex>
        </BaseCard>
      </Stack>

      <FormActions>
        <Button
          variant="outline"
          onClick={onBack}
          className="layera-unified-button"
        >
          Πίσω
        </Button>
      </FormActions>
    </Stack>
  );
};