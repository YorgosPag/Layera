/**
 * ReviewStep.tsx - Enterprise Review Step Component
 *
 * Final review step που συγκεντρώνει όλες τις επιλογές του pipeline
 * Supports full-context review με edit capabilities
 */

import React, { useState, useMemo } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Stack, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { BaseCard } from '@layera/cards';
import {
  SPACING_SCALE,
  useLayeraDesignSystem,
  LayeraThemeProvider
} from '@layera/constants';
import {
  Box,
  useFlex,
  useFlexPatterns,
  useSizingStyles
} from '@layera/layout';
import type { StepProps, ReviewType } from '../types';
//χρησιμοποιούμε StepOrchestrator μόνο
import { getCardsForStep, type CardConfig } from '../../device-specific/mobile/iphone-14-pro-max/components/cardData';

export interface ReviewStepProps extends StepProps {
  /** Custom review action handler */
  onReviewAction?: (action: ReviewType) => void;

  /** Final submission handler */
  onSubmit?: (context: Record<string, unknown>) => void;

  /** Edit handler για specific step */
  onEditStep?: (stepId: string) => void;

  /** Variant για conditional rendering */
  variant?: 'property' | 'job';
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onReviewAction,
  onSubmit,
  onEditStep,
  isVisible = true,
  deviceProps = {}
}) => {
  const [reviewMode, setReviewMode] = useState<ReviewType>('preview');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🌐 @layera/tolgee Integration
  const { t } = useLayeraTranslation();

  // 🎨 Enterprise Design System Integration
  const designSystem = useLayeraDesignSystem();

  // 🚀 NEW: Enterprise Layout System Integration
  const flexPatterns = useFlexPatterns();
  const sizingStyles = useSizingStyles();
  const headerFlex = useFlex({
    direction: 'row',
    justify: 'space-between',
    align: 'center',
    gap: 'lg'
  });
  const itemRowFlex = useFlex({
    direction: 'row',
    justify: 'space-between',
    align: 'center'
  });
  const actionsFlex = useFlex({
    direction: 'row',
    align: 'center',
    gap: 'sm'
  });

  // 🚫 Early return αν δεν είναι visible ή δεν έχει όλα τα απαραίτητα context
  if (!isVisible || !context.selectedCategory || !context.selectedIntent ||
      !context.selectedLocation || !context.selectedDetails || !context.selectedPricing) {
    return null;
  }

  // 📊 Build review summary από context
  const reviewSummary = useMemo(() => {
    return {
      category: {
        label: t('review.category.label'),
        value: context.selectedCategory === 'property' ? t('review.category.property') : t('review.category.job'),
        stepId: 'category'
      },
      intent: {
        label: t('review.intent.label'),
        value: context.selectedIntent === 'offer' ? t('review.intent.offer') : t('review.intent.search'),
        stepId: 'intent'
      },
      location: {
        label: t('review.location.label'),
        value: context.selectedLocation === 'map' ? t('review.location.map') :
               context.selectedLocation === 'area' ? t('review.location.area') : t('review.location.address'),
        stepId: 'location'
      },
      details: {
        label: t('review.details.label'),
        value: context.selectedDetails === 'form' ? t('review.details.form') :
               context.selectedDetails === 'quick' ? t('review.details.quick') : t('review.details.advanced'),
        stepId: 'details'
      },
      pricing: {
        label: t('review.pricing.label'),
        value: context.selectedPricing === 'free' ? t('review.pricing.free') :
               context.selectedPricing === 'budget' ? t('review.pricing.budget') :
               context.selectedPricing === 'premium' ? t('review.pricing.premium') : t('review.pricing.negotiable'),
        stepId: 'pricing'
      }
    };
  }, [context, t]);

  // 🎯 Context-aware card selection
  const getReviewCards = (): readonly CardConfig[] => {
    // Enhanced logic για review cards based on complete pipeline
    const fullPipeline = `${context.selectedCategory}-${context.selectedIntent}-${context.selectedLocation}-${context.selectedDetails}-${context.selectedPricing}`;

    // Try specific pipeline first
    const specificCards = getCardsForStep(`${fullPipeline}-review`);
    if (specificCards.length > 0) {
      return specificCards;
    }

    // Fallback to category-based review
    if (context.selectedCategory === 'property') {
      return getCardsForStep('property-review');
    }
    if (context.selectedCategory === 'job') {
      return getCardsForStep('job-review');
    }

    // Final fallback
    return getCardsForStep('review');
  };

  // 🎮 Handle review mode changes
  const handleReviewModeChange = (mode: ReviewType) => {
    setReviewMode(mode);
    onReviewAction?.(mode);
  };

  // 🎮 Handle step editing
  const handleEditStep = (stepId: string) => {
    onEditStep?.(stepId);
  };

  // 🎮 Handle final submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Prepare submission data με complete context
      const submissionData = {
        pipeline: {
          category: context.selectedCategory,
          intent: context.selectedIntent,
          location: context.selectedLocation,
          details: context.selectedDetails,
          pricing: context.selectedPricing
        },
        metadata: {
          completedSteps: Array.from(context.completedSteps),
          timestamp: new Date().toISOString(),
          featureFlags: context.featureFlags
        }
      };

      await onSubmit?.(submissionData);

      // Mark step as completed
      onStepComplete?.('review', submissionData);

    } catch (error) {
      console.error('❌ Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 📋 Get cards για rendering
  const cards = getReviewCards();

  return (
    <LayeraThemeProvider>
      <Stack spacing="lg" width="full">
      {/* 📝 Step Header */}
      <Stack spacing="sm">
        <Heading level={2} size="lg">
          Επιθεώρηση & Επιβεβαίωση
        </Heading>
        <Text size="md" color="neutral-600">
          Ελέγξτε τις επιλογές σας πριν την υποβολή
        </Text>
      </Stack>

      {/* 🎮 Review Mode Selector */}
      <Flex gap="md" marginBottom="md">
        <Button
          variant={reviewMode === 'preview' ? 'primary' : 'outline'}
          size="sm"
          onClick={(): void => handleReviewModeChange('preview')}
        >
          Προεπισκόπηση
        </Button>
        <Button
          variant={reviewMode === 'edit' ? 'primary' : 'outline'}
          size="sm"
          onClick={(): void => handleReviewModeChange('edit')}
        >
          Επεξεργασία
        </Button>
        <Button
          variant={reviewMode === 'confirm' ? 'primary' : 'outline'}
          size="sm"
          onClick={(): void => handleReviewModeChange('confirm')}
        >
          Επιβεβαίωση
        </Button>
      </Flex>

      {/* 📊 Review Summary */}
      <BaseCard title={t('review.summary')} variant="outline" className="layera-card-uniform">
        <Stack spacing="md">
          {Object.entries(reviewSummary).map(([key, item]) => (
            <Flex
              key={key}
              justify="space-between"
              align="center"
              paddingY="sm"
              borderBottom="1px solid var(--la-color-border-subtle)"
            >
              <Text size="sm" weight="medium">{item.label}:</Text>
              <Flex align="center" gap="xs">  {/* Enterprise LEGO flex system */}
                <Text size="sm">{item.value}</Text>
                {reviewMode === 'edit' && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={(): void => handleEditStep(item.stepId)}
                  >
                    ✏️
                  </Button>
                )}
              </Flex>
            </Flex>
          ))}
        </Stack>
      </BaseCard>

      {/* 📋 Review Cards */}
      {cards.length > 0 && (
        <Box
          display="grid"
          gridTemplateColumns={deviceProps?.isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))'}
          gap="md"
        >
          {cards.map((card: unknown) => (
            <BaseCard
              key={card.id}
              title={card.title}
              variant="outline"
              className="layera-card-uniform"
              opacity={reviewMode === 'confirm' ? 0.7 : 1}
            >
              <Stack spacing="sm" align="center">
                {card.icon && <Box>{card.icon}</Box>}
                <Text size="sm" color="neutral-600">
                  {card.description}
                </Text>
              </Stack>
            </BaseCard>
          ))}
        </Box>
      )}

      {/* 🎮 Action Buttons */}
      <Stack direction="row" justify="space-between" marginTop="lg">
        <Button
          variant="outline"
          onClick={(): void => window.history.back()}
          disabled={isSubmitting}
        >
          Πίσω
        </Button>

        <Flex gap="sm">
          {reviewMode !== 'confirm' ? (
            <Button
              variant="primary"
              onClick={(): void => handleReviewModeChange('confirm')}
              disabled={isSubmitting}
            >
              Επιβεβαίωση
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={isSubmitting}
              minWidth={`${SPACING_SCALE.XXXXXL}px`}
            >
              {isSubmitting ? 'Υποβολή...' : 'Υποβολή 🚀'}
            </Button>
          )}
        </Flex>
      </Stack>

      {/* 📊 Step Progress Indicator */}
      <Box textAlign="center" marginTop="md">
        <Text size="sm" color="neutral-500">
          Βήμα 6 από 7 • Επιθεώρηση
        </Text>
      </Box>
      </Stack>
    </LayeraThemeProvider>
  );
};