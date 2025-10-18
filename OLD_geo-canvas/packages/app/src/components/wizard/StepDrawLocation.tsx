import React, { useEffect } from 'react';
import { useUiContext } from '../../context/UiContext';
import { formatDistance, formatArea } from '../utils/measurementUtils';
import { DrawingShape, ListingCategory, ListingIntent } from '@geo-platform/shared';

interface StepDrawLocationProps {
    onDone: () => void;
    category: ListingCategory | null;
    intent: ListingIntent | null;
}

const StepDrawLocation: React.FC<StepDrawLocationProps> = ({ onDone, category, intent }) => {
    const { wizardState, drawingState, actions } = useUiContext();
    const { isActive, isFinished, shape, radius } = drawingState;
    const { details } = wizardState;

    useEffect(() => {
        // Automatically call onDone when a polygon drawing is finished by the user
        if (isFinished && shape === 'polygon') {
            onDone();
        }
    }, [isFinished, shape, onDone]);

    const handleStartDrawing = (selectedShape: DrawingShape) => {
        actions.startDrawing(selectedShape);
        // Set a smaller, more appropriate default radius when OFFERING a property
        if (intent === 'offer' && selectedShape === 'marker' && category === 'property') {
            actions.setDrawingRadius(50);
        }
    };

    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        actions.setDrawingRadius(parseInt(e.target.value, 10));
    };
    
    const handleProximityDetailsChange = (field: 'proximityPreference' | 'proximityRadius', value: boolean | number) => {
        actions.setWizardState({
            details: {
                ...details,
                [field]: value
            }
        });
    };

    const getTexts = () => {
        if (category === 'property') {
            return {
                title: intent === 'offer' ? 'Οριοθετήστε το ακίνητο στον χάρτη' : 'Οριοθετήστε την περιοχή ενδιαφέροντος',
                polygonButton: intent === 'offer' ? 'Σχεδίαση Περιγράμματος' : 'Σχεδίαση Περιοχής',
                radiusLabel: intent === 'offer' ? 'Ακτίνα Περιοχής Ακινήτου' : 'Ακτίνα Ειδοποίησης'
            };
        }
        if (category === 'job') {
             return {
                title: intent === 'offer' ? 'Οριοθετήστε τον χώρο εργασίας' : 'Οριοθετήστε την περιοχή που σας ενδιαφέρει',
                polygonButton: 'Σχεδίαση Περιοχής',
                radiusLabel: intent === 'offer' ? 'Ακτίνα Χώρου Εργασίας' : 'Ακτίνα Αναζήτησης'
            };
        }
        // Fallback
        return {
            title: 'Οριοθετήστε την περιοχή',
            polygonButton: 'Σχεδίαση Περιοχής',
            radiusLabel: 'Ακτίνα'
        };
    };

    const texts = getTexts();
    const maxRadius = 500; // Maximum radius is 500m for both offer and search
    const radiusLabel = texts.radiusLabel;
    const currentRadius = radius ?? (intent === 'offer' ? 50 : 250);
    const circleArea = Math.PI * Math.pow(currentRadius, 2);


    return (
        <div className="flex flex-col space-y-4">
            <button
                type="button"
                onClick={actions.flyToUserLocation}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Βρες τη θέση μου</span>
            </button>

            <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                    {texts.title}
                </p>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => handleStartDrawing('polygon')}
                        className={`px-3 py-2 text-sm font-medium rounded-md text-center ${shape === 'polygon' && isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                        {texts.polygonButton}
                    </button>
                    <button
                        onClick={() => handleStartDrawing('marker')}
                        className={`px-3 py-2 text-sm font-medium rounded-md text-center ${shape === 'marker' && isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                        Τοποθέτηση Πινέζας
                    </button>
                </div>
            </div>
            
            {isActive && !isFinished && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-center">
                    <p className="text-xs font-semibold text-blue-800">
                        {shape === 'polygon' ? 'Σχεδιάστε στον χάρτη' : 'Κάντε κλικ στον χάρτη'}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                        {shape === 'polygon' ? 'Click: Προσθήκη σημείου | Click στο 1ο σημείο: Ολοκλήρωση' : 'Επιλέξτε το σημείο ενδιαφέροντος.'}
                    </p>
                </div>
            )}
            
            {isFinished && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md text-center">
                    <p className="text-sm font-semibold text-green-800">Η τοποθεσία αποθηκεύτηκε!</p>
                </div>
            )}

            {isFinished && shape === 'marker' && (
                <div className="space-y-2">
                    <label htmlFor="radius-slider" className="block text-sm font-medium text-gray-700">{radiusLabel}</label>
                    <input
                        id="radius-slider"
                        type="range"
                        min="50"
                        max={maxRadius}
                        step="50"
                        value={currentRadius}
                        onChange={handleRadiusChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                     <div className="text-center text-sm text-gray-600 font-semibold">
                        <span>Ακτίνα: {formatDistance(currentRadius, 0)}</span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span>Εμβαδόν: {formatArea(circleArea)}</span>
                    </div>
                </div>
            )}

            {isFinished && category === 'job' && intent === 'offer' && (
                 <div className="space-y-3 border-t border-gray-200 pt-4">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={!!details.proximityPreference}
                            onChange={(e) => handleProximityDetailsChange('proximityPreference', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span>Προτίμηση για κοντινούς υποψηφίους</span>
                    </label>
                    {details.proximityPreference && (
                        <div className="space-y-2">
                            <label htmlFor="proximity-radius-slider" className="block text-sm text-gray-600">Μέγιστη επιθυμητή απόσταση</label>
                            <input
                                id="proximity-radius-slider"
                                type="range"
                                min="1"
                                max="30"
                                step="1"
                                value={details.proximityRadius || 10}
                                onChange={(e) => handleProximityDetailsChange('proximityRadius', parseInt(e.target.value, 10))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                             <div className="text-center text-sm text-gray-600 font-semibold">
                                <span>{details.proximityRadius || 10} χλμ</span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            
            <button
                onClick={onDone}
                disabled={!isFinished}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Επόμενο
            </button>
        </div>
    );
};

export default StepDrawLocation;
