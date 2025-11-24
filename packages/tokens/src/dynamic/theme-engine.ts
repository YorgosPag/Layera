/**
 * 🎭 THEME ENGINE - Dynamic theme management system
 *
 * Central engine που ενσωματώνει όλες τις θεματικές λειτουργίες:
 * - Preset theme application
 * - Live variable updates
 * - Component targeting
 * - Theme persistence
 *
 * Compatible με όλες τις functions από το FullAppPreview_Mockup.html
 */

import {
  getPresetTheme,
  applyPresetThemeToDOM,
  type LayeraPresetTheme
} from '../themes/presets';
import {
  updateLiveColor,
  updateLiveLayout,
  resetLiveVariables,
  getAllLiveVariables
} from './live-variables';
import type { LayeraColorType } from '../core/colors';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 THEME ENGINE STATE - Current theme tracking
// ═══════════════════════════════════════════════════════════════════════════════════════

interface ThemeEngineState {
  currentPresetTheme: LayeraPresetTheme | null;
  currentTargetComponent: string;
  customColors: Record<string, string>;
  customLayout: Record<string, string | number>;
}

let themeState: ThemeEngineState = {
  currentPresetTheme: null,
  currentTargetComponent: 'all',
  customColors: {},
  customLayout: {}
};

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎨 THEME APPLICATION FUNCTIONS - Compatible με HTML mockup
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Apply preset theme - Compatible με HTML mockup applyTheme(themeName)
 */
export function applyTheme(themeName: LayeraPresetTheme): void {
  console.log(`🚀 applyTheme called with: ${themeName}`);

  // Apply theme colors
  applyPresetThemeToDOM(themeName);

  // Update state
  themeState.currentPresetTheme = themeName;

  // Trigger any preset theme buttons to update their active state
  updatePresetButtonStates(themeName);

  console.log(`✅ Applied theme: ${themeName}`);
}

/**
 * Update individual color - Compatible με HTML mockup updateAdvancedColor(colorType, newColor)
 */
export function updateAdvancedColor(colorType: string, newColor: string): void {
  console.log(`Updating ${colorType} to ${newColor} for target: ${themeState.currentTargetComponent}`);

  // Update live variable
  updateLiveColor(colorType, newColor);

  // Store custom color
  themeState.customColors[colorType] = newColor;

  // Clear preset theme since we have custom colors
  if (themeState.currentPresetTheme) {
    themeState.currentPresetTheme = null;
    updatePresetButtonStates(null);
  }
}

/**
 * Update layout property - Compatible με HTML mockup updateAdvancedLayout(property, value)
 */
export function updateAdvancedLayout(property: string, value: number | string): void {
  console.log(`Updating layout ${property} to ${value} for target: ${themeState.currentTargetComponent}`);

  // Update live variable
  updateLiveLayout(property, value);

  // Store custom layout
  themeState.customLayout[property] = value;
}

/**
 * Set target component - Compatible με HTML mockup setTargetComponent(target)
 */
export function setTargetComponent(target: string): void {
  themeState.currentTargetComponent = target;
  console.log(`Target component set to: ${target}`);

  // Update any UI elements that show current target
  updateTargetButtonStates(target);
}

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔄 THEME PERSISTENCE - Local storage integration
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Save current theme state to localStorage
 */
export function saveThemeState(): void {
  const stateToSave = {
    ...themeState,
    liveVariables: getAllLiveVariables()
  };

  localStorage.setItem('layera-theme-state', JSON.stringify(stateToSave));
  console.log('💾 Theme state saved');
}

/**
 * Load theme state from localStorage
 */
export function loadThemeState(): void {
  const savedState = localStorage.getItem('layera-theme-state');

  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState);

      // Restore preset theme if exists
      if (parsedState.currentPresetTheme) {
        applyTheme(parsedState.currentPresetTheme);
      }

      // Restore custom colors
      Object.entries(parsedState.customColors || {}).forEach(([colorType, color]) => {
        updateLiveColor(colorType, color as string);
      });

      // Restore custom layout
      Object.entries(parsedState.customLayout || {}).forEach(([property, value]) => {
        updateLiveLayout(property, value);
      });

      // Restore target component
      if (parsedState.currentTargetComponent) {
        setTargetComponent(parsedState.currentTargetComponent);
      }

      console.log('📂 Theme state loaded');
    } catch (error) {
      console.warn('Failed to load theme state:', error);
      resetLiveVariables();
    }
  }
}

/**
 * Clear theme state and reset to defaults
 */
export function resetToDefaults(): void {
  console.log('🔄 Resetting to defaults');

  // Reset live variables
  resetLiveVariables();

  // Clear state
  themeState = {
    currentPresetTheme: null,
    currentTargetComponent: 'all',
    customColors: {},
    customLayout: {}
  };

  // Clear localStorage
  localStorage.removeItem('layera-theme-state');

  // Update UI states
  updatePresetButtonStates(null);
  updateTargetButtonStates('all');

  console.log('✅ Reset complete');
}

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 UI STATE MANAGEMENT - Button states και visual feedback
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Update preset theme button states
 */
function updatePresetButtonStates(activeTheme: LayeraPresetTheme | null): void {
  document.querySelectorAll('[data-theme]').forEach(button => {
    const buttonTheme = (button as HTMLElement).dataset.theme;
    if (buttonTheme === activeTheme) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

/**
 * Update target component button states
 */
function updateTargetButtonStates(activeTarget: string): void {
  document.querySelectorAll('[data-target]').forEach(button => {
    const buttonTarget = (button as HTMLElement).dataset.target;
    const element = button as HTMLElement;

    if (buttonTarget === activeTarget) {
      element.style.background = '#4A90E2';
      element.style.borderColor = '#4A90E2';
      element.style.color = 'white';
      element.classList.add('active');
    } else {
      element.style.background = 'transparent';
      element.style.borderColor = '#666';
      element.style.color = '#ccc';
      element.classList.remove('active');
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📊 THEME EXPORT/IMPORT - CSS & JSON export για sharing
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Export current theme as CSS - Compatible με HTML mockup exportCSS()
 */
export function exportCSS(): string {
  const variables = getAllLiveVariables();
  let css = ':root {\n';

  Object.entries(variables).forEach(([varName, varValue]) => {
    css += `  ${varName}: ${varValue};\n`;
  });

  css += '}';

  console.log('📤 CSS exported');
  return css;
}

/**
 * Export current theme as JSON
 */
export function exportThemeAsJSON(): string {
  const themeData = {
    presetTheme: themeState.currentPresetTheme,
    customColors: themeState.customColors,
    customLayout: themeState.customLayout,
    liveVariables: getAllLiveVariables(),
    exportedAt: new Date().toISOString()
  };

  return JSON.stringify(themeData, null, 2);
}

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 GETTERS - Current state access
// ═══════════════════════════════════════════════════════════════════════════════════════

export function getCurrentThemeState(): Readonly<ThemeEngineState> {
  return { ...themeState };
}

export function getCurrentTargetComponent(): string {
  return themeState.currentTargetComponent;
}

export function getCurrentPresetTheme(): LayeraPresetTheme | null {
  return themeState.currentPresetTheme;
}