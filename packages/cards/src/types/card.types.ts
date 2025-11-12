import React, { ReactNode } from 'react';

/**
 * Card Types για το Layera Cards System
 */

// Enhanced Card Variants - supports both LEGO and Local patterns
export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'property' | 'job' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

// Opacity modes για Mobile UX (από Local BaseCard)
export type OpacityMode = 'transparent' | 'semi-transparent' | 'opaque';

// Enhanced Card Theme για property/job variants
export interface EnhancedCardTheme {
  backgroundColor: string;
  borderColor: string;
  titleBackground: string;
  titleShadow: string;
  backdropFilter: string;
  opacity: number;
}

export interface BaseCardProps {
  // ============= CONTENT =============
  children?: ReactNode;
  title?: string;
  icon?: ReactNode;
  description?: string;
  subtitle?: string;
  actions?: ReactNode;
  footer?: ReactNode;

  // ============= APPEARANCE =============
  size?: CardSize;
  padding?: CardPadding;
  variant?: CardVariant;

  // ============= BEHAVIOR =============
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;

  // ============= SYSTEM =============
  className?: string | undefined;
  'data-testid'?: string | undefined;
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