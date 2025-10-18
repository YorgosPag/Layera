// Temporary Layera Icons για GeoAlert
// Προσωρινή λύση μέχρι να επιλυθεί το import issue

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
  primary: 'var(--layera-bg-info)',
  secondary: 'var(--layera-text-secondary)',
  success: 'var(--layera-bg-success)',
  warning: 'var(--layera-bg-warning)',
  danger: 'var(--layera-bg-danger)',
  info: 'var(--layera-bg-info)',
  neutral: 'var(--layera-text-secondary)'
};

export const ArrowLeftIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
};

export const MapIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
};

export const HomeIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
};

export const BriefcaseIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
};

export const MarkerIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
};

export const PolygonIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
    </svg>
  );
};

export const CheckIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
};

export const TrashIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <polyline points="3,6 5,6 21,6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
};

// Eye Icon (👁️)
export const EyeIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

// EyeOff Icon (🙈)
export const EyeOffIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
};

// Search Icon (🔍)
export const SearchIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
};

// Global/World Icon (🌐)
export const GlobalIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};

// Puzzle Icon (🧩)
export const PuzzleIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" />
      <path d="M12 5L8 21l4-7 4 7-4-16" />
      <path d="M5 12h14" />
    </svg>
  );
};

// Link Icon (🔗)
export const LinkIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
};

// Folder Icon (📁)
export const FolderIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
};

// Zap/Lightning Icon (⚡)
export const ZapIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
    </svg>
  );
};

// Party/Celebration Icon (🎉)
export const PartyIcon: React.FC<IconProps> = ({
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
      className={`layera-icon ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <path d="m8 3 4 8 5-3-5 3 1 5-3-2-3 2 1-5-5 3 5-3-4-8Z" />
      <path d="M9 14l-2 4 4-2 4 2-2-4" />
      <path d="M15 6l3-3 3 3-3 3-3-3" />
      <circle cx="19" cy="5" r="1" />
      <circle cx="5" cy="19" r="1" />
      <circle cx="17" cy="17" r="1" />
    </svg>
  );
};