import React, { useState, useCallback } from 'react';
import L from 'leaflet';
import { geocodeAddress, GeocodingResult } from '../utils/geocoding';
import { useAppContext } from '../../context/AppContext';

const AddressSearch: React.FC = () => {
    const { tempEditingLayer, actions } = useAppContext();
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
                        actions.updateEditingLayerBounds(newBounds);
                    }

                    actions.setSearchedLocation({
                        lat: latitude,
                        lng: longitude,
                        displayName: 'Η τρέχουσα τοποθεσία σας'
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
            actions.updateEditingLayerBounds(newBounds);
        }
        
        actions.setSearchedLocation(result);
        setResults([]); // Hide results after selection
        setQuery('');
    };

    return (
        <div className="space-y-3">
             <button
                type="button"
                onClick={handleFindMe}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Βρες τη θέση μου</span>
            </button>
            <div className="relative text-center">
                <span className="px-2 text-sm text-gray-500 bg-white">ή</span>
                <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-10"></div>
            </div>
            <div className="relative">
                <form onSubmit={handleSearch}>
                    <label htmlFor="address-search" className="block text-sm font-medium text-gray-700 mb-1">Αναζήτηση Τοποθεσίας</label>
                    <div className="flex">
                        <input
                            id="address-search"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-grow block w-full px-3 py-2 bg-white border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="π.χ. Ερμού 10, Αθήνα"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-r-md hover:bg-blue-700 disabled:bg-blue-300"
                            disabled={isLoading}
                        >
                            {isLoading ? '...' : 'Go'}
                        </button>
                    </div>
                </form>
                {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                {results.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {results.map((result, index) => (
                            <li key={`${result.lat}-${result.lng}-${index}`}>
                                <button
                                    onClick={() => handleResultClick(result)}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {result.displayName}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AddressSearch;