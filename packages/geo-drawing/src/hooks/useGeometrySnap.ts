import { useState, useEffect, useCallback, useRef } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import type { OSMBuildingCollection } from '@layera/geo-core';
import { fetchBuildingOutlines } from '../services/osmService';
import { CONFIG } from '@layera/constants';

/**
 * Hook που ενσωματώνει το snap-to-geometry με OSM building data
 * Temporary simplified version μέχρι να συμβατοποιηθούν τα snap packages
 */
export const useGeometrySnap = (isEnabled: boolean = true) => {
  const map = useMap();
  const [osmData, setOsmData] = useState<OSMBuildingCollection | null>(null);
  const [isSnappingEffective, setIsSnappingEffective] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Effect για fetching OSM data όταν ο χάρτης κινείται
  useEffect(() => {
    const fetchData = async () => {
      const currentZoom = map.getZoom();
      if (!isEnabled || currentZoom < (CONFIG.geoDrawing?.minSnapZoom || 16)) {
        setOsmData(null);
        setIsSnappingEffective(false);
        return;
      }

      setIsSnappingEffective(true);
      try {
        const geojson = await fetchBuildingOutlines(map.getBounds());
        setOsmData(geojson);
      } catch (error) {
        console.error('Error fetching OSM data for snapping:', error);
        setOsmData(null);
        setIsSnappingEffective(false);
      }
    };

    const debouncedFetch = (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(fetchData, CONFIG.geoDrawing?.debounceMs || 500);
    };

    map.on('moveend', debouncedFetch);
    map.on('zoomend', debouncedFetch);

    // Initial fetch
    fetchData();

    return () => {
      map.off('moveend', debouncedFetch);
      map.off('zoomend', debouncedFetch);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [map, isEnabled]);

  /**
   * Snap function που δέχεται LatLng και επιστρέφει snapped coordinates
   * Temporary implementation που επιστρέφει το original point
   */
  const snapToGeometry = useCallback(async (point: L.LatLng): Promise<L.LatLng> => {
    // FIXME: Implement actual snapping when snap packages are compatible
    return point;
  }, []);

  /**
   * Toggles snap types - placeholder
   */
  const toggleSnapType = useCallback((type: string, enabled: boolean) => {
    // FIXME: Implement when snap engine is compatible
  }, []);

  /**
   * Updates snap tolerance - placeholder
   */
  const updateTolerance = useCallback((tolerance: number) => {
    // FIXME: Implement when snap engine is compatible
  }, []);

  return {
    // State
    isSnappingEffective,
    osmData,
    isSnapped: false,
    lastSnapResult: null,

    // Functions
    snapToGeometry,
    toggleSnapType,
    updateTolerance,

    // Placeholder values
    snapEngine: null,
    performanceMetrics: null
  };
};