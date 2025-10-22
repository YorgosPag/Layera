import React$1 from 'react';

/**
 * Floating Action Button Types - Enterprise Single Source of Truth
 *
 * Καθαροί domain types για FAB components χωρίς vendor dependencies
 */
type FABSize = 'sm' | 'md' | 'lg';
type FABVariant = 'success' | 'primary' | 'secondary' | 'danger' | 'warning';
type FABPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'iphone';
interface FABProps {
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
interface ResponsiveFABConfig {
    mobile: {
        size: number;
        spacing: {
            right: number;
            bottom: number;
        };
    };
    tablet: {
        size: number;
        spacing: {
            right: number;
            bottom: number;
        };
    };
    desktop: {
        size: number;
        spacing: {
            right: number;
            bottom: number;
        };
    };
    iphone: {
        size: number;
        spacing: {
            right: number;
            bottom: number;
        };
    };
}

/**
 * UnifiedFAB.tsx - Enterprise Floating Action Button
 *
 * Single source of truth για FAB components στο Layera ecosystem.
 * Αντικαθιστά όλα τα duplicate FAB implementations με unified API.
 */

declare const UnifiedFAB: React$1.FC<FABProps>;
interface ResponsiveFABProps extends Omit<FABProps, 'deviceType'> {
    /** Override auto-detection με συγκεκριμένο device type */
    forceDeviceType?: DeviceType;
}
declare const ResponsiveFAB: React$1.FC<ResponsiveFABProps>;

export { ResponsiveFAB as AutoFAB, type DeviceType, UnifiedFAB as FAB, type FABPosition, type FABProps, type FABSize, type FABVariant, ResponsiveFAB, type ResponsiveFABConfig, type ResponsiveFABProps, UnifiedFAB };
