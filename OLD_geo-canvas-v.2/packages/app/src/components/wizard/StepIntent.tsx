import React from 'react';
import { ListingIntent, ListingCategory } from '@geo-platform/shared';
import { useUiContext } from '../../context/UiContext';

interface StepIntentProps {
    onSelect: (intent: ListingIntent) => void;
    category: ListingCategory | null;
}

const StepIntent: React.FC<StepIntentProps> = ({ onSelect, category }) => {
    const { actions } = useUiContext();

    const handleInfoClick = (e: React.MouseEvent, intent: ListingIntent) => {
        e.stopPropagation();
        
        let message = '';
        if (intent === 'offer') {
            message = category === 'property' 
                ? 'Επιλέξτε αυτό αν θέλετε να προσφέρετε ένα ακίνητο προς πώληση ή ενοικίαση. Θέλετε να συνεχίσετε με την προσφορά;'
                : 'Επιλέξτε αυτό αν θέλετε να δημοσιεύσετε μια αγγελία για μια διαθέσιμη θέση εργασίας. Θέλετε να συνεχίσετε με την προσφορά;';
        } else { // search
            message = category === 'property'
                ? 'Επιλέξτε αυτό αν θέλετε να δημιουργήσετε μια ειδοποίηση (Geo-Alert) για μελλοντικά ακίνητα που θα σας ενδιαφέρουν σε μια περιοχή. Θέλετε να συνεχίσετε με την αναζήτηση;'
                : 'Επιλέξτε αυτό αν θέλετε να δηλώσετε τη διαθεσιμότητά σας και τις δεξιότητές σας για εύρεση εργασίας σε μια περιοχή. Θέλετε να συνεχίσετε με την αναζήτηση;';
        }

        actions.showToast({
            message,
            onConfirm: () => onSelect(intent),
        });
    };

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
                className="relative w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <div>
                    <h4 className="font-bold text-gray-800">{currentOffer.title}</h4>
                    <p className="text-sm text-gray-600">{currentOffer.description}</p>
                </div>
                 <button
                    onClick={(e) => handleInfoClick(e, 'offer')}
                    className="absolute bottom-2 right-2 p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                    aria-label="Πληροφορίες"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </button>
            </button>
            <button
                onClick={() => onSelect('search')}
                className="relative w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <div>
                    <h4 className="font-bold text-gray-800">{currentSearch.title}</h4>
                    <p className="text-sm text-gray-600">{currentSearch.description}</p>
                </div>
                 <button
                    onClick={(e) => handleInfoClick(e, 'search')}
                    className="absolute bottom-2 right-2 p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                    aria-label="Πληροφορίες"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </button>
            </button>
        </div>
    );
};

export default StepIntent;