import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { formatCoord } from '../utils/formatters';

const MousePositionDisplay: React.FC = () => {
    const [position, setPosition] = useState<L.LatLng | null>(null);

    useMapEvents({
        mousemove(e) {
            setPosition(e.latlng);
        },
        mouseout() {
            setPosition(null);
        },
    });

    return (
        <div 
            className="absolute bottom-4 right-4 z-[1000] bg-gray-800 bg-opacity-75 text-white text-xs rounded-md px-3 py-1.5 shadow-lg pointer-events-none"
            aria-live="polite"
        >
            {position ? (
                <span>
                    {formatCoord(position.lat, true, 5)}, {formatCoord(position.lng, false, 5)}
                </span>
            ) : (
                <span>--.-----° N, --.-----° E</span>
            )}
        </div>
    );
};

export default MousePositionDisplay;