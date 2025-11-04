import React from 'react';
import { ListingCategory } from '@geo-platform/shared';
import { useUiContext } from '../../context/UiContext';

interface StepCategoryProps {
    onSelect: (category: ListingCategory) => void;
}

const StepCategory: React.FC<StepCategoryProps> = ({ onSelect }) => {
    const { actions } = useUiContext();

    const handleInfoClick = (e: React.MouseEvent, category: ListingCategory) => {
        e.stopPropagation(); // Prevent the parent div's onClick from firing
        const message = category === 'property'
            ? 'Η επιλογή "Ακίνητα" σας επιτρέπει να καταχωρήσετε ακίνητα (προς πώληση/ενοικίαση) ή να δημιουργήσετε ειδοποιήσεις για αναζήτηση.'
            : 'Η επιλογή "Εργασία" σας επιτρέπει να δημοσιεύσετε μια αγγελία εργασίας ή να δηλώσετε διαθεσιμότητα για εύρεση εργασίας σε μια περιοχή.';
        
        actions.showToast({
            message: `${message} Θέλετε να συνεχίσετε;`,
            onConfirm: () => onSelect(category),
            onCancel: () => { /* do nothing */ },
        });
    };

    return (
        <div className="flex flex-col space-y-3">
            <div
                onClick={() => onSelect('property')}
                className="relative w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all cursor-pointer"
            >
                <div>
                    <h4 className="font-bold text-gray-800">🏡 Ακίνητα</h4>
                    <p className="text-sm text-gray-600 mt-1">Καταχωρήστε ένα ακίνητο προς πώληση, ενοικίαση ή δημιουργήστε μια ειδοποίηση αναζήτησης.</p>
                </div>
                <button
                    onClick={(e) => handleInfoClick(e, 'property')}
                    className="absolute bottom-2 right-2 p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                    aria-label="Πληροφορίες για Ακίνητα"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div
                onClick={() => onSelect('job')}
                className="relative w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-green-500 transition-all cursor-pointer"
            >
                <div>
                    <h4 className="font-bold text-gray-800">💼 Εργασία</h4>
                    <p className="text-sm text-gray-600 mt-1">Προσφέρετε μια θέση εργασίας ή δηλώστε τη διαθεσιμότητά σας σε μια συγκεκριμένη περιοχή.</p>
                </div>
                 <button
                    onClick={(e) => handleInfoClick(e, 'job')}
                    className="absolute bottom-2 right-2 p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                    aria-label="Πληροφορίες για Εργασία"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default StepCategory;