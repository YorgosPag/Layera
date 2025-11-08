/**
 * @layera/layout - Enterprise Sizing Hooks
 *
 * 🌟 Type-safe React hooks για sizing system
 *
 * Features:
 * - Performance-optimized με useMemo
 * - Type-safe sizing token consumption
 * - CSS custom property integration
 * - Enterprise-grade developer experience
 */
import { type SizingToken } from '../sizing';
/**
 * Hook για single sizing token usage
 */
export declare const useSizing: (token: SizingToken) => {
    value: string | number;
    cssVar: string;
    token: "XS" | "SM" | "MD" | "LG" | "XL" | "XXL" | "VIEWPORT_WIDTH" | "VIEWPORT_HEIGHT" | "MIN_CONTENT" | "MAX_CONTENT" | "FIT_CONTENT" | "CONTAINER_SM" | "CONTAINER_MD" | "CONTAINER_LG" | "CONTAINER_XL" | "CONTAINER_XXL" | "LAYOUT_SM" | "LAYOUT_MD" | "LAYOUT_LG" | "LAYOUT_XL" | "LAYOUT_XXL" | "LAYOUT_XXXL";
    scale: "var(--la-space-1)" | "var(--la-space-2)" | "var(--la-space-4)" | "var(--la-space-6)" | "var(--la-space-8)" | "var(--la-space-12)" | "var(--la-space-16)" | "var(--la-space-20)" | "var(--la-space-24)" | "var(--la-space-32)" | 600 | 768 | 1200 | 1400 | 1600 | "100%" | "min-content" | "max-content" | "fit-content";
};
/**
 * Hook για multiple sizing tokens usage
 */
export declare const useSizingTokens: <T extends readonly SizingToken[]>(tokens: T) => Record<string, {
    value: string | number;
    cssVar: string;
    token: SizingToken;
}>;
/**
 * Hook για complete sizing system access
 */
export declare const useSizingSystem: () => void;
/**
 * Hook για responsive sizing (μελλοντική χρήση με breakpoints)
 */
export declare const useResponsiveSizing: () => void;
/**
 * Hook για CSS-in-JS styling με sizing tokens
 */
export declare const useSizingStyles: () => void;
