/**
 * 🎨 LAYERA UTILITIES VARIANTS - Global utility semantic names
 *
 * Semantic variant names για global CSS utilities
 * Maps abstract names to concrete implementations
 */

import type {
  UtilityDisplay,
  UtilityPosition,
  UtilityCursor,
  UtilityFlex,
  UtilityBorder
} from './utilities.class';

// DISPLAY VARIANTS - Layout display types
export const DISPLAY_VARIANTS: UtilityDisplay = {
  flex: 'flex',
  block: 'block',
  inline: 'inline',
  inlineBlock: 'inline-block',
  grid: 'grid',
  none: 'none',
} as const;

// POSITION VARIANTS - Element positioning
export const POSITION_VARIANTS: UtilityPosition = {
  static: 'static',
  relative: 'relative',
  absolute: 'absolute',
  fixed: 'fixed',
  sticky: 'sticky',
} as const;

// CURSOR VARIANTS - Mouse cursor types
export const CURSOR_VARIANTS: UtilityCursor = {
  auto: 'auto',
  pointer: 'pointer',
  notAllowed: 'not-allowed',
  wait: 'wait',
  text: 'text',
  move: 'move',
} as const;

// FLEX VARIANTS - Flexbox alignment utilities
export const FLEX_VARIANTS: UtilityFlex = {
  alignCenter: 'center',
  alignStart: 'flex-start',
  alignEnd: 'flex-end',
  justifyCenter: 'center',
  justifyStart: 'flex-start',
  justifyEnd: 'flex-end',
  justifyBetween: 'space-between',
  justifyAround: 'space-around',
} as const;

// BORDER VARIANTS - Border style types
export const BORDER_VARIANTS: UtilityBorder = {
  none: 'none',
  hidden: 'hidden',
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
} as const;

// Export για χρήση σε άλλα modules
export {
  DISPLAY_VARIANTS as DisplayVariants,
  POSITION_VARIANTS as PositionVariants,
  CURSOR_VARIANTS as CursorVariants,
  FLEX_VARIANTS as FlexVariants,
  BORDER_VARIANTS as BorderVariants,
};