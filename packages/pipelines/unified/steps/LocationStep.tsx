import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { UploadIcon, MapIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';

export interface LocationDetails {
  type: 'upload' | 'drawing';
}

export interface LocationStepProps {
  category: 'property' | 'job';
  intent: 'offer' | 'search';
  availability: 'now' | 'future';
  onNext: () => void;
  onBack: () => void;
}

/**
 * LocationStep - Enterprise LEGO Component
 * Purpose: Location Definition - EXACT from original UnifiedPipeline.tsx
 * Property + Offer + Now = File Upload, everything else = Drawing
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const LocationStep: React.FC<LocationStepProps> = ({
  category,
  intent,
  availability,
  onNext,
  onBack
}) => {
  const { t } = useLayeraTranslation();

  return (
    <Stack spacing="md">
      <Heading as="h3" size="lg" color="primary">
        {t('pipelines.steps.layout.title')}
      </Heading>

      {/* Property + Offer + Now = File Upload, everything else = Drawing */}
      {category === 'property' && intent === 'offer' && availability === 'now' ? (
        <Stack spacing="md">
          <Text size="base" color="secondary">
            {t('location.uploadFloorplan')}
          </Text>
          <BaseCard
            clickable
            onClick={() => {
              // TODO: File upload logic
              onNext();
            }}
            variant="outlined"
            size="lg"
            padding="lg"
            hoverable
            className="layera-unified-card"
          >
            <Flex align="start" gap="lg">
              <UploadIcon size="xl" theme="primary" />
              <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
                <Text size="xl" weight="bold" className="card-title">{t('location.selectFile')}</Text>
                <Text size="base" color="secondary" className="card-text">
                  {t('location.clickToUpload')}
                </Text>
              </Stack>
            </Flex>
          </BaseCard>
        </Stack>
      ) : (
        <Stack spacing="md">
          <Text size="base" color="secondary">
            {intent === 'offer'
              ? t('drawingArea')
              : t('drawingSearchArea')
            }
          </Text>
          <BaseCard
            clickable
            onClick={() => {
              // TODO: Drawing tool logic
              onNext();
            }}
            variant="outlined"
            size="lg"
            padding="lg"
            hoverable
            className="layera-unified-card"
          >
            <Flex align="start" gap="lg">
              <MapIcon size="xl" theme="primary" />
              <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
                <Text size="xl" weight="bold" className="card-title">{t('openDrawingTool')}</Text>
                <Text size="base" color="secondary" className="card-text">
                  {t('clickToDrawOnMap')}
                </Text>
              </Stack>
            </Flex>
          </BaseCard>
        </Stack>
      )}

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