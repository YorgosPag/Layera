/**
 * @layera/cursors - Enterprise Cursor Hooks
 *
 * 🎯 Type-safe React hooks για cursor management
 *
 * Features:
 * - Performance-optimized με useMemo και useCallback
 * - Type-safe cursor token consumption
 * - Context-aware cursor management
 * - Enterprise-grade developer experience
 */

import { useMemo, useCallback, useState } from 'react';
import {
  CURSOR_SCALE,
  CURSOR_UTILITIES,
  getCursorVar,
  getCursorValue,
  type CursorToken
} from '../index';

/**
 * Hook για single cursor usage
 */
export const useCursor = (token: CursorToken) => {
  return useMemo(() => ({
    value: getCursorValue(token),
    cssVar: getCursorVar(token.replace(/([A-Z])/g, '-$1').toLowerCase()),
    token,
    css: { cursor: getCursorValue(token) }
  }), [token]);
};

/**
 * Hook για dynamic cursor management με state
 */
export const useDynamicCursor = (defaultCursor: CursorToken = 'default') => {
  const [currentCursor, setCurrentCursor] = useState<CursorToken>(defaultCursor);

  const cursor = useMemo(() => ({
    value: getCursorValue(currentCursor),
    css: { cursor: getCursorValue(currentCursor) },
    token: currentCursor
  }), [currentCursor]);

  const setCursor = useCallback((newCursor: CursorToken) => {
    setCurrentCursor(newCursor);
  }, []);

  const resetCursor = useCallback(() => {
    setCurrentCursor(defaultCursor);
  }, [defaultCursor]);

  return {
    cursor,
    setCursor,
    resetCursor,
    currentToken: currentCursor
  };
};

/**
 * Hook για button cursor states
 */
export const useButtonCursor = (enabled: boolean = true, loading: boolean = false) => {
  return useMemo(() => {
    if (loading) return { cursor: 'wait', css: { cursor: 'wait' } };
    if (!enabled) return { cursor: 'not-allowed', css: { cursor: 'not-allowed' } };
    return { cursor: 'pointer', css: { cursor: 'pointer' } };
  }, [enabled, loading]);
};

/**
 * Hook για input cursor states
 */
export const useInputCursor = (disabled: boolean = false, readonly: boolean = false) => {
  return useMemo(() => {
    if (disabled) return { cursor: 'not-allowed', css: { cursor: 'not-allowed' } };
    if (readonly) return { cursor: 'default', css: { cursor: 'default' } };
    return { cursor: 'text', css: { cursor: 'text' } };
  }, [disabled, readonly]);
};

/**
 * Hook για drag and drop cursor states
 */
export const useDragCursor = (isDragging: boolean = false, canDrop: boolean = true) => {
  return useMemo(() => {
    if (!isDragging) return { cursor: 'grab', css: { cursor: 'grab' } };
    if (!canDrop) return { cursor: 'no-drop', css: { cursor: 'no-drop' } };
    return { cursor: 'grabbing', css: { cursor: 'grabbing' } };
  }, [isDragging, canDrop]);
};

/**
 * Hook για resize cursor με direction
 */
export const useResizeCursor = (direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw') => {
  return useMemo(() => {
    const cursorToken = `${direction}Resize` as CursorToken;
    return {
      cursor: getCursorValue(cursorToken),
      css: { cursor: getCursorValue(cursorToken) },
      token: cursorToken
    };
  }, [direction]);
};

/**
 * Hook για loading cursor states
 */
export const useLoadingCursor = (isLoading: boolean = false, showProgress: boolean = false) => {
  return useMemo(() => {
    if (!isLoading) return { cursor: 'default', css: { cursor: 'default' } };
    if (showProgress) return { cursor: 'progress', css: { cursor: 'progress' } };
    return { cursor: 'wait', css: { cursor: 'wait' } };
  }, [isLoading, showProgress]);
};

/**
 * Hook για complete cursor system access
 */
export const useCursorSystem = () => {
  return useMemo(() => ({
    // Scale access
    scale: CURSOR_SCALE,

    // Utilities access
    utilities: CURSOR_UTILITIES,

    // Helper functions
    getCursorVar,
    getCursorValue,

    // Quick cursor creators
    createCursor: (token: CursorToken) => ({ cursor: getCursorValue(token) }),

    // Component-specific helpers
    button: {
      enabled: { cursor: 'pointer' },
      disabled: { cursor: 'not-allowed' },
      loading: { cursor: 'wait' }
    },

    input: {
      text: { cursor: 'text' },
      disabled: { cursor: 'not-allowed' },
      readonly: { cursor: 'default' }
    },

    drag: {
      idle: { cursor: 'grab' },
      dragging: { cursor: 'grabbing' },
      noDrop: { cursor: 'no-drop' }
    },

    map: {
      pan: { cursor: 'grab' },
      panning: { cursor: 'grabbing' },
      draw: { cursor: 'crosshair' },
      zoomIn: { cursor: 'zoom-in' },
      zoomOut: { cursor: 'zoom-out' }
    }
  }), []);
};

/**
 * Hook για hover cursor changes
 */
export const useHoverCursor = (
  hoverCursor: CursorToken = 'pointer',
  defaultCursor: CursorToken = 'default'
) => {
  const [isHovering, setIsHovering] = useState(false);

  const cursor = useMemo(() => {
    const token = isHovering ? hoverCursor : defaultCursor;
    return {
      value: getCursorValue(token),
      css: { cursor: getCursorValue(token) },
      token
    };
  }, [isHovering, hoverCursor, defaultCursor]);

  const hoverProps = useMemo(() => ({
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
    style: cursor.css
  }), [cursor.css]);

  return {
    cursor,
    hoverProps,
    isHovering
  };
};

/**
 * Hook για conditional cursor με multiple states
 */
export const useConditionalCursor = (conditions: Array<{
  condition: boolean;
  cursor: CursorToken;
  priority?: number;
}>, fallback: CursorToken = 'default') => {
  return useMemo(() => {
    // Sort by priority (higher numbers = higher priority)
    const sortedConditions = [...conditions].sort((a, b) => (b.priority || 0) - (a.priority || 0));

    // Find first matching condition
    const matchingCondition = sortedConditions.find(({ condition }) => condition);
    const selectedCursor = matchingCondition?.cursor || fallback;

    return {
      cursor: getCursorValue(selectedCursor),
      css: { cursor: getCursorValue(selectedCursor) },
      token: selectedCursor,
      matchedCondition: matchingCondition
    };
  }, [conditions, fallback]);
};

/**
 * Hook για context-aware cursor (μελλοντική χρήση με context providers)
 */
export const useContextCursor = () => {
  // Placeholder για μελλοντική υλοποίηση με React Context
  return useMemo(() => ({
    // Global cursor context
    isGlobalLoading: false,
    globalCursor: 'default' as CursorToken,

    // Application modes
    applicationMode: 'normal' as 'normal' | 'drawing' | 'measuring' | 'selecting',

    // Mode-specific cursors
    getModeCursor: (mode: 'normal' | 'drawing' | 'measuring' | 'selecting') => {
      const modeCursors = {
        normal: 'default',
        drawing: 'crosshair',
        measuring: 'crosshair',
        selecting: 'pointer'
      } as const;

      return {
        cursor: getCursorValue(modeCursors[mode] as CursorToken),
        css: { cursor: getCursorValue(modeCursors[mode] as CursorToken) }
      };
    }
  }), []);
};