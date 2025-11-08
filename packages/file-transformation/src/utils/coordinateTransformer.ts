import proj4 from 'proj4';
import {
  CoordinateTransform,
  CoordinateTransformationError,
  BoundingBox
} from '../types';

// 🎯 IMPORT SINGLE SOURCE OF TRUTH - από @layera/constants
import { EPSG_CODES, GEOGRAPHIC_BOUNDS } from '@layera/constants';

// 🛡️ ENTERPRISE LEGO SYSTEM: Coordinate Reference Systems
// SSOT για όλα τα EPSG codes και definitions
const GREEK_CRS_DEFINITIONS = {
  // ΕΓΣΑ87 - Ελληνικό Γεωδαιτικό Σύστημα Αναφοράς 1987
  [EPSG_CODES.EGSA87]: '+proj=tmerc +lat_0=0 +lon_0=24 +k=0.9996 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=-199.87,74.79,246.62,0,0,0,0 +units=m +no_defs',

  // WGS84 - World Geodetic System 1984 (GPS)
  [EPSG_CODES.WGS84]: '+proj=longlat +datum=WGS84 +no_defs',

  // Web Mercator (Google Maps, OpenStreetMap)
  [EPSG_CODES.WEB_MERCATOR]: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs',

  // Greek Grid (παλιό σύστημα)
  'EPSG:2154': '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',

  // UTM Zone 34N (για βόρεια Ελλάδα)
  'EPSG:32634': '+proj=utm +zone=34 +datum=WGS84 +units=m +no_defs',

  // UTM Zone 35N (για ανατολική Ελλάδα)
  'EPSG:32635': '+proj=utm +zone=35 +datum=WGS84 +units=m +no_defs'
} as const;

/**
 * Enhanced coordinate transformation utility
 * Βασισμένο σε patterns από OLD_geo-canvas για χειρισμό GIS data
 */
export class CoordinateTransformer {
  private projCache: Map<string, proj4.Converter> = new Map();
  private initializationPromise: Promise<void>;

  constructor() {
    this.initializationPromise = this.initializeProjections();
  }

  /**
   * Initializes commonly used projections
   */
  private async initializeProjections(): Promise<void> {
    try {
      // Register Greek coordinate systems
      Object.entries(GREEK_CRS_DEFINITIONS).forEach(([epsg, definition]) => {
        proj4.defs(epsg, definition);
      });

      // Precompile common transformations
      const commonTransformations = [
        [EPSG_CODES.WGS84, EPSG_CODES.EGSA87], // WGS84 to EGSA87
        [EPSG_CODES.EGSA87, EPSG_CODES.WGS84], // EGSA87 to WGS84
        [EPSG_CODES.WGS84, EPSG_CODES.WEB_MERCATOR], // WGS84 to Web Mercator
        [EPSG_CODES.WEB_MERCATOR, EPSG_CODES.WGS84], // Web Mercator to WGS84
        [EPSG_CODES.EGSA87, EPSG_CODES.WEB_MERCATOR]  // EGSA87 to Web Mercator
      ];

      commonTransformations.forEach(([source, target]) => {
        const key = `${source}->${target}`;
        if (source && target) {
          try {
            const converter = proj4(source, target);
            this.projCache.set(key, converter);
          } catch (conversionError) {
            console.warn(`Failed to initialize transformation ${key}:`, conversionError);
          }
        }
      });

    } catch (error) {
      console.error('Failed to initialize coordinate projections:', error);
      throw new CoordinateTransformationError(
        'unknown',
        'unknown',
        `Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Transforms a single coordinate point
   */
  async transformPoint(
    x: number,
    y: number,
    transform: CoordinateTransform,
    z?: number
  ): Promise<{ x: number; y: number; z?: number }> {
    await this.initializationPromise;

    try {
      const converter = this.getConverter(transform.sourceEPSG, transform.targetEPSG);
      const input = z !== undefined ? [x, y, z] : [x, y];
      const result = converter.forward(input);

      if (result[0] === undefined || result[1] === undefined) {
        throw new CoordinateTransformationError(
          transform.sourceEPSG,
          transform.targetEPSG,
          'Invalid coordinate transformation result'
        );
      }

      return {
        x: result[0],
        y: result[1],
        ...(z !== undefined && result[2] !== undefined && { z: result[2] })
      };

    } catch (error) {
      throw new CoordinateTransformationError(
        transform.sourceEPSG,
        transform.targetEPSG,
        error instanceof Error ? error.message : 'Point transformation failed'
      );
    }
  }

  /**
   * Transforms an array of coordinate points
   */
  async transformPoints(
    points: Array<{ x: number; y: number; z?: number }>,
    transform: CoordinateTransform
  ): Promise<Array<{ x: number; y: number; z?: number }>> {
    await this.initializationPromise;

    const results: Array<{ x: number; y: number; z?: number }> = [];

    try {
      const converter = this.getConverter(transform.sourceEPSG, transform.targetEPSG);

      for (const point of points) {
        const input = point.z !== undefined ? [point.x, point.y, point.z] : [point.x, point.y];
        const result = converter.forward(input);

        if (result[0] === undefined || result[1] === undefined) {
          throw new CoordinateTransformationError(
            transform.sourceEPSG,
            transform.targetEPSG,
            `Invalid coordinate transformation result for point ${JSON.stringify(point)}`
          );
        }

        results.push({
          x: result[0],
          y: result[1],
          ...(point.z !== undefined && result[2] !== undefined && { z: result[2] })
        });
      }

      return results;

    } catch (error) {
      throw new CoordinateTransformationError(
        transform.sourceEPSG,
        transform.targetEPSG,
        `Batch transformation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Transforms a bounding box
   */
  async transformBoundingBox(
    bbox: BoundingBox,
    transform: CoordinateTransform
  ): Promise<BoundingBox> {
    await this.initializationPromise;

    try {
      // Transform corner points
      const corners = [
        { x: bbox.minX, y: bbox.minY },
        { x: bbox.maxX, y: bbox.minY },
        { x: bbox.maxX, y: bbox.maxY },
        { x: bbox.minX, y: bbox.maxY }
      ];

      const transformedCorners = await this.transformPoints(corners, transform);

      // Calculate new bounding box
      const xs = transformedCorners.map(p => p.x);
      const ys = transformedCorners.map(p => p.y);

      const result: BoundingBox = {
        minX: Math.min(...xs),
        minY: Math.min(...ys),
        maxX: Math.max(...xs),
        maxY: Math.max(...ys)
      };

      // Handle Z coordinates if present
      if (bbox.minZ !== undefined && bbox.maxZ !== undefined) {
        const zCorners = [
          { x: bbox.minX, y: bbox.minY, z: bbox.minZ },
          { x: bbox.maxX, y: bbox.maxY, z: bbox.maxZ }
        ];

        const transformedZCorners = await this.transformPoints(zCorners, transform);
        const zs = transformedZCorners.map(p => p.z!).filter(z => z !== undefined);

        if (zs.length > 0) {
          result.minZ = Math.min(...zs);
          result.maxZ = Math.max(...zs);
        }
      }

      return result;

    } catch (error) {
      throw new CoordinateTransformationError(
        transform.sourceEPSG,
        transform.targetEPSG,
        `Bounding box transformation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Gets or creates a proj4 converter for the given transformation
   */
  private getConverter(sourceEPSG: string, targetEPSG: string): proj4.Converter {
    const key = `${sourceEPSG}->${targetEPSG}`;

    if (this.projCache.has(key)) {
      return this.projCache.get(key)!;
    }

    try {
      const converter = proj4(sourceEPSG, targetEPSG);
      this.projCache.set(key, converter);
      return converter;

    } catch (error) {
      throw new CoordinateTransformationError(
        sourceEPSG,
        targetEPSG,
        `Failed to create projection converter: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Validates coordinate transformation parameters
   */
  async validateTransformation(transform: CoordinateTransform): Promise<{
    isValid: boolean;
    error?: string;
    accuracy?: number;
  }> {
    await this.initializationPromise;

    try {
      // Test transformation με γνωστό σημείο
      const testPoint = { x: 24.0, y: 38.0 }; // Κέντρο Αθήνας περίπου

      if (transform.sourceEPSG === EPSG_CODES.WGS84) {
        await this.transformPoint(testPoint.x, testPoint.y, transform);
      } else {
        // Use a test point σε meters για projected systems
        await this.transformPoint(500000, 4200000, transform);
      }

      return {
        isValid: true,
        accuracy: this.getTransformationAccuracy(transform.sourceEPSG, transform.targetEPSG)
      };

    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Unknown validation error'
      };
    }
  }

  /**
   * Gets the estimated accuracy for a coordinate transformation
   */
  private getTransformationAccuracy(sourceEPSG: string, targetEPSG: string): number {
    // Simplified accuracy estimation βασισμένο σε γνωστές transformations
    const accuracyMatrix: Record<string, Record<string, number>> = {
      [EPSG_CODES.WGS84]: {
        [EPSG_CODES.EGSA87]: 0.5,  // WGS84 to EGSA87: ~0.5m accuracy
        [EPSG_CODES.WEB_MERCATOR]: 0.1,  // WGS84 to Web Mercator: ~0.1m accuracy
        'EPSG:32634': 0.3, // WGS84 to UTM34N: ~0.3m accuracy
        'EPSG:32635': 0.3  // WGS84 to UTM35N: ~0.3m accuracy
      },
      [EPSG_CODES.EGSA87]: {
        [EPSG_CODES.WGS84]: 0.5,  // EGSA87 to WGS84: ~0.5m accuracy
        [EPSG_CODES.WEB_MERCATOR]: 0.6   // EGSA87 to Web Mercator: ~0.6m accuracy
      }
    };

    return accuracyMatrix[sourceEPSG]?.[targetEPSG] || 1.0; // Default 1m accuracy
  }

  /**
   * Gets information about a coordinate system
   */
  getCoordinateSystemInfo(epsg: string): {
    name: string;
    units: string;
    type: 'geographic' | 'projected';
    description: string;
  } {
    const info: Record<string, {
      name: string;
      units: string;
      type: 'geographic' | 'projected';
      description: string;
    }> = {
      [EPSG_CODES.WGS84]: {
        name: 'WGS84',
        units: 'degrees',
        type: 'geographic',
        description: 'World Geodetic System 1984 - GPS coordinates'
      },
      [EPSG_CODES.EGSA87]: {
        name: 'ΕΓΣΑ87',
        units: 'meters',
        type: 'projected',
        description: 'Ελληνικό Γεωδαιτικό Σύστημα Αναφοράς 1987'
      },
      [EPSG_CODES.WEB_MERCATOR]: {
        name: 'Web Mercator',
        units: 'meters',
        type: 'projected',
        description: 'Web Mercator - Google Maps, OpenStreetMap'
      },
      'EPSG:32634': {
        name: 'UTM Zone 34N',
        units: 'meters',
        type: 'projected',
        description: 'Universal Transverse Mercator Zone 34 North'
      }
    };

    return info[epsg] || {
      name: epsg,
      units: 'unknown',
      type: 'geographic',
      description: 'Unknown coordinate system'
    };
  }

  /**
   * Detects the likely coordinate system από sample coordinates
   */
  detectCoordinateSystem(
    samplePoints: Array<{ x: number; y: number }>
  ): {
    likelyEPSG: string;
    confidence: number;
    reasoning: string;
  } {
    if (samplePoints.length === 0) {
      return {
        likelyEPSG: EPSG_CODES.WGS84,
        confidence: 0,
        reasoning: 'No sample points provided'
      };
    }

    const xs = samplePoints.map(p => p.x);
    const ys = samplePoints.map(p => p.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    // Check for geographic coordinates (lat/lon)
    if (minX >= GEOGRAPHIC_BOUNDS.WGS84_GLOBAL.MIN_X && maxX <= GEOGRAPHIC_BOUNDS.WGS84_GLOBAL.MAX_X &&
        minY >= GEOGRAPHIC_BOUNDS.WGS84_GLOBAL.MIN_Y && maxY <= GEOGRAPHIC_BOUNDS.WGS84_GLOBAL.MAX_Y) {
      // Check if coordinates are in Greece area
      if (minX >= GEOGRAPHIC_BOUNDS.GREECE_WGS84.MIN_X && maxX <= GEOGRAPHIC_BOUNDS.GREECE_WGS84.MAX_X &&
          minY >= GEOGRAPHIC_BOUNDS.GREECE_WGS84.MIN_Y && maxY <= GEOGRAPHIC_BOUNDS.GREECE_WGS84.MAX_Y) {
        return {
          likelyEPSG: EPSG_CODES.WGS84,
          confidence: 0.9,
          reasoning: 'Coordinates within Greece geographic bounds (WGS84)'
        };
      }

      return {
        likelyEPSG: EPSG_CODES.WGS84,
        confidence: 0.8,
        reasoning: 'Coordinates within geographic bounds (lat/lon)'
      };
    }

    // Check for EGSA87 (Greek Grid) - coordinate system bounds constants
    if (minX >= GEOGRAPHIC_BOUNDS.EGSA87.MIN_X && maxX <= GEOGRAPHIC_BOUNDS.EGSA87.MAX_X &&
        minY >= GEOGRAPHIC_BOUNDS.EGSA87.MIN_Y && maxY <= GEOGRAPHIC_BOUNDS.EGSA87.MAX_Y) {
      return {
        likelyEPSG: EPSG_CODES.EGSA87,
        confidence: 0.9,
        reasoning: 'Coordinates within EGSA87 bounds (Greek Grid)'
      };
    }

    // Check for Web Mercator
    if (Math.abs(minX) <= Math.abs(GEOGRAPHIC_BOUNDS.WEB_MERCATOR.MIN_X) &&
        Math.abs(maxX) <= Math.abs(GEOGRAPHIC_BOUNDS.WEB_MERCATOR.MAX_X) &&
        Math.abs(minY) <= Math.abs(GEOGRAPHIC_BOUNDS.WEB_MERCATOR.MIN_Y) &&
        Math.abs(maxY) <= Math.abs(GEOGRAPHIC_BOUNDS.WEB_MERCATOR.MAX_Y)) {
      return {
        likelyEPSG: EPSG_CODES.WEB_MERCATOR,
        confidence: 0.7,
        reasoning: 'Coordinates within Web Mercator bounds'
      };
    }

    // Default fallback
    return {
      likelyEPSG: EPSG_CODES.WGS84,
      confidence: 0.3,
      reasoning: 'Could not determine coordinate system, defaulting to WGS84'
    };
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.projCache.clear();
  }
}