import React from 'react';
import { MeasurementMode } from '../../hooks/useMeasurement';
import { formatDistance, formatArea, DistanceUnit, AreaUnit, DISTANCE_UNITS_INFO, AREA_UNITS_INFO } from '../utils/measurementUtils';
import { useUiContext } from '../../context/UiContext';

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
    const { drawingDistanceUnit, drawingAreaUnit, actions } = useUiContext();
    const { setDrawingDistanceUnit, setDrawingAreaUnit } = actions;

    const distanceUnitOptions = Object.entries(DISTANCE_UNITS_INFO).map(([value, { label }]) => ({ value: value as DistanceUnit, label }));
    const areaUnitOptions = Object.entries(AREA_UNITS_INFO).map(([value, { label }]) => ({ value: value as AreaUnit, label }));

    return (
        <div className="bg-white p-2 rounded-lg shadow-lg min-w-[200px]">
            <h3 className="text-base font-bold text-gray-800 mb-2 text-center">Μέτρηση</h3>
            <div className="grid grid-cols-2 gap-1 mb-2">
                <button onClick={() => onModeChange('distance')} className={`px-2 py-1 text-xs font-medium rounded ${mode === 'distance' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Απόσταση</button>
                <button onClick={() => onModeChange('area')} className={`px-2 py-1 text-xs font-medium rounded ${mode === 'area' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Έκταση</button>
            </div>
            <div className="text-sm text-gray-700 p-1 bg-gray-50 rounded min-h-[40px] flex flex-col justify-center">
                {mode === 'distance' && (
                    <div className="flex items-center justify-between">
                        <p>Απόσταση:</p>
                        <div className="flex items-center gap-1">
                            <strong>{formatDistance(distance, 2, drawingDistanceUnit)}</strong>
                            <select
                                value={drawingDistanceUnit}
                                onChange={(e) => setDrawingDistanceUnit(e.target.value as DistanceUnit)}
                                className="text-xs border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md py-0.5"
                            >
                                {distanceUnitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                    </div>
                )}
                {mode === 'area' && (
                    <div className="flex items-center justify-between">
                        <p>Έκταση:</p>
                        <div className="flex items-center gap-1">
                            <strong>{formatArea(area, { unit: drawingAreaUnit })}</strong>
                            <select
                                value={drawingAreaUnit}
                                onChange={(e) => setDrawingAreaUnit(e.target.value as AreaUnit)}
                                className="text-xs border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md py-0.5"
                            >
                                {areaUnitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={onReset} className="mt-2 w-full text-center px-2 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600 shadow">Καθαρισμός</button>
            <p className="text-xs text-gray-500 mt-2 text-center leading-tight">Click: Προσθήκη σημείου<br/>Dbl-Click: Ολοκλήρωση<br/>Esc: Ακύρωση</p>
        </div>
    );
};

export default MeasurementControls;