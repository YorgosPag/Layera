import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import L from 'leaflet';
import { WizardState, ListingDetails, UploadedPhoto, DrawingState, DrawingShape, JobDetails, GeoJSONFeature } from '@geo-platform/shared';
import { GeocodingResult } from '../components/utils/geocoding';
import { compressImage } from '../components/utils/imageUtils';
import { DistanceUnit, AreaUnit } from '../components/utils/measurementUtils';

// --- Initial State Definitions ---
export interface ToastState {
    isVisible: boolean;
    message: string;
    onConfirm: (() => void) | null;
    onCancel: (() => void) | null;
}

const TOAST_INITIAL_STATE: ToastState = {
    isVisible: false,
    message: '',
    onConfirm: null,
    onCancel: null,
};

const DETAILS_INITIAL_STATE: Partial<ListingDetails & JobDetails> = {
    price: '', area: '', propertyType: '', bedrooms: '', bathrooms: '', wc: '',
    floor: '', totalFloors: '', constructionYear: '', condition: '', heating: '', parking: '',
    amenities: { storage: false, fireplace: false, elevator: false, balcony: false, garden: false, securityDoor: false, alarm: false },
    photos: [],
    description: '',
    jobTitle: '', company: '', employmentType: '', salary: '',
    proximityPreference: false, proximityRadius: 10,
};

const DRAWING_INITIAL_STATE: DrawingState = {
    isActive: false, shape: null, points: [], radius: null, isFinished: false,
};

const WIZARD_INITIAL_STATE: WizardState = {
    isActive: false, step: 'category', category: null, intent: null, transactionType: null,
    employmentType: null, availability: null, availabilityDate: null, availabilityDuration: null,
    availabilityDurationUnit: 'months', locationMethod: null, file: null, associatedLayerId: null, details: DETAILS_INITIAL_STATE,
};

// --- State & Actions Definitions ---

interface UiState {
    isMeasuring: boolean;
    snappingOptions: {
        vertices: boolean;
        edges: boolean;
    };
    isSnappingEffective: boolean;
    wizardState: WizardState;
    searchedLocation: GeocodingResult | null;
    drawingState: DrawingState;
    activeView: 'map' | 'dashboard';
    isLayersPanelOpen: boolean;
    isAdminMode: boolean;
    toast: ToastState;
    isWizardHidingForDraw: boolean;
    drawingDistanceUnit: DistanceUnit; // New: Selected distance unit for drawing/editing
    drawingAreaUnit: AreaUnit;       // New: Selected area unit for drawing/editing
}

interface UiActions {
    setActiveView: (view: 'map' | 'dashboard') => void;
    toggleLayersPanel: (force?: boolean) => void;
    toggleAdminMode: () => void;
    setMeasuring: (isMeasuring: boolean) => void;
    toggleSnapping: (type: 'vertices' | 'edges') => void;
    setSnappingEffective: (isEffective: boolean) => void;
    startWizard: () => void;
    resetWizard: () => void;
    setWizardState: (state: Partial<WizardState>) => void;
    addPhotos: (files: File[]) => Promise<void>;
    removePhoto: (id: string) => void;
    updatePhotoDescription: (id: string, description: string) => void;
    reorderPhotos: (photos: UploadedPhoto[]) => void;
    startDrawing: (shape: DrawingShape) => void;
    addDrawingPoint: (point: L.LatLng) => void;
    setDrawingPoints: (points: L.LatLng[]) => void;
    finishDrawing: () => void;
    cancelDrawing: () => void;
    setDrawingRadius: (radius: number) => void;
    setDrawingFromGeoJson: (geojson: GeoJSONFeature) => void;
    setSearchedLocation: (location: GeocodingResult | null) => void;
    clearSearchedLocation: () => void;
    flyToUserLocation: () => void;
    showToast: (options: { message: string; onConfirm?: () => void; onCancel?: () => void; }) => void;
    hideToast: () => void;
    setDrawingDistanceUnit: (unit: DistanceUnit) => void; // New action
    setDrawingAreaUnit: (unit: AreaUnit) => void;       // New action
}

interface UiContextType extends UiState {
    actions: UiActions;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

// --- Provider Implementation ---

export const UiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<UiState>({
        isMeasuring: false,
        snappingOptions: {
            vertices: false, // Default to vertex snapping disabled
            edges: false,
        },
        isSnappingEffective: false,
        wizardState: WIZARD_INITIAL_STATE,
        searchedLocation: null,
        drawingState: DRAWING_INITIAL_STATE,
        activeView: 'map',
        isLayersPanelOpen: false,
        isAdminMode: false,
        toast: TOAST_INITIAL_STATE,
        isWizardHidingForDraw: false,
        drawingDistanceUnit: 'm', // Default distance unit
        drawingAreaUnit: 'm2',    // Default area unit
    });

    const actions = useMemo<UiActions>(() => ({
        setActiveView: (view) => setState(s => ({ ...s, activeView: view, isLayersPanelOpen: view === 'map' ? s.isLayersPanelOpen : false })),
        toggleLayersPanel: (force) => setState(s => ({ ...s, isLayersPanelOpen: typeof force === 'boolean' ? force : !s.isLayersPanelOpen })),
        toggleAdminMode: () => setState(s => ({ ...s, isAdminMode: !s.isAdminMode })),
        setMeasuring: (isMeasuring) => setState(s => ({ ...s, isMeasuring })),
        toggleSnapping: (type) => setState(s => ({
            ...s,
            snappingOptions: {
                ...s.snappingOptions,
                [type]: !s.snappingOptions[type],
            }
        })),
        setSnappingEffective: (isEffective) => setState(s => ({ ...s, isSnappingEffective: isEffective })),
        startWizard: () => setState(s => ({ ...s, wizardState: { ...WIZARD_INITIAL_STATE, isActive: true }, activeView: 'map', isLayersPanelOpen: false })),
        resetWizard: () => setState(s => ({ ...s, wizardState: WIZARD_INITIAL_STATE, drawingState: DRAWING_INITIAL_STATE })),
        setWizardState: (wizardUpdate) => setState(s => ({ ...s, wizardState: { ...s.wizardState, ...wizardUpdate } })),
        addPhotos: async (files) => {
            const newPhotos: UploadedPhoto[] = await Promise.all(Array.from(files).map(async (file) => {
                const previewUrl = await compressImage(file, { maxWidth: 1024, quality: 0.8 });
                return { id: `photo-${Date.now()}-${Math.random()}`, previewUrl, description: '', file };
            }));
            setState(s => ({ ...s, wizardState: { ...s.wizardState, details: { ...s.wizardState.details, photos: [...(s.wizardState.details.photos || []), ...newPhotos] } } }));
        },
        removePhoto: (id) => setState(s => ({ ...s, wizardState: { ...s.wizardState, details: { ...s.wizardState.details, photos: s.wizardState.details.photos?.filter(p => p.id !== id) } } })),
        updatePhotoDescription: (id, description) => setState(s => ({ ...s, wizardState: { ...s.wizardState, details: { ...s.wizardState.details, photos: s.wizardState.details.photos?.map(p => p.id === id ? { ...p, description } : p) } } })),
        reorderPhotos: (photos) => setState(s => ({ ...s, wizardState: { ...s.wizardState, details: { ...s.wizardState.details, photos } } })),
        startDrawing: (shape) => {
            const defaultRadius = state.wizardState.intent === 'offer' ? 50 : 250;
            const shouldHide = window.innerWidth < 768; // Tailwind's 'md' breakpoint
            setState(s => ({
                ...s,
                drawingState: { ...DRAWING_INITIAL_STATE, isActive: true, shape, radius: defaultRadius },
                isWizardHidingForDraw: shouldHide,
            }));
        },
        addDrawingPoint: (point) => {
            setState(s => {
                if (!s.drawingState.isActive || s.drawingState.isFinished) return s;
                const newPoints = [...s.drawingState.points, point];
                if (s.drawingState.shape === 'marker') {
                    // For a marker, a single click finishes the drawing action.
                    // This provides immediate visual feedback (the circle) and brings back the wizard.
                    // The user can then adjust the radius before proceeding.
                    return { 
                        ...s, 
                        drawingState: { ...s.drawingState, points: newPoints, isFinished: true },
                        isWizardHidingForDraw: false,
                    };
                }
                // For polygons, continue adding points
                return { ...s, drawingState: { ...s.drawingState, points: newPoints } };
            });
        },
        setDrawingPoints: (points) => setState(s => ({ ...s, drawingState: { ...s.drawingState, points } })),
        finishDrawing: () => setState(s => ({ ...s, drawingState: { ...s.drawingState, isFinished: true }, isWizardHidingForDraw: false })),
        cancelDrawing: () => setState(s => ({ ...s, drawingState: DRAWING_INITIAL_STATE, isWizardHidingForDraw: false })),
        setDrawingRadius: (radius) => setState(s => ({ ...s, drawingState: { ...s.drawingState, radius } })),
        setDrawingFromGeoJson: (geojson) => {
            const bounds = L.geoJSON(geojson).getBounds();
            const shape: DrawingShape = (geojson.geometry.type === 'Polygon' || geojson.geometry.type === 'MultiPolygon') ? 'polygon' : 'marker';
            let points: L.LatLng[];
            if (shape === 'polygon' && geojson.geometry.type === 'Polygon') {
                points = geojson.geometry.coordinates[0].map((c: number[]) => L.latLng(c[1], c[0]));
            } else if (shape === 'marker' && geojson.geometry.type === 'Point') {
                points = [L.latLng(geojson.geometry.coordinates[1], geojson.geometry.coordinates[0])];
            } else { // Fallback for multipolygon etc.
                points = [bounds.getCenter()];
            }

            setState(s => ({
                ...s,
                drawingState: {
                    ...DRAWING_INITIAL_STATE,
                    isActive: true,
                    isFinished: true,
                    shape,
                    points,
                    radius: (shape === 'marker' && geojson.properties?.radius) ? geojson.properties.radius : s.drawingState.radius,
                }
            }));
        },
        setSearchedLocation: (location) => setState(s => ({ ...s, searchedLocation: location })),
        clearSearchedLocation: () => setState(s => ({ ...s, searchedLocation: null })),
        flyToUserLocation: () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        // This action now only sets the location. The map component will handle the "flying".
                        // FIX: Add missing 'structuredDisplayName' to conform to the GeocodingResult type.
                        setState(s => ({ ...s, searchedLocation: {
                            lat: latitude,
                            lng: longitude,
                            displayName: 'Η τρέχουσα τοποθεσία σας',
                            structuredDisplayName: {
                                main: 'Η τρέχουσα τοποθεσία σας',
                                secondary: ''
                            }
                        } }));
                    },
                    (err) => {
                        console.error("Geolocation error:", err);
                        let message = 'Δεν ήταν δυνατός ο εντοπισμός της τοποθεσίας σας.';
                        if (err.code === 1) { // PERMISSION_DENIED
                            message = 'Η άδεια για τον εντοπισμό τοποθεσίας απορρίφθηκε. Ελέγξτε τις ρυθμίσεις του browser σας.';
                        } else if (err.code === 2) { // POSITION_UNAVAILABLE
                            message = 'Η πληροφορία τοποθεσίας δεν είναι διαθέσιμη αυτή τη στιγμή.';
                        } else if (err.code === 3) { // TIMEOUT
                            message = 'Το αίτημα για εντοπισμό τοποθεσίας έληξε λόγω χρονικού ορίου.';
                        }
                        alert(message);
                    },
                     { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            } else {
                alert('Η γεωεντοπισμός δεν υποστηρίζεται από αυτόν τον browser.');
            }
        },
        showToast: (options) => {
            setState(s => ({
                ...s,
                toast: {
                    isVisible: true,
                    message: options.message,
                    onConfirm: options.onConfirm || null,
                    onCancel: options.onCancel || null,
                }
            }));
        },
        hideToast: () => {
            setState(s => ({ ...s, toast: TOAST_INITIAL_STATE }));
        },
        setDrawingDistanceUnit: (unit: DistanceUnit) => setState(s => ({ ...s, drawingDistanceUnit: unit })),
        setDrawingAreaUnit: (unit: AreaUnit) => setState(s => ({ ...s, drawingAreaUnit: unit })),
    }), [state.wizardState.intent]);

    const contextValue: UiContextType = { ...state, actions };

    return <UiContext.Provider value={contextValue}>{children}</UiContext.Provider>;
};

// --- Hook for consuming context ---
export const useUiContext = (): UiContextType => {
    const context = useContext(UiContext);
    if (context === undefined) {
        throw new Error('useUiContext must be used within an UiProvider');
    }
    return context;
};