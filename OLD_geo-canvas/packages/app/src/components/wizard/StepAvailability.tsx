import React from 'react';
import { Availability, ListingCategory, ListingIntent } from '@geo-platform/shared';

interface StepAvailabilityProps {
    onSelect: (availability: Availability) => void;
    category: ListingCategory | null;
    intent: ListingIntent | null;
}

const StepAvailability: React.FC<StepAvailabilityProps> = ({ onSelect, category, intent }) => {
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
                className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <h4 className="font-bold text-gray-800">{texts.now.title}</h4>
                <p className="text-sm text-gray-600">{texts.now.description}</p>
            </button>
            <button
                onClick={() => onSelect('future')}
                className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <h4 className="font-bold text-gray-800">{texts.future.title}</h4>
                <p className="text-sm text-gray-600">{texts.future.description}</p>
            </button>
        </div>
    );
};

export default StepAvailability;