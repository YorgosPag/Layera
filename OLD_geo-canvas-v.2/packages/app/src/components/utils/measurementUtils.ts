import L from 'leaflet';

export type DistanceUnit = 'm' | 'km' | 'ft' | 'mi';
export type AreaUnit = 'm2' | 'str' | 'ha' | 'km2' | 'ft2' | 'ac';

export const DISTANCE_UNITS_INFO: Record<DistanceUnit, { factor: number; label: string }> = {
    m: { factor: 1, label: 'm' },
    km: { factor: 0.001, label: 'km' },
    ft: { factor: 3.28084, label: 'ft' },
    mi: { factor: 0.000621371, label: 'mi' },
};

export const AREA_UNITS_INFO: Record<AreaUnit, { factor: number; label: string }> = {
    m2: { factor: 1, label: 'm²' },
    str: { factor: 0.001, label: 'στρ.' },
    ha: { factor: 0.0001, label: 'ha' },
    km2: { factor: 0.000001, label: 'km²' },
    ft2: { factor: 10.7639, label: 'ft²' },
    ac: { factor: 0.000247105, label: 'ac' },
};

/**
 * Formats a distance in meters into a readable string.
 * Can auto-switch units or use a specific unit if provided.
 * @param meters The distance in meters.
 * @param decimals The number of decimal places to show.
 * @param unit (Optional) The specific unit to format the distance in.
 * @returns A formatted string like "500 m" or "1.20 km".
 */
export const formatDistance = (meters: number, decimals: number = 2, unit?: DistanceUnit): string => {
    if (unit) {
        const { factor, label } = DISTANCE_UNITS_INFO[unit];
        const value = meters * factor;
        return `${value.toFixed(decimals)} ${label}`;
    }
    
    // Fallback to original auto-switching logic
    if (meters === 0) return '0 m';
    if (meters >= 1000) {
        return `${(meters / 1000).toFixed(decimals)} km`;
    }
    return `${meters.toFixed(decimals)} m`;
};

/**
 * Formats an area in square meters into a readable string.
 * Can use a specific unit, or falls back to an auto-switching logic.
 * @param sqMeters The area in square meters.
 * @param options Configuration for formatting, primarily a specific unit.
 * @returns A formatted string like "500.00 m²", "1.50 στρ.", or "1.20 km²".
 */
export const formatArea = (sqMeters: number, options?: { unit?: AreaUnit }): string => {
    // Unit-specific logic takes precedence
    if (options?.unit) {
        const { factor, label } = AREA_UNITS_INFO[options.unit];
        return `${(sqMeters * factor).toFixed(2)} ${label}`;
    }

    // Fallback to a single, consistent auto-switching logic
    if (sqMeters === 0) return '0 m²';

    // Default behavior (with stremmata)
    if (sqMeters >= 1000000) {
        return `${(sqMeters / 1000000).toFixed(2)} km²`;
    }
    if (sqMeters >= 1000) {
        return `${(sqMeters / 1000).toFixed(2)} στρ.`;
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