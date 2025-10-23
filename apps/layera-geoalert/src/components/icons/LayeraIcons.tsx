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

// Ruler Icon - Χάρακας για μετρήσεις
export const RulerIcon: React.FC<IconProps> = ({
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
      <path d="M21 10V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5M7 10h4M15 10h2M7 14h2m4 0h4" />
    </svg>
  );
};

// Plus Icon - Κουμπί προσθήκης
export const PlusIcon: React.FC<IconProps> = ({
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
};

// Offer Icon - Προσφορά/Χέρι με προϊόν
export const OfferIcon: React.FC<IconProps> = ({
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
      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
      <path d="M2 7h20l-2-6H4l-2 6Z" />
      <path d="M10 12v6" />
      <path d="M14 12v6" />
    </svg>
  );
};

// Work Icon - Alias για BriefcaseIcon
export const WorkIcon = BriefcaseIcon;

// Address Icon - Διεύθυνση/Σπίτι με αριθμό
export const AddressIcon: React.FC<IconProps> = ({
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
      <path d="M9 21V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v14" />
      <path d="M5 21h14" />
      <path d="M11 11h2" />
      <path d="M11 15h2" />
      <path d="M12 3V2" />
      <path d="M8 7h8" />
    </svg>
  );
};

// Form Icon - Φόρμα/Έγγραφο με γραμμές
export const FormIcon: React.FC<IconProps> = ({
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  );
};

// Advanced Icon - Ρυθμίσεις/Γρανάζια
export const AdvancedIcon: React.FC<IconProps> = ({
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
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
};

// Quick Icon - Alias για ZapIcon (γρήγορο)
export const QuickIcon = ZapIcon;

// EuroIcon - Νόμισμα Euro για τιμολόγηση
export const EuroIcon: React.FC<IconProps> = ({
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`layera-icon euro-icon ${className}`}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
      onClick={onClick}
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zM8.1 15.9l1.9.5v-2.9h3v-1.1h-3V9.5h3v-1.1h-3V5.5l-1.9.5v2.4H6v1.1h2.1v2.9H6v1.1h2.1v2.9z" />
      <path d="M7 9h5" />
      <path d="M7 13h5" />
    </svg>
  );
};

// TagIcon - Ετικέτα/Tag για κατηγοριοποίηση τιμών
export const TagIcon: React.FC<IconProps> = ({
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`layera-icon tag-icon ${className}`}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
      onClick={onClick}
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
};

// HandshakeIcon - Διαπραγματεύσιμη τιμή/Συμφωνία
export const HandshakeIcon: React.FC<IconProps> = ({
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`layera-icon handshake-icon ${className}`}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
      onClick={onClick}
    >
      <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
      <path d="M7 14a2 2 0 0 1-2-2c0-.6.4-1 1-1h3.5" />
      <path d="M2 12a2 2 0 0 1 2-2c.6 0 1 .4 1 1v3" />
      <path d="M21 17v-3a2 2 0 0 0-2-2h-1" />
      <path d="M19 15v2a2 2 0 0 1-2 2h-1" />
      <path d="M13 7l3-3 3 3-3 3z" />
      <path d="M12 18l-3-3 3-3 3 3z" />
    </svg>
  );
};