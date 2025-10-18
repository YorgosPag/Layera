/**
 * Formats a coordinate number into a string with a direction (N/S/E/W).
 * @param coord The latitude or longitude value.
 * @param isLat True if the coordinate is latitude, false for longitude.
 * @param decimals The number of decimal places to display.
 * @returns A formatted string like "38.247° N".
 */
export const formatCoord = (coord: number, isLat: boolean, decimals: number = 3): string => {
    const direction = isLat ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W');
    return `${Math.abs(coord).toFixed(decimals)}° ${direction}`;
};

/**
 * Formats a distance in meters into a readable string, switching to kilometers for large distances.
 * @param distance The distance in meters.
 * @returns A formatted string like "500 m" or "1.2 km".
 */
export const formatDistance = (distance: number): string => {
    if (distance >= 1000) {
        return `${(distance / 1000).toFixed(1)} km`;
    }
    return `${Math.round(distance)} m`;
};
