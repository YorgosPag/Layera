// Core file processing types
export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  dimensions?: {
    width: number;
    height: number;
  };
  bounds?: unknown; // Will be L.LatLngBounds in geo context
}

export interface ImportedFile {
  id: string;
  file: File;
  metadata: FileMetadata;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
  processedData?: ArrayBuffer | string;
  previewUrl?: string;
}

export interface FileValidationRule {
  maxSize: number;
  minSize?: number;
  allowedExtensions: string[];
  allowedMimeTypes?: string[];
  customValidator?: (file: File) => Promise<ValidationResult>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  code: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationWarning {
  code: string;
  message: string;
  suggestion?: string;
}

export interface FileProcessingOptions {
  validateFile?: boolean;
  generatePreview?: boolean;
  extractMetadata?: boolean;
  compressionLevel?: number;
}

export interface FileImportProgress {
  fileId: string;
  stage: 'validation' | 'processing' | 'preview' | 'complete';
  progress: number;
  message: string;
}

export interface DragDropState {
  isDragging: boolean;
  isOver: boolean;
  canDrop: boolean;
}

export type SupportedFormat = 'dxf' | 'dwg' | 'pdf' | 'jpg' | 'jpeg' | 'png' | 'webp' | 'svg' | 'tiff' | 'bmp';

export interface FileTypeInfo {
  extension: string;
  mimeType: string;
  category: 'cad' | 'image' | 'document' | 'vector';
  description: string;
  maxRecommendedSize: number;
}

// Event types για integration με notifications
export interface FileImportEvent {
  type: 'import:started' | 'import:progress' | 'import:completed' | 'import:failed';
  fileId: string;
  data?: unknown;
}

// Error types
export class FileImportError extends Error {
  constructor(
    message: string,
    public code: string,
    public fileId?: string
  ) {
    super(message);
    this.name = 'FileImportError';
  }
}

export class FileSizeError extends FileImportError {
  constructor(filename: string, size: number, maxSize: number) {
    super(
      `File ${filename} (${Math.round(size / 1024 / 1024)}MB) exceeds maximum size of ${Math.round(maxSize / 1024 / 1024)}MB`,
      'FILE_TOO_LARGE'
    );
  }
}

export class FileTypeError extends FileImportError {
  constructor(filename: string, type: string, allowedTypes: string[]) {
    super(
      `File ${filename} has unsupported type ${type}. Allowed types: ${allowedTypes.join(', ')}`,
      'UNSUPPORTED_FILE_TYPE'
    );
  }
}