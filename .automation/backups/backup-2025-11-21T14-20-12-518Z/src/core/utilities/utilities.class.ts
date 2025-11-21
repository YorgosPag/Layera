/**
 * 🔧 LAYERA UTILITIES CLASS - Global utility types and structure
 *
 * Defines the type structure for global CSS utilities
 * Foundation για display, positioning, cursor, και άλλα global utilities
 */

// UTILITY TYPES - Global CSS utility categories
export interface UtilityDisplay {
  flex: string;
  block: string;
  inline: string;
  inlineBlock: string;
  grid: string;
  none: string;
}

export interface UtilityPosition {
  static: string;
  relative: string;
  absolute: string;
  fixed: string;
  sticky: string;
}

export interface UtilityCursor {
  auto: string;
  pointer: string;
  notAllowed: string;
  wait: string;
  text: string;
  move: string;
}

export interface UtilityFlex {
  alignCenter: string;
  alignStart: string;
  alignEnd: string;
  justifyCenter: string;
  justifyStart: string;
  justifyEnd: string;
  justifyBetween: string;
  justifyAround: string;
}

export interface UtilityBorder {
  none: string;
  hidden: string;
  solid: string;
  dashed: string;
  dotted: string;
}

export interface UtilityGrid {
  autoFit280: string;
}

export interface UtilityTextAlign {
  left: string;
  center: string;
  right: string;
  justify: string;
}

// CONSOLIDATED UTILITIES CLASS - Complete utility system
export interface UtilitiesTokensClass {
  display: UtilityDisplay;
  position: UtilityPosition;
  cursor: UtilityCursor;
  flex: UtilityFlex;
  grid: UtilityGrid;
  textAlign: UtilityTextAlign;
  border: UtilityBorder;

  // System properties
  namespace: string;
  version: string;
  accessibility: boolean;
}

// Helper types για type safety
export type DisplayUtility = keyof UtilityDisplay;
export type PositionUtility = keyof UtilityPosition;
export type CursorUtility = keyof UtilityCursor;
export type FlexUtility = keyof UtilityFlex;
export type GridUtility = keyof UtilityGrid;
export type TextAlignUtility = keyof UtilityTextAlign;
export type BorderUtility = keyof UtilityBorder;