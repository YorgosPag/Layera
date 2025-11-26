/**
 * 🧭 LAYERA NAVIGATION CLASS - Navigation component system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το navigation component system
 * Χρησιμοποιείται για validation, type safety και CSS generation σε Navigation components
 */

import { NAVIGATION_VARIABLES, NavigationType, NavigationState, NavigationVariant, NavigationSize } from './navigation.variables';
import { NAVIGATION_VARIANTS, NavigationSizeVariant, NavigationTypeVariant, NavigationStateVariant, NavigationStyleVariant } from './navigation.variants';

// NAVIGATION COMPONENT SYSTEM CLASS - Enterprise structure
export class NavigationComponentSystem {
  // Component tokens
  static readonly variables = NAVIGATION_VARIABLES;
  static readonly variants = NAVIGATION_VARIANTS;

  // Validation methods
  static isValidType(type: string): type is NavigationType {
    return ['navbar', 'sidebar', 'breadcrumb', 'menu', 'dropdown', 'tabs', 'mobile', 'pagination'].includes(type);
  }

  static isValidState(state: string): state is NavigationState {
    return ['default', 'hover', 'active', 'disabled', 'loading'].includes(state);
  }

  static isValidVariant(variant: string): variant is NavigationVariant {
    return ['default', 'primary', 'secondary', 'ghost', 'minimal'].includes(variant);
  }

  static isValidSize(size: string): size is NavigationSize {
    return ['sm', 'md', 'lg'].includes(size);
  }

  // Helper για CSS generation - Δημιουργεί complete CSS rules για navigation
  static getNavigationCSS(
    type: NavigationType = 'navbar',
    variant: NavigationVariant = 'default',
    size: NavigationSize = 'md',
    state: NavigationState = 'default'
  ) {
    const typeStyle = this.variants.type[type];
    const variantStyle = this.variants.style[variant];
    const sizeStyle = this.variants.size[size];
    const stateStyle = this.variants.state[state];

    return {
      // Base styles from type
      ...typeStyle,

      // Override with variant styles
      background: variantStyle.background || typeStyle.background,
      border: variantStyle.border || typeStyle.border,
      borderRadius: variantStyle.borderRadius || typeStyle.borderRadius,
      shadow: variantStyle.shadow || typeStyle.shadow,

      // Size styles
      padding: sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      height: sizeStyle.height,

      // State styles
      color: stateStyle.color,
      cursor: stateStyle.cursor || 'pointer',
      opacity: stateStyle.opacity || '1',
      transform: stateStyle.transform || 'none',

      // Universal navigation properties
      transition: this.variables['nav-transition'],
      outline: 'none',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: this.variables['nav-gap'],
    };
  }

  // Helper για generating CSS classes
  static generateCSSClasses() {
    let css = '';

    // Base navigation classes
    css += `
/* 🧭 LAYERA NAVIGATION COMPONENTS */

.layera-nav {
  display: flex;
  align-items: center;
  gap: var(--layera-nav-gap);
  transition: var(--layera-nav-transition);
  text-decoration: none;
  outline: none;
}

.layera-nav-item {
  display: flex;
  align-items: center;
  padding: var(--layera-nav-item-padding);
  margin: var(--layera-nav-item-margin);
  border-radius: var(--layera-nav-border-radius);
  transition: var(--layera-nav-transition);
  cursor: pointer;
  text-decoration: none;
  color: var(--layera-nav-text-color);
  background: var(--layera-nav-background);
}

.layera-nav-item:hover {
  background: var(--layera-nav-background-hover);
  color: var(--layera-nav-text-hover);
  transform: translateY(-1px);
}

.layera-nav-item:active,
.layera-nav-item.active {
  background: var(--layera-nav-background-active);
  color: var(--layera-nav-text-active);
  font-weight: 600;
}

.layera-nav-item:disabled,
.layera-nav-item.disabled {
  background: var(--layera-nav-background-disabled);
  color: var(--layera-nav-text-disabled);
  cursor: not-allowed;
  opacity: var(--layera-nav-disabled-opacity);
  pointer-events: none;
}

.layera-nav-link {
  color: var(--layera-nav-link-color);
  text-decoration: none;
  transition: var(--layera-nav-transition);
}

.layera-nav-link:hover {
  color: var(--layera-nav-link-hover);
}

.layera-nav-icon {
  width: var(--layera-nav-icon-size);
  height: var(--layera-nav-icon-size);
  color: var(--layera-nav-icon-color);
  margin-right: var(--layera-nav-icon-margin);
}

.layera-nav-icon:hover {
  color: var(--layera-nav-icon-hover);
}
`;

    // Navigation type classes
    Object.entries(this.variants.type).forEach(([type, styles]) => {
      css += `
.layera-nav--${type} {`;
      Object.entries(styles).forEach(([property, value]) => {
        const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        css += `
  ${cssProperty}: ${value};`;
      });
      css += `
}
`;
    });

    // Navigation size classes
    Object.entries(this.variants.size).forEach(([size, styles]) => {
      css += `
.layera-nav--${size} {`;
      Object.entries(styles).forEach(([property, value]) => {
        const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        css += `
  ${cssProperty}: ${value};`;
      });
      css += `
}
`;
    });

    // Navigation style classes
    Object.entries(this.variants.style).forEach(([variant, styles]) => {
      css += `
.layera-nav--${variant} {`;
      Object.entries(styles).forEach(([property, value]) => {
        const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        css += `
  ${cssProperty}: ${value};`;
      });
      css += `
}
`;
    });

    return css;
  }

  // Helper για component props
  static getComponentProps(
    type: NavigationType = 'navbar',
    variant: NavigationVariant = 'default',
    size: NavigationSize = 'md',
    state: NavigationState = 'default'
  ) {
    return {
      'data-type': type,
      'data-variant': variant,
      'data-size': size,
      'data-state': state,
      className: `layera-nav layera-nav--${type} layera-nav--${variant} layera-nav--${size}`,
      role: type === 'navbar' ? 'navigation' : type === 'breadcrumb' ? 'navigation' : 'menu',
      'aria-label': type === 'navbar' ? 'Main navigation' : type === 'breadcrumb' ? 'Breadcrumb' : 'Menu',
    };
  }
}

// NAVIGATION COMPONENT RULES - Enterprise specifications
export const NAVIGATION_COMPONENT_RULES = {
  // Usage guidelines
  usage: {
    navbar: 'Primary site navigation, usually horizontal at the top',
    sidebar: 'Secondary navigation, vertical sidebar layout',
    breadcrumb: 'Page hierarchy navigation, shows current location',
    menu: 'Contextual menu items, dropdown or popup menus',
    dropdown: 'Collapsible menu items with nested options',
    tabs: 'Tab-based navigation within a page or component',
    mobile: 'Mobile-optimized navigation, typically bottom nav',
    pagination: 'Page navigation for large datasets or content',
  },

  // Accessibility guidelines
  accessibility: {
    keyboard: 'Full keyboard navigation support (Tab, Enter, Arrow keys)',
    aria: 'Proper ARIA attributes (role, aria-label, aria-current)',
    focus: 'Visible focus indicators for keyboard users',
    screen_reader: 'Screen reader friendly labels and descriptions',
    skip_links: 'Skip navigation links for main content',
  },

  // UX guidelines
  ux: {
    hierarchy: 'Clear visual hierarchy with primary and secondary navigation',
    consistency: 'Consistent navigation patterns across the application',
    breadcrumbs: 'Breadcrumbs for complex page hierarchies',
    responsive: 'Mobile-friendly navigation with appropriate breakpoints',
    current_page: 'Clear indication of current page or active section',
  },

  // Implementation guidelines
  implementation: {
    semantic_html: 'Use semantic HTML elements (nav, ul, li, a)',
    state_management: 'Proper active/current state management',
    routing: 'Integration with routing system for SPA navigation',
    performance: 'Lazy loading for large menu structures',
    seo: 'SEO-friendly navigation structure and URLs',
  },

  // Component mapping suggestions
  componentMapping: {
    main_nav: ['navbar type', 'primary variant', 'md size'],
    user_menu: ['dropdown type', 'ghost variant', 'sm size'],
    page_tabs: ['tabs type', 'default variant', 'md size'],
    mobile_nav: ['mobile type', 'primary variant', 'md size'],
    breadcrumbs: ['breadcrumb type', 'minimal variant', 'sm size'],
  },
} as const;

// LAYERA-SPECIFIC NAVIGATION CSS CLASSES
export const LAYERA_NAVIGATION_CSS = `
/* 🧭 LAYERA NAVIGATION SPECIFIC CLASSES */

.layera-navbar {
  background: var(--layera-navbar-background);
  border-bottom: var(--layera-navbar-border-bottom);
  height: var(--layera-navbar-height);
  padding: var(--layera-navbar-padding);
  box-shadow: var(--layera-navbar-shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layera-sidebar {
  width: var(--layera-sidebar-width);
  background: var(--layera-sidebar-background);
  border-right: var(--layera-sidebar-border-right);
  padding: var(--layera-sidebar-padding);
  overflow-y: auto;
  transform: translateX(0);
  transition: transform var(--layera-nav-transition);
}

.layera-sidebar.collapsed {
  width: var(--layera-sidebar-width-collapsed);
}

.layera-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--layera-breadcrumb-gap);
  padding: var(--layera-spacing-2) 0;
  font-size: var(--layera-font-size-sm);
}

.layera-breadcrumb-item {
  display: flex;
  align-items: center;
  color: var(--layera-breadcrumb-link-color);
  text-decoration: none;
}

.layera-breadcrumb-item.current {
  color: var(--layera-breadcrumb-current-color);
  font-weight: 500;
}

.layera-breadcrumb-separator {
  color: var(--layera-breadcrumb-separator-color);
  margin: 0 var(--layera-spacing-2);
}

.layera-menu {
  background: var(--layera-menu-background);
  border: var(--layera-menu-border);
  border-radius: var(--layera-menu-border-radius);
  box-shadow: var(--layera-menu-shadow);
  padding: var(--layera-menu-padding);
  min-width: var(--layera-spacing-48);
}

.layera-menu-item {
  display: flex;
  align-items: center;
  padding: var(--layera-menu-item-padding);
  border-radius: var(--layera-menu-item-border-radius);
  cursor: pointer;
  transition: var(--layera-nav-transition);
}

.layera-menu-item:hover {
  background: var(--layera-nav-background-hover);
}

.layera-dropdown {
  position: relative;
  display: inline-block;
}

.layera-dropdown-content {
  background: var(--layera-dropdown-background);
  border: var(--layera-dropdown-border);
  border-radius: var(--layera-dropdown-border-radius);
  box-shadow: var(--layera-dropdown-shadow);
  padding: var(--layera-dropdown-padding);
  max-height: var(--layera-dropdown-max-height);
  overflow-y: auto;
  z-index: var(--layera-dropdown-z-index);
  opacity: 0;
  transform: translateY(-10px);
  transition: all var(--layera-nav-transition);
  pointer-events: none;
}

.layera-dropdown.open .layera-dropdown-content {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

.layera-tabs {
  display: flex;
  border-bottom: var(--layera-tab-border-bottom);
  gap: var(--layera-tab-gap);
}

.layera-tab {
  padding: var(--layera-tab-padding);
  background: var(--layera-tab-background);
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: var(--layera-nav-transition);
  color: var(--layera-nav-text-color);
}

.layera-tab:hover {
  background: var(--layera-nav-background-hover);
}

.layera-tab.active {
  background: var(--layera-tab-background-active);
  border-bottom-color: var(--layera-tab-border-active);
  font-weight: 600;
}

.layera-mobile-nav {
  background: var(--layera-mobile-nav-background);
  border-top: var(--layera-mobile-nav-border-top);
  height: var(--layera-mobile-nav-height);
  padding: var(--layera-mobile-nav-padding);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.layera-pagination {
  display: flex;
  align-items: center;
  gap: var(--layera-pagination-gap);
  padding: var(--layera-spacing-4) 0;
  justify-content: center;
}

.layera-pagination-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--layera-pagination-item-size);
  height: var(--layera-pagination-item-size);
  border-radius: var(--layera-pagination-item-border-radius);
  cursor: pointer;
  transition: var(--layera-nav-transition);
  text-decoration: none;
  color: var(--layera-nav-text-color);
  background: var(--layera-nav-background);
}

.layera-pagination-item:hover {
  background: var(--layera-nav-background-hover);
}

.layera-pagination-item.current {
  background: var(--layera-pagination-current-background);
  color: var(--layera-pagination-current-color);
  font-weight: 600;
}

.layera-pagination-item:disabled {
  opacity: var(--layera-nav-disabled-opacity);
  cursor: not-allowed;
  pointer-events: none;
}

/* Responsive behavior */
@media (max-width: 768px) {
  .layera-navbar {
    padding: 0 var(--layera-spacing-4);
  }

  .layera-sidebar {
    transform: translateX(-100%);
  }

  .layera-sidebar.open {
    transform: translateX(0);
  }

  .layera-dropdown-content {
  }
}
`;