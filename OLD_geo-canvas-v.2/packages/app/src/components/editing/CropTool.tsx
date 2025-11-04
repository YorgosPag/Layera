import React, { useState, useCallback, useEffect } from 'react';
import { useMap, Pane, Polygon, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { ImportedLayer } from '@geo-platform/shared';
import EditableOverlay from './EditableOverlay';

interface CropToolProps {
    layer: ImportedLayer;
    onApply: (updates: Partial<ImportedLayer>) => void;
    onCancel: () => void;
}

// Helper function to rotate a L.Point, needed for coordinate calculations
const rotatePoint = (p: L.Point, center: L.Point, angleDeg: number): L.Point => {
    const angleRad = angleDeg * (Math.PI / 180);
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const translated = p.subtract(center);
    const rotated = new L.Point(
        translated.x * cos - translated.y * sin,
        translated.x * sin + translated.y * cos
    );
    return rotated.add(center);
};

const CropTool: React.FC<CropToolProps> = ({ layer, onApply, onCancel }) => {
    const map = useMap();
    // Initialize the cropping bounds to the full layer bounds
    const [cropBounds, setCropBounds] = useState<L.LatLngBounds>(layer.bounds!);
    const [isProcessing, setIsProcessing] = useState(false);
    const [controlsPosition, setControlsPosition] = useState<L.Point | null>(null);

    // Logic to position the controls
    const updateControlsPosition = useCallback(() => {
        if (layer.bounds) {
            // Position the toolbar below the bottom center of the image's bounds
            const south = layer.bounds.getSouth();
            const centerLng = layer.bounds.getCenter().lng;
            const bottomCenterLatLng = L.latLng(south, centerLng);
            const point = map.latLngToContainerPoint(bottomCenterLatLng);
            setControlsPosition(point);
        }
    }, [map, layer.bounds]);

    useEffect(() => {
        updateControlsPosition();
    }, [updateControlsPosition]);

    useMapEvents({
        zoom: updateControlsPosition,
        move: updateControlsPosition
    });


    const handleApply = useCallback(async () => {
        setIsProcessing(true);
        try {
            const { data, bounds: originalBounds, intrinsicWidth, intrinsicHeight, rotation = 0 } = layer;

            if (!data || !originalBounds || !intrinsicWidth || !intrinsicHeight) {
                throw new Error("Layer data is incomplete for cropping.");
            }

            // 1. Create an Image object from the original layer data
            const blob = new Blob([data]);
            const imageUrl = URL.createObjectURL(blob);
            const image = await new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = (err) => reject(err);
                img.src = imageUrl;
            });
            URL.revokeObjectURL(imageUrl);

            // 2. Un-rotate points to get their relative positions
            const centerPoint = map.latLngToLayerPoint(originalBounds.getCenter());

            const orig_nw_pt = map.latLngToLayerPoint(originalBounds.getNorthWest());
            const orig_se_pt = map.latLngToLayerPoint(originalBounds.getSouthEast());
            const unrotated_orig_nw_pt = rotatePoint(orig_nw_pt, centerPoint, -rotation);
            const unrotated_orig_se_pt = rotatePoint(orig_se_pt, centerPoint, -rotation);

            const crop_nw_pt = map.latLngToLayerPoint(cropBounds.getNorthWest());
            const crop_se_pt = map.latLngToLayerPoint(cropBounds.getSouthEast());
            const unrotated_crop_nw_pt = rotatePoint(crop_nw_pt, centerPoint, -rotation);
            const unrotated_crop_se_pt = rotatePoint(crop_se_pt, centerPoint, -rotation);

            // 3. Calculate the crop rectangle relative to the un-rotated original image (values from 0 to 1)
            const unrotated_orig_width = unrotated_orig_se_pt.x - unrotated_orig_nw_pt.x;
            const unrotated_orig_height = unrotated_orig_se_pt.y - unrotated_orig_nw_pt.y;

            const sx_rel = (unrotated_crop_nw_pt.x - unrotated_orig_nw_pt.x) / unrotated_orig_width;
            const sy_rel = (unrotated_crop_nw_pt.y - unrotated_orig_nw_pt.y) / unrotated_orig_height;
            const sWidth_rel = (unrotated_crop_se_pt.x - unrotated_crop_nw_pt.x) / unrotated_orig_width;
            const sHeight_rel = (unrotated_crop_se_pt.y - unrotated_crop_nw_pt.y) / unrotated_orig_height;

            // 4. Calculate source pixels for canvas.drawImage, clamping to image dimensions
            const sx = Math.max(0, sx_rel * intrinsicWidth);
            const sy = Math.max(0, sy_rel * intrinsicHeight);
            const sWidth = Math.min(intrinsicWidth - sx, sWidth_rel * intrinsicWidth);
            const sHeight = Math.min(intrinsicHeight - sy, sHeight_rel * intrinsicHeight);
            
            if (sWidth <= 0 || sHeight <= 0) {
                 throw new Error("Crop dimensions must be positive.");
            }

            // 5. Perform the crop operation on a canvas
            const canvas = document.createElement('canvas');
            canvas.width = sWidth;
            canvas.height = sHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error("Could not get canvas context");
            
            ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);

            // 6. Get the new image data as an ArrayBuffer
            const newBlob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/png'));
            if (!newBlob) throw new Error("Could not create blob from canvas");
            const newArrayBuffer = await newBlob.arrayBuffer();

            // 7. Pass the updates to the parent component
            onApply({
                data: newArrayBuffer,
                bounds: cropBounds,
                intrinsicWidth: sWidth,
                intrinsicHeight: sHeight,
            });

        } catch (error) {
            console.error("Failed to crop image:", error);
            alert("Η περικοπή της εικόνας απέτυχε.");
            setIsProcessing(false);
        }
    }, [layer, cropBounds, map, onApply]);

    const { bounds: originalBounds, rotation = 0 } = layer;

    if (!originalBounds) return null;

    const center = originalBounds.getCenter();
    const centerPt = map.latLngToLayerPoint(center);

    const rotatedCorners = {
        nw: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(originalBounds.getNorthWest()), centerPt, rotation)),
        ne: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(originalBounds.getNorthEast()), centerPt, rotation)),
        se: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(originalBounds.getSouthEast()), centerPt, rotation)),
        sw: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(originalBounds.getSouthWest()), centerPt, rotation))
    };

    // Create a mask to dim the area of the original image that is outside the crop bounds
    const maskPositions = [
        // Outer ring is the rotated image boundary
        [rotatedCorners.nw, rotatedCorners.ne, rotatedCorners.se, rotatedCorners.sw],
        // Inner hole is the crop area
        [cropBounds.getNorthWest(), cropBounds.getNorthEast(), cropBounds.getSouthEast(), cropBounds.getSouthWest()]
    ];
    
    // Style for the floating controls container
    const controlsStyle: React.CSSProperties = controlsPosition ? {
        position: 'absolute',
        top: `${controlsPosition.y}px`,
        left: `${controlsPosition.x}px`,
        transform: 'translate(-50%, 20px)', // Position below the anchor point
        zIndex: 1002, // Higher than the mask and overlay
    } : { display: 'none' };

    return (
        <>
            {/* The mask is now placed below the EditableOverlay handles (z-index 599 vs 600) */}
            <Pane name="crop-mask" style={{ zIndex: 599, pointerEvents: 'none' }}>
                <Polygon
                    positions={maskPositions as L.LatLngExpression[][]}
                    pathOptions={{
                        color: 'transparent',
                        fillColor: 'black',
                        fillOpacity: 0.6,
                    }}
                />
            </Pane>
            
            {/* Use EditableOverlay to provide the handles for the crop area */}
            <EditableOverlay
                bounds={cropBounds}
                rotation={0} // Crop rectangle is not rotated relative to the map
                onBoundsChange={setCropBounds}
                onRotationChange={() => {}} // No rotation for the crop box
                onInteractionStart={() => {}}
                onInteractionEnd={() => {}}
                showMove={true}
                showCornerHandles={true}
                cornerFunction="resize"
                // FIX: Add missing required props `pivot` and `onPivotChange` to satisfy the EditableOverlayProps interface.
                pivot={null}
                onPivotChange={() => {}}
            />

            {/* Repositioned Apply/Cancel buttons */}
            <div style={controlsStyle} className="flex items-center gap-2 bg-black/70 p-1 rounded-lg shadow-lg">
                <button onClick={onCancel} disabled={isProcessing} className="px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 disabled:bg-gray-400">
                    Ακύρωση
                </button>
                <button onClick={handleApply} disabled={isProcessing} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400">
                    {isProcessing ? '...' : 'Εφαρμογή'}
                </button>
            </div>
        </>
    );
};

export default CropTool;