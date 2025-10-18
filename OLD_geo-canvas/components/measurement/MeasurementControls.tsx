import React from 'react';
import { MeasurementMode } from '../hooks/useMeasurement';
import { formatDistance, formatArea } from '../utils/measurementUtils';

interface MeasurementControlsProps {
    mode: MeasurementMode;
    distance: number;
    area: number;
    onModeChange: (mode: MeasurementMode) => void;
    onReset: () => void;
}

const MeasurementControls: React.FC<MeasurementControlsProps> = ({
    mode,
    distance,
    area,
    onModeChange,
    onReset
}) => {
    return (
        <div className="bg-white p-2 rounded-lg shadow-lg min-w-[200px]">
            <h3 className="text-base font-bold text-gray-800 mb-2 text-center">Μέτρηση</h3>
            <div className="grid grid-cols-2 gap-1 mb-2">
                <button onClick={() => onModeChange('distance')} className={`px-2 py-1 text-xs font-medium rounded ${mode === 'distance' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Απόσταση</button>
                <button onClick={() => onModeChange('area')} className={`px-2 py-1 text-xs font-medium rounded ${mode === 'area' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Έκταση</button>
            </div>
            <div className="text-sm text-gray-700 p-1 bg-gray-50 rounded min-h-[40px] flex items-center justify-center">
                {mode === 'distance' && <p>Απόσταση: <strong>{formatDistance(distance)}</strong></p>}
                {mode === 'area' && <p>Έκταση: <strong>{formatArea(area)}</strong></p>}
            </div>
            <button onClick={onReset} className="mt-2 w-full text-center px-2 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600 shadow">Καθαρισμός</button>
            <p className="text-xs text-gray-500 mt-2 text-center leading-tight">Click: Προσθήκη σημείου<br/>Dbl-Click: Ολοκλήρωση<br/>Esc: Ακύρωση</p>
        </div>
    );
};

export default MeasurementControls;
