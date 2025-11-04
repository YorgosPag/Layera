import React, { useState, useEffect } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { DxfVertex } from '../../context/layers/services/dxf.service';

interface DxfTextRendererProps {
    entity: any; // Using 'any' to match the parent component's flexible entity structure
    project: (point: DxfVertex) => L.LatLng;
    color: string;
    layerRotation?: number;
    opacity?: number;
    entityKey: string | number;
}

const DxfTextRenderer: React.FC<DxfTextRendererProps> = ({
    entity,
    project,
    color,
    layerRotation = 0, // This is the overall layer rotation
    opacity = 1,
    entityKey,
}) => {
    const map = useMap();
    // This state forces a re-render when the map zoom level changes
    const [zoomLevel, setZoomLevel] = useState(map.getZoom());

    useEffect(() => {
        const update = () => setZoomLevel(map.getZoom());
        map.on('zoom', update);
        return () => { map.off('zoom', update); };
    }, [map]);

    // Validate that the entity has the necessary properties to be rendered
    if (!entity.startPoint || !entity.text || typeof entity.textHeight !== 'number') {
        return null;
    }

    // Project DXF coordinates to geographical coordinates
    const p1 = project(entity.startPoint);
    // Project a second point based on text height to calculate font size in pixels
    const p2 = project({ x: entity.startPoint.x, y: entity.startPoint.y + entity.textHeight });

    // Convert geographical coordinates to screen pixel coordinates
    const p1_px = map.latLngToContainerPoint(p1);
    const p2_px = map.latLngToContainerPoint(p2);
    
    // The font size is the pixel distance between the two projected points
    const fontSizePx = Math.max(5, p1_px.distanceTo(p2_px));
    
    const entityRotation = entity.rotation || 0;
    // CRITICAL FIX: The total rotation is the sum of the entity's own rotation
    // and the overall layer's rotation.
    const totalRotation = entityRotation + layerRotation;
    
    // Create a Leaflet DivIcon to render the HTML for the text
    const icon = new L.DivIcon({
        className: 'dxf-text-label-wrapper',
        html: `<div style="font-size: ${fontSizePx}px; color: ${color}; transform: rotate(${-totalRotation}deg); transform-origin: top left; opacity: ${opacity};">${entity.text.replace(/\s/g, '&nbsp;')}</div>`
    });

    // The key includes the zoom level to force React to re-create the Marker on zoom,
    // which triggers the recalculation of the font size.
    return <Marker key={`${entityKey}-${zoomLevel}`} position={p1} icon={icon} interactive={false} />;
};

export default DxfTextRenderer;
