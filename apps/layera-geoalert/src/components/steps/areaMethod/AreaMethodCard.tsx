/**
 * AreaMethodCard.tsx - Reusable Area Method Option Card
 */

import React from 'react';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import { EditIcon, MapIcon, ImageIcon, CalculatorIcon } from '@layera/icons';
import type { AreaMethodType } from './types';

interface AreaMethodCardProps {
  method: AreaMethodType;
  title: string;
  description?: string;
  isRecommended?: boolean;
  onClick: () => void;
  'data-testid'?: string;
}

export const AreaMethodCard: React.FC<AreaMethodCardProps> = ({
  method,
  title,
  description,
  isRecommended = false,
  onClick,
  'data-testid': testId
}) => {
  const getIcon = () => {
    switch (method) {
      case 'manual':
        return <EditIcon size="sm" theme="neutral" />;
      case 'map':
        return <MapIcon size="sm" theme="neutral" />;
      case 'floorplan':
        return <ImageIcon size="sm" theme="neutral" />;
      case 'auto':
        return <CalculatorIcon size="sm" theme="neutral" />;
      default:
        return <EditIcon size="sm" theme="neutral" />;
    }
  };

  const getVariant = () => {
    if (isRecommended) {
      return 'success' as const;
    }
    switch (method) {
      case 'manual':
        return 'info' as const;
      case 'map':
        return 'primary' as const;
      case 'floorplan':
        return 'warning' as const;
      case 'auto':
        return 'secondary' as const;
      default:
        return 'neutral' as const;
    }
  };

  const enhancedDescription = isRecommended && description
    ? `${description} (Προτεινόμενο)`
    : description;

  return (
    <BaseCard
      variant={getVariant()}
      title={title}
      description={enhancedDescription}
      icon={getIcon()}
      onClick={onClick}
      data-testid={testId}
    />
  );
};