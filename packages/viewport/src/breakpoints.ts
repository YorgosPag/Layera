/**
 * @layera/viewport - Enterprise Breakpoints
 * Single Source of Truth για όλες τις viewport dimensions
 * KADOS Compliant - Design tokens from @layera/tokens
 */

export const LAYERA_BREAKPOINTS = {
  mobile: {
    min: 0,
    max: 767,
    mediaQuery: '@media screen and (max-width: calc(var(--la-spacing-breakpoint-mobile) - 1px))'
  },
  tablet: {
    min: 768,
    max: 1023,
    mediaQuery: '@media screen and (min-width: var(--la-spacing-breakpoint-mobile)) and (max-width: calc(var(--la-spacing-breakpoint-tablet) - 1px))'
  },
  desktop: {
    min: 1024,
    max: 1439,
    mediaQuery: '@media screen and (min-width: var(--la-spacing-breakpoint-tablet)) and (max-width: calc(var(--la-spacing-breakpoint-desktop-large) - 1px))'
  },
  desktopLarge: {
    min: 1440,
    max: Infinity,
    mediaQuery: '@media screen and (min-width: var(--la-spacing-breakpoint-desktop-large))'
  }
} as const;

export const LAYERA_DEVICE_QUERIES = {
  mobileOnly: LAYERA_BREAKPOINTS.mobile.mediaQuery,
  tabletOnly: LAYERA_BREAKPOINTS.tablet.mediaQuery,
  desktopOnly: LAYERA_BREAKPOINTS.desktop.mediaQuery,
  desktopLargeOnly: LAYERA_BREAKPOINTS.desktopLarge.mediaQuery,
  tabletAndUp: '@media screen and (min-width: var(--la-spacing-breakpoint-mobile))',
  desktopAndUp: '@media screen and (min-width: var(--la-spacing-breakpoint-tablet))',
  mobileAndTablet: '@media screen and (max-width: calc(var(--la-spacing-breakpoint-tablet) - 1px))'
} as const;

export type LayeraBreakpoint = keyof typeof LAYERA_BREAKPOINTS;
export type LayeraDeviceQuery = keyof typeof LAYERA_DEVICE_QUERIES;