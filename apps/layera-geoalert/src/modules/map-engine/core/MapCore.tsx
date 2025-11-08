// Layera GeoAlert V1 - MapCore Module
// Βασικός χάρτης τουβλάκι - απομονωμένο από άλλες λειτουργίες
// Αντληση από geo-canvas(8) MapCore.tsx patterns

import React, { useEffect } from 'react';
import { MapContainer, ScaleControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapCoreProps, MAP_DEFAULTS } from '../../types';
import { MAP_CONFIG } from '../../../constants';
import './MapCore.css';

// Default Leaflet icon configuration (από geo-canvas pattern)
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconAnchor: MAP_CONFIG.icons.default.iconAnchor,
    popupAnchor: MAP_CONFIG.icons.default.popupAnchor,
    tooltipAnchor: MAP_CONFIG.icons.default.tooltipAnchor,
    shadowSize: MAP_CONFIG.icons.default.shadowSize
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
            className="layera-mapcore-container w-full h-full"
            zoomControl={false}
            height="var(--la-height-full, 100%)"
            width="var(--la-width-full, 100%)"
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