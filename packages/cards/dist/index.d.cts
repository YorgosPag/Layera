import React, { ReactNode } from 'react';

/**
 * Card Types για το Layera Cards System
 */
type CardVariant = 'elevated' | 'outlined' | 'filled';
type CardSize = 'sm' | 'md' | 'lg' | 'xl';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
interface BaseCardProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    actions?: ReactNode;
    footer?: ReactNode;
    variant?: CardVariant;
    size?: CardSize;
    padding?: CardPadding;
    hoverable?: boolean;
    clickable?: boolean;
    onClick?: () => void;
    className?: string;
}
interface CardHeaderProps {
    title?: string;
    subtitle?: string;
    actions?: ReactNode;
    icon?: ReactNode;
    className?: string;
}
interface CardContentProps {
    children: ReactNode;
    padding?: CardPadding;
    className?: string;
}
interface CardFooterProps {
    children: ReactNode;
    actions?: ReactNode;
    className?: string;
}
type DashboardCardVariant = 'stats' | 'chart' | 'status' | 'actions' | 'info';
interface DashboardCardProps extends Omit<BaseCardProps, 'variant'> {
    variant?: DashboardCardVariant;
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
interface InfoCardProps extends BaseCardProps {
    type?: 'info' | 'warning' | 'error' | 'success';
    dismissible?: boolean;
    onDismiss?: () => void;
}
interface DataCardProps extends BaseCardProps {
    data?: Record<string, unknown>;
    loading?: boolean;
    error?: string | null;
    emptyMessage?: string;
}

/**
 * BaseCard - Core card component που παρέχει τη βάση για όλα τα άλλα cards
 */
declare const BaseCard: React.FC<BaseCardProps>;

/**
 * DashboardCard - Specialized card για dashboard widgets με metrics και status
 */
declare const DashboardCard: React.FC<DashboardCardProps>;

/**
 * DashboardGrid - Responsive grid layout για dashboard cards
 */
interface DashboardGridProps {
    children: React.ReactNode;
    columns?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
}
declare const DashboardGrid: React.FC<DashboardGridProps>;
/**
 * DashboardSection - Wrapper για dashboard sections με title
 */
interface DashboardSectionProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    actions?: React.ReactNode;
    className?: string;
}
declare const DashboardSection: React.FC<DashboardSectionProps>;

export { BaseCard, type BaseCardProps, type CardContentProps, type CardFooterProps, type CardHeaderProps, type CardPadding, type CardSize, type CardVariant, DashboardCard, type DashboardCardProps, type DashboardCardVariant, DashboardGrid, DashboardSection, type DataCardProps, type InfoCardProps };
