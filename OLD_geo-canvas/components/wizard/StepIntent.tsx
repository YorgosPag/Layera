import React from 'react';
import { ListingIntent, ListingCategory } from '../../shared/types';

interface StepIntentProps {
    onSelect: (intent: ListingIntent) => void;
    category: ListingCategory | null;
}

const StepIntent: React.FC<StepIntentProps> = ({ onSelect, category }) => {
    const offerTexts = {
        property: {
            title: 'Θέλω να Προσφέρω',
            description: 'Καταχωρήστε ένα ακίνητο προς πώληση ή ενοικίαση.'
        },
        job: {
            title: 'Θέλω να Προσφέρω Θέση',
            description: 'Δημοσιεύστε μια αγγελία για μια διαθέσιμη θέση εργασίας.'
        }
    };

    const searchTexts = {
        property: {
            title: 'Θέλω να Αναζητήσω (Geo-Alert)',
            description: 'Δημιουργήστε μια ειδοποίηση για μελλοντικά ακίνητα σε μια περιοχή.'
        },
        job: {
            title: 'Αναζητώ Εργασία',
            description: 'Δηλώστε τη διαθεσιμότητά σας και τις δεξιότητές σας σε μια περιοχή.'
        }
    };
    
    const currentOffer = category === 'job' ? offerTexts.job : offerTexts.property;
    const currentSearch = category === 'job' ? searchTexts.job : searchTexts.property;

    return (
        <div className="flex flex-col space-y-3">
            <button
                onClick={() => onSelect('offer')}
                className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <h4 className="font-bold text-gray-800">{currentOffer.title}</h4>
                <p className="text-sm text-gray-600">{currentOffer.description}</p>
            </button>
            <button
                onClick={() => onSelect('search')}
                className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <h4 className="font-bold text-gray-800">{currentSearch.title}</h4>
                <p className="text-sm text-gray-600">{currentSearch.description}</p>
            </button>
        </div>
    );
};

export default StepIntent;
