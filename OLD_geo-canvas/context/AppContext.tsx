import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import L from 'leaflet';
import { ImportedLayer, LayerType, ListingIntent, TransactionType, WizardState, ListingDetails, UploadedPhoto, Availability, DrawingState, DrawingShape, GeoJSONFeature, ListingCategory, JobDetails, EmploymentType } from '@geo-platform/shared';
import { GeocodingResult } from '../components/utils/geocoding';
import { getDxfString, getDxfBounds } from '../components/utils/dxfUtils';
import { compressImage } from '../components/utils/imageUtils';

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


// --- State Definitions ---

interface AppState {
    layers: ImportedLayer[];
    movingLayerId: string | null;
    editingLayerId: string | null;
    layerToZoom: string | null;
    isMeasuring: boolean;
    isSnapping: boolean;
    isSnappingEffective: boolean;
    wizardState: WizardState;
    searchedLocation: GeocodingResult | null;
    hasManuallyTransformed: boolean;
    drawingState: DrawingState;
    activeView: 'map' | 'dashboard';
    isLayersPanelOpen: boolean;
    isAdminMode: boolean;
}

// --- Actions Definitions ---

interface AppActions {
    // Layout Actions
    setActiveView: (view: 'map' | 'dashboard') => void;
    toggleLayersPanel: (force?: boolean) => void;
    toggleAdminMode: () => void;

    // Layer Actions
    addLayer: (file: File, center: L.LatLng) => Promise<ImportedLayer>;
    removeLayer: (id: string) => void;
    updateLayer: (id: string, updates: Partial<ImportedLayer>) => void;
    reorderLayers: (layers: ImportedLayer[]) => void;
    toggleVisibility: (id: string) => void;
    updateOpacity: (id: string, opacity: number) => void;
    setMovingLayerId: (id: string | null) => void;
    zoomToLayer: (id: string | null) => void;
    toggleLayerBackground: (id: string) => void;
    layers: ImportedLayer[];

    // Editing Actions
    startEditing: (layer: ImportedLayer) => void;
    stopEditing: (save: boolean) => void;
    updateEditingLayerBounds: (bounds: L.LatLngBounds) => void;
    updateEditingLayerRotation: (rotation: number) => void;
    applyScale: (conversionFactor: number) => void;
    
    // Map Tool Actions
    setMeasuring: (isMeasuring: boolean) => void;
    setSnapping: (isSnapping: boolean) => void;
    setSnappingEffective: (isEffective: boolean) => void;

    // Wizard Actions
    startWizard: () => void;
    closeWizard: () => void;
    setWizardState: (state: Partial<WizardState>) => void;
    finalizeListing: () => void;
    addPhotos: (files: File[]) => Promise<void>;
    removePhoto: (id: string) => void;
    updatePhotoDescription: (id: string, description: string) => void;
    reorderPhotos: (photos: UploadedPhoto[]) => void;
    persistDrawingAsLayer: () => void;

    // Drawing Actions
    startDrawing: (shape: DrawingShape) => void;
    addDrawingPoint: (point: L.LatLng) => void;
    finishDrawing: () => void;
    cancelDrawing: () => void;
    setDrawingRadius: (radius: number) => void;

    // Geocoding Actions
    setSearchedLocation: (location: GeocodingResult | null) => void;
    clearSearchedLocation: () => void;
    flyToUserLocation: () => void;
}

// --- Context Definition ---

interface AppContextType extends AppState {
    editingLayer: ImportedLayer | null;
    tempEditingLayer: ImportedLayer | null;
    actions: AppActions;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- Provider Implementation ---

const DETAILS_INITIAL_STATE: Partial<ListingDetails & JobDetails> = {
    // Property
    price: '', area: '', propertyType: '', bedrooms: '', bathrooms: '', wc: '',
    floor: '', totalFloors: '', constructionYear: '', condition: '', heating: '', parking: '',
    amenities: { storage: false, fireplace: false, elevator: false, balcony: false, garden: false, securityDoor: false, alarm: false },
    photos: [],
    // Both
    description: '',
    // Job
    jobTitle: '', company: '', employmentType: '', salary: '',
    proximityPreference: false, proximityRadius: 10,
};

const DRAWING_INITIAL_STATE: DrawingState = {
    isActive: false,
    shape: null,
    points: [],
    radius: null,
    isFinished: false,
};

const WIZARD_INITIAL_STATE: WizardState = {
    isActive: false,
    step: 'category',
    category: null,
    intent: null,
    transactionType: null,
    employmentType: null,
    availability: null,
    availabilityDate: null,
    availabilityDuration: null,
    availabilityDurationUnit: 'months',
    file: null,
    associatedLayerId: null,
    details: DETAILS_INITIAL_STATE,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>({
        layers: [],
        movingLayerId: null,
        editingLayerId: null,
        layerToZoom: null,
        isMeasuring: false,
        isSnapping: true,
        isSnappingEffective: false,
        wizardState: WIZARD_INITIAL_STATE,
        searchedLocation: null,
        hasManuallyTransformed: false,
        drawingState: DRAWING_INITIAL_STATE,
        activeView: 'map',
        isLayersPanelOpen: false,
        isAdminMode: false,
    });
    
    const [tempEditingLayer, setTempEditingLayer] = useState<ImportedLayer | null>(null);

    const actions = useMemo<AppActions>(() => ({
        // Pass layers through actions to break dependency cycle
        get layers() { return state.layers; },

        // --- Layout Actions ---
        setActiveView: (view) => {
            setState(s => ({
                ...s,
                activeView: view,
                isLayersPanelOpen: view === 'map' ? s.isLayersPanelOpen : false,
            }));
        },
        toggleLayersPanel: (force) => {
            setState(s => ({ ...s, isLayersPanelOpen: typeof force === 'boolean' ? force : !s.isLayersPanelOpen }));
        },
        toggleAdminMode: () => {
            setState(s => ({ ...s, isAdminMode: !s.isAdminMode }));
        },

        // --- Layer Actions ---
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
        removeLayer: (id: string) => {
            if (window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την καταχώρηση;')) {
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

        // --- Editing Actions ---
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
        
        // --- Map Tool Actions ---
        setMeasuring: (isMeasuring) => {
            setState(s => ({ ...s, isMeasuring }));
        },
        setSnapping: (isSnapping) => {
            setState(s => ({ ...s, isSnapping }));
        },
        setSnappingEffective: (isEffective) => {
            setState(s => ({ ...s, isSnappingEffective: isEffective }));
        },

        // --- Wizard Actions ---
        startWizard: () => {
             setState(s => ({ ...s, wizardState: { ...WIZARD_INITIAL_STATE, isActive: true }, activeView: 'map', isLayersPanelOpen: false }));
        },
        closeWizard: () => {
             if (state.editingLayerId) {
                const layerWasJustAdded = !!state.wizardState.file;
                if (layerWasJustAdded) {
                    setState(s => ({ ...s, layers: s.layers.filter(l => l.id !== s.editingLayerId) }));
                }
                actions.stopEditing(false);
             }
             actions.cancelDrawing();
             setState(s => ({ ...s, wizardState: WIZARD_INITIAL_STATE }));
        },
        setWizardState: (wizardUpdate) => {
            setState(s => ({ ...s, wizardState: { ...s.wizardState, ...wizardUpdate } }));
        },
        finalizeListing: () => {
            setState(s => {
                const { wizardState } = s;
                const { associatedLayerId, category, intent, transactionType, employmentType, availability, details, availabilityDate, availabilityDuration, availabilityDurationUnit } = wizardState;
        
                if (!associatedLayerId || !category || !intent) return s;

                const generateName = (): string => {
                    if (category === 'property') {
                        const intentText = intent === 'offer' ? (transactionType === 'sale' ? 'Πώληση' : 'Ενοικίαση') : 'Αναζήτηση';
                        const typeText = details?.propertyType ? {
                            apartment: 'Διαμερίσματος', house: 'Μονοκατοικίας', maisonette: 'Μεζονέτας',
                            studio: 'Studio', business: 'Επαγγελματικού Χώρου'
                        }[details.propertyType] : 'Ακινήτου';
                        let desc = `${intentText} ${typeText}`;
                        if (details?.area) {
                            desc += ` ${details.area} τ.μ.`;
                        }
                        return desc;
                    }
                    if (category === 'job') {
                        const intentText = intent === 'offer' ? 'Προσφορά' : 'Αναζήτηση';
                        if (details?.jobTitle) {
                            return `${intentText} Εργασίας: ${details.jobTitle}`;
                        }
                        const typeText = details?.employmentType ? {
                            full_time: 'Πλήρους Απασχόλησης', part_time: 'Μερικής Απασχόλησης',
                            freelance: 'Freelance', seasonal: 'Εποχιακής Εργασίας'
                        }[details.employmentType] : 'Εργασίας';
                        return `${intentText} ${typeText}`;
                    }
                    return intent === 'offer' ? 'Νέα Προσφορά' : 'Νέα Αναζήτηση';
                };

                const updatedLayer: Partial<ImportedLayer> = {
                    name: generateName(),
                    category,
                    intent,
                    transactionType: transactionType ?? undefined,
                    employmentType: employmentType ?? undefined,
                    availability: availability ?? undefined,
                    details: {
                        ...details,
                        availabilityDate,
                        availabilityDuration,
                        availabilityDurationUnit,
                    },
                };

                return {
                    ...s,
                    layers: s.layers.map(l => l.id === associatedLayerId ? { ...l, ...updatedLayer } : l)
                };
            });
        },
        addPhotos: async (files: File[]) => {
            const newPhotos: UploadedPhoto[] = await Promise.all(Array.from(files).map(async (file) => {
                const previewUrl = await compressImage(file, { maxWidth: 1024, quality: 0.8 });
                return {
                    id: `photo-${Date.now()}-${Math.random()}`,
                    previewUrl,
                    description: '',
                    file,
                };
            }));
            setState(s => ({
                ...s,
                wizardState: {
                    ...s.wizardState,
                    details: {
                        ...s.wizardState.details,
                        photos: [...(s.wizardState.details.photos || []), ...newPhotos]
                    }
                }
            }));
        },
        removePhoto: (id) => {
            setState(s => ({
                ...s,
                wizardState: {
                    ...s.wizardState,
                    details: {
                        ...s.wizardState.details,
                        photos: s.wizardState.details.photos?.filter(p => p.id !== id)
                    }
                }
            }));
        },
        updatePhotoDescription: (id, description) => {
            setState(s => ({
                ...s,
                wizardState: {
                    ...s.wizardState,
                    details: {
                        ...s.wizardState.details,
                        photos: s.wizardState.details.photos?.map(p => p.id === id ? { ...p, description } : p)
                    }
                }
            }));
        },
        reorderPhotos: (photos) => {
            setState(s => ({
                ...s,
                wizardState: {
                    ...s.wizardState,
                    details: {
                        ...s.wizardState.details,
                        photos
                    }
                }
            }));
        },
        persistDrawingAsLayer: () => {
            setState(s => {
                const { drawingState, wizardState } = s;
                if (!drawingState.isFinished || drawingState.points.length === 0) {
                    return s;
                }

                let geometry: GeoJSONFeature | null = null;
                let bounds: L.LatLngBounds | null = null;
                const name = wizardState.intent === 'offer' ? 'Νέα Προσφορά' : 'Νέα Αναζήτηση';

                if (drawingState.shape === 'polygon' && drawingState.points.length > 2) {
                    const latlngs = [...drawingState.points, drawingState.points[0]];
                    geometry = {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Polygon',
                            coordinates: [latlngs.map(p => [p.lng, p.lat])]
                        }
                    };
                    bounds = L.latLngBounds(drawingState.points);
                } else if (drawingState.shape === 'marker' && drawingState.points.length > 0) {
                    const center = drawingState.points[0];
                    const radius = drawingState.radius || 250;
                    geometry = {
                        type: 'Feature',
                        properties: { radius },
                        geometry: {
                            type: 'Point',
                            coordinates: [center.lng, center.lat]
                        }
                    };
                    bounds = center.toBounds(radius * 2);
                }

                if (!geometry || !bounds) return s;

                const newLayer: ImportedLayer = {
                    id: `layer-${Date.now()}`,
                    name,
                    type: 'geometry',
                    data: null,
                    bounds,
                    isVisible: true,
                    opacity: 1,
                    geometry,
                    createdAt: new Date().toISOString(),
                };
                
                return {
                    ...s,
                    layers: [...s.layers, newLayer],
                    wizardState: {
                        ...s.wizardState,
                        associatedLayerId: newLayer.id,
                    },
                    drawingState: DRAWING_INITIAL_STATE,
                };
            });
        },


        // --- Drawing Actions ---
        startDrawing: (shape) => {
            const defaultRadius = state.wizardState.intent === 'offer' ? 50 : 250;
            setState(s => ({ ...s, drawingState: { ...DRAWING_INITIAL_STATE, isActive: true, shape, radius: defaultRadius } }));
        },
        addDrawingPoint: (point) => {
            setState(s => {
                if (!s.drawingState.isActive || s.drawingState.isFinished) return s;
                const newPoints = [...s.drawingState.points, point];
                if (s.drawingState.shape === 'marker') {
                    return { ...s, drawingState: { ...s.drawingState, points: newPoints, isFinished: true } };
                }
                return { ...s, drawingState: { ...s.drawingState, points: newPoints } };
            });
        },
        finishDrawing: () => {
            setState(s => {
                if (!s.drawingState.isActive || s.drawingState.points.length === 0) return s;
                return { ...s, drawingState: { ...s.drawingState, isFinished: true } };
            });
        },
        cancelDrawing: () => {
            setState(s => ({ ...s, drawingState: DRAWING_INITIAL_STATE }));
        },
        setDrawingRadius: (radius) => {
            setState(s => ({ ...s, drawingState: { ...s.drawingState, radius } }));
        },


        // --- Geocoding Actions ---
        setSearchedLocation: (location) => {
            setState(s => ({ ...s, searchedLocation: location }));
        },
        clearSearchedLocation: () => {
            setState(s => ({ ...s, searchedLocation: null }));
        },
        flyToUserLocation: () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        actions.setSearchedLocation({
                            lat: latitude,
                            lng: longitude,
                            displayName: 'Η τρέχουσα τοποθεσία σας'
                        });
                    },
                    (err) => {
                        console.error("Geolocation error:", err);
                        alert('Δεν ήταν δυνατός ο εντοπισμός της τοποθεσίας σας.');
                    },
                     { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            } else {
                alert('Η γεωεντοπισμός δεν υποστηρίζεται από αυτόν τον browser.');
            }
        },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [state.layers, state.editingLayerId, state.wizardState.file, tempEditingLayer, state.hasManuallyTransformed]);
    
    const editingLayer = useMemo(() => state.layers.find(l => l.id === state.editingLayerId) ?? null, [state.layers, state.editingLayerId]);

    const contextValue: AppContextType = {
        ...state,
        editingLayer,
        tempEditingLayer,
        actions,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// --- Hook for consuming context ---
export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};