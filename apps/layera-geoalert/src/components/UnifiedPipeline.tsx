import React, { useState } from 'react';
import { Button } from '@layera/buttons';
import { Text, Heading } from '@layera/typography';
import { BaseCard } from '@layera/cards';
import { Stack, Flex } from '@layera/layout';
import { useLayeraTranslation } from '@layera/i18n';
import { MapIcon, CheckIcon, ArrowLeftIcon, HomeIcon, WorkIcon, CloseIcon, UploadIcon, SearchIcon } from '@layera/icons';
import { Z_INDEX } from '@layera/constants';
import '@layera/typography/styles';
import '@layera/buttons/styles';

interface UnifiedPipelineProps {
  isOpen: boolean;
  onClose: () => void;
}

type Category = 'property' | 'job' | null;
type Intent = 'offer' | 'search' | null;

export const UnifiedPipeline: React.FC<UnifiedPipelineProps> = ({
  isOpen,
  onClose
}) => {
  const { t } = useLayeraTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [selectedIntent, setSelectedIntent] = useState<Intent>(null);

  if (!isOpen) return null;

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleIntentSelect = (intent: Intent) => {
    setSelectedIntent(intent);
  };

  const handleBack = () => {
    if (selectedIntent) {
      setSelectedIntent(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  };

  const handleNext = () => {
    console.log('Selected:', {
      category: selectedCategory,
      intent: selectedIntent
    });
    // TODO: Implement next step logic
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: Z_INDEX.MODAL
    }}>
      <div style={{
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80%',
        overflow: 'auto',
        backgroundColor: 'var(--layera-bg-primary, #ffffff)',
        border: '1px solid var(--layera-border-primary, #e0e0e0)',
        borderRadius: '12px',
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        fontFamily: 'var(--layera-font-family-sans, Inter, system-ui, sans-serif)'
      }}>
        <BaseCard
          title={t('pipeline.newEntry.title')}
          actions={
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              icon={<CloseIcon size="sm" theme="neutral" />}
              iconPosition="only"
            />
          }
          variant="elevated"
          size="lg"
          padding="lg"
          className="unified-pipeline-card"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            borderRadius: '0'
          }}
        >
          <Stack spacing="lg">

            {/* Step 1: Category Selection */}
            {!selectedCategory && (
              <Stack spacing="md">
                <Heading as="h3" size="lg" color="primary">
                  {t('pipeline.category.selection.title')}
                </Heading>

                <Stack spacing="sm">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => handleCategorySelect('property')}
                    icon={<HomeIcon size="md" theme="neutral" />}
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                  >
                    <Flex direction="column" align="start" gap="xs">
                      <Text size="lg" weight="bold">{t('pipeline.category.property.title')}</Text>
                      <Text size="sm" color="secondary">{t('pipeline.category.property.description')}</Text>
                    </Flex>
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => handleCategorySelect('job')}
                    icon={<WorkIcon size="md" theme="neutral" />}
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                  >
                    <Flex direction="column" align="start" gap="xs">
                      <Text size="lg" weight="bold">{t('pipeline.category.job.title')}</Text>
                      <Text size="sm" color="secondary">{t('pipeline.category.job.description')}</Text>
                    </Flex>
                  </Button>
                </Stack>
              </Stack>
            )}

            {/* Step 2: Intent Selection */}
            {selectedCategory && !selectedIntent && (
              <Stack spacing="md">
                <Flex align="center" gap="sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    icon={<ArrowLeftIcon size="sm" theme="neutral" />}
                    iconPosition="only"
                  />
                  <Heading as="h3" size="lg" color="primary">
                    {selectedCategory === 'property'
                      ? t('pipeline.category.property.title')
                      : t('pipeline.category.job.title')
                    } - {t('pipeline.intent.selection.title')}
                  </Heading>
                </Flex>

                <Stack spacing="sm">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => handleIntentSelect('offer')}
                    icon={<UploadIcon size="md" theme="neutral" />}
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                  >
                    <Text size="lg" weight="bold">{t('pipeline.intent.offer.title')}</Text>
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => handleIntentSelect('search')}
                    icon={<SearchIcon size="md" theme="neutral" />}
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                  >
                    <Text size="lg" weight="bold">{t('pipeline.intent.search.title')}</Text>
                  </Button>
                </Stack>
              </Stack>
            )}

            {/* Step 3: Preview */}
            {selectedCategory && selectedIntent && (
              <Stack spacing="lg">
                <Flex align="center" gap="sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    icon={<ArrowLeftIcon size="sm" theme="neutral" />}
                    iconPosition="only"
                  />
                  <Heading as="h3" size="lg" color="primary">
                    {selectedCategory === 'property'
                      ? t('pipeline.category.property.title')
                      : t('pipeline.category.job.title')
                    } - {selectedIntent === 'offer'
                      ? t('pipeline.intent.offer.title')
                      : t('pipeline.intent.search.title')
                    }
                  </Heading>
                </Flex>

                <BaseCard
                  variant="outlined"
                  size="md"
                  padding="md"
                  className="success-preview-card"
                >
                  <Stack spacing="md">
                    <Flex align="center" gap="sm">
                      <CheckIcon size="sm" theme="success" />
                      <Heading as="h4" size="md" color="success">
                        {t('pipeline.preview.ready.title')}
                      </Heading>
                    </Flex>
                    <Text size="base" color="success">
                      {t('pipeline.preview.ready.description')}
                    </Text>
                  </Stack>
                </BaseCard>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleNext}
                  icon={<MapIcon size="sm" theme="neutral" />}
                  style={{ width: '100%' }}
                >
                  {t('pipeline.preview.continue')}
                </Button>
              </Stack>
            )}
          </Stack>
        </BaseCard>
      </div>
    </div>
  );
};