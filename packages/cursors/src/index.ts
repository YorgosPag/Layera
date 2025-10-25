/**
 * @layera/cursors - Enterprise Cursor Management System
 *
 * 🎯 World-class cursor system που ξεπερνά Material Design 3, Fluent, και Apple HIG
 *
 * Features:
 * - Complete CSS cursor property coverage
 * - Semantic cursor naming με enterprise patterns
 * - Context-aware cursor management
 * - Performance-optimized με CSS custom properties
 * - Type-safe cursor tokens με strict TypeScript
 * - Accessibility-compliant cursor behaviors
 * - Cross-platform consistency (Windows, macOS, Linux)
 */

/**
 * Enterprise Cursor Token Scale
 * Βασισμένο στα CSS cursor specifications και industry best practices
 */
export const CURSOR_SCALE = {
  // Basic cursors (universal)
  default: 'default',
  auto: 'auto',
  none: 'none',

  // Interactive cursors (για UI elements)
  pointer: 'pointer',           // Links, buttons
  grab: 'grab',                // Draggable items
  grabbing: 'grabbing',        // Actively dragging

  // Text cursors
  text: 'text',                // Text selection
  verticalText: 'vertical-text', // Vertical text

  // Form cursors
  crosshair: 'crosshair',      // Precision selection
  cell: 'cell',                // Spreadsheet cells

  // Status cursors
  wait: 'wait',                // Loading/processing
  progress: 'progress',        // Background processing
  notAllowed: 'not-allowed',   // Disabled/forbidden
  help: 'help',                // Help/info available

  // Resize cursors (directional)
  nResize: 'n-resize',         // North
  sResize: 's-resize',         // South
  eResize: 'e-resize',         // East
  wResize: 'w-resize',         // West
  neResize: 'ne-resize',       // Northeast
  nwResize: 'nw-resize',       // Northwest
  seResize: 'se-resize',       // Southeast
  swResize: 'sw-resize',       // Southwest
  ewResize: 'ew-resize',       // East-West
  nsResize: 'ns-resize',       // North-South
  neswResize: 'nesw-resize',   // Northeast-Southwest
  nwseResize: 'nwse-resize',   // Northwest-Southeast

  // Directional cursors
  colResize: 'col-resize',     // Column resize
  rowResize: 'row-resize',     // Row resize
  allScroll: 'all-scroll',     // Omnidirectional scroll

  // Context cursors
  contextMenu: 'context-menu', // Context menu available
  copy: 'copy',                // Copy operation
  move: 'move',                // Move operation
  alias: 'alias',              // Create alias/shortcut
  noDrop: 'no-drop',           // Invalid drop target

  // Zoom cursors
  zoomIn: 'zoom-in',           // Zoom in action
  zoomOut: 'zoom-out'          // Zoom out action
} as const;

/**
 * Type-safe cursor tokens
 */
export type CursorToken = keyof typeof CURSOR_SCALE;

/**
 * Semantic cursor categories για different use cases
 */
export type CursorCategory =
  | 'basic'        // default, auto, none
  | 'interactive'  // pointer, grab, grabbing
  | 'text'        // text, vertical-text
  | 'form'        // crosshair, cell
  | 'status'      // wait, progress, not-allowed, help
  | 'resize'      // All resize cursors
  | 'directional' // col-resize, row-resize, all-scroll
  | 'context'     // context-menu, copy, move, alias, no-drop
  | 'zoom';       // zoom-in, zoom-out

/**
 * Enterprise CSS custom properties για cursor system
 */
export const CURSOR_CSS_VARS = {
  // Basic cursors
  basic: {
    'cursor-default': CURSOR_SCALE.default,
    'cursor-auto': CURSOR_SCALE.auto,
    'cursor-none': CURSOR_SCALE.none
  },

  // Interactive cursors
  interactive: {
    'cursor-pointer': CURSOR_SCALE.pointer,
    'cursor-grab': CURSOR_SCALE.grab,
    'cursor-grabbing': CURSOR_SCALE.grabbing
  },

  // Text cursors
  text: {
    'cursor-text': CURSOR_SCALE.text,
    'cursor-vertical-text': CURSOR_SCALE.verticalText
  },

  // Form cursors
  form: {
    'cursor-crosshair': CURSOR_SCALE.crosshair,
    'cursor-cell': CURSOR_SCALE.cell
  },

  // Status cursors
  status: {
    'cursor-wait': CURSOR_SCALE.wait,
    'cursor-progress': CURSOR_SCALE.progress,
    'cursor-not-allowed': CURSOR_SCALE.notAllowed,
    'cursor-help': CURSOR_SCALE.help
  },

  // Resize cursors
  resize: {
    'cursor-n-resize': CURSOR_SCALE.nResize,
    'cursor-s-resize': CURSOR_SCALE.sResize,
    'cursor-e-resize': CURSOR_SCALE.eResize,
    'cursor-w-resize': CURSOR_SCALE.wResize,
    'cursor-ne-resize': CURSOR_SCALE.neResize,
    'cursor-nw-resize': CURSOR_SCALE.nwResize,
    'cursor-se-resize': CURSOR_SCALE.seResize,
    'cursor-sw-resize': CURSOR_SCALE.swResize,
    'cursor-ew-resize': CURSOR_SCALE.ewResize,
    'cursor-ns-resize': CURSOR_SCALE.nsResize,
    'cursor-nesw-resize': CURSOR_SCALE.neswResize,
    'cursor-nwse-resize': CURSOR_SCALE.nwseResize
  },

  // Directional cursors
  directional: {
    'cursor-col-resize': CURSOR_SCALE.colResize,
    'cursor-row-resize': CURSOR_SCALE.rowResize,
    'cursor-all-scroll': CURSOR_SCALE.allScroll
  },

  // Context cursors
  context: {
    'cursor-context-menu': CURSOR_SCALE.contextMenu,
    'cursor-copy': CURSOR_SCALE.copy,
    'cursor-move': CURSOR_SCALE.move,
    'cursor-alias': CURSOR_SCALE.alias,
    'cursor-no-drop': CURSOR_SCALE.noDrop
  },

  // Zoom cursors
  zoom: {
    'cursor-zoom-in': CURSOR_SCALE.zoomIn,
    'cursor-zoom-out': CURSOR_SCALE.zoomOut
  }
} as const;

/**
 * Type-safe cursor CSS variable names
 */
export type CursorCSSVar =
  | keyof typeof CURSOR_CSS_VARS.basic
  | keyof typeof CURSOR_CSS_VARS.interactive
  | keyof typeof CURSOR_CSS_VARS.text
  | keyof typeof CURSOR_CSS_VARS.form
  | keyof typeof CURSOR_CSS_VARS.status
  | keyof typeof CURSOR_CSS_VARS.resize
  | keyof typeof CURSOR_CSS_VARS.directional
  | keyof typeof CURSOR_CSS_VARS.context
  | keyof typeof CURSOR_CSS_VARS.zoom;

/**
 * Utility function για CSS custom property access
 */
export const getCursorVar = (token: string): string => {
  return `var(--cursor-${token})`;
};

/**
 * Utility function για cursor value lookup
 */
export const getCursorValue = (token: CursorToken): string => {
  return CURSOR_SCALE[token];
};

/**
 * Enterprise cursor utilities για common patterns
 */
export const CURSOR_UTILITIES = {
  // Component-specific cursors
  components: {
    // Button states
    button: {
      enabled: getCursorVar('pointer'),
      disabled: getCursorVar('not-allowed'),
      loading: getCursorVar('wait')
    },

    // Input field states
    input: {
      text: getCursorVar('text'),
      disabled: getCursorVar('not-allowed'),
      readonly: getCursorVar('default')
    },

    // Link states
    link: {
      default: getCursorVar('pointer'),
      disabled: getCursorVar('not-allowed')
    },

    // Drag and drop
    draggable: {
      idle: getCursorVar('grab'),
      dragging: getCursorVar('grabbing'),
      validDrop: getCursorVar('copy'),
      invalidDrop: getCursorVar('no-drop')
    },

    // Table/Grid
    table: {
      cell: getCursorVar('cell'),
      columnResize: getCursorVar('col-resize'),
      rowResize: getCursorVar('row-resize'),
      sortable: getCursorVar('pointer')
    },

    // Modal/Dialog
    modal: {
      background: getCursorVar('default'),
      closable: getCursorVar('pointer'),
      resizable: getCursorVar('nw-resize')
    },

    // Map/Canvas
    map: {
      pan: getCursorVar('grab'),
      panning: getCursorVar('grabbing'),
      draw: getCursorVar('crosshair'),
      zoomIn: getCursorVar('zoom-in'),
      zoomOut: getCursorVar('zoom-out')
    }
  },

  // Interaction patterns
  interactions: {
    // Loading states
    loading: {
      processing: getCursorVar('wait'),
      background: getCursorVar('progress')
    },

    // Help/Info
    help: {
      tooltip: getCursorVar('help'),
      info: getCursorVar('help')
    },

    // Selection
    selection: {
      text: getCursorVar('text'),
      precision: getCursorVar('crosshair'),
      area: getCursorVar('crosshair')
    },

    // Navigation
    navigation: {
      clickable: getCursorVar('pointer'),
      disabled: getCursorVar('not-allowed'),
      contextMenu: getCursorVar('context-menu')
    }
  },

  // Layout/Resize patterns
  layout: {
    // Resizable panels
    panelResize: {
      horizontal: getCursorVar('ew-resize'),
      vertical: getCursorVar('ns-resize'),
      corner: getCursorVar('nw-resize')
    },

    // Splitter/Divider
    splitter: {
      horizontal: getCursorVar('ns-resize'),
      vertical: getCursorVar('ew-resize')
    },

    // Window operations
    window: {
      move: getCursorVar('move'),
      resizeN: getCursorVar('n-resize'),
      resizeS: getCursorVar('s-resize'),
      resizeE: getCursorVar('e-resize'),
      resizeW: getCursorVar('w-resize'),
      resizeNE: getCursorVar('ne-resize'),
      resizeNW: getCursorVar('nw-resize'),
      resizeSE: getCursorVar('se-resize'),
      resizeSW: getCursorVar('sw-resize')
    }
  },

  // Application-specific patterns
  application: {
    // GeoAlert specific
    geoAlert: {
      mapInteraction: getCursorVar('grab'),
      mapDragging: getCursorVar('grabbing'),
      drawingMode: getCursorVar('crosshair'),
      measureMode: getCursorVar('crosshair'),
      selectMode: getCursorVar('pointer')
    },

    // Form builder
    formBuilder: {
      addField: getCursorVar('copy'),
      dragField: getCursorVar('grabbing'),
      resizeField: getCursorVar('se-resize')
    },

    // Drawing/Design tools
    design: {
      select: getCursorVar('default'),
      draw: getCursorVar('crosshair'),
      text: getCursorVar('text'),
      hand: getCursorVar('grab'),
      eyedropper: getCursorVar('crosshair')
    }
  }
} as const;

/**
 * Complete cursor system που καλύπτει όλα τα CSS cursor properties
 */
export const COMPLETE_CURSOR_SYSTEM = {
  // Direct CSS mappings
  css: CURSOR_SCALE,

  // CSS custom properties
  vars: CURSOR_CSS_VARS,

  // Utility functions
  utils: CURSOR_UTILITIES,

  // Helper functions
  helpers: {
    getCursorVar,
    getCursorValue,

    // Context-aware cursor selection
    getButtonCursor: (enabled: boolean, loading: boolean = false) => {
      if (loading) return getCursorVar('wait');
      if (!enabled) return getCursorVar('not-allowed');
      return getCursorVar('pointer');
    },

    getInputCursor: (disabled: boolean, readonly: boolean = false) => {
      if (disabled) return getCursorVar('not-allowed');
      if (readonly) return getCursorVar('default');
      return getCursorVar('text');
    },

    getDragCursor: (isDragging: boolean, canDrop: boolean = true) => {
      if (!isDragging) return getCursorVar('grab');
      if (!canDrop) return getCursorVar('no-drop');
      return getCursorVar('grabbing');
    },

    getResizeCursor: (direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw') => {
      return getCursorVar(`${direction}-resize`);
    }
  }
} as const;

// 🚀 Enterprise React Hooks για cursor management
export {
  useCursor,
  useDynamicCursor,
  useButtonCursor,
  useInputCursor,
  useDragCursor,
  useResizeCursor,
  useLoadingCursor,
  useCursorSystem,
  useHoverCursor,
  useConditionalCursor,
  useContextCursor
} from './hooks/useCursor';