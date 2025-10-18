import React, { useCallback, useRef, useEffect } from 'react';
import { LayerGroup, Pane, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { ImportedLayer } from '@geo-platform/shared';
import DxfEntityRenderer from './DxfEntityRenderer';
import { useDxfData } from '../../hooks/useDxfData';
import { useLayerZoom } from '../../hooks/useLayerZoom';

interface DxfLayerProps {
    layer: ImportedLayer;
    layerToZoom: string | null;
    onZoomComplete: () => void;
    movingLayerId: string | null;
}

const DxfLayer: React.FC<DxfLayerProps> = ({ layer, layerToZoom, onZoomComplete, movingLayerId }) => {
    const map = useMap();
    const { isLoading, dxfData, dxfRenderInfo, bounds, project } = useDxfData(layer);
    const paneElementRef = useRef<HTMLElement | null>(null);

    useLayerZoom({ layerId: layer.id, layerToZoom, bounds, onZoomComplete });

    const updatePaneTransform = useCallback(() => {
        if (paneElementRef.current && bounds) {
            const rotation = layer.rotation || 0;
            const center = bounds.getCenter();
            const centerPoint = map.latLngToLayerPoint(center);
            
            paneElementRef.current.style.transformOrigin = `${centerPoint.x}px ${centerPoint.y}px`;
            paneElementRef.current.style.transform = `rotate(${rotation}deg)`;
        }
    }, [layer.rotation, bounds, map]);

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


    if (isLoading || !dxfData || !dxfRenderInfo || !bounds) {
        return null;
    }

    const isMoving = movingLayerId === layer.id;
    const paneName = `dxf-layer-${layer.id}`;
    
    return (
        <Pane name={paneName} style={{ zIndex: 400, opacity: isMoving ? 0.5 : layer.opacity }} ref={paneRefCallback}>
             <LayerGroup>
                {dxfData.entities.map((entity, index) => (
                    <DxfEntityRenderer 
                        key={index}
                        entity={entity}
                        project={project}
                        dxfRenderInfo={dxfRenderInfo}
                        dxfData={dxfData}
                        entityKey={index}
                        opacity={layer.opacity}
                    />
                ))}
            </LayerGroup>
        </Pane>
    );
};

export default DxfLayer;