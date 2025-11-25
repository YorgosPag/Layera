/**
 * 📏 DIMENSIONS TOKENS - Component Sizing System
 *
 * Αντίστοιχα με τα dimension controls από το FullAppPreview_Mockup.html:
 * - Button Height: 24-56px (default: 36px)
 * - Card Height: 80-200px (default: 120px)
 * - Modal Width: 300-600px (default: 400px)
 *
 * Υποστηρίζει live updates μέσω CSS Variables
 */

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 DIMENSION DEFINITIONS - Από HTML mockup
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_CORE_DIMENSIONS = {
  // Button dimensions (data-control="button-height")
  buttons: {
    height: {
      min: 24,
      max: 56,
      default: 36,
      unit: 'px'
    },
    // Button padding handled in spacing.ts
  },

  // Card dimensions (data-control="card-height")
  cards: {
    height: {
      min: 80,
      max: 200,
      default: 120,
      unit: 'px'
    },
    // Card width usually responsive or fixed by grid
    minWidth: 200,
    maxWidth: 400
  },

  // Modal dimensions (data-control="modal-width")
  modals: {
    width: {
      min: 300,
      max: 600,
      default: 400,
      unit: 'px'
    },
    // Modal height usually auto-sized by content
    minHeight: 200,
    maxHeight: '80vh'
  },

  // Table dimensions (inferred from mockup)
  tables: {
    minHeight: 300,
    maxHeight: '70vh',
    cellPadding: 12
  },

  // Header dimensions (inferred from mockup)
  headers: {
    height: 60,
    padding: 16
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 LIVE DIMENSION VARIABLES - CSS Custom Properties για real-time updates
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_LIVE_DIMENSION_VARS = {
  // Live dimension variables που χρησιμοποιούν τα HTML mockup controls
  liveDimensions: {
    '--live-button-height': `${LAYERA_CORE_DIMENSIONS.buttons.height.default}px`,
    '--live-card-height': `${LAYERA_CORE_DIMENSIONS.cards.height.default}px`,
    '--live-modal-width': `${LAYERA_CORE_DIMENSIONS.modals.width.default}px`
  },

  // Base dimension tokens
  baseDimensions: {
    '--layera-button-height-sm': '32px',
    '--layera-button-height-md': '40px',
    '--layera-button-height-lg': '48px',
    '--layera-card-min-height': `${LAYERA_CORE_DIMENSIONS.cards.height.min}px`,
    '--layera-card-max-height': `${LAYERA_CORE_DIMENSIONS.cards.height.max}px`,
    '--layera-modal-min-width': `${LAYERA_CORE_DIMENSIONS.modals.width.min}px`,
    '--layera-modal-max-width': `${LAYERA_CORE_DIMENSIONS.modals.width.max}px`,
    '--layera-header-height': `${LAYERA_CORE_DIMENSIONS.headers.height}px`,
    '--layera-table-cell-padding': `${LAYERA_CORE_DIMENSIONS.tables.cellPadding}px`
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 DIMENSION UTILITIES - Helper functions
// ═══════════════════════════════════════════════════════════════════════════════════════

export type LayeraDimensionType = 'buttons' | 'cards' | 'modals' | 'tables' | 'headers';
export type LayeraDimensionProperty = 'height' | 'width' | 'minHeight' | 'maxHeight' | 'minWidth' | 'maxWidth';

/**
 * Δημιουργεί live dimension variable name
 */
export function getLiveDimensionVar(component: string, property: string): string {
  return `--live-${component}-${property}`;
}

/**
 * Validates button height value within constraints
 */
export function validateButtonHeight(value: number): number {
  const constraints = LAYERA_CORE_DIMENSIONS.buttons.height;
  return Math.max(constraints.min, Math.min(constraints.max, value));
}

/**
 * Validates card height value within constraints
 */
export function validateCardHeight(value: number): number {
  const constraints = LAYERA_CORE_DIMENSIONS.cards.height;
  return Math.max(constraints.min, Math.min(constraints.max, value));
}

/**
 * Validates modal width value within constraints
 */
export function validateModalWidth(value: number): number {
  const constraints = LAYERA_CORE_DIMENSIONS.modals.width;
  return Math.max(constraints.min, Math.min(constraints.max, value));
}

/**
 * Παίρνει default dimension value για component
 */
export function getDefaultDimension(component: LayeraDimensionType, property: string): number {
  switch (component) {
    case 'buttons':
      return property === 'height' ? LAYERA_CORE_DIMENSIONS.buttons.height.default : 0;
    case 'cards':
      return property === 'height' ? LAYERA_CORE_DIMENSIONS.cards.height.default : 0;
    case 'modals':
      return property === 'width' ? LAYERA_CORE_DIMENSIONS.modals.width.default : 0;
    default:
      return 0;
  }
}