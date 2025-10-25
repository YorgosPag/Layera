/**
 * PricingCard.tsx - Reusable Pricing Card Component
 *
 * Unified Card implementation για pricing selection
 * Migrated από BaseCard wrapper στο νέο UnifiedCard system
 */

import React from 'react';
import { UnifiedCard, createPricingCard } from '@layera/cards';
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

  const handlePricingSelect = React.useCallback((pricing: unknown) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onPricingSelect?.(pricing as PricingType);
  }, [onPricingSelect]);

  // Create unified card configuration
  const cardConfig = createPricingCard({
    pricingType,
    title,
    icon,
    category,
    onPricingSelect: () => handlePricingSelect(pricingType),
    isSelected
  });

  // Enhance config with step context
  const enhancedConfig = {
    ...cardConfig,
    selected: context.selectedPricing === pricingType || isSelected,
    className: (context.selectedPricing === pricingType || isSelected) ? 'selected' : ''
  };

  // Create card context
  const cardContext = {
    currentStep: 'pricing',
    category,
    viewMode: 'mobile' as const
  };

  return (
    <UnifiedCard
      config={enhancedConfig}
      context={cardContext}
    />
  );
};