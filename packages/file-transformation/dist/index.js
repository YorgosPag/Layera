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
  CoordinateTransformationError: () => CoordinateTransformationError,
  CoordinateTransformer: () => CoordinateTransformer,
  LayeraVectorTransformer: () => LayeraVectorTransformer,
  TransformationError: () => TransformationError,
  UnsupportedTransformationError: () => UnsupportedTransformationError,
  estimateTransformationComplexity: () => estimateTransformationComplexity,
  getFormatCategory: () => getFormatCategory,
  getFormatCompatibility: () => getFormatCompatibility,
  useFileTransformation: () => useFileTransformation,
  validateBatchTransformation: () => validateBatchTransformation,
  validateTransformationOptions: () => validateTransformationOptions
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useFileTransformation.ts
var import_react = require("react");
var import_notifications = require("@layera/notifications");
var import_i18n = require("@layera/i18n");

// src/types/index.ts
var TransformationError = class extends Error {
  constructor(message, code, fileId, stage, originalError) {
    super(message);
    this.code = code;
    this.fileId = fileId;
    this.stage = stage;
    this.originalError = originalError;
    this.name = "TransformationError";
  }
};
var UnsupportedTransformationError = class extends TransformationError {
  constructor(sourceFormat, targetFormat) {
    super(
      `Transformation from ${sourceFormat} to ${targetFormat} is not supported`,
      "UNSUPPORTED_TRANSFORMATION"
    );
  }
};
var CoordinateTransformationError = class extends TransformationError {
  constructor(sourceCRS, targetCRS, reason) {
    super(
      `Coordinate transformation failed from ${sourceCRS} to ${targetCRS}: ${reason}`,
      "COORDINATE_TRANSFORMATION_FAILED"
    );
  }
};

// src/utils/coordinateTransformer.ts
var import_proj4 = __toESM(require("proj4"));
var GREEK_CRS_DEFINITIONS = {
  // ΕΓΣΑ87 - Ελληνικό Γεωδαιτικό Σύστημα Αναφοράς 1987
  "EPSG:2100": "+proj=tmerc +lat_0=0 +lon_0=24 +k=0.9996 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=-199.87,74.79,246.62,0,0,0,0 +units=m +no_defs",
  // WGS84 - World Geodetic System 1984 (GPS)
  "EPSG:4326": "+proj=longlat +datum=WGS84 +no_defs",
  // Web Mercator (Google Maps, OpenStreetMap)
  "EPSG:3857": "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs",
  // Greek Grid (παλιό σύστημα)
  "EPSG:2154": "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
  // UTM Zone 34N (για βόρεια Ελλάδα)
  "EPSG:32634": "+proj=utm +zone=34 +datum=WGS84 +units=m +no_defs",
  // UTM Zone 35N (για ανατολική Ελλάδα)
  "EPSG:32635": "+proj=utm +zone=35 +datum=WGS84 +units=m +no_defs"
};
var CoordinateTransformer = class {
  constructor() {
    __publicField(this, "projCache", /* @__PURE__ */ new Map());
    __publicField(this, "initializationPromise");
    this.initializationPromise = this.initializeProjections();
  }
  /**
   * Initializes commonly used projections
   */
  async initializeProjections() {
    try {
      Object.entries(GREEK_CRS_DEFINITIONS).forEach(([epsg, definition]) => {
        import_proj4.default.defs(epsg, definition);
      });
      const commonTransformations = [
        ["EPSG:4326", "EPSG:2100"],
        // WGS84 to EGSA87
        ["EPSG:2100", "EPSG:4326"],
        // EGSA87 to WGS84
        ["EPSG:4326", "EPSG:3857"],
        // WGS84 to Web Mercator
        ["EPSG:3857", "EPSG:4326"],
        // Web Mercator to WGS84
        ["EPSG:2100", "EPSG:3857"]
        // EGSA87 to Web Mercator
      ];
      commonTransformations.forEach(([source, target]) => {
        const key = `${source}->${target}`;
        if (source && target) {
          try {
            const converter = (0, import_proj4.default)(source, target);
            this.projCache.set(key, converter);
          } catch (conversionError) {
            console.warn(`Failed to initialize transformation ${key}:`, conversionError);
          }
        }
      });
    } catch (error) {
      console.error("Failed to initialize coordinate projections:", error);
      throw new CoordinateTransformationError(
        "unknown",
        "unknown",
        `Initialization failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
  /**
   * Transforms a single coordinate point
   */
  async transformPoint(x, y, transform, z) {
    await this.initializationPromise;
    try {
      const converter = this.getConverter(transform.sourceEPSG, transform.targetEPSG);
      const input = z !== void 0 ? [x, y, z] : [x, y];
      const result = converter.forward(input);
      if (result[0] === void 0 || result[1] === void 0) {
        throw new CoordinateTransformationError(
          transform.sourceEPSG,
          transform.targetEPSG,
          "Invalid coordinate transformation result"
        );
      }
      return {
        x: result[0],
        y: result[1],
        ...z !== void 0 && result[2] !== void 0 && { z: result[2] }
      };
    } catch (error) {
      throw new CoordinateTransformationError(
        transform.sourceEPSG,
        transform.targetEPSG,
        error instanceof Error ? error.message : "Point transformation failed"
      );
    }
  }
  /**
   * Transforms an array of coordinate points
   */
  async transformPoints(points, transform) {
    await this.initializationPromise;
    const results = [];
    try {
      const converter = this.getConverter(transform.sourceEPSG, transform.targetEPSG);
      for (const point of points) {
        const input = point.z !== void 0 ? [point.x, point.y, point.z] : [point.x, point.y];
        const result = converter.forward(input);
        if (result[0] === void 0 || result[1] === void 0) {
          throw new CoordinateTransformationError(
            transform.sourceEPSG,
            transform.targetEPSG,
            `Invalid coordinate transformation result for point ${JSON.stringify(point)}`
          );
        }
        results.push({
          x: result[0],
          y: result[1],
          ...point.z !== void 0 && result[2] !== void 0 && { z: result[2] }
        });
      }
      return results;
    } catch (error) {
      throw new CoordinateTransformationError(
        transform.sourceEPSG,
        transform.targetEPSG,
        `Batch transformation failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
  /**
   * Transforms a bounding box
   */
  async transformBoundingBox(bbox, transform) {
    await this.initializationPromise;
    try {
      const corners = [
        { x: bbox.minX, y: bbox.minY },
        { x: bbox.maxX, y: bbox.minY },
        { x: bbox.maxX, y: bbox.maxY },
        { x: bbox.minX, y: bbox.maxY }
      ];
      const transformedCorners = await this.transformPoints(corners, transform);
      const xs = transformedCorners.map((p) => p.x);
      const ys = transformedCorners.map((p) => p.y);
      const result = {
        minX: Math.min(...xs),
        minY: Math.min(...ys),
        maxX: Math.max(...xs),
        maxY: Math.max(...ys)
      };
      if (bbox.minZ !== void 0 && bbox.maxZ !== void 0) {
        const zCorners = [
          { x: bbox.minX, y: bbox.minY, z: bbox.minZ },
          { x: bbox.maxX, y: bbox.maxY, z: bbox.maxZ }
        ];
        const transformedZCorners = await this.transformPoints(zCorners, transform);
        const zs = transformedZCorners.map((p) => p.z).filter((z) => z !== void 0);
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
        `Bounding box transformation failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
  /**
   * Gets or creates a proj4 converter for the given transformation
   */
  getConverter(sourceEPSG, targetEPSG) {
    const key = `${sourceEPSG}->${targetEPSG}`;
    if (this.projCache.has(key)) {
      return this.projCache.get(key);
    }
    try {
      const converter = (0, import_proj4.default)(sourceEPSG, targetEPSG);
      this.projCache.set(key, converter);
      return converter;
    } catch (error) {
      throw new CoordinateTransformationError(
        sourceEPSG,
        targetEPSG,
        `Failed to create projection converter: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
  /**
   * Validates coordinate transformation parameters
   */
  async validateTransformation(transform) {
    await this.initializationPromise;
    try {
      const testPoint = { x: 24, y: 38 };
      if (transform.sourceEPSG === "EPSG:4326") {
        await this.transformPoint(testPoint.x, testPoint.y, transform);
      } else {
        await this.transformPoint(5e5, 42e5, transform);
      }
      return {
        isValid: true,
        accuracy: this.getTransformationAccuracy(transform.sourceEPSG, transform.targetEPSG)
      };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : "Unknown validation error"
      };
    }
  }
  /**
   * Gets the estimated accuracy for a coordinate transformation
   */
  getTransformationAccuracy(sourceEPSG, targetEPSG) {
    const accuracyMatrix = {
      "EPSG:4326": {
        "EPSG:2100": 0.5,
        // WGS84 to EGSA87: ~0.5m accuracy
        "EPSG:3857": 0.1,
        // WGS84 to Web Mercator: ~0.1m accuracy
        "EPSG:32634": 0.3,
        // WGS84 to UTM34N: ~0.3m accuracy
        "EPSG:32635": 0.3
        // WGS84 to UTM35N: ~0.3m accuracy
      },
      "EPSG:2100": {
        "EPSG:4326": 0.5,
        // EGSA87 to WGS84: ~0.5m accuracy
        "EPSG:3857": 0.6
        // EGSA87 to Web Mercator: ~0.6m accuracy
      }
    };
    return accuracyMatrix[sourceEPSG]?.[targetEPSG] || 1;
  }
  /**
   * Gets information about a coordinate system
   */
  getCoordinateSystemInfo(epsg) {
    const info = {
      "EPSG:4326": {
        name: "WGS84",
        units: "degrees",
        type: "geographic",
        description: "World Geodetic System 1984 - GPS coordinates"
      },
      "EPSG:2100": {
        name: "\u0395\u0393\u03A3\u039187",
        units: "meters",
        type: "projected",
        description: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03CC \u0393\u03B5\u03C9\u03B4\u03B1\u03B9\u03C4\u03B9\u03BA\u03CC \u03A3\u03CD\u03C3\u03C4\u03B7\u03BC\u03B1 \u0391\u03BD\u03B1\u03C6\u03BF\u03C1\u03AC\u03C2 1987"
      },
      "EPSG:3857": {
        name: "Web Mercator",
        units: "meters",
        type: "projected",
        description: "Web Mercator - Google Maps, OpenStreetMap"
      },
      "EPSG:32634": {
        name: "UTM Zone 34N",
        units: "meters",
        type: "projected",
        description: "Universal Transverse Mercator Zone 34 North"
      }
    };
    return info[epsg] || {
      name: epsg,
      units: "unknown",
      type: "geographic",
      description: "Unknown coordinate system"
    };
  }
  /**
   * Detects the likely coordinate system από sample coordinates
   */
  detectCoordinateSystem(samplePoints) {
    if (samplePoints.length === 0) {
      return {
        likelyEPSG: "EPSG:4326",
        confidence: 0,
        reasoning: "No sample points provided"
      };
    }
    const xs = samplePoints.map((p) => p.x);
    const ys = samplePoints.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    if (minX >= -180 && maxX <= 180 && minY >= -90 && maxY <= 90) {
      if (minX >= 19 && maxX <= 30 && minY >= 34 && maxY <= 42) {
        return {
          likelyEPSG: "EPSG:4326",
          confidence: 0.9,
          reasoning: "Coordinates within Greece geographic bounds (WGS84)"
        };
      }
      return {
        likelyEPSG: "EPSG:4326",
        confidence: 0.8,
        reasoning: "Coordinates within geographic bounds (lat/lon)"
      };
    }
    if (minX >= 1e5 && maxX <= 9e5 && minY >= 38e5 && maxY <= 47e5) {
      return {
        likelyEPSG: "EPSG:2100",
        confidence: 0.9,
        reasoning: "Coordinates within EGSA87 bounds (Greek Grid)"
      };
    }
    if (Math.abs(minX) <= 20037508 && Math.abs(maxX) <= 20037508 && Math.abs(minY) <= 20037508 && Math.abs(maxY) <= 20037508) {
      return {
        likelyEPSG: "EPSG:3857",
        confidence: 0.7,
        reasoning: "Coordinates within Web Mercator bounds"
      };
    }
    return {
      likelyEPSG: "EPSG:4326",
      confidence: 0.3,
      reasoning: "Could not determine coordinate system, defaulting to WGS84"
    };
  }
  /**
   * Cleanup resources
   */
  destroy() {
    this.projCache.clear();
  }
};

// src/transformers/vectorTransformer.ts
var LayeraVectorTransformer = class {
  constructor() {
    __publicField(this, "name", "LayeraVectorTransformer");
    __publicField(this, "supportedFormats", ["geojson", "kml", "gpx", "svg", "dxf"]);
    __publicField(this, "coordinateTransformer");
    this.coordinateTransformer = new CoordinateTransformer();
  }
  /**
   * Main transformation method
   */
  async transform(data, options) {
    try {
      this.validateInputData(data, options.sourceFormat);
      const parsedData = await this.parseSourceFormat(data, options.sourceFormat);
      const transformedData = await this.applyTransformations(parsedData, options);
      const result = await this.convertToTargetFormat(transformedData, options.targetFormat);
      return result;
    } catch (error) {
      throw new TransformationError(
        `Vector transformation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        "VECTOR_TRANSFORMATION_FAILED",
        void 0,
        "transforming",
        error instanceof Error ? error : void 0
      );
    }
  }
  /**
   * Validates input data
   */
  validateInputData(data, format) {
    if (!data) {
      throw new TransformationError(
        "No input data provided",
        "NO_INPUT_DATA"
      );
    }
    if (!this.supportedFormats.includes(format)) {
      throw new TransformationError(
        `Unsupported source format: ${format}`,
        "UNSUPPORTED_SOURCE_FORMAT"
      );
    }
  }
  /**
   * Parses source format data
   */
  async parseSourceFormat(data, format) {
    switch (format) {
      case "geojson":
        return this.parseGeoJSON(data);
      case "kml":
        return this.parseKML(data);
      case "gpx":
        return this.parseGPX(data);
      case "svg":
        return this.parseSVG(data);
      case "dxf":
        return this.parseDXF(data);
      default:
        throw new TransformationError(
          `Parser not implemented for format: ${format}`,
          "PARSER_NOT_IMPLEMENTED"
        );
    }
  }
  /**
   * Applies coordinate and geometric transformations
   */
  async applyTransformations(vectorData, options) {
    let transformedData = { ...vectorData };
    if (options.sourceCRS && options.targetCRS) {
      transformedData = await this.applyCoordinateTransformation(
        transformedData,
        options.sourceCRS,
        options.targetCRS
      );
    }
    if (options.transformationParams) {
      transformedData = this.applyGeometricTransformations(
        transformedData,
        options.transformationParams
      );
    }
    if (options.qualitySettings?.optimizeGeometry) {
      transformedData = this.optimizeGeometry(
        transformedData,
        options.qualitySettings.simplificationTolerance || 0.1
      );
    }
    return transformedData;
  }
  /**
   * Converts transformed data to target format
   */
  async convertToTargetFormat(vectorData, format) {
    switch (format) {
      case "geojson":
        return this.toGeoJSON(vectorData);
      case "kml":
        return this.toKML(vectorData);
      case "gpx":
        return this.toGPX(vectorData);
      case "svg":
        return this.toSVG(vectorData);
      case "dxf":
        return this.toDXF(vectorData);
      default:
        throw new TransformationError(
          `Converter not implemented for format: ${format}`,
          "CONVERTER_NOT_IMPLEMENTED"
        );
    }
  }
  /**
   * Applies coordinate transformation to all geometries
   */
  async applyCoordinateTransformation(vectorData, sourceCRS, targetCRS) {
    const transformedFeatures = [];
    for (const feature of vectorData.features) {
      const transformedGeometry = await this.transformGeometry(
        feature.geometry,
        sourceCRS,
        targetCRS
      );
      transformedFeatures.push({
        ...feature,
        geometry: transformedGeometry
      });
    }
    return {
      ...vectorData,
      features: transformedFeatures,
      crs: targetCRS
    };
  }
  /**
   * Transforms geometry coordinates
   */
  async transformGeometry(geometry, sourceCRS, targetCRS) {
    const transform = {
      sourceEPSG: sourceCRS,
      targetEPSG: targetCRS
    };
    switch (geometry.type) {
      case "Point":
        if (!Array.isArray(geometry.coordinates) || geometry.coordinates.length < 2) {
          throw new TransformationError("Invalid Point coordinates", "INVALID_GEOMETRY");
        }
        const [x, y, z] = geometry.coordinates;
        const point = await this.coordinateTransformer.transformPoint(
          x ?? 0,
          y ?? 0,
          transform,
          z
        );
        return {
          type: "Point",
          coordinates: point.z !== void 0 ? [point.x, point.y, point.z] : [point.x, point.y]
        };
      case "LineString":
        if (!Array.isArray(geometry.coordinates)) {
          throw new TransformationError("Invalid LineString coordinates", "INVALID_GEOMETRY");
        }
        const linePoints = geometry.coordinates.map((coord) => ({
          x: coord[0] ?? 0,
          y: coord[1] ?? 0,
          ...coord[2] !== void 0 && { z: coord[2] }
        }));
        const transformedLinePoints = await this.coordinateTransformer.transformPoints(
          linePoints,
          transform
        );
        return {
          type: "LineString",
          coordinates: transformedLinePoints.map(
            (p) => p.z !== void 0 ? [p.x, p.y, p.z] : [p.x, p.y]
          )
        };
      case "Polygon":
        if (!Array.isArray(geometry.coordinates)) {
          throw new TransformationError("Invalid Polygon coordinates", "INVALID_GEOMETRY");
        }
        const transformedRings = [];
        for (const ring of geometry.coordinates) {
          const ringPoints = ring.map((coord) => ({
            x: coord[0] ?? 0,
            y: coord[1] ?? 0,
            ...coord[2] !== void 0 && { z: coord[2] }
          }));
          const transformedRingPoints = await this.coordinateTransformer.transformPoints(
            ringPoints,
            transform
          );
          transformedRings.push(
            transformedRingPoints.map(
              (p) => p.z !== void 0 ? [p.x, p.y, p.z] : [p.x, p.y]
            )
          );
        }
        return {
          type: "Polygon",
          coordinates: transformedRings
        };
      default:
        throw new TransformationError(
          `Unsupported geometry type: ${geometry.type}`,
          "UNSUPPORTED_GEOMETRY_TYPE"
        );
    }
  }
  /**
   * GeoJSON parser
   */
  parseGeoJSON(data) {
    try {
      const geoJson = typeof data === "string" ? JSON.parse(data) : data;
      if (!geoJson || typeof geoJson !== "object") {
        throw new Error("Invalid GeoJSON data");
      }
      const features = [];
      if (geoJson.type === "FeatureCollection" && Array.isArray(geoJson.features)) {
        for (const feature of geoJson.features) {
          if (feature.geometry && feature.geometry.type && feature.geometry.coordinates) {
            features.push({
              type: "Feature",
              geometry: feature.geometry,
              properties: feature.properties || {}
            });
          }
        }
      } else if (geoJson.type === "Feature" && geoJson.geometry) {
        features.push({
          type: "Feature",
          geometry: geoJson.geometry,
          properties: geoJson.properties || {}
        });
      }
      return {
        type: "FeatureCollection",
        features,
        crs: geoJson.crs?.properties?.name || "EPSG:4326"
      };
    } catch (error) {
      throw new TransformationError(
        `Failed to parse GeoJSON: ${error instanceof Error ? error.message : "Unknown error"}`,
        "GEOJSON_PARSE_ERROR"
      );
    }
  }
  /**
   * Simple SVG parser (για basic shapes)
   */
  parseSVG(data) {
    try {
      const svgContent = typeof data === "string" ? data : String(data);
      const features = [];
      const pathRegex = /<path[^>]*d="([^"]*)"[^>]*>/g;
      const circleRegex = /<circle[^>]*cx="([^"]*)"[^>]*cy="([^"]*)"[^>]*r="([^"]*)"[^>]*>/g;
      let match;
      while ((match = pathRegex.exec(svgContent)) !== null) {
        const pathData = match[1];
        if (pathData) {
          const geometry = this.parseSimpleSVGPath(pathData);
          if (geometry) {
            features.push({
              type: "Feature",
              geometry,
              properties: { type: "path", pathData }
            });
          }
        }
      }
      while ((match = circleRegex.exec(svgContent)) !== null) {
        const cxStr = match[1];
        const cyStr = match[2];
        const rStr = match[3];
        if (cxStr && cyStr && rStr) {
          const cx = parseFloat(cxStr);
          const cy = parseFloat(cyStr);
          const r = parseFloat(rStr);
          features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [cx, cy]
            },
            properties: { type: "circle", radius: r }
          });
        }
      }
      return {
        type: "FeatureCollection",
        features,
        crs: "SVG"
        // SVG coordinate system
      };
    } catch (error) {
      throw new TransformationError(
        `Failed to parse SVG: ${error instanceof Error ? error.message : "Unknown error"}`,
        "SVG_PARSE_ERROR"
      );
    }
  }
  /**
   * Simplified SVG path parser
   */
  parseSimpleSVGPath(pathData) {
    try {
      const commands = pathData.match(/[ML]\s*[\d.,\s-]+/g);
      if (!commands || commands.length === 0) return null;
      const coordinates = [];
      for (const command of commands) {
        const type = command.charAt(0);
        const coords = command.slice(1).trim().split(/[\s,]+/).map(parseFloat);
        if (type === "M" || type === "L") {
          for (let i = 0; i < coords.length; i += 2) {
            if (i + 1 < coords.length) {
              const x = coords[i];
              const y = coords[i + 1];
              if (x !== void 0 && y !== void 0 && !isNaN(x) && !isNaN(y)) {
                coordinates.push([x, y]);
              }
            }
          }
        }
      }
      if (coordinates.length === 1 && coordinates[0]) {
        return {
          type: "Point",
          coordinates: coordinates[0]
        };
      } else if (coordinates.length > 1) {
        return {
          type: "LineString",
          coordinates
        };
      }
      return null;
    } catch (error) {
      console.warn("Failed to parse SVG path:", error);
      return null;
    }
  }
  // Placeholder methods για άλλα formats - θα υλοποιηθούν στο επόμενο στάδιο
  parseKML(_data) {
    throw new TransformationError("KML parser not yet implemented", "KML_PARSER_NOT_IMPLEMENTED");
  }
  parseGPX(_data) {
    throw new TransformationError("GPX parser not yet implemented", "GPX_PARSER_NOT_IMPLEMENTED");
  }
  parseDXF(_data) {
    throw new TransformationError("DXF parser will be implemented in @layera/cad-processing", "DXF_PARSER_EXTERNAL");
  }
  toKML(_vectorData) {
    throw new TransformationError("KML converter not yet implemented", "KML_CONVERTER_NOT_IMPLEMENTED");
  }
  toGPX(_vectorData) {
    throw new TransformationError("GPX converter not yet implemented", "GPX_CONVERTER_NOT_IMPLEMENTED");
  }
  toSVG(_vectorData) {
    throw new TransformationError("SVG converter not yet implemented", "SVG_CONVERTER_NOT_IMPLEMENTED");
  }
  toDXF(_vectorData) {
    throw new TransformationError("DXF converter will be implemented in @layera/cad-processing", "DXF_CONVERTER_EXTERNAL");
  }
  /**
   * Converts vector data to GeoJSON
   */
  toGeoJSON(vectorData) {
    return {
      type: "FeatureCollection",
      features: vectorData.features,
      crs: vectorData.crs ? {
        type: "name",
        properties: { name: vectorData.crs }
      } : void 0
    };
  }
  /**
   * Applies geometric transformations (scale, rotation, translation)
   */
  applyGeometricTransformations(vectorData, _params) {
    console.warn("Geometric transformations not yet implemented");
    return vectorData;
  }
  /**
   * Optimizes geometry (simplification, etc.)
   */
  optimizeGeometry(vectorData, _tolerance) {
    console.warn("Geometry optimization not yet implemented");
    return vectorData;
  }
  /**
   * Calculates geometry statistics
   */
  calculateStatistics(vectorData) {
    let entityCount = 0;
    let vertexCount = 0;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const feature of vectorData.features) {
      entityCount++;
      const coords = this.extractCoordinates(feature.geometry);
      vertexCount += coords.length;
      for (const coord of coords) {
        if (coord.length >= 2 && typeof coord[0] === "number" && typeof coord[1] === "number") {
          minX = Math.min(minX, coord[0]);
          minY = Math.min(minY, coord[1]);
          maxX = Math.max(maxX, coord[0]);
          maxY = Math.max(maxY, coord[1]);
        }
      }
    }
    return {
      entityCount,
      vertexCount,
      boundingBox: {
        minX: minX === Infinity ? 0 : minX,
        minY: minY === Infinity ? 0 : minY,
        maxX: maxX === -Infinity ? 0 : maxX,
        maxY: maxY === -Infinity ? 0 : maxY
      },
      complexityScore: entityCount * 10 + vertexCount
    };
  }
  /**
   * Extracts all coordinates from a geometry
   */
  extractCoordinates(geometry) {
    switch (geometry.type) {
      case "Point":
        if (Array.isArray(geometry.coordinates) && typeof geometry.coordinates[0] === "number") {
          return [geometry.coordinates];
        }
        return [];
      case "LineString":
        if (Array.isArray(geometry.coordinates)) {
          return geometry.coordinates;
        }
        return [];
      case "Polygon":
        if (Array.isArray(geometry.coordinates)) {
          return geometry.coordinates.flat();
        }
        return [];
      default:
        return [];
    }
  }
  /**
   * Cleanup resources
   */
  destroy() {
    this.coordinateTransformer.destroy();
  }
};

// src/utils/transformationValidator.ts
var SUPPORTED_FORMATS = [
  "dxf",
  "dwg",
  "svg",
  "geojson",
  "kml",
  "gpx",
  "shapefile",
  "tiff",
  "geotiff",
  "png",
  "jpeg",
  "webp",
  "pdf",
  "autocad",
  "microstation"
];
var FORMAT_COMPATIBILITY = {
  "geojson": {
    canTransformTo: ["kml", "gpx", "svg", "shapefile"],
    dataLossRisk: {
      "kml": "low",
      "gpx": "medium",
      "svg": "medium",
      "shapefile": "low"
    },
    limitations: {
      "gpx": ["Only point and line geometries supported"],
      "svg": ["Complex properties may be lost", "Coordinate precision may be reduced"]
    }
  },
  "dxf": {
    canTransformTo: ["geojson", "svg", "dwg"],
    dataLossRisk: {
      "geojson": "medium",
      "svg": "low",
      "dwg": "low"
    },
    limitations: {
      "geojson": ["CAD-specific entities may be lost", "Layer information simplified"],
      "svg": ["3D information lost", "Text styling may change"]
    }
  },
  "svg": {
    canTransformTo: ["geojson", "dxf", "png", "jpeg", "webp"],
    dataLossRisk: {
      "geojson": "high",
      "dxf": "high",
      "png": "none",
      "jpeg": "none",
      "webp": "none"
    },
    limitations: {
      "geojson": ["SVG styling lost", "Complex paths may be simplified"],
      "dxf": ["Vector precision may be reduced", "Styling information lost"]
    }
  },
  "kml": {
    canTransformTo: ["geojson", "gpx"],
    dataLossRisk: {
      "geojson": "low",
      "gpx": "medium"
    },
    limitations: {
      "gpx": ["Only track and waypoint data preserved"]
    }
  },
  "gpx": {
    canTransformTo: ["geojson", "kml"],
    dataLossRisk: {
      "geojson": "low",
      "kml": "low"
    },
    limitations: {}
  },
  "dwg": {
    canTransformTo: ["dxf", "geojson", "svg"],
    dataLossRisk: {
      "dxf": "low",
      "geojson": "high",
      "svg": "medium"
    },
    limitations: {
      "geojson": ["Complex CAD entities lost", "Proprietary features lost"],
      "svg": ["3D information lost", "Complex entities simplified"]
    }
  },
  "shapefile": {
    canTransformTo: ["geojson", "kml"],
    dataLossRisk: {
      "geojson": "none",
      "kml": "low"
    },
    limitations: {}
  },
  "tiff": {
    canTransformTo: ["png", "jpeg", "webp", "geotiff"],
    dataLossRisk: {
      "png": "none",
      "jpeg": "low",
      "webp": "low",
      "geotiff": "none"
    },
    limitations: {
      "jpeg": ["Transparency lost if present"]
    }
  },
  "geotiff": {
    canTransformTo: ["tiff", "png", "jpeg", "webp"],
    dataLossRisk: {
      "tiff": "low",
      "png": "medium",
      "jpeg": "medium",
      "webp": "medium"
    },
    limitations: {
      "tiff": ["Geo-referencing information lost"],
      "png": ["Geo-referencing information lost"],
      "jpeg": ["Geo-referencing information lost", "Transparency lost"],
      "webp": ["Geo-referencing information lost"]
    }
  },
  "png": {
    canTransformTo: ["jpeg", "webp", "tiff"],
    dataLossRisk: {
      "jpeg": "low",
      "webp": "none",
      "tiff": "none"
    },
    limitations: {
      "jpeg": ["Transparency lost"]
    }
  },
  "jpeg": {
    canTransformTo: ["png", "webp", "tiff"],
    dataLossRisk: {
      "png": "none",
      "webp": "none",
      "tiff": "none"
    },
    limitations: {}
  },
  "webp": {
    canTransformTo: ["png", "jpeg", "tiff"],
    dataLossRisk: {
      "png": "none",
      "jpeg": "low",
      "tiff": "none"
    },
    limitations: {
      "jpeg": ["Transparency lost if present"]
    }
  },
  "pdf": {
    canTransformTo: ["svg", "png", "jpeg"],
    dataLossRisk: {
      "svg": "high",
      "png": "medium",
      "jpeg": "medium"
    },
    limitations: {
      "svg": ["Complex PDF features lost", "Text may become paths"],
      "png": ["Vector information lost", "Text becomes raster"],
      "jpeg": ["Vector information lost", "Text becomes raster", "Transparency lost"]
    }
  },
  "autocad": {
    canTransformTo: ["dxf", "dwg"],
    dataLossRisk: {
      "dxf": "low",
      "dwg": "none"
    },
    limitations: {}
  },
  "microstation": {
    canTransformTo: ["dxf", "dwg"],
    dataLossRisk: {
      "dxf": "medium",
      "dwg": "medium"
    },
    limitations: {
      "dxf": ["MicroStation-specific features lost"],
      "dwg": ["Some MicroStation features may not translate"]
    }
  }
};
var COMMON_CRS = [
  "EPSG:4326",
  "EPSG:3857",
  "EPSG:2100",
  "EPSG:32634",
  "EPSG:32635"
];
function validateTransformationOptions(options) {
  const errors = [];
  const warnings = [];
  if (!SUPPORTED_FORMATS.includes(options.sourceFormat)) {
    errors.push({
      code: "UNSUPPORTED_SOURCE_FORMAT",
      message: `\u039C\u03B7 \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03B9\u03B6\u03CC\u03BC\u03B5\u03BD\u03B7 \u03C0\u03B7\u03B3\u03B1\u03AF\u03B1 \u03BC\u03BF\u03C1\u03C6\u03AE: ${options.sourceFormat}`,
      severity: "error",
      field: "sourceFormat"
    });
  }
  if (!SUPPORTED_FORMATS.includes(options.targetFormat)) {
    errors.push({
      code: "UNSUPPORTED_TARGET_FORMAT",
      message: `\u039C\u03B7 \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03B9\u03B6\u03CC\u03BC\u03B5\u03BD\u03B7 \u03BC\u03BF\u03C1\u03C6\u03AE \u03C3\u03C4\u03CC\u03C7\u03BF\u03C5: ${options.targetFormat}`,
      severity: "error",
      field: "targetFormat"
    });
  }
  const compatibility = getFormatCompatibility(options.sourceFormat, options.targetFormat);
  if (!compatibility.compatible) {
    errors.push({
      code: "INCOMPATIBLE_FORMATS",
      message: `\u0397 \u03BC\u03B5\u03C4\u03B1\u03C4\u03C1\u03BF\u03C0\u03AE \u03B1\u03C0\u03CC ${options.sourceFormat} \u03C3\u03B5 ${options.targetFormat} \u03B4\u03B5\u03BD \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03AF\u03B6\u03B5\u03C4\u03B1\u03B9`,
      severity: "error"
    });
  } else if (compatibility.dataLossRisk === "high") {
    warnings.push({
      code: "HIGH_DATA_LOSS_RISK",
      message: "\u03A5\u03C8\u03B7\u03BB\u03CC\u03C2 \u03BA\u03AF\u03BD\u03B4\u03C5\u03BD\u03BF\u03C2 \u03B1\u03C0\u03CE\u03BB\u03B5\u03B9\u03B1\u03C2 \u03B4\u03B5\u03B4\u03BF\u03BC\u03AD\u03BD\u03C9\u03BD \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03BC\u03B5\u03C4\u03B1\u03C4\u03C1\u03BF\u03C0\u03AE",
      suggestion: `\u03A3\u03BA\u03B5\u03C6\u03C4\u03B5\u03AF\u03C4\u03B5 \u03B5\u03BD\u03B1\u03BB\u03BB\u03B1\u03BA\u03C4\u03B9\u03BA\u03AD\u03C2 \u03BC\u03BF\u03C1\u03C6\u03AD\u03C2: ${compatibility.recommendedAlternatives?.join(", ")}`,
      impact: "high"
    });
  } else if (compatibility.dataLossRisk === "medium") {
    warnings.push({
      code: "MEDIUM_DATA_LOSS_RISK",
      message: "\u039C\u03AD\u03C4\u03C1\u03B9\u03BF\u03C2 \u03BA\u03AF\u03BD\u03B4\u03C5\u03BD\u03BF\u03C2 \u03B1\u03C0\u03CE\u03BB\u03B5\u03B9\u03B1\u03C2 \u03B4\u03B5\u03B4\u03BF\u03BC\u03AD\u03BD\u03C9\u03BD",
      suggestion: "\u0395\u03BB\u03AD\u03B3\u03BE\u03C4\u03B5 \u03C4\u03BF \u03B1\u03C0\u03BF\u03C4\u03AD\u03BB\u03B5\u03C3\u03BC\u03B1 \u03C0\u03C1\u03BF\u03C3\u03B5\u03BA\u03C4\u03B9\u03BA\u03AC",
      impact: "medium"
    });
  }
  if (options.sourceCRS && !isValidCRS(options.sourceCRS)) {
    warnings.push({
      code: "UNKNOWN_SOURCE_CRS",
      message: `\u0386\u03B3\u03BD\u03C9\u03C3\u03C4\u03BF \u03C3\u03CD\u03C3\u03C4\u03B7\u03BC\u03B1 \u03C3\u03C5\u03BD\u03C4\u03B5\u03C4\u03B1\u03B3\u03BC\u03AD\u03BD\u03C9\u03BD \u03C0\u03B7\u03B3\u03AE\u03C2: ${options.sourceCRS}`,
      suggestion: "\u0392\u03B5\u03B2\u03B1\u03B9\u03C9\u03B8\u03B5\u03AF\u03C4\u03B5 \u03CC\u03C4\u03B9 \u03C4\u03BF EPSG code \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C3\u03C9\u03C3\u03C4\u03CC",
      impact: "medium"
    });
  }
  if (options.targetCRS && !isValidCRS(options.targetCRS)) {
    warnings.push({
      code: "UNKNOWN_TARGET_CRS",
      message: `\u0386\u03B3\u03BD\u03C9\u03C3\u03C4\u03BF \u03C3\u03CD\u03C3\u03C4\u03B7\u03BC\u03B1 \u03C3\u03C5\u03BD\u03C4\u03B5\u03C4\u03B1\u03B3\u03BC\u03AD\u03BD\u03C9\u03BD \u03C3\u03C4\u03CC\u03C7\u03BF\u03C5: ${options.targetCRS}`,
      suggestion: "\u0392\u03B5\u03B2\u03B1\u03B9\u03C9\u03B8\u03B5\u03AF\u03C4\u03B5 \u03CC\u03C4\u03B9 \u03C4\u03BF EPSG code \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C3\u03C9\u03C3\u03C4\u03CC",
      impact: "medium"
    });
  }
  if (options.transformationParams) {
    const params = options.transformationParams;
    if (params.scale) {
      if (params.scale.x <= 0 || params.scale.y <= 0) {
        errors.push({
          code: "INVALID_SCALE",
          message: "\u0397 \u03BA\u03BB\u03AF\u03BC\u03B1\u03BA\u03B1 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B8\u03B5\u03C4\u03B9\u03BA\u03CC\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2",
          severity: "error",
          field: "transformationParams.scale"
        });
      }
      if (params.scale.x > 1e3 || params.scale.y > 1e3) {
        warnings.push({
          code: "LARGE_SCALE",
          message: "\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03B7 \u03BA\u03BB\u03AF\u03BC\u03B1\u03BA\u03B1 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03C0\u03C1\u03BF\u03BA\u03B1\u03BB\u03AD\u03C3\u03B5\u03B9 \u03C0\u03C1\u03BF\u03B2\u03BB\u03AE\u03BC\u03B1\u03C4\u03B1",
          suggestion: "\u03A7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03C4\u03B5 \u03BA\u03BB\u03AF\u03BC\u03B1\u03BA\u03B1 \u03BA\u03AC\u03C4\u03C9 \u03B1\u03C0\u03CC 1000",
          impact: "medium"
        });
      }
    }
    if (params.rotation !== void 0) {
      if (Math.abs(params.rotation) > 360) {
        warnings.push({
          code: "LARGE_ROTATION",
          message: "\u03A0\u03B5\u03C1\u03B9\u03C3\u03C4\u03C1\u03BF\u03C6\u03AE \u03BC\u03B5\u03B3\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03B7 \u03B1\u03C0\u03CC 360\xB0 \u03B8\u03B1 \u03BA\u03B1\u03BD\u03BF\u03BD\u03B9\u03BA\u03BF\u03C0\u03BF\u03B9\u03B7\u03B8\u03B5\u03AF",
          impact: "low"
        });
      }
    }
    if (params.precision !== void 0 && params.precision < 0) {
      errors.push({
        code: "INVALID_PRECISION",
        message: "\u0397 \u03B1\u03BA\u03C1\u03AF\u03B2\u03B5\u03B9\u03B1 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03BC\u03B7-\u03B1\u03C1\u03BD\u03B7\u03C4\u03B9\u03BA\u03CC\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2",
        severity: "error",
        field: "transformationParams.precision"
      });
    }
  }
  if (options.qualitySettings) {
    const quality = options.qualitySettings;
    if (quality.simplificationTolerance !== void 0 && quality.simplificationTolerance < 0) {
      errors.push({
        code: "INVALID_TOLERANCE",
        message: "\u0397 \u03B1\u03BD\u03BF\u03C7\u03AE \u03B1\u03C0\u03BB\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7\u03C2 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03BC\u03B7-\u03B1\u03C1\u03BD\u03B7\u03C4\u03B9\u03BA\u03AE",
        severity: "error",
        field: "qualitySettings.simplificationTolerance"
      });
    }
    if (quality.compressionLevel !== void 0) {
      if (quality.compressionLevel < 0 || quality.compressionLevel > 100) {
        errors.push({
          code: "INVALID_COMPRESSION",
          message: "\u03A4\u03BF \u03B5\u03C0\u03AF\u03C0\u03B5\u03B4\u03BF \u03C3\u03C5\u03BC\u03C0\u03AF\u03B5\u03C3\u03B7\u03C2 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03BC\u03B5\u03C4\u03B1\u03BE\u03CD 0-100",
          severity: "error",
          field: "qualitySettings.compressionLevel"
        });
      }
    }
    if (quality.colorDepth && ![8, 16, 24, 32].includes(quality.colorDepth)) {
      errors.push({
        code: "INVALID_COLOR_DEPTH",
        message: "\u03A4\u03BF \u03B2\u03AC\u03B8\u03BF\u03C2 \u03C7\u03C1\u03CE\u03BC\u03B1\u03C4\u03BF\u03C2 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 8, 16, 24 \u03AE 32",
        severity: "error",
        field: "qualitySettings.colorDepth"
      });
    }
  }
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    compatibility
  };
}
function getFormatCompatibility(sourceFormat, targetFormat) {
  const sourceConfig = FORMAT_COMPATIBILITY[sourceFormat];
  if (!sourceConfig) {
    return {
      sourceSupported: false,
      targetSupported: false,
      dataLossRisk: "high",
      recommendedAlternatives: [],
      limitations: [`\u039C\u03B7 \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03B9\u03B6\u03CC\u03BC\u03B5\u03BD\u03B7 \u03C0\u03B7\u03B3\u03B1\u03AF\u03B1 \u03BC\u03BF\u03C1\u03C6\u03AE: ${sourceFormat}`]
    };
  }
  const compatible = sourceConfig.canTransformTo.includes(targetFormat);
  const dataLossRisk = Object.prototype.hasOwnProperty.call(sourceConfig.dataLossRisk, targetFormat) ? sourceConfig.dataLossRisk[targetFormat] : "high";
  const limitations = Object.prototype.hasOwnProperty.call(sourceConfig.limitations, targetFormat) ? sourceConfig.limitations[targetFormat] : [];
  const recommendedAlternatives = compatible ? [] : sourceConfig.canTransformTo.slice(0, 3);
  return {
    sourceSupported: true,
    targetSupported: SUPPORTED_FORMATS.includes(targetFormat),
    dataLossRisk,
    recommendedAlternatives,
    limitations,
    compatible
  };
}
function isValidCRS(crs) {
  if (COMMON_CRS.includes(crs)) {
    return true;
  }
  if (/^EPSG:\d+$/.test(crs)) {
    return true;
  }
  if (crs.startsWith("+proj=")) {
    return true;
  }
  return false;
}
function getFormatCategory(format) {
  const categories = {
    "geojson": "vector",
    "kml": "vector",
    "gpx": "vector",
    "shapefile": "vector",
    "svg": "vector",
    "dxf": "cad",
    "dwg": "cad",
    "autocad": "cad",
    "microstation": "cad",
    "tiff": "raster",
    "geotiff": "raster",
    "png": "raster",
    "jpeg": "raster",
    "webp": "raster",
    "pdf": "document"
  };
  return Object.prototype.hasOwnProperty.call(categories, format) ? categories[format] : "document";
}
function validateBatchTransformation(files, options) {
  const errors = [];
  const warnings = [];
  if (files.length === 0) {
    errors.push({
      code: "NO_FILES",
      message: "\u0394\u03B5\u03BD \u03B5\u03C0\u03B9\u03BB\u03AD\u03C7\u03B8\u03B7\u03BA\u03B1\u03BD \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1 \u03B3\u03B9\u03B1 \u03BC\u03B5\u03C4\u03B1\u03C4\u03C1\u03BF\u03C0\u03AE",
      severity: "error"
    });
  }
  if (files.length > 20) {
    warnings.push({
      code: "MANY_FILES",
      message: "\u039C\u03B5\u03B3\u03AC\u03BB\u03BF\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03C9\u03BD \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03B5\u03C0\u03B7\u03C1\u03B5\u03AC\u03C3\u03B5\u03B9 \u03C4\u03B7\u03BD \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7",
      suggestion: "\u03A3\u03BA\u03B5\u03C6\u03C4\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03B5\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03C4\u03B5\u03AF\u03C4\u03B5 \u03C4\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1 \u03C3\u03B5 \u03BC\u03B9\u03BA\u03C1\u03CC\u03C4\u03B5\u03C1\u03B5\u03C2 \u03BF\u03BC\u03AC\u03B4\u03B5\u03C2",
      impact: "medium"
    });
  }
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > 1024 * 1024 * 1024) {
    warnings.push({
      code: "LARGE_BATCH",
      message: "\u039C\u03B5\u03B3\u03AC\u03BB\u03BF \u03C3\u03C5\u03BD\u03BF\u03BB\u03B9\u03BA\u03CC \u03BC\u03AD\u03B3\u03B5\u03B8\u03BF\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03C9\u03BD - \u03B7 \u03B5\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03C0\u03AC\u03C1\u03B5\u03B9 \u03B1\u03C1\u03BA\u03B5\u03C4\u03CC \u03C7\u03C1\u03CC\u03BD\u03BF",
      suggestion: "\u0395\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03C4\u03B5\u03AF\u03C4\u03B5 \u03C4\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1 \u03C3\u03B5 \u03BC\u03B9\u03BA\u03C1\u03CC\u03C4\u03B5\u03C1\u03B5\u03C2 \u03BF\u03BC\u03AC\u03B4\u03B5\u03C2 \u03B3\u03B9\u03B1 \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03B7 \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7",
      impact: "high"
    });
  }
  const extensions = files.map((file) => file.name.split(".").pop()?.toLowerCase()).filter(Boolean);
  const uniqueExtensions = [...new Set(extensions)];
  if (uniqueExtensions.length > 1) {
    warnings.push({
      code: "MIXED_FORMATS",
      message: "\u0391\u03BD\u03AC\u03BC\u03B5\u03B9\u03BA\u03C4\u03B5\u03C2 \u03BC\u03BF\u03C1\u03C6\u03AD\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03C9\u03BD \u03C3\u03C4\u03B7 \u03B4\u03AD\u03C3\u03BC\u03B7",
      suggestion: "\u0392\u03B5\u03B2\u03B1\u03B9\u03C9\u03B8\u03B5\u03AF\u03C4\u03B5 \u03CC\u03C4\u03B9 \u03CC\u03BB\u03B1 \u03C4\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1 \u03AD\u03C7\u03BF\u03C5\u03BD \u03C4\u03B7\u03BD \u03AF\u03B4\u03B9\u03B1 \u03C0\u03B7\u03B3\u03B1\u03AF\u03B1 \u03BC\u03BF\u03C1\u03C6\u03AE",
      impact: "medium"
    });
  }
  const optionsValidation = validateTransformationOptions(options);
  errors.push(...optionsValidation.errors);
  warnings.push(...optionsValidation.warnings);
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    compatibility: optionsValidation.compatibility
  };
}
function estimateTransformationComplexity(sourceFormat, targetFormat, options) {
  const factors = [];
  let complexity = "low";
  let timePerMB = 1e3;
  const sourceCategory = getFormatCategory(sourceFormat);
  const targetCategory = getFormatCategory(targetFormat);
  if (sourceCategory === "cad" || targetCategory === "cad") {
    complexity = "high";
    timePerMB = 5e3;
    factors.push("CAD format processing");
  } else if (sourceCategory !== targetCategory) {
    complexity = "medium";
    timePerMB = 2e3;
    factors.push("Cross-category transformation");
  }
  if (options.sourceCRS && options.targetCRS && options.sourceCRS !== options.targetCRS) {
    if (complexity === "low") complexity = "medium";
    timePerMB *= 1.5;
    factors.push("Coordinate system transformation");
  }
  if (options.transformationParams) {
    if (complexity === "low") complexity = "medium";
    timePerMB *= 1.3;
    factors.push("Geometric transformations");
  }
  if (options.qualitySettings?.optimizeGeometry) {
    if (complexity === "low") complexity = "medium";
    timePerMB *= 1.4;
    factors.push("Geometry optimization");
  }
  if (options.qualitySettings?.simplificationTolerance !== void 0) {
    timePerMB *= 1.2;
    factors.push("Geometry simplification");
  }
  return {
    complexity,
    factors,
    estimatedTime: Math.round(timePerMB)
  };
}

// src/hooks/useFileTransformation.ts
function useFileTransformation(options = {}) {
  const { t } = (0, import_i18n.useLayeraTranslation)();
  const { addNotification } = (0, import_notifications.useNotifications)();
  const [isTransforming, setIsTransforming] = (0, import_react.useState)(false);
  const [progress, setProgress] = (0, import_react.useState)(0);
  const [results, setResults] = (0, import_react.useState)([]);
  const [errors, setErrors] = (0, import_react.useState)([]);
  const vectorTransformerRef = (0, import_react.useRef)(null);
  const abortControllerRef = (0, import_react.useRef)(null);
  const {
    defaultOptions = {},
    maxConcurrentFiles = 3,
    showNotifications = true,
    onProgress,
    onComplete,
    onError
  } = options;
  (0, import_react.useEffect)(() => {
    try {
      vectorTransformerRef.current = new LayeraVectorTransformer();
    } catch (error) {
      console.error("Failed to initialize transformation engines:", error);
      if (showNotifications) {
        addNotification({
          type: "error",
          message: t("transformation.engine.init.error")
        });
      }
    }
    return () => {
      if (vectorTransformerRef.current) {
        vectorTransformerRef.current.destroy();
      }
    };
  }, [showNotifications, t]);
  const reportProgress = (0, import_react.useCallback)((fileId, stage, progress2, message, currentOperation) => {
    const progressData = {
      fileId,
      stage,
      progress: progress2,
      message,
      ...currentOperation && { currentOperation }
    };
    setProgress(progress2);
    onProgress?.(progressData);
    if (showNotifications && stage === "complete") {
      addNotification({
        type: "success",
        message: t("transformation.file.success", { progress: Math.round(progress2) }),
        duration: 3e3
      });
    }
  }, [onProgress, showNotifications, t]);
  const handleError = (0, import_react.useCallback)((error) => {
    setErrors((prev) => [...prev, error]);
    onError?.(error);
    if (showNotifications) {
      addNotification({
        type: "error",
        message: t("transformation.file.error", {
          error: error.message
        }),
        duration: 5e3,
        action: { label: t("transformation.retry"), onClick: () => {
        } }
      });
    }
  }, [onError, showNotifications, t]);
  const transformFile = (0, import_react.useCallback)(async (file, transformationOptions) => {
    if (!vectorTransformerRef.current) {
      throw new TransformationError(
        "Transformation engine not initialized",
        "ENGINE_NOT_INITIALIZED"
      );
    }
    const fileId = `transform-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const finalOptions = { ...defaultOptions, ...transformationOptions };
    const startTime = performance.now();
    try {
      setIsTransforming(true);
      reportProgress(fileId, "parsing", 10, t("transformation.parsing.file"));
      const validation = validateTransformationOptions(finalOptions);
      if (!validation.isValid) {
        throw new TransformationError(
          validation.errors.map((e) => e.message).join(", "),
          "VALIDATION_FAILED"
        );
      }
      if (validation.warnings.length > 0 && showNotifications) {
        validation.warnings.forEach((warning) => {
          addNotification({
            type: "warning",
            message: warning.message,
            duration: 4e3,
            ...warning.suggestion && {
              action: { label: t("transformation.suggestion"), onClick: () => {
              } }
            }
          });
        });
      }
      reportProgress(fileId, "parsing", 25, t("transformation.reading.file"));
      const fileContent = await readFileContent(file, finalOptions.sourceFormat);
      reportProgress(fileId, "transforming", 50, t("transformation.transforming.data"));
      const transformedData = await vectorTransformerRef.current.transform(fileContent, finalOptions);
      reportProgress(fileId, "converting", 75, t("transformation.generating.output"));
      const transformedBlob = await generateOutputBlob(transformedData, finalOptions.targetFormat);
      reportProgress(fileId, "complete", 100, t("transformation.completed"));
      const statistics = vectorTransformerRef.current.calculateStatistics(
        transformedData
      );
      const result = {
        originalFile: file,
        transformedBlob,
        originalFormat: finalOptions.sourceFormat,
        targetFormat: finalOptions.targetFormat,
        originalSize: file.size,
        transformedSize: transformedBlob.size,
        metadata: {
          processingTime: performance.now() - startTime,
          transformationsApplied: [
            finalOptions.sourceCRS && finalOptions.targetCRS ? "coordinate-transform" : "",
            finalOptions.transformationParams ? "geometric-transform" : "",
            finalOptions.qualitySettings?.optimizeGeometry ? "geometry-optimization" : ""
          ].filter(Boolean),
          qualitySettings: finalOptions.qualitySettings || {},
          ...finalOptions.sourceCRS && finalOptions.targetCRS && {
            coordinateSystemInfo: {
              source: finalOptions.sourceCRS,
              target: finalOptions.targetCRS,
              accuracy: 0.5
              // Simplified accuracy
            }
          },
          geometryStatistics: statistics
        },
        ...finalOptions.sourceCRS && finalOptions.targetCRS && {
          coordinateInfo: {
            sourceCRS: finalOptions.sourceCRS,
            targetCRS: finalOptions.targetCRS,
            transformationAccuracy: 0.5,
            transformedPoints: statistics.vertexCount
          }
        }
      };
      setResults((prev) => [...prev, result]);
      return result;
    } catch (error) {
      const transformationError = error instanceof TransformationError ? error : new TransformationError(
        error instanceof Error ? error.message : "Unknown transformation error",
        "TRANSFORMATION_FAILED",
        fileId
      );
      handleError(transformationError);
      throw transformationError;
    } finally {
      setIsTransforming(false);
      setProgress(0);
    }
  }, [defaultOptions, reportProgress, handleError, showNotifications, t]);
  const transformFiles = (0, import_react.useCallback)(async (files, batchOptions) => {
    const startTime = performance.now();
    const batchResults = [];
    const batchErrors = [];
    const {
      maxConcurrentFiles: batchMaxConcurrent = maxConcurrentFiles,
      stopOnError = false,
      onFileComplete,
      onFileError,
      ...transformationOptions
    } = batchOptions;
    try {
      setIsTransforming(true);
      abortControllerRef.current = new AbortController();
      for (let i = 0; i < files.length; i += batchMaxConcurrent) {
        if (abortControllerRef.current.signal.aborted) {
          break;
        }
        const chunk = files.slice(i, i + batchMaxConcurrent);
        const overallProgress = (i + chunk.length) / files.length * 100;
        setProgress(overallProgress);
        const chunkPromises = chunk.map(async (file) => {
          try {
            const result = await transformFile(file, transformationOptions);
            batchResults.push(result);
            onFileComplete?.(result);
            return result;
          } catch (error) {
            const transformationError = error instanceof TransformationError ? error : new TransformationError(
              error instanceof Error ? error.message : "Unknown error",
              "FILE_TRANSFORMATION_FAILED"
            );
            batchErrors.push(transformationError);
            onFileError?.(transformationError);
            if (stopOnError) {
              throw transformationError;
            }
            return null;
          }
        });
        await Promise.all(chunkPromises);
      }
      const batchResult = {
        results: batchResults,
        errors: batchErrors,
        totalProcessingTime: performance.now() - startTime,
        successCount: batchResults.length,
        errorCount: batchErrors.length
      };
      onComplete?.(batchResults);
      if (showNotifications) {
        addNotification({
          type: "success",
          message: t("transformation.batch.complete", {
            successful: batchResults.length,
            total: files.length
          }),
          duration: 5e3
        });
      }
      return batchResult;
    } finally {
      setIsTransforming(false);
      setProgress(0);
      abortControllerRef.current = null;
    }
  }, [transformFile, maxConcurrentFiles, onComplete, showNotifications, t]);
  const cancelTransformation = (0, import_react.useCallback)(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsTransforming(false);
      setProgress(0);
      if (showNotifications) {
        addNotification({
          type: "info",
          message: t("transformation.cancelled")
        });
      }
    }
  }, [showNotifications, t]);
  const clearResults = (0, import_react.useCallback)(() => {
    setResults([]);
    setErrors([]);
    setProgress(0);
  }, []);
  const validateOptions = (0, import_react.useCallback)((options2) => {
    return validateTransformationOptions(options2);
  }, []);
  const getCompatibility = (0, import_react.useCallback)(async (sourceFormat, targetFormat) => {
    const formatCompatibility = getFormatCompatibility(sourceFormat, targetFormat);
    return {
      compatible: formatCompatibility.sourceSupported && formatCompatibility.targetSupported,
      dataLossRisk: formatCompatibility.dataLossRisk,
      limitations: formatCompatibility.limitations
    };
  }, []);
  const detectFileFormat = (0, import_react.useCallback)(async (file) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    const mimeType = file.type;
    const formatMap = {
      "json": "geojson",
      "geojson": "geojson",
      "kml": "kml",
      "gpx": "gpx",
      "svg": "svg",
      "dxf": "dxf",
      "dwg": "dwg",
      "tiff": "tiff",
      "tif": "tiff",
      "png": "png",
      "jpg": "jpeg",
      "jpeg": "jpeg",
      "webp": "webp",
      "pdf": "pdf"
    };
    const detectedFormat = extension ? formatMap[extension] : void 0;
    if (detectedFormat) {
      return {
        detectedFormat,
        confidence: mimeType.includes(extension || "") ? 0.9 : 0.7
      };
    }
    return {
      detectedFormat: "unknown",
      confidence: 0
    };
  }, []);
  const estimateTransformation = (0, import_react.useCallback)(async (file, options2) => {
    const warnings = [];
    let sizeMultiplier = 1;
    let timePerMB = 2e3;
    if (options2.sourceFormat === "dxf" && options2.targetFormat === "geojson") {
      sizeMultiplier = 0.8;
      timePerMB = 3e3;
    } else if (options2.sourceFormat === "svg" && options2.targetFormat === "geojson") {
      sizeMultiplier = 1.2;
      timePerMB = 1500;
    }
    if (options2.sourceCRS && options2.targetCRS) {
      timePerMB *= 1.5;
      warnings.push(t("transformation.warning.coordinate.transform.time"));
    }
    if (options2.qualitySettings?.optimizeGeometry) {
      timePerMB *= 1.3;
      sizeMultiplier *= 0.9;
      warnings.push(t("transformation.warning.optimization.time"));
    }
    const fileSizeMB = file.size / (1024 * 1024);
    const estimatedSize = Math.round(file.size * sizeMultiplier);
    const estimatedTime = Math.round(fileSizeMB * timePerMB);
    return {
      estimatedSize,
      estimatedTime,
      warnings
    };
  }, [t]);
  return {
    // State
    isTransforming,
    progress,
    results,
    errors,
    // Actions
    transformFile,
    transformFiles,
    cancelTransformation,
    clearResults,
    // Validation & utilities
    validateOptions,
    getCompatibility,
    detectFileFormat,
    estimateTransformation
  };
}
async function readFileContent(file, format) {
  if (format === "geojson" || format === "kml" || format === "gpx" || format === "svg") {
    return file.text();
  } else {
    return file.arrayBuffer();
  }
}
async function generateOutputBlob(data, format) {
  if (typeof data === "string") {
    return new Blob([data], { type: getFormatMimeType(format) });
  } else if (data instanceof ArrayBuffer) {
    return new Blob([data], { type: getFormatMimeType(format) });
  } else {
    const jsonString = JSON.stringify(data, null, 2);
    return new Blob([jsonString], { type: getFormatMimeType(format) });
  }
}
function getFormatMimeType(format) {
  const mimeTypes = {
    "geojson": "application/geo+json",
    "kml": "application/vnd.google-earth.kml+xml",
    "gpx": "application/gpx+xml",
    "svg": "image/svg+xml",
    "dxf": "application/dxf",
    "dwg": "application/dwg",
    "shapefile": "application/x-shapefile",
    "tiff": "image/tiff",
    "geotiff": "image/tiff",
    "png": "image/png",
    "jpeg": "image/jpeg",
    "webp": "image/webp",
    "pdf": "application/pdf",
    "autocad": "application/dwg",
    "microstation": "application/dgn"
  };
  return mimeTypes[format] || "application/octet-stream";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CoordinateTransformationError,
  CoordinateTransformer,
  LayeraVectorTransformer,
  TransformationError,
  UnsupportedTransformationError,
  estimateTransformationComplexity,
  getFormatCategory,
  getFormatCompatibility,
  useFileTransformation,
  validateBatchTransformation,
  validateTransformationOptions
});
//# sourceMappingURL=index.js.map