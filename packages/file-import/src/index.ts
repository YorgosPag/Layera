// Core components
export { FileImporter } from './components/FileImporter';
export type { FileImporterProps } from './components/FileImporter';

export { DragDropZone } from './components/DragDropZone';
export type { DragDropZoneProps } from './components/DragDropZone';

export { FileList } from './components/FileList';
export type { FileListProps } from './components/FileList';

export { FilePreview } from './components/FilePreview';
export type { FilePreviewProps } from './components/FilePreview';

// Hooks
export { useFileImport } from './hooks/useFileImport';
export type {
  UseFileImportOptions,
  UseFileImportReturn
} from './hooks/useFileImport';

// Types
export type {
  ImportedFile,
  FileMetadata,
  FileValidationRule,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  FileProcessingOptions,
  FileImportProgress,
  DragDropState,
  SupportedFormat,
  FileTypeInfo,
  FileImportEvent
} from './types';

// Error classes
export {
  FileImportError,
  FileSizeError,
  FileTypeError
} from './types';

// Utilities
export {
  validateFile,
  detectFileType,
  extractFileMetadata,
  SUPPORTED_FILE_TYPES
} from './utils/fileValidation';