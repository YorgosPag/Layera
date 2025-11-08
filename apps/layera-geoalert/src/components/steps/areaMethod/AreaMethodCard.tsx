/**
 * AreaMethodCard.tsx - Reusable Area Method Option Card
 *
 * BaseCard implementation για area method selection
 * Migrated πίσω στο BaseCard system ως Single Source of Truth
 */

import React from 'react';
import { BaseCard } from '@layera/cards';
import { EditIcon, MapIcon, CheckIcon as ImageIcon, CheckIcon as CalculatorIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';
import type { AreaMethodType } from './types';

interface AreaMethodCardProps {
  method: AreaMethodType;
  title: string;
  description?: string;
  isRecommended?: boolean;
  onClick: () => React.ReactNode;
  variant?: 'property' | 'job';
  'data-testid'?: string;
}

/**
 * Area Method Selection Card
 * Powered by BaseCard enterprise system
 */
export const AreaMethodCard: React.FC<AreaMethodCardProps> = ({
  method,
  title,
  description,
  isRecommended = false,
  onClick,
  variant = 'property',
  'data-testid': testId
}) => {
  const { t } = useLayeraTranslation();

  // Skip rendering for invalid method
  if (!method) {
    return null;
  }

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

  const enhancedDescription = isRecommended && description
    ? `${description} (${t('common.recommended', 'Προτεινόμενο')})`
    : description;

  const handleClick = React.useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onClick();
  }, [onClick]);

  return (
    <BaseCard
      title={title}
      description={enhancedDescription}
      icon={getIcon()}
      variant={variant}
      clickable
      onClick={handleClick}
      data-testid={testId || `area-method-${method}-card`}
      className="layera-card-uniform"
    />
  );
};