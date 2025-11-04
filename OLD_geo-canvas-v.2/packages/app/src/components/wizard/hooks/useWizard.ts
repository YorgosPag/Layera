import { useReducer, useCallback, useMemo } from 'react';
import L from 'leaflet';
import { useLayersContext } from '../../../context/layers/LayersProvider';
import { useUiContext } from '../../../context/UiContext';
import { wizardReducer, wizardInitialState } from '../wizard.machine';
import * as WizardService from '../services/wizard.services';
import { ListingCategory, ListingIntent, TransactionType, EmploymentType, Availability, GeoJSONFeature, ImportedLayer } from '@geo-platform/shared';

const STEPS_CONFIG: Record<string, { title: string }> = {
    category: { title: 'Επιλογή Κατηγορίας' },
    intent: { title: 'Τύπος Καταχώρησης' },
    transactionType: { title: 'Είδος Συναλλαγής' },
    employmentType: { title: 'Είδος Απασχόλησης' },
    availability: { title: 'Χρόνος Διαθεσιμότητας' },
    availabilityDetails: { title: 'Λεπτομέρειες Διαθεσιμότητας' },
    locationMethod: { title: 'Μέθοδος Τοποθεσίας' },
    location: { title: 'Τοποθεσία & Κάτοψη' },
    details: { title: 'Λεπτομέρειες' },
    complete: { title: 'Ολοκλήρωση' },
};


export const useWizard = (map: L.Map | null) => {
    const { layers, editingLayerId, hasManuallyTransformed, actions: layersActions } = useLayersContext();
    const { wizardState, drawingState, actions: uiActions } = useUiContext();
    
    const [machineState, dispatch] = useReducer(wizardReducer, wizardInitialState);

    // --- ORCHESTRATION OF SIDE EFFECTS ---

    const handleClose = useCallback(() => {
        const wasCompleted = machineState.step === 'complete';

        if (editingLayerId) {
            // If a file was uploaded but the wizard wasn't completed, remove the temporary layer.
            if (machineState.file && !wasCompleted) {
                layersActions.removeLayer(editingLayerId, true);
            }
            // Always stop the editing mode when closing the wizard.
            layersActions.stopEditing(false);
        }
        
        // If a layer was created by drawing but the wizard wasn't completed, remove it.
        if (machineState.associatedLayerId && !machineState.file && !wasCompleted) {
            layersActions.removeLayer(machineState.associatedLayerId, true);
        }

        uiActions.cancelDrawing();
        uiActions.resetWizard();
        dispatch({ type: 'CLOSE' });
    }, [editingLayerId, machineState, layersActions, uiActions]);

    const handleBack = useCallback(() => {
        const currentStep = machineState.step;

        if (currentStep === 'location') {
            // Case 1: An editable file layer exists. This is the highest priority check.
            if (editingLayerId) {
                const proceedWithBack = () => {
                    layersActions.removeLayer(editingLayerId, true);
                    layersActions.stopEditing(false);
                    dispatch({ type: 'BACK' });
                };

                // If changes were made, confirm before proceeding.
                if (hasManuallyTransformed) {
                    if (window.confirm('Εάν επιστρέψετε στο προηγούμενο βήμα, οι αλλαγές που έχετε κάνει στην τοποθέτηση της κάτοψης θα χαθούν. Είστε σίγουροι;')) {
                        proceedWithBack();
                    }
                    // If user cancels, we do nothing and exit the handler.
                } else {
                    // If no changes, proceed silently.
                    proceedWithBack();
                }
                return; // IMPORTANT: Ensure we exit handleBack after this block.
            }
    
            // Case 2: A shape was drawn and finalized.
            if (machineState.associatedLayerId && !machineState.file) {
                layersActions.removeLayer(machineState.associatedLayerId, true);
                uiActions.clearSearchedLocation(); // Also clear searched location on back
                dispatch({ type: 'BACK' });
                return;
            }
    
            // Case 3: User is in the middle of drawing.
            if (drawingState.isActive) {
                uiActions.cancelDrawing();
                dispatch({ type: 'BACK' });
                return;
            }
    
            // Fallback for any other case on the location step.
            dispatch({ type: 'BACK' });
            return;
        }
    
        if (currentStep === 'details') {
            if (machineState.associatedLayerId && machineState.file) {
                // If it was a file upload, re-enter editing mode for that file.
                const layerToReEdit = layers.find(l => l.id === machineState.associatedLayerId);
                if (layerToReEdit) layersActions.startEditing(layerToReEdit);
            } else if (machineState.associatedLayerId) {
                // If it was a drawn layer, it gets removed when going back.
                layersActions.removeLayer(machineState.associatedLayerId, true);
            }
        }
    
        // Default dispatch for all other steps
        dispatch({ type: 'BACK' });
    
    }, [machineState, editingLayerId, hasManuallyTransformed, drawingState.isActive, layers, layersActions, uiActions]);

    const handleFinalize = useCallback(() => {
        const name = WizardService.generateListingName(
            wizardState.details,
            machineState.category,
            machineState.intent,
            machineState.transactionType,
            machineState.employmentType,
        );
        
        if (machineState.associatedLayerId) {
            layersActions.updateLayer(machineState.associatedLayerId, {
                name,
                category: machineState.category ?? undefined,
                intent: machineState.intent ?? undefined,
                transactionType: machineState.transactionType ?? undefined,
                employmentType: machineState.employmentType ?? undefined,
                availability: machineState.availability ?? undefined,
                details: {
                    ...wizardState.details,
                    availabilityDate: wizardState.availabilityDate,
                    availabilityDuration: wizardState.availabilityDuration,
                    availabilityDurationUnit: wizardState.availabilityDurationUnit,
                },
            });
        }
        dispatch({ type: 'SUBMIT_DETAILS' });
    }, [wizardState, machineState, layersActions]);


    // --- UI EVENT HANDLERS ---

    const onSelectCategory = useCallback((c: ListingCategory) => dispatch({ type: 'SELECT_CATEGORY', payload: c }), []);
    const onSelectIntent = useCallback((i: ListingIntent) => dispatch({ type: 'SELECT_INTENT', payload: i }), []);
    const onSelectTransaction = useCallback((t: TransactionType) => dispatch({ type: 'SELECT_TRANSACTION_TYPE', payload: t }), []);
    const onSelectEmployment = useCallback((e: EmploymentType) => dispatch({ type: 'SELECT_EMPLOYMENT_TYPE', payload: e }), []);
    const onSelectAvailability = useCallback((a: Availability) => dispatch({ type: 'SELECT_AVAILABILITY', payload: a }), []);
    const onAvailabilityDetailsNext = useCallback(() => dispatch({ type: 'SUBMIT_AVAILABILITY_DETAILS' }), []);
    const onSelectLocationMethod = useCallback((method: 'file' | 'draw') => dispatch({ type: 'SELECT_LOCATION_METHOD', payload: method }), []);

    const onFileSelect = useCallback(async (file: File) => {
        if (!map) return;
        dispatch({ type: 'START_FILE_UPLOAD' });
        const newLayer = await layersActions.addLayer(file, map.getCenter());
        layersActions.startEditing(newLayer);
        dispatch({ type: 'FINISH_FILE_UPLOAD', payload: { file, layerId: newLayer.id } });
    }, [map, layersActions]);

    const onPositioningDone = useCallback(() => {
        layersActions.stopEditing(true); // Save changes
        dispatch({ type: 'FINISH_POSITIONING' });
    }, [layersActions]);

    const onDrawingDone = useCallback(() => {
        // If a layer has already been created (e.g., from a GeoJSON search result),
        // we just need to confirm the drawing and move to the next step.
        if (machineState.associatedLayerId) {
            uiActions.cancelDrawing(); // Clear any visual drawing state.
            dispatch({ type: 'FINISH_DRAWING', payload: { layerId: machineState.associatedLayerId } });
            return;
        }
    
        // If no layer is associated yet, but the manual drawing is complete,
        // create a new layer from the drawing data.
        if (drawingState.isFinished) {
            const newLayer = WizardService.createLayerFromDrawing(drawingState, machineState.intent, machineState.category);
            if (newLayer) {
                layersActions.addConstructedLayer(newLayer);
                uiActions.cancelDrawing(); // Clear visual drawing state
                dispatch({ type: 'FINISH_DRAWING', payload: { layerId: newLayer.id } });
            }
        }
    }, [drawingState, machineState, layersActions, uiActions]);

    const onGeoJsonSelect = useCallback((geojson: GeoJSONFeature, name: string) => {
        const bounds = L.geoJSON(geojson).getBounds();
        const newLayer: ImportedLayer = {
            id: `layer-${Date.now()}`,
            name,
            type: 'geometry',
            data: null,
            bounds,
            isVisible: true,
            opacity: 1,
            geometry: geojson,
            createdAt: new Date().toISOString(),
            category: machineState.category ?? undefined,
            intent: machineState.intent ?? undefined,
        };
        layersActions.addConstructedLayer(newLayer);
        uiActions.setDrawingFromGeoJson(geojson);
        dispatch({ type: 'ASSOCIATE_LAYER', payload: { layerId: newLayer.id } });
    }, [layersActions, uiActions, machineState.category, machineState.intent]);


    // --- DERIVED STATE FOR UI ---

    const title = STEPS_CONFIG[machineState.step]?.title ?? '';
    const showFooter = machineState.step !== 'complete' && machineState.step !== 'category' && !editingLayerId;

    return {
        state: machineState,
        title,
        showFooter,
        handlers: {
            onSelectCategory,
            onSelectIntent,
            onSelectTransaction,
            onSelectEmployment,
            onSelectAvailability,
            onAvailabilityDetailsNext,
            onSelectLocationMethod,
            onFileSelect,
            onPositioningDone,
            onDrawingDone,
            onGeoJsonSelect,
            onFinalize: handleFinalize,
            onBack: handleBack,
            onClose: handleClose,
        }
    };
};