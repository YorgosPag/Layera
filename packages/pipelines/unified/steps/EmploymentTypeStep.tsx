import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { ToolIcon, HospitalIcon, TruckIcon, StoreIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';

export type EmploymentType = 'full_time' | 'part_time' | 'freelance' | 'seasonal';

export interface EmploymentTypeStepProps {
  onNext: (employmentType: EmploymentType) => void;
  onBack: () => void;
}

/**
 * EmploymentTypeStep - Enterprise LEGO Component
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
 * Original Purpose: Employment type selection - EXACT from original UnifiedPipeline.tsx
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const EmploymentTypeStep: React.FC<EmploymentTypeStepProps> = ({ onNext, onBack }) => {
  const { t } = useLayeraTranslation();

  return (
    <Stack spacing="md">
      <Heading as="h3" size="lg" color="primary">
        {t('pipelines.steps.employmentType.title')}
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
              <Text size="xl" weight="bold" className="card-title">{t('pipelines.steps.employmentType.fullTime.title')}</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {t('pipelines.steps.employmentType.fullTime.description')}
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
              <Text size="xl" weight="bold" className="card-title">{t('pipelines.steps.employmentType.partTime.title')}</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {t('pipelines.steps.employmentType.partTime.description')}
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
              <Text size="xl" weight="bold" className="card-title">{t('pipelines.steps.employmentType.freelance.title')}</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {t('pipelines.steps.employmentType.freelance.description')}
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
              <Text size="xl" weight="bold" className="card-title">{t('pipelines.steps.employmentType.seasonal.title')}</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {t('pipelines.steps.employmentType.seasonal.description')}
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