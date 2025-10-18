import React, { useCallback, useEffect, useRef } from 'react';
import L from 'leaflet';
import { useAppContext } from '../../context/AppContext';
import { ListingIntent, TransactionType, Availability, ListingCategory, EmploymentType, WizardState } from '../../shared/types';
import StepIntent from './StepIntent';
import StepTransactionType from './StepTransactionType';
import StepAvailability from './StepAvailability';
import StepLocationOffer from './StepLocationOffer';
import StepDetails from './StepDetails';
import StepPositioning from './StepPositioning';
import StepDrawLocation from './StepDrawLocation';
import StepAvailabilityDetails from './StepAvailabilityDetails';
import StepCategory from './StepCategory';
import StepEmploymentType from './StepEmploymentType';

interface ListingWizardProps {
    map: L.Map | null;
}

const STEPS_CONFIG: Record<string, { title: string }> = {
    category: { title: 'Επιλογή Κατηγορίας' },
    intent: { title: 'Τύπος Καταχώρησης' },
    transactionType: { title: 'Είδος Συναλλαγής' },
    employmentType: { title: 'Είδος Απασχόλησης' },
    availability: { title: 'Χρόνος Διαθεσιμότητας' },
    availabilityDetails: { title: 'Λεπτομέρειες Διαθεσιμότητας' },
    location: { title: 'Τοποθεσία & Κάτοψη' },
    details: { title: 'Λεπτομέρειες' },
};


const ListingWizard: React.FC<ListingWizardProps> = ({ map }) => {
    const { wizardState, editingLayerId, drawingState, actions } = useAppContext();
    const { isActive, step, intent, availability, category } = wizardState;
    const isPositioningDone = useRef(false);

    // --- Step Navigation Logic ---
    const handleCategorySelect = (selectedCategory: ListingCategory) => {
        actions.setWizardState({ category: selectedCategory, step: 'intent' });
    };

    const handleIntentSelect = (selectedIntent: ListingIntent) => {
        const nextStep = category === 'property' ? 'transactionType' : 'employmentType';
        actions.setWizardState({ intent: selectedIntent, step: nextStep });
    };

    const handleTransactionSelect = (selectedTransaction: TransactionType) => {
        actions.setWizardState({ transactionType: selectedTransaction, step: 'availability' });
    };

    const handleEmploymentTypeSelect = (selectedType: EmploymentType) => {
        actions.setWizardState({ employmentType: selectedType, step: 'availability' });
    };
    
    const handleAvailabilitySelect = (selectedAvailability: Availability) => {
        if (selectedAvailability === 'future' && ((category === 'property' && intent === 'offer') || category === 'job')) {
            actions.setWizardState({ availability: selectedAvailability, step: 'availabilityDetails' });
        } else {
            actions.setWizardState({ availability: selectedAvailability, step: 'location' });
        }
    };

    const handleFileSelect = async (selectedFile: File) => {
        if (!map) return;
        isPositioningDone.current = false;
        const newLayer = await actions.addLayer(selectedFile, map.getCenter());
        actions.startEditing(newLayer);
        actions.setWizardState({ file: selectedFile, associatedLayerId: newLayer.id });
    };

    const handlePositioningDone = useCallback(() => {
        actions.stopEditing(true); // Save the changes
        isPositioningDone.current = true;
    }, [actions]);

    const handleDrawingDone = useCallback(() => {
        actions.persistDrawingAsLayer();
        const nextStep = (category === 'job' && intent === 'search') ? 'complete' : 'details';
        actions.setWizardState({ step: nextStep });
    }, [actions, category, intent]);
    
    const handleBack = () => {
        switch (step) {
            case 'intent':
                actions.setWizardState({ step: 'category', intent: null });
                break;
            case 'transactionType':
                actions.setWizardState({ step: 'intent', transactionType: null });
                break;
            case 'employmentType':
                 actions.setWizardState({ step: 'intent', employmentType: null });
                break;
            case 'availability':
                actions.setWizardState({ 
                    step: category === 'job' ? 'employmentType' : 'transactionType', 
                    availability: null 
                });
                break;
            case 'availabilityDetails':
                actions.setWizardState({ 
                    step: 'availability', 
                    availabilityDate: null,
                    availabilityDuration: null,
                });
                break;
            case 'location': {
                let prevStep: WizardState['step'] = 'intent';
                 if (category === 'property') {
                    prevStep = (intent === 'offer' && availability === 'future') ? 'availabilityDetails' : 'availability';
                 } else if (category === 'job') {
                    prevStep = availability === 'future' ? 'availabilityDetails' : 'availability';
                 }

                if (editingLayerId) {
                    actions.removeLayer(editingLayerId);
                    actions.stopEditing(false);
                    actions.setWizardState({ step: prevStep, file: null, associatedLayerId: null });
                } else {
                    if (wizardState.associatedLayerId && !wizardState.file) {
                        actions.removeLayer(wizardState.associatedLayerId);
                    }
                    if (drawingState.isActive) {
                        actions.cancelDrawing();
                    }
                    actions.setWizardState({ step: prevStep, associatedLayerId: null });
                }
                break;
            }
            case 'details':
                actions.setWizardState({ step: 'location' });
                if (wizardState.associatedLayerId && wizardState.file) {
                    const layerToReEdit = actions.layers.find(l => l.id === wizardState.associatedLayerId);
                    if (layerToReEdit) {
                        actions.startEditing(layerToReEdit);
                    }
                } else if (wizardState.associatedLayerId) {
                     // If we are coming back to a drawing step, remove the persisted layer and restart drawing
                    actions.removeLayer(wizardState.associatedLayerId);
                    actions.setWizardState({ associatedLayerId: null });
                }
                break;
        }
    };
    
    // Effect to advance from location step when positioning is finished
    useEffect(() => {
        if (step === 'location' && isPositioningDone.current) {
            const nextStep = (category === 'job' && intent === 'search') ? 'complete' : 'details';
            if (nextStep === 'complete') actions.finalizeListing();
            actions.setWizardState({ step: nextStep });
            isPositioningDone.current = false; // Reset for next time
        }
    }, [step, editingLayerId, actions, category, intent]);


    const renderStepContent = () => {
        if (editingLayerId && step === 'location') {
            return <StepPositioning onDone={handlePositioningDone} />;
        }
        
        switch (step) {
            case 'category':
                return <StepCategory onSelect={handleCategorySelect} />;
            case 'intent':
                return <StepIntent onSelect={handleIntentSelect} category={category} />;
            case 'transactionType':
                return <StepTransactionType onSelect={handleTransactionSelect} />;
            case 'employmentType':
                return <StepEmploymentType onSelect={handleEmploymentTypeSelect} />;
            case 'availability':
                return <StepAvailability onSelect={handleAvailabilitySelect} category={category} intent={intent} />;
            case 'availabilityDetails':
                return <StepAvailabilityDetails onNext={() => actions.setWizardState({ step: 'location' })} category={category} />;
            case 'location':
                if (intent === 'offer') {
                    // For 'future' property offers, we use drawing. For 'now' offers, we use file upload.
                    // For all job offers, we use drawing.
                    return (category === 'property' && availability === 'now')
                        ? <StepLocationOffer onFileSelect={handleFileSelect} />
                        : <StepDrawLocation onDone={handleDrawingDone} category={category} intent={intent} />;
                } else { // 'search' intent
                    // All "search" intents use the drawing tool
                    return <StepDrawLocation onDone={handleDrawingDone} category={category} intent={intent} />;
                }
            case 'details':
                return <StepDetails />;
            case 'complete':
                 // This case might be entered directly after drawing a job search area. Finalize if needed.
                if (category === 'job' && intent === 'search' && wizardState.associatedLayerId) {
                    actions.finalizeListing();
                }
                return <div className="text-center p-4">
                    <h3 className="text-lg font-semibold text-green-700">Επιτυχής Καταχώρηση!</h3>
                    <p className="text-sm text-gray-600 mt-2">Η καταχώρησή σας ολοκληρώθηκε.</p>
                    <button onClick={actions.closeWizard} className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Κλείσιμο
                    </button>
                </div>;
            default:
                return null;
        }
    };

    const currentStepConfig = STEPS_CONFIG[step];

    if (!isActive) return null;

    const showFooter = step !== 'complete' && step !== 'category' && (!editingLayerId || step === 'details');

    return (
        <div className="absolute top-20 right-4 z-[1001] bg-white rounded-lg shadow-2xl w-96 flex flex-col max-h-[calc(100vh-120px)]">
            <header className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Νέα Καταχώρηση</h2>
                    {currentStepConfig && <p className="text-sm text-gray-500">{currentStepConfig.title}</p>}
                </div>
                <button onClick={actions.closeWizard} className="text-2xl text-gray-400 hover:text-gray-600 leading-none">&times;</button>
            </header>
            
            <div className="p-4 flex-grow overflow-y-auto">
                {renderStepContent()}
            </div>

            {showFooter && (
                 <footer className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50 flex-shrink-0">
                    <button onClick={handleBack} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                        Πίσω
                    </button>
                    {step === 'details' && (
                        <button onClick={() => { actions.finalizeListing(); actions.setWizardState({ step: 'complete' }); }} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            Ολοκλήρωση
                        </button>
                    )}
                </footer>
            )}
        </div>
    );
};

export default ListingWizard;