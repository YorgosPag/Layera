// Viewport Icons για @layera/viewport package
// SVG εικονίδια για συσκευές και viewport controls

import React from 'react';

interface IconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

const THEME_COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  neutral: '#6b7280'
};

// Refresh/Auto Icon (🔄)
export const RefreshIcon: React.FC<IconProps> = ({
  size = 'md',
  theme = 'neutral',
  className = '',
  style = {},
  onClick
}) => {
  const iconSize = typeof size === 'number' ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`viewport-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
};

// Mobile/Phone Icon (📱)
export const MobileIcon: React.FC<IconProps> = ({
  size = 'md',
  theme = 'neutral',
  className = '',
  style = {},
  onClick
}) => {
  const iconSize = typeof size === 'number' ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`viewport-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
};

// Desktop/Monitor Icon (🖥️)
export const DesktopIcon: React.FC<IconProps> = ({
  size = 'md',
  theme = 'neutral',
  className = '',
  style = {},
  onClick
}) => {
  const iconSize = typeof size === 'number' ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`viewport-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
};

// Tablet Icon - Similar to mobile but bigger (📱 Tablet)
export const TabletIcon: React.FC<IconProps> = ({
  size = 'md',
  theme = 'neutral',
  className = '',
  style = {},
  onClick
}) => {
  const iconSize = typeof size === 'number' ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`viewport-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
};

// Rotate Icon for device rotation (🔄 alternative)
export const RotateIcon: React.FC<IconProps> = ({
  size = 'md',
  theme = 'neutral',
  className = '',
  style = {},
  onClick
}) => {
  const iconSize = typeof size === 'number' ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`viewport-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
};

// Tablet Landscape Icon (📟)
export const TabletLandscapeIcon: React.FC<IconProps> = ({
  size = 'md',
  theme = 'neutral',
  className = '',
  style = {},
  onClick
}) => {
  const iconSize = typeof size === 'number' ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`viewport-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
      <line x1="18" y1="12" x2="18.01" y2="12" />
    </svg>
  );
};