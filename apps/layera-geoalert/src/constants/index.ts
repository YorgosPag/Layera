/**
 * Constants for Layera GeoAlert Application
 * Centralized configuration to eliminate hardcoded values
 *
 * Usage: import { APP_CONFIG, DEVICE_CONFIG, UI_CONFIG } from '@/constants';
 */

// Application Configuration
export const APP_CONFIG = {
  name: 'Layera GeoAlert',
  version: '1.0.0',
  ports: {
    development: 3001,
    fallback: 3002
  },
  urls: {
    id: 'http://localhost:3000',
    geoalert: 'http://localhost:3001',
    geoalertFallback: 'http://localhost:3002'
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

// UI Configuration
export const UI_CONFIG = {
  floatingStepper: {
    position: {
      top: 15, // Πιο ψηλά στην κορυφή του κινητού
      left: 8,
      right: 8
    },
    dimensions: {
      height: 40,
      borderRadius: 20
    },
    zIndex: 9999,
    gap: 12,
    padding: 16
  },
  categoryStep: {
    position: {
      top: 63, // Κοντά στο stepper (15 + 40 + 8 margin)
      left: 8,
      right: 8
    },
    zIndex: 9998,
    gap: 8
  },
  categoryStepContainers: {
    position: {
      top: 63, // ΙΔΙΑ θέση με το categoryStep - όλες οι κάρτες στο ίδιο ύψος
      left: 8,
      right: 8
    },
    zIndex: 9998,
    gap: 8
  },
  mobileGeoMap: {
    position: {
      top: 150, // Κάτω από όλες τις κάρτες (105 + περίπου 45px για containers)
      left: 10,
      right: 10
    },
    button: {
      minHeight: 45,
      borderRadius: 8,
      padding: 10
    },
    zIndex: 1000,
    gap: 8
  },
  infoPanels: {
    mobile: {
      maxHeight: '40vh',
      zIndex: 1500
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
  transitions: {
    ease: 'all 0.3s ease',
    easeOut: 'all 0.2s ease-out'
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
    top: '20px',
    right: '20px'
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