/**
 * PricingCard.tsx - Reusable Pricing Card Component
 *
 * BaseCard implementation για pricing selection
 * Migrated πίσω στο BaseCard system ως Single Source of Truth
 */

import React from 'react';
import { BaseCard } from '@layera/cards';
import type { StepCardProps, PricingType } from '../types';

export interface PricingCardProps extends StepCardProps {
  /** Pricing type που αντιπροσωπεύει η κάρτα */
  pricingType: PricingType;

  /** Category context for conditional rendering */
  category: 'property' | 'job';

  /** Custom title override */
  title: string;

  /** Custom icon */
  icon: React.ReactNode;

  /** Selection handler */
  onPricingSelect?: (pricing: PricingType) => void;

  /** Selected state */
  isSelected?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  context,
  pricingType,
  category,
  title,
  icon,
  onPricingSelect,
  isSelected = false,
  opacity = 'transparent'
}) => {
  // Skip rendering for null values
  if (!pricingType || !category) {
    return null;
  }

  const handleClick = React.useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onPricingSelect?.(pricingType);
  }, [onPricingSelect, pricingType]);

  return (
    <BaseCard
      title={title}
      icon={icon}
      variant={category}
      clickable
      onClick={handleClick}
      data-testid={`pricing-card-${pricingType}-${category}`}
      className="layera-card-uniform"
    />
  );
};