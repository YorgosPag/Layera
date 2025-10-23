/**
 * EmploymentTypeCard.tsx - Reusable Employment Type Option Card
 */

import React from 'react';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import { ToolIcon, HospitalIcon, TruckIcon, StoreIcon } from '@layera/icons';
import type { EmploymentType } from './types';

interface EmploymentTypeCardProps {
  employmentType: EmploymentType;
  title: string;
  description?: string;
  onClick: () => void;
  'data-testid'?: string;
}

export const EmploymentTypeCard: React.FC<EmploymentTypeCardProps> = ({
  employmentType,
  title,
  description,
  onClick,
  'data-testid': testId
}) => {
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

  const getVariant = () => {
    switch (employmentType) {
      case 'full_time':
        return 'primary' as const;
      case 'part_time':
        return 'info' as const;
      case 'freelance':
        return 'success' as const;
      case 'seasonal':
        return 'warning' as const;
      default:
        return 'neutral' as const;
    }
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