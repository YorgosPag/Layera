import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { CommercialIcon, BuildingIcon } from '@layera/icons';

export type TransactionType = 'sale' | 'rent';

export interface TransactionTypeStepProps {
  onNext: (transactionType: TransactionType) => void;
  onBack: () => void;
}

/**
 * TransactionTypeStep - Enterprise LEGO Component
 * Purpose: Transaction type selection (Sale vs Rent) - EXACT from original UnifiedPipeline.tsx
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const TransactionTypeStep: React.FC<TransactionTypeStepProps> = ({ onNext, onBack }) => {
  return (
    <Stack spacing="md">
      <Heading as="h3" size="lg" color="primary">
        Ακίνητα - Είδος Συναλλαγής
      </Heading>

      <Stack spacing="md">
        <BaseCard
          clickable
          onClick={() => onNext('sale')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <CommercialIcon size="xl" theme="success" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">Πώληση</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                Μόνιμη μεταβίβαση της ιδιοκτησίας του ακινήτου
              </Text>
            </Stack>
          </Flex>
        </BaseCard>

        <BaseCard
          clickable
          onClick={() => onNext('rent')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <BuildingIcon size="xl" theme="neutral" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">Ενοικίαση</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                Παραχώρηση χρήσης του ακινήτου για συγκεκριμένο χρόνο
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