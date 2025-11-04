import React from 'react';
import L from 'leaflet';
import { useUiContext } from '../../context/UiContext';
import { useLayersContext } from '../../context/layers/LayersProvider';
import { useWizard } from './hooks/useWizard';
import StepIntent from './StepIntent';
import StepTransactionType from './StepTransactionType';
import StepAvailability from './StepAvailability';
import StepLocationOffer from './StepLocationOffer';
import StepDetails from './details/StepDetails';
import StepPositioning from './StepPositioning';
import StepDrawLocation from './StepDrawLocation';
import StepAvailabilityDetails from './StepAvailabilityDetails';
import StepCategory from './StepCategory';
import StepEmploymentType from './StepEmploymentType';
import StepLocationMethod from './StepLocationMethod';
import { useMemo } from 'react';

interface ListingWizardProps {
    map: L.Map | null;
}

const ListingWizard: React.FC<ListingWizardProps> = ({ map }) => {
    const { wizardState, isWizardHidingForDraw, drawingState, actions: uiActions } = useUiContext();
    const { editingLayerId } = useLayersContext();
    const { state, title, showFooter, handlers } = useWizard(map);

    const isDetailsStepValid = useMemo(() => {
        if (state.step !== 'details') return true;

        const { details, category } = wizardState;
        
        if (category === 'property') {
            return !!(
                details.price &&
                details.area &&
                details.propertyType &&
                details.bedrooms &&
                details.bathrooms &&
                details.condition &&
                details.description && details.description.trim()
            );
        }

        if (category === 'job') {
            return !!(
                details.jobTitle && details.jobTitle.trim() &&
                details.employmentType &&
                details.description && details.description.trim()
            );
        }
        
        return true; // Default to valid if category is not set
    }, [state.step, wizardState.details, wizardState.category]);


    const renderStepContent = () => {
        if (editingLayerId && state.step === 'location') {
            return <StepPositioning onDone={handlers.onPositioningDone} onBack={handlers.onBack} />;
        }
        
        switch (state.step) {
            case 'category':
                return <StepCategory onSelect={handlers.onSelectCategory} />;
            case 'intent':
                return <StepIntent onSelect={handlers.onSelectIntent} category={state.category} />;
            case 'transactionType':
                return <StepTransactionType onSelect={handlers.onSelectTransaction} intent={state.intent} />;
            case 'employmentType':
                return <StepEmploymentType onSelect={handlers.onSelectEmployment} />;
            case 'availability':
                return <StepAvailability onSelect={handlers.onSelectAvailability} category={state.category} intent={state.intent} />;
            case 'availabilityDetails':
                return <StepAvailabilityDetails onNext={handlers.onAvailabilityDetailsNext} category={state.category} />;
            case 'locationMethod':
                return <StepLocationMethod onSelect={handlers.onSelectLocationMethod} />;
            case 'location':
                if (state.category === 'property' && state.intent === 'offer' && state.availability === 'now') {
                    if (state.locationMethod === 'file') {
                        return <StepLocationOffer onFileSelect={handlers.onFileSelect} />;
                    }
                    if (state.locationMethod === 'draw') {
                        return <StepDrawLocation onDone={handlers.onDrawingDone} onGeoJsonSelect={handlers.onGeoJsonSelect} category={state.category} intent={state.intent} onBack={handlers.onBack} map={map} />;
                    }
                    return <p>Σφάλμα: Δεν έχει επιλεγεί μέθοδος τοποθεσίας.</p>;
                }
                // All other wizard paths lead to drawing
                return <StepDrawLocation onDone={handlers.onDrawingDone} onGeoJsonSelect={handlers.onGeoJsonSelect} category={state.category} intent={state.intent} onBack={handlers.onBack} map={map} />;
            case 'details':
                return <StepDetails />;
            case 'complete':
                 return <div className="text-center p-4">
                    <h3 className="text-lg font-semibold text-green-700">Επιτυχής Καταχώρηση!</h3>
                    <p className="text-sm text-gray-600 mt-2">Η καταχώρησή σας ολοκληρώθηκε.</p>
                    <button onClick={handlers.onClose} className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Κλείσιμο
                    </button>
                </div>;
            default:
                return null;
        }
    };

    if (!wizardState.isActive) return null;

    const shouldShowFooter = showFooter && (state.step !== 'location' || (state.step === 'location' && !editingLayerId && state.locationMethod === 'file'));

    const wizardClasses = `absolute top-0 sm:top-4 right-0 sm:right-4 z-[1001] bg-white text-gray-900 rounded-none sm:rounded-lg shadow-2xl w-full sm:w-96 flex-col max-h-full sm:max-h-[calc(100%-2rem)] ${isWizardHidingForDraw ? 'hidden sm:flex' : 'flex'}`;

    return (
        <>
            {isWizardHidingForDraw && (
                 <div className="sm:hidden absolute top-0 left-0 right-0 z-[1002] p-3 bg-blue-50 border-b border-blue-200 animate-fade-in-down">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        <p className="text-sm font-semibold text-blue-800">
                            {drawingState.shape === 'polygon' ? 'Σχεδίαση σε εξέλιξη...' : drawingState.shape === 'freehand' ? 'Ελεύθερη σχεδίαση...' : 'Τοποθέτηση πινέζας...'}
                        </p>
                        <button
                            onClick={() => uiActions.cancelDrawing()}
                            className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200"
                        >
                            Ακύρωση
                        </button>
                    </div>
                    <p className="text-xs text-blue-700 mt-2 text-center max-w-md mx-auto">
                        {drawingState.shape === 'polygon' ? 'Click: Προσθήκη σημείου | Click στο 1ο σημείο: Ολοκλήρωση' : drawingState.shape === 'freehand' ? 'Κρατήστε πατημένο και σχεδιάστε. Αφήστε για ολοκλήρωση.' : 'Επιλέξτε το σημείο ενδιαφέροντος.'}
                    </p>
                </div>
            )}
            <div className={wizardClasses}>
                <header className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                    <div>
                        {title && (
                            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                        )}
                    </div>
                    <button onClick={handlers.onClose} className="text-2xl text-gray-400 hover:text-gray-600 leading-none">&times;</button>
                </header>
                
                <div className="p-4 flex-grow overflow-y-auto">
                    {renderStepContent()}
                </div>

                {shouldShowFooter && (
                     <footer className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50 flex-shrink-0">
                        <button onClick={handlers.onBack} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                            Πίσω
                        </button>
                        {state.step === 'details' && (
                             <div className="relative group">
                                <button
                                    onClick={handlers.onFinalize}
                                    disabled={!isDetailsStepValid}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Ολοκλήρωση
                                </button>
                                {!isDetailsStepValid && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max hidden group-hover:block px-2 py-1 bg-gray-700 text-white text-xs rounded-md shadow-lg">
                                        Παρακαλώ συμπληρώστε όλα τα απαραίτητα πεδία (*).
                                    </div>
                                )}
                            </div>
                        )}
                    </footer>
                )}
            </div>
        </>
    );
};

export default ListingWizard;