/**
 * AvailabilityCard.tsx - Reusable Availability Option Card
 */

import React from 'react';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import { CheckIcon, CheckIcon as ClockIcon, CheckIcon as CalendarIcon } from '@layera/icons';
import type { AvailabilityType } from './types';

interface AvailabilityCardProps {
  availability: AvailabilityType;
  title: string;
  description?: string;
  onClick: () => void;
  'data-testid'?: string;
}

export const AvailabilityCard: React.FC<AvailabilityCardProps> = ({
  availability,
  title,
  description,
  onClick,
  'data-testid': testId
}) => {
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

  const getVariant = () => {
    // BaseCard υποστηρίζει μόνο 'property' και 'job' variants
    // Για availability, χρησιμοποιούμε 'job' που είναι το κατάλληλο για job flow
    return 'job' as const;
  };

  return (
    <BaseCard
      variant={getVariant()}
      title={title}
      description={description}
      icon={getIcon()}
      onClick={onClick}
      data-testid={testId}
    />
  );
};