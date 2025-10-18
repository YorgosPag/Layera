import { useState, useEffect, useCallback, useRef } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { fetchBuildingOutlines } from '../services/osmService';
import { GeoJSONFeatureCollection } from '@geo-platform/shared';
import { useUiContext } from '../context/UiContext';

const SNAP_THRESHOLD_PX = 15; // Snapping distance in pixels
const MIN_SNAP_ZOOM = 16; // Only fetch data at or above this zoom level

export type SnapResultType = 'vertex' | 'edge' | null;

/**
 * The return type for the snapping calculation function.
 */
export interface SnapResult {
    /** The final calculated LatLng, either snapped or the original. */
    snappedLatLng: L.LatLng;
    /** The exact point on a building outline that the snap occurred on. Null if no snap. */
    snapPoint: L.LatLng | null;
    /** The type of geometry feature the snap occurred on. */
    snapType: SnapResultType;
}

/**
 * A custom hook that provides snapping functionality to building outlines.
 * @param isEnabled - A boolean to enable or disable the snapping feature.
 * @returns An object containing the snapping logic function and the fetched GeoJSON data.
 */
export const useSnapping = (isEnabled: boolean) => {
    const map = useMap();
    const { actions } = useUiContext();
    const [geojson, setGeojson] = useState<GeoJSONFeatureCollection | null>(null);
    const timeoutRef = useRef<number | null>(null);

    // Effect to fetch OSM data when map movement stops
    useEffect(() => {
        const fetchData = () => {
            const currentZoom = map.getZoom();
            if (!isEnabled || currentZoom < MIN_SNAP_ZOOM) {
                setGeojson(null);
                actions.setSnappingEffective(false);
                return;
            }
            
            actions.setSnappingEffective(true);
            fetchBuildingOutlines(map.getBounds()).then(setGeojson);
        };

        const handleMoveEnd = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            // Debounce the fetch request to avoid spamming the API
            timeoutRef.current = window.setTimeout(fetchData, 500);
        };

        map.on('moveend zoomend', handleMoveEnd);
        fetchData(); // Initial check/fetch for the current view

        return () => {
            map.off('moveend zoomend', handleMoveEnd);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            // Ensure snapping state is reset when the component unmounts or effect re-runs
            actions.setSnappingEffective(false);
        };
    }, [map, isEnabled, actions]);

    /**
     * Calculates the closest snap point (vertex or edge) to a given LatLng, prioritizing vertices.
     * @param latlng - The original LatLng of the cursor.
     * @returns A SnapResult object with the snapped coordinates.
     */
    const getSnappedPoint = useCallback((latlng: L.LatLng): SnapResult => {
        if (!isEnabled || !geojson || map.getZoom() < MIN_SNAP_ZOOM) {
            return { snappedLatLng: latlng, snapPoint: null, snapType: null };
        }

        const mousePoint = map.latLngToLayerPoint(latlng);
        
        let minVertexDistSq = Infinity;
        let closestVertexPoint: L.Point | null = null;

        let minEdgeDistSq = Infinity;
        let closestEdgePoint: L.Point | null = null;

        // Helper function to process a single polygon ring
        const processRing = (ring: [number, number][]) => {
            const points = ring.map(coord => map.latLngToLayerPoint(L.latLng(coord[1], coord[0])));
            
            for (let i = 0; i < points.length; i++) {
                const p1 = points[i];
                const p2 = points[(i + 1) % points.length];

                // Pass 1: Check for closest vertex
                const distToVertexSq = mousePoint.distanceTo(p1);
                if (distToVertexSq < minVertexDistSq) {
                    minVertexDistSq = distToVertexSq;
                    closestVertexPoint = p1;
                }

                // Pass 2: Check for closest edge
                const snappedToSegment = L.LineUtil.closestPointOnSegment(mousePoint, p1, p2);
                if (snappedToSegment) {
                    const distToSegmentSq = mousePoint.distanceTo(snappedToSegment);
                    if (distToSegmentSq < minEdgeDistSq) {
                        minEdgeDistSq = distToSegmentSq;
                        closestEdgePoint = snappedToSegment;
                    }
                }
            }
        };

        geojson.features.forEach(feature => {
            if (feature.geometry.type === 'Polygon') {
                // GeoJSON Polygon coordinates are Array<Array<Array<number>>> (a list of rings)
                feature.geometry.coordinates.forEach(processRing);
            } else if (feature.geometry.type === 'MultiPolygon') {
                // GeoJSON MultiPolygon coordinates are Array<Array<Array<Array<number>>>> (a list of polygons)
                feature.geometry.coordinates.forEach(polygon => {
                    polygon.forEach(processRing);
                });
            }
        });

        // --- Priority Logic ---
        // 1. Prioritize vertices. If a vertex is within the snap threshold, use it regardless of edges.
        if (closestVertexPoint && minVertexDistSq < SNAP_THRESHOLD_PX * SNAP_THRESHOLD_PX) {
            const snappedLatLng = map.layerPointToLatLng(closestVertexPoint);
            return { snappedLatLng: snappedLatLng, snapPoint: snappedLatLng, snapType: 'vertex' };
        }

        // 2. If no vertex was close enough, check for edges.
        if (closestEdgePoint && minEdgeDistSq < SNAP_THRESHOLD_PX * SNAP_THRESHOLD_PX) {
            const snappedLatLng = map.layerPointToLatLng(closestEdgePoint);
            return { snappedLatLng: snappedLatLng, snapPoint: snappedLatLng, snapType: 'edge' };
        }

        // 3. If nothing is close enough, return the original point.
        return { snappedLatLng: latlng, snapPoint: null, snapType: null };
    }, [isEnabled, geojson, map]);

    return { getSnappedPoint, snappingData: geojson };
};
