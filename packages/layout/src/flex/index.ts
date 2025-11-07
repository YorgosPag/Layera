/**
 * @layera/layout - Enterprise Flex System
 *
 * 🌟 World-class flex system που ξεπερνά Material Design 3, Chakra UI, και Ant Design
 *
 * Features:
 * - Complete flexbox API coverage με semantic naming
 * - CSS Custom Properties με theme awareness
 * - Type-safe flex tokens με industry standards
 * - Advanced flex utilities για complex layouts
 * - Performance-optimized με design token integration
 */

import { SPACING_SCALE } from '@layera/constants';

/**
 * Enterprise Flex Token Scale
 * Βασισμένο στα CSS Flexbox specifications και industry best practices
 */
export const FLEX_SCALE = {
  // Flex Direction (maps 1:1 with CSS)
  direction: {
    ROW: 'row',
    ROW_REVERSE: 'row-reverse',
    COLUMN: 'column',
    COLUMN_REVERSE: 'column-reverse'
  },

  // Justify Content (main axis alignment)
  justify: {
    START: 'flex-start',
    END: 'flex-end',
    CENTER: 'center',
    SPACE_BETWEEN: 'space-between',
    SPACE_AROUND: 'space-around',
    SPACE_EVENLY: 'space-evenly'
  },

  // Align Items (cross axis alignment)
  align: {
    START: 'flex-start',
    END: 'flex-end',
    CENTER: 'center',
    STRETCH: 'stretch',
    BASELINE: 'baseline'
  },

  // Align Content (for wrapped lines)
  alignContent: {
    START: 'flex-start',
    END: 'flex-end',
    CENTER: 'center',
    STRETCH: 'stretch',
    SPACE_BETWEEN: 'space-between',
    SPACE_AROUND: 'space-around',
    SPACE_EVENLY: 'space-evenly'
  },

  // Flex Wrap
  wrap: {
    NOWRAP: 'nowrap',
    WRAP: 'wrap',
    WRAP_REVERSE: 'wrap-reverse'
  },

  // Flex Grow/Shrink values (common patterns)
  flex: {
    NONE: '0 0 auto',      // Don't grow or shrink
    AUTO: '1 1 auto',      // Grow and shrink as needed
    INITIAL: '0 1 auto',   // Don't grow, shrink if needed
    GROW: '1 0 0%',        // Grow to fill space
    SHRINK: '0 1 0%'       // Only shrink
  },

  // Gap values (aligned με @layera/constants SPACING_SCALE)
  gap: {
    NONE: '0',
    XXS: 'var(--la-space-1)',  // 🎯 SST: XXS spacing token
    XS: 'var(--la-space-1)',    // 🎯 SST: XS spacing token
    SM: `${SPACING_SCALE.SM}px`,    // 8px
    MD: `${SPACING_SCALE.MD}px`,    // 16px
    LG: 'var(--la-space-6)',    // 🎯 SST: LG spacing (24px)
    XL: 'var(--la-space-layout-xl)',    // 🎯 SST: XL spacing token
    XXL: 'var(--la-space-12)',  // 🎯 SST: XXL spacing token
    XXXL: 'var(--la-space-16)' // 🎯 SST: XXXL spacing token
  }
} as const;

/**
 * Type-safe flex token types
 */
export type FlexDirection = keyof typeof FLEX_SCALE.direction;
export type FlexJustify = keyof typeof FLEX_SCALE.justify;
export type FlexAlign = keyof typeof FLEX_SCALE.align;
export type FlexAlignContent = keyof typeof FLEX_SCALE.alignContent;
export type FlexWrap = keyof typeof FLEX_SCALE.wrap;
export type FlexValue = keyof typeof FLEX_SCALE.flex;
export type FlexGap = keyof typeof FLEX_SCALE.gap;

/**
 * Enterprise CSS custom properties για flex system
 */
export const FLEX_CSS_VARS = {
  // Direction tokens
  direction: {
    'flex-direction-row': FLEX_SCALE.direction.ROW,
    'flex-direction-row-reverse': FLEX_SCALE.direction.ROW_REVERSE,
    'flex-direction-column': FLEX_SCALE.direction.COLUMN,
    'flex-direction-column-reverse': FLEX_SCALE.direction.COLUMN_REVERSE
  },

  // Justify content tokens
  justify: {
    'flex-justify-start': FLEX_SCALE.justify.START,
    'flex-justify-end': FLEX_SCALE.justify.END,
    'flex-justify-center': FLEX_SCALE.justify.CENTER,
    'flex-justify-space-between': FLEX_SCALE.justify.SPACE_BETWEEN,
    'flex-justify-space-around': FLEX_SCALE.justify.SPACE_AROUND,
    'flex-justify-space-evenly': FLEX_SCALE.justify.SPACE_EVENLY
  },

  // Align items tokens
  align: {
    'flex-align-start': FLEX_SCALE.align.START,
    'flex-align-end': FLEX_SCALE.align.END,
    'flex-align-center': FLEX_SCALE.align.CENTER,
    'flex-align-stretch': FLEX_SCALE.align.STRETCH,
    'flex-align-baseline': FLEX_SCALE.align.BASELINE
  },

  // Align content tokens
  alignContent: {
    'flex-align-content-start': FLEX_SCALE.alignContent.START,
    'flex-align-content-end': FLEX_SCALE.alignContent.END,
    'flex-align-content-center': FLEX_SCALE.alignContent.CENTER,
    'flex-align-content-stretch': FLEX_SCALE.alignContent.STRETCH,
    'flex-align-content-space-between': FLEX_SCALE.alignContent.SPACE_BETWEEN,
    'flex-align-content-space-around': FLEX_SCALE.alignContent.SPACE_AROUND,
    'flex-align-content-space-evenly': FLEX_SCALE.alignContent.SPACE_EVENLY
  },

  // Wrap tokens
  wrap: {
    'flex-wrap-nowrap': FLEX_SCALE.wrap.NOWRAP,
    'flex-wrap-wrap': FLEX_SCALE.wrap.WRAP,
    'flex-wrap-wrap-reverse': FLEX_SCALE.wrap.WRAP_REVERSE
  },

  // Flex behavior tokens
  flex: {
    'flex-none': FLEX_SCALE.flex.NONE,
    'flex-auto': FLEX_SCALE.flex.AUTO,
    'flex-initial': FLEX_SCALE.flex.INITIAL,
    'flex-grow': FLEX_SCALE.flex.GROW,
    'flex-shrink': FLEX_SCALE.flex.SHRINK
  },

  // Gap tokens
  gap: {
    'flex-gap-none': FLEX_SCALE.gap.NONE,
    'flex-gap-xxs': FLEX_SCALE.gap.XXS,
    'flex-gap-xs': FLEX_SCALE.gap.XS,
    'flex-gap-sm': FLEX_SCALE.gap.SM,
    'flex-gap-md': FLEX_SCALE.gap.MD,
    'flex-gap-lg': FLEX_SCALE.gap.LG,
    'flex-gap-xl': FLEX_SCALE.gap.XL,
    'flex-gap-xxl': FLEX_SCALE.gap.XXL,
    'flex-gap-xxxl': FLEX_SCALE.gap.XXXL
  }
} as const;

/**
 * Utility function για CSS custom property access
 */
export const getFlexVar = (category: keyof typeof FLEX_CSS_VARS, token: string): string => {
  return `var(--flex-${category}-${token})`;
};

/**
 * Enterprise flex utilities για common patterns
 */
export const FLEX_UTILITIES = {
  // Common layout patterns
  layouts: {
    // Horizontal layouts
    row: {
      display: 'flex',
      flexDirection: getFlexVar('direction', 'row'),
      gap: getFlexVar('gap', 'md')
    },
    rowReverse: {
      display: 'flex',
      flexDirection: getFlexVar('direction', 'row-reverse'),
      gap: getFlexVar('gap', 'md')
    },

    // Vertical layouts
    column: {
      display: 'flex',
      flexDirection: getFlexVar('direction', 'column'),
      gap: getFlexVar('gap', 'md')
    },
    columnReverse: {
      display: 'flex',
      flexDirection: getFlexVar('direction', 'column-reverse'),
      gap: getFlexVar('gap', 'md')
    },

    // Centered layouts
    centerHorizontal: {
      display: 'flex',
      justifyContent: getFlexVar('justify', 'center')
    },
    centerVertical: {
      display: 'flex',
      alignItems: getFlexVar('align', 'center')
    },
    centerBoth: {
      display: 'flex',
      justifyContent: getFlexVar('justify', 'center'),
      alignItems: getFlexVar('align', 'center')
    },

    // Space distribution
    spaceBetween: {
      display: 'flex',
      justifyContent: getFlexVar('justify', 'space-between')
    },
    spaceAround: {
      display: 'flex',
      justifyContent: getFlexVar('justify', 'space-around')
    },
    spaceEvenly: {
      display: 'flex',
      justifyContent: getFlexVar('justify', 'space-evenly')
    }
  },

  // Component-specific patterns
  components: {
    // Header με logo και actions
    header: {
      display: 'flex',
      flexDirection: getFlexVar('direction', 'row'),
      justifyContent: getFlexVar('justify', 'space-between'),
      alignItems: getFlexVar('align', 'center'),
      gap: getFlexVar('gap', 'lg')
    },

    // Navigation με items
    navigation: {
      display: 'flex',
      flexDirection: getFlexVar('direction', 'row'),
      alignItems: getFlexVar('align', 'center'),
      gap: getFlexVar('gap', 'md')
    },

    // Card content area
    cardBody: {
      display: 'flex',
      flexDirection: getFlexVar('direction', 'column'),
      gap: getFlexVar('gap', 'sm'),
      flex: getFlexVar('flex', 'auto')
    },

    // Button group
    buttonGroup: {
      display: 'flex',
      flexDirection: getFlexVar('direction', 'row'),
      gap: getFlexVar('gap', 'sm'),
      justifyContent: getFlexVar('justify', 'start')
    },

    // Form field με label και input
    formField: {
      display: 'flex',
      flexDirection: getFlexVar('direction', 'column'),
      gap: getFlexVar('gap', 'xs')
    },

    // Sidebar layout
    sidebar: {
      display: 'flex',
      flexDirection: getFlexVar('direction', 'column'),
      gap: getFlexVar('gap', 'lg'),
      flex: getFlexVar('flex', 'none')
    },

    // Main content area
    mainContent: {
      display: 'flex',
      flexDirection: getFlexVar('direction', 'column'),
      gap: getFlexVar('gap', 'lg'),
      flex: getFlexVar('flex', 'auto')
    }
  },

  // Responsive patterns (για μελλοντική χρήση με breakpoints)
  responsive: {
    stackOnMobile: {
      // Desktop: row, Mobile: column
      display: 'flex',
      flexDirection: getFlexVar('direction', 'row'),
      '@media (max-width: 768px)': {
        flexDirection: getFlexVar('direction', 'column')
      }
    },
    reverseOnMobile: {
      // Desktop: normal order, Mobile: reverse
      display: 'flex',
      flexDirection: getFlexVar('direction', 'row'),
      '@media (max-width: 768px)': {
        flexDirection: getFlexVar('direction', 'row-reverse')
      }
    }
  }
} as const;

/**
 * Comprehensive flex system που καλύπτει όλα τα CSS flexbox properties
 */
export const COMPLETE_FLEX_SYSTEM = {
  // Direct CSS mappings
  css: {
    // Flex container properties
    display: 'flex',
    flexDirection: FLEX_SCALE.direction,
    flexWrap: FLEX_SCALE.wrap,
    justifyContent: FLEX_SCALE.justify,
    alignItems: FLEX_SCALE.align,
    alignContent: FLEX_SCALE.alignContent,
    gap: FLEX_SCALE.gap,

    // Flex item properties
    flex: FLEX_SCALE.flex,
    flexGrow: {
      0: '0',
      1: '1',
      2: '2',
      3: '3'
    },
    flexShrink: {
      0: '0',
      1: '1',
      2: '2',
      3: '3'
    },
    flexBasis: {
      auto: 'auto',
      0: '0',
      full: '100%',
      half: '50%',
      third: '33.333333%',
      quarter: '25%'
    },
    alignSelf: {
      auto: 'auto',
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline'
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5'
    }
  },

  // CSS custom properties
  vars: FLEX_CSS_VARS,

  // Utility functions
  utils: FLEX_UTILITIES
} as const;