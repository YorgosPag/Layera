// Layera GeoAlert V1 - Main MapCanvas Component
// Enterprise Integration: Συνδυάζει όλα τα micro-modules
// Architecture: Composition over inheritance

import React, { useEffect, useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import { Box, Flex } from '@layera/layout';
import { Text } from '@layera/typography';
import { SPACING_SCALE, getCardInfoColor } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';

// Micro-modules imports
import MapCore from '../map/core/MapCore';
import { loadLeafletCSS } from '../utils/leaflet/css-loader';
import { configureGlobalIcons } from '../utils/leaflet/icon-factory';
import { getCurrentLocation } from '../utils/location/user-location';
import { formatArea, formatDistance } from '@layera/geo-drawing';
import eventBus, { mapEvents } from '../utils/events/event-bus';

// Types
import { GeoAlertArea } from '../types';
import L from 'leaflet';

interface MapCanvasProps {
  isGuest?: boolean;
  onAreaCreated?: (area: GeoAlertArea) => void;
  className?: string;
}

const MapCanvas: React.FC<MapCanvasProps> = ({
  isGuest = false,
  onAreaCreated,
  className = ''
}) => {
  const { t } = useLayeraTranslation();
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Initialize Leaflet CSS and icons
  useEffect(() => {
    const initializeLeaflet = async () => {
      try {
        await loadLeafletCSS();
        configureGlobalIcons();
        setIsMapReady(true);
      } catch (error) {
        console.error('Failed to initialize Leaflet:', error);
      }
    };

    initializeLeaflet();
  }, []);

  // Handle map ready event
  const handleMapReady = useCallback((map: L.Map) => {
    setMapInstance(map);
    mapEvents.mapReady(map);

    // Listen για map movement events
    map.on('moveend', () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      mapEvents.mapMoved(
        { lat: center.lat, lng: center.lng },
        zoom
      );
    });
  }, []);

  // Handle area creation
  const handleAreaCreated = useCallback((area: Omit<GeoAlertArea, 'id' | 'createdAt' | 'userId'>) => {
    const fullArea: GeoAlertArea = {
      ...area,
      id: `area_${Date.now()}`,
      createdAt: new Date().toISOString(),
      userId: 'guest' // Temporary για guest mode
    };

    mapEvents.createArea(fullArea);
    onAreaCreated?.(fullArea);
  }, [onAreaCreated]);

  // Handle "Find My Location" button
  const handleFindLocation = useCallback(async () => {
    if (!mapInstance) return;

    setIsLoadingLocation(true);

    try {
      const result = await getCurrentLocation();

      if (result.success && result.coordinate) {
        // Fly to user location
        mapInstance.flyTo(
          [result.coordinate.lat, result.coordinate.lng],
          16, // Zoom level
          { duration: 1.5 }
        );

        mapEvents.locationDetected(result.coordinate, result.accuracy);
      } else {
        mapEvents.locationError(result.error || 'Unknown location error');
      }
    } catch (error) {
      mapEvents.locationError('Failed to get location');
    } finally {
      setIsLoadingLocation(false);
    }
  }, [mapInstance]);

  // Event listeners για UI feedback
  useEffect(() => {
    const unsubscribeLocationError = eventBus.on('location:error', ({ error }) => {
      alert(`Σφάλμα τοποθεσίας: ${error}`);
    });

    const unsubscribeAreaCreated = eventBus.on('area:created', ({ area }) => {
      // Future: Show toast notification
    });

    return () => {
      unsubscribeLocationError();
      unsubscribeAreaCreated();
    };
  }, []);

  if (!isMapReady) {
    return (
      <Flex alignItems="center" justifyContent="center" height="64" className={className} backgroundColor="gray-100">
        <Box textAlign="center">
          <Box width="8" height="8" borderRadius="full" marginX="auto" marginBottom="2" className="animate-spin border-b-2 border-brand"></Box>
          <Text as="p" size="sm" color="gray-600">{t('loadingMap')}</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Box position="relative" width="full" height="full" className={className}>
      {/* Main Map */}
      <MapCore onMapReady={handleMapReady}>
        {/* Drawing Tools migrated to @layera/geo-drawing */}
      </MapCore>

      {/* Location Button */}
      <Box position="absolute" top={MAP_CONFIG.controls.location.top} left={MAP_CONFIG.controls.location.left} zIndex={MAP_CONFIG.controls.location.zIndex}>
        <Button
          onClick={handleFindLocation}
          disabled={!mapInstance || isLoadingLocation}
          size="sm"
          title={t('findMyLocation')}
          backgroundColor="card-info" // 🎯 SST: Location button color από design tokens
          boxShadow="elevation4"
          padding="md"
        >
          {isLoadingLocation ? (
            <Box className="animate-spin border-b-2 border-brand" borderRadius="full" height="5" width="5"></Box>
          ) : (
            <svg
              xmlns={MAP_CONFIG.icons.default.xmlns}
              height="5" width="5"
              color="gray-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </Button>
      </Box>

      {/* Guest Mode Overlay */}
      {isGuest && (
        <Box position="absolute" bottom={MAP_CONFIG.controls.layers.bottom} left={MAP_CONFIG.controls.layers.left} right={MAP_CONFIG.controls.layers.right} zIndex={MAP_CONFIG.controls.layers.zIndex}>
          <Box className="layera-guest-warning-box" borderRadius="lg" padding="3" boxShadow="lg">
            <Flex alignItems="center" gap="2">
              <svg
                xmlns={MAP_CONFIG.icons.default.xmlns}
                height="5" width="5"
                color="warning-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <Text as="p" size="sm" fontWeight="medium" color="warning-800">
                {t('guestModeNote')}
              </Text>
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MapCanvas;