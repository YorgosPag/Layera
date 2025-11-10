/**
 * TypeScript type definitions for constants
 * Ensures type safety when using configuration values
 */

import {
  APP_CONFIG,
  DEVICE_CONFIG,
  UI_CONFIG,
  COLORS,
  ANIMATION_CONFIG,
  MAP_CONFIG,
  FORM_CONFIG,
  NOTIFICATION_CONFIG,
  STEP_CONFIG,
  API_CONFIG,
  DEBUG_CONFIG
} from './index';

// Extract types from const assertions
export type AppConfig = typeof APP_CONFIG;
export type DeviceConfig = typeof DEVICE_CONFIG;
export type UIConfig = typeof UI_CONFIG;
export type Colors = typeof COLORS;
export type AnimationConfig = typeof ANIMATION_CONFIG;
export type MapConfig = typeof MAP_CONFIG;
export type FormConfig = typeof FORM_CONFIG;
export type NotificationConfig = typeof NOTIFICATION_CONFIG;
export type StepConfig = typeof STEP_CONFIG;
export type ApiConfig = typeof API_CONFIG;
export type DebugConfig = typeof DEBUG_CONFIG;

// Category types
export type CategoryType = 'property' | 'job';
export type StepId = keyof typeof STEP_CONFIG.stepIds;

// Device types
export type DeviceViewport = typeof DEVICE_CONFIG.iPhone14ProMax.viewport.id;

// Color scheme types
export type CategoryColorScheme = keyof typeof COLORS.categories;

// Combined configuration type
export interface LayeraConfig {
  app: AppConfig;
  device: DeviceConfig;
  ui: UIConfig;
  colors: Colors;
  animation: AnimationConfig;
  map: MapConfig;
  form: FormConfig;
  notification: NotificationConfig;
  step: StepConfig;
  api: ApiConfig;
  debug: DebugConfig;
}

// Utility type for extracting color values
export type CategoryColors = {
  [K in CategoryColorScheme]: typeof COLORS.categories[K];
};

// Position and dimension utility types
export interface Position {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
}

export interface Dimensions {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
}

export interface UIElement extends Position, Dimensions {
  zIndex?: number;
  gap?: number;
  padding?: number | string;
}