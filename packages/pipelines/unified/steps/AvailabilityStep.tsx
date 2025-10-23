import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { CheckIcon, RefreshIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';

export type Availability = 'now' | 'future';

export interface AvailabilityStepProps {
  onNext: (availability: Availability) => void;
}

/**
 * AvailabilityStep - Enterprise LEGO Component
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
 * Original Purpose: Availability selection (Now vs Future)
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const AvailabilityStep: React.FC<AvailabilityStepProps> = ({ onNext }) => {
  const { t } = useLayeraTranslation();

  return (
    <Stack spacing="lg">
      <Heading as="h2" size="xl" color="primary">
        {t('pipelines.steps.availability.question.title')}
      </Heading>

      <Text size="lg" color="secondary">
        {t('pipelines.steps.availability.question.subtitle')}
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
              <Text size="xl" weight="bold" className="card-title">{t('pipelines.steps.availability.options.now.title')}</Text>
              <Text size="base" color="secondary" className="card-text">
                {t('pipelines.steps.availability.options.now.description')}
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
              <Text size="xl" weight="bold" className="card-title">{t('pipelines.steps.availability.options.future.title')}</Text>
              <Text size="base" color="secondary" className="card-text">
                {t('pipelines.steps.availability.options.future.description')}
              </Text>
            </Stack>
          </Flex>
        </BaseCard>
      </Stack>
    </Stack>
  );
};