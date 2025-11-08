/**
 * PropertyTypeCard.tsx - Reusable Property Type Option Card
 *
 * BaseCard implementation για property type selection
 * Migrated πίσω στο BaseCard system ως Single Source of Truth
 */

import React from 'react';
import { BaseCard } from '@layera/cards';
import { VillaIcon, BuildingIcon, IndustrialIcon as FactoryIcon, IndustrialIcon as WarehouseIcon, StoreIcon, BuildingIcon as LandIcon } from '@layera/icons';
import type { PropertyType } from './types';

interface PropertyTypeCardProps {
  propertyType: PropertyType;
  title: string;
  description?: string;
  onClick: () => React.ReactNode;
  'data-testid'?: string;
}

/**
 * Property Type Selection Card
 * Powered by BaseCard enterprise system
 */
export const PropertyTypeCard: React.FC<PropertyTypeCardProps> = ({
  propertyType,
  title,
  description,
  onClick,
  'data-testid': testId
}) => {
  // Skip rendering for invalid propertyType
  if (!propertyType) {
    return null;
  }

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
      data-testid={testId || `property-type-${propertyType}-card`}
      className="layera-card-uniform"
    />
  );
};