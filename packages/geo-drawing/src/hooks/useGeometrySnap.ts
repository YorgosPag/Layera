import { useState, useEffect, useCallback, useRef } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { useSnapEngine } from '@layera/snap-interactions';
import type { GeoJSONFeatureCollection, OSMBuildingFeature } from '../types';
import { fetchBuildingOutlines } from '../services/osmService';
import { extractOSMGeometry } from '../utils/geometry';
import { CONFIG } from '@layera/constants';

/**
 * Hook που ενσωματώνει το snap-to-geometry με OSM building data
 * Βασισμένο στο OLD_geo-canvas/packages/app/src/hooks/useSnapping.ts
 * αλλά χρησιμοποιεί το νέο @layera/snap-engine LEGO system
 */
export const useGeometrySnap = (isEnabled: boolean = true) => {
  const map = useMap();
  const [osmData, setOsmData] = useState<GeoJSONFeatureCollection | null>(null);
  const [isSnappingEffective, setIsSnappingEffective] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Initialize snap engine με OSM-specific configuration
  const snapEngine = useSnapEngine({
    tolerance: CONFIG.geoDrawing.snapTolerance,
    enabledTypes: new Set(['vertex', 'edge', 'center', 'nearest']),
    spatialIndexing: true
  });

  // Effect για fetching OSM data όταν ο χάρτης κινείται
  useEffect(() => {
    const fetchData = async () => {
      const currentZoom = map.getZoom();
      if (!isEnabled || currentZoom < CONFIG.geoDrawing.minSnapZoom) {
        setOsmData(null);
        setIsSnappingEffective(false);
        snapEngine.clearGeometries();
        return;
      }

      setIsSnappingEffective(true);
      try {
        const geojson = await fetchBuildingOutlines(map.getBounds());
        setOsmData(geojson);

        // Convert OSM features to geometries για το snap engine
        const geometries: L.LatLng[][] = [];
        geojson.features.forEach((feature: OSMBuildingFeature) => {
          const polygons = extractOSMGeometry(feature);
          geometries.push(...polygons);
        });

        // Update snap engine με νέα geometries
        snapEngine.setGeometries(geometries);
      } catch (error) {
        console.warn('Failed to fetch OSM data for snapping:', error);
        setOsmData(null);
        setIsSnappingEffective(false);
      }
    };

    const handleMoveEnd = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Debounce the fetch request to avoid spamming the API
      timeoutRef.current = window.setTimeout(fetchData, CONFIG.geoDrawing.debounceMs);
    };

    map.on('moveend zoomend', handleMoveEnd);
    fetchData(); // Initial check/fetch for the current view

    return () => {
      map.off('moveend zoomend', handleMoveEnd);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsSnappingEffective(false);
      snapEngine.clearGeometries();
    };
  }, [map, isEnabled, snapEngine]);

  /**
   * Performs snapping calculation για ένα cursor point
   * @param latlng Original cursor position
   * @returns Snap result with snapped position
   */
  const getSnappedPoint = useCallback((latlng: L.LatLng) => {
    if (!isEnabled || !isSnappingEffective || map.getZoom() < CONFIG.geoDrawing.minSnapZoom) {
      return {
        snappedLatLng: latlng,
        snapPoint: null,
        snapType: null,
        isSnapped: false
      };
    }

    return snapEngine.snapToPoint(latlng);
  }, [isEnabled, isSnappingEffective, map, snapEngine]);

  /**
   * Snap σε κοντινότερο vertex
   */
  const snapToVertex = useCallback((latlng: L.LatLng) => {
    if (!isEnabled || !isSnappingEffective) {
      return { snappedLatLng: latlng, snapPoint: null, isSnapped: false };
    }

    return snapEngine.snapToVertex(latlng);
  }, [isEnabled, isSnappingEffective, snapEngine]);

  /**
   * Snap σε κοντινότερο edge
   */
  const snapToEdge = useCallback((latlng: L.LatLng) => {
    if (!isEnabled || !isSnappingEffective) {
      return { snappedLatLng: latlng, snapPoint: null, isSnapped: false };
    }

    return snapEngine.snapToEdge(latlng);
  }, [isEnabled, isSnappingEffective, snapEngine]);

  /**
   * Enables/disables specific snap types
   */
  const setSnapTypes = useCallback((types: Set<string>) => {
    snapEngine.setEnabledTypes(types);
  }, [snapEngine]);

  /**
   * Updates snap tolerance
   */
  const setSnapTolerance = useCallback((tolerance: number) => {
    snapEngine.setTolerance(tolerance);
  }, [snapEngine]);

  /**
   * Gets building information at a point
   */
  const getBuildingInfo = useCallback((latlng: L.LatLng) => {
    if (!osmData) return null;

    for (const feature of osmData.features) {
      const polygons = extractOSMGeometry(feature);
      for (const polygon of polygons) {
        // Simple point-in-polygon check
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          if (((polygon[i].lat > latlng.lat) !== (polygon[j].lat > latlng.lat)) &&
              (latlng.lng < (polygon[j].lng - polygon[i].lng) * (latlng.lat - polygon[i].lat) / (polygon[j].lat - polygon[i].lat) + polygon[i].lng)) {
            inside = !inside;
          }
        }
        if (inside) {
          return feature.properties;
        }
      }
    }
    return null;
  }, [osmData]);

  return {
    // State
    isSnappingEffective,
    osmData,
    snapEngine,

    // Snap functions
    getSnappedPoint,
    snapToVertex,
    snapToEdge,

    // Configuration
    setSnapTypes,
    setSnapTolerance,

    // Utility
    getBuildingInfo,

    // Backward compatibility με το παλιό API
    snappingData: osmData
  };
};