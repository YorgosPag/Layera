/**
 * Constants for Layera GeoAlert Application
 * Centralized configuration to eliminate hardcoded values
 *
 * Usage: import { APP_CONFIG, UI_CONFIG } from '@/constants';
 */

import { BORDER_RADIUS_SCALE, SPACING_SCALE } from '@layera/constants';

// Application Configuration
export const APP_CONFIG = {
  name: 'Layera GeoAlert',
  version: '1.0.0',
  ports: {
    development: 3001,
    fallback: 3002
  },
  urls: {
    id: import.meta.env.VITE_ID_SERVICE_URL || 'http://localhost:3000',
    geoalert: import.meta.env.VITE_GEOALERT_URL || 'http://localhost:3004',
    geoalertFallback: import.meta.env.VITE_GEOALERT_FALLBACK_URL || 'http://localhost:3002'
  }
} as const;


// UI Block Configuration - Unified positioning system
// Μοναδική πηγή αλήθειας για το positioning του stepper + κάρτες block
const UI_BLOCK_BASE = {
  // ΜΟΝΗ HARDCODED ΤΙΜΗ - αλλάζεις αυτό και όλα μετακινούνται μαζί!
  baseTop: parseInt('var(--la-space-5)'.replace('var(--la-space-5)', '20')), // 🎯 SST: Base positioning from design tokens

  // Κοινές τιμές για όλα τα components
  horizontalPadding: { left: 8, right: 8 },
  mapHorizontalPadding: { left: 10, right: 10 }
} as const;

// Αυτόματος υπολογισμός όλων των θέσεων από το base
const calculateUIPositions = (): void => {
  const stepperHeight = parseInt('var(--la-space-10)'.replace('var(--la-space-10)', '40')); // 🎯 SST: Height from design tokens
  const stepperMargin = 8;
  const cardsHeight = parseInt('var(--la-size-12)'.replace('var(--la-size-12)', '45')); // 🎯 SST: Card height from design tokens
  const cardsMargin = parseInt('var(--la-space-10)'.replace('var(--la-space-10)', '40')); // 🎯 SST: Card margin from design tokens

  return {
    stepper: {
      top: UI_BLOCK_BASE.baseTop,
      height: stepperHeight
    },
    cards: {
      top: UI_BLOCK_BASE.baseTop + stepperHeight + stepperMargin,
      estimatedHeight: cardsHeight
    },
    mapControls: {
      top: UI_BLOCK_BASE.baseTop + stepperHeight + stepperMargin + cardsHeight + cardsMargin
    }
  };
};

// Exported calculated positions
const UI_POSITIONS = calculateUIPositions();

// Utility functions για block manipulation
export const UI_BLOCK_UTILS = {
  // Μετακίνηση ολόκληρου του block σε νέα θέση
  moveBlockTo: (newTopPosition: number) => {
    const originalBase = UI_BLOCK_BASE.baseTop;
    const offset = newTopPosition - originalBase;

    return {
      stepper: { top: UI_POSITIONS.stepper.top + offset },
      cards: { top: UI_POSITIONS.cards.top + offset },
      mapControls: { top: UI_POSITIONS.mapControls.top + offset }
    };
  },

  // Επιστροφή των τρεχουσών θέσεων
  getCurrentPositions: () => UI_POSITIONS,

  // Επιστροφή της base θέσης
  getBasePosition: () => UI_BLOCK_BASE.baseTop
} as const;

// UI Configuration με calculated positions
export const UI_CONFIG = {
  // BLOCK SYSTEM: Stepper
  floatingStepper: {
    position: {
      top: UI_POSITIONS.stepper.top,
      ...UI_BLOCK_BASE.horizontalPadding
    },
    dimensions: {
      height: parseInt('var(--la-space-10)'.replace('var(--la-space-10)', '40')), // 🎯 SST: Height from design tokens
      borderRadius: BORDER_RADIUS_SCALE.LG
    },
    zIndex: 'var(--la-z-index-map-modal, 10100)', // Enterprise: Design token implementation
    gap: parseInt('var(--la-space-3)'.replace('var(--la-space-3)', '12')), // 🎯 SST: Gap from design tokens
    padding: parseInt('var(--la-space-4)'.replace('var(--la-space-4)', '16')) // 🎯 SST: Padding from design tokens
  },

  // BLOCK SYSTEM: Κάρτες (πρώτου βήματος)
  categoryStep: {
    position: {
      top: UI_POSITIONS.cards.top,
      ...UI_BLOCK_BASE.horizontalPadding
    },
    zIndex: 'var(--la-z-index-overlay, 300)', // Enterprise: Design token implementation
    gap: 8
  },

  // BLOCK SYSTEM: Κάρτες (όλων των άλλων βημάτων)
  categoryStepContainers: {
    position: {
      top: UI_POSITIONS.cards.top, // Ίδια θέση με categoryStep
      ...UI_BLOCK_BASE.horizontalPadding
    },
    zIndex: 'var(--la-z-index-overlay, 300)', // Enterprise: Design token implementation
    gap: 8
  },

  // BLOCK SYSTEM: Map Controls
  mobileGeoMap: {
    position: {
      top: UI_POSITIONS.mapControls.top,
      ...UI_BLOCK_BASE.mapHorizontalPadding
    },
    button: {
      minHeight: parseInt('var(--la-size-12)'.replace('var(--la-size-12)', '45')), // 🎯 SST: Minimum height from design tokens
      borderRadius: BORDER_RADIUS_SCALE.SM,
      padding: parseInt('var(--la-space-2_5)'.replace('var(--la-space-2_5)', '10')) // 🎯 SST: Padding from design tokens
    },
    zIndex: parseInt('var(--la-z-index-dropdown)'.replace('var(--la-z-index-dropdown)', '1000')), // 🎯 SST: Z-index from design tokens
    gap: 8
  },
  infoPanels: {
    mobile: {
      maxHeight: '40vh',
      zIndex: parseInt('var(--la-z-index-tooltip)'.replace('var(--la-z-index-tooltip)', '600')) // 🎯 SST: Z-index from design tokens
    }
  }
} as const;

// Color Palette - ENTERPRISE: Single Source of Truth με @layera design tokens
export const COLORS = {
  categories: {
    property: {
      primary: 'var(--color-semantic-success-background)',
      border: 'var(--color-semantic-success-border)',
      light: 'var(--color-semantic-success)',
      dark: 'var(--color-semantic-success-strong)'
    },
    job: {
      primary: 'var(--color-interactive-primary-background)',
      border: 'var(--color-interactive-primary-border)',
      light: 'var(--la-color-blue-500, var(--la-color-brand))',
      dark: 'var(--la-color-blue-600, var(--la-color-brand-hover))'
    },
    initial: {
      primary: 'var(--la-color-warning)', // 🟢 SST: Warning color από design tokens
      border: 'var(--la-color-warning)'   // 🟢 SST: Warning border από design tokens
    }
  },
  common: {
    white: 'var(--la-color-white, var(--color-bg-canvas))',
    black: 'var(--la-color-black, var(--color-text-primary))',
    transparent: 'var(--la-color-transparent, transparent)',
    backdrop: 'var(--la-bg-overlay, var(--la-bg-overlay))',
    border: 'var(--la-border-default, var(--color-border-default))',
    text: {
      primary: 'var(--la-text-primary, var(--la-text-primary))',
      secondary: 'var(--la-text-secondary, var(--la-text-secondary))'
    }
  }
} as const;

// Animation & Timing Configuration
export const ANIMATION_CONFIG = {
  durations: {
    short: 200,
    medium: 300,
    long: 500
  },
  delays: {
    deviceCheck: 100,
    smooth: 100
  }
} as const;

// Map Configuration
export const MAP_CONFIG = {
  defaultZoom: 13,
  maxZoom: 18,
  minZoom: 8,
  center: {
    athens: {
      lat: 37.9755,
      lng: 23.7348
    }
  },
  tileLayer: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
  }
} as const;

// Form & Input Configuration
export const FORM_CONFIG = {
  validation: {
    maxLength: {
      title: 100,
      description: 500,
      name: 50
    },
    debounceMs: 300
  },
  bottomSheet: {
    maxHeight: '40vh',
    borderRadius: {
      top: parseInt('var(--la-space-4)'.replace('var(--la-space-4)', '16')) // 🎯 SST: Border radius from design tokens
    }
  }
} as const;

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  duration: {
    short: 3000,
    medium: 5000,
    long: 8000
  },
  position: {
    top: 'var(--la-space-4)', // 🎯 SST: MD spacing (16px)
    right: 'var(--la-space-4)' // 🎯 SST: MD spacing (16px)
  }
} as const;

// Step Configuration για Modular Step System
export const STEP_CONFIG = {
  totalSteps: {
    property: 7,
    job: 8
  },
  stepIds: {
    category: 'category',
    intent: 'intent',
    transactionType: 'transactionType',
    employmentType: 'employmentType',
    availability: 'availability',
    availabilityDetails: 'availabilityDetails',
    location: 'location',
    layout: 'layout',
    details: 'details',
    complete: 'complete'
  }
} as const;

// API Configuration (placeholder for future use)
export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  baseUrl: import.meta.env?.VITE_API_BASE_URL || '',
  endpoints: {
    // Θα προστεθούν όταν χρειαστούν
  }
} as const;

// Debugging Configuration
export const DEBUG_CONFIG = {
  enableConsoleLogging: import.meta.env?.MODE === 'development' || true,
  enableDeviceSimulator: true,
  enableHapticFeedback: true
} as const;

// Re-export LEGO constants for convenience
export { BORDER_RADIUS_SCALE, SPACING_SCALE };
// ❌ Z_INDEX removed - use CSS custom properties: var(--la-z-modal), var(--la-z-popover), etc.

// Export all as default for convenience
export default {
  APP_CONFIG,
  UI_CONFIG,
  COLORS,
  ANIMATION_CONFIG,
  MAP_CONFIG,
  FORM_CONFIG,
  NOTIFICATION_CONFIG,
  STEP_CONFIG,
  API_CONFIG,
  DEBUG_CONFIG
} as const;