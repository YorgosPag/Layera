import { useReducer, useCallback, useMemo } from 'react';
import L from 'leaflet';
import { useLayersContext } from '../../../context/layers/LayersProvider';
import { useUiContext } from '../../../context/UiContext';
import { wizardReducer, wizardInitialState } from '../wizard.machine';
import * as WizardService from '../services/wizard.services';
import { ListingCategory, ListingIntent, TransactionType, EmploymentType, Availability } from '@geo-platform/shared';

const STEPS_CONFIG: Record<string, { title: string }> = {
    category: { title: 'Επιλογή Κατηγορίας' },
    intent: { title: 'Τύπος Καταχώρησης' },
    transactionType: { title: 'Είδος Συναλλαγής' },
    employmentType: { title: 'Είδος Απασχόλησης' },
    availability: { title: 'Χρόνος Διαθεσιμότητας' },
    availabilityDetails: { title: 'Λεπτομέρειες Διαθεσιμότητας' },
    location: { title: 'Τοποθεσία & Κάτοψη' },
    details: { title: 'Λεπτομέρειες' },
    complete: { title: 'Ολοκλήρωση' },
};


export const useWizard = (map: L.Map | null) => {
    const { layers, editingLayerId, actions: layersActions } = useLayersContext();
    const { wizardState, drawingState, actions: uiActions } = useUiContext();
    
    const [machineState, dispatch] = useReducer(wizardReducer, wizardInitialState);

    // --- ORCHESTRATION OF SIDE EFFECTS ---

    const handleClose = useCallback(() => {
        if (editingLayerId) {
            if (machineState.file) { // Layer was just added via file upload
                layersActions.removeLayer(editingLayerId);
            }
            layersActions.stopEditing(false);
        }
        if (machineState.associatedLayerId && !machineState.file) { // Layer was from drawing
            layersActions.removeLayer(machineState.associatedLayerId);
        }
        uiActions.cancelDrawing();
        uiActions.resetWizard();
        dispatch({ type: 'CLOSE' });
    }, [editingLayerId, machineState, layersActions, uiActions]);

    const handleBack = useCallback(() => {
        // Orchestrate side effects on 'back'
        if (machineState.step === 'location') {
            if (editingLayerId) {
                layersActions.removeLayer(editingLayerId);
                layersActions.stopEditing(false);
            }
            if (machineState.associatedLayerId && !machineState.file) {
                 layersActions.removeLayer(machineState.associatedLayerId);
            }
            if (drawingState.isActive) {
                uiActions.cancelDrawing();
            }
        }
        if (machineState.step === 'details') {
            if (machineState.associatedLayerId && machineState.file) {
                const layerToReEdit = layers.find(l => l.id === machineState.associatedLayerId);
                if (layerToReEdit) layersActions.startEditing(layerToReEdit);
            } else if (machineState.associatedLayerId) {
                layersActions.removeLayer(machineState.associatedLayerId);
            }
        }
        dispatch({ type: 'BACK' });
    }, [machineState, editingLayerId, drawingState.isActive, layers, layersActions, uiActions]);

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
        const newLayer = WizardService.createLayerFromDrawing(drawingState, machineState.intent);
        if (newLayer) {
            layersActions.addConstructedLayer(newLayer);
            uiActions.cancelDrawing();
            dispatch({ type: 'FINISH_DRAWING', payload: { layerId: newLayer.id } });
        }
    }, [drawingState, machineState.intent, layersActions, uiActions]);


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
            onFileSelect,
            onPositioningDone,
            onDrawingDone,
            onFinalize: handleFinalize,
            onBack: handleBack,
            onClose: handleClose,
        }
    };
};
