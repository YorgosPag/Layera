/**
 * Size constants for consistent component sizing
 */
declare const COMPONENT_SIZES: {
    readonly XS: "xs";
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly XL: "xl";
};
declare const FORM_SIZES: {
    readonly SMALL: "sm";
    readonly MEDIUM: "md";
    readonly LARGE: "lg";
};
declare const BUTTON_SIZES: {
    readonly XS: "xs";
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly XL: "xl";
};
declare const ICON_SIZES: {
    readonly XS: "xs";
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly XL: "xl";
};
declare const TABLE_COLUMN_WIDTHS: {
    readonly NARROW: 80;
    readonly SMALL: 120;
    readonly STANDARD: 200;
    readonly WIDE: 300;
    readonly EXTRA_WIDE: 400;
};
type ComponentSize = typeof COMPONENT_SIZES[keyof typeof COMPONENT_SIZES];
type FormSize = typeof FORM_SIZES[keyof typeof FORM_SIZES];
type ButtonSize = typeof BUTTON_SIZES[keyof typeof BUTTON_SIZES];
type IconSize = typeof ICON_SIZES[keyof typeof ICON_SIZES];
type TableColumnWidth = typeof TABLE_COLUMN_WIDTHS[keyof typeof TABLE_COLUMN_WIDTHS];

/**
 * State constants for component states and statuses
 */
declare const FORM_STATES: {
    readonly DEFAULT: "default";
    readonly FOCUS: "focus";
    readonly ERROR: "error";
    readonly SUCCESS: "success";
    readonly WARNING: "warning";
    readonly DISABLED: "disabled";
    readonly LOADING: "loading";
};
declare const BUTTON_STATES: {
    readonly DEFAULT: "default";
    readonly HOVER: "hover";
    readonly ACTIVE: "active";
    readonly FOCUS: "focus";
    readonly DISABLED: "disabled";
    readonly LOADING: "loading";
};
declare const CARD_STATES: {
    readonly DEFAULT: "default";
    readonly HOVER: "hover";
    readonly ACTIVE: "active";
    readonly DISABLED: "disabled";
    readonly LOADING: "loading";
};
declare const DATA_STATES: {
    readonly LOADING: "loading";
    readonly SUCCESS: "success";
    readonly ERROR: "error";
    readonly EMPTY: "empty";
    readonly IDLE: "idle";
};
declare const USER_STATUS: {
    readonly ACTIVE: "active";
    readonly INACTIVE: "inactive";
    readonly PENDING: "pending";
    readonly SUSPENDED: "suspended";
    readonly VERIFIED: "verified";
    readonly UNVERIFIED: "unverified";
};
type FormState = typeof FORM_STATES[keyof typeof FORM_STATES];
type ButtonState = typeof BUTTON_STATES[keyof typeof BUTTON_STATES];
type CardState = typeof CARD_STATES[keyof typeof CARD_STATES];
type DataState = typeof DATA_STATES[keyof typeof DATA_STATES];
type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];

/**
 * User roles and permissions constants
 */
declare const USER_ROLES: {
    readonly SUPER_ADMIN: "super_admin";
    readonly ADMIN: "admin";
    readonly MANAGER: "manager";
    readonly EDITOR: "editor";
    readonly MODERATOR: "moderator";
    readonly USER: "user";
    readonly VIEWER: "viewer";
    readonly GUEST: "guest";
};
declare const ROLE_HIERARCHY: {
    readonly super_admin: 100;
    readonly admin: 90;
    readonly manager: 80;
    readonly editor: 70;
    readonly moderator: 60;
    readonly user: 50;
    readonly viewer: 30;
    readonly guest: 10;
};
declare const PERMISSIONS: {
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
declare const ROLE_PERMISSIONS: {
    readonly super_admin: ("user:create" | "user:read" | "user:update" | "user:delete" | "user:manage_roles" | "system:admin" | "system:config" | "system:logs" | "system:backup" | "data:read" | "data:write" | "data:delete" | "data:export" | "data:import" | "geo:read" | "geo:write" | "geo:alert" | "geo:monitor")[];
    readonly admin: readonly ["user:create", "user:read", "user:update", "user:delete", "user:manage_roles", "system:config", "system:logs", "data:read", "data:write", "data:delete", "data:export", "geo:read", "geo:write", "geo:alert", "geo:monitor"];
    readonly manager: readonly ["user:read", "user:update", "data:read", "data:write", "data:export", "geo:read", "geo:write", "geo:alert"];
    readonly editor: readonly ["user:read", "data:read", "data:write", "geo:read", "geo:write"];
    readonly moderator: readonly ["user:read", "data:read", "geo:read", "geo:monitor"];
    readonly user: readonly ["data:read", "geo:read"];
    readonly viewer: readonly ["data:read", "geo:read"];
    readonly guest: readonly ["data:read"];
};
type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
type RoleHierarchy = typeof ROLE_HIERARCHY[keyof typeof ROLE_HIERARCHY];

/**
 * Form-related constants
 */
declare const FORM_TYPES: {
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
declare const INPUT_VARIANTS: {
    readonly DEFAULT: "default";
    readonly OUTLINE: "outline";
    readonly FILLED: "filled";
    readonly GHOST: "ghost";
    readonly UNDERLINE: "underline";
};
declare const VALIDATION_RULES: {
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
declare const AUTOCOMPLETE_VALUES: {
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
declare const FIELD_SIZES: {
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly FULL: "full";
};
type FormType = typeof FORM_TYPES[keyof typeof FORM_TYPES];
type InputVariant = typeof INPUT_VARIANTS[keyof typeof INPUT_VARIANTS];
type ValidationRule = typeof VALIDATION_RULES[keyof typeof VALIDATION_RULES];
type AutocompleteValue = typeof AUTOCOMPLETE_VALUES[keyof typeof AUTOCOMPLETE_VALUES];
type FieldSize = typeof FIELD_SIZES[keyof typeof FIELD_SIZES];

/**
 * Table and data grid constants
 */
declare const TABLE_VARIANTS: {
    readonly DEFAULT: "default";
    readonly STRIPED: "striped";
    readonly BORDERED: "bordered";
    readonly BORDERLESS: "borderless";
    readonly COMPACT: "compact";
    readonly SPACIOUS: "spacious";
};
declare const SORT_DIRECTIONS: {
    readonly ASC: "asc";
    readonly DESC: "desc";
    readonly NONE: "none";
};
declare const FILTER_TYPES: {
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
declare const COLUMN_TYPES: {
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
declare const TABLE_DENSITIES: {
    readonly COMPACT: "compact";
    readonly NORMAL: "normal";
    readonly COMFORTABLE: "comfortable";
};
declare const PAGINATION_SIZES: {
    readonly SMALL: 10;
    readonly MEDIUM: 25;
    readonly LARGE: 50;
    readonly EXTRA_LARGE: 100;
};
declare const BULK_ACTIONS: {
    readonly SELECT_ALL: "selectAll";
    readonly SELECT_NONE: "selectNone";
    readonly SELECT_PAGE: "selectPage";
    readonly EXPORT: "export";
    readonly DELETE: "delete";
    readonly ARCHIVE: "archive";
    readonly ACTIVATE: "activate";
    readonly DEACTIVATE: "deactivate";
};
declare const EXPORT_FORMATS: {
    readonly CSV: "csv";
    readonly EXCEL: "xlsx";
    readonly PDF: "pdf";
    readonly JSON: "json";
};
type TableVariant = typeof TABLE_VARIANTS[keyof typeof TABLE_VARIANTS];
type SortDirection = typeof SORT_DIRECTIONS[keyof typeof SORT_DIRECTIONS];
type FilterType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];
type ColumnType = typeof COLUMN_TYPES[keyof typeof COLUMN_TYPES];
type TableDensity = typeof TABLE_DENSITIES[keyof typeof TABLE_DENSITIES];
type PaginationSize = typeof PAGINATION_SIZES[keyof typeof PAGINATION_SIZES];
type BulkAction = typeof BULK_ACTIONS[keyof typeof BULK_ACTIONS];
type ExportFormat = typeof EXPORT_FORMATS[keyof typeof EXPORT_FORMATS];

/**
 * Theme and design token constants
 */
declare const THEME_MODES: {
    readonly LIGHT: "light";
    readonly DARK: "dark";
    readonly AUTO: "auto";
    readonly SYSTEM: "system";
};
declare const COLOR_SCHEMES: {
    readonly PRIMARY: "primary";
    readonly SECONDARY: "secondary";
    readonly SUCCESS: "success";
    readonly WARNING: "warning";
    readonly ERROR: "error";
    readonly INFO: "info";
    readonly NEUTRAL: "neutral";
};
declare const COMPONENT_VARIANTS: {
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
declare const ELEVATION_LEVELS: {
    readonly NONE: 0;
    readonly XS: 1;
    readonly SM: 2;
    readonly MD: 3;
    readonly LG: 4;
    readonly XL: 5;
    readonly XXL: 6;
};
declare const BORDER_RADIUS: {
    readonly NONE: 0;
    readonly XS: 2;
    readonly SM: 4;
    readonly MD: 6;
    readonly LG: 8;
    readonly XL: 12;
    readonly XXL: 16;
    readonly FULL: 9999;
};
declare const SPACING_SCALE: {
    readonly NONE: 0;
    readonly XS: 4;
    readonly SM: 8;
    readonly MD: 16;
    readonly LG: 24;
    readonly XL: 32;
    readonly XXL: 48;
    readonly XXXL: 64;
};
type ThemeMode = typeof THEME_MODES[keyof typeof THEME_MODES];
type ColorScheme = typeof COLOR_SCHEMES[keyof typeof COLOR_SCHEMES];
type ComponentVariant = typeof COMPONENT_VARIANTS[keyof typeof COMPONENT_VARIANTS];
type ElevationLevel = typeof ELEVATION_LEVELS[keyof typeof ELEVATION_LEVELS];
type BorderRadius = typeof BORDER_RADIUS[keyof typeof BORDER_RADIUS];
type SpacingScale = typeof SPACING_SCALE[keyof typeof SPACING_SCALE];

/**
 * Navigation and routing constants
 */
declare const NAVIGATION_TYPES: {
    readonly HORIZONTAL: "horizontal";
    readonly VERTICAL: "vertical";
    readonly SIDEBAR: "sidebar";
    readonly BREADCRUMB: "breadcrumb";
    readonly TAB: "tab";
    readonly STEPPER: "stepper";
};
declare const MENU_POSITIONS: {
    readonly TOP: "top";
    readonly BOTTOM: "bottom";
    readonly LEFT: "left";
    readonly RIGHT: "right";
    readonly CENTER: "center";
};
declare const LINK_TARGETS: {
    readonly SELF: "_self";
    readonly BLANK: "_blank";
    readonly PARENT: "_parent";
    readonly TOP: "_top";
};
declare const ROUTE_PATTERNS: {
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
declare const PAGE_LAYOUTS: {
    readonly FULLSCREEN: "fullscreen";
    readonly CENTERED: "centered";
    readonly SIDEBAR: "sidebar";
    readonly SPLIT: "split";
    readonly MODAL: "modal";
};
type NavigationType = typeof NAVIGATION_TYPES[keyof typeof NAVIGATION_TYPES];
type MenuPosition = typeof MENU_POSITIONS[keyof typeof MENU_POSITIONS];
type LinkTarget = typeof LINK_TARGETS[keyof typeof LINK_TARGETS];
type RoutePattern = typeof ROUTE_PATTERNS[keyof typeof ROUTE_PATTERNS];
type PageLayout = typeof PAGE_LAYOUTS[keyof typeof PAGE_LAYOUTS];

/**
 * 🎯 SNAP CONSTANTS
 * Constants για το snap-to-geometry system
 */
declare const SNAP_CONSTANTS: {
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
declare const SNAP_VISUAL: {
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
declare const SNAP_DEVICE_DEFAULTS: {
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
declare const SNAP_TYPE_GROUPS: {
    readonly BASIC: readonly ["endpoint", "midpoint", "center", "vertex"];
    readonly ADVANCED: readonly ["intersection", "grid", "edge"];
    readonly PRECISION: readonly ["perpendicular", "tangent", "nearest"];
    readonly CAD_RECOMMENDED: readonly ["endpoint", "midpoint", "center", "vertex", "intersection"];
    readonly GIS_RECOMMENDED: readonly ["endpoint", "vertex", "nearest"];
    readonly MOBILE_RECOMMENDED: readonly ["endpoint", "vertex"];
};

/**
 * Geo-Drawing constants for @layera/geo-drawing LEGO system
 * Αντικαθιστά τα hardcoded values από OLD_geo-canvas
 */
/**
 * Snap-to-geometry configuration
 */
declare const GEO_DRAWING_SNAP: {
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
 * Measurement configuration
 */
declare const GEO_DRAWING_MEASUREMENT: {
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
declare const GEO_DRAWING_OSM: {
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
 * Drawing interaction configuration
 */
declare const GEO_DRAWING_INTERACTION: {
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
 * Visual styling configuration
 */
declare const GEO_DRAWING_STYLES: {
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
 * Error messages keys για i18n
 */
declare const GEO_DRAWING_ERRORS: {
    readonly MINIMUM_POINTS_DISTANCE: "geo-drawing.errors.minimum-points-distance";
    readonly MINIMUM_POINTS_AREA: "geo-drawing.errors.minimum-points-area";
    readonly OSM_FETCH_FAILED: "geo-drawing.errors.osm-fetch-failed";
    readonly SNAP_ENGINE_ERROR: "geo-drawing.errors.snap-engine-error";
    readonly CALCULATION_ERROR: "geo-drawing.errors.calculation-error";
};
/**
 * Success messages keys για i18n
 */
declare const GEO_DRAWING_SUCCESS: {
    readonly MEASUREMENT_COMPLETED: "geo-drawing.success.measurement-completed";
    readonly MEASUREMENT_SAVED: "geo-drawing.success.measurement-saved";
    readonly MEASUREMENT_CLEARED: "geo-drawing.success.measurement-cleared";
};
/**
 * Combined configuration object
 */
declare const CONFIG: {
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
 * @layera/constants
 * Centralized constants and configuration values for the Layera design system
 */

declare const LAYERA_CONSTANTS_VERSION = "1.0.0";

export { AUTOCOMPLETE_VALUES, type AutocompleteValue, BORDER_RADIUS, BULK_ACTIONS, BUTTON_SIZES, BUTTON_STATES, type BorderRadius, type BulkAction, type ButtonSize, type ButtonState, CARD_STATES, COLOR_SCHEMES, COLUMN_TYPES, COMPONENT_SIZES, COMPONENT_VARIANTS, CONFIG, type CardState, type ColorScheme, type ColumnType, type ComponentSize, type ComponentVariant, DATA_STATES, type DataState, ELEVATION_LEVELS, EXPORT_FORMATS, type ElevationLevel, type ExportFormat, FIELD_SIZES, FILTER_TYPES, FORM_SIZES, FORM_STATES, FORM_TYPES, type FieldSize, type FilterType, type FormSize, type FormState, type FormType, GEO_DRAWING_ERRORS, GEO_DRAWING_INTERACTION, GEO_DRAWING_MEASUREMENT, GEO_DRAWING_OSM, GEO_DRAWING_SNAP, GEO_DRAWING_STYLES, GEO_DRAWING_SUCCESS, ICON_SIZES, INPUT_VARIANTS, type IconSize, type InputVariant, LAYERA_CONSTANTS_VERSION, LINK_TARGETS, type LinkTarget, MENU_POSITIONS, type MenuPosition, NAVIGATION_TYPES, type NavigationType, PAGE_LAYOUTS, PAGINATION_SIZES, PERMISSIONS, type PageLayout, type PaginationSize, type Permission, ROLE_HIERARCHY, ROLE_PERMISSIONS, ROUTE_PATTERNS, type RoleHierarchy, type RoutePattern, SNAP_CONSTANTS, SNAP_DEVICE_DEFAULTS, SNAP_TYPE_GROUPS, SNAP_VISUAL, SORT_DIRECTIONS, SPACING_SCALE, type SortDirection, type SpacingScale, TABLE_COLUMN_WIDTHS, TABLE_DENSITIES, TABLE_VARIANTS, THEME_MODES, type TableColumnWidth, type TableDensity, type TableVariant, type ThemeMode, USER_ROLES, USER_STATUS, type UserRole, type UserStatus, VALIDATION_RULES, type ValidationRule };
