/**
 * CategoryCard.tsx - Category Selection Card Component
 *
 * Unified Card implementation για category selection
 * Migrated από BaseCard wrapper στο νέο UnifiedCard system
 */

import React from 'react';
import { UnifiedCard, createCategoryCard } from '@layera/cards';
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
 * Powered by UnifiedCard configuration system
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

  // Create unified card configuration
  const cardConfig = createCategoryCard({
    categoryType,
    title,
    icon,
    onCategorySelect: handleCategorySelect,
    onInfoClick: handleInfoClick
  });

  // Enhance config with step context
  const enhancedConfig = {
    ...cardConfig,
    selected: context.selectedCategory === categoryType,
    className: context.selectedCategory === categoryType ? 'selected' : ''
  };

  // Create card context
  const cardContext = {
    currentStep: 'category',
    category: categoryType,
    viewMode: 'mobile' as const
  };

  return (
    <UnifiedCard
      config={enhancedConfig}
      context={cardContext}
    />
  );
};