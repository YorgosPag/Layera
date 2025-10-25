/**
 * IntentCard.tsx - Intent Selection Card Component
 *
 * Unified Card implementation για intent selection (offer/search)
 * Migrated από BaseCard wrapper στο νέο UnifiedCard system
 */

import React from 'react';
import { UnifiedCard, createIntentCard } from '@layera/cards';
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
 * Powered by UnifiedCard configuration system
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

  // Create unified card configuration
  const cardConfig = createIntentCard({
    intentType,
    title,
    icon,
    category,
    onIntentSelect: handleIntentSelect,
    onInfoClick: handleInfoClick
  });

  // Enhance config with step context
  const enhancedConfig = {
    ...cardConfig,
    selected: context.selectedIntent === intentType,
    className: context.selectedIntent === intentType ? 'selected' : ''
  };

  // Create card context
  const cardContext = {
    currentStep: 'intent',
    category,
    intent: intentType,
    viewMode: 'mobile' as const
  };

  return (
    <UnifiedCard
      config={enhancedConfig}
      context={cardContext}
    />
  );
};