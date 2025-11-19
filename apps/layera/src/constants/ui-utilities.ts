/**
 * @layera/constants - UI Utilities & Advanced Constants
 *
 * UI WIDTH, ADDRESS PARSING, TIMING, CRYPTOGRAPHIC & Z-INDEX
 * Extracted from config.ts for better maintainability
 */

/**
 * 🎨 UI WIDTH CONSTANTS
 * Standard width percentages για UI components
 */
export const UI_WIDTH_PERCENTAGES = {
  SMALL: 'var(--layera-percentage-small)',      // Small width percentage
  MEDIUM: 'var(--layera-percentage-medium)',    // Medium width percentage
  LARGE: 'var(--layera-percentage-large)',      // Large width percentage
  XL: 'var(--layera-percentage-xl)',            // Extra large width percentage
  FULL: 'var(--layera-percentage-full)'         // Full width percentage
} as const;

/**
 * ADDRESS PARSING CONSTANTS
 * Priority values and sorting constants για address parsing
 */
export const ADDRESS_PARSING = {
  // Priority values για address component sorting
  DEFAULT_PRIORITY: 999,           // Default priority for unknown address types - sorting constant
  HIGH_PRIORITY: 1,                // High priority for important address components
  MEDIUM_PRIORITY: 5,              // Medium priority for standard address components
  LOW_PRIORITY: 10,                // Low priority for optional address components

  // Parsing configuration
  MAX_COMPONENTS: 20,              // Maximum address components to process
  MIN_COMPONENT_LENGTH: 2,         // Minimum length for valid address component
  SEPARATOR_THRESHOLD: 3           // Minimum separators to trigger component split
} as const;

/**
 * UI ANIMATION TIMING CONSTANTS
 * Standardized timing values για UI animations and delays
 */
export const UI_TIMING = {
  // Component update delays
  DEBOUNCE_SHORT: 300,
  DEBOUNCE_MEDIUM: 500,
  DEBOUNCE_LONG: 1000,

  // Animation durations - from tokens system
  TRANSITION_FAST: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--layera-iconInteractive-interactive-transition-fast').replace(/[^0-9]/g, '')) || 100,
  TRANSITION_NORMAL: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--layera-iconInteractive-interactive-transition-normal').replace(/[^0-9]/g, '')) || 200,
  TRANSITION_SLOW: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--layera-iconInteractive-interactive-slow').replace(/[^0-9]/g, '')) || 300,

  // Frame rate throttling
  FRAME_60FPS: 16,

  // Loading states
  LOADING_SPINNER_MIN: 500,        // Minimum spinner display time
  LOADING_TIMEOUT: 5000            // Maximum loading timeout
} as const;

/**
 * 📚 CRYPTOGRAPHIC CONSTANTS
 * Standard values για cryptographic operations
 */
export const CRYPTOGRAPHIC_CONSTANTS = {
  // Bit manipulation values
  BIT_32: 32,                      // 32-bit integer conversion mask
  BIT_16: 16,                      // 16-bit integer conversion mask
  BIT_8: 8,                        // 8-bit integer conversion mask

  // Hash function constants
  HASH_MASK_32BIT: 0x7FFFFFFF,     // 32-bit hash mask (2^31 - 1)
  HASH_MULTIPLIER: 31,             // Standard hash multiplier

  // TOTP constants
  TOTP_WINDOW: 30,                 // TOTP time window in seconds
  TOTP_DIGITS: 6,                  // Number of TOTP digits
  TOTP_COUNTER_SIZE: 8             // TOTP counter size in bytes
} as const;

/**
 * 📐 Z-INDEX LAYERING CONSTANTS
 * Standard z-index values για UI layering
 */
export const UI_Z_INDEX_LAYERS = {
  // Base layers
  BACKGROUND: 0,                   // Background layer (default)
  BASE: 10,                        // Base content layer
  CONTENT: 50,                     // Standard content layer

  // Interactive layers
  OVERLAY: 100,                    // Standard overlay layer
  DROPDOWN: 200,                   // Dropdown menus layer
  STICKY: 300,                     // Sticky elements layer

  // Modal layers
  MODAL_BACKDROP: 1000,            // Modal backdrop layer
  MODAL_CONTENT: 1010,             // Modal content layer
  TOAST: 2000,                     // Toast notifications layer

  // Critical layers
  TOOLTIP: 5000,                   // Tooltip layer (highest UI)
  DEBUG: 9999                      // Debug overlays (development only)
} as const;