// Layera Icons - Action Icons
// Enterprise pattern: Εικονίδια ενεργειών για όλες τις εφαρμογές

import React from 'react';
import { Icon, IconProps } from '../Icon';

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