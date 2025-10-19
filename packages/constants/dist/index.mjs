// src/sizes.ts
var COMPONENT_SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl"
};
var FORM_SIZES = {
  SMALL: "sm",
  MEDIUM: "md",
  LARGE: "lg"
};
var BUTTON_SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl"
};
var ICON_SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl"
};
var TABLE_COLUMN_WIDTHS = {
  NARROW: 80,
  SMALL: 120,
  STANDARD: 200,
  WIDE: 300,
  EXTRA_WIDE: 400
};

// src/states.ts
var FORM_STATES = {
  DEFAULT: "default",
  FOCUS: "focus",
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  DISABLED: "disabled",
  LOADING: "loading"
};
var BUTTON_STATES = {
  DEFAULT: "default",
  HOVER: "hover",
  ACTIVE: "active",
  FOCUS: "focus",
  DISABLED: "disabled",
  LOADING: "loading"
};
var CARD_STATES = {
  DEFAULT: "default",
  HOVER: "hover",
  ACTIVE: "active",
  DISABLED: "disabled",
  LOADING: "loading"
};
var DATA_STATES = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  EMPTY: "empty",
  IDLE: "idle"
};
var USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  SUSPENDED: "suspended",
  VERIFIED: "verified",
  UNVERIFIED: "unverified"
};

// src/roles.ts
var USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  MANAGER: "manager",
  EDITOR: "editor",
  MODERATOR: "moderator",
  USER: "user",
  VIEWER: "viewer",
  GUEST: "guest"
};
var ROLE_HIERARCHY = {
  [USER_ROLES.SUPER_ADMIN]: 100,
  [USER_ROLES.ADMIN]: 90,
  [USER_ROLES.MANAGER]: 80,
  [USER_ROLES.EDITOR]: 70,
  [USER_ROLES.MODERATOR]: 60,
  [USER_ROLES.USER]: 50,
  [USER_ROLES.VIEWER]: 30,
  [USER_ROLES.GUEST]: 10
};
var PERMISSIONS = {
  // User management
  USER_CREATE: "user:create",
  USER_READ: "user:read",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",
  USER_MANAGE_ROLES: "user:manage_roles",
  // System administration
  SYSTEM_ADMIN: "system:admin",
  SYSTEM_CONFIG: "system:config",
  SYSTEM_LOGS: "system:logs",
  SYSTEM_BACKUP: "system:backup",
  // Data management
  DATA_READ: "data:read",
  DATA_WRITE: "data:write",
  DATA_DELETE: "data:delete",
  DATA_EXPORT: "data:export",
  DATA_IMPORT: "data:import",
  // Geographic data
  GEO_READ: "geo:read",
  GEO_WRITE: "geo:write",
  GEO_ALERT: "geo:alert",
  GEO_MONITOR: "geo:monitor"
};
var ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_MANAGE_ROLES,
    PERMISSIONS.SYSTEM_CONFIG,
    PERMISSIONS.SYSTEM_LOGS,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.DATA_WRITE,
    PERMISSIONS.DATA_DELETE,
    PERMISSIONS.DATA_EXPORT,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_WRITE,
    PERMISSIONS.GEO_ALERT,
    PERMISSIONS.GEO_MONITOR
  ],
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.DATA_WRITE,
    PERMISSIONS.DATA_EXPORT,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_WRITE,
    PERMISSIONS.GEO_ALERT
  ],
  [USER_ROLES.EDITOR]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.DATA_WRITE,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_WRITE
  ],
  [USER_ROLES.MODERATOR]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_MONITOR
  ],
  [USER_ROLES.USER]: [
    PERMISSIONS.DATA_READ,
    PERMISSIONS.GEO_READ
  ],
  [USER_ROLES.VIEWER]: [
    PERMISSIONS.DATA_READ,
    PERMISSIONS.GEO_READ
  ],
  [USER_ROLES.GUEST]: [
    PERMISSIONS.DATA_READ
  ]
};

// src/forms.ts
var FORM_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  TEL: "tel",
  URL: "url",
  NUMBER: "number",
  DATE: "date",
  DATETIME_LOCAL: "datetime-local",
  TIME: "time",
  SEARCH: "search",
  TEXTAREA: "textarea",
  SELECT: "select",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  FILE: "file"
};
var INPUT_VARIANTS = {
  DEFAULT: "default",
  OUTLINE: "outline",
  FILLED: "filled",
  GHOST: "ghost",
  UNDERLINE: "underline"
};
var VALIDATION_RULES = {
  REQUIRED: "required",
  MIN_LENGTH: "minLength",
  MAX_LENGTH: "maxLength",
  PATTERN: "pattern",
  EMAIL: "email",
  URL: "url",
  NUMBER: "number",
  MIN: "min",
  MAX: "max",
  CUSTOM: "custom"
};
var AUTOCOMPLETE_VALUES = {
  OFF: "off",
  ON: "on",
  NAME: "name",
  EMAIL: "email",
  USERNAME: "username",
  NEW_PASSWORD: "new-password",
  CURRENT_PASSWORD: "current-password",
  PHONE: "tel",
  ORGANIZATION: "organization",
  STREET_ADDRESS: "street-address",
  COUNTRY: "country",
  POSTAL_CODE: "postal-code"
};
var FIELD_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
  FULL: "full"
};

// src/tables.ts
var TABLE_VARIANTS = {
  DEFAULT: "default",
  STRIPED: "striped",
  BORDERED: "bordered",
  BORDERLESS: "borderless",
  COMPACT: "compact",
  SPACIOUS: "spacious"
};
var SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
  NONE: "none"
};
var FILTER_TYPES = {
  TEXT: "text",
  SELECT: "select",
  MULTISELECT: "multiselect",
  DATE: "date",
  DATE_RANGE: "dateRange",
  NUMBER: "number",
  NUMBER_RANGE: "numberRange",
  BOOLEAN: "boolean",
  CUSTOM: "custom"
};
var COLUMN_TYPES = {
  TEXT: "text",
  NUMBER: "number",
  DATE: "date",
  BOOLEAN: "boolean",
  BADGE: "badge",
  AVATAR: "avatar",
  ACTIONS: "actions",
  LINK: "link",
  CUSTOM: "custom"
};
var TABLE_DENSITIES = {
  COMPACT: "compact",
  NORMAL: "normal",
  COMFORTABLE: "comfortable"
};
var PAGINATION_SIZES = {
  SMALL: 10,
  MEDIUM: 25,
  LARGE: 50,
  EXTRA_LARGE: 100
};
var BULK_ACTIONS = {
  SELECT_ALL: "selectAll",
  SELECT_NONE: "selectNone",
  SELECT_PAGE: "selectPage",
  EXPORT: "export",
  DELETE: "delete",
  ARCHIVE: "archive",
  ACTIVATE: "activate",
  DEACTIVATE: "deactivate"
};
var EXPORT_FORMATS = {
  CSV: "csv",
  EXCEL: "xlsx",
  PDF: "pdf",
  JSON: "json"
};

// src/themes.ts
var THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto",
  SYSTEM: "system"
};
var COLOR_SCHEMES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  INFO: "info",
  NEUTRAL: "neutral"
};
var COMPONENT_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
  GHOST: "ghost",
  OUTLINE: "outline",
  LINK: "link",
  DANGER: "danger",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info"
};
var ELEVATION_LEVELS = {
  NONE: 0,
  XS: 1,
  SM: 2,
  MD: 3,
  LG: 4,
  XL: 5,
  XXL: 6
};
var BORDER_RADIUS = {
  NONE: 0,
  XS: 2,
  SM: 4,
  MD: 6,
  LG: 8,
  XL: 12,
  XXL: 16,
  FULL: 9999
};
var SPACING_SCALE = {
  NONE: 0,
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 64
};
var Z_INDEX = {
  DROPDOWN: 1e3,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080
};

// src/navigation.ts
var NAVIGATION_TYPES = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
  SIDEBAR: "sidebar",
  BREADCRUMB: "breadcrumb",
  TAB: "tab",
  STEPPER: "stepper"
};
var MENU_POSITIONS = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center"
};
var LINK_TARGETS = {
  SELF: "_self",
  BLANK: "_blank",
  PARENT: "_parent",
  TOP: "_top"
};
var ROUTE_PATTERNS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ACCOUNT: "/account",
  SETTINGS: "/settings",
  DATA: "/data",
  DASHBOARD: "/dashboard",
  ADMIN: "/admin",
  MFA_ENROLL: "/mfa-enroll",
  PROFILE: "/profile",
  USERS: "/users",
  ROLES: "/roles",
  AUDIT: "/audit",
  REPORTS: "/reports",
  GEO_ALERTS: "/geo-alerts",
  MAPS: "/maps"
};
var PAGE_LAYOUTS = {
  FULLSCREEN: "fullscreen",
  CENTERED: "centered",
  SIDEBAR: "sidebar",
  SPLIT: "split",
  MODAL: "modal"
};

// src/snap.ts
var SNAP_CONSTANTS = {
  // Default snap tolerance σε pixels
  DEFAULT_TOLERANCE: 10,
  // Maximum results από spatial queries
  MAX_RESULTS: 50,
  // Snap type priorities (0-100, higher = more priority)
  DEFAULT_PRIORITIES: {
    endpoint: 100,
    midpoint: 80,
    center: 90,
    vertex: 85,
    intersection: 95,
    perpendicular: 70,
    tangent: 65,
    nearest: 60,
    grid: 50,
    edge: 75
  },
  // Spatial index configuration
  SPATIAL_INDEX: {
    MAX_ENTRIES: 16,
    MIN_ENTRIES: 4,
    AUTO_REBALANCE_THRESHOLD: 1e3
  },
  // Performance thresholds
  PERFORMANCE: {
    HIGH_GEOMETRY_COUNT: 1e4,
    MEDIUM_GEOMETRY_COUNT: 5e3,
    LOW_GEOMETRY_COUNT: 1e3,
    MAX_SEARCH_TIME_MS: 16,
    // ~60fps
    INDEX_REBUILD_WARNING_MS: 100
  },
  // Visual feedback
  VISUAL: {
    INDICATOR_SIZE: 16,
    CURSOR_SIZE: 24,
    ANIMATION_DURATION_MS: 200,
    GUIDELINE_OPACITY: 0.6
  }
};
var SNAP_VISUAL = {
  // Colors per snap type (theme-aware)
  COLORS: {
    light: {
      endpoint: "#ff6b6b",
      midpoint: "#4ecdc4",
      center: "#45b7d1",
      vertex: "#96ceb4",
      intersection: "#ffeaa7",
      perpendicular: "#dda0dd",
      tangent: "#98d8c8",
      nearest: "#f7dc6f",
      grid: "#bb8fce",
      edge: "#85c1e9"
    },
    dark: {
      endpoint: "#e74c3c",
      midpoint: "#1abc9c",
      center: "#3498db",
      vertex: "#2ecc71",
      intersection: "#f39c12",
      perpendicular: "#9b59b6",
      tangent: "#16a085",
      nearest: "#f1c40f",
      grid: "#8e44ad",
      edge: "#2980b9"
    }
  },
  // Icons per snap type
  ICONS: {
    endpoint: "square",
    midpoint: "triangle",
    center: "circle",
    vertex: "diamond",
    intersection: "cross",
    perpendicular: "perpendicular",
    tangent: "tangent",
    nearest: "target",
    grid: "grid",
    edge: "line"
  }
};
var SNAP_DEVICE_DEFAULTS = {
  DESKTOP: {
    tolerance: 10,
    showGuidelines: true,
    showTooltips: true,
    animationEnabled: true,
    maxGeometries: 1e4
  },
  TABLET: {
    tolerance: 15,
    showGuidelines: true,
    showTooltips: false,
    animationEnabled: true,
    maxGeometries: 5e3
  },
  MOBILE: {
    tolerance: 25,
    showGuidelines: false,
    showTooltips: false,
    animationEnabled: false,
    maxGeometries: 1e3
  }
};
var SNAP_TYPE_GROUPS = {
  BASIC: ["endpoint", "midpoint", "center", "vertex"],
  ADVANCED: ["intersection", "grid", "edge"],
  PRECISION: ["perpendicular", "tangent", "nearest"],
  CAD_RECOMMENDED: ["endpoint", "midpoint", "center", "vertex", "intersection"],
  GIS_RECOMMENDED: ["endpoint", "vertex", "nearest"],
  MOBILE_RECOMMENDED: ["endpoint", "vertex"]
};

// src/geo-drawing.ts
var GEO_DRAWING_SNAP = {
  /** Default snap tolerance σε pixels */
  DEFAULT_TOLERANCE: 15,
  /** Minimum zoom level για OSM data fetching */
  MIN_SNAP_ZOOM: 16,
  /** Maximum zoom για OSM API calls */
  MAX_SNAP_ZOOM: 20,
  /** Debounce time για map movement events (ms) */
  DEBOUNCE_MS: 500,
  /** Priority order για snap types */
  SNAP_PRIORITY: ["vertex", "center", "midpoint", "edge", "nearest"]
};
var GEO_DRAWING_MEASUREMENT = {
  /** Default decimal places για distance display */
  DISTANCE_DECIMALS: 2,
  /** Default decimal places για area display */
  AREA_DECIMALS: 2,
  /** Default decimal places για coordinates */
  COORDINATE_DECIMALS: 6,
  /** Threshold για switching από meters σε kilometers */
  DISTANCE_KM_THRESHOLD: 1e3,
  /** Threshold για switching από m² σε hectares */
  AREA_HECTARE_THRESHOLD: 1e4,
  /** Threshold για switching από hectares σε km² */
  AREA_KM_THRESHOLD: 1e6
};
var GEO_DRAWING_OSM = {
  /** Overpass API URL */
  OVERPASS_API_URL: "https://overpass-api.de/api/interpreter",
  /** Request timeout σε milliseconds */
  REQUEST_TIMEOUT: 3e4,
  /** Maximum cache entries */
  MAX_CACHE_ENTRIES: 100,
  /** Cache TTL σε milliseconds (5 minutes) */
  CACHE_TTL: 5 * 60 * 1e3,
  /** Coordinate precision για cache keys */
  CACHE_PRECISION: 4
};
var GEO_DRAWING_INTERACTION = {
  /** Double-click timeout σε milliseconds */
  DOUBLE_CLICK_TIMEOUT: 300,
  /** Key codes για shortcuts */
  KEY_CODES: {
    ESCAPE: "Escape",
    ENTER: "Enter",
    DELETE: "Delete",
    BACKSPACE: "Backspace"
  },
  /** Mouse button codes */
  MOUSE_BUTTONS: {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  }
};
var GEO_DRAWING_STYLES = {
  /** Default line weights */
  LINE_WEIGHTS: {
    THIN: 1,
    NORMAL: 2,
    THICK: 3,
    MEASUREMENT: 3,
    OSM_BUILDING: 1
  },
  /** Point marker sizes */
  POINT_SIZES: {
    SMALL: 4,
    NORMAL: 6,
    LARGE: 8
  },
  /** Opacity values */
  OPACITY: {
    DRAWING: 0.8,
    FINISHED: 1,
    BUILDING_FILL: 0.1,
    BUILDING_HOVER: 0.3,
    MEASUREMENT_FILL: 0.3
  }
};
var GEO_DRAWING_ERRORS = {
  MINIMUM_POINTS_DISTANCE: "geo-drawing.errors.minimum-points-distance",
  MINIMUM_POINTS_AREA: "geo-drawing.errors.minimum-points-area",
  OSM_FETCH_FAILED: "geo-drawing.errors.osm-fetch-failed",
  SNAP_ENGINE_ERROR: "geo-drawing.errors.snap-engine-error",
  CALCULATION_ERROR: "geo-drawing.errors.calculation-error"
};
var GEO_DRAWING_SUCCESS = {
  MEASUREMENT_COMPLETED: "geo-drawing.success.measurement-completed",
  MEASUREMENT_SAVED: "geo-drawing.success.measurement-saved",
  MEASUREMENT_CLEARED: "geo-drawing.success.measurement-cleared"
};
var CONFIG = {
  geoDrawing: {
    snapTolerance: GEO_DRAWING_SNAP.DEFAULT_TOLERANCE,
    minSnapZoom: GEO_DRAWING_SNAP.MIN_SNAP_ZOOM,
    debounceMs: GEO_DRAWING_SNAP.DEBOUNCE_MS,
    ...GEO_DRAWING_MEASUREMENT,
    ...GEO_DRAWING_INTERACTION
  },
  osm: {
    overpassApiUrl: GEO_DRAWING_OSM.OVERPASS_API_URL,
    requestTimeout: GEO_DRAWING_OSM.REQUEST_TIMEOUT,
    maxCacheEntries: GEO_DRAWING_OSM.MAX_CACHE_ENTRIES,
    cacheTtl: GEO_DRAWING_OSM.CACHE_TTL
  }
};

// src/index.ts
var LAYERA_CONSTANTS_VERSION = "1.0.0";
export {
  AUTOCOMPLETE_VALUES,
  BORDER_RADIUS,
  BULK_ACTIONS,
  BUTTON_SIZES,
  BUTTON_STATES,
  CARD_STATES,
  COLOR_SCHEMES,
  COLUMN_TYPES,
  COMPONENT_SIZES,
  COMPONENT_VARIANTS,
  CONFIG,
  DATA_STATES,
  ELEVATION_LEVELS,
  EXPORT_FORMATS,
  FIELD_SIZES,
  FILTER_TYPES,
  FORM_SIZES,
  FORM_STATES,
  FORM_TYPES,
  GEO_DRAWING_ERRORS,
  GEO_DRAWING_INTERACTION,
  GEO_DRAWING_MEASUREMENT,
  GEO_DRAWING_OSM,
  GEO_DRAWING_SNAP,
  GEO_DRAWING_STYLES,
  GEO_DRAWING_SUCCESS,
  ICON_SIZES,
  INPUT_VARIANTS,
  LAYERA_CONSTANTS_VERSION,
  LINK_TARGETS,
  MENU_POSITIONS,
  NAVIGATION_TYPES,
  PAGE_LAYOUTS,
  PAGINATION_SIZES,
  PERMISSIONS,
  ROLE_HIERARCHY,
  ROLE_PERMISSIONS,
  ROUTE_PATTERNS,
  SNAP_CONSTANTS,
  SNAP_DEVICE_DEFAULTS,
  SNAP_TYPE_GROUPS,
  SNAP_VISUAL,
  SORT_DIRECTIONS,
  SPACING_SCALE,
  TABLE_COLUMN_WIDTHS,
  TABLE_DENSITIES,
  TABLE_VARIANTS,
  THEME_MODES,
  USER_ROLES,
  USER_STATUS,
  VALIDATION_RULES,
  Z_INDEX
};
