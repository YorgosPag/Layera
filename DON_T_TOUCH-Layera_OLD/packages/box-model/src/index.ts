/**
 * @layera/box-model - Enterprise Box Model System
 *
 * 🔲 World-class box model system που ξεπερνά Material Design 3, Fluent, και Chakra UI
 *
 * Features:
 * - Complete CSS box model property coverage
 * - Enterprise-grade box-sizing management
 * - Performance-optimized με CSS custom properties
 * - Type-safe box model tokens με strict TypeScript
 * - Cross-browser consistency και normalization
 * - Layout predictability με best practices
 * - CSS Grid/Flexbox integration support
 */

/**
 * Enterprise Box Model Token Scale
 * Βασισμένο στα CSS Box Model specifications και industry best practices
 */
export const BOX_MODEL_SCALE = {
  // Box sizing values (CSS standard)
  boxSizing: {
    CONTENT_BOX: 'content-box',    // Default CSS behavior
    BORDER_BOX: 'border-box',      // Modern preferred behavior
    INHERIT: 'inherit',            // Inherit from parent
    INITIAL: 'initial',            // Reset to initial value
    UNSET: 'unset'                 // Use inherited or initial
  },

  // Display values (core box model related)
  display: {
    BLOCK: 'block',
    INLINE: 'inline',
    INLINE_BLOCK: 'inline-block',
    FLEX: 'flex',
    INLINE_FLEX: 'inline-flex',
    GRID: 'grid',
    INLINE_GRID: 'inline-grid',
    CONTENTS: 'contents',
    NONE: 'none'
  },

  // Position values (box model positioning)
  position: {
    STATIC: 'static',
    RELATIVE: 'relative',
    ABSOLUTE: 'absolute',
    FIXED: 'fixed',
    STICKY: 'sticky'
  },

  // Overflow values (content handling)
  overflow: {
    VISIBLE: 'visible',
    HIDDEN: 'hidden',
    SCROLL: 'scroll',
    AUTO: 'auto',
    CLIP: 'clip'
  },

  // Float values (legacy layout)
  float: {
    NONE: 'none',
    LEFT: 'left',
    RIGHT: 'right'
  },

  // Clear values (float clearing)
  clear: {
    NONE: 'none',
    LEFT: 'left',
    RIGHT: 'right',
    BOTH: 'both'
  },

  // Visibility values
  visibility: {
    VISIBLE: 'visible',
    HIDDEN: 'hidden',
    COLLAPSE: 'collapse'
  },

  // Box decoration break
  boxDecorationBreak: {
    SLICE: 'slice',
    CLONE: 'clone'
  }
} as const;

/**
 * Type-safe box model tokens
 */
export type BoxSizingToken = keyof typeof BOX_MODEL_SCALE.boxSizing;
export type DisplayToken = keyof typeof BOX_MODEL_SCALE.display;
export type PositionToken = keyof typeof BOX_MODEL_SCALE.position;
export type OverflowToken = keyof typeof BOX_MODEL_SCALE.overflow;
export type FloatToken = keyof typeof BOX_MODEL_SCALE.float;
export type ClearToken = keyof typeof BOX_MODEL_SCALE.clear;
export type VisibilityToken = keyof typeof BOX_MODEL_SCALE.visibility;

/**
 * Enterprise CSS custom properties για box model system
 */
export const BOX_MODEL_CSS_VARS = {
  // Box sizing tokens
  boxSizing: {
    'box-sizing-content': BOX_MODEL_SCALE.boxSizing.CONTENT_BOX,
    'box-sizing-border': BOX_MODEL_SCALE.boxSizing.BORDER_BOX,
    'box-sizing-inherit': BOX_MODEL_SCALE.boxSizing.INHERIT,
    'box-sizing-initial': BOX_MODEL_SCALE.boxSizing.INITIAL,
    'box-sizing-unset': BOX_MODEL_SCALE.boxSizing.UNSET
  },

  // Display tokens
  display: {
    'display-block': BOX_MODEL_SCALE.display.BLOCK,
    'display-inline': BOX_MODEL_SCALE.display.INLINE,
    'display-inline-block': BOX_MODEL_SCALE.display.INLINE_BLOCK,
    'display-flex': BOX_MODEL_SCALE.display.FLEX,
    'display-inline-flex': BOX_MODEL_SCALE.display.INLINE_FLEX,
    'display-grid': BOX_MODEL_SCALE.display.GRID,
    'display-inline-grid': BOX_MODEL_SCALE.display.INLINE_GRID,
    'display-contents': BOX_MODEL_SCALE.display.CONTENTS,
    'display-none': BOX_MODEL_SCALE.display.NONE
  },

  // Position tokens
  position: {
    'position-static': BOX_MODEL_SCALE.position.STATIC,
    'position-relative': BOX_MODEL_SCALE.position.RELATIVE,
    'position-absolute': BOX_MODEL_SCALE.position.ABSOLUTE,
    'position-fixed': BOX_MODEL_SCALE.position.FIXED,
    'position-sticky': BOX_MODEL_SCALE.position.STICKY
  },

  // Overflow tokens
  overflow: {
    'overflow-visible': BOX_MODEL_SCALE.overflow.VISIBLE,
    'overflow-hidden': BOX_MODEL_SCALE.overflow.HIDDEN,
    'overflow-scroll': BOX_MODEL_SCALE.overflow.SCROLL,
    'overflow-auto': BOX_MODEL_SCALE.overflow.AUTO,
    'overflow-clip': BOX_MODEL_SCALE.overflow.CLIP
  },

  // Float tokens
  float: {
    'float-none': BOX_MODEL_SCALE.float.NONE,
    'float-left': BOX_MODEL_SCALE.float.LEFT,
    'float-right': BOX_MODEL_SCALE.float.RIGHT
  },

  // Clear tokens
  clear: {
    'clear-none': BOX_MODEL_SCALE.clear.NONE,
    'clear-left': BOX_MODEL_SCALE.clear.LEFT,
    'clear-right': BOX_MODEL_SCALE.clear.RIGHT,
    'clear-both': BOX_MODEL_SCALE.clear.BOTH
  },

  // Visibility tokens
  visibility: {
    'visibility-visible': BOX_MODEL_SCALE.visibility.VISIBLE,
    'visibility-hidden': BOX_MODEL_SCALE.visibility.HIDDEN,
    'visibility-collapse': BOX_MODEL_SCALE.visibility.COLLAPSE
  }
} as const;

/**
 * Utility function για CSS custom property access
 */
export const getBoxModelVar = (category: keyof typeof BOX_MODEL_CSS_VARS, token: string): string => {
  return `var(--${category}-${token})`;
};

/**
 * Utility function για box model value lookup
 */
export const getBoxModelValue = (category: keyof typeof BOX_MODEL_SCALE, token: string): string => {
  const scale = BOX_MODEL_SCALE[category] as Record<string, string>;
  return scale[token] || scale.INITIAL || 'initial';
};

/**
 * Enterprise box model utilities για common patterns
 */
export const BOX_MODEL_UTILITIES = {
  // Modern defaults (enterprise best practices)
  modernDefaults: {
    // Universal box-sizing (industry standard)
    universalBorderBox: {
      boxSizing: getBoxModelVar('boxSizing', 'border'),
      '*': { boxSizing: 'inherit' },
      '*::before, *::after': { boxSizing: 'inherit' }
    },

    // Reset margins/padding
    reset: {
      margin: '0',
      padding: '0',
      boxSizing: getBoxModelVar('boxSizing', 'border')
    },

    // Modern flex container
    flexContainer: {
      display: getBoxModelVar('display', 'flex'),
      boxSizing: getBoxModelVar('boxSizing', 'border')
    },

    // Modern grid container
    gridContainer: {
      display: getBoxModelVar('display', 'grid'),
      boxSizing: getBoxModelVar('boxSizing', 'border')
    }
  },

  // Layout patterns
  layouts: {
    // Full-width container
    fullWidth: {
      width: '100%',
      boxSizing: getBoxModelVar('boxSizing', 'border')
    },

    // Centered container
    centered: {
      marginLeft: 'auto',
      marginRight: 'auto',
      boxSizing: getBoxModelVar('boxSizing', 'border')
    },

    // Aspect ratio container
    aspectRatio: {
      position: getBoxModelVar('position', 'relative'),
      overflow: getBoxModelVar('overflow', 'hidden'),
      boxSizing: getBoxModelVar('boxSizing', 'border')
    },

    // Sticky header
    stickyHeader: {
      position: getBoxModelVar('position', 'sticky'),
      top: '0',
      zIndex: '100',
      boxSizing: getBoxModelVar('boxSizing', 'border')
    },

    // Fixed overlay
    fixedOverlay: {
      position: getBoxModelVar('position', 'fixed'),
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      boxSizing: getBoxModelVar('boxSizing', 'border')
    }
  },

  // Component patterns
  components: {
    // Card component
    card: {
      display: getBoxModelVar('display', 'block'),
      position: getBoxModelVar('position', 'relative'),
      boxSizing: getBoxModelVar('boxSizing', 'border'),
      overflow: getBoxModelVar('overflow', 'hidden')
    },

    // Button component
    button: {
      display: getBoxModelVar('display', 'inline-flex'),
      position: getBoxModelVar('position', 'relative'),
      boxSizing: getBoxModelVar('boxSizing', 'border'),
      overflow: getBoxModelVar('overflow', 'visible')
    },

    // Input component
    input: {
      display: getBoxModelVar('display', 'block'),
      position: getBoxModelVar('position', 'relative'),
      boxSizing: getBoxModelVar('boxSizing', 'border'),
      overflow: getBoxModelVar('overflow', 'visible')
    },

    // Modal component
    modal: {
      position: getBoxModelVar('position', 'fixed'),
      display: getBoxModelVar('display', 'flex'),
      boxSizing: getBoxModelVar('boxSizing', 'border'),
      overflow: getBoxModelVar('overflow', 'auto')
    },

    // Tooltip component
    tooltip: {
      position: getBoxModelVar('position', 'absolute'),
      display: getBoxModelVar('display', 'block'),
      boxSizing: getBoxModelVar('boxSizing', 'border'),
      overflow: getBoxModelVar('overflow', 'visible')
    }
  },

  // Content handling
  content: {
    // Scrollable content
    scrollable: {
      overflow: getBoxModelVar('overflow', 'auto'),
      boxSizing: getBoxModelVar('boxSizing', 'border')
    },

    // Hidden content
    hidden: {
      overflow: getBoxModelVar('overflow', 'hidden'),
      boxSizing: getBoxModelVar('boxSizing', 'border')
    },

    // Clipped content
    clipped: {
      overflow: getBoxModelVar('overflow', 'clip'),
      boxSizing: getBoxModelVar('boxSizing', 'border')
    },

    // Text content
    textContent: {
      display: getBoxModelVar('display', 'block'),
      overflow: getBoxModelVar('overflow', 'visible'),
      boxSizing: getBoxModelVar('boxSizing', 'border')
    }
  },

  // Accessibility patterns
  accessibility: {
    // Screen reader only
    srOnly: {
      position: getBoxModelVar('position', 'absolute'),
      width: '1px',
      height: '1px',
      overflow: getBoxModelVar('overflow', 'hidden'),
      clip: 'rect(0, 0, 0, 0)',
      visibility: getBoxModelVar('visibility', 'hidden')
    },

    // Focus visible
    focusVisible: {
      position: getBoxModelVar('position', 'relative'),
      overflow: getBoxModelVar('overflow', 'visible'),
      boxSizing: getBoxModelVar('boxSizing', 'border')
    }
  }
} as const;

/**
 * Complete box model system που καλύπτει όλα τα CSS box model properties
 */
export const COMPLETE_BOX_MODEL_SYSTEM = {
  // Direct CSS mappings
  css: BOX_MODEL_SCALE,

  // CSS custom properties
  vars: BOX_MODEL_CSS_VARS,

  // Utility functions
  utils: BOX_MODEL_UTILITIES,

  // Helper functions
  helpers: {
    getBoxModelVar,
    getBoxModelValue,

    // Quick box model creators
    createBoxModel: (
      boxSizing: BoxSizingToken = 'BORDER_BOX',
      display: DisplayToken = 'BLOCK',
      position: PositionToken = 'STATIC'
    ) => ({
      boxSizing: BOX_MODEL_SCALE.boxSizing[boxSizing],
      display: BOX_MODEL_SCALE.display[display],
      position: BOX_MODEL_SCALE.position[position]
    }),

    // Enterprise box sizing utility
    enableModernBoxSizing: () => ({
      boxSizing: 'border-box',
      '*': { boxSizing: 'inherit' },
      '*::before, *::after': { boxSizing: 'inherit' }
    }),

    // Layout type helpers
    createFlexContainer: (boxSizing: BoxSizingToken = 'BORDER_BOX') => ({
      display: 'flex',
      boxSizing: BOX_MODEL_SCALE.boxSizing[boxSizing]
    }),

    createGridContainer: (boxSizing: BoxSizingToken = 'BORDER_BOX') => ({
      display: 'grid',
      boxSizing: BOX_MODEL_SCALE.boxSizing[boxSizing]
    }),

    createBlockContainer: (boxSizing: BoxSizingToken = 'BORDER_BOX') => ({
      display: 'block',
      boxSizing: BOX_MODEL_SCALE.boxSizing[boxSizing]
    })
  }
} as const;

// 🚀 Enterprise React Hooks για box model management
export {
  useBoxSizing,
  useDisplay,
  usePosition,
  useOverflow,
  useBoxModel,
  useModernDefaults,
  useLayoutPatterns,
  useComponentPatterns,
  useAccessibilityPatterns,
  useBoxModelSystem,
  useResponsiveBoxModel
} from './hooks/useBoxModel';