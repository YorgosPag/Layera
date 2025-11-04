import L from 'leaflet';
import { GeoJSONFeatureCollection } from '@geo-platform/shared';

// Declare the osmtogeojson library loaded from a script tag in index.html
declare const osmtogeojson: any;

// Simple in-memory cache to avoid redundant API calls
const cache = new Map<string, GeoJSONFeatureCollection>();

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

/**
 * Fetches building outlines from the OpenStreetMap Overpass API for a given map bounds.
 * @param bounds The Leaflet LatLngBounds for which to fetch data.
 * @returns A promise that resolves with a GeoJSON FeatureCollection of building polygons.
 */
export const fetchBuildingOutlines = async (bounds: L.LatLngBounds): Promise<GeoJSONFeatureCollection> => {
    // Create a key for the cache, rounding coordinates to group close-by requests
    const boundsStr = `${bounds.getSouth().toFixed(4)},${bounds.getWest().toFixed(4)},${bounds.getNorth().toFixed(4)},${bounds.getEast().toFixed(4)}`;
    
    if (cache.has(boundsStr)) {
        return Promise.resolve(cache.get(boundsStr)!);
    }
    
    const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
    const query = `
        [out:json][timeout:30];
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
        const response = await fetch(OVERPASS_API_URL, {
            method: 'POST',
            body: `data=${encodeURIComponent(query)}`,
        });

        if (!response.ok) {
            // Don't pollute console for common errors like 429 Too Many Requests
            if (response.status !== 429 && response.status !== 504) {
                 console.error(`Overpass API error: ${response.statusText}`);
            }
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const osmData = await response.json();
        const geojson = osmtogeojson(osmData) as GeoJSONFeatureCollection;

        // FIX: Also include MultiPolygons, as complex buildings are often represented this way.
        // This is the primary fix for snapping appearing to not work in some areas.
        geojson.features = geojson.features.filter(f =>
            f.geometry && (f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon')
        );

        cache.set(boundsStr, geojson);
        return geojson;
    } catch (error) {
        // Silently fail to avoid interrupting user experience
        return { type: 'FeatureCollection', features: [] };
    }
};