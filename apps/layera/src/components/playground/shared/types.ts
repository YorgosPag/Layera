/**
 * Κοινοί τύποι για το LivePlayground system
 * ARXES Compliant Types - Enterprise Standards
 *
 * @deprecated Most types moved to unified-interfaces.ts
 * Import from '../../../types/unified-interfaces' instead
 */

import type { ButtonSize } from '../../../types/sizes';

// Re-exports from unified interfaces
export type {
  PlaygroundColors,
  BaseColorPickerProps as ColorPickerProps,
  BaseComponentProps as SectionProps,
  LivePlaygroundProps
} from '../../../types/unified-interfaces';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
export type ColorCategory = 'buttons' | 'backgrounds' | 'text' | 'borders';

/**
 * Button state interface για το Buttons section
 */
export interface ButtonState {
  variant: ButtonVariant;
  size: ButtonSize;
  text: string;
  withIcon: boolean;
}

/**
 * Κοινές utility functions για playground components
 */

/**
 * Επιστρέφει το κατάλληλο χρώμα κειμένου βάσει του color category
 */
export const getTextColor = (colorValue: string, colorCategory: ColorCategory) => {
  if (colorCategory === 'text') return colorValue;
  if (colorCategory === 'backgrounds') {
    return colorValue === 'var(--layera-colors-primary-warning)' ? 'var(--layera-colors-text-primary)' : 'var(--layera-colors-text-primary)';
  }
  return 'var(--layera-colors-text-secondary)';
};

/**
 * Επιστρέφει το κατάλληλο χρώμα φόντου βάσει του color category
 */
export const getBackgroundColor = (colorValue: string, colorCategory: ColorCategory) => {
  if (colorCategory === 'backgrounds') return colorValue;
  return 'var(--layera-color-surface-primary)'; // white background for text and borders
};

/**
 * Επιστρέφει το κατάλληλο border style βάσει του color category
 */
export const getBorderStyle = (colorValue: string, colorCategory: ColorCategory, borderWidth?: string) => {
  if (colorCategory === 'borders') {
    const borderWidthToken = borderWidth ? `var(--layera-spacing-scale-${borderWidth})` : 'var(--layera-spacing-scale-1)';
    return `${borderWidthToken} solid ${colorValue}`;
  }
  return 'var(--layera-spacing-scale-1) solid var(--layera-color-border-primary)'; // subtle border for others
};