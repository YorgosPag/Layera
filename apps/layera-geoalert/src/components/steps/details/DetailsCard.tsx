/**
 * DetailsCard.tsx - Details Collection Card Component
 *
 * Reusable card component για details collection (form, quick, advanced)
 * Context-aware based on complete step context
 */

import React from 'react';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
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
 * Adapts styling based on complete context (category, intent, location)
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
  const handleClick = () => {
    onDetailsSelect?.(detailsType);
  };

  const handleInfoClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  };

  // Determine if this card is selected
  const isSelected = context.selectedDetails === detailsType;

  // Use category για variant styling
  const cardVariant = category || 'property';

  return (
    <BaseCard
      variant={cardVariant}
      title={title}
      icon={icon}
      onClick={handleClick}
      onInfoClick={handleInfoClick}
      data-testid={`details-card-${detailsType}-${category}`}
      className={isSelected ? 'selected' : ''}
    />
  );
};