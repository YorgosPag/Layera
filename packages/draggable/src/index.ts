/**
 * @layera/draggable - Enterprise Draggable System
 *
 * Συνολικό export για όλα τα draggable functionality του Layera ecosystem
 * Ακολουθεί LEGO design principles για maximum reusability
 */

// ===============================
// Core Types Export
// ===============================

export type {
  // Position Types
  DraggablePosition,
  DraggablePositionRightBottom,
  DraggableBounds,

  // Configuration Types
  DraggableConfig,
  AdvancedDraggableConfig,
  DraggablePerformanceConfig,
  DraggableA11yConfig,

  // Event Types
  DragEventData,
  DragEventHandlers,

  // Hook Return Types
  UseDraggableReturn,
  UseDraggableRightBottomReturn,

  // Component Props Types
  DraggableWrapperProps,
  // Note: DraggableFABProps is in @layera/draggable-fab package

  // Theme Types
  DraggableTheme,
  DraggableSizeConfig,
  DraggableThemeSystem,

  // Utility Types
  DraggableError,
  DraggableResult
} from './types';

// ===============================
// Hooks Export
// ===============================

export {
  useDraggable,
  useDraggableRightBottom
} from './hooks/useDraggable';

// ===============================
// Components Export
// ===============================

// Note: DraggableFAB component is located in @layera/draggable-fab package
// This package provides only the core utilities and hooks

// ===============================
// Utility Functions Export
// ===============================

// Import the types for utility functions
import type { DraggableConfig, DraggableBounds } from './types';


/**
 * Utility function για δημιουργία default DraggableConfig
 */
export const createDraggableConfig = (overrides: Partial<DraggableConfig> = {}): DraggableConfig => ({
  disabled: false,
  axis: 'both',
  dragThreshold: 5,
  enableTransition: true,
  constrainToParent: true,
  ...overrides
});

/**
 * Utility function για δημιουργία boundary constraints
 */
export const createBounds = (
  minX?: number,
  maxX?: number,
  minY?: number,
  maxY?: number
): DraggableBounds => {
  return {
    ...(minX !== undefined && { minX }),
    ...(maxX !== undefined && { maxX }),
    ...(minY !== undefined && { minY }),
    ...(maxY !== undefined && { maxY })
  };
};

/**
 * Utility function για δημιουργία right/bottom bounds
 */
export const createRightBottomBounds = (
  minRight?: number,
  maxRight?: number,
  minBottom?: number,
  maxBottom?: number
): DraggableBounds => {
  return {
    ...(minRight !== undefined && { minRight }),
    ...(maxRight !== undefined && { maxRight }),
    ...(minBottom !== undefined && { minBottom }),
    ...(maxBottom !== undefined && { maxBottom })
  };
};

// ===============================
// Constants Export
// ===============================

/**
 * Default configurations για common use cases
 */
export const DRAGGABLE_DEFAULTS = {
  // Standard draggable config
  STANDARD: createDraggableConfig(),

  // Horizontal only dragging
  HORIZONTAL_ONLY: createDraggableConfig({ axis: 'x' }),

  // Vertical only dragging
  VERTICAL_ONLY: createDraggableConfig({ axis: 'y' }),

  // High precision dragging (lower threshold)
  HIGH_PRECISION: createDraggableConfig({ dragThreshold: 2 }),

  // Mobile optimized (higher threshold)
  MOBILE_OPTIMIZED: createDraggableConfig({ dragThreshold: 10 }),

  // Disabled transitions για performance
  PERFORMANCE_MODE: createDraggableConfig({ enableTransition: false })
} as const;

/**
 * Default FAB positions για different layouts
 */
export const FAB_POSITIONS = {
  BOTTOM_RIGHT: { right: 15, bottom: 15 },
  BOTTOM_LEFT: { right: 15, bottom: 15 }, // Note: DraggableFAB uses right/bottom
  BOTTOM_CENTER: { right: typeof window !== 'undefined' && window?.innerWidth ? window.innerWidth / 2 - 28 : 200, bottom: 15 },
  TOP_RIGHT: { right: 15, bottom: typeof window !== 'undefined' && window?.innerHeight ? window.innerHeight - 71 : 600 },
  CENTER: {
    right: typeof window !== 'undefined' && window?.innerWidth ? window.innerWidth / 2 - 28 : 200,
    bottom: typeof window !== 'undefined' && window?.innerHeight ? window.innerHeight / 2 - 28 : 300
  }
} as const;

// ===============================
// Event Handling Utilities Export
// ===============================

/**
 * Event handling utilities για drag/click separation - Single Source of Truth
 * Αντικαθιστά duplicates από DraggableFAB και UnifiedFAB components
 */

/**
 * Utility function για blocking όλων των event handlers
 * Χρησιμοποιείται για πλήρη event isolation κατά το dragging
 * Pattern από useDraggable.ts - Single Source of Truth
 */
export const stopAll = (e: React.SyntheticEvent): void => {
  e.stopPropagation();
  e.preventDefault(); // Pattern από useDraggable hook
};

/**
 * Global click suppression utility
 * Προσθέτει event listener στο window που καταναλώνει το επόμενο click
 */
export const swallowNextWindowClick = (): void => {
  const f = (e: Event) => {
    e.stopPropagation();
    e.preventDefault(); // Native Event pattern - διαφορετικό από React SyntheticEvent
    window.removeEventListener('click', f, true);
  };
  window.addEventListener('click', f, true);
};

/**
 * Legacy utility για click suppression
 * Maintained για backward compatibility
 */
export const killNextClick = swallowNextWindowClick;

// ===============================
// Version Information
// ===============================

export const PACKAGE_VERSION = '1.0.0';
export const PACKAGE_NAME = '@layera/draggable';