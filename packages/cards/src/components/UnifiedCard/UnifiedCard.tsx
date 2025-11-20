/**
 * UnifiedCard.tsx - Configuration-driven Card Component
 *
 * Single component που αντικαθιστά 13 διαφορετικά Card components
 * με intelligent configuration-based rendering και context awareness.
 */

import React from 'react';
import { Box } from '@layera/layout';
import { BaseCard } from '../BaseCard/BaseCard';
import type {
  UnifiedCardProps,
  UnifiedCardConfig,
  CardContext,
  ToolCardConfig
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
    className: config.className,
    'data-testid': testId,
    ...(config.description && { description: config.description }),
    ...(config.onClick && { onClick: handleClick }), // ΜΟΝΟ όταν υπάρχει onClick
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
      <Box className="unified-card__content">
        {config.content}
      </Box>
    );
  }

  // Selection cards με custom content ή selection indicators
  if (config.type === 'selection') {
    // Αν έχει custom content, το render-άρουμε
    if (config.content) {
      return (
        <Box className="unified-card__content">
          {config.content}
        </Box>
      );
    }
    // Αλλιώς, αν είναι selected, δείχνουμε το indicator
    if (config.selected) {
      return (
        <Box className="unified-card__selection-indicator">
          ✓
        </Box>
      );
    }
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
  _context?: CardContext
): React.ReactNode {
  if (config.type !== 'tool') return null;

  const toolConfig = config as ToolCardConfig;

  return (
    <Box className="unified-card__tool-status">
      {toolConfig.isSelected && (
        <Box className="unified-card__tool-selected">
          Active
        </Box>
      )}
    </Box>
  );
}

function renderActionContent(
  config: UnifiedCardConfig,
  _context?: CardContext
): React.ReactNode {
  if (!('priority' in config)) return null;

  return (
    <Box className="unified-card__action-indicator">
      {config.priority === 'primary' && (
        <Box className="unified-card__primary-action">
          Primary
        </Box>
      )}
    </Box>
  );
}

// ============= DISPLAY NAME =============
UnifiedCard.displayName = 'UnifiedCard';