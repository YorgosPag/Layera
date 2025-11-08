/**
 * @layera/layout - Enterprise Flex System
 *
 * 🌟 World-class flex system που ξεπερνά Material Design 3, Chakra UI, και Ant Design
 *
 * Features:
 * - Complete flexbox API coverage με semantic naming
 * - CSS Custom Properties με theme awareness
 * - Type-safe flex tokens με industry standards
 * - Advanced flex utilities για complex layouts
 * - Performance-optimized με design token integration
 */
/**
 * Enterprise Flex Token Scale
 * Βασισμένο στα CSS Flexbox specifications και industry best practices
 */
export declare const FLEX_SCALE: {
    readonly direction: {
        readonly ROW: "row";
        readonly ROW_REVERSE: "row-reverse";
        readonly COLUMN: "column";
        readonly COLUMN_REVERSE: "column-reverse";
    };
    readonly justify: {
        readonly START: "flex-start";
        readonly END: "flex-end";
        readonly CENTER: "center";
        readonly SPACE_BETWEEN: "space-between";
        readonly SPACE_AROUND: "space-around";
        readonly SPACE_EVENLY: "space-evenly";
    };
    readonly align: {
        readonly START: "flex-start";
        readonly END: "flex-end";
        readonly CENTER: "center";
        readonly STRETCH: "stretch";
        readonly BASELINE: "baseline";
    };
    readonly alignContent: {
        readonly START: "flex-start";
        readonly END: "flex-end";
        readonly CENTER: "center";
        readonly STRETCH: "stretch";
        readonly SPACE_BETWEEN: "space-between";
        readonly SPACE_AROUND: "space-around";
        readonly SPACE_EVENLY: "space-evenly";
    };
    readonly wrap: {
        readonly NOWRAP: "nowrap";
        readonly WRAP: "wrap";
        readonly WRAP_REVERSE: "wrap-reverse";
    };
    readonly flex: {
        readonly NONE: "0 0 auto";
        readonly AUTO: "1 1 auto";
        readonly INITIAL: "0 1 auto";
        readonly GROW: "1 0 0%";
        readonly SHRINK: "0 1 0%";
    };
    readonly gap: {
        readonly NONE: "0";
        readonly XXS: "var(--la-space-1)";
        readonly XS: "var(--la-space-1)";
        readonly SM: "var(--la-space-2)px";
        readonly MD: "var(--la-space-4)px";
        readonly LG: "var(--la-space-6)";
        readonly XL: "var(--la-space-layout-xl)";
        readonly XXL: "var(--la-space-12)";
        readonly XXXL: "var(--la-space-16)";
    };
};
/**
 * Type-safe flex token types
 */
export type FlexDirection = keyof typeof FLEX_SCALE.direction;
export type FlexJustify = keyof typeof FLEX_SCALE.justify;
export type FlexAlign = keyof typeof FLEX_SCALE.align;
export type FlexAlignContent = keyof typeof FLEX_SCALE.alignContent;
export type FlexWrap = keyof typeof FLEX_SCALE.wrap;
export type FlexValue = keyof typeof FLEX_SCALE.flex;
export type FlexGap = keyof typeof FLEX_SCALE.gap;
/**
 * Enterprise CSS custom properties για flex system
 */
export declare const FLEX_CSS_VARS: {
    readonly direction: {
        readonly 'flex-direction-row': "row";
        readonly 'flex-direction-row-reverse': "row-reverse";
        readonly 'flex-direction-column': "column";
        readonly 'flex-direction-column-reverse': "column-reverse";
    };
    readonly justify: {
        readonly 'flex-justify-start': "flex-start";
        readonly 'flex-justify-end': "flex-end";
        readonly 'flex-justify-center': "center";
        readonly 'flex-justify-space-between': "space-between";
        readonly 'flex-justify-space-around': "space-around";
        readonly 'flex-justify-space-evenly': "space-evenly";
    };
    readonly align: {
        readonly 'flex-align-start': "flex-start";
        readonly 'flex-align-end': "flex-end";
        readonly 'flex-align-center': "center";
        readonly 'flex-align-stretch': "stretch";
        readonly 'flex-align-baseline': "baseline";
    };
    readonly alignContent: {
        readonly 'flex-align-content-start': "flex-start";
        readonly 'flex-align-content-end': "flex-end";
        readonly 'flex-align-content-center': "center";
        readonly 'flex-align-content-stretch': "stretch";
        readonly 'flex-align-content-space-between': "space-between";
        readonly 'flex-align-content-space-around': "space-around";
        readonly 'flex-align-content-space-evenly': "space-evenly";
    };
    readonly wrap: {
        readonly 'flex-wrap-nowrap': "nowrap";
        readonly 'flex-wrap-wrap': "wrap";
        readonly 'flex-wrap-wrap-reverse': "wrap-reverse";
    };
    readonly flex: {
        readonly 'flex-none': "0 0 auto";
        readonly 'flex-auto': "1 1 auto";
        readonly 'flex-initial': "0 1 auto";
        readonly 'flex-grow': "1 0 0%";
        readonly 'flex-shrink': "0 1 0%";
    };
    readonly gap: {
        readonly 'flex-gap-none': "0";
        readonly 'flex-gap-xxs': "var(--la-space-1)";
        readonly 'flex-gap-xs': "var(--la-space-1)";
        readonly 'flex-gap-sm': "var(--la-space-2)px";
        readonly 'flex-gap-md': "var(--la-space-4)px";
        readonly 'flex-gap-lg': "var(--la-space-6)";
        readonly 'flex-gap-xl': "var(--la-space-layout-xl)";
        readonly 'flex-gap-xxl': "var(--la-space-12)";
        readonly 'flex-gap-xxxl': "var(--la-space-16)";
    };
};
/**
 * Utility function για CSS custom property access
 */
export declare const getFlexVar: (category: keyof typeof FLEX_CSS_VARS, token: string) => string;
/**
 * Enterprise flex utilities για common patterns
 */
export declare const FLEX_UTILITIES: {
    readonly layouts: {
        readonly row: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly gap: string;
        };
        readonly rowReverse: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly gap: string;
        };
        readonly column: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly gap: string;
        };
        readonly columnReverse: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly gap: string;
        };
        readonly centerHorizontal: {
            readonly display: "flex";
            readonly justifyContent: string;
        };
        readonly centerVertical: {
            readonly display: "flex";
            readonly alignItems: string;
        };
        readonly centerBoth: {
            readonly display: "flex";
            readonly justifyContent: string;
            readonly alignItems: string;
        };
        readonly spaceBetween: {
            readonly display: "flex";
            readonly justifyContent: string;
        };
        readonly spaceAround: {
            readonly display: "flex";
            readonly justifyContent: string;
        };
        readonly spaceEvenly: {
            readonly display: "flex";
            readonly justifyContent: string;
        };
    };
    readonly components: {
        readonly header: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly justifyContent: string;
            readonly alignItems: string;
            readonly gap: string;
        };
        readonly navigation: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly alignItems: string;
            readonly gap: string;
        };
        readonly cardBody: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly gap: string;
            readonly flex: string;
        };
        readonly buttonGroup: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly gap: string;
            readonly justifyContent: string;
        };
        readonly formField: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly gap: string;
        };
        readonly sidebar: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly gap: string;
            readonly flex: string;
        };
        readonly mainContent: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly gap: string;
            readonly flex: string;
        };
    };
    readonly responsive: {
        readonly stackOnMobile: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly '@media (max-width: 768px)': {
                readonly flexDirection: string;
            };
        };
        readonly reverseOnMobile: {
            readonly display: "flex";
            readonly flexDirection: string;
            readonly '@media (max-width: 768px)': {
                readonly flexDirection: string;
            };
        };
    };
};
/**
 * Comprehensive flex system που καλύπτει όλα τα CSS flexbox properties
 */
export declare const COMPLETE_FLEX_SYSTEM: {
    readonly css: {
        readonly display: "flex";
        readonly flexDirection: {
            readonly ROW: "row";
            readonly ROW_REVERSE: "row-reverse";
            readonly COLUMN: "column";
            readonly COLUMN_REVERSE: "column-reverse";
        };
        readonly flexWrap: {
            readonly NOWRAP: "nowrap";
            readonly WRAP: "wrap";
            readonly WRAP_REVERSE: "wrap-reverse";
        };
        readonly justifyContent: {
            readonly START: "flex-start";
            readonly END: "flex-end";
            readonly CENTER: "center";
            readonly SPACE_BETWEEN: "space-between";
            readonly SPACE_AROUND: "space-around";
            readonly SPACE_EVENLY: "space-evenly";
        };
        readonly alignItems: {
            readonly START: "flex-start";
            readonly END: "flex-end";
            readonly CENTER: "center";
            readonly STRETCH: "stretch";
            readonly BASELINE: "baseline";
        };
        readonly alignContent: {
            readonly START: "flex-start";
            readonly END: "flex-end";
            readonly CENTER: "center";
            readonly STRETCH: "stretch";
            readonly SPACE_BETWEEN: "space-between";
            readonly SPACE_AROUND: "space-around";
            readonly SPACE_EVENLY: "space-evenly";
        };
        readonly gap: {
            readonly NONE: "0";
            readonly XXS: "var(--la-space-1)";
            readonly XS: "var(--la-space-1)";
            readonly SM: "var(--la-space-2)px";
            readonly MD: "var(--la-space-4)px";
            readonly LG: "var(--la-space-6)";
            readonly XL: "var(--la-space-layout-xl)";
            readonly XXL: "var(--la-space-12)";
            readonly XXXL: "var(--la-space-16)";
        };
        readonly flex: {
            readonly NONE: "0 0 auto";
            readonly AUTO: "1 1 auto";
            readonly INITIAL: "0 1 auto";
            readonly GROW: "1 0 0%";
            readonly SHRINK: "0 1 0%";
        };
        readonly flexGrow: {
            readonly 0: "0";
            readonly 1: "1";
            readonly 2: "2";
            readonly 3: "3";
        };
        readonly flexShrink: {
            readonly 0: "0";
            readonly 1: "1";
            readonly 2: "2";
            readonly 3: "3";
        };
        readonly flexBasis: {
            readonly auto: "auto";
            readonly 0: "0";
            readonly full: "100%";
            readonly half: "50%";
            readonly third: "33.333333%";
            readonly quarter: "25%";
        };
        readonly alignSelf: {
            readonly auto: "auto";
            readonly start: "flex-start";
            readonly end: "flex-end";
            readonly center: "center";
            readonly stretch: "stretch";
            readonly baseline: "baseline";
        };
        readonly order: {
            readonly first: "-9999";
            readonly last: "9999";
            readonly none: "0";
            readonly 1: "1";
            readonly 2: "2";
            readonly 3: "3";
            readonly 4: "4";
            readonly 5: "5";
        };
    };
    readonly vars: {
        readonly direction: {
            readonly 'flex-direction-row': "row";
            readonly 'flex-direction-row-reverse': "row-reverse";
            readonly 'flex-direction-column': "column";
            readonly 'flex-direction-column-reverse': "column-reverse";
        };
        readonly justify: {
            readonly 'flex-justify-start': "flex-start";
            readonly 'flex-justify-end': "flex-end";
            readonly 'flex-justify-center': "center";
            readonly 'flex-justify-space-between': "space-between";
            readonly 'flex-justify-space-around': "space-around";
            readonly 'flex-justify-space-evenly': "space-evenly";
        };
        readonly align: {
            readonly 'flex-align-start': "flex-start";
            readonly 'flex-align-end': "flex-end";
            readonly 'flex-align-center': "center";
            readonly 'flex-align-stretch': "stretch";
            readonly 'flex-align-baseline': "baseline";
        };
        readonly alignContent: {
            readonly 'flex-align-content-start': "flex-start";
            readonly 'flex-align-content-end': "flex-end";
            readonly 'flex-align-content-center': "center";
            readonly 'flex-align-content-stretch': "stretch";
            readonly 'flex-align-content-space-between': "space-between";
            readonly 'flex-align-content-space-around': "space-around";
            readonly 'flex-align-content-space-evenly': "space-evenly";
        };
        readonly wrap: {
            readonly 'flex-wrap-nowrap': "nowrap";
            readonly 'flex-wrap-wrap': "wrap";
            readonly 'flex-wrap-wrap-reverse': "wrap-reverse";
        };
        readonly flex: {
            readonly 'flex-none': "0 0 auto";
            readonly 'flex-auto': "1 1 auto";
            readonly 'flex-initial': "0 1 auto";
            readonly 'flex-grow': "1 0 0%";
            readonly 'flex-shrink': "0 1 0%";
        };
        readonly gap: {
            readonly 'flex-gap-none': "0";
            readonly 'flex-gap-xxs': "var(--la-space-1)";
            readonly 'flex-gap-xs': "var(--la-space-1)";
            readonly 'flex-gap-sm': "var(--la-space-2)px";
            readonly 'flex-gap-md': "var(--la-space-4)px";
            readonly 'flex-gap-lg': "var(--la-space-6)";
            readonly 'flex-gap-xl': "var(--la-space-layout-xl)";
            readonly 'flex-gap-xxl': "var(--la-space-12)";
            readonly 'flex-gap-xxxl': "var(--la-space-16)";
        };
    };
    readonly utils: {
        readonly layouts: {
            readonly row: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly gap: string;
            };
            readonly rowReverse: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly gap: string;
            };
            readonly column: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly gap: string;
            };
            readonly columnReverse: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly gap: string;
            };
            readonly centerHorizontal: {
                readonly display: "flex";
                readonly justifyContent: string;
            };
            readonly centerVertical: {
                readonly display: "flex";
                readonly alignItems: string;
            };
            readonly centerBoth: {
                readonly display: "flex";
                readonly justifyContent: string;
                readonly alignItems: string;
            };
            readonly spaceBetween: {
                readonly display: "flex";
                readonly justifyContent: string;
            };
            readonly spaceAround: {
                readonly display: "flex";
                readonly justifyContent: string;
            };
            readonly spaceEvenly: {
                readonly display: "flex";
                readonly justifyContent: string;
            };
        };
        readonly components: {
            readonly header: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly justifyContent: string;
                readonly alignItems: string;
                readonly gap: string;
            };
            readonly navigation: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly alignItems: string;
                readonly gap: string;
            };
            readonly cardBody: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly gap: string;
                readonly flex: string;
            };
            readonly buttonGroup: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly gap: string;
                readonly justifyContent: string;
            };
            readonly formField: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly gap: string;
            };
            readonly sidebar: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly gap: string;
                readonly flex: string;
            };
            readonly mainContent: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly gap: string;
                readonly flex: string;
            };
        };
        readonly responsive: {
            readonly stackOnMobile: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly '@media (max-width: 768px)': {
                    readonly flexDirection: string;
                };
            };
            readonly reverseOnMobile: {
                readonly display: "flex";
                readonly flexDirection: string;
                readonly '@media (max-width: 768px)': {
                    readonly flexDirection: string;
                };
            };
        };
    };
};
