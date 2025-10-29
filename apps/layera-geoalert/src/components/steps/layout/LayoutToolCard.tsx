/**
 * LayoutToolCard.tsx - Reusable Layout Tool Card
 *
 * Unified Card implementation για layout tool selection
 * Migrated από BaseCard wrapper στο νέο UnifiedCard system
 */

import React from 'react';
import { UnifiedCard, createLayoutToolCard } from '@layera/cards';
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
 * Powered by UnifiedCard configuration system
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

  const handleToolSelect = React.useCallback((toolValue: string) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onClick();
  }, [onClick]);

  // Create unified card configuration
  const cardConfig = createLayoutToolCard({
    toolType: tool,
    title,
    description,
    icon: getIcon(),
    isSelected: isActive,
    onToolSelect: handleToolSelect
  });

  // Override testId if provided
  const enhancedConfig = {
    ...cardConfig,
    ...(testId && { testId })
  };

  // Create card context
  const cardContext = {
    currentStep: 'layout',
    viewMode: 'mobile' as const
  };

  return (
    <UnifiedCard
      config={enhancedConfig}
      context={cardContext}
    />
  );
};