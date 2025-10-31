/**
 * File upload types για @layera/file-upload
 * Βασισμένο στην enterprise documentation και best practices
 */

export type FileUploadStatus = 'idle' | 'uploading' | 'completed' | 'error' | 'cancelled' | 'paused';

export type SupportedFileType =
  | 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' | 'image/svg+xml'
  | 'application/pdf'
  | 'text/plain' | 'text/csv'
  | 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/zip' | 'application/x-rar-compressed'
  | 'image/vnd.dxf' | 'application/dxf' | 'application/dwg'
  | 'application/json' | 'application/xml';

export interface FileUploadConfig {
  /** Maximum file size σε bytes */
  maxFileSize: number;
  /** Maximum total size για όλα τα files */
  maxTotalSize: number;
  /** Accepted file types */
  acceptedTypes: SupportedFileType[];
  /** Enable chunk upload για large files */
  enableChunking: boolean;
  /** Chunk size σε bytes */
  chunkSize: number;
  /** Maximum concurrent uploads */
  maxConcurrent: number;
  /** Auto-start upload on file selection */
  autoUpload: boolean;
  /** Enable drag & drop */
  enableDragDrop: boolean;
  /** Upload endpoint URL */
  uploadUrl: string;
  /** HTTP headers για upload requests */
  headers?: Record<string, string>;
}

export interface FileUploadItem {
  /** Unique identifier */
  id: string;
  /** File object */
  file: File;
  /** Upload status */
  status: FileUploadStatus;
  /** Upload progress (0-100) */
  progress: number;
  /** Upload speed σε bytes/second */
  speed?: number;
  /** Estimated time remaining σε seconds */
  eta?: number;
  /** Error message αν υπάρχει */
  error?: string;
  /** Server response αν ολοκληρώθηκε */
  response?: unknown;
  /** Preview URL για images */
  previewUrl?: string;
  /** Upload start timestamp */
  startTime?: number;
  /** Upload completion timestamp */
  completionTime?: number;
}

export interface ChunkUploadProgress {
  /** Current chunk number */
  currentChunk: number;
  /** Total chunks */
  totalChunks: number;
  /** Bytes uploaded για current chunk */
  chunkBytesUploaded: number;
  /** Total bytes uploaded */
  totalBytesUploaded: number;
  /** Total file size */
  totalFileSize: number;
}

export interface FileValidationResult {
  /** Whether file is valid */
  isValid: boolean;
  /** Validation errors */
  errors: string[];
  /** Validation warnings */
  warnings: string[];
}

export interface UploadEventCallbacks {
  /** Called when upload starts */
  onUploadStart?: (file: FileUploadItem) => void;
  /** Called during upload progress */
  onUploadProgress?: (file: FileUploadItem, progress: ChunkUploadProgress) => void;
  /** Called when upload completes successfully */
  onUploadComplete?: (file: FileUploadItem) => void;
  /** Called when upload fails */
  onUploadError?: (file: FileUploadItem, error: string) => void;
  /** Called when upload is cancelled */
  onUploadCancel?: (file: FileUploadItem) => void;
  /** Called when file is removed */
  onFileRemove?: (file: FileUploadItem) => void;
  /** Called when all uploads complete */
  onAllUploadsComplete?: (files: FileUploadItem[]) => void;
}

export interface DragDropZoneProps {
  /** Whether drag & drop is enabled */
  enabled: boolean;
  /** Accepted file types */
  acceptedTypes: SupportedFileType[];
  /** Maximum files that can be dropped */
  maxFiles?: number;
  /** Custom drop zone text */
  dropZoneText?: string;
  /** Called when files are dropped */
  onFilesDrop: (files: File[]) => void;
  /** Custom CSS classes */
  className?: string;
  /** Whether multiple files are allowed */
  multiple?: boolean;
}

export interface FilePreviewProps {
  /** File to preview */
  file: FileUploadItem;
  /** Whether preview is enabled */
  showPreview: boolean;
  /** Called when file is removed */
  onRemove: (fileId: string) => void;
  /** Called when file is clicked */
  onClick?: (file: FileUploadItem) => void;
}

export interface FileListProps {
  /** List of files */
  files: FileUploadItem[];
  /** Whether to show progress bars */
  showProgress: boolean;
  /** Whether to show file actions */
  showActions: boolean;
  /** Called when file is removed */
  onRemove: (fileId: string) => void;
  /** Called when upload is cancelled */
  onCancel: (fileId: string) => void;
  /** Called when upload is retried */
  onRetry: (fileId: string) => void;
}

export interface FileUploaderProps extends UploadEventCallbacks {
  /** Upload configuration */
  config: FileUploadConfig;
  /** Initial files */
  initialFiles?: File[];
  /** Custom CSS classes */
  className?: string;
  /** Whether uploader is disabled */
  disabled?: boolean;
  /** Custom drop zone component */
  customDropZone?: React.ComponentType<DragDropZoneProps>;
  /** Custom file list component */
  customFileList?: React.ComponentType<FileListProps>;
}