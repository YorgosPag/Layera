// Core hook
export { useFileCompression } from './hooks/useFileCompression';
export type { UseFileCompressionOptions, UseFileCompressionReturn } from './hooks/useFileCompression';

// Compression engine
export { CompressionEngine } from './utils/compressionEngine';

// Validation utilities
export {
  validateCompressionOptions,
  recommendOptimizations,
  getOptimalFormat,
  calculateCompressionScore,
  validateBatchOptions
} from './utils/compressionValidator';

// Types
export type {
  CompressionOptions,
  CompressionResult,
  CompressionFormat,
  CompressionMetadata,
  CompressionProgress,
  BatchCompressionOptions,
  BatchCompressionResult,
  CompressionRule,
  CompressionValidationResult,
  CompressionValidationError,
  CompressionValidationWarning,
  CompressionRecommendation,
  CompressionConfig,
  CompressionFormatConfig,
  CompressionEvent,
  CompressionCallback,
  CompressionWorkerMessage,
  CompressionWorkerResponse
} from './types';

// Error classes
export {
  CompressionError,
  UnsupportedFormatError,
  CompressionQualityError
} from './types';