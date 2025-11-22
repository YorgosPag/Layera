/**
 * 📐 LAYERA LAYOUT VARIABLES - Concrete layout values
 *
 * ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΣΚΛΗΡΩΝ ΤΙΜΩΝ για layout!
 * Όλες οι layout τιμές ορίζονται εδώ και μόνο εδώ.
 *
 * Enterprise Standards:
 * - Responsive breakpoints based on common device sizes
 * - Container max-widths for optimal readability
 * - Z-index scale for proper layering
 * - Accessibility-compliant dimensions
 */

import type {
  LayoutBreakpoints,
  LayoutContainers,
  LayoutGrid,
  LayoutZIndex,
  LayoutDimensions,
  LayoutTokensClass
} from './layout.class';

// RESPONSIVE BREAKPOINTS - Mobile-first approach
export const LAYOUT_BREAKPOINTS: LayoutBreakpoints = {
  mobile: '320px',      // Small phones
  tablet: '768px',      // Tablets and large phones
  desktop: '1024px',    // Laptops and small desktops
  wide: '1440px',       // Large desktops
  ultrawide: '1920px',  // Ultra-wide monitors
} as const;

// CONTAINER MAX-WIDTHS - Optimal content widths
export const LAYOUT_CONTAINERS: LayoutContainers = {
  content: '1200px',    // Main content max-width
  reading: '65ch',      // Optimal reading line length (characters)
  form: '480px',        // Form container width
  sidebar: '280px',     // Sidebar width
} as const;

// GRID SYSTEM - Flexible grid foundation
export const LAYOUT_GRID: LayoutGrid = {
  columns: 12,                        // 12-column grid system
  gutters: '1.5rem',                  // 24px grid gutters
  margins: '1rem',                    // 16px container margins
  maxWidth: LAYOUT_CONTAINERS.content, // 1200px max container width
} as const;

// Z-INDEX SCALE - Layering hierarchy
export const LAYOUT_Z_INDEX: LayoutZIndex = {
  base: 0,           // Base layer (normal flow)
  dropdown: 100,     // Dropdown menus
  sticky: 200,       // Sticky elements
  header: 300,       // Fixed headers
  overlay: 400,      // Background overlays
  modal: 500,        // Modal dialogs
  tooltip: 600,      // Tooltips and popovers
  notification: 700, // Notifications and alerts
  emergency: 800,    // Critical emergency content
} as const;

// LAYOUT DIMENSIONS - Key component sizes
export const LAYOUT_DIMENSIONS: LayoutDimensions = {
  headerHeight: '4rem',               // 64px standard header (από LivePlayground)
  footerHeight: '3rem',               // 48px standard footer
  sidebarWidth: '18rem',              // 288px expanded sidebar
  sidebarWidthCollapsed: '4rem',      // 64px collapsed sidebar
  contentMinHeight: 'calc(100vh - 7rem)', // Full height minus header/footer
  touchTargetMinSize: '2.75rem',      // 44px minimum touch target
} as const;

// ENTERPRISE TEXT ALIGNMENT - Layout
export const LAYOUT_TEXT_ALIGN = {
  'layout-text-align-horizontal-left': 'var(--layera-core-text-align-left)',
  'layout-text-align-horizontal-center': 'var(--layera-core-text-align-center)',
  'layout-text-align-horizontal-right': 'var(--layera-core-text-align-right)',
  'layout-text-align-horizontal-justify': 'var(--layera-core-text-align-justify)',
  'layout-text-align-vertical-top': 'var(--layera-core-text-align-vertical-top)',
  'layout-text-align-vertical-middle': 'var(--layera-core-text-align-vertical-middle)',
  'layout-text-align-vertical-bottom': 'var(--layera-core-text-align-vertical-bottom)',
} as const;

// VIEWPORT DIMENSIONS - Από LivePlayground
export const VIEWPORT_DIMENSIONS = {
  fullWidth: '100%',                  // 100% width (από LivePlayground)
  fullHeight: '100vh',                // 100vh height (από LivePlayground)
  fullViewportWidth: '100vw',         // 100vw width (από LivePlayground)
} as const;

// LAYOUT SYSTEM SPECIFIC - Από LivePlayground
export const LAYOUT_SYSTEM_DIMENSIONS = {
  buttonOutlineBorderRadius: '0.375rem', // 6px border radius (από LivePlayground)
} as const;


// MAP SPECIFIC DIMENSIONS (Critical for our application!)
export const MAP_DIMENSIONS = {
  fullHeight: 'calc(100vh - var(--layera-layout-header-height))',
  embeddedHeight: '400px',
  sidebarWidth: 'calc(100% - var(--layera-layout-sidebar-width))',
  containerPadding: '0',               // Maps usually need no padding
  overlayOffset: '1rem',               // Offset for map overlays
  fullWidth: '100%',                   // Full container width
  fullSize: '100%',                    // Full size for map elements
  relativePosition: 'relative',        // Relative positioning for containers
} as const;

// RESPONSIVE LAYOUT VALUES
export const RESPONSIVE_LAYOUT = {
  mobile: {
    containerPadding: '1rem',          // 16px mobile padding
    sidebarWidth: '100%',              // Full width sidebar on mobile
    gridGutters: '1rem',               // Smaller grid gutters
  },
  tablet: {
    containerPadding: '2rem',          // 32px tablet padding
    sidebarWidth: '16rem',             // 256px tablet sidebar
    gridGutters: '1.5rem',             // Standard grid gutters
  },
  desktop: {
    containerPadding: '2rem',          // 32px desktop padding
    sidebarWidth: LAYOUT_DIMENSIONS.sidebarWidth, // Full sidebar width
    gridGutters: '2rem',               // Larger grid gutters
  },
} as const;

// CONSOLIDATED LAYOUT TOKENS - Ready for CSS generation
export const LAYOUT_TOKENS: LayoutTokensClass = {
  breakpoints: LAYOUT_BREAKPOINTS,
  containers: LAYOUT_CONTAINERS,
  grid: LAYOUT_GRID,
  zIndex: LAYOUT_Z_INDEX,
  dimensions: LAYOUT_DIMENSIONS,

  // Layout system configuration
  responsiveStrategy: 'mobile-first',
  gridSystem: 'hybrid',              // Flexbox + CSS Grid
  accessibilityCompliant: true,
} as const;

// CSS CUSTOM PROPERTIES MAPPING
export const LAYOUT_CSS_VARS = {
  // Breakpoints (for CSS media queries)
  '--layera-layout-breakpoint-mobile': LAYOUT_BREAKPOINTS.mobile,
  '--layera-layout-breakpoint-tablet': LAYOUT_BREAKPOINTS.tablet,
  '--layera-layout-breakpoint-desktop': LAYOUT_BREAKPOINTS.desktop,
  '--layera-layout-breakpoint-wide': LAYOUT_BREAKPOINTS.wide,
  '--layera-layout-breakpoint-ultrawide': LAYOUT_BREAKPOINTS.ultrawide,

  // Containers
  '--layera-layout-container-content': LAYOUT_CONTAINERS.content,
  '--layera-layout-container-reading': LAYOUT_CONTAINERS.reading,
  '--layera-layout-container-form': LAYOUT_CONTAINERS.form,
  '--layera-layout-container-sidebar': LAYOUT_CONTAINERS.sidebar,

  // Grid
  '--layera-layout-grid-columns': LAYOUT_GRID.columns.toString(),
  '--layera-layout-grid-gutters': LAYOUT_GRID.gutters,
  '--layera-layout-grid-margins': LAYOUT_GRID.margins,
  '--layera-layout-grid-max-width': LAYOUT_GRID.maxWidth,

  // Z-Index
  '--layera-layout-z-base': LAYOUT_Z_INDEX.base.toString(),
  '--layera-layout-z-dropdown': LAYOUT_Z_INDEX.dropdown.toString(),
  '--layera-layout-z-sticky': LAYOUT_Z_INDEX.sticky.toString(),
  '--layera-layout-z-header': LAYOUT_Z_INDEX.header.toString(),
  '--layera-layout-z-overlay': LAYOUT_Z_INDEX.overlay.toString(),
  '--layera-layout-z-modal': LAYOUT_Z_INDEX.modal.toString(),
  '--layera-layout-z-tooltip': LAYOUT_Z_INDEX.tooltip.toString(),
  '--layera-layout-z-notification': LAYOUT_Z_INDEX.notification.toString(),
  '--layera-layout-z-emergency': LAYOUT_Z_INDEX.emergency.toString(),

  // Dimensions
  '--layera-layout-header-height': LAYOUT_DIMENSIONS.headerHeight,
  '--layera-layout-footer-height': LAYOUT_DIMENSIONS.footerHeight,
  '--layera-layout-sidebar-width': LAYOUT_DIMENSIONS.sidebarWidth,
  '--layera-layout-sidebar-collapsed': LAYOUT_DIMENSIONS.sidebarWidthCollapsed,
  '--layera-layout-content-min-height': LAYOUT_DIMENSIONS.contentMinHeight,
  '--layera-layout-touch-target-min': LAYOUT_DIMENSIONS.touchTargetMinSize,

  // Playground layout classes (από LivePlayground)
  'playground-fullscreen-position': LAYOUT_POSITION.fixed,
  'playground-fullscreen-top': LAYOUT_SPACING.headerOffset,
  'playground-fullscreen-left': '0',
  'playground-fullscreen-right': '0',
  'playground-fullscreen-bottom': '0',
  'playground-fullscreen-width': LAYOUT_VIEWPORT.fullWidth,
  'playground-fullscreen-height': `calc(${LAYOUT_VIEWPORT.fullHeight} - ${LAYOUT_SPACING.headerOffset})`,
  'playground-fullscreen-z-index': LAYOUT_Z_INDEX.modal.toString(),
  'playground-fullscreen-overflow': 'auto',
  'playground-fullscreen-padding': `${LAYOUT_SPACING.large} ${LAYOUT_SPACING.medium}`,
  'playground-fullscreen-background': BACKGROUND_VARIABLES['background-default'],

  // Card grid layout
  'card-grid-display': 'grid',
  'card-grid-columns': `repeat(auto-fit, minmax(${LAYOUT_SPACING.xxxxxLarge}, 1fr))`,
  'card-grid-gap': LAYOUT_SPACING.large,
  'card-grid-padding': LAYOUT_SPACING.large,


  // Map dimensions (Critical!)
  '--layera-layout-map-full-height': MAP_DIMENSIONS.fullHeight,
  '--layera-layout-map-embedded-height': MAP_DIMENSIONS.embeddedHeight,
  '--layera-layout-map-sidebar-width': MAP_DIMENSIONS.sidebarWidth,
  '--layera-layout-map-overlay-offset': MAP_DIMENSIONS.overlayOffset,
  '--layera-layout-map-full-width': MAP_DIMENSIONS.fullWidth,
  '--layera-layout-map-full-size': MAP_DIMENSIONS.fullSize,
  '--layera-layout-map-position': MAP_DIMENSIONS.relativePosition,

  // Width utilities
  '--layera-width-full': VIEWPORT_DIMENSIONS.fullWidth,
} as const;

// Export για χρήση σε άλλα modules
export {
  LAYOUT_BREAKPOINTS as LayoutBreakpoints,
  LAYOUT_CONTAINERS as LayoutContainers,
  LAYOUT_GRID as LayoutGrid,
  LAYOUT_Z_INDEX as LayoutZIndex,
  LAYOUT_DIMENSIONS as LayoutDimensions,
  MAP_DIMENSIONS as MapDimensions,
  RESPONSIVE_LAYOUT as ResponsiveLayout,
  LAYOUT_CSS_VARS as LayoutCSSVars,
};