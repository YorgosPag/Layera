/**
 * MapContainer.tsx - Enterprise OpenStreetMap Container
 *
 * ARXES Compliant OpenStreetMap component για enterprise χρήση
 * - Semantic HTML (section)
 * - Proper TypeScript typing
 * - No hardcoded values
 * - CSS-only styling
 */

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { DEFAULT_MAP_CONFIG } from '../constants/map.constants';
import { IconFix } from '../utils/icon-fix.utils';

export interface MapContainerProps {
  className?: string;
  initialLat?: number;
  initialLng?: number;
  initialZoom?: number;
  zoomControlPosition?: L.ControlPosition;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  className = DEFAULT_MAP_CONFIG.CONTAINER_CLASS,
  initialLat = DEFAULT_MAP_CONFIG.ATHENS.LAT,
  initialLng = DEFAULT_MAP_CONFIG.ATHENS.LNG,
  initialZoom = DEFAULT_MAP_CONFIG.ZOOM.DEFAULT,
  zoomControlPosition = DEFAULT_MAP_CONFIG.ZOOM_CONTROL.POSITION,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map silently

    // Apply icon fix για enterprise Leaflet compatibility
    IconFix.applyLeafletIconFix();

    // Δημιουργία χάρτη με configuration
    const map = L.map(containerRef.current, {
      zoomControl: false,
    }).setView([initialLat, initialLng], initialZoom);

    // Προσθήκη OpenStreetMap tiles με improved configuration
    const tileLayerOptions = {
      attribution: DEFAULT_MAP_CONFIG.TILE_LAYER.PRIMARY.ATTRIBUTION,
      subdomains: DEFAULT_MAP_CONFIG.TILE_LAYER.PRIMARY.SUBDOMAINS,
      maxZoom: DEFAULT_MAP_CONFIG.TILE_LAYER.OPTIONS.maxZoom,
      minZoom: DEFAULT_MAP_CONFIG.TILE_LAYER.OPTIONS.minZoom,
      tileSize: DEFAULT_MAP_CONFIG.TILE_LAYER.OPTIONS.tileSize,
      detectRetina: DEFAULT_MAP_CONFIG.TILE_LAYER.OPTIONS.detectRetina,
      crossOrigin: DEFAULT_MAP_CONFIG.TILE_LAYER.OPTIONS.crossOrigin,
    };

    const primaryTileLayer = L.tileLayer(DEFAULT_MAP_CONFIG.TILE_LAYER.PRIMARY.URL, tileLayerOptions);

    primaryTileLayer.on('tileerror', (error) => {
      console.warn('[MapContainer] Primary tile server failed:', error);
      console.log('[MapContainer] Switching to fallback tile server...');
      // Fallback tile layer
      L.tileLayer(DEFAULT_MAP_CONFIG.TILE_LAYER.FALLBACK.URL, {
        attribution: DEFAULT_MAP_CONFIG.TILE_LAYER.FALLBACK.ATTRIBUTION,
        maxZoom: DEFAULT_MAP_CONFIG.TILE_LAYER.OPTIONS.maxZoom,
      }).addTo(map);
    });

    // Quiet tile loading - remove noisy console logs
    primaryTileLayer.on('tileload', () => {
      // Tiles loaded - no logging needed for normal operation
    });

    primaryTileLayer.on('loading', () => {
      // Loading tiles - no logging needed for normal operation
    });
    primaryTileLayer.addTo(map);

    // Προσθήκη zoom control
    L.control.zoom({
      position: zoomControlPosition
    }).addTo(map);

    mapRef.current = map;

    // Force map to recalculate size για να λυθούν tile issues
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 100);

    // Add resize listener για responsive behavior
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);

    // Προσθήκη ενός interval check για edge cases
    const intervalId = setInterval(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 1000);

    // Cleanup στο return
    const originalCleanup = () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(intervalId);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };

    // Cleanup function
    return originalCleanup;
  }, [initialLat, initialLng, initialZoom, zoomControlPosition]);

  return (
    <section
      ref={containerRef}
      className={className}
    />
  );
};