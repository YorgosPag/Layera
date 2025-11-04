/**
 * ReviewCard.tsx - Enterprise Review Card Component
 *
 * BaseCard implementation για review operations
 * Enterprise approach: Single Source of Truth με BaseCard system
 */

import React from 'react';
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

/**
 * Enterprise ReviewCard implementation
 * Single Source of Truth approach με BaseCard enterprise system
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

  const handleClick = React.useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onReviewAction?.(reviewType, reviewData.stepId);
  }, [onReviewAction, reviewType, reviewData.stepId]);

  const handleInfoClick = React.useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onEdit?.(reviewData.stepId);
  }, [onEdit, reviewData.stepId]);

  // Generate title and description from review data
  const cardTitle = title || `${reviewData.stepName}: ${reviewData.selectedValue}`;
  const cardDescription = reviewData.isValid ? 'Εγκυρο' : 'Χρειάζεται επιβεβαίωση';

  return (
    <BaseCard
      title={cardTitle}
      description={cardDescription}
      icon={icon}
      variant={category || 'property'}
      clickable
      onClick={handleClick}
      onInfoClick={handleInfoClick}
      data-testid={`review-card-${reviewType}-${reviewData.stepId}`}
      className="layera-card-uniform"
    />
  );
};