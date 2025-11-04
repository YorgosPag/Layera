import React, { useState, useCallback, useEffect } from 'react';
import { ImportedLayer } from '@geo-platform/shared';
import { useLayersContext } from '../../context/layers/LayersProvider';
import { useUiContext } from '../../context/UiContext';
import EditableOverlay from './EditableOverlay';
import ImageToolbar, { ImageEditTool } from './ImageToolbar';
import CropTool from './CropTool';
import LassoCropTool from './LassoCropTool';
import LayerRenderer from '../renderers/LayerRenderer';
import { useSnapping } from '../../hooks/useSnapping';
import SnappingLayer from '../map/SnappingLayer';
import L from 'leaflet';
import AlignTool from './AlignTool';

const EditorOverlays: React.FC = () => {
    const { 
        tempEditingLayer,
        layerToZoom,
        actions: layersActions 
    } = useLayersContext();
    
    // FIX: Destructure `actions` as `uiActions` to make it available in the component.
    const { snappingOptions, actions: uiActions } = useUiContext();

    const [activeImageTool, setActiveImageTool] = useState<ImageEditTool>('transform');
    const [isAspectRatioLocked, setIsAspectRatioLocked] = useState(true);
    const [pivot, setPivot] = useState<L.LatLng | null>(null);
    
    const { getSnappedPoint, snappingData } = useSnapping(snappingOptions);

    useEffect(() => {
        if (tempEditingLayer && (tempEditingLayer.type === 'raster' || tempEditingLayer.type === 'dxf')) {
            setActiveImageTool('transform');
        } else {
            setActiveImageTool('none');
        }

        if (tempEditingLayer?.bounds) {
            setIsAspectRatioLocked(true);
            setPivot(tempEditingLayer.bounds.getCenter());
        } else {
            setPivot(null);
        }
    }, [tempEditingLayer]);

    const handleApplyCrop = useCallback((updates: Partial<ImportedLayer>) => {
        layersActions.updateTempLayer(updates);
        layersActions.updateTempLayer({ rotation: 0 });
        layersActions.finalizeLayerChanges();
        setActiveImageTool('transform');
    }, [layersActions]);

    const handleApplyAlign = useCallback((newBounds: L.LatLngBounds, newRotation: number) => {
        // We directly update bounds and rotation, which constitutes a manual transform
        layersActions.updateTempLayer({ bounds: newBounds, rotation: newRotation });
        layersActions.finalizeLayerChanges();
        setActiveImageTool('transform');
    }, [layersActions]);
    
    const onZoomComplete = useCallback(() => {
        layersActions.zoomToLayer(null);
    }, [layersActions]);

    const handleInteractionStart = useCallback(() => {}, []);
    const handleInteractionEnd = layersActions.finalizeLayerChanges;

    const renderActiveTool = () => {
        if (!tempEditingLayer) return null;

        switch (activeImageTool) {
            case 'transform':
                return (
                    <EditableOverlay
                        bounds={tempEditingLayer.bounds!}
                        rotation={tempEditingLayer.rotation || 0}
                        onBoundsChange={(bounds) => layersActions.updateTempLayer({ bounds })}
                        onRotationChange={(rotation) => layersActions.updateTempLayer({ rotation })}
                        onInteractionStart={handleInteractionStart}
                        onInteractionEnd={handleInteractionEnd}
                        isAspectRatioLocked={isAspectRatioLocked}
                        aspectRatio={tempEditingLayer.intrinsicWidth && tempEditingLayer.intrinsicHeight ? tempEditingLayer.intrinsicWidth / tempEditingLayer.intrinsicHeight : 1}
                        showCornerHandles={true}
                        showMove={true}
                        getSnappedPoint={getSnappedPoint}
                        pivot={pivot}
                        onPivotChange={setPivot}
                    />
                );
            case 'rotate':
                 return (
                    <EditableOverlay
                        bounds={tempEditingLayer.bounds!}
                        rotation={tempEditingLayer.rotation || 0}
                        onBoundsChange={(bounds) => layersActions.updateTempLayer({ bounds })}
                        onRotationChange={(rotation) => layersActions.updateTempLayer({ rotation })}
                        onInteractionStart={handleInteractionStart}
                        onInteractionEnd={handleInteractionEnd}
                        cornerFunction="rotate"
                        showMove={false}
                        getSnappedPoint={getSnappedPoint}
                        showPivot={true}
                        pivot={pivot}
                        onPivotChange={setPivot}
                        pivotGuideText="Μετακινήστε το '+' για να αλλάξετε το κέντρο περιστροφής."
                    />
                );
            case 'crop-rect':
                return <CropTool layer={tempEditingLayer} onApply={handleApplyCrop} onCancel={() => setActiveImageTool('transform')} />;
            case 'crop-lasso':
                return <LassoCropTool layer={tempEditingLayer} onApply={handleApplyCrop} onCancel={() => setActiveImageTool('transform')} />;
            case 'align-3pt':
                return <AlignTool onApply={handleApplyAlign} onCancel={() => setActiveImageTool('transform')} points={3} />;
            case 'align-2pt':
                return <AlignTool onApply={handleApplyAlign} onCancel={() => setActiveImageTool('transform')} points={2} />;
            default:
                return null;
        }
    };
    
    if (!tempEditingLayer || !tempEditingLayer.bounds) return null;
    
    const isEditingRasterOrDxf = tempEditingLayer.type === 'raster' || tempEditingLayer.type === 'dxf';
    const showSnappingLayer = (activeImageTool === 'transform' || activeImageTool === 'rotate' || activeImageTool.startsWith('align')) && (snappingOptions.edges || snappingOptions.vertices);

    return (
        <>
            <LayerRenderer layer={tempEditingLayer} layerToZoom={layerToZoom} onZoomComplete={onZoomComplete} movingLayerId={null} pivot={pivot} />

            {isEditingRasterOrDxf && (
                <ImageToolbar
                    layer={tempEditingLayer}
                    activeTool={activeImageTool}
                    onToolChange={setActiveImageTool}
                    isAspectRatioLocked={isAspectRatioLocked}
                    onToggleAspectRatioLock={() => setIsAspectRatioLocked(prev => !prev)}
                    snappingOptions={snappingOptions}
                    onToggleSnapping={uiActions.toggleSnapping}
                />
            )}
            
            {showSnappingLayer && <SnappingLayer data={snappingData} />}
            
            {renderActiveTool()}
        </>
    );
};

export default EditorOverlays;