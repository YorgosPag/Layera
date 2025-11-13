// Core components
export { FileImporter } from './components/FileImporter';
export type { FileImporterProps } from './components/FileImporter';

// Note: DragDropZone, FileList, FilePreview have been consolidated into @layera/file-upload
// Use @layera/file-upload for these components which provide enhanced enterprise features

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