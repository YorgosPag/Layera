// Core hook
export { useCADProcessing } from './hooks/useCADProcessing';
export type { UseCADProcessingOptions, UseCADProcessingReturn } from './hooks/useCADProcessing';

// Parsers
export { LayeraDXFParser } from './parsers/dxfParser';

// Renderers
export { CADRenderer } from './renderers/cadRenderer';

// Utilities
export {
  validateCADFile,
  validateCADProcessingOptions,
  estimateCADComplexity
} from './utils/cadValidator';

// Types
export type {
  CADProcessingOptions,
  CADFormat,
  CADParseOptions,
  CADRenderOptions,
  CADTransformOptions,
  CADOptimizationOptions,
  CADUnits,
  CADData,
  CADHeader,
  CADTables,
  CADLayer,
  CADLineType,
  CADTextStyle,
  CADBlockDefinition,
  CADViewport,
  CADBlock,
  CADEntity,
  CADEntityType,
  CADGeometry,
  CADPoint3D,
  CADColor,
  CADMetadata,
  CADBoundingBox,
  CADStatistics,
  CADProcessingResult,
  CADRenderData,
  CADLayerRenderData,
  CADWarning,
  CADError,
  CADProcessingProgress,
  CADProcessingConfig,
  CADProcessingEvent,
  CADProcessingCallback,
  CADValidationResult,
  CADValidationError,
  CADValidationWarning,
  CADFileInfo,
  CADToGeoJSONOptions,
  CADToSVGOptions,
  CADExportOptions
} from './types';

// Error classes
export {
  CADProcessingError,
  DXFParsingError,
  DWGNotSupportedError,
  CADRenderingError
} from './types';