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
import React from 'react';
import { LayeraThemeEngine, ThemeState, ThemeEngineConfig } from './theme-engine';
import { SpacingToken, ColorToken, ElevationToken, MotionToken, TypographyToken, BorderRadiusToken, ZIndexToken, ComponentToken } from './design-tokens';
/**
 * Theme Context για React integration
 */
interface LayeraThemeContext {
    engine: LayeraThemeEngine | null;
    state: ThemeState | null;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    isReady: boolean;
}
/**
 * Theme Provider Component - Enterprise-grade setup
 */
interface LayeraThemeProviderProps {
    children: React.ReactNode;
    config?: ThemeEngineConfig;
}
export declare const LayeraThemeProvider: React.FC<LayeraThemeProviderProps>;
/**
 * Core hook για theme access
 */
export declare const useLayeraTheme: () => LayeraThemeContext;
/**
 * Hook για single design token με type safety
 */
export declare const useDesignToken: <T extends string>(tokenName: T) => string;
/**
 * Hook για multiple design tokens με optimized performance
 */
export declare const useDesignTokens: <T extends readonly string[]>(tokenNames: T) => Record<string, string>;
/**
 * Type-safe spacing hook
 */
export declare const useSpacing: (token: SpacingToken) => string;
/**
 * Type-safe color hook με semantic naming
 */
export declare const useColor: (token: ColorToken) => string;
/**
 * Type-safe elevation hook
 */
export declare const useElevation: (token: ElevationToken) => string;
/**
 * Type-safe motion hook
 */
export declare const useMotion: (token: MotionToken) => string;
/**
 * Type-safe typography hook
 */
export declare const useTypography: (token: TypographyToken) => string;
/**
 * Type-safe border radius hook
 */
export declare const useBorderRadius: (token: BorderRadiusToken) => string;
/**
 * Type-safe z-index hook
 */
export declare const useZIndex: (token: ZIndexToken) => string;
/**
 * Component-specific design tokens hook
 */
export declare const useComponentTokens: (componentName: ComponentToken) => Record<string, string>;
/**
 * Advanced hook που επιστρέφει CSS-in-JS object με όλα τα tokens
 */
export declare const useLayeraDesignSystem: () => {
    spacing: {
        xxs: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
    };
    colors: {
        bg: {
            canvas: string;
            surface: string;
            surfaceRaised: string;
            surfaceOverlay: string;
        };
        text: {
            primary: string;
            secondary: string;
            tertiary: string;
            inverse: string;
        };
        semantic: {
            info: {
                bg: string;
                border: string;
                text: string;
            };
            success: {
                bg: string;
                border: string;
                text: string;
            };
            warning: {
                bg: string;
                border: string;
                text: string;
            };
            error: {
                bg: string;
                border: string;
                text: string;
            };
        };
        interactive: {
            primary: string;
            primaryHover: string;
            primaryActive: string;
        };
        border: {
            default: string;
            subtle: string;
            strong: string;
        };
    };
    elevation: {
        none: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
    };
    motion: {
        duration: {
            instant: string;
            fast: string;
            normal: string;
            slow: string;
            slower: string;
        };
        ease: {
            linear: string;
            ease: string;
            easeIn: string;
            easeOut: string;
            easeInOut: string;
            smooth: string;
            sharp: string;
            bounce: string;
        };
        transition: {
            fast: string;
            normal: string;
            slow: string;
        };
    };
    typography: {
        fontFamily: {
            sans: string;
            mono: string;
        };
        fontSize: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
            xxxl: string;
        };
        lineHeight: {
            tight: string;
            normal: string;
            relaxed: string;
        };
        fontWeight: {
            regular: string;
            medium: string;
            semibold: string;
            bold: string;
        };
    };
    borderRadius: {
        none: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        full: string;
    };
    zIndex: {
        base: string;
        elevated: string;
        sticky: string;
        overlay: string;
        modal: string;
        popover: string;
        tooltip: string;
        toast: string;
        mapOverlay: string;
        mapModal: string;
    };
    theme: {
        current: "light" | "dark";
        isLoading: boolean;
        systemPreference: "light" | "dark";
        prefersReducedMotion: boolean;
        prefersHighContrast: boolean;
    };
};
/**
 * Hook για responsive design tokens (θα επεκταθεί μελλοντικά)
 */
export declare const useResponsiveDesignTokens: () => {
    getSpacing: (token: SpacingToken, _scale?: "mobile" | "tablet" | "desktop" | "desktopLarge") => string;
};
/**
 * Development-only hook για debugging design tokens
 */
export declare const useDesignTokenDebugger: () => {
    themeState: ThemeState | null;
    availableTokens: {
        spacing: string[];
        colors: string[];
        elevation: string[];
        motion: string[];
        typography: string[];
        borderRadius: string[];
        zIndex: string[];
        components: string[];
    };
    logAllTokens: () => void;
    getPerformanceMetrics: () => Readonly<ThemeState> | undefined;
} | null;
export {};
