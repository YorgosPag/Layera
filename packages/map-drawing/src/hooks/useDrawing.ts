import { useEffect, useRef, useState, useCallback } from 'react';
import { useMap } from '@layera/map-core';
import { DrawingService } from '../services/DrawingService';
import { DrawingMode, DrawnArea, DrawingEventHandlers, DrawingServiceConfig } from '../types';

export interface UseDrawingOptions {
  config?: DrawingServiceConfig;
  onAreaCreated?: (area: DrawnArea) => void;
  onAreaDeleted?: (areaId: string) => void;
  onModeChanged?: (mode: DrawingMode) => void;
}

export interface UseDrawingReturn {
  drawingService: DrawingService | null;
  currentMode: DrawingMode;
  drawnAreas: DrawnArea[];
  setDrawingMode: (mode: DrawingMode) => void;
  clearAll: () => void;
  deleteArea: (areaId: string) => void;
  isReady: boolean;
}

export const useDrawing = (options: UseDrawingOptions = {}): UseDrawingReturn => {
  const { map, isLoading } = useMap();
  const drawingServiceRef = useRef<DrawingService | null>(null);
  const [currentMode, setCurrentMode] = useState<DrawingMode>('none');
  const [drawnAreas, setDrawnAreas] = useState<DrawnArea[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Initialize drawing service when map is ready
  useEffect(() => {
    if (!map || isLoading) {
      setIsReady(false);
      return;
    }

    const handlers: DrawingEventHandlers = {
      onAreaCreated: (area) => {
        setDrawnAreas(prev => [...prev, area]);
        options.onAreaCreated?.(area);
      },
      onAreaDeleted: (areaId) => {
        setDrawnAreas(prev => prev.filter(area => area.id !== areaId));
        options.onAreaDeleted?.(areaId);
      },
      onModeChanged: (mode) => {
        setCurrentMode(mode);
        options.onModeChanged?.(mode);
      }
    };

    drawingServiceRef.current = new DrawingService(options.config);
    drawingServiceRef.current.initialize(map, handlers);
    setIsReady(true);

    return () => {
      drawingServiceRef.current?.cleanup();
      drawingServiceRef.current = null;
      setIsReady(false);
    };
  }, [map, isLoading, options.config]);

  const setDrawingMode = useCallback((mode: DrawingMode) => {
    drawingServiceRef.current?.setDrawingMode(mode);
  }, []);

  const clearAll = useCallback(() => {
    drawingServiceRef.current?.clearAll();
    setDrawnAreas([]);
  }, []);

  const deleteArea = useCallback((areaId: string) => {
    drawingServiceRef.current?.deleteArea(areaId);
  }, []);

  return {
    drawingService: drawingServiceRef.current,
    currentMode,
    drawnAreas,
    setDrawingMode,
    clearAll,
    deleteArea,
    isReady
  };
};