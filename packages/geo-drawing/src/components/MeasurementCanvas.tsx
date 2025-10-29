import React, { useCallback, useEffect } from 'react';
import { Polygon, Polyline, CircleMarker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '@layera/theme-switcher';
import { Box } from '@layera/layout';
import { useMeasurement } from '../hooks/useMeasurement';
import { useGeometrySnap } from '../hooks/useGeometrySnap';
import type { MeasurementMode, CanvasInteractionEvent } from '../types';

interface MeasurementCanvasProps {
  mode: MeasurementMode;
  enableSnapping?: boolean;
  onMeasurementChange?: (result: unknown) => void;
  className?: string;
}

/**
 * Interactive measurement canvas component
 * Ενσωματώνει το measurement logic με snap-to-geometry functionality
 */
export const MeasurementCanvas: React.FC<MeasurementCanvasProps> = ({
  mode,
  enableSnapping = true,
  onMeasurementChange,
  className
}) => {
  const { theme } = useTheme();
  const {
    points,
    state,
    addPoint,
    finishMeasurement,
    cancelMeasurement,
    changeMeasurementMode,
    currentResult
  } = useMeasurement();

  const {
    getSnappedPoint,
    isSnappingEffective
  } = useGeometrySnap(enableSnapping);

  // Sync external mode changes
  useEffect(() => {
    changeMeasurementMode(mode);
  }, [mode, changeMeasurementMode]);

  // Notify parent of measurement changes
  useEffect(() => {
    if (currentResult && onMeasurementChange) {
      onMeasurementChange(currentResult);
    }
  }, [currentResult, onMeasurementChange]);

  // Handle map interactions
  const mapEvents = useMapEvents({
    click: useCallback((e: L.LeafletMouseEvent) => {
      if (state === 'finished') return;

      let latlng = e.latlng;
      let snapped = false;
      let snapResult;

      // Apply snapping if enabled
      if (enableSnapping && isSnappingEffective) {
        const result = getSnappedPoint(e.latlng);
        if (result.isSnapped && result.snappedLatLng) {
          latlng = result.snappedLatLng;
          snapped = true;
          snapResult = {
            snapPoint: result.snapPoint!,
            snapType: result.snapType as 'vertex' | 'edge'
          };
        }
      }

      // Create interaction event
      const interactionEvent: CanvasInteractionEvent = {
        type: 'click',
        latlng,
        originalEvent: e.originalEvent,
        snapped,
        snapResult
      };

      addPoint(latlng);
    }, [state, enableSnapping, isSnappingEffective, getSnappedPoint, addPoint]),

    dblclick: useCallback((e: L.LeafletMouseEvent) => {
      e.originalEvent.preventDefault();
      e.originalEvent.stopPropagation();

      if (state === 'drawing' && mode !== 'point') {
        finishMeasurement();
      }
    }, [state, mode, finishMeasurement]),

    keydown: useCallback((e: L.LeafletKeyboardEvent) => {
      if (e.originalEvent.key === 'Escape' && state === 'drawing') {
        cancelMeasurement();
      }
    }, [state, cancelMeasurement])
  });

  // Get theme-aware colors
  const getColors = useCallback(() => {
    const isDark = theme === 'dark';
    return {
      line: isDark ? 'var(--la-color-blue-400, var(--la-color-primary-light))' : 'var(--la-color-blue-600, var(--la-color-brand))',
      fill: isDark ? 'var(--la-color-blue-400-alpha-20, rgba(96, 165, 250, 0.2))' : 'var(--la-color-blue-600-alpha-20, rgba(59, 130, 246, 0.2))',
      point: isDark ? 'var(--la-color-amber-500, var(--la-color-warning))' : 'var(--la-color-amber-600, var(--la-color-warning-dark))',
      pointBorder: isDark ? 'var(--la-color-gray-800, var(--la-text-primary))' : 'var(--la-color-white, var(--la-color-surface))'
    };
  }, [theme]);

  const colors = getColors();

  // Render measurement geometry
  const renderGeometry = (): void => {
    if (points.length === 0) return null;

    const latlngs = points.map(p => p.latlng);

    return (
      <>
        {/* Render points */}
        {points.map((point, index) => (
          <CircleMarker
            key={point.id}
            center={point.latlng}
            radius={6}
            pathOptions={{
              color: colors.pointBorder,
              fillColor: colors.point,
              fillOpacity: 1,
              weight: 2
            }}
          />
        ))}

        {/* Render lines for distance mode or area outline */}
        {((mode === 'distance' || mode === 'area') && latlngs.length >= 2) && (
          <Polyline
            positions={latlngs}
            pathOptions={{
              color: colors.line,
              weight: 3,
              opacity: 0.8,
              dashArray: state === 'drawing' ? '5, 5' : undefined
            }}
          />
        )}

        {/* Render polygon fill for area mode */}
        {(mode === 'area' && latlngs.length >= 3 && state === 'finished') && (
          <Polygon
            positions={latlngs}
            pathOptions={{
              color: colors.line,
              fillColor: colors.fill,
              fillOpacity: 0.3,
              weight: 2
            }}
          />
        )}
      </>
    );
  };

  return (
    <Box className={className}>
      {renderGeometry()}
    </Box>
  );
};