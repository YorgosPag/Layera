
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useLayerZoom } from '../../hooks/useLayerZoom';
import { ImportedLayer } from '../../shared/types';

interface RasterLayerProps {
    layer: ImportedLayer;
    layerToZoom: string | null;
    onZoomComplete: () => void;
}

const RasterLayer: React.FC<RasterLayerProps> = ({ layer, layerToZoom, onZoomComplete }) => {
    const map = useMap();
    const [iconOptions, setIconOptions] = useState<{ size: L.Point, anchor: L.Point } | null>(null);

    const imageUrl = useMemo(() => {
        if (!layer.data) return null;
        const blob = new Blob([layer.data]);
        return URL.createObjectURL(blob);
    }, [layer.data]);
    
    useLayerZoom({ layerId: layer.id, layerToZoom, bounds: layer.bounds, onZoomComplete });

    const updateIconSize = useCallback(() => {
        if (!layer.bounds) return;
        const sw = map.latLngToContainerPoint(layer.bounds.getSouthWest());
        const ne = map.latLngToContainerPoint(layer.bounds.getNorthEast());
        const width = Math.abs(ne.x - sw.x);
        const height = Math.abs(sw.y - ne.y);
        if (width > 0 && height > 0) {
            setIconOptions({
                size: new L.Point(width, height),
                anchor: new L.Point(width / 2, height / 2)
            });
        }
    }, [map, layer.bounds]);
    
    // Update size on mount and when bounds change
    useEffect(() => {
        updateIconSize();
    }, [updateIconSize]);

    // Update size on map move/zoom
    useMapEvents({
        zoom: updateIconSize,
        move: updateIconSize
    });

    useEffect(() => {
        // Clean up the object URL when the component unmounts or the URL changes
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        }
    }, [imageUrl]);

    if (!layer.bounds || !iconOptions || !imageUrl) return null;

    const rotation = layer.rotation || 0;
    const icon = new L.DivIcon({
        className: 'raster-layer-icon',
        html: `<img src="${imageUrl}" style="width: 100%; height: 100%; transform: rotate(${rotation}deg); opacity: ${layer.opacity};" />`,
        iconSize: [iconOptions.size.x, iconOptions.size.y],
        iconAnchor: [iconOptions.anchor.x, iconOptions.anchor.y]
    });

    return <Marker position={layer.bounds.getCenter()} icon={icon} />;
};

export default RasterLayer;
