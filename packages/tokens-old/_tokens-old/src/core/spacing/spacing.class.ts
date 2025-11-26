/**
 * 📏 LAYERA SPACING CLASS - Core spacing scale system
 *
 * Defines the foundational spacing scale using 8-point grid system.
 * This is the single source of truth for all spacing values.
 *
 * Enterprise Standards:
 * - 8-point grid system (4px, 8px, 16px, 32px, etc.)
 * - Mathematical progression for visual harmony
 * - Consistent spacing across all components
 */

export interface SpacingScale {
  0: string;    // No spacing
  1: string;    // 4px - Micro spacing
  2: string;    // 8px - Small spacing
  3: string;    // 12px - Medium-small spacing
  4: string;    // 16px - Medium spacing
  5: string;    // 20px - Medium-large spacing
  6: string;    // 24px - Large spacing
  8: string;    // 32px - XL spacing
  10: string;   // 40px - XXL spacing
  12: string;   // 48px - XXXL spacing
  16: string;   // 64px - Huge spacing
  20: string;   // 80px - Massive spacing
  24: string;   // 96px - Epic spacing
  32: string;   // 128px - Legendary spacing
}

export interface SpacingVariants {
  micro: string;     // For fine details, icon spacing
  small: string;     // For component internal spacing
  medium: string;    // For standard component spacing
  large: string;     // For section spacing
  macro: string;     // For layout spacing
}

export interface SpacingDirections {
  all: string;       // padding/margin on all sides
  top: string;       // padding-top/margin-top
  right: string;     // padding-right/margin-right
  bottom: string;    // padding-bottom/margin-bottom
  left: string;      // padding-left/margin-left
  horizontal: string; // padding-left + padding-right
  vertical: string;   // padding-top + padding-bottom
}

export interface SpacingTokensClass {
  scale: SpacingScale;
  variants: SpacingVariants;
  directions: SpacingDirections;

  // Accessibility and usability rules
  readonly minTouchTarget: string; // 44px minimum for touch targets
  readonly maxReadingWidth: string; // Maximum content width for readability
  readonly standardGutters: string; // Standard layout gutters
}

// Enterprise spacing naming conventions
export type SpacingSize = 'micro' | 'small' | 'medium' | 'large' | 'macro';
export type SpacingDirection = 'all' | 'top' | 'right' | 'bottom' | 'left' | 'horizontal' | 'vertical';
export type SpacingType = 'padding' | 'margin' | 'gap';