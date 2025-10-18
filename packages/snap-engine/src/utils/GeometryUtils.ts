/**
 * 🔧 GEOMETRY UTILITIES
 * Helper functions για geometric calculations και conversions
 */

import type {
  Point2D,
  BoundingBox,
  GeometryEntity,
  LineGeometry,
  CircleGeometry,
  ArcGeometry,
  PolylineGeometry,
  PointGeometry,
  CADGeometry,
  OSMGeometry
} from '../types';

// Import από existing LEGO systems - ΜΗΝ αναδημιουργήσεις
import type { CADEntity } from '@layera/cad-processing';

// ========================================
// 📐 BOUNDING BOX CALCULATIONS
// ========================================

export class GeometryUtils {

  public static calculateBounds(geometry: GeometryEntity): BoundingBox {
    switch (geometry.type) {
      case 'line':
        return this.calculateLineBounds(geometry.data as LineGeometry);
      case 'circle':
        return this.calculateCircleBounds(geometry.data as CircleGeometry);
      case 'arc':
        return this.calculateArcBounds(geometry.data as ArcGeometry);
      case 'polyline':
      case 'polygon':
        return this.calculatePolylineBounds(geometry.data as PolylineGeometry);
      case 'point':
        return this.calculatePointBounds(geometry.data as PointGeometry);
      default:
        throw new Error(`Unsupported geometry type: ${geometry.type}`);
    }
  }

  private static calculateLineBounds(line: LineGeometry): BoundingBox {
    return {
      minX: Math.min(line.start.x, line.end.x),
      minY: Math.min(line.start.y, line.end.y),
      maxX: Math.max(line.start.x, line.end.x),
      maxY: Math.max(line.start.y, line.end.y)
    };
  }

  private static calculateCircleBounds(circle: CircleGeometry): BoundingBox {
    return {
      minX: circle.center.x - circle.radius,
      minY: circle.center.y - circle.radius,
      maxX: circle.center.x + circle.radius,
      maxY: circle.center.y + circle.radius
    };
  }

  private static calculateArcBounds(arc: ArcGeometry): BoundingBox {
    // Simplified bounding box - includes full circle για safety
    // Production implementation θα υπολογίζει actual arc bounds
    return this.calculateCircleBounds(arc);
  }

  private static calculatePolylineBounds(polyline: PolylineGeometry): BoundingBox {
    if (polyline.vertices.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }

    let minX = polyline.vertices[0].x;
    let minY = polyline.vertices[0].y;
    let maxX = polyline.vertices[0].x;
    let maxY = polyline.vertices[0].y;

    for (const vertex of polyline.vertices) {
      minX = Math.min(minX, vertex.x);
      minY = Math.min(minY, vertex.y);
      maxX = Math.max(maxX, vertex.x);
      maxY = Math.max(maxY, vertex.y);
    }

    return { minX, minY, maxX, maxY };
  }

  private static calculatePointBounds(point: PointGeometry): BoundingBox {
    const tolerance = 0.1; // Small tolerance για point selection
    return {
      minX: point.position.x - tolerance,
      minY: point.position.y - tolerance,
      maxX: point.position.x + tolerance,
      maxY: point.position.y + tolerance
    };
  }

  // ========================================
  // 🔄 GEOMETRY CONVERSIONS
  // ========================================

  public static convertCADToGeometry(cadEntity: CADEntity): GeometryEntity {
    // Integration με @layera/cad-processing
    // Μετατρέπει CAD entities σε standard geometry format

    const bounds = this.calculateBoundsFromCAD(cadEntity);

    return {
      id: cadEntity.handle || `cad_${Date.now()}`,
      type: this.mapCADTypeToGeometry(cadEntity.cadType),
      bounds,
      layer: cadEntity.layerName,
      visible: true,
      selectable: true,
      data: this.extractGeometryData(cadEntity)
    };
  }

  private static calculateBoundsFromCAD(cadEntity: CADEntity): BoundingBox {
    // Use existing CAD bounds if available
    return cadEntity.bounds;
  }

  private static mapCADTypeToGeometry(cadType: string): GeometryEntity['type'] {
    const typeMap: Record<string, GeometryEntity['type']> = {
      'LINE': 'line',
      'CIRCLE': 'circle',
      'ARC': 'arc',
      'POLYLINE': 'polyline',
      'LWPOLYLINE': 'polyline',
      'POINT': 'point',
      'SPLINE': 'spline'
    };

    return typeMap[cadType] || 'line';
  }

  private static extractGeometryData(cadEntity: CADEntity): LineGeometry | CircleGeometry | ArcGeometry | PolylineGeometry | PointGeometry {
    // Extract actual geometry data από CAD entity
    // This would be populated from the CAD processing system

    // Placeholder implementation - real data θα έρχεται από @layera/cad-processing
    switch (cadEntity.cadType) {
      case 'LINE':
        return {
          start: { x: 0, y: 0 },
          end: { x: 100, y: 100 }
        } as LineGeometry;

      case 'CIRCLE':
        return {
          center: { x: 50, y: 50 },
          radius: 25
        } as CircleGeometry;

      default:
        return {
          start: { x: 0, y: 0 },
          end: { x: 0, y: 0 }
        } as LineGeometry;
    }
  }

  // ========================================
  // 🌍 OSM GEOMETRY INTEGRATION
  // ========================================

  public static convertOSMToGeometry(osmData: {
    id: string;
    type: 'node' | 'way' | 'relation';
    lat?: number;
    lon?: number;
    nodes?: Array<{ lat: number; lon: number }>;
    tags: Record<string, string>;
  }): OSMGeometry | null {

    try {
      if (osmData.type === 'node' && osmData.lat && osmData.lon) {
        // Convert single node to point
        return {
          id: `osm_node_${osmData.id}`,
          osmId: osmData.id,
          osmType: 'node',
          type: 'point',
          bounds: {
            minX: osmData.lon - 0.0001,
            minY: osmData.lat - 0.0001,
            maxX: osmData.lon + 0.0001,
            maxY: osmData.lat + 0.0001
          },
          layer: 'osm_buildings',
          visible: true,
          selectable: true,
          tags: osmData.tags,
          data: {
            position: { x: osmData.lon, y: osmData.lat }
          } as PointGeometry
        };
      }

      if (osmData.type === 'way' && osmData.nodes && osmData.nodes.length > 0) {
        // Convert way to polyline
        const vertices: Point2D[] = osmData.nodes.map(node => ({
          x: node.lon,
          y: node.lat
        }));

        const bounds = this.calculatePolylineBounds({ vertices, closed: false });
        const isBuilding = osmData.tags.building !== undefined;

        return {
          id: `osm_way_${osmData.id}`,
          osmId: osmData.id,
          osmType: 'way',
          type: isBuilding ? 'polygon' : 'polyline',
          bounds,
          layer: 'osm_buildings',
          visible: true,
          selectable: true,
          tags: osmData.tags,
          data: {
            vertices,
            closed: isBuilding
          } as PolylineGeometry
        };
      }

      return null;
    } catch (error) {
      console.error('OSM geometry conversion failed:', error);
      return null;
    }
  }

  // ========================================
  // 📏 DISTANCE CALCULATIONS
  // ========================================

  public static pointToGeometryDistance(point: Point2D, geometry: GeometryEntity): number {
    switch (geometry.type) {
      case 'line':
        return this.pointToLineDistance(point, geometry.data as LineGeometry);
      case 'circle':
        return this.pointToCircleDistance(point, geometry.data as CircleGeometry);
      case 'point':
        return this.pointToPointDistance(point, (geometry.data as PointGeometry).position);
      default:
        // Fallback to bounding box center distance
        const center = this.getBoundsCenter(geometry.bounds);
        return this.pointToPointDistance(point, center);
    }
  }

  private static pointToLineDistance(point: Point2D, line: LineGeometry): number {
    const { start, end } = line;

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length === 0) {
      return this.pointToPointDistance(point, start);
    }

    const t = Math.max(0, Math.min(1,
      ((point.x - start.x) * dx + (point.y - start.y) * dy) / (length * length)
    ));

    const projection = {
      x: start.x + t * dx,
      y: start.y + t * dy
    };

    return this.pointToPointDistance(point, projection);
  }

  private static pointToCircleDistance(point: Point2D, circle: CircleGeometry): number {
    const centerDistance = this.pointToPointDistance(point, circle.center);
    return Math.abs(centerDistance - circle.radius);
  }

  private static pointToPointDistance(p1: Point2D, p2: Point2D): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private static getBoundsCenter(bounds: BoundingBox): Point2D {
    return {
      x: (bounds.minX + bounds.maxX) / 2,
      y: (bounds.minY + bounds.maxY) / 2
    };
  }

  // ========================================
  // ✅ VALIDATION UTILITIES
  // ========================================

  public static validateGeometry(geometry: GeometryEntity): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic validation
    if (!geometry.id) {
      errors.push('Geometry must have an ID');
    }

    if (!geometry.type) {
      errors.push('Geometry must have a type');
    }

    // Bounds validation
    if (geometry.bounds.minX > geometry.bounds.maxX) {
      errors.push('Invalid bounds: minX > maxX');
    }

    if (geometry.bounds.minY > geometry.bounds.maxY) {
      errors.push('Invalid bounds: minY > maxY');
    }

    // Type-specific validation
    try {
      this.validateGeometryData(geometry);
    } catch (error) {
      errors.push(`Geometry data validation failed: ${error}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  private static validateGeometryData(geometry: GeometryEntity): void {
    switch (geometry.type) {
      case 'line':
        const line = geometry.data as LineGeometry;
        if (!line.start || !line.end) {
          throw new Error('Line must have start and end points');
        }
        break;

      case 'circle':
        const circle = geometry.data as CircleGeometry;
        if (!circle.center || circle.radius <= 0) {
          throw new Error('Circle must have center and positive radius');
        }
        break;

      case 'polyline':
        const polyline = geometry.data as PolylineGeometry;
        if (!polyline.vertices || polyline.vertices.length < 2) {
          throw new Error('Polyline must have at least 2 vertices');
        }
        break;
    }
  }

  // ========================================
  // 🎯 SNAP OPTIMIZATION HELPERS
  // ========================================

  public static getSnapPriority(geometry: GeometryEntity): number {
    // Higher priority για important geometry types
    const priorityMap: Record<GeometryEntity['type'], number> = {
      'point': 100,
      'line': 90,
      'circle': 85,
      'arc': 80,
      'polyline': 75,
      'polygon': 70,
      'spline': 60,
      'ellipse': 55,
      'rectangle': 85
    };

    return priorityMap[geometry.type] || 50;
  }

  public static shouldSnapToGeometry(
    geometry: GeometryEntity,
    cursor: Point2D,
    tolerance: number
  ): boolean {
    // Quick distance check χρησιμοποιώντας bounding box
    const bounds = geometry.bounds;
    const expandedBounds = {
      minX: bounds.minX - tolerance,
      minY: bounds.minY - tolerance,
      maxX: bounds.maxX + tolerance,
      maxY: bounds.maxY + tolerance
    };

    return cursor.x >= expandedBounds.minX &&
           cursor.x <= expandedBounds.maxX &&
           cursor.y >= expandedBounds.minY &&
           cursor.y <= expandedBounds.maxY;
  }
}