/**
 * 📐 SPACING TOKENS - Layout & Spacing System
 *
 * Αντίστοιχα με τα spacing controls από το FullAppPreview_Mockup.html:
 * - Component Gap: 4-48px (default: 16px)
 * - Padding: 4-32px (default: 16px)
 * - Button Padding: 8-32px (default: 16px)
 *
 * Υποστηρίζει live updates μέσω CSS Variables
 */

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 CORE SPACING SCALE - 8-point grid system + custom values
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_CORE_SPACING = {
  // Base spacing scale (8-point grid)
  scale: {
    '0': '0px',
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',   // Default component gap
    '5': '20px',
    '6': '24px',
    '8': '32px',
    '10': '40px',
    '12': '48px'   // Max component gap
  },

  // Component-specific spacing από HTML mockup
  components: {
    // Component gap control (data-control="component-gap")
    componentGap: {
      min: 4,
      max: 48,
      default: 16,
      unit: 'px'
    },

    // General padding control (data-control="padding")
    generalPadding: {
      min: 4,
      max: 32,
      default: 16,
      unit: 'px'
    },

    // Button padding control (data-control="button-padding")
    buttonPadding: {
      min: 8,
      max: 32,
      default: 16,
      unit: 'px'
    }
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 LIVE SPACING VARIABLES - CSS Custom Properties για real-time updates
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_LIVE_SPACING_VARS = {
  // Live spacing variables που χρησιμοποιεί το updateAdvancedLayout()
  liveSpacing: {
    '--live-component-gap': `${LAYERA_CORE_SPACING.components.componentGap.default}px`,
    '--live-padding': `${LAYERA_CORE_SPACING.components.generalPadding.default}px`,
    '--live-button-padding': `${LAYERA_CORE_SPACING.components.buttonPadding.default}px`
  },

  // Base spacing tokens
  baseSpacing: {
    '--layera-space-0': LAYERA_CORE_SPACING.scale['0'],
    '--layera-space-1': LAYERA_CORE_SPACING.scale['1'],
    '--layera-space-2': LAYERA_CORE_SPACING.scale['2'],
    '--layera-space-3': LAYERA_CORE_SPACING.scale['3'],
    '--layera-space-4': LAYERA_CORE_SPACING.scale['4'],
    '--layera-space-5': LAYERA_CORE_SPACING.scale['5'],
    '--layera-space-6': LAYERA_CORE_SPACING.scale['6'],
    '--layera-space-8': LAYERA_CORE_SPACING.scale['8'],
    '--layera-space-10': LAYERA_CORE_SPACING.scale['10'],
    '--layera-space-12': LAYERA_CORE_SPACING.scale['12']
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 SPACING UTILITIES - Helper functions
// ═══════════════════════════════════════════════════════════════════════════════════════

export type LayeraSpacingScale = keyof typeof LAYERA_CORE_SPACING.scale;
export type LayeraSpacingType = 'componentGap' | 'generalPadding' | 'buttonPadding';

/**
 * Παίρνει spacing value από scale
 */
export function getLayeraSpacing(scale: LayeraSpacingScale): string {
  return LAYERA_CORE_SPACING.scale[scale];
}

/**
 * Δημιουργεί live spacing variable name
 */
export function getLiveSpacingVar(type: LayeraSpacingType): string {
  const varMap = {
    componentGap: '--live-component-gap',
    generalPadding: '--live-padding',
    buttonPadding: '--live-button-padding'
  };
  return varMap[type];
}

/**
 * Validates spacing value within component constraints
 */
export function validateSpacingValue(type: LayeraSpacingType, value: number): number {
  const constraints = LAYERA_CORE_SPACING.components[type];
  return Math.max(constraints.min, Math.min(constraints.max, value));
}