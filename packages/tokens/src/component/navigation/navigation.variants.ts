/**
 * 🧭 LAYERA NAVIGATION VARIANTS
 *
 * Navigation component variants που ορίζουν διαφορετικές εκδόσεις navigation components
 * Κάθε variant συνδυάζει tokens για συγκεκριμένες χρήσεις
 */

import { NAVIGATION_VARIABLES } from './navigation.variables';

// NAVIGATION SIZE VARIANTS
export const NAVIGATION_SIZE_VARIANTS = {
  sm: {
    padding: NAVIGATION_VARIABLES['nav-item-padding'],
    fontSize: 'var(--layera-font-size-sm)',
    iconSize: 'var(--layera-spacing-4)',
    height: 'var(--layera-spacing-8)',
  },
  md: {
    padding: NAVIGATION_VARIABLES['nav-item-padding'],
    fontSize: 'var(--layera-font-size-base)',
    iconSize: NAVIGATION_VARIABLES['nav-icon-size'],
    height: 'var(--layera-spacing-10)',
  },
  lg: {
    padding: `var(--layera-spacing-3) var(--layera-spacing-6)`,
    fontSize: 'var(--layera-font-size-lg)',
    iconSize: 'var(--layera-spacing-6)',
    height: 'var(--layera-spacing-12)',
  },
} as const;

// NAVIGATION TYPE VARIANTS
export const NAVIGATION_TYPE_VARIANTS = {
  navbar: {
    background: NAVIGATION_VARIABLES['navbar-background'],
    borderBottom: NAVIGATION_VARIABLES['navbar-border-bottom'],
    height: NAVIGATION_VARIABLES['navbar-height'],
    padding: NAVIGATION_VARIABLES['navbar-padding'],
    shadow: NAVIGATION_VARIABLES['navbar-shadow'],
  },
  sidebar: {
    background: NAVIGATION_VARIABLES['sidebar-background'],
    borderRight: NAVIGATION_VARIABLES['sidebar-border-right'],
    width: NAVIGATION_VARIABLES['sidebar-width'],
    padding: NAVIGATION_VARIABLES['sidebar-padding'],
  },
  breadcrumb: {
    background: 'transparent',
    padding: `var(--layera-spacing-2) 0`,
    gap: NAVIGATION_VARIABLES['breadcrumb-gap'],
    fontSize: 'var(--layera-font-size-sm)',
    color: NAVIGATION_VARIABLES['breadcrumb-link-color'],
  },
  menu: {
    background: NAVIGATION_VARIABLES['menu-background'],
    border: NAVIGATION_VARIABLES['menu-border'],
    borderRadius: NAVIGATION_VARIABLES['menu-border-radius'],
    shadow: NAVIGATION_VARIABLES['menu-shadow'],
    padding: NAVIGATION_VARIABLES['menu-padding'],
  },
  dropdown: {
    background: NAVIGATION_VARIABLES['dropdown-background'],
    border: NAVIGATION_VARIABLES['dropdown-border'],
    borderRadius: NAVIGATION_VARIABLES['dropdown-border-radius'],
    shadow: NAVIGATION_VARIABLES['dropdown-shadow'],
    padding: NAVIGATION_VARIABLES['dropdown-padding'],
    maxHeight: NAVIGATION_VARIABLES['dropdown-max-height'],
    zIndex: NAVIGATION_VARIABLES['dropdown-z-index'],
  },
  mobile: {
    background: NAVIGATION_VARIABLES['mobile-nav-background'],
    borderTop: NAVIGATION_VARIABLES['mobile-nav-border-top'],
    height: NAVIGATION_VARIABLES['mobile-nav-height'],
    padding: NAVIGATION_VARIABLES['mobile-nav-padding'],
  },
  pagination: {
    background: 'transparent',
    gap: NAVIGATION_VARIABLES['pagination-gap'],
    padding: 'var(--layera-spacing-4) 0',
    justifyContent: 'center',
  },
} as const;

// NAVIGATION STATE VARIANTS
export const NAVIGATION_STATE_VARIANTS = {
  default: {
    background: NAVIGATION_VARIABLES['nav-background'],
    color: NAVIGATION_VARIABLES['nav-text-color'],
    border: 'transparent',
    transform: 'none',
  },
  hover: {
    background: NAVIGATION_VARIABLES['nav-background-hover'],
    color: NAVIGATION_VARIABLES['nav-text-hover'],
    border: NAVIGATION_VARIABLES['nav-border-hover'],
    transform: 'translateY(-1px)',
    shadow: NAVIGATION_VARIABLES['nav-shadow-hover'],
  },
  active: {
    background: NAVIGATION_VARIABLES['nav-background-active'],
    color: NAVIGATION_VARIABLES['nav-text-active'],
    border: NAVIGATION_VARIABLES['nav-border-active'],
    transform: 'none',
    fontWeight: '600',
  },
  disabled: {
    background: NAVIGATION_VARIABLES['nav-background-disabled'],
    color: NAVIGATION_VARIABLES['nav-text-disabled'],
    border: 'transparent',
    cursor: 'not-allowed',
    opacity: NAVIGATION_VARIABLES['nav-disabled-opacity'],
  },
  loading: {
    background: NAVIGATION_VARIABLES['nav-loading-opacity'],
    color: NAVIGATION_VARIABLES['nav-text-disabled'],
    cursor: 'wait',
    pointerEvents: 'none' as const,
  },
} as const;

// NAVIGATION STYLE VARIANTS
export const NAVIGATION_STYLE_VARIANTS = {
  default: {
    background: NAVIGATION_VARIABLES['nav-background'],
    border: NAVIGATION_VARIABLES['nav-border'],
    borderRadius: NAVIGATION_VARIABLES['nav-border-radius'],
    shadow: 'none',
  },
  primary: {
    background: 'var(--layera-color-primary-600)',
    border: 'var(--layera-color-primary-600)',
    borderRadius: NAVIGATION_VARIABLES['nav-border-radius'],
    color: 'var(--layera-color-white)',
    shadow: 'var(--layera-shadow-sm)',
  },
  secondary: {
    background: 'var(--layera-color-secondary-100)',
    border: 'var(--layera-color-secondary-200)',
    borderRadius: NAVIGATION_VARIABLES['nav-border-radius'],
    color: 'var(--layera-color-secondary-900)',
    shadow: 'none',
  },
  ghost: {
    background: 'transparent',
    border: 'transparent',
    borderRadius: NAVIGATION_VARIABLES['nav-border-radius'],
    shadow: 'none',
  },
  minimal: {
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    shadow: 'none',
    padding: 'var(--layera-spacing-2)',
  },
} as const;

// NAVIGATION ICON VARIANTS
export const NAVIGATION_ICON_VARIANTS = {
  menu: {
    size: NAVIGATION_VARIABLES['nav-icon-size'],
    color: NAVIGATION_VARIABLES['nav-icon-color'],
    margin: NAVIGATION_VARIABLES['nav-icon-margin'],
  },
  chevron: {
    size: 'var(--layera-spacing-4)',
    color: NAVIGATION_VARIABLES['nav-icon-color'],
    transform: 'rotate(0deg)',
    transition: NAVIGATION_VARIABLES['nav-transition'],
  },
  close: {
    size: NAVIGATION_VARIABLES['nav-icon-size'],
    color: NAVIGATION_VARIABLES['nav-icon-color'],
  },
} as const;

// UNIFIED NAVIGATION VARIANTS
export const NAVIGATION_VARIANTS = {
  size: NAVIGATION_SIZE_VARIANTS,
  type: NAVIGATION_TYPE_VARIANTS,
  state: NAVIGATION_STATE_VARIANTS,
  style: NAVIGATION_STYLE_VARIANTS,
  icon: NAVIGATION_ICON_VARIANTS,
} as const;

// Helper types
export type NavigationSizeVariant = keyof typeof NAVIGATION_SIZE_VARIANTS;
export type NavigationTypeVariant = keyof typeof NAVIGATION_TYPE_VARIANTS;
export type NavigationStateVariant = keyof typeof NAVIGATION_STATE_VARIANTS;
export type NavigationStyleVariant = keyof typeof NAVIGATION_STYLE_VARIANTS;
export type NavigationIconVariant = keyof typeof NAVIGATION_ICON_VARIANTS;