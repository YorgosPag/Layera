// Layera Icons - Navigation Icons
// Enterprise pattern: Εικονίδια πλοήγησης για όλες τις εφαρμογές

import React from 'react';
import { Icon, IconProps } from '../Icon';

// Home Icon - Αρχική σελίδα
export const HomeIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="home" {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </Icon>
);

// Menu Icon - Μενού
export const MenuIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="menu" {...props}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Icon>
);

// Arrow Left - Πίσω
export const ArrowLeftIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="arrow-left" {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12,19 5,12 12,5" />
  </Icon>
);

// Arrow Right - Εμπρός
export const ArrowRightIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="arrow-right" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </Icon>
);

// Close/X Icon - Κλείσιμο
export const CloseIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="close" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

// Search Icon - Αναζήτηση
export const SearchIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="search" {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </Icon>
);

// Settings Icon - Ρυθμίσεις
export const SettingsIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="settings" {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Icon>
);

// More Icon - Περισσότερα (3 τελείες)
export const MoreIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="more" {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </Icon>
);

// Refresh Icon - Ανανέωση
export const RefreshIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="refresh" {...props}>
    <polyline points="23,4 23,10 17,10" />
    <polyline points="1,20 1,14 7,14" />
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
  </Icon>
);