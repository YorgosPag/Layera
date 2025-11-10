/**
 * useDrawing.ts - Legacy Drawing Hook για backward compatibility
 *
 * Compatibility wrapper για την μετάβαση από @layera/map-drawing.
 * Προσφέρει simple drawing interface που χρησιμοποιούνταν στο παλιό σύστημα.
 */

import { useState, useCallback } from 'react';
import type { DrawnArea } from '@layera/map-core';

export type DrawingMode = 'none' | 'polygon' | 'marker' | 'circle';

export interface UseDrawingOptions {
  initialMode?: DrawingMode;
  onAreaCreated?: (area: DrawnArea) => void;
  onAreaDeleted?: (areaId: string) => void;
  onModeChanged?: (mode: DrawingMode) => void;
}

export interface UseDrawingReturn {
  drawingMode: DrawingMode;
  setDrawingMode: (mode: DrawingMode) => void;
  drawnAreas: DrawnArea[];
  addArea: (area: DrawnArea) => void;
  removeArea: (areaId: string) => void;
  clearAreas: () => void;
  isDrawing: boolean;
  toggleDrawing: () => void;
}

/**
 * Legacy drawing hook για compatibility με το παλιό @layera/map-drawing
 */
export function useDrawing(options: UseDrawingOptions = {}): UseDrawingReturn {
  const {
    initialMode = 'none',
    onAreaCreated,
    onAreaDeleted,
    onModeChanged
  } = options;

  const [drawingMode, setDrawingModeState] = useState<DrawingMode>(initialMode);
  const [drawnAreas, setDrawnAreas] = useState<DrawnArea[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const setDrawingMode = useCallback((mode: DrawingMode) => {
    setDrawingModeState(mode);
    setIsDrawing(mode !== 'none');
    onModeChanged?.(mode);
  }, [onModeChanged]);

  const addArea = useCallback((area: DrawnArea) => {
    setDrawnAreas(prev => [...prev, area]);
    onAreaCreated?.(area);
  }, [onAreaCreated]);

  const removeArea = useCallback((areaId: string) => {
    setDrawnAreas(prev => prev.filter(area => area.id !== areaId));
    onAreaDeleted?.(areaId);
  }, [onAreaDeleted]);

  const clearAreas = useCallback(() => {
    setDrawnAreas([]);
  }, []);

  const toggleDrawing = useCallback(() => {
    setDrawingMode(drawingMode === 'none' ? 'polygon' : 'none');
  }, [drawingMode, setDrawingMode]);

  return {
    drawingMode,
    setDrawingMode,
    drawnAreas,
    addArea,
    removeArea,
    clearAreas,
    isDrawing,
    toggleDrawing
  };
}

export type { UseDrawingOptions, UseDrawingReturn };