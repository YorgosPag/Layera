/**
 * Layera Cards System - Enhanced Main Entry Point
 *
 * Enterprise BaseCard system - Single Source of Truth:
 * - BaseCard με mobile UX features
 * - Advanced opacity modes για stepper integration
 * - Property/Job theme variants
 * - Enterprise-grade consistency
 */

// Core Components - Enterprise BaseCard System ONLY
export { BaseCard } from './components/BaseCard';
export { DashboardCard } from './components/DashboardCard';

// Enhanced theme system
export {
  getEnhancedCardTheme,
  getCardTextColor,
  cardThemes,
  legoCardThemes
} from './utils/cardThemes';

// Legacy cleanup - Διπλότυπα helpers αφαιρέθηκαν για Single Source of Truth
// Όλα τα components χρησιμοποιούν BaseCard απευθείας

// Layout Components
export { DashboardGrid, DashboardSection } from './layouts';

// Types - BaseCard System Only
export type * from './types';

// BaseCard exports - Single Source of Truth
export { getEnhancedCardTheme as getCardTheme } from './utils/cardThemes';
export type {
  CardVariant,
  OpacityMode,
  EnhancedCardTheme,
  BaseCardProps
} from './types/card.types';