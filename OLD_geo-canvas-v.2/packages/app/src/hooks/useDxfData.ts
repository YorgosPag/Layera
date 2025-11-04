import { useState, useEffect, useCallback } from 'react';
import { ImportedLayer } from '@geo-platform/shared';
import { DxfData, DxfRenderInfo, getDxfBounds, getDxfString } from '../context/layers/services/dxf.service';

// DxfParser is loaded from a script tag in index.html
declare const DxfParser: any;

interface UseDxfDataResult {
    isLoading: boolean;
    dxfData: DxfData | null;
    dxfRenderInfo: DxfRenderInfo | null;
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

    return {
        isLoading,
        dxfData,
        dxfRenderInfo,
        error,
    };
};