/**
 * @layera/info-panels - Enterprise LEGO Info Panels System
 *
 * Scalable και αποσπώμενο σύστημα για contextual information overlays.
 * Μπορεί να χρησιμοποιηθεί σε οποιοδήποτε React project χωρίς dependencies.
 */

import { SPACING_SCALE, BORDER_RADIUS_SCALE, SEMANTIC_RGB_COLORS } from '@layera/constants';

// Core Types
export type {
  InfoPanelId,
  InfoPanelContent,
  InfoPanelConfig,
  InfoPanelTheme,
  InfoPanelStyleConfig,
  InfoPanelRegistry,
  InfoPanelContentProvider,
  InfoPanelEventHandlers,
  InfoPanelState,
  UseInfoPanelReturn,
  InfoPanelProviderProps
} from './types';

// React Components
export { InfoPanel } from './components/InfoPanel';
export type { InfoPanelProps } from './components/InfoPanel';

// React Context & Hook
export { InfoPanelProvider, useInfoPanel } from './InfoPanelContext';

// Theme-aware Hooks
export { useCategoryTheming, getCategoryTheme } from './hooks/useCategoryTheming';
export type { CategoryType, CategoryTheme } from './hooks/useCategoryTheming';

// Content Providers
export { StaticContentProvider } from './providers/StaticContentProvider';
export type { StaticContentConfig } from './providers/StaticContentProvider';

// Pre-built Content Registries
export {
  GEOALERT_INFO_CONTENT,
  createGeoAlertContentProvider
} from './content/geoalert-registry';

// Utility Functions
import type { InfoPanelId, InfoPanelConfig, InfoPanelTheme } from './types';

export const createInfoPanelConfig = (
  id: InfoPanelId,
  titleKey: string,
  contentKey: string,
  options?: {
    category?: string;
    fallbackTitle?: string;
    fallbackContent?: string;
  }
): InfoPanelConfig => {
  const config: InfoPanelConfig = {
    id,
    titleKey,
    contentKey
  };

  if (options?.category) {
    config.category = options.category;
  }
  if (options?.fallbackTitle) {
    config.fallbackTitle = options.fallbackTitle;
  }
  if (options?.fallbackContent) {
    config.fallbackContent = options.fallbackContent;
  }

  return config;
};

export const createInfoPanelTheme = (
  baseColor: string,
  options?: {
    opacity?: number;
    borderOpacity?: number;
    shadowOpacity?: number;
  }
): InfoPanelTheme => {
  const opacity = options?.opacity ?? 0.95;
  const borderOpacity = options?.borderOpacity ?? 0.3;
  const shadowOpacity = options?.shadowOpacity ?? 0.4;

  return {
    backgroundColor: `rgba(${baseColor}, ${opacity})`,
    color: 'var(--la-color-text-on-primary)',
    borderColor: `rgba(${baseColor}, ${borderOpacity})`,
    boxShadow: 'var(--la-shadow-card-default)',
    borderRadius: `${BORDER_RADIUS_SCALE.CARD}px`,
    fontSize: 'var(--la-font-size-xs)',
    padding: `${SPACING_SCALE.MD}px`
  };
};

// Common Themes - Χρήση του ήπιου emerald για καλύτερη αναγνωσιμότητα
export const INFO_PANEL_THEMES = {
  property: createInfoPanelTheme(SEMANTIC_RGB_COLORS.SUCCESS_PRIMARY), // Ήπιο emerald για ευχάριστη ανάγνωση
  job: createInfoPanelTheme('var(--la-color-primary)'),      // Primary theme
  success: createInfoPanelTheme(SEMANTIC_RGB_COLORS.SUCCESS_PRIMARY),  // Ήπιο πράσινο success
  warning: createInfoPanelTheme(SEMANTIC_RGB_COLORS.WARNING_PRIMARY), // Πορτοκαλί warning
  error: createInfoPanelTheme(SEMANTIC_RGB_COLORS.ERROR_PRIMARY),    // Κόκκινο error
  info: createInfoPanelTheme(SEMANTIC_RGB_COLORS.INFO_PRIMARY)     // Μοβ info
} as const;

// Enterprise LEGO Layout Integration - CSS Variables
export const DEFAULT_INFO_PANEL_STYLES = {
  mobile: {
    position: {
      top: 'var(--la-info-panel-top)', // Calculated από CSS variables
      left: 'var(--la-side-margins)',
      right: 'var(--la-side-margins)'
    },
    zIndex: 1000, // Enterprise standard z-index for panels
    maxHeight: '60vh',
    overflow: 'auto'
  },
  desktop: {
    position: {
      top: 'var(--la-space-6)', // 24px από design tokens
      right: 'var(--la-space-6)' // 24px από design tokens
    },
    zIndex: 1000, // Enterprise standard z-index for panels
    maxHeight: 'var(--la-height-96)', // 384px design token,
    overflow: 'auto'
  }
} as const;

// Enterprise Layout Utility Functions
export const createInfoPanelStyles = (isMobile: boolean = true): React.CSSProperties => {
  const baseStyles = isMobile ? DEFAULT_INFO_PANEL_STYLES.mobile : DEFAULT_INFO_PANEL_STYLES.desktop;

  return {
    position: 'fixed',
    ...baseStyles.position,
    zIndex: baseStyles.zIndex,
    maxHeight: baseStyles.maxHeight,
    overflow: baseStyles.overflow as 'auto',
    transition: 'all var(--la-transition-normal)'
  };
};