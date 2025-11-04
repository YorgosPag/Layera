import React, { ReactNode } from 'react';
import L from 'leaflet';
import { MapSettingsProvider, useMapSettings } from '../context/MapSettingsContext';
import { useMapLayout } from '../hooks/useMapLayout';
import { useMapState } from '../hooks/useMapState';
import LatitudeRuler from './rulers/LatitudeRuler';
import LongitudeRuler from './rulers/LongitudeRuler';
import MapCore from './map/MapCore';
import { RULER_SIZE, RULER_BG } from './utils/rulerUtils';
import { ImportedLayer } from '@geo-platform/shared';
import { GeocodingResult } from './utils/geocoding';

interface MapWithRulersProps {
    layers: ImportedLayer[];
    layerToZoom: string | null;
    onZoomComplete: () => void;
    movingLayerId: string | null;
    searchedLocation: GeocodingResult | null;
    onSearchLocationViewed: () => void;
    onMapReady?: (map: L.Map) => void;
    onLayerClick?: (layer: ImportedLayer) => void;
    children?: ReactNode;
}

const MapLayout: React.FC<MapWithRulersProps> = (props) => {
    const { areRulersVisible } = useMapSettings();
    const { containerRef, mapSize } = useMapLayout(areRulersVisible);
    const { bounds, MapEvents } = useMapState();

    const mapOffset = areRulersVisible ? RULER_SIZE : 0;

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-gray-300">
            {areRulersVisible && bounds && mapSize && <LatitudeRuler bounds={bounds} mapSize={mapSize} />}
            {areRulersVisible && bounds && mapSize && <LongitudeRuler bounds={bounds} mapSize={mapSize} />}
            
            <div 
                className="absolute transition-all duration-200"
                style={{ 
                    top: 0, 
                    right: 0, 
                    bottom: `${mapOffset}px`, 
                    left: `${mapOffset}px` 
                }}
            >
                <MapCore 
                    {...props} 
                    bounds={bounds} 
                    mapSize={mapSize}
                    MapEvents={MapEvents}
                >
                    {props.children}
                </MapCore>
            </div>
            
            {areRulersVisible && (
                 <div 
                    className="absolute bottom-0 left-0 z-30"
                    style={{
                        width: `${RULER_SIZE}px`,
                        height: `${RULER_SIZE}px`,
                        backgroundColor: RULER_BG,
                        borderTop: `1px solid #E2E8F0`,
                        borderRight: `1px solid #E2E8F0`,
                    }}
                />
            )}
        </div>
    );
};

const MapWithRulers: React.FC<MapWithRulersProps> = (props) => {
    return (
        <MapSettingsProvider>
            <MapLayout {...props} />
        </MapSettingsProvider>
    );
};

export default MapWithRulers;