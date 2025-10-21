import React, { ReactNode } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';
type Orientation = 'portrait' | 'landscape';
interface ViewportInfo {
    deviceType: DeviceType;
    orientation: Orientation;
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isPortrait: boolean;
    isLandscape: boolean;
}
interface ViewportBreakpoints {
    mobile: number;
    tablet: number;
    desktop: number;
}
interface ResponsiveConfig {
    mobile: {
        breakpoint: number;
        maxWidth?: string;
        padding?: string;
        gridColumns?: number;
    };
    tablet: {
        breakpoint: number;
        maxWidth?: string;
        padding?: string;
        gridColumns?: number;
    };
    desktop: {
        breakpoint: number;
        maxWidth?: string;
        padding?: string;
        gridColumns?: number;
    };
}

/**
 * Enterprise Viewport Hook
 * Provides real-time device type detection with SSR support
 */
declare const useViewport: () => ViewportInfo;
/**
 * Convenience hooks για specific device checks
 */
declare const useIsMobile: () => boolean;
declare const useIsTablet: () => boolean;
declare const useIsDesktop: () => boolean;
declare const useOrientation: () => Orientation;

interface ResponsiveContainerProps {
    children: React.ReactNode;
    config?: Partial<ResponsiveConfig>;
    className?: string;
    style?: React.CSSProperties;
    enablePadding?: boolean;
    enableMaxWidth?: boolean;
}
/**
 * Enterprise Responsive Container
 * Automatically adapts content based on device type
 */
declare const ResponsiveContainer: React.FC<ResponsiveContainerProps>;
/**
 * Device-specific visibility components
 */
declare const MobileOnly: React.FC<{
    children: React.ReactNode;
}>;
declare const TabletOnly: React.FC<{
    children: React.ReactNode;
}>;
declare const DesktopOnly: React.FC<{
    children: React.ReactNode;
}>;
declare const MobileAndTablet: React.FC<{
    children: React.ReactNode;
}>;
declare const TabletAndDesktop: React.FC<{
    children: React.ReactNode;
}>;

interface ViewportDebuggerProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    showAlways?: boolean;
    compact?: boolean;
}
/**
 * Enterprise Viewport Debugger
 * Shows current device type, dimensions, and orientation
 * Χρήσιμο για development και testing responsive behavior
 */
declare const ViewportDebugger: React.FC<ViewportDebuggerProps>;

/**
 * Provider για device override functionality
 */
declare const DeviceOverrideProvider: React.FC<{
    children: ReactNode;
}>;
/**
 * Enhanced useViewport hook που υποστηρίζει manual override
 */
declare const useViewportWithOverride: () => ViewportInfo;
interface DeviceSwitcherProps {
    position?: 'top-left' | 'top-center' | 'top-right';
    showInProduction?: boolean;
    labels?: {
        auto?: string;
        mobile?: string;
        tablet?: string;
        desktop?: string;
        overrideActive?: string;
    };
}
/**
 * Device Switcher Button για manual testing
 */
declare const DeviceSwitcher: React.FC<DeviceSwitcherProps>;

export { DesktopOnly, DeviceOverrideProvider, DeviceSwitcher, type DeviceType, MobileAndTablet, MobileOnly, type Orientation, type ResponsiveConfig, ResponsiveContainer, TabletAndDesktop, TabletOnly, type ViewportBreakpoints, ViewportDebugger, type ViewportInfo, useIsDesktop, useIsMobile, useIsTablet, useOrientation, useViewport, useViewportWithOverride };
