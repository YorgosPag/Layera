import React$1 from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * Theme Switcher Types - Enterprise Theme System για Layera
 *
 * Υποστηρίζει:
 * - Light/Dark mode
 * - System preference detection
 * - Local storage persistence
 * - WCAG 2.1 compliance
 * - Enterprise accessibility standards
 */
type Theme = 'light' | 'dark' | 'system';
interface ThemeContextValue {
    /** Το ενεργό theme */
    theme: Theme;
    /** Το επίλυτο theme (αν system, θα είναι light ή dark) */
    resolvedTheme: 'light' | 'dark';
    /** Function για αλλαγή theme */
    setTheme: (theme: Theme) => void;
    /** Boolean αν το system υποστηρίζει dark mode */
    systemSupportsDarkMode: boolean;
    /** Boolean αν το theme έχει φορτώσει (για SSR compatibility) */
    isThemeLoaded: boolean;
}
interface ThemeProviderProps {
    /** Τα children components */
    children: React.ReactNode;
    /** Default theme (προαιρετικό, default: 'system') */
    defaultTheme?: Theme;
    /** Storage key στο localStorage (προαιρετικό, default: 'layera-theme') */
    storageKey?: string;
    /** Disable system theme detection (προαιρετικό, default: false) */
    disableSystemTheme?: boolean;
    /** Custom attribute για το theme στο HTML element (προαιρετικό, default: 'data-theme') */
    attribute?: string;
    /** Value mapping για το attribute (προαιρετικό) */
    value?: Partial<Record<Theme | 'light' | 'dark', string>>;
}
interface ThemeSwitcherProps {
    /** Το variant του switcher button */
    variant?: 'icon' | 'button' | 'dropdown';
    /** Το size του switcher */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS class */
    className?: string;
    /** Custom labels για τα themes */
    labels?: {
        light: string;
        dark: string;
        system: string;
    };
    /** Show labels μαζί με icons */
    showLabels?: boolean;
    /** Custom icons */
    icons?: {
        light: React.ReactNode;
        dark: React.ReactNode;
        system: React.ReactNode;
    };
    /** Alignment για dropdown variant */
    align?: 'left' | 'right' | 'center';
}
interface UseThemeReturn extends Omit<ThemeContextValue, 'isThemeLoaded'> {
    /** Function για toggle μεταξύ light/dark (ignores system) */
    toggleTheme: () => void;
    /** Function για cycle μεταξύ όλων των themes */
    cycleTheme: () => void;
}
interface ThemeConfig {
    /** CSS custom properties για light theme */
    light: Record<string, string>;
    /** CSS custom properties για dark theme */
    dark: Record<string, string>;
}

declare const ThemeSwitcher: React$1.ForwardRefExoticComponent<ThemeSwitcherProps & React$1.RefAttributes<HTMLButtonElement>>;

declare function ThemeProvider({ children, defaultTheme, storageKey, disableSystemTheme, attribute, value }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
declare function useThemeContext(): ThemeContextValue;

/**
 * useTheme Hook - Enterprise Theme Management
 *
 * Provides convenient functions for theme manipulation:
 * - toggleTheme: Μεταξύ light/dark (ignores system)
 * - cycleTheme: Μεταξύ όλων των themes (light → dark → system → light)
 * - Direct access σε όλες τις theme properties
 */
declare function useTheme(): UseThemeReturn;

export { Theme, ThemeConfig, ThemeContextValue, ThemeProvider, ThemeProviderProps, ThemeSwitcher, ThemeSwitcherProps, UseThemeReturn, useTheme, useThemeContext };
