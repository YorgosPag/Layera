/**
 * 📐 LAYERA LAYOUT VARIANTS - Semantic layout patterns
 *
 * Maps layout system to meaningful component contexts.
 * Provides semantic naming for common layout patterns.
 *
 * Enterprise Standards:
 * - Semantic over technical naming
 * - Responsive design patterns
 * - Consistent component behavior
 */

import type { LayoutVariant, LayoutTokensClass } from './layout.class';

// Semantic layout variants for different component contexts
export const LAYOUT_VARIANTS = {
  // Container layouts
  container: {
    type: 'contained',
    maxWidth: 'var(--layera-layout-container-content)',
    padding: 'var(--layera-spacing-medium)',
    margin: '0 auto',
    behavior: 'responsive-centered',
  },

  'full-width': {
    type: 'fluid',
    maxWidth: '100%',
    padding: 'var(--layera-spacing-small)',
    margin: '0',
    behavior: 'full-viewport',
  },

  sidebar: {
    type: 'aside',
    width: 'var(--layera-layout-sidebar-width)',
    collapsedWidth: 'var(--layera-layout-sidebar-collapsed)',
    padding: 'var(--layera-spacing-medium)',
    behavior: 'collapsible',
  },

  // Grid layouts
  grid: {
    type: 'grid',
    display: 'grid',
    gap: 'var(--layera-spacing-medium)',
    columns: 'var(--layera-layout-grid-columns)',
    behavior: 'responsive-grid',
  },

  // Stack layouts (vertical)
  stack: {
    type: 'flex',
    direction: 'column',
    gap: 'var(--layera-spacing-medium)',
    align: 'stretch',
    behavior: 'vertical-flow',
  },

  // Cluster layouts (horizontal)
  cluster: {
    type: 'flex',
    direction: 'row',
    gap: 'var(--layera-spacing-small)',
    align: 'center',
    behavior: 'horizontal-flow',
  },

  // Cover layout (full height)
  cover: {
    type: 'flex',
    direction: 'column',
    minHeight: '100vh',
    justify: 'center',
    behavior: 'full-height',
  },

  // Switcher layout (responsive)
  switcher: {
    type: 'flex',
    direction: 'row',
    wrap: 'wrap',
    gap: 'var(--layera-spacing-medium)',
    behavior: 'responsive-switch',
  },
} as const;

// Responsive layout behavior patterns
export const RESPONSIVE_PATTERNS = {
  mobile: {
    container: {
      padding: 'var(--layera-spacing-small)',
      margin: 'var(--layera-spacing-micro)',
    },
    grid: {
      columns: '1fr',
      gap: 'var(--layera-spacing-small)',
    },
    stack: {
      gap: 'var(--layera-spacing-small)',
    },
    cluster: {
      direction: 'column',
      gap: 'var(--layera-spacing-micro)',
    },
  },

  tablet: {
    container: {
      padding: 'var(--layera-spacing-medium)',
      margin: 'var(--layera-spacing-small)',
    },
    grid: {
      columns: 'repeat(2, 1fr)',
      gap: 'var(--layera-spacing-medium)',
    },
    stack: {
      gap: 'var(--layera-spacing-medium)',
    },
    cluster: {
      direction: 'row',
      gap: 'var(--layera-spacing-small)',
    },
  },

  desktop: {
    container: {
      padding: 'var(--layera-spacing-large)',
      margin: 'var(--layera-spacing-medium)',
    },
    grid: {
      columns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'var(--layera-spacing-large)',
    },
    stack: {
      gap: 'var(--layera-spacing-large)',
    },
    cluster: {
      direction: 'row',
      gap: 'var(--layera-spacing-medium)',
    },
  },
} as const;

// Component-specific layout variants
export const COMPONENT_LAYOUTS = {
  // Header layouts
  header: {
    standard: {
      height: 'var(--layera-layout-header-height)',
      padding: '0 var(--layera-spacing-medium)',
      position: 'sticky',
      top: '0',
      zIndex: 'var(--layera-layout-z-header)',
    },
    minimal: {
      height: 'var(--layera-layout-header-minimal)',
      padding: '0 var(--layera-spacing-small)',
      position: 'static',
    },
  },

  // Modal layouts
  modal: {
    small: {
      width: 'var(--layera-layout-modal-small)',
      maxWidth: '90vw',
      padding: 'var(--layera-spacing-large)',
    },
    medium: {
      width: 'var(--layera-layout-modal-medium)',
      maxWidth: '80vw',
      padding: 'var(--layera-spacing-large)',
    },
    large: {
      width: 'var(--layera-layout-modal-large)',
      maxWidth: '70vw',
      padding: 'var(--layera-spacing-macro)',
    },
    fullscreen: {
      width: '100vw',
      height: '100vh',
      padding: 'var(--layera-spacing-large)',
    },
  },

  // Card layouts
  card: {
    compact: {
      padding: 'var(--layera-spacing-small)',
      margin: 'var(--layera-spacing-micro)',
    },
    standard: {
      padding: 'var(--layera-spacing-medium)',
      margin: 'var(--layera-spacing-small)',
    },
    spacious: {
      padding: 'var(--layera-spacing-large)',
      margin: 'var(--layera-spacing-medium)',
    },
  },

  // Map layout (critical for our app!)
  map: {
    fullscreen: {
      width: '100%',
      height: 'calc(100vh - var(--layera-layout-header-height))',
      position: 'relative',
      overflow: 'hidden',
    },
    embedded: {
      width: '100%',
      height: '400px',
      position: 'relative',
      borderRadius: 'var(--layera-spacing-small)',
    },
    sidebar: {
      width: 'calc(100% - var(--layera-layout-sidebar-width))',
      height: 'calc(100vh - var(--layera-layout-header-height))',
      position: 'relative',
    },
  },
} as const;

// Export types for TypeScript usage
export type LayoutVariantKey = keyof typeof LAYOUT_VARIANTS;
export type ResponsiveBreakpoint = keyof typeof RESPONSIVE_PATTERNS;
export type ComponentLayoutKey = keyof typeof COMPONENT_LAYOUTS;