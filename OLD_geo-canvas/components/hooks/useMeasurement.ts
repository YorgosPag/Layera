

import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
// FIX: Correcting path for measurementUtils import.
import { calculateDistance, calculateProjectedArea } from '../utils/measurementUtils';

export type MeasurementMode = 'distance' | 'area';

// Memoized event handler component to be rendered inside the map
export const MeasurementEvents: React.FC<{
    isFinished: boolean;
    points: L.LatLng[];
    onPointAdd: (latlng: L.LatLng) => void;
    onTempPointUpdate: (latlng: L.LatLng | null) => void;
    onFinish: () => void;
}> = memo(({ isFinished, points, onPointAdd, onTempPointUpdate, onFinish }) => {
    useMapEvents({
        click(e) {
            if (isFinished) return;
            onPointAdd(e.latlng);
        },
        mousemove(e) {
            if (isFinished || points.length === 0) return;
            onTempPointUpdate(e.latlng);
        },
        dblclick() {
            if (points.length > 0) {
                onFinish();
            }
        },
    });
    return null;
});

/**
 * The core hook for managing the state and logic of the measurement tool.
 */
export const useMeasurement = () => {
    const map = useMap();
    const [mode, setMode] = useState<MeasurementMode>('distance');
    const [points, setPoints] = useState<L.LatLng[]>([]);
    const [tempPoint, setTempPoint] = useState<L.LatLng | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    // Derived state: calculated distance and area
    const distance = useMemo(() => calculateDistance(points), [points]);
    const area = useMemo(() => mode === 'area' ? calculateProjectedArea(points) : 0, [points, mode]);

    // Derived state: points to render for the polyline, including the temporary mouse position
    const linePoints = useMemo(() => !isFinished && tempPoint ? [...points, tempPoint] : points, [isFinished, tempPoint, points]);

    // Action: Reset the entire measurement state
    const reset = useCallback(() => {
        setPoints([]);
        setTempPoint(null);
        setIsFinished(false);
    }, []);

    // Action: Change the measurement mode, which also resets the current measurement
    const handleSetMode = useCallback((newMode: MeasurementMode) => {
        reset();
        setMode(newMode);
    }, [reset]);

    // Action: Add a new point from a map click
    const addPoint = useCallback((latlng: L.LatLng) => {
        setPoints(prevPoints => [...prevPoints, latlng]);
    }, []);
    
    // Action: Finish the measurement on double-click
    const finishMeasurement = useCallback(() => {
        setIsFinished(true);
        setTempPoint(null);
    }, []);

    // Effect to change the cursor style based on the tool's state
    useEffect(() => {
        const mapContainer = map.getContainer();
        mapContainer.style.cursor = isFinished ? '' : 'crosshair';
        return () => { mapContainer.style.cursor = ''; };
    }, [map, isFinished]);

    // Effect to listen for the 'Escape' key to reset the measurement
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                reset();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [reset]);

    return {
        mode,
        points,
        isFinished,
        distance,
        area,
        linePoints,
        setMode: handleSetMode,
        reset,
        // Expose handlers for the events component
        addPoint,
        setTempPoint,
        finishMeasurement,
    };
};