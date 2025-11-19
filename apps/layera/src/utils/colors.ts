/**
 * Color Utility Functions - Single Source of Truth
 *
 * Consolidated color manipulation utilities
 * Eliminates duplicate functions across components
 */

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
 * @returns Clean hex color string
 */
export const extractHexFromValue = (colorValue: string): string => {
  if (!colorValue) return 'var(--layera-colors-text-primary)';
  if (colorValue.startsWith('#')) return colorValue;

  // CSS variable fallback
  const match = colorValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
  return match ? match[1] : 'var(--layera-colors-text-primary)';
};