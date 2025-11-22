/**
 * 🎨 LAYERA SEMANTIC UTILITIES CLASS - Color utility types and structure
 *
 * Defines the type structure για semantic color utilities
 * Maps core colors to specific utility purposes (fill, stroke, background, text)
 */

import { COLOR_SCALE } from '../../core/colors/colors.variables';

// COLOR FILL UTILITIES - For SVG και icon fills
export interface UtilityColorFill {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  neutral: string;
  accentBlue: string;
  accentGreen: string;
  accentRed: string;
  accentYellow: string;
}

// COLOR STROKE UTILITIES - For SVG και icon strokes
export interface UtilityColorStroke {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  neutral: string;
}

// BACKGROUND UTILITIES - Extended background color utilities
export interface UtilityBackground {
  primary: string;
  secondary: string;
  surface: string;
  surfaceDark: string;
  overlay: string;
  transparent: string;
}

// TEXT UTILITIES - Extended text color utilities
export interface UtilityText {
  primary: string;
  secondary: string;
  inverted: string;
  muted: string;
  accent: string;
}

// BORDER UTILITIES - Extended border color utilities
export interface UtilityBorder {
  primary: string;
  secondary: string;
  accent: string;
  subtle: string;
  strong: string;
}

// CONSOLIDATED SEMANTIC UTILITIES CLASS - Complete utility color system
export interface SemanticUtilitiesTokensClass {
  fill: UtilityColorFill;
  stroke: UtilityColorStroke;
  background: UtilityBackground;
  text: UtilityText;
  border: UtilityBorder;

  // System properties
  namespace: string;
  version: string;
  colorSpace: string;
}

// Helper types για type safety
export type FillUtility = keyof UtilityColorFill;
export type StrokeUtility = keyof UtilityColorStroke;
export type BackgroundUtility = keyof UtilityBackground;
export type TextUtility = keyof UtilityText;
export type BorderUtility = keyof UtilityBorder;