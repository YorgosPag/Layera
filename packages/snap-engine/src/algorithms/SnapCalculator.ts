/**
 * 🎯 SNAP CALCULATION ENGINE
 * Υπολογισμοί snapping βασισμένοι σε AutoCAD/ESRI algorithms
 * Precision-optimized για real-time performance
 */

import type {
  Point2D,
  SnapType,
  SnapTarget,
  SnapResult,
  GeometryEntity,
  LineGeometry,
  CircleGeometry,
  ArcGeometry,
  PolylineGeometry,
  PointGeometry,
  SnapConfiguration
} from '../types';

// ========================================
// 🧮 SNAP CALCULATION ENGINE
// ========================================

export class SnapCalculator {
  private config: SnapConfiguration;

  constructor(config: SnapConfiguration) {
    this.config = config;
  }

  // ========================================
  // 🎯 MAIN SNAP CALCULATION
  // ========================================

  public calculateSnap(
    cursor: Point2D,
    geometries: GeometryEntity[]
  ): SnapResult {
    try {
      const candidates: SnapTarget[] = [];

      // Generate snap targets από όλα τα geometries
      for (const geometry of geometries) {
        if (!geometry.visible || !geometry.selectable) continue;

        const targets = this.generateSnapTargets(geometry);
        candidates.push(...targets);
      }

      // Filter by enabled snap types
      const validCandidates = candidates.filter(target =>
        this.config.enabledTypes.has(target.type)
      );

      // Find closest valid snap target
      const bestTarget = this.findClosestTarget(cursor, validCandidates);

      if (bestTarget && bestTarget.distance <= this.config.tolerance) {
        return {
          target: bestTarget.target,
          snapped: true,
          distance: bestTarget.distance,
          cursor,
          snapPoint: bestTarget.target.point,
          snapType: bestTarget.target.type
        };
      }

      return {
        target: null,
        snapped: false,
        distance: Infinity,
        cursor,
        snapPoint: cursor,
        snapType: null
      };
    } catch (error) {
      console.error('Snap calculation failed:', error);
      return {
        target: null,
        snapped: false,
        distance: Infinity,
        cursor,
        snapPoint: cursor,
        snapType: null
      };
    }
  }

  // ========================================
  // 🎯 SNAP TARGET GENERATION
  // ========================================

  private generateSnapTargets(geometry: GeometryEntity): SnapTarget[] {
    const targets: SnapTarget[] = [];

    switch (geometry.type) {
      case 'line':
        targets.push(...this.generateLineSnapTargets(geometry));
        break;
      case 'circle':
        targets.push(...this.generateCircleSnapTargets(geometry));
        break;
      case 'arc':
        targets.push(...this.generateArcSnapTargets(geometry));
        break;
      case 'polyline':
      case 'polygon':
        targets.push(...this.generatePolylineSnapTargets(geometry));
        break;
      case 'point':
        targets.push(...this.generatePointSnapTargets(geometry));
        break;
    }

    return targets;
  }

  // ========================================
  // 📏 LINE SNAP TARGETS
  // ========================================

  private generateLineSnapTargets(geometry: GeometryEntity): SnapTarget[] {
    const line = geometry.data as LineGeometry;
    const targets: SnapTarget[] = [];

    // Endpoint snaps
    if (this.config.enabledTypes.has('endpoint')) {
      targets.push(
        this.createSnapTarget('endpoint', line.start, geometry, 100),
        this.createSnapTarget('endpoint', line.end, geometry, 100)
      );
    }

    // Midpoint snap
    if (this.config.enabledTypes.has('midpoint')) {
      const midpoint: Point2D = {
        x: (line.start.x + line.end.x) / 2,
        y: (line.start.y + line.end.y) / 2
      };
      targets.push(this.createSnapTarget('midpoint', midpoint, geometry, 80));
    }

    return targets;
  }

  // ========================================
  // ⭕ CIRCLE SNAP TARGETS
  // ========================================

  private generateCircleSnapTargets(geometry: GeometryEntity): SnapTarget[] {
    const circle = geometry.data as CircleGeometry;
    const targets: SnapTarget[] = [];

    // Center snap
    if (this.config.enabledTypes.has('center')) {
      targets.push(this.createSnapTarget('center', circle.center, geometry, 90));
    }

    // Quadrant points (cardinal directions)
    if (this.config.enabledTypes.has('vertex')) {
      const quadrants: Point2D[] = [
        { x: circle.center.x + circle.radius, y: circle.center.y }, // East
        { x: circle.center.x, y: circle.center.y + circle.radius }, // North
        { x: circle.center.x - circle.radius, y: circle.center.y }, // West
        { x: circle.center.x, y: circle.center.y - circle.radius }  // South
      ];

      quadrants.forEach(point => {
        targets.push(this.createSnapTarget('vertex', point, geometry, 70));
      });
    }

    return targets;
  }

  // ========================================
  // 🌙 ARC SNAP TARGETS
  // ========================================

  private generateArcSnapTargets(geometry: GeometryEntity): SnapTarget[] {
    const arc = geometry.data as ArcGeometry;
    const targets: SnapTarget[] = [];

    // Center snap
    if (this.config.enabledTypes.has('center')) {
      targets.push(this.createSnapTarget('center', arc.center, geometry, 90));
    }

    // Endpoint snaps
    if (this.config.enabledTypes.has('endpoint')) {
      const startPoint: Point2D = {
        x: arc.center.x + arc.radius * Math.cos(arc.startAngle),
        y: arc.center.y + arc.radius * Math.sin(arc.startAngle)
      };

      const endPoint: Point2D = {
        x: arc.center.x + arc.radius * Math.cos(arc.endAngle),
        y: arc.center.y + arc.radius * Math.sin(arc.endAngle)
      };

      targets.push(
        this.createSnapTarget('endpoint', startPoint, geometry, 100),
        this.createSnapTarget('endpoint', endPoint, geometry, 100)
      );
    }

    // Midpoint snap
    if (this.config.enabledTypes.has('midpoint')) {
      const midAngle = (arc.startAngle + arc.endAngle) / 2;
      const midPoint: Point2D = {
        x: arc.center.x + arc.radius * Math.cos(midAngle),
        y: arc.center.y + arc.radius * Math.sin(midAngle)
      };
      targets.push(this.createSnapTarget('midpoint', midPoint, geometry, 80));
    }

    return targets;
  }

  // ========================================
  // 📐 POLYLINE SNAP TARGETS
  // ========================================

  private generatePolylineSnapTargets(geometry: GeometryEntity): SnapTarget[] {
    const polyline = geometry.data as PolylineGeometry;
    const targets: SnapTarget[] = [];

    // Vertex snaps
    if (this.config.enabledTypes.has('vertex')) {
      polyline.vertices.forEach(vertex => {
        targets.push(this.createSnapTarget('vertex', vertex, geometry, 100));
      });
    }

    // Midpoint snaps για κάθε edge
    if (this.config.enabledTypes.has('midpoint')) {
      for (let i = 0; i < polyline.vertices.length - 1; i++) {
        const start = polyline.vertices[i]!;
        const end = polyline.vertices[i + 1]!;
        const midpoint: Point2D = {
          x: (start.x + end.x) / 2,
          y: (start.y + end.y) / 2
        };
        targets.push(this.createSnapTarget('midpoint', midpoint, geometry, 80));
      }

      // Closed polyline - last edge
      if (polyline.closed && polyline.vertices.length > 2) {
        const start = polyline.vertices[polyline.vertices.length - 1]!;
        const end = polyline.vertices[0]!;
        const midpoint: Point2D = {
          x: (start.x + end.x) / 2,
          y: (start.y + end.y) / 2
        };
        targets.push(this.createSnapTarget('midpoint', midpoint, geometry, 80));
      }
    }

    return targets;
  }

  // ========================================
  // 📍 POINT SNAP TARGETS
  // ========================================

  private generatePointSnapTargets(geometry: GeometryEntity): SnapTarget[] {
    const point = geometry.data as PointGeometry;
    const targets: SnapTarget[] = [];

    if (this.config.enabledTypes.has('endpoint')) {
      targets.push(this.createSnapTarget('endpoint', point.position, geometry, 100));
    }

    return targets;
  }

  // ========================================
  // 🛠️ UTILITY METHODS
  // ========================================

  private createSnapTarget(
    type: SnapType,
    point: Point2D,
    geometry: GeometryEntity,
    basePriority: number
  ): SnapTarget {
    const configPriority = this.config.priority[type] ?? 50;
    const finalPriority = basePriority * (configPriority / 100);

    return {
      id: `${geometry.id}_${type}_${point.x}_${point.y}`,
      type,
      point,
      geometry,
      priority: finalPriority,
      tolerance: this.config.tolerance,
      metadata: {
        layer: geometry.layer,
        geometryType: geometry.type
      }
    };
  }

  private findClosestTarget(
    cursor: Point2D,
    candidates: SnapTarget[]
  ): { target: SnapTarget; distance: number } | null {
    if (candidates.length === 0) return null;

    let bestTarget: SnapTarget | null = null;
    let bestDistance = Infinity;
    let bestPriorityScore = -1;

    for (const candidate of candidates) {
      const distance = this.calculateDistance(cursor, candidate.point);

      if (distance <= this.config.tolerance) {
        // Priority score: closer distance + higher priority = better
        const priorityScore = candidate.priority - (distance / this.config.tolerance) * 10;

        if (priorityScore > bestPriorityScore || (
          Math.abs(priorityScore - bestPriorityScore) < 0.1 && distance < bestDistance
        )) {
          bestTarget = candidate;
          bestDistance = distance;
          bestPriorityScore = priorityScore;
        }
      }
    }

    return bestTarget ? { target: bestTarget, distance: bestDistance } : null;
  }

  private calculateDistance(p1: Point2D, p2: Point2D): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // ========================================
  // ⚙️ CONFIGURATION UPDATES
  // ========================================

  public updateConfiguration(newConfig: Partial<SnapConfiguration>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public isSnapTypeEnabled(type: SnapType): boolean {
    return this.config.enabledTypes.has(type);
  }

  public setSnapTypeEnabled(type: SnapType, enabled: boolean): void {
    if (enabled) {
      this.config.enabledTypes.add(type);
    } else {
      this.config.enabledTypes.delete(type);
    }
  }

  // ========================================
  // 🔧 ADVANCED SNAP CALCULATIONS
  // ========================================

  public calculateNearestPoint(
    cursor: Point2D,
    geometry: GeometryEntity
  ): Point2D | null {
    try {
      switch (geometry.type) {
        case 'line':
          return this.nearestPointOnLine(cursor, geometry.data as LineGeometry);
        case 'circle':
          return this.nearestPointOnCircle(cursor, geometry.data as CircleGeometry);
        default:
          return null;
      }
    } catch (error) {
      console.error('Nearest point calculation failed:', error);
      return null;
    }
  }

  private nearestPointOnLine(cursor: Point2D, line: LineGeometry): Point2D {
    const { start, end } = line;

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length === 0) return start;

    const t = Math.max(0, Math.min(1,
      ((cursor.x - start.x) * dx + (cursor.y - start.y) * dy) / (length * length)
    ));

    return {
      x: start.x + t * dx,
      y: start.y + t * dy
    };
  }

  private nearestPointOnCircle(cursor: Point2D, circle: CircleGeometry): Point2D {
    const dx = cursor.x - circle.center.x;
    const dy = cursor.y - circle.center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return { x: circle.center.x + circle.radius, y: circle.center.y };

    const scale = circle.radius / distance;
    return {
      x: circle.center.x + dx * scale,
      y: circle.center.y + dy * scale
    };
  }
}