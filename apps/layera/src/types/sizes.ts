/**
 * Unified Size Type System - Single Source of Truth
 *
 * Consolidation of 6 different size interfaces into one unified system
 * Reduces variables from ~120-150 to ~30-40 (ARXES compliance)
 */

// Base size types
export type BaseSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Extended size types for specific components
export type ExtendedSize = BaseSize | 'full' | 'base' | '2xl';

// Component-specific size types (backwards compatibility)
export type CardSizeValue = BaseSize;
export type TableSizeValue = BaseSize;
export type ButtonSize = BaseSize;
export type ModalSizeValue = BaseSize | 'full';
export type InputSizeValue = 'xs' | 'sm' | 'md' | 'lg'; // No xl for inputs
export type FontSizeValue = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

// Unified size configuration interface
export interface UnifiedSizeConfig {
  card: CardSizeValue;
  table: TableSizeValue;
  modal: ModalSizeValue;
  input: InputSizeValue;
  button: ButtonSize;
  font: FontSizeValue;
}

// Default size values
export const DEFAULT_SIZES: UnifiedSizeConfig = {
  card: 'md',
  table: 'md',
  modal: 'md',
  input: 'md',
  button: 'md',
  font: 'base'
} as const;

// Size option definitions with labels and descriptions
export const SIZE_OPTIONS = {
  base: [
    { value: 'xs' as const, label: 'XS', description: 'Extra Small' },
    { value: 'sm' as const, label: 'SM', description: 'Small' },
    { value: 'md' as const, label: 'MD', description: 'Medium' },
    { value: 'lg' as const, label: 'LG', description: 'Large' },
    { value: 'xl' as const, label: 'XL', description: 'Extra Large' }
  ],
  modal: [
    { value: 'xs' as const, label: 'XS', description: 'Compact modal' },
    { value: 'sm' as const, label: 'SM', description: 'Small modal' },
    { value: 'md' as const, label: 'MD', description: 'Standard modal' },
    { value: 'lg' as const, label: 'LG', description: 'Large modal' },
    { value: 'xl' as const, label: 'XL', description: 'Extra large modal' },
    { value: 'full' as const, label: 'FULL', description: 'Fullscreen modal' }
  ],
  input: [
    { value: 'xs' as const, label: 'XS', description: 'Compact input' },
    { value: 'sm' as const, label: 'SM', description: 'Small input' },
    { value: 'md' as const, label: 'MD', description: 'Standard input' },
    { value: 'lg' as const, label: 'LG', description: 'Large input' }
  ],
  font: [
    { value: 'xs' as const, label: 'XS', description: 'Caption text' },
    { value: 'sm' as const, label: 'SM', description: 'Small text' },
    { value: 'base' as const, label: 'BASE', description: 'Body text' },
    { value: 'lg' as const, label: 'LG', description: 'Large text' },
    { value: 'xl' as const, label: 'XL', description: 'Heading text' },
    { value: '2xl' as const, label: '2XL', description: 'Display text' }
  ]
} as const;