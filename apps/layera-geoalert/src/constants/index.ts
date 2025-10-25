/**
 * Constants for Layera GeoAlert Application
 * Centralized configuration to eliminate hardcoded values
 *
 * Usage: import { APP_CONFIG, DEVICE_CONFIG, UI_CONFIG } from '@/constants';
 */

import { BORDER_RADIUS_SCALE, Z_INDEX, SPACING_SCALE } from '@layera/constants';

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
    geoalert: import.meta.env.VITE_GEOALERT_URL || 'http://localhost:3001',
    geoalertFallback: import.meta.env.VITE_GEOALERT_FALLBACK_URL || 'http://localhost:3002'
  }
} as const;

// Device Configuration - iPhone 14 Pro Max Specifications
export const DEVICE_CONFIG = {
  iPhone14ProMax: {
    width: 414,
    height: 916,
    tolerance: {
      widthMin: 412,
      widthMax: 416,
      heightMin: 914,
      heightMax: 920
    },
    viewport: {
      id: 'layera-device-simulator-viewport'
    }
  }
} as const;

// UI Block Configuration - Unified positioning system
// Μοναδική πηγή αλήθειας για το positioning του stepper + κάρτες block
const UI_BLOCK_BASE = {
  // ΜΟΝΗ HARDCODED ΤΙΜΗ - αλλάζεις αυτό και όλα μετακινούνται μαζί!
  baseTop: 20, // Αλλαγή: 15 → 20 = όλα μετακινούνται +5px προς τα κάτω

  // Κοινές τιμές για όλα τα components
  horizontalPadding: { left: 8, right: 8 },
  mapHorizontalPadding: { left: 10, right: 10 }
} as const;

// Αυτόματος υπολογισμός όλων των θέσεων από το base
const calculateUIPositions = () => {
  const stepperHeight = 40;
  const stepperMargin = 8;
  const cardsHeight = 45; // Εκτίμηση ύψους καρτών
  const cardsMargin = 42;

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
      height: 40,
      borderRadius: BORDER_RADIUS_SCALE.LG
    },
    zIndex: Z_INDEX.modal,
    gap: 12,
    padding: 16
  },

  // BLOCK SYSTEM: Κάρτες (πρώτου βήματος)
  categoryStep: {
    position: {
      top: UI_POSITIONS.cards.top,
      ...UI_BLOCK_BASE.horizontalPadding
    },
    zIndex: Z_INDEX.overlay,
    gap: 8
  },

  // BLOCK SYSTEM: Κάρτες (όλων των άλλων βημάτων)
  categoryStepContainers: {
    position: {
      top: UI_POSITIONS.cards.top, // Ίδια θέση με categoryStep
      ...UI_BLOCK_BASE.horizontalPadding
    },
    zIndex: Z_INDEX.overlay,
    gap: 8
  },

  // BLOCK SYSTEM: Map Controls
  mobileGeoMap: {
    position: {
      top: UI_POSITIONS.mapControls.top,
      ...UI_BLOCK_BASE.mapHorizontalPadding
    },
    button: {
      minHeight: 45,
      borderRadius: BORDER_RADIUS_SCALE.SM,
      padding: 10
    },
    zIndex: Z_INDEX.dropdown,
    gap: 8
  },
  infoPanels: {
    mobile: {
      maxHeight: '40vh',
      zIndex: Z_INDEX.tooltip
    }
  }
} as const;

// Color Palette - από το existing design system
export const COLORS = {
  categories: {
    property: {
      primary: 'rgba(16, 185, 129, 0.95)', // emerald-500
      border: 'rgba(16, 185, 129, 0.3)',
      light: '#22c55e',
      dark: '#16a34a'
    },
    job: {
      primary: 'rgba(59, 130, 246, 0.95)', // blue-500
      border: 'rgba(59, 130, 246, 0.3)',
      light: '#3b82f6',
      dark: '#2563eb'
    },
    initial: {
      primary: 'rgba(249, 115, 22, 0.95)', // orange-500
      border: 'rgba(249, 115, 22, 0.3)'
    }
  },
  common: {
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    backdrop: 'rgba(0, 0, 0, 0.12)',
    border: '#d1d5db',
    text: {
      primary: '#1f2937',
      secondary: '#6b7280'
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
      top: 16
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
    top: `${SPACING_SCALE.MD}px`,
    right: `${SPACING_SCALE.MD}px`
  }
} as const;

// Step Configuration για UnifiedPipeline
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

// Export all as default for convenience
export default {
  APP_CONFIG,
  DEVICE_CONFIG,
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