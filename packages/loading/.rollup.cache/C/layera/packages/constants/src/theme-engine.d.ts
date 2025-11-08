/**
 * @layera/constants - Advanced Theme Engine
 *
 * 🌟 World-class theming system που ξεπερνά Material Design 3 και Fluent
 *
 * Features:
 * - Runtime theme switching χωρίς page reload
 * - CSS Custom Properties injection με batch updates
 * - Automatic light/dark/system detection
 * - Color contrast validation (WCAG 2.1 AAA)
 * - Performance-optimized με RAF batching
 * - Memory leak prevention
 * - SSR/SSG compatibility
 * - Accessibility respect (reduced-motion, high-contrast)
 * - Hot theme reloading για development
 */
/**
 * Theme Engine Configuration
 */
export interface ThemeEngineConfig {
    /** CSS selector για injection (default: ':root') */
    rootSelector?: string;
    /** Enable automatic system theme detection */
    enableSystemDetection?: boolean;
    /** Enable reduced motion respect */
    enableReducedMotion?: boolean;
    /** Enable high contrast mode detection */
    enableHighContrast?: boolean;
    /** Enable performance monitoring */
    enablePerformanceMonitoring?: boolean;
    /** Custom theme storage key */
    storageKey?: string;
}
/**
 * Theme State Management
 */
export interface ThemeState {
    /** Current active theme */
    activeTheme: 'light' | 'dark' | 'system';
    /** Resolved theme (light or dark) */
    resolvedTheme: 'light' | 'dark';
    /** System preference */
    systemPreference: 'light' | 'dark';
    /** Reduced motion preference */
    prefersReducedMotion: boolean;
    /** High contrast preference */
    prefersHighContrast: boolean;
    /** Theme loading state */
    isLoading: boolean;
    /** Last update timestamp */
    lastUpdated: number;
}
/**
 * Advanced Theme Engine Class
 */
export declare class LayeraThemeEngine {
    private config;
    private state;
    private mediaQueries;
    private rafId;
    private updateQueue;
    private observers;
    constructor(config?: ThemeEngineConfig);
    /**
     * Initialize theme engine
     */
    private initialize;
    /**
     * Detect system preferences
     */
    private detectSystemPreferences;
    /**
     * Setup media query listeners για dynamic updates
     */
    private setupMediaQueryListeners;
    /**
     * Load persisted theme state από localStorage
     */
    private loadPersistedState;
    /**
     * Persist theme state στο localStorage
     */
    private persistState;
    /**
     * Update resolved theme based on active theme and system preference
     */
    private updateResolvedTheme;
    /**
     * Schedule update using RequestAnimationFrame για performance
     */
    private scheduleUpdate;
    /**
     * Flush all queued updates
     */
    private flushUpdates;
    /**
     * Inject όλα τα CSS design tokens στο DOM
     */
    private injectCSSTokens;
    /**
     * Inject spacing tokens
     */
    private injectSpacingTokens;
    /**
     * Inject color tokens με theme awareness
     */
    private injectColorTokens;
    /**
     * Adjust colors για high contrast mode
     */
    private adjustForHighContrast;
    /**
     * Inject elevation tokens
     */
    private injectElevationTokens;
    /**
     * Inject motion tokens με reduced motion respect
     */
    private injectMotionTokens;
    /**
     * Inject typography tokens
     */
    private injectTypographyTokens;
    /**
     * Inject border radius tokens
     */
    private injectBorderRadiusTokens;
    /**
     * Inject z-index tokens
     */
    private injectZIndexTokens;
    /**
     * Inject component-specific tokens
     */
    private injectComponentTokens;
    /**
     * Inject responsive tokens based on current breakpoint
     */
    private injectResponsiveTokens;
    /**
     * Public API - Set theme
     */
    setTheme(theme: 'light' | 'dark' | 'system'): void;
    /**
     * Public API - Get current state
     */
    getState(): Readonly<ThemeState>;
    /**
     * Public API - Subscribe to state changes
     */
    subscribe(observer: (state: ThemeState) => void): () => void;
    /**
     * Notify observers of state changes
     */
    private notifyObservers;
    /**
     * Cleanup - remove event listeners and clear RAF
     */
    destroy(): void;
}
/**
 * Get or create global theme engine instance
 */
export declare const getThemeEngine: (config?: ThemeEngineConfig) => LayeraThemeEngine;
/**
 * Utility function για CSS-in-JS integration (basic version - για πλήρη React integration χρήσε τα React hooks)
 */
export declare const getDesignTokenVar: (tokenName: string) => string;
/**
 * Utility function για multiple design tokens (basic version - για πλήρη React integration χρήσε τα React hooks)
 */
export declare const getDesignTokenVars: (tokenNames: string[]) => Record<string, string>;
