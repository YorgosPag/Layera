import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface UseLayerZoomProps {
    layerId: string;
    layerToZoom: string | null;
    bounds: L.LatLngBounds | null;
    onZoomComplete: () => void;
}

/**
 * A custom hook that fits the map to a given layer's bounds when requested.
 */
export const useLayerZoom = ({ layerId, layerToZoom, bounds, onZoomComplete }: UseLayerZoomProps) => {
    const map = useMap();

    useEffect(() => {
        if (layerToZoom === layerId && bounds) {
            map.fitBounds(bounds, { padding: [50, 50] });
            onZoomComplete();
        }
    }, [layerToZoom, layerId, bounds, map, onZoomComplete]);
};