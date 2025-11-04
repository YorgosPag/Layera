import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode, useEffect } from 'react';
import L from 'leaflet';
import { ImportedLayer, LayerType } from '@geo-platform/shared';
import { getDxfString, getDxfBounds } from '../components/utils/dxfUtils';

// DxfParser is loaded globally from a script tag
declare const DxfParser: any;


// Helper function to determine file aspect ratio and dimensions
const getFileInfo = async (file: File, buffer: ArrayBuffer): Promise<{ width: number, height: number, aspectRatio: number }> => {
    const fileType = file.name.split('.').pop()?.toLowerCase();

    if (fileType === 'dxf') {
        try {
            const parser = new DxfParser();
            const text = await getDxfString(buffer);
            const parsedDxf = parser.parseSync(text);
            if (!parsedDxf) return { width: 1, height: 1, aspectRatio: 1 };
            const { width, height } = getDxfBounds(parsedDxf);
            const aspectRatio = (height === 0 || !isFinite(width) || !isFinite(height)) ? 1 : width / height;
            return { width, height, aspectRatio };
        } catch (e) {
            console.error("Could not determine DXF info", e);
            return { width: 1, height: 1, aspectRatio: 1 };
        }
    } else { // Raster image
        return new Promise((resolve) => {
            const img = new Image();
            const url = URL.createObjectURL(file);
            img.onload = () => {
                const w = img.naturalWidth;
                const h = img.naturalHeight;
                const ratio = w / h;
                URL.revokeObjectURL(url);
                resolve({
                    width: w,
                    height: h,
                    aspectRatio: isNaN(ratio) || ratio === 0 ? 1 : ratio
                });
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                resolve({ width: 100, height: 100, aspectRatio: 1 }); // fallback
            };
            img.src = url;
        });
    }
};

// --- State & Actions Definitions ---

interface LayersState {
    layers: ImportedLayer[];
    movingLayerId: string | null;
    editingLayerId: string | null;
    layerToZoom: string | null;
    hasManuallyTransformed: boolean;
}

interface LayersActions {
    addLayer: (file: File, center: L.LatLng) => Promise<ImportedLayer>;
    addConstructedLayer: (layer: ImportedLayer) => void;
    removeLayer: (id: string, skipConfirm?: boolean) => void;
    updateLayer: (id: string, updates: Partial<ImportedLayer>) => void;
    reorderLayers: (layers: ImportedLayer[]) => void;
    toggleVisibility: (id: string) => void;
    updateOpacity: (id: string, opacity: number) => void;
    setMovingLayerId: (id: string | null) => void;
    zoomToLayer: (id: string | null) => void;
    toggleLayerBackground: (id: string) => void;
    startEditing: (layer: ImportedLayer) => void;
    stopEditing: (save: boolean) => void;
    updateEditingLayerBounds: (bounds: L.LatLngBounds) => void;
    updateEditingLayerRotation: (rotation: number) => void;
    applyScale: (conversionFactor: number) => void;
}

interface LayersContextType extends LayersState {
    editingLayer: ImportedLayer | null;
    tempEditingLayer: ImportedLayer | null;
    actions: LayersActions;
}

const LayersContext = createContext<LayersContextType | undefined>(undefined);

// --- Provider Implementation ---

export const LayersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<LayersState>({
        layers: [],
        movingLayerId: null,
        editingLayerId: null,
        layerToZoom: null,
        hasManuallyTransformed: false,
    });
    
    const [tempEditingLayer, setTempEditingLayer] = useState<ImportedLayer | null>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch('/api/listings');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                const hydratedLayers = data.map((layer: any) => {
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

                setState(s => ({ ...s, layers: hydratedLayers }));
            } catch (error) {
                console.error("Failed to fetch data from server:", error);
            }
        };

        fetchInitialData();
    }, []);

    const actions = useMemo<LayersActions>(() => ({
        addLayer: async (file: File, center: L.LatLng) => {
            const buffer = await file.arrayBuffer();
            const fileType = file.name.split('.').pop()?.toLowerCase();
            const layerType: LayerType = (fileType === 'dxf') ? 'dxf' : 'raster';

            const { width: intrinsicWidth, height: intrinsicHeight, aspectRatio } = await getFileInfo(file, buffer.slice(0));
            
            const longestSideMeters = 100;
            let widthMeters, heightMeters;

            if (aspectRatio >= 1) {
                widthMeters = longestSideMeters;
                heightMeters = longestSideMeters / aspectRatio;
            } else {
                heightMeters = longestSideMeters;
                widthMeters = longestSideMeters * aspectRatio;
            }

            const latRad = center.lat * (Math.PI / 180);
            const metersPerDegreeLat = 111132.92 - 559.82 * Math.cos(2 * latRad) + 1.175 * Math.cos(4 * latRad);
            const metersPerDegreeLng = 111320 * Math.cos(latRad);

            const latSpan = heightMeters / metersPerDegreeLat;
            const lngSpan = widthMeters / metersPerDegreeLng;
            
            const defaultBounds = L.latLngBounds(
                [center.lat - latSpan / 2, center.lng - lngSpan / 2],
                [center.lat + latSpan / 2, center.lng + lngSpan / 2]
            );

            const newLayer: ImportedLayer = {
                id: `layer-${Date.now()}`,
                name: file.name,
                type: layerType,
                data: buffer,
                bounds: defaultBounds,
                isVisible: true,
                opacity: 1,
                rotation: 0,
                hasBackground: layerType === 'dxf',
                intrinsicWidth,
                intrinsicHeight,
                geometry: null,
                createdAt: new Date().toISOString(),
            };

            setState(s => ({ ...s, layers: [...s.layers, newLayer] }));
            return newLayer;
        },
        addConstructedLayer: (layer: ImportedLayer) => {
            setState(s => ({ ...s, layers: [...s.layers, layer] }));
        },
        removeLayer: (id: string, skipConfirm = false) => {
            if (skipConfirm || window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την καταχώρηση;')) {
                setState(s => ({ ...s, layers: s.layers.filter(l => l.id !== id), ...(s.editingLayerId === id ? { editingLayerId: null } : {}) }));
                if (state.editingLayerId === id) {
                    setTempEditingLayer(null);
                }
            }
        },
        updateLayer: (id, updates) => {
            setState(s => ({ ...s, layers: s.layers.map(l => l.id === id ? { ...l, ...updates } : l) }));
        },
        reorderLayers: (layers: ImportedLayer[]) => {
            setState(s => ({ ...s, layers }));
        },
        toggleVisibility: (id: string) => {
            setState(s => ({ ...s, layers: s.layers.map(l => l.id === id ? { ...l, isVisible: !l.isVisible } : l) }));
        },
        updateOpacity: (id, opacity) => {
            setState(s => ({ ...s, layers: s.layers.map(l => l.id === id ? { ...l, opacity } : l) }));
        },
        setMovingLayerId: (id) => {
            setState(s => ({ ...s, movingLayerId: id }));
        },
        zoomToLayer: (id) => {
            setState(s => ({ ...s, layerToZoom: id }));
        },
        toggleLayerBackground: (id) => {
             setState(s => ({ ...s, layers: s.layers.map(l => l.id === id ? { ...l, hasBackground: !l.hasBackground } : l) }));
        },
        startEditing: (layer) => {
             setState(s => ({ ...s, editingLayerId: layer.id, layerToZoom: layer.id, hasManuallyTransformed: false }));
             setTempEditingLayer(layer);
        },
        stopEditing: (save) => {
            if (save && tempEditingLayer) {
                 setState(s => ({ ...s, layers: s.layers.map(l => l.id === tempEditingLayer.id ? tempEditingLayer : l) }));
            }
            setState(s => ({...s, editingLayerId: null }));
            setTempEditingLayer(null);
        },
        updateEditingLayerBounds: (bounds) => {
            setTempEditingLayer(l => l ? { ...l, bounds } : null);
            setState(s => ({...s, hasManuallyTransformed: true }));
        },
        updateEditingLayerRotation: (rotation) => {
            setTempEditingLayer(l => l ? { ...l, rotation } : null);
            setState(s => ({...s, hasManuallyTransformed: true }));
        },
        applyScale: (conversionFactor) => {
            if (!tempEditingLayer || !tempEditingLayer.bounds || !tempEditingLayer.intrinsicWidth || !tempEditingLayer.intrinsicHeight || tempEditingLayer.intrinsicHeight === 0) return;

            if (state.hasManuallyTransformed) {
                if (!window.confirm("Αυτό θα αναιρέσει τις χειροκίνητες προσαρμογές σας. Είστε σίγουροι;")) {
                    return;
                }
            }
        
            const { intrinsicWidth, intrinsicHeight, bounds } = tempEditingLayer;
            const center = bounds.getCenter();
        
            const widthMeters = intrinsicWidth * conversionFactor;
            const heightMeters = intrinsicHeight * conversionFactor;
        
            const latRad = center.lat * (Math.PI / 180);
            const metersPerDegreeLat = 111132.92 - 559.82 * Math.cos(2 * latRad) + 1.175 * Math.cos(4 * latRad);
            const metersPerDegreeLng = 111320 * Math.cos(latRad);
        
            const latSpan = heightMeters / metersPerDegreeLat;
            const lngSpan = widthMeters / metersPerDegreeLng;
        
            const newBounds = L.latLngBounds(
                [center.lat - latSpan / 2, center.lng - lngSpan / 2],
                [center.lat + latSpan / 2, center.lng + lngSpan / 2]
            );
        
            setTempEditingLayer(l => l ? { ...l, bounds: newBounds } : null);
            setState(s => ({ ...s, hasManuallyTransformed: false }));
        },
    }), [state.layers, state.editingLayerId, tempEditingLayer, state.hasManuallyTransformed]);
    
    const editingLayer = useMemo(() => state.layers.find(l => l.id === state.editingLayerId) ?? null, [state.layers, state.editingLayerId]);

    const contextValue: LayersContextType = {
        ...state,
        editingLayer,
        tempEditingLayer,
        actions,
    };

    return (
        <LayersContext.Provider value={contextValue}>
            {children}
        </LayersContext.Provider>
    );
};

// --- Hook for consuming context ---
export const useLayersContext = (): LayersContextType => {
    const context = useContext(LayersContext);
    if (context === undefined) {
        throw new Error('useLayersContext must be used within a LayersProvider');
    }
    return context;
};
