import RBush from 'rbush';
import knn from 'rbush-knn';

// src/spatial/RTreeIndex.ts
var RTreeSpatialIndex = class {
  constructor(options = {}) {
    this.options = {
      maxEntries: options.maxEntries ?? 16,
      minEntries: options.minEntries ?? 4,
      algorithm: "rtree",
      // Always rtree για αυτή την implementation
      autoRebalance: options.autoRebalance ?? true,
      ...options
    };
    this.tree = new RBush(this.options.maxEntries);
    this.geometries = /* @__PURE__ */ new Map();
    this.lastRebuildTime = 0;
    this.indexedCount = 0;
  }
  // ========================================
  // 📥 GEOMETRY INSERTION
  // ========================================
  insertGeometry(geometry) {
    try {
      if (this.geometries.has(geometry.id)) {
        this.removeGeometry(geometry.id);
      }
      const item = {
        ...geometry.bounds,
        geometry
      };
      this.tree.insert(item);
      this.geometries.set(geometry.id, geometry);
      this.indexedCount++;
      if (this.options.autoRebalance && this.shouldRebalance()) {
        this.rebuild();
      }
    } catch (error) {
      console.error(`Failed to insert geometry ${geometry.id}:`, error);
      throw new Error(`Spatial index insertion failed: ${error}`);
    }
  }
  insertBatch(geometries) {
    const startTime = performance.now();
    try {
      const items = geometries.map((geometry) => ({
        ...geometry.bounds,
        geometry
      }));
      this.tree.load(items);
      geometries.forEach((geometry) => {
        this.geometries.set(geometry.id, geometry);
      });
      this.indexedCount += geometries.length;
      const indexTime = performance.now() - startTime;
      this.lastRebuildTime = indexTime;
      return {
        searchTime: 0,
        indexTime,
        totalTime: indexTime,
        geometryCount: geometries.length,
        resultsCount: 0,
        memoryUsage: this.estimateMemoryUsage()
      };
    } catch (error) {
      console.error("Batch insertion failed:", error);
      throw new Error(`Spatial index batch insertion failed: ${error}`);
    }
  }
  // ========================================
  // 🗑️ GEOMETRY REMOVAL
  // ========================================
  removeGeometry(geometryId) {
    const geometry = this.geometries.get(geometryId);
    if (!geometry) return false;
    try {
      const item = {
        ...geometry.bounds,
        geometry
      };
      this.tree.remove(item, (a, b) => a.geometry.id === b.geometry.id);
      this.geometries.delete(geometryId);
      this.indexedCount--;
      return true;
    } catch (error) {
      console.error(`Failed to remove geometry ${geometryId}:`, error);
      return false;
    }
  }
  clear() {
    this.tree.clear();
    this.geometries.clear();
    this.indexedCount = 0;
    this.lastRebuildTime = 0;
  }
  // ========================================
  // 🔍 SPATIAL QUERIES
  // ========================================
  searchInBounds(bounds) {
    try {
      const results = this.tree.search(bounds);
      return results.map((item) => item.geometry);
    } catch (error) {
      console.error("Bounds search failed:", error);
      return [];
    }
  }
  searchNearPoint(point, tolerance, maxResults = 10) {
    try {
      const searchBounds = {
        minX: point.x - tolerance,
        minY: point.y - tolerance,
        maxX: point.x + tolerance,
        maxY: point.y + tolerance
      };
      const candidates = this.tree.search(searchBounds);
      const results = candidates.map((item) => ({
        geometry: item.geometry,
        distance: this.calculateDistance(point, item.geometry)
      })).filter((result) => result.distance <= tolerance).sort((a, b) => a.distance - b.distance).slice(0, maxResults);
      return results;
    } catch (error) {
      console.error("Near point search failed:", error);
      return [];
    }
  }
  findKNearest(point, k = 5) {
    try {
      const results = knn(this.tree, point.x, point.y, k);
      return results.map((item) => item.geometry);
    } catch (error) {
      console.error("KNN search failed:", error);
      return [];
    }
  }
  // ========================================
  // 🔄 INDEX MAINTENANCE
  // ========================================
  rebuild() {
    const startTime = performance.now();
    try {
      const allGeometries = Array.from(this.geometries.values());
      this.clear();
      if (allGeometries.length > 0) {
        return this.insertBatch(allGeometries);
      }
      const rebuildTime = performance.now() - startTime;
      this.lastRebuildTime = rebuildTime;
      return {
        searchTime: 0,
        indexTime: rebuildTime,
        totalTime: rebuildTime,
        geometryCount: 0,
        resultsCount: 0,
        memoryUsage: this.estimateMemoryUsage()
      };
    } catch (error) {
      console.error("Index rebuild failed:", error);
      throw new Error(`Spatial index rebuild failed: ${error}`);
    }
  }
  shouldRebalance() {
    const threshold = Math.max(1e3, this.indexedCount * 0.1);
    return this.indexedCount > threshold && this.lastRebuildTime > 100;
  }
  // ========================================
  // 📊 PERFORMANCE UTILITIES
  // ========================================
  calculateDistance(point, geometry) {
    const bounds = geometry.bounds;
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    const dx = point.x - centerX;
    const dy = point.y - centerY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  estimateMemoryUsage() {
    const itemSize = 64;
    const geometrySize = 256;
    return this.indexedCount * (itemSize + geometrySize);
  }
  // ========================================
  // 📈 METRICS & DEBUGGING
  // ========================================
  getMetrics() {
    return {
      indexedCount: this.indexedCount,
      lastRebuildTime: this.lastRebuildTime,
      memoryUsage: this.estimateMemoryUsage(),
      treeDepth: this.estimateTreeDepth()
    };
  }
  estimateTreeDepth() {
    if (this.indexedCount === 0) return 0;
    return Math.ceil(Math.log(this.indexedCount) / Math.log(this.options.maxEntries));
  }
  validateIndex() {
    const errors = [];
    try {
      const allItems = this.tree.all();
      if (allItems.length !== this.indexedCount) {
        errors.push(`Tree item count mismatch: ${allItems.length} vs ${this.indexedCount}`);
      }
      if (allItems.length !== this.geometries.size) {
        errors.push(`Geometry map size mismatch: ${this.geometries.size} vs ${allItems.length}`);
      }
      allItems.forEach((item, index) => {
        if (item.minX > item.maxX || item.minY > item.maxY) {
          errors.push(`Invalid bounds at index ${index}: ${JSON.stringify(item)}`);
        }
      });
      return {
        valid: errors.length === 0,
        errors
      };
    } catch (error) {
      return {
        valid: false,
        errors: [`Validation failed: ${error}`]
      };
    }
  }
};

// src/algorithms/SnapCalculator.ts
var SnapCalculator = class {
  constructor(config) {
    this.config = config;
  }
  // ========================================
  // 🎯 MAIN SNAP CALCULATION
  // ========================================
  calculateSnap(cursor, geometries) {
    try {
      const candidates = [];
      for (const geometry of geometries) {
        if (!geometry.visible || !geometry.selectable) continue;
        const targets = this.generateSnapTargets(geometry);
        candidates.push(...targets);
      }
      const validCandidates = candidates.filter(
        (target) => this.config.enabledTypes.has(target.type)
      );
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
      console.error("Snap calculation failed:", error);
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
  generateSnapTargets(geometry) {
    const targets = [];
    switch (geometry.type) {
      case "line":
        targets.push(...this.generateLineSnapTargets(geometry));
        break;
      case "circle":
        targets.push(...this.generateCircleSnapTargets(geometry));
        break;
      case "arc":
        targets.push(...this.generateArcSnapTargets(geometry));
        break;
      case "polyline":
      case "polygon":
        targets.push(...this.generatePolylineSnapTargets(geometry));
        break;
      case "point":
        targets.push(...this.generatePointSnapTargets(geometry));
        break;
    }
    return targets;
  }
  // ========================================
  // 📏 LINE SNAP TARGETS
  // ========================================
  generateLineSnapTargets(geometry) {
    const line = geometry.data;
    const targets = [];
    if (this.config.enabledTypes.has("endpoint")) {
      targets.push(
        this.createSnapTarget("endpoint", line.start, geometry, 100),
        this.createSnapTarget("endpoint", line.end, geometry, 100)
      );
    }
    if (this.config.enabledTypes.has("midpoint")) {
      const midpoint = {
        x: (line.start.x + line.end.x) / 2,
        y: (line.start.y + line.end.y) / 2
      };
      targets.push(this.createSnapTarget("midpoint", midpoint, geometry, 80));
    }
    return targets;
  }
  // ========================================
  // ⭕ CIRCLE SNAP TARGETS
  // ========================================
  generateCircleSnapTargets(geometry) {
    const circle = geometry.data;
    const targets = [];
    if (this.config.enabledTypes.has("center")) {
      targets.push(this.createSnapTarget("center", circle.center, geometry, 90));
    }
    if (this.config.enabledTypes.has("vertex")) {
      const quadrants = [
        { x: circle.center.x + circle.radius, y: circle.center.y },
        // East
        { x: circle.center.x, y: circle.center.y + circle.radius },
        // North
        { x: circle.center.x - circle.radius, y: circle.center.y },
        // West
        { x: circle.center.x, y: circle.center.y - circle.radius }
        // South
      ];
      quadrants.forEach((point) => {
        targets.push(this.createSnapTarget("vertex", point, geometry, 70));
      });
    }
    return targets;
  }
  // ========================================
  // 🌙 ARC SNAP TARGETS
  // ========================================
  generateArcSnapTargets(geometry) {
    const arc = geometry.data;
    const targets = [];
    if (this.config.enabledTypes.has("center")) {
      targets.push(this.createSnapTarget("center", arc.center, geometry, 90));
    }
    if (this.config.enabledTypes.has("endpoint")) {
      const startPoint = {
        x: arc.center.x + arc.radius * Math.cos(arc.startAngle),
        y: arc.center.y + arc.radius * Math.sin(arc.startAngle)
      };
      const endPoint = {
        x: arc.center.x + arc.radius * Math.cos(arc.endAngle),
        y: arc.center.y + arc.radius * Math.sin(arc.endAngle)
      };
      targets.push(
        this.createSnapTarget("endpoint", startPoint, geometry, 100),
        this.createSnapTarget("endpoint", endPoint, geometry, 100)
      );
    }
    if (this.config.enabledTypes.has("midpoint")) {
      const midAngle = (arc.startAngle + arc.endAngle) / 2;
      const midPoint = {
        x: arc.center.x + arc.radius * Math.cos(midAngle),
        y: arc.center.y + arc.radius * Math.sin(midAngle)
      };
      targets.push(this.createSnapTarget("midpoint", midPoint, geometry, 80));
    }
    return targets;
  }
  // ========================================
  // 📐 POLYLINE SNAP TARGETS
  // ========================================
  generatePolylineSnapTargets(geometry) {
    const polyline = geometry.data;
    const targets = [];
    if (this.config.enabledTypes.has("vertex")) {
      polyline.vertices.forEach((vertex) => {
        targets.push(this.createSnapTarget("vertex", vertex, geometry, 100));
      });
    }
    if (this.config.enabledTypes.has("midpoint")) {
      for (let i = 0; i < polyline.vertices.length - 1; i++) {
        const start = polyline.vertices[i];
        const end = polyline.vertices[i + 1];
        const midpoint = {
          x: (start.x + end.x) / 2,
          y: (start.y + end.y) / 2
        };
        targets.push(this.createSnapTarget("midpoint", midpoint, geometry, 80));
      }
      if (polyline.closed && polyline.vertices.length > 2) {
        const start = polyline.vertices[polyline.vertices.length - 1];
        const end = polyline.vertices[0];
        const midpoint = {
          x: (start.x + end.x) / 2,
          y: (start.y + end.y) / 2
        };
        targets.push(this.createSnapTarget("midpoint", midpoint, geometry, 80));
      }
    }
    return targets;
  }
  // ========================================
  // 📍 POINT SNAP TARGETS
  // ========================================
  generatePointSnapTargets(geometry) {
    const point = geometry.data;
    const targets = [];
    if (this.config.enabledTypes.has("endpoint")) {
      targets.push(this.createSnapTarget("endpoint", point.position, geometry, 100));
    }
    return targets;
  }
  // ========================================
  // 🛠️ UTILITY METHODS
  // ========================================
  createSnapTarget(type, point, geometry, basePriority) {
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
  findClosestTarget(cursor, candidates) {
    if (candidates.length === 0) return null;
    let bestTarget = null;
    let bestDistance = Infinity;
    let bestPriorityScore = -1;
    for (const candidate of candidates) {
      const distance = this.calculateDistance(cursor, candidate.point);
      if (distance <= this.config.tolerance) {
        const priorityScore = candidate.priority - distance / this.config.tolerance * 10;
        if (priorityScore > bestPriorityScore || Math.abs(priorityScore - bestPriorityScore) < 0.1 && distance < bestDistance) {
          bestTarget = candidate;
          bestDistance = distance;
          bestPriorityScore = priorityScore;
        }
      }
    }
    return bestTarget ? { target: bestTarget, distance: bestDistance } : null;
  }
  calculateDistance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  // ========================================
  // ⚙️ CONFIGURATION UPDATES
  // ========================================
  updateConfiguration(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }
  isSnapTypeEnabled(type) {
    return this.config.enabledTypes.has(type);
  }
  setSnapTypeEnabled(type, enabled) {
    if (enabled) {
      this.config.enabledTypes.add(type);
    } else {
      this.config.enabledTypes.delete(type);
    }
  }
  // ========================================
  // 🔧 ADVANCED SNAP CALCULATIONS
  // ========================================
  calculateNearestPoint(cursor, geometry) {
    try {
      switch (geometry.type) {
        case "line":
          return this.nearestPointOnLine(cursor, geometry.data);
        case "circle":
          return this.nearestPointOnCircle(cursor, geometry.data);
        default:
          return null;
      }
    } catch (error) {
      console.error("Nearest point calculation failed:", error);
      return null;
    }
  }
  nearestPointOnLine(cursor, line) {
    const { start, end } = line;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return start;
    const t = Math.max(0, Math.min(
      1,
      ((cursor.x - start.x) * dx + (cursor.y - start.y) * dy) / (length * length)
    ));
    return {
      x: start.x + t * dx,
      y: start.y + t * dy
    };
  }
  nearestPointOnCircle(cursor, circle) {
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
};

// src/utils/GeometryUtils.ts
var GeometryUtils = class {
  static calculateBounds(geometry) {
    switch (geometry.type) {
      case "line":
        return this.calculateLineBounds(geometry.data);
      case "circle":
        return this.calculateCircleBounds(geometry.data);
      case "arc":
        return this.calculateArcBounds(geometry.data);
      case "polyline":
      case "polygon":
        return this.calculatePolylineBounds(geometry.data);
      case "point":
        return this.calculatePointBounds(geometry.data);
      default:
        throw new Error(`Unsupported geometry type: ${geometry.type}`);
    }
  }
  static calculateLineBounds(line) {
    return {
      minX: Math.min(line.start.x, line.end.x),
      minY: Math.min(line.start.y, line.end.y),
      maxX: Math.max(line.start.x, line.end.x),
      maxY: Math.max(line.start.y, line.end.y)
    };
  }
  static calculateCircleBounds(circle) {
    return {
      minX: circle.center.x - circle.radius,
      minY: circle.center.y - circle.radius,
      maxX: circle.center.x + circle.radius,
      maxY: circle.center.y + circle.radius
    };
  }
  static calculateArcBounds(arc) {
    return this.calculateCircleBounds(arc);
  }
  static calculatePolylineBounds(polyline) {
    if (polyline.vertices.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }
    const firstVertex = polyline.vertices[0];
    let minX = firstVertex.x;
    let minY = firstVertex.y;
    let maxX = firstVertex.x;
    let maxY = firstVertex.y;
    for (const vertex of polyline.vertices) {
      minX = Math.min(minX, vertex.x);
      minY = Math.min(minY, vertex.y);
      maxX = Math.max(maxX, vertex.x);
      maxY = Math.max(maxY, vertex.y);
    }
    return { minX, minY, maxX, maxY };
  }
  static calculatePointBounds(point) {
    const tolerance = 0.1;
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
  static convertCADToGeometry(cadEntity) {
    const bounds = this.calculateBoundsFromCAD(cadEntity);
    return {
      id: cadEntity.handle || `cad_${Date.now()}`,
      type: this.mapCADTypeToGeometry(cadEntity.cadType || "unknown"),
      bounds,
      layer: cadEntity.layerName || "default",
      visible: true,
      selectable: true,
      data: this.extractGeometryData(cadEntity)
    };
  }
  static calculateBoundsFromCAD(cadEntity) {
    return cadEntity.bounds || { minX: 0, minY: 0, maxX: 1, maxY: 1 };
  }
  static mapCADTypeToGeometry(cadType) {
    const typeMap = {
      "LINE": "line",
      "CIRCLE": "circle",
      "ARC": "arc",
      "POLYLINE": "polyline",
      "LWPOLYLINE": "polyline",
      "POINT": "point",
      "SPLINE": "spline"
    };
    return typeMap[cadType] || "line";
  }
  static extractGeometryData(cadEntity) {
    switch (cadEntity.cadType) {
      case "LINE":
        return {
          start: { x: 0, y: 0 },
          end: { x: 100, y: 100 }
        };
      case "CIRCLE":
        return {
          center: { x: 50, y: 50 },
          radius: 25
        };
      default:
        return {
          start: { x: 0, y: 0 },
          end: { x: 0, y: 0 }
        };
    }
  }
  // ========================================
  // 🌍 OSM GEOMETRY INTEGRATION
  // ========================================
  static convertOSMToGeometry(osmData) {
    try {
      if (osmData.type === "node" && osmData.lat && osmData.lon) {
        return {
          id: `osm_node_${osmData.id}`,
          osmId: osmData.id,
          osmType: "node",
          type: "point",
          bounds: {
            minX: osmData.lon - 1e-4,
            minY: osmData.lat - 1e-4,
            maxX: osmData.lon + 1e-4,
            maxY: osmData.lat + 1e-4
          },
          layer: "osm_buildings",
          visible: true,
          selectable: true,
          tags: osmData.tags,
          data: {
            position: { x: osmData.lon, y: osmData.lat }
          }
        };
      }
      if (osmData.type === "way" && osmData.nodes && osmData.nodes.length > 0) {
        const vertices = osmData.nodes.map((node) => ({
          x: node.lon,
          y: node.lat
        }));
        const bounds = this.calculatePolylineBounds({ vertices, closed: false });
        const isBuilding = osmData.tags.building !== void 0;
        return {
          id: `osm_way_${osmData.id}`,
          osmId: osmData.id,
          osmType: "way",
          type: isBuilding ? "polygon" : "polyline",
          bounds,
          layer: "osm_buildings",
          visible: true,
          selectable: true,
          tags: osmData.tags,
          data: {
            vertices,
            closed: isBuilding
          }
        };
      }
      return null;
    } catch (error) {
      console.error("OSM geometry conversion failed:", error);
      return null;
    }
  }
  // ========================================
  // 📏 DISTANCE CALCULATIONS
  // ========================================
  static pointToGeometryDistance(point, geometry) {
    switch (geometry.type) {
      case "line":
        return this.pointToLineDistance(point, geometry.data);
      case "circle":
        return this.pointToCircleDistance(point, geometry.data);
      case "point":
        return this.pointToPointDistance(point, geometry.data.position);
      default:
        const center = this.getBoundsCenter(geometry.bounds);
        return this.pointToPointDistance(point, center);
    }
  }
  static pointToLineDistance(point, line) {
    const { start, end } = line;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) {
      return this.pointToPointDistance(point, start);
    }
    const t = Math.max(0, Math.min(
      1,
      ((point.x - start.x) * dx + (point.y - start.y) * dy) / (length * length)
    ));
    const projection = {
      x: start.x + t * dx,
      y: start.y + t * dy
    };
    return this.pointToPointDistance(point, projection);
  }
  static pointToCircleDistance(point, circle) {
    const centerDistance = this.pointToPointDistance(point, circle.center);
    return Math.abs(centerDistance - circle.radius);
  }
  static pointToPointDistance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  static getBoundsCenter(bounds) {
    return {
      x: (bounds.minX + bounds.maxX) / 2,
      y: (bounds.minY + bounds.maxY) / 2
    };
  }
  // ========================================
  // ✅ VALIDATION UTILITIES
  // ========================================
  static validateGeometry(geometry) {
    const errors = [];
    if (!geometry.id) {
      errors.push("Geometry must have an ID");
    }
    if (!geometry.type) {
      errors.push("Geometry must have a type");
    }
    if (geometry.bounds.minX > geometry.bounds.maxX) {
      errors.push("Invalid bounds: minX > maxX");
    }
    if (geometry.bounds.minY > geometry.bounds.maxY) {
      errors.push("Invalid bounds: minY > maxY");
    }
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
  static validateGeometryData(geometry) {
    switch (geometry.type) {
      case "line":
        const line = geometry.data;
        if (!line.start || !line.end) {
          throw new Error("Line must have start and end points");
        }
        break;
      case "circle":
        const circle = geometry.data;
        if (!circle.center || circle.radius <= 0) {
          throw new Error("Circle must have center and positive radius");
        }
        break;
      case "polyline":
        const polyline = geometry.data;
        if (!polyline.vertices || polyline.vertices.length < 2) {
          throw new Error("Polyline must have at least 2 vertices");
        }
        break;
    }
  }
  // ========================================
  // 🎯 SNAP OPTIMIZATION HELPERS
  // ========================================
  static getSnapPriority(geometry) {
    const priorityMap = {
      "point": 100,
      "line": 90,
      "circle": 85,
      "arc": 80,
      "polyline": 75,
      "polygon": 70,
      "spline": 60,
      "ellipse": 55,
      "rectangle": 85
    };
    return priorityMap[geometry.type] || 50;
  }
  static shouldSnapToGeometry(geometry, cursor, tolerance) {
    const bounds = geometry.bounds;
    const expandedBounds = {
      minX: bounds.minX - tolerance,
      minY: bounds.minY - tolerance,
      maxX: bounds.maxX + tolerance,
      maxY: bounds.maxY + tolerance
    };
    return cursor.x >= expandedBounds.minX && cursor.x <= expandedBounds.maxX && cursor.y >= expandedBounds.minY && cursor.y <= expandedBounds.maxY;
  }
};

// src/SnapEngine.ts
var SNAP_CONSTANTS = {
  DEFAULT_TOLERANCE: 10,
  MAX_RESULTS: 50,
  DEFAULT_PRIORITIES: {
    endpoint: 100,
    midpoint: 80,
    center: 90,
    vertex: 85,
    intersection: 95,
    perpendicular: 70,
    tangent: 65,
    nearest: 60,
    grid: 50,
    edge: 75
  },
  SPATIAL_INDEX: {
    MAX_ENTRIES: 16}};
var SnapEngine = class {
  constructor(config) {
    this.configuration = {
      tolerance: config?.tolerance ?? SNAP_CONSTANTS.DEFAULT_TOLERANCE,
      enabledTypes: config?.enabledTypes ?? /* @__PURE__ */ new Set([
        "endpoint",
        "midpoint",
        "center",
        "vertex",
        "nearest"
      ]),
      priority: config?.priority ?? SNAP_CONSTANTS.DEFAULT_PRIORITIES,
      maxResults: config?.maxResults ?? SNAP_CONSTANTS.MAX_RESULTS,
      performanceLevel: config?.performanceLevel ?? "medium",
      debugMode: config?.debugMode ?? false
    };
    this.spatialIndex = new RTreeSpatialIndex({
      maxEntries: SNAP_CONSTANTS.SPATIAL_INDEX.MAX_ENTRIES,
      autoRebalance: true
    });
    this.snapCalculator = new SnapCalculator(this.configuration);
    this.eventListeners = /* @__PURE__ */ new Map();
    this.isEnabled = true;
    this.performanceMetrics = {
      searchTime: 0,
      indexTime: 0,
      totalTime: 0,
      geometryCount: 0,
      resultsCount: 0,
      memoryUsage: 0
    };
    this.initializeEventListeners();
  }
  // ========================================
  // 🎯 MAIN SNAP FUNCTIONALITY
  // ========================================
  async snapToPoint(cursor) {
    if (!this.isEnabled) {
      return this.createNoSnapResult(cursor);
    }
    const startTime = performance.now();
    try {
      this.emitEvent("snap:start", { cursor });
      const transformedCursor = this.coordinateContext?.transformer ? this.coordinateContext.transformer(cursor) : cursor;
      const tolerance = this.configuration.tolerance;
      const candidates = this.spatialIndex.searchNearPoint(
        transformedCursor,
        tolerance,
        this.configuration.maxResults
      );
      const geometries = candidates.map((c) => c.geometry);
      const snapResult = this.snapCalculator.calculateSnap(transformedCursor, geometries);
      const totalTime = performance.now() - startTime;
      this.updatePerformanceMetrics({
        searchTime: totalTime * 0.7,
        // Estimate
        indexTime: 0,
        totalTime,
        geometryCount: candidates.length,
        resultsCount: snapResult.snapped ? 1 : 0,
        memoryUsage: this.spatialIndex.getMetrics().memoryUsage
      });
      const finalResult = this.transformSnapResult(snapResult, cursor);
      if (finalResult.snapped) {
        this.emitEvent("snap:found", { result: finalResult });
      } else {
        this.emitEvent("snap:lost", { lastResult: null });
      }
      return finalResult;
    } catch (error) {
      console.error("Snap calculation failed:", error);
      this.emitEvent("snap:error", { error, context: "snapToPoint" });
      return this.createNoSnapResult(cursor);
    }
  }
  // ========================================
  // 🏗️ GEOMETRY MANAGEMENT
  // ========================================
  addGeometry(geometry) {
    try {
      const validation = GeometryUtils.validateGeometry(geometry);
      if (!validation.valid) {
        console.warn(`Invalid geometry ${geometry.id}:`, validation.errors);
        return false;
      }
      if (!geometry.bounds) {
        geometry.bounds = GeometryUtils.calculateBounds(geometry);
      }
      this.spatialIndex.insertGeometry(geometry);
      if (this.configuration.debugMode) {
        console.log(`Added geometry ${geometry.id} to snap engine`);
      }
      return true;
    } catch (error) {
      console.error(`Failed to add geometry ${geometry.id}:`, error);
      return false;
    }
  }
  addGeometries(geometries) {
    const startTime = performance.now();
    try {
      const validGeometries = geometries.filter((geometry) => {
        const validation = GeometryUtils.validateGeometry(geometry);
        if (!validation.valid && this.configuration.debugMode) {
          console.warn(`Skipping invalid geometry ${geometry.id}:`, validation.errors);
        }
        return validation.valid;
      });
      validGeometries.forEach((geometry) => {
        if (!geometry.bounds) {
          geometry.bounds = GeometryUtils.calculateBounds(geometry);
        }
      });
      const indexMetrics = this.spatialIndex.insertBatch(validGeometries);
      this.emitEvent("index:rebuilt", {
        geometryCount: validGeometries.length,
        indexTime: indexMetrics.indexTime
      });
      return indexMetrics;
    } catch (error) {
      console.error("Batch geometry addition failed:", error);
      this.emitEvent("snap:error", { error, context: "addGeometries" });
      return {
        searchTime: 0,
        indexTime: performance.now() - startTime,
        totalTime: performance.now() - startTime,
        geometryCount: 0,
        resultsCount: 0,
        memoryUsage: 0
      };
    }
  }
  removeGeometry(geometryId) {
    return this.spatialIndex.removeGeometry(geometryId);
  }
  clearGeometries() {
    this.spatialIndex.clear();
    this.performanceMetrics.geometryCount = 0;
  }
  // ========================================
  // 🌍 INTEGRATION με EXISTING LEGO SYSTEMS
  // ========================================
  addCADGeometries(cadEntities) {
    const geometries = cadEntities.map((entity) => GeometryUtils.convertCADToGeometry(entity)).filter(Boolean);
    return this.addGeometries(geometries);
  }
  addOSMBuildings(osmData) {
    const geometries = osmData.map((data) => GeometryUtils.convertOSMToGeometry(data)).filter(Boolean);
    return this.addGeometries(geometries);
  }
  setCoordinateSystemContext(context, transformer) {
    const newContext = {
      ...context
    };
    if (transformer?.transform) {
      newContext.transformer = transformer.transform;
    } else if (context.transformer) {
      newContext.transformer = context.transformer;
    }
    this.coordinateContext = newContext;
  }
  // ========================================
  // ⚙️ CONFIGURATION MANAGEMENT
  // ========================================
  updateConfiguration(config) {
    this.configuration = { ...this.configuration, ...config };
    this.snapCalculator.updateConfiguration(this.configuration);
  }
  setSnapTypeEnabled(type, enabled) {
    if (enabled) {
      this.configuration.enabledTypes.add(type);
    } else {
      this.configuration.enabledTypes.delete(type);
    }
    this.snapCalculator.setSnapTypeEnabled(type, enabled);
  }
  setTolerance(tolerance) {
    this.configuration.tolerance = Math.max(1, Math.min(100, tolerance));
    this.snapCalculator.updateConfiguration({ tolerance: this.configuration.tolerance });
  }
  setEnabled(enabled) {
    this.isEnabled = enabled;
  }
  // ========================================
  // 📊 PERFORMANCE & METRICS
  // ========================================
  getPerformanceMetrics() {
    return {
      ...this.performanceMetrics,
      indexMetrics: this.spatialIndex.getMetrics()
    };
  }
  validateIndex() {
    return this.spatialIndex.validateIndex();
  }
  rebuildIndex() {
    return this.spatialIndex.rebuild();
  }
  // ========================================
  // 🎧 EVENT SYSTEM
  // ========================================
  addEventListener(event, listener) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, /* @__PURE__ */ new Set());
    }
    this.eventListeners.get(event).add(listener);
  }
  removeEventListener(event, listener) {
    this.eventListeners.get(event)?.delete(listener);
  }
  emitEvent(event, data) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach((listener) => {
        try {
          listener(data);
        } catch (error) {
          console.error(`Event listener error for ${event}:`, error);
        }
      });
    }
  }
  // ========================================
  // 🛠️ PRIVATE UTILITIES
  // ========================================
  createNoSnapResult(cursor) {
    return {
      target: null,
      snapped: false,
      distance: Infinity,
      cursor,
      snapPoint: cursor,
      snapType: null
    };
  }
  transformSnapResult(result, originalCursor) {
    if (this.coordinateContext?.transformer && result.snapped) {
      return result;
    }
    return {
      ...result,
      cursor: originalCursor
    };
  }
  updatePerformanceMetrics(metrics) {
    this.performanceMetrics = { ...this.performanceMetrics, ...metrics };
  }
  initializeEventListeners() {
    if (this.configuration.debugMode) {
      this.addEventListener("snap:found", (data) => {
        console.log("Snap found:", data.result);
      });
      this.addEventListener("snap:error", (data) => {
        console.error("Snap engine error:", data.error.message);
      });
    }
  }
  // ========================================
  // 🧹 CLEANUP
  // ========================================
  dispose() {
    this.clearGeometries();
    this.eventListeners.clear();
    this.isEnabled = false;
  }
};

// src/index.ts
var DEFAULT_SNAP_CONFIG = {
  tolerance: 10,
  enabledTypes: /* @__PURE__ */ new Set(["endpoint", "midpoint", "center"]),
  priority: {
    endpoint: 100,
    midpoint: 80,
    center: 90,
    vertex: 85,
    intersection: 95,
    perpendicular: 70,
    tangent: 65,
    nearest: 60,
    grid: 50,
    edge: 75
  },
  maxResults: 10,
  performanceLevel: "medium",
  debugMode: false
};
var DEFAULT_SPATIAL_OPTIONS = {
  maxEntries: 16,
  minEntries: 4,
  algorithm: "rtree",
  autoRebalance: true
};
var SNAP_TYPES = {
  ENDPOINT: "endpoint",
  MIDPOINT: "midpoint",
  CENTER: "center",
  VERTEX: "vertex",
  INTERSECTION: "intersection",
  PERPENDICULAR: "perpendicular",
  TANGENT: "tangent",
  NEAREST: "nearest",
  GRID: "grid",
  EDGE: "edge"
};
var PERFORMANCE_CONFIGS = {
  high: {
    maxGeometries: 1e4,
    indexRebuildThreshold: 100,
    searchRadius: 50
  },
  medium: {
    maxGeometries: 5e3,
    indexRebuildThreshold: 250,
    searchRadius: 25
  },
  low: {
    maxGeometries: 1e3,
    indexRebuildThreshold: 500,
    searchRadius: 15
  }
};
function createCADSnapEngine(config) {
  return new SnapEngine({
    tolerance: 5,
    enabledTypes: /* @__PURE__ */ new Set(["endpoint", "midpoint", "center", "vertex", "intersection"]),
    performanceLevel: "high",
    ...config
  });
}
function createGISSnapEngine(config) {
  return new SnapEngine({
    tolerance: 15,
    enabledTypes: /* @__PURE__ */ new Set(["endpoint", "vertex", "nearest"]),
    performanceLevel: "medium",
    ...config
  });
}
function createMobileSnapEngine(config) {
  return new SnapEngine({
    tolerance: 20,
    enabledTypes: /* @__PURE__ */ new Set(["endpoint", "vertex"]),
    performanceLevel: "low",
    maxResults: 5,
    ...config
  });
}
function validateSnapConfig(config) {
  const errors = [];
  const warnings = [];
  if (config.tolerance && (config.tolerance < 1 || config.tolerance > 100)) {
    errors.push("Tolerance must be between 1 and 100 pixels");
  }
  if (config.maxResults && config.maxResults > 50) {
    warnings.push("High maxResults may impact performance");
  }
  if (config.enabledTypes && config.enabledTypes.size === 0) {
    warnings.push("No snap types enabled - snapping will be disabled");
  }
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
function createGeometry(id, type, data, options) {
  const geometry = {
    id,
    type,
    data,
    bounds: { minX: 0, minY: 0, maxX: 0, maxY: 0 },
    // Will be calculated
    layer: options?.layer || "default",
    visible: options?.visible ?? true,
    selectable: options?.selectable ?? true
  };
  geometry.bounds = GeometryUtils.calculateBounds(geometry);
  return geometry;
}
var VERSION = "1.0.0";
var BUILD_INFO = {
  version: VERSION,
  buildDate: (/* @__PURE__ */ new Date()).toISOString(),
  features: [
    "R-tree spatial indexing",
    "AutoCAD-style snap algorithms",
    "OSM geometry integration",
    "CAD file format support",
    "Coordinate system transformations",
    "Performance monitoring",
    "TypeScript strict typing"
  ]
};
var index_default = SnapEngine;

export { BUILD_INFO, DEFAULT_SNAP_CONFIG, DEFAULT_SPATIAL_OPTIONS, GeometryUtils, PERFORMANCE_CONFIGS, RTreeSpatialIndex, SNAP_TYPES, SnapCalculator, SnapEngine, VERSION, createCADSnapEngine, createGISSnapEngine, createGeometry, createMobileSnapEngine, index_default as default, validateSnapConfig };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map