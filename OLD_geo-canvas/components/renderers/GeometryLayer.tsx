
import React from 'react';
import { Polygon, Circle } from 'react-leaflet';
import L from 'leaflet';
import { ImportedLayer } from '../../shared/types';
import { useLayerZoom } from '../../hooks/useLayerZoom';

interface GeometryLayerProps {
    layer: ImportedLayer;
    layerToZoom: string | null;
    onZoomComplete: () => void;
}

const GeometryLayer: React.FC<GeometryLayerProps> = ({ layer, layerToZoom, onZoomComplete }) => {
    useLayerZoom({ layerId: layer.id, layerToZoom, bounds: layer.bounds, onZoomComplete });

    if (!layer.geometry || !layer.isVisible) {
        return null;
    }

    const pathOptions = {
        color: '#f97316',
        weight: 3,
        fillColor: '#fdba74',
        fillOpacity: 0.5,
        opacity: layer.opacity,
    };
    
    const { type } = layer.geometry.geometry;
    
    if (type === 'Polygon' && layer.geometry.geometry.coordinates.length > 0) {
        // GeoJSON coordinates are [lng, lat], Leaflet needs [lat, lng]
        const positions = layer.geometry.geometry.coordinates[0].map((coord: [number, number]) => L.latLng(coord[1], coord[0]));
        return <Polygon positions={positions} pathOptions={pathOptions} />;
    }

    if (type === 'Point' && layer.geometry.properties.radius) {
        const center: L.LatLngTuple = [layer.geometry.geometry.coordinates[1], layer.geometry.geometry.coordinates[0]];
        const radius = layer.geometry.properties.radius;
        return <Circle center={center} radius={radius} pathOptions={pathOptions} />;
    }

    return null;
};

export default GeometryLayer;
