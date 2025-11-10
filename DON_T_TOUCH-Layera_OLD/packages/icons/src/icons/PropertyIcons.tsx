// Layera Icons - Property/Real Estate Icons
// Enterprise pattern: Εικονίδια ακινήτων για μοναδική κατηγοριοποίηση

import React from 'react';
import { Icon, IconProps } from '../Icon';

// Building Icon - Πολυκατοικία/Κτίριο
export const BuildingIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="building" {...props}>
    <rect x="4" y="2" width="16" height="20" rx="1" ry="1" />
    <rect x="6" y="5" width="2" height="2" />
    <rect x="10" y="5" width="2" height="2" />
    <rect x="14" y="5" width="2" height="2" />
    <rect x="6" y="9" width="2" height="2" />
    <rect x="10" y="9" width="2" height="2" />
    <rect x="14" y="9" width="2" height="2" />
    <rect x="6" y="13" width="2" height="2" />
    <rect x="10" y="13" width="2" height="2" />
    <rect x="14" y="13" width="2" height="2" />
    <rect x="9" y="17" width="3" height="5" />
  </Icon>
);

// Villa Icon - Μονοκατοικία/Βίλα
export const VillaIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="villa" {...props}>
    <polygon points="12,2 2,7 2,22 22,22 22,7" />
    <polyline points="6,9 6,22" />
    <polyline points="10,9 10,22" />
    <polyline points="14,9 14,22" />
    <polyline points="18,9 18,22" />
    <rect x="8" y="16" width="3" height="6" />
    <rect x="13" y="12" width="2" height="2" />
    <rect x="16" y="12" width="2" height="2" />
  </Icon>
);

// Commercial Icon - Εμπορικό/Κατάστημα
export const CommercialIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="commercial" {...props}>
    <rect x="2" y="6" width="20" height="16" rx="1" ry="1" />
    <rect x="4" y="2" width="16" height="6" rx="1" ry="1" />
    <rect x="6" y="10" width="4" height="8" />
    <rect x="14" y="10" width="4" height="8" />
    <rect x="11" y="12" width="2" height="2" />
    <line x1="2" y1="6" x2="22" y2="6" />
    <circle cx="19" cy="4" r="1" />
  </Icon>
);

// Industrial Icon - Βιομηχανικό/Αποθήκη
export const IndustrialIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="industrial" {...props}>
    <rect x="3" y="10" width="18" height="12" rx="1" ry="1" />
    <polygon points="3,10 12,2 21,10" />
    <rect x="6" y="13" width="3" height="5" />
    <rect x="10" y="13" width="4" height="9" />
    <rect x="15" y="13" width="3" height="5" />
    <line x1="8" y1="2" x2="8" y2="8" />
    <line x1="16" y1="2" x2="16" y2="8" />
  </Icon>
);

// Briefcase Icon - Γραφείο/Επαγγελματικό
export const BriefcaseIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="briefcase" {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <line x1="2" y1="11" x2="22" y2="11" />
    <circle cx="12" cy="14" r="2" />
  </Icon>
);

// Tool Icon - Χειρωνακτική Εργασία/Τεχνίτης
export const ToolIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="tool" {...props}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </Icon>
);

// Truck Icon - Μεταφορές/Logistics
export const TruckIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="truck" {...props}>
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16,8 20,8 23,11 23,16 16,16" />
    <circle cx="5.5" cy="18" r="2.5" />
    <circle cx="18.5" cy="18" r="2.5" />
    <line x1="1" y1="8" x2="16" y2="8" />
  </Icon>
);

// Store Icon - Λιανική/Κατάστημα
export const StoreIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="store" {...props}>
    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
    <path d="M21 7L12 2 3 7" />
    <path d="M12 2v5" />
    <rect x="8" y="13" width="8" height="6" />
    <rect x="10" y="15" width="4" height="2" />
  </Icon>
);

// Restaurant Icon - Εστίαση/Καφέ
export const RestaurantIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="restaurant" {...props}>
    <path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z" />
    <path d="M19 15v7" />
  </Icon>
);

// Hospital Icon - Υγεία/Νοσοκομείο
export const HospitalIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="hospital" {...props}>
    <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
    <path d="M12 7v10" />
    <path d="M7 12h10" />
    <rect x="6" y="15" width="2" height="2" />
    <rect x="10" y="15" width="2" height="2" />
    <rect x="14" y="15" width="2" height="2" />
    <rect x="18" y="15" width="2" height="2" />
  </Icon>
);