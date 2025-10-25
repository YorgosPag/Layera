import React$1, { ReactNode } from 'react';

/**
 * Core layout types for the Layera Layout System
 */
type LayoutVariant = 'dashboard' | 'fullscreen' | 'fullscreen-map' | 'minimal' | 'dual-sidebar';
type HeaderVariant = 'minimal' | 'standard' | 'rich';
type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full' | number;
type SpacingSize = 'none' | 'sm' | 'md' | 'lg';
type BreakpointSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Component prop interfaces for Layera Layout System
 */
interface AppShellProps {
    children: ReactNode;
    header?: ReactNode;
    sidebar?: ReactNode;
    footer?: ReactNode;
    layout?: LayoutVariant;
    className?: string;
    sidebarCollapsed?: boolean;
    onSidebarToggle?: (collapsed: boolean) => void;
}
interface LayeraHeaderProps {
    title: string;
    subtitle?: string;
    logo?: ReactNode;
    navigation?: ReactNode;
    actions?: ReactNode;
    variant?: HeaderVariant;
    sticky?: boolean;
    className?: string;
}
interface PageContainerProps$1 {
    children: ReactNode;
    maxWidth?: ContainerMaxWidth;
    padding?: SpacingSize;
    className?: string;
}
interface PageHeaderProps$1 {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
    breadcrumbs?: ReactNode;
    className?: string;
}
interface HeaderActionsGroupProps {
    children: ReactNode;
    className?: string;
}

/**
 * AppShell - Core layout component που παρέχει unified structure
 * για όλες τις Layera εφαρμογές
 */
declare const AppShell: React$1.FC<AppShellProps>;

/**
 * LayeraHeader - Standardized header component με flexible variants
 * για διαφορετικούς τύπους εφαρμογών
 */
declare const LayeraHeader: React$1.FC<LayeraHeaderProps>;

/**
 * HeaderActionsGroup - Container για header actions με proper spacing
 */
declare const HeaderActionsGroup: React$1.FC<HeaderActionsGroupProps>;

interface StackProps {
    children: React$1.ReactNode;
    spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    direction?: 'vertical' | 'horizontal';
    align?: 'start' | 'center' | 'end' | 'stretch';
    className?: string;
    style?: React$1.CSSProperties;
}
declare const Stack: React$1.FC<StackProps>;

interface FlexProps {
    children: React$1.ReactNode;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    style?: React$1.CSSProperties;
}
declare const Flex: React$1.FC<FlexProps>;

interface PageContainerProps {
    children: React$1.ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}
/**
 * PageContainer - Enterprise container για page content
 * Παρέχει consistent layout με responsive breakpoints
 */
declare const PageContainer: React$1.FC<PageContainerProps>;

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React$1.ReactNode;
    className?: string;
    actions?: React$1.ReactNode;
}
/**
 * PageHeader - Enterprise header για pages
 * Παρέχει consistent styling για page titles και actions
 */
declare const PageHeader: React$1.FC<PageHeaderProps>;

/**
 * GeoAlert Layout System Types
 * Enterprise layout types για GeoAlert step system
 */
type GeoAlertCardLayoutVariant = 'horizontal' | 'vertical' | 'smart-triple';
interface GeoAlertLayoutConfig {
    /** Stepper height σε pixels */
    stepperHeight: number;
    /** Gap μεταξύ stepper και καρτών σε pixels */
    stepperToCardsGap: number;
    /** Gap μεταξύ καρτών σε pixels */
    cardsGap: number;
    /** Ύψος κάθε κάρτας σε pixels */
    cardHeight: number;
    /** Side margins σε pixels */
    sideMargins: number;
}
interface GeoAlertCalculatedPositions {
    /** Top position για κάρτες */
    cardsTop: string;
    /** Top position για InfoPanel */
    infoPanelTop: string;
    /** Left position */
    left: string;
    /** Right position */
    right: string;
    /** Gap μεταξύ καρτών */
    gap: string;
}
interface GeoAlertCardContainerProps {
    /** Layout variant */
    variant?: GeoAlertCardLayoutVariant;
    /** Custom CSS class */
    className?: string;
    /** Children (κάρτες) */
    children: React.ReactNode;
}
interface GeoAlertInfoPanelProps {
    /** Αν είναι mobile ή desktop */
    isMobile?: boolean;
    /** Custom CSS class */
    className?: string;
    /** Children (InfoPanel content) */
    children: React.ReactNode;
}

/**
 * useGeoAlertLayout Hook
 * Enterprise hook για GeoAlert layout management
 */

interface UseGeoAlertLayoutReturn {
    /** Current layout configuration */
    config: GeoAlertLayoutConfig;
    /** Calculated positions */
    positions: {
        cardsTop: string;
        infoPanelTop: string;
        left: string;
        right: string;
        gap: string;
    };
    /** Utility functions */
    utils: {
        /** Get styles for card container */
        getCardStyles: (variant?: GeoAlertCardLayoutVariant) => React.CSSProperties;
        /** Get styles for info panel */
        getInfoPanelStyles: () => React.CSSProperties;
        /** Update layout configuration dynamically */
        updateConfig: (newConfig: Partial<GeoAlertLayoutConfig>) => void;
        /** Get CSS class names for variants */
        getCardContainerClass: (variant?: GeoAlertCardLayoutVariant) => string;
    };
}
/**
 * Enterprise LEGO Hook για GeoAlert Layout Management
 *
 * Παρέχει ολοκληρωμένη λύση για το positioning των καρτών και info panels
 * στο GeoAlert system με responsive support και dynamic configuration.
 */
declare function useGeoAlertLayout(customConfig?: Partial<GeoAlertLayoutConfig>): UseGeoAlertLayoutReturn;

/**
 * GeoAlert Layout Utilities
 * Enterprise utilities για positioning και styling
 */

/** Default GeoAlert Layout Configuration */
declare const GEOALERT_LAYOUT_CONFIG: GeoAlertLayoutConfig;
/**
 * Υπολογίζει τις θέσεις των στοιχείων βάσει configuration
 */
declare function calculateGeoAlertPositions(config?: GeoAlertLayoutConfig): GeoAlertCalculatedPositions;
/**
 * Δημιουργεί CSS styles για GeoAlert card container
 */
declare function createGeoAlertCardStyles(variant?: GeoAlertCardLayoutVariant, positions?: GeoAlertCalculatedPositions): React.CSSProperties;
/**
 * Δημιουργεί CSS styles για GeoAlert InfoPanel
 */
declare function createGeoAlertInfoPanelStyles(isMobile?: boolean, positions?: GeoAlertCalculatedPositions): React.CSSProperties;
/**
 * CSS Variables Updater - Enterprise approach
 * Ενημερώνει CSS variables δυναμικά
 */
declare function updateGeoAlertLayoutVariables(config: Partial<GeoAlertLayoutConfig>): void;

export { AppShell, type AppShellProps, type BreakpointSize, type ContainerMaxWidth, Flex, GEOALERT_LAYOUT_CONFIG, type GeoAlertCalculatedPositions, type GeoAlertCardContainerProps, type GeoAlertCardLayoutVariant, type GeoAlertInfoPanelProps, type GeoAlertLayoutConfig, HeaderActionsGroup, type HeaderActionsGroupProps, type HeaderVariant, LayeraHeader, type LayeraHeaderProps, type LayoutVariant, PageContainer, type PageContainerProps$1 as PageContainerProps, PageHeader, type PageHeaderProps$1 as PageHeaderProps, type SpacingSize, Stack, calculateGeoAlertPositions, createGeoAlertCardStyles, createGeoAlertInfoPanelStyles, updateGeoAlertLayoutVariables, useGeoAlertLayout };
