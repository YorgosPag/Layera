// Core compression types
export interface CompressionOptions {
  quality?: number; // 0-100 for lossy formats
  format?: CompressionFormat;
  maxWidth?: number;
  maxHeight?: number;
  maintainAspectRatio?: boolean;
  enableProgressive?: boolean;
  stripMetadata?: boolean;
  customSettings?: Record<string, unknown>;
}

export type CompressionFormat = 'jpeg' | 'webp' | 'avif' | 'png' | 'original';

export interface CompressionResult {
  originalFile: File;
  compressedBlob: Blob;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  format: CompressionFormat;
  quality: number;
  metadata: CompressionMetadata;
}

export interface CompressionMetadata {
  width?: number;
  height?: number;
  originalFormat: string;
  targetFormat: string;
  processingTime: number;
  algorithm: string;
}

export interface CompressionProgress {
  fileId: string;
  stage: 'analyzing' | 'compressing' | 'optimizing' | 'complete';
  progress: number;
  message: string;
  estimatedTimeRemaining?: number;
}

// Batch compression
export interface BatchCompressionOptions extends CompressionOptions {
  maxConcurrentFiles?: number;
  stopOnError?: boolean;
  onFileComplete?: (result: CompressionResult) => void;
  onFileError?: (error: CompressionError) => void;
}

export interface BatchCompressionResult {
  results: CompressionResult[];
  errors: CompressionError[];
  totalOriginalSize: number;
  totalCompressedSize: number;
  overallCompressionRatio: number;
  processingTime: number;
}

// Validation and rules
export interface CompressionRule {
  maxFileSize: number;
  allowedFormats: string[];
  minQuality?: number;
  maxQuality?: number;
  maxDimensions?: {
    width: number;
    height: number;
  };
}

export interface CompressionValidationResult {
  isValid: boolean;
  errors: CompressionValidationError[];
  warnings: CompressionValidationWarning[];
  recommendations: CompressionRecommendation[];
}

export interface CompressionValidationError {
  code: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface CompressionValidationWarning {
  code: string;
  message: string;
  suggestion?: string;
}

export interface CompressionRecommendation {
  type: 'quality' | 'format' | 'dimension' | 'optimization';
  message: string;
  impact: 'high' | 'medium' | 'low';
  estimatedSavings?: number;
}

// Error handling
export class CompressionError extends Error {
  constructor(
    message: string,
    public code: string,
    public fileId?: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'CompressionError';
  }
}

export class UnsupportedFormatError extends CompressionError {
  constructor(format: string, supportedFormats: string[]) {
    super(
      `Unsupported format: ${format}. Supported formats: ${supportedFormats.join(', ')}`,
      'UNSUPPORTED_FORMAT'
    );
  }
}

export class CompressionQualityError extends CompressionError {
  constructor(quality: number, minQuality: number, maxQuality: number) {
    super(
      `Invalid quality: ${quality}. Must be between ${minQuality} and ${maxQuality}`,
      'INVALID_QUALITY'
    );
  }
}

// Configuration
export interface CompressionConfig {
  defaultOptions: CompressionOptions;
  supportedFormats: Record<string, CompressionFormatConfig>;
  maxFileSize: number;
  maxConcurrentCompressions: number;
  enableWebWorkers: boolean;
}

export interface CompressionFormatConfig {
  extension: string;
  mimeType: string;
  qualityRange: {
    min: number;
    max: number;
    default: number;
  };
  supportsProgressive: boolean;
  supportsTransparency: boolean;
  compressionAlgorithm: string;
}

// Events and callbacks
export interface CompressionEvent {
  type: 'compression:started' | 'compression:progress' | 'compression:completed' | 'compression:failed';
  fileId: string;
  data?: unknown;
}

export type CompressionCallback = (event: CompressionEvent) => void;

// Worker types (για background processing)
export interface CompressionWorkerMessage {
  id: string;
  type: 'compress' | 'batch-compress' | 'cancel';
  payload: {
    file?: ArrayBuffer;
    options?: CompressionOptions;
    files?: ArrayBuffer[];
    batchOptions?: BatchCompressionOptions;
  };
}

export interface CompressionWorkerResponse {
  id: string;
  type: 'success' | 'error' | 'progress';
  payload: {
    result?: CompressionResult;
    error?: string;
    progress?: CompressionProgress;
  };
}