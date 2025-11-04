import L from 'leaflet';

/**
 * Creates a Leaflet LatLngBounds object from a center point and dimensions in meters.
 * @param center The center of the bounds.
 * @param widthMeters The width in meters.
 * @param heightMeters The height in meters.
 * @returns A new L.LatLngBounds object.
 */
export const boundsFromMeters = (center: L.LatLng, widthMeters: number, heightMeters: number): L.LatLngBounds => {
    // These calculations provide an approximation of meters to degrees conversion.
    const latRad = center.lat * (Math.PI / 180);
    const metersPerDegreeLat = 111132.92 - 559.82 * Math.cos(2 * latRad) + 1.175 * Math.cos(4 * latRad);
    const metersPerDegreeLng = 111320 * Math.cos(latRad);

    const latSpan = heightMeters / metersPerDegreeLat;
    const lngSpan = widthMeters / metersPerDegreeLng;
    
    return L.latLngBounds(
        [center.lat - latSpan / 2, center.lng - lngSpan / 2],
        [center.lat + latSpan / 2, center.lng + lngSpan / 2]
    );
};

/**
 * Rotates a Leaflet Point around a center point by a given angle.
 * @param p The point to rotate.
 * @param center The center of rotation.
 * @param angleDeg The angle in degrees.
 * @returns The new, rotated L.Point.
 */
export const rotatePoint = (p: L.Point, center: L.Point, angleDeg: number): L.Point => {
    if (angleDeg === 0) return p;
    const angleRad = angleDeg * (Math.PI / 180);
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const translated = p.subtract(center);
    const rotated = new L.Point(
        translated.x * cos - translated.y * sin,
        translated.x * sin + translated.y * cos
    );
    return rotated.add(center);
};