/**
 * Error Messages & Constants για το Error Boundary System
 */

export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_TITLE: 'Σφάλμα Δικτύου',
  NETWORK_MESSAGE: 'Δεν μπορούμε να συνδεθούμε στο διαδίκτυο. Παρακαλώ ελέγξτε τη σύνδεσή σας.',
  NETWORK_RETRY: 'Επανάληψη σύνδεσης',

  // Chunk errors
  CHUNK_TITLE: 'Σφάλμα Φόρτωσης',
  CHUNK_MESSAGE: 'Υπήρξε πρόβλημα κατά τη φόρτωση των αρχείων. Παρακαλώ ανανεώστε τη σελίδα.',
  CHUNK_RETRY: 'Ανανέωση σελίδας',

  // Page level errors
  PAGE_TITLE: 'Σφάλμα Σελίδας',
  PAGE_MESSAGE: 'Η σελίδα αντιμετώπισε ένα απροσδόκητο σφάλμα και δεν μπορεί να φορτωθεί.',

  // Section level errors
  SECTION_TITLE: 'Σφάλμα Ενότητας',
  SECTION_MESSAGE: 'Αυτή η ενότητα αντιμετώπισε ένα σφάλμα και δεν μπορεί να εμφανιστεί.',

  // Component level errors
  COMPONENT_TITLE: 'Κάτι πήγε στραβά',
  COMPONENT_MESSAGE: 'Αυτό το στοιχείο αντιμετώπισε ένα σφάλμα. Παρακαλώ δοκιμάστε ξανά.',

  // Generic retry
  GENERIC_RETRY: 'Δοκιμάστε ξανά',

  // Development
  SHOW_DETAILS: 'Εμφάνιση λεπτομερειών',
  HIDE_DETAILS: 'Απόκρυψη λεπτομερειών'
} as const;

// 🎯 IMPORT SINGLE SOURCE OF TRUTH - από @layera/constants
import { ICON_SIZES } from '@layera/constants';

export const ERROR_ICON_SIZES = {
  small: ICON_SIZES.SMALL,
  medium: ICON_SIZES.MEDIUM,
  large: ICON_SIZES.LARGE,
  xl: ICON_SIZES.XL
} as const;

// 🎯 IMPORT ANIMATION CONSTANTS - από @layera/constants
import { ANIMATION_DURATIONS } from '@layera/constants';

export const ERROR_ANIMATION_DURATIONS = {
  fast: ANIMATION_DURATIONS.FAST,
  normal: ANIMATION_DURATIONS.NORMAL,
  slow: ANIMATION_DURATIONS.SLOW
} as const;