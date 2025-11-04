import React, { useEffect, useCallback, useState } from 'react';
import { useUiContext } from '../../context/UiContext';
import { formatDistance, formatArea, DistanceUnit, AreaUnit, DISTANCE_UNITS_INFO, AREA_UNITS_INFO, calculateProjectedArea } from '../utils/measurementUtils';
import { DrawingShape, ListingCategory, ListingIntent, GeoJSONFeature } from '@geo-platform/shared';
import { geocodeAddress, GeocodingResult, fetchAdministrativeHierarchy, HierarchyResult } from '../utils/geocoding';
import L from 'leaflet';

interface StepDrawLocationProps {
    onDone: () => void;
    onGeoJsonSelect: (geojson: GeoJSONFeature, name: string) => void;
    category: ListingCategory | null;
    intent: ListingIntent | null;
    onBack: () => void;
    map: L.Map | null;
}

const StepDrawLocation: React.FC<StepDrawLocationProps> = ({ onDone, onGeoJsonSelect, category, intent, onBack, map }) => {
    const { wizardState, drawingState, actions, searchedLocation, drawingDistanceUnit, drawingAreaUnit } = useUiContext();
    const { setSearchedLocation, startDrawing, cancelDrawing, setDrawingRadius, setDrawingDistanceUnit, setDrawingAreaUnit, showToast } = actions;
    const { isActive, isFinished, shape, radius, points } = drawingState;
    const { details } = wizardState;
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<GeocodingResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'search' | 'draw'>('search');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // New state for two-step search
    const [view, setView] = useState<'search' | 'hierarchy'>('search');
    const [hierarchyResults, setHierarchyResults] = useState<HierarchyResult[]>([]);
    const [selectedResultForHierarchy, setSelectedResultForHierarchy] = useState<GeocodingResult | null>(null);


    useEffect(() => {
        if (isFinished && (searchedLocation || shape)) {
            setShowSuccessMessage(true);
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000); 

            return () => clearTimeout(timer); 
        }
    }, [isFinished, searchedLocation, shape]);


    const handleStartDrawing = (selectedShape: DrawingShape) => {
        startDrawing(selectedShape);
        if (intent === 'offer' && selectedShape === 'marker' && category === 'property') {
            setDrawingRadius(50);
        }
    };

    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDrawingRadius(parseInt(e.target.value, 10));
    };
    
    const handleProximityDetailsChange = (field: 'proximityPreference' | 'proximityRadius', value: boolean | number) => {
        actions.setWizardState({
            details: {
                ...details,
                [field]: value
            }
        });
    };

    const handleInfoClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        showToast({
            message: 'Σε αυτό το βήμα, ορίστε τη θέση της καταχώρησής σας. Χρησιμοποιήστε την αναζήτηση για να βρείτε μια διεύθυνση, τη θέση σας, ή σχεδιάστε την περιοχή απευθείας στον χάρτη.',
        });
    };

    const handleSearch = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setIsLoading(true);
        setError(null);
        setResults([]);
        setView('search'); // Ensure we are in the main search view

        try {
            const viewbox = map ? map.getBounds() : undefined;
            const geocodedResults = await geocodeAddress(query, viewbox);
            if (geocodedResults.length === 0) {
                setError('Δεν βρέθηκε η τοποποσία. Δοκιμάστε έναν διαφορετικό όρο αναζήτησης ή προσθέστε μια πόλη/ΤΚ.');
            }
            setResults(geocodedResults);
        } catch (err) {
            setError('Παρουσιάστηκε σφάλμα κατά την αναζήτηση.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [query, map]);

    const handleResultClick = async (result: GeocodingResult) => {
        setIsLoading(true);
        setResults([]);
        setQuery('');
        setError(null);
        setSelectedResultForHierarchy(result);

        try {
            const hierarchy = await fetchAdministrativeHierarchy(result.lat, result.lng);
            if (hierarchy.length === 0) {
                 // If hierarchy fails, fall back to the original point-based action
                if (result.geojson) {
                    onGeoJsonSelect(result.geojson, result.displayName);
                } else {
                    setSearchedLocation(result);
                    startDrawing('marker');
                    actions.addDrawingPoint(L.latLng(result.lat, result.lng));
                    actions.finishDrawing();
                }
                setActiveTab('draw');
            } else {
                setHierarchyResults(hierarchy);
                setView('hierarchy');
            }
        } catch (err) {
            setError('Αποτυχία ανάκτησης διοικητικής ιεραρχίας.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleHierarchyResultClick = (hierarchyResult: HierarchyResult) => {
        onGeoJsonSelect(hierarchyResult.geojson, hierarchyResult.name);
        setActiveTab('draw');
        // Reset search state
        setView('search');
        setHierarchyResults([]);
        setSelectedResultForHierarchy(null);
    };

    const handleBackToSearch = () => {
        setView('search');
        setHierarchyResults([]);
        setSelectedResultForHierarchy(null);
        setError(null);
    };
    
    const handleFindMe = () => {
        if (navigator.geolocation) {
            setIsLoading(true);
            setError(null);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const result: GeocodingResult = {
                        lat: latitude,
                        lng: longitude,
                        displayName: 'Η τρέχουσα τοποθεσία σας',
                        structuredDisplayName: { main: 'Η τρέχουσα τοποθεσία σας', secondary: '' },
                    };
                    setSearchedLocation(result);
                    
                    startDrawing('marker');
                    actions.addDrawingPoint(L.latLng(result.lat, result.lng));
                    actions.finishDrawing();
                    
                    setIsLoading(false);
                    setActiveTab('draw');
                },
                (err) => {
                    let message = 'Δεν ήταν δυνατός ο εντοπισμός της τοποθεσίας σας.';
                    if (err.code === 1) {
                        message = 'Η άδεια για τον εντοπισμό τοποθεσίας απορρίφθηκε.';
                    } else if (err.code === 2) {
                        message = 'Η πληροφορία τοποθεσίας δεν είναι διαθέσιμη.';
                    } else if (err.code === 3) {
                        message = 'Το αίτημα για εντοπισμό τοποθεσίας έληξε.';
                    }
                    setError(message);
                    setIsLoading(false);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            setError('Η γεωεντοπισμός δεν υποστηρίζεται από αυτόν τον browser.');
        }
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
        return { title: 'Οριοθετήστε την περιοχή', polygonButton: 'Σχεδίαση Περιοχής', radiusLabel: 'Ακτίνα' };
    };

    const texts = getTexts();
    const isPropertySearch = category === 'property' && intent === 'search';
    const maxRadius = isPropertySearch ? 10000 : 500;
    const radiusStep = isPropertySearch ? 100 : 50;
    const radiusLabel = texts.radiusLabel;
    const currentRadius = radius ?? (intent === 'offer' ? 50 : 250);
    const circleArea = Math.PI * Math.pow(currentRadius, 2);

    const polygonArea = React.useMemo(() => {
        if (isFinished && (shape === 'polygon' || shape === 'freehand') && points.length > 2) {
            return calculateProjectedArea(points);
        }
        return 0;
    }, [isFinished, shape, points]);
    
    useEffect(() => {
        if (shape === 'marker') {
            if (currentRadius >= 1000) setDrawingDistanceUnit('km');
            else setDrawingDistanceUnit('m');
        }
        const areaToConsider = (shape === 'polygon' || shape === 'freehand') ? polygonArea : circleArea;
        if (areaToConsider >= 1000000) setDrawingAreaUnit('km2');
        else if (areaToConsider >= 1000) setDrawingAreaUnit('str');
        else setDrawingAreaUnit('m2');
    }, [currentRadius, circleArea, polygonArea, shape, setDrawingDistanceUnit, setDrawingAreaUnit]);
    
    const distanceUnitOptions = Object.entries(DISTANCE_UNITS_INFO).map(([value, { label }]) => ({ value: value as DistanceUnit, label }));
    const areaUnitOptions = Object.entries(AREA_UNITS_INFO).map(([value, { label }]) => ({ value: value as AreaUnit, label }));

    const renderSearchContent = () => {
        if (isLoading && view === 'hierarchy') {
             return <div className="text-center p-4">
                <svg className="animate-spin h-6 w-6 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p className="text-sm text-gray-600 mt-2">Ανάκτηση ιεραρχίας...</p>
            </div>;
        }

        if (view === 'hierarchy') {
            return (
                <div className="space-y-3 animate-fade-in-down">
                     <button onClick={handleBackToSearch} className="flex items-center text-sm font-medium text-blue-600 hover:underline mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Πίσω στην Αναζήτηση
                    </button>
                    <p className="text-sm text-gray-700">Επιλέξτε το διοικητικό επίπεδο για την περιοχή <strong className="text-gray-900">"{selectedResultForHierarchy?.displayName}"</strong>:</p>
                    {hierarchyResults.length > 0 ? (
                        <ul className="border border-gray-300 rounded-md shadow-lg overflow-auto">
                           {hierarchyResults.map((result, index) => (
                                <li key={result.name} className={index > 0 ? "border-t border-gray-200" : ""}>
                                    <button
                                        onClick={() => handleHierarchyResultClick(result)}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <strong className="font-semibold text-blue-700">{result.level}:</strong> {result.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 text-center p-4">Δεν βρέθηκε διοικητική ιεραρχία.</p>
                    )}
                </div>
            );
        }
        // Default 'search' view
        return (
            <div className="space-y-3">
                <div className="flex items-stretch gap-2">
                    <button type="button" onClick={handleFindMe} disabled={isLoading} className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400" title="Βρες τη θέση μου">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    </button>
                    <form onSubmit={handleSearch} className="flex h-10 flex-grow">
                        <label htmlFor="area-search" className="sr-only">Αναζήτηση Περιοχής</label>
                        <input id="area-search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="flex-grow block w-full px-3 bg-white border border-r-0 border-gray-300 rounded-l-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Αναζήτηση οδού ή περιοχής..." disabled={isLoading} />
                        <button type="submit" className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-sm font-medium text-white bg-blue-600 rounded-r-md hover:bg-blue-700 disabled:bg-blue-300" disabled={isLoading || !query} title="Αναζήτηση">
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                            )}
                        </button>
                    </form>
                </div>
                 {error && <p className="text-xs text-red-600">{error}</p>}
                 {results.length > 0 && (
                    <ul className="mt-2 border border-gray-300 rounded-md shadow-lg overflow-auto">
                        {results.map((result, index) => (
                            <li key={`${result.lat}-${result.lng}-${index}`} className={index > 0 ? "border-t border-gray-200" : ""}>
                                <button onClick={() => handleResultClick(result)} className="w-full text-left px-3 py-2 hover:bg-gray-100">
                                    <span className="font-semibold block text-sm text-gray-800" title={result.structuredDisplayName.main}>{result.structuredDisplayName.main}</span>
                                    <span className="text-xs text-gray-500 block truncate" title={result.structuredDisplayName.secondary}>{result.structuredDisplayName.secondary}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };


    return (
        <div className="flex flex-col h-full">
            {isActive && !isFinished ? (
                 <div className="p-3 bg-blue-50 border border-blue-200 rounded-md animate-fade-in-down">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-blue-800">{shape === 'polygon' ? 'Σχεδίαση σε εξέλιξη...' : shape === 'freehand' ? 'Ελεύθερη σχεδίαση...' : 'Τοποθέτηση πινέζας...'}</p>
                        <button onClick={() => cancelDrawing()} className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200">Ακύρωση</button>
                    </div>
                    <p className="text-xs text-blue-700 mt-2 text-center">{shape === 'polygon' ? 'Click: Προσθήκη σημείου | Click στο 1ο σημείο: Ολοκλήρωση' : shape === 'freehand' ? 'Κρατήστε πατημένο και σχεδιάστε. Αφήστε για ολοκλήρωση.' : 'Επιλέξτε το σημείο ενδιαφέροντος.'}</p>
                </div>
            ) : (
                <div className="flex flex-col space-y-4 animate-fade-in-down flex-grow">
                    {showSuccessMessage && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-md text-center animate-fade-in-down">
                            <p className="text-sm font-semibold text-green-800">Η τοποθεσία αποθηκεύτηκε!</p>
                            <p className="text-xs text-green-700 mt-1">Μπορείτε να κάνετε προσαρμογές ή να πατήσετε "Επόμενο".</p>
                        </div>
                    )}
                    <div className="flex border-b border-gray-200"><button onClick={() => setActiveTab('search')} className={`flex-1 py-2 text-sm font-medium text-center ${activeTab === 'search' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Αναζήτηση</button><button onClick={() => setActiveTab('draw')} className={`flex-1 py-2 text-sm font-medium text-center ${activeTab === 'draw' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Σχεδίαση</button></div>
                    <div className="pt-2 flex-grow overflow-y-auto">{activeTab === 'search' ? renderSearchContent() : (
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-800 mb-2">{texts.title}</p>
                                {isFinished ? (
                                    <button onClick={() => cancelDrawing()} className="w-full px-3 py-2 text-sm font-medium rounded-md text-center bg-yellow-500 text-white hover:bg-yellow-600 shadow">Εκκαθάριση Σχεδίου</button>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2">
                                        <button onClick={() => handleStartDrawing('polygon')} className={`px-3 py-2 text-sm font-medium rounded-md text-center bg-gray-200 text-gray-800 hover:bg-gray-300`}>{texts.polygonButton}</button>
                                        <button onClick={() => handleStartDrawing('freehand')} className={`px-3 py-2 text-sm font-medium rounded-md text-center bg-gray-200 text-gray-800 hover:bg-gray-300`}>Ελεύθερη Σχεδίαση</button>
                                        <button onClick={() => handleStartDrawing('marker')} className={`px-3 py-2 text-sm font-medium rounded-md text-center bg-gray-200 text-gray-800 hover:bg-gray-300`}>Τοποθέτηση Πινέζας</button>
                                    </div>
                                )}
                            </div>
                            {isFinished && shape === 'marker' && (<div className="space-y-3"><div><label htmlFor="radius-slider" className="block text-sm font-medium text-gray-700">{radiusLabel}</label><input id="radius-slider" type="range" min="50" max={maxRadius} step={radiusStep} value={currentRadius} onChange={handleRadiusChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div><div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-2 text-sm p-2 bg-gray-50 rounded-md"><div className="font-semibold text-gray-700 text-right">Ακτίνα:</div><div className="font-mono font-bold text-gray-800 text-left">{formatDistance(currentRadius, drawingDistanceUnit === 'm' ? 0 : 2, drawingDistanceUnit)}</div><select value={drawingDistanceUnit} onChange={(e) => setDrawingDistanceUnit(e.target.value as DistanceUnit)} className="text-xs border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md py-1">{distanceUnitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select><div className="font-semibold text-gray-700 text-right">Εμβαδόν:</div><div className="font-mono font-bold text-gray-800 text-left">{formatArea(circleArea, { unit: drawingAreaUnit })}</div><select value={drawingAreaUnit} onChange={(e) => setDrawingAreaUnit(e.target.value as AreaUnit)} className="text-xs border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md py-1">{areaUnitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select></div></div>)}
                            {isFinished && (shape === 'polygon' || shape === 'freehand') && polygonArea > 0 && (<div className="space-y-3"><div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-2 text-sm p-2 bg-gray-50 rounded-md"><div className="font-semibold text-gray-700 text-right">Εμβαδόν:</div><div className="font-mono font-bold text-gray-800 text-left">{formatArea(polygonArea, { unit: drawingAreaUnit })}</div><select value={drawingAreaUnit} onChange={(e) => setDrawingAreaUnit(e.target.value as AreaUnit)} className="text-xs border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md py-1">{areaUnitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select></div></div>)}
                            {isFinished && category === 'job' && intent === 'offer' && (<div className="space-y-3 border-t border-gray-200 pt-4"><label className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer"><input type="checkbox" checked={!!details.proximityPreference} onChange={(e) => handleProximityDetailsChange('proximityPreference', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" /><span>Προτίμηση για κοντινούς υποψηφίους</span></label>{details.proximityPreference && (<div className="space-y-2"><label htmlFor="proximity-radius-slider" className="block text-sm text-gray-600">Μέγιστη επιθυμητή απόσταση</label><input id="proximity-radius-slider" type="range" min="1" max="30" step="1" value={details.proximityRadius || 10} onChange={(e) => handleProximityDetailsChange('proximityRadius', parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /><div className="text-center text-sm text-gray-600 font-semibold"><span>{details.proximityRadius || 10} χλμ</span></div></div>)}</div>)}
                        </div>
                    )}</div>
                </div>
            )}
            <div className="mt-auto pt-4 flex items-center justify-between">
                <button onClick={onBack} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Πίσω</button>
                <div className="flex items-center gap-2">
                     <button onClick={onDone} disabled={!isFinished} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Επόμενο</button>
                    <button onClick={handleInfoClick} className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-colors" aria-label="Πληροφορίες"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg></button>
                </div>
            </div>
        </div>
    );
};

export default StepDrawLocation;