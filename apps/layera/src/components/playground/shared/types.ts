/**
 * Κοινοί τύποι για το LivePlayground system
 * ARXES Compliant Types - Enterprise Standards
 */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ColorCategory = 'buttons' | 'backgrounds' | 'text' | 'borders';

/**
 * Color state interface για το Colors section
 */
export interface ColorState {
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  warningColor: string;
  dangerColor: string;
  infoColor: string;
  colorCategory: ColorCategory;
}

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
 * Props για το ColorPicker component με Real-Time Preview
 */
export interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onPreview?: (value: string) => void;  // Optional real-time preview callback
  className?: string;
}

/**
 * Props για section components
 */
export interface SectionProps {
  className?: string;
}

/**
 * Props για το main LivePlayground
 */
export interface LivePlaygroundProps {
  onClose: () => void;
}