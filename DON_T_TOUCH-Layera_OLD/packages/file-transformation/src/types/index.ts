// Core transformation types
export interface TransformationOptions {
  sourceFormat: SupportedFormat;
  targetFormat: SupportedFormat;
  sourceCRS?: string; // Coordinate Reference System
  targetCRS?: string;
  transformationParams?: TransformationParams;
  qualitySettings?: QualitySettings;
  customOptions?: Record<string, unknown>;
}

export type SupportedFormat =
  // Vector formats
  | 'dxf' | 'dwg' | 'svg' | 'geojson' | 'kml' | 'gpx' | 'shapefile'
  // Raster formats
  | 'tiff' | 'geotiff' | 'png' | 'jpeg' | 'webp'
  // CAD formats
  | 'autocad' | 'microstation'
  // Document formats
  | 'pdf';

export interface TransformationParams {
  // Coordinate transformation
  coordinateTransform?: CoordinateTransform;

  // Geometric transformations
  scale?: { x: number; y: number; z?: number };
  rotation?: number; // degrees
  translation?: { x: number; y: number; z?: number };

  // Unit conversion
  sourceUnits?: 'meters' | 'feet' | 'inches' | 'millimeters' | 'centimeters';
  targetUnits?: 'meters' | 'feet' | 'inches' | 'millimeters' | 'centimeters';

  // Precision settings
  precision?: number;
  tolerance?: number;
}

export interface CoordinateTransform {
  sourceEPSG: string;
  targetEPSG: string;
  transformationMethod?: 'proj4' | 'custom';
  datumTransform?: DatumTransform;
}

export interface DatumTransform {
  name: string;
  parameters: number[];
  accuracy: number;
}

export interface QualitySettings {
  preserveMetadata?: boolean;
  optimizeGeometry?: boolean;
  simplificationTolerance?: number;
  compressionLevel?: number;
  colorDepth?: 8 | 16 | 24 | 32;
}

export interface TransformationResult {
  originalFile: File;
  transformedBlob: Blob;
  originalFormat: SupportedFormat;
  targetFormat: SupportedFormat;
  originalSize: number;
  transformedSize: number;
  metadata: TransformationMetadata;
  coordinateInfo?: CoordinateInfo;
}

export interface TransformationMetadata {
  processingTime: number;
  transformationsApplied: string[];
  qualitySettings: QualitySettings;
  coordinateSystemInfo?: {
    source: string;
    target: string;
    accuracy: number;
  };
  geometryStatistics?: GeometryStatistics;
}

export interface GeometryStatistics {
  entityCount: number;
  vertexCount: number;
  boundingBox: BoundingBox;
  layerCount?: number;
  complexityScore: number;
}

export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  minZ?: number;
  maxZ?: number;
}

export interface CoordinateInfo {
  sourceCRS: string;
  targetCRS: string;
  transformationAccuracy: number;
  transformedPoints: number;
}

// Batch transformation
export interface BatchTransformationOptions extends TransformationOptions {
  maxConcurrentFiles?: number;
  stopOnError?: boolean;
  onFileComplete?: (result: TransformationResult) => void;
  onFileError?: (error: TransformationError) => void;
}

export interface BatchTransformationResult {
  results: TransformationResult[];
  errors: TransformationError[];
  totalProcessingTime: number;
  successCount: number;
  errorCount: number;
}

// Progress tracking
export interface TransformationProgress {
  fileId: string;
  stage: 'parsing' | 'transforming' | 'converting' | 'optimizing' | 'complete';
  progress: number;
  message: string;
  estimatedTimeRemaining?: number;
  currentOperation?: string;
}

// Validation
export interface TransformationValidationResult {
  isValid: boolean;
  errors: TransformationValidationError[];
  warnings: TransformationValidationWarning[];
  compatibility: FormatCompatibility;
}

export interface TransformationValidationError {
  code: string;
  message: string;
  severity: 'error' | 'warning';
  field?: string;
}

export interface TransformationValidationWarning {
  code: string;
  message: string;
  suggestion?: string;
  impact: 'high' | 'medium' | 'low';
}

export interface FormatCompatibility {
  sourceSupported: boolean;
  targetSupported: boolean;
  dataLossRisk: 'none' | 'low' | 'medium' | 'high';
  recommendedAlternatives?: SupportedFormat[];
  limitations: string[];
}

// Error handling
export class TransformationError extends Error {
  constructor(
    message: string,
    public code: string,
    public fileId?: string,
    public stage?: TransformationProgress['stage'],
    public originalError?: Error
  ) {
    super(message);
    this.name = 'TransformationError';
  }
}

export class UnsupportedTransformationError extends TransformationError {
  constructor(sourceFormat: string, targetFormat: string) {
    super(
      `Transformation from ${sourceFormat} to ${targetFormat} is not supported`,
      'UNSUPPORTED_TRANSFORMATION'
    );
  }
}

export class CoordinateTransformationError extends TransformationError {
  constructor(sourceCRS: string, targetCRS: string, reason: string) {
    super(
      `Coordinate transformation failed from ${sourceCRS} to ${targetCRS}: ${reason}`,
      'COORDINATE_TRANSFORMATION_FAILED'
    );
  }
}

// Configuration
export interface TransformationConfig {
  defaultOptions: TransformationOptions;
  supportedFormats: Record<SupportedFormat, FormatConfig>;
  coordinateSystems: Record<string, CRSDefinition>;
  maxFileSize: number;
  maxConcurrentTransformations: number;
  tempDirectory?: string;
}

export interface FormatConfig {
  extension: string;
  mimeType: string;
  category: 'vector' | 'raster' | 'cad' | 'document';
  supportedFeatures: string[];
  limitations: string[];
  transformationCapabilities: {
    canBeSource: boolean;
    canBeTarget: boolean;
    supportedTransformations: SupportedFormat[];
  };
}

export interface CRSDefinition {
  epsg: string;
  name: string;
  proj4Definition: string;
  units: string;
  authority: string;
  bbox?: BoundingBox;
}

// Events and callbacks
export interface TransformationEvent {
  type: 'transformation:started' | 'transformation:progress' | 'transformation:completed' | 'transformation:failed';
  fileId: string;
  data?: unknown;
}

export type TransformationCallback = (event: TransformationEvent) => void;

// Specific transformer interfaces
export interface VectorTransformer {
  name: string;
  supportedFormats: SupportedFormat[];
  transform(
    data: unknown,
    options: TransformationOptions
  ): Promise<unknown>;
}

export interface RasterTransformer {
  name: string;
  supportedFormats: SupportedFormat[];
  transform(
    imageData: ImageData | ArrayBuffer,
    options: TransformationOptions
  ): Promise<ArrayBuffer>;
}

export interface CADTransformer {
  name: string;
  supportedFormats: SupportedFormat[];
  transform(
    cadData: unknown,
    options: TransformationOptions
  ): Promise<unknown>;
}

// Worker types (για background processing)
export interface TransformationWorkerMessage {
  id: string;
  type: 'transform' | 'batch-transform' | 'cancel';
  payload: {
    file?: ArrayBuffer;
    options?: TransformationOptions;
    files?: ArrayBuffer[];
    batchOptions?: BatchTransformationOptions;
  };
}

export interface TransformationWorkerResponse {
  id: string;
  type: 'success' | 'error' | 'progress';
  payload: {
    result?: TransformationResult;
    error?: string;
    progress?: TransformationProgress;
  };
}