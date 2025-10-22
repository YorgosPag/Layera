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