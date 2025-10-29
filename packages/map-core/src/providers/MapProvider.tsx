import React, { createContext, useContext, useRef, useState, useEffect, useCallback, ReactNode } from 'react';
import { LeafletMap, LatLngBounds, MapConfig, MapInitializationOptions } from '../types';
import { MapInitializationService } from '../services/MapInitializationService';

interface MapContextValue {
  map: LeafletMap | null;
  mapBounds: LatLngBounds | null;
  mapSize: { width: number; height: number };
  isLoading: boolean;
  initializeMap: (containerId: string, config?: Partial<MapConfig>) => Promise<void>;
  cleanupMap: () => void;
}

const MapContext = createContext<MapContextValue | undefined>(undefined);

interface MapProviderProps {
  children: ReactNode;
  defaultConfig?: Partial<MapConfig>;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children, defaultConfig }) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const isComponentMounted = useRef(true);
  const mapInitService = useRef(MapInitializationService.getInstance());

  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const updateMapState = () => {
    if (isComponentMounted.current && mapRef.current) {
      const bounds = mapRef.current.getBounds();
      const size = mapRef.current.getSize();
      setMapBounds(bounds);
      setMapSize({ width: size.x, height: size.y });
    }
  };

  const initializeMap = useCallback(async (containerId: string, config?: Partial<MapConfig>) => {
    console.log('🗺️ MapProvider.initializeMap() CALLED with:', containerId);

    try {
      setIsLoading(true);

      const mapConfig = { ...defaultConfig, ...config };
      console.log('🔧 MapProvider config prepared:', mapConfig);

      const initOptions: MapInitializationOptions = {
        containerId,
        config: mapConfig as MapConfig,
        enableGeoLocation: false,
        enableSearch: false,
        enableDrawing: false
      };

      console.log('🚀 MapProvider calling MapInitializationService...');
      const map = mapInitService.current.initializeMap(initOptions);
      console.log('✅ MapProvider received map instance:', !!map);

      mapRef.current = map;

      // Setup event listeners for state updates
      mapInitService.current.setupEventListeners(map, {
        onMapMove: updateMapState,
        onMapMoveEnd: updateMapState,
        onMapZoomEnd: updateMapState
      });

      // Initial state update
      updateMapState();
      setIsLoading(false);

      console.log('✅ MapProvider initialization complete');
    } catch (error) {
      console.error('❌ MapProvider initialization failed:', error);
      setIsLoading(false);
      throw error; // Re-throw to let the caller handle it
    }
  }, [defaultConfig]);

  const cleanupMap = useCallback(() => {
    if (mapRef.current) {
      mapInitService.current.cleanupMap(mapRef.current);
      mapRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
      cleanupMap();
    };
  }, []);

  const value: MapContextValue = {
    map: mapRef.current,
    mapBounds,
    mapSize,
    isLoading,
    initializeMap,
    cleanupMap
  };

  // Debug log to verify the function is correct
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 MapProvider creating context value with initializeMap:', initializeMap.toString().substring(0, 200));
  }


  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = (): MapContextValue => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};