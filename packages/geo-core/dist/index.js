// src/utils/coordinate.utils.ts
function latLngToPoint2D(latlng) {
  return {
    x: latlng.lng,
    y: latlng.lat
  };
}
function point2DToGeoPoint(point, elevation) {
  const result = {
    lat: point.y,
    lng: point.x
  };
  if (elevation !== void 0) {
    result.elevation = elevation;
  }
  return result;
}
function geoPointToLatLng(point) {
  return {
    lat: point.lat,
    lng: point.lng
  };
}
function calculateCenter(points) {
  if (points.length === 0) return null;
  let totalLat = 0;
  let totalLng = 0;
  for (const point of points) {
    totalLat += point.lat;
    totalLng += point.lng;
  }
  return {
    lat: totalLat / points.length,
    lng: totalLng / points.length
  };
}
function calculateBounds(points) {
  if (points.length === 0) return null;
  const firstPoint = points[0];
  if (!firstPoint) return null;
  let minLat = firstPoint.lat;
  let maxLat = firstPoint.lat;
  let minLng = firstPoint.lng;
  let maxLng = firstPoint.lng;
  for (const point of points) {
    if (point) {
      minLat = Math.min(minLat, point.lat);
      maxLat = Math.max(maxLat, point.lat);
      minLng = Math.min(minLng, point.lng);
      maxLng = Math.max(maxLng, point.lng);
    }
  }
  return {
    south: minLat,
    north: maxLat,
    west: minLng,
    east: maxLng
  };
}
function isPointInBounds(point, bounds) {
  return point.lat >= bounds.south && point.lat <= bounds.north && point.lng >= bounds.west && point.lng <= bounds.east;
}
function calculateDistance(point1, point2) {
  const R = 6371e3;
  const \u03C61 = point1.lat * Math.PI / 180;
  const \u03C62 = point2.lat * Math.PI / 180;
  const \u0394\u03C6 = (point2.lat - point1.lat) * Math.PI / 180;
  const \u0394\u03BB = (point2.lng - point1.lng) * Math.PI / 180;
  const a = Math.sin(\u0394\u03C6 / 2) * Math.sin(\u0394\u03C6 / 2) + Math.cos(\u03C61) * Math.cos(\u03C62) * Math.sin(\u0394\u03BB / 2) * Math.sin(\u0394\u03BB / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function calculatePolygonArea(points) {
  if (points.length < 3) return 0;
  const closedPoints = [...points];
  const firstPoint = closedPoints[0];
  const lastPoint = closedPoints[closedPoints.length - 1];
  if (firstPoint && lastPoint && (firstPoint.lat !== lastPoint.lat || firstPoint.lng !== lastPoint.lng)) {
    closedPoints.push(firstPoint);
  }
  let area = 0;
  for (let i = 0; i < closedPoints.length - 1; i++) {
    const p1 = closedPoints[i];
    const p2 = closedPoints[i + 1];
    if (p1 && p2) {
      area += (p2.lng - p1.lng) * (p2.lat + p1.lat);
    }
  }
  const earthRadius = 6371e3;
  const areaInSqMeters = Math.abs(area) * (Math.PI / 180) * (Math.PI / 180) * earthRadius * earthRadius / 2;
  return areaInSqMeters;
}

// src/index.ts
var GEO_CORE_VERSION = "1.0.0";
var GEO_CORE_NAME = "@layera/geo-core";

export { GEO_CORE_NAME, GEO_CORE_VERSION, calculateBounds, calculateCenter, calculateDistance, calculatePolygonArea, geoPointToLatLng, isPointInBounds, latLngToPoint2D, point2DToGeoPoint };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map