/**
 * DetailsCard.tsx - Details Collection Card Component
 *
 * BaseCard implementation για details collection
 * Migrated πίσω στο BaseCard system ως Single Source of Truth
 */

import React from 'react';
import { BaseCard } from '@layera/cards';
import type { StepCardProps, DetailsType, CategoryType } from '../types';

export interface DetailsCardProps extends StepCardProps {
  /** Details type που αντιπροσωπεύει αυτή η κάρτα */
  detailsType: DetailsType;

  /** Category context για proper styling */
  category: CategoryType;

  /** Card title */
  title: string;

  /** Card icon */
  icon: React.ReactNode;

  /** Click handler */
  onDetailsSelect?: (details: DetailsType) => void;

  /** Info click handler */
  onInfoClick?: () => void;
}

/**
 * Details Collection Card
 * Powered by BaseCard enterprise system
 */
export const DetailsCard: React.FC<DetailsCardProps> = ({
  context,
  detailsType,
  category,
  title,
  icon,
  onDetailsSelect,
  onInfoClick,
  opacity = 'transparent'
}) => {
  // Skip rendering for null values
  if (!detailsType || !category) {
    return null;
  }

  const handleDetailsSelect = React.useCallback((details: unknown) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onDetailsSelect?.(details as DetailsType);
  }, [onDetailsSelect]);

  const handleInfoClick = React.useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  }, [onInfoClick]);

  const handleClick = React.useCallback(() => {
    handleDetailsSelect(detailsType);
  }, [detailsType, handleDetailsSelect]);

  return (
    <BaseCard
      title={title}
      icon={icon}
      variant={category}
      clickable
      onClick={handleClick}
      onInfoClick={handleInfoClick}
      data-testid={`details-card-${detailsType}-${category}`}
      className="layera-card-uniform"
    />
  );
};