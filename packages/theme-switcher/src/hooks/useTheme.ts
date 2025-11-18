import { useCallback } from 'react';
import { useThemeContext } from './useThemeContext';
import type { UseThemeReturn } from '../types';

/**
 * useTheme Hook - Enterprise Theme Management
 *
 * Provides convenient functions for theme manipulation:
 * - toggleTheme: Μεταξύ light/dark (ignores system)
 * - cycleTheme: Μεταξύ όλων των themes (light → dark → system → light)
 * - Direct access σε όλες τις theme properties
 */
export function useTheme(): UseThemeReturn {
  const {
    theme,
    resolvedTheme,
    setTheme,
    systemSupportsDarkMode
  } = useThemeContext();

  /**
   * Toggle μεταξύ light και dark mode
   * Αν το τρέχον theme είναι system, θα γίνει toggle βάσει του resolved theme
   */
  const toggleTheme = useCallback(() => {
    if (resolvedTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [resolvedTheme, setTheme]);

  /**
   * Cycle μεταξύ όλων των available themes
   * Order: light → dark → system → light...
   */
  const cycleTheme = useCallback(() => {
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('system');
        break;
      case 'system':
        setTheme('light');
        break;
      default:
        setTheme('light');
    }
  }, [theme, setTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    systemSupportsDarkMode,
    toggleTheme,
    cycleTheme
  };
}