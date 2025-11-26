/**
 * 🔄 LAYERA DRAGGABLE CLASS
 *
 * Draggable System class που διαχειρίζεται όλες τις draggable λειτουργίες
 * Enterprise-grade draggable management για το Layera Design System
 * React 19.1.1 compatible - TypeScript strict mode
 */

import { DRAGGABLE_VARIABLES } from './draggable.variables';
import type {
  DragState,
  DropZoneState,
  DragAxis,
  DragConstraint,
  SortableDirection,
  DragAction,
  DraggableSystemStructure
} from './draggable.variables';

/**
 * 🔄 DraggableSystem - Κεντρικό σύστημα διαχείρισης draggable tokens
 *
 * Παρέχει:
 * - Unified draggable token management
 * - Type-safe drag & drop interfaces
 * - Enterprise draggable patterns
 * - React 19.1.1 compatibility
 * - Accessibility support
 */
export class DraggableSystem {
  private static instance: DraggableSystem;

  private constructor() {}

  public static getInstance(): DraggableSystem {
    if (!DraggableSystem.instance) {
      DraggableSystem.instance = new DraggableSystem();
    }
    return DraggableSystem.instance;
  }

  /**
   * Παίρνει draggable tokens για συγκεκριμένο state
   */
  public getDragStateTokens(state: DragState): Record<string, string> {
    const baseTokens = {
      background: DRAGGABLE_VARIABLES[`drag-${state}-background` as keyof typeof DRAGGABLE_VARIABLES],
      border: DRAGGABLE_VARIABLES[`drag-${state}-border` as keyof typeof DRAGGABLE_VARIABLES],
      shadow: DRAGGABLE_VARIABLES[`drag-${state}-shadow` as keyof typeof DRAGGABLE_VARIABLES],
      transform: DRAGGABLE_VARIABLES[`drag-${state}-transform` as keyof typeof DRAGGABLE_VARIABLES],
      opacity: DRAGGABLE_VARIABLES[`drag-${state}-opacity` as keyof typeof DRAGGABLE_VARIABLES],
    };

    return baseTokens;
  }

  /**
   * Παίρνει drop zone tokens για συγκεκριμένο state
   */
  public getDropZoneTokens(state: DropZoneState): Record<string, string> {
    const suffix = state === 'idle' ? '' : `-${state}`;

    return {
      background: DRAGGABLE_VARIABLES[`drop-zone-background${suffix}` as keyof typeof DRAGGABLE_VARIABLES] || DRAGGABLE_VARIABLES['drop-zone-background'],
      border: DRAGGABLE_VARIABLES[`drop-zone-border${suffix}` as keyof typeof DRAGGABLE_VARIABLES] || DRAGGABLE_VARIABLES['drop-zone-border'],
      borderStyle: DRAGGABLE_VARIABLES['drop-zone-border-style'],
      borderRadius: DRAGGABLE_VARIABLES['drop-zone-border-radius'],
      padding: DRAGGABLE_VARIABLES['drop-zone-padding'],
      minHeight: DRAGGABLE_VARIABLES['drop-zone-min-height'],
      textColor: state === 'hover' ? DRAGGABLE_VARIABLES['drop-zone-text-hover'] : DRAGGABLE_VARIABLES['drop-zone-text-color'],
    };
  }

  /**
   * Παίρνει cursor για συγκεκριμένο axis
   */
  public getDragCursor(axis: DragAxis, isActive = false): string {
    if (isActive) {
      return DRAGGABLE_VARIABLES['drag-handle-cursor-active'];
    }

    switch (axis) {
      case 'x':
        return DRAGGABLE_VARIABLES['drag-axis-x-cursor'];
      case 'y':
        return DRAGGABLE_VARIABLES['drag-axis-y-cursor'];
      case 'both':
        return DRAGGABLE_VARIABLES['drag-axis-both-cursor'];
      case 'none':
      default:
        return DRAGGABLE_VARIABLES['drag-disabled-cursor'];
    }
  }

  /**
   * Παίρνει sortable tokens για συγκεκριμένη κατεύθυνση
   */
  public getSortableTokens(direction: SortableDirection): Record<string, string> {
    const baseTokens = {
      background: DRAGGABLE_VARIABLES['sortable-list-background'],
      padding: DRAGGABLE_VARIABLES['sortable-list-padding'],
      borderRadius: DRAGGABLE_VARIABLES['sortable-list-border-radius'],
      gap: DRAGGABLE_VARIABLES['sortable-item-gap'],
    };

    const directionTokens = {
      flexDirection: direction === 'horizontal' ? 'row' : direction === 'vertical' ? 'column' : undefined,
      display: direction === 'grid' ? 'grid' : 'flex',
    };

    return { ...baseTokens, ...directionTokens };
  }

  /**
   * Παίρνει accessibility tokens
   */
  public getAccessibilityTokens(): Record<string, string> {
    return {
      focusOutline: DRAGGABLE_VARIABLES['drag-focus-outline'],
      focusOutlineOffset: DRAGGABLE_VARIABLES['drag-focus-outline-offset'],
      focusOutlineWidth: DRAGGABLE_VARIABLES['drag-focus-outline-width'],
      keyboardIndicator: DRAGGABLE_VARIABLES['drag-keyboard-indicator'],
      screenReaderText: DRAGGABLE_VARIABLES['drag-screen-reader-text'],
    };
  }

  /**
   * Παίρνει performance tokens για GPU acceleration
   */
  public getPerformanceTokens(): Record<string, string> {
    return {
      transform: DRAGGABLE_VARIABLES['drag-transform-gpu'],
      willChange: DRAGGABLE_VARIABLES['drag-will-change'],
      backfaceVisibility: DRAGGABLE_VARIABLES['drag-backface-visibility'],
    };
  }

  /**
   * Validates draggable configuration
   */
  public validateDraggableConfig(config: {
    axis?: DragAxis;
    constraint?: DragConstraint;
    action?: DragAction;
  }): boolean {
    const { axis = 'both', constraint = 'none', action = 'move' } = config;

    // Basic validation
    const validAxes: DragAxis[] = ['x', 'y', 'both', 'none'];
    const validConstraints: DragConstraint[] = ['none', 'parent', 'window', 'custom'];
    const validActions: DragAction[] = ['move', 'copy', 'link', 'none'];

    return (
      validAxes.includes(axis) &&
      validConstraints.includes(constraint) &&
      validActions.includes(action)
    );
  }

  /**
   * Παίρνει το πλήρες draggable system structure
   */
  public getSystemStructure(): DraggableSystemStructure {
    return {
      draggable: {
        container: {
          background: DRAGGABLE_VARIABLES['draggable-container-background'],
          border: DRAGGABLE_VARIABLES['draggable-container-border'],
          borderRadius: DRAGGABLE_VARIABLES['draggable-container-border-radius'],
          padding: DRAGGABLE_VARIABLES['draggable-container-padding'],
          shadow: DRAGGABLE_VARIABLES['draggable-container-shadow'],
          transition: DRAGGABLE_VARIABLES['draggable-container-transition'],
        },
        states: {
          idle: this.getDragStateTokens('idle'),
          hover: this.getDragStateTokens('hover'),
          active: this.getDragStateTokens('active'),
          dragging: this.getDragStateTokens('dragging'),
        },
        handle: {
          color: DRAGGABLE_VARIABLES['drag-handle-color'],
          colorHover: DRAGGABLE_VARIABLES['drag-handle-color-hover'],
          colorActive: DRAGGABLE_VARIABLES['drag-handle-color-active'],
          size: DRAGGABLE_VARIABLES['drag-handle-size'],
          cursor: DRAGGABLE_VARIABLES['drag-handle-cursor'],
          cursorActive: DRAGGABLE_VARIABLES['drag-handle-cursor-active'],
          background: DRAGGABLE_VARIABLES['drag-handle-background'],
          backgroundHover: DRAGGABLE_VARIABLES['drag-handle-background-hover'],
        },
        ghost: {
          background: DRAGGABLE_VARIABLES['drag-ghost-background'],
          border: DRAGGABLE_VARIABLES['drag-ghost-border'],
          opacity: DRAGGABLE_VARIABLES['drag-ghost-opacity'],
          transform: DRAGGABLE_VARIABLES['drag-ghost-transform'],
          shadow: DRAGGABLE_VARIABLES['drag-ghost-shadow'],
        },
      },
      dropZone: {
        container: {
          background: DRAGGABLE_VARIABLES['drop-zone-background'],
          border: DRAGGABLE_VARIABLES['drop-zone-border'],
          borderStyle: DRAGGABLE_VARIABLES['drop-zone-border-style'],
          borderRadius: DRAGGABLE_VARIABLES['drop-zone-border-radius'],
          padding: DRAGGABLE_VARIABLES['drop-zone-padding'],
          minHeight: DRAGGABLE_VARIABLES['drop-zone-min-height'],
          textColor: DRAGGABLE_VARIABLES['drop-zone-text-color'],
          textHover: DRAGGABLE_VARIABLES['drop-zone-text-hover'],
        },
        states: {
          idle: this.getDropZoneTokens('idle'),
          hover: this.getDropZoneTokens('hover'),
          active: this.getDropZoneTokens('active'),
          error: this.getDropZoneTokens('error'),
          success: this.getDropZoneTokens('success'),
        },
        indicator: {
          color: DRAGGABLE_VARIABLES['drop-indicator-color'],
          width: DRAGGABLE_VARIABLES['drop-indicator-width'],
          style: DRAGGABLE_VARIABLES['drop-indicator-style'],
          background: DRAGGABLE_VARIABLES['drop-indicator-background'],
          opacity: DRAGGABLE_VARIABLES['drop-indicator-opacity'],
          radius: DRAGGABLE_VARIABLES['drop-indicator-radius'],
        },
      },
      sortable: {
        list: {
          background: DRAGGABLE_VARIABLES['sortable-list-background'],
          padding: DRAGGABLE_VARIABLES['sortable-list-padding'],
          borderRadius: DRAGGABLE_VARIABLES['sortable-list-border-radius'],
        },
        item: {
          gap: DRAGGABLE_VARIABLES['sortable-item-gap'],
          margin: DRAGGABLE_VARIABLES['sortable-item-margin'],
        },
        reorder: {
          transition: DRAGGABLE_VARIABLES['reorder-transition'],
          duration: DRAGGABLE_VARIABLES['reorder-duration'],
          easing: DRAGGABLE_VARIABLES['reorder-easing'],
          transform: DRAGGABLE_VARIABLES['reorder-transform'],
        },
      },
      accessibility: {
        focus: {
          outline: DRAGGABLE_VARIABLES['drag-focus-outline'],
          outlineOffset: DRAGGABLE_VARIABLES['drag-focus-outline-offset'],
          outlineWidth: DRAGGABLE_VARIABLES['drag-focus-outline-width'],
        },
        keyboard: {
          indicator: DRAGGABLE_VARIABLES['drag-keyboard-indicator'],
        },
        screenReader: {
          text: DRAGGABLE_VARIABLES['drag-screen-reader-text'],
        },
      },
    };
  }
}

// Semantic rules για draggable usage
export const DRAGGABLE_SEMANTIC_RULES = {
  // Drag handle requirements
  handle: {
    minSize: '24px',
    maxSize: '48px',
    position: 'accessible',
    indication: 'visual-clear',
  },

  // Drop zone requirements
  dropZone: {
    minSize: '48px',
    indication: 'visual-feedback',
    states: 'hover-active-error',
    accessibility: 'keyboard-screen-reader',
  },

  // Animation constraints
  animation: {
    maxDuration: '300ms',
    easing: 'ease-in-out',
    performance: 'gpu-accelerated',
    reducedMotion: 'respect-preference',
  },

  // Accessibility requirements
  accessibility: {
    keyboardNav: 'required',
    screenReader: 'announced',
    focusManagement: 'maintained',
    colorContrast: 'wcag-aa',
  },
} as const;

// CSS Variables Export για automatic compilation
export const LAYERA_DRAGGABLE_CSS = Object.entries(DRAGGABLE_VARIABLES)
  .map(([key, value]) => `  --layera-${key}: ${value};`)
  .join('\n');

// Default export της DraggableSystem instance
export const draggableSystem = DraggableSystem.getInstance();