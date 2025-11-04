import React, { useState, useCallback } from 'react';
import L from 'leaflet';
import { geocodeAddress, GeocodingResult } from '../utils/geocoding';
import { useLayersContext } from '../../context/layers/LayersProvider';
import { useUiContext } from '../../context/UiContext';

interface AddressSearchProps {
    onSave: () => void;
}

const AddressSearch: React.FC<AddressSearchProps> = ({ onSave }) => {
    const { tempEditingLayer, actions: layersActions } = useLayersContext();
    const { actions: uiActions } = useUiContext();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<GeocodingResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFindMe = () => {
        if (navigator.geolocation) {
            setIsLoading(true);
            setError(null);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newCenter = L.latLng(latitude, longitude);

                    if (tempEditingLayer && tempEditingLayer.bounds) {
                        const oldBounds = tempEditingLayer.bounds;
                        const oldCenter = oldBounds.getCenter();
                        const latOffset = newCenter.lat - oldCenter.lat;
                        const lngOffset = newCenter.lng - oldCenter.lng;

                        const newBounds = L.latLngBounds(
                            L.latLng(oldBounds.getSouth() + latOffset, oldBounds.getWest() + lngOffset),
                            L.latLng(oldBounds.getNorth() + latOffset, oldBounds.getEast() + lngOffset)
                        );
                        layersActions.updateEditingLayerBounds(newBounds);
                    }

                    // FIX: Add missing 'structuredDisplayName' property to satisfy the GeocodingResult type.
                    uiActions.setSearchedLocation({
                        lat: latitude,
                        lng: longitude,
                        displayName: 'Η τρέχουσα τοποθεσία σας',
                        structuredDisplayName: {
                            main: 'Η τρέχουσα τοποθεσία σας',
                            secondary: 'Εντοπίστηκε από τον browser'
                        }
                    });
                    setIsLoading(false);
                },
                (err) => {
                    setError('Δεν ήταν δυνατός ο εντοπισμός της τοποθεσίας σας.');
                    setIsLoading(false);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            setError('Η γεωεντοπισμός δεν υποστηρίζεται από αυτόν τον browser.');
        }
    };

    const handleSearch = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setIsLoading(true);
        setError(null);
        setResults([]);

        try {
            const geocodedResults = await geocodeAddress(query);
            if (geocodedResults.length === 0) {
                setError('Δεν βρέθηκε η τοποθεσία. Δοκιμάστε έναν διαφορετικό όρο αναζήτησης.');
            }
            setResults(geocodedResults);
        } catch (err) {
            setError('Παρουσιάστηκε σφάλμα κατά την αναζήτηση.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [query]);

    const handleResultClick = (result: GeocodingResult) => {
        const newCenter = L.latLng(result.lat, result.lng);

        if (tempEditingLayer && tempEditingLayer.bounds) {
            const oldBounds = tempEditingLayer.bounds;
            const oldCenter = oldBounds.getCenter();
            const latOffset = newCenter.lat - oldCenter.lat;
            const lngOffset = newCenter.lng - oldCenter.lng;

            const newBounds = L.latLngBounds(
                L.latLng(oldBounds.getSouth() + latOffset, oldBounds.getWest() + lngOffset),
                L.latLng(oldBounds.getNorth() + latOffset, oldBounds.getEast() + lngOffset)
            );
            layersActions.updateEditingLayerBounds(newBounds);
        }
        
        uiActions.setSearchedLocation(result);
        setResults([]); // Hide results after selection
        setQuery('');
    };

    return (
        <div className="space-y-3">
            <div className="flex items-stretch gap-2">
                <button
                    type="button"
                    onClick={handleFindMe}
                    disabled={isLoading}
                    className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
                    title="Βρες τη θέση μου"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                </button>
                
                <div className="relative flex-grow">
                    <form onSubmit={handleSearch} className="flex h-10">
                         <label htmlFor="address-search" className="sr-only">Αναζήτηση Τοποθεσίας</label>
                        <input
                            id="address-search"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-grow block w-full px-3 bg-white border border-r-0 border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Αναζήτηση τοποθεσίας..."
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-sm font-medium text-white bg-blue-600 rounded-r-md hover:bg-blue-700 disabled:bg-blue-300"
                            disabled={isLoading}
                            title="Αναζήτηση"
                        >
                            {isLoading ? (
                                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </form>
                    {results.length > 0 && (
                        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                            {results.map((result, index) => (
                                <li key={`${result.lat}-${result.lng}-${index}`}>
                                    <button
                                        onClick={() => handleResultClick(result)}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <span className="font-semibold block text-sm text-gray-800">{result.structuredDisplayName.main}</span>
                                        <span className="text-xs text-gray-500 block truncate" title={result.structuredDisplayName.secondary}>{result.structuredDisplayName.secondary}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                 <button
                    type="button"
                    onClick={onSave}
                    className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400"
                    title="Αποθήκευση Τοποθεσίας & Συνέχεια"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 407.096 407.096" fill="currentColor">
                      <g>
                        <g>
                          <path d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086 c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032 C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z" />
                          <path d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08 c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z" />
                        </g>
                      </g>
                    </svg>
                </button>
            </div>
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
    );
};

export default AddressSearch;