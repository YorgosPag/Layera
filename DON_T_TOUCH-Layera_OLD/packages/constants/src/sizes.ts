/**
 * Size constants for consistent component sizing
 */

export const COMPONENT_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl'
} as const;

export const FORM_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg'
} as const;

export const BUTTON_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl'
} as const;

export const ICON_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl'
} as const;

export const TABLE_COLUMN_WIDTHS = {
  NARROW: 80,
  SMALL: 120,
  STANDARD: 200,
  WIDE: 300,
  EXTRA_WIDE: 400
} as const;

// Type exports
export type ComponentSize = typeof COMPONENT_SIZES[keyof typeof COMPONENT_SIZES];
export type FormSize = typeof FORM_SIZES[keyof typeof FORM_SIZES];
export type ButtonSize = typeof BUTTON_SIZES[keyof typeof BUTTON_SIZES];
export type IconSize = typeof ICON_SIZES[keyof typeof ICON_SIZES];
export type TableColumnWidth = typeof TABLE_COLUMN_WIDTHS[keyof typeof TABLE_COLUMN_WIDTHS];