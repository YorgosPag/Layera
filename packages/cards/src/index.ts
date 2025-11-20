/**
 * Layera Cards System - Enhanced Main Entry Point
 *
 * Unified card system που συνδυάζει LEGO και Local BaseCard capabilities:
 * - Enhanced BaseCard με mobile UX features
 * - Advanced opacity modes για stepper integration
 * - Property/Job theme variants
 * - Full backward compatibility
 */

// Core Components - Enhanced BaseCard + UnifiedCard System
export { BaseCard } from './components/BaseCard';
export { DashboardCard } from './components/DashboardCard';
export { UnifiedCard } from './components/UnifiedCard';

// Enhanced theme system
export {
  getEnhancedCardTheme,
  getCardTextColor,
  cardThemes,
  legoCardThemes
} from './utils/cardThemes';

// UnifiedCard System - Configuration-driven Cards
export {
  resolveCardVariant,
  resolveThemeVariant,
  resolveOpacityMode,
  shouldShowInfoButton,
  resolveTestId
} from './utils/cardVariantResolver';

export {
  cardFactory,
  createSelectionCard,
  createToolCard,
  createDataCard,
  createActionCard,
  createCategoryCard,
  createIntentCard,
  createAvailabilityCard,
  createLayoutToolCard,
  createPricingCard,
  createPricingDataCard,
  createReviewCard,
  createUploadCard,
  createSelectionCards,
  createToolCards
} from './utils/cardConfigFactory';

// Layout Components
export { DashboardGrid, DashboardSection } from './layouts';

// Types - Enhanced interfaces + UnifiedCard Types
export type * from './types';
export type * from './types/unified-card.types';

// Legacy exports για backward compatibility με Local BaseCard
export { getEnhancedCardTheme as getCardTheme } from './utils/cardThemes';
export type {
  CardVariant,
  OpacityMode,
  EnhancedCardTheme,
  BaseCardProps
} from './types/card.types';