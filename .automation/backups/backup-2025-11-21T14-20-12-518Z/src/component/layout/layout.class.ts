/**
 * 📐 LAYERA LAYOUT CLASS - Component layout system structure
 *
 * Defines layout system rules, constraints, and behavior patterns.
 * This provides the foundation for consistent layout across all components.
 *
 * Enterprise Standards:
 * - Responsive grid systems with consistent breakpoints
 * - Container max-widths for optimal readability
 * - Standardized gutters and spacing patterns
 * - Accessibility-compliant layout structures
 */

export interface LayoutBreakpoints {
  mobile: string;      // Small screens (320px+)
  tablet: string;      // Medium screens (768px+)
  desktop: string;     // Large screens (1024px+)
  wide: string;        // Extra large screens (1440px+)
  ultrawide: string;   // Ultra wide screens (1920px+)
}

export interface LayoutContainers {
  content: string;     // Main content max-width
  reading: string;     // Optimal reading line length
  form: string;        // Form container width
  modal: string;       // Modal container width
  sidebar: string;     // Sidebar width
}

export interface LayoutGrid {
  columns: number;     // Base grid columns (12 or 16)
  gutters: string;     // Grid gutter spacing
  margins: string;     // Grid container margins
  maxWidth: string;    // Grid container max-width
}

export interface LayoutZIndex {
  base: number;        // Base layer (0)
  dropdown: number;    // Dropdowns (100)
  sticky: number;      // Sticky elements (200)
  header: number;      // Fixed headers (300)
  overlay: number;     // Overlays (400)
  modal: number;       // Modals (500)
  tooltip: number;     // Tooltips (600)
  notification: number; // Notifications (700)
  emergency: number;   // Emergency/critical (800)
}

export interface LayoutDimensions {
  headerHeight: string;        // Standard header height
  footerHeight: string;        // Standard footer height
  sidebarWidth: string;        // Sidebar width (collapsed/expanded)
  sidebarWidthCollapsed: string;
  contentMinHeight: string;    // Minimum content area height
  touchTargetMinSize: string;  // Minimum touch target (44px)
}

export interface LayoutTokensClass {
  breakpoints: LayoutBreakpoints;
  containers: LayoutContainers;
  grid: LayoutGrid;
  zIndex: LayoutZIndex;
  dimensions: LayoutDimensions;

  // Layout behavior rules
  readonly responsiveStrategy: 'mobile-first' | 'desktop-first';
  readonly gridSystem: 'flexbox' | 'css-grid' | 'hybrid';
  readonly accessibilityCompliant: boolean;
}

// Layout variant types for semantic usage
export type LayoutVariant =
  | 'container'      // Standard content container
  | 'full-width'     // Full viewport width
  | 'sidebar'        // Sidebar layout
  | 'grid'           // Grid layout
  | 'stack'          // Vertical stack
  | 'cluster'        // Horizontal cluster
  | 'cover'          // Cover layout
  | 'switcher';      // Responsive switcher

export type LayoutPosition =
  | 'static'
  | 'relative'
  | 'absolute'
  | 'fixed'
  | 'sticky';

export type LayoutDisplay =
  | 'block'
  | 'inline'
  | 'inline-block'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'none';

// Component-specific layout patterns
export interface ComponentLayoutPatterns {
  card: {
    padding: string;
    margin: string;
    maxWidth: string;
  };
  modal: {
    width: string;
    maxWidth: string;
    margin: string;
    padding: string;
  };
  header: {
    height: string;
    padding: string;
    zIndex: number;
  };
  sidebar: {
    width: string;
    collapsedWidth: string;
    padding: string;
  };
  content: {
    maxWidth: string;
    padding: string;
    margin: string;
  };
}