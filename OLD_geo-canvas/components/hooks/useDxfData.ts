
import { useState, useEffect, useMemo, useCallback } from 'react';
import L from 'leaflet';
import { ImportedLayer } from '../shared/types';
import { DxfData, DxfRenderInfo, DxfVertex, getDxfString, getDxfBounds } from '../utils/dxfUtils';

// DxfParser is loaded from a script tag in index.html
declare const DxfParser: any;

interface UseDxfDataResult {
    isLoading: boolean;
    dxfData: DxfData | null;
    dxfRenderInfo: DxfRenderInfo | null;
    bounds: L.LatLngBounds | null;
    project: (point: DxfVertex) => L.LatLng;
    error: string | null;
}

export const useDxfData = (layer: ImportedLayer): UseDxfDataResult => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dxfData, setDxfData] = useState<DxfData | null>(null);
    const [dxfRenderInfo, setDxfRenderInfo] = useState<DxfRenderInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const parseDxf = async () => {
            if (layer.type !== 'dxf' || !layer.data || !(layer.data instanceof ArrayBuffer)) {
                if (layer.type === 'dxf') {
                    setError("Invalid or missing data for this DXF layer.");
                }
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                const parser = new DxfParser();
                const text = await getDxfString(layer.data);
                const parsedDxf = parser.parseSync(text);

                if (!parsedDxf || !parsedDxf.entities) {
                    throw new Error("Invalid or empty DXF file.");
                }
                
                // The dxf parser sometimes nests entities inside a default block
                const entities = parsedDxf.entities;
                const blocks = parsedDxf.blocks || {};

                const fullDxfData = { ...parsedDxf, entities, blocks };
                
                const boundsInfo = getDxfBounds(fullDxfData);

                if (isMounted) {
                    setDxfData(fullDxfData);
                    setDxfRenderInfo(boundsInfo);
                }
            } catch (err) {
                console.error("Failed to parse DXF file:", err);
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "An unknown error occurred during DXF parsing.");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (layer.type === 'dxf') {
            parseDxf();
        } else {
            setIsLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, [layer.data, layer.type]);

    const project = useCallback((point: DxfVertex): L.LatLng => {
        if (!layer.bounds || !dxfRenderInfo || dxfRenderInfo.width === 0 || dxfRenderInfo.height === 0) {
            // Return a default value if we can't project, to avoid crashing
            return L.latLng(0, 0);
        }

        const { minX, minY, width, height } = dxfRenderInfo;
        const { x, y } = point;

        // Normalize coordinates from DXF space (0 to 1)
        const normalizedX = (x - minX) / width;
        // DXF Y-axis (upwards) should correspond to Latitude (northwards)
        const normalizedY = (y - minY) / height;

        const south = layer.bounds.getSouth();
        const west = layer.bounds.getWest();
        const latRange = layer.bounds.getNorth() - south;
        const lngRange = layer.bounds.getEast() - west;

        // FIX: Removed Y-axis inversion. DXF Y-axis and Latitude both increase upwards (north), so a direct mapping is correct.
        const lat = south + (normalizedY * latRange);
        const lng = west + (normalizedX * lngRange);

        return L.latLng(lat, lng);
    }, [layer.bounds, dxfRenderInfo]);

    return {
        isLoading,
        dxfData,
        dxfRenderInfo,
        bounds: layer.bounds,
        project,
        error,
    };
};
