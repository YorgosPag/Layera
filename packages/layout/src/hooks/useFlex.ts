/**
 * @layera/layout - Enterprise Flex Hooks
 *
 * 🌟 Type-safe React hooks για flex system
 *
 * Features:
 * - Performance-optimized με useMemo
 * - Type-safe flex token consumption
 * - CSS custom property integration
 * - Enterprise-grade layout patterns
 */

import { useMemo } from 'react';
import { FLEX_SCALE, FLEX_UTILITIES, getFlexVar } from '../flex';

/**
 * Hook για flex container styling
 */
export const useFlex = (options: {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
} = {}) => {
  return useMemo(() => {
    const {
      direction = 'row',
      justify = 'start',
      align = 'start',
      wrap = 'nowrap',
      gap = 'md'
    } = options;

    // Convert semantic values to CSS values
    const flexDirection = direction;
    const justifyContent = justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify;
    const alignItems = align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align;
    const flexWrap = wrap;
    const gapValue = FLEX_SCALE.gap[gap.toUpperCase() as keyof typeof FLEX_SCALE.gap];

    return {
      display: 'flex',
      flexDirection,
      justifyContent,
      alignItems,
      flexWrap,
      gap: gapValue
    };
  }, [options]);
};

/**
 * Flex utilities και common patterns - static objects
 */
export const useFlexPatterns = () => {
  return useMemo(() => ({
    // Basic layouts
    row: {
      display: 'flex',
      flexDirection: 'row' as const,
      gap: FLEX_SCALE.gap.MD
    },
    column: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: FLEX_SCALE.gap.MD
    },
    rowReverse: {
      display: 'flex',
      flexDirection: 'row-reverse' as const,
      gap: FLEX_SCALE.gap.MD
    },
    columnReverse: {
      display: 'flex',
      flexDirection: 'column-reverse' as const,
      gap: FLEX_SCALE.gap.MD
    },

    // Centered layouts
    centerHorizontal: {
      display: 'flex',
      justifyContent: 'center' as const
    },
    centerVertical: {
      display: 'flex',
      alignItems: 'center' as const
    },
    centerBoth: {
      display: 'flex',
      justifyContent: 'center' as const,
      alignItems: 'center' as const
    },

    // Space distribution
    spaceBetween: {
      display: 'flex',
      justifyContent: 'space-between' as const
    },
    spaceAround: {
      display: 'flex',
      justifyContent: 'space-around' as const
    },
    spaceEvenly: {
      display: 'flex',
      justifyContent: 'space-evenly' as const
    },

    // Common component patterns
    header: {
      display: 'flex',
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      gap: FLEX_SCALE.gap.LG
    },

    navigation: {
      display: 'flex',
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: FLEX_SCALE.gap.MD
    },

    cardBody: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: FLEX_SCALE.gap.SM
    },

    buttonGroup: {
      display: 'flex',
      flexDirection: 'row' as const,
      gap: FLEX_SCALE.gap.SM
    },

    formField: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: FLEX_SCALE.gap.XS
    },

    sidebar: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: FLEX_SCALE.gap.LG
    },

    mainContent: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: FLEX_SCALE.gap.LG
    }
  }), []);
};

/**
 * Hook για flex item properties
 */
export const useFlexItem = (options: {
  flex?: 'none' | 'auto' | 'initial' | 'grow' | 'shrink' | string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string | number;
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  order?: number | 'first' | 'last';
} = {}) => {
  return useMemo(() => {
    const {
      flex = 'initial',
      flexGrow,
      flexShrink,
      flexBasis,
      alignSelf = 'auto',
      order
    } = options;

    // Resolve flex value
    let flexValue: string;
    if (flex in FLEX_SCALE.flex) {
      flexValue = FLEX_SCALE.flex[flex as keyof typeof FLEX_SCALE.flex];
    } else {
      flexValue = flex;
    }

    // Resolve align self
    const alignSelfValue = alignSelf === 'start' ? 'flex-start' : alignSelf === 'end' ? 'flex-end' : alignSelf;

    // Resolve order
    let orderValue: string | number | undefined;
    if (order === 'first') {
      orderValue = -9999;
    } else if (order === 'last') {
      orderValue = 9999;
    } else {
      orderValue = order;
    }

    return {
      flex: flexValue,
      flexGrow,
      flexShrink,
      flexBasis: typeof flexBasis === 'number' ? `${flexBasis}px` : flexBasis,
      alignSelf: alignSelfValue,
      order: orderValue
    };
  }, [options]);
};

/**
 * Hook για complete flex system access
 */
export const useFlexSystem = () => {
  return useMemo(() => ({
    // Scale access
    scale: FLEX_SCALE,

    // Utilities access
    utilities: FLEX_UTILITIES,

    // CSS var generator
    getFlexVar,

    // Pattern generators (static objects)
    patterns: FLEX_UTILITIES.layouts,

    // Helper functions
    createFlexContainer: (direction: 'row' | 'column' = 'row') => ({
      display: 'flex',
      flexDirection: direction,
      gap: FLEX_SCALE.gap.MD
    }),

    createFlexItem: (flex: 'none' | 'auto' | 'grow' = 'auto') => ({
      flex: FLEX_SCALE.flex[flex.toUpperCase() as keyof typeof FLEX_SCALE.flex]
    })
  }), []);
};

/**
 * Hook για responsive flex patterns (μελλοντική χρήση με breakpoints)
 */
export const useResponsiveFlex = () => {
  return useMemo(() => ({
    // Mobile patterns
    mobile: {
      stackOnMobile: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: FLEX_SCALE.gap.SM
      }
    },

    // Tablet patterns
    tablet: {
      rowOnTablet: {
        display: 'flex',
        flexDirection: 'row' as const,
        gap: FLEX_SCALE.gap.MD
      }
    },

    // Desktop patterns
    desktop: {
      complexLayout: {
        display: 'flex',
        flexDirection: 'row' as const,
        gap: FLEX_SCALE.gap.LG
      }
    }
  }), []);
};