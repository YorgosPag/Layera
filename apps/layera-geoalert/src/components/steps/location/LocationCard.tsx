/**
 * LocationCard.tsx - Location Selection Card Component
 *
 * Reusable card component για location selection (map, area, address)
 * Context-aware based on selected category and intent
 */

import React from 'react';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import type { StepCardProps, LocationType, CategoryType } from '../types';

export interface LocationCardProps extends StepCardProps {
  /** Location type που αντιπροσωπεύει αυτή η κάρτα */
  locationType: LocationType;

  /** Category context για proper styling */
  category: CategoryType;

  /** Card title */
  title: string;

  /** Card icon */
  icon: React.ReactNode;

  /** Click handler */
  onLocationSelect?: (location: LocationType) => void;

  /** Info click handler */
  onInfoClick?: () => void;
}

/**
 * Location Selection Card
 * Adapts styling based on category and intent context
 */
export const LocationCard: React.FC<LocationCardProps> = ({
  context,
  locationType,
  category,
  title,
  icon,
  onLocationSelect,
  onInfoClick,
  opacity = 'transparent'
}) => {
  const handleClick = () => {
    onLocationSelect?.(locationType);
  };

  const handleInfoClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  };

  // Determine if this card is selected
  const isSelected = context.selectedLocation === locationType;

  // Use category για variant styling
  const cardVariant = category || 'property';

  return (
    <BaseCard
      variant={cardVariant}
      title={title}
      icon={icon}
      onClick={handleClick}
      onInfoClick={handleInfoClick}
      data-testid={`location-card-${locationType}-${category}`}
      className={isSelected ? 'selected' : ''}
    />
  );
};