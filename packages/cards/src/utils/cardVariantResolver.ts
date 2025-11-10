/**
 * Card Variant Resolver - Intelligent variant selection για UnifiedCard
 *
 * Smart logic που επιλέγει το σωστό variant βάσει configuration και context
 */

import type {
  UnifiedCardConfig,
  CardContext,
  VariantResolver,
  ThemeResolver
} from '../types/unified-card.types';
import type { CardVariant } from '../types/card.types';

/**
 * Resolves the appropriate card variant based on config and context
 */
export const resolveCardVariant: VariantResolver = (config, context) => {
  // 1. Explicit variant override
  if (config.variant) {
    return config.variant;
  }

  // 2. Type-based variant selection
  switch (config.type) {
    case 'selection':
      return resolveSelectionVariant(config, context);

    case 'tool':
      return resolveToolVariant(config, context);

    case 'data':
      return resolveDataVariant(config, context);

    case 'action':
      return resolveActionVariant(config, context);

    default:
      return 'elevated';
  }
};

/**
 * Theme-aware variant resolution
 */
export const resolveThemeVariant: ThemeResolver = (config, context) => {
  const baseVariant = resolveCardVariant(config, context);

  // Apply theme-specific modifications
  if (config.theme === 'property' || context?.category === 'property') {
    return 'property';
  }

  if (config.theme === 'job' || context?.category === 'job') {
    return 'job';
  }

  return baseVariant;
};

// ============= TYPE-SPECIFIC RESOLVERS =============

function resolveSelectionVariant(
  config: UnifiedCardConfig,
  context?: CardContext
): CardVariant {
  // Selected state
  if (config.selected) {
    return config.theme === 'property' || context?.category === 'property'
      ? 'property'
      : 'job';
  }

  // Category-aware default
  if (context?.category === 'property') return 'property';
  if (context?.category === 'job') return 'job';

  // Default
  return 'outlined';
}

function resolveToolVariant(
  config: UnifiedCardConfig,
  context?: CardContext
): CardVariant {
  // Selected/active tool
  if (config.selected || 'isSelected' in config && config.isSelected) {
    return 'success';
  }

  // Disabled tool
  if (config.disabled) {
    return 'neutral';
  }

  // Default tool state
  return 'outlined';
}

function resolveDataVariant(
  config: UnifiedCardConfig,
  context?: CardContext
): CardVariant {
  // Category-aware για data cards (pricing, review, etc.)
  if (context?.category === 'property') return 'property';
  if (context?.category === 'job') return 'job';

  // Data type specific
  if ('dataType' in config) {
    switch (config.dataType) {
      case 'pricing':
        return 'info';
      case 'review':
        return 'success';
      case 'summary':
        return 'neutral';
    }
  }

  return 'filled';
}

function resolveActionVariant(
  config: UnifiedCardConfig,
  context?: CardContext
): CardVariant {
  // Priority-based
  if ('priority' in config && config.priority === 'primary') {
    return 'success';
  }

  // Action category specific
  if ('actionCategory' in config) {
    switch (config.actionCategory) {
      case 'upload':
        return 'info';
      case 'submit':
        return 'success';
      case 'navigation':
        return 'neutral';
    }
  }

  return 'outlined';
}

// ============= HELPER FUNCTIONS =============

/**
 * Get appropriate opacity mode based on card state
 */
export const resolveOpacityMode = (
  config: UnifiedCardConfig,
  context?: CardContext
): 'transparent' | 'semi-transparent' | 'opaque' => {
  if (config.disabled) return 'transparent';
  if (config.selected) return 'opaque';
  return 'semi-transparent';
};

/**
 * Determine if card should show info button
 */
export const shouldShowInfoButton = (
  config: UnifiedCardConfig,
  context?: CardContext
): boolean => {
  return Boolean(config.onInfoClick);
};

/**
 * Get test ID for the card
 */
export const resolveTestId = (
  config: UnifiedCardConfig,
  context?: CardContext
): string => {
  if (config.testId) return config.testId;

  const baseId = `card-${config.type}-${config.id}`;
  if (context?.currentStep) {
    return `${context.currentStep}-${baseId}`;
  }

  return baseId;
};