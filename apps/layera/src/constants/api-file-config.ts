/**
 * @layera/constants - API & File Configuration
 *
 * API STATUS, FILE UPLOADS & VALIDATION CONSTANTS
 * Extracted from config.ts for better maintainability
 */

/**
 * HTTP Status Codes
 */
export const API_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * API Timeouts (in milliseconds)
 */
export const API_TIMEOUTS = {
  FAST: 3000,
  MEDIUM: 10000,
  SLOW: 30000,
  UPLOAD: 60000,
} as const;

/**
 * File Size Limits - Single Source of Truth για file upload restrictions
 * Technical limits για διαφορετικές κατηγορίες αρχείων
 */
export const FILE_SIZE_LIMITS = {
  CAD_MAX_MB: 500,     // CAD files maximum size in MB
  DOCUMENT_MAX_MB: 200, // Document files maximum size in MB
  IMAGE_MAX_MB: 50,    // Standard image files maximum size in MB
  IMAGE_LARGE_MB: 100, // Large image files (TIFF) maximum size in MB
  IMAGE_SMALL_MB: 25,  // Small image files (BMP) maximum size in MB
  VECTOR_MAX_MB: 10    // Vector graphics maximum size in MB
} as const;

/**
 * File System Constraints - Operating System & Browser Limits
 */
export const FILE_SYSTEM_LIMITS = {
  MAX_FILENAME_LENGTH: 255, // Maximum filename length (Windows/Linux/Mac)
  MAX_PATH_LENGTH: 4096,    // Maximum full path length
  MAX_UPLOAD_COUNT: 10      // Maximum simultaneous file uploads
} as const;

/**
 * Search & Results Constants - UI Limits
 * Single Source of Truth για search result limitations
 */
export const SEARCH_LIMITS = {
  MAX_OCCUPATION_RESULTS: 10,  // Maximum ESCO occupation search results
  MAX_SEARCH_RESULTS: 50,      // General maximum search results
  DEFAULT_PAGE_SIZE: 20,       // Default pagination size
  TOTAL_ESCO_OCCUPATIONS: 3007 // Total available ESCO occupations (EU official count)
} as const;