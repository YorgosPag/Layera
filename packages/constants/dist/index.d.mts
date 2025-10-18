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
 * @layera/constants
 * Centralized constants and configuration values for the Layera design system
 */

declare const LAYERA_CONSTANTS_VERSION = "1.0.0";

export { AUTOCOMPLETE_VALUES, AutocompleteValue, BORDER_RADIUS, BULK_ACTIONS, BUTTON_SIZES, BUTTON_STATES, BorderRadius, BulkAction, ButtonSize, ButtonState, CARD_STATES, COLOR_SCHEMES, COLUMN_TYPES, COMPONENT_SIZES, COMPONENT_VARIANTS, CardState, ColorScheme, ColumnType, ComponentSize, ComponentVariant, DATA_STATES, DataState, ELEVATION_LEVELS, EXPORT_FORMATS, ElevationLevel, ExportFormat, FIELD_SIZES, FILTER_TYPES, FORM_SIZES, FORM_STATES, FORM_TYPES, FieldSize, FilterType, FormSize, FormState, FormType, ICON_SIZES, INPUT_VARIANTS, IconSize, InputVariant, LAYERA_CONSTANTS_VERSION, LINK_TARGETS, LinkTarget, MENU_POSITIONS, MenuPosition, NAVIGATION_TYPES, NavigationType, PAGE_LAYOUTS, PAGINATION_SIZES, PERMISSIONS, PageLayout, PaginationSize, Permission, ROLE_HIERARCHY, ROLE_PERMISSIONS, ROUTE_PATTERNS, RoleHierarchy, RoutePattern, SORT_DIRECTIONS, SPACING_SCALE, SortDirection, SpacingScale, TABLE_COLUMN_WIDTHS, TABLE_DENSITIES, TABLE_VARIANTS, THEME_MODES, TableColumnWidth, TableDensity, TableVariant, ThemeMode, USER_ROLES, USER_STATUS, UserRole, UserStatus, VALIDATION_RULES, ValidationRule };
