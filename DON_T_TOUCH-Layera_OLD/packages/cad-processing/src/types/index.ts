// Core CAD processing types
export interface CADProcessingOptions {
  format: CADFormat;
  parseOptions?: CADParseOptions;
  renderOptions?: CADRenderOptions;
  transformOptions?: CADTransformOptions;
  optimizationOptions?: CADOptimizationOptions;
}

export type CADFormat = 'dxf' | 'dwg' | 'dwf' | 'dgn';

export interface CADParseOptions {
  preserveLayerStructure?: boolean;
  preserveBlockStructure?: boolean;
  preserveTextStyles?: boolean;
  preserveLineTypes?: boolean;
  preserveColors?: boolean;
  parseCustomEntities?: boolean;
  encoding?: 'utf-8' | 'cp1252' | 'iso-8859-1';
  toleranceMode?: 'strict' | 'lenient';
}

export interface CADRenderOptions {
  renderLayers?: string[] | 'all';
  renderBlocks?: boolean;
  renderText?: boolean;
  renderDimensions?: boolean;
  renderHatches?: boolean;
  scaleFactor?: number;
  coordinateSystem?: 'model' | 'paper';
  units?: CADUnits;
}

export interface CADTransformOptions {
  targetCoordinateSystem?: string;
  unitConversion?: {
    from: CADUnits;
    to: CADUnits;
  };
  geometricTransform?: {
    scale?: { x: number; y: number; z?: number };
    rotation?: number;
    translation?: { x: number; y: number; z?: number };
  };
}

export interface CADOptimizationOptions {
  simplifyGeometry?: boolean;
  simplificationTolerance?: number;
  mergeColinearLines?: boolean;
  removeDuplicateEntities?: boolean;
  optimizeBlocks?: boolean;
  stripUnusedLayers?: boolean;
}

export type CADUnits = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft' | 'yd' | 'mil' | 'units';

// CAD Data structures
export interface CADData {
  header: CADHeader;
  tables: CADTables;
  blocks: CADBlock[];
  entities: CADEntity[];
  metadata: CADMetadata;
}

export interface CADHeader {
  version: string;
  createdBy?: string;
  modifiedBy?: string;
  creationDate?: Date;
  modificationDate?: Date;
  drawingUnits: CADUnits;
  insertionBasePoint: CADPoint3D;
  extentsMin: CADPoint3D;
  extentsMax: CADPoint3D;
  customProperties: Record<string, unknown>;
}

export interface CADTables {
  layers: CADLayer[];
  lineTypes: CADLineType[];
  textStyles: CADTextStyle[];
  blocks: CADBlockDefinition[];
  viewports: CADViewport[];
}

export interface CADLayer {
  name: string;
  color: CADColor;
  lineType: string;
  lineWeight: number;
  visible: boolean;
  locked: boolean;
  frozen: boolean;
  plotStyle?: string;
}

export interface CADLineType {
  name: string;
  description: string;
  pattern: number[];
  patternLength: number;
}

export interface CADTextStyle {
  name: string;
  fontName: string;
  fontSize: number;
  oblique: number;
  widthFactor: number;
  backwards: boolean;
  upsideDown: boolean;
}

export interface CADBlockDefinition {
  name: string;
  basePoint: CADPoint3D;
  entities: CADEntity[];
  description?: string;
}

export interface CADViewport {
  name: string;
  center: CADPoint3D;
  width: number;
  height: number;
  target: CADPoint3D;
  direction: CADPoint3D;
}

export interface CADBlock {
  name: string;
  insertionPoint: CADPoint3D;
  scale: CADPoint3D;
  rotation: number;
  attributes: Record<string, string>;
}

// CAD Entity types
export interface CADEntity {
  id: string;
  type: CADEntityType;
  layer: string;
  color: CADColor;
  lineType: string;
  lineWeight: number;
  geometry: CADGeometry;
  extendedData?: Record<string, unknown>;
}

export type CADEntityType =
  | 'LINE' | 'CIRCLE' | 'ARC' | 'ELLIPSE' | 'POINT'
  | 'POLYLINE' | 'LWPOLYLINE' | 'SPLINE' | 'TEXT' | 'MTEXT'
  | 'INSERT' | 'DIMENSION' | 'HATCH' | 'SOLID' | 'FACE3D'
  | 'MESH' | 'SURFACE' | 'REGION' | 'BODY' | '3DSOLID';

export interface CADGeometry {
  type: CADEntityType;
  points: CADPoint3D[];
  properties: Record<string, unknown>;
}

export interface CADPoint3D {
  x: number;
  y: number;
  z: number;
}

export interface CADColor {
  type: 'index' | 'rgb' | 'named';
  value: number | string | { r: number; g: number; b: number };
}

export interface CADMetadata {
  originalFormat: CADFormat;
  fileSize: number;
  parsingTime: number;
  entityCount: number;
  layerCount: number;
  blockCount: number;
  boundingBox: CADBoundingBox;
  statistics: CADStatistics;
}

export interface CADBoundingBox {
  min: CADPoint3D;
  max: CADPoint3D;
  center: CADPoint3D;
  size: CADPoint3D;
}

export interface CADStatistics {
  lines: number;
  circles: number;
  arcs: number;
  polylines: number;
  text: number;
  blocks: number;
  other: number;
  totalVertices: number;
  complexityScore: number;
}

// Processing results
export interface CADProcessingResult {
  originalFile: File;
  cadData: CADData;
  processingTime: number;
  warnings: CADWarning[];
  errors: CADError[];
  renderData?: CADRenderData;
}

export interface CADRenderData {
  svg: string;
  bounds: CADBoundingBox;
  layers: CADLayerRenderData[];
  scale: number;
  viewBox: string;
}

export interface CADLayerRenderData {
  name: string;
  visible: boolean;
  elementCount: number;
  svgGroup: string;
}

export interface CADWarning {
  code: string;
  message: string;
  entity?: string;
  layer?: string;
  suggestion?: string;
}

export interface CADError {
  code: string;
  message: string;
  severity: 'critical' | 'error' | 'warning';
  entity?: string;
  position?: CADPoint3D;
  context?: string;
}

// Progress tracking
export interface CADProcessingProgress {
  stage: 'parsing' | 'processing' | 'rendering' | 'optimizing' | 'complete';
  progress: number;
  message: string;
  currentEntity?: string;
  entitiesProcessed?: number;
  totalEntities?: number;
}

// Error classes
export class CADProcessingError extends Error {
  constructor(
    message: string,
    public code: string,
    public stage?: CADProcessingProgress['stage'],
    public originalError?: Error
  ) {
    super(message);
    this.name = 'CADProcessingError';
  }
}

export class DXFParsingError extends CADProcessingError {
  constructor(message: string, lineNumber?: number) {
    super(
      `DXF parsing failed: ${message}${lineNumber ? ` at line ${lineNumber}` : ''}`,
      'DXF_PARSING_ERROR',
      'parsing'
    );
  }
}

export class DWGNotSupportedError extends CADProcessingError {
  constructor() {
    super(
      'DWG format is not yet supported. Please convert to DXF format.',
      'DWG_NOT_SUPPORTED',
      'parsing'
    );
  }
}

export class CADRenderingError extends CADProcessingError {
  constructor(message: string, entityType?: string) {
    super(
      `CAD rendering failed: ${message}${entityType ? ` for entity type ${entityType}` : ''}`,
      'CAD_RENDERING_ERROR',
      'rendering'
    );
  }
}

// Configuration
export interface CADProcessingConfig {
  defaultParseOptions: CADParseOptions;
  defaultRenderOptions: CADRenderOptions;
  supportedFormats: CADFormat[];
  maxFileSize: number;
  maxEntities: number;
  enableOptimization: boolean;
  renderingEngine: 'svg' | 'canvas' | 'webgl';
}

// Events and callbacks
export interface CADProcessingEvent {
  type: 'cad:parsing:started' | 'cad:parsing:progress' | 'cad:parsing:completed' | 'cad:parsing:failed'
      | 'cad:rendering:started' | 'cad:rendering:progress' | 'cad:rendering:completed' | 'cad:rendering:failed';
  data?: unknown;
}

export type CADProcessingCallback = (event: CADProcessingEvent) => void;

// Validation
export interface CADValidationResult {
  isValid: boolean;
  errors: CADValidationError[];
  warnings: CADValidationWarning[];
  fileInfo: CADFileInfo;
}

export interface CADValidationError {
  code: string;
  message: string;
  severity: 'critical' | 'error' | 'warning';
}

export interface CADValidationWarning {
  code: string;
  message: string;
  suggestion?: string;
}

export interface CADFileInfo {
  format: CADFormat | 'unknown';
  version?: string;
  size: number;
  estimatedComplexity: 'low' | 'medium' | 'high';
  estimatedProcessingTime: number;
}

// Utility types για συμβατότητα με άλλα LEGO packages
export interface CADToGeoJSONOptions {
  coordinateSystem?: string;
  preserveLayerInfo?: boolean;
  simplifyGeometry?: boolean;
  tolerance?: number;
}

export interface CADToSVGOptions {
  width?: number;
  height?: number;
  preserveAspectRatio?: boolean;
  backgroundColor?: string;
  strokeWidth?: number;
}

// Export/conversion types
export interface CADExportOptions {
  format: 'geojson' | 'svg' | 'dxf' | 'pdf';
  options?: CADToGeoJSONOptions | CADToSVGOptions | Record<string, unknown>;
}