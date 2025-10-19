"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CADProcessingError: () => CADProcessingError,
  CADRenderer: () => CADRenderer,
  CADRenderingError: () => CADRenderingError,
  DWGNotSupportedError: () => DWGNotSupportedError,
  DXFParsingError: () => DXFParsingError,
  LayeraDXFParser: () => LayeraDXFParser,
  estimateCADComplexity: () => estimateCADComplexity,
  useCADProcessing: () => useCADProcessing,
  validateCADFile: () => validateCADFile,
  validateCADProcessingOptions: () => validateCADProcessingOptions
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useCADProcessing.ts
var import_react = require("react");
var import_notifications = require("@layera/notifications");
var import_hooks = require("@layera/i18n/hooks");

// src/types/index.ts
var CADProcessingError = class extends Error {
  constructor(message, code, stage, originalError) {
    super(message);
    this.code = code;
    this.stage = stage;
    this.originalError = originalError;
    this.name = "CADProcessingError";
  }
};
var DXFParsingError = class extends CADProcessingError {
  constructor(message, lineNumber) {
    super(
      `DXF parsing failed: ${message}${lineNumber ? ` at line ${lineNumber}` : ""}`,
      "DXF_PARSING_ERROR",
      "parsing"
    );
  }
};
var DWGNotSupportedError = class extends CADProcessingError {
  constructor() {
    super(
      "DWG format is not yet supported. Please convert to DXF format.",
      "DWG_NOT_SUPPORTED",
      "parsing"
    );
  }
};
var CADRenderingError = class extends CADProcessingError {
  constructor(message, entityType) {
    super(
      `CAD rendering failed: ${message}${entityType ? ` for entity type ${entityType}` : ""}`,
      "CAD_RENDERING_ERROR",
      "rendering"
    );
  }
};

// src/parsers/dxfParser.ts
var import_dxf_parser = __toESM(require("dxf-parser"));
var LayeraDXFParser = class {
  constructor() {
    __publicField(this, "parser");
    __publicField(this, "warnings", []);
    __publicField(this, "errors", []);
    this.parser = new import_dxf_parser.default();
  }
  /**
   * Main parsing method
   */
  async parseDXF(fileContent, options = {}) {
    const startTime = performance.now();
    this.warnings = [];
    this.errors = [];
    try {
      const dxfString = typeof fileContent === "string" ? fileContent : new TextDecoder(options.encoding || "utf-8").decode(fileContent);
      this.validateDXFContent(dxfString);
      const parsedDxf = this.parser.parseSync(dxfString);
      if (!parsedDxf) {
        throw new DXFParsingError("Failed to parse DXF content");
      }
      const cadData = await this.transformToCADData(parsedDxf, options);
      cadData.metadata.parsingTime = performance.now() - startTime;
      return cadData;
    } catch (error) {
      if (error instanceof DXFParsingError) {
        throw error;
      }
      throw new DXFParsingError(
        error instanceof Error ? error.message : "Unknown parsing error"
      );
    }
  }
  /**
   * Validates DXF file content
   */
  validateDXFContent(content) {
    if (!content.includes("SECTION") || !content.includes("HEADER")) {
      throw new DXFParsingError("Invalid DXF file: Missing SECTION or HEADER");
    }
    const requiredSections = ["HEADER", "ENTITIES"];
    const missingSections = requiredSections.filter(
      (section) => !content.includes(section)
    );
    if (missingSections.length > 0) {
      this.warnings.push({
        code: "MISSING_SECTIONS",
        message: `Missing DXF sections: ${missingSections.join(", ")}`,
        suggestion: "Some features may not be available"
      });
    }
    if (content.length > 50 * 1024 * 1024) {
      this.warnings.push({
        code: "LARGE_FILE",
        message: "Large DXF file detected - processing may take time",
        suggestion: "Consider simplifying the drawing or processing in chunks"
      });
    }
  }
  /**
   * Transforms dxf-parser output to our CAD data structure
   */
  async transformToCADData(parsedDxf, options) {
    const header = this.extractHeader(parsedDxf);
    const tables = this.extractTables(parsedDxf, options);
    const blocks = this.extractBlocks(parsedDxf, options);
    const entities = this.extractEntities(parsedDxf, options);
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
  extractHeader(parsedDxf) {
    const header = parsedDxf.header || {};
    return {
      version: this.getHeaderValue(header, "$ACADVER", "AC1015"),
      drawingUnits: this.mapDXFUnits(this.getHeaderValue(header, "$INSUNITS", 0)),
      insertionBasePoint: this.getHeaderPoint(header, "$INSBASE"),
      extentsMin: this.getHeaderPoint(header, "$EXTMIN"),
      extentsMax: this.getHeaderPoint(header, "$EXTMAX"),
      customProperties: {}
    };
  }
  /**
   * Extracts tables (layers, linetypes, etc.)
   */
  extractTables(parsedDxf, options) {
    const tables = parsedDxf.tables || {};
    return {
      layers: this.extractLayers(tables.layer || []),
      lineTypes: this.extractLineTypes(tables.ltype || []),
      textStyles: this.extractTextStyles(tables.style || []),
      blocks: [],
      viewports: []
    };
  }
  /**
   * Extracts layer definitions
   */
  extractLayers(layerData) {
    return layerData.map((layer) => ({
      name: layer.name || "DEFAULT",
      color: this.parseColor(layer.color),
      lineType: layer.lineType || "CONTINUOUS",
      lineWeight: layer.lineWeight || 0,
      visible: !layer.flags,
      // Bit 1 = frozen
      locked: !!layer.flags,
      // Bit 4 = locked
      frozen: !!layer.flags
      // Bit 1 = frozen
    }));
  }
  /**
   * Extracts line type definitions
   */
  extractLineTypes(lineTypeData) {
    return [];
  }
  /**
   * Extracts text style definitions
   */
  extractTextStyles(styleData) {
    return [];
  }
  /**
   * Extracts block definitions
   */
  extractBlocks(parsedDxf, options) {
    if (!options.preserveBlockStructure) return [];
    const blocks = parsedDxf.blocks || {};
    return [];
  }
  /**
   * Extracts entities (main geometric data)
   */
  extractEntities(parsedDxf, options) {
    const entities = parsedDxf.entities || [];
    const cadEntities = [];
    for (const entity of entities) {
      try {
        const cadEntity = this.convertEntityToCAD(entity);
        if (cadEntity) {
          cadEntities.push(cadEntity);
        }
      } catch (error) {
        this.errors.push({
          code: "ENTITY_CONVERSION_ERROR",
          message: `Failed to convert entity: ${error instanceof Error ? error.message : "Unknown error"}`,
          severity: "warning",
          entity: entity.type || "unknown"
        });
      }
    }
    return cadEntities;
  }
  /**
   * Converts a DXF entity to our CAD entity format
   */
  convertEntityToCAD(entity) {
    const entityType = entity.type?.toUpperCase();
    if (!entityType) {
      return null;
    }
    const baseEntity = {
      id: this.generateEntityId(),
      type: entityType,
      layer: entity.layer || "0",
      color: this.parseColor(entity.color),
      lineType: entity.lineType || "CONTINUOUS",
      lineWeight: entity.lineWeight || 0
    };
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
  convertEntityGeometry(entity, entityType) {
    switch (entityType) {
      case "LINE":
        return this.convertLineGeometry(entity);
      case "CIRCLE":
        return this.convertCircleGeometry(entity);
      case "ARC":
        return this.convertArcGeometry(entity);
      case "POLYLINE":
      case "LWPOLYLINE":
        return this.convertPolylineGeometry(entity);
      case "TEXT":
      case "MTEXT":
        return this.convertTextGeometry(entity);
      case "POINT":
        return this.convertPointGeometry(entity);
      default:
        this.warnings.push({
          code: "UNSUPPORTED_ENTITY",
          message: `Unsupported entity type: ${entityType}`,
          suggestion: "Entity will be skipped"
        });
        return null;
    }
  }
  /**
   * Converts LINE entity geometry
   */
  convertLineGeometry(entity) {
    const start = this.getPoint(entity, "start") || this.getPoint(entity, "");
    const end = this.getPoint(entity, "end") || this.getPoint(entity, "1");
    return {
      type: "LINE",
      points: [start, end],
      properties: {}
    };
  }
  /**
   * Converts CIRCLE entity geometry
   */
  convertCircleGeometry(entity) {
    const center = this.getPoint(entity, "center") || this.getPoint(entity, "");
    const radius = entity.radius || 0;
    return {
      type: "CIRCLE",
      points: [center],
      properties: { radius }
    };
  }
  /**
   * Converts ARC entity geometry
   */
  convertArcGeometry(entity) {
    const center = this.getPoint(entity, "center") || this.getPoint(entity, "");
    const radius = entity.radius || 0;
    const startAngle = entity.startAngle || 0;
    const endAngle = entity.endAngle || 0;
    return {
      type: "ARC",
      points: [center],
      properties: { radius, startAngle, endAngle }
    };
  }
  /**
   * Converts POLYLINE entity geometry
   */
  convertPolylineGeometry(entity) {
    const vertices = entity.vertices || [];
    const points = vertices.map((vertex) => this.getPoint(vertex, ""));
    return {
      type: "POLYLINE",
      points,
      properties: {
        closed: entity.closed || false
      }
    };
  }
  /**
   * Converts TEXT entity geometry
   */
  convertTextGeometry(entity) {
    const position = this.getPoint(entity, "start") || this.getPoint(entity, "");
    const text = entity.text || "";
    const height = entity.height || 1;
    return {
      type: "TEXT",
      points: [position],
      properties: { text, height }
    };
  }
  /**
   * Converts POINT entity geometry
   */
  convertPointGeometry(entity) {
    const position = this.getPoint(entity, "") || { x: 0, y: 0, z: 0 };
    return {
      type: "POINT",
      points: [position],
      properties: {}
    };
  }
  /**
   * Helper methods
   */
  getHeaderValue(header, key, defaultValue) {
    return header[key] || defaultValue;
  }
  getHeaderPoint(header, key) {
    const point = header[key] || {};
    return {
      x: point.x || 0,
      y: point.y || 0,
      z: point.z || 0
    };
  }
  getPoint(entity, prefix) {
    const suffix = prefix ? prefix : "";
    return {
      x: entity[`x${suffix}`] || entity.x || 0,
      y: entity[`y${suffix}`] || entity.y || 0,
      z: entity[`z${suffix}`] || entity.z || 0
    };
  }
  parseColor(colorValue) {
    if (typeof colorValue === "number") {
      return { type: "index", value: colorValue };
    }
    return { type: "index", value: 7 };
  }
  mapDXFUnits(unitsCode) {
    const unitsMap = {
      0: "units",
      1: "in",
      2: "ft",
      3: "mil",
      4: "mm",
      5: "cm",
      6: "m"
    };
    return unitsMap[unitsCode] || "units";
  }
  generateEntityId() {
    return `entity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  /**
   * Calculates metadata and statistics
   */
  calculateMetadata(header, tables, blocks, entities) {
    const boundingBox = this.calculateBoundingBox(entities);
    const statistics = this.calculateStatistics(entities);
    return {
      originalFormat: "dxf",
      fileSize: 0,
      // Will be set by the calling code
      parsingTime: 0,
      // Will be set by the calling code
      entityCount: entities.length,
      layerCount: tables.layers.length,
      blockCount: blocks.length,
      boundingBox,
      statistics
    };
  }
  calculateBoundingBox(entities) {
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
  calculateStatistics(entities) {
    const stats = {
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
        case "LINE":
          stats.lines++;
          break;
        case "CIRCLE":
          stats.circles++;
          break;
        case "ARC":
          stats.arcs++;
          break;
        case "POLYLINE":
        case "LWPOLYLINE":
          stats.polylines++;
          break;
        case "TEXT":
        case "MTEXT":
          stats.text++;
          break;
        case "INSERT":
          stats.blocks++;
          break;
        default:
          stats.other++;
      }
    }
    stats.complexityScore = entities.length * 10 + stats.totalVertices;
    return stats;
  }
  /**
   * Gets warnings generated during parsing
   */
  getWarnings() {
    return [...this.warnings];
  }
  /**
   * Gets errors generated during parsing
   */
  getErrors() {
    return [...this.errors];
  }
};

// src/renderers/cadRenderer.ts
var CADRenderer = class {
  constructor() {
    __publicField(this, "svgElements", []);
    __publicField(this, "currentScale", 1);
    __publicField(this, "currentOffset", { x: 0, y: 0 });
  }
  /**
   * Main rendering method
   */
  async render(cadData, options = {}) {
    try {
      this.svgElements = [];
      const renderBounds = this.calculateRenderBounds(cadData);
      const scale = this.calculateScale(renderBounds, options);
      const viewBox = this.calculateViewBox(renderBounds, scale);
      this.currentScale = scale;
      this.currentOffset = {
        x: -renderBounds.min.x * scale,
        y: -renderBounds.min.y * scale
      };
      const layersToRender = this.getLayersToRender(cadData, options);
      const layerRenderData = [];
      for (const layer of layersToRender) {
        const layerEntities = cadData.entities.filter((entity) => entity.layer === layer.name);
        if (layerEntities.length > 0) {
          const layerSvg = this.renderLayer(layer.name, layerEntities, options);
          layerRenderData.push({
            name: layer.name,
            visible: layer.visible,
            elementCount: layerEntities.length,
            svgGroup: layerSvg
          });
        }
      }
      const svg = this.generateFinalSVG(layerRenderData, viewBox, options);
      return {
        svg,
        bounds: renderBounds,
        layers: layerRenderData,
        scale,
        viewBox
      };
    } catch (error) {
      throw new CADRenderingError(
        error instanceof Error ? error.message : "Unknown rendering error"
      );
    }
  }
  /**
   * Calculates the bounding box για rendering
   */
  calculateRenderBounds(cadData) {
    return cadData.metadata.boundingBox;
  }
  /**
   * Calculates appropriate scale για rendering
   */
  calculateScale(bounds, options) {
    if (options.scaleFactor) {
      return options.scaleFactor;
    }
    const maxDimension = Math.max(bounds.size.x, bounds.size.y);
    const targetSize = 1e3;
    return maxDimension > 0 ? targetSize / maxDimension : 1;
  }
  /**
   * Calculates SVG viewBox
   */
  calculateViewBox(bounds, scale) {
    const width = bounds.size.x * scale;
    const height = bounds.size.y * scale;
    const x = bounds.min.x * scale;
    const y = bounds.min.y * scale;
    return `${x} ${y} ${width} ${height}`;
  }
  /**
   * Gets layers που θα rendered
   */
  getLayersToRender(cadData, options) {
    const allLayers = cadData.tables.layers;
    if (options.renderLayers === "all") {
      return allLayers.filter((layer) => layer.visible);
    }
    if (Array.isArray(options.renderLayers)) {
      return allLayers.filter(
        (layer) => options.renderLayers.includes(layer.name) && layer.visible
      );
    }
    return allLayers.filter((layer) => layer.visible);
  }
  /**
   * Renders a single layer
   */
  renderLayer(layerName, entities, options) {
    const layerElements = [];
    for (const entity of entities) {
      try {
        const svg = this.renderEntity(entity, options);
        if (svg) {
          layerElements.push(svg);
        }
      } catch (error) {
        console.warn(`Failed to render entity ${entity.id}:`, error);
      }
    }
    return `<g id="layer-${this.escapeId(layerName)}" class="cad-layer">
${layerElements.join("\n")}
</g>`;
  }
  /**
   * Renders a single entity
   */
  renderEntity(entity, options) {
    const { geometry, color, lineType, lineWeight } = entity;
    const style = this.generateEntityStyle(color, lineType, lineWeight);
    switch (geometry.type) {
      case "LINE":
        return this.renderLine(geometry, style);
      case "CIRCLE":
        return this.renderCircle(geometry, style);
      case "ARC":
        return this.renderArc(geometry, style);
      case "POLYLINE":
      case "LWPOLYLINE":
        return this.renderPolyline(geometry, style);
      case "TEXT":
      case "MTEXT":
        return options.renderText ? this.renderText(geometry, style) : null;
      case "POINT":
        return this.renderPoint(geometry, style);
      default:
        console.warn(`Unsupported entity type for rendering: ${geometry.type}`);
        return null;
    }
  }
  /**
   * Renders LINE entity
   */
  renderLine(geometry, style) {
    if (geometry.points.length < 2) return "";
    const p1 = this.transformPoint(geometry.points[0]);
    const p2 = this.transformPoint(geometry.points[1]);
    return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" ${style} />`;
  }
  /**
   * Renders CIRCLE entity
   */
  renderCircle(geometry, style) {
    if (geometry.points.length === 0) return "";
    const center = this.transformPoint(geometry.points[0]);
    const radius = (geometry.properties.radius || 0) * this.currentScale;
    return `<circle cx="${center.x}" cy="${center.y}" r="${radius}" ${style} fill="none" />`;
  }
  /**
   * Renders ARC entity
   */
  renderArc(geometry, style) {
    if (geometry.points.length === 0) return "";
    const center = this.transformPoint(geometry.points[0]);
    const radius = (geometry.properties.radius || 0) * this.currentScale;
    const startAngle = geometry.properties.startAngle || 0;
    const endAngle = geometry.properties.endAngle || 0;
    const startX = center.x + radius * Math.cos(startAngle);
    const startY = center.y + radius * Math.sin(startAngle);
    const endX = center.x + radius * Math.cos(endAngle);
    const endY = center.y + radius * Math.sin(endAngle);
    const largeArcFlag = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
    const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
    return `<path d="${pathData}" ${style} fill="none" />`;
  }
  /**
   * Renders POLYLINE entity
   */
  renderPolyline(geometry, style) {
    if (geometry.points.length < 2) return "";
    const points = geometry.points.map((p) => {
      const transformed = this.transformPoint(p);
      return `${transformed.x},${transformed.y}`;
    }).join(" ");
    const closed = geometry.properties.closed || false;
    const element = closed ? "polygon" : "polyline";
    return `<${element} points="${points}" ${style} fill="none" />`;
  }
  /**
   * Renders TEXT entity
   */
  renderText(geometry, style) {
    if (geometry.points.length === 0) return "";
    const position = this.transformPoint(geometry.points[0]);
    const text = geometry.properties.text || "";
    const height = (geometry.properties.height || 1) * this.currentScale;
    const escapedText = this.escapeXML(text);
    return `<text x="${position.x}" y="${position.y}" font-size="${height}" ${style}>${escapedText}</text>`;
  }
  /**
   * Renders POINT entity
   */
  renderPoint(geometry, style) {
    if (geometry.points.length === 0) return "";
    const position = this.transformPoint(geometry.points[0]);
    const size = 2;
    return `<circle cx="${position.x}" cy="${position.y}" r="${size}" ${style} />`;
  }
  /**
   * Transforms a point από CAD coordinates to SVG coordinates
   */
  transformPoint(point) {
    return {
      x: point.x * this.currentScale + this.currentOffset.x,
      y: -(point.y * this.currentScale) + this.currentOffset.y
      // Flip Y axis
    };
  }
  /**
   * Generates CSS style attributes για entity
   */
  generateEntityStyle(color, lineType, lineWeight) {
    const styles = [];
    const colorValue = this.convertCADColor(color);
    styles.push(`stroke="${colorValue}"`);
    const strokeWidth = Math.max(0.5, lineWeight * this.currentScale);
    styles.push(`stroke-width="${strokeWidth}"`);
    if (lineType !== "CONTINUOUS") {
      styles.push('stroke-dasharray="5,5"');
    }
    return styles.join(" ");
  }
  /**
   * Converts CAD color to CSS color
   */
  convertCADColor(color) {
    if (color.type === "rgb" && typeof color.value === "object") {
      const rgb = color.value;
      return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    }
    if (color.type === "index" && typeof color.value === "number") {
      const colorMap = {
        0: "#000000",
        // ByBlock
        1: "#ff0000",
        // Red
        2: "#ffff00",
        // Yellow
        3: "#00ff00",
        // Green
        4: "#00ffff",
        // Cyan
        5: "#0000ff",
        // Blue
        6: "#ff00ff",
        // Magenta
        7: "#ffffff",
        // White
        8: "#414141",
        // Dark Gray
        9: "#808080"
        // Light Gray
      };
      return colorMap[color.value] || "#000000";
    }
    return "#000000";
  }
  /**
   * Generates the final SVG document
   */
  generateFinalSVG(layers, viewBox, options) {
    const width = options.renderOptions?.width || 1e3;
    const height = options.renderOptions?.height || 1e3;
    const svgContent = layers.map((layer) => layer.svgGroup).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${width}"
     height="${height}"
     viewBox="${viewBox}"
     class="cad-drawing">
  <defs>
    <style>
      .cad-layer { }
      .cad-entity { }
    </style>
  </defs>
  ${svgContent}
</svg>`;
  }
  /**
   * Helper methods
   */
  escapeId(id) {
    return id.replace(/[^a-zA-Z0-9-_]/g, "_");
  }
  escapeXML(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
};

// src/utils/cadValidator.ts
async function validateCADFile(file) {
  const errors = [];
  const warnings = [];
  if (!file) {
    errors.push({
      code: "NO_FILE",
      message: "\u0394\u03B5\u03BD \u03C0\u03B1\u03C1\u03AD\u03C7\u03B5\u03C4\u03B1\u03B9 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF",
      severity: "critical"
    });
    return {
      isValid: false,
      errors,
      warnings,
      fileInfo: {
        format: "unknown",
        size: 0,
        estimatedComplexity: "low",
        estimatedProcessingTime: 0
      }
    };
  }
  const maxSize = 100 * 1024 * 1024;
  if (file.size > maxSize) {
    errors.push({
      code: "FILE_TOO_LARGE",
      message: `\u03A4\u03BF \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF (${formatFileSize(file.size)}). \u039C\u03AD\u03B3\u03B9\u03C3\u03C4\u03BF \u03B5\u03C0\u03B9\u03C4\u03C1\u03B5\u03C0\u03C4\u03CC: ${formatFileSize(maxSize)}`,
      severity: "error"
    });
  }
  if (file.size === 0) {
    errors.push({
      code: "EMPTY_FILE",
      message: "\u03A4\u03BF \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF \u03B5\u03AF\u03BD\u03B1\u03B9 \u03BA\u03B5\u03BD\u03CC",
      severity: "critical"
    });
  }
  const fileInfo = await analyzeCADFile(file);
  if (fileInfo.format === "unknown") {
    errors.push({
      code: "UNKNOWN_FORMAT",
      message: "\u0394\u03B5\u03BD \u03B1\u03BD\u03B1\u03B3\u03BD\u03C9\u03C1\u03AF\u03B6\u03B5\u03C4\u03B1\u03B9 \u03B7 \u03BC\u03BF\u03C1\u03C6\u03AE \u03C4\u03BF\u03C5 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5 CAD",
      severity: "error"
    });
  }
  switch (fileInfo.format) {
    case "dxf":
      await validateDXFFile(file, errors, warnings);
      break;
    case "dwg":
      errors.push({
        code: "DWG_NOT_SUPPORTED",
        message: "\u0397 \u03BC\u03BF\u03C1\u03C6\u03AE DWG \u03B4\u03B5\u03BD \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03AF\u03B6\u03B5\u03C4\u03B1\u03B9 \u03B1\u03BA\u03CC\u03BC\u03B7. \u03A0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03BC\u03B5\u03C4\u03B1\u03C4\u03C1\u03AD\u03C8\u03C4\u03B5 \u03C3\u03B5 DXF.",
        severity: "error"
      });
      break;
    default:
      if (fileInfo.format !== "unknown") {
        errors.push({
          code: "UNSUPPORTED_FORMAT",
          message: `\u0397 \u03BC\u03BF\u03C1\u03C6\u03AE ${fileInfo.format} \u03B4\u03B5\u03BD \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03AF\u03B6\u03B5\u03C4\u03B1\u03B9`,
          severity: "error"
        });
      }
  }
  if (file.size > 10 * 1024 * 1024) {
    warnings.push({
      code: "LARGE_FILE",
      message: "\u039C\u03B5\u03B3\u03AC\u03BB\u03BF \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF - \u03B7 \u03B5\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03C0\u03AC\u03C1\u03B5\u03B9 \u03B1\u03C1\u03BA\u03B5\u03C4\u03CC \u03C7\u03C1\u03CC\u03BD\u03BF",
      suggestion: "\u03A3\u03BA\u03B5\u03C6\u03C4\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03B1\u03C0\u03BB\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03C4\u03B5 \u03C4\u03BF \u03C3\u03C7\u03AD\u03B4\u03B9\u03BF \u03AE \u03BD\u03B1 \u03C4\u03BF \u03C7\u03C9\u03C1\u03AF\u03C3\u03B5\u03C4\u03B5 \u03C3\u03B5 \u03BC\u03B9\u03BA\u03C1\u03CC\u03C4\u03B5\u03C1\u03B1 \u03BC\u03AD\u03C1\u03B7"
    });
  }
  if (fileInfo.estimatedComplexity === "high") {
    warnings.push({
      code: "HIGH_COMPLEXITY",
      message: "\u03A5\u03C8\u03B7\u03BB\u03AE \u03C0\u03BF\u03BB\u03C5\u03C0\u03BB\u03BF\u03BA\u03CC\u03C4\u03B7\u03C4\u03B1 \u03C3\u03C7\u03B5\u03B4\u03AF\u03BF\u03C5",
      suggestion: "\u0397 \u03B5\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B1\u03C1\u03B3\u03AE. \u03A3\u03BA\u03B5\u03C6\u03C4\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03B1\u03C6\u03B1\u03B9\u03C1\u03AD\u03C3\u03B5\u03C4\u03B5 \u03C0\u03B5\u03C1\u03B9\u03C4\u03C4\u03AC elements."
    });
  }
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    fileInfo
  };
}
async function analyzeCADFile(file) {
  const format = detectCADFormat(file);
  const size = file.size;
  let estimatedComplexity = "low";
  if (size > 5 * 1024 * 1024) {
    estimatedComplexity = "high";
  } else if (size > 1 * 1024 * 1024) {
    estimatedComplexity = "medium";
  }
  const baseTime = 1e3;
  const sizeMultiplier = size / (1024 * 1024);
  const complexityMultiplier = estimatedComplexity === "high" ? 3 : estimatedComplexity === "medium" ? 2 : 1;
  const estimatedProcessingTime = Math.round(baseTime * sizeMultiplier * complexityMultiplier);
  return {
    format,
    size,
    estimatedComplexity,
    estimatedProcessingTime
  };
}
function detectCADFormat(file) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "dxf":
      return "dxf";
    case "dwg":
      return "dwg";
    case "dwf":
      return "dwf";
    case "dgn":
      return "dgn";
    default:
      return "unknown";
  }
}
async function validateDXFFile(file, errors, warnings) {
  try {
    const headerChunk = await file.slice(0, 4096).text();
    if (!headerChunk.includes("SECTION")) {
      errors.push({
        code: "INVALID_DXF_STRUCTURE",
        message: "\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B4\u03BF\u03BC\u03AE DXF: \u039B\u03B5\u03AF\u03C0\u03B5\u03B9 \u03B7 \u03B5\u03BD\u03CC\u03C4\u03B7\u03C4\u03B1 SECTION",
        severity: "error"
      });
      return;
    }
    if (!headerChunk.includes("HEADER")) {
      warnings.push({
        code: "MISSING_HEADER_SECTION",
        message: "\u039B\u03B5\u03AF\u03C0\u03B5\u03B9 \u03B7 \u03B5\u03BD\u03CC\u03C4\u03B7\u03C4\u03B1 HEADER \u03C3\u03C4\u03BF DXF",
        suggestion: "\u039F\u03C1\u03B9\u03C3\u03BC\u03AD\u03BD\u03B5\u03C2 \u03C0\u03BB\u03B7\u03C1\u03BF\u03C6\u03BF\u03C1\u03AF\u03B5\u03C2 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03BC\u03B7\u03BD \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B4\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03B5\u03C2"
      });
    }
    const fullContent = await file.text();
    if (!fullContent.includes("ENTITIES")) {
      warnings.push({
        code: "MISSING_ENTITIES_SECTION",
        message: "\u039B\u03B5\u03AF\u03C0\u03B5\u03B9 \u03B7 \u03B5\u03BD\u03CC\u03C4\u03B7\u03C4\u03B1 ENTITIES \u03C3\u03C4\u03BF DXF",
        suggestion: "\u03A4\u03BF \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03BC\u03B7\u03BD \u03C0\u03B5\u03C1\u03B9\u03AD\u03C7\u03B5\u03B9 \u03B3\u03B5\u03C9\u03BC\u03B5\u03C4\u03C1\u03B9\u03BA\u03AC \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1"
      });
    }
    const versionMatch = fullContent.match(/\$ACADVER\s+1\s+([A-Z0-9]+)/);
    if (versionMatch) {
      const version = versionMatch[1];
      if (version < "AC1012") {
        warnings.push({
          code: "OLD_DXF_VERSION",
          message: `\u03A0\u03B1\u03BB\u03B9\u03AC \u03AD\u03BA\u03B4\u03BF\u03C3\u03B7 DXF (${version})`,
          suggestion: "\u039C\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03C5\u03C0\u03AC\u03C1\u03C7\u03BF\u03C5\u03BD \u03C0\u03C1\u03BF\u03B2\u03BB\u03AE\u03BC\u03B1\u03C4\u03B1 \u03C3\u03C5\u03BC\u03B2\u03B1\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2"
        });
      }
    }
    if (fullContent.charCodeAt(0) === 0) {
      errors.push({
        code: "BINARY_DXF_NOT_SUPPORTED",
        message: "\u03A4\u03B1 \u03B4\u03C5\u03B1\u03B4\u03B9\u03BA\u03AC \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1 DXF \u03B4\u03B5\u03BD \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03AF\u03B6\u03BF\u03BD\u03C4\u03B1\u03B9",
        severity: "error"
      });
    }
    if (containsNonAsciiCharacters(fullContent)) {
      warnings.push({
        code: "NON_ASCII_CHARACTERS",
        message: "\u03A4\u03BF \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF \u03C0\u03B5\u03C1\u03B9\u03AD\u03C7\u03B5\u03B9 \u03BC\u03B7-ASCII \u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03AE\u03C1\u03B5\u03C2",
        suggestion: "\u0392\u03B5\u03B2\u03B1\u03B9\u03C9\u03B8\u03B5\u03AF\u03C4\u03B5 \u03CC\u03C4\u03B9 \u03B7 \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7 \u03B5\u03AF\u03BD\u03B1\u03B9 UTF-8"
      });
    }
  } catch (error) {
    errors.push({
      code: "FILE_READ_ERROR",
      message: `\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03B1\u03BD\u03AC\u03B3\u03BD\u03C9\u03C3\u03B7\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5: ${error instanceof Error ? error.message : "\u0386\u03B3\u03BD\u03C9\u03C3\u03C4\u03BF \u03C3\u03C6\u03AC\u03BB\u03BC\u03B1"}`,
      severity: "error"
    });
  }
}
function containsNonAsciiCharacters(text) {
  const sample = text.substring(0, 1e3);
  return /[^\x00-\x7F]/.test(sample);
}
function formatFileSize(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
function validateCADProcessingOptions(options) {
  const errors = [];
  const warnings = [];
  if (options.renderOptions) {
    const renderOpts = options.renderOptions;
    if (renderOpts.scaleFactor && typeof renderOpts.scaleFactor === "number") {
      if (renderOpts.scaleFactor <= 0) {
        errors.push("\u0397 \u03BA\u03BB\u03AF\u03BC\u03B1\u03BA\u03B1 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B8\u03B5\u03C4\u03B9\u03BA\u03CC\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2");
      }
      if (renderOpts.scaleFactor > 1e3) {
        warnings.push("\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03B7 \u03BA\u03BB\u03AF\u03BC\u03B1\u03BA\u03B1 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03C0\u03C1\u03BF\u03BA\u03B1\u03BB\u03AD\u03C3\u03B5\u03B9 \u03C0\u03C1\u03BF\u03B2\u03BB\u03AE\u03BC\u03B1\u03C4\u03B1 \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7\u03C2");
      }
    }
  }
  if (options.parseOptions) {
    const parseOpts = options.parseOptions;
    if (parseOpts.encoding && typeof parseOpts.encoding === "string") {
      const validEncodings = ["utf-8", "cp1252", "iso-8859-1"];
      if (!validEncodings.includes(parseOpts.encoding)) {
        errors.push(`\u039C\u03B7 \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03B9\u03B6\u03CC\u03BC\u03B5\u03BD\u03B7 \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7: ${parseOpts.encoding}`);
      }
    }
  }
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
async function estimateCADComplexity(file) {
  const factors = [];
  let complexity = "low";
  try {
    const content = await file.text();
    const entityMatches = content.match(/\n\s*0\s+\n[A-Z]+/g) || [];
    const entityCount = entityMatches.length;
    const layerMatches = content.match(/\n\s*8\s+\n[^\n]+/g) || [];
    const layerCount = new Set(layerMatches.map((m) => m.trim())).size;
    if (entityCount > 1e4) {
      complexity = "high";
      factors.push("\u03A5\u03C8\u03B7\u03BB\u03CC\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 entities (>10k)");
    } else if (entityCount > 1e3) {
      complexity = "medium";
      factors.push("\u039C\u03AD\u03C4\u03C1\u03B9\u03BF\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 entities (>1k)");
    }
    if (layerCount > 50) {
      complexity = "high";
      factors.push("\u03A0\u03BF\u03BB\u03BB\u03AC layers (>50)");
    } else if (layerCount > 10) {
      if (complexity === "low") complexity = "medium";
      factors.push("\u0391\u03C1\u03BA\u03B5\u03C4\u03AC layers (>10)");
    }
    if (content.includes("POLYLINE") || content.includes("SPLINE")) {
      if (complexity === "low") complexity = "medium";
      factors.push("\u03A0\u03BF\u03BB\u03CD\u03C0\u03BB\u03BF\u03BA\u03B1 \u03B3\u03B5\u03C9\u03BC\u03B5\u03C4\u03C1\u03B9\u03BA\u03AC \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1");
    }
    if (content.includes("HATCH") || content.includes("REGION")) {
      complexity = "high";
      factors.push("\u03A0\u03BF\u03BB\u03CD\u03C0\u03BB\u03BF\u03BA\u03B1 fills/regions");
    }
    return {
      complexity,
      entityCount,
      layerCount,
      factors
    };
  } catch (error) {
    return {
      complexity: "medium",
      entityCount: 0,
      layerCount: 0,
      factors: ["\u0394\u03B5\u03BD \u03AE\u03C4\u03B1\u03BD \u03B4\u03C5\u03BD\u03B1\u03C4\u03AE \u03B7 \u03B1\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03C4\u03BF\u03C5 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5"]
    };
  }
}

// src/hooks/useCADProcessing.ts
function useCADProcessing(options = {}) {
  const { t } = (0, import_hooks.useLayeraTranslation)();
  const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
  const [progress, setProgress] = (0, import_react.useState)(0);
  const [result, setResult] = (0, import_react.useState)(null);
  const [renderData, setRenderData] = (0, import_react.useState)(null);
  const [errors, setErrors] = (0, import_react.useState)([]);
  const dxfParserRef = (0, import_react.useRef)(null);
  const cadRendererRef = (0, import_react.useRef)(null);
  const {
    defaultOptions = {},
    showNotifications = true,
    autoRender = true,
    onProgress,
    onComplete,
    onError
  } = options;
  (0, import_react.useEffect)(() => {
    try {
      dxfParserRef.current = new LayeraDXFParser();
      cadRendererRef.current = new CADRenderer();
    } catch (error) {
      console.error("Failed to initialize CAD processing engines:", error);
      if (showNotifications) {
        import_notifications.toast.error(t("cad.engine.init.error"));
      }
    }
    return () => {
    };
  }, [showNotifications, t]);
  const reportProgress = (0, import_react.useCallback)((stage, progress2, message, currentEntity, entitiesProcessed, totalEntities) => {
    const progressData = {
      stage,
      progress: progress2,
      message,
      currentEntity,
      entitiesProcessed,
      totalEntities
    };
    setProgress(progress2);
    onProgress?.(progressData);
    if (showNotifications && stage === "complete") {
      import_notifications.toast.success(t("cad.processing.success"), {
        duration: 3e3
      });
    }
  }, [onProgress, showNotifications, t]);
  const handleError = (0, import_react.useCallback)((error) => {
    setErrors((prev) => [...prev, error]);
    onError?.(error);
    if (showNotifications) {
      import_notifications.toast.error(t("cad.processing.error", {
        error: error.message
      }), {
        duration: 5e3
      });
    }
  }, [onError, showNotifications, t]);
  const processCADFile = (0, import_react.useCallback)(async (file, processingOptions) => {
    if (!dxfParserRef.current || !cadRendererRef.current) {
      throw new CADProcessingError(
        "CAD processing engines not initialized",
        "ENGINES_NOT_INITIALIZED"
      );
    }
    const startTime = performance.now();
    const finalOptions = {
      format: "dxf",
      // Will be detected
      ...defaultOptions,
      ...processingOptions
    };
    try {
      setIsProcessing(true);
      setErrors([]);
      reportProgress("parsing", 5, t("cad.detecting.format"));
      const detectedFormat = await detectCADFormat2(file);
      finalOptions.format = detectedFormat;
      if (detectedFormat === "dwg") {
        throw new DWGNotSupportedError();
      }
      if (detectedFormat !== "dxf") {
        throw new CADProcessingError(
          `Unsupported CAD format: ${detectedFormat}`,
          "UNSUPPORTED_FORMAT"
        );
      }
      reportProgress("parsing", 15, t("cad.reading.file"));
      const fileContent = await file.text();
      reportProgress("parsing", 25, t("cad.parsing.data"));
      const cadData = await dxfParserRef.current.parseDXF(
        fileContent,
        finalOptions.parseOptions
      );
      reportProgress("processing", 50, t("cad.processing.entities"));
      if (finalOptions.transformOptions) {
      }
      if (finalOptions.optimizationOptions) {
        reportProgress("optimizing", 70, t("cad.optimizing.geometry"));
      }
      let renderResult;
      if (autoRender) {
        reportProgress("rendering", 85, t("cad.rendering.graphics"));
        renderResult = await cadRendererRef.current.render(
          cadData,
          finalOptions.renderOptions
        );
        setRenderData(renderResult);
      }
      reportProgress("complete", 100, t("cad.processing.completed"));
      const processingResult = {
        originalFile: file,
        cadData,
        processingTime: performance.now() - startTime,
        warnings: dxfParserRef.current.getWarnings(),
        errors: dxfParserRef.current.getErrors(),
        renderData: renderResult
      };
      setResult(processingResult);
      onComplete?.(processingResult);
      return processingResult;
    } catch (error) {
      const cadError = error instanceof CADProcessingError ? error : new CADProcessingError(
        error instanceof Error ? error.message : "Unknown CAD processing error",
        "PROCESSING_FAILED"
      );
      handleError(cadError);
      throw cadError;
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [defaultOptions, autoRender, reportProgress, handleError, onComplete, t]);
  const renderCAD = (0, import_react.useCallback)(async (cadData, renderOptions) => {
    if (!cadRendererRef.current) {
      throw new CADProcessingError(
        "CAD renderer not initialized",
        "RENDERER_NOT_INITIALIZED"
      );
    }
    try {
      setIsProcessing(true);
      reportProgress("rendering", 0, t("cad.rendering.start"));
      const renderResult = await cadRendererRef.current.render(cadData, renderOptions);
      setRenderData(renderResult);
      reportProgress("complete", 100, t("cad.rendering.completed"));
      if (showNotifications) {
        import_notifications.toast.success(t("cad.rendering.success"), {
          duration: 3e3
        });
      }
      return renderResult;
    } catch (error) {
      const renderError = new CADProcessingError(
        `Rendering failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        "RENDERING_FAILED",
        "rendering"
      );
      handleError(renderError);
      throw renderError;
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [reportProgress, handleError, showNotifications, t]);
  const exportCAD = (0, import_react.useCallback)(async (cadData, exportOptions) => {
    try {
      setIsProcessing(true);
      reportProgress("processing", 0, t("cad.exporting.data"));
      switch (exportOptions.format) {
        case "geojson":
          return await exportToGeoJSON(cadData, exportOptions.options);
        case "svg":
          return await exportToSVG(cadData, exportOptions.options);
        case "dxf":
          return await exportToDXF(cadData, exportOptions.options);
        case "pdf":
          return await exportToPDF(cadData, exportOptions.options);
        default:
          throw new CADProcessingError(
            `Unsupported export format: ${exportOptions.format}`,
            "UNSUPPORTED_EXPORT_FORMAT"
          );
      }
    } catch (error) {
      const exportError = new CADProcessingError(
        `Export failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        "EXPORT_FAILED"
      );
      handleError(exportError);
      throw exportError;
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [reportProgress, handleError, t]);
  const clearResult = (0, import_react.useCallback)(() => {
    setResult(null);
    setRenderData(null);
    setErrors([]);
    setProgress(0);
  }, []);
  const validateFile = (0, import_react.useCallback)(async (file) => {
    return validateCADFile(file);
  }, []);
  const getSupportedFormats = (0, import_react.useCallback)(() => {
    return ["dxf"];
  }, []);
  const estimateProcessingTime = (0, import_react.useCallback)(async (file) => {
    const fileSizeMB = file.size / (1024 * 1024);
    let timePerMB = 2e3;
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension === "dwg") {
      timePerMB = 0;
    }
    return Math.round(fileSizeMB * timePerMB);
  }, []);
  return {
    // State
    isProcessing,
    progress,
    result,
    renderData,
    errors,
    // Actions
    processCADFile,
    renderCAD,
    exportCAD,
    clearResult,
    // Validation & utilities
    validateFile,
    getSupportedFormats,
    estimateProcessingTime
  };
}
async function detectCADFormat2(file) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "dxf":
      return "dxf";
    case "dwg":
      return "dwg";
    case "dwf":
      return "dwf";
    case "dgn":
      return "dgn";
    default:
      const header = await file.slice(0, 1024).text();
      if (header.includes("SECTION") && header.includes("HEADER")) {
        return "dxf";
      }
      throw new CADProcessingError(
        `Cannot detect CAD format for file: ${file.name}`,
        "FORMAT_DETECTION_FAILED"
      );
  }
}
async function exportToGeoJSON(cadData, options) {
  throw new CADProcessingError("GeoJSON export not yet implemented", "EXPORT_NOT_IMPLEMENTED");
}
async function exportToSVG(cadData, options) {
  throw new CADProcessingError("SVG export not yet implemented", "EXPORT_NOT_IMPLEMENTED");
}
async function exportToDXF(cadData, options) {
  throw new CADProcessingError("DXF export not yet implemented", "EXPORT_NOT_IMPLEMENTED");
}
async function exportToPDF(cadData, options) {
  throw new CADProcessingError("PDF export not yet implemented", "EXPORT_NOT_IMPLEMENTED");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CADProcessingError,
  CADRenderer,
  CADRenderingError,
  DWGNotSupportedError,
  DXFParsingError,
  LayeraDXFParser,
  estimateCADComplexity,
  useCADProcessing,
  validateCADFile,
  validateCADProcessingOptions
});
//# sourceMappingURL=index.js.map