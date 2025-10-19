/**
 * @layera/responsive-design - Enterprise LEGO System
 * Breakpoints - Single Source of Truth για όλες τις viewport dimensions
 * Inspired by: Material Design, Tailwind CSS, Bootstrap
 */

export const LAYERA_BREAKPOINTS = {
  mobile: {
    min: 0,
    max: 767,
    mediaQuery: '@media screen and (max-width: 767px)'
  },
  tablet: {
    min: 768,
    max: 1023,
    mediaQuery: '@media screen and (min-width: 768px) and (max-width: 1023px)'
  },
  desktop: {
    min: 1024,
    max: 1439,
    mediaQuery: '@media screen and (min-width: 1024px) and (max-width: 1439px)'
  },
  desktopLarge: {
    min: 1440,
    max: Infinity,
    mediaQuery: '@media screen and (min-width: 1440px)'
  }
} as const;

export const LAYERA_DEVICE_QUERIES = {
  mobileOnly: LAYERA_BREAKPOINTS.mobile.mediaQuery,
  tabletOnly: LAYERA_BREAKPOINTS.tablet.mediaQuery,
  desktopOnly: LAYERA_BREAKPOINTS.desktop.mediaQuery,
  desktopLargeOnly: LAYERA_BREAKPOINTS.desktopLarge.mediaQuery,
  tabletAndUp: '@media screen and (min-width: 768px)',
  desktopAndUp: '@media screen and (min-width: 1024px)',
  mobileAndTablet: '@media screen and (max-width: 1023px)'
} as const;

export type LayeraBreakpoint = keyof typeof LAYERA_BREAKPOINTS;
export type LayeraDeviceQuery = keyof typeof LAYERA_DEVICE_QUERIES;