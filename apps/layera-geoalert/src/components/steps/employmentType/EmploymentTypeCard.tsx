/**
 * EmploymentTypeCard.tsx - Reusable Employment Type Option Card
 *
 * BaseCard implementation για employment type selection
 * Migrated πίσω στο BaseCard system ως Single Source of Truth
 */

import React from 'react';
import { BaseCard } from '@layera/cards';
import { ToolIcon, HospitalIcon, TruckIcon, StoreIcon } from '@layera/icons';
import type { EmploymentType } from './types';

interface EmploymentTypeCardProps {
  employmentType: EmploymentType;
  title: string;
  description?: string;
  onClick: () => void;
  'data-testid'?: string;
}

/**
 * Employment Type Selection Card
 * Powered by BaseCard enterprise system
 */
export const EmploymentTypeCard: React.FC<EmploymentTypeCardProps> = ({
  employmentType,
  title,
  description,
  onClick,
  'data-testid': testId
}) => {
  // Skip rendering for invalid employmentType
  if (!employmentType) {
    return null;
  }

  const getIcon = () => {
    switch (employmentType) {
      case 'full_time':
        return <ToolIcon size="sm" theme="neutral" />;
      case 'part_time':
        return <HospitalIcon size="sm" theme="neutral" />;
      case 'freelance':
        return <TruckIcon size="sm" theme="neutral" />;
      case 'seasonal':
        return <StoreIcon size="sm" theme="neutral" />;
      default:
        return <ToolIcon size="sm" theme="neutral" />;
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
      variant="job"
      clickable
      onClick={handleClick}
      data-testid={testId || `employment-type-${employmentType}-card`}
      className="layera-card-uniform"
    />
  );
};