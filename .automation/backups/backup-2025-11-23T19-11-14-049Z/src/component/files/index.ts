/**
 * Files Index - Export all files tokens
 *
 * 📁 Κεντρικό σημείο export για όλο το files system
 * - Class definitions & interfaces
 * - Variants & contexts
 * - Variables & actual values
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Single export point για files components
 */

// Type definitions & structure
export type {
  FileType,
  FileStatus,
  FileSize,
  FileAction,
  ConversionStatus,
  DropZoneState,
  FilesSystemStructure,
} from './files.variables';

export {
  FilesSystem,
  FILES_SEMANTIC_RULES,
  LAYERA_FILES_CSS,
} from './files.class';

// Variants & contexts
export type {
  UploadZoneVariantType,
  FileListVariantType,
  FileTypeVariantType,
  FileStatusVariantType,
  FilePreviewVariantType,
  FileSizeVariantType,
  BatchOperationsVariantType,
} from './files.variants';

export {
  UPLOAD_ZONE_VARIANTS,
  FILE_LIST_VARIANTS,
  FILE_TYPE_VARIANTS,
  FILE_STATUS_VARIANTS,
  FILE_PREVIEW_VARIANTS,
  FILE_SIZE_VARIANTS,
  BATCH_OPERATIONS_VARIANTS,
} from './files.variants';

// Actual files values
export {
  FILES_VARIABLES,
} from './files.variables';

// Default exports για εύκολη χρήση
export const Files = {
  variables: FILES_VARIABLES,
  uploadZoneVariants: UPLOAD_ZONE_VARIANTS,
  fileListVariants: FILE_LIST_VARIANTS,
  fileTypeVariants: FILE_TYPE_VARIANTS,
  statusVariants: FILE_STATUS_VARIANTS,
  previewVariants: FILE_PREVIEW_VARIANTS,
  sizeVariants: FILE_SIZE_VARIANTS,
  batchVariants: BATCH_OPERATIONS_VARIANTS,
  system: FilesSystem,
} as const;

// Re-export των imports για convenience
import { FILES_VARIABLES } from './files.variables';
import {
  UPLOAD_ZONE_VARIANTS,
  FILE_LIST_VARIANTS,
  FILE_TYPE_VARIANTS,
  FILE_STATUS_VARIANTS,
  FILE_PREVIEW_VARIANTS,
  FILE_SIZE_VARIANTS,
  BATCH_OPERATIONS_VARIANTS
} from './files.variants';
import { FilesSystem } from './files.class';