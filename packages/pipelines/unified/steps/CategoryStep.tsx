import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { VillaIcon, BriefcaseIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';

export type Category = 'property' | 'job';

export interface CategoryStepProps {
  onNext: (category: Category) => void;
}

/**
 * CategoryStep - Enterprise LEGO Component
 *
 * ⚠️ LEGACY/DEPRECATED: ΘΑ ΔΙΑΓΡΑΦΕΙ ΣΤΟ ΜΕΛΛΟΝ! ⚠️
 *
 * Αυτό το component είναι μέρος του ΠΑΛΙΟΥ UnifiedPipelineModal system.
 * Όταν ολοκληρωθεί 100% το ΝΕΟ Enterprise Step System
 * (apps/layera-geoalert/src/components/steps/), αυτό το αρχείο θα διαγραφεί
 * μαζί με όλο το packages/pipelines/unified/ directory.
 *
 * Χρησιμοποιείται προσωρινά ως αναφορά/πυρήνας για migration.
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
            borderRadius: '12px',
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
            borderRadius: '12px',
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