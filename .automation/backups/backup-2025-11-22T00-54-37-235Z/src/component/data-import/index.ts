/**
 * Data Import Index - Export all data import tokens
 *
 * 📂 Κεντρικό σημείο export για όλο το data import system
 * - Variables & actual values
 * - Variants & component combinations
 * - Class system & CSS generation
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Single export point για data import
 */

// Actual data import values
export {
  DATA_IMPORT_VARIABLES,
} from './data-import.variables';

// Data import variants
export {
  DATA_IMPORT_VARIANTS,
  IMPORT_STEP_VARIANTS,
  FILE_SELECTOR_VARIANTS,
  VALIDATION_MESSAGE_VARIANTS,
  FIELD_MAPPING_VARIANTS,
  IMPORT_STATUS_VARIANTS,
  PROGRESS_BAR_VARIANTS,
  IMPORT_BUTTON_VARIANTS,
  IMPORT_CONTAINER_VARIANTS,
  RESPONSIVE_IMPORT_VARIANTS,
} from './data-import.variants';

// Data import component system class
export {
  DataImportComponentSystem,
  LAYERA_DATA_IMPORT_CSS,
} from './data-import.class';

// Helper types from variables file
export type {
  ImportStepType,
  ImportStepState,
  ImportValidationLevel,
  ImportProgressState,
  ImportFileType,
  ImportMappingState,
} from './data-import.variables';

// Helper types from variants file
export type {
  ImportStepVariant,
  FileSelectorVariant,
  ValidationVariant,
  FieldMappingVariant,
  ImportStatusVariant,
  ProgressBarVariant,
  ImportButtonVariant,
  ImportContainerVariant,
  ResponsiveVariant,
} from './data-import.variants';

// Default exports για εύκολη χρήση
export const DataImport = {
  variables: DATA_IMPORT_VARIABLES,
  variants: DATA_IMPORT_VARIANTS,
  system: DataImportComponentSystem,
  css: LAYERA_DATA_IMPORT_CSS,
} as const;

// Re-export των imports για convenience
import { DATA_IMPORT_VARIABLES } from './data-import.variables';
import { DATA_IMPORT_VARIANTS } from './data-import.variants';
import { DataImportComponentSystem, LAYERA_DATA_IMPORT_CSS } from './data-import.class';