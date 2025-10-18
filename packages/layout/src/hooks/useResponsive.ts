import { useState, useEffect } from 'react';
import { ResponsiveState, BreakpointSize } from '../types';

/**
 * useResponsive - Hook για responsive state management
 */
export const useResponsive = (): ResponsiveState => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointSize>('lg');

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });

      // Determine current breakpoint
      let breakpoint: BreakpointSize;
      if (width < 640) {
        breakpoint = 'sm';
      } else if (width < 768) {
        breakpoint = 'md';
      } else if (width < 1024) {
        breakpoint = 'lg';
      } else if (width < 1280) {
        breakpoint = 'xl';
      } else {
        breakpoint = '2xl';
      }

      setCurrentBreakpoint(breakpoint);
    };

    // Initial size
    updateSize();

    // Add event listener
    window.addEventListener('resize', updateSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return {
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
    currentBreakpoint,
    windowSize
  };
};