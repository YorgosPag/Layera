import React from 'react';
import { EmploymentType } from '../../shared/types';

interface StepEmploymentTypeProps {
    onSelect: (type: EmploymentType) => void;
}

const options: { type: EmploymentType; title: string; description: string }[] = [
    { type: 'full_time', title: 'Πλήρης Απασχόληση', description: 'Μόνιμη θέση πλήρους ωραρίου.' },
    { type: 'part_time', title: 'Μερική Απασχόληση', description: 'Θέση με μειωμένο ωράριο.' },
    { type: 'freelance', title: 'Freelance / Project', description: 'Εργασία ανά έργο ή ως ελεύθερος επαγγελματίας.' },
    { type: 'seasonal', title: 'Εποχιακή Εργασία', description: 'Εργασία για συγκεκριμένη χρονική περίοδο.' },
];

const StepEmploymentType: React.FC<StepEmploymentTypeProps> = ({ onSelect }) => {
    return (
        <div className="flex flex-col space-y-3">
            {options.map(({ type, title, description }) => (
                <button
                    key={type}
                    onClick={() => onSelect(type)}
                    className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
                >
                    <h4 className="font-bold text-gray-800">{title}</h4>
                    <p className="text-sm text-gray-600">{description}</p>
                </button>
            ))}
        </div>
    );
};

export default StepEmploymentType;
