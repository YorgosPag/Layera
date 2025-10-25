/**
 * UnifiedCard.tsx - Configuration-driven Card Component
 *
 * Single component που αντικαθιστά 13 διαφορετικά Card components
 * με intelligent configuration-based rendering και context awareness.
 */

import React from 'react';
import { BaseCard } from '../BaseCard/BaseCard';
import type {
  UnifiedCardProps,
  UnifiedCardConfig,
  CardContext
} from '../../types/unified-card.types';
import {
  resolveThemeVariant,
  resolveOpacityMode,
  shouldShowInfoButton,
  resolveTestId
} from '../../utils/cardVariantResolver';

/**
 * UnifiedCard - The single card component για όλες τις χρήσεις
 *
 * Features:
 * - Configuration-driven rendering
 * - Context-aware styling
 * - Type-safe props με TypeScript
 * - Backward compatibility με existing patterns
 * - Performance optimized με React.memo
 */
export const UnifiedCard: React.FC<UnifiedCardProps> = React.memo(({
  config,
  context
}) => {
  // ============= VARIANT RESOLUTION =============
  const variant = resolveThemeVariant(config, context);
  const opacityMode = resolveOpacityMode(config, context);
  const showInfoButton = shouldShowInfoButton(config, context);
  const testId = resolveTestId(config, context);

  // ============= EVENT HANDLERS =============
  const handleClick = React.useCallback(() => {
    if (config.disabled) return;
    config.onClick?.();
  }, [config.disabled, config.onClick]);

  const handleInfoClick = React.useCallback(() => {
    if (config.disabled) return;
    config.onInfoClick?.();
  }, [config.disabled, config.onInfoClick]);

  // ============= CONTENT RENDERING =============
  const cardContent = renderCardContent(config, context);

  // ============= RENDER =============
  // Prepare BaseCard props with proper typing
  const baseCardProps = {
    variant,
    title: config.title,
    icon: config.icon,
    opacityMode,
    onClick: handleClick,
    className: config.className,
    'data-testid': testId,
    ...(config.description && { description: config.description }),
    ...(showInfoButton && handleInfoClick && { onInfoClick: handleInfoClick }),
    ...(config.content && { children: cardContent })
  };

  return <BaseCard {...baseCardProps} />;
});

// ============= CONTENT RENDERING =============

function renderCardContent(
  config: UnifiedCardConfig,
  context?: CardContext
): React.ReactNode {
  // Data cards με custom content
  if (config.type === 'data' && config.content) {
    return (
      <div className="unified-card__content">
        {config.content}
      </div>
    );
  }

  // Selection cards με selection indicators
  if (config.type === 'selection' && config.selected) {
    return (
      <div className="unified-card__selection-indicator">
        ✓
      </div>
    );
  }

  // Tool cards με tool-specific content
  if (config.type === 'tool') {
    return renderToolContent(config, context);
  }

  // Action cards με action-specific content
  if (config.type === 'action') {
    return renderActionContent(config, context);
  }

  return null;
}

function renderToolContent(
  config: UnifiedCardConfig,
  context?: CardContext
): React.ReactNode {
  if (!('isSelected' in config)) return null;

  return (
    <div className="unified-card__tool-status">
      {config.isSelected && (
        <div className="unified-card__tool-selected">
          Active
        </div>
      )}
    </div>
  );
}

function renderActionContent(
  config: UnifiedCardConfig,
  context?: CardContext
): React.ReactNode {
  if (!('priority' in config)) return null;

  return (
    <div className="unified-card__action-indicator">
      {config.priority === 'primary' && (
        <div className="unified-card__primary-action">
          Primary
        </div>
      )}
    </div>
  );
}

// ============= DISPLAY NAME =============
UnifiedCard.displayName = 'UnifiedCard';