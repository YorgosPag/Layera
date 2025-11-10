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

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
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

export interface ThemeProviderProps {
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

export interface ThemeSwitcherProps {
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

export interface UseThemeReturn extends Omit<ThemeContextValue, 'isThemeLoaded'> {
  /** Function για toggle μεταξύ light/dark (ignores system) */
  toggleTheme: () => void;
  /** Function για cycle μεταξύ όλων των themes */
  cycleTheme: () => void;
}

export interface ThemeConfig {
  /** CSS custom properties για light theme */
  light: Record<string, string>;
  /** CSS custom properties για dark theme */
  dark: Record<string, string>;
}