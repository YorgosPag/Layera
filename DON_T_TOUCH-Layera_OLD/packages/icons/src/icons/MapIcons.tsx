// Layera Icons - Map & Geographic Icons
// Enterprise pattern: Εικονίδια χαρτών και γεωγραφικά για GeoAlert

import React from 'react';
import { Icon, IconProps } from '../Icon';

// Map Icon - Χάρτης
export const MapIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="map" {...props}>
    <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </Icon>
);

// Location Pin - Τοποθεσία
export const LocationIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="location" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

// Navigation/Compass - Πυξίδα
export const CompassIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="compass" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
  </Icon>
);

// Layer Icon - Επίπεδα χάρτη
export const LayersIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="layers" {...props}>
    <polygon points="12,2 2,7 12,12 22,7" />
    <polyline points="2,17 12,22 22,17" />
    <polyline points="2,12 12,17 22,12" />
  </Icon>
);

// Route/Path - Διαδρομή
export const RouteIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="route" {...props}>
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </Icon>
);

// Zoom In - Μεγέθυνση
export const ZoomInIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="zoom-in" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="8" y1="11" x2="14" y2="11" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <path d="M21 21l-4.35-4.35" />
  </Icon>
);

// Zoom Out - Σμίκρυνση
export const ZoomOutIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="zoom-out" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="8" y1="11" x2="14" y2="11" />
    <path d="M21 21l-4.35-4.35" />
  </Icon>
);

// GPS/Crosshairs - Στόχευση
export const CrosshairsIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="crosshairs" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="22" y1="12" x2="18" y2="12" />
    <line x1="6" y1="12" x2="2" y2="12" />
    <line x1="12" y1="6" x2="12" y2="2" />
    <line x1="12" y1="22" x2="12" y2="18" />
  </Icon>
);

// Globe - Υδρόγειος
export const GlobeIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="globe" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Icon>
);

// Alert/Warning Triangle - Προειδοποίηση
export const AlertTriangleIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="alert-triangle" {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Icon>
);

// Satellite - Δορυφόρος
export const SatelliteIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="satellite" {...props}>
    <path d="M13 7L9 3 5 7l4 4" />
    <path d="M17 11L13 7l-4 4 4 4" />
    <path d="M19 13l-4-4 4-4" />
    <circle cx="12" cy="12" r="2" />
  </Icon>
);

// Ruler - Χάρακας για μετρήσεις
export const RulerIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="ruler" {...props}>
    <path d="M21 10V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5M7 10h4M15 10h2M7 14h2m4 0h4" />
  </Icon>
);

// ENTERPRISE ADDITIONS - Missing icons από LayeraIcons migration

// Marker - Map marker για χάρτη
export const MarkerIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="marker" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

// Polygon - Πολύγωνο για χρεσιματοδότηση
export const PolygonIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="polygon" {...props}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </Icon>
);