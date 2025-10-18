
import React from 'react';
import AddressSearch from './AddressSearch';
import TransformControls from './TransformControls';

interface StepPositioningProps {
    onDone: () => void;
}

const StepPositioning: React.FC<StepPositioningProps> = ({ onDone }) => {
    return (
        <div className="flex flex-col space-y-4">
            <AddressSearch />
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-blue-800 mb-2">Εργαλεία Τοποθέτησης</p>
                <p className="text-xs text-blue-700 mb-3">
                    Χρησιμοποιήστε τα χειριστήρια πάνω στον χάρτη για να μετακινήσετε, να αλλάξετε μέγεθος και να περιστρέψετε την κάτοψη.
                    Ενεργοποιήστε την έλξη (μαγνήτης) για ακριβή τοποθέτηση πάνω σε κτίρια.
                </p>
                <TransformControls />
            </div>
            <button
                onClick={onDone}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
                Αποθήκευση Τοποθεσίας & Συνέχεια
            </button>
        </div>
    );
};

export default StepPositioning;
