import L from 'leaflet';
import { DrawnArea, LeafletMap } from '@layera/map-core';
export { DrawnArea } from '@layera/map-core';

type DrawingMode = 'none' | 'polygon' | 'marker';
interface DrawingState {
    activeMode: DrawingMode;
    currentPolygon: L.Layer | null;
    polygonPoints: number[][];
    drawnAreas: DrawnArea[];
}
interface DrawingTool {
    id: string;
    name: string;
    mode: DrawingMode;
    icon: React.ComponentType;
    isActive: boolean;
}
interface DrawingEventHandlers {
    onAreaCreated?: (area: DrawnArea) => void;
    onAreaDeleted?: (areaId: string) => void;
    onModeChanged?: (mode: DrawingMode) => void;
}
interface DrawingServiceConfig {
    enablePolygon?: boolean;
    enableMarker?: boolean;
    defaultCategory?: 'real_estate' | 'jobs';
}

declare class DrawingService {
    private map;
    private state;
    private handlers;
    private config;
    constructor(config?: DrawingServiceConfig);
    initialize(map: LeafletMap, handlers?: DrawingEventHandlers): void;
    private setupEventListeners;
    private handleMapClick;
    private handleDoubleClick;
    private addMarker;
    private addPolygonPoint;
    private finishPolygon;
    private calculatePolygonArea;
    setDrawingMode(mode: DrawingMode): void;
    clearAll(): void;
    deleteArea(areaId: string): void;
    getDrawnAreas(): DrawnArea[];
    getCurrentMode(): DrawingMode;
    cleanup(): void;
}

interface UseDrawingOptions {
    config?: DrawingServiceConfig;
    onAreaCreated?: (area: DrawnArea) => void;
    onAreaDeleted?: (areaId: string) => void;
    onModeChanged?: (mode: DrawingMode) => void;
}
interface UseDrawingReturn {
    drawingService: DrawingService | null;
    currentMode: DrawingMode;
    drawnAreas: DrawnArea[];
    setDrawingMode: (mode: DrawingMode) => void;
    clearAll: () => void;
    deleteArea: (areaId: string) => void;
    isReady: boolean;
}
declare const useDrawing: (options?: UseDrawingOptions) => UseDrawingReturn;

export { type DrawingEventHandlers, type DrawingMode, DrawingService, type DrawingServiceConfig, type DrawingState, type DrawingTool, type UseDrawingOptions, type UseDrawingReturn, useDrawing };
