// Temporary type definitions for @layera packages using EXISTING PATTERNS
declare module '@layera/layout' {
  import { ReactNode, CSSProperties } from 'react';

  export interface BoxProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }

  export interface CommonProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
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
  import { ReactNode } from 'react';

  export interface ThemeSwitcherProps {
    className?: string;
    children?: ReactNode;
  }

  export const ThemeSwitcher: React.FC<ThemeSwitcherProps>;
}

declare module '@layera/cards' {
  import { ReactNode } from 'react';

  export interface BaseCardProps {
    title?: string;
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
    className?: string;
    columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; };
  }

  export interface DashboardCardProps extends BaseCardProps {
    variant?: 'stats' | 'chart' | 'status' | 'actions' | 'info';
    loading?: boolean;
    error?: string | null;
    metric?: {
      value: string | number;
      label: string;
      change?: {
        value: number;
        direction: 'up' | 'down' | 'neutral';
        period?: string;
      };
    };
  }

  export const BaseCard: React.FC<BaseCardProps>;
  export const DashboardGrid: React.FC<CardGridProps>;
  export const DashboardSection: React.FC<CardGridProps>;
  export const DashboardCard: React.FC<DashboardCardProps>;
}