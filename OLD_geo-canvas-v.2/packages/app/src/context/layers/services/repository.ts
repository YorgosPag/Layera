import L from 'leaflet';
import { ImportedLayer } from '@geo-platform/shared';

/**
 * Fetches the initial set of layers from the backend API.
 * @returns A promise that resolves to an array of ImportedLayer objects.
 */
export const fetchInitialLayers = async (): Promise<ImportedLayer[]> => {
    try {
        const response = await fetch('/api/listings');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // The server might send bounds as plain objects. We need to "hydrate" them
        // into Leaflet LatLngBounds objects.
        const hydratedLayers = data.map((layer: any): ImportedLayer => {
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
        });

        return hydratedLayers;
    } catch (error) {
        console.error("Failed to fetch initial layers from server:", error);
        // Return an empty array on error to prevent the app from crashing.
        return [];
    }
};
