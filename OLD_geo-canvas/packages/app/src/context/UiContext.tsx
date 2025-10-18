import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import L from 'leaflet';
import { WizardState, ListingDetails, UploadedPhoto, DrawingState, DrawingShape, JobDetails } from '@geo-platform/shared';
import { GeocodingResult } from '../components/utils/geocoding';
import { compressImage } from '../components/utils/imageUtils';

// --- Initial State Definitions ---
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
    availabilityDurationUnit: 'months', file: null, associatedLayerId: null, details: DETAILS_INITIAL_STATE,
};

// --- State & Actions Definitions ---

interface UiState {
    isMeasuring: boolean;
    isSnapping: boolean;
    isSnappingEffective: boolean;
    wizardState: WizardState;
    searchedLocation: GeocodingResult | null;
    drawingState: DrawingState;
    activeView: 'map' | 'dashboard';
    isLayersPanelOpen: boolean;
    isAdminMode: boolean;
}

interface UiActions {
    setActiveView: (view: 'map' | 'dashboard') => void;
    toggleLayersPanel: (force?: boolean) => void;
    toggleAdminMode: () => void;
    setMeasuring: (isMeasuring: boolean) => void;
    setSnapping: (isSnapping: boolean) => void;
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
    finishDrawing: () => void;
    cancelDrawing: () => void;
    setDrawingRadius: (radius: number) => void;
    setSearchedLocation: (location: GeocodingResult | null) => void;
    clearSearchedLocation: () => void;
    flyToUserLocation: () => void;
}

interface UiContextType extends UiState {
    actions: UiActions;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

// --- Provider Implementation ---

export const UiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<UiState>({
        isMeasuring: false,
        isSnapping: true,
        isSnappingEffective: false,
        wizardState: WIZARD_INITIAL_STATE,
        searchedLocation: null,
        drawingState: DRAWING_INITIAL_STATE,
        activeView: 'map',
        isLayersPanelOpen: false,
        isAdminMode: false,
    });

    const actions = useMemo<UiActions>(() => ({
        setActiveView: (view) => setState(s => ({ ...s, activeView: view, isLayersPanelOpen: view === 'map' ? s.isLayersPanelOpen : false })),
        toggleLayersPanel: (force) => setState(s => ({ ...s, isLayersPanelOpen: typeof force === 'boolean' ? force : !s.isLayersPanelOpen })),
        toggleAdminMode: () => setState(s => ({ ...s, isAdminMode: !s.isAdminMode })),
        setMeasuring: (isMeasuring) => setState(s => ({ ...s, isMeasuring })),
        setSnapping: (isSnapping) => setState(s => ({ ...s, isSnapping })),
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
        finishDrawing: () => setState(s => ({ ...s, drawingState: { ...s.drawingState, isFinished: true } })),
        cancelDrawing: () => setState(s => ({ ...s, drawingState: DRAWING_INITIAL_STATE })),
        setDrawingRadius: (radius) => setState(s => ({ ...s, drawingState: { ...s.drawingState, radius } })),
        setSearchedLocation: (location) => setState(s => ({ ...s, searchedLocation: location })),
        clearSearchedLocation: () => setState(s => ({ ...s, searchedLocation: null })),
        flyToUserLocation: () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        // This action now only sets the location. The map component will handle the "flying".
                        setState(s => ({ ...s, searchedLocation: { lat: latitude, lng: longitude, displayName: 'Η τρέχουσα τοποθεσία σας' } }));
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
