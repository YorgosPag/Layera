/**
 * PropertyTypeCard.tsx - Reusable Property Type Option Card
 *
 * Unified Card implementation για property type selection
 * Migrated από BaseCard wrapper στο νέο UnifiedCard system
 */

import React from 'react';
import { UnifiedCard, createSelectionCard } from '@layera/cards';
import { VillaIcon, BuildingIcon, IndustrialIcon as FactoryIcon, IndustrialIcon as WarehouseIcon, StoreIcon, BuildingIcon as LandIcon } from '@layera/icons';
import type { PropertyType } from './types';

interface PropertyTypeCardProps {
  propertyType: PropertyType;
  title: string;
  description?: string;
  onClick: () => void;
  'data-testid'?: string;
}

/**
 * Property Type Selection Card
 * Powered by UnifiedCard configuration system
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

  const getIcon = (): void => {
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

  const handlePropertySelect = React.useCallback((property: unknown) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onClick();
  }, [onClick]);

  // Create unified card configuration
  const cardConfig = createSelectionCard({
    id: `property-type-${propertyType}`,
    title,
    description,
    icon: getIcon(),
    selectionValue: propertyType,
    category: 'property',
    theme: 'property',
    onClick: () => handlePropertySelect(propertyType),
    testId: testId || `property-type-${propertyType}-card`
  });

  // Create card context
  const cardContext = {
    currentStep: 'propertyType',
    category: 'property' as const,
    viewMode: 'mobile' as const
  };

  return (
    <UnifiedCard
      config={cardConfig}
      context={cardContext}
    />
  );
};