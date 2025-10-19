import React, { ReactNode } from 'react';

/**
 * Card Types για το Layera Cards System
 */

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface BaseCardProps {
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
  style?: React.CSSProperties;
}

export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: ReactNode;
  padding?: CardPadding;
  className?: string;
}

export interface CardFooterProps {
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

// Dashboard-specific types
export type DashboardCardVariant = 'stats' | 'chart' | 'status' | 'actions' | 'info';

export interface DashboardCardProps extends Omit<BaseCardProps, 'variant'> {
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

// Info Card types
export interface InfoCardProps extends BaseCardProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  dismissible?: boolean;
  onDismiss?: () => void;
}

// Data Card types
export interface DataCardProps extends BaseCardProps {
  data?: Record<string, unknown>;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}