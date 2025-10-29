/**
 * @layera/box-shadows - Enterprise React Hooks
 *
 * 🚀 World-class React hooks για box shadow management
 * Type-safe, performance-optimized, και context-aware
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  getBoxShadowVar,
  getBoxShadowValue,
  COMPLETE_BOX_SHADOW_SYSTEM,
  type BoxShadowToken
} from '../index';

/**
 * Type definitions για hooks
 */
export interface BoxShadowState {
  current: string;
  token: BoxShadowToken;
  cssVar: string;
}

export interface UseBoxShadowOptions {
  /** Initial shadow token */
  initial?: BoxShadowToken;
  /** Enable CSS custom properties */
  useCSSVars?: boolean;
  /** Theme-aware shadow adjustment */
  darkModeIntensity?: number;
}

export interface UseInteractiveShadowOptions extends UseBoxShadowOptions {
  /** Enable hover shadow transition */
  enableHover?: boolean;
  /** Enable active/pressed shadow */
  enableActive?: boolean;
  /** Enable focus shadow */
  enableFocus?: boolean;
  /** Transition duration in ms */
  transitionDuration?: number;
}

export interface UseElevationShadowOptions extends UseBoxShadowOptions {
  /** Initial elevation level (0-7) */
  initialElevation?: number;
  /** Auto-increment elevation on interaction */
  autoElevate?: boolean;
}

export interface UseStatusShadowOptions extends UseBoxShadowOptions {
  /** Status type */
  status?: 'success' | 'warning' | 'error' | 'info';
  /** Enable glow effect */
  enableGlow?: boolean;
}

/**
 * Basic box shadow hook - foundation για όλα τα άλλα hooks
 */
export const useBoxShadow = (options: UseBoxShadowOptions = {}) => {
  const {
    initial = 'none',
    useCSSVars = true,
    darkModeIntensity = 1.5
  } = options;

  const [currentToken, setCurrentToken] = useState<BoxShadowToken>(initial);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches ||
        document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };

    checkDarkMode();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);

    // Listen for theme attribute changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      mediaQuery.removeEventListener('change', checkDarkMode);
      observer.disconnect();
    };
  }, []);

  // Generate box shadow value
  const shadowValue = useMemo(() => {
    const baseValue = getBoxShadowValue(currentToken);

    if (isDarkMode && darkModeIntensity !== 1) {
      return COMPLETE_BOX_SHADOW_SYSTEM.helpers.getDarkModeShadow(currentToken, darkModeIntensity);
    }

    return baseValue;
  }, [currentToken, isDarkMode, darkModeIntensity]);

  // Generate CSS variable reference
  const cssVar = useMemo(() => {
    return useCSSVars ? getBoxShadowVar(currentToken.replace(/([A-Z])/g, '-$1').toLowerCase()) : shadowValue;
  }, [currentToken, useCSSVars, shadowValue]);

  const setState = useCallback((token: BoxShadowToken) => {
    setCurrentToken(token);
  }, []);

  const state: BoxShadowState = useMemo(() => ({
    current: shadowValue,
    token: currentToken,
    cssVar
  }), [shadowValue, currentToken, cssVar]);

  return {
    ...state,
    setShadow: setState,
    isDarkMode,
    // Helper methods
    reset: () => setState(initial),
    none: () => setState('none'),
    // Semantic setters
    setElevation: (level: number) => setState(`elevation${Math.max(0, Math.min(7, level))}` as BoxShadowToken)
  };
};

/**
 * Dynamic shadow hook με runtime customization
 */
export const useDynamicShadow = (options: UseBoxShadowOptions = {}) => {
  const baseHook = useBoxShadow(options);

  const createCustomShadow = useCallback((
    offsetX: number = 0,
    offsetY: number = 4,
    blurRadius: number = 6,
    spreadRadius: number = -1,
    color: string = 'var(--la-shadow-sm)'
  ) => {
    return COMPLETE_BOX_SHADOW_SYSTEM.helpers.createCustomShadow(
      offsetX, offsetY, blurRadius, spreadRadius, color
    );
  }, []);

  const combineShadows = useCallback((...shadows: string[]) => {
    return COMPLETE_BOX_SHADOW_SYSTEM.helpers.combineshadows(...shadows);
  }, []);

  return {
    ...baseHook,
    createCustomShadow,
    combineShadows
  };
};

/**
 * Elevation-based shadow hook (Material Design 3 approach)
 */
export const useElevationShadow = (options: UseElevationShadowOptions = {}) => {
  const {
    initialElevation = 0,
    autoElevate = false,
    ...baseOptions
  } = options;

  const [elevation, setElevation] = useState(initialElevation);
  const shadowHook = useBoxShadow({
    ...baseOptions,
    initial: `elevation${initialElevation}` as BoxShadowToken
  });

  const updateElevation = useCallback((level: number) => {
    const clampedLevel = Math.max(0, Math.min(7, level));
    setElevation(clampedLevel);
    shadowHook.setShadow(`elevation${clampedLevel}` as BoxShadowToken);
  }, [shadowHook]);

  const elevate = useCallback(() => {
    if (autoElevate) {
      updateElevation(elevation + 1);
    }
  }, [elevation, autoElevate, updateElevation]);

  const lower = useCallback(() => {
    updateElevation(elevation - 1);
  }, [elevation, updateElevation]);

  return {
    ...shadowHook,
    elevation,
    setElevation: updateElevation,
    elevate,
    lower,
    // Semantic elevation presets
    surface: () => updateElevation(0),
    raised: () => updateElevation(1),
    container: () => updateElevation(2),
    overlay: () => updateElevation(3),
    dialog: () => updateElevation(4),
    popup: () => updateElevation(5),
    sheet: () => updateElevation(6),
    fullscreen: () => updateElevation(7)
  };
};

/**
 * Interactive shadow hook με state-based transitions
 */
export const useInteractiveShadow = (options: UseInteractiveShadowOptions = {}) => {
  const {
    enableHover = true,
    enableActive = true,
    enableFocus = true,
    transitionDuration = 200,
    ...baseOptions
  } = options;

  const [interactionState, setInteractionState] = useState<'default' | 'hover' | 'active' | 'focus'>('default');
  const shadowHook = useBoxShadow(baseOptions);

  // Update shadow based on interaction state
  useEffect(() => {
    const getInteractiveShadow = (state: typeof interactionState, baseToken: BoxShadowToken) => {
      if (baseToken.includes('button')) {
        return `button${state === 'default' ? 'Default' : state.charAt(0).toUpperCase() + state.slice(1)}` as BoxShadowToken;
      }
      if (baseToken.includes('card')) {
        return `card${state === 'default' ? 'Default' : state.charAt(0).toUpperCase() + state.slice(1)}` as BoxShadowToken;
      }
      return baseToken;
    };

    const newToken = getInteractiveShadow(interactionState, shadowHook.token);
    if (newToken !== shadowHook.token) {
      shadowHook.setShadow(newToken);
    }
  }, [interactionState, shadowHook]);

  const handlers = useMemo(() => ({
    onMouseEnter: enableHover ? () => setInteractionState('hover') : undefined,
    onMouseLeave: enableHover ? () => setInteractionState('default') : undefined,
    onMouseDown: enableActive ? () => setInteractionState('active') : undefined,
    onMouseUp: enableActive ? () => setInteractionState('hover') : undefined,
    onFocus: enableFocus ? () => setInteractionState('focus') : undefined,
    onBlur: enableFocus ? () => setInteractionState('default') : undefined
  }), [enableHover, enableActive, enableFocus]);

  const styles = useMemo(() => ({
    boxShadow: shadowHook.current,
    transition: `box-shadow ${transitionDuration}ms ease-out, transform ${transitionDuration}ms ease-out`
  }), [shadowHook.current, transitionDuration]);

  return {
    ...shadowHook,
    interactionState,
    handlers,
    styles,
    // Manual state setters
    setHover: () => setInteractionState('hover'),
    setActive: () => setInteractionState('active'),
    setFocus: () => setInteractionState('focus'),
    setDefault: () => setInteractionState('default')
  };
};

/**
 * Status-aware shadow hook με semantic coloring
 */
export const useStatusShadow = (options: UseStatusShadowOptions = {}) => {
  const {
    status = 'info',
    enableGlow = false,
    ...baseOptions
  } = options;

  const [currentStatus, setCurrentStatus] = useState(status);
  const [glowEnabled, setGlowEnabled] = useState(enableGlow);

  const shadowHook = useBoxShadow({
    ...baseOptions,
    initial: `shadow${status.charAt(0).toUpperCase() + status.slice(1)}` as BoxShadowToken
  });

  const updateStatus = useCallback((newStatus: typeof status) => {
    setCurrentStatus(newStatus);
    const statusToken = `shadow${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}` as BoxShadowToken;
    shadowHook.setShadow(statusToken);
  }, [shadowHook]);

  const shadowValue = useMemo(() => {
    if (glowEnabled) {
      return COMPLETE_BOX_SHADOW_SYSTEM.helpers.createStatusShadow(currentStatus, 'glow');
    }
    return shadowHook.current;
  }, [shadowHook.current, currentStatus, glowEnabled]);

  return {
    ...shadowHook,
    current: shadowValue,
    status: currentStatus,
    setStatus: updateStatus,
    enableGlow: () => setGlowEnabled(true),
    disableGlow: () => setGlowEnabled(false),
    toggleGlow: () => setGlowEnabled(!glowEnabled),
    // Status presets
    success: () => updateStatus('success'),
    warning: () => updateStatus('warning'),
    error: () => updateStatus('error'),
    info: () => updateStatus('info')
  };
};

/**
 * Specialized component hooks
 */

// Card shadow hook
export const useCardShadow = (options: UseInteractiveShadowOptions = {}) => {
  return useInteractiveShadow({
    ...options,
    initial: 'cardDefault'
  });
};

// Button shadow hook
export const useButtonShadow = (options: UseInteractiveShadowOptions = {}) => {
  return useInteractiveShadow({
    ...options,
    initial: 'buttonDefault'
  });
};

// Input shadow hook
export const useInputShadow = (options: Omit<UseInteractiveShadowOptions, 'enableHover' | 'enableActive'> = {}) => {
  const [inputState, setInputState] = useState<'default' | 'focus' | 'error'>('default');
  const shadowHook = useBoxShadow({
    ...options,
    initial: 'inputDefault'
  });

  useEffect(() => {
    const inputToken = `input${inputState.charAt(0).toUpperCase() + inputState.slice(1)}` as BoxShadowToken;
    shadowHook.setShadow(inputToken);
  }, [inputState, shadowHook]);

  const handlers = useMemo(() => ({
    onFocus: () => setInputState('focus'),
    onBlur: () => setInputState('default')
  }), []);

  return {
    ...shadowHook,
    inputState,
    handlers,
    setFocus: () => setInputState('focus'),
    setError: () => setInputState('error'),
    setDefault: () => setInputState('default')
  };
};

// Modal shadow hook
export const useModalShadow = (options: UseBoxShadowOptions = {}) => {
  return useBoxShadow({
    ...options,
    initial: 'modalDefault'
  });
};

// Tooltip shadow hook
export const useTooltipShadow = (options: UseBoxShadowOptions = {}) => {
  return useBoxShadow({
    ...options,
    initial: 'tooltipDefault'
  });
};

/**
 * System-level hooks
 */

// Complete box shadow system hook
export const useBoxShadowSystem = () => {
  return useMemo(() => COMPLETE_BOX_SHADOW_SYSTEM, []);
};

// Responsive shadow hook
export const useResponsiveShadow = (mobileToken: BoxShadowToken, desktopToken: BoxShadowToken) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return useBoxShadow({
    initial: isMobile ? mobileToken : desktopToken
  });
};

// Theme-aware shadow hook
export const useThemeAwareShadow = (token: BoxShadowToken, darkModeIntensity: number = 1.5) => {
  return useBoxShadow({
    initial: token,
    darkModeIntensity
  });
};

// Animated shadow hook με custom timing
export const useAnimatedShadow = (
  token: BoxShadowToken,
  duration: number = 300,
  easing: string = 'ease-out'
) => {
  const shadowHook = useBoxShadow({ initial: token });

  const animatedStyles = useMemo(() => ({
    boxShadow: shadowHook.current,
    transition: `box-shadow ${duration}ms ${easing}`
  }), [shadowHook.current, duration, easing]);

  return {
    ...shadowHook,
    styles: animatedStyles
  };
};

// Conditional shadow hook
export const useConditionalShadow = (
  condition: boolean,
  trueToken: BoxShadowToken,
  falseToken: BoxShadowToken = 'none'
) => {
  const effectiveToken = condition ? trueToken : falseToken;
  return useBoxShadow({ initial: effectiveToken });
};