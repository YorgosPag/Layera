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
      xs: 'var(--layera-fontSize-xs)',
      sm: 'var(--layera-fontSize-sm)',
      base: 'var(--layera-fontSize-base)',
      lg: 'var(--layera-fontSize-lg)',
      xl: 'var(--layera-fontSize-xl)',
      '2xl': 'var(--layera-fontSize-2xl)',
      '3xl': 'var(--layera-fontSize-3xl)',
      '4xl': 'var(--layera-fontSize-4xl)',
      '5xl': 'var(--layera-fontSize-5xl)',
      '6xl': 'var(--layera-fontSize-6xl)'
    },
    fontWeights: {
      light: 'var(--layera-fontWeight-light)',
      normal: 'var(--layera-fontWeight-normal)',
      medium: 'var(--layera-fontWeight-medium)',
      semibold: 'var(--layera-fontWeight-semibold)',
      bold: 'var(--layera-fontWeight-bold)',
      extrabold: 'var(--layera-fontWeight-extrabold)'
    },
    lineHeights: {
      tight: 'var(--layera-lineHeight-tight)',
      snug: 'var(--layera-lineHeight-snug)',
      normal: 'var(--layera-lineHeight-normal)',
      relaxed: 'var(--layera-lineHeight-relaxed)',
      loose: 'var(--layera-lineHeight-loose)'
    },
    letterSpacing: {
      xs: 'var(--layera-letterSpacing-tight)',
      sm: 'var(--layera-letterSpacing-tight)',
      base: 'var(--layera-letterSpacing-normal)',
      lg: 'var(--layera-letterSpacing-wide)',
      xl: 'var(--layera-letterSpacing-wider)',
      '2xl': 'var(--layera-letterSpacing-wider)',
      '3xl': 'var(--layera-letterSpacing-wider)',
      '4xl': 'var(--layera-letterSpacing-wider)',
      '5xl': 'var(--layera-letterSpacing-wider)',
      '6xl': 'var(--layera-letterSpacing-wider)'
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