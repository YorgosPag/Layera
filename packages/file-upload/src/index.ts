/**
 * @layera/file-upload
 * Enterprise-grade file upload system για Layera ecosystem
 *
 * Features:
 * - Drag & Drop interface με visual feedback
 * - Chunked upload για large files (Google Drive/Dropbox style)
 * - Multiple file support με concurrent uploading
 * - Real-time progress tracking με speed & ETA
 * - File validation & security checks
 * - Preview support για images
 * - Error handling & retry functionality
 * - Full translation support via @layera/tolgee (Greek/English)
 * - Dark/Light theme support
 * - Enterprise-grade TypeScript typing
 */

// Main Components
export { FileUploader } from './components/FileUploader';
export { DragDropZone } from './components/DragDropZone';
export { FileList } from './components/FileList';
export { FilePreview } from './components/FilePreview';

// Utilities
export { UploadEngine } from './utils/uploadEngine';
export { validateFile, validateFileList, formatBytes, isImageFile, isPreviewSupported } from './utils/fileValidation';

// Types
export type {
  FileUploadStatus,
  SupportedFileType,
  FileUploadConfig,
  FileUploadItem,
  ChunkUploadProgress,
  FileValidationResult,
  UploadEventCallbacks,
  DragDropZoneProps,
  FilePreviewProps,
  FileListProps,
  FileUploaderProps
} from './types';

// Import for internal use
import type { FileUploadConfig } from './types';

// Default configurations
export const DEFAULT_UPLOAD_CONFIG: FileUploadConfig = {
  maxFileSize: 100 * 1024 * 1024, // 100MB
  maxTotalSize: 500 * 1024 * 1024, // 500MB
  enableChunking: true,
  chunkSize: 1024 * 1024, // 1MB chunks
  maxConcurrent: 3,
  autoUpload: false,
  enableDragDrop: true,
  uploadUrl: '/api/upload', // Default upload endpoint
  acceptedTypes: [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
    'text/plain', 'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    // CAD file support (enhanced from file-import)
    'application/dxf',
    'application/dwg'
  ]
};