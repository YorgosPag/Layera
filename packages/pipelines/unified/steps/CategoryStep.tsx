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
 * Purpose: Category selection (Property vs Job) - EXACT from original UnifiedPipeline.tsx
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const CategoryStep: React.FC<CategoryStepProps> = ({ onNext }) => {
  const { t } = useLayeraTranslation();

  return (
    <Stack spacing="md">
      <Heading as="h3" size="lg" color="primary">
        {t('pipeline.category.selection.title')}
      </Heading>

      <Stack spacing="md">
        <BaseCard
          clickable
          onClick={() => onNext('property')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
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
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
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
    </Stack>
  );
};