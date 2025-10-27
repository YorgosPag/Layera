// Layera GeoAlert V1 - MapCore Module
// Βασικός χάρτης τουβλάκι - απομονωμένο από άλλες λειτουργίες
// Αντληση από geo-canvas(8) MapCore.tsx patterns

import React, { useEffect } from 'react';
import { MapContainer, ScaleControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapCoreProps, MAP_DEFAULTS } from '../../types';

// Default Leaflet icon configuration (από geo-canvas pattern)
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Map Instance Grabber (pattern από geo-canvas)
const MapInstanceGrabber: React.FC<{ onMapReady: (map: L.Map) => void }> = ({ onMapReady }) => {
    const map = useMap();

    useEffect(() => {
        if (map) {
            onMapReady(map);
        }
    }, [map, onMapReady]);

    return null;
};

// Καθαρός βασικός χάρτης - μόνο τη βασική λειτουργικότητα
const MapCore: React.FC<MapCoreProps> = ({ onMapReady, children }) => {
    return (
        <MapContainer
            center={MAP_DEFAULTS.center}
            zoom={MAP_DEFAULTS.zoom}
            maxZoom={MAP_DEFAULTS.maxZoom}
            className="w-full h-full bg-gray-400"
            zoomControl={false}
            height="var(--layera-height-full, 100%)"
            width="var(--layera-width-full, 100%)"
        >
            {/* Map instance για parent components */}
            {onMapReady && <MapInstanceGrabber onMapReady={onMapReady} />}

            {/* Βασικά controls */}
            <ScaleControl position="bottomleft" />

            {/* Children components (drawing tools, markers, etc.) */}
            {children}
        </MapContainer>
    );
};

export default MapCore;