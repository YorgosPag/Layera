/**
 * @layera/theme-switcher - Enterprise Theme System
 *
 * Αυτόνομο πακέτο για Dark/Light mode management
 * Compatible με όλες τις Layera εφαρμογές
 *
 * Features:
 * - System theme detection
 * - Local storage persistence
 * - SSR compatibility
 * - WCAG 2.1 compliance
 * - Enterprise design standards
 * - Plug & play architecture
 */

'use client';

// Components
export { ThemeSwitcher } from './components/ThemeSwitcher';

// Context & Providers
export { ThemeProvider } from './context/ThemeContext';

// Hooks
export { useThemeContext } from './hooks/useThemeContext';
export { useTheme } from './hooks/useTheme';

// Types
export type {
  Theme,
  ThemeContextValue,
  ThemeProviderProps,
  ThemeSwitcherProps,
  UseThemeReturn,
  ThemeConfig
} from './types';