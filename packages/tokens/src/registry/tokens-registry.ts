/**
 * 📦 LAYERA DYNAMIC TOKENS REGISTRY
 *
 * Κεντρικό registry που συγκεντρώνει όλα τα tokens και τις λειτουργίες
 * του νέου Dynamic Token System. Single source of truth για:
 * - Core tokens (colors, spacing, typography, borders, dimensions)
 * - Component-specific tokens (buttons, cards, modals, tables, headers)
 * - Live variables (για real-time theming)
 * - Preset themes
 * - Dynamic functions (theme engine, component targeting)
 *
 * Compatible με όλες τις λειτουργίες του FullAppPreview_Mockup.html
 */

import { LAYERA_CORE_COLORS, LAYERA_LIVE_COLOR_VARS } from '../core/colors';
import { LAYERA_CORE_SPACING, LAYERA_LIVE_SPACING_VARS } from '../core/spacing';
import { LAYERA_CORE_TYPOGRAPHY, LAYERA_LIVE_TYPOGRAPHY_VARS } from '../core/typography';
import { LAYERA_CORE_BORDERS, LAYERA_LIVE_BORDER_VARS, LAYERA_RADIUS_PRESETS } from '../core/borders';
import { LAYERA_CORE_DIMENSIONS, LAYERA_LIVE_DIMENSION_VARS } from '../core/dimensions';

import { LAYERA_BUTTON_TOKENS, LAYERA_BUTTON_LIVE_VARS } from '../component/buttons';
import { LAYERA_CARD_TOKENS, LAYERA_CARD_LIVE_VARS } from '../component/cards';
import { LAYERA_MODAL_TOKENS, LAYERA_MODAL_LIVE_VARS } from '../component/modals';
import { LAYERA_TABLE_TOKENS, LAYERA_TABLE_LIVE_VARS } from '../component/tables';
import { LAYERA_HEADER_TOKENS, LAYERA_HEADER_LIVE_VARS } from '../component/headers';

import { LAYERA_PRESET_THEMES } from '../themes/presets';
import { LAYERA_LIVE_VARIABLES } from '../dynamic/live-variables';
import { LAYERA_TARGET_SELECTORS, LAYERA_COLOR_APPLICATION } from '../dynamic/component-targeting';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 UNIFIED TOKEN REGISTRY - Single source of truth
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_DYNAMIC_TOKENS = {
  // 📊 Metadata
  version: '2.0.0',
  buildDate: new Date().toISOString(),
  source: 'FullAppPreview_Mockup.html analysis',

  // 🎨 Core Foundation Tokens
  core: {
    colors: LAYERA_CORE_COLORS,
    spacing: LAYERA_CORE_SPACING,
    typography: LAYERA_CORE_TYPOGRAPHY,
    borders: LAYERA_CORE_BORDERS,
    dimensions: LAYERA_CORE_DIMENSIONS
  },

  // 🔧 Component-Specific Tokens
  components: {
    buttons: LAYERA_BUTTON_TOKENS,
    cards: LAYERA_CARD_TOKENS,
    modals: LAYERA_MODAL_TOKENS,
    tables: LAYERA_TABLE_TOKENS,
    headers: LAYERA_HEADER_TOKENS
  },

  // 🔄 Live Variable System - για real-time theming
  live: {
    variables: LAYERA_LIVE_VARIABLES,
    colorVars: LAYERA_LIVE_COLOR_VARS,
    spacingVars: LAYERA_LIVE_SPACING_VARS,
    typographyVars: LAYERA_LIVE_TYPOGRAPHY_VARS,
    borderVars: LAYERA_LIVE_BORDER_VARS,
    dimensionVars: LAYERA_LIVE_DIMENSION_VARS,
    componentVars: {
      buttons: LAYERA_BUTTON_LIVE_VARS,
      cards: LAYERA_CARD_LIVE_VARS,
      modals: LAYERA_MODAL_LIVE_VARS,
      tables: LAYERA_TABLE_LIVE_VARS,
      headers: LAYERA_HEADER_LIVE_VARS
    }
  },

  // 🎭 Theme System
  themes: {
    presets: LAYERA_PRESET_THEMES,
    radiusPresets: LAYERA_RADIUS_PRESETS
  },

  // 🎯 Dynamic System - Component targeting και live theming
  dynamic: {
    targetSelectors: LAYERA_TARGET_SELECTORS,
    colorApplication: LAYERA_COLOR_APPLICATION,
    supportedTargets: ['all', 'buttons', 'cards', 'modals', 'tables', 'headers'] as const,
    supportedColorTypes: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const
  },

  // 📐 Control Ranges - Από HTML mockup data-control attributes
  controls: {
    colors: {
      // 6-color system
      supportedTypes: ['primary', 'secondary', 'success', 'warning', 'danger', 'info']
    },

    borderRadius: {
      cards: { min: 0, max: 32, default: 8, unit: 'px' },
      buttons: { min: 0, max: 32, default: 6, unit: 'px' },
      modals: { min: 0, max: 32, default: 12, unit: 'px' },
      tables: { min: 0, max: 32, default: 4, unit: 'px' },
      headers: { min: 0, max: 32, default: 0, unit: 'px' },
      global: { min: 0, max: 24, default: 8, unit: 'px' }
    },

    typography: {
      fontSize: { min: 12, max: 24, default: 16, unit: 'px' },
      headerSize: { min: 18, max: 36, default: 24, unit: 'px' },
      buttonFontSize: { min: 10, max: 20, default: 14, unit: 'px' },
      lineHeight: { min: 1.0, max: 2.0, default: 1.5, step: 0.1 },
      fontWeight: ['300', '400', '500', '600', '700'],
      fontFamily: ['Arial, sans-serif', "'Segoe UI', sans-serif", "'Roboto', sans-serif"]
    },

    spacing: {
      componentGap: { min: 4, max: 48, default: 16, unit: 'px' },
      padding: { min: 4, max: 32, default: 16, unit: 'px' },
      buttonPadding: { min: 8, max: 32, default: 16, unit: 'px' }
    },

    dimensions: {
      buttonHeight: { min: 24, max: 56, default: 36, unit: 'px' },
      cardHeight: { min: 80, max: 200, default: 120, unit: 'px' },
      modalWidth: { min: 300, max: 600, default: 400, unit: 'px' }
    },

    borders: {
      borderWidth: { min: 1, max: 8, default: 2, unit: 'px' }
    }
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 TYPE DEFINITIONS - TypeScript types για το registry
// ═══════════════════════════════════════════════════════════════════════════════════════

export type LayeraDynamicTokenRegistry = typeof LAYERA_DYNAMIC_TOKENS;

export type LayeraControlType = keyof typeof LAYERA_DYNAMIC_TOKENS.controls;

export type LayeraComponentTarget = typeof LAYERA_DYNAMIC_TOKENS.dynamic.supportedTargets[number];

export type LayeraColorTypeUnion = typeof LAYERA_DYNAMIC_TOKENS.dynamic.supportedColorTypes[number];

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔍 REGISTRY UTILITIES - Helper functions για registry access
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Παίρνει control constraints για validation
 */
export function getControlConstraints(controlType: LayeraControlType, property?: string): any {
  const controls = LAYERA_DYNAMIC_TOKENS.controls[controlType];

  if (property && typeof controls === 'object') {
    return controls[property as keyof typeof controls];
  }

  return controls;
}

/**
 * Validates τιμή βάσει των control constraints
 */
export function validateControlValue(
  controlType: LayeraControlType,
  property: string,
  value: number | string
): boolean {
  const constraints = getControlConstraints(controlType, property);

  if (!constraints) return false;

  if (typeof value === 'number' && typeof constraints === 'object' && 'min' in constraints) {
    return value >= constraints.min && value <= constraints.max;
  }

  if (Array.isArray(constraints)) {
    return constraints.includes(value as string);
  }

  return true;
}

/**
 * Παίρνει όλα τα live variables ως flat object
 */
export function getAllLiveVariablesFlat(): Record<string, string> {
  const result: Record<string, string> = {};

  // Core live variables
  Object.assign(result, LAYERA_DYNAMIC_TOKENS.live.variables.colors);
  Object.assign(result, LAYERA_DYNAMIC_TOKENS.live.variables.borderRadius);
  Object.assign(result, LAYERA_DYNAMIC_TOKENS.live.variables.spacing);
  Object.assign(result, LAYERA_DYNAMIC_TOKENS.live.variables.typography);
  Object.assign(result, LAYERA_DYNAMIC_TOKENS.live.variables.dimensions);
  Object.assign(result, LAYERA_DYNAMIC_TOKENS.live.variables.borders);

  return result;
}

/**
 * Παίρνει registry metadata
 */
export function getRegistryInfo(): Pick<LayeraDynamicTokenRegistry, 'version' | 'buildDate' | 'source'> {
  return {
    version: LAYERA_DYNAMIC_TOKENS.version,
    buildDate: LAYERA_DYNAMIC_TOKENS.buildDate,
    source: LAYERA_DYNAMIC_TOKENS.source
  };
}