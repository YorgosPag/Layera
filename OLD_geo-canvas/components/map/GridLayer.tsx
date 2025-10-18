import React, { memo } from 'react';
import { Polyline } from 'react-leaflet';
import L from 'leaflet';
import { DENSITY_FACTORS, GRID_COLOR } from '../utils/rulerUtils';
import { getTicks } from '../utils/rulerUtils';
import { useMapSettings } from '../../context/MapSettingsContext';

interface GridLayerProps {
    bounds: L.LatLngBounds;
    mapSize: { width: number, height: number };
}

const GridLayer: React.FC<GridLayerProps> = memo(({ bounds, mapSize }) => {
    const { tickDensity } = useMapSettings();
    const densityFactor = DENSITY_FACTORS[tickDensity];
    const latTicks = getTicks(bounds.getSouth(), bounds.getNorth(), Math.round(mapSize.height / (80 * densityFactor)));
    const lonTicks = getTicks(bounds.getWest(), bounds.getEast(), Math.round(mapSize.width / (80 * densityFactor)));

    return (
        <>
            {latTicks.map(lat => (
                <Polyline
                    key={`grid-lat-${lat}`}
                    positions={[[lat, bounds.getWest()], [lat, bounds.getEast()]]}
                    pathOptions={{ color: GRID_COLOR, weight: 1, opacity: 0.5 }}
                />
            ))}
            {lonTicks.map(lon => (
                <Polyline
                    key={`grid-lon-${lon}`}
                    positions={[[bounds.getSouth(), lon], [bounds.getNorth(), lon]]}
                    pathOptions={{ color: GRID_COLOR, weight: 1, opacity: 0.5 }}
                />
            ))}
        </>
    );
});

export default GridLayer;