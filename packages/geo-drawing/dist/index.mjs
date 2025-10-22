// src/hooks/useMeasurement.ts
import { useState, useCallback, useRef } from "react";
import { useLayeraTranslation as useLayeraTranslation2 } from "@layera/tolgee";

// src/utils/calculations.ts
import * as L from "leaflet";
var calculateProjectedArea = (latlngs) => {
  if (latlngs.length < 3) return 0;
  const map = L.CRS.EPSG3857;
  const points = latlngs.map((latlng) => map.project(latlng));
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    if (p1 && p2) {
      area += p1.x * p2.y - p2.x * p1.y;
    }
  }
  return Math.abs(area / 2);
};
var calculateDistance = (latlngs) => {
  if (latlngs.length < 2) {
    return 0;
  }
  let totalDistance = 0;
  for (let i = 0; i < latlngs.length - 1; i++) {
    const point1 = latlngs[i];
    const point2 = latlngs[i + 1];
    if (point1 && point2) {
      totalDistance += point1.distanceTo(point2);
    }
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
  for (const point2 of latlngs) {
    latSum += point2.lat;
    lngSum += point2.lng;
  }
  return L.latLng(latSum / latlngs.length, lngSum / latlngs.length);
};
var calculatePerimeter = (latlngs) => {
  if (latlngs.length < 2) return 0;
  const firstPoint = latlngs[0];
  if (!firstPoint) return 0;
  const closedPolygon = [...latlngs, firstPoint];
  return calculateDistance(closedPolygon);
};
var isPointInPolygon = (point2, polygon) => {
  let inside = false;
  const x = point2.lng;
  const y = point2.lat;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const pointI = polygon[i];
    const pointJ = polygon[j];
    if (!pointI || !pointJ) continue;
    const xi = pointI.lng;
    const yi = pointI.lat;
    const xj = pointJ.lng;
    const yj = pointJ.lat;
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
  return L.latLngBounds(latlngs);
};
var calculateCircleRadius = (center, circumferencePoint) => {
  return center.distanceTo(circumferencePoint);
};
var calculateCircleArea = (radius) => {
  if (radius <= 0) return 0;
  return Math.PI * radius * radius;
};
var calculateCircleCircumference = (radius) => {
  if (radius <= 0) return 0;
  return 2 * Math.PI * radius;
};
var calculateCircleDiameter = (radius) => {
  if (radius <= 0) return 0;
  return 2 * radius;
};
var calculateArcLength = (radius, angleRadians) => {
  if (radius <= 0 || angleRadians <= 0) return 0;
  return radius * angleRadians;
};
var calculateAngle = (point1, vertex, point2) => {
  const map = L.CRS.EPSG3857;
  const p1 = map.project(point1);
  const v = map.project(vertex);
  const p2 = map.project(point2);
  const vector1 = { x: p1.x - v.x, y: p1.y - v.y };
  const vector2 = { x: p2.x - v.x, y: p2.y - v.y };
  const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
  const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
  const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  const cosAngle = dotProduct / (magnitude1 * magnitude2);
  const clampedCos = Math.max(-1, Math.min(1, cosAngle));
  return Math.acos(clampedCos);
};
var detectCircleFromThreePoints = (point1, point2, point3) => {
  const map = L.CRS.EPSG3857;
  const p1 = map.project(point1);
  const p2 = map.project(point2);
  const p3 = map.project(point3);
  const area = Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2);
  if (area < 1e-10) {
    return null;
  }
  const d = 2 * (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y));
  if (Math.abs(d) < 1e-10) {
    return null;
  }
  const ux = ((p1.x * p1.x + p1.y * p1.y) * (p2.y - p3.y) + (p2.x * p2.x + p2.y * p2.y) * (p3.y - p1.y) + (p3.x * p3.x + p3.y * p3.y) * (p1.y - p2.y)) / d;
  const uy = ((p1.x * p1.x + p1.y * p1.y) * (p3.x - p2.x) + (p2.x * p2.x + p2.y * p2.y) * (p1.x - p3.x) + (p3.x * p3.x + p3.y * p3.y) * (p2.x - p1.x)) / d;
  const centerProjected = L.point(ux, uy);
  const center = map.unproject(centerProjected);
  const radius = center.distanceTo(point1);
  return { center, radius };
};

// src/utils/formatters.ts
import { useLayeraTranslation } from "@layera/tolgee";
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
  const { t } = useLayeraTranslation();
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
import { useNotifications } from "@layera/notifications";
var useMeasurement = () => {
  const { t } = useLayeraTranslation2();
  const { addNotification } = useNotifications();
  const { formatDistanceWithLabels, formatAreaWithLabels } = useMeasurementFormatter();
  const [mode, setMode] = useState("distance");
  const [state, setState] = useState("idle");
  const [points, setPoints] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);
  const [results, setResults] = useState([]);
  const pointIdCounter = useRef(0);
  const addPoint = useCallback((latlng) => {
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
  const finishMeasurement = useCallback(() => {
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
  const cancelMeasurement = useCallback(() => {
    setPoints([]);
    setCurrentResult(null);
    setState("idle");
  }, []);
  const resetAll = useCallback(() => {
    setPoints([]);
    setCurrentResult(null);
    setResults([]);
    setState("idle");
    pointIdCounter.current = 0;
  }, []);
  const changeMeasurementMode = useCallback((newMode) => {
    if (state === "drawing") {
      if (window.confirm(t("geo-drawing.confirm-mode-change"))) {
        cancelMeasurement();
        setMode(newMode);
      }
    } else {
      setMode(newMode);
    }
  }, [state, cancelMeasurement, t]);
  const removeLastPoint = useCallback(() => {
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
  const removeResult = useCallback((timestamp) => {
    setResults((prev) => prev.filter((result) => result.timestamp !== timestamp));
  }, []);
  const getCurrentDistance = useCallback(() => {
    if (points.length < 2) return 0;
    const latlngs = points.map((p) => p.latlng);
    return calculateDistance(latlngs);
  }, [points]);
  const getCurrentArea = useCallback(() => {
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
import { useState as useState2, useEffect, useCallback as useCallback2, useRef as useRef2 } from "react";
import { useMap } from "react-leaflet";

// src/services/osmService.ts
import {
  fetchBuildingOutlines,
  fetchAdministrativeBoundary,
  fetchBoundaryByAddressComponent,
  clearOSMCache,
  getCacheSize,
  isBoundsCached,
  prefetchBuildingOutlines
} from "@layera/geo-mapping";

// src/hooks/useGeometrySnap.ts
import { CONFIG } from "@layera/constants";
var useGeometrySnap = (isEnabled = true) => {
  const map = useMap();
  const [osmData, setOsmData] = useState2(null);
  const [isSnappingEffective, setIsSnappingEffective] = useState2(false);
  const timeoutRef = useRef2(null);
  useEffect(() => {
    const fetchData = async () => {
      const currentZoom = map.getZoom();
      if (!isEnabled || currentZoom < (CONFIG.geoDrawing?.minSnapZoom || 16)) {
        setOsmData(null);
        setIsSnappingEffective(false);
        return;
      }
      setIsSnappingEffective(true);
      try {
        const geojson = await fetchBuildingOutlines(map.getBounds());
        setOsmData(geojson);
      } catch (error) {
        console.error("Error fetching OSM data for snapping:", error);
        setOsmData(null);
        setIsSnappingEffective(false);
      }
    };
    const debouncedFetch = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(fetchData, CONFIG.geoDrawing?.debounceMs || 500);
    };
    map.on("moveend", debouncedFetch);
    map.on("zoomend", debouncedFetch);
    fetchData();
    return () => {
      map.off("moveend", debouncedFetch);
      map.off("zoomend", debouncedFetch);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [map, isEnabled]);
  const snapToGeometry = useCallback2(async (point2) => {
    return point2;
  }, []);
  const toggleSnapType = useCallback2((type, enabled) => {
    console.log(`Toggle snap type ${type}: ${enabled}`);
  }, []);
  const updateTolerance = useCallback2((tolerance) => {
    console.log(`Update tolerance: ${tolerance}`);
  }, []);
  return {
    // State
    isSnappingEffective,
    osmData,
    isSnapped: false,
    lastSnapResult: null,
    // Functions
    snapToGeometry,
    toggleSnapType,
    updateTolerance,
    // Placeholder values
    snapEngine: null,
    performanceMetrics: null
  };
};

// src/hooks/useDrawing.ts
import { useState as useState3, useCallback as useCallback3 } from "react";
function useDrawing(options = {}) {
  const {
    initialMode = "none",
    onAreaCreated,
    onAreaDeleted,
    onModeChanged
  } = options;
  const [drawingMode, setDrawingModeState] = useState3(initialMode);
  const [drawnAreas, setDrawnAreas] = useState3([]);
  const [isDrawing, setIsDrawing] = useState3(false);
  const setDrawingMode = useCallback3((mode) => {
    setDrawingModeState(mode);
    setIsDrawing(mode !== "none");
    onModeChanged?.(mode);
  }, [onModeChanged]);
  const addArea = useCallback3((area) => {
    setDrawnAreas((prev) => [...prev, area]);
    onAreaCreated?.(area);
  }, [onAreaCreated]);
  const removeArea = useCallback3((areaId) => {
    setDrawnAreas((prev) => prev.filter((area) => area.id !== areaId));
    onAreaDeleted?.(areaId);
  }, [onAreaDeleted]);
  const clearAreas = useCallback3(() => {
    setDrawnAreas([]);
  }, []);
  const toggleDrawing = useCallback3(() => {
    setDrawingMode(drawingMode === "none" ? "polygon" : "none");
  }, [drawingMode, setDrawingMode]);
  return {
    drawingMode,
    setDrawingMode,
    drawnAreas,
    addArea,
    removeArea,
    clearAreas,
    isDrawing,
    toggleDrawing
  };
}

// src/utils/geometryDetection.ts
var DETECTION_THRESHOLDS = {
  /** Tolerance για circle detection (percentage deviation from perfect circle) */
  CIRCLE_TOLERANCE: 0.05,
  // 5%
  /** Minimum points required για reliable circle detection */
  MIN_CIRCLE_POINTS: 3,
  /** Maximum points to consider για circle detection (performance) */
  MAX_CIRCLE_POINTS: 8,
  /** Tolerance για line detection (max deviation from straight line) */
  LINE_TOLERANCE: 5,
  // meters
  /** Tolerance για right angle detection */
  RIGHT_ANGLE_TOLERANCE: Math.PI / 36,
  // 5 degrees in radians
  /** Minimum distance between points to be considered significant */
  MIN_SIGNIFICANT_DISTANCE: 1
  // meters
};
var detectGeometry = (points) => {
  if (points.length < 2) {
    return { type: "unknown", properties: {} };
  }
  const latlngs = points.map((p) => p.latlng);
  if (points.length >= DETECTION_THRESHOLDS.MIN_CIRCLE_POINTS) {
    const circleResult = detectCircle(latlngs);
    if (circleResult) {
      return { type: "circle", properties: circleResult };
    }
  }
  if (points.length === 2) {
    return {
      type: "line",
      properties: {
        start: latlngs[0],
        end: latlngs[1],
        length: calculateDistance(latlngs)
      }
    };
  }
  if (points.length === 4 || points.length === 5) {
    const rectangleResult = detectRectangle(latlngs);
    if (rectangleResult) {
      return { type: "rectangle", properties: rectangleResult };
    }
  }
  if (points.length === 3 || points.length === 4) {
    const triangleResult = detectTriangle(latlngs.slice(0, 3));
    if (triangleResult) {
      return { type: "triangle", properties: triangleResult };
    }
  }
  return detectPolygon(latlngs);
};
var detectCircle = (points) => {
  if (points.length < DETECTION_THRESHOLDS.MIN_CIRCLE_POINTS) {
    return null;
  }
  const samplePoints = points.length > DETECTION_THRESHOLDS.MAX_CIRCLE_POINTS ? samplePointsEvenly(points, DETECTION_THRESHOLDS.MAX_CIRCLE_POINTS) : points;
  const circleFromThree = detectCircleFromThreePoints(
    samplePoints[0],
    samplePoints[1],
    samplePoints[2]
  );
  if (!circleFromThree) {
    return null;
  }
  const { center, radius } = circleFromThree;
  let totalDeviation = 0;
  let validPoints = 0;
  for (const point2 of samplePoints) {
    const distanceToCenter = calculateCircleRadius(center, point2);
    const deviation = Math.abs(distanceToCenter - radius) / radius;
    if (deviation <= DETECTION_THRESHOLDS.CIRCLE_TOLERANCE) {
      validPoints++;
    }
    totalDeviation += deviation;
  }
  const validRatio = validPoints / samplePoints.length;
  if (validRatio < 0.8) {
    return null;
  }
  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;
  const diameter = 2 * radius;
  return {
    center,
    radius,
    area,
    circumference,
    diameter
  };
};
var detectRectangle = (points) => {
  if (points.length !== 4 && points.length !== 5) {
    return null;
  }
  const corners = points.length === 5 ? points.slice(0, 4) : points;
  const angles = [];
  for (let i = 0; i < 4; i++) {
    const prev = corners[(i + 3) % 4];
    const current = corners[i];
    const next = corners[(i + 1) % 4];
    const angle = calculateAngle(prev, current, next);
    angles.push(angle);
  }
  const rightAngle = Math.PI / 2;
  const rightAngleCount = angles.filter(
    (angle) => Math.abs(angle - rightAngle) <= DETECTION_THRESHOLDS.RIGHT_ANGLE_TOLERANCE
  ).length;
  if (rightAngleCount < 3) {
    return null;
  }
  let area = 0;
  for (let i = 0; i < 4; i++) {
    const current = corners[i];
    const next = corners[(i + 1) % 4];
    area += current.lng * next.lat - next.lng * current.lat;
  }
  area = Math.abs(area) / 2;
  let perimeter = 0;
  for (let i = 0; i < 4; i++) {
    const current = corners[i];
    const next = corners[(i + 1) % 4];
    perimeter += calculateDistance([current, next]);
  }
  return {
    corners,
    area,
    perimeter
  };
};
var detectTriangle = (points) => {
  if (points.length < 3) {
    return null;
  }
  const vertices = points.slice(0, 3);
  const angles = [
    calculateAngle(vertices[2], vertices[0], vertices[1]),
    calculateAngle(vertices[0], vertices[1], vertices[2]),
    calculateAngle(vertices[1], vertices[2], vertices[0])
  ];
  const a = vertices[0];
  const b = vertices[1];
  const c = vertices[2];
  const area = Math.abs(
    (b.lat - a.lat) * (c.lng - a.lng) - (c.lat - a.lat) * (b.lng - a.lng)
  ) / 2;
  return {
    vertices,
    area,
    angles
  };
};
var detectPolygon = (points) => {
  if (points.length < 3) {
    return { type: "unknown", properties: {} };
  }
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const current = points[i];
    const next = points[(i + 1) % n];
    area += current.lng * next.lat - next.lng * current.lat;
  }
  area = Math.abs(area) / 2;
  let perimeter = 0;
  for (let i = 0; i < n; i++) {
    const current = points[i];
    const next = points[(i + 1) % n];
    perimeter += calculateDistance([current, next]);
  }
  return {
    type: "polygon",
    properties: {
      vertices: points,
      area,
      perimeter
    }
  };
};
var samplePointsEvenly = (points, targetCount) => {
  if (points.length <= targetCount) {
    return points;
  }
  const result = [];
  const step = points.length / targetCount;
  for (let i = 0; i < targetCount; i++) {
    const index = Math.floor(i * step);
    const point2 = points[index];
    if (point2) {
      result.push(point2);
    }
  }
  return result;
};
var suggestMeasurementMode = (detectedGeometry) => {
  switch (detectedGeometry.type) {
    case "circle":
      return "circle-area";
    case "line":
      return "distance";
    case "rectangle":
    case "triangle":
    case "polygon":
      return "area";
    case "arc":
      return "arc-length";
    default:
      return "point";
  }
};
var calculateDetectionConfidence = (points, detectedGeometry) => {
  if (points.length < 2) {
    return 0;
  }
  switch (detectedGeometry.type) {
    case "circle":
      return calculateCircleConfidence(points.map((p) => p.latlng), detectedGeometry.properties);
    case "line":
      return points.length === 2 ? 1 : 0.5;
    case "rectangle":
      return calculateRectangleConfidence(points.map((p) => p.latlng));
    case "triangle":
      return points.length === 3 ? 0.9 : 0.6;
    case "polygon":
      return 0.7;
    // Moderate confidence για general polygons
    default:
      return 0.1;
  }
};
var calculateCircleConfidence = (points, circle) => {
  let totalDeviation = 0;
  for (const point2 of points) {
    const distanceToCenter = calculateCircleRadius(circle.center, point2);
    const deviation = Math.abs(distanceToCenter - circle.radius) / circle.radius;
    totalDeviation += deviation;
  }
  const averageDeviation = totalDeviation / points.length;
  return Math.max(0, 1 - averageDeviation / DETECTION_THRESHOLDS.CIRCLE_TOLERANCE);
};
var calculateRectangleConfidence = (points) => {
  if (points.length !== 4 && points.length !== 5) {
    return 0;
  }
  const corners = points.length === 5 ? points.slice(0, 4) : points;
  const rightAngle = Math.PI / 2;
  let rightAngleCount = 0;
  for (let i = 0; i < 4; i++) {
    const prev = corners[(i + 3) % 4];
    const current = corners[i];
    const next = corners[(i + 1) % 4];
    const angle = calculateAngle(prev, current, next);
    if (Math.abs(angle - rightAngle) <= DETECTION_THRESHOLDS.RIGHT_ANGLE_TOLERANCE) {
      rightAngleCount++;
    }
  }
  return rightAngleCount / 4;
};

// src/utils/mapLabelIntegration.ts
import * as L2 from "leaflet";
var measurementToMapLabel = (measurement, options = {}) => {
  const {
    showUnits = true,
    locale = "el-GR",
    precision,
    customPosition
  } = options;
  const position = customPosition || calculateOptimalLabelPosition(measurement.points);
  const variant = getVariantForMeasurementType(measurement.type);
  const text = formatMeasurementForLabel(measurement, {
    showUnits,
    locale,
    precision: precision ?? void 0
  });
  return {
    position,
    text,
    variant,
    background: "semi-transparent",
    align: "center",
    clickable: true,
    priority: "normal"
  };
};
var geometryToMapLabels = (geometry, points, options = {}) => {
  const { showCoordinates = false } = options;
  const labels = [];
  switch (geometry.type) {
    case "circle":
      labels.push(...createCircleLabels(geometry.properties, options));
      break;
    case "rectangle":
      labels.push(...createRectangleLabels(geometry.properties, options));
      break;
    case "triangle":
      labels.push(...createTriangleLabels(geometry.properties, options));
      break;
    case "line":
      labels.push(createLineLabel(geometry.properties, options));
      break;
    case "polygon":
      labels.push(...createPolygonLabels(geometry.properties, options));
      break;
    default:
      if (showCoordinates) {
        labels.push(...createPointLabels(points, options));
      }
  }
  return labels;
};
var createCircleLabels = (circle, options) => {
  const labels = [];
  const { showDetails = true, locale = "el-GR" } = options;
  labels.push({
    position: circle.center,
    text: formatArea2(circle.area, locale),
    variant: "area",
    background: "semi-transparent",
    align: "center",
    clickable: true,
    priority: "high"
  });
  if (showDetails) {
    const radiusPosition = calculateRadiusLabelPosition(circle.center, circle.radius);
    labels.push({
      position: radiusPosition,
      text: `R: ${formatDistance2(circle.radius, locale)}`,
      variant: "distance",
      background: "semi-transparent",
      align: "center",
      clickable: false,
      priority: "normal"
    });
    const circumferencePosition = calculateCircumferenceLabelPosition(circle.center, circle.radius);
    labels.push({
      position: circumferencePosition,
      text: `C: ${formatDistance2(circle.circumference, locale)}`,
      variant: "info",
      background: "semi-transparent",
      align: "center",
      clickable: false,
      priority: "normal"
    });
  }
  return labels;
};
var createRectangleLabels = (rectangle, options) => {
  const labels = [];
  const { showDetails = true, locale = "el-GR" } = options;
  const center = calculatePolygonCenter2(rectangle.corners);
  labels.push({
    position: center,
    text: formatArea2(rectangle.area, locale),
    variant: "area",
    background: "semi-transparent",
    align: "center",
    clickable: true,
    priority: "high"
  });
  if (showDetails) {
    labels.push({
      position: calculatePerimeterLabelPosition(rectangle.corners),
      text: `P: ${formatDistance2(rectangle.perimeter, locale)}`,
      variant: "distance",
      background: "semi-transparent",
      align: "center",
      clickable: false,
      priority: "normal"
    });
    const sideLabels = calculateSideLengthLabels(rectangle.corners, locale);
    labels.push(...sideLabels);
  }
  return labels;
};
var createTriangleLabels = (triangle, options) => {
  const labels = [];
  const { showDetails = true, locale = "el-GR" } = options;
  const center = calculatePolygonCenter2(triangle.vertices);
  labels.push({
    position: center,
    text: formatArea2(triangle.area, locale),
    variant: "area",
    background: "semi-transparent",
    align: "center",
    clickable: true,
    priority: "high"
  });
  if (showDetails) {
    triangle.vertices.forEach((vertex, index) => {
      const angleDegrees = triangle.angles[index] * 180 / Math.PI;
      labels.push({
        position: vertex,
        text: `${angleDegrees.toFixed(1)}\xB0`,
        variant: "info",
        background: "semi-transparent",
        align: "center",
        clickable: false,
        priority: "normal"
      });
    });
  }
  return labels;
};
var createLineLabel = (line, options) => {
  const { locale = "el-GR" } = options;
  const midPoint = L2.latLng(
    (line.start.lat + line.end.lat) / 2,
    (line.start.lng + line.end.lng) / 2
  );
  return {
    position: midPoint,
    text: formatDistance2(line.length, locale),
    variant: "distance",
    background: "semi-transparent",
    align: "center",
    clickable: true,
    priority: "normal"
  };
};
var createPolygonLabels = (polygon, options) => {
  const labels = [];
  const { showDetails = true, locale = "el-GR" } = options;
  const center = calculatePolygonCenter2(polygon.vertices);
  labels.push({
    position: center,
    text: formatArea2(polygon.area, locale),
    variant: "area",
    background: "semi-transparent",
    align: "center",
    clickable: true,
    priority: "high"
  });
  if (showDetails) {
    labels.push({
      position: calculatePerimeterLabelPosition(polygon.vertices),
      text: `P: ${formatDistance2(polygon.perimeter, locale)}`,
      variant: "distance",
      background: "semi-transparent",
      align: "center",
      clickable: false,
      priority: "normal"
    });
  }
  return labels;
};
var createPointLabels = (points, options) => {
  const { locale: _locale = "el-GR" } = options;
  return points.map((point2, index) => ({
    position: point2.latlng,
    text: point2.label || `P${index + 1}`,
    variant: "info",
    background: "transparent",
    align: "center",
    clickable: true,
    priority: "normal"
  }));
};
var calculateOptimalLabelPosition = (points) => {
  if (points.length === 0) {
    return L2.latLng(0, 0);
  }
  const latlngs = points.map((p) => p.latlng);
  return calculatePolygonCenter2(latlngs);
};
var calculatePolygonCenter2 = (points) => {
  let latSum = 0;
  let lngSum = 0;
  for (const point2 of points) {
    latSum += point2.lat;
    lngSum += point2.lng;
  }
  return L2.latLng(latSum / points.length, lngSum / points.length);
};
var calculateRadiusLabelPosition = (center, radius) => {
  const bearing = Math.PI / 4;
  const distance = radius * 0.7;
  const lat = center.lat + distance / 111320 * Math.cos(bearing);
  const lng = center.lng + distance / (111320 * Math.cos(center.lat * Math.PI / 180)) * Math.sin(bearing);
  return L2.latLng(lat, lng);
};
var calculateCircumferenceLabelPosition = (center, radius) => {
  const bearing = 3 * Math.PI / 4;
  const distance = radius * 1.1;
  const lat = center.lat + distance / 111320 * Math.cos(bearing);
  const lng = center.lng + distance / (111320 * Math.cos(center.lat * Math.PI / 180)) * Math.sin(bearing);
  return L2.latLng(lat, lng);
};
var calculatePerimeterLabelPosition = (vertices) => {
  let longestEdge = { start: vertices[0], end: vertices[1], length: 0 };
  for (let i = 0; i < vertices.length; i++) {
    const start = vertices[i];
    const end = vertices[(i + 1) % vertices.length];
    const length = calculateDistance([start, end]);
    if (length > longestEdge.length) {
      longestEdge = { start, end, length };
    }
  }
  return L2.latLng(
    (longestEdge.start.lat + longestEdge.end.lat) / 2,
    (longestEdge.start.lng + longestEdge.end.lng) / 2
  );
};
var calculateSideLengthLabels = (corners, locale) => {
  const labels = [];
  for (let i = 0; i < corners.length; i++) {
    const start = corners[i];
    const end = corners[(i + 1) % corners.length];
    const length = calculateDistance([start, end]);
    const midPoint = L2.latLng(
      (start.lat + end.lat) / 2,
      (start.lng + end.lng) / 2
    );
    labels.push({
      position: midPoint,
      text: formatDistance2(length, locale),
      variant: "distance",
      background: "transparent",
      align: "center",
      clickable: false,
      priority: "normal"
    });
  }
  return labels;
};
var getVariantForMeasurementType = (type) => {
  switch (type) {
    case "area":
    case "circle-area":
      return "area";
    case "distance":
    case "circle-radius":
    case "circle-diameter":
    case "circle-circumference":
    case "arc-length":
      return "distance";
    case "angle":
      return "info";
    case "perimeter":
      return "distance";
    default:
      return "info";
  }
};
var formatMeasurementForLabel = (measurement, options) => {
  const { showUnits = true, locale = "el-GR", precision } = options;
  if (measurement.displayValue && showUnits) {
    return measurement.displayValue;
  }
  switch (measurement.type) {
    case "area":
    case "circle-area":
      return formatArea2(measurement.area || 0, locale, precision);
    case "distance":
      return formatDistance2(measurement.distance || 0, locale, precision);
    case "circle-radius":
      return formatDistance2(measurement.radius || 0, locale, precision);
    case "circle-circumference":
      return formatDistance2(measurement.circumference || 0, locale, precision);
    case "circle-diameter":
      return formatDistance2(measurement.diameter || 0, locale, precision);
    case "arc-length":
      return formatDistance2(measurement.arcLength || 0, locale, precision);
    case "angle":
      const degrees = (measurement.angle || 0) * 180 / Math.PI;
      return `${degrees.toFixed(precision || 1)}\xB0`;
    case "perimeter":
      return formatDistance2(measurement.perimeter || 0, locale, precision);
    default:
      return measurement.displayValue || "";
  }
};
var formatArea2 = (area, _locale, precision) => {
  if (area >= 1e6) {
    return `${(area / 1e6).toFixed(precision || 2)} km\xB2`;
  } else if (area >= 1e4) {
    return `${(area / 1e4).toFixed(precision || 1)} ha`;
  } else {
    return `${area.toFixed(precision || 0)} m\xB2`;
  }
};
var formatDistance2 = (distance, _locale, precision) => {
  if (distance >= 1e3) {
    return `${(distance / 1e3).toFixed(precision || 2)} km`;
  } else {
    return `${distance.toFixed(precision || 0)} m`;
  }
};

// src/index.ts
var GEO_DRAWING_CONSTANTS = {
  DEFAULT_SNAP_TOLERANCE: 15,
  MIN_SNAP_ZOOM: 16,
  DEBOUNCE_MS: 500,
  REQUEST_TIMEOUT: 3e4
};
export {
  GEO_DRAWING_CONSTANTS,
  calculateAngle,
  calculateArcLength,
  calculateBounds,
  calculateCircleArea,
  calculateCircleCircumference,
  calculateCircleDiameter,
  calculateCircleRadius,
  calculateDetectionConfidence,
  calculateDistance,
  calculatePerimeter,
  calculatePointDistance,
  calculatePolygonCenter,
  calculateProjectedArea,
  clearOSMCache,
  detectCircleFromThreePoints,
  detectGeometry,
  fetchAdministrativeBoundary,
  fetchBoundaryByAddressComponent,
  fetchBuildingOutlines,
  formatArea,
  formatBearing,
  formatCoordinatesBySystem,
  formatDistance,
  geometryToMapLabels,
  getCacheSize,
  isBoundsCached,
  isPointInPolygon,
  measurementToMapLabel,
  prefetchBuildingOutlines,
  suggestMeasurementMode,
  useDrawing,
  useGeometrySnap,
  useMeasurement,
  useMeasurementFormatter
};
//# sourceMappingURL=index.mjs.map