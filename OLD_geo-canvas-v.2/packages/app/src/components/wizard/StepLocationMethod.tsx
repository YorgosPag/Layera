import React from 'react';
import { useUiContext } from '../../context/UiContext';

interface StepLocationMethodProps {
    onSelect: (method: 'file' | 'draw') => void;
}

const StepLocationMethod: React.FC<StepLocationMethodProps> = ({ onSelect }) => {
    const { actions } = useUiContext();

    const handleInfoClick = (e: React.MouseEvent, method: 'file' | 'draw') => {
        e.stopPropagation();
        const message = method === 'file'
            ? 'Ανεβάστε ένα αρχείο κάτοψης (π.χ. DXF, PNG, JPG) για να το τοποθετήσετε με ακρίβεια στον χάρτη. Θέλετε να συνεχίσετε;'
            : 'Σχεδιάστε ένα περίγραμμα ή τοποθετήστε μια πινέζα απευθείας στον χάρτη για να ορίσετε την περιοχή. Θέλετε να συνεχίσετε;';
        
        actions.showToast({
            message,
            onConfirm: () => onSelect(method),
        });
    };

    return (
        <div className="flex flex-col space-y-3">
            <button
                onClick={() => onSelect('file')}
                className="relative w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <div>
                    <h4 className="font-bold text-gray-800">Καταχώρηση Κάτοψης</h4>
                    <p className="text-sm text-gray-600">Ανεβάστε ένα αρχείο (DXF, PNG, JPG) για να το τοποθετήσετε στον χάρτη.</p>
                </div>
                <button
                    onClick={(e) => handleInfoClick(e, 'file')}
                    className="absolute bottom-2 right-2 p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                    aria-label="Πληροφορίες"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </button>
            </button>
            <button
                onClick={() => onSelect('draw')}
                className="relative w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <div>
                    <h4 className="font-bold text-gray-800">Σχεδίαση στον Χάρτη</h4>
                    <p className="text-sm text-gray-600">Τοποθετήστε μια πινέζα ή σχεδιάστε ένα περίγραμμα για να ορίσετε την τοποθεσία.</p>
                </div>
                 <button
                    onClick={(e) => handleInfoClick(e, 'draw')}
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

export default StepLocationMethod;