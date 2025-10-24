/**
 * LayoutToolCard.tsx - Reusable Layout Tool Card
 */

import React from 'react';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import { CheckIcon as MoveIcon, CheckIcon as ResizeIcon, RotateIcon, RulerIcon } from '@layera/icons';
import type { LayoutTool } from './types';

interface LayoutToolCardProps {
  tool: LayoutTool;
  title: string;
  description?: string;
  isActive?: boolean;
  onClick: () => void;
  'data-testid'?: string;
}

export const LayoutToolCard: React.FC<LayoutToolCardProps> = ({
  tool,
  title,
  description,
  isActive = false,
  onClick,
  'data-testid': testId
}) => {
  const getIcon = () => {
    switch (tool) {
      case 'positioning':
        return <MoveIcon size="sm" theme="neutral" />;
      case 'scale':
        return <ResizeIcon size="sm" theme="neutral" />;
      case 'rotation':
        return <RotateIcon size="sm" theme="neutral" />;
      case 'dimensions':
        return <RulerIcon size="sm" theme="neutral" />;
      default:
        return <MoveIcon size="sm" theme="neutral" />;
    }
  };

  const getVariant = () => {
    if (isActive) {
      return 'success' as const;
    }
    switch (tool) {
      case 'positioning':
        return 'info' as const;
      case 'scale':
        return 'warning' as const;
      case 'rotation':
        return 'secondary' as const;
      case 'dimensions':
        return 'neutral' as const;
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