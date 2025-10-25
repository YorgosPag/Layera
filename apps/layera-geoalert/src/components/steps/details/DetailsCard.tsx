/**
 * DetailsCard.tsx - Details Collection Card Component
 *
 * Unified Card implementation για details collection
 * Migrated από BaseCard wrapper στο νέο UnifiedCard system
 */

import React from 'react';
import { UnifiedCard, createSelectionCard } from '@layera/cards';
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
 * Powered by UnifiedCard configuration system
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

  // Create unified card configuration
  const cardConfig = createSelectionCard({
    id: `details-${detailsType}`,
    title,
    icon,
    selectionValue: detailsType,
    category,
    theme: category,
    onClick: () => handleDetailsSelect(detailsType),
    onInfoClick: handleInfoClick,
    testId: `details-card-${detailsType}-${category}`
  });

  // Enhance config with step context
  const enhancedConfig = {
    ...cardConfig,
    selected: context.selectedDetails === detailsType,
    className: context.selectedDetails === detailsType ? 'selected' : ''
  };

  // Create card context
  const cardContext = {
    currentStep: 'details',
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