// Temporary type definitions for @layera packages using EXISTING PATTERNS
declare module '@layera/layout' {
import React from "react";
  import { ReactNode, CSSProperties } from 'react';

  export interface BoxProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    role?: string;
    // Additional properties from existing patterns
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | string;
    [key: string]: unknown; // Allow any additional props
  }

  export interface CommonProps {
    children?: ReactNode;
    layout?: string;
    header?: ReactNode;
    title?: string;
    subtitle?: string;
    variant?: string;
    actions?: ReactNode;
    maxWidth?: string;
    padding?: string;
    gap?: string;
    [key: string]: unknown; // Allow any additional props
  }

  export const Box: React.FC<BoxProps>;
  export const AppShell: React.FC<CommonProps>;
  export const LayeraHeader: React.FC<CommonProps>;
  export const HeaderActionsGroup: React.FC<CommonProps>;
  export const PageContainer: React.FC<CommonProps>;
  export const PageHeader: React.FC<CommonProps>;
  export const Flex: React.FC<CommonProps>;
  export const FlexColumn: React.FC<CommonProps>;
  export const Stack: React.FC<CommonProps>;
}

declare module '@layera/theme-switcher' {
  export interface ThemeSwitcherProps {
    [key: string]: unknown; // Allow any additional props
  }

  export const ThemeSwitcher: React.FC<ThemeSwitcherProps>;
  export const ThemeProvider: React.FC<{ children: React.ReactNode }>;
}

declare module '@layera/viewport' {
  export function useViewportWithOverride(): {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    deviceType: string;
  };

  export const DeviceOverrideProvider: React.FC<{ children: React.ReactNode }>;
}

declare module '@layera/buttons' {
  import { ReactNode } from 'react';

  export interface ButtonProps {
    children?: ReactNode;
    onClick?: () => void | Promise<void>;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
    disabled?: boolean;
  }

  export const Button: React.FC<ButtonProps>;
}

declare module '@layera/cards' {
  import { ReactNode } from 'react';

  export interface BaseCardProps {
    title?: ReactNode;
    children?: ReactNode;
    variant?: string;
    onClick?: () => void;
    onInfoClick?: () => void;
    className?: string;
    'data-testid'?: string;
    icon?: ReactNode;
    actions?: ReactNode;
    style?: React.CSSProperties;
  }

  export interface CardGridProps {
    children?: ReactNode;
    title?: string;
    subtitle?: string;
    [key: string]: unknown; // Allow any additional props
  }

  export interface DashboardCardProps {
    children?: ReactNode;
    title?: string;
    variant?: string;
    onClick?: () => void | Promise<void>;
    [key: string]: unknown; // Allow any additional props
  }

  export const BaseCard: React.FC<BaseCardProps>;
  export const DashboardGrid: React.FC<CardGridProps>;
  export const DashboardSection: React.FC<CardGridProps>;
  export const DashboardCard: React.FC<DashboardCardProps>;
}