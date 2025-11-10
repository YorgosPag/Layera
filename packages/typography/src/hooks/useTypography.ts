import { useMemo } from 'react';
import { FontSize, FontWeight, LineHeight, TypographyScale } from '../types';

/**
 * useTypography Hook - Παρέχει πρόσβαση στο Layera Typography Scale
 *
 * Επιστρέφει τα typography tokens και utility functions
 * για programmatic χρήση των typography standards
 */
export const useTypography = () => {
  const typographyScale: TypographyScale = useMemo(() => ({
    fontSizes: {
      xs: 'var(--la-fontSize-xs)',
      sm: 'var(--la-fontSize-sm)',
      base: 'var(--la-fontSize-base)',
      lg: 'var(--la-fontSize-lg)',
      xl: 'var(--la-fontSize-xl)',
      '2xl': 'var(--la-fontSize-2xl)',
      '3xl': 'var(--la-fontSize-3xl)',
      '4xl': 'var(--la-fontSize-4xl)',
      '5xl': 'var(--la-fontSize-5xl)',
      '6xl': 'var(--la-fontSize-6xl)'
    },
    fontWeights: {
      light: 'var(--la-fontWeight-light)',
      normal: 'var(--la-fontWeight-normal)',
      medium: 'var(--la-fontWeight-medium)',
      semibold: 'var(--la-fontWeight-semibold)',
      bold: 'var(--la-fontWeight-bold)',
      extrabold: 'var(--la-fontWeight-extrabold)'
    },
    lineHeights: {
      tight: 'var(--la-lineHeight-tight)',
      snug: 'var(--la-lineHeight-snug)',
      normal: 'var(--la-lineHeight-normal)',
      relaxed: 'var(--la-lineHeight-relaxed)',
      loose: 'var(--la-lineHeight-loose)'
    },
    letterSpacing: {
      xs: 'var(--la-letterSpacing-tight)',
      sm: 'var(--la-letterSpacing-tight)',
      base: 'var(--la-letterSpacing-normal)',
      lg: 'var(--la-letterSpacing-wide)',
      xl: 'var(--la-letterSpacing-wider)',
      '2xl': 'var(--la-letterSpacing-wider)',
      '3xl': 'var(--la-letterSpacing-wider)',
      '4xl': 'var(--la-letterSpacing-wider)',
      '5xl': 'var(--la-letterSpacing-wider)',
      '6xl': 'var(--la-letterSpacing-wider)'
    }
  }), []);

  /**
   * Δημιουργεί CSS styles object από typography props
   */
  const getTypographyStyles = ({
    size = 'base',
    weight = 'normal',
    lineHeight = 'normal'
  }: {
    size?: FontSize;
    weight?: FontWeight;
    lineHeight?: LineHeight;
  }) => {
    return {
      fontSize: typographyScale.fontSizes[size],
      fontWeight: typographyScale.fontWeights[weight],
      lineHeight: typographyScale.lineHeights[lineHeight],
      letterSpacing: typographyScale.letterSpacing[size],
      fontFamily: 'var(--la-font-family-sans)'
    };
  };

  /**
   * Δημιουργεί CSS classes string από typography props
   */
  const getTypographyClasses = ({
    size = 'base',
    weight = 'normal',
    lineHeight = 'normal',
    color = 'secondary',
    align = 'left'
  }: {
    size?: FontSize;
    weight?: FontWeight;
    lineHeight?: LineHeight;
    color?: string;
    align?: string;
  }) => {
    return [
      'layera-text',
      `layera-text-${size}`,
      `layera-font-${weight}`,
      `layera-leading-${lineHeight}`,
      `layera-text-${color}`,
      `layera-text-${align}`
    ].join(' ');
  };

  /**
   * Επιστρέφει τα CSS custom properties ως object
   */
  const getCSSCustomProperties = () => {
    return {
      '--la-font-family-sans': 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--la-font-family-mono': '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
      ...Object.fromEntries(
        Object.entries(typographyScale.fontSizes).map(([key, value]) => [
          `--la-text-${key}`,
          value
        ])
      ),
      ...Object.fromEntries(
        Object.entries(typographyScale.fontWeights).map(([key, value]) => [
          `--la-font-${key}`,
          value
        ])
      ),
      ...Object.fromEntries(
        Object.entries(typographyScale.lineHeights).map(([key, value]) => [
          `--la-leading-${key}`,
          value
        ])
      )
    };
  };

  return {
    scale: typographyScale,
    getTypographyStyles,
    getTypographyClasses,
    getCSSCustomProperties
  };
};

export default useTypography;