/**
 * 🖋️ LAYERA TYPOGRAPHY CLASS - Type definitions & structure
 *
 * Ορίζει την structure και τα types για το typography system
 * Enterprise-grade type safety για όλα τα typography tokens
 */

export interface TypographyScale {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
}

export interface FontWeightScale {
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
}

export interface LineHeightScale {
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
}

export interface FontFamilyScale {
  system: string;
  mono: string;
}

export interface TypographySemanticStyle {
  size: string;
  weight: number;
  lineHeight: number;
  family: string;
}

export interface TypographySemantic {
  display: TypographySemanticStyle;
  h1: TypographySemanticStyle;
  h2: TypographySemanticStyle;
  h3: TypographySemanticStyle;
  h4: TypographySemanticStyle;
  h5: TypographySemanticStyle;
  body: TypographySemanticStyle;
  caption: TypographySemanticStyle;
  label: TypographySemanticStyle;
}

export interface TypographyTokensClass {
  fontSize: TypographyScale;
  fontWeight: FontWeightScale;
  lineHeight: LineHeightScale;
  fontFamily: FontFamilyScale;
  semantic: TypographySemantic;
}

// Typography variant options for components
export type TypographyVariant = keyof TypographySemantic;
export type FontSizeVariant = keyof TypographyScale;
export type FontWeightVariant = keyof FontWeightScale;
export type LineHeightVariant = keyof LineHeightScale;
export type FontFamilyVariant = keyof FontFamilyScale;

// Responsive typography breakpoints
export interface ResponsiveTypographyBreakpoint {
  mobile: TypographyScale;
  tablet: TypographyScale;
  desktop: TypographyScale;
}

// CSS variable names που θα δημιουργηθούν
export interface TypographyCSSVariables {
  '--layera-typography-core-fontSize-xs': string;
  '--layera-typography-core-fontSize-sm': string;
  '--layera-typography-core-fontSize-base': string;
  '--layera-typography-core-fontSize-lg': string;
  '--layera-typography-core-fontSize-xl': string;
  '--layera-typography-core-fontSize-2xl': string;
  '--layera-typography-core-fontSize-3xl': string;
  '--layera-typography-core-fontSize-4xl': string;
  '--layera-typography-core-fontSize-5xl': string;
  '--layera-typography-core-fontSize-6xl': string;
  '--layera-typography-core-fontWeight-light': string;
  '--layera-typography-core-fontWeight-normal': string;
  '--layera-typography-core-fontWeight-medium': string;
  '--layera-typography-core-fontWeight-semibold': string;
  '--layera-typography-core-fontWeight-bold': string;
  '--layera-typography-core-fontWeight-extrabold': string;
  '--layera-typography-core-lineHeight-tight': string;
  '--layera-typography-core-lineHeight-snug': string;
  '--layera-typography-core-lineHeight-normal': string;
  '--layera-typography-core-lineHeight-relaxed': string;
  '--layera-typography-core-lineHeight-loose': string;
  '--layera-typography-core-fontFamily-system': string;
  '--layera-typography-core-fontFamily-mono': string;
}

export default TypographyTokensClass;