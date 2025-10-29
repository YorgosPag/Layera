import { useState, useCallback, useRef } from 'react';
import L from 'leaflet';
import { useLayeraTranslation } from '@layera/tolgee';
import type { MeasurementMode, MeasurementPoint, MeasurementResult, DrawingState } from '../types';
import { calculateDistance, calculateProjectedArea } from '../utils/calculations';
import { useMeasurementFormatter } from '../utils/formatters';
import { useNotifications } from '@layera/notifications';

/**
 * Core measurement hook για το geo-drawing system
 * Μεταφέρθηκε και βελτιώθηκε από OLD_geo-canvas
 */
export const useMeasurement = (): void => {
  const { t } = useLayeraTranslation();
  const { addNotification } = useNotifications();
  const { formatDistanceWithLabels, formatAreaWithLabels } = useMeasurementFormatter();

  const [mode, setMode] = useState<MeasurementMode>('distance');
  const [state, setState] = useState<DrawingState>('idle');
  const [points, setPoints] = useState<MeasurementPoint[]>([]);
  const [currentResult, setCurrentResult] = useState<MeasurementResult | null>(null);
  const [results, setResults] = useState<MeasurementResult[]>([]);

  const pointIdCounter = useRef(0);

  /**
   * Adds a new measurement point
   */
  const addPoint = useCallback((latlng: L.LatLng) => {
    const newPoint: MeasurementPoint = {
      id: `point-${pointIdCounter.current++}`,
      latlng,
      index: points.length
    };

    const updatedPoints = [...points, newPoint];
    setPoints(updatedPoints);

    // Start drawing state on first point
    if (points.length === 0) {
      setState('drawing');
    }

    // Calculate current measurement
    let distance = 0;
    let area = 0;
    let displayValue = '';

    if (mode === 'distance' && updatedPoints.length >= 2) {
      const latlngs = updatedPoints.map(p => p.latlng);
      distance = calculateDistance(latlngs);
      displayValue = formatDistanceWithLabels(distance);
    } else if (mode === 'area' && updatedPoints.length >= 3) {
      const latlngs = updatedPoints.map(p => p.latlng);
      area = calculateProjectedArea(latlngs);
      displayValue = formatAreaWithLabels(area);
    } else if (mode === 'point') {
      displayValue = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
    }

    const result: MeasurementResult = {
      type: mode,
      points: updatedPoints,
      ...(mode === 'distance' && distance !== undefined && { distance }),
      ...(mode === 'area' && area !== undefined && { area }),
      displayValue,
      timestamp: Date.now()
    };

    setCurrentResult(result);
  }, [points, mode, formatDistanceWithLabels, formatAreaWithLabels]);

  /**
   * Finishes the current measurement
   */
  const finishMeasurement = useCallback(() => {
    if (!currentResult) return;

    // Validation based on mode
    if (mode === 'distance' && points.length < 2) {
      addNotification({
        type: 'error',
        message: t('geo-drawing.errors.minimum-points-distance')
      });
      return;
    }

    if (mode === 'area' && points.length < 3) {
      addNotification({
        type: 'error',
        message: t('geo-drawing.errors.minimum-points-area')
      });
      return;
    }

    setResults(prev => [...prev, currentResult]);
    setState('finished');

    addNotification({
      type: 'success',
      message: t('geo-drawing.measurement-completed', {
        type: t(`geo-drawing.modes.${mode}`),
        value: currentResult.displayValue
      })
    });
  }, [currentResult, mode, points.length, addNotification, t]);

  /**
   * Cancels the current measurement
   */
  const cancelMeasurement = useCallback(() => {
    setPoints([]);
    setCurrentResult(null);
    setState('idle');
  }, []);

  /**
   * Resets all measurements
   */
  const resetAll = useCallback(() => {
    setPoints([]);
    setCurrentResult(null);
    setResults([]);
    setState('idle');
    pointIdCounter.current = 0;
  }, []);

  /**
   * Changes measurement mode
   */
  const changeMeasurementMode = useCallback((newMode: MeasurementMode) => {
    if (state === 'drawing') {
      // Ask user confirmation if currently drawing
      if (window.confirm(t('geo-drawing.confirm-mode-change'))) {
        cancelMeasurement();
        setMode(newMode);
      }
    } else {
      setMode(newMode);
    }
  }, [state, cancelMeasurement, t]);

  /**
   * Removes the last point
   */
  const removeLastPoint = useCallback(() => {
    if (points.length === 0) return;

    const updatedPoints = points.slice(0, -1);
    setPoints(updatedPoints);

    if (updatedPoints.length === 0) {
      setState('idle');
      setCurrentResult(null);
    } else {
      // Recalculate measurement
      let distance = 0;
      let area = 0;
      let displayValue = '';

      if (mode === 'distance' && updatedPoints.length >= 2) {
        const latlngs = updatedPoints.map(p => p.latlng);
        distance = calculateDistance(latlngs);
        displayValue = formatDistanceWithLabels(distance);
      } else if (mode === 'area' && updatedPoints.length >= 3) {
        const latlngs = updatedPoints.map(p => p.latlng);
        area = calculateProjectedArea(latlngs);
        displayValue = formatAreaWithLabels(area);
      }

      const result: MeasurementResult = {
        type: mode,
        points: updatedPoints,
        ...(mode === 'distance' && distance !== undefined && { distance }),
        ...(mode === 'area' && area !== undefined && { area }),
        displayValue,
        timestamp: Date.now()
      };

      setCurrentResult(result);
    }
  }, [points, mode, formatDistanceWithLabels, formatAreaWithLabels]);

  /**
   * Removes a specific measurement result
   */
  const removeResult = useCallback((timestamp: number) => {
    setResults(prev => prev.filter(result => result.timestamp !== timestamp));
  }, []);

  /**
   * Gets current distance (for display during drawing)
   */
  const getCurrentDistance = useCallback((): number => {
    if (points.length < 2) return 0;
    const latlngs = points.map(p => p.latlng);
    return calculateDistance(latlngs);
  }, [points]);

  /**
   * Gets current area (for display during drawing)
   */
  const getCurrentArea = useCallback((): number => {
    if (points.length < 3) return 0;
    const latlngs = points.map(p => p.latlng);
    return calculateProjectedArea(latlngs);
  }, [points]);

  return {
    // State
    mode,
    state,
    points,
    currentResult,
    results,

    // Actions
    addPoint,
    finishMeasurement,
    cancelMeasurement,
    resetAll,
    changeMeasurementMode,
    removeLastPoint,
    removeResult,

    // Computed values
    getCurrentDistance,
    getCurrentArea,
    isDrawing: state === 'drawing',
    isFinished: state === 'finished',
    canFinish: (mode === 'distance' && points.length >= 2) ||
               (mode === 'area' && points.length >= 3) ||
               (mode === 'point' && points.length >= 1)
  };
};