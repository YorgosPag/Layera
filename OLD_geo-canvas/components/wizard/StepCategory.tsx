import React from 'react';
import { ListingCategory } from '../../shared/types';

interface StepCategoryProps {
    onSelect: (category: ListingCategory) => void;
}

const StepCategory: React.FC<StepCategoryProps> = ({ onSelect }) => {
    return (
        <div className="flex flex-col space-y-3">
            <button
                onClick={() => onSelect('property')}
                className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <h4 className="font-bold text-gray-800">🏡 Ακίνητα</h4>
                <p className="text-sm text-gray-600 mt-1">Καταχωρήστε ένα ακίνητο προς πώληση, ενοικίαση ή δημιουργήστε μια ειδοποίηση αναζήτησης.</p>
            </button>
            <button
                onClick={() => onSelect('job')}
                className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-green-500 transition-all"
            >
                <h4 className="font-bold text-gray-800">💼 Εργασία</h4>
                <p className="text-sm text-gray-600 mt-1">Προσφέρετε μια θέση εργασίας ή δηλώστε τη διαθεσιμότητά σας σε μια συγκεκριμένη περιοχή.</p>
            </button>
        </div>
    );
};

export default StepCategory;
