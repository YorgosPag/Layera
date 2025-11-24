/**
 * Draggable Index - Export all draggable tokens
 *
 * 🔄 Κεντρικό σημείο export για όλο το draggable system
 * - Class definitions & interfaces
 * - Variants & contexts
 * - Variables & actual values
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Single export point για draggable components
 */

// Type definitions & structure
export type {
  DragState,
  DropZoneState,
  DragAxis,
  DragConstraint,
  SortableDirection,
  DragAction,
  DraggableSystemStructure,
} from './draggable.variables';

export {
  DraggableSystem,
  DRAGGABLE_SEMANTIC_RULES,
  LAYERA_DRAGGABLE_CSS,
  draggableSystem,
} from './draggable.class';

// Variants & contexts
export type {
  DraggableTypeVariant,
  DraggableStateVariant,
  DropZoneVariant,
  SortableVariant,
  DragConstraintVariant,
  DraggableAccessibilityVariant,
} from './draggable.variants';

export {
  DRAGGABLE_TYPE_VARIANTS,
  DRAGGABLE_STATE_VARIANTS,
  DROP_ZONE_VARIANTS,
  SORTABLE_VARIANTS,
  DRAG_CONSTRAINT_VARIANTS,
  DRAGGABLE_ACCESSIBILITY_VARIANTS,
} from './draggable.variants';

// Actual draggable values
export {
  DRAGGABLE_VARIABLES,
} from './draggable.variables';

// Default exports για εύκολη χρήση
export const Draggable = {
  variables: DRAGGABLE_VARIABLES,
  typeVariants: DRAGGABLE_TYPE_VARIANTS,
  stateVariants: DRAGGABLE_STATE_VARIANTS,
  dropZoneVariants: DROP_ZONE_VARIANTS,
  sortableVariants: SORTABLE_VARIANTS,
  constraintVariants: DRAG_CONSTRAINT_VARIANTS,
  accessibilityVariants: DRAGGABLE_ACCESSIBILITY_VARIANTS,
  system: draggableSystem,
} as const;

// Re-export των imports για convenience
import { DRAGGABLE_VARIABLES } from './draggable.variables';
import {
  DRAGGABLE_TYPE_VARIANTS,
  DRAGGABLE_STATE_VARIANTS,
  DROP_ZONE_VARIANTS,
  SORTABLE_VARIANTS,
  DRAG_CONSTRAINT_VARIANTS,
  DRAGGABLE_ACCESSIBILITY_VARIANTS
} from './draggable.variants';
import { draggableSystem } from './draggable.class';