/**
 * @layera/layout - Responsive Layout Hook με unified breakpoint system
 * ARXES Compliant - Uses @layera/viewport για consistent breakpoint detection
 * Compatible με @layera/layout responsive patterns
 */

import { useViewport } from '@layera/viewport';

/**
 * Hook για responsive layout patterns
 * Χρησιμοποιεί το unified breakpoint system από @layera/viewport
 */
export const useResponsive = () => {
  const {
    currentBreakpoint,
    deviceCategory,
    isMobile,
    isTablet,
    isDesktop,
    isBreakpointOrLarger,
    isBreakpointOrSmaller
  } = useViewport();

  return {
    // Current state
    currentBreakpoint,
    deviceCategory,

    // Legacy boolean helpers
    isMobile,
    isTablet,
    isDesktop,

    // Unified breakpoint helpers
    isBreakpointOrLarger,
    isBreakpointOrSmaller,

    // Layout-specific helpers
    shouldStackOnMobile: isMobile,
    shouldStackOnTablet: isTablet || isMobile,
    shouldUseDesktopLayout: isDesktop,

    // Component layout helpers
    headerLayout: isMobile ? 'minimal' : 'standard' as 'minimal' | 'standard',
    navigationLayout: isMobile ? 'drawer' : 'horizontal' as 'drawer' | 'horizontal',
    sidebarVisible: !isMobile,

    // Grid system helpers
    gridColumns: currentBreakpoint === 'sm' ? 1 :
                 currentBreakpoint === 'md' ? 2 :
                 currentBreakpoint === 'lg' ? 3 :
                 currentBreakpoint === 'xl' ? 4 : 6,

    // Container helpers
    containerMaxWidth: currentBreakpoint === 'sm' ? '100%' :
                       currentBreakpoint === 'md' ? '750px' :
                       currentBreakpoint === 'lg' ? '960px' :
                       currentBreakpoint === 'xl' ? '1140px' : '1320px'
  };
};

/**
 * Hook για conditional rendering βάσει breakpoints
 */
export const useBreakpointMatches = () => {
  const { isBreakpointOrLarger, isBreakpointOrSmaller } = useViewport();

  return {
    // "And up" matches
    smUp: isBreakpointOrLarger('sm'),
    mdUp: isBreakpointOrLarger('md'),
    lgUp: isBreakpointOrLarger('lg'),
    xlUp: isBreakpointOrLarger('xl'),
    '2xlUp': isBreakpointOrLarger('2xl'),

    // "And down" matches
    smDown: isBreakpointOrSmaller('sm'),
    mdDown: isBreakpointOrSmaller('md'),
    lgDown: isBreakpointOrSmaller('lg'),
    xlDown: isBreakpointOrSmaller('xl'),
    '2xlDown': isBreakpointOrSmaller('2xl')
  };
};

export type ResponsiveLayoutInfo = ReturnType<typeof useResponsive>;
export type BreakpointMatches = ReturnType<typeof useBreakpointMatches>;