/**
 * 🔲 LAYERA BORDERS VARIANTS - Semantic border combinations
 *
 * Προκαθορισμένες συνδυασμοί border tokens για συγκεκριμένες χρήσεις
 * Component-ready border variants που χαρτογραφούν στο core scale
 */

import { BORDER_WIDTH_SCALE, BORDER_RADIUS_SCALE, BORDER_STYLE_SCALE } from './borders.variables';

// SEMANTIC BORDER VARIANTS - Meaning-based border combinations
export const BORDER_VARIANTS = {
  // No borders
  none: {
    width: BORDER_WIDTH_SCALE[0],
    style: BORDER_STYLE_SCALE.none,
    radius: BORDER_RADIUS_SCALE[0],
  },

  // Subtle borders
  subtle: {
    width: BORDER_WIDTH_SCALE[1],
    style: BORDER_STYLE_SCALE.solid,
    radius: BORDER_RADIUS_SCALE[4],
  },

  // Default borders
  default: {
    width: BORDER_WIDTH_SCALE[1],
    style: BORDER_STYLE_SCALE.solid,
    radius: BORDER_RADIUS_SCALE[6],
  },

  // Emphasized borders
  emphasized: {
    width: BORDER_WIDTH_SCALE[2],
    style: BORDER_STYLE_SCALE.solid,
    radius: BORDER_RADIUS_SCALE[8],
  },

  // Strong borders
  strong: {
    width: BORDER_WIDTH_SCALE[3],
    style: BORDER_STYLE_SCALE.solid,
    radius: BORDER_RADIUS_SCALE[12],
  },

  // Rounded variants
  rounded: {
    width: BORDER_WIDTH_SCALE[1],
    style: BORDER_STYLE_SCALE.solid,
    radius: BORDER_RADIUS_SCALE[16],
  },

  // Pill/capsule borders
  pill: {
    width: BORDER_WIDTH_SCALE[1],
    style: BORDER_STYLE_SCALE.solid,
    radius: BORDER_RADIUS_SCALE.full,
  },

  // Focus borders (για interactive elements)
  focus: {
    width: BORDER_WIDTH_SCALE[2],
    style: BORDER_STYLE_SCALE.solid,
    radius: BORDER_RADIUS_SCALE[6],
  },

  // Dashed borders για drag zones
  dashed: {
    width: BORDER_WIDTH_SCALE[2],
    style: BORDER_STYLE_SCALE.dashed,
    radius: BORDER_RADIUS_SCALE[8],
  },
} as const;

// Helper types
export type BorderVariant = keyof typeof BORDER_VARIANTS;