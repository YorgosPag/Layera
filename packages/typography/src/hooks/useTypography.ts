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
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem'    // 60px
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
      fontFamily: 'var(--layera-font-family-sans)'
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
      '--layera-font-family-sans': 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--layera-font-family-mono': '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
      ...Object.fromEntries(
        Object.entries(typographyScale.fontSizes).map(([key, value]) => [
          `--layera-text-${key}`,
          value
        ])
      ),
      ...Object.fromEntries(
        Object.entries(typographyScale.fontWeights).map(([key, value]) => [
          `--layera-font-${key}`,
          value
        ])
      ),
      ...Object.fromEntries(
        Object.entries(typographyScale.lineHeights).map(([key, value]) => [
          `--layera-leading-${key}`,
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