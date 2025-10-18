import React from 'react';
import L from 'leaflet';
import { useUiContext } from '../../context/UiContext';
import { useLayersContext } from '../../context/layers/LayersProvider';
import { useWizard } from './hooks/useWizard';
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

const ListingWizard: React.FC<ListingWizardProps> = ({ map }) => {
    const { wizardState } = useUiContext(); // Still need this for isActive and details
    const { editingLayerId } = useLayersContext();
    const { state, title, showFooter, handlers } = useWizard(map);

    const renderStepContent = () => {
        // Positioning is a special case that overlays the location step
        if (editingLayerId && state.step === 'location') {
            return <StepPositioning onDone={handlers.onPositioningDone} />;
        }
        
        switch (state.step) {
            case 'category':
                return <StepCategory onSelect={handlers.onSelectCategory} />;
            case 'intent':
                return <StepIntent onSelect={handlers.onSelectIntent} category={state.category} />;
            case 'transactionType':
                return <StepTransactionType onSelect={handlers.onSelectTransaction} />;
            case 'employmentType':
                return <StepEmploymentType onSelect={handlers.onSelectEmployment} />;
            case 'availability':
                return <StepAvailability onSelect={handlers.onSelectAvailability} category={state.category} intent={state.intent} />;
            case 'availabilityDetails':
                return <StepAvailabilityDetails onNext={handlers.onAvailabilityDetailsNext} category={state.category} />;
            case 'location':
                if (state.intent === 'offer') {
                    return (state.category === 'property' && state.availability === 'now')
                        ? <StepLocationOffer onFileSelect={handlers.onFileSelect} />
                        : <StepDrawLocation onDone={handlers.onDrawingDone} category={state.category} intent={state.intent} />;
                }
                return <StepDrawLocation onDone={handlers.onDrawingDone} category={state.category} intent={state.intent} />;
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

    const shouldShowFooter = showFooter && !editingLayerId;

    return (
        <div className="absolute top-20 right-4 z-[1001] bg-white rounded-lg shadow-2xl w-96 flex flex-col max-h-[calc(100vh-120px)]">
            <header className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Νέα Καταχώρηση</h2>
                    {title && <p className="text-sm text-gray-500">{title}</p>}
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
                        <button onClick={handlers.onFinalize} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            Ολοκλήρωση
                        </button>
                    )}
                </footer>
            )}
        </div>
    );
};

export default ListingWizard;
