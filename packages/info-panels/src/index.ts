/**
 * @layera/info-panels - Enterprise LEGO Info Panels System
 *
 * Scalable και αποσπώμενο σύστημα για contextual information overlays.
 * Μπορεί να χρησιμοποιηθεί σε οποιοδήποτε React project χωρίς dependencies.
 */

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

// React Context & Hook
export { InfoPanelProvider, useInfoPanel } from './InfoPanelContext';

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
    color: 'white',
    borderColor: `rgba(${baseColor}, ${borderOpacity})`,
    boxShadow: `0 4px 12px rgba(${baseColor}, ${shadowOpacity})`,
    borderRadius: '12px',
    fontSize: '12px',
    padding: '16px'
  };
};

// Common Themes
export const INFO_PANEL_THEMES = {
  property: createInfoPanelTheme('16, 185, 129'), // Πράσινο emerald
  job: createInfoPanelTheme('59, 130, 246'),     // Γαλάζιο blue
  success: createInfoPanelTheme('34, 197, 94'),  // Πράσινο success
  warning: createInfoPanelTheme('245, 158, 11'), // Πορτοκαλί warning
  error: createInfoPanelTheme('239, 68, 68'),    // Κόκκινο error
  info: createInfoPanelTheme('99, 102, 241')     // Μοβ info
} as const;

// Default Style Configurations
export const DEFAULT_INFO_PANEL_STYLES = {
  mobile: {
    position: {
      top: '161px',
      left: '8px',
      right: '8px'
    },
    zIndex: 10000,
    maxHeight: '60vh',
    overflow: 'auto'
  },
  desktop: {
    position: {
      top: '20px',
      right: '20px'
    },
    zIndex: 10000,
    maxHeight: '400px',
    overflow: 'auto'
  }
} as const;