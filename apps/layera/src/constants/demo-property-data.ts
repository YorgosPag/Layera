/**
 * @layera/constants - Demo Property Data Configuration
 *
 * DEMO & SAMPLE DATA - Single Source of Truth
 * Extracted from config.ts for better maintainability
 */

/**
 * Demo Property Data για Development & Testing
 */
export const DEMO_PROPERTY_DATA = {
  // Sample property details
  PRICE: 150000, // Example property price in euros
  SQUARE_METERS: 85, // Example property size in square meters

  // Business logic constants - (FULL_TIME_HOURS_THRESHOLD moved to DEMO_PROPERTY_DATA to avoid duplicates)

  // Form validation ranges
  BUILDING_YEAR_MIN: 1800, // Earliest reasonable building year
  BUILDING_YEAR_PLACEHOLDER: 2005, // Example year for placeholder

  // Property limits
  MAX_BEDROOMS: 20, // Maximum number of bedrooms
  MAX_BATHROOMS: 10, // Maximum number of bathrooms
  MAX_PARKING_SPACES: 50, // Maximum parking spaces

  // Form placeholders & defaults - SSOT
  DEFAULT_ROOMS_PLACEHOLDER: 3, // Default rooms placeholder
  DEFAULT_BATHROOMS_PLACEHOLDER: 2, // Default bathrooms placeholder
  DEFAULT_FLOOR_PLACEHOLDER: 3, // Default floor placeholder

  // Validation minimums - SSOT
  MIN_ROOMS: 1, // Minimum rooms allowed
  MIN_BATHROOMS: 1, // Minimum bathrooms allowed
  MIN_FLOOR: -2, // Minimum floor (basement levels)
  MIN_PRICE: 0, // Minimum price allowed
  MIN_SQUARE_METERS: 1, // Minimum square meters

  // Employment constants
  FULL_TIME_HOURS_THRESHOLD: 40, // Standard full-time employment threshold
} as const;