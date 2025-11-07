// Layera Icons - Device Icons
// Enterprise pattern: Εικονίδια συσκευών για viewport system

import React from 'react';
import { Icon, IconProps } from '../Icon';

// Mobile/Phone - Κινητό
export const PhoneIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="phone" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

// Tablet - Tablet
export const TabletIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="tablet" {...props}>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </Icon>
);

// Desktop/Monitor - Επιτραπέζιος
export const MonitorIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="monitor" {...props}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </Icon>
);

// Laptop - Φορητός υπολογιστής
export const LaptopIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="laptop" {...props}>
    <line x1="22" y1="19" x2="2" y2="19" />
    <rect x="5" y="6" width="14" height="10" rx="1" ry="1" />
  </Icon>
);

// Smartphone - Έξυπνο τηλέφωνο
export const SmartphoneIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="smartphone" {...props}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </Icon>
);

// Watch - Έξυπνο ρολόι
export const WatchIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="watch" {...props}>
    <circle cx="12" cy="12" r="7" />
    <polyline points="12,9 12,12 13.5,13.5" />
    <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.37 3.83" />
  </Icon>
);

// TV/Display - Τηλεόραση
export const TvIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="tv" {...props}>
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <polyline points="17,2 12,7 7,2" />
  </Icon>
);

// Rotate Screen - Περιστροφή οθόνης
export const RotateIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="rotate" {...props}>
    <polyline points="23,4 23,10 17,10" />
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10" />
    <polyline points="1,20 1,14 7,14" />
    <path d="M3.51 15a9 9 0 0 0 14.85 3.36L23 14" />
  </Icon>
);

// Theme Icons - για ThemeSwitcher SST compliance

// Sun Icon - Light theme
export const SunIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="sun" {...props}>
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2"/>
    <path d="M12 21v2"/>
    <path d="m4.22 4.22 1.42 1.42"/>
    <path d="m18.36 18.36 1.42 1.42"/>
    <path d="M1 12h2"/>
    <path d="M21 12h2"/>
    <path d="m4.22 19.78 1.42-1.42"/>
    <path d="m18.36 5.64 1.42-1.42"/>
  </Icon>
);

// Moon Icon - Dark theme
export const MoonIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="moon" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </Icon>
);