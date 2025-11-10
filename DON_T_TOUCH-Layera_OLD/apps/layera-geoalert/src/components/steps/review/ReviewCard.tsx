/**
 * ReviewCard.tsx - Enterprise Review Card Component
 *
 * Configuration-driven UnifiedCard implementation για review operations
 * Enterprise approach: Smart extension of UnifiedCard system
 */

import React from 'react';
import { UnifiedCard, createReviewCard } from '@layera/cards';
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

/**
 * Enterprise ReviewCard implementation
 * Configuration-driven approach με smart UnifiedCard extension
 */
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
  opacity = 'transparent'
}) => {
  // Skip rendering for null values
  if (!reviewType || !reviewData) {
    return null;
  }

  const handleReviewAction = React.useCallback((action: unknown, stepId: unknown) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onReviewAction?.(action as ReviewType, stepId as string);
  }, [onReviewAction]);

  const handleEdit = React.useCallback((stepId: unknown) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onEdit?.(stepId as string);
  }, [onEdit]);

  // Create unified card configuration
  const cardConfig = createReviewCard({
    reviewType,
    reviewData,
    category,
    title,
    icon,
    onReviewAction: handleReviewAction,
    onEdit: handleEdit,
    reviewMode
  });

  // Create card context
  const cardContext = {
    currentStep: 'review',
    category: category || 'property' as const,
    viewMode: 'mobile' as const
  };

  return (
    <UnifiedCard
      config={cardConfig}
      context={cardContext}
    />
  );
};