/**
 * @layera/constants - Device Specifications
 *
 * DEVICE SPECIFICATIONS - Hardware & Viewport Dimensions
 * Extracted from config.ts for better maintainability
 */

/**
 * Mobile Device Specifications - Single Source of Truth
 */
export const MOBILE_DEVICE_SPECS = {
  VIEWPORT_WIDTH: 430,
  VIEWPORT_HEIGHT: 932,
  FRAME_WIDTH_MIN: 412,
  FRAME_WIDTH_MAX: 416,
  FRAME_HEIGHT_MIN: 914,
  FRAME_HEIGHT_MAX: 920,
  EXACT_FRAME_WIDTH: 414,
  EXACT_FRAME_HEIGHT: 916,
} as const;

/**
 * Responsive Breakpoints - MOVED TO STYLE DICTIONARY
 * Use CSS variables: var(--layera-spacing-breakpoint-mobile), var(--layera-spacing-breakpoint-tablet), var(--layera-spacing-breakpoint-desktop)
 * @see packages/tokens/src/domains/spacing-dimensions.json
 */
export const DEVICE_BREAKPOINTS = {
  // Main breakpoints moved to Style Dictionary tokens
  // MOBILE: 768 → var(--layera-spacing-breakpoint-mobile)
  // TABLET: 1024 → var(--layera-spacing-breakpoint-tablet)
  // DESKTOP: 1025 → var(--layera-spacing-breakpoint-desktop)
  MOBILE_MAX: 480, // Pure mobile detection - Business logic ✅
} as const;

/**
 * Common Device Viewport Sizes
 */
export const DEVICE_VIEWPORTS = {
  // Mobile Models
  MOBILE_SMALL: { width: 375, height: 667 },
  MOBILE_MEDIUM: { width: 414, height: 896 },
  MOBILE_LARGE: { width: MOBILE_DEVICE_SPECS.VIEWPORT_WIDTH, height: MOBILE_DEVICE_SPECS.VIEWPORT_HEIGHT },
  MOBILE_STANDARD: { width: 390, height: 844 },

  // Tablet Models
  TABLET_MINI: { width: 768, height: 1024 },
  TABLET_AIR: { width: 820, height: 1180 },
  TABLET_PRO: { width: 1024, height: 1366 },
} as const;

/**
 * CSS Dimension Values
 */
export const CSS_DIMENSIONS = {
  FULL_PERCENT: '100%',
  FULL_VH: 'var(--layera-spacing-viewport-full-height)',
  FULL_VW: 'var(--layera-spacing-viewport-full-width)',
  FULL_VIEWPORT_HEIGHT: 'var(--layera-spacing-viewport-full-height)',
  HALF_PERCENT: '50%',
} as const;

/**
 * Fixed Pixel Dimensions - PARTIAL DEPRECATION: Card/Button/Input dimensions moved to Style Dictionary
 */
export const FIXED_DIMENSIONS = {
  DROPDOWN_MAX_HEIGHT: 400,
  MIN_BUTTON_WIDTH: 200,
  MIN_CARD_WIDTH: 280,
  ICON_CONTAINER_SIZE: 32,
  MAP_ZOOM_DEFAULT: 13,
  MAP_ZOOM_MIN: 8,
  MAP_ZOOM_MAX: 18,
  // UI dimensions moved to Style Dictionary tokens:
  // - Card: var(--layera-spacing-component-card-width), var(--layera-spacing-component-card-height)
  // - Button: var(--layera-spacing-component-button-height)
  // - Input: var(--layera-spacing-component-input-height)
} as const;