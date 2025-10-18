import React, { ReactNode, useEffect } from 'react';
import { MapContainer, ScaleControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ImportedLayer } from '@geo-platform/shared';
import LayerRenderer from '../renderers/LayerRenderer';
import GridLayer from './GridLayer';
import MapControls from './MapControls';
import MousePositionDisplay from './MousePositionDisplay';
import { useMapSettings } from '../../context/MapSettingsContext';
import { GeocodingResult } from '../utils/geocoding';
import MapEffects from './MapEffects';
import BaseLayerManager from './BaseLayerManager';
import { MeasurementProvider } from '../../context/MeasurementContext';
import MeasurementDrawer from '../measurement/MeasurementDrawer';

let DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapInstanceGrabber: React.FC<{ onMapReady: (map: L.Map) => void }> = ({ onMapReady }) => {
    const map = useMap();
    useEffect(() => {
        if (map) {
            onMapReady(map);
        }
    }, [map, onMapReady]);
    return null;
};

interface MapCoreProps {
    layers: ImportedLayer[];
    layerToZoom: string | null;
    onZoomComplete: () => void;
    movingLayerId: string | null;
    bounds: L.LatLngBounds | null;
    mapSize: { width: number, height: number } | null;
    MapEvents: React.FC;
    searchedLocation: GeocodingResult | null;
    onSearchLocationViewed: () => void;
    onMapReady?: (map: L.Map) => void;
    children?: ReactNode;
}

const MapCore: React.FC<MapCoreProps> = ({
    layers,
    layerToZoom,
    onZoomComplete,
    movingLayerId,
    bounds,
    mapSize,
    MapEvents,
    searchedLocation,
    onSearchLocationViewed,
    onMapReady,
    children
}) => {
    const { isGridVisible } = useMapSettings();
    return (
        <MapContainer
            center={[38.246639, 21.734573]}
            zoom={13}
            maxZoom={25}
            className="w-full h-full bg-gray-400"
            zoomControl={false}
        >
            <MeasurementProvider>
                <MapEvents />
                {onMapReady && <MapInstanceGrabber onMapReady={onMapReady} />}
                <MapEffects searchedLocation={searchedLocation} onSearchLocationViewed={onSearchLocationViewed} />
                
                <BaseLayerManager />

                <ScaleControl position="bottomleft" />
                <MousePositionDisplay />
                
                <MapControls />
                
                <MeasurementDrawer />
                
                {isGridVisible && bounds && mapSize && <GridLayer bounds={bounds} mapSize={mapSize} />}

                {layers.slice().reverse().map(layer => (
                    <LayerRenderer
                        key={layer.id}
                        layer={layer}
                        layerToZoom={layerToZoom}
                        onZoomComplete={onZoomComplete}
                        movingLayerId={movingLayerId}
                    />
                ))}
                
                {children}
            </MeasurementProvider>
        </MapContainer>
    );
};

export default MapCore;