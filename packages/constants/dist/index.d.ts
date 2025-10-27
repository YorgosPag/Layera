import { default as default_2 } from 'react';

export declare const AUTOCOMPLETE_VALUES: {
    readonly OFF: "off";
    readonly ON: "on";
    readonly NAME: "name";
    readonly EMAIL: "email";
    readonly USERNAME: "username";
    readonly NEW_PASSWORD: "new-password";
    readonly CURRENT_PASSWORD: "current-password";
    readonly PHONE: "tel";
    readonly ORGANIZATION: "organization";
    readonly STREET_ADDRESS: "street-address";
    readonly COUNTRY: "country";
    readonly POSTAL_CODE: "postal-code";
};

export declare type AutocompleteValue = typeof AUTOCOMPLETE_VALUES[keyof typeof AUTOCOMPLETE_VALUES];

export declare const BORDER_RADIUS: {
    readonly NONE: 0;
    readonly XXS: 2;
    readonly XS: 4;
    readonly SM: 8;
    readonly MD: 12;
    readonly LG: 16;
    readonly XL: 24;
    readonly XXL: 32;
    readonly XXXL: 48;
    readonly PILL: 9999;
    readonly CIRCLE: "50%";
    readonly BUTTON: 8;
    readonly CARD: 12;
    readonly INPUT: 6;
    readonly BADGE: 9999;
    readonly MODAL: 16;
    readonly TOOLTIP: 4;
    readonly LAYOUT_SM: 20;
    readonly LAYOUT_MD: 28;
    readonly LAYOUT_LG: 36;
    readonly LAYOUT_XL: 44;
};

/**
 * Enterprise CSS custom properties για border radius system
 * Συνδέονται με το @layera/constants theme system
 */
export declare const BORDER_RADIUS_CSS_VARS: {
    readonly 'border-radius-none': "0px";
    readonly 'border-radius-xxs': "2px";
    readonly 'border-radius-xs': "4px";
    readonly 'border-radius-sm': "8px";
    readonly 'border-radius-md': "12px";
    readonly 'border-radius-lg': "16px";
    readonly 'border-radius-xl': "24px";
    readonly 'border-radius-xxl': "32px";
    readonly 'border-radius-xxxl': "48px";
    readonly 'border-radius-pill': "9999px";
    readonly 'border-radius-circle': "50%";
    readonly 'border-radius-button': "8px";
    readonly 'border-radius-card': "12px";
    readonly 'border-radius-input': "6px";
    readonly 'border-radius-badge': "9999px";
    readonly 'border-radius-modal': "16px";
    readonly 'border-radius-tooltip': "4px";
    readonly 'border-radius-layout-sm': "20px";
    readonly 'border-radius-layout-md': "28px";
    readonly 'border-radius-layout-lg': "36px";
    readonly 'border-radius-layout-xl': "44px";
};

/**
 * Enterprise Border Radius Scale
 * 🌟 World-class border radius system που ξεπερνά Material Design 3, Fluent, και Apple HIG
 *
 * Features:
 * - CSS Custom Properties με theme awareness
 * - Type-safe border radius tokens με semantic naming
 * - Enterprise-grade flexibility για complex layouts
 * - Performance-optimized με design token integration
 * - Aligned με SPACING_SCALE για consistency
 */
export declare const BORDER_RADIUS_SCALE: {
    readonly NONE: 0;
    readonly XXS: 2;
    readonly XS: 4;
    readonly SM: 8;
    readonly MD: 12;
    readonly LG: 16;
    readonly XL: 24;
    readonly XXL: 32;
    readonly XXXL: 48;
    readonly PILL: 9999;
    readonly CIRCLE: "50%";
    readonly BUTTON: 8;
    readonly CARD: 12;
    readonly INPUT: 6;
    readonly BADGE: 9999;
    readonly MODAL: 16;
    readonly TOOLTIP: 4;
    readonly LAYOUT_SM: 20;
    readonly LAYOUT_MD: 28;
    readonly LAYOUT_LG: 36;
    readonly LAYOUT_XL: 44;
};

/**
 * Enterprise border radius utilities για common patterns
 */
export declare const BORDER_RADIUS_UTILITIES: {
    readonly components: {
        readonly button: {
            readonly default: string;
            readonly rounded: string;
            readonly square: string;
        };
        readonly card: {
            readonly default: string;
            readonly compact: string;
            readonly elevated: string;
            readonly hero: string;
        };
        readonly input: {
            readonly default: string;
            readonly rounded: string;
            readonly pill: string;
        };
        readonly modal: {
            readonly default: string;
            readonly compact: string;
            readonly large: string;
        };
        readonly badge: {
            readonly default: string;
            readonly rectangular: string;
            readonly rounded: string;
        };
    };
    readonly layouts: {
        readonly section: {
            readonly subtle: string;
            readonly standard: string;
            readonly prominent: string;
            readonly hero: string;
        };
        readonly panel: {
            readonly compact: string;
            readonly standard: string;
            readonly spacious: string;
        };
    };
    readonly interactions: {
        readonly hover: {
            readonly fromSm: string;
            readonly fromMd: string;
            readonly fromLg: string;
        };
        readonly focus: {
            readonly default: string;
            readonly input: string;
            readonly button: string;
        };
    };
    readonly application: {
        readonly geoAlert: {
            readonly mapTooltip: string;
            readonly alertCard: string;
            readonly stepCard: string;
            readonly modalDialog: string;
        };
        readonly design: {
            readonly canvas: string;
            readonly toolbar: string;
            readonly preview: string;
        };
    };
};

export declare type BorderRadius = typeof BORDER_RADIUS[keyof typeof BORDER_RADIUS];

/**
 * Semantic border radius categories για different use cases
 */
export declare type BorderRadiusCategory = 'micro' | 'standard' | 'special' | 'component' | 'layout';

export declare type BorderRadiusScale = typeof BORDER_RADIUS_SCALE[keyof typeof BORDER_RADIUS_SCALE];

/**
 * Type-safe border radius tokens για backward compatibility
 * Primary BorderRadiusToken τώρα είναι στο design-tokens.ts
 */
export declare type BorderRadiusScaleToken = keyof typeof BORDER_RADIUS_SCALE;

export declare type BorderRadiusToken = keyof typeof CSS_DESIGN_TOKENS.borderRadius;

export declare const BULK_ACTIONS: {
    readonly SELECT_ALL: "selectAll";
    readonly SELECT_NONE: "selectNone";
    readonly SELECT_PAGE: "selectPage";
    readonly EXPORT: "export";
    readonly DELETE: "delete";
    readonly ARCHIVE: "archive";
    readonly ACTIVATE: "activate";
    readonly DEACTIVATE: "deactivate";
};

export declare type BulkAction = typeof BULK_ACTIONS[keyof typeof BULK_ACTIONS];

export declare const BUTTON_SIZES: {
    readonly XS: "xs";
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly XL: "xl";
};

export declare const BUTTON_STATES: {
    readonly DEFAULT: "default";
    readonly HOVER: "hover";
    readonly ACTIVE: "active";
    readonly FOCUS: "focus";
    readonly DISABLED: "disabled";
    readonly LOADING: "loading";
};

export declare type ButtonSize = typeof BUTTON_SIZES[keyof typeof BUTTON_SIZES];

export declare type ButtonState = typeof BUTTON_STATES[keyof typeof BUTTON_STATES];

export declare const CARD_STATES: {
    readonly DEFAULT: "default";
    readonly HOVER: "hover";
    readonly ACTIVE: "active";
    readonly DISABLED: "disabled";
    readonly LOADING: "loading";
};

export declare type CardState = typeof CARD_STATES[keyof typeof CARD_STATES];

export declare const COLOR_SCHEMES: {
    readonly PRIMARY: "primary";
    readonly SECONDARY: "secondary";
    readonly SUCCESS: "success";
    readonly WARNING: "warning";
    readonly ERROR: "error";
    readonly INFO: "info";
    readonly NEUTRAL: "neutral";
};

export declare type ColorScheme = typeof COLOR_SCHEMES[keyof typeof COLOR_SCHEMES];

export declare type ColorToken = keyof typeof CSS_DESIGN_TOKENS.colors;

export declare const COLUMN_TYPES: {
    readonly TEXT: "text";
    readonly NUMBER: "number";
    readonly DATE: "date";
    readonly BOOLEAN: "boolean";
    readonly BADGE: "badge";
    readonly AVATAR: "avatar";
    readonly ACTIONS: "actions";
    readonly LINK: "link";
    readonly CUSTOM: "custom";
};

export declare type ColumnType = typeof COLUMN_TYPES[keyof typeof COLUMN_TYPES];

/**
 * Component-specific design tokens
 * Κάθε component μπορεί να έχει τα δικά του semantic tokens
 */
export declare const COMPONENT_DESIGN_TOKENS: {
    readonly button: {
        readonly 'button-height-sm': "var(--spacing-xl)";
        readonly 'button-height-md': "var(--spacing-xxl)";
        readonly 'button-height-lg': "var(--spacing-xxxl)";
        readonly 'button-padding-x-sm': "var(--spacing-md)";
        readonly 'button-padding-x-md': "var(--spacing-lg)";
        readonly 'button-padding-x-lg': "var(--spacing-xl)";
        readonly 'button-border-radius': "var(--border-radius-md)";
        readonly 'button-transition': "all var(--motion-transition-fast)";
    };
    readonly card: {
        readonly 'card-padding': "var(--spacing-lg)";
        readonly 'card-border-radius': "var(--border-radius-lg)";
        readonly 'card-background': "var(--color-bg-surface-raised)";
        readonly 'card-border': "1px solid var(--color-border-subtle)";
        readonly 'card-elevation': "var(--elevation-sm)";
        readonly 'card-elevation-hover': "var(--elevation-md)";
        readonly 'card-transition': "all var(--motion-transition-normal)";
    };
    readonly modal: {
        readonly 'modal-backdrop': "rgba(0, 0, 0, 0.6)";
        readonly 'modal-elevation': "var(--elevation-xxl)";
        readonly 'modal-border-radius': "var(--border-radius-xl)";
        readonly 'modal-padding': "var(--spacing-xxl)";
        readonly 'modal-animation-enter': "var(--motion-transition-slow)";
        readonly 'modal-animation-exit': "var(--motion-transition-normal)";
    };
};

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

export declare const COMPONENT_VARIANTS: {
    readonly PRIMARY: "primary";
    readonly SECONDARY: "secondary";
    readonly TERTIARY: "tertiary";
    readonly GHOST: "ghost";
    readonly OUTLINE: "outline";
    readonly LINK: "link";
    readonly DANGER: "danger";
    readonly SUCCESS: "success";
    readonly WARNING: "warning";
    readonly INFO: "info";
};

export declare type ComponentSize = typeof COMPONENT_SIZES[keyof typeof COMPONENT_SIZES];

export declare type ComponentToken = keyof typeof COMPONENT_DESIGN_TOKENS;

export declare type ComponentVariant = typeof COMPONENT_VARIANTS[keyof typeof COMPONENT_VARIANTS];

/**
 * Combined configuration object
 */
export declare const CONFIG: {
    readonly geoDrawing: {
        /** Double-click timeout σε milliseconds */
        readonly DOUBLE_CLICK_TIMEOUT: 300;
        /** Key codes για shortcuts */
        readonly KEY_CODES: {
            readonly ESCAPE: "Escape";
            readonly ENTER: "Enter";
            readonly DELETE: "Delete";
            readonly BACKSPACE: "Backspace";
        };
        /** Mouse button codes */
        readonly MOUSE_BUTTONS: {
            readonly LEFT: 0;
            readonly MIDDLE: 1;
            readonly RIGHT: 2;
        };
        /** Default decimal places για distance display */
        readonly DISTANCE_DECIMALS: 2;
        /** Default decimal places για area display */
        readonly AREA_DECIMALS: 2;
        /** Default decimal places για coordinates */
        readonly COORDINATE_DECIMALS: 6;
        /** Threshold για switching από meters σε kilometers */
        readonly DISTANCE_KM_THRESHOLD: 1000;
        /** Threshold για switching από m² σε hectares */
        readonly AREA_HECTARE_THRESHOLD: 10000;
        /** Threshold για switching από hectares σε km² */
        readonly AREA_KM_THRESHOLD: 1000000;
        readonly snapTolerance: 15;
        readonly minSnapZoom: 16;
        readonly debounceMs: 500;
    };
    readonly osm: {
        readonly overpassApiUrl: "https://overpass-api.de/api/interpreter";
        readonly requestTimeout: 30000;
        readonly maxCacheEntries: 100;
        readonly cacheTtl: number;
    };
};

/**
 * CSS Custom Properties Registry
 * Αυτά τα CSS variables θα γίνουν inject στο :root
 */
export declare const CSS_DESIGN_TOKENS: {
    readonly spacing: {
        readonly 'spacing-0': "0";
        readonly 'spacing-xxs': `${number}px`;
        readonly 'spacing-xs': `${number}px`;
        readonly 'spacing-sm': `${number}px`;
        readonly 'spacing-md': `${number}px`;
        readonly 'spacing-lg': `${number}px`;
        readonly 'spacing-xl': `${number}px`;
        readonly 'spacing-xxl': `${number}px`;
        readonly 'spacing-xxxl': `${number}px`;
    };
    readonly colors: {
        readonly 'color-bg-canvas': "light-dark(#ffffff, #0f0f0f)";
        readonly 'color-bg-surface': "light-dark(#fafafa, #1a1a1a)";
        readonly 'color-bg-surface-raised': "light-dark(#ffffff, #262626)";
        readonly 'color-bg-surface-overlay': "light-dark(rgba(255,255,255,0.95), rgba(15,15,15,0.95))";
        readonly 'color-text-primary': "light-dark(#0f0f0f, #f0f0f0)";
        readonly 'color-text-secondary': "light-dark(#6b7280, #a1a1aa)";
        readonly 'color-text-tertiary': "light-dark(#9ca3af, #71717a)";
        readonly 'color-text-inverse': "light-dark(#ffffff, #0f0f0f)";
        readonly 'color-semantic-info-bg': "light-dark(#eff6ff, #1e3a8a)";
        readonly 'color-semantic-info-border': "light-dark(#3b82f6, #60a5fa)";
        readonly 'color-semantic-info-text': "light-dark(#1e40af, #bfdbfe)";
        readonly 'color-semantic-success-bg': "light-dark(#f0fdf4, #14532d)";
        readonly 'color-semantic-success-border': "light-dark(#22c55e, #4ade80)";
        readonly 'color-semantic-success-text': "light-dark(#166534, #bbf7d0)";
        readonly 'color-semantic-warning-bg': "light-dark(#fffbeb, #92400e)";
        readonly 'color-semantic-warning-border': "light-dark(#f59e0b, #fbbf24)";
        readonly 'color-semantic-warning-text': "light-dark(#d97706, #fef3c7)";
        readonly 'color-semantic-error-bg': "light-dark(#fef2f2, #7f1d1d)";
        readonly 'color-semantic-error-border': "light-dark(#ef4444, #f87171)";
        readonly 'color-semantic-error-text': "light-dark(#dc2626, #fecaca)";
        readonly 'color-interactive-primary': "light-dark(#3b82f6, #60a5fa)";
        readonly 'color-interactive-primary-hover': "light-dark(#2563eb, #3b82f6)";
        readonly 'color-interactive-primary-active': "light-dark(#1d4ed8, #2563eb)";
        readonly 'color-border-default': "light-dark(#e5e7eb, #374151)";
        readonly 'color-border-subtle': "light-dark(#f3f4f6, #1f2937)";
        readonly 'color-border-strong': "light-dark(#d1d5db, #4b5563)";
    };
    readonly elevation: {
        readonly 'elevation-none': "none";
        readonly 'elevation-xs': "light-dark(0 1px 2px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.3))";
        readonly 'elevation-sm': "light-dark(0 1px 3px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.4))";
        readonly 'elevation-md': "light-dark(0 4px 6px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.4))";
        readonly 'elevation-lg': "light-dark(0 10px 15px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.4))";
        readonly 'elevation-xl': "light-dark(0 20px 25px rgba(0,0,0,0.1), 0 20px 25px rgba(0,0,0,0.4))";
        readonly 'elevation-xxl': "light-dark(0 25px 50px rgba(0,0,0,0.25), 0 25px 50px rgba(0,0,0,0.6))";
    };
    readonly motion: {
        readonly 'motion-duration-instant': "0ms";
        readonly 'motion-duration-fast': "150ms";
        readonly 'motion-duration-normal': "250ms";
        readonly 'motion-duration-slow': "400ms";
        readonly 'motion-duration-slower': "600ms";
        readonly 'motion-ease-linear': "linear";
        readonly 'motion-ease-ease': "ease";
        readonly 'motion-ease-ease-in': "ease-in";
        readonly 'motion-ease-ease-out': "ease-out";
        readonly 'motion-ease-ease-in-out': "ease-in-out";
        readonly 'motion-ease-smooth': "cubic-bezier(0.4, 0.0, 0.2, 1)";
        readonly 'motion-ease-sharp': "cubic-bezier(0.4, 0.0, 0.6, 1)";
        readonly 'motion-ease-bounce': "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        readonly 'motion-transition-fast': "var(--motion-duration-fast) var(--motion-ease-smooth)";
        readonly 'motion-transition-normal': "var(--motion-duration-normal) var(--motion-ease-smooth)";
        readonly 'motion-transition-slow': "var(--motion-duration-slow) var(--motion-ease-smooth)";
    };
    readonly typography: {
        readonly 'font-family-sans': "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif";
        readonly 'font-family-mono': "\"Fira Code\", \"JetBrains Mono\", Consolas, \"Courier New\", monospace";
        readonly 'font-size-xs': "0.75rem";
        readonly 'font-size-sm': "0.875rem";
        readonly 'font-size-md': "1rem";
        readonly 'font-size-lg': "1.125rem";
        readonly 'font-size-xl': "1.25rem";
        readonly 'font-size-xxl': "1.5rem";
        readonly 'font-size-xxxl': "2rem";
        readonly 'line-height-tight': "1.25";
        readonly 'line-height-normal': "1.5";
        readonly 'line-height-relaxed': "1.75";
        readonly 'font-weight-regular': "400";
        readonly 'font-weight-medium': "500";
        readonly 'font-weight-semibold': "600";
        readonly 'font-weight-bold': "700";
    };
    readonly borderRadius: {
        readonly 'border-radius-none': "0";
        readonly 'border-radius-xs': "2px";
        readonly 'border-radius-sm': "4px";
        readonly 'border-radius-md': "6px";
        readonly 'border-radius-lg': "8px";
        readonly 'border-radius-xl': "12px";
        readonly 'border-radius-xxl': "16px";
        readonly 'border-radius-full': "9999px";
    };
    readonly zIndex: {
        readonly 'z-index-base': "0";
        readonly 'z-index-elevated': "100";
        readonly 'z-index-sticky': "200";
        readonly 'z-index-overlay': "300";
        readonly 'z-index-modal': "400";
        readonly 'z-index-popover': "500";
        readonly 'z-index-tooltip': "600";
        readonly 'z-index-toast': "700";
        readonly 'z-index-map-overlay': "10000";
        readonly 'z-index-map-modal': "10100";
    };
    readonly positioning: {
        readonly 'box-sizing-content': "content-box";
        readonly 'box-sizing-border': "border-box";
        readonly 'position-static': "static";
        readonly 'position-relative': "relative";
        readonly 'position-absolute': "absolute";
        readonly 'position-fixed': "fixed";
        readonly 'position-sticky': "sticky";
        readonly 'overflow-visible': "visible";
        readonly 'overflow-hidden': "hidden";
        readonly 'overflow-clip': "clip";
        readonly 'overflow-scroll': "scroll";
        readonly 'overflow-auto': "auto";
    };
};

export declare const DATA_STATES: {
    readonly LOADING: "loading";
    readonly SUCCESS: "success";
    readonly ERROR: "error";
    readonly EMPTY: "empty";
    readonly IDLE: "idle";
};

export declare type DataState = typeof DATA_STATES[keyof typeof DATA_STATES];

/**
 * Base scale system - πυρήνας όλων των measurements
 * Inspired by 8px grid system αλλά advanced με mathematical precision
 */
export declare const DESIGN_TOKEN_SCALE: {
    readonly BASE_UNIT: 4;
    readonly SCALE_FACTORS: {
        readonly XXS: 0.5;
        readonly XS: 1;
        readonly SM: 2;
        readonly MD: 4;
        readonly LG: 6;
        readonly XL: 8;
        readonly XXL: 12;
        readonly XXXL: 16;
        readonly XXXXL: 24;
    };
};

export declare type DesignTokenCategory = keyof typeof CSS_DESIGN_TOKENS;

export declare const ELEVATION_LEVELS: {
    readonly NONE: 0;
    readonly XS: 1;
    readonly SM: 2;
    readonly MD: 3;
    readonly LG: 4;
    readonly XL: 5;
    readonly XXL: 6;
};

export declare type ElevationLevel = typeof ELEVATION_LEVELS[keyof typeof ELEVATION_LEVELS];

export declare type ElevationToken = keyof typeof CSS_DESIGN_TOKENS.elevation;

export declare const EXPORT_FORMATS: {
    readonly CSV: "csv";
    readonly EXCEL: "xlsx";
    readonly PDF: "pdf";
    readonly JSON: "json";
};

export declare type ExportFormat = typeof EXPORT_FORMATS[keyof typeof EXPORT_FORMATS];

export declare const FIELD_SIZES: {
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly FULL: "full";
};

export declare type FieldSize = typeof FIELD_SIZES[keyof typeof FIELD_SIZES];

export declare const FILTER_TYPES: {
    readonly TEXT: "text";
    readonly SELECT: "select";
    readonly MULTISELECT: "multiselect";
    readonly DATE: "date";
    readonly DATE_RANGE: "dateRange";
    readonly NUMBER: "number";
    readonly NUMBER_RANGE: "numberRange";
    readonly BOOLEAN: "boolean";
    readonly CUSTOM: "custom";
};

export declare type FilterType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];

export declare const FORM_SIZES: {
    readonly SMALL: "sm";
    readonly MEDIUM: "md";
    readonly LARGE: "lg";
};

/**
 * State constants for component states and statuses
 */
export declare const FORM_STATES: {
    readonly DEFAULT: "default";
    readonly FOCUS: "focus";
    readonly ERROR: "error";
    readonly SUCCESS: "success";
    readonly WARNING: "warning";
    readonly DISABLED: "disabled";
    readonly LOADING: "loading";
};

/**
 * Form-related constants
 */
export declare const FORM_TYPES: {
    readonly TEXT: "text";
    readonly EMAIL: "email";
    readonly PASSWORD: "password";
    readonly TEL: "tel";
    readonly URL: "url";
    readonly NUMBER: "number";
    readonly DATE: "date";
    readonly DATETIME_LOCAL: "datetime-local";
    readonly TIME: "time";
    readonly SEARCH: "search";
    readonly TEXTAREA: "textarea";
    readonly SELECT: "select";
    readonly CHECKBOX: "checkbox";
    readonly RADIO: "radio";
    readonly FILE: "file";
};

export declare type FormSize = typeof FORM_SIZES[keyof typeof FORM_SIZES];

export declare type FormState = typeof FORM_STATES[keyof typeof FORM_STATES];

export declare type FormType = typeof FORM_TYPES[keyof typeof FORM_TYPES];

/**
 * Error messages keys για i18n
 */
export declare const GEO_DRAWING_ERRORS: {
    readonly MINIMUM_POINTS_DISTANCE: "geo-drawing.errors.minimum-points-distance";
    readonly MINIMUM_POINTS_AREA: "geo-drawing.errors.minimum-points-area";
    readonly OSM_FETCH_FAILED: "geo-drawing.errors.osm-fetch-failed";
    readonly SNAP_ENGINE_ERROR: "geo-drawing.errors.snap-engine-error";
    readonly CALCULATION_ERROR: "geo-drawing.errors.calculation-error";
};

/**
 * Drawing interaction configuration
 */
export declare const GEO_DRAWING_INTERACTION: {
    /** Double-click timeout σε milliseconds */
    readonly DOUBLE_CLICK_TIMEOUT: 300;
    /** Key codes για shortcuts */
    readonly KEY_CODES: {
        readonly ESCAPE: "Escape";
        readonly ENTER: "Enter";
        readonly DELETE: "Delete";
        readonly BACKSPACE: "Backspace";
    };
    /** Mouse button codes */
    readonly MOUSE_BUTTONS: {
        readonly LEFT: 0;
        readonly MIDDLE: 1;
        readonly RIGHT: 2;
    };
};

/**
 * Measurement configuration
 */
export declare const GEO_DRAWING_MEASUREMENT: {
    /** Default decimal places για distance display */
    readonly DISTANCE_DECIMALS: 2;
    /** Default decimal places για area display */
    readonly AREA_DECIMALS: 2;
    /** Default decimal places για coordinates */
    readonly COORDINATE_DECIMALS: 6;
    /** Threshold για switching από meters σε kilometers */
    readonly DISTANCE_KM_THRESHOLD: 1000;
    /** Threshold για switching από m² σε hectares */
    readonly AREA_HECTARE_THRESHOLD: 10000;
    /** Threshold για switching από hectares σε km² */
    readonly AREA_KM_THRESHOLD: 1000000;
};

/**
 * OSM service configuration
 */
export declare const GEO_DRAWING_OSM: {
    /** Overpass API URL */
    readonly OVERPASS_API_URL: "https://overpass-api.de/api/interpreter";
    /** Request timeout σε milliseconds */
    readonly REQUEST_TIMEOUT: 30000;
    /** Maximum cache entries */
    readonly MAX_CACHE_ENTRIES: 100;
    /** Cache TTL σε milliseconds (5 minutes) */
    readonly CACHE_TTL: number;
    /** Coordinate precision για cache keys */
    readonly CACHE_PRECISION: 4;
};

/**
 * Snap-to-geometry configuration
 */
export declare const GEO_DRAWING_SNAP: {
    /** Default snap tolerance σε pixels */
    readonly DEFAULT_TOLERANCE: 15;
    /** Minimum zoom level για OSM data fetching */
    readonly MIN_SNAP_ZOOM: 16;
    /** Maximum zoom για OSM API calls */
    readonly MAX_SNAP_ZOOM: 20;
    /** Debounce time για map movement events (ms) */
    readonly DEBOUNCE_MS: 500;
    /** Priority order για snap types */
    readonly SNAP_PRIORITY: readonly ["vertex", "center", "midpoint", "edge", "nearest"];
};

/**
 * Visual styling configuration
 */
export declare const GEO_DRAWING_STYLES: {
    /** Default line weights */
    readonly LINE_WEIGHTS: {
        readonly THIN: 1;
        readonly NORMAL: 2;
        readonly THICK: 3;
        readonly MEASUREMENT: 3;
        readonly OSM_BUILDING: 1;
    };
    /** Point marker sizes */
    readonly POINT_SIZES: {
        readonly SMALL: 4;
        readonly NORMAL: 6;
        readonly LARGE: 8;
    };
    /** Opacity values */
    readonly OPACITY: {
        readonly DRAWING: 0.8;
        readonly FINISHED: 1;
        readonly BUILDING_FILL: 0.1;
        readonly BUILDING_HOVER: 0.3;
        readonly MEASUREMENT_FILL: 0.3;
    };
};

/**
 * Success messages keys για i18n
 */
export declare const GEO_DRAWING_SUCCESS: {
    readonly MEASUREMENT_COMPLETED: "geo-drawing.success.measurement-completed";
    readonly MEASUREMENT_SAVED: "geo-drawing.success.measurement-saved";
    readonly MEASUREMENT_CLEARED: "geo-drawing.success.measurement-cleared";
};

/**
 * Utility function για border radius value lookup
 */
export declare const getBorderRadiusValue: (token: BorderRadiusScaleToken) => string | number;

/**
 * Utility function για CSS custom property access
 */
export declare const getBorderRadiusVar: (token: string) => string;

/**
 * Utility function για CSS-in-JS integration (basic version - για πλήρη React integration χρήσε τα React hooks)
 */
export declare const getDesignTokenVar: (tokenName: string) => string;

/**
 * Utility function για multiple design tokens (basic version - για πλήρη React integration χρήσε τα React hooks)
 */
export declare const getDesignTokenVars: (tokenNames: string[]) => Record<string, string>;

/**
 * Get or create global theme engine instance
 */
export declare const getThemeEngine: (config?: ThemeEngineConfig) => LayeraThemeEngine;

export declare const ICON_SIZES: {
    readonly XS: "xs";
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly XL: "xl";
};

export declare type IconSize = typeof ICON_SIZES[keyof typeof ICON_SIZES];

export declare const INPUT_VARIANTS: {
    readonly DEFAULT: "default";
    readonly OUTLINE: "outline";
    readonly FILLED: "filled";
    readonly GHOST: "ghost";
    readonly UNDERLINE: "underline";
};

export declare type InputVariant = typeof INPUT_VARIANTS[keyof typeof INPUT_VARIANTS];

/**
 * @layera/constants
 * Centralized constants and configuration values for the Layera design system
 */
export declare const LAYERA_CONSTANTS_VERSION = "1.0.0";

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

/**
 * Theme Context για React integration
 */
declare interface LayeraThemeContext {
    engine: LayeraThemeEngine | null;
    state: ThemeState | null;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    isReady: boolean;
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

export declare const LayeraThemeProvider: default_2.FC<LayeraThemeProviderProps>;

/**
 * Theme Provider Component - Enterprise-grade setup
 */
declare interface LayeraThemeProviderProps {
    children: default_2.ReactNode;
    config?: ThemeEngineConfig;
}

export declare const LINK_TARGETS: {
    readonly SELF: "_self";
    readonly BLANK: "_blank";
    readonly PARENT: "_parent";
    readonly TOP: "_top";
};

export declare type LinkTarget = typeof LINK_TARGETS[keyof typeof LINK_TARGETS];

export declare const MENU_POSITIONS: {
    readonly TOP: "top";
    readonly BOTTOM: "bottom";
    readonly LEFT: "left";
    readonly RIGHT: "right";
    readonly CENTER: "center";
};

export declare type MenuPosition = typeof MENU_POSITIONS[keyof typeof MENU_POSITIONS];

export declare type MotionToken = keyof typeof CSS_DESIGN_TOKENS.motion;

/**
 * Navigation and routing constants
 */
export declare const NAVIGATION_TYPES: {
    readonly HORIZONTAL: "horizontal";
    readonly VERTICAL: "vertical";
    readonly SIDEBAR: "sidebar";
    readonly BREADCRUMB: "breadcrumb";
    readonly TAB: "tab";
    readonly STEPPER: "stepper";
};

declare type NavigationType_2 = typeof NAVIGATION_TYPES[keyof typeof NAVIGATION_TYPES];
export { NavigationType_2 as NavigationType }

export declare const PAGE_LAYOUTS: {
    readonly FULLSCREEN: "fullscreen";
    readonly CENTERED: "centered";
    readonly SIDEBAR: "sidebar";
    readonly SPLIT: "split";
    readonly MODAL: "modal";
};

export declare type PageLayout = typeof PAGE_LAYOUTS[keyof typeof PAGE_LAYOUTS];

export declare const PAGINATION_SIZES: {
    readonly SMALL: 10;
    readonly MEDIUM: 25;
    readonly LARGE: 50;
    readonly EXTRA_LARGE: 100;
};

export declare type PaginationSize = typeof PAGINATION_SIZES[keyof typeof PAGINATION_SIZES];

export declare type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export declare const PERMISSIONS: {
    readonly USER_CREATE: "user:create";
    readonly USER_READ: "user:read";
    readonly USER_UPDATE: "user:update";
    readonly USER_DELETE: "user:delete";
    readonly USER_MANAGE_ROLES: "user:manage_roles";
    readonly SYSTEM_ADMIN: "system:admin";
    readonly SYSTEM_CONFIG: "system:config";
    readonly SYSTEM_LOGS: "system:logs";
    readonly SYSTEM_BACKUP: "system:backup";
    readonly DATA_READ: "data:read";
    readonly DATA_WRITE: "data:write";
    readonly DATA_DELETE: "data:delete";
    readonly DATA_EXPORT: "data:export";
    readonly DATA_IMPORT: "data:import";
    readonly GEO_READ: "geo:read";
    readonly GEO_WRITE: "geo:write";
    readonly GEO_ALERT: "geo:alert";
    readonly GEO_MONITOR: "geo:monitor";
};

export declare type PositioningToken = keyof typeof CSS_DESIGN_TOKENS.positioning;

/**
 * Responsive design tokens
 * Τα tokens προσαρμόζονται ανάλογα με το breakpoint
 */
export declare const RESPONSIVE_DESIGN_TOKENS: {
    readonly mobile: {
        readonly 'spacing-scale-factor': "0.75";
        readonly 'font-scale-factor': "0.875";
        readonly 'border-radius-scale-factor': "0.75";
    };
    readonly tablet: {
        readonly 'spacing-scale-factor': "0.875";
        readonly 'font-scale-factor': "0.9375";
        readonly 'border-radius-scale-factor': "0.875";
    };
    readonly desktop: {
        readonly 'spacing-scale-factor': "1";
        readonly 'font-scale-factor': "1";
        readonly 'border-radius-scale-factor': "1";
    };
    readonly desktopLarge: {
        readonly 'spacing-scale-factor': "1.125";
        readonly 'font-scale-factor': "1.0625";
        readonly 'border-radius-scale-factor': "1.125";
    };
};

export declare type ResponsiveToken = keyof typeof RESPONSIVE_DESIGN_TOKENS;

export declare const ROLE_HIERARCHY: {
    readonly super_admin: 100;
    readonly admin: 90;
    readonly manager: 80;
    readonly editor: 70;
    readonly moderator: 60;
    readonly user: 50;
    readonly viewer: 30;
    readonly guest: 10;
};

export declare const ROLE_PERMISSIONS: {
    readonly super_admin: ("user:create" | "user:read" | "user:update" | "user:delete" | "user:manage_roles" | "system:admin" | "system:config" | "system:logs" | "system:backup" | "data:read" | "data:write" | "data:delete" | "data:export" | "data:import" | "geo:read" | "geo:write" | "geo:alert" | "geo:monitor")[];
    readonly admin: readonly ["user:create", "user:read", "user:update", "user:delete", "user:manage_roles", "system:config", "system:logs", "data:read", "data:write", "data:delete", "data:export", "geo:read", "geo:write", "geo:alert", "geo:monitor"];
    readonly manager: readonly ["user:read", "user:update", "data:read", "data:write", "data:export", "geo:read", "geo:write", "geo:alert"];
    readonly editor: readonly ["user:read", "data:read", "data:write", "geo:read", "geo:write"];
    readonly moderator: readonly ["user:read", "data:read", "geo:read", "geo:monitor"];
    readonly user: readonly ["data:read", "geo:read"];
    readonly viewer: readonly ["data:read", "geo:read"];
    readonly guest: readonly ["data:read"];
};

export declare type RoleHierarchy = typeof ROLE_HIERARCHY[keyof typeof ROLE_HIERARCHY];

export declare const ROUTE_PATTERNS: {
    readonly HOME: "/";
    readonly LOGIN: "/login";
    readonly REGISTER: "/register";
    readonly ACCOUNT: "/account";
    readonly SETTINGS: "/settings";
    readonly DATA: "/data";
    readonly DASHBOARD: "/dashboard";
    readonly ADMIN: "/admin";
    readonly MFA_ENROLL: "/mfa-enroll";
    readonly PROFILE: "/profile";
    readonly USERS: "/users";
    readonly ROLES: "/roles";
    readonly AUDIT: "/audit";
    readonly REPORTS: "/reports";
    readonly GEO_ALERTS: "/geo-alerts";
    readonly MAPS: "/maps";
};

export declare type RoutePattern = typeof ROUTE_PATTERNS[keyof typeof ROUTE_PATTERNS];

/**
 * 🎯 SNAP CONSTANTS
 * Constants για το snap-to-geometry system
 */
export declare const SNAP_CONSTANTS: {
    readonly DEFAULT_TOLERANCE: 10;
    readonly MAX_RESULTS: 50;
    readonly DEFAULT_PRIORITIES: {
        readonly endpoint: 100;
        readonly midpoint: 80;
        readonly center: 90;
        readonly vertex: 85;
        readonly intersection: 95;
        readonly perpendicular: 70;
        readonly tangent: 65;
        readonly nearest: 60;
        readonly grid: 50;
        readonly edge: 75;
    };
    readonly SPATIAL_INDEX: {
        readonly MAX_ENTRIES: 16;
        readonly MIN_ENTRIES: 4;
        readonly AUTO_REBALANCE_THRESHOLD: 1000;
    };
    readonly PERFORMANCE: {
        readonly HIGH_GEOMETRY_COUNT: 10000;
        readonly MEDIUM_GEOMETRY_COUNT: 5000;
        readonly LOW_GEOMETRY_COUNT: 1000;
        readonly MAX_SEARCH_TIME_MS: 16;
        readonly INDEX_REBUILD_WARNING_MS: 100;
    };
    readonly VISUAL: {
        readonly INDICATOR_SIZE: 16;
        readonly CURSOR_SIZE: 24;
        readonly ANIMATION_DURATION_MS: 200;
        readonly GUIDELINE_OPACITY: 0.6;
    };
};

export declare const SNAP_DEVICE_DEFAULTS: {
    readonly DESKTOP: {
        readonly tolerance: 10;
        readonly showGuidelines: true;
        readonly showTooltips: true;
        readonly animationEnabled: true;
        readonly maxGeometries: 10000;
    };
    readonly TABLET: {
        readonly tolerance: 15;
        readonly showGuidelines: true;
        readonly showTooltips: false;
        readonly animationEnabled: true;
        readonly maxGeometries: 5000;
    };
    readonly MOBILE: {
        readonly tolerance: 25;
        readonly showGuidelines: false;
        readonly showTooltips: false;
        readonly animationEnabled: false;
        readonly maxGeometries: 1000;
    };
};

export declare const SNAP_TYPE_GROUPS: {
    readonly BASIC: readonly ["endpoint", "midpoint", "center", "vertex"];
    readonly ADVANCED: readonly ["intersection", "grid", "edge"];
    readonly PRECISION: readonly ["perpendicular", "tangent", "nearest"];
    readonly CAD_RECOMMENDED: readonly ["endpoint", "midpoint", "center", "vertex", "intersection"];
    readonly GIS_RECOMMENDED: readonly ["endpoint", "vertex", "nearest"];
    readonly MOBILE_RECOMMENDED: readonly ["endpoint", "vertex"];
};

export declare const SNAP_VISUAL: {
    readonly COLORS: {
        readonly light: {
            readonly endpoint: "#ff6b6b";
            readonly midpoint: "#4ecdc4";
            readonly center: "#45b7d1";
            readonly vertex: "#96ceb4";
            readonly intersection: "#ffeaa7";
            readonly perpendicular: "#dda0dd";
            readonly tangent: "#98d8c8";
            readonly nearest: "#f7dc6f";
            readonly grid: "#bb8fce";
            readonly edge: "#85c1e9";
        };
        readonly dark: {
            readonly endpoint: "#e74c3c";
            readonly midpoint: "#1abc9c";
            readonly center: "#3498db";
            readonly vertex: "#2ecc71";
            readonly intersection: "#f39c12";
            readonly perpendicular: "#9b59b6";
            readonly tangent: "#16a085";
            readonly nearest: "#f1c40f";
            readonly grid: "#8e44ad";
            readonly edge: "#2980b9";
        };
    };
    readonly ICONS: {
        readonly endpoint: "square";
        readonly midpoint: "triangle";
        readonly center: "circle";
        readonly vertex: "diamond";
        readonly intersection: "cross";
        readonly perpendicular: "perpendicular";
        readonly tangent: "tangent";
        readonly nearest: "target";
        readonly grid: "grid";
        readonly edge: "line";
    };
};

export declare const SORT_DIRECTIONS: {
    readonly ASC: "asc";
    readonly DESC: "desc";
    readonly NONE: "none";
};

export declare type SortDirection = typeof SORT_DIRECTIONS[keyof typeof SORT_DIRECTIONS];

export declare const SPACING_SCALE: {
    readonly NONE: 0;
    readonly XXS: 2;
    readonly XS: 4;
    readonly SM: 8;
    readonly MD: 16;
    readonly LG: 24;
    readonly XL: 32;
    readonly XXL: 48;
    readonly XXXL: 64;
};

export declare type SpacingScale = typeof SPACING_SCALE[keyof typeof SPACING_SCALE];

export declare type SpacingToken = keyof typeof CSS_DESIGN_TOKENS.spacing;

export declare const TABLE_COLUMN_WIDTHS: {
    readonly NARROW: 80;
    readonly SMALL: 120;
    readonly STANDARD: 200;
    readonly WIDE: 300;
    readonly EXTRA_WIDE: 400;
};

export declare const TABLE_DENSITIES: {
    readonly COMPACT: "compact";
    readonly NORMAL: "normal";
    readonly COMFORTABLE: "comfortable";
};

/**
 * Table and data grid constants
 */
export declare const TABLE_VARIANTS: {
    readonly DEFAULT: "default";
    readonly STRIPED: "striped";
    readonly BORDERED: "bordered";
    readonly BORDERLESS: "borderless";
    readonly COMPACT: "compact";
    readonly SPACIOUS: "spacious";
};

export declare type TableColumnWidth = typeof TABLE_COLUMN_WIDTHS[keyof typeof TABLE_COLUMN_WIDTHS];

export declare type TableDensity = typeof TABLE_DENSITIES[keyof typeof TABLE_DENSITIES];

export declare type TableVariant = typeof TABLE_VARIANTS[keyof typeof TABLE_VARIANTS];

/**
 * Theme and design token constants
 */
export declare const THEME_MODES: {
    readonly LIGHT: "light";
    readonly DARK: "dark";
    readonly AUTO: "auto";
    readonly SYSTEM: "system";
};

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
export declare interface ThemeEngineConfig {
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

export declare type ThemeMode = typeof THEME_MODES[keyof typeof THEME_MODES];

/**
 * Theme State Management
 */
export declare interface ThemeState {
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

export declare type TypographyToken = keyof typeof CSS_DESIGN_TOKENS.typography;

/**
 * Type-safe border radius hook
 */
export declare const useBorderRadius: (token: BorderRadiusToken) => string;

/**
 * Type-safe color hook με semantic naming
 */
export declare const useColor: (token: ColorToken) => string;

/**
 * Component-specific design tokens hook
 */
export declare const useComponentTokens: (componentName: ComponentToken) => Record<string, string>;

/**
 * Hook για single design token με type safety
 */
export declare const useDesignToken: <T extends string>(tokenName: T) => string;

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

/**
 * Hook για multiple design tokens με optimized performance
 */
export declare const useDesignTokens: <T extends readonly string[]>(tokenNames: T) => Record<string, string>;

/**
 * Type-safe elevation hook
 */
export declare const useElevation: (token: ElevationToken) => string;

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
 * Core hook για theme access
 */
export declare const useLayeraTheme: () => LayeraThemeContext;

/**
 * Type-safe motion hook
 */
export declare const useMotion: (token: MotionToken) => string;

/**
 * User roles and permissions constants
 */
export declare const USER_ROLES: {
    readonly SUPER_ADMIN: "super_admin";
    readonly ADMIN: "admin";
    readonly MANAGER: "manager";
    readonly EDITOR: "editor";
    readonly MODERATOR: "moderator";
    readonly USER: "user";
    readonly VIEWER: "viewer";
    readonly GUEST: "guest";
};

export declare const USER_STATUS: {
    readonly ACTIVE: "active";
    readonly INACTIVE: "inactive";
    readonly PENDING: "pending";
    readonly SUSPENDED: "suspended";
    readonly VERIFIED: "verified";
    readonly UNVERIFIED: "unverified";
};

/**
 * Hook για responsive design tokens (θα επεκταθεί μελλοντικά)
 */
export declare const useResponsiveDesignTokens: () => {
    getSpacing: (token: SpacingToken, _scale?: "mobile" | "tablet" | "desktop" | "desktopLarge") => string;
};

export declare type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export declare type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];

/**
 * Type-safe spacing hook
 */
export declare const useSpacing: (token: SpacingToken) => string;

/**
 * Type-safe typography hook
 */
export declare const useTypography: (token: TypographyToken) => string;

/**
 * Type-safe z-index hook
 */
export declare const useZIndex: (token: ZIndexToken) => string;

export declare const VALIDATION_RULES: {
    readonly REQUIRED: "required";
    readonly MIN_LENGTH: "minLength";
    readonly MAX_LENGTH: "maxLength";
    readonly PATTERN: "pattern";
    readonly EMAIL: "email";
    readonly URL: "url";
    readonly NUMBER: "number";
    readonly MIN: "min";
    readonly MAX: "max";
    readonly CUSTOM: "custom";
};

export declare type ValidationRule = typeof VALIDATION_RULES[keyof typeof VALIDATION_RULES];

export declare const Z_INDEX: {
    readonly DROPDOWN: 1000;
    readonly STICKY: 1020;
    readonly FIXED: 1030;
    readonly MODAL_BACKDROP: 1040;
    readonly MODAL: 1050;
    readonly POPOVER: 1060;
    readonly TOOLTIP: 1070;
    readonly TOAST: 1080;
    readonly MAP_OVERLAY: 10000;
    readonly MAP_MODAL: 10050;
};

export declare type ZIndex = typeof Z_INDEX[keyof typeof Z_INDEX];

export declare type ZIndexToken = keyof typeof CSS_DESIGN_TOKENS.zIndex;

export { }
