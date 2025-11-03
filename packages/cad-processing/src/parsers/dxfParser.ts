import DxfParser from 'dxf-parser';
import {
  CADData,
  CADHeader,
  CADTables,
  CADEntity,
  CADBlock,
  CADMetadata,
  CADParseOptions,
  CADPoint3D,
  CADColor,
  CADLayer,
  CADEntityType,
  CADGeometry,
  CADBoundingBox,
  CADStatistics,
  DXFParsingError,
  CADWarning,
  CADError
} from '../types';

/**
 * Enhanced DXF parser βασισμένο σε proven patterns από OLD_geo-canvas
 * Χρησιμοποιεί την dxf-parser library με επιπλέον features
 */
export class LayeraDXFParser {
  private parser: DxfParser;
  private warnings: CADWarning[] = [];
  private errors: CADError[] = [];

  constructor() {
    this.parser = new DxfParser();
  }

  /**
   * Main parsing method
   */
  async parseDXF(
    fileContent: string | ArrayBuffer,
    options: CADParseOptions = {}
  ): Promise<CADData> {
    const startTime = performance.now();
    this.warnings = [];
    this.errors = [];

    try {
      // Convert ArrayBuffer to string if needed
      const dxfString = typeof fileContent === 'string'
        ? fileContent
        : new TextDecoder(options.encoding || 'utf-8').decode(fileContent);

      // Validate DXF content
      this.validateDXFContent(dxfString);

      // Parse με την dxf-parser library
      const parsedDxf = this.parser.parseSync(dxfString);

      if (!parsedDxf) {
        throw new DXFParsingError('Failed to parse DXF content');
      }

      // Transform to our CAD data structure
      const cadData = await this.transformToCADData(parsedDxf, options);

      // Calculate processing time
      cadData.metadata.parsingTime = performance.now() - startTime;

      return cadData;

    } catch (error) {
      if (error instanceof DXFParsingError) {
        throw error;
      }

      throw new DXFParsingError(
        error instanceof Error ? error.message : 'Unknown parsing error'
      );
    }
  }

  /**
   * Validates DXF file content
   */
  private validateDXFContent(content: string): void {
    // Check for DXF header
    if (!content.includes('SECTION') || !content.includes('HEADER')) {
      throw new DXFParsingError('Invalid DXF file: Missing SECTION or HEADER');
    }

    // Check for minimum required sections
    const requiredSections = ['HEADER', 'ENTITIES'];
    const missingSections = requiredSections.filter(section =>
      !content.includes(section)
    );

    if (missingSections.length > 0) {
      this.warnings.push({
        code: 'MISSING_SECTIONS',
        message: `Missing DXF sections: ${missingSections.join(', ')}`,
        suggestion: 'Some features may not be available'
      });
    }

    // Check file size
    if (content.length > 50 * 1024 * 1024) { // 50MB
      this.warnings.push({
        code: 'LARGE_FILE',
        message: 'Large DXF file detected - processing may take time',
        suggestion: 'Consider simplifying the drawing or processing in chunks'
      });
    }
  }

  /**
   * Transforms dxf-parser output to our CAD data structure
   */
  private async transformToCADData(
    parsedDxf: Record<string, unknown>,
    options: CADParseOptions
  ): Promise<CADData> {
    // Extract header information
    const header = this.extractHeader(parsedDxf);

    // Extract tables (layers, linetypes, etc.)
    const tables = this.extractTables(parsedDxf, options);

    // Extract blocks
    const blocks = this.extractBlocks(parsedDxf, options);

    // Extract entities
    const entities = this.extractEntities(parsedDxf, options);

    // Calculate metadata
    const metadata = this.calculateMetadata(header, tables, blocks, entities);

    return {
      header,
      tables,
      blocks,
      entities,
      metadata
    };
  }

  /**
   * Extracts header information
   */
  private extractHeader(parsedDxf: Record<string, unknown>): CADHeader {
    const header = parsedDxf.header as Record<string, unknown> || {};

    return {
      version: this.getHeaderValue(header, '$ACADVER', 'AC1015') as string,
      drawingUnits: this.mapDXFUnits(this.getHeaderValue(header, '$INSUNITS', 0) as number),
      insertionBasePoint: this.getHeaderPoint(header, '$INSBASE'),
      extentsMin: this.getHeaderPoint(header, '$EXTMIN'),
      extentsMax: this.getHeaderPoint(header, '$EXTMAX'),
      customProperties: {}
    };
  }

  /**
   * Extracts tables (layers, linetypes, etc.)
   */
  private extractTables(
    parsedDxf: Record<string, unknown>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: CADParseOptions
  ): CADTables {
    const tables = parsedDxf.tables as Record<string, unknown> || {};

    return {
      layers: this.extractLayers(tables.layer as Record<string, unknown>[] || []),
      lineTypes: this.extractLineTypes(tables.ltype as Record<string, unknown>[] || []),
      textStyles: this.extractTextStyles(tables.style as Record<string, unknown>[] || []),
      blocks: [],
      viewports: []
    };
  }

  /**
   * Extracts layer definitions
   */
  private extractLayers(layerData: Record<string, unknown>[]): CADLayer[] {
    return layerData.map(layer => ({
      name: layer.name as string || 'DEFAULT',
      color: this.parseColor(layer.color),
      lineType: layer.lineType as string || 'CONTINUOUS',
      lineWeight: layer.lineWeight as number || 0,
      visible: !(layer.flags as number & 1), // Bit 1 = frozen
      locked: !!(layer.flags as number & 4), // Bit 4 = locked
      frozen: !!(layer.flags as number & 1)   // Bit 1 = frozen
    }));
  }

  /**
   * Extracts line type definitions
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private extractLineTypes(lineTypeData: Record<string, unknown>[]): never[] {
    // Simplified για τώρα - θα υλοποιηθεί πλήρως στο επόμενο στάδιο
    return [];
  }

  /**
   * Extracts text style definitions
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private extractTextStyles(styleData: Record<string, unknown>[]): never[] {
    // Simplified για τώρα - θα υλοποιηθεί πλήρως στο επόμενο στάδιο
    return [];
  }

  /**
   * Extracts block definitions
   */
  private extractBlocks(
    parsedDxf: Record<string, unknown>,
    options: CADParseOptions
  ): CADBlock[] {
    if (!options.preserveBlockStructure) return [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const blocks = parsedDxf.blocks as Record<string, unknown> || {};
    // Simplified για τώρα - θα υλοποιηθεί πλήρως στο επόμενο στάδιο
    return [];
  }

  /**
   * Extracts entities (main geometric data)
   */
  private extractEntities(
    parsedDxf: Record<string, unknown>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: CADParseOptions
  ): CADEntity[] {
    const entities = parsedDxf.entities as Record<string, unknown>[] || [];
    const cadEntities: CADEntity[] = [];

    for (const entity of entities) {
      try {
        const cadEntity = this.convertEntityToCAD(entity);
        if (cadEntity) {
          cadEntities.push(cadEntity);
        }
      } catch (error) {
        this.errors.push({
          code: 'ENTITY_CONVERSION_ERROR',
          message: `Failed to convert entity: ${error instanceof Error ? error.message : 'Unknown error'}`,
          severity: 'warning',
          entity: entity.type as string || 'unknown'
        });
      }
    }

    return cadEntities;
  }

  /**
   * Converts a DXF entity to our CAD entity format
   */
  private convertEntityToCAD(entity: Record<string, unknown>): CADEntity | null {
    const entityType = (entity.type as string)?.toUpperCase();

    if (!entityType) {
      return null;
    }

    const baseEntity = {
      id: this.generateEntityId(),
      type: entityType as CADEntityType,
      layer: entity.layer as string || '0',
      color: this.parseColor(entity.color),
      lineType: entity.lineType as string || 'CONTINUOUS',
      lineWeight: entity.lineWeight as number || 0
    };

    // Convert geometry based on entity type
    const geometry = this.convertEntityGeometry(entity, entityType);

    if (!geometry) {
      return null;
    }

    return {
      ...baseEntity,
      geometry
    };
  }

  /**
   * Converts entity geometry based on type
   */
  private convertEntityGeometry(
    entity: Record<string, unknown>,
    entityType: string
  ): CADGeometry | null {
    switch (entityType) {
      case 'LINE':
        return this.convertLineGeometry(entity);
      case 'CIRCLE':
        return this.convertCircleGeometry(entity);
      case 'ARC':
        return this.convertArcGeometry(entity);
      case 'POLYLINE':
      case 'LWPOLYLINE':
        return this.convertPolylineGeometry(entity);
      case 'TEXT':
      case 'MTEXT':
        return this.convertTextGeometry(entity);
      case 'POINT':
        return this.convertPointGeometry(entity);
      default:
        this.warnings.push({
          code: 'UNSUPPORTED_ENTITY',
          message: `Unsupported entity type: ${entityType}`,
          suggestion: 'Entity will be skipped'
        });
        return null;
    }
  }

  /**
   * Converts LINE entity geometry
   */
  private convertLineGeometry(entity: Record<string, unknown>): CADGeometry {
    const start = this.getPoint(entity, 'start') || this.getPoint(entity, '');
    const end = this.getPoint(entity, 'end') || this.getPoint(entity, '1');

    return {
      type: 'LINE',
      points: [start, end],
      properties: {}
    };
  }

  /**
   * Converts CIRCLE entity geometry
   */
  private convertCircleGeometry(entity: Record<string, unknown>): CADGeometry {
    const center = this.getPoint(entity, 'center') || this.getPoint(entity, '');
    const radius = entity.radius as number || 0;

    return {
      type: 'CIRCLE',
      points: [center],
      properties: { radius }
    };
  }

  /**
   * Converts ARC entity geometry
   */
  private convertArcGeometry(entity: Record<string, unknown>): CADGeometry {
    const center = this.getPoint(entity, 'center') || this.getPoint(entity, '');
    const radius = entity.radius as number || 0;
    const startAngle = entity.startAngle as number || 0;
    const endAngle = entity.endAngle as number || 0;

    return {
      type: 'ARC',
      points: [center],
      properties: { radius, startAngle, endAngle }
    };
  }

  /**
   * Converts POLYLINE entity geometry
   */
  private convertPolylineGeometry(entity: Record<string, unknown>): CADGeometry {
    const vertices = entity.vertices as Record<string, unknown>[] || [];
    const points = vertices.map(vertex => this.getPoint(vertex, ''));

    return {
      type: 'POLYLINE',
      points,
      properties: {
        closed: entity.closed || false
      }
    };
  }

  /**
   * Converts TEXT entity geometry
   */
  private convertTextGeometry(entity: Record<string, unknown>): CADGeometry {
    const position = this.getPoint(entity, 'start') || this.getPoint(entity, '');
    const text = entity.text as string || '';
    const height = entity.height as number || 1;

    return {
      type: 'TEXT',
      points: [position],
      properties: { text, height }
    };
  }

  /**
   * Converts POINT entity geometry
   */
  private convertPointGeometry(entity: Record<string, unknown>): CADGeometry {
    const position = this.getPoint(entity, '') || { x: 0, y: 0, z: 0 };

    return {
      type: 'POINT',
      points: [position],
      properties: {}
    };
  }

  /**
   * Helper methods
   */
  private getHeaderValue(header: Record<string, unknown>, key: string, defaultValue: unknown): unknown {
    return header[key] || defaultValue;
  }

  private getHeaderPoint(header: Record<string, unknown>, key: string): CADPoint3D {
    const point = header[key] as Record<string, number> || {};
    return {
      x: point.x || 0,
      y: point.y || 0,
      z: point.z || 0
    };
  }

  private getPoint(entity: Record<string, unknown>, prefix: string): CADPoint3D {
    const suffix = prefix ? prefix : '';
    return {
      x: entity[`x${suffix}`] as number || entity.x as number || 0,
      y: entity[`y${suffix}`] as number || entity.y as number || 0,
      z: entity[`z${suffix}`] as number || entity.z as number || 0
    };
  }

  private parseColor(colorValue: unknown): CADColor {
    if (typeof colorValue === 'number') {
      return { type: 'index', value: colorValue };
    }
    return { type: 'index', value: 7 }; // Default white
  }

  private mapDXFUnits(unitsCode: number): 'mm' | 'cm' | 'm' | 'in' | 'ft' | 'units' {
    const unitsMap: Record<number, 'mm' | 'cm' | 'm' | 'in' | 'ft' | 'units'> = {
      0: 'units',
      1: 'in',
      2: 'ft',
      3: 'mil',
      4: 'mm',
      5: 'cm',
      6: 'm'
    };
    return unitsMap[unitsCode] || 'units';
  }

  private generateEntityId(): string {
    return `entity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Calculates metadata and statistics
   */
  private calculateMetadata(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    header: CADHeader,
    tables: CADTables,
    blocks: CADBlock[],
    entities: CADEntity[]
  ): CADMetadata {
    // Calculate bounding box
    const boundingBox = this.calculateBoundingBox(entities);

    // Calculate statistics
    const statistics = this.calculateStatistics(entities);

    return {
      originalFormat: 'dxf',
      fileSize: 0, // Will be set by the calling code
      parsingTime: 0, // Will be set by the calling code
      entityCount: entities.length,
      layerCount: tables.layers.length,
      blockCount: blocks.length,
      boundingBox,
      statistics
    };
  }

  private calculateBoundingBox(entities: CADEntity[]): CADBoundingBox {
    if (entities.length === 0) {
      const origin = { x: 0, y: 0, z: 0 };
      return {
        min: origin,
        max: origin,
        center: origin,
        size: origin
      };
    }

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    for (const entity of entities) {
      for (const point of entity.geometry.points) {
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        minZ = Math.min(minZ, point.z);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
        maxZ = Math.max(maxZ, point.z);
      }
    }

    const min = { x: minX, y: minY, z: minZ };
    const max = { x: maxX, y: maxY, z: maxZ };

    return {
      min,
      max,
      center: {
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
        z: (minZ + maxZ) / 2
      },
      size: {
        x: maxX - minX,
        y: maxY - minY,
        z: maxZ - minZ
      }
    };
  }

  private calculateStatistics(entities: CADEntity[]): CADStatistics {
    const stats: CADStatistics = {
      lines: 0,
      circles: 0,
      arcs: 0,
      polylines: 0,
      text: 0,
      blocks: 0,
      other: 0,
      totalVertices: 0,
      complexityScore: 0
    };

    for (const entity of entities) {
      stats.totalVertices += entity.geometry.points.length;

      switch (entity.type) {
        case 'LINE':
          stats.lines++;
          break;
        case 'CIRCLE':
          stats.circles++;
          break;
        case 'ARC':
          stats.arcs++;
          break;
        case 'POLYLINE':
        case 'LWPOLYLINE':
          stats.polylines++;
          break;
        case 'TEXT':
        case 'MTEXT':
          stats.text++;
          break;
        case 'INSERT':
          stats.blocks++;
          break;
        default:
          stats.other++;
      }
    }

    // Simple complexity calculation
    stats.complexityScore = entities.length * 10 + stats.totalVertices;

    return stats;
  }

  /**
   * Gets warnings generated during parsing
   */
  getWarnings(): CADWarning[] {
    return [...this.warnings];
  }

  /**
   * Gets errors generated during parsing
   */
  getErrors(): CADError[] {
    return [...this.errors];
  }
}