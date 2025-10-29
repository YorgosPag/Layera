/**
 * @layera/box-model - Enterprise Box Model Hooks
 *
 * 🔲 Type-safe React hooks για box model management
 *
 * Features:
 * - Performance-optimized με useMemo και useCallback
 * - Type-safe box model token consumption
 * - Modern box-sizing defaults
 * - Enterprise-grade layout patterns
 */

import { useMemo, useCallback } from 'react';
import {
  BOX_MODEL_SCALE,
  BOX_MODEL_UTILITIES,
  getBoxModelVar,
  getBoxModelValue,
  type BoxSizingToken,
  type DisplayToken,
  type PositionToken,
  type OverflowToken
} from '../index';

/**
 * Hook για box sizing management
 */
export const useBoxSizing = (boxSizing: BoxSizingToken = 'BORDER_BOX') => {
  return useMemo(() => ({
    value: BOX_MODEL_SCALE.boxSizing[boxSizing],
    css: { boxSizing: BOX_MODEL_SCALE.boxSizing[boxSizing] },
    token: boxSizing,
    cssVar: getBoxModelVar('boxSizing', boxSizing.toLowerCase().replace('_', '-'))
  }), [boxSizing]);
};

/**
 * Hook για display property management
 */
export const useDisplay = (display: DisplayToken = 'BLOCK') => {
  return useMemo(() => ({
    value: BOX_MODEL_SCALE.display[display],
    css: { display: BOX_MODEL_SCALE.display[display] },
    token: display,
    cssVar: getBoxModelVar('display', display.toLowerCase().replace('_', '-'))
  }), [display]);
};

/**
 * Hook για position property management
 */
export const usePosition = (position: PositionToken = 'STATIC') => {
  return useMemo(() => ({
    value: BOX_MODEL_SCALE.position[position],
    css: { position: BOX_MODEL_SCALE.position[position] },
    token: position,
    cssVar: getBoxModelVar('position', position.toLowerCase())
  }), [position]);
};

/**
 * Hook για overflow property management
 */
export const useOverflow = (overflow: OverflowToken = 'VISIBLE') => {
  return useMemo(() => ({
    value: BOX_MODEL_SCALE.overflow[overflow],
    css: { overflow: BOX_MODEL_SCALE.overflow[overflow] },
    token: overflow,
    cssVar: getBoxModelVar('overflow', overflow.toLowerCase())
  }), [overflow]);
};

/**
 * Hook για complete box model configuration
 */
export const useBoxModel = (options: {
  boxSizing?: BoxSizingToken;
  display?: DisplayToken;
  position?: PositionToken;
  overflow?: OverflowToken;
} = {}) => {
  return useMemo(() => {
    const {
      boxSizing = 'BORDER_BOX',
      display = 'BLOCK',
      position = 'STATIC',
      overflow = 'VISIBLE'
    } = options;

    return {
      css: {
        boxSizing: BOX_MODEL_SCALE.boxSizing[boxSizing],
        display: BOX_MODEL_SCALE.display[display],
        position: BOX_MODEL_SCALE.position[position],
        overflow: BOX_MODEL_SCALE.overflow[overflow]
      },
      tokens: {
        boxSizing,
        display,
        position,
        overflow
      },
      values: {
        boxSizing: BOX_MODEL_SCALE.boxSizing[boxSizing],
        display: BOX_MODEL_SCALE.display[display],
        position: BOX_MODEL_SCALE.position[position],
        overflow: BOX_MODEL_SCALE.overflow[overflow]
      }
    };
  }, [options.boxSizing, options.display, options.position, options.overflow]);
};

/**
 * Hook για modern defaults (enterprise best practices)
 */
export const useModernDefaults = (): void => {
  return useMemo(() => ({
    // Universal border-box (industry standard)
    universalBorderBox: {
      boxSizing: 'border-box' as const,
      '*, *::before, *::after': {
        boxSizing: 'inherit' as const
      }
    },

    // Modern flex container
    flexContainer: {
      display: 'flex' as const,
      boxSizing: 'border-box' as const
    },

    // Modern grid container
    gridContainer: {
      display: 'grid' as const,
      boxSizing: 'border-box' as const
    },

    // Reset margins/padding
    reset: {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box' as const
    }
  }), []);
};

/**
 * Hook για layout patterns
 */
export const useLayoutPatterns = (): void => {
  return useMemo(() => ({
    // Full width container
    fullWidth: {
      width: '100%',
      boxSizing: 'border-box' as const
    },

    // Centered container
    centered: {
      marginLeft: 'auto',
      marginRight: 'auto',
      boxSizing: 'border-box' as const
    },

    // Aspect ratio container
    aspectRatio: {
      position: 'relative' as const,
      overflow: 'hidden' as const,
      boxSizing: 'border-box' as const
    },

    // Sticky header
    stickyHeader: {
      position: 'sticky' as const,
      top: 0,
      zIndex: 100,
      boxSizing: 'border-box' as const
    },

    // Fixed overlay
    fixedOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      boxSizing: 'border-box' as const
    },

    // Scrollable container
    scrollable: {
      overflow: 'auto' as const,
      boxSizing: 'border-box' as const
    }
  }), []);
};

/**
 * Hook για component patterns
 */
export const useComponentPatterns = (): void => {
  return useMemo(() => ({
    // Card component
    card: {
      display: 'block' as const,
      position: 'relative' as const,
      boxSizing: 'border-box' as const,
      overflow: 'hidden' as const
    },

    // Button component
    button: {
      display: 'inline-flex' as const,
      position: 'relative' as const,
      boxSizing: 'border-box' as const,
      overflow: 'visible' as const
    },

    // Input component
    input: {
      display: 'block' as const,
      position: 'relative' as const,
      boxSizing: 'border-box' as const,
      overflow: 'visible' as const
    },

    // Modal component
    modal: {
      position: 'fixed' as const,
      display: 'flex' as const,
      boxSizing: 'border-box' as const,
      overflow: 'auto' as const
    },

    // Tooltip component
    tooltip: {
      position: 'absolute' as const,
      display: 'block' as const,
      boxSizing: 'border-box' as const,
      overflow: 'visible' as const
    }
  }), []);
};

/**
 * Hook για accessibility patterns
 */
export const useAccessibilityPatterns = (): void => {
  return useMemo(() => ({
    // Screen reader only
    srOnly: {
      position: 'absolute' as const,
      width: '1px',
      height: '1px',
      overflow: 'hidden' as const,
      clip: 'rect(0, 0, 0, 0)',
      visibility: 'hidden' as const,
      border: 0,
      margin: 0,
      padding: 0
    },

    // Focus visible
    focusVisible: {
      position: 'relative' as const,
      overflow: 'visible' as const,
      boxSizing: 'border-box' as const
    },

    // Skip link
    skipLink: {
      position: 'absolute' as const,
      top: '-40px',
      left: '6px',
      boxSizing: 'border-box' as const,
      '&:focus': {
        top: '6px'
      }
    }
  }), []);
};

/**
 * Hook για complete box model system access
 */
export const useBoxModelSystem = (): void => {
  return useMemo(() => ({
    // Scale access
    scale: BOX_MODEL_SCALE,

    // Utilities access
    utilities: BOX_MODEL_UTILITIES,

    // Helper functions
    getBoxModelVar,
    getBoxModelValue,

    // Pattern hooks
    modernDefaults: useModernDefaults(),
    layoutPatterns: useLayoutPatterns(),
    componentPatterns: useComponentPatterns(),
    accessibilityPatterns: useAccessibilityPatterns(),

    // Quick creators
    createBoxModel: (
      boxSizing: BoxSizingToken = 'BORDER_BOX',
      display: DisplayToken = 'BLOCK',
      position: PositionToken = 'STATIC'
    ) => ({
      boxSizing: BOX_MODEL_SCALE.boxSizing[boxSizing],
      display: BOX_MODEL_SCALE.display[display],
      position: BOX_MODEL_SCALE.position[position]
    }),

    createFlexContainer: (boxSizing: BoxSizingToken = 'BORDER_BOX') => ({
      display: 'flex' as const,
      boxSizing: BOX_MODEL_SCALE.boxSizing[boxSizing]
    }),

    createGridContainer: (boxSizing: BoxSizingToken = 'BORDER_BOX') => ({
      display: 'grid' as const,
      boxSizing: BOX_MODEL_SCALE.boxSizing[boxSizing]
    })
  }), []);
};

/**
 * Hook για responsive box model (μελλοντική χρήση με breakpoints)
 */
export const useResponsiveBoxModel = (): void => {
  return useMemo(() => ({
    // Mobile patterns
    mobile: {
      fullWidth: {
        width: '100%',
        boxSizing: 'border-box' as const
      },
      stack: {
        display: 'block' as const,
        boxSizing: 'border-box' as const
      }
    },

    // Tablet patterns
    tablet: {
      flexContainer: {
        display: 'flex' as const,
        boxSizing: 'border-box' as const
      }
    },

    // Desktop patterns
    desktop: {
      gridContainer: {
        display: 'grid' as const,
        boxSizing: 'border-box' as const
      }
    }
  }), []);
};