/**
 * Constants for Layera GeoAlert Application
 * Centralized configuration to eliminate hardcoded values
 *
 * Usage: import { APP_CONFIG, UI_CONFIG } from '@/constants';
 */

// 🎯 IMPORT SINGLE SOURCE OF TRUTH - από @layera/constants
import {
  BORDER_RADIUS_SCALE,
  SPACING_SCALE,
  DEV_PORTS,
  LOCAL_URLS,
  COMPONENT_DESIGN_TOKENS,
  CSS_DESIGN_TOKENS,
  // 🌍 Geographic & Mapping Constants
  EARTH_CONSTANTS,
  LEAFLET_MARKER_DIMENSIONS,
  // 🔍 Search & UI Limits
  SEARCH_LIMITS,
  LEAFLET_UI_OFFSETS,
  // 🎨 XML & SVG Standards
  XML_NAMESPACES,
  // 📏 Ruler & Measurement Constants
  RULER_TICK_VALUES,
  // 🔢 Geometric & UI Constants
  GEOMETRIC_LIMITS,
  ICON_DIMENSIONS
} from '@layera/constants';

// 🗺️ ENTERPRISE: Using centralized geo constants instead of local duplicates
// All Leaflet and earth measurement constants come from @layera/constants SSOT

// File Size Constants
const FILE_SIZE_CONSTANTS = {
  BYTES_IN_KB: 1024, // Bytes to KB conversion factor
  MODAL_Z_INDEX: 10002, // Modal overlay z-index value
  MAX_OCCUPATION_RESULTS: SEARCH_LIMITS.MAX_OCCUPATION_RESULTS // Maximum ESCO occupation search results from SSOT
};

// Application Configuration
export const APP_CONFIG = {
  name: 'Layera GeoAlert',
  version: '1.0.0',
  ports: {
    development: DEV_PORTS.LAYERA_GEOALERT,
    fallback: DEV_PORTS.LAYERA_GEOALERT_FALLBACK
  },
  urls: {
    id: import.meta.env.VITE_ID_SERVICE_URL || LOCAL_URLS.ID_SERVICE,
    geoalert: import.meta.env.VITE_GEOALERT_URL || LOCAL_URLS.GEOALERT_SERVICE,
    geoalertFallback: import.meta.env.VITE_GEOALERT_FALLBACK_URL || LOCAL_URLS.GEOALERT_FALLBACK
  }
} as const;


// UI Block Configuration - Unified positioning system
// Μοναδική πηγή αλήθειας για το positioning του stepper + κάρτες block
const UI_BLOCK_BASE = {
  // SST: Base positioning from design tokens
  baseTop: 20, // var(--la-space-5) equivalent - Single source reference point

  // Κοινές τιμές για όλα τα components
  horizontalPadding: { left: 8, right: 8 },
  mapHorizontalPadding: { left: 10, right: 10 }
} as const;

// Αυτόματος υπολογισμός όλων των θέσεων από το base
const calculateUIPositions = () => {
  const stepperHeight = 40; // var(--la-space-10) equivalent
  const stepperMargin = 8; // var(--la-space-2) equivalent
  const cardsHeight = 45; // var(--la-size-12) equivalent
  const cardsMargin = 40; // var(--la-space-10) equivalent

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
      height: 40, // var(--la-space-10) equivalent
      borderRadius: BORDER_RADIUS_SCALE.LG
    },
    zIndex: 'var(--la-z-index-map-modal, 10100)', // Enterprise: Design token implementation
    gap: 12, // var(--la-space-3) equivalent
    padding: 16 // var(--la-space-4) equivalent
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
      minHeight: 45, // var(--la-size-12) equivalent
      borderRadius: BORDER_RADIUS_SCALE.SM,
      padding: 10 // var(--la-space-2_5) equivalent
    },
    zIndex: CSS_DESIGN_TOKENS.zIndex['z-index-dropdown'], // Enterprise z-index system
    gap: 8
  },
  infoPanels: {
    mobile: {
      maxHeight: '40vh',
      zIndex: 600 // var(--la-z-index-tooltip) equivalent
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
    short: COMPONENT_DESIGN_TOKENS.animations['duration-short'],
    medium: COMPONENT_DESIGN_TOKENS.animations['duration-medium'],
    long: COMPONENT_DESIGN_TOKENS.animations['duration-long']
  },
  delays: {
    deviceCheck: COMPONENT_DESIGN_TOKENS.animations['delay-device-check'],
    smooth: COMPONENT_DESIGN_TOKENS.animations['delay-smooth']
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
  },
  controls: {
    location: {
      top: UI_BLOCK_BASE.baseTop, // 20px equivalent
      left: 4,
      zIndex: CSS_DESIGN_TOKENS.zIndex['z-index-overlay']
    },
    layers: {
      bottom: 4,
      left: 4,
      right: 4,
      zIndex: CSS_DESIGN_TOKENS.zIndex['z-index-overlay']
    }
  },
  icons: {
    anchorConstants: {
      DEFAULT_X: LEAFLET_MARKER_DIMENSIONS.DEFAULT.width / 2, // Calculated from @layera/constants SSOT
      DEFAULT_Y: LEAFLET_MARKER_DIMENSIONS.DEFAULT.height, // Default icon anchor Y position - from SSOT
      POPUP_OFFSET_Y: LEAFLET_UI_OFFSETS.POPUP_OFFSET_Y, // Popup anchor Y offset from SSOT
      TOOLTIP_OFFSET_Y: LEAFLET_UI_OFFSETS.TOOLTIP_OFFSET_Y // Tooltip anchor Y offset from SSOT
    },
    sizes: {
      iconAnchorX: LEAFLET_MARKER_DIMENSIONS.DEFAULT.width / 2,
      iconAnchorY: LEAFLET_MARKER_DIMENSIONS.DEFAULT.height,
      alertIconSizeX: 30, // LEAFLET API requirement - alert icon width
      alertIconSizeY: 48, // LEAFLET API requirement - alert icon height
      alertIconAnchorX: 15, // LEAFLET API requirement - alert icon anchor X
      alertIconAnchorY: ICON_DIMENSIONS.MAP.ALERT.anchor.y, // From @layera/tokens SSOT
      shadowSize: LEAFLET_MARKER_DIMENSIONS.SHADOW.width, // From @layera/constants SSOT
      alertShadowSize: 48 // Alert-specific shadow size - app requirement
    },
    default: {
      iconAnchor: [LEAFLET_MARKER_DIMENSIONS.DEFAULT.width / 2, LEAFLET_MARKER_DIMENSIONS.DEFAULT.height],
      popupAnchor: [1, LEAFLET_UI_OFFSETS.POPUP_OFFSET_Y], // LEAFLET API requirement - cannot use design tokens
      tooltipAnchor: [16, LEAFLET_UI_OFFSETS.TOOLTIP_OFFSET_Y],
      shadowSize: [LEAFLET_MARKER_DIMENSIONS.SHADOW.width, LEAFLET_MARKER_DIMENSIONS.SHADOW.width],
      xmlns: XML_NAMESPACES.SVG // W3C SVG namespace from @layera/constants SSOT
    },
    alert: {
      iconSize: [30, 48], // LEAFLET API requirement - cannot use design tokens
      iconAnchor: [ICON_DIMENSIONS.MAP.ALERT.anchor.x, ICON_DIMENSIONS.MAP.ALERT.anchor.y],
      popupAnchor: [1, ICON_DIMENSIONS.MAP.ALERT.popup.offsetY], // From @layera/tokens SSOT
      tooltipAnchor: [ICON_DIMENSIONS.MAP.TOOLTIP.anchorX, ICON_DIMENSIONS.MAP.ALERT.tooltip.offsetY], // From @layera/tokens SSOT
      shadowSize: [ICON_DIMENSIONS.MAP.ALERT.shadow.size, ICON_DIMENSIONS.MAP.ALERT.shadow.size]
    }
  }
} as const;

// Geometry Validation Configuration
export const GEOMETRY_CONFIG = {
  validation: {
    minArea: 100, // 100 square meters minimum
    maxArea: GEOMETRIC_LIMITS.MAX_AREA_SQM, // 1 km² - geometric validation limit (app-specific)
    minPolygonPoints: 3,
    areaConversionFactor: 111319.9 // Approximate meters per degree
  }
} as const;

// Earth Scientific Constants
export const EARTH_CONFIG = {
  radiusMeters: EARTH_CONSTANTS.RADIUS_METERS, // Earth's radius in meters (WGS84) - from SSOT
  metersPerDegree: 111319.9, // Meters per degree at equator
  maxLatitude: 90,
  minLatitude: -90,
  maxLongitude: 180,
  minLongitude: -180
} as const;

// Ruler & Measurement Configuration
export const RULER_CONFIG = {
  size: 40, // Ruler size in pixels - UI constant (app-specific)
  tickDensityFactors: {
    low: 1.5,
    medium: 1.0,
    high: 0.7
  },
  tickValues: {
    maxTick: GEOMETRIC_LIMITS.MAX_TICK_VALUE, // Maximum normalized tick value from SSOT
    fileSizeMB: 200, // File size in MB for calculations
    mediumTick: RULER_TICK_VALUES.MEDIUM_TICK, // Medium scale tick value - geometric constant
    largeTick: RULER_TICK_VALUES.LARGE_TICK, // Large scale tick value - geometric constant
    smallTick: RULER_TICK_VALUES.SMALL_SCALE_TICK, // Small scale tick value - geometric constant
    largeTick2: RULER_TICK_VALUES.LARGE_SCALE_TICK_2, // Large scale tick value 2 - geometric constant
    intermediateTick1: RULER_TICK_VALUES.INTERMEDIATE_TICK_1, // Intermediate tick value 1 - geometric constant
    intermediateTick2: RULER_TICK_VALUES.INTERMEDIATE_TICK_2, // Intermediate tick value 2 - geometric constant
    intermediateTick3: RULER_TICK_VALUES.INTERMEDIATE_TICK_3, // Intermediate tick value 3 - geometric constant
    xlTick: RULER_TICK_VALUES.XL_TICK, // Extra large tick value - geometric constant
    xxlTick: RULER_TICK_VALUES.XXL_TICK // Extra extra large tick value - geometric constant
  },
  goodNormalizedTicks: [ // Ruler tick intervals - geometric scale constants
    0.00001, 0.00002, 0.00005, 0.0001, 0.0002, 0.0005,
    0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5,
    1, 2, 5, 10, 20, RULER_TICK_VALUES.SMALL_TICK, 100, RULER_TICK_VALUES.MEDIUM_TICK, RULER_TICK_VALUES.LARGE_TICK,
    RULER_TICK_VALUES.LARGE_TICK_2, RULER_TICK_VALUES.INTERMEDIATE_TICK_1, RULER_TICK_VALUES.INTERMEDIATE_TICK_2, RULER_TICK_VALUES.INTERMEDIATE_TICK_3, RULER_TICK_VALUES.XL_TICK, RULER_TICK_VALUES.XXL_TICK, RULER_TICK_VALUES.MAX_TICK
  ]
} as const;

// Form & Input Configuration
export const FORM_CONFIG = {
  validation: {
    maxLength: {
      title: COMPONENT_DESIGN_TOKENS.forms['max-length-title'],
      description: COMPONENT_DESIGN_TOKENS.forms['max-length-description'],
      name: COMPONENT_DESIGN_TOKENS.forms['max-length-name']
    },
    debounceMs: COMPONENT_DESIGN_TOKENS.forms['debounce-ms'],
    maxValues: {
      duration: 120, // Maximum duration for availability details
      totalFileSize: RULER_CONFIG.tickValues.fileSizeMB * FILE_SIZE_CONSTANTS.BYTES_IN_KB * FILE_SIZE_CONSTANTS.BYTES_IN_KB // 200MB total file upload limit
    }
  },
  bottomSheet: {
    maxHeight: '40vh',
    borderRadius: {
      top: 16 // var(--la-space-4) equivalent
    }
  },
  zIndex: {
    modalOverlay: FILE_SIZE_CONSTANTS.MODAL_Z_INDEX // Z-index for modal overlays
  }
} as const;

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  duration: {
    short: COMPONENT_DESIGN_TOKENS.forms['validation-timeout-short'],
    medium: COMPONENT_DESIGN_TOKENS.forms['validation-timeout-medium'],
    long: COMPONENT_DESIGN_TOKENS.forms['validation-timeout-long']
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
  },
  searchLimits: {
    maxOccupationResults: FILE_SIZE_CONSTANTS.MAX_OCCUPATION_RESULTS // Maximum ESCO occupation search results
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