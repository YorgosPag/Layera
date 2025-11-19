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