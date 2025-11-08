/**
 * @layera/layout - Enterprise Flex Hooks
 *
 * 🌟 Type-safe React hooks για flex system
 *
 * Features:
 * - Performance-optimized με useMemo
 * - Type-safe flex token consumption
 * - CSS custom property integration
 * - Enterprise-grade layout patterns
 */
/**
 * Hook για flex container styling
 */
export declare const useFlex: (options?: {
    direction?: "row" | "column" | "row-reverse" | "column-reverse";
    justify?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
    align?: "start" | "end" | "center" | "stretch" | "baseline";
    wrap?: "nowrap" | "wrap" | "wrap-reverse";
    gap?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
}) => {
    display: string;
    flexDirection: "row" | "column" | "row-reverse" | "column-reverse";
    justifyContent: string;
    alignItems: string;
    flexWrap: "nowrap" | "wrap" | "wrap-reverse";
    gap: "0" | "var(--la-space-1)" | "var(--la-space-6)" | "var(--la-space-12)" | "var(--la-space-16)" | "var(--la-space-2)px" | "var(--la-space-4)px" | "var(--la-space-layout-xl)";
};
/**
 * Hook για flex utilities και common patterns
 */
export declare const useFlexPatterns: () => void;
/**
 * Hook για flex item properties
 */
export declare const useFlexItem: (options?: {
    flex?: "none" | "auto" | "initial" | "grow" | "shrink" | string;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: string | number;
    alignSelf?: "auto" | "start" | "end" | "center" | "stretch" | "baseline";
    order?: number | "first" | "last";
}) => {
    flex: string;
    flexGrow: number | undefined;
    flexShrink: number | undefined;
    flexBasis: string | undefined;
    alignSelf: string;
    order: number | undefined;
};
/**
 * Hook για complete flex system access
 */
export declare const useFlexSystem: () => void;
/**
 * Hook για responsive flex patterns (μελλοντική χρήση με breakpoints)
 */
export declare const useResponsiveFlex: () => void;
