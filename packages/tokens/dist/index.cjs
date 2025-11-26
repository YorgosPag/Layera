"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  COLOR_VARIABLES: () => COLOR_VARIABLES,
  COLOR_VARIANTS: () => COLOR_VARIANTS,
  ColorComponentSystem: () => ColorComponentSystem,
  LAYERA_BUTTON_LIVE_VARS: () => LAYERA_BUTTON_LIVE_VARS,
  LAYERA_BUTTON_TOKENS: () => LAYERA_BUTTON_TOKENS,
  LAYERA_CARD_LIVE_VARS: () => LAYERA_CARD_LIVE_VARS,
  LAYERA_CARD_TOKENS: () => LAYERA_CARD_TOKENS,
  LAYERA_COLOR_APPLICATION: () => LAYERA_COLOR_APPLICATION,
  LAYERA_CORE_BORDERS: () => LAYERA_CORE_BORDERS,
  LAYERA_CORE_COLORS: () => LAYERA_CORE_COLORS,
  LAYERA_CORE_DIMENSIONS: () => LAYERA_CORE_DIMENSIONS,
  LAYERA_CORE_SPACING: () => LAYERA_CORE_SPACING,
  LAYERA_CORE_TYPOGRAPHY: () => LAYERA_CORE_TYPOGRAPHY,
  LAYERA_DYNAMIC_TOKENS: () => LAYERA_DYNAMIC_TOKENS,
  LAYERA_HEADER_LIVE_VARS: () => LAYERA_HEADER_LIVE_VARS,
  LAYERA_HEADER_TOKENS: () => LAYERA_HEADER_TOKENS,
  LAYERA_LAYOUT_NAVIGATION_CLASSES: () => LAYERA_LAYOUT_NAVIGATION_CLASSES,
  LAYERA_LAYOUT_OVERLAY_CLASSES: () => LAYERA_LAYOUT_OVERLAY_CLASSES,
  LAYERA_LAYOUT_UTILITY_CLASSES: () => LAYERA_LAYOUT_UTILITY_CLASSES,
  LAYERA_LIVE_BORDER_VARS: () => LAYERA_LIVE_BORDER_VARS,
  LAYERA_LIVE_COLOR_VARS: () => LAYERA_LIVE_COLOR_VARS,
  LAYERA_LIVE_DIMENSION_VARS: () => LAYERA_LIVE_DIMENSION_VARS,
  LAYERA_LIVE_SIDEBAR_VARS: () => LAYERA_LIVE_SIDEBAR_VARS,
  LAYERA_LIVE_SPACING_VARS: () => LAYERA_LIVE_SPACING_VARS,
  LAYERA_LIVE_TYPOGRAPHY_VARS: () => LAYERA_LIVE_TYPOGRAPHY_VARS,
  LAYERA_LIVE_VARIABLES: () => LAYERA_LIVE_VARIABLES,
  LAYERA_MODAL_LIVE_VARS: () => LAYERA_MODAL_LIVE_VARS,
  LAYERA_MODAL_TOKENS: () => LAYERA_MODAL_TOKENS,
  LAYERA_PRESET_THEMES: () => LAYERA_PRESET_THEMES,
  LAYERA_RADIUS_PRESETS: () => LAYERA_RADIUS_PRESETS,
  LAYERA_SIDEBAR_COLORS: () => LAYERA_SIDEBAR_COLORS,
  LAYERA_SIDEBAR_DIMENSIONS: () => LAYERA_SIDEBAR_DIMENSIONS,
  LAYERA_SIDEBAR_TYPOGRAPHY: () => LAYERA_SIDEBAR_TYPOGRAPHY,
  LAYERA_TABLE_LIVE_VARS: () => LAYERA_TABLE_LIVE_VARS,
  LAYERA_TABLE_TOKENS: () => LAYERA_TABLE_TOKENS,
  LAYERA_TARGET_SELECTORS: () => LAYERA_TARGET_SELECTORS,
  LAYERA_TOKENS_BUILD_DATE: () => LAYERA_TOKENS_BUILD_DATE,
  LAYERA_TOKENS_SOURCE: () => LAYERA_TOKENS_SOURCE,
  LAYERA_TOKENS_VERSION: () => LAYERA_TOKENS_VERSION,
  LEGACY_COLOR_MAPPING: () => LEGACY_COLOR_MAPPING,
  LEGACY_COMPONENT_MAPPING: () => LEGACY_COMPONENT_MAPPING,
  LEGACY_CSS_CLASSES: () => LEGACY_CSS_CLASSES,
  applyAllLiveVariables: () => applyAllLiveVariables,
  applyColorToElement: () => applyColorToElement,
  applyLegacyTokenMappings: () => applyLegacyTokenMappings,
  applyPresetThemeToDOM: () => applyPresetThemeToDOM,
  applyTheme: () => applyTheme,
  ensureLegacyCSSCompatibility: () => ensureLegacyCSSCompatibility,
  exportCSS: () => exportCSS,
  exportThemeAsJSON: () => exportThemeAsJSON,
  generateMigrationReport: () => generateMigrationReport,
  getAllLiveVariables: () => getAllLiveVariables,
  getBorderRadiusPreset: () => getBorderRadiusPreset,
  getButtonStateCSS: () => getButtonStateCSS,
  getButtonVariantCSS: () => getButtonVariantCSS,
  getButtonVariants: () => getButtonVariants,
  getCardShadowCSS: () => getCardShadowCSS,
  getCardStateCSS: () => getCardStateCSS,
  getCardVariantCSS: () => getCardVariantCSS,
  getCardVariants: () => getCardVariants,
  getColorTypes: () => getColorTypes,
  getCurrentPresetTheme: () => getCurrentPresetTheme,
  getCurrentTargetComponent: () => getCurrentTargetComponent,
  getCurrentThemeState: () => getCurrentThemeState,
  getDefaultDimension: () => getDefaultDimension,
  getFullButtonCSS: () => getFullButtonCSS,
  getFullCardCSS: () => getFullCardCSS,
  getLayeraColor: () => getLayeraColor,
  getLayeraFontFamily: () => getLayeraFontFamily,
  getLayeraFontWeight: () => getLayeraFontWeight,
  getLayeraSpacing: () => getLayeraSpacing,
  getLiveBorderRadiusVar: () => getLiveBorderRadiusVar,
  getLiveColorVar: () => getLiveColorVar,
  getLiveDimensionVar: () => getLiveDimensionVar,
  getLiveSidebarVar: () => getLiveSidebarVar,
  getLiveSpacingVar: () => getLiveSpacingVar,
  getLiveTypographyVar: () => getLiveTypographyVar,
  getLiveVariable: () => getLiveVariable,
  getModalOverlayCSS: () => getModalOverlayCSS,
  getModalVariantCSS: () => getModalVariantCSS,
  getModalVariants: () => getModalVariants,
  getPresetTheme: () => getPresetTheme,
  getPresetThemeNames: () => getPresetThemeNames,
  getSidebarColors: () => getSidebarColors,
  getSidebarPositioning: () => getSidebarPositioning,
  getSidebarWidth: () => getSidebarWidth,
  getTargetSelectors: () => getTargetSelectors,
  getThemeAsLiveVariables: () => getThemeAsLiveVariables,
  isValidPresetTheme: () => isValidPresetTheme,
  loadThemeState: () => loadThemeState,
  migrateLegacyTokenName: () => migrateLegacyTokenName,
  resetLiveVariables: () => resetLiveVariables,
  resetToDefaults: () => resetToDefaults,
  saveThemeState: () => saveThemeState,
  setLiveVariable: () => setLiveVariable,
  setTargetComponent: () => setTargetComponent,
  updateAdvancedColor: () => updateAdvancedColor,
  updateAdvancedLayout: () => updateAdvancedLayout,
  updateLiveColor: () => updateLiveColor,
  updateLiveLayout: () => updateLiveLayout,
  validateBorderRadius: () => validateBorderRadius,
  validateBorderWidth: () => validateBorderWidth,
  validateButtonHeight: () => validateButtonHeight,
  validateCardHeight: () => validateCardHeight,
  validateFontSize: () => validateFontSize,
  validateLineHeight: () => validateLineHeight,
  validateModalWidth: () => validateModalWidth,
  validateSpacingValue: () => validateSpacingValue
});
module.exports = __toCommonJS(src_exports);

// src/core/colors.ts
var LAYERA_CORE_COLORS = {
  // Primary color system
  primary: {
    default: "#4A90E2",
    light: "#E3F2FD",
    dark: "#1565C0",
    contrast: "#FFFFFF"
  },
  // Secondary color system
  secondary: {
    default: "#9013FE",
    light: "#F3E5F5",
    dark: "#4A148C",
    contrast: "#FFFFFF"
  },
  // Success color system
  success: {
    default: "#4CAF50",
    light: "#E8F5E8",
    dark: "#2E7D32",
    contrast: "#FFFFFF"
  },
  // Warning color system
  warning: {
    default: "#FF9800",
    light: "#FFF3E0",
    dark: "#E65100",
    contrast: "#000000"
  },
  // Danger color system
  danger: {
    default: "#F44336",
    light: "#FFEBEE",
    dark: "#C62828",
    contrast: "#FFFFFF"
  },
  // Info color system
  info: {
    default: "#2196F3",
    light: "#E1F5FE",
    dark: "#0D47A1",
    contrast: "#FFFFFF"
  }
};
var LAYERA_LIVE_COLOR_VARS = {
  // Live color variables που χρησιμοποιεί το updateAdvancedColor()
  liveColors: {
    "--live-primary-color": "var(--layera-color-primary)",
    "--live-secondary-color": "var(--layera-color-secondary)",
    "--live-success-color": "var(--layera-color-success)",
    "--live-warning-color": "var(--layera-color-warning)",
    "--live-danger-color": "var(--layera-color-danger)",
    "--live-info-color": "var(--layera-color-info)"
  },
  // Base color tokens
  baseColors: {
    "--layera-color-primary": LAYERA_CORE_COLORS.primary.default,
    "--layera-color-secondary": LAYERA_CORE_COLORS.secondary.default,
    "--layera-color-success": LAYERA_CORE_COLORS.success.default,
    "--layera-color-warning": LAYERA_CORE_COLORS.warning.default,
    "--layera-color-danger": LAYERA_CORE_COLORS.danger.default,
    "--layera-color-info": LAYERA_CORE_COLORS.info.default
  }
};
function getLayeraColor(type, variant = "default") {
  return LAYERA_CORE_COLORS[type][variant];
}
function getLiveColorVar(type) {
  return `--live-${type}-color`;
}
function getColorTypes() {
  return ["primary", "secondary", "success", "warning", "danger", "info"];
}

// src/core/spacing.ts
var LAYERA_CORE_SPACING = {
  // Base spacing scale (8-point grid)
  scale: {
    "0": "0px",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    // Default component gap
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px"
    // Max component gap
  },
  // Component-specific spacing από HTML mockup
  components: {
    // Component gap control (data-control="component-gap")
    componentGap: {
      min: 4,
      max: 48,
      default: 16,
      unit: "px"
    },
    // General padding control (data-control="padding")
    generalPadding: {
      min: 4,
      max: 32,
      default: 16,
      unit: "px"
    },
    // Button padding control (data-control="button-padding")
    buttonPadding: {
      min: 8,
      max: 32,
      default: 16,
      unit: "px"
    }
  }
};
var LAYERA_LIVE_SPACING_VARS = {
  // Live spacing variables που χρησιμοποιεί το updateAdvancedLayout()
  liveSpacing: {
    "--live-component-gap": `${LAYERA_CORE_SPACING.components.componentGap.default}px`,
    "--live-padding": `${LAYERA_CORE_SPACING.components.generalPadding.default}px`,
    "--live-button-padding": `${LAYERA_CORE_SPACING.components.buttonPadding.default}px`
  },
  // Base spacing tokens
  baseSpacing: {
    "--layera-space-0": LAYERA_CORE_SPACING.scale["0"],
    "--layera-space-1": LAYERA_CORE_SPACING.scale["1"],
    "--layera-space-2": LAYERA_CORE_SPACING.scale["2"],
    "--layera-space-3": LAYERA_CORE_SPACING.scale["3"],
    "--layera-space-4": LAYERA_CORE_SPACING.scale["4"],
    "--layera-space-5": LAYERA_CORE_SPACING.scale["5"],
    "--layera-space-6": LAYERA_CORE_SPACING.scale["6"],
    "--layera-space-8": LAYERA_CORE_SPACING.scale["8"],
    "--layera-space-10": LAYERA_CORE_SPACING.scale["10"],
    "--layera-space-12": LAYERA_CORE_SPACING.scale["12"]
  }
};
function getLayeraSpacing(scale) {
  return LAYERA_CORE_SPACING.scale[scale];
}
function getLiveSpacingVar(type) {
  const varMap = {
    componentGap: "--live-component-gap",
    generalPadding: "--live-padding",
    buttonPadding: "--live-button-padding"
  };
  return varMap[type];
}
function validateSpacingValue(type, value) {
  const constraints = LAYERA_CORE_SPACING.components[type];
  return Math.max(constraints.min, Math.min(constraints.max, value));
}

// src/core/typography.ts
var LAYERA_CORE_TYPOGRAPHY = {
  // Font families από HTML mockup select options
  fontFamily: {
    arial: "Arial, sans-serif",
    segoeui: "'Segoe UI', sans-serif",
    roboto: "'Roboto', sans-serif",
    inter: "'Inter', sans-serif",
    system: "system-ui, -apple-system, sans-serif"
  },
  // Font sizes με controls από HTML mockup
  fontSize: {
    // General font size (data-control="font-size")
    general: {
      min: 12,
      max: 24,
      default: 16,
      unit: "px"
    },
    // Header size (data-control="header-size")
    headers: {
      min: 18,
      max: 36,
      default: 24,
      unit: "px"
    },
    // Button font size (data-control="button-font-size")
    buttons: {
      min: 10,
      max: 20,
      default: 14,
      unit: "px"
    }
  },
  // Font weights από HTML mockup select options
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  },
  // Line height control (data-control="line-height")
  lineHeight: {
    min: 1,
    max: 2,
    default: 1.5,
    step: 0.1
  }
};
var LAYERA_LIVE_TYPOGRAPHY_VARS = {
  // Live typography variables που χρησιμοποιούν τα updateFont* functions
  liveTypography: {
    "--live-font-family": LAYERA_CORE_TYPOGRAPHY.fontFamily.system,
    "--live-font-size": `${LAYERA_CORE_TYPOGRAPHY.fontSize.general.default}px`,
    "--live-header-size": `${LAYERA_CORE_TYPOGRAPHY.fontSize.headers.default}px`,
    "--live-button-font-size": `${LAYERA_CORE_TYPOGRAPHY.fontSize.buttons.default}px`,
    "--live-font-weight": LAYERA_CORE_TYPOGRAPHY.fontWeight.normal,
    "--live-line-height": LAYERA_CORE_TYPOGRAPHY.lineHeight.default.toString(),
    "--live-text-color": "#2c3e50"
    // Default από HTML mockup color picker
  },
  // Global typography variables που χρησιμοποιεί το updateFontSize()
  globalTypography: {
    "--global-font-size": `${LAYERA_CORE_TYPOGRAPHY.fontSize.general.default}px`,
    "--global-font-weight": LAYERA_CORE_TYPOGRAPHY.fontWeight.normal
  },
  // Base typography tokens
  baseTypography: {
    "--layera-font-family-sans": LAYERA_CORE_TYPOGRAPHY.fontFamily.system,
    "--layera-font-family-mono": "Menlo, Monaco, monospace",
    "--layera-font-size-xs": "12px",
    "--layera-font-size-sm": "14px",
    "--layera-font-size-base": "16px",
    "--layera-font-size-lg": "18px",
    "--layera-font-size-xl": "20px",
    "--layera-font-size-2xl": "24px",
    "--layera-font-size-3xl": "30px",
    "--layera-line-height-tight": "1.25",
    "--layera-line-height-normal": "1.5",
    "--layera-line-height-loose": "1.75"
  }
};
function getLayeraFontFamily(family) {
  return LAYERA_CORE_TYPOGRAPHY.fontFamily[family];
}
function getLayeraFontWeight(weight) {
  return LAYERA_CORE_TYPOGRAPHY.fontWeight[weight];
}
function getLiveTypographyVar(property) {
  return `--live-${property}`;
}
function validateFontSize(type, value) {
  const constraints = LAYERA_CORE_TYPOGRAPHY.fontSize[type];
  return Math.max(constraints.min, Math.min(constraints.max, value));
}
function validateLineHeight(value) {
  const constraints = LAYERA_CORE_TYPOGRAPHY.lineHeight;
  return Math.max(constraints.min, Math.min(constraints.max, value));
}

// src/core/borders.ts
var LAYERA_CORE_BORDERS = {
  // Component-specific border radius controls
  radius: {
    // Cards border radius (data-control="cards-border-radius")
    cards: {
      min: 0,
      max: 32,
      default: 8,
      unit: "px"
    },
    // Buttons border radius (data-control="buttons-border-radius")
    buttons: {
      min: 0,
      max: 32,
      default: 6,
      unit: "px"
    },
    // Modals border radius (data-control="modals-border-radius")
    modals: {
      min: 0,
      max: 32,
      default: 12,
      unit: "px"
    },
    // Tables border radius (data-control="tables-border-radius")
    tables: {
      min: 0,
      max: 32,
      default: 4,
      unit: "px"
    },
    // Headers border radius (data-control="header-border-radius")
    headers: {
      min: 0,
      max: 32,
      default: 0,
      unit: "px"
    },
    // Global border radius (data-control="border-radius")
    global: {
      min: 0,
      max: 24,
      default: 8,
      unit: "px"
    }
  },
  // Border width control (data-control="border-width")
  width: {
    min: 1,
    max: 8,
    default: 2,
    unit: "px"
  }
};
var LAYERA_RADIUS_PRESETS = {
  sharp: {
    cards: 0,
    buttons: 0,
    modals: 0,
    tables: 0,
    headers: 0
  },
  soft: {
    cards: 6,
    buttons: 4,
    modals: 8,
    tables: 3,
    headers: 0
  },
  round: {
    cards: 12,
    buttons: 8,
    modals: 16,
    tables: 6,
    headers: 4
  },
  pill: {
    cards: 24,
    buttons: 20,
    modals: 28,
    tables: 12,
    headers: 8
  }
};
var LAYERA_LIVE_BORDER_VARS = {
  // Live border radius variables για component-specific control
  liveRadius: {
    "--live-cards-border-radius": `${LAYERA_CORE_BORDERS.radius.cards.default}px`,
    "--live-buttons-border-radius": `${LAYERA_CORE_BORDERS.radius.buttons.default}px`,
    "--live-modals-border-radius": `${LAYERA_CORE_BORDERS.radius.modals.default}px`,
    "--live-tables-border-radius": `${LAYERA_CORE_BORDERS.radius.tables.default}px`,
    "--live-headers-border-radius": `${LAYERA_CORE_BORDERS.radius.headers.default}px`,
    "--live-border-radius": `${LAYERA_CORE_BORDERS.radius.global.default}px`
  },
  // Live border width variables
  liveWidth: {
    "--live-border-width": `${LAYERA_CORE_BORDERS.width.default}px`
  },
  // Base border tokens
  baseBorders: {
    "--layera-border-radius-none": "0px",
    "--layera-border-radius-sm": "4px",
    "--layera-border-radius-md": "8px",
    "--layera-border-radius-lg": "12px",
    "--layera-border-radius-xl": "16px",
    "--layera-border-radius-2xl": "24px",
    "--layera-border-radius-full": "9999px",
    "--layera-border-width-thin": "1px",
    "--layera-border-width-normal": "2px",
    "--layera-border-width-thick": "4px"
  }
};
function getLiveBorderRadiusVar(component) {
  if (component === "global") {
    return "--live-border-radius";
  }
  return `--live-${component}-border-radius`;
}
function validateBorderRadius(component, value) {
  const constraints = LAYERA_CORE_BORDERS.radius[component];
  return Math.max(constraints.min, Math.min(constraints.max, value));
}
function getBorderRadiusPreset(preset) {
  const presetValues = LAYERA_RADIUS_PRESETS[preset];
  return {
    ...presetValues,
    global: presetValues.cards
    // Global follows cards
  };
}
function validateBorderWidth(value) {
  const constraints = LAYERA_CORE_BORDERS.width;
  return Math.max(constraints.min, Math.min(constraints.max, value));
}

// src/core/dimensions.ts
var LAYERA_CORE_DIMENSIONS = {
  // Button dimensions (data-control="button-height")
  buttons: {
    height: {
      min: 24,
      max: 56,
      default: 36,
      unit: "px"
    }
    // Button padding handled in spacing.ts
  },
  // Card dimensions (data-control="card-height")
  cards: {
    height: {
      min: 80,
      max: 200,
      default: 120,
      unit: "px"
    },
    // Card width usually responsive or fixed by grid
    minWidth: 200,
    maxWidth: 400
  },
  // Modal dimensions (data-control="modal-width")
  modals: {
    width: {
      min: 300,
      max: 600,
      default: 400,
      unit: "px"
    },
    // Modal height usually auto-sized by content
    minHeight: 200,
    maxHeight: "80vh"
  },
  // Table dimensions (inferred from mockup)
  tables: {
    minHeight: 300,
    maxHeight: "70vh",
    cellPadding: 12
  },
  // Header dimensions (inferred from mockup)
  headers: {
    height: 60,
    padding: 16
  }
};
var LAYERA_LIVE_DIMENSION_VARS = {
  // Live dimension variables που χρησιμοποιούν τα HTML mockup controls
  liveDimensions: {
    "--live-button-height": `${LAYERA_CORE_DIMENSIONS.buttons.height.default}px`,
    "--live-card-height": `${LAYERA_CORE_DIMENSIONS.cards.height.default}px`,
    "--live-modal-width": `${LAYERA_CORE_DIMENSIONS.modals.width.default}px`
  },
  // Base dimension tokens
  baseDimensions: {
    "--layera-button-height-sm": "32px",
    "--layera-button-height-md": "40px",
    "--layera-button-height-lg": "48px",
    "--layera-card-min-height": `${LAYERA_CORE_DIMENSIONS.cards.height.min}px`,
    "--layera-card-max-height": `${LAYERA_CORE_DIMENSIONS.cards.height.max}px`,
    "--layera-modal-min-width": `${LAYERA_CORE_DIMENSIONS.modals.width.min}px`,
    "--layera-modal-max-width": `${LAYERA_CORE_DIMENSIONS.modals.width.max}px`,
    "--layera-header-height": `${LAYERA_CORE_DIMENSIONS.headers.height}px`,
    "--layera-table-cell-padding": `${LAYERA_CORE_DIMENSIONS.tables.cellPadding}px`
  }
};
function getLiveDimensionVar(component, property) {
  return `--live-${component}-${property}`;
}
function validateButtonHeight(value) {
  const constraints = LAYERA_CORE_DIMENSIONS.buttons.height;
  return Math.max(constraints.min, Math.min(constraints.max, value));
}
function validateCardHeight(value) {
  const constraints = LAYERA_CORE_DIMENSIONS.cards.height;
  return Math.max(constraints.min, Math.min(constraints.max, value));
}
function validateModalWidth(value) {
  const constraints = LAYERA_CORE_DIMENSIONS.modals.width;
  return Math.max(constraints.min, Math.min(constraints.max, value));
}
function getDefaultDimension(component, property) {
  switch (component) {
    case "buttons":
      return property === "height" ? LAYERA_CORE_DIMENSIONS.buttons.height.default : 0;
    case "cards":
      return property === "height" ? LAYERA_CORE_DIMENSIONS.cards.height.default : 0;
    case "modals":
      return property === "width" ? LAYERA_CORE_DIMENSIONS.modals.width.default : 0;
    default:
      return 0;
  }
}

// src/component/buttons.ts
var LAYERA_BUTTON_TOKENS = {
  // Button variants που αντιστοιχούν στα HTML mockup classes (.primary-btn, .secondary-btn, etc.)
  variants: {
    primary: {
      background: "var(--live-primary-color)",
      color: "#FFFFFF",
      borderColor: "var(--live-primary-color)",
      hoverBackground: "var(--live-primary-color)",
      hoverOpacity: 0.9
    },
    secondary: {
      background: "var(--live-secondary-color)",
      color: "#FFFFFF",
      borderColor: "var(--live-secondary-color)",
      hoverBackground: "var(--live-secondary-color)",
      hoverOpacity: 0.9
    },
    success: {
      background: "var(--live-success-color)",
      color: "#FFFFFF",
      borderColor: "var(--live-success-color)",
      hoverBackground: "var(--live-success-color)",
      hoverOpacity: 0.9
    },
    warning: {
      background: "var(--live-warning-color)",
      color: "#000000",
      borderColor: "var(--live-warning-color)",
      hoverBackground: "var(--live-warning-color)",
      hoverOpacity: 0.9
    },
    danger: {
      background: "var(--live-danger-color)",
      color: "#FFFFFF",
      borderColor: "var(--live-danger-color)",
      hoverBackground: "var(--live-danger-color)",
      hoverOpacity: 0.9
    },
    info: {
      background: "var(--live-info-color)",
      color: "#FFFFFF",
      borderColor: "var(--live-info-color)",
      hoverBackground: "var(--live-info-color)",
      hoverOpacity: 0.9
    }
  },
  // Button sizing που χρησιμοποιούν τα HTML mockup controls
  sizing: {
    height: "var(--live-button-height)",
    // data-control="button-height"
    padding: "var(--live-button-padding)",
    // data-control="button-padding"
    fontSize: "var(--live-button-font-size)",
    // data-control="button-font-size"
    borderRadius: "var(--live-buttons-border-radius)"
    // data-control="buttons-border-radius"
  },
  // Button state styles
  states: {
    default: {
      opacity: 1,
      transform: "scale(1)",
      transition: "all 0.2s ease"
    },
    hover: {
      opacity: 0.9,
      transform: "scale(1.02)",
      transition: "all 0.2s ease"
    },
    active: {
      opacity: 0.8,
      transform: "scale(0.98)",
      transition: "all 0.1s ease"
    },
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      transform: "scale(1)"
    }
  }
};
var LAYERA_BUTTON_LIVE_VARS = {
  // Button-specific live variables που συνδυάζουν όλα τα controls
  "--layera-button-background-primary": "var(--live-primary-color)",
  "--layera-button-background-secondary": "var(--live-secondary-color)",
  "--layera-button-background-success": "var(--live-success-color)",
  "--layera-button-background-warning": "var(--live-warning-color)",
  "--layera-button-background-danger": "var(--live-danger-color)",
  "--layera-button-background-info": "var(--live-info-color)",
  "--layera-button-height": "var(--live-button-height)",
  "--layera-button-padding": "var(--live-button-padding)",
  "--layera-button-font-size": "var(--live-button-font-size)",
  "--layera-button-border-radius": "var(--live-buttons-border-radius)",
  "--layera-button-border-width": "var(--live-border-width)"
};
function getButtonVariantCSS(variant) {
  const variantTokens = LAYERA_BUTTON_TOKENS.variants[variant];
  const sizing = LAYERA_BUTTON_TOKENS.sizing;
  return {
    backgroundColor: variantTokens.background,
    color: variantTokens.color,
    borderColor: variantTokens.borderColor,
    height: sizing.height,
    padding: `0 ${sizing.padding}`,
    fontSize: sizing.fontSize,
    borderRadius: sizing.borderRadius,
    borderWidth: "var(--live-border-width)",
    borderStyle: "solid",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    transition: "all 0.2s ease"
  };
}
function getButtonStateCSS(state) {
  return LAYERA_BUTTON_TOKENS.states[state];
}
function getFullButtonCSS(variant, state = "default") {
  return {
    ...getButtonVariantCSS(variant),
    ...getButtonStateCSS(state)
  };
}
function getButtonVariants() {
  return Object.keys(LAYERA_BUTTON_TOKENS.variants);
}

// src/component/cards.ts
var LAYERA_CARD_TOKENS = {
  // Card variants που αντιστοιχούν στα HTML mockup classes (.card-primary, .card-secondary, etc.)
  variants: {
    primary: {
      backgroundColor: "#E3F2FD",
      // Light blue background
      borderColor: "var(--live-primary-color)",
      textColor: "#1565C0"
    },
    secondary: {
      backgroundColor: "#F3E5F5",
      // Light purple background
      borderColor: "var(--live-secondary-color)",
      textColor: "#4A148C"
    },
    success: {
      backgroundColor: "#E8F5E8",
      // Light green background
      borderColor: "var(--live-success-color)",
      textColor: "#2E7D32"
    },
    warning: {
      backgroundColor: "#FFF3E0",
      // Light orange background
      borderColor: "var(--live-warning-color)",
      textColor: "#E65100"
    },
    danger: {
      backgroundColor: "#FFEBEE",
      // Light red background
      borderColor: "var(--live-danger-color)",
      textColor: "#C62828"
    },
    info: {
      backgroundColor: "#E1F5FE",
      // Light cyan background
      borderColor: "var(--live-info-color)",
      textColor: "#0D47A1"
    }
  },
  // Card sizing που χρησιμοποιούν τα HTML mockup controls
  sizing: {
    height: "var(--live-card-height)",
    // data-control="card-height"
    borderRadius: "var(--live-cards-border-radius)",
    // data-control="cards-border-radius"
    borderWidth: "var(--live-border-width)",
    // data-control="border-width"
    padding: "var(--live-padding)"
    // data-control="padding"
  },
  // Card shadow levels από HTML mockup select
  shadow: {
    none: "none",
    small: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    medium: "0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)",
    large: "0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)"
  },
  // Card states
  states: {
    default: {
      transform: "scale(1)",
      transition: "all 0.2s ease"
    },
    hover: {
      transform: "scale(1.02)",
      transition: "all 0.2s ease",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)"
    },
    active: {
      transform: "scale(0.98)",
      transition: "all 0.1s ease"
    }
  }
};
var LAYERA_CARD_LIVE_VARS = {
  // Card-specific live variables που συνδυάζουν όλα τα controls
  "--layera-card-background-primary": "#E3F2FD",
  "--layera-card-background-secondary": "#F3E5F5",
  "--layera-card-background-success": "#E8F5E8",
  "--layera-card-background-warning": "#FFF3E0",
  "--layera-card-background-danger": "#FFEBEE",
  "--layera-card-background-info": "#E1F5FE",
  "--layera-card-border-primary": "var(--live-primary-color)",
  "--layera-card-border-secondary": "var(--live-secondary-color)",
  "--layera-card-border-success": "var(--live-success-color)",
  "--layera-card-border-warning": "var(--live-warning-color)",
  "--layera-card-border-danger": "var(--live-danger-color)",
  "--layera-card-border-info": "var(--live-info-color)",
  "--layera-card-height": "var(--live-card-height)",
  "--layera-card-border-radius": "var(--live-cards-border-radius)",
  "--layera-card-border-width": "var(--live-border-width)",
  "--layera-card-padding": "var(--live-padding)",
  "--layera-card-shadow": "var(--layera-shadow-small)"
};
function getCardVariantCSS(variant) {
  const variantTokens = LAYERA_CARD_TOKENS.variants[variant];
  const sizing = LAYERA_CARD_TOKENS.sizing;
  return {
    backgroundColor: variantTokens.backgroundColor,
    borderColor: variantTokens.borderColor,
    color: variantTokens.textColor,
    height: sizing.height,
    borderRadius: sizing.borderRadius,
    borderWidth: sizing.borderWidth,
    borderStyle: "solid",
    padding: sizing.padding,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease"
  };
}
function getCardShadowCSS(shadow) {
  return LAYERA_CARD_TOKENS.shadow[shadow];
}
function getCardStateCSS(state) {
  return LAYERA_CARD_TOKENS.states[state];
}
function getFullCardCSS(variant, shadow = "small", state = "default") {
  return {
    ...getCardVariantCSS(variant),
    boxShadow: getCardShadowCSS(shadow),
    ...getCardStateCSS(state)
  };
}
function getCardVariants() {
  return Object.keys(LAYERA_CARD_TOKENS.variants);
}

// src/component/modals.ts
var LAYERA_MODAL_TOKENS = {
  // Modal variants που αντιστοιχούν στα HTML mockup classes (.modal-primary, .modal-secondary, etc.)
  variants: {
    primary: {
      borderLeftColor: "var(--live-primary-color)",
      backgroundColor: "#FFFFFF",
      textColor: "#333333"
    },
    secondary: {
      borderLeftColor: "var(--live-secondary-color)",
      backgroundColor: "#FFFFFF",
      textColor: "#333333"
    },
    success: {
      borderLeftColor: "var(--live-success-color)",
      backgroundColor: "#FFFFFF",
      textColor: "#333333"
    },
    warning: {
      borderLeftColor: "var(--live-warning-color)",
      backgroundColor: "#FFFFFF",
      textColor: "#333333"
    },
    danger: {
      borderLeftColor: "var(--live-danger-color)",
      backgroundColor: "#FFFFFF",
      textColor: "#333333"
    },
    info: {
      borderLeftColor: "var(--live-info-color)",
      backgroundColor: "#FFFFFF",
      textColor: "#333333"
    }
  },
  // Modal sizing που χρησιμοποιούν τα HTML mockup controls
  sizing: {
    width: "var(--live-modal-width)",
    // data-control="modal-width"
    borderRadius: "var(--live-modals-border-radius)",
    // data-control="modals-border-radius"
    borderLeftWidth: "4px",
    // Accent border
    padding: "var(--live-padding)",
    // data-control="padding"
    minHeight: "200px",
    maxHeight: "80vh"
  },
  // Modal overlay και backdrop
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    zIndex: 1e3
  },
  // Modal states
  states: {
    default: {
      transform: "scale(1)",
      opacity: 1,
      transition: "all 0.2s ease"
    },
    entering: {
      transform: "scale(0.95)",
      opacity: 0,
      transition: "all 0.2s ease"
    },
    exiting: {
      transform: "scale(0.95)",
      opacity: 0,
      transition: "all 0.2s ease"
    }
  }
};
var LAYERA_MODAL_LIVE_VARS = {
  // Modal-specific live variables που συνδυάζουν όλα τα controls
  "--layera-modal-border-left-primary": "var(--live-primary-color)",
  "--layera-modal-border-left-secondary": "var(--live-secondary-color)",
  "--layera-modal-border-left-success": "var(--live-success-color)",
  "--layera-modal-border-left-warning": "var(--live-warning-color)",
  "--layera-modal-border-left-danger": "var(--live-danger-color)",
  "--layera-modal-border-left-info": "var(--live-info-color)",
  "--layera-modal-width": "var(--live-modal-width)",
  "--layera-modal-border-radius": "var(--live-modals-border-radius)",
  "--layera-modal-padding": "var(--live-padding)",
  "--layera-modal-background": "#FFFFFF",
  "--layera-modal-text-color": "#333333",
  "--layera-modal-overlay-background": "rgba(0, 0, 0, 0.5)"
};
function getModalVariantCSS(variant) {
  const variantTokens = LAYERA_MODAL_TOKENS.variants[variant];
  const sizing = LAYERA_MODAL_TOKENS.sizing;
  return {
    backgroundColor: variantTokens.backgroundColor,
    borderLeftColor: variantTokens.borderLeftColor,
    borderLeftWidth: sizing.borderLeftWidth,
    borderLeftStyle: "solid",
    color: variantTokens.textColor,
    width: sizing.width,
    borderRadius: sizing.borderRadius,
    padding: sizing.padding,
    minHeight: sizing.minHeight,
    maxHeight: sizing.maxHeight,
    position: "relative",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
  };
}
function getModalOverlayCSS() {
  return {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: LAYERA_MODAL_TOKENS.overlay.backgroundColor,
    backdropFilter: LAYERA_MODAL_TOKENS.overlay.backdropFilter,
    zIndex: LAYERA_MODAL_TOKENS.overlay.zIndex,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
}
function getModalVariants() {
  return Object.keys(LAYERA_MODAL_TOKENS.variants);
}

// src/component/tables.ts
var LAYERA_TABLE_TOKENS = {
  // Table variants για different color schemes
  variants: {
    primary: {
      headerBackground: "var(--live-primary-color)",
      headerTextColor: "#FFFFFF",
      borderColor: "var(--live-primary-color)"
    },
    secondary: {
      headerBackground: "var(--live-secondary-color)",
      headerTextColor: "#FFFFFF",
      borderColor: "var(--live-secondary-color)"
    },
    success: {
      headerBackground: "var(--live-success-color)",
      headerTextColor: "#FFFFFF",
      borderColor: "var(--live-success-color)"
    },
    warning: {
      headerBackground: "var(--live-warning-color)",
      headerTextColor: "#000000",
      borderColor: "var(--live-warning-color)"
    },
    danger: {
      headerBackground: "var(--live-danger-color)",
      headerTextColor: "#FFFFFF",
      borderColor: "var(--live-danger-color)"
    },
    info: {
      headerBackground: "var(--live-info-color)",
      headerTextColor: "#FFFFFF",
      borderColor: "var(--live-info-color)"
    }
  },
  // Table sizing από HTML mockup controls
  sizing: {
    borderRadius: "var(--live-tables-border-radius)",
    // data-control="tables-border-radius"
    borderWidth: "var(--live-border-width)",
    cellPadding: "var(--layera-table-cell-padding)",
    minHeight: "300px",
    maxHeight: "70vh"
  },
  // Table styles
  styles: {
    rowBackground: "#FFFFFF",
    rowAlternateBackground: "#F8F9FA",
    rowHoverBackground: "#F1F3F4",
    borderCollapse: "separate",
    borderSpacing: "0"
  }
};
var LAYERA_TABLE_LIVE_VARS = {
  "--layera-table-border-radius": "var(--live-tables-border-radius)",
  "--layera-table-border-width": "var(--live-border-width)",
  "--layera-table-cell-padding": "var(--layera-table-cell-padding)",
  "--layera-table-row-background": "#FFFFFF",
  "--layera-table-row-alternate": "#F8F9FA",
  "--layera-table-row-hover": "#F1F3F4"
};

// src/component/headers.ts
var LAYERA_HEADER_TOKENS = {
  // Header variants για different color schemes
  variants: {
    primary: {
      backgroundColor: "var(--live-primary-color)",
      textColor: "#FFFFFF",
      borderColor: "var(--live-primary-color)"
    },
    secondary: {
      backgroundColor: "var(--live-secondary-color)",
      textColor: "#FFFFFF",
      borderColor: "var(--live-secondary-color)"
    },
    success: {
      backgroundColor: "var(--live-success-color)",
      textColor: "#FFFFFF",
      borderColor: "var(--live-success-color)"
    },
    warning: {
      backgroundColor: "var(--live-warning-color)",
      textColor: "#000000",
      borderColor: "var(--live-warning-color)"
    },
    danger: {
      backgroundColor: "var(--live-danger-color)",
      textColor: "#FFFFFF",
      borderColor: "var(--live-danger-color)"
    },
    info: {
      backgroundColor: "var(--live-info-color)",
      textColor: "#FFFFFF",
      borderColor: "var(--live-info-color)"
    }
  },
  // Header sizing από HTML mockup controls
  sizing: {
    height: "var(--layera-header-height)",
    // 60px default
    borderRadius: "var(--live-headers-border-radius)",
    // data-control="header-border-radius"
    padding: "var(--live-padding)"
    // data-control="padding"
  }
};
var LAYERA_HEADER_LIVE_VARS = {
  "--layera-header-height": "var(--layera-header-height)",
  "--layera-header-border-radius": "var(--live-headers-border-radius)",
  "--layera-header-padding": "var(--live-padding)"
};

// src/layout/overlay.ts
var LAYERA_LAYOUT_OVERLAY_CLASSES = {
  // Fullscreen overlay για FullAppLayout preview
  "layera-layout-fullscreen-overlay": {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "9999",
    background: "white"
  },
  // Close button positioning
  "layera-layout-close-button": {
    position: "absolute",
    top: "var(--layera-space-2)",
    right: "var(--layera-space-2)",
    background: "var(--live-danger-color)",
    color: "white",
    padding: "var(--layera-space-2)",
    borderRadius: "var(--live-border-radius)",
    cursor: "pointer",
    zIndex: "10000",
    border: "none"
  }
};

// src/layout/navigation.ts
var LAYERA_LAYOUT_NAVIGATION_CLASSES = {
  // Main layout container
  "layera-layout-main-container": {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    overflow: "hidden"
  },
  // Flex layout για sidebars + main content
  "layera-layout-flex-container": {
    display: "flex",
    flex: "1",
    minHeight: "0"
  },
  // Sidebar transitions
  "layera-layout-sidebar-transition": {
    transition: "width 0.3s ease",
    overflow: "hidden"
  }
};

// src/layout/sidebars.ts
var LAYERA_SIDEBAR_DIMENSIONS = {
  // Primary sidebar (left navigation)
  primary: {
    width: {
      default: 200,
      // Συγχρονισμός με main.css: flex: 0 0 200px
      collapsed: 60,
      unit: "px"
    },
    positioning: {
      top: 57,
      // Συγχρονισμός με header
      left: 0,
      zIndex: 999
    }
  },
  // Secondary sidebar (left toggleable)
  secondaryLeft: {
    width: {
      default: 180,
      collapsed: 0,
      unit: "px"
    },
    positioning: {
      zIndex: 998
    }
  },
  // Right sidebar (design controls)
  right: {
    width: {
      default: 300,
      collapsed: 0,
      unit: "px"
    },
    positioning: {
      right: 0,
      zIndex: 997
    }
  },
  // Header integration
  header: {
    height: 57,
    // Ακριβής τιμή για sidebar positioning
    zIndex: 1e3
  }
};
var LAYERA_SIDEBAR_COLORS = {
  // Primary sidebar colors (dark theme)
  primary: {
    background: "#2c3e50",
    color: "#ffffff",
    menuItem: {
      background: "#34495e",
      backgroundHover: "#3498db",
      color: "#ffffff"
    },
    heading: {
      color: "#ecf0f1"
    }
  },
  // Secondary left sidebar colors
  secondaryLeft: {
    background: "#34495e",
    color: "#ffffff"
  },
  // Right sidebar colors (light theme)
  right: {
    background: "#ffffff",
    color: "#333333",
    border: "#e0e0e0"
  }
};
var LAYERA_SIDEBAR_TYPOGRAPHY = {
  fontFamily: "Arial, sans-serif",
  headings: {
    fontSize: "inherit",
    fontWeight: "inherit",
    margin: "0 0 1rem 0"
  },
  menuItems: {
    fontSize: "inherit",
    fontWeight: "normal",
    padding: "0.75rem"
  },
  inputs: {
    fontSize: "0.85rem",
    padding: "0.5rem"
  },
  buttons: {
    fontSize: "inherit",
    padding: "0.5rem 1rem"
  }
};
var LAYERA_LIVE_SIDEBAR_VARS = {
  // Live dimension variables
  liveDimensions: {
    "--live-sidebar-primary-width": `${LAYERA_SIDEBAR_DIMENSIONS.primary.width.default}px`,
    "--live-sidebar-secondary-left-width": `${LAYERA_SIDEBAR_DIMENSIONS.secondaryLeft.width.default}px`,
    "--live-sidebar-right-width": `${LAYERA_SIDEBAR_DIMENSIONS.right.width.default}px`,
    "--live-header-height": `${LAYERA_SIDEBAR_DIMENSIONS.header.height}px`
  },
  // Live color variables
  liveColors: {
    "--live-sidebar-primary-bg": "var(--layera-sidebar-primary-background)",
    "--live-sidebar-primary-color": "var(--layera-sidebar-primary-color)",
    "--live-sidebar-menu-bg": "var(--layera-sidebar-menu-background)",
    "--live-sidebar-menu-hover-bg": "var(--layera-sidebar-menu-hover-background)"
  },
  // Base token definitions
  baseTokens: {
    // Dimensions
    "--layera-sidebar-primary-width": `${LAYERA_SIDEBAR_DIMENSIONS.primary.width.default}px`,
    "--layera-sidebar-primary-width-collapsed": `${LAYERA_SIDEBAR_DIMENSIONS.primary.width.collapsed}px`,
    "--layera-sidebar-secondary-left-width": `${LAYERA_SIDEBAR_DIMENSIONS.secondaryLeft.width.default}px`,
    "--layera-sidebar-right-width": `${LAYERA_SIDEBAR_DIMENSIONS.right.width.default}px`,
    "--layera-header-height": `${LAYERA_SIDEBAR_DIMENSIONS.header.height}px`,
    // Positioning
    "--layera-sidebar-primary-top": `${LAYERA_SIDEBAR_DIMENSIONS.primary.positioning.top}px`,
    "--layera-sidebar-primary-left": `${LAYERA_SIDEBAR_DIMENSIONS.primary.positioning.left}px`,
    "--layera-sidebar-primary-z-index": LAYERA_SIDEBAR_DIMENSIONS.primary.positioning.zIndex,
    // Colors
    "--layera-sidebar-primary-background": LAYERA_SIDEBAR_COLORS.primary.background,
    "--layera-sidebar-primary-color": LAYERA_SIDEBAR_COLORS.primary.color,
    "--layera-sidebar-menu-background": LAYERA_SIDEBAR_COLORS.primary.menuItem.background,
    "--layera-sidebar-menu-hover-background": LAYERA_SIDEBAR_COLORS.primary.menuItem.backgroundHover,
    "--layera-sidebar-heading-color": LAYERA_SIDEBAR_COLORS.primary.heading.color,
    // Typography
    "--layera-sidebar-font-family": LAYERA_SIDEBAR_TYPOGRAPHY.fontFamily,
    "--layera-sidebar-heading-margin": LAYERA_SIDEBAR_TYPOGRAPHY.headings.margin,
    "--layera-sidebar-menu-padding": LAYERA_SIDEBAR_TYPOGRAPHY.menuItems.padding,
    "--layera-sidebar-input-padding": LAYERA_SIDEBAR_TYPOGRAPHY.inputs.padding,
    "--layera-sidebar-button-padding": LAYERA_SIDEBAR_TYPOGRAPHY.buttons.padding
  }
};
function getLiveSidebarVar(sidebar, property) {
  return `--live-sidebar-${sidebar.toLowerCase()}-${property}`;
}
function getSidebarWidth(sidebar, state) {
  const dimensions = LAYERA_SIDEBAR_DIMENSIONS[sidebar];
  return state === "collapsed" ? dimensions.width.collapsed : dimensions.width.default;
}
function getSidebarColors(sidebar) {
  return LAYERA_SIDEBAR_COLORS[sidebar];
}
function getSidebarPositioning(sidebar, headerHeight) {
  const dimensions = LAYERA_SIDEBAR_DIMENSIONS[sidebar];
  const finalHeaderHeight = headerHeight || LAYERA_SIDEBAR_DIMENSIONS.header.height;
  const base = {
    position: "fixed",
    height: `calc(100vh - ${finalHeaderHeight}px)`,
    minHeight: `calc(100vh - ${finalHeaderHeight}px)`,
    overflowY: "scroll",
    overflowX: "hidden",
    boxSizing: "border-box"
  };
  switch (sidebar) {
    case "primary":
      return {
        ...base,
        top: `${finalHeaderHeight}px`,
        left: "0",
        zIndex: dimensions.positioning.zIndex,
        width: `var(--layera-sidebar-primary-width)`
      };
    case "right":
      return {
        ...base,
        top: `${finalHeaderHeight}px`,
        right: "0",
        zIndex: dimensions.positioning.zIndex,
        width: `var(--layera-sidebar-right-width)`
      };
    default:
      return base;
  }
}

// src/layout/utilities.ts
var LAYERA_LAYOUT_UTILITY_CLASSES = {
  // Full width utilities
  "layera-layout-full-width": {
    width: "100%"
  },
  // Full height utilities
  "layera-layout-full-height": {
    height: "100%"
  },
  // Background utilities
  "layera-layout-bg-primary": {
    background: "var(--live-primary-color)"
  },
  "layera-layout-bg-white": {
    background: "white"
  },
  // Spacing utilities using existing tokens
  "layera-layout-padding-md": {
    padding: "var(--layera-space-4)"
  },
  "layera-layout-margin-md": {
    margin: "var(--layera-space-4)"
  },
  // Text alignment utilities - ΚΕΝΤΡΙΚΗ ΣΤΟΙΧΙΣΗ
  "layera-center-text": {
    textAlign: "center"
  },
  // Flexbox center utilities - ΚΕΝΤΡΙΚΗ ΣΤΟΙΧΙΣΗ
  "layera-center-flex": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  "layera-center-flex-column": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  // Layout center utilities - ΚΕΝΤΡΙΚΗ ΣΤΟΙΧΙΣΗ
  "layera-center-content": {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

// src/themes/presets.ts
var LAYERA_PRESET_THEMES = {
  // Ocean theme - Από HTML mockup: 'ocean'
  ocean: {
    primary: "#2196F3",
    secondary: "#00BCD4",
    success: "#009688",
    warning: "#FFC107",
    danger: "#F44336",
    info: "#3F51B5"
  },
  // Nature theme - Από HTML mockup: 'nature'
  nature: {
    primary: "#4CAF50",
    secondary: "#8BC34A",
    success: "#4CAF50",
    warning: "#FF9800",
    danger: "#F44336",
    info: "#2196F3"
  },
  // Sunset theme - Από HTML mockup: 'sunset'
  sunset: {
    primary: "#FF9800",
    secondary: "#FF5722",
    success: "#4CAF50",
    warning: "#FFC107",
    danger: "#F44336",
    info: "#2196F3"
  },
  // Royal theme - Από HTML mockup: 'royal'
  royal: {
    primary: "#9013FE",
    secondary: "#7C4DFF",
    success: "#4CAF50",
    warning: "#FF9800",
    danger: "#F44336",
    info: "#3F51B5"
  },
  // Dark theme - Από HTML mockup: 'dark'
  dark: {
    primary: "#212121",
    secondary: "#424242",
    success: "#388E3C",
    warning: "#F57C00",
    danger: "#D32F2F",
    info: "#1976D2"
  },
  // Pastel theme - Από HTML mockup: 'pastel'
  pastel: {
    primary: "#E1BEE7",
    secondary: "#F8BBD9",
    success: "#C8E6C9",
    warning: "#FFE0B2",
    danger: "#FFCDD2",
    info: "#BBDEFB"
  }
};
function getPresetTheme(themeName) {
  return LAYERA_PRESET_THEMES[themeName];
}
function getPresetThemeNames() {
  return Object.keys(LAYERA_PRESET_THEMES);
}
function isValidPresetTheme(themeName) {
  return Object.hasOwnProperty.call(LAYERA_PRESET_THEMES, themeName);
}
function getThemeAsLiveVariables(themeName) {
  const theme = getPresetTheme(themeName);
  return {
    "--live-primary-color": theme.primary,
    "--live-secondary-color": theme.secondary,
    "--live-success-color": theme.success,
    "--live-warning-color": theme.warning,
    "--live-danger-color": theme.danger,
    "--live-info-color": theme.info
  };
}
function applyPresetThemeToDOM(themeName) {
  const theme = getPresetTheme(themeName);
  const root = document.documentElement;
  Object.entries(theme).forEach(([colorType, colorValue]) => {
    const varName = `--live-${colorType}-color`;
    root.style.setProperty(varName, colorValue);
  });
  root.setAttribute("data-layera-theme", themeName);
}

// src/dynamic/live-variables.ts
var LAYERA_LIVE_VARIABLES = {
  // Colors - από updateAdvancedColor()
  colors: {
    "--live-primary-color": "#4A90E2",
    "--live-secondary-color": "#9013FE",
    "--live-success-color": "#4CAF50",
    "--live-warning-color": "#FF9800",
    "--live-danger-color": "#F44336",
    "--live-info-color": "#2196F3"
  },
  // Border Radius - per component από HTML mockup
  borderRadius: {
    "--live-cards-border-radius": "8px",
    "--live-buttons-border-radius": "6px",
    "--live-modals-border-radius": "12px",
    "--live-tables-border-radius": "4px",
    "--live-headers-border-radius": "0px",
    "--live-border-radius": "8px"
    // Global
  },
  // Spacing - από updateAdvancedLayout()
  spacing: {
    "--live-component-gap": "16px",
    "--live-padding": "16px",
    "--live-button-padding": "16px"
  },
  // Typography - από updateFont* functions
  typography: {
    "--live-font-family": "system-ui, -apple-system, sans-serif",
    "--live-font-size": "16px",
    "--live-header-size": "24px",
    "--live-button-font-size": "14px",
    "--live-font-weight": "400",
    "--live-line-height": "1.5",
    "--live-text-color": "#2c3e50"
  },
  // Dimensions - από HTML mockup dimension controls
  dimensions: {
    "--live-button-height": "36px",
    "--live-card-height": "120px",
    "--live-modal-width": "400px"
  },
  // Border Width - από HTML mockup
  borders: {
    "--live-border-width": "2px"
  }
};
function applyAllLiveVariables() {
  const root = document.documentElement;
  Object.values(LAYERA_LIVE_VARIABLES).forEach((category) => {
    Object.entries(category).forEach(([varName, varValue]) => {
      root.style.setProperty(varName, varValue);
    });
  });
}
function setLiveVariable(varName, value) {
  document.documentElement.style.setProperty(varName, value);
}
function getLiveVariable(varName) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}
function updateLiveColor(colorType, newColor) {
  const varName = `--live-${colorType}-color`;
  setLiveVariable(varName, newColor);
  console.log(`Updated ${colorType} to ${newColor}`);
}
function updateLiveLayout(property, value) {
  const varName = `--live-${property}`;
  const varValue = typeof value === "number" ? `${value}px` : value;
  setLiveVariable(varName, varValue);
  console.log(`Updated ${property} to ${varValue}`);
}
function resetLiveVariables() {
  applyAllLiveVariables();
  console.log("Reset all live variables to defaults");
}
function getAllLiveVariables() {
  const root = document.documentElement;
  const allVars = {};
  Object.values(LAYERA_LIVE_VARIABLES).forEach((category) => {
    Object.keys(category).forEach((varName) => {
      const value = getComputedStyle(root).getPropertyValue(varName).trim();
      if (value) {
        allVars[varName] = value;
      }
    });
  });
  return allVars;
}

// src/dynamic/theme-engine.ts
var themeState = {
  currentPresetTheme: null,
  currentTargetComponent: "all",
  customColors: {},
  customLayout: {}
};
function applyTheme(themeName) {
  console.log(`\u{1F680} applyTheme called with: ${themeName}`);
  applyPresetThemeToDOM(themeName);
  themeState.currentPresetTheme = themeName;
  updatePresetButtonStates(themeName);
  console.log(`\u2705 Applied theme: ${themeName}`);
}
function updateAdvancedColor(colorType, newColor) {
  console.log(`Updating ${colorType} to ${newColor} for target: ${themeState.currentTargetComponent}`);
  updateLiveColor(colorType, newColor);
  themeState.customColors[colorType] = newColor;
  if (themeState.currentPresetTheme) {
    themeState.currentPresetTheme = null;
    updatePresetButtonStates(null);
  }
}
function updateAdvancedLayout(property, value) {
  console.log(`Updating layout ${property} to ${value} for target: ${themeState.currentTargetComponent}`);
  updateLiveLayout(property, value);
  themeState.customLayout[property] = value;
}
function setTargetComponent(target) {
  themeState.currentTargetComponent = target;
  console.log(`Target component set to: ${target}`);
  updateTargetButtonStates(target);
}
function saveThemeState() {
  const stateToSave = {
    ...themeState,
    liveVariables: getAllLiveVariables()
  };
  localStorage.setItem("layera-theme-state", JSON.stringify(stateToSave));
  console.log("\u{1F4BE} Theme state saved");
}
function loadThemeState() {
  const savedState = localStorage.getItem("layera-theme-state");
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState);
      if (parsedState.currentPresetTheme) {
        applyTheme(parsedState.currentPresetTheme);
      }
      Object.entries(parsedState.customColors || {}).forEach(([colorType, color]) => {
        updateLiveColor(colorType, color);
      });
      Object.entries(parsedState.customLayout || {}).forEach(([property, value]) => {
        updateLiveLayout(property, value);
      });
      if (parsedState.currentTargetComponent) {
        setTargetComponent(parsedState.currentTargetComponent);
      }
      console.log("\u{1F4C2} Theme state loaded");
    } catch (error) {
      console.warn("Failed to load theme state:", error);
      resetLiveVariables();
    }
  }
}
function resetToDefaults() {
  console.log("\u{1F504} Resetting to defaults");
  resetLiveVariables();
  themeState = {
    currentPresetTheme: null,
    currentTargetComponent: "all",
    customColors: {},
    customLayout: {}
  };
  localStorage.removeItem("layera-theme-state");
  updatePresetButtonStates(null);
  updateTargetButtonStates("all");
  console.log("\u2705 Reset complete");
}
function updatePresetButtonStates(activeTheme) {
  document.querySelectorAll("[data-theme]").forEach((button) => {
    const buttonTheme = button.dataset.theme;
    if (buttonTheme === activeTheme) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}
function updateTargetButtonStates(activeTarget) {
  document.querySelectorAll("[data-target]").forEach((button) => {
    const buttonTarget = button.dataset.target;
    const element = button;
    if (buttonTarget === activeTarget) {
      element.style.background = "#4A90E2";
      element.style.borderColor = "#4A90E2";
      element.style.color = "white";
      element.classList.add("active");
    } else {
      element.style.background = "transparent";
      element.style.borderColor = "#666";
      element.style.color = "#ccc";
      element.classList.remove("active");
    }
  });
}
function exportCSS() {
  const variables = getAllLiveVariables();
  let css = ":root {\n";
  Object.entries(variables).forEach(([varName, varValue]) => {
    css += `  ${varName}: ${varValue};
`;
  });
  css += "}";
  console.log("\u{1F4E4} CSS exported");
  return css;
}
function exportThemeAsJSON() {
  const themeData = {
    presetTheme: themeState.currentPresetTheme,
    customColors: themeState.customColors,
    customLayout: themeState.customLayout,
    liveVariables: getAllLiveVariables(),
    exportedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  return JSON.stringify(themeData, null, 2);
}
function getCurrentThemeState() {
  return { ...themeState };
}
function getCurrentTargetComponent() {
  return themeState.currentTargetComponent;
}
function getCurrentPresetTheme() {
  return themeState.currentPresetTheme;
}

// src/dynamic/component-targeting.ts
var LAYERA_TARGET_SELECTORS = {
  // Button selectors
  buttons: [
    ".layera-button",
    ".btn",
    'button[class*="button"]',
    '[data-component="button"]',
    ".primary-btn",
    ".secondary-btn",
    ".success-btn",
    ".warning-btn",
    ".danger-btn",
    ".info-btn"
  ],
  // Card selectors
  cards: [
    ".layera-card",
    ".card",
    '[data-component="card"]',
    ".card-primary",
    ".card-secondary",
    ".card-success",
    ".card-warning",
    ".card-danger",
    ".card-info"
  ],
  // Modal selectors
  modals: [
    ".layera-modal",
    ".modal",
    '[data-component="modal"]',
    ".modal-primary",
    ".modal-secondary",
    ".modal-success",
    ".modal-warning",
    ".modal-danger",
    ".modal-info"
  ],
  // Table selectors
  tables: [
    ".layera-table",
    ".table",
    "table",
    '[data-component="table"]',
    ".data-table"
  ],
  // Header selectors
  headers: [
    ".layera-header",
    ".header",
    "header",
    '[data-component="header"]',
    ".app-header",
    ".page-header"
  ]
};
var LAYERA_COLOR_APPLICATION = {
  // Πώς εφαρμόζονται τα χρώματα σε κάθε component type
  buttons: {
    background: (colorValue) => colorValue,
    borderColor: (colorValue) => colorValue,
    color: (colorValue) => getContrastColor(colorValue)
  },
  cards: {
    backgroundColor: (colorValue) => getLightVariant(colorValue),
    borderColor: (colorValue) => colorValue,
    color: (colorValue) => getDarkVariant(colorValue)
  },
  modals: {
    borderLeftColor: (colorValue) => colorValue,
    backgroundColor: () => "#FFFFFF",
    color: () => "#333333"
  },
  tables: {
    headerBackground: (colorValue) => colorValue,
    headerTextColor: (colorValue) => getContrastColor(colorValue),
    borderColor: (colorValue) => colorValue
  },
  headers: {
    backgroundColor: (colorValue) => colorValue,
    color: (colorValue) => getContrastColor(colorValue),
    borderBottomColor: (colorValue) => getDarkVariant(colorValue)
  }
};
function getTargetSelectors(target, colorType) {
  if (target === "all") {
    return Object.values(LAYERA_TARGET_SELECTORS).flat();
  }
  if (target === "headers") {
    return LAYERA_TARGET_SELECTORS.headers;
  }
  return LAYERA_TARGET_SELECTORS[target] || [];
}
function applyColorToElement(element, colorType, colorValue, targetComponent) {
  const componentType = determineComponentType(element, targetComponent);
  if (!componentType || !LAYERA_COLOR_APPLICATION[componentType]) {
    return;
  }
  const applicationStrategy = LAYERA_COLOR_APPLICATION[componentType];
  switch (componentType) {
    case "buttons":
      element.style.backgroundColor = applicationStrategy.background(colorValue);
      element.style.borderColor = applicationStrategy.borderColor(colorValue);
      element.style.color = applicationStrategy.color(colorValue);
      break;
    case "cards":
      element.style.backgroundColor = applicationStrategy.backgroundColor(colorValue);
      element.style.borderColor = applicationStrategy.borderColor(colorValue);
      element.style.color = applicationStrategy.color(colorValue);
      break;
    case "modals":
      element.style.borderLeftColor = applicationStrategy.borderLeftColor(colorValue);
      element.style.backgroundColor = applicationStrategy.backgroundColor(colorValue);
      element.style.color = applicationStrategy.color(colorValue);
      break;
    case "tables":
      const headerCells = element.querySelectorAll("th, .table-header");
      headerCells.forEach((cell) => {
        cell.style.backgroundColor = applicationStrategy.headerBackground(colorValue);
        cell.style.color = applicationStrategy.headerTextColor(colorValue);
      });
      element.style.borderColor = applicationStrategy.borderColor(colorValue);
      break;
    case "headers":
      element.style.backgroundColor = applicationStrategy.backgroundColor(colorValue);
      element.style.color = applicationStrategy.color(colorValue);
      element.style.borderBottomColor = applicationStrategy.borderBottomColor(colorValue);
      break;
  }
}
function determineComponentType(element, targetComponent) {
  if (targetComponent !== "all") {
    return targetComponent;
  }
  const classList = Array.from(element.classList);
  const tagName = element.tagName.toLowerCase();
  if (classList.some((cls) => cls.includes("button") || cls.includes("btn")) || tagName === "button") {
    return "buttons";
  }
  if (classList.some((cls) => cls.includes("card"))) {
    return "cards";
  }
  if (classList.some((cls) => cls.includes("modal"))) {
    return "modals";
  }
  if (classList.some((cls) => cls.includes("table")) || tagName === "table") {
    return "tables";
  }
  if (classList.some((cls) => cls.includes("header")) || tagName === "header") {
    return "headers";
  }
  return null;
}
function getContrastColor(backgroundColor) {
  const color = backgroundColor.replace("#", "");
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}
function getLightVariant(color) {
  const opacity = "20";
  if (color.startsWith("#")) {
    return color + opacity;
  }
  return color;
}
function getDarkVariant(color) {
  return color;
}

// src/registry/tokens-registry.ts
var LAYERA_DYNAMIC_TOKENS = {
  // 📊 Metadata
  version: "2.0.0",
  buildDate: (/* @__PURE__ */ new Date()).toISOString(),
  source: "FullAppPreview_Mockup.html analysis",
  // 🎨 Core Foundation Tokens
  core: {
    colors: LAYERA_CORE_COLORS,
    spacing: LAYERA_CORE_SPACING,
    typography: LAYERA_CORE_TYPOGRAPHY,
    borders: LAYERA_CORE_BORDERS,
    dimensions: LAYERA_CORE_DIMENSIONS
  },
  // 🔧 Component-Specific Tokens
  components: {
    buttons: LAYERA_BUTTON_TOKENS,
    cards: LAYERA_CARD_TOKENS,
    modals: LAYERA_MODAL_TOKENS,
    tables: LAYERA_TABLE_TOKENS,
    headers: LAYERA_HEADER_TOKENS
  },
  // 🔄 Live Variable System - για real-time theming
  live: {
    variables: LAYERA_LIVE_VARIABLES,
    colorVars: LAYERA_LIVE_COLOR_VARS,
    spacingVars: LAYERA_LIVE_SPACING_VARS,
    typographyVars: LAYERA_LIVE_TYPOGRAPHY_VARS,
    borderVars: LAYERA_LIVE_BORDER_VARS,
    dimensionVars: LAYERA_LIVE_DIMENSION_VARS,
    componentVars: {
      buttons: LAYERA_BUTTON_LIVE_VARS,
      cards: LAYERA_CARD_LIVE_VARS,
      modals: LAYERA_MODAL_LIVE_VARS,
      tables: LAYERA_TABLE_LIVE_VARS,
      headers: LAYERA_HEADER_LIVE_VARS
    }
  },
  // 🎭 Theme System
  themes: {
    presets: LAYERA_PRESET_THEMES,
    radiusPresets: LAYERA_RADIUS_PRESETS
  },
  // 🎯 Dynamic System - Component targeting και live theming
  dynamic: {
    targetSelectors: LAYERA_TARGET_SELECTORS,
    colorApplication: LAYERA_COLOR_APPLICATION,
    supportedTargets: ["all", "buttons", "cards", "modals", "tables", "headers"],
    supportedColorTypes: ["primary", "secondary", "success", "warning", "danger", "info"]
  },
  // 📐 Control Ranges - Από HTML mockup data-control attributes
  controls: {
    colors: {
      // 6-color system
      supportedTypes: ["primary", "secondary", "success", "warning", "danger", "info"]
    },
    borderRadius: {
      cards: { min: 0, max: 32, default: 8, unit: "px" },
      buttons: { min: 0, max: 32, default: 6, unit: "px" },
      modals: { min: 0, max: 32, default: 12, unit: "px" },
      tables: { min: 0, max: 32, default: 4, unit: "px" },
      headers: { min: 0, max: 32, default: 0, unit: "px" },
      global: { min: 0, max: 24, default: 8, unit: "px" }
    },
    typography: {
      fontSize: { min: 12, max: 24, default: 16, unit: "px" },
      headerSize: { min: 18, max: 36, default: 24, unit: "px" },
      buttonFontSize: { min: 10, max: 20, default: 14, unit: "px" },
      lineHeight: { min: 1, max: 2, default: 1.5, step: 0.1 },
      fontWeight: ["300", "400", "500", "600", "700"],
      fontFamily: ["Arial, sans-serif", "'Segoe UI', sans-serif", "'Roboto', sans-serif"]
    },
    spacing: {
      componentGap: { min: 4, max: 48, default: 16, unit: "px" },
      padding: { min: 4, max: 32, default: 16, unit: "px" },
      buttonPadding: { min: 8, max: 32, default: 16, unit: "px" }
    },
    dimensions: {
      buttonHeight: { min: 24, max: 56, default: 36, unit: "px" },
      cardHeight: { min: 80, max: 200, default: 120, unit: "px" },
      modalWidth: { min: 300, max: 600, default: 400, unit: "px" }
    },
    borders: {
      borderWidth: { min: 1, max: 8, default: 2, unit: "px" }
    }
  }
};

// src/legacy/compatibility.ts
var LEGACY_COLOR_MAPPING = {
  // Old naming → New dynamic tokens
  "--layera-color-primary": "var(--live-primary-color)",
  "--layera-color-secondary": "var(--live-secondary-color)",
  "--layera-color-success": "var(--live-success-color)",
  "--layera-color-warning": "var(--live-warning-color)",
  "--layera-color-danger": "var(--live-danger-color)",
  "--layera-color-info": "var(--live-info-color)",
  // Legacy semantic colors
  "--layera-color-semantic-info-primary": LAYERA_CORE_COLORS.info.default,
  "--layera-color-semantic-success-primary": LAYERA_CORE_COLORS.success.default,
  "--layera-color-semantic-warning-primary": LAYERA_CORE_COLORS.warning.default,
  "--layera-color-semantic-danger-primary": LAYERA_CORE_COLORS.danger.default
};
var LEGACY_COMPONENT_MAPPING = {
  // Button legacy tokens
  "--layera-button-primary-background": "var(--layera-button-background-primary)",
  "--layera-button-secondary-background": "var(--layera-button-background-secondary)",
  "--layera-button-height-default": "var(--layera-button-height)",
  "--layera-button-padding-default": "var(--layera-button-padding)",
  // Card legacy tokens
  "--layera-card-primary-background": "var(--layera-card-background-primary)",
  "--layera-card-secondary-background": "var(--layera-card-background-secondary)",
  "--layera-card-border-radius-default": "var(--layera-card-border-radius)",
  // Modal legacy tokens
  "--layera-modal-primary-border": "var(--layera-modal-border-left-primary)",
  "--layera-modal-width-default": "var(--layera-modal-width)",
  // Legacy spacing references
  "--layera-spacing-component-gap": "var(--live-component-gap)",
  "--layera-spacing-padding": "var(--live-padding)"
};
var COLOR_VARIABLES = {
  primary: LAYERA_CORE_COLORS.primary.default,
  secondary: LAYERA_CORE_COLORS.secondary.default,
  success: LAYERA_CORE_COLORS.success.default,
  warning: LAYERA_CORE_COLORS.warning.default,
  danger: LAYERA_CORE_COLORS.danger.default,
  info: LAYERA_CORE_COLORS.info.default
};
var COLOR_VARIANTS = {
  primary: {
    default: LAYERA_CORE_COLORS.primary.default,
    light: LAYERA_CORE_COLORS.primary.light,
    dark: LAYERA_CORE_COLORS.primary.dark
  },
  secondary: {
    default: LAYERA_CORE_COLORS.secondary.default,
    light: LAYERA_CORE_COLORS.secondary.light,
    dark: LAYERA_CORE_COLORS.secondary.dark
  }
  // ... κ.λ.π για όλα τα χρώματα
};
var ColorComponentSystem = {
  getColor: (type, variant = "default") => {
    const colorMap = {
      primary: LAYERA_CORE_COLORS.primary,
      secondary: LAYERA_CORE_COLORS.secondary,
      success: LAYERA_CORE_COLORS.success,
      warning: LAYERA_CORE_COLORS.warning,
      danger: LAYERA_CORE_COLORS.danger,
      info: LAYERA_CORE_COLORS.info
    };
    return colorMap[type]?.[variant] || colorMap[type]?.default;
  },
  getAllColors: () => COLOR_VARIABLES
};
function migrateLegacyTokenName(legacyToken) {
  if (legacyToken in LEGACY_COLOR_MAPPING) {
    return LEGACY_COLOR_MAPPING[legacyToken];
  }
  if (legacyToken in LEGACY_COMPONENT_MAPPING) {
    return LEGACY_COMPONENT_MAPPING[legacyToken];
  }
  return legacyToken;
}
function applyLegacyTokenMappings() {
  const root = document.documentElement;
  Object.entries(LEGACY_COLOR_MAPPING).forEach(([legacyVar, newVar]) => {
    root.style.setProperty(legacyVar, newVar);
  });
  Object.entries(LEGACY_COMPONENT_MAPPING).forEach(([legacyVar, newVar]) => {
    root.style.setProperty(legacyVar, newVar);
  });
  console.log("\u{1F517} Legacy token mappings applied");
}
function generateMigrationReport() {
  const report = {};
  Object.entries(LEGACY_COLOR_MAPPING).forEach(([legacy, modern]) => {
    report[legacy] = {
      legacy,
      modern,
      status: "mapped"
    };
  });
  Object.entries(LEGACY_COMPONENT_MAPPING).forEach(([legacy, modern]) => {
    report[legacy] = {
      legacy,
      modern,
      status: "mapped"
    };
  });
  return report;
}
var LEGACY_CSS_CLASSES = [
  // Button classes από HTML mockup
  ".primary-btn",
  ".secondary-btn",
  ".success-btn",
  ".warning-btn",
  ".danger-btn",
  ".info-btn",
  // Card classes από HTML mockup
  ".card-primary",
  ".card-secondary",
  ".card-success",
  ".card-warning",
  ".card-danger",
  ".card-info",
  // Modal classes από HTML mockup
  ".modal-primary",
  ".modal-secondary",
  ".modal-success",
  ".modal-warning",
  ".modal-danger",
  ".modal-info"
];
function ensureLegacyCSSCompatibility() {
  console.log("\u{1F517} Legacy CSS classes remain compatible with dynamic token system");
}

// src/index.ts
var LAYERA_TOKENS_VERSION = "2.0.0";
var LAYERA_TOKENS_BUILD_DATE = (/* @__PURE__ */ new Date()).toISOString();
var LAYERA_TOKENS_SOURCE = "Dynamic Token System - FullAppPreview_Mockup.html analysis";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  COLOR_VARIABLES,
  COLOR_VARIANTS,
  ColorComponentSystem,
  LAYERA_BUTTON_LIVE_VARS,
  LAYERA_BUTTON_TOKENS,
  LAYERA_CARD_LIVE_VARS,
  LAYERA_CARD_TOKENS,
  LAYERA_COLOR_APPLICATION,
  LAYERA_CORE_BORDERS,
  LAYERA_CORE_COLORS,
  LAYERA_CORE_DIMENSIONS,
  LAYERA_CORE_SPACING,
  LAYERA_CORE_TYPOGRAPHY,
  LAYERA_DYNAMIC_TOKENS,
  LAYERA_HEADER_LIVE_VARS,
  LAYERA_HEADER_TOKENS,
  LAYERA_LAYOUT_NAVIGATION_CLASSES,
  LAYERA_LAYOUT_OVERLAY_CLASSES,
  LAYERA_LAYOUT_UTILITY_CLASSES,
  LAYERA_LIVE_BORDER_VARS,
  LAYERA_LIVE_COLOR_VARS,
  LAYERA_LIVE_DIMENSION_VARS,
  LAYERA_LIVE_SIDEBAR_VARS,
  LAYERA_LIVE_SPACING_VARS,
  LAYERA_LIVE_TYPOGRAPHY_VARS,
  LAYERA_LIVE_VARIABLES,
  LAYERA_MODAL_LIVE_VARS,
  LAYERA_MODAL_TOKENS,
  LAYERA_PRESET_THEMES,
  LAYERA_RADIUS_PRESETS,
  LAYERA_SIDEBAR_COLORS,
  LAYERA_SIDEBAR_DIMENSIONS,
  LAYERA_SIDEBAR_TYPOGRAPHY,
  LAYERA_TABLE_LIVE_VARS,
  LAYERA_TABLE_TOKENS,
  LAYERA_TARGET_SELECTORS,
  LAYERA_TOKENS_BUILD_DATE,
  LAYERA_TOKENS_SOURCE,
  LAYERA_TOKENS_VERSION,
  LEGACY_COLOR_MAPPING,
  LEGACY_COMPONENT_MAPPING,
  LEGACY_CSS_CLASSES,
  applyAllLiveVariables,
  applyColorToElement,
  applyLegacyTokenMappings,
  applyPresetThemeToDOM,
  applyTheme,
  ensureLegacyCSSCompatibility,
  exportCSS,
  exportThemeAsJSON,
  generateMigrationReport,
  getAllLiveVariables,
  getBorderRadiusPreset,
  getButtonStateCSS,
  getButtonVariantCSS,
  getButtonVariants,
  getCardShadowCSS,
  getCardStateCSS,
  getCardVariantCSS,
  getCardVariants,
  getColorTypes,
  getCurrentPresetTheme,
  getCurrentTargetComponent,
  getCurrentThemeState,
  getDefaultDimension,
  getFullButtonCSS,
  getFullCardCSS,
  getLayeraColor,
  getLayeraFontFamily,
  getLayeraFontWeight,
  getLayeraSpacing,
  getLiveBorderRadiusVar,
  getLiveColorVar,
  getLiveDimensionVar,
  getLiveSidebarVar,
  getLiveSpacingVar,
  getLiveTypographyVar,
  getLiveVariable,
  getModalOverlayCSS,
  getModalVariantCSS,
  getModalVariants,
  getPresetTheme,
  getPresetThemeNames,
  getSidebarColors,
  getSidebarPositioning,
  getSidebarWidth,
  getTargetSelectors,
  getThemeAsLiveVariables,
  isValidPresetTheme,
  loadThemeState,
  migrateLegacyTokenName,
  resetLiveVariables,
  resetToDefaults,
  saveThemeState,
  setLiveVariable,
  setTargetComponent,
  updateAdvancedColor,
  updateAdvancedLayout,
  updateLiveColor,
  updateLiveLayout,
  validateBorderRadius,
  validateBorderWidth,
  validateButtonHeight,
  validateCardHeight,
  validateFontSize,
  validateLineHeight,
  validateModalWidth,
  validateSpacingValue
});
