/**
 * @layera/map-labels - TypeScript Type Definitions
 *
 * Enterprise LEGO system για intelligent map annotations.
 * Strict typing compliance - ΚΑΜΙΑ ΧΡΗΣΗ any types.
 */

import React from "react";
import type { LatLng } from 'leaflet';

/**
 * Label variants για consistent styling
 */
export type LabelVariant =
  | 'title'       // Boundary names, main headings
  | 'subtitle'    // Secondary information
  | 'area'        // Area calculations
  | 'distance'    // Distance measurements
  | 'info'        // General information
  | 'warning'     // Warning messages
  | 'success';    // Success states

/**
 * Background styling options
 */
export type LabelBackground =
  | 'transparent'     // No background
  | 'solid'          // Opaque background
  | 'semi-transparent'; // Semi-transparent overlay

/**
 * Text alignment options
 */
export type LabelAlign = 'left' | 'center' | 'right';

/**
 * Area measurement units
 */
export type AreaUnit = 'km²' | 'm²' | 'hectares';

/**
 * Distance measurement units
 */
export type DistanceUnit = 'km' | 'm' | 'miles' | 'feet';

/**
 * Animation configuration
 */
export interface LabelAnimation {
  /** Enable fade-in animation */
  fadeIn: boolean;
  /** Animation duration in milliseconds */
  duration: number;
  /** Animation easing function */
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

/**
 * Core MapLabel component props
 */
export interface MapLabelProps {
  /** Text to display στο label */
  text: string;

  /** Position coordinates στο χάρτη */
  position: LatLng;

  /** Label variant για styling */
  variant?: LabelVariant;

  /** Background styling */
  background?: LabelBackground;

  /** Text alignment */
  align?: LabelAlign;

  /** Minimum zoom level για visibility */
  minZoom?: number;

  /** Maximum zoom level για visibility */
  maxZoom?: number;

  /** Click handler */
  onClick?: () => void;

  /** Custom CSS className */
  className?: string;

  /** Animation configuration */
  animation?: LabelAnimation;

  /** Z-index για layering */
  zIndex?: number;

  /** Custom inline styles */
  style?: React.CSSProperties;
}

/**
 * Boundary geometry interface
 */
export interface BoundaryGeometry {
  /** Array of coordinates που σχηματίζουν το boundary */
  coordinates: LatLng[];

  /** Boundary properties από OSM */
  properties: {
    /** Official name του boundary */
    name: string;
    /** Administrative level (4=region, 6=regional_unit, 8=municipality) */
    admin_level: string;
    /** Boundary type */
    boundary: string;
    /** Optional population data */
    population?: number;
    /** Optional area in square meters */
    area?: number;
  };
}

/**
 * Display configuration για boundary labels
 */
export interface BoundaryDisplayConfig {
  /** Show boundary title/name */
  showTitle: boolean;

  /** Show calculated area */
  showArea: boolean;

  /** Show calculated perimeter */
  showPerimeter: boolean;

  /** Show population if available */
  showPopulation: boolean;

  /** Unit για area display */
  areaUnit: AreaUnit;

  /** Unit για distance display */
  distanceUnit: DistanceUnit;

  /** Number of decimal places για calculations */
  precision: number;
}

/**
 * Styling configuration για boundary labels
 */
export interface BoundaryLabelStyling {
  /** Typography variant για title */
  titleVariant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /** Background color */
  backgroundColor: string;

  /** Text color */
  textColor: string;

  /** Enable border */
  border: boolean;

  /** Border color */
  borderColor?: string;

  /** Custom padding */
  padding?: string;

  /** Custom margin */
  margin?: string;
}

/**
 * BoundaryLabel component props
 */
export interface BoundaryLabelProps {
  /** Boundary geometry για positioning και calculations */
  boundary: BoundaryGeometry;

  /** Display configuration */
  displayConfig: BoundaryDisplayConfig;

  /** Styling configuration */
  styling?: Partial<BoundaryLabelStyling>;

  /** Zoom-based visibility */
  minZoom?: number;
  maxZoom?: number;

  /** Animation settings */
  animation?: LabelAnimation;

  /** Custom className */
  className?: string;

  /** Click handler */
  onClick?: (boundary: BoundaryGeometry) => void;
}

/**
 * AreaLabel component props
 */
export interface AreaLabelProps {
  /** Polygon coordinates για area calculation */
  coordinates: LatLng[];

  /** Position για label display */
  position: LatLng;

  /** Area unit για display */
  unit: AreaUnit;

  /** Decimal precision */
  precision?: number;

  /** Label variant */
  variant?: 'compact' | 'detailed' | 'minimal';

  /** Zoom-based visibility */
  minZoom?: number;
  maxZoom?: number;

  /** Custom styling */
  style?: React.CSSProperties;

  /** Custom className */
  className?: string;
}

/**
 * Calculated area result
 */
export interface AreaCalculationResult {
  /** Area in square meters */
  squareMeters: number;

  /** Area in square kilometers */
  squareKilometers: number;

  /** Area in hectares */
  hectares: number;

  /** Formatted string για display */
  formatted: string;

  /** Calculation confidence (0-1) */
  confidence: number;
}

/**
 * Label positioning options
 */
export interface LabelPositioning {
  /** Positioning strategy */
  strategy: 'centroid' | 'largest-inscribed-circle' | 'visual-center' | 'custom';

  /** Custom offset από calculated position */
  offset?: {
    x: number;
    y: number;
  };

  /** Avoid overlapping με άλλα labels */
  avoidOverlap: boolean;

  /** Minimum distance από boundaries */
  marginFromEdge?: number;
}

/**
 * Label visibility configuration
 */
export interface LabelVisibilityConfig {
  /** Zoom-based visibility */
  zoomRange?: {
    min: number;
    max: number;
  };

  /** Hide when overlapping */
  hideOnOverlap?: boolean;

  /** Fade out when partially visible */
  fadeOnEdge?: boolean;

  /** Priority για overlap resolution (higher = more important) */
  priority?: number;
}

/**
 * Hook return type για area calculation
 */
export interface UseAreaCalculationReturn {
  /** Calculated area results */
  area: AreaCalculationResult | null;

  /** Calculation is in progress */
  isCalculating: boolean;

  /** Calculation error */
  error: string | null;

  /** Recalculate area */
  recalculate: () => React.ReactNode;
}

/**
 * Hook return type για label positioning
 */
export interface UseMapLabelReturn {
  /** Optimal position για label */
  position: LatLng | null;

  /** Label should be visible */
  isVisible: boolean;

  /** Position calculation is in progress */
  isCalculating: boolean;

  /** Positioning error */
  error: string | null;
}

/**
 * Map label event types
 */
export interface MapLabelEvents {
  /** Label was clicked */
  onClick: (label: MapLabelProps) => React.ReactNode;

  /** Label became visible */
  onVisible: (label: MapLabelProps) => React.ReactNode;

  /** Label became hidden */
  onHidden: (label: MapLabelProps) => React.ReactNode;

  /** Label position changed */
  onPositionChange: (label: MapLabelProps, newPosition: LatLng) => React.ReactNode;
}

/**
 * Label manager configuration
 */
export interface LabelManagerConfig {
  /** Maximum number of visible labels */
  maxVisibleLabels?: number;

  /** Global animation settings */
  globalAnimation?: LabelAnimation;

  /** Collision detection enabled */
  collisionDetection?: boolean;

  /** Performance optimization level */
  performanceLevel?: 'low' | 'medium' | 'high';
}