/**
 * ReviewCard.tsx - Reusable Review Card Component
 *
 * Smart card για review mode operations με conditional actions
 * Integrates με το enterprise step system
 */

import React from 'react';
import { Stack, SIZING_SCALE } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { Button } from '@layera/buttons';
import { BaseCard } from '@layera/cards';
import type { StepCardProps, ReviewType } from '../types';

export interface ReviewCardProps extends StepCardProps {
  /** Review type που αντιπροσωπεύει η κάρτα */
  reviewType: ReviewType;

  /** Review content data */
  reviewData: {
    stepId: string;
    stepName: string;
    selectedValue: string;
    isValid: boolean;
  };

  /** Category context for conditional rendering */
  category?: 'property' | 'job';

  /** Custom title override */
  title?: string;

  /** Custom icon */
  icon?: React.ReactNode;

  /** Review action handler */
  onReviewAction?: (action: ReviewType, stepId: string) => void;

  /** Edit handler */
  onEdit?: (stepId: string) => void;

  /** Current review mode */
  reviewMode?: ReviewType;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  context,
  reviewType,
  reviewData,
  category,
  title,
  icon,
  onReviewAction,
  onEdit,
  reviewMode = 'preview',
  variant = 'property',
  theme = 'light',
  opacity = 'opaque'
}) => {
  // 🎯 Smart title generation based on review type
  const getCardTitle = (): string => {
    if (title) return title;

    switch (reviewType) {
      case 'preview':
        return `👁️ Προεπισκόπηση ${reviewData.stepName}`;
      case 'edit':
        return `✏️ Επεξεργασία ${reviewData.stepName}`;
      case 'confirm':
        return `✅ Επιβεβαίωση ${reviewData.stepName}`;
      default:
        return `Review ${reviewData.stepName}`;
    }
  };

  // 🎯 Smart description based on review data
  const getCardDescription = (): string => {
    const { stepId, selectedValue, isValid } = reviewData;

    if (!isValid) {
      return `⚠️ Απαιτείται διόρθωση στο βήμα "${stepId}"`;
    }

    switch (reviewType) {
      case 'preview':
        return `Επιλεγμένο: ${selectedValue}`;
      case 'edit':
        return `Κάντε κλικ για επεξεργασία του "${selectedValue}"`;
      case 'confirm':
        return `Επιβεβαιωμένο: ${selectedValue}`;
      default:
        return selectedValue;
    }
  };

  // 🎮 Handle card actions
  const handleAction = () => {
    if (reviewType === 'edit') {
      onEdit?.(reviewData.stepId);
    } else {
      onReviewAction?.(reviewType, reviewData.stepId);
    }
  };

  // 🎨 Style based on review state
  const getCardStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      cursor: reviewType === 'edit' ? 'pointer' : 'default',
      transition: 'var(--layera-transition-fast)',
      opacity: opacity === 'transparent' ? 0.6 : opacity === 'semi-transparent' ? 0.8 : 1
    };

    // Style based on validity
    if (!reviewData.isValid) {
      return {
        ...baseStyle,
        borderColor: 'var(--color-danger-500)',
        backgroundColor: 'var(--color-danger-50)'
      };
    }

    // Style based on review mode
    switch (reviewMode) {
      case 'preview':
        return {
          ...baseStyle,
          borderColor: 'var(--color-info-300)',
          backgroundColor: 'var(--color-info-50)'
        };
      case 'edit':
        return {
          ...baseStyle,
          borderColor: 'var(--color-warning-300)',
          backgroundColor: 'var(--color-warning-50)'
        };
      case 'confirm':
        return {
          ...baseStyle,
          borderColor: 'var(--color-success-300)',
          backgroundColor: 'var(--color-success-50)'
        };
      default:
        return baseStyle;
    }
  };

  // 🎯 Get action button props
  const getActionButton = () => {
    if (reviewType === 'preview' && reviewMode === 'preview') {
      return null; // No action needed in preview mode
    }

    if (reviewType === 'edit' || reviewMode === 'edit') {
      return (
        <Button
          variant="outline"
          size="xs"
          onClick={handleAction}
        >
          ✏️ Επεξεργασία
        </Button>
      );
    }

    if (reviewType === 'confirm' || reviewMode === 'confirm') {
      return (
        <Button
          variant="success"
          size="xs"
          disabled
        >
          ✅ Επιβεβαιωμένο
        </Button>
      );
    }

    return null;
  };

  return (
    <BaseCard
      title={getCardTitle()}
      variant="outline"
      onClick={reviewType === 'edit' ? handleAction : undefined}
      style={getCardStyle()}
      data-testid={`review-card-${reviewData.stepId}-${reviewType}`}
    >
      <Stack spacing="md">
        {/* 🎯 Icon Display */}
        {icon && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: `${SPACING_SCALE.SM}px`
          }}>
            {icon}
          </div>
        )}

        {/* 📝 Description */}
        <Text
          size="sm"
          color={reviewData.isValid ? "neutral-600" : "danger-600"}
          align="center"
        >
          {getCardDescription()}
        </Text>

        {/* 🎯 Context-Aware Extra Info */}
        <div style={{
          padding: `${SPACING_SCALE.SM}px`,
          backgroundColor: 'var(--color-neutral-100)',
          borderRadius: `${BORDER_RADIUS_SCALE.XS}px`,
          width: '100%'
        }}>
          <Text size="xs" color="neutral-500" align="center">
            {context.selectedCategory} • {context.selectedIntent}
          </Text>
        </div>

        {/* 🎮 Action Button */}
        {getActionButton() && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: `${SPACING_SCALE.SM}px`
          }}>
            {getActionButton()}
          </div>
        )}

        {/* 📊 Validation Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: `${SPACING_SCALE.SM}px`
        }}>
          {reviewData.isValid ? (
            <div style={{
              width: `${SIZING_SCALE.MD}px`,
              height: `${SIZING_SCALE.MD}px`,
              borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
              backgroundColor: 'var(--color-success-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text size="xs" color="white">✓</Text>
            </div>
          ) : (
            <div style={{
              width: `${SIZING_SCALE.MD}px`,
              height: `${SIZING_SCALE.MD}px`,
              borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
              backgroundColor: 'var(--color-danger-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text size="xs" color="white">!</Text>
            </div>
          )}
        </div>
      </Stack>
    </BaseCard>
  );
};