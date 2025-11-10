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
      xs: 'var(--la-font-size-xs, 0.75rem)',      // 12px
      sm: 'var(--la-font-size-sm, 0.875rem)',     // 14px
      base: 'var(--la-font-size-md, 1rem)',       // 16px
      lg: 'var(--la-font-size-lg, 1.125rem)',     // 18px
      xl: 'var(--la-font-size-xl, 1.25rem)',      // 20px
      '2xl': 'var(--la-font-size-xxl, 1.5rem)',    // 24px
      '3xl': 'var(--la-font-size-xxxl, 1.875rem)',  // 30px
      '4xl': 'var(--la-font-size-display-sm, 2.25rem)',   // 36px
      '5xl': 'var(--la-font-size-display-md, 3rem)',      // 48px
      '6xl': 'var(--la-font-size-display-lg, 3.75rem)'    // 60px
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeights: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    },
    letterSpacing: {
      xs: '-0.025em',
      sm: '-0.0125em',
      base: '0em',
      lg: '0.0125em',
      xl: '0.025em',
      '2xl': '0.025em',
      '3xl': '0.025em',
      '4xl': '0.025em',
      '5xl': '0.025em',
      '6xl': '0.025em'
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