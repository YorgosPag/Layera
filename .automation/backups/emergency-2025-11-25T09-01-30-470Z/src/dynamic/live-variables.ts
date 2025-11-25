/**
 * 🔄 LIVE VARIABLES - Dynamic CSS Variables Management
 *
 * Centralized management για όλες τις --live-* variables που χρησιμοποιεί
 * το FullAppPreview_Mockup.html για real-time theming.
 *
 * Compatible με updateAdvancedColor() και updateAdvancedLayout() functions
 */

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 LIVE VARIABLE REGISTRY - Όλες οι --live-* variables από HTML mockup
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_LIVE_VARIABLES = {
  // Colors - από updateAdvancedColor()
  colors: {
    '--live-primary-color': '#4A90E2',
    '--live-secondary-color': '#9013FE',
    '--live-success-color': '#4CAF50',
    '--live-warning-color': '#FF9800',
    '--live-danger-color': '#F44336',
    '--live-info-color': '#2196F3'
  },

  // Border Radius - per component από HTML mockup
  borderRadius: {
    '--live-cards-border-radius': '8px',
    '--live-buttons-border-radius': '6px',
    '--live-modals-border-radius': '12px',
    '--live-tables-border-radius': '4px',
    '--live-headers-border-radius': '0px',
    '--live-border-radius': '8px'  // Global
  },

  // Spacing - από updateAdvancedLayout()
  spacing: {
    '--live-component-gap': '16px',
    '--live-padding': '16px',
    '--live-button-padding': '16px'
  },

  // Typography - από updateFont* functions
  typography: {
    '--live-font-family': 'system-ui, -apple-system, sans-serif',
    '--live-font-size': '16px',
    '--live-header-size': '24px',
    '--live-button-font-size': '14px',
    '--live-font-weight': '400',
    '--live-line-height': '1.5',
    '--live-text-color': '#2c3e50'
  },

  // Dimensions - από HTML mockup dimension controls
  dimensions: {
    '--live-button-height': '36px',
    '--live-card-height': '120px',
    '--live-modal-width': '400px'
  },

  // Border Width - από HTML mockup
  borders: {
    '--live-border-width': '2px'
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 VARIABLE UTILITIES - Helper functions για DOM manipulation
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Εφαρμόζει όλες τις live variables στο document root
 */
export function applyAllLiveVariables(): void {
  const root = document.documentElement;

  // Apply όλες τις categories
  Object.values(LAYERA_LIVE_VARIABLES).forEach(category => {
    Object.entries(category).forEach(([varName, varValue]) => {
      root.style.setProperty(varName, varValue);
    });
  });
}

/**
 * Εφαρμόζει συγκεκριμένη live variable - Compatible με HTML mockup updateAdvancedColor()
 */
export function setLiveVariable(varName: string, value: string): void {
  document.documentElement.style.setProperty(varName, value);
}

/**
 * Παίρνει την τρέχουσα τιμή live variable
 */
export function getLiveVariable(varName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

/**
 * Update color variable - Compatible με HTML mockup updateAdvancedColor(colorType, newColor)
 */
export function updateLiveColor(colorType: string, newColor: string): void {
  const varName = `--live-${colorType}-color`;
  setLiveVariable(varName, newColor);

  // Log για consistency με HTML mockup
  console.log(`Updated ${colorType} to ${newColor}`);
}

/**
 * Update layout variable - Compatible με HTML mockup updateAdvancedLayout(property, value)
 */
export function updateLiveLayout(property: string, value: number | string): void {
  const varName = `--live-${property}`;
  const varValue = typeof value === 'number' ? `${value}px` : value;
  setLiveVariable(varName, varValue);

  console.log(`Updated ${property} to ${varValue}`);
}

/**
 * Reset όλες τις live variables στις default τιμές
 */
export function resetLiveVariables(): void {
  applyAllLiveVariables();
  console.log('Reset all live variables to defaults');
}

/**
 * Get όλες τις live variables ως object για export/debugging
 */
export function getAllLiveVariables(): Record<string, string> {
  const root = document.documentElement;
  const allVars: Record<string, string> = {};

  // Συλλέγουμε όλες τις --live-* variables
  Object.values(LAYERA_LIVE_VARIABLES).forEach(category => {
    Object.keys(category).forEach(varName => {
      const value = getComputedStyle(root).getPropertyValue(varName).trim();
      if (value) {
        allVars[varName] = value;
      }
    });
  });

  return allVars;
}