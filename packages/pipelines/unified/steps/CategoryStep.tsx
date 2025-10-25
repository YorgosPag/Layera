import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { VillaIcon, BriefcaseIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';
import { BORDER_RADIUS_SCALE } from '@layera/constants';

export type Category = 'property' | 'job';

export interface CategoryStepProps {
  onNext: (category: Category) => void;
}

/**
 * CategoryStep - Enterprise LEGO Component
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
 * 🔄 STATUS: LEGACY - Κρατείται μόνο για backwards compatibility
 * 🗑️ ΔΙΑΓΡΑΦΗ: Μόλις ολοκληρωθούν όλα τα modular steps
 *
 * ⛔ ΜΗ ΧΡΗΣΙΜΟΠΟΙΕΙΤΕ ΚΩΔΙΚΑ ΑΠΟ ΕΔΩ ΣΤΟ MODULAR SYSTEM!
 * ✅ Για modular steps: apps/layera-geoalert/src/components/steps/
 *
 * Purpose: Category selection (Property vs Job) - EXACT from original UnifiedPipeline.tsx
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const CategoryStep: React.FC<CategoryStepProps> = ({ onNext }) => {
  const { t } = useLayeraTranslation();

  return (
    <Stack spacing="md">
        <BaseCard
          clickable
          onClick={() => onNext('property')}
          variant="elevated"
          size="lg"
          padding="lg"
          hoverable
          style={{
            backgroundColor: 'var(--layera-bg-primary)',
            border: '1px solid var(--layera-border-primary)',
            borderRadius: `${BORDER_RADIUS_SCALE.CARD}px`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Flex align="start" gap="lg">
            <VillaIcon size="xl" theme="primary" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">{t('pipeline.category.property.title')}</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {t('pipeline.category.property.description')}
              </Text>
            </Stack>
          </Flex>
        </BaseCard>

        <BaseCard
          clickable
          onClick={() => onNext('job')}
          variant="elevated"
          size="lg"
          padding="lg"
          hoverable
          style={{
            backgroundColor: 'var(--layera-bg-primary)',
            border: '1px solid var(--layera-border-primary)',
            borderRadius: `${BORDER_RADIUS_SCALE.CARD}px`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Flex align="start" gap="lg">
            <BriefcaseIcon size="xl" theme="success" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">{t('pipeline.category.job.title')}</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {t('pipeline.category.job.description')}
              </Text>
            </Stack>
          </Flex>
        </BaseCard>
    </Stack>
  );
};