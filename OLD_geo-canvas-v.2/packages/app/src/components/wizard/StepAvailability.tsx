import React from 'react';
import { Availability, ListingCategory, ListingIntent } from '@geo-platform/shared';
import { useUiContext } from '../../context/UiContext';

interface StepAvailabilityProps {
    onSelect: (availability: Availability) => void;
    category: ListingCategory | null;
    intent: ListingIntent | null;
}

const StepAvailability: React.FC<StepAvailabilityProps> = ({ onSelect, category, intent }) => {
    const { actions } = useUiContext();

    const handleInfoClick = (e: React.MouseEvent, availability: Availability) => {
        e.stopPropagation();
        const message = availability === 'now'
            ? 'Η καταχώρηση θα επισημανθεί ως άμεσα διαθέσιμη. Θέλετε να συνεχίσετε;'
            : 'Θα σας ζητηθεί να ορίσετε την ημερομηνία διαθεσιμότητας στο επόμενο βήμα. Θέλετε να συνεχίσετε;';
        
        actions.showToast({
            message,
            onConfirm: () => onSelect(availability),
        });
    };

    const getTexts = () => {
        if (category === 'job') {
            return {
                now: {
                    title: 'Άμεση Διαθεσιμότητα',
                    description: intent === 'offer' ? 'Η θέση εργασίας είναι διαθέσιμη για άμεση έναρξη.' : 'Είμαι διαθέσιμος/η να ξεκινήσω άμεσα.'
                },
                future: {
                    title: 'Μελλοντική Διαθεσιμότητα',
                    description: intent === 'offer' ? 'Η θέση εργασίας θα είναι διαθέσιμη σε μελλοντική ημερομηνία.' : 'Θα είμαι διαθέσιμος/η να ξεκινήσω στο μέλλον.'
                }
            };
        }
        // Default (property)
        return {
            now: {
                title: 'Άμεσα Διαθέσιμο',
                description: 'Το ακίνητο είναι διαθέσιμο τώρα.'
            },
            future: {
                title: 'Διαθέσιμο στο Μέλλον',
                description: 'Το ακίνητο θα είναι διαθέσιμο σε μελλοντική ημερομηνία.'
            }
        };
    };

    const texts = getTexts();

    return (
        <div className="flex flex-col space-y-3">
            <button
                onClick={() => onSelect('now')}
                className="relative w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <div>
                    <h4 className="font-bold text-gray-800">{texts.now.title}</h4>
                    <p className="text-sm text-gray-600">{texts.now.description}</p>
                </div>
                <button
                    onClick={(e) => handleInfoClick(e, 'now')}
                    className="absolute bottom-2 right-2 p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                    aria-label="Πληροφορίες"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </button>
            </button>
            <button
                onClick={() => onSelect('future')}
                className="relative w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <div>
                    <h4 className="font-bold text-gray-800">{texts.future.title}</h4>
                    <p className="text-sm text-gray-600">{texts.future.description}</p>
                </div>
                <button
                    onClick={(e) => handleInfoClick(e, 'future')}
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

export default StepAvailability;