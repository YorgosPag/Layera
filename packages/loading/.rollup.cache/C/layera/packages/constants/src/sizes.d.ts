/**
 * Size constants for consistent component sizing
 */
export declare const COMPONENT_SIZES: {
    readonly XS: "xs";
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly XL: "xl";
};
export declare const FORM_SIZES: {
    readonly SMALL: "sm";
    readonly MEDIUM: "md";
    readonly LARGE: "lg";
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly XL: "xl";
};
export declare const BUTTON_SIZES: {
    readonly XS: "xs";
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly XL: "xl";
};
/**
 * Button Size Scale - tokens.json ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
 */
export declare const BUTTON_SIZE_SCALE: {
    readonly xs: "var(--la-button-padding-sm)";
    readonly sm: "var(--la-xs-plus-2-sm-padding)";
    readonly md: "var(--la-sm-plus-xs-half-md-padding)";
    readonly lg: "var(--la-md-xl-padding)";
    readonly xl: "var(--la-button-padding-xl)";
};
export declare const ICON_SIZES: {
    readonly XS: "xs";
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly XL: "xl";
};
export declare const TABLE_COLUMN_WIDTHS: {
    readonly NARROW: 80;
    readonly SMALL: 120;
    readonly STANDARD: 200;
    readonly WIDE: 300;
    readonly EXTRA_WIDE: 400;
};
export type ComponentSize = typeof COMPONENT_SIZES[keyof typeof COMPONENT_SIZES];
export type FormSize = typeof FORM_SIZES[keyof typeof FORM_SIZES];
export type ButtonSize = typeof BUTTON_SIZES[keyof typeof BUTTON_SIZES];
export type IconSize = typeof ICON_SIZES[keyof typeof ICON_SIZES];
export type TableColumnWidth = typeof TABLE_COLUMN_WIDTHS[keyof typeof TABLE_COLUMN_WIDTHS];
