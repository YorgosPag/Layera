import React, { useEffect } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import { GeocodingResult } from '../utils/geocoding';

interface MapEffectsProps {
    searchedLocation: GeocodingResult | null;
    onSearchLocationViewed: () => void;
}

const MapEffects: React.FC<MapEffectsProps> = ({ searchedLocation, onSearchLocationViewed }) => {
    const map = useMap();

    useEffect(() => {
        if (searchedLocation) {
            const { lat, lng } = searchedLocation;
            map.flyTo([lat, lng], 15, {
                animate: true,
                duration: 1.5,
            });

            const onMoveEnd = () => {
                onSearchLocationViewed();
                map.off('moveend', onMoveEnd);
            };
            
            map.on('moveend', onMoveEnd);

            return () => {
                map.off('moveend', onMoveEnd);
            };
        }
    }, [searchedLocation, map, onSearchLocationViewed]);

    if (!searchedLocation) {
        return null;
    }
    
    return (
        <Marker position={[searchedLocation.lat, searchedLocation.lng]}>
            <Popup>
                {searchedLocation.displayName}
            </Popup>
        </Marker>
    );
};

export default MapEffects;
