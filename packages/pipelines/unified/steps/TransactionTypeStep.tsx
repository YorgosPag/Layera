import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { CommercialIcon, BuildingIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';

export type TransactionType = 'sale' | 'rent';

export interface TransactionTypeStepProps {
  onNext: (transactionType: TransactionType) => void;
  onBack: () => void;
}

/**
 * TransactionTypeStep - Enterprise LEGO Component
 *
 * 🚨 LEGACY/DEPRECATED - ΜΟΝΟ ΓΙΑ ΑΝΑΦΟΡΑ! 🚨
 *
 * ⚠️ ΑΠΑΓΟΡΕΥΕΤΑΙ η τροποποίηση αυτού του αρχείου! ⚠️
 * ⚠️ ΑΠΑΓΟΡΕΥΕΤΑΙ η χρήση κώδικα από εδώ στο modular system! ⚠️
 *
 * Αυτό το component είναι ΜΟΝΟ για το unified pipeline modal (λευκές κάρτες).
 * Χρησιμοποιείται ως ΑΝΑΦΟΡΑ για το migration και θα ΔΙΑΓΡΑΦΕΙ μόλις
 * ολοκληρωθεί το νέο modular step system με τις διαφανείς κάρτες.
 *
 * ⛔ ΜΗ ΧΡΗΣΙΜΟΠΟΙΕΙΤΕ ΚΩΔΙΚΑ ΑΠΟ ΕΔΩ ΣΤΟ MODULAR SYSTEM!
 * ✅ Για modular steps: apps/layera-geoalert/src/components/steps/
 *
 * Purpose: Transaction type selection (Sale vs Rent) - EXACT from original UnifiedPipeline.tsx
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const TransactionTypeStep: React.FC<TransactionTypeStepProps> = ({ onNext, onBack }) => {
  const { t } = useLayeraTranslation();

  return (
    <Stack spacing="md">
      <Heading as="h3" size="lg" color="primary">
        {t('pipelines.steps.transaction.title')}
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
              <Text size="xl" weight="bold" className="card-title">{t('pipelines.steps.transaction.sale.title')}</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {t('pipelines.steps.transaction.sale.description')}
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
              <Text size="xl" weight="bold" className="card-title">{t('pipelines.steps.transaction.rent.title')}</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {t('pipelines.steps.transaction.rent.description')}
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
          {t('pipelines.actions.back')}
        </Button>
      </FormActions>
    </Stack>
  );
};