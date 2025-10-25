// Layera Icons - Action Icons
// Enterprise pattern: Εικονίδια ενεργειών για όλες τις εφαρμογές

import React from 'react';
import { Icon, IconProps } from '../Icon';
// Smart aliasing imports
import { CloseIcon } from './NavigationIcons';
import { AlertTriangleIcon } from './MapIcons';

// Save Icon - Αποθήκευση
export const SaveIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="save" {...props}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17,21 17,13 7,13 7,21" />
    <polyline points="7,3 7,8 15,8" />
  </Icon>
);

// Edit Icon - Επεξεργασία
export const EditIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="edit" {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </Icon>
);

// Delete Icon - Διαγραφή
export const DeleteIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="delete" {...props}>
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </Icon>
);

// Add/Plus Icon - Προσθήκη
export const PlusIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="plus" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

// Download Icon - Λήψη
export const DownloadIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="download" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </Icon>
);

// Upload Icon - Αποστολή
export const UploadIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="upload" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17,8 12,3 7,8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </Icon>
);

// Copy Icon - Αντιγραφή
export const CopyIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="copy" {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);

// Share Icon - Κοινοποίηση
export const ShareIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="share" {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </Icon>
);

// Print Icon - Εκτύπωση
export const PrintIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="print" {...props}>
    <polyline points="6,9 6,2 18,2 18,9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </Icon>
);

// Undo Icon - Αναίρεση
export const UndoIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="undo" {...props}>
    <polyline points="1,4 1,10 7,10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </Icon>
);

// Redo Icon - Επανάληψη
export const RedoIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="redo" {...props}>
    <polyline points="23,4 23,10 17,10" />
    <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
  </Icon>
);

// Check Icon - Επιβεβαίωση/Επιτυχία
export const CheckIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="check" {...props}>
    <polyline points="20,6 9,17 4,12" />
  </Icon>
);

// Work Icon - Εργασία/Επαγγελματικό
export const WorkIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="work" {...props}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </Icon>
);

// PHASE 10 COMPLETE ICON PERFECTION - Final 8 Business Icons

// Eye Icon - Visibility Control
export const EyeIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="eye" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

// Eye Off Icon - Hidden State
export const EyeOffIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="eye-off" {...props}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </Icon>
);

// Euro Icon - Currency και Pricing
export const EuroIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="euro" {...props}>
    <path d="M4 10h12" />
    <path d="M4 14h9" />
    <path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12a7.9 7.9 0 0 0 7.8 8 7.7 7.7 0 0 0 5.2-2" />
  </Icon>
);

// Tag Icon - Labels και Categorization
export const TagIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="tag" {...props}>
    <path d="M12 2H2v10l9.5 9.5a2.828 2.828 0 0 0 4-4L12 2Z" />
    <circle cx="7" cy="7" r="1.5" />
  </Icon>
);

// Handshake Icon - Business Partnerships
export const HandshakeIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="handshake" {...props}>
    <path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z" />
    <path d="M16.7 13H19a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H9.5a.5.5 0 0 1-.4-.8l5.7-8.8A2 2 0 0 1 16.4 8H19a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1.6" />
    <path d="M11 17V8.5a2.5 2.5 0 0 1 5 0" />
  </Icon>
);

// Form Icon - Forms και Data Entry
export const FormIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="form" {...props}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </Icon>
);

// Quick Icon - Fast Actions και Shortcuts
export const QuickIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="quick" {...props}>
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
  </Icon>
);

// Advanced Icon - Complex Settings και Configuration
export const AdvancedIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="advanced" {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Icon>
);

// ENTERPRISE COMPATIBILITY - Aliases για LayeraIcons migration
export const TrashIcon = DeleteIcon;

// PHASE 9.2 SMART ALIASING - Mapping existing icons
export const XIcon = CloseIcon; // Close functionality mapping
export const WarningIcon = AlertTriangleIcon; // Warning functionality mapping (από MapIcons)

// PHASE 8.1 HIGH-FREQUENCY MISSING ICONS ADDITION

// Chart Icon - Analytics και Data Visualization
export const ChartIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="chart" {...props}>
    <path d="M3 3v18h18" />
    <path d="M18.7 8l-5-5-6 6-2.3-2.3" />
  </Icon>
);

// Folder Icon - File Organization και Storage
export const FolderIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="folder" {...props}>
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  </Icon>
);

// Lock Icon - Security και Authentication
export const LockIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="lock" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Icon>
);

// Shield Icon - Protection και Security
export const ShieldIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="shield" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Icon>
);

// PHASE 9.1 FINAL MISSING ICONS COMPLETION

// User Icon - User Management και Profile
export const UserIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="user" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

// File Icon - Document και Content Management
export const FileIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="file" {...props}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14,2 14,8 20,8" />
  </Icon>
);

// Bell Icon - Notifications και Alerts
export const BellIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="bell" {...props}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </Icon>
);

// Palette Icon - Design και Customization
export const PaletteIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="palette" {...props}>
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </Icon>
);

// Unlock Icon - Security και Access Control
export const UnlockIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="unlock" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </Icon>
);

// Rocket Icon - Launch και Performance
export const RocketIcon: React.FC<Omit<IconProps, 'name' | 'children'>> = (props) => (
  <Icon name="rocket" {...props}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </Icon>
);