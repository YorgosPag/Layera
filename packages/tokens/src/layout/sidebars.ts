/**
 * 🗂️ SIDEBAR LAYOUT TOKENS - Navigation System
 *
 * Tokens για το sidebar system που χρησιμοποιείται στο reference implementation
 * Βασισμένο στο HTML prototype sidebar structure:
 * - Primary Sidebar: 250px width, fixed positioning
 * - Header integration: 57-65px header height
 * - Colors από sidebar system
 * - Font family: Arial, sans-serif
 *
 * Υποστηρίζει live updates μέσω CSS Variables
 */

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 SIDEBAR DIMENSION DEFINITIONS - Από HTML mockup
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_SIDEBAR_DIMENSIONS = {
  // Primary sidebar (left navigation)
  primary: {
    width: {
      default: 250, // ⚠️ ΣΗΜΕΙΩΣΗ: ΜΗΝ ΑΛΛΑΞΕΙΣ ΠΟΤΕ ΑΥΤΗ ΤΗΝ ΤΙΜΗ!
                   // Είναι ακριβώς συγχρονισμένη με HTML sidebar (250px)
                   // και τώρα έχουμε πανομοιότυπο πλάτος React ↔ HTML
      collapsed: 60,
      unit: 'px'
    },
    positioning: {
      top: 65, // Συγχρονισμός με HTML: calc(100vh - 65px)
      left: 0,
      zIndex: 999
    }
  },

  // Secondary sidebar (left toggleable)
  secondaryLeft: {
    width: {
      default: 180,
      collapsed: 0,
      unit: 'px'
    },
    positioning: {
      zIndex: 998
    }
  },

  // Right sidebar (design controls)
  right: {
    width: {
      default: 300,
      collapsed: 0,
      unit: 'px'
    },
    positioning: {
      right: 0,
      zIndex: 997
    }
  },

  // Header integration
  header: {
    height: 65, // Συγχρονισμός με HTML: calc(100vh - 65px)
    zIndex: 1000
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎨 SIDEBAR COLOR SYSTEM - Από HTML prototype
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_SIDEBAR_COLORS = {
  // Primary sidebar colors (dark theme)
  primary: {
    background: '#2c3e50',
    color: '#ffffff',
    menuItem: {
      background: '#34495e',
      backgroundHover: '#3498db',
      color: '#ffffff'
    },
    heading: {
      color: '#ecf0f1'
    }
  },

  // Secondary left sidebar colors
  secondaryLeft: {
    background: '#34495e',
    color: '#ffffff'
  },

  // Right sidebar colors (light theme)
  right: {
    background: '#ffffff',
    color: '#333333',
    border: '#e0e0e0'
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📝 SIDEBAR TYPOGRAPHY - Από HTML prototype
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_SIDEBAR_TYPOGRAPHY = {
  fontFamily: 'Arial, sans-serif',

  headings: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    margin: '0 0 1rem 0'
  },

  menuItems: {
    fontSize: 'inherit',
    fontWeight: 'normal',
    padding: '0.75rem'
  },

  inputs: {
    fontSize: '0.85rem',
    padding: '0.5rem'
  },

  buttons: {
    fontSize: 'inherit',
    padding: '0.5rem 1rem'
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 LIVE SIDEBAR VARIABLES - CSS Custom Properties για real-time updates
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_LIVE_SIDEBAR_VARS = {
  // Live dimension variables
  liveDimensions: {
    '--live-sidebar-primary-width': `${LAYERA_SIDEBAR_DIMENSIONS.primary.width.default}px`,
    '--live-sidebar-secondary-left-width': `${LAYERA_SIDEBAR_DIMENSIONS.secondaryLeft.width.default}px`,
    '--live-sidebar-right-width': `${LAYERA_SIDEBAR_DIMENSIONS.right.width.default}px`,
    '--live-header-height': `${LAYERA_SIDEBAR_DIMENSIONS.header.height}px`
  },

  // Live color variables
  liveColors: {
    '--live-sidebar-primary-bg': 'var(--layera-sidebar-primary-background)',
    '--live-sidebar-primary-color': 'var(--layera-sidebar-primary-color)',
    '--live-sidebar-menu-bg': 'var(--layera-sidebar-menu-background)',
    '--live-sidebar-menu-hover-bg': 'var(--layera-sidebar-menu-hover-background)'
  },

  // Base token definitions
  baseTokens: {
    // Dimensions
    '--layera-sidebar-primary-width': `${LAYERA_SIDEBAR_DIMENSIONS.primary.width.default}px`,
    '--layera-sidebar-primary-width-collapsed': `${LAYERA_SIDEBAR_DIMENSIONS.primary.width.collapsed}px`,
    '--layera-sidebar-secondary-left-width': `${LAYERA_SIDEBAR_DIMENSIONS.secondaryLeft.width.default}px`,
    '--layera-sidebar-right-width': `${LAYERA_SIDEBAR_DIMENSIONS.right.width.default}px`,
    '--layera-header-height': `${LAYERA_SIDEBAR_DIMENSIONS.header.height}px`,

    // Positioning
    '--layera-sidebar-primary-top': `${LAYERA_SIDEBAR_DIMENSIONS.primary.positioning.top}px`,
    '--layera-sidebar-primary-left': `${LAYERA_SIDEBAR_DIMENSIONS.primary.positioning.left}px`,
    '--layera-sidebar-primary-z-index': LAYERA_SIDEBAR_DIMENSIONS.primary.positioning.zIndex,

    // Colors
    '--layera-sidebar-primary-background': LAYERA_SIDEBAR_COLORS.primary.background,
    '--layera-sidebar-primary-color': LAYERA_SIDEBAR_COLORS.primary.color,
    '--layera-sidebar-menu-background': LAYERA_SIDEBAR_COLORS.primary.menuItem.background,
    '--layera-sidebar-menu-hover-background': LAYERA_SIDEBAR_COLORS.primary.menuItem.backgroundHover,
    '--layera-sidebar-heading-color': LAYERA_SIDEBAR_COLORS.primary.heading.color,

    // Typography
    '--layera-sidebar-font-family': LAYERA_SIDEBAR_TYPOGRAPHY.fontFamily,
    '--layera-sidebar-heading-margin': LAYERA_SIDEBAR_TYPOGRAPHY.headings.margin,
    '--layera-sidebar-menu-padding': LAYERA_SIDEBAR_TYPOGRAPHY.menuItems.padding,
    '--layera-sidebar-input-padding': LAYERA_SIDEBAR_TYPOGRAPHY.inputs.padding,
    '--layera-sidebar-button-padding': LAYERA_SIDEBAR_TYPOGRAPHY.buttons.padding
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 SIDEBAR UTILITIES - Helper functions
// ═══════════════════════════════════════════════════════════════════════════════════════

export type LayeraSidebarType = 'primary' | 'secondaryLeft' | 'right';
export type LayeraSidebarState = 'open' | 'collapsed';

/**
 * Δημιουργεί live sidebar variable name
 */
export function getLiveSidebarVar(sidebar: LayeraSidebarType, property: string): string {
  return `--live-sidebar-${sidebar.toLowerCase()}-${property}`;
}

/**
 * Παίρνει sidebar width βάσει state
 */
export function getSidebarWidth(sidebar: LayeraSidebarType, state: LayeraSidebarState): number {
  const dimensions = LAYERA_SIDEBAR_DIMENSIONS[sidebar];
  return state === 'collapsed' ? dimensions.width.collapsed : dimensions.width.default;
}

/**
 * Παίρνει sidebar color scheme
 */
export function getSidebarColors(sidebar: LayeraSidebarType) {
  return LAYERA_SIDEBAR_COLORS[sidebar];
}

/**
 * Δημιουργεί CSS για sidebar positioning
 */
export function getSidebarPositioning(sidebar: LayeraSidebarType, headerHeight?: number): Record<string, string | number> {
  const dimensions = LAYERA_SIDEBAR_DIMENSIONS[sidebar];
  const finalHeaderHeight = headerHeight || LAYERA_SIDEBAR_DIMENSIONS.header.height;

  const base = {
    position: 'fixed' as const,
    height: `calc(100vh - ${finalHeaderHeight}px)`,
    minHeight: `calc(100vh - ${finalHeaderHeight}px)`,
    overflowY: 'scroll' as const,
    overflowX: 'hidden' as const,
    boxSizing: 'border-box' as const
  };

  switch (sidebar) {
    case 'primary':
      return {
        ...base,
        top: `${finalHeaderHeight}px`,
        left: '0',
        zIndex: dimensions.positioning.zIndex,
        width: `var(--layera-sidebar-primary-width)`
      };

    case 'right':
      return {
        ...base,
        top: `${finalHeaderHeight}px`,
        right: '0',
        zIndex: dimensions.positioning.zIndex,
        width: `var(--layera-sidebar-right-width)`
      };

    default:
      return base;
  }
}