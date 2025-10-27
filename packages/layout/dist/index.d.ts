import React$1 from 'react';
import { ReactNode } from 'react';

/**
 * AppShell - Core layout component που παρέχει unified structure
 * για όλες τις Layera εφαρμογές
 */
export declare const AppShell: React$1.FC<AppShellProps>;

/**
 * Component prop interfaces for Layera Layout System
 */
export declare interface AppShellProps {
    children: ReactNode;
    header?: ReactNode;
    sidebar?: ReactNode;
    footer?: ReactNode;
    layout?: LayoutVariant;
    className?: string;
    sidebarCollapsed?: boolean;
    onSidebarToggle?: (collapsed: boolean) => void;
}

export declare type BreakpointSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Υπολογίζει τις θέσεις των στοιχείων βάσει configuration
 */
export declare function calculateGeoAlertPositions(config?: GeoAlertLayoutConfig): GeoAlertCalculatedPositions;

export declare type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full' | number;

/**
 * Δημιουργεί CSS styles για GeoAlert card container
 */
export declare function createGeoAlertCardStyles(variant?: GeoAlertCardLayoutVariant, positions?: GeoAlertCalculatedPositions): React.CSSProperties;

/**
 * Δημιουργεί CSS styles για GeoAlert InfoPanel
 */
export declare function createGeoAlertInfoPanelStyles(isMobile?: boolean, positions?: GeoAlertCalculatedPositions): React.CSSProperties;

export declare const Flex: React$1.FC<FlexProps>;

declare interface FlexProps {
    children: React$1.ReactNode;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    style?: React$1.CSSProperties;
}

/** Default GeoAlert Layout Configuration */
export declare const GEOALERT_LAYOUT_CONFIG: GeoAlertLayoutConfig;

export declare interface GeoAlertCalculatedPositions {
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

export declare interface GeoAlertCardContainerProps {
    /** Layout variant */
    variant?: GeoAlertCardLayoutVariant;
    /** Custom CSS class */
    className?: string;
    /** Children (κάρτες) */
    children: React.ReactNode;
}

/**
 * GeoAlert Layout System Types
 * Enterprise layout types για GeoAlert step system
 */
export declare type GeoAlertCardLayoutVariant = 'horizontal' | 'vertical' | 'smart-triple';

export declare interface GeoAlertInfoPanelProps {
    /** Αν είναι mobile ή desktop */
    isMobile?: boolean;
    /** Custom CSS class */
    className?: string;
    /** Children (InfoPanel content) */
    children: React.ReactNode;
}

export declare interface GeoAlertLayoutConfig {
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

/**
 * HeaderActionsGroup - Container για header actions με proper spacing
 */
export declare const HeaderActionsGroup: React$1.FC<HeaderActionsGroupProps>;

export declare interface HeaderActionsGroupProps {
    children: ReactNode;
    className?: string;
}

export declare type HeaderVariant = 'minimal' | 'standard' | 'rich';

/**
 * LayeraHeader - Standardized header component με flexible variants
 * για διαφορετικούς τύπους εφαρμογών
 */
export declare const LayeraHeader: React$1.FC<LayeraHeaderProps>;

export declare interface LayeraHeaderProps {
    title: string;
    subtitle?: string;
    logo?: ReactNode;
    navigation?: ReactNode;
    actions?: ReactNode;
    variant?: HeaderVariant;
    sticky?: boolean;
    className?: string;
}

/**
 * Core layout types for the Layera Layout System
 */
export declare type LayoutVariant = 'dashboard' | 'fullscreen' | 'fullscreen-map' | 'minimal' | 'dual-sidebar';

/**
 * PageContainer - Enterprise container για page content
 * Παρέχει consistent layout με responsive breakpoints
 */
export declare const PageContainer: React$1.FC<PageContainerProps_2>;

export declare interface PageContainerProps {
    children: ReactNode;
    maxWidth?: ContainerMaxWidth;
    padding?: SpacingSize;
    className?: string;
}

declare interface PageContainerProps_2 {
    children: React$1.ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * PageHeader - Enterprise header για pages
 * Παρέχει consistent styling για page titles και actions
 */
export declare const PageHeader: React$1.FC<PageHeaderProps_2>;

export declare interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
    breadcrumbs?: ReactNode;
    className?: string;
}

declare interface PageHeaderProps_2 {
    title: string;
    subtitle?: string;
    children?: React$1.ReactNode;
    className?: string;
    actions?: React$1.ReactNode;
}

export declare type SpacingSize = 'none' | 'sm' | 'md' | 'lg';

export declare const Stack: React$1.FC<StackProps>;

declare interface StackProps {
    children: React$1.ReactNode;
    spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    direction?: 'vertical' | 'horizontal';
    align?: 'start' | 'center' | 'end' | 'stretch';
    className?: string;
    style?: React$1.CSSProperties;
}

/**
 * CSS Variables Updater - Enterprise approach
 * Ενημερώνει CSS variables δυναμικά
 */
export declare function updateGeoAlertLayoutVariables(config: Partial<GeoAlertLayoutConfig>): void;

/**
 * Enterprise LEGO Hook για GeoAlert Layout Management
 *
 * Παρέχει ολοκληρωμένη λύση για το positioning των καρτών και info panels
 * στο GeoAlert system με responsive support και dynamic configuration.
 */
export declare function useGeoAlertLayout(customConfig?: Partial<GeoAlertLayoutConfig>): UseGeoAlertLayoutReturn;

/**
 * useGeoAlertLayout Hook
 * Enterprise hook για GeoAlert layout management
 */

declare interface UseGeoAlertLayoutReturn {
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

export { }
