/**
 * IntentCard.tsx - Intent Selection Card Component
 *
 * Reusable card component για intent selection (offer/search)
 * Context-aware based on selected category
 */

import React from 'react';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import type { StepCardProps, IntentType, CategoryType } from '../types';

export interface IntentCardProps extends StepCardProps {
  /** Intent type που αντιπροσωπεύει αυτή η κάρτα */
  intentType: IntentType;

  /** Category context για proper styling */
  category: CategoryType;

  /** Card title */
  title: string;

  /** Card icon */
  icon: React.ReactNode;

  /** Click handler */
  onIntentSelect?: (intent: IntentType) => void;

  /** Info click handler */
  onInfoClick?: () => void;
}

/**
 * Intent Selection Card
 * Adapts styling based on category context
 */
export const IntentCard: React.FC<IntentCardProps> = ({
  context,
  intentType,
  category,
  title,
  icon,
  onIntentSelect,
  onInfoClick,
  opacity = 'transparent'
}) => {
  const handleClick = () => {
    onIntentSelect?.(intentType);
  };

  const handleInfoClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  };

  // Determine if this card is selected
  const isSelected = context.selectedIntent === intentType;

  // Use category για variant styling
  const cardVariant = category || 'property';

  return (
    <BaseCard
      variant={cardVariant}
      title={title}
      icon={icon}
      onClick={handleClick}
      onInfoClick={handleInfoClick}
      data-testid={`intent-card-${intentType}-${category}`}
      className={isSelected ? 'selected' : ''}
    />
  );
};