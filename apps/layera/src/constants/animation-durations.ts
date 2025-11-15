/**
 * @layera/constants - Animation Durations Configuration
 *
 * UI ANIMATION & INTERACTION DURATIONS - Single Source of Truth
 * Extracted from config.ts for better maintainability
 */

/**
 * Animation Durations για UI Interactions
 */
export const ANIMATION_DURATIONS = {
  // Auto-advance timings
  PROPERTY_TYPE_SELECTION: 500, // PropertyTypeSelector auto-advance delay
  OCCUPATION_SEARCH: 1500, // OccupationStep search completion delay
  COMPLETE_STEP: 500, // CompleteStep animation delay

  // Form interaction timings
  FORM_VALIDATION_DELAY: 300, // Form validation debounce
  SEARCH_DEBOUNCE: 300, // Search input debounce
  API_DEBOUNCE: 500, // API call debounce

  // UI state transitions
  MODAL_TRANSITION: 200, // Modal open/close animation
  SIDEBAR_TRANSITION: 300, // Sidebar slide animation
  TOOLTIP_DELAY: 500, // Tooltip appearance delay

  // General animation durations
  INSTANT: 50,  // For instant button feedback
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;