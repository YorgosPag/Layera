/**
 * ReviewStep.tsx - Enterprise Review Step Component
 *
 * Final review step που συγκεντρώνει όλες τις επιλογές του pipeline
 * Supports full-context review με edit capabilities
 */

import React, { useState, useMemo } from 'react';
import { Stack } from '@layera/layout';
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
  SIZING_SCALE,
  useFlex,
  useFlexPatterns,
  useSizingStyles
} from '@layera/layout';
import type { StepProps, ReviewType } from '../types';
import { getCardsForStep, type CardConfig } from '../../../pipeline/PipelineDiscovery';

export interface ReviewStepProps extends StepProps {
  /** Custom review action handler */
  onReviewAction?: (action: ReviewType) => void;

  /** Final submission handler */
  onSubmit?: (context: any) => void;

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
        label: 'Κατηγορία',
        value: context.selectedCategory === 'property' ? 'Ακίνητο' : 'Εργασία',
        stepId: 'category'
      },
      intent: {
        label: 'Σκοπός',
        value: context.selectedIntent === 'offer' ? 'Προσφορά' : 'Αναζήτηση',
        stepId: 'intent'
      },
      location: {
        label: 'Τοποθεσία',
        value: context.selectedLocation === 'map' ? 'Χάρτης' :
               context.selectedLocation === 'area' ? 'Περιοχή' : 'Διεύθυνση',
        stepId: 'location'
      },
      details: {
        label: 'Λεπτομέρειες',
        value: context.selectedDetails === 'form' ? 'Φόρμα' :
               context.selectedDetails === 'quick' ? 'Γρήγορα' : 'Προχωρημένα',
        stepId: 'details'
      },
      pricing: {
        label: 'Τιμολόγηση',
        value: context.selectedPricing === 'free' ? 'Δωρεάν' :
               context.selectedPricing === 'budget' ? 'Οικονομικό' :
               context.selectedPricing === 'premium' ? 'Premium' : 'Διαπραγματεύσιμο',
        stepId: 'pricing'
      }
    };
  }, [context]);

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
    console.log(`🔧 Editing step: ${stepId}`);
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
      <Stack spacing="lg" style={{ width: '100%' }}>
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
      <div style={{
        display: 'flex',
        gap: designSystem.spacing.md,
        marginBottom: designSystem.spacing.md
      }}>
        <Button
          variant={reviewMode === 'preview' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleReviewModeChange('preview')}
        >
          Προεπισκόπηση
        </Button>
        <Button
          variant={reviewMode === 'edit' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleReviewModeChange('edit')}
        >
          Επεξεργασία
        </Button>
        <Button
          variant={reviewMode === 'confirm' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleReviewModeChange('confirm')}
        >
          Επιβεβαίωση
        </Button>
      </div>

      {/* 📊 Review Summary */}
      <BaseCard title="📋 Σύνοψη Επιλογών" variant="outline">
        <Stack spacing="md">
          {Object.entries(reviewSummary).map(([key, item]) => (
            <div
              key={key}
              style={{
                ...itemRowFlex,  // Enterprise flex system
                padding: `${designSystem.spacing.sm} 0`,
                borderBottom: `1px solid ${designSystem.colors.border.subtle}`
              }}
            >
              <Text size="sm" weight="medium">{item.label}:</Text>
              <div style={actionsFlex}>  {/* Enterprise flex system */}
                <Text size="sm">{item.value}</Text>
                {reviewMode === 'edit' && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleEditStep(item.stepId)}
                  >
                    ✏️
                  </Button>
                )}
              </div>
            </div>
          ))}
        </Stack>
      </BaseCard>

      {/* 📋 Review Cards */}
      {cards.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: deviceProps?.isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: designSystem.spacing.md
          }}
        >
          {cards.map((card) => (
            <BaseCard
              key={card.id}
              title={card.title}
              variant="outline"
              style={{ opacity: reviewMode === 'confirm' ? 0.7 : 1 }}
            >
              <Stack spacing="sm" align="center">
                {card.icon && <div>{card.icon}</div>}
                <Text size="sm" color="neutral-600">
                  {card.description}
                </Text>
              </Stack>
            </BaseCard>
          ))}
        </div>
      )}

      {/* 🎮 Action Buttons */}
      <Stack direction="row" justify="space-between" style={{ marginTop: designSystem.spacing.lg }}>
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          Πίσω
        </Button>

        <div style={{
          display: 'flex',
          gap: designSystem.spacing.sm
        }}>
          {reviewMode !== 'confirm' ? (
            <Button
              variant="primary"
              onClick={() => handleReviewModeChange('confirm')}
              disabled={isSubmitting}
            >
              Επιβεβαίωση
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                minWidth: `${SIZING_SCALE.XXXXXL}px`,
                transition: designSystem.motion.transition.normal
              }}
            >
              {isSubmitting ? 'Υποβολή...' : 'Υποβολή 🚀'}
            </Button>
          )}
        </div>
      </Stack>

      {/* 📊 Step Progress Indicator */}
      <div style={{
        textAlign: 'center',
        marginTop: designSystem.spacing.md,
        color: designSystem.colors.text.tertiary
      }}>
        <Text size="sm" color="neutral-500">
          Βήμα 6 από 7 • Επιθεώρηση
        </Text>
      </div>
      </Stack>
    </LayeraThemeProvider>
  );
};