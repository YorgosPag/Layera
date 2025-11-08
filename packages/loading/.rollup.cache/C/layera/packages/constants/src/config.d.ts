/**
 * @layera/constants - Configuration
 *
 * SINGLE SOURCE OF TRUTH για όλες τις configuration τιμές
 * Enterprise-grade centralized configuration management
 */
/**
 * External Service URLs - Production Grade APIs
 */
export declare const EXTERNAL_APIS: {
    readonly VITEJS_CONFIG: "https://vitejs.dev/config/";
    readonly VITE_CONFIG: "https://vite.dev/config/";
    readonly ESLINT_VERSION_SUPPORT: "https://eslint.org/version-support";
    readonly MDN_ARRAY_SORT: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#browser_compatibility";
    readonly FIREBASE_CONSOLE: "https://console.firebase.google.com";
    readonly GOOGLE_CLOUD_CONSOLE: "https://console.cloud.google.com";
    readonly QR_CODE_GENERATOR: "https://api.qrserver.com/v1/create-qr-code";
    readonly TOLGEE_API: "https://app.tolgee.io";
    readonly LAYERA_DOCS_RBAC: "https://layera.dev/docs/rbac";
    readonly LAYERA_DOCS_AUTH: "https://layera.dev/docs/auth-bridge";
    readonly ESCO_API_BASE: "https://esco.ec.europa.eu/api";
};
/**
 * Leaflet Map Infrastructure URLs
 */
export declare const LEAFLET_INFRASTRUCTURE: {
    readonly CSS: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    readonly MARKER_ICON: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
    readonly MARKER_ICON_2X: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
    readonly MARKER_SHADOW: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";
};
/**
 * Animation Durations για UI Interactions
 */
export declare const ANIMATION_DURATIONS: {
    readonly PROPERTY_TYPE_SELECTION: 500;
    readonly OCCUPATION_SEARCH: 1500;
    readonly COMPLETE_STEP: 500;
    readonly FORM_VALIDATION_DELAY: 300;
    readonly SEARCH_DEBOUNCE: 300;
    readonly API_DEBOUNCE: 500;
    readonly MODAL_TRANSITION: 200;
    readonly SIDEBAR_TRANSITION: 300;
    readonly TOOLTIP_DELAY: 500;
    readonly INSTANT: 50;
    readonly FAST: 150;
    readonly NORMAL: 300;
    readonly SLOW: 500;
    readonly EXTRA_SLOW: 1000;
};
/**
 * Demo Property Data για Development & Testing
 */
export declare const DEMO_PROPERTY_DATA: {
    readonly PRICE: 150000;
    readonly SQUARE_METERS: 85;
    readonly BUILDING_YEAR_MIN: 1800;
    readonly BUILDING_YEAR_PLACEHOLDER: 2005;
    readonly MAX_BEDROOMS: 20;
    readonly MAX_BATHROOMS: 10;
    readonly MAX_PARKING_SPACES: 50;
    readonly DEFAULT_ROOMS_PLACEHOLDER: 3;
    readonly DEFAULT_BATHROOMS_PLACEHOLDER: 2;
    readonly DEFAULT_FLOOR_PLACEHOLDER: 3;
    readonly MIN_ROOMS: 1;
    readonly MIN_BATHROOMS: 1;
    readonly MIN_FLOOR: -2;
    readonly MIN_PRICE: 0;
    readonly MIN_SQUARE_METERS: 1;
    readonly FULL_TIME_HOURS_THRESHOLD: 40;
};
/**
 * Geometric Validation Limits - Single Source of Truth
 */
export declare const GEOMETRIC_LIMITS: {
    readonly MAX_AREA_SQM: 1000000;
    readonly MIN_AREA_SQM: 100;
    readonly MAX_TICK_VALUE: 100000;
    readonly AREA_CONVERSION_FACTOR: 111319.9;
    readonly MIN_POLYGON_POINTS: 3;
};
/**
 * Icon Dimensions από tokens.json - SSOT για icon positioning
 */
export declare const ICON_DIMENSIONS: {
    readonly MAP: {
        readonly ALERT: {
            readonly width: 30;
            readonly height: 48;
            readonly anchor: {
                readonly x: 15;
                readonly y: 48;
            };
            readonly shadow: {
                readonly size: 48;
            };
            readonly popup: {
                readonly offsetY: -42;
            };
            readonly tooltip: {
                readonly offsetY: -28;
            };
        };
        readonly TOOLTIP: {
            readonly anchorX: 16;
        };
        readonly POPUP: {
            readonly anchorX: 1;
        };
    };
};
/**
 * UI Component Dimensions - SSOT για component sizing
 */
export declare const UI_DIMENSIONS: {
    readonly SIDEBAR: {
        readonly AREAS_PANEL_WIDTH: 80;
        readonly MIN_WIDTH: 0;
        readonly COLLAPSED_WIDTH: 0;
    };
    readonly PANEL: {
        readonly Z_INDEX_MODAL: 10002;
    };
};
/**
 * Z-Index Layer Management για UI Stacking
 */
export declare const Z_INDEX_LAYERS: {
    readonly BASE: 1;
    readonly CONTENT: 10;
    readonly SIDEBAR: 100;
    readonly NAVIGATION: 200;
    readonly FORM_ELEMENTS: 300;
    readonly STEPS_OVERLAY: 1000;
    readonly DROPDOWN: 1500;
    readonly TOOLTIP: 2000;
    readonly MODAL_BACKDROP: 10000;
    readonly MODAL_CONTENT: 10001;
    readonly COMPLETION_OVERLAY: 10002;
    readonly NOTIFICATION: 10003;
    readonly LOADING_OVERLAY: 10004;
};
/**
 * Workflow Step Order Constants
 */
export declare const WORKFLOW_ORDER: {
    readonly AVAILABILITY_DETAILS: 12;
    readonly LAYOUT: 13;
    readonly LOCATION: 14;
    readonly PROPERTY_DETAILS: 15;
    readonly UPLOAD: 17;
    readonly COMPLETION: 100;
};
/**
 * OpenStreetMap & Geospatial Services
 */
export declare const GEOSPATIAL_SERVICES: {
    readonly OSM_TILE_SERVER: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    readonly NOMINATIM_GEOCODING: "https://nominatim.openstreetmap.org";
    readonly OVERPASS_PRIMARY: "https://overpass.kumi.systems/api/interpreter";
    readonly OVERPASS_SECONDARY: "https://overpass-api.de/api/interpreter";
    readonly OVERPASS_TERTIARY: "https://lz4.overpass-api.de/api/interpreter";
    readonly OVERPASS_FALLBACK: "https://overpass.openstreetmap.ru/api/interpreter";
};
/**
 * Standard XML Namespaces
 */
export declare const XML_NAMESPACES: {
    readonly SVG: "http://www.w3.org/2000/svg";
    readonly XLINK: "http://www.w3.org/1999/xlink";
};
/**
 * EU ESCO Data Namespaces
 */
export declare const ESCO_NAMESPACES: {
    readonly OCCUPATION: "http://data.europa.eu/esco/occupation";
    readonly SKILL: "http://data.europa.eu/esco/skill";
    readonly REGULATED_PROFESSIONS: "http://data.europa.eu/esco/regulated-professions";
};
/**
 * Device Frame Colors - Design System
 */
export declare const DEVICE_FRAME_COLORS: {
    readonly SPACE_GRAY: "var(--la-bg-dark)";
    readonly SILVER: "var(--la-color-surface-secondary)";
    readonly BLACK: "var(--la-bg-dark)";
    readonly WHITE: "var(--la-color-surface)";
    readonly GOLD: "var(--la-color-surface-tertiary)";
    readonly GOOGLE_CHARCOAL: "var(--la-bg-dark)";
    readonly GRAPHITE: "var(--la-bg-dark)";
};
/**
 * Standard SVG Icon Dimensions
 */
export declare const SVG_DIMENSIONS: {
    readonly ICON_SMALL: {
        readonly width: 16;
        readonly height: 16;
    };
    readonly ICON_MEDIUM: {
        readonly width: 24;
        readonly height: 24;
    };
    readonly ICON_LARGE: {
        readonly width: 32;
        readonly height: 32;
    };
    readonly ICON_XL: {
        readonly width: 48;
        readonly height: 48;
    };
    readonly ICON_XXL: {
        readonly width: 64;
        readonly height: 64;
    };
};
/**
 * Icon Sizes - Unified Icon Size System
 * Single Source of Truth για icon dimensions across components
 */
export declare const ICON_SIZES: {
    readonly SMALL: 24;
    readonly MEDIUM: 32;
    readonly LARGE: 48;
    readonly XL: 64;
};
/**
 * Leaflet Marker Dimensions
 */
export declare const LEAFLET_MARKER_DIMENSIONS: {
    readonly DEFAULT: {
        readonly width: 25;
        readonly height: 41;
    };
    readonly RETINA: {
        readonly width: 50;
        readonly height: 82;
    };
    readonly SHADOW: {
        readonly width: 41;
        readonly height: 41;
    };
};
/**
 * Development Server Ports - ΣΤΑΘΕΡΕΣ ΠΟΡΤΕΣ
 */
export declare const DEV_PORTS: {
    readonly LAYERA_ID: 3000;
    readonly LAYERA_GEOALERT_FALLBACK: 3002;
    readonly LAYERA_GEOALERT: 3004;
    readonly TEST_SERVER: 3008;
};
/**
 * Local Development URLs
 */
export declare const LOCAL_URLS: {
    readonly ID_SERVICE: "http://localhost:3000";
    readonly GEOALERT_SERVICE: "http://localhost:3004";
    readonly GEOALERT_FALLBACK: "http://localhost:3002";
    readonly TEST_SERVER: "http://localhost:3008";
};
/**
 * Map Configuration Defaults
 */
export declare const MAP_DEFAULTS: {
    readonly CENTER: readonly [38.246639, 21.734573];
    readonly ZOOM: 13;
    readonly MAX_ZOOM: 25;
    readonly DEFAULT_RADIUS: 250;
};
/**
 * Drawing Limits & Constraints
 */
export declare const DRAWING_LIMITS: {
    readonly MIN_RADIUS: 50;
    readonly MAX_RADIUS: 2000;
    readonly MAX_POLYGON_POINTS: 20;
};
/**
 * Earth Geospatial Constants
 */
export declare const EARTH_CONSTANTS: {
    readonly RADIUS_METERS: 6371000;
};
/**
 * EPSG Coordinate System Codes - Geospatial Standards
 * 🎯 SSOT MOVED to geo-drawing.ts to avoid duplicates - use: import { EPSG_CODES } from './geo-drawing';
 */
/**
 * Geographic Bounds - Coordinate System Constraints
 */
export declare const GEOGRAPHIC_BOUNDS: {
    readonly WGS84_GLOBAL: {
        readonly MIN_X: -180;
        readonly MAX_X: 180;
        readonly MIN_Y: -90;
        readonly MAX_Y: 90;
    };
    readonly GREECE_WGS84: {
        readonly MIN_X: 19;
        readonly MAX_X: 30;
        readonly MIN_Y: 34;
        readonly MAX_Y: 42;
    };
    readonly EGSA87: {
        readonly MIN_X: 100000;
        readonly MAX_X: 900000;
        readonly MIN_Y: 3800000;
        readonly MAX_Y: 4700000;
    };
    readonly WEB_MERCATOR: {
        readonly MIN_X: -20037508;
        readonly MAX_X: 20037508;
        readonly MIN_Y: -20037508;
        readonly MAX_Y: 20037508;
    };
};
/**
 * Mobile Device Specifications - Single Source of Truth
 */
export declare const MOBILE_DEVICE_SPECS: {
    readonly VIEWPORT_WIDTH: 430;
    readonly VIEWPORT_HEIGHT: 932;
    readonly FRAME_WIDTH_MIN: 412;
    readonly FRAME_WIDTH_MAX: 416;
    readonly FRAME_HEIGHT_MIN: 914;
    readonly FRAME_HEIGHT_MAX: 920;
    readonly EXACT_FRAME_WIDTH: 414;
    readonly EXACT_FRAME_HEIGHT: 916;
};
/**
 * Responsive Breakpoints - Single Source of Truth
 */
export declare const DEVICE_BREAKPOINTS: {
    readonly MOBILE: 768;
    readonly TABLET: 1024;
    readonly DESKTOP: 1025;
    readonly MOBILE_MAX: 480;
};
/**
 * Common Device Viewport Sizes
 */
export declare const DEVICE_VIEWPORTS: {
    readonly MOBILE_SMALL: {
        readonly width: 375;
        readonly height: 667;
    };
    readonly MOBILE_MEDIUM: {
        readonly width: 414;
        readonly height: 896;
    };
    readonly MOBILE_LARGE: {
        readonly width: 430;
        readonly height: 932;
    };
    readonly MOBILE_STANDARD: {
        readonly width: 390;
        readonly height: 844;
    };
    readonly TABLET_MINI: {
        readonly width: 768;
        readonly height: 1024;
    };
    readonly TABLET_AIR: {
        readonly width: 820;
        readonly height: 1180;
    };
    readonly TABLET_PRO: {
        readonly width: 1024;
        readonly height: 1366;
    };
};
/**
 * CSS Dimension Values
 */
export declare const CSS_DIMENSIONS: {
    readonly FULL_PERCENT: "100%";
    readonly FULL_VH: "100vh";
    readonly FULL_VW: "100vw";
    readonly FULL_VIEWPORT_HEIGHT: "100vh";
    readonly HALF_PERCENT: "50%";
};
/**
 * Fixed Pixel Dimensions
 */
export declare const FIXED_DIMENSIONS: {
    readonly DROPDOWN_MAX_HEIGHT: 400;
    readonly MIN_BUTTON_WIDTH: 200;
    readonly MIN_CARD_WIDTH: 280;
    readonly ICON_CONTAINER_SIZE: 32;
    readonly MAP_ZOOM_DEFAULT: 13;
    readonly MAP_ZOOM_MIN: 8;
    readonly MAP_ZOOM_MAX: 18;
    readonly CARD_WIDTH: "320px";
    readonly CARD_HEIGHT: "480px";
    readonly BUTTON_HEIGHT: "40px";
    readonly INPUT_HEIGHT: "40px";
};
/**
 * Brand Colors - Primary Palette
 */
export declare const BRAND_COLORS: {
    readonly PRIMARY: "var(--la-color-brand)";
    readonly SECONDARY: "var(--la-color-text-secondary)";
    readonly WHITE: "var(--la-color-surface)";
    readonly BLACK: "var(--la-bg-dark)";
};
/**
 * UI State Colors
 */
export declare const UI_COLORS: {
    readonly INFO_SUBTLE: "var(--la-color-brand-background)";
    readonly INFO_DEFAULT: "var(--la-color-primary)";
    readonly NEUTRAL_LIGHT: "var(--la-color-surface-secondary)";
    readonly NEUTRAL_DEFAULT: "var(--la-color-text-secondary)";
    readonly NEUTRAL_DARK: "var(--la-color-text-primary)";
    readonly BORDER_DEFAULT: "var(--la-border-primary)";
    readonly SURFACE_DEFAULT: "var(--la-color-surface-hover)";
    readonly TEXT_TERTIARY: "var(--la-color-text-muted)";
};
/**
 * Font Sizes (in pixels)
 */
export declare const FONT_SIZES: {
    readonly XS: 12;
    readonly SM: 14;
    readonly BASE: 16;
    readonly LG: 18;
    readonly XL: 20;
    readonly XXL: 24;
};
/**
 * Font Weights
 */
export declare const FONT_WEIGHTS: {
    readonly NORMAL: 400;
    readonly MEDIUM: 500;
    readonly SEMIBOLD: 600;
    readonly BOLD: 700;
};
/**
 * Animation Distances (in pixels)
 */
export declare const ANIMATION_DISTANCES: {
    readonly SLIDE_SMALL: 5;
    readonly SLIDE_NORMAL: 10;
    readonly SLIDE_LARGE: 20;
    readonly SLIDE_EXTRA: 50;
};
/**
 * Transition Timing Functions
 */
export declare const EASING_FUNCTIONS: {
    readonly EASE_OUT: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    readonly EASE_IN_OUT: "cubic-bezier(0.4, 0, 0.2, 1)";
    readonly BOUNCE: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
};
/**
 * HTTP Status Codes
 */
export declare const API_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly INTERNAL_SERVER_ERROR: 500;
    readonly SERVICE_UNAVAILABLE: 503;
};
/**
 * API Timeouts (in milliseconds)
 */
export declare const API_TIMEOUTS: {
    readonly FAST: 3000;
    readonly MEDIUM: 10000;
    readonly SLOW: 30000;
    readonly UPLOAD: 60000;
};
/**
 * File Size Limits - Single Source of Truth για file upload restrictions
 * Technical limits για διαφορετικές κατηγορίες αρχείων
 */
export declare const FILE_SIZE_LIMITS: {
    readonly CAD_MAX_MB: 500;
    readonly DOCUMENT_MAX_MB: 200;
    readonly IMAGE_MAX_MB: 50;
    readonly IMAGE_LARGE_MB: 100;
    readonly IMAGE_SMALL_MB: 25;
    readonly VECTOR_MAX_MB: 10;
};
/**
 * File System Constraints - Operating System & Browser Limits
 */
export declare const FILE_SYSTEM_LIMITS: {
    readonly MAX_FILENAME_LENGTH: 255;
    readonly MAX_PATH_LENGTH: 4096;
    readonly MAX_UPLOAD_COUNT: 10;
};
/**
 * Search & Results Constants - UI Limits
 * Single Source of Truth για search result limitations
 */
export declare const SEARCH_LIMITS: {
    readonly MAX_OCCUPATION_RESULTS: 10;
    readonly MAX_SEARCH_RESULTS: 50;
    readonly DEFAULT_PAGE_SIZE: 20;
    readonly TOTAL_ESCO_OCCUPATIONS: 3007;
};
/**
 * Leaflet Map Offsets - UI Positioning Constants
 * Single Source of Truth για popup and tooltip positioning
 */
export declare const LEAFLET_UI_OFFSETS: {
    readonly POPUP_OFFSET_Y: -34;
    readonly TOOLTIP_OFFSET_Y: -28;
    readonly DEFAULT_POPUP_X: 0;
    readonly DEFAULT_TOOLTIP_X: 0;
};
/**
 * Ruler & Measurement Scale Constants - Geometric Tick Values
 * Single Source of Truth για ruler tick intervals and scale measurements
 */
export declare const RULER_TICK_VALUES: {
    readonly SMALL_TICK: 50;
    readonly MEDIUM_TICK: 200;
    readonly LARGE_TICK: 500;
    readonly LARGE_TICK_2: 1000;
    readonly INTERMEDIATE_TICK_1: 2000;
    readonly INTERMEDIATE_TICK_2: 5000;
    readonly INTERMEDIATE_TICK_3: 10000;
    readonly XL_TICK: 20000;
    readonly XXL_TICK: 50000;
    readonly MAX_TICK: 100000;
};
/**
 * Image Compression Constants - Optimization Settings
 * Single Source of Truth για image compression parameters
 */
export declare const COMPRESSION_SETTINGS: {
    readonly WEBP_SAVINGS_PERCENT: 25;
    readonly WEBP_MAX_SAVINGS_PERCENT: 30;
    readonly JPEG_HIGH_QUALITY: 85;
    readonly JPEG_MEDIUM_QUALITY: 80;
    readonly WEBP_HIGH_QUALITY: 85;
    readonly WEBP_MEDIUM_QUALITY: 80;
    readonly PNG_HIGH_QUALITY: 90;
    readonly PNG_LOSSLESS_QUALITY: 100;
    readonly LARGE_FILE_QUALITY: 70;
    readonly MEDIUM_FILE_QUALITY: 75;
    readonly MAX_LARGE_WIDTH: 2000;
    readonly MAX_LARGE_HEIGHT: 2000;
    readonly MAX_MEDIUM_WIDTH: 2500;
    readonly MAX_MEDIUM_HEIGHT: 2500;
    readonly LARGE_DIMENSION_THRESHOLD: 3000;
    readonly RECOMMENDED_MAX_WIDTH: 2500;
    readonly RECOMMENDED_MAX_HEIGHT: 2500;
    readonly MIN_QUALITY: 0;
    readonly MAX_QUALITY: 100;
};
/**
 * 🏠 PROPERTY VALIDATION CONSTANTS
 * Validation constraints για property data input
 */
export declare const PROPERTY_VALIDATION: {
    readonly MIN_BUILDING_YEAR: 1800;
    readonly MAX_BUILDING_YEAR: number;
    readonly MIN_PROPERTY_AREA: 10;
    readonly MAX_PROPERTY_AREA: 100000;
    readonly MIN_PROPERTY_VALUE: 1000;
    readonly MAX_PROPERTY_VALUE: 50000000;
};
/**
 * 🗺️ LEAFLET MAP ICON CONSTANTS
 * Icon sizing constraints για Leaflet map markers - LEAFLET API requirements
 */
export declare const LEAFLET_ICON_SIZES: {
    readonly SMALL: 16;
    readonly MEDIUM: 24;
    readonly STANDARD: 32;
    readonly LARGE: 48;
    readonly XL: 64;
    readonly SHADOW_ANCHOR_X: 12;
    readonly SHADOW_ANCHOR_Y: 41;
    readonly POPUP_ANCHOR_Y: -34;
};
/**
 * 🎨 UI WIDTH CONSTANTS
 * Standard width percentages για UI components
 */
export declare const UI_WIDTH_PERCENTAGES: {
    readonly SMALL: 20;
    readonly MEDIUM: 40;
    readonly LARGE: 60;
    readonly XL: 80;
    readonly FULL: 100;
};
/**
 * 📍 ADDRESS PARSING CONSTANTS
 * Priority values and sorting constants για address parsing
 */
export declare const ADDRESS_PARSING: {
    readonly DEFAULT_PRIORITY: 999;
    readonly HIGH_PRIORITY: 1;
    readonly MEDIUM_PRIORITY: 5;
    readonly LOW_PRIORITY: 10;
    readonly MAX_COMPONENTS: 20;
    readonly MIN_COMPONENT_LENGTH: 2;
    readonly SEPARATOR_THRESHOLD: 3;
};
/**
 * ⏱️ UI ANIMATION TIMING CONSTANTS
 * Standardized timing values για UI animations and delays
 */
export declare const UI_TIMING: {
    readonly DEBOUNCE_SHORT: 300;
    readonly DEBOUNCE_MEDIUM: 500;
    readonly DEBOUNCE_LONG: 1000;
    readonly TRANSITION_FAST: 150;
    readonly TRANSITION_NORMAL: 250;
    readonly TRANSITION_SLOW: 400;
    readonly LOADING_SPINNER_MIN: 500;
    readonly LOADING_TIMEOUT: 5000;
};
/**
 * 📚 CRYPTOGRAPHIC CONSTANTS
 * Standard values για cryptographic operations
 */
export declare const CRYPTOGRAPHIC_CONSTANTS: {
    readonly BIT_32: 32;
    readonly BIT_16: 16;
    readonly BIT_8: 8;
    readonly HASH_MASK_32BIT: 2147483647;
    readonly HASH_MULTIPLIER: 31;
    readonly TOTP_WINDOW: 30;
    readonly TOTP_DIGITS: 6;
    readonly TOTP_COUNTER_SIZE: 8;
};
/**
 * 📐 Z-INDEX LAYERING CONSTANTS
 * Standard z-index values για UI layering
 */
export declare const UI_Z_INDEX_LAYERS: {
    readonly BACKGROUND: 0;
    readonly BASE: 10;
    readonly CONTENT: 50;
    readonly OVERLAY: 100;
    readonly DROPDOWN: 200;
    readonly STICKY: 300;
    readonly MODAL_BACKDROP: 1000;
    readonly MODAL_CONTENT: 1010;
    readonly TOAST: 2000;
    readonly TOOLTIP: 5000;
    readonly DEBUG: 9999;
};
/**
 * 🎨 SEMANTIC COLOR RGB VALUES
 * Standard RGB color values για semantic UI states - SINGLE SOURCE OF TRUTH
 */
export declare const SEMANTIC_RGB_COLORS: {
    readonly SUCCESS_PRIMARY: "16, 185, 129";
    readonly SUCCESS_LIGHT: "52, 211, 153";
    readonly SUCCESS_DARK: "5, 150, 105";
    readonly WARNING_PRIMARY: "245, 158, 11";
    readonly WARNING_LIGHT: "251, 191, 36";
    readonly WARNING_DARK: "217, 119, 6";
    readonly ERROR_PRIMARY: "239, 68, 68";
    readonly ERROR_LIGHT: "248, 113, 113";
    readonly ERROR_DARK: "220, 38, 38";
    readonly INFO_PRIMARY: "99, 102, 241";
    readonly INFO_LIGHT: "129, 140, 248";
    readonly INFO_DARK: "79, 70, 229";
    readonly NEUTRAL_LIGHT: "243, 244, 246";
    readonly NEUTRAL_MEDIUM: "156, 163, 175";
    readonly NEUTRAL_DARK: "55, 65, 81";
};
/**
 * Sample Account Data - Used in i18n templates and demo environments
 * SINGLE SOURCE OF TRUTH για δεδομένα παραδείγματος
 */
export declare const DEMO_ACCOUNT_DATA: {
    readonly ACCOUNT_CREATION: {
        readonly YEAR: 2025;
        readonly MONTH: 10;
        readonly DAY: 17;
        readonly HOUR: 12;
        readonly MINUTE: 4;
        readonly SECOND: 9;
        readonly PERIOD: "μ.μ.";
    };
    readonly LAST_SIGNIN: {
        readonly YEAR: 2025;
        readonly MONTH: 11;
        readonly DAY: 5;
        readonly HOUR: 12;
        readonly MINUTE: 41;
        readonly SECOND: 2;
        readonly PERIOD: "μ.μ.";
    };
    readonly USER_INFO: {
        readonly EMAIL: "georgios.pagonis@gmail.com";
        readonly DISPLAY_NAME: "Georgios Pagonis";
        readonly USER_ID: "Z55xqJg38uRapVrvUlgwkf1";
        readonly ROLE: "Ιδιωτικός";
        readonly EMAIL_VERIFIED: "Επαληθευμένο";
        readonly MFA_ENABLED: "Απενεργοποιημένο";
    };
};
/**
 * Legacy Exports - Για backwards compatibility
 */
export declare const CONFIG: {
    readonly api: {
        readonly baseUrl: string;
        readonly timeout: 10000;
        readonly retries: 3;
    };
    readonly app: {
        readonly name: "Layera";
        readonly version: string;
    };
    readonly map: {
        readonly defaultZoom: 13;
        readonly maxZoom: 18;
        readonly minZoom: 8;
        readonly fabBottomOffset: 80;
        readonly fabHalfWidth: 28;
        readonly defaultCenter: readonly [37.9755, 23.7348];
    };
    readonly geoDrawing: {
        readonly snapTolerance: 10;
        readonly minSnapZoom: 16;
        readonly debounceMs: 500;
        readonly measurementPrecision: 2;
        readonly defaultStrokeColor: "var(--la-color-primary)";
        readonly defaultFillColor: "var(--la-color-brand-light)";
        readonly defaultStrokeWidth: 2;
    };
    readonly osm: {
        readonly overpassApiUrl: "https://overpass-api.de/api/interpreter";
        readonly requestTimeout: 10000;
        readonly maxCacheEntries: 100;
        readonly cacheTtl: 3600000;
    };
    readonly search: {
        readonly maxResults: 100;
        readonly debounceMs: 300;
    };
    readonly debug: {
        readonly cursorThrottleMs: 120;
        readonly maxElementStackSize: 6;
        readonly maxHTMLSliceLength: 80;
        readonly maxLiveStackSize: 5;
    };
};
