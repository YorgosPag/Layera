import React from 'react';
import { Polyline, Polygon, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { MeasurementMode } from '../../hooks/useMeasurement';

interface MeasurementDisplayProps {
    points: L.LatLng[];
    linePoints: L.LatLng[];
    mode: MeasurementMode;
    isFinished: boolean;
}

const MeasurementDisplay: React.FC<MeasurementDisplayProps> = ({ points, linePoints, mode, isFinished }) => {
    const isDrawing = !isFinished && linePoints.length > points.length;
    const lineStyle = { color: '#3B82F6', weight: 3, dashArray: isDrawing ? '5, 5' : undefined };
    const markerStyle = { color: '#3B82F6', fillColor: 'white', fillOpacity: 1, weight: 2 };
    const areaStyle = { color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.2 };

    return (
        <>
            {/* Render all clicked points as markers */}
            {points.map((point, index) => (
                <CircleMarker key={index} center={point} radius={4} pathOptions={markerStyle} />
            ))}

            {/* Render the polyline for both distance and area mode */}
            {linePoints.length > 0 && (
                <Polyline positions={linePoints} pathOptions={lineStyle} />
            )}
            
            {/* Render the filled polygon only in area mode when there are enough points */}
            {mode === 'area' && points.length > 2 && (
                <Polygon positions={points} pathOptions={areaStyle} />
            )}
        </>
    );
};

export default MeasurementDisplay;