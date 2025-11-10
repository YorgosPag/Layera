'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Theme, ThemeContextValue, ThemeProviderProps } from '../types';

/**
 * Theme Context - Enterprise Theme Management για Layera
 *
 * Features:
 * - System theme detection με prefers-color-scheme
 * - Local storage persistence
 * - SSR compatibility
 * - WCAG 2.1 compliant
 * - Performance optimized με useCallback
 */

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const MEDIA_QUERY = '(prefers-color-scheme: dark)';
const DEFAULT_STORAGE_KEY = 'layera-theme';
const DEFAULT_ATTRIBUTE = 'data-theme';

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = DEFAULT_STORAGE_KEY,
  disableSystemTheme = false,
  attribute = DEFAULT_ATTRIBUTE,
  value
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored as Theme;
      }
    } catch (error) {
      console.warn('[@layera/theme-switcher] Failed to read from localStorage:', error);
    }

    return defaultTheme;
  });

  const [systemSupportsDarkMode, setSystemSupportsDarkMode] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const resolvedTheme: 'light' | 'dark' = React.useMemo(() => {
    if (theme === 'system') {
      return systemSupportsDarkMode ? 'dark' : 'light';
    }
    return theme as 'light' | 'dark';
  }, [theme, systemSupportsDarkMode]);

  useEffect(() => {
    if (disableSystemTheme) return;

    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    setSystemSupportsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemSupportsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [disableSystemTheme]);

  useEffect(() => {
    const root = document.documentElement;
    const themeValue = value?.[resolvedTheme] || resolvedTheme;

    root.setAttribute(attribute, themeValue);

    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);

    setIsThemeLoaded(true);
  }, [resolvedTheme, attribute, value]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn('[@layera/theme-switcher] Failed to write to localStorage:', error);
    }
  }, [theme, storageKey]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const contextValue: ThemeContextValue = {
    theme,
    resolvedTheme,
    setTheme,
    systemSupportsDarkMode,
    isThemeLoaded
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}