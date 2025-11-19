/**
 * 🔄 LAYERA DRAGGABLE COMPONENT TOKENS
 *
 * Component tokens για Drag & Drop, Sortable και Draggable components
 * που χαρτογραφούν semantic tokens σε συγκεκριμένες draggable χρήσεις
 * Enterprise component layer - τελευταίο επίπεδο της τρι-επίπεδης ιεραρχίας
 */

// Import των semantic και core tokens που χρησιμοποιούμε
import { BACKGROUND_VARIABLES } from '../../semantic/background/background.variables';
import { TEXT_VARIABLES } from '../../semantic/text/text.variables';
import { BORDER_SEMANTIC_VARIABLES } from '../../semantic/border/border.variables';
import { MOTION_VARIABLES } from '../../core/motion/motion.variables';
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';
import { SHADOW_VARIABLES } from '../../core/shadows/shadows.variables';

// UNIFIED DRAGGABLE VARIABLES - Όλα τα draggable tokens ενωμένα για CSS export
export const DRAGGABLE_VARIABLES = {
  // DRAGGABLE CONTAINER TOKENS
  'draggable-container-background': BACKGROUND_VARIABLES['background-default'],
  'draggable-container-border': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'draggable-container-border-radius': BORDER_VARIABLES['border-radius-6'],
  'draggable-container-padding': SPACING_VARIABLES['spacing-3'],
  'draggable-container-shadow': SHADOW_VARIABLES['shadow-sm'],
  'draggable-container-transition': MOTION_VARIABLES['transition-normal'],

  // DRAG STATES TOKENS
  'drag-idle-background': BACKGROUND_VARIABLES['background-default'],
  'drag-idle-border': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'drag-idle-shadow': 'none',
  'drag-idle-transform': 'none',
  'drag-idle-opacity': '1',

  'drag-hover-background': BACKGROUND_VARIABLES['background-hover'],
  'drag-hover-border': BORDER_SEMANTIC_VARIABLES['border-interactive'],
  'drag-hover-shadow': SHADOW_VARIABLES['shadow-md'],
  'drag-hover-transform': 'translateY(-1px)',
  'drag-hover-opacity': '1',

  'drag-active-background': BACKGROUND_VARIABLES['background-active'],
  'drag-active-border': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'drag-active-shadow': SHADOW_VARIABLES['shadow-lg'],
  'drag-active-transform': 'scale(1.02) rotate(1deg)',
  'drag-active-opacity': '0.9',

  'drag-dragging-background': BACKGROUND_VARIABLES['background-muted'],
  'drag-dragging-border': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'drag-dragging-shadow': SHADOW_VARIABLES['shadow-xl'],
  'drag-dragging-transform': 'scale(1.05) rotate(2deg)',
  'drag-dragging-opacity': '0.8',

  // DROP ZONE TOKENS
  'drop-zone-background': BACKGROUND_VARIABLES['background-subtle'],
  'drop-zone-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'drop-zone-background-active': BACKGROUND_VARIABLES['background-active'],
  'drop-zone-border': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'drop-zone-border-hover': BORDER_SEMANTIC_VARIABLES['border-interactive'],
  'drop-zone-border-active': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'drop-zone-border-style': 'dashed',
  'drop-zone-border-radius': BORDER_VARIABLES['border-radius-8'],
  'drop-zone-padding': SPACING_VARIABLES['spacing-6'],
  'drop-zone-min-height': SPACING_VARIABLES['spacing-24'],
  'drop-zone-text-color': TEXT_VARIABLES['text-secondary'],
  'drop-zone-text-hover': TEXT_VARIABLES['text-primary'],

  // DROP INDICATOR TOKENS
  'drop-indicator-color': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'drop-indicator-width': '2px',
  'drop-indicator-style': 'solid',
  'drop-indicator-background': BACKGROUND_VARIABLES['background-info'],
  'drop-indicator-opacity': '0.8',
  'drop-indicator-radius': BORDER_VARIABLES['border-radius-2'],

  // DRAG HANDLE TOKENS
  'drag-handle-color': TEXT_VARIABLES['text-tertiary'],
  'drag-handle-color-hover': TEXT_VARIABLES['text-secondary'],
  'drag-handle-color-active': TEXT_VARIABLES['text-primary'],
  'drag-handle-size': SPACING_VARIABLES['spacing-6'],
  'drag-handle-cursor': 'grab',
  'drag-handle-cursor-active': 'grabbing',
  'drag-handle-background': 'transparent',
  'drag-handle-background-hover': BACKGROUND_VARIABLES['background-hover'],

  // SORTABLE LIST TOKENS
  'sortable-item-gap': SPACING_VARIABLES['spacing-2'],
  'sortable-item-margin': SPACING_VARIABLES['spacing-1'],
  'sortable-list-background': BACKGROUND_VARIABLES['background-default'],
  'sortable-list-padding': SPACING_VARIABLES['spacing-2'],
  'sortable-list-border-radius': BORDER_VARIABLES['border-radius-6'],

  // DRAGGABLE GHOST TOKENS
  'drag-ghost-background': BACKGROUND_VARIABLES['background-muted'],
  'drag-ghost-border': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'drag-ghost-opacity': '0.6',
  'drag-ghost-transform': 'scale(0.95)',
  'drag-ghost-shadow': SHADOW_VARIABLES['shadow-md'],

  // DRAG OVERLAY TOKENS
  'drag-overlay-background': 'rgba(0, 0, 0, 0.05)',
  'drag-overlay-backdrop-filter': 'blur(1px)',
  'drag-overlay-z-index': '1000',
  'drag-overlay-cursor': 'grabbing',

  // REORDER ANIMATIONS TOKENS
  'reorder-transition': MOTION_VARIABLES['transition-smooth'],
  'reorder-duration': MOTION_VARIABLES['duration-normal'],
  'reorder-easing': MOTION_VARIABLES['easing-ease-in-out'],
  'reorder-transform': 'translateY(0px)',

  // DRAG CONSTRAINTS TOKENS
  'drag-axis-x-cursor': 'ew-resize',
  'drag-axis-y-cursor': 'ns-resize',
  'drag-axis-both-cursor': 'move',
  'drag-disabled-cursor': 'not-allowed',
  'drag-disabled-opacity': '0.5',

  // SNAP GRID TOKENS
  'snap-grid-size': SPACING_VARIABLES['spacing-4'],
  'snap-grid-color': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'snap-grid-opacity': '0.3',
  'snap-indicator-color': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'snap-indicator-size': SPACING_VARIABLES['spacing-2'],

  // COLLISION DETECTION TOKENS
  'collision-highlight-color': BACKGROUND_VARIABLES['background-warning'],
  'collision-highlight-border': BORDER_SEMANTIC_VARIABLES['border-warning'],
  'collision-highlight-opacity': '0.7',

  // MULTI-SELECT DRAG TOKENS
  'multi-select-background': BACKGROUND_VARIABLES['background-active'],
  'multi-select-border': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'multi-select-count-background': BACKGROUND_VARIABLES['background-info'],
  'multi-select-count-color': TEXT_VARIABLES['text-info-contrast'],
  'multi-select-count-size': SPACING_VARIABLES['spacing-6'],
  'multi-select-count-border-radius': BORDER_VARIABLES['border-radius-full'],

  // ACCESSIBILITY TOKENS
  'drag-focus-outline': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'drag-focus-outline-offset': SPACING_VARIABLES['spacing-1'],
  'drag-focus-outline-width': '2px',
  'drag-keyboard-indicator': BACKGROUND_VARIABLES['background-info'],
  'drag-screen-reader-text': TEXT_VARIABLES['text-primary'],

  // PERFORMANCE TOKENS
  'drag-transform-gpu': 'translate3d(0, 0, 0)',
  'drag-will-change': 'transform',
  'drag-backface-visibility': 'hidden',

} as const;

// Helper types για type safety
export type DragState = 'idle' | 'hover' | 'active' | 'dragging';
export type DropZoneState = 'idle' | 'hover' | 'active' | 'error' | 'success';
export type DragAxis = 'x' | 'y' | 'both' | 'none';
export type DragConstraint = 'none' | 'parent' | 'window' | 'custom';
export type SortableDirection = 'vertical' | 'horizontal' | 'grid';
export type DragAction = 'move' | 'copy' | 'link' | 'none';

// Δομή για draggable system
export interface DraggableSystemStructure {
  draggable: {
    container: Record<string, string>;
    states: Record<DragState, Record<string, string>>;
    handle: Record<string, string>;
    ghost: Record<string, string>;
  };
  dropZone: {
    container: Record<string, string>;
    states: Record<DropZoneState, Record<string, string>>;
    indicator: Record<string, string>;
  };
  sortable: {
    list: Record<string, string>;
    item: Record<string, string>;
    reorder: Record<string, string>;
  };
  accessibility: {
    focus: Record<string, string>;
    keyboard: Record<string, string>;
    screenReader: Record<string, string>;
  };
}