/**
 * Colors Class - Foundation Color System Structure
 *
 * 🎨 Ορίζει τη βασική δομή και κανόνες του color system
 * - Καθορίζει τη ιεραρχία χρωμάτων (primary, secondary, semantic, neutral)
 * - Ορίζει τους κανόνες για accessibility και contrast
 * - Εξασφαλίζει type safety για όλα τα color tokens
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Καμία σκληρή τιμή
 * - Single source of truth
 */

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type SemanticColor = {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
};

export type NeutralColors = {
  white: string;
  light: string;
  medium: string;
  dark: string;
  black: string;
};

export interface ColorTokensClass {
  // Βασικές παλέτες
  primary: ColorScale;
  secondary: ColorScale;

  // Semantic χρώματα
  success: SemanticColor;
  warning: SemanticColor;
  error: SemanticColor;
  info: SemanticColor;

  // Neutral palette
  neutral: NeutralColors;

  // Surface χρώματα
  surface: {
    primary: string;
    secondary: string;
    tertiary: string;
    overlay: string;
  };

  // Text χρώματα
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };

  // Border χρώματα
  border: {
    light: string;
    medium: string;
    dark: string;
    focus: string;
  };
}

export const COLOR_ACCESSIBILITY_RULES = {
  CONTRAST_AA: 4.5,
  CONTRAST_AAA: 7,
  MIN_ALPHA: 0.1,
  MAX_ALPHA: 1,
} as const;

export const COLOR_NAMING_CONVENTION = {
  PREFIX: 'layera-color',
  SEPARATOR: '-',
  SCALES: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  SEMANTIC: ['success', 'warning', 'error', 'info'],
  STATES: ['light', 'main', 'dark', 'contrastText'],
} as const;