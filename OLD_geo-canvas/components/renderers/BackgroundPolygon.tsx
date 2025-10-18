import React, { useCallback, useRef, useEffect } from 'react';
import { Polygon, Pane, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { ImportedLayer } from '../../shared/types';

interface BackgroundPolygonProps {
    layer: ImportedLayer;
}

const BackgroundPolygon: React.FC<BackgroundPolygonProps> = ({ layer }) => {
    const map = useMap();
    const { bounds, rotation = 0 } = layer;
    const paneElementRef = useRef<HTMLElement | null>(null);

    const updatePaneTransform = useCallback(() => {
        if (paneElementRef.current && bounds) {
            const center = bounds.getCenter();
            const centerPoint = map.latLngToLayerPoint(center);
            
            paneElementRef.current.style.transformOrigin = `${centerPoint.x}px ${centerPoint.y}px`;
            paneElementRef.current.style.transform = `rotate(${rotation}deg)`;
        }
    }, [rotation, bounds, map]);

    const paneRefCallback = useCallback((pane: HTMLElement | null) => {
        paneElementRef.current = pane;
        updatePaneTransform();
    }, [updatePaneTransform]);

    useEffect(() => {
        updatePaneTransform();
    }, [updatePaneTransform]);

    useMapEvents({
        move: updatePaneTransform,
        zoom: updatePaneTransform,
    });

    if (!bounds) {
        return null;
    }

    const paneName = `background-layer-${layer.id}`;
    const corners = [
        bounds.getNorthWest(),
        bounds.getNorthEast(),
        bounds.getSouthEast(),
        bounds.getSouthWest()
    ];

    const pathOptions = {
        fillColor: '#FFFFFF',
        fillOpacity: 1,
        weight: 0,
        interactive: false // The background should not capture mouse events
    };

    return (
        <Pane name={paneName} style={{ zIndex: 399 }} ref={paneRefCallback}>
             <Polygon positions={corners} pathOptions={pathOptions} />
        </Pane>
    );
};

export default BackgroundPolygon;
