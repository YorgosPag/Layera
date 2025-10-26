/**
 * @layera/layout - Enterprise Sizing Hooks
 *
 * 🌟 Type-safe React hooks για sizing system
 *
 * Features:
 * - Performance-optimized με useMemo
 * - Type-safe sizing token consumption
 * - CSS custom property integration
 * - Enterprise-grade developer experience
 */

import { useMemo } from 'react';
import { SPACING_SCALE, getSizingVar, getSizingValue, type SizingToken } from '../sizing';

/**
 * Hook για single sizing token usage
 */
export const useSizing = (token: SizingToken) => {
  return useMemo(() => ({
    value: getSizingValue(token),
    cssVar: getSizingVar('width', token.toLowerCase().replace('_', '-')),
    token,
    scale: SPACING_SCALE[token]
  }), [token]);
};

/**
 * Hook για multiple sizing tokens usage
 */
export const useSizingTokens = <T extends readonly SizingToken[]>(tokens: T) => {
  return useMemo(() => {
    const result: Record<string, { value: string | number; cssVar: string; token: SizingToken }> = {};

    tokens.forEach(token => {
      result[token] = {
        value: getSizingValue(token),
        cssVar: getSizingVar('width', token.toLowerCase().replace('_', '-')),
        token
      };
    });

    return result;
  }, [tokens]);
};

/**
 * Hook για complete sizing system access
 */
export const useSizingSystem = () => {
  return useMemo(() => ({
    // Direct scale access
    scale: SPACING_SCALE,

    // Utility functions
    getSizingVar,
    getSizingValue,

    // Common sizing patterns
    patterns: {
      // Icon sizes
      iconSm: getSizingValue('MD'),      // 16px
      iconMd: getSizingValue('LG'),      // 24px
      iconLg: getSizingValue('XL'),      // 32px

      // Avatar sizes
      avatarXs: getSizingValue('LG'),    // 24px
      avatarSm: getSizingValue('XL'),    // 32px
      avatarMd: getSizingValue('XXL'),   // 48px
      avatarLg: getSizingValue('XXXL'),  // 64px

      // Container sizes
      containerSm: getSizingValue('CONTAINER_SM'),   // 600px
      containerMd: getSizingValue('CONTAINER_MD'),   // 800px
      containerLg: getSizingValue('CONTAINER_LG'),   // 1200px
      containerXl: getSizingValue('CONTAINER_XL'),   // 1400px

      // Layout dimensions
      sidebarWidth: getSizingValue('LAYOUT_XXL'),    // 320px
      headerHeight: getSizingValue('LAYOUT_SM'),     // 80px
      footerHeight: getSizingValue('LAYOUT_SM')      // 80px
    }
  }), []);
};

/**
 * Hook για responsive sizing (μελλοντική χρήση με breakpoints)
 */
export const useResponsiveSizing = () => {
  return useMemo(() => ({
    // Mobile sizing
    mobile: {
      containerMaxWidth: getSizingValue('CONTAINER_SM'),
      sidebarWidth: getSizingValue('LAYOUT_XXL')
    },

    // Tablet sizing
    tablet: {
      containerMaxWidth: getSizingValue('CONTAINER_MD'),
      sidebarWidth: getSizingValue('LAYOUT_XXXL')
    },

    // Desktop sizing
    desktop: {
      containerMaxWidth: getSizingValue('CONTAINER_LG'),
      sidebarWidth: getSizingValue('CONTAINER_SM')
    },

    // Large desktop sizing
    desktopLarge: {
      containerMaxWidth: getSizingValue('CONTAINER_XL'),
      sidebarWidth: getSizingValue('CONTAINER_SM')
    }
  }), []);
};

/**
 * Hook για CSS-in-JS styling με sizing tokens
 */
export const useSizingStyles = () => {
  return useMemo(() => {
    const createSizingStyle = (width?: SizingToken, height?: SizingToken) => ({
      width: width ? getSizingValue(width) : undefined,
      height: height ? getSizingValue(height) : undefined
    });

    return {
      createSizingStyle,

      // Pre-defined common styles
      fullSize: createSizingStyle('FULL', 'FULL'),
      square: (size: SizingToken) => createSizingStyle(size, size),

      // Common component sizing
      button: {
        xs: createSizingStyle('XXXL', 'LG'),      // 64px x 24px
        sm: createSizingStyle('LAYOUT_SM', 'XL'), // 80px x 32px
        md: createSizingStyle('LAYOUT_MD', 'XXL'), // 120px x 48px
        lg: createSizingStyle('LAYOUT_LG', 'XXXL') // 160px x 64px
      },

      card: {
        compact: { minHeight: getSizingValue('LAYOUT_SM') },   // 80px
        standard: { minHeight: getSizingValue('LAYOUT_MD') },  // 120px
        expanded: { minHeight: getSizingValue('LAYOUT_LG') }   // 160px
      },

      avatar: {
        xs: createSizingStyle('LG', 'LG'),        // 24px x 24px
        sm: createSizingStyle('XL', 'XL'),        // 32px x 32px
        md: createSizingStyle('XXL', 'XXL'),      // 48px x 48px
        lg: createSizingStyle('XXXL', 'XXXL'),    // 64px x 64px
        xl: createSizingStyle('LAYOUT_SM', 'LAYOUT_SM') // 80px x 80px
      }
    };
  }, []);
};