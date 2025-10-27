/**
 * 🎯 SNAP CONSTANTS
 * Constants για το snap-to-geometry system
 */

// ========================================
// 🎯 SNAP CONFIGURATION DEFAULTS
// ========================================

export const SNAP_CONSTANTS = {
  // Default snap tolerance σε pixels
  DEFAULT_TOLERANCE: 10,

  // Maximum results από spatial queries
  MAX_RESULTS: 50,

  // Snap type priorities (0-100, higher = more priority)
  DEFAULT_PRIORITIES: {
    endpoint: 100,
    midpoint: 80,
    center: 90,
    vertex: 85,
    intersection: 95,
    perpendicular: 70,
    tangent: 65,
    nearest: 60,
    grid: 50,
    edge: 75
  },

  // Spatial index configuration
  SPATIAL_INDEX: {
    MAX_ENTRIES: 16,
    MIN_ENTRIES: 4,
    AUTO_REBALANCE_THRESHOLD: 1000
  },

  // Performance thresholds
  PERFORMANCE: {
    HIGH_GEOMETRY_COUNT: 10000,
    MEDIUM_GEOMETRY_COUNT: 5000,
    LOW_GEOMETRY_COUNT: 1000,

    MAX_SEARCH_TIME_MS: 16, // ~60fps
    INDEX_REBUILD_WARNING_MS: 100
  },

  // Visual feedback
  VISUAL: {
    INDICATOR_SIZE: 16,
    CURSOR_SIZE: 24,
    ANIMATION_DURATION_MS: 200,
    GUIDELINE_OPACITY: 0.6
  }
} as const;

// ========================================
// 🎨 SNAP VISUAL CONSTANTS
// ========================================

export const SNAP_VISUAL = {
  // Colors per snap type (theme-aware)
  COLORS: {
    light: {
      endpoint: 'var(--layera-color-red-400, #ff6b6b)',
      midpoint: 'var(--layera-color-teal-400, #4ecdc4)',
      center: 'var(--layera-color-blue-400, #45b7d1)',
      vertex: 'var(--layera-color-green-300, #96ceb4)',
      intersection: 'var(--layera-color-yellow-200, #ffeaa7)',
      perpendicular: 'var(--layera-color-purple-300, #dda0dd)',
      tangent: 'var(--layera-color-teal-300, #98d8c8)',
      nearest: 'var(--layera-color-yellow-300, #f7dc6f)',
      grid: 'var(--layera-color-purple-400, #bb8fce)',
      edge: 'var(--layera-color-blue-300, #85c1e9)'
    },
    dark: {
      endpoint: 'var(--layera-color-red-600, #e74c3c)',
      midpoint: 'var(--layera-color-teal-600, #1abc9c)',
      center: 'var(--layera-color-blue-600, #3498db)',
      vertex: 'var(--layera-color-green-600, #2ecc71)',
      intersection: 'var(--layera-color-orange-600, #f39c12)',
      perpendicular: 'var(--layera-color-purple-600, #9b59b6)',
      tangent: 'var(--layera-color-teal-700, #16a085)',
      nearest: 'var(--layera-color-yellow-600, #f1c40f)',
      grid: 'var(--layera-color-purple-700, #8e44ad)',
      edge: 'var(--layera-color-blue-700, #2980b9)'
    }
  },

  // Icons per snap type
  ICONS: {
    endpoint: 'square',
    midpoint: 'triangle',
    center: 'circle',
    vertex: 'diamond',
    intersection: 'cross',
    perpendicular: 'perpendicular',
    tangent: 'tangent',
    nearest: 'target',
    grid: 'grid',
    edge: 'line'
  }
} as const;

// ========================================
// 📱 DEVICE-SPECIFIC DEFAULTS
// ========================================

export const SNAP_DEVICE_DEFAULTS = {
  DESKTOP: {
    tolerance: 10,
    showGuidelines: true,
    showTooltips: true,
    animationEnabled: true,
    maxGeometries: 10000
  },

  TABLET: {
    tolerance: 15,
    showGuidelines: true,
    showTooltips: false,
    animationEnabled: true,
    maxGeometries: 5000
  },

  MOBILE: {
    tolerance: 25,
    showGuidelines: false,
    showTooltips: false,
    animationEnabled: false,
    maxGeometries: 1000
  }
} as const;

// ========================================
// 🎯 SNAP TYPE GROUPS
// ========================================

export const SNAP_TYPE_GROUPS = {
  BASIC: ['endpoint', 'midpoint', 'center', 'vertex'] as const,
  ADVANCED: ['intersection', 'grid', 'edge'] as const,
  PRECISION: ['perpendicular', 'tangent', 'nearest'] as const,

  CAD_RECOMMENDED: ['endpoint', 'midpoint', 'center', 'vertex', 'intersection'] as const,
  GIS_RECOMMENDED: ['endpoint', 'vertex', 'nearest'] as const,
  MOBILE_RECOMMENDED: ['endpoint', 'vertex'] as const
} as const;