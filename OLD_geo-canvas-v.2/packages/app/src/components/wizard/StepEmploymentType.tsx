import React from 'react';
import { EmploymentType } from '@geo-platform/shared';
import { useUiContext } from '../../context/UiContext';

interface StepEmploymentTypeProps {
    onSelect: (type: EmploymentType) => void;
}

const options: { type: EmploymentType; title: string; description: string }[] = [
    { type: 'full_time', title: 'Πλήρης Απασχόληση', description: 'Μόνιμη θέση πλήρους ωραρίου.' },
    { type: 'part_time', title: 'Μερική Απασχόληση', description: 'Θέση με μειωμένο ωράριο.' },
    { type: 'freelance', title: 'Freelance / Project', description: 'Εργασία ανά έργο ή ως ελεύθερος επαγγελματίας.' },
    { type: 'seasonal', title: 'Εποχιακή Εργασία', description: 'Εργασία για συγκεκριμένη χρονική περίοδο.' },
    { type: 'internship', title: 'Πρακτική Άσκηση', description: 'Θέση πρακτικής άσκησης ή μαθητείας.' },
];

const StepEmploymentType: React.FC<StepEmploymentTypeProps> = ({ onSelect }) => {
    const { actions } = useUiContext();

    const handleInfoClick = (e: React.MouseEvent, type: EmploymentType, description: string) => {
        e.stopPropagation();
        actions.showToast({
            message: `${description} Θέλετε να συνεχίσετε;`,
            onConfirm: () => onSelect(type),
        });
    };

    return (
        <div className="flex flex-col space-y-3">
            {options.map(({ type, title, description }) => (
                <button
                    key={type}
                    onClick={() => onSelect(type)}
                    className="relative w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
                >
                    <div>
                        <h4 className="font-bold text-gray-800">{title}</h4>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <button
                        onClick={(e) => handleInfoClick(e, type, description)}
                        className="absolute bottom-2 right-2 p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                        aria-label={`Πληροφορίες για ${title}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </button>
                </button>
            ))}
        </div>
    );
};

export default StepEmploymentType;