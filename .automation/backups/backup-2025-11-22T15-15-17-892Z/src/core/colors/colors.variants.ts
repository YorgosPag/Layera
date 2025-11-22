/**
 * Colors Variants - Theme & Context Variations
 *
 * 🎨 Ορίζει τις παραλλαγές χρωμάτων για διαφορετικά contexts
 * - Light/Dark theme variants
 * - Semantic color contexts (success, warning, error, info)
 * - Interactive states (hover, active, disabled, focus)
 * - Surface variants (elevated, outlined, filled)
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Χρησιμοποιεί μόνο references από colors.variables
 * - Καμία σκληρή τιμή
 */

import type { ColorTokensClass, SemanticColor } from './colors.class';

export type ColorThemeVariant = 'light' | 'dark' | 'auto';

export type ColorContextVariant = 'brand' | 'neutral' | 'semantic' | 'surface' | 'text' | 'border';

export type ColorInteractionVariant = 'default' | 'hover' | 'active' | 'disabled' | 'focus';

export type ColorSurfaceVariant = 'flat' | 'elevated' | 'outlined' | 'filled';

export interface ColorVariants {
  theme: {
    light: ColorTokensClass;
    dark: ColorTokensClass;
  };

  context: {
    brand: {
      primary: string;
      secondary: string;
      accent: string;
    };

    neutral: {
      minimal: string;
      subtle: string;
      moderate: string;
      strong: string;
    };

    semantic: {
      positive: SemanticColor;
      negative: SemanticColor;
      warning: SemanticColor;
      informative: SemanticColor;
    };

    surface: {
      background: string;
      card: string;
      modal: string;
      overlay: string;
    };

    text: {
      headline: string;
      body: string;
      caption: string;
      label: string;
    };

    border: {
      subtle: string;
      moderate: string;
      strong: string;
      interactive: string;
    };
  };

  interaction: {
    default: {
      background: string;
      text: string;
      border: string;
    };

    hover: {
      background: string;
      text: string;
      border: string;
    };

    active: {
      background: string;
      text: string;
      border: string;
    };

    disabled: {
      background: string;
      text: string;
      border: string;
    };

    focus: {
      background: string;
      text: string;
      border: string;
      ring: string;
    };
  };

  surface: {
    flat: {
      background: string;
      border: string;
      shadow: string;
    };

    elevated: {
      background: string;
      border: string;
      shadow: string;
    };

    outlined: {
      background: string;
      border: string;
      shadow: string;
    };

    filled: {
      background: string;
      border: string;
      shadow: string;
    };
  };
}

export const COLOR_VARIANT_MAPPING = {
  themes: ['light', 'dark'] as const,
  contexts: ['brand', 'neutral', 'semantic', 'surface', 'text', 'border'] as const,
  interactions: ['default', 'hover', 'active', 'disabled', 'focus'] as const,
  surfaces: ['flat', 'elevated', 'outlined', 'filled'] as const,
} as const;

export const SEMANTIC_MAPPING = {
  positive: 'success',
  negative: 'error',
  warning: 'warning',
  informative: 'info',
} as const;