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

/**
 * DeviceSimulator Component
 * Εξομοιώνει διαφορετικές συσκευές για testing και development
 */

interface DeviceSimulatorProps {
    children: React.ReactNode;
    className?: string;
}
/**
 * DeviceSimulator - Wrapper component για device simulation
 * Χρησιμοποιείται σε conjunction με DeviceOverrideProvider
 */
declare const DeviceSimulator: React.FC<DeviceSimulatorProps>;

type DeviceModel = 'iPhone X' | 'iPhone 8' | 'iPhone 8 Plus' | 'iPhone 12 Pro' | 'iPhone 14 Pro Max' | 'Samsung Galaxy S21' | 'Samsung Galaxy S22' | 'Samsung Galaxy S22 Ultra' | 'Samsung Galaxy S23' | 'Samsung Galaxy S23 Ultra' | 'Samsung Galaxy S24' | 'Samsung Galaxy S24 Ultra' | 'Samsung Galaxy A35' | 'Samsung Galaxy Z Fold 5' | 'Samsung Galaxy Z Flip 5' | 'Google Pixel 5' | 'iPad Air' | 'iPad Pro 11"' | 'iPad Pro 12.9"' | 'Surface Pro 7' | 'MacBook Pro 13"' | 'iMac 24"';
interface DeviceSpecs {
    width: number;
    height: number;
    scale: number;
    hasNotch: boolean;
    hasHomeBar: boolean;
    borderRadius: number;
    frameColor: string;
}
interface DeviceModelSelectorProps {
    onModelSelect: (model: DeviceModel | null) => void;
    currentModel: DeviceModel | null;
}
declare const DeviceModelSelector: React.FC<DeviceModelSelectorProps>;
declare const getDeviceSpecs: (model: DeviceModel) => DeviceSpecs;

export { DesktopOnly, type DeviceModel, DeviceModelSelector, DeviceOverrideProvider, DeviceSimulator, type DeviceType, MobileAndTablet, MobileOnly, type Orientation, type ResponsiveConfig, ResponsiveContainer, TabletAndDesktop, TabletOnly, type ViewportBreakpoints, ViewportDebugger, type ViewportInfo, getDeviceSpecs, useIsDesktop, useIsMobile, useIsTablet, useOrientation, useViewport, useViewportWithOverride };
