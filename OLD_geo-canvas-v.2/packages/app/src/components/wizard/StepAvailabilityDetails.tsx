import React from 'react';
// FIX: Replaced deprecated useAppContext with useUiContext as AppContext is obsolete.
import { useUiContext } from '../../context/UiContext';
import { ListingCategory } from '@geo-platform/shared';

interface StepAvailabilityDetailsProps {
    onNext: () => void;
    category: ListingCategory | null;
}

const StepAvailabilityDetails: React.FC<StepAvailabilityDetailsProps> = ({ onNext, category }) => {
    const { wizardState, actions } = useUiContext();
    const { transactionType, availabilityDate, availabilityDuration, availabilityDurationUnit } = wizardState;

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        actions.setWizardState({ availabilityDate: e.target.value });
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? null : parseInt(e.target.value, 10);
        actions.setWizardState({ availabilityDuration: value });
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        actions.setWizardState({ availabilityDurationUnit: e.target.value as 'months' | 'years' });
    };

    const showDuration = transactionType === 'rent' || category === 'job';
    const isNextDisabled = !availabilityDate || (showDuration && (availabilityDuration === null || availabilityDuration <= 0));
    
    const durationLabel = category === 'job' ? 'Διάρκεια Απασχόλησης' : 'Διάρκεια Ενοικίασης';
    
    const getDescription = () => {
        if (category === 'job') {
            return 'Δηλώστε πότε ξεκινά η διαθεσιμότητα και για πόσο καιρό.';
        }
        return transactionType === 'rent' 
            ? 'Δηλώστε πότε θα είναι διαθέσιμο το ακίνητο και για πόσο καιρό.'
            : 'Δηλώστε πότε θα είναι διαθέσιμο το ακίνητο προς πώληση.';
    };

    return (
        <div className="flex flex-col space-y-4">
            <div>
                <label htmlFor="availability-date" className="block text-sm font-medium text-gray-700">Ημερομηνία Διαθεσιμότητας</label>
                <input
                    type="date"
                    id="availability-date"
                    value={availabilityDate || ''}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split('T')[0]} // Set min date to today
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            {showDuration && (
                <div>
                    <label htmlFor="availability-duration" className="block text-sm font-medium text-gray-700">{durationLabel}</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            type="number"
                            id="availability-duration"
                            value={availabilityDuration || ''}
                            onChange={handleDurationChange}
                            min="1"
                            className="flex-grow block w-full px-3 py-2 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="π.χ. 12"
                        />
                        <select
                            value={availabilityDurationUnit || 'months'}
                            onChange={handleUnitChange}
                            className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                        >
                            <option value="months">Μήνες</option>
                            <option value="years">Χρόνια</option>
                        </select>
                    </div>
                </div>
            )}
            
            <p className="text-xs text-gray-500">
                {getDescription()}
            </p>

            <button
                onClick={onNext}
                disabled={isNextDisabled}
                className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Επόμενο
            </button>
        </div>
    );
};

export default StepAvailabilityDetails;