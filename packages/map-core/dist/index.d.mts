import L from 'leaflet';
import React, { ReactNode } from 'react';

type LatLngBounds = L.LatLngBounds;
type LeafletMap = L.Map;
type LeafletEvent = L.LeafletMouseEvent;
type LeafletLayer = L.Layer;
interface DrawnArea {
    id: string;
    type: 'polygon' | 'marker';
    coordinates: number[][];
    name: string;
    nameTemplate?: string;
    nameNumber?: number;
    area?: number;
    category: 'real_estate' | 'jobs';
    isVisible?: boolean;
    opacity?: number;
    metadata?: {
        price?: number;
        squareMeters?: number;
        rooms?: number;
        propertyType?: string;
        salary?: number;
        workingHours?: string;
        company?: string;
        jobType?: string;
    };
}
interface MapConfig {
    center: [number, number];
    zoom: number;
    maxZoom: number;
    minZoom: number;
    tileUrl: string;
    attribution: string;
}
interface MapInitializationOptions {
    containerId: string;
    config: MapConfig;
    enableGeoLocation?: boolean;
    enableSearch?: boolean;
    enableDrawing?: boolean;
}

declare class MapInitializationService {
    private static instance;
    private readonly defaultConfig;
    static getInstance(): MapInitializationService;
    private constructor();
    private fixLeafletIconPaths;
    private addOverlayStyles;
    initializeMap(options: MapInitializationOptions): LeafletMap;
    addZoomControl(map: LeafletMap, position?: 'topright' | 'topleft' | 'bottomright' | 'bottomleft'): void;
    addScaleControl(map: LeafletMap, options?: {
        position?: 'topright' | 'topleft' | 'bottomright' | 'bottomleft';
        metric?: boolean;
        imperial?: boolean;
        maxWidth?: number;
    }): void;
    setupEventListeners(map: LeafletMap, handlers: {
        onMapClick?: (event: LeafletEvent) => void;
        onMapMove?: () => void;
        onMapMoveEnd?: () => void;
        onMapZoomEnd?: () => void;
    }): void;
    cleanupMap(map: LeafletMap | null): void;
}

interface MapContextValue {
    map: LeafletMap | null;
    mapBounds: LatLngBounds | null;
    mapSize: {
        width: number;
        height: number;
    };
    isLoading: boolean;
    initializeMap: (containerId: string, config?: Partial<MapConfig>) => Promise<void>;
    cleanupMap: () => void;
}
interface MapProviderProps {
    children: ReactNode;
    defaultConfig?: Partial<MapConfig>;
}
declare const MapProvider: React.FC<MapProviderProps>;
declare const useMap: () => MapContextValue;

export { type DrawnArea, type LatLngBounds, type LeafletEvent, type LeafletLayer, type LeafletMap, type MapConfig, type MapInitializationOptions, MapInitializationService, MapProvider, useMap };
