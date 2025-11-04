import { useEffect, useRef } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { useUiContext } from '../../context/UiContext';

const FreehandDrawer = () => {
    const map = useMap();
    const { drawingState, actions } = useUiContext();
    const isDrawing = useRef(false);

    useEffect(() => {
        const mapContainer = map.getContainer();
        mapContainer.style.cursor = 'crosshair';

        // Disable all map interactions that could conflict with drawing
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();

        return () => {
            // Re-enable all map interactions and reset cursor when component unmounts
            mapContainer.style.cursor = '';
            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
        };
    }, [map]);

    useMapEvents({
        mousedown(e) {
            if (drawingState.shape === 'freehand' && !drawingState.isFinished) {
                isDrawing.current = true;
                actions.setDrawingPoints([e.latlng]); // Start with the first point
            }
        },
        mousemove(e) {
            if (isDrawing.current) {
                // Throttle this? For now, let's see how it performs.
                const currentPoints = drawingState.points;
                actions.setDrawingPoints([...currentPoints, e.latlng]);
            }
        },
        mouseup() {
            if (isDrawing.current) {
                isDrawing.current = false;
                // Check if enough points were drawn to form a meaningful polygon
                if (drawingState.points.length > 2) {
                    actions.finishDrawing();
                } else {
                    // If not enough points, cancel the drawing to avoid tiny/invalid shapes
                    actions.cancelDrawing();
                }
            }
        },
        // Handle case where user's mouse leaves the map container while drawing
        mouseout() {
             if (isDrawing.current) {
                isDrawing.current = false;
                 if (drawingState.points.length > 2) {
                    actions.finishDrawing();
                } else {
                    actions.cancelDrawing();
                }
            }
        }
    });

    return null; // This component does not render anything visually
};

export default FreehandDrawer;