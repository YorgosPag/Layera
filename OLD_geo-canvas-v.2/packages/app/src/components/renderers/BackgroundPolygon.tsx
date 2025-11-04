import React, { useMemo } from 'react';
import { Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ImportedLayer } from '@geo-platform/shared';
import { rotatePoint } from '../../context/layers/services/geo-math';

interface BackgroundPolygonProps {
    layer: ImportedLayer;
    onLayerClick?: (layer: ImportedLayer) => void;
    pivot?: L.LatLng | null;
}

const BackgroundPolygon: React.FC<BackgroundPolygonProps> = ({ layer, onLayerClick, pivot }) => {
    const map = useMap();
    const { bounds, rotation = 0 } = layer;

    const rotatedCorners = useMemo(() => {
        if (!bounds) {
            return null;
        }

        // Use the provided pivot, or fall back to the geometric center, matching the EditableOverlay logic.
        const rotationCenter = pivot || bounds.getCenter();
        const rotationCenterPt = map.latLngToLayerPoint(rotationCenter);
        
        const corners = {
            nw: bounds.getNorthWest(),
            ne: bounds.getNorthEast(),
            se: bounds.getSouthEast(),
            sw: bounds.getSouthWest(),
        };

        const rotated = [
            map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.nw), rotationCenterPt, rotation)),
            map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.ne), rotationCenterPt, rotation)),
            map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.se), rotationCenterPt, rotation)),
            map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.sw), rotationCenterPt, rotation)),
        ];

        return rotated;
    }, [bounds, rotation, map, pivot]);


    if (!bounds || !rotatedCorners) {
        return null;
    }

    const pathOptions = {
        fillColor: '#FFFFFF',
        fillOpacity: 1,
        weight: 0,
        interactive: true,
        pane: 'background-pane', // Render in a dedicated pane for z-index control
    };
    
    const eventHandlers = {
        click: () => {
            if (onLayerClick) {
                onLayerClick(layer);
            }
        },
    };

    return (
        <>
            {/* Create a pane to ensure the background is always behind the main content */}
            <div style={{ zIndex: 399 }}>
                <Polygon positions={rotatedCorners} pathOptions={pathOptions} eventHandlers={eventHandlers} />
            </div>
        </>
    );
};

export default BackgroundPolygon;
