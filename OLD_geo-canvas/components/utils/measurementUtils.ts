import L from 'leaflet';

/**
 * Formats a distance in meters into a readable string, switching to kilometers for large distances.
 * @param meters The distance in meters.
 * @param decimals The number of decimal places to show.
 * @returns A formatted string like "500.00 m" or "1.20 km".
 */
export const formatDistance = (meters: number, decimals: number = 2): string => {
    if (meters === 0) return '0 m';
    if (meters >= 1000) {
        return `${(meters / 1000).toFixed(decimals)} km`;
    }
    return `${meters.toFixed(decimals)} m`;
};

/**
 * Formats an area in square meters into a readable string, switching to hectares or square kilometers.
 * @param sqMeters The area in square meters.
 * @returns A formatted string like "500.00 m²" or "1.20 ha".
 */
export const formatArea = (sqMeters: number): string => {
    if (sqMeters === 0) return '0 m²';
    if (sqMeters >= 1000000) {
        return `${(sqMeters / 1000000).toFixed(2)} km²`;
    }
    if (sqMeters >= 10000) {
        return `${(sqMeters / 10000).toFixed(2)} ha`;
    }
    return `${sqMeters.toFixed(2)} m²`;
};

/**
 * Calculates the area of a polygon using the Shoelace formula on projected coordinates.
 * @param latlngs An array of L.LatLng points for the polygon.
 * @returns The calculated area in square meters.
 */
export const calculateProjectedArea = (latlngs: L.LatLng[]): number => {
    if (latlngs.length < 3) return 0;
    
    // Project points to a cartesian plane (meters) using Web Mercator projection
    const map = L.CRS.EPSG3857;
    const points = latlngs.map(latlng => map.project(latlng));
    
    let area = 0;
    const n = points.length;
    for (let i = 0; i < n; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % n];
        area += p1.x * p2.y - p2.x * p1.y;
    }

    return Math.abs(area / 2.0);
};

/**
 * Calculates the total path distance for a series of points.
 * @param latlngs An array of L.LatLng points.
 * @returns The total distance in meters.
 */
export const calculateDistance = (latlngs: L.LatLng[]): number => {
     if (latlngs.length < 2) {
        return 0;
    }

    let totalDistance = 0;
    for (let i = 0; i < latlngs.length - 1; i++) {
        totalDistance += latlngs[i].distanceTo(latlngs[i+1]);
    }
    return totalDistance;
}