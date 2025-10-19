import React, { ReactNode } from 'react';

/**
 * Core layout types for the Layera Layout System
 */
type LayoutVariant = 'dashboard' | 'fullscreen' | 'fullscreen-map' | 'minimal' | 'dual-sidebar';
type HeaderVariant = 'minimal' | 'standard' | 'rich';
type SidebarVariant = 'default' | 'overlay' | 'push';
type SidebarPosition = 'left' | 'right';
type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full' | number;
type SpacingSize = 'none' | 'sm' | 'md' | 'lg';
type BreakpointSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
interface LayoutState {
    sidebarCollapsed: boolean;
    headerHeight: number;
    sidebarWidth: number;
    breakpoint: BreakpointSize;
}
interface LayoutActions {
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    setHeaderHeight: (height: number) => void;
}
interface ResponsiveState {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    currentBreakpoint: BreakpointSize;
    windowSize: {
        width: number;
        height: number;
    };
}

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
interface NavigationSidebarProps {
    children: ReactNode;
    collapsed?: boolean;
    collapsible?: boolean;
    width?: string | number;
    position?: SidebarPosition;
    variant?: SidebarVariant;
    className?: string;
}
interface NavItemProps {
    icon?: ReactNode;
    label: string;
    to?: string;
    href?: string;
    onClick?: () => void;
    active?: boolean;
    disabled?: boolean;
    badge?: ReactNode;
    permission?: string;
    className?: string;
}
interface NavSectionProps {
    title?: string;
    children: ReactNode;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    className?: string;
}
interface PageContainerProps {
    children: ReactNode;
    maxWidth?: ContainerMaxWidth;
    padding?: SpacingSize;
    className?: string;
}
interface PageHeaderProps {
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
declare const AppShell: React.FC<AppShellProps>;

/**
 * LayeraHeader - Standardized header component με flexible variants
 * για διαφορετικούς τύπους εφαρμογών
 */
declare const LayeraHeader: React.FC<LayeraHeaderProps>;

/**
 * HeaderActionsGroup - Container για header actions με proper spacing
 */
declare const HeaderActionsGroup: React.FC<HeaderActionsGroupProps>;

/**
 * NavigationSidebar - Flexible sidebar component για navigation
 */
declare const NavigationSidebar: React.FC<NavigationSidebarProps>;

/**
 * NavItem - Individual navigation item με support για links, buttons και permissions
 */
declare const NavItem: React.FC<NavItemProps>;

/**
 * NavSection - Grouping component για navigation items με collapsible support
 */
declare const NavSection: React.FC<NavSectionProps>;

/**
 * PageContainer - Standardized container για page content με responsive behavior
 */
declare const PageContainer: React.FC<PageContainerProps>;

/**
 * PageHeader - Standardized header για individual pages
 */
declare const PageHeader: React.FC<PageHeaderProps>;

interface StackProps {
    children: React.ReactNode;
    spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    direction?: 'vertical' | 'horizontal';
    align?: 'start' | 'center' | 'end' | 'stretch';
    className?: string;
    style?: React.CSSProperties;
}
declare const Stack: React.FC<StackProps>;

interface FlexProps {
    children: React.ReactNode;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    style?: React.CSSProperties;
}
declare const Flex: React.FC<FlexProps>;

/**
 * useLayout - Hook για layout state management
 */
declare const useLayout: () => [LayoutState, LayoutActions];

/**
 * useResponsive - Hook για responsive state management
 */
declare const useResponsive: () => ResponsiveState;

export { AppShell, type AppShellProps, type BreakpointSize, type ContainerMaxWidth, Flex, HeaderActionsGroup, type HeaderActionsGroupProps, type HeaderVariant, LayeraHeader, type LayeraHeaderProps, type LayoutActions, type LayoutState, type LayoutVariant, NavItem, type NavItemProps, NavSection, type NavSectionProps, NavigationSidebar, type NavigationSidebarProps, PageContainer, type PageContainerProps, PageHeader, type PageHeaderProps, type ResponsiveState, type SidebarPosition, type SidebarVariant, type SpacingSize, Stack, useLayout, useResponsive };
