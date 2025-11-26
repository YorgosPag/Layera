/**
 * 🔄 LAYERA DRAGGABLE VARIANTS - Draggable component combinations
 *
 * Προκαθορισμένες συνδυασμοί draggable tokens για συγκεκριμένες χρήσεις
 * Component-ready draggable variants που χαρτογραφούν σε semantic tokens
 */

import { DRAGGABLE_VARIABLES } from './draggable.variables';
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';

// DRAGGABLE TYPE VARIANTS - Different draggable component types
export const DRAGGABLE_TYPE_VARIANTS = {
  // Standard draggable item
  item: {
    background: DRAGGABLE_VARIABLES['draggable-container-background'],
    border: DRAGGABLE_VARIABLES['draggable-container-border'],
    borderRadius: DRAGGABLE_VARIABLES['draggable-container-border-radius'],
    padding: DRAGGABLE_VARIABLES['draggable-container-padding'],
    shadow: DRAGGABLE_VARIABLES['draggable-container-shadow'],
    cursor: DRAGGABLE_VARIABLES['drag-handle-cursor'],
    transition: DRAGGABLE_VARIABLES['draggable-container-transition'],
    usage: 'Standard draggable item (cards, list items)',
  },

  // File draggable
  file: {
    background: DRAGGABLE_VARIABLES['draggable-container-background'],
    border: DRAGGABLE_VARIABLES['draggable-container-border'],
    borderRadius: DRAGGABLE_VARIABLES['draggable-container-border-radius'],
    padding: SPACING_VARIABLES['spacing-2'],
    shadow: DRAGGABLE_VARIABLES['draggable-container-shadow'],
    cursor: DRAGGABLE_VARIABLES['drag-handle-cursor'],
    transition: DRAGGABLE_VARIABLES['draggable-container-transition'],
    usage: 'File drag & drop operations',
  },

  // Handle only (grab handle)
  handle: {
    background: DRAGGABLE_VARIABLES['drag-handle-background'],
    color: DRAGGABLE_VARIABLES['drag-handle-color'],
    size: DRAGGABLE_VARIABLES['drag-handle-size'],
    cursor: DRAGGABLE_VARIABLES['drag-handle-cursor'],
    transition: DRAGGABLE_VARIABLES['draggable-container-transition'],
    usage: 'Dedicated drag handle (grip lines, icons)',
  },

  // Sortable list item
  sortable: {
    background: DRAGGABLE_VARIABLES['draggable-container-background'],
    border: DRAGGABLE_VARIABLES['draggable-container-border'],
    borderRadius: DRAGGABLE_VARIABLES['draggable-container-border-radius'],
    padding: DRAGGABLE_VARIABLES['draggable-container-padding'],
    margin: DRAGGABLE_VARIABLES['sortable-item-margin'],
    gap: DRAGGABLE_VARIABLES['sortable-item-gap'],
    cursor: DRAGGABLE_VARIABLES['drag-handle-cursor'],
    transition: DRAGGABLE_VARIABLES['reorder-transition'],
    usage: 'Items in sortable lists',
  },

} as const;

// DRAGGABLE STATE VARIANTS - Different drag states
export const DRAGGABLE_STATE_VARIANTS = {
  // Idle state
  idle: {
    background: DRAGGABLE_VARIABLES['drag-idle-background'],
    border: DRAGGABLE_VARIABLES['drag-idle-border'],
    shadow: DRAGGABLE_VARIABLES['drag-idle-shadow'],
    transform: DRAGGABLE_VARIABLES['drag-idle-transform'],
    opacity: DRAGGABLE_VARIABLES['drag-idle-opacity'],
    cursor: DRAGGABLE_VARIABLES['drag-handle-cursor'],
    usage: 'Normal draggable state',
  },

  // Hover state
  hover: {
    background: DRAGGABLE_VARIABLES['drag-hover-background'],
    border: DRAGGABLE_VARIABLES['drag-hover-border'],
    shadow: DRAGGABLE_VARIABLES['drag-hover-shadow'],
    transform: DRAGGABLE_VARIABLES['drag-hover-transform'],
    opacity: DRAGGABLE_VARIABLES['drag-hover-opacity'],
    cursor: DRAGGABLE_VARIABLES['drag-handle-cursor'],
    usage: 'Mouse hover over draggable',
  },

  // Active state (mouse down)
  active: {
    background: DRAGGABLE_VARIABLES['drag-active-background'],
    border: DRAGGABLE_VARIABLES['drag-active-border'],
    shadow: DRAGGABLE_VARIABLES['drag-active-shadow'],
    transform: DRAGGABLE_VARIABLES['drag-active-transform'],
    opacity: DRAGGABLE_VARIABLES['drag-active-opacity'],
    cursor: DRAGGABLE_VARIABLES['drag-handle-cursor-active'],
    usage: 'Mouse pressed, ready to drag',
  },

  // Dragging state
  dragging: {
    background: DRAGGABLE_VARIABLES['drag-dragging-background'],
    border: DRAGGABLE_VARIABLES['drag-dragging-border'],
    shadow: DRAGGABLE_VARIABLES['drag-dragging-shadow'],
    transform: DRAGGABLE_VARIABLES['drag-dragging-transform'],
    opacity: DRAGGABLE_VARIABLES['drag-dragging-opacity'],
    cursor: DRAGGABLE_VARIABLES['drag-handle-cursor-active'],
    zIndex: '1000',
    usage: 'Item being dragged',
  },

  // Disabled state
  disabled: {
    background: DRAGGABLE_VARIABLES['draggable-container-background'],
    border: DRAGGABLE_VARIABLES['draggable-container-border'],
    shadow: 'none',
    transform: 'none',
    opacity: DRAGGABLE_VARIABLES['drag-disabled-opacity'],
    cursor: DRAGGABLE_VARIABLES['drag-disabled-cursor'],
    usage: 'Non-draggable disabled state',
  },

} as const;

// DROP ZONE VARIANTS - Different drop zone configurations
export const DROP_ZONE_VARIANTS = {
  // Default drop zone
  default: {
    background: DRAGGABLE_VARIABLES['drop-zone-background'],
    border: DRAGGABLE_VARIABLES['drop-zone-border'],
    borderStyle: DRAGGABLE_VARIABLES['drop-zone-border-style'],
    borderRadius: DRAGGABLE_VARIABLES['drop-zone-border-radius'],
    padding: DRAGGABLE_VARIABLES['drop-zone-padding'],
    minHeight: DRAGGABLE_VARIABLES['drop-zone-min-height'],
    textColor: DRAGGABLE_VARIABLES['drop-zone-text-color'],
    usage: 'Standard drop zone area',
  },

  // File upload drop zone
  upload: {
    background: DRAGGABLE_VARIABLES['drop-zone-background'],
    border: DRAGGABLE_VARIABLES['drop-zone-border'],
    borderStyle: DRAGGABLE_VARIABLES['drop-zone-border-style'],
    borderRadius: DRAGGABLE_VARIABLES['drop-zone-border-radius'],
    padding: `${SPACING_VARIABLES['spacing-12']} ${SPACING_VARIABLES['spacing-8']}`,
    minHeight: SPACING_VARIABLES['spacing-32'],
    textColor: DRAGGABLE_VARIABLES['drop-zone-text-color'],
    usage: 'File upload drop zone',
  },

  // Compact drop zone
  compact: {
    background: DRAGGABLE_VARIABLES['drop-zone-background'],
    border: DRAGGABLE_VARIABLES['drop-zone-border'],
    borderStyle: DRAGGABLE_VARIABLES['drop-zone-border-style'],
    borderRadius: DRAGGABLE_VARIABLES['draggable-container-border-radius'],
    padding: SPACING_VARIABLES['spacing-4'],
    minHeight: SPACING_VARIABLES['spacing-16'],
    textColor: DRAGGABLE_VARIABLES['drop-zone-text-color'],
    usage: 'Small inline drop zones',
  },

  // List drop zone (between items)
  list: {
    background: 'transparent',
    border: DRAGGABLE_VARIABLES['drop-indicator-color'],
    borderStyle: DRAGGABLE_VARIABLES['drop-indicator-style'],
    borderRadius: DRAGGABLE_VARIABLES['drop-indicator-radius'],
    padding: '0',
    minHeight: SPACING_VARIABLES['spacing-1'],
    width: '100%',
    usage: 'Drop indicator between list items',
  },

} as const;

// SORTABLE VARIANTS - Different sortable configurations
export const SORTABLE_VARIANTS = {
  // Vertical list
  vertical: {
    direction: 'column',
    gap: DRAGGABLE_VARIABLES['sortable-item-gap'],
    background: DRAGGABLE_VARIABLES['sortable-list-background'],
    padding: DRAGGABLE_VARIABLES['sortable-list-padding'],
    borderRadius: DRAGGABLE_VARIABLES['sortable-list-border-radius'],
    usage: 'Vertical sortable list',
  },

  // Horizontal list
  horizontal: {
    direction: 'row',
    gap: DRAGGABLE_VARIABLES['sortable-item-gap'],
    background: DRAGGABLE_VARIABLES['sortable-list-background'],
    padding: DRAGGABLE_VARIABLES['sortable-list-padding'],
    borderRadius: DRAGGABLE_VARIABLES['sortable-list-border-radius'],
    usage: 'Horizontal sortable list',
  },

  // Grid layout
  grid: {
    direction: 'grid',
    gap: DRAGGABLE_VARIABLES['sortable-item-gap'],
    background: DRAGGABLE_VARIABLES['sortable-list-background'],
    padding: DRAGGABLE_VARIABLES['sortable-list-padding'],
    borderRadius: DRAGGABLE_VARIABLES['sortable-list-border-radius'],
    gridTemplate: 'repeat(auto-fit, minmax(200px, 1fr))',
    usage: 'Sortable grid layout',
  },

} as const;

// DRAG CONSTRAINT VARIANTS - Different movement constraints
export const DRAG_CONSTRAINT_VARIANTS = {
  // Free movement
  free: {
    axis: 'both',
    cursor: DRAGGABLE_VARIABLES['drag-axis-both-cursor'],
    constraint: 'none',
    usage: 'Free 2D movement',
  },

  // Horizontal only
  horizontal: {
    axis: 'x',
    cursor: DRAGGABLE_VARIABLES['drag-axis-x-cursor'],
    constraint: 'horizontal',
    usage: 'Horizontal slider, timeline',
  },

  // Vertical only
  vertical: {
    axis: 'y',
    cursor: DRAGGABLE_VARIABLES['drag-axis-y-cursor'],
    constraint: 'vertical',
    usage: 'Vertical list reordering',
  },

  // Snap to grid
  snap: {
    axis: 'both',
    cursor: DRAGGABLE_VARIABLES['drag-axis-both-cursor'],
    constraint: 'snap',
    snapSize: DRAGGABLE_VARIABLES['snap-grid-size'],
    snapColor: DRAGGABLE_VARIABLES['snap-grid-color'],
    snapOpacity: DRAGGABLE_VARIABLES['snap-grid-opacity'],
    usage: 'Grid-based positioning',
  },

} as const;

// ACCESSIBILITY VARIANTS - Different accessibility configurations
export const DRAGGABLE_ACCESSIBILITY_VARIANTS = {
  // Keyboard navigation
  keyboard: {
    focusOutline: DRAGGABLE_VARIABLES['drag-focus-outline'],
    focusOutlineOffset: DRAGGABLE_VARIABLES['drag-focus-outline-offset'],
    focusOutlineWidth: DRAGGABLE_VARIABLES['drag-focus-outline-width'],
    keyboardIndicator: DRAGGABLE_VARIABLES['drag-keyboard-indicator'],
    usage: 'Keyboard accessible dragging',
  },

  // Screen reader support
  screenReader: {
    textColor: DRAGGABLE_VARIABLES['drag-screen-reader-text'],
    announcements: true,
    liveRegion: 'polite',
    usage: 'Screen reader announcements',
  },

} as const;

// Helper types
export type DraggableTypeVariant = keyof typeof DRAGGABLE_TYPE_VARIANTS;
export type DraggableStateVariant = keyof typeof DRAGGABLE_STATE_VARIANTS;
export type DropZoneVariant = keyof typeof DROP_ZONE_VARIANTS;
export type SortableVariant = keyof typeof SORTABLE_VARIANTS;
export type DragConstraintVariant = keyof typeof DRAG_CONSTRAINT_VARIANTS;
export type DraggableAccessibilityVariant = keyof typeof DRAGGABLE_ACCESSIBILITY_VARIANTS;