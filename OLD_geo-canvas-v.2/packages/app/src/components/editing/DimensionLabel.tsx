import React, { useState, useEffect, useCallback } from 'react';
import { Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { formatDistance } from '../utils/measurementUtils';
import { useUiContext } from '../../context/UiContext';

interface DimensionLabelProps {
    point1: L.LatLng;
    point2: L.LatLng;
    decimalPlaces?: number;
    showRotation?: boolean; // Optional toggle for debugging
}

const DimensionLabel: React.FC<DimensionLabelProps> = ({
    point1,
    point2,
    decimalPlaces = 2,
    showRotation = false
}) => {
    const map = useMap();
    const { drawingDistanceUnit } = useUiContext();

    const [labelData, setLabelData] = useState<{
        position: L.LatLng;
        label: string;
        rotationDeg: number;
    } | null>(null);

    const calculateLabel = useCallback(() => {
        if (!point1 || !point2) {
            setLabelData(null);
            return;
        }

        const p1_px = map.latLngToContainerPoint(point1);
        const p2_px = map.latLngToContainerPoint(point2);

        const distMeters = point1.distanceTo(point2);
        if (distMeters < 0.01) {
            setLabelData(null);
            return;
        }

        const midpoint = new L.LatLng(
            (point1.lat + point2.lat) / 2,
            (point1.lng + point2.lng) / 2
        );

        const midpointPx = map.latLngToContainerPoint(midpoint);

        // Υπολογίζουμε γωνία (σε βαθμούς) στην προβολή της οθόνης (pixel space)
        const angleRad = Math.atan2(p2_px.y - p1_px.y, p2_px.x - p1_px.x);
        const angleDeg = angleRad * (180 / Math.PI);

        // Προσθέτουμε offset για να μετακινήσουμε το label λίγο "έξω" από τη γραμμή
        const OFFSET_PX = 15;
        const perpAngleRad = angleRad - Math.PI / 2;
        const offsetX = Math.cos(perpAngleRad) * OFFSET_PX;
        const offsetY = Math.sin(perpAngleRad) * OFFSET_PX;
        const offsetMidPx = midpointPx.add(L.point(offsetX, offsetY));
        const offsetMidLatLng = map.containerPointToLatLng(offsetMidPx);

        const label = formatDistance(distMeters, decimalPlaces, drawingDistanceUnit);

        setLabelData({
            position: offsetMidLatLng,
            label,
            rotationDeg: angleDeg
        });
    }, [map, point1, point2, decimalPlaces, drawingDistanceUnit]);

    useMapEvents({
        zoom: calculateLabel,
        move: calculateLabel
    });

    useEffect(() => {
        calculateLabel();
    }, [calculateLabel]);

    if (!labelData) return null;

    const { position, label, rotationDeg } = labelData;

    const icon = new L.DivIcon({
        className: '',
        html: `<div class="dimension-label" style="
            transform: rotate(${rotationDeg}deg);
            transform-origin: center center;
        ">${label}${showRotation ? ` (${rotationDeg.toFixed(1)}°)` : ''}</div>`,
        iconSize: [80, 24],
        iconAnchor: [40, 12]
    });

    return <Marker position={position} icon={icon} interactive={false} />;
};

export default DimensionLabel;
