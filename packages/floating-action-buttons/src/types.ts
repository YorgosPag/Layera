/**
 * Floating Action Button Types - Enterprise Single Source of Truth
 *
 * Καθαροί domain types για FAB components χωρίς vendor dependencies
 */

export type FABSize = 'sm' | 'md' | 'lg';
export type FABVariant = 'success' | 'primary' | 'secondary' | 'danger' | 'warning';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'iphone';

export interface FABProps {
  /** Click handler για το FAB button */
  onClick: () => void;

  /** Icon element να εμφανιστεί μέσα στο FAB */
  icon?: React.ReactNode;

  /** Size του FAB - auto-adjusts per device type */
  size?: FABSize;

  /** Visual variant του FAB */
  variant?: FABVariant;

  /** Position του FAB στο container */
  position?: FABPosition;

  /** Device type για responsive behavior */
  deviceType?: DeviceType;

  /** Custom spacing από τα edges */
  spacing?: {
    right?: number;
    bottom?: number;
    left?: number;
    top?: number;
  };

  /** Αν το FAB είναι hidden */
  hidden?: boolean;

  /** Accessibility label */
  'aria-label'?: string;

  /** Tooltip text */
  title?: string;

  /** Test ID για testing */
  'data-testid'?: string;

  /** Custom styles που override τα defaults */
  style?: React.CSSProperties;

  /** Z-index για stacking order */
  zIndex?: number;

  /** ENTERPRISE: Enable draggable functionality */
  draggable?: boolean;

  /** ENTERPRISE: Initial position for draggable FAB */
  initialPosition?: {
    x?: number;
    y?: number;
    right?: number;
    bottom?: number;
  };

  /** ENTERPRISE: Constrain dragging to viewport/container */
  constrainToViewport?: boolean;

  /** ENTERPRISE: Viewport selector for simulation systems */
  viewportSelector?: string;

  /** ENTERPRISE: Position type for simulation compatibility */
  positionType?: 'fixed' | 'viewport-relative';
}

export interface ResponsiveFABConfig {
  mobile: {
    size: number;
    spacing: { right: number; bottom: number; };
  };
  tablet: {
    size: number;
    spacing: { right: number; bottom: number; };
  };
  desktop: {
    size: number;
    spacing: { right: number; bottom: number; };
  };
  iphone: {
    size: number;
    spacing: { right: number; bottom: number; };
  };
}