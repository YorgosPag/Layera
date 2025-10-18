import React, { useRef } from 'react';
import { useAppContext } from '../../context/AppContext';

interface StepLocationOfferProps {
    onFileSelect: (file: File) => void;
}

const StepLocationOffer: React.FC<StepLocationOfferProps> = ({ onFileSelect }) => {
    const { editingLayerId } = useAppContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files[0]);
        }
    };
    
    if (editingLayerId) {
        return (
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800">Τοποθετήστε την κάτοψη στον χάρτη.</p>
                <p className="text-xs text-blue-600 mt-1">Όταν ολοκληρώσετε, οι αλλαγές θα αποθηκευτούν και θα προχωρήσετε στο επόμενο βήμα.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-3 p-4 border-2 border-dashed border-gray-300 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm text-gray-600">Επιλέξτε το αρχείο κάτοψης (DXF, PNG, JPG).</p>
            <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
                Επιλογή Αρχείου
            </button>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".dxf,.jpg,.jpeg,.png,.tif,.tiff"
            />
        </div>
    );
};

export default StepLocationOffer;