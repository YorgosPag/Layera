/**
 * PropertyTypeCard.tsx - Reusable Property Type Option Card
 */

import React from 'react';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import { VillaIcon, BuildingIcon, FactoryIcon, WarehouseIcon, StoreIcon, LandIcon } from '@layera/icons';
import type { PropertyType } from './types';

interface PropertyTypeCardProps {
  propertyType: PropertyType;
  title: string;
  description?: string;
  onClick: () => void;
  'data-testid'?: string;
}

export const PropertyTypeCard: React.FC<PropertyTypeCardProps> = ({
  propertyType,
  title,
  description,
  onClick,
  'data-testid': testId
}) => {
  const getIcon = () => {
    switch (propertyType) {
      case 'apartment':
        return <BuildingIcon size="sm" theme="neutral" />;
      case 'office':
        return <BuildingIcon size="sm" theme="neutral" />;
      case 'factory':
        return <FactoryIcon size="sm" theme="neutral" />;
      case 'warehouse':
        return <WarehouseIcon size="sm" theme="neutral" />;
      case 'store':
        return <StoreIcon size="sm" theme="neutral" />;
      case 'land':
        return <LandIcon size="sm" theme="neutral" />;
      case 'house':
        return <VillaIcon size="sm" theme="neutral" />;
      case 'studio':
        return <BuildingIcon size="sm" theme="neutral" />;
      default:
        return <BuildingIcon size="sm" theme="neutral" />;
    }
  };

  const getVariant = () => {
    switch (propertyType) {
      case 'apartment':
      case 'house':
        return 'primary' as const;
      case 'office':
      case 'studio':
        return 'info' as const;
      case 'factory':
      case 'warehouse':
        return 'warning' as const;
      case 'store':
        return 'success' as const;
      case 'land':
        return 'secondary' as const;
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