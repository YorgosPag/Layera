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
  // ============= FLEXIBLE CONTENT (LEGO + Local compatibility) =============
  children?: ReactNode; // Optional για Local BaseCard compatibility
  title?: string;       // Enhanced για Local BaseCard compatibility
  icon?: ReactNode;     // NEW: Icon support από Local BaseCard
  description?: string; // NEW: Description support (from UploadStep usage)

  // ============= LEGO FEATURES (existing) =============
  subtitle?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  size?: CardSize;
  padding?: CardPadding;
  hoverable?: boolean;
  clickable?: boolean;

  // ============= ENHANCED VARIANTS =============
  variant?: CardVariant; // Extended για property/job support

  // ============= MOBILE UX FEATURES (από Local BaseCard) =============
  // Opacity system για stepper integration
  opacityMode?: OpacityMode;

  // Info button με mobile interactions
  onInfoClick?: () => void;

  // Touch events για mobile feedback
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;

  // ============= COMMON FEATURES =============
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string; // NEW: Test ID support
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