/**
 * IntentCard.tsx - Intent Selection Card Component
 *
 * BaseCard implementation για intent selection (offer/search)
 * Migrated πίσω στο BaseCard system ως Single Source of Truth
 */

import React from 'react';
import { BaseCard } from '@layera/cards';
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
 * Powered by BaseCard enterprise system
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
  // Skip rendering for null intentType
  if (!intentType || !category) {
    return null;
  }

  const handleIntentSelect = React.useCallback((intent: 'offer' | 'search') => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onIntentSelect?.(intent);
  }, [onIntentSelect]);

  const handleInfoClick = React.useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  }, [onInfoClick]);

  const handleClick = React.useCallback(() => {
    handleIntentSelect(intentType);
  }, [intentType, handleIntentSelect]);

  return (
    <BaseCard
      title={title}
      icon={icon}
      variant={category}
      clickable
      onClick={handleClick}
      onInfoClick={handleInfoClick}
      data-testid={`intent-card-${intentType}-${category}`}
      className="layera-card-uniform"
    />
  );
};