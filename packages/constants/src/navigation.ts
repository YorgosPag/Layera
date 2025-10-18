/**
 * Navigation and routing constants
 */

export const NAVIGATION_TYPES = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  SIDEBAR: 'sidebar',
  BREADCRUMB: 'breadcrumb',
  TAB: 'tab',
  STEPPER: 'stepper'
} as const;

export const MENU_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center'
} as const;

export const LINK_TARGETS = {
  SELF: '_self',
  BLANK: '_blank',
  PARENT: '_parent',
  TOP: '_top'
} as const;

export const ROUTE_PATTERNS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ACCOUNT: '/account',
  SETTINGS: '/settings',
  DATA: '/data',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  MFA_ENROLL: '/mfa-enroll',
  PROFILE: '/profile',
  USERS: '/users',
  ROLES: '/roles',
  AUDIT: '/audit',
  REPORTS: '/reports',
  GEO_ALERTS: '/geo-alerts',
  MAPS: '/maps'
} as const;

export const PAGE_LAYOUTS = {
  FULLSCREEN: 'fullscreen',
  CENTERED: 'centered',
  SIDEBAR: 'sidebar',
  SPLIT: 'split',
  MODAL: 'modal'
} as const;

// Type exports
export type NavigationType = typeof NAVIGATION_TYPES[keyof typeof NAVIGATION_TYPES];
export type MenuPosition = typeof MENU_POSITIONS[keyof typeof MENU_POSITIONS];
export type LinkTarget = typeof LINK_TARGETS[keyof typeof LINK_TARGETS];
export type RoutePattern = typeof ROUTE_PATTERNS[keyof typeof ROUTE_PATTERNS];
export type PageLayout = typeof PAGE_LAYOUTS[keyof typeof PAGE_LAYOUTS];