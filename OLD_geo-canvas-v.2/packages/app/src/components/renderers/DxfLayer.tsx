import React, { useCallback } from 'react';
import { LayerGroup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ImportedLayer } from '@geo-platform/shared';
import DxfEntityRenderer from './DxfEntityRenderer';
import { useDxfData } from '../../hooks/useDxfData';
import { useLayerZoom } from '../../hooks/useLayerZoom';
import { DxfVertex } from '../../context/layers/services/dxf.service';
import { rotatePoint } from '../../context/layers/services/geo-math';

interface DxfLayerProps {
    layer: ImportedLayer;
    layerToZoom: string | null;
    onZoomComplete: () => void;
    movingLayerId: string | null;
    pivot?: L.LatLng | null;
}

const DxfLayer: React.FC<DxfLayerProps> = ({ layer, layerToZoom, onZoomComplete, movingLayerId, pivot }) => {
    const { isLoading, dxfData, dxfRenderInfo } = useDxfData(layer);
    const map = useMap();
    const { bounds, rotation = 0 } = layer;

    useLayerZoom({ layerId: layer.id, layerToZoom, bounds: layer.bounds, onZoomComplete });

    const project = useCallback((point: DxfVertex): L.LatLng => {
        if (!bounds || !dxfRenderInfo || point === null || typeof point?.x !== 'number' || typeof point?.y !== 'number') {
            return L.latLng(0, 0);
        }

        // Step 1: Project DXF vertex to an unrotated LatLng within the layer's bounds
        const relativeX = dxfRenderInfo.width > 0 ? (point.x - dxfRenderInfo.minX) / dxfRenderInfo.width : 0.5;
        const relativeY = dxfRenderInfo.height > 0 ? (point.y - dxfRenderInfo.minY) / dxfRenderInfo.height : 0.5;
        
        const unrotatedLng = bounds.getSouthWest().lng + relativeX * (bounds.getNorthEast().lng - bounds.getSouthWest().lng);
        const unrotatedLat = bounds.getSouthWest().lat + relativeY * (bounds.getNorthEast().lat - bounds.getSouthWest().lat);
        const unrotatedLatLng = L.latLng(unrotatedLat, unrotatedLng);

        // Step 2: Rotate this LatLng around the shared pivot point, falling back to the geometric center.
        const rotationCenter = pivot || bounds.getCenter();
        const pivotPoint = map.latLngToLayerPoint(rotationCenter);
        const vertexPoint = map.latLngToLayerPoint(unrotatedLatLng);
        const rotatedPoint = rotatePoint(vertexPoint, pivotPoint, rotation);
        
        // Step 3: Convert the final rotated pixel coordinate back to a LatLng
        return map.layerPointToLatLng(rotatedPoint);
    }, [bounds, dxfRenderInfo, pivot, rotation, map]);

    if (isLoading || !dxfData || !dxfRenderInfo || !layer.bounds) {
        return null;
    }

    const isMoving = movingLayerId === layer.id;
    const paneName = `dxf-layer-${layer.id}`;
    
    return (
        <div style={{ zIndex: 400, opacity: isMoving ? 0.5 : layer.opacity }}>
            <LayerGroup pane={paneName}>
                {dxfData.entities.map((entity, index) => {
                    try {
                        return (
                            <DxfEntityRenderer 
                                key={index}
                                entity={entity}
                                project={project}
                                dxfRenderInfo={dxfRenderInfo}
                                dxfData={dxfData}
                                entityKey={index}
                                opacity={layer.opacity}
                                rotation={rotation}
                            />
                        );
                    } catch (e) {
                        console.warn(`Error rendering DXF entity ${index} of type ${entity.type}:`, e);
                        return null;
                    }
                })}
            </LayerGroup>
        </div>
    );
};

export default DxfLayer;
