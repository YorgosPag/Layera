/**
 * @layera/constants - Enterprise React Hooks για Design Token System
 *
 * 🚀 World-class React integration που ξεπερνά Material-UI, Chakra, και Ant Design
 *
 * Features:
 * - Type-safe design token consumption
 * - Runtime theme reactivity
 * - Performance-optimized με memoization
 * - SSR/SSG compatibility
 * - Automatic CSS custom property injection
 * - Theme state management με context
 * - Hot reloading support
 * - TypeScript strict compliance
 */

import React, { useCallback, useEffect, useMemo, useState, useContext, createContext } from 'react';
import { LayeraThemeEngine, ThemeState, ThemeEngineConfig } from './theme-engine';
import {
  CSS_DESIGN_TOKENS,
  COMPONENT_DESIGN_TOKENS,
  SpacingToken,
  ColorToken,
  ElevationToken,
  MotionToken,
  TypographyToken,
  BorderRadiusToken,
  ZIndexToken,
  ComponentToken
} from './design-tokens';

/**
 * Theme Context για React integration
 */
interface LayeraThemeContext {
  engine: LayeraThemeEngine | null;
  state: ThemeState | null;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  isReady: boolean;
}

const ThemeContext = createContext<LayeraThemeContext>({
  engine: null,
  state: null,
  setTheme: () => {},
  isReady: false
});

/**
 * Theme Provider Component - Enterprise-grade setup
 */
interface LayeraThemeProviderProps {
  children: React.ReactNode;
  config?: ThemeEngineConfig;
}

export const LayeraThemeProvider: React.FC<LayeraThemeProviderProps> = ({
  children,
  config
}) => {
  const [engine] = useState(() => new LayeraThemeEngine(config));
  const [state, setState] = useState<ThemeState | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Subscribe στο theme engine για updates
    const unsubscribe = engine.subscribe((newState) => {
      setState(newState);
      if (!isReady && !newState.isLoading) {
        setIsReady(true);
      }
    });

    // Initial state setup
    setState(engine.getState());
    if (!engine.getState().isLoading) {
      setIsReady(true);
    }

    return () => {
      unsubscribe();
      engine.destroy();
    };
  }, [engine, isReady]);

  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    engine.setTheme(theme);
  }, [engine]);

  const contextValue = useMemo(() => ({
    engine,
    state,
    setTheme,
    isReady
  }), [engine, state, setTheme, isReady]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Core hook για theme access
 */
export const useLayeraTheme = (): LayeraThemeContext => {
  const context = useContext(ThemeContext);

  if (context.engine === null) {
    throw new Error('useLayeraTheme must be used within LayeraThemeProvider');
  }

  return context;
};

/**
 * Hook για single design token με type safety
 */
export const useDesignToken = <T extends string>(tokenName: T): string => {
  const { isReady } = useLayeraTheme();

  return useMemo(() => {
    if (typeof window === 'undefined' || !isReady) {
      // SSR fallback - επιστρέφουμε hardcoded value
      return getSSRFallback(tokenName);
    }

    return `var(--${tokenName})`;
  }, [tokenName, isReady]);
};

/**
 * Hook για multiple design tokens με optimized performance
 */
export const useDesignTokens = <T extends readonly string[]>(
  tokenNames: T
): Record<string, string> => {
  const { isReady } = useLayeraTheme();

  return useMemo(() => {
    const result: Record<string, string> = {};

    for (const tokenName of tokenNames) {
      if (typeof window === 'undefined' || !isReady) {
        result[tokenName] = getSSRFallback(tokenName);
      } else {
        result[tokenName] = `var(--${tokenName})`;
      }
    }

    return result;
  }, [tokenNames, isReady]);
};

/**
 * Type-safe spacing hook
 */
export const useSpacing = (token: SpacingToken): string => {
  return useDesignToken(token);
};

/**
 * Type-safe color hook με semantic naming
 */
export const useColor = (token: ColorToken): string => {
  return useDesignToken(token);
};

/**
 * Type-safe elevation hook
 */
export const useElevation = (token: ElevationToken): string => {
  return useDesignToken(token);
};

/**
 * Type-safe motion hook
 */
export const useMotion = (token: MotionToken): string => {
  return useDesignToken(token);
};

/**
 * Type-safe typography hook
 */
export const useTypography = (token: TypographyToken): string => {
  return useDesignToken(token);
};

/**
 * Type-safe border radius hook
 */
export const useBorderRadius = (token: BorderRadiusToken): string => {
  return useDesignToken(token);
};

/**
 * Type-safe z-index hook
 */
export const useZIndex = (token: ZIndexToken): string => {
  return useDesignToken(token);
};

/**
 * Component-specific design tokens hook
 */
export const useComponentTokens = (componentName: ComponentToken): Record<string, string> => {
  const { isReady } = useLayeraTheme();

  return useMemo(() => {
    const componentTokens = COMPONENT_DESIGN_TOKENS[componentName];
    const result: Record<string, string> = {};

    Object.entries(componentTokens).forEach(([key]) => {
      if (typeof window === 'undefined' || !isReady) {
        result[key] = getSSRFallback(key);
      } else {
        result[key] = `var(--${key})`;
      }
    });

    return result;
  }, [componentName, isReady]);
};

/**
 * Advanced hook που επιστρέφει CSS-in-JS object με όλα τα tokens
 */
export const useLayeraDesignSystem = () => {
  const { state, isReady } = useLayeraTheme();

  return useMemo(() => ({
    // Spacing system
    spacing: {
      xxs: useDesignToken('spacing-xxs'),
      xs: useDesignToken('spacing-xs'),
      sm: useDesignToken('spacing-sm'),
      md: useDesignToken('spacing-md'),
      lg: useDesignToken('spacing-lg'),
      xl: useDesignToken('spacing-xl'),
      xxl: useDesignToken('spacing-xxl'),
      xxxl: useDesignToken('spacing-xxxl')
    },

    // Color system
    colors: {
      bg: {
        canvas: useDesignToken('color-bg-canvas'),
        surface: useDesignToken('color-bg-surface'),
        surfaceRaised: useDesignToken('color-bg-surface-raised'),
        surfaceOverlay: useDesignToken('color-bg-surface-overlay')
      },
      text: {
        primary: useDesignToken('color-text-primary'),
        secondary: useDesignToken('color-text-secondary'),
        tertiary: useDesignToken('color-text-tertiary'),
        inverse: useDesignToken('color-text-inverse')
      },
      semantic: {
        info: {
          bg: useDesignToken('color-semantic-info-bg'),
          border: useDesignToken('color-semantic-info-border'),
          text: useDesignToken('color-semantic-info-text')
        },
        success: {
          bg: useDesignToken('color-semantic-success-bg'),
          border: useDesignToken('color-semantic-success-border'),
          text: useDesignToken('color-semantic-success-text')
        },
        warning: {
          bg: useDesignToken('color-semantic-warning-bg'),
          border: useDesignToken('color-semantic-warning-border'),
          text: useDesignToken('color-semantic-warning-text')
        },
        error: {
          bg: useDesignToken('color-semantic-error-bg'),
          border: useDesignToken('color-semantic-error-border'),
          text: useDesignToken('color-semantic-error-text')
        }
      },
      interactive: {
        primary: useDesignToken('color-interactive-primary'),
        primaryHover: useDesignToken('color-interactive-primary-hover'),
        primaryActive: useDesignToken('color-interactive-primary-active')
      },
      border: {
        default: useDesignToken('color-border-default'),
        subtle: useDesignToken('color-border-subtle'),
        strong: useDesignToken('color-border-strong')
      }
    },

    // Elevation system
    elevation: {
      none: useDesignToken('elevation-none'),
      xs: useDesignToken('elevation-xs'),
      sm: useDesignToken('elevation-sm'),
      md: useDesignToken('elevation-md'),
      lg: useDesignToken('elevation-lg'),
      xl: useDesignToken('elevation-xl'),
      xxl: useDesignToken('elevation-xxl')
    },

    // Motion system
    motion: {
      duration: {
        instant: useDesignToken('motion-duration-instant'),
        fast: useDesignToken('motion-duration-fast'),
        normal: useDesignToken('motion-duration-normal'),
        slow: useDesignToken('motion-duration-slow'),
        slower: useDesignToken('motion-duration-slower')
      },
      ease: {
        linear: useDesignToken('motion-ease-linear'),
        ease: useDesignToken('motion-ease-ease'),
        easeIn: useDesignToken('motion-ease-ease-in'),
        easeOut: useDesignToken('motion-ease-ease-out'),
        easeInOut: useDesignToken('motion-ease-ease-in-out'),
        smooth: useDesignToken('motion-ease-smooth'),
        sharp: useDesignToken('motion-ease-sharp'),
        bounce: useDesignToken('motion-ease-bounce')
      },
      transition: {
        fast: useDesignToken('motion-transition-fast'),
        normal: useDesignToken('motion-transition-normal'),
        slow: useDesignToken('motion-transition-slow')
      }
    },

    // Typography system
    typography: {
      fontFamily: {
        sans: useDesignToken('font-family-sans'),
        mono: useDesignToken('font-family-mono')
      },
      fontSize: {
        xs: useDesignToken('font-size-xs'),
        sm: useDesignToken('font-size-sm'),
        md: useDesignToken('font-size-md'),
        lg: useDesignToken('font-size-lg'),
        xl: useDesignToken('font-size-xl'),
        xxl: useDesignToken('font-size-xxl'),
        xxxl: useDesignToken('font-size-xxxl')
      },
      lineHeight: {
        tight: useDesignToken('line-height-tight'),
        normal: useDesignToken('line-height-normal'),
        relaxed: useDesignToken('line-height-relaxed')
      },
      fontWeight: {
        regular: useDesignToken('font-weight-regular'),
        medium: useDesignToken('font-weight-medium'),
        semibold: useDesignToken('font-weight-semibold'),
        bold: useDesignToken('font-weight-bold')
      }
    },

    // Border radius system
    borderRadius: {
      none: useDesignToken('border-radius-none'),
      xs: useDesignToken('border-radius-xs'),
      sm: useDesignToken('border-radius-sm'),
      md: useDesignToken('border-radius-md'),
      lg: useDesignToken('border-radius-lg'),
      xl: useDesignToken('border-radius-xl'),
      xxl: useDesignToken('border-radius-xxl'),
      full: useDesignToken('border-radius-full')
    },

    // Z-index system
    zIndex: {
      base: useDesignToken('z-index-base'),
      elevated: useDesignToken('z-index-elevated'),
      sticky: useDesignToken('z-index-sticky'),
      overlay: useDesignToken('z-index-overlay'),
      modal: useDesignToken('z-index-modal'),
      popover: useDesignToken('z-index-popover'),
      tooltip: useDesignToken('z-index-tooltip'),
      toast: useDesignToken('z-index-toast'),
      mapOverlay: useDesignToken('z-index-map-overlay'),
      mapModal: useDesignToken('z-index-map-modal')
    },

    // Current theme state
    theme: {
      current: state?.resolvedTheme || 'light',
      isLoading: !isReady,
      systemPreference: state?.systemPreference || 'light',
      prefersReducedMotion: state?.prefersReducedMotion || false,
      prefersHighContrast: state?.prefersHighContrast || false
    }
  }), [state, isReady]);
};

/**
 * Hook για responsive design tokens (θα επεκταθεί μελλοντικά)
 */
export const useResponsiveDesignTokens = () => {
  // Placeholder για μελλοντική υλοποίηση responsive tokens
  return useMemo(() => ({
    // Responsive spacing scaling
    getSpacing: (token: SpacingToken, _scale: 'mobile' | 'tablet' | 'desktop' | 'desktopLarge' = 'desktop') => {
      return useDesignToken(token); // For now, θα προσθέσουμε responsive logic αργότερα
    }
  }), []);
};

/**
 * SSR fallback values για hydration consistency
 */
function getSSRFallback(tokenName: string): string {
  // Hardcoded fallbacks για SSR - θα ταιριάζουν με τα design tokens
  const ssrFallbacks: Record<string, string> = {
    // Spacing fallbacks
    'spacing-0': '0',
    'spacing-xxs': '2px',
    'spacing-xs': '4px',
    'spacing-sm': '8px',
    'spacing-md': '16px',
    'spacing-lg': '24px',
    'spacing-xl': '32px',
    'spacing-xxl': '48px',
    'spacing-xxxl': '64px',

    // Color fallbacks (light theme defaults)
    'color-bg-canvas': 'var(--layera-color-white, #ffffff)',
    'color-bg-surface': 'var(--layera-color-gray-50, #fafafa)',
    'color-text-primary': 'var(--layera-color-gray-900, #0f0f0f)',
    'color-text-secondary': 'var(--layera-color-gray-500, #6b7280)',

    // Motion fallbacks
    'motion-duration-fast': '150ms',
    'motion-duration-normal': '250ms',
    'motion-ease-smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',

    // Typography fallbacks
    'font-family-sans': 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    'font-size-md': '1rem',

    // Border radius fallbacks
    'border-radius-md': '6px',
    'border-radius-lg': '8px',

    // Elevation fallbacks
    'elevation-sm': 'var(--layera-shadow-sm, 0 1px 3px rgba(0,0,0,0.1))',

    // Z-index fallbacks
    'z-index-modal': '400',
    'z-index-overlay': '300'
  };

  return ssrFallbacks[tokenName] || '0';
}

/**
 * Development-only hook για debugging design tokens
 */
export const useDesignTokenDebugger = () => {
  const { state, engine } = useLayeraTheme();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return useMemo(() => ({
    // Debug theme state
    themeState: state,

    // Debug available tokens
    availableTokens: {
      spacing: Object.keys(CSS_DESIGN_TOKENS.spacing),
      colors: Object.keys(CSS_DESIGN_TOKENS.colors),
      elevation: Object.keys(CSS_DESIGN_TOKENS.elevation),
      motion: Object.keys(CSS_DESIGN_TOKENS.motion),
      typography: Object.keys(CSS_DESIGN_TOKENS.typography),
      borderRadius: Object.keys(CSS_DESIGN_TOKENS.borderRadius),
      zIndex: Object.keys(CSS_DESIGN_TOKENS.zIndex),
      components: Object.keys(COMPONENT_DESIGN_TOKENS)
    },

    // Debug functions
    logAllTokens: () => {
      console.group('🎨 Layera Design Tokens Debug');
      console.log('Theme State:', state);
      console.log('Available Tokens:', CSS_DESIGN_TOKENS);
      console.log('Component Tokens:', COMPONENT_DESIGN_TOKENS);
      console.groupEnd();
    },

    // Performance monitoring
    getPerformanceMetrics: () => engine?.getState()
  }), [state, engine]);
};