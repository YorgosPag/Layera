/**
 * CategoryCard.tsx - Category Selection Card Component
 *
 * BaseCard implementation για category selection
 * Migrated πίσω στο BaseCard system ως Single Source of Truth
 */

import React from 'react';
import { BaseCard } from '@layera/cards';
import type { StepCardProps, CategoryType } from '../types';

export interface CategoryCardProps extends StepCardProps {
  /** Category type που αντιπροσωπεύει αυτή η κάρτα */
  categoryType: CategoryType;

  /** Card title */
  title: string;

  /** Card icon */
  icon: React.ReactNode;

  /** Click handler */
  onCategorySelect?: (category: CategoryType) => void;

  /** Info click handler */
  onInfoClick?: () => void;
}

/**
 * Category Selection Card
 * Powered by BaseCard enterprise system
 */
export const CategoryCard: React.FC<CategoryCardProps> = ({
  context,
  categoryType,
  title,
  icon,
  onCategorySelect,
  onInfoClick,
  variant,
  opacity = 'transparent'
}) => {
  // Skip rendering for null categoryType
  if (!categoryType) {
    return null;
  }

  const handleCategorySelect = React.useCallback((category: 'property' | 'job') => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onCategorySelect?.(category);
  }, [onCategorySelect]);

  const handleInfoClick = React.useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  }, [onInfoClick]);

  const handleClick = React.useCallback(() => {
    handleCategorySelect(categoryType);
  }, [categoryType, handleCategorySelect]);

  return (
    <BaseCard
      title={title}
      icon={icon}
      variant={categoryType}
      clickable
      onClick={handleClick}
      onInfoClick={handleInfoClick}
      data-testid={`category-card-${categoryType}`}
      className="layera-card-uniform"
    />
  );
};