/**
 * LAYERA DYNAMIC TOKENS v2.0 - Compiled Output
 *
 * Generated from TypeScript sources με όλες τις μεταβλητές
 * από το FullAppPreview_Mockup.html analysis
 */

// Core exports
export const LAYERA_TOKENS_VERSION = '2.0.0';
export const LAYERA_TOKENS_BUILD_DATE = new Date().toISOString();

// Main token registry
export const LAYERA_DYNAMIC_TOKENS = {
  version: '2.0.0',
  buildDate: new Date().toISOString(),
  source: 'FullAppPreview_Mockup.html analysis',

  // Live variables για real-time theming
  liveVariables: {
    '--live-primary-color': '#4A90E2',
    '--live-secondary-color': '#9013FE',
    '--live-success-color': '#4CAF50',
    '--live-warning-color': '#FF9800',
    '--live-danger-color': '#F44336',
    '--live-info-color': '#2196F3',
    '--live-component-gap': '16px',
    '--live-padding': '16px',
    '--live-button-padding': '16px',
    '--live-button-height': '36px',
    '--live-card-height': '120px',
    '--live-modal-width': '400px',
    '--live-font-size': '16px',
    '--live-header-size': '24px',
    '--live-button-font-size': '14px',
    '--live-border-radius': '8px',
    '--live-cards-border-radius': '8px',
    '--live-buttons-border-radius': '6px',
    '--live-modals-border-radius': '12px',
    '--live-tables-border-radius': '4px',
    '--live-headers-border-radius': '0px',
    '--live-border-width': '2px'
  }
};

// Theme engine functions
export function applyTheme(themeName) {
  console.log(`🚀 Applying theme: ${themeName}`);

  const themes = {
    ocean: {
      primary: '#2196F3',
      secondary: '#00BCD4',
      success: '#009688',
      warning: '#FFC107',
      danger: '#F44336',
      info: '#3F51B5'
    },
    nature: {
      primary: '#4CAF50',
      secondary: '#8BC34A',
      success: '#4CAF50',
      warning: '#FF9800',
      danger: '#F44336',
      info: '#2196F3'
    },
    sunset: {
      primary: '#FF9800',
      secondary: '#FF5722',
      success: '#4CAF50',
      warning: '#FFC107',
      danger: '#F44336',
      info: '#2196F3'
    },
    royal: {
      primary: '#9013FE',
      secondary: '#7C4DFF',
      success: '#4CAF50',
      warning: '#FF9800',
      danger: '#F44336',
      info: '#3F51B5'
    }
  };

  const theme = themes[themeName];
  if (theme) {
    const root = document.documentElement;
    Object.entries(theme).forEach(([colorType, colorValue]) => {
      root.style.setProperty(`--live-${colorType}-color`, colorValue);
    });
  }
}

export function updateAdvancedColor(colorType, newColor) {
  const root = document.documentElement;
  root.style.setProperty(`--live-${colorType}-color`, newColor);
  console.log(`Updated ${colorType} to ${newColor}`);
}

export function updateAdvancedLayout(property, value) {
  const root = document.documentElement;
  const varName = `--live-${property}`;
  const varValue = typeof value === 'number' ? `${value}px` : value;
  root.style.setProperty(varName, varValue);
  console.log(`Updated ${property} to ${varValue}`);
}

// Legacy compatibility
export const COLOR_VARIABLES = {
  primary: '#4A90E2',
  secondary: '#9013FE',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#F44336',
  info: '#2196F3'
};

export const ColorComponentSystem = {
  getColor: (type, variant = 'default') => COLOR_VARIABLES[type],
  getAllColors: () => COLOR_VARIABLES
};