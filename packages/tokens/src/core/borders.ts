/**
 * 🔄 BORDER TOKENS - Border Radius & Width System
 *
 * Αντίστοιχα με τα border controls από το FullAppPreview_Mockup.html:
 * - Component-specific border radius (Cards, Buttons, Modals, Tables, Headers)
 * - Global border radius: 0-24px (default: 8px)
 * - Border width: 1-8px (default: 2px)
 * - Quick radius presets: sharp, soft, round, pill
 *
 * Υποστηρίζει live updates μέσω CSS Variables
 */

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 BORDER RADIUS DEFINITIONS - Per component από HTML mockup
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_CORE_BORDERS = {
  // Component-specific border radius controls
  radius: {
    // Cards border radius (data-control="cards-border-radius")
    cards: {
      min: 0,
      max: 32,
      default: 8,
      unit: 'px'
    },

    // Buttons border radius (data-control="buttons-border-radius")
    buttons: {
      min: 0,
      max: 32,
      default: 6,
      unit: 'px'
    },

    // Modals border radius (data-control="modals-border-radius")
    modals: {
      min: 0,
      max: 32,
      default: 12,
      unit: 'px'
    },

    // Tables border radius (data-control="tables-border-radius")
    tables: {
      min: 0,
      max: 32,
      default: 4,
      unit: 'px'
    },

    // Headers border radius (data-control="header-border-radius")
    headers: {
      min: 0,
      max: 32,
      default: 0,
      unit: 'px'
    },

    // Global border radius (data-control="border-radius")
    global: {
      min: 0,
      max: 24,
      default: 8,
      unit: 'px'
    }
  },

  // Border width control (data-control="border-width")
  width: {
    min: 1,
    max: 8,
    default: 2,
    unit: 'px'
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎭 RADIUS PRESETS - Quick radius styles από HTML mockup
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_RADIUS_PRESETS = {
  sharp: {
    cards: 0,
    buttons: 0,
    modals: 0,
    tables: 0,
    headers: 0
  },

  soft: {
    cards: 6,
    buttons: 4,
    modals: 8,
    tables: 3,
    headers: 0
  },

  round: {
    cards: 12,
    buttons: 8,
    modals: 16,
    tables: 6,
    headers: 4
  },

  pill: {
    cards: 24,
    buttons: 20,
    modals: 28,
    tables: 12,
    headers: 8
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 LIVE BORDER VARIABLES - CSS Custom Properties για real-time updates
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_LIVE_BORDER_VARS = {
  // Live border radius variables για component-specific control
  liveRadius: {
    '--live-cards-border-radius': `${LAYERA_CORE_BORDERS.radius.cards.default}px`,
    '--live-buttons-border-radius': `${LAYERA_CORE_BORDERS.radius.buttons.default}px`,
    '--live-modals-border-radius': `${LAYERA_CORE_BORDERS.radius.modals.default}px`,
    '--live-tables-border-radius': `${LAYERA_CORE_BORDERS.radius.tables.default}px`,
    '--live-headers-border-radius': `${LAYERA_CORE_BORDERS.radius.headers.default}px`,
    '--live-border-radius': `${LAYERA_CORE_BORDERS.radius.global.default}px`
  },

  // Live border width variables
  liveWidth: {
    '--live-border-width': `${LAYERA_CORE_BORDERS.width.default}px`
  },

  // Base border tokens
  baseBorders: {
    '--layera-border-radius-none': '0px',
    '--layera-border-radius-sm': '4px',
    '--layera-border-radius-md': '8px',
    '--layera-border-radius-lg': '12px',
    '--layera-border-radius-xl': '16px',
    '--layera-border-radius-2xl': '24px',
    '--layera-border-radius-full': '9999px',
    '--layera-border-width-thin': '1px',
    '--layera-border-width-normal': '2px',
    '--layera-border-width-thick': '4px'
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 BORDER UTILITIES - Helper functions
// ═══════════════════════════════════════════════════════════════════════════════════════

export type LayeraComponentType = 'cards' | 'buttons' | 'modals' | 'tables' | 'headers' | 'global';
export type LayeraRadiusPreset = keyof typeof LAYERA_RADIUS_PRESETS;

/**
 * Δημιουργεί live border radius variable name
 */
export function getLiveBorderRadiusVar(component: LayeraComponentType): string {
  if (component === 'global') {
    return '--live-border-radius';
  }
  return `--live-${component}-border-radius`;
}

/**
 * Validates border radius value within component constraints
 */
export function validateBorderRadius(component: LayeraComponentType, value: number): number {
  const constraints = LAYERA_CORE_BORDERS.radius[component];
  return Math.max(constraints.min, Math.min(constraints.max, value));
}

/**
 * Applies radius preset για όλα τα components
 */
export function getBorderRadiusPreset(preset: LayeraRadiusPreset): Record<LayeraComponentType, number> {
  const presetValues = LAYERA_RADIUS_PRESETS[preset];
  return {
    ...presetValues,
    global: presetValues.cards  // Global follows cards
  };
}

/**
 * Validates border width value
 */
export function validateBorderWidth(value: number): number {
  const constraints = LAYERA_CORE_BORDERS.width;
  return Math.max(constraints.min, Math.min(constraints.max, value));
}