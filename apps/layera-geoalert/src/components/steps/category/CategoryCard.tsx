/**
 * CategoryCard.tsx - Category Selection Card Component
 *
 * Reusable card component για category selection
 * Extracted από monolithic CategoryStep για better modularity
 */

import React from 'react';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
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
 * Wraps BaseCard με category-specific logic
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
  const handleClick = () => {
    onCategorySelect?.(categoryType);
  };

  const handleInfoClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  };

  // Determine if this card is selected
  const isSelected = context.selectedCategory === categoryType;

  return (
    <BaseCard
      variant={categoryType}
      title={title}
      icon={icon}
      onClick={handleClick}
      onInfoClick={handleInfoClick}
      data-testid={`category-card-${categoryType}`}
      className={isSelected ? 'selected' : ''}
    />
  );
};