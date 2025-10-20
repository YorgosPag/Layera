// Layera GeoAlert V1 - DrawingTools Module
// Απομονωμένο τουβλάκι για σχεδίαση περιγραμμάτων
// Patterns από geo-canvas(8) StepDrawLocation.tsx

import React, { useState, useCallback } from 'react';
import { useMapEvents, Circle, Polygon, Marker } from 'react-leaflet';
import L from 'leaflet';
import { useLayeraTranslation } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import { DrawingShape, DrawingState, GeoAlertArea, DRAWING_LIMITS } from '../../types';

interface DrawingToolsProps {
  onAreaCreated: (area: Omit<GeoAlertArea, 'id' | 'createdAt' | 'userId'>) => void;
  isGuest?: boolean;
}

const DrawingTools: React.FC<DrawingToolsProps> = ({ onAreaCreated, isGuest = false }) => {
  const { t } = useLayeraTranslation();

  const [drawingState, setDrawingState] = useState<DrawingState>({
    isActive: false,
    isFinished: false,
    shape: null,
    points: [],
    radius: DRAWING_LIMITS.MIN_RADIUS
  });

  const [currentGeometry, setCurrentGeometry] = useState<GeoAlertArea['geometry'] | null>(null);

  // Map event handlers (pattern από geo-canvas)
  const map = useMapEvents({
    click: handleMapClick,
  });

  function handleMapClick(e: L.LeafletMouseEvent) {
    if (!drawingState.isActive) return;

    const { lat, lng } = e.latlng;

    if (drawingState.shape === 'marker') {
      // Marker placement
      const geometry: GeoAlertArea['geometry'] = {
        type: 'marker',
        coordinates: [lat, lng],
        radius: drawingState.radius || DRAWING_LIMITS.MIN_RADIUS
      };

      setCurrentGeometry(geometry);
      setDrawingState((prev: DrawingState) => ({ ...prev, isFinished: true, points: [e.latlng] }));

    } else if (drawingState.shape === 'polygon') {
      // Polygon drawing
      const newPoints = [...drawingState.points, e.latlng];

      // Check if clicked on first point to close polygon
      if (newPoints.length > 2 && e.latlng.distanceTo(newPoints[0]) < 10) {
        const coords = newPoints.slice(0, -1).map((p: L.LatLng) => [p.lat, p.lng]);
        const geometry: GeoAlertArea['geometry'] = {
          type: 'polygon',
          coordinates: coords
        };

        setCurrentGeometry(geometry);
        setDrawingState((prev: DrawingState) => ({ ...prev, isFinished: true }));
      } else {
        setDrawingState((prev: DrawingState) => ({ ...prev, points: newPoints }));
      }
    }
  }

  const startDrawing = useCallback((shape: DrawingShape) => {
    setDrawingState({
      isActive: true,
      isFinished: false,
      shape,
      points: [],
      radius: shape === 'marker' ? DRAWING_LIMITS.MIN_RADIUS : null
    });
    setCurrentGeometry(null);
  }, []);

  const clearDrawing = useCallback(() => {
    setDrawingState({
      isActive: false,
      isFinished: false,
      shape: null,
      points: [],
      radius: null
    });
    setCurrentGeometry(null);
  }, []);

  const handleRadiusChange = useCallback((newRadius: number) => {
    setDrawingState((prev: DrawingState) => ({ ...prev, radius: newRadius }));

    if (currentGeometry && currentGeometry.type === 'marker') {
      setCurrentGeometry((prev: DrawingState) => prev ? { ...prev, radius: newRadius } : null);
    }
  }, [currentGeometry]);

  const saveArea = useCallback(() => {
    if (!currentGeometry || isGuest) return;

    const area: Omit<GeoAlertArea, 'id' | 'createdAt' | 'userId'> = {
      name: `${t('area')} ${Date.now()}`, // Temporary name
      alertType: 'property_search',
      geometry: currentGeometry,
      filters: {}, // Empty για V1
      active: true
    };

    onAreaCreated(area);
    clearDrawing();
  }, [currentGeometry, isGuest, onAreaCreated, clearDrawing, t]);

  return (
    <>
      {/* Drawing Controls UI */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3 space-y-2">
        <div className="text-sm font-medium text-gray-800 mb-2">
          {t('drawingTools')}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => startDrawing('polygon')}
            variant={drawingState.shape === 'polygon' && drawingState.isActive ? 'primary' : 'secondary'}
            size="xs"
            fullWidth
          >
            {t('polygon')}
          </Button>
          <Button
            onClick={() => startDrawing('marker')}
            variant={drawingState.shape === 'marker' && drawingState.isActive ? 'primary' : 'secondary'}
            size="xs"
            fullWidth
          >
            {t('marker')}
          </Button>
        </div>

        {drawingState.isActive && !drawingState.isFinished && (
          <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs">
            <p className="font-semibold text-blue-800">
              {drawingState.shape === 'polygon' ? t('drawOnMap') : t('clickOnMap')}
            </p>
          </div>
        )}

        {drawingState.isFinished && drawingState.shape === 'marker' && (
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              {t('radius')}: {drawingState.radius}m
            </label>
            <input
              type="range"
              min={DRAWING_LIMITS.MIN_RADIUS}
              max={DRAWING_LIMITS.MAX_RADIUS}
              step="50"
              value={drawingState.radius || DRAWING_LIMITS.MIN_RADIUS}
              onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}

        {drawingState.isFinished && (
          <div className="flex gap-2">
            {!isGuest && (
              <Button
                onClick={saveArea}
                variant="success"
                size="xs"
                style={{ flex: 1 }}
              >
                {t('save')}
              </Button>
            )}
            <Button
              onClick={clearDrawing}
              variant="secondary"
              size="xs"
              style={{ flex: 1 }}
            >
              {t('clear')}
            </Button>
          </div>
        )}

        {isGuest && drawingState.isFinished && (
          <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
            {t('guestModeNote')}
          </div>
        )}
      </div>

      {/* Rendered Shapes */}
      {currentGeometry && currentGeometry.type === 'marker' && (
        <>
          <Marker position={[currentGeometry.coordinates[0], currentGeometry.coordinates[1]]} />
          {currentGeometry.radius && (
            <Circle
              center={[currentGeometry.coordinates[0], currentGeometry.coordinates[1]]}
              radius={currentGeometry.radius}
              fillColor="blue"
              fillOpacity={0.2}
              color="blue"
              weight={2}
            />
          )}
        </>
      )}

      {currentGeometry && currentGeometry.type === 'polygon' && (
        <Polygon
          positions={currentGeometry.coordinates.map((coord: number[]) => [coord[0], coord[1]])}
          fillColor="blue"
          fillOpacity={0.2}
          color="blue"
          weight={2}
        />
      )}

      {/* Drawing preview για polygon */}
      {drawingState.isActive && drawingState.shape === 'polygon' && drawingState.points.length > 0 && (
        <Polygon
          positions={drawingState.points.map((p: L.LatLng) => [p.lat, p.lng])}
          fillColor="red"
          fillOpacity={0.1}
          color="red"
          weight={2}
          dashArray="5, 5"
        />
      )}
    </>
  );
};

export default DrawingTools;