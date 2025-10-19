"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  GEO_DRAWING_CONSTANTS: () => GEO_DRAWING_CONSTANTS,
  GeometryRenderer: () => GeometryRenderer,
  MeasurementCanvas: () => MeasurementCanvas,
  MeasurementControls: () => MeasurementControls,
  arePointsEqual: () => arePointsEqual,
  calculateBearing: () => calculateBearing,
  calculateBounds: () => calculateBounds,
  calculateDistance: () => calculateDistance,
  calculatePerimeter: () => calculatePerimeter,
  calculatePointDistance: () => calculatePointDistance,
  calculatePolygonCenter: () => calculatePolygonCenter,
  calculateProjectedArea: () => calculateProjectedArea,
  clearOSMCache: () => clearOSMCache,
  closestPointOnSegment: () => closestPointOnSegment,
  extractOSMGeometry: () => extractOSMGeometry,
  fetchBuildingOutlines: () => fetchBuildingOutlines,
  formatArea: () => formatArea,
  formatBearing: () => formatBearing,
  formatCoordinatesBySystem: () => formatCoordinatesBySystem,
  formatDistance: () => formatDistance,
  geoJsonToLatLng: () => geoJsonToLatLng,
  getCacheSize: () => getCacheSize,
  isBoundsCached: () => isBoundsCached,
  isPointInPolygon: () => isPointInPolygon,
  latLngToGeoJson: () => latLngToGeoJson,
  prefetchBuildingOutlines: () => prefetchBuildingOutlines,
  simplifyPolygon: () => simplifyPolygon,
  useGeometrySnap: () => useGeometrySnap,
  useMeasurement: () => useMeasurement,
  useMeasurementFormatter: () => useMeasurementFormatter
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useMeasurement.ts
var import_react = require("react");
var import_i18n2 = require("@layera/i18n");

// src/utils/calculations.ts
var import_leaflet = __toESM(require("leaflet"));
var calculateProjectedArea = (latlngs) => {
  if (latlngs.length < 3) return 0;
  const map = import_leaflet.default.CRS.EPSG3857;
  const points = latlngs.map((latlng) => map.project(latlng));
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    area += p1.x * p2.y - p2.x * p1.y;
  }
  return Math.abs(area / 2);
};
var calculateDistance = (latlngs) => {
  if (latlngs.length < 2) {
    return 0;
  }
  let totalDistance = 0;
  for (let i = 0; i < latlngs.length - 1; i++) {
    totalDistance += latlngs[i].distanceTo(latlngs[i + 1]);
  }
  return totalDistance;
};
var calculatePointDistance = (point1, point2) => {
  return point1.distanceTo(point2);
};
var calculatePolygonCenter = (latlngs) => {
  if (latlngs.length === 0) {
    throw new Error("Cannot calculate center of empty polygon");
  }
  let latSum = 0;
  let lngSum = 0;
  for (const point of latlngs) {
    latSum += point.lat;
    lngSum += point.lng;
  }
  return import_leaflet.default.latLng(latSum / latlngs.length, lngSum / latlngs.length);
};
var calculatePerimeter = (latlngs) => {
  if (latlngs.length < 2) return 0;
  const closedPolygon = [...latlngs, latlngs[0]];
  return calculateDistance(closedPolygon);
};
var isPointInPolygon = (point, polygon) => {
  let inside = false;
  const x = point.lng;
  const y = point.lat;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;
    if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
};
var calculateBounds = (latlngs) => {
  if (latlngs.length === 0) {
    throw new Error("Cannot calculate bounds of empty point array");
  }
  return import_leaflet.default.latLngBounds(latlngs);
};

// src/utils/formatters.ts
var import_i18n = require("@layera/i18n");
var formatDistance = (meters, decimals = 2) => {
  if (meters === 0) return "0 m";
  if (meters >= 1e3) {
    return `${(meters / 1e3).toFixed(decimals)} km`;
  }
  return `${meters.toFixed(decimals)} m`;
};
var formatArea = (sqMeters) => {
  if (sqMeters === 0) return "0 m\xB2";
  if (sqMeters >= 1e6) {
    return `${(sqMeters / 1e6).toFixed(2)} km\xB2`;
  }
  if (sqMeters >= 1e4) {
    return `${(sqMeters / 1e4).toFixed(2)} ha`;
  }
  return `${sqMeters.toFixed(2)} m\xB2`;
};
var useMeasurementFormatter = () => {
  const { t } = (0, import_i18n.useLayeraTranslation)();
  const formatDistanceWithLabels = (meters, decimals = 2) => {
    if (meters === 0) return `0 ${t("geo-drawing.units.meters")}`;
    if (meters >= 1e3) {
      return `${(meters / 1e3).toFixed(decimals)} ${t("geo-drawing.units.kilometers")}`;
    }
    return `${meters.toFixed(decimals)} ${t("geo-drawing.units.meters")}`;
  };
  const formatAreaWithLabels = (sqMeters) => {
    if (sqMeters === 0) return `0 ${t("geo-drawing.units.square-meters")}`;
    if (sqMeters >= 1e6) {
      return `${(sqMeters / 1e6).toFixed(2)} ${t("geo-drawing.units.square-kilometers")}`;
    }
    if (sqMeters >= 1e4) {
      return `${(sqMeters / 1e4).toFixed(2)} ${t("geo-drawing.units.hectares")}`;
    }
    return `${sqMeters.toFixed(2)} ${t("geo-drawing.units.square-meters")}`;
  };
  const formatCoordinates = (lat, lng, decimals = 6) => {
    return `${lat.toFixed(decimals)}, ${lng.toFixed(decimals)}`;
  };
  const formatPointLabel = (index) => {
    return t("geo-drawing.point-label", { index: index + 1 });
  };
  return {
    formatDistanceWithLabels,
    formatAreaWithLabels,
    formatCoordinates,
    formatPointLabel,
    // Backward compatibility exports
    formatDistance,
    formatArea
  };
};
var formatCoordinatesBySystem = (lat, lng, system = "WGS84", decimals = 6) => {
  switch (system) {
    case "WGS84":
      return `${lat.toFixed(decimals)}\xB0N, ${lng.toFixed(decimals)}\xB0E`;
    case "EGSA87":
      return `X: ${lng.toFixed(2)}, Y: ${lat.toFixed(2)} (\u0395\u0393\u03A3\u039187)`;
    case "UTM":
      return `UTM: ${lng.toFixed(0)}E, ${lat.toFixed(0)}N`;
    default:
      return `${lat.toFixed(decimals)}, ${lng.toFixed(decimals)}`;
  }
};
var formatBearing = (bearing) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(bearing / 45) % 8;
  return `${bearing.toFixed(1)}\xB0 (${directions[index]})`;
};

// src/hooks/useMeasurement.ts
var import_notifications = require("@layera/notifications");
var useMeasurement = () => {
  const { t } = (0, import_i18n2.useLayeraTranslation)();
  const { addNotification } = (0, import_notifications.useNotifications)();
  const { formatDistanceWithLabels, formatAreaWithLabels } = useMeasurementFormatter();
  const [mode, setMode] = (0, import_react.useState)("distance");
  const [state, setState] = (0, import_react.useState)("idle");
  const [points, setPoints] = (0, import_react.useState)([]);
  const [currentResult, setCurrentResult] = (0, import_react.useState)(null);
  const [results, setResults] = (0, import_react.useState)([]);
  const pointIdCounter = (0, import_react.useRef)(0);
  const addPoint = (0, import_react.useCallback)((latlng) => {
    const newPoint = {
      id: `point-${pointIdCounter.current++}`,
      latlng,
      index: points.length
    };
    const updatedPoints = [...points, newPoint];
    setPoints(updatedPoints);
    if (points.length === 0) {
      setState("drawing");
    }
    let distance = 0;
    let area = 0;
    let displayValue = "";
    if (mode === "distance" && updatedPoints.length >= 2) {
      const latlngs = updatedPoints.map((p) => p.latlng);
      distance = calculateDistance(latlngs);
      displayValue = formatDistanceWithLabels(distance);
    } else if (mode === "area" && updatedPoints.length >= 3) {
      const latlngs = updatedPoints.map((p) => p.latlng);
      area = calculateProjectedArea(latlngs);
      displayValue = formatAreaWithLabels(area);
    } else if (mode === "point") {
      displayValue = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
    }
    const result = {
      type: mode,
      points: updatedPoints,
      ...mode === "distance" && distance !== void 0 && { distance },
      ...mode === "area" && area !== void 0 && { area },
      displayValue,
      timestamp: Date.now()
    };
    setCurrentResult(result);
  }, [points, mode, formatDistanceWithLabels, formatAreaWithLabels]);
  const finishMeasurement = (0, import_react.useCallback)(() => {
    if (!currentResult) return;
    if (mode === "distance" && points.length < 2) {
      addNotification({
        type: "error",
        message: t("geo-drawing.errors.minimum-points-distance")
      });
      return;
    }
    if (mode === "area" && points.length < 3) {
      addNotification({
        type: "error",
        message: t("geo-drawing.errors.minimum-points-area")
      });
      return;
    }
    setResults((prev) => [...prev, currentResult]);
    setState("finished");
    addNotification({
      type: "success",
      message: t("geo-drawing.measurement-completed", {
        type: t(`geo-drawing.modes.${mode}`),
        value: currentResult.displayValue
      })
    });
  }, [currentResult, mode, points.length, addNotification, t]);
  const cancelMeasurement = (0, import_react.useCallback)(() => {
    setPoints([]);
    setCurrentResult(null);
    setState("idle");
  }, []);
  const resetAll = (0, import_react.useCallback)(() => {
    setPoints([]);
    setCurrentResult(null);
    setResults([]);
    setState("idle");
    pointIdCounter.current = 0;
  }, []);
  const changeMeasurementMode = (0, import_react.useCallback)((newMode) => {
    if (state === "drawing") {
      if (window.confirm(t("geo-drawing.confirm-mode-change"))) {
        cancelMeasurement();
        setMode(newMode);
      }
    } else {
      setMode(newMode);
    }
  }, [state, cancelMeasurement, t]);
  const removeLastPoint = (0, import_react.useCallback)(() => {
    if (points.length === 0) return;
    const updatedPoints = points.slice(0, -1);
    setPoints(updatedPoints);
    if (updatedPoints.length === 0) {
      setState("idle");
      setCurrentResult(null);
    } else {
      let distance = 0;
      let area = 0;
      let displayValue = "";
      if (mode === "distance" && updatedPoints.length >= 2) {
        const latlngs = updatedPoints.map((p) => p.latlng);
        distance = calculateDistance(latlngs);
        displayValue = formatDistanceWithLabels(distance);
      } else if (mode === "area" && updatedPoints.length >= 3) {
        const latlngs = updatedPoints.map((p) => p.latlng);
        area = calculateProjectedArea(latlngs);
        displayValue = formatAreaWithLabels(area);
      }
      const result = {
        type: mode,
        points: updatedPoints,
        ...mode === "distance" && distance !== void 0 && { distance },
        ...mode === "area" && area !== void 0 && { area },
        displayValue,
        timestamp: Date.now()
      };
      setCurrentResult(result);
    }
  }, [points, mode, formatDistanceWithLabels, formatAreaWithLabels]);
  const removeResult = (0, import_react.useCallback)((timestamp) => {
    setResults((prev) => prev.filter((result) => result.timestamp !== timestamp));
  }, []);
  const getCurrentDistance = (0, import_react.useCallback)(() => {
    if (points.length < 2) return 0;
    const latlngs = points.map((p) => p.latlng);
    return calculateDistance(latlngs);
  }, [points]);
  const getCurrentArea = (0, import_react.useCallback)(() => {
    if (points.length < 3) return 0;
    const latlngs = points.map((p) => p.latlng);
    return calculateProjectedArea(latlngs);
  }, [points]);
  return {
    // State
    mode,
    state,
    points,
    currentResult,
    results,
    // Actions
    addPoint,
    finishMeasurement,
    cancelMeasurement,
    resetAll,
    changeMeasurementMode,
    removeLastPoint,
    removeResult,
    // Computed values
    getCurrentDistance,
    getCurrentArea,
    isDrawing: state === "drawing",
    isFinished: state === "finished",
    canFinish: mode === "distance" && points.length >= 2 || mode === "area" && points.length >= 3 || mode === "point" && points.length >= 1
  };
};

// src/hooks/useGeometrySnap.ts
var import_react2 = require("react");
var import_react_leaflet = require("react-leaflet");
var import_snap_interactions = require("@layera/snap-interactions");

// src/services/osmService.ts
var import_constants = require("@layera/constants");
var cache = /* @__PURE__ */ new Map();
var fetchBuildingOutlines = async (bounds) => {
  const boundsStr = `${bounds.getSouth().toFixed(4)},${bounds.getWest().toFixed(4)},${bounds.getNorth().toFixed(4)},${bounds.getEast().toFixed(4)}`;
  if (cache.has(boundsStr)) {
    return Promise.resolve(cache.get(boundsStr));
  }
  const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
  const query = `
    [out:json][timeout:${import_constants.CONFIG.osm.requestTimeout / 1e3}];
    (
      node["building"](${bbox});
      way["building"](${bbox});
      relation["building"](${bbox});
    );
    out body;
    >;
    out skel qt;
  `;
  try {
    const response = await fetch(import_constants.CONFIG.osm.overpassApiUrl, {
      method: "POST",
      body: `data=${encodeURIComponent(query)}`
    });
    if (!response.ok) {
      if (response.status !== 429 && response.status !== 504) {
        console.error(`Overpass API error: ${response.statusText}`);
      }
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const osmData = await response.json();
    const geojson = osmtogeojson(osmData);
    geojson.features = geojson.features.filter(
      (f) => f.geometry && (f.geometry.type === "Polygon" || f.geometry.type === "MultiPolygon")
    );
    cache.set(boundsStr, geojson);
    return geojson;
  } catch (error) {
    return { type: "FeatureCollection", features: [] };
  }
};
var clearOSMCache = () => {
  cache.clear();
};
var getCacheSize = () => {
  return cache.size;
};
var isBoundsCached = (bounds) => {
  const boundsStr = `${bounds.getSouth().toFixed(4)},${bounds.getWest().toFixed(4)},${bounds.getNorth().toFixed(4)},${bounds.getEast().toFixed(4)}`;
  return cache.has(boundsStr);
};
var prefetchBuildingOutlines = async (bounds) => {
  try {
    await fetchBuildingOutlines(bounds);
  } catch (error) {
  }
};

// src/utils/geometry.ts
var import_leaflet2 = __toESM(require("leaflet"));
var geoJsonToLatLng = (coordinates, geometryType) => {
  if (geometryType === "Polygon" && Array.isArray(coordinates[0]) && Array.isArray(coordinates[0][0])) {
    const ring = coordinates;
    return ring[0].map((coord) => import_leaflet2.default.latLng(coord[1], coord[0]));
  }
  if (geometryType === "LineString" && Array.isArray(coordinates[0]) && typeof coordinates[0][0] === "number") {
    const line = coordinates;
    return line.map((coord) => import_leaflet2.default.latLng(coord[1], coord[0]));
  }
  if (geometryType === "Point" && typeof coordinates[0] === "number") {
    const point = coordinates;
    return [import_leaflet2.default.latLng(point[1], point[0])];
  }
  return [];
};
var latLngToGeoJson = (latlngs, geometryType) => {
  const coords = latlngs.map((latlng) => [latlng.lng, latlng.lat]);
  if (geometryType === "Polygon") {
    const closedCoords = [...coords];
    if (coords.length > 0 && (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1])) {
      closedCoords.push(coords[0]);
    }
    return [closedCoords];
  }
  return coords;
};
var closestPointOnSegment = (point, segmentStart, segmentEnd) => {
  const map = import_leaflet2.default.CRS.EPSG3857;
  const p = map.project(point);
  const a = map.project(segmentStart);
  const b = map.project(segmentEnd);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (dx === 0 && dy === 0) {
    const closestPoint2 = segmentStart;
    return {
      point: closestPoint2,
      distance: point.distanceTo(closestPoint2)
    };
  }
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
  const closestProjected = import_leaflet2.default.point(a.x + t * dx, a.y + t * dy);
  const closestPoint = map.unproject(closestProjected);
  return {
    point: closestPoint,
    distance: point.distanceTo(closestPoint)
  };
};
var arePointsEqual = (point1, point2, tolerance = 0.1) => {
  return point1.distanceTo(point2) <= tolerance;
};
var simplifyPolygon = (latlngs, tolerance = 1) => {
  if (latlngs.length <= 2) return latlngs;
  const douglasPeucker = (points, epsilon) => {
    if (points.length <= 2) return points;
    let maxDistance = 0;
    let maxIndex = 0;
    for (let i = 1; i < points.length - 1; i++) {
      const { distance } = closestPointOnSegment(points[i], points[0], points[points.length - 1]);
      if (distance > maxDistance) {
        maxDistance = distance;
        maxIndex = i;
      }
    }
    if (maxDistance > epsilon) {
      const leftPart = douglasPeucker(points.slice(0, maxIndex + 1), epsilon);
      const rightPart = douglasPeucker(points.slice(maxIndex), epsilon);
      return [...leftPart.slice(0, -1), ...rightPart];
    }
    return [points[0], points[points.length - 1]];
  };
  return douglasPeucker(latlngs, tolerance);
};
var calculateBearing = (point1, point2) => {
  const lat1 = point1.lat * Math.PI / 180;
  const lat2 = point2.lat * Math.PI / 180;
  const deltaLng = (point2.lng - point1.lng) * Math.PI / 180;
  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
};
var extractOSMGeometry = (feature) => {
  const { geometry } = feature;
  const results = [];
  if (geometry.type === "Polygon") {
    const coords = geometry.coordinates;
    coords.forEach((ring) => {
      const latlngs = ring.map((coord) => import_leaflet2.default.latLng(coord[1], coord[0]));
      results.push(latlngs);
    });
  } else if (geometry.type === "MultiPolygon") {
    const coords = geometry.coordinates;
    coords.forEach((polygon) => {
      polygon.forEach((ring) => {
        const latlngs = ring.map((coord) => import_leaflet2.default.latLng(coord[1], coord[0]));
        results.push(latlngs);
      });
    });
  }
  return results;
};

// src/hooks/useGeometrySnap.ts
var import_constants2 = require("@layera/constants");
var useGeometrySnap = (isEnabled = true) => {
  const map = (0, import_react_leaflet.useMap)();
  const [osmData, setOsmData] = (0, import_react2.useState)(null);
  const [isSnappingEffective, setIsSnappingEffective] = (0, import_react2.useState)(false);
  const timeoutRef = (0, import_react2.useRef)(null);
  const snapEngine = (0, import_snap_interactions.useSnapEngine)({
    tolerance: import_constants2.CONFIG.geoDrawing.snapTolerance,
    enabledTypes: /* @__PURE__ */ new Set(["vertex", "edge", "center", "nearest"]),
    spatialIndexing: true
  });
  (0, import_react2.useEffect)(() => {
    const fetchData = async () => {
      const currentZoom = map.getZoom();
      if (!isEnabled || currentZoom < import_constants2.CONFIG.geoDrawing.minSnapZoom) {
        setOsmData(null);
        setIsSnappingEffective(false);
        snapEngine.clearGeometries();
        return;
      }
      setIsSnappingEffective(true);
      try {
        const geojson = await fetchBuildingOutlines(map.getBounds());
        setOsmData(geojson);
        const geometries = [];
        geojson.features.forEach((feature) => {
          const polygons = extractOSMGeometry(feature);
          geometries.push(...polygons);
        });
        snapEngine.setGeometries(geometries);
      } catch (error) {
        console.warn("Failed to fetch OSM data for snapping:", error);
        setOsmData(null);
        setIsSnappingEffective(false);
      }
    };
    const handleMoveEnd = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(fetchData, import_constants2.CONFIG.geoDrawing.debounceMs);
    };
    map.on("moveend zoomend", handleMoveEnd);
    fetchData();
    return () => {
      map.off("moveend zoomend", handleMoveEnd);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsSnappingEffective(false);
      snapEngine.clearGeometries();
    };
  }, [map, isEnabled, snapEngine]);
  const getSnappedPoint = (0, import_react2.useCallback)((latlng) => {
    if (!isEnabled || !isSnappingEffective || map.getZoom() < import_constants2.CONFIG.geoDrawing.minSnapZoom) {
      return {
        snappedLatLng: latlng,
        snapPoint: null,
        snapType: null,
        isSnapped: false
      };
    }
    return snapEngine.snapToPoint(latlng);
  }, [isEnabled, isSnappingEffective, map, snapEngine]);
  const snapToVertex = (0, import_react2.useCallback)((latlng) => {
    if (!isEnabled || !isSnappingEffective) {
      return { snappedLatLng: latlng, snapPoint: null, isSnapped: false };
    }
    return snapEngine.snapToVertex(latlng);
  }, [isEnabled, isSnappingEffective, snapEngine]);
  const snapToEdge = (0, import_react2.useCallback)((latlng) => {
    if (!isEnabled || !isSnappingEffective) {
      return { snappedLatLng: latlng, snapPoint: null, isSnapped: false };
    }
    return snapEngine.snapToEdge(latlng);
  }, [isEnabled, isSnappingEffective, snapEngine]);
  const setSnapTypes = (0, import_react2.useCallback)((types) => {
    snapEngine.setEnabledTypes(types);
  }, [snapEngine]);
  const setSnapTolerance = (0, import_react2.useCallback)((tolerance) => {
    snapEngine.setTolerance(tolerance);
  }, [snapEngine]);
  const getBuildingInfo = (0, import_react2.useCallback)((latlng) => {
    if (!osmData) return null;
    for (const feature of osmData.features) {
      const polygons = extractOSMGeometry(feature);
      for (const polygon of polygons) {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          if (polygon[i].lat > latlng.lat !== polygon[j].lat > latlng.lat && latlng.lng < (polygon[j].lng - polygon[i].lng) * (latlng.lat - polygon[i].lat) / (polygon[j].lat - polygon[i].lat) + polygon[i].lng) {
            inside = !inside;
          }
        }
        if (inside) {
          return feature.properties;
        }
      }
    }
    return null;
  }, [osmData]);
  return {
    // State
    isSnappingEffective,
    osmData,
    snapEngine,
    // Snap functions
    getSnappedPoint,
    snapToVertex,
    snapToEdge,
    // Configuration
    setSnapTypes,
    setSnapTolerance,
    // Utility
    getBuildingInfo,
    // Backward compatibility με το παλιό API
    snappingData: osmData
  };
};

// src/components/MeasurementControls.tsx
var import_i18n3 = require("@layera/i18n");
var import_buttons = require("@layera/buttons");
var import_cards = require("@layera/cards");
var import_typography = require("@layera/typography");
var import_layout = require("@layera/layout");
var import_icons = require("@layera/icons");
var import_jsx_runtime = require("react/jsx-runtime");
var MeasurementControls = ({
  mode,
  distance,
  area,
  onModeChange,
  onReset,
  onFinish,
  onCancel,
  isDrawing,
  canFinish,
  displayValue
}) => {
  const { t } = (0, import_i18n3.useLayeraTranslation)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_cards.Card, { variant: "floating", className: "min-w-[200px]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_typography.Typography, { variant: "h6", className: "text-center mb-3", children: t("geo-drawing.measurement-title") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_layout.Layout, { direction: "horizontal", spacing: "sm", className: "mb-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_buttons.Button,
        {
          variant: mode === "distance" ? "primary" : "secondary",
          size: "sm",
          onClick: () => onModeChange("distance"),
          disabled: isDrawing,
          className: "flex-1",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icons.Rule, { className: "w-4 h-4 mr-1" }),
            t("geo-drawing.modes.distance")
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_buttons.Button,
        {
          variant: mode === "area" ? "primary" : "secondary",
          size: "sm",
          onClick: () => onModeChange("area"),
          disabled: isDrawing,
          className: "flex-1",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icons.Square, { className: "w-4 h-4 mr-1" }),
            t("geo-drawing.modes.area")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_layout.Layout, { direction: "horizontal", spacing: "sm", className: "mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_buttons.Button,
      {
        variant: mode === "point" ? "primary" : "secondary",
        size: "sm",
        onClick: () => onModeChange("point"),
        disabled: isDrawing,
        className: "flex-1",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icons.MapPin, { className: "w-4 h-4 mr-1" }),
          t("geo-drawing.modes.point")
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_cards.Card, { variant: "inner", className: "mb-3 p-2 min-h-[60px] flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_typography.Typography, { variant: "body", className: "text-center", children: displayValue || (mode === "distance" ? `${t("geo-drawing.labels.distance")}: ${distance.toFixed(2)} m` : mode === "area" ? `${t("geo-drawing.labels.area")}: ${area.toFixed(2)} m\xB2` : t("geo-drawing.labels.select-point")) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_layout.Layout, { direction: "vertical", spacing: "sm", children: [
      isDrawing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_layout.Layout, { direction: "horizontal", spacing: "sm", children: [
        canFinish && onFinish && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          import_buttons.Button,
          {
            variant: "success",
            size: "sm",
            onClick: onFinish,
            className: "flex-1",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icons.Check, { className: "w-4 h-4 mr-1" }),
              t("geo-drawing.actions.finish")
            ]
          }
        ),
        onCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          import_buttons.Button,
          {
            variant: "secondary",
            size: "sm",
            onClick: onCancel,
            className: "flex-1",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icons.X, { className: "w-4 h-4 mr-1" }),
              t("geo-drawing.actions.cancel")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_buttons.Button,
        {
          variant: "danger",
          size: "sm",
          onClick: onReset,
          className: "w-full",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icons.Trash, { className: "w-4 h-4 mr-1" }),
            t("geo-drawing.actions.clear")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_cards.Card, { variant: "inner", className: "mt-3 p-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_typography.Typography, { variant: "caption", className: "text-center leading-tight", children: isDrawing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      t("geo-drawing.instructions.click-add"),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
      mode !== "point" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        t("geo-drawing.instructions.double-click-finish"),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {})
      ] }),
      t("geo-drawing.instructions.esc-cancel")
    ] }) : t("geo-drawing.instructions.select-mode") }) })
  ] });
};

// src/components/MeasurementCanvas.tsx
var import_react3 = require("react");
var import_react_leaflet2 = require("react-leaflet");
var import_theme_switcher = require("@layera/theme-switcher");
var import_jsx_runtime2 = require("react/jsx-runtime");
var MeasurementCanvas = ({
  mode,
  enableSnapping = true,
  onMeasurementChange,
  className
}) => {
  const { theme } = (0, import_theme_switcher.useTheme)();
  const {
    points,
    state,
    addPoint,
    finishMeasurement,
    cancelMeasurement,
    changeMeasurementMode,
    currentResult
  } = useMeasurement();
  const {
    getSnappedPoint,
    isSnappingEffective
  } = useGeometrySnap(enableSnapping);
  (0, import_react3.useEffect)(() => {
    changeMeasurementMode(mode);
  }, [mode, changeMeasurementMode]);
  (0, import_react3.useEffect)(() => {
    if (currentResult && onMeasurementChange) {
      onMeasurementChange(currentResult);
    }
  }, [currentResult, onMeasurementChange]);
  const mapEvents = (0, import_react_leaflet2.useMapEvents)({
    click: (0, import_react3.useCallback)((e) => {
      if (state === "finished") return;
      let latlng = e.latlng;
      let snapped = false;
      let snapResult;
      if (enableSnapping && isSnappingEffective) {
        const result = getSnappedPoint(e.latlng);
        if (result.isSnapped && result.snappedLatLng) {
          latlng = result.snappedLatLng;
          snapped = true;
          snapResult = {
            snapPoint: result.snapPoint,
            snapType: result.snapType
          };
        }
      }
      const interactionEvent = {
        type: "click",
        latlng,
        originalEvent: e.originalEvent,
        snapped,
        snapResult
      };
      addPoint(latlng);
    }, [state, enableSnapping, isSnappingEffective, getSnappedPoint, addPoint]),
    dblclick: (0, import_react3.useCallback)((e) => {
      e.originalEvent.preventDefault();
      e.originalEvent.stopPropagation();
      if (state === "drawing" && mode !== "point") {
        finishMeasurement();
      }
    }, [state, mode, finishMeasurement]),
    keydown: (0, import_react3.useCallback)((e) => {
      if (e.originalEvent.key === "Escape" && state === "drawing") {
        cancelMeasurement();
      }
    }, [state, cancelMeasurement])
  });
  const getColors = (0, import_react3.useCallback)(() => {
    const isDark = theme === "dark";
    return {
      line: isDark ? "#60a5fa" : "#3b82f6",
      fill: isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(59, 130, 246, 0.2)",
      point: isDark ? "#f59e0b" : "#d97706",
      pointBorder: isDark ? "#1f2937" : "#ffffff"
    };
  }, [theme]);
  const colors = getColors();
  const renderGeometry = () => {
    if (points.length === 0) return null;
    const latlngs = points.map((p) => p.latlng);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      points.map((point, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_react_leaflet2.CircleMarker,
        {
          center: point.latlng,
          radius: 6,
          pathOptions: {
            color: colors.pointBorder,
            fillColor: colors.point,
            fillOpacity: 1,
            weight: 2
          }
        },
        point.id
      )),
      (mode === "distance" || mode === "area") && latlngs.length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_react_leaflet2.Polyline,
        {
          positions: latlngs,
          pathOptions: {
            color: colors.line,
            weight: 3,
            opacity: 0.8,
            dashArray: state === "drawing" ? "5, 5" : void 0
          }
        }
      ),
      mode === "area" && latlngs.length >= 3 && state === "finished" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_react_leaflet2.Polygon,
        {
          positions: latlngs,
          pathOptions: {
            color: colors.line,
            fillColor: colors.fill,
            fillOpacity: 0.3,
            weight: 2
          }
        }
      )
    ] });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className, children: renderGeometry() });
};

// src/components/GeometryRenderer.tsx
var import_react4 = __toESM(require("react"));
var import_react_leaflet3 = require("react-leaflet");
var import_theme_switcher2 = require("@layera/theme-switcher");
var import_typography2 = require("@layera/typography");
var import_i18n4 = require("@layera/i18n");
var import_jsx_runtime3 = require("react/jsx-runtime");
var GeometryRenderer = ({
  measurements = [],
  osmFeatures = [],
  showOSMBuildings = true,
  showMeasurements = true,
  onMeasurementClick,
  onBuildingClick
}) => {
  const { theme } = (0, import_theme_switcher2.useTheme)();
  const { t } = (0, import_i18n4.useLayeraTranslation)();
  const { formatDistanceWithLabels, formatAreaWithLabels } = useMeasurementFormatter();
  const colors = (0, import_react4.useMemo)(() => {
    const isDark = theme === "dark";
    return {
      // Measurement colors
      measurementLine: isDark ? "#10b981" : "#059669",
      measurementFill: isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(5, 150, 105, 0.2)",
      measurementPoint: isDark ? "#f59e0b" : "#d97706",
      // OSM building colors
      buildingLine: isDark ? "#6b7280" : "#9ca3af",
      buildingFill: isDark ? "rgba(107, 114, 128, 0.1)" : "rgba(156, 163, 175, 0.1)",
      buildingHover: isDark ? "#374151" : "#d1d5db",
      // Border colors
      border: isDark ? "#1f2937" : "#ffffff"
    };
  }, [theme]);
  const renderOSMBuildings = () => {
    if (!showOSMBuildings || osmFeatures.length === 0) return null;
    return osmFeatures.map((feature, index) => {
      const polygons = extractOSMGeometry(feature);
      return polygons.map((polygon, polygonIndex) => {
        const key = `building-${index}-${polygonIndex}`;
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_react_leaflet3.Polygon,
          {
            positions: polygon,
            pathOptions: {
              color: colors.buildingLine,
              fillColor: colors.buildingFill,
              fillOpacity: 0.1,
              weight: 1,
              opacity: 0.6
            },
            eventHandlers: {
              click: () => onBuildingClick?.(feature),
              mouseover: (e) => {
                e.target.setStyle({
                  fillColor: colors.buildingHover,
                  fillOpacity: 0.3
                });
              },
              mouseout: (e) => {
                e.target.setStyle({
                  fillColor: colors.buildingFill,
                  fillOpacity: 0.1
                });
              }
            },
            children: feature.properties.name && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_leaflet3.Popup, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography2.Typography, { variant: "subtitle", className: "font-semibold", children: feature.properties.name }),
              feature.properties.building && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_typography2.Typography, { variant: "caption", className: "text-gray-600", children: [
                t("geo-drawing.building-type"),
                ": ",
                feature.properties.building
              ] }),
              feature.properties["addr:street"] && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_typography2.Typography, { variant: "caption", className: "text-gray-600", children: [
                feature.properties["addr:street"],
                " ",
                feature.properties["addr:housenumber"]
              ] })
            ] }) })
          },
          key
        );
      });
    });
  };
  const renderMeasurements = () => {
    if (!showMeasurements || measurements.length === 0) return null;
    return measurements.map((measurement) => {
      const latlngs = measurement.points.map((p) => p.latlng);
      const key = `measurement-${measurement.timestamp}`;
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react4.default.Fragment, { children: [
        measurement.points.map((point, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_react_leaflet3.CircleMarker,
          {
            center: point.latlng,
            radius: 5,
            pathOptions: {
              color: colors.border,
              fillColor: colors.measurementPoint,
              fillOpacity: 1,
              weight: 2
            },
            eventHandlers: {
              click: () => onMeasurementClick?.(measurement)
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_leaflet3.Popup, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography2.Typography, { variant: "subtitle", className: "font-semibold", children: t("geo-drawing.point-info", { index: index + 1 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_typography2.Typography, { variant: "caption", children: [
                point.latlng.lat.toFixed(6),
                ", ",
                point.latlng.lng.toFixed(6)
              ] })
            ] }) })
          },
          `${key}-point-${index}`
        )),
        (measurement.type === "distance" || measurement.type === "area") && latlngs.length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_react_leaflet3.Polyline,
          {
            positions: latlngs,
            pathOptions: {
              color: colors.measurementLine,
              weight: 3,
              opacity: 0.8
            },
            eventHandlers: {
              click: () => onMeasurementClick?.(measurement)
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_leaflet3.Popup, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography2.Typography, { variant: "subtitle", className: "font-semibold", children: t(`geo-drawing.modes.${measurement.type}`) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography2.Typography, { variant: "body", children: measurement.displayValue }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography2.Typography, { variant: "caption", className: "text-gray-600", children: new Date(measurement.timestamp).toLocaleString() })
            ] }) })
          }
        ),
        measurement.type === "area" && latlngs.length >= 3 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_react_leaflet3.Polygon,
          {
            positions: latlngs,
            pathOptions: {
              color: colors.measurementLine,
              fillColor: colors.measurementFill,
              fillOpacity: 0.3,
              weight: 2
            },
            eventHandlers: {
              click: () => onMeasurementClick?.(measurement)
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_leaflet3.Popup, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography2.Typography, { variant: "subtitle", className: "font-semibold", children: t("geo-drawing.area-measurement") }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography2.Typography, { variant: "body", children: measurement.area && formatAreaWithLabels(measurement.area) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography2.Typography, { variant: "caption", className: "text-gray-600", children: t("geo-drawing.points-count", { count: measurement.points.length }) })
            ] }) })
          }
        )
      ] }, key);
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    renderOSMBuildings(),
    renderMeasurements()
  ] });
};

// src/index.ts
var GEO_DRAWING_CONSTANTS = {
  DEFAULT_SNAP_TOLERANCE: 15,
  MIN_SNAP_ZOOM: 16,
  DEBOUNCE_MS: 500,
  REQUEST_TIMEOUT: 3e4
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GEO_DRAWING_CONSTANTS,
  GeometryRenderer,
  MeasurementCanvas,
  MeasurementControls,
  arePointsEqual,
  calculateBearing,
  calculateBounds,
  calculateDistance,
  calculatePerimeter,
  calculatePointDistance,
  calculatePolygonCenter,
  calculateProjectedArea,
  clearOSMCache,
  closestPointOnSegment,
  extractOSMGeometry,
  fetchBuildingOutlines,
  formatArea,
  formatBearing,
  formatCoordinatesBySystem,
  formatDistance,
  geoJsonToLatLng,
  getCacheSize,
  isBoundsCached,
  isPointInPolygon,
  latLngToGeoJson,
  prefetchBuildingOutlines,
  simplifyPolygon,
  useGeometrySnap,
  useMeasurement,
  useMeasurementFormatter
});
//# sourceMappingURL=index.js.map