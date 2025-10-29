/**
 * AreaMethodCard.tsx - Reusable Area Method Option Card
 *
 * Unified Card implementation για area method selection
 * Migrated από BaseCard wrapper στο νέο UnifiedCard system
 */

import React from 'react';
import { UnifiedCard, createSelectionCard } from '@layera/cards';
import { EditIcon, MapIcon, CheckIcon as ImageIcon, CheckIcon as CalculatorIcon } from '@layera/icons';
import type { AreaMethodType } from './types';

interface AreaMethodCardProps {
  method: AreaMethodType;
  title: string;
  description?: string;
  isRecommended?: boolean;
  onClick: () => void;
  'data-testid'?: string;
}

/**
 * Area Method Selection Card
 * Powered by UnifiedCard configuration system
 */
export const AreaMethodCard: React.FC<AreaMethodCardProps> = ({
  method,
  title,
  description,
  isRecommended = false,
  onClick,
  'data-testid': testId
}) => {
  // Skip rendering for invalid method
  if (!method) {
    return null;
  }

  const getIcon = (): void => {
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

  const enhancedDescription = isRecommended && description
    ? `${description} (Προτεινόμενο)`
    : description;

  const handleMethodSelect = React.useCallback((areaMethod: unknown) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onClick();
  }, [onClick]);

  // Create unified card configuration
  const cardConfig = createSelectionCard({
    id: `area-method-${method}`,
    title,
    description: enhancedDescription,
    icon: getIcon(),
    selectionValue: method,
    category: 'property',
    theme: 'property',
    onClick: () => handleMethodSelect(method),
    testId: testId || `area-method-${method}-card`
  });

  // Create card context
  const cardContext = {
    currentStep: 'areaMethod',
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