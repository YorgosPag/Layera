import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { IndustrialIcon, RestaurantIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';

export type Intent = 'offer' | 'search';

export interface IntentStepProps {
  category: 'property' | 'job';
  onNext: (intent: Intent) => void;
  onBack: () => void;
}

/**
 * IntentStep - Enterprise LEGO Component
 * Purpose: Intent selection (Offer vs Search) - EXACT from original UnifiedPipeline.tsx
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const IntentStep: React.FC<IntentStepProps> = ({ category, onNext, onBack }) => {
  const { t } = useLayeraTranslation();

  return (
    <Stack spacing="md">
      <Heading as="h3" size="lg" color="primary">
        {t('pipeline.intent.selection.title', {
          category: category === 'property' ? t('pipeline.category.property.title') : t('pipeline.category.job.title')
        })}
      </Heading>

      <Stack spacing="md">
        <BaseCard
          clickable
          onClick={() => onNext('offer')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <IndustrialIcon size="xl" theme="info" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">
                {t(`pipeline.intent.offer.${category}.title`)}
              </Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {t(`pipeline.intent.offer.${category}.description`)}
              </Text>
            </Stack>
          </Flex>
        </BaseCard>

        <BaseCard
          clickable
          onClick={() => onNext('search')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <RestaurantIcon size="xl" theme="warning" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">
                {t(`pipeline.intent.search.${category}.title`)}
              </Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {t(`pipeline.intent.search.${category}.description`)}
              </Text>
            </Stack>
          </Flex>
        </BaseCard>
      </Stack>

      <FormActions>
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="layera-pipeline-button-secondary"
        >
          {t('pipelines.actions.back')}
        </Button>
      </FormActions>
    </Stack>
  );
};