import L from 'leaflet';
import { ImportedLayer } from '@geo-platform/shared';

/**
 * Hydrates the bounds of a layer from a plain JSON object to a Leaflet LatLngBounds object.
 * @param layer A layer object fetched from the server.
 * @returns The layer with a proper L.LatLngBounds object, if applicable.
 */
const hydrateBounds = (layer: any): ImportedLayer => {
    if (layer.bounds?._southWest && layer.bounds?._northEast) {
        return {
            ...layer,
            bounds: L.latLngBounds(
                L.latLng(layer.bounds._southWest.lat, layer.bounds._southWest.lng),
                L.latLng(layer.bounds._northEast.lat, layer.bounds._northEast.lng)
            )
        };
    }
    return layer;
};

/**
 * Fetches the initial list of layers/listings from the backend API.
 * @returns A promise that resolves to an array of ImportedLayer objects.
 */
export const fetchInitialLayers = async (): Promise<ImportedLayer[]> => {
    try {
        const response = await fetch('/api/listings');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Hydrate the plain JSON data into objects with Leaflet types
        return data.map(hydrateBounds);
    } catch (error) {
        console.error("Failed to fetch data from server:", error);
        return [];
    }
};
