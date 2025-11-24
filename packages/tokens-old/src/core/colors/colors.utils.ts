/**
 * Color Utility Functions - Enterprise Token System
 *
 * 🎨 Centralized color manipulation utilities
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Single Source of Truth για color utilities
 * - Enterprise standards compliance
 */

import {
  SEMANTIC_COLORS,
  SURFACE_COLORS,
  TEXT_COLORS,
  PRIMARY_COLORS,
  SECONDARY_COLORS,
} from './colors.variables';

/**
 * Converts hex color to RGBA string
 * @param hex - Hex color string (with or without #)
 * @param alpha - Alpha value (0-1)
 * @returns RGBA color string
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  // Clean hex value
  let cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Handle CSS variables
  if (hex.includes('var(')) {
    cleanHex = '000000'; // Fallback for CSS variables
  }

  // Ensure 6-digit format
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }

  // Parse RGB components
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  // Clamp alpha value
  const clampedAlpha = Math.max(0, Math.min(1, alpha));

  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
};

/**
 * Extracts hex value from CSS variable or returns hex directly
 * @param colorValue - Color value (hex, CSS variable, etc.)
 * @returns Clean hex color string - χρησιμοποιεί ΜΟΝΟ υπάρχουσες token τιμές
 */
export const extractHexFromValue = (colorValue: string): string => {
  if (!colorValue) return TEXT_COLORS.primary;
  if (colorValue.startsWith('#')) return colorValue;

  // Χρησιμοποίηση υπαρχόντων token HEX τιμών
  if (colorValue.includes('surface-primary')) return SURFACE_COLORS.primary;
  if (colorValue.includes('surface-secondary')) return SURFACE_COLORS.secondary;
  if (colorValue.includes('text-primary')) return TEXT_COLORS.primary;
  if (colorValue.includes('text-secondary')) return TEXT_COLORS.secondary;
  if (colorValue.includes('semantic-success')) return SEMANTIC_COLORS.success.main;
  if (colorValue.includes('semantic-warning')) return SEMANTIC_COLORS.warning.main;
  if (colorValue.includes('semantic-error')) return SEMANTIC_COLORS.error.main;
  if (colorValue.includes('semantic-info')) return SEMANTIC_COLORS.info.main;
  if (colorValue.includes('color-primary')) return PRIMARY_COLORS[500];
  if (colorValue.includes('color-secondary')) return SECONDARY_COLORS[500];

  // CSS variable fallback with real HEX extraction
  const match = colorValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
  return match ? match[1] : TEXT_COLORS.primary;
};