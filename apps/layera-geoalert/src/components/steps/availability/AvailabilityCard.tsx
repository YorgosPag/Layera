/**
 * AvailabilityCard.tsx - Reusable Availability Option Card
 *
 * BaseCard implementation για availability selection
 * Migrated πίσω στο BaseCard system ως Single Source of Truth
 */

import React from 'react';
import { BaseCard } from '@layera/cards';
import { CheckIcon, CheckIcon as ClockIcon, CheckIcon as CalendarIcon } from '@layera/icons';
import type { AvailabilityType } from './types';

interface AvailabilityCardProps {
  availability: AvailabilityType;
  title: string;
  description?: string;
  onClick: () => React.ReactNode;
  'data-testid'?: string;
}

/**
 * Availability Selection Card
 * Powered by BaseCard enterprise system
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

  const handleClick = React.useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onClick();
  }, [onClick]);

  return (
    <BaseCard
      title={title}
      description={description}
      icon={getIcon()}
      variant="property"
      clickable
      onClick={handleClick}
      data-testid={testId || `availability-${availability}-card`}
      className="layera-card-uniform"
    />
  );
};