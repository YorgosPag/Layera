/**
 * LayoutToolCard.tsx - Reusable Layout Tool Card
 *
 * BaseCard implementation για layout tool selection
 * Migrated πίσω στο BaseCard system ως Single Source of Truth
 */

import React from 'react';
import { BaseCard } from '@layera/cards';
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

/**
 * Layout Tool Card
 * Powered by BaseCard enterprise system
 */
export const LayoutToolCard: React.FC<LayoutToolCardProps> = ({
  tool,
  title,
  description,
  isActive = false,
  onClick,
  'data-testid': testId
}) => {
  // Skip rendering for invalid tool
  if (!tool) {
    return null;
  }

  const getIcon = (): void => {
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
      data-testid={testId || `layout-tool-${tool}-card`}
      className="layera-card-uniform"
    />
  );
};