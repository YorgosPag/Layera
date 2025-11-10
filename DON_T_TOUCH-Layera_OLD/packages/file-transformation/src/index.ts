// Core hook
export { useFileTransformation } from './hooks/useFileTransformation';
export type { UseFileTransformationOptions, UseFileTransformationReturn } from './hooks/useFileTransformation';

// Transformers
export { LayeraVectorTransformer } from './transformers/vectorTransformer';

// Utilities
export { CoordinateTransformer } from './utils/coordinateTransformer';
export {
  validateTransformationOptions,
  getFormatCompatibility,
  getFormatCategory,
  validateBatchTransformation,
  estimateTransformationComplexity
} from './utils/transformationValidator';

// Types
export type {
  TransformationOptions,
  SupportedFormat,
  TransformationParams,
  CoordinateTransform,
  DatumTransform,
  QualitySettings,
  TransformationResult,
  TransformationMetadata,
  GeometryStatistics,
  BoundingBox,
  CoordinateInfo,
  BatchTransformationOptions,
  BatchTransformationResult,
  TransformationProgress,
  TransformationValidationResult,
  TransformationValidationError,
  TransformationValidationWarning,
  FormatCompatibility,
  TransformationConfig,
  FormatConfig,
  CRSDefinition,
  TransformationEvent,
  TransformationCallback,
  VectorTransformer,
  RasterTransformer,
  CADTransformer,
  TransformationWorkerMessage,
  TransformationWorkerResponse
} from './types';

// Error classes
export {
  TransformationError,
  UnsupportedTransformationError,
  CoordinateTransformationError
} from './types';