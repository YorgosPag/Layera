import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

/**
 * A component to handle map events and update parent state with throttling.
 * This is designed to be returned by the useMapState hook and rendered inside a MapContainer.
 */
const MapEventsHandler: React.FC<{ setBounds: (bounds: L.LatLngBounds) => void; }> = memo(({ setBounds }) => {
    const map = useMap();
    const throttleTimeoutRef = useRef<number | null>(null);

    // Use a ref for the callback to ensure the latest version is always used inside useCallback
    // without needing to re-create the event handler on every render.
    const setBoundsRef = useRef(setBounds);
    useEffect(() => {
        setBoundsRef.current = setBounds;
    }, [setBounds]);

    // This is the core throttled function that updates the bounds state.
    const throttledUpdate = useCallback(() => {
        setBoundsRef.current(map.getBounds());
    }, [map]);

    // This handler is attached to map events. It schedules the throttled update.
    const handleMoveOrZoom = useCallback(() => {
        if (!throttleTimeoutRef.current) {
            throttleTimeoutRef.current = window.setTimeout(() => {
                throttledUpdate();
                throttleTimeoutRef.current = null;
            }, 66); // approx 15fps for ruler updates
        }
    }, [throttledUpdate]);

    useMapEvents({
        move: handleMoveOrZoom,
        zoom: handleMoveOrZoom,
        load: () => {
            // A slight delay to ensure the map is fully initialized
            setTimeout(() => setBoundsRef.current(map.getBounds()), 100);
        }
    });

    // Cleanup timeout on component unmount
    useEffect(() => {
        return () => {
            if (throttleTimeoutRef.current) {
                clearTimeout(throttleTimeoutRef.current);
            }
        };
    }, []);

    return null;
});


/**
 * A custom hook to manage the state of the map's view (bounds).
 * It provides the current bounds and a component to handle map events.
 * @returns An object containing the current map bounds and the MapEvents component to render.
 */
export const useMapState = () => {
    const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);

    const handleSetBounds = useCallback((newBounds: L.LatLngBounds) => {
        setBounds(newBounds);
    }, []);

    // Memoize the events handler so it doesn't cause re-renders of the map container
    const MapEvents = useCallback(() => (
        React.createElement(MapEventsHandler, { setBounds: handleSetBounds })
    ), [handleSetBounds]);

    return { bounds, MapEvents };
};
