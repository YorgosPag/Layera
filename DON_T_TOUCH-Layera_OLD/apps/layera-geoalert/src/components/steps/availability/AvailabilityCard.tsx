/**
 * AvailabilityCard.tsx - Reusable Availability Option Card
 *
 * Unified Card implementation για availability selection
 * Migrated από BaseCard wrapper στο νέο UnifiedCard system
 */

import React from 'react';
import { UnifiedCard, createAvailabilityCard } from '@layera/cards';
import { CheckIcon, CheckIcon as ClockIcon, CheckIcon as CalendarIcon } from '@layera/icons';
import type { AvailabilityType } from './types';

interface AvailabilityCardProps {
  availability: AvailabilityType;
  title: string;
  description?: string;
  onClick: () => void;
  'data-testid'?: string;
}

/**
 * Availability Selection Card
 * Powered by UnifiedCard configuration system
 */
export const AvailabilityCard: React.FC<AvailabilityCardProps> = ({
  availability,
  title,
  description,
  onClick,
  'data-testid': testId
}) => {
  // Skip rendering for invalid availability
  if (!availability) {
    return null;
  }

  const getIcon = () => {
    switch (availability) {
      case 'now':
        return <ClockIcon size="sm" theme="neutral" />;
      case 'future':
        return <CalendarIcon size="sm" theme="neutral" />;
      default:
        return <ClockIcon size="sm" theme="neutral" />;
    }
  };

  const handleAvailabilitySelect = React.useCallback((availabilityValue: string) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onClick();
  }, [onClick]);

  // Create unified card configuration
  const cardConfig = createAvailabilityCard({
    availability,
    title,
    description,
    icon: getIcon(),
    onAvailabilitySelect: handleAvailabilitySelect
  });

  // Override testId if provided
  const enhancedConfig = {
    ...cardConfig,
    ...(testId && { testId })
  };

  // Create card context
  const cardContext = {
    currentStep: 'availability',
    viewMode: 'mobile' as const
  };

  return (
    <UnifiedCard
      config={enhancedConfig}
      context={cardContext}
    />
  );
};