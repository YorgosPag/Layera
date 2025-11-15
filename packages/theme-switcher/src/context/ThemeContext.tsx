'use client';

import React, { createContext, useEffect, useState, useCallback } from 'react';
import type { Theme, ThemeContextValue, ThemeProviderProps } from '../types';
import { MEDIA_QUERY, DEFAULT_STORAGE_KEY, DEFAULT_ATTRIBUTE } from '../constants';

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

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = DEFAULT_STORAGE_KEY,
  disableSystemTheme = false,
  attribute = DEFAULT_ATTRIBUTE,
  value
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // SSR compatibility - θα φορτώσει από localStorage στο useEffect
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

  // Υπολογισμός του resolved theme
  const resolvedTheme: 'light' | 'dark' = React.useMemo(() => {
    if (theme === 'system') {
      return systemSupportsDarkMode ? 'dark' : 'light';
    }
    return theme as 'light' | 'dark';
  }, [theme, systemSupportsDarkMode]);

  // System theme detection
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

  // Theme application στο DOM
  useEffect(() => {
    const root = document.documentElement;
    const themeValue = value?.[resolvedTheme] || resolvedTheme;

    root.setAttribute(attribute, themeValue);

    // Προσθήκη class για CSS compatibility
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);

    setIsThemeLoaded(true);
  }, [resolvedTheme, attribute, value]);

  // Storage persistence
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

