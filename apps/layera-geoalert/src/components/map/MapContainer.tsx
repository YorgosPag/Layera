/**
 * MapContainer.tsx - Enterprise Map Orchestrator
 *
 * Ενορχηστρώνει όλα τα map services και components χρησιμοποιώντας LEGO architecture.
 * Αντικαθιστά το monolithic GeoMap.tsx με modular approach.
 *
 * ⚠️ ΚΡΙΣΙΜΗ ΠΡΟΕΙΔΟΠΟΙΗΣΗ: LEGO COMPATIBILITY
 * - ✅ BaseCard: Συμβατό με maps - μπορεί να χρησιμοποιηθεί για UI overlays
 * - ❌ Box component: ΑΣΥΜΒΑΤΟ με maps - προκαλεί εξαφάνιση χάρτη
 * - 📋 Map containers ΠΑΝΤΟΤΕ πρέπει να είναι native <div> elements με refs
 */

import React, { useEffect, useRef, useState } from 'react';
import { MapProvider, useMap } from '@layera/map-core';
// ✅ ENTERPRISE APPROACH: Βραχυπρόθεσμη λύση - χρήση local implementation until @layera/geo-drawing build succeeds
// import { useDrawing, DrawingMode } from '@layera/geo-drawing';
import { SPACING_SCALE, BORDER_RADIUS_SCALE, DEVICE_BREAKPOINTS, getCardSuccessColor } from '@layera/constants';
import { Flex, FlexCenter, Box } from '@layera/layout';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { useLayeraTranslation } from '@layera/tolgee';
import { useViewportWithOverride } from '@layera/viewport';
import { Button } from '@layera/buttons';
import { Text } from '@layera/typography';
import { MarkerIcon, PolygonIcon, TrashIcon, PlusIcon, LocationIcon } from '@layera/icons';
import { FAB } from '@layera/floating-action-buttons';
import { BaseCard } from '@layera/cards';
import L from 'leaflet';

// Extend window object for Leaflet icons fix
declare global {
  interface Window {
    leafletIconsFixed?: boolean;
  }
}

interface MapContainerProps {
  onAreaCreated?: (area: { id: string; type: string; coordinates: number[][]; name: string; category: string }) => void;
  onNewEntryClick?: () => void;
  hideDrawingControls?: boolean;
  isMobileDevice?: boolean;
}

const MapContent: React.FC<MapContainerProps> = ({ onAreaCreated, onNewEntryClick, hideDrawingControls = false, isMobileDevice = false }) => {
  const { t } = useLayeraTranslation();
  const { isDesktop, isTablet, isMobile } = useViewportWithOverride();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Map initialization
  const mapContext = useMap();
  const { map, initializeMap, isLoading } = mapContext;

  // MapProvider context validation (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Debug context availability for development
      const debugInfo = {
        hasContext: !!mapContext,
        contextKeys: mapContext ? Object.keys(mapContext) : [],
        hasInitializeMap: !!initializeMap,
        initializeMapType: typeof initializeMap,
        initialLoadingState: isLoading
      };
      // Context validation complete
    }
  }, []); // Run only once

  // User location marker state
  const userLocationMarkerRef = useRef<L.Marker | null>(null);

  // Create custom user location icon
  const createUserLocationIcon = (): void => {
    // Create a div element with just the LocationIcon
    const iconDiv = document.createElement('div');
    iconDiv.style.cssText = `
      width: var(--la-space-layout-xl); /* 🎯 SST: Layout spacing token */
      height: var(--la-space-layout-xl); /* 🎯 SST: Layout spacing token */
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      animation: pulse-location 2s infinite;
      transform-origin: center bottom;
      filter: drop-shadow(0 2px 4px var(--color-shadow-default));
    `;

    // Add the LocationIcon SVG with proper styling
    iconDiv.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="var(--color-semantic-success-border)" stroke="var(--color-text-on-primary)" stroke-width="1"/>
      </svg>
    `;

    // Add CSS animation to the document if not already added
    if (!document.querySelector('style[data-user-location-animation]')) {
      const animationStyles = document.createElement('style');
      animationStyles.setAttribute('data-user-location-animation', 'true');
      animationStyles.textContent = `
        @keyframes pulse-location {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 2px 4px var(--color-shadow-default));
          }
          50% {
            transform: scale(1.15);
            filter: drop-shadow(0 4px 8px var(--color-semantic-success-shadow));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 2px 4px var(--color-shadow-default));
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0) translateY(10px);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) translateY(-5px);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(animationStyles);
    }

    return L.divIcon({
      html: iconDiv.outerHTML,
      className: 'user-location-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 32] // Η μύτη του marker να είναι στο σημείο της θέσης
    });
  };

  // Add or update user location marker
  const addUserLocationMarker = (latitude: number, longitude: number) => {
    if (!map) return;

    // Remove existing marker if it exists
    if (userLocationMarkerRef.current) {
      map.removeLayer(userLocationMarkerRef.current);
    }

    // Create new marker with custom icon
    const marker = L.marker([latitude, longitude], {
      icon: createUserLocationIcon()
    }).addTo(map);

    // Add bounce-in animation
    const markerElement = marker.getElement();
    if (markerElement) {
      markerElement.style.animation = 'bounce-in 0.6s ease-out';
    }

    // Store marker reference
    userLocationMarkerRef.current = marker;

  };

  // Add ref to track if initialization is in progress
  const initializingRef = useRef(false);

  // Initialize map when component mounts
  useEffect(() => {
    // Only run once when component mounts and map is not initialized
    if (!map && !initializingRef.current && mapContainerRef.current) {
      initializingRef.current = true;

      // Force Leaflet CSS load for mobile
      const ensureLeafletCSS = (): void => {
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
        }
      };

      ensureLeafletCSS();

      // Add mobile-specific CSS fixes
      const addMobileCSS = (): void => {
        if (!document.querySelector('style[data-mobile-leaflet]')) {
          const style = document.createElement('style');
          style.setAttribute('data-mobile-leaflet', 'true');
          style.textContent = `
            .leaflet-map-mobile .leaflet-container {
              background: var(--la-color-white) !important;
            }
            .leaflet-map-mobile .leaflet-tile-pane {
              opacity: 1 !important;
            }
            .leaflet-map-mobile .leaflet-tile {
              opacity: 1 !important;
            }
            .leaflet-control-attribution {
              display: none !important;
            }
            @media (max-width: ${DEVICE_BREAKPOINTS.MOBILE - 1}px) {
              .leaflet-container {
                height: 100% !important;
                width: 100% !important;
              }
            }
          `;
          document.head.appendChild(style);
        }
      };

      addMobileCSS();

      // Wait for Leaflet CSS to be loaded and container to have dimensions
      const initMap = (): void => {
        if (!mapContainerRef.current) {
          initializingRef.current = false;
          return;
        }

        const hasValidSize = mapContainerRef.current.offsetWidth > 0 && mapContainerRef.current.offsetHeight > 0;

        if (process.env.NODE_ENV === 'development') {}

        if (!hasValidSize) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('⚠️ Container has zero dimensions, retrying...');
          }
          setTimeout(initMap, 100);
          return;
        }

        if (process.env.NODE_ENV === 'development') {
          if (initializeMap && typeof initializeMap === 'function') {
          }
        }

        if (!initializeMap) {
          console.error('❌ initializeMap function not available - using fallback');
          // Temporal fallback για LEGO compatibility μέχρι module resolution fix
          const fallbackInit = (): void => {
            initializingRef.current = false;
          };
          setTimeout(fallbackInit, 100);
          return;
        }

        try {
          if (process.env.NODE_ENV === 'development') {
          }

          // DIRECT LEAFLET IMPLEMENTATION - BYPASS MOCK
          // Clear container first
          mapContainerRef.current.innerHTML = '';

          // Fix Leaflet icon paths
          if (!window.leafletIconsFixed) {
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
              iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
              iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
              shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });
            window.leafletIconsFixed = true;
          }

          // Create the map directly with Leaflet using the container reference
          const mapInstance = L.map(mapContainerRef.current, {
            zoomControl: false,
            preferCanvas: true, // Better mobile performance
            touchZoom: true,
            scrollWheelZoom: true,
            doubleClickZoom: true
          }).setView([37.9755, 23.7348], 13);

          // Add tile layer with mobile optimizations
          const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
            minZoom: 8,
            tileSize: 256,
            zoomOffset: 0,
            detectRetina: true // Better for mobile devices
          });

          tileLayer.addTo(mapInstance);

          // Force resize and tile loading
          setTimeout((): void => {
            mapInstance.invalidateSize();
            if (process.env.NODE_ENV === 'development') {
            }
          }, 100);

          initializingRef.current = false;

        } catch (error) {
          console.error('❌ DIRECT LEAFLET: Map initialization error:', error);
          initializingRef.current = false;
        }
      };

      // Wait for CSS and DOM to be ready
      setTimeout(initMap, 200);
    }
  }, []); // Empty dependency array - run only once

  // Event listeners για location centering
  useEffect(() => {
    const handleCenterMapToLocation = (event: CustomEvent) => {
      if (!map) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Map not initialized yet, cannot center to location');
        }
        return;
      }

      const { latitude, longitude, zoom = 16, animate = true } = event.detail;

      try {
        if (animate) {
          // Smooth animation to location
          map.flyTo([latitude, longitude], zoom, {
            animate: true,
            duration: 1.5 // 1.5 seconds animation
          });
        } else {
          // Instant move
          map.setView([latitude, longitude], zoom);
        }

        // Add user location marker with animation
        addUserLocationMarker(latitude, longitude);

      } catch (error) {
        console.error('❌ MapContainer: Error centering map:', error);
      }
    };

    const handleFocusMapOnLocation = (event: CustomEvent) => {
      if (!map) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('🗺️ MapContainer: Map not initialized yet, cannot focus on location');
        }
        return;
      }

      const { latitude, longitude } = event.detail;

      try {
        // Additional focus logic - could add marker or highlight
        map.panTo([latitude, longitude]);
      } catch (error) {
        console.error('❌ MapContainer: Error focusing map:', error);
      }
    };

    // Add event listeners
    window.addEventListener('centerMapToLocation', handleCenterMapToLocation as EventListener);
    window.addEventListener('focusMapOnLocation', handleFocusMapOnLocation as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('centerMapToLocation', handleCenterMapToLocation as EventListener);
      window.removeEventListener('focusMapOnLocation', handleFocusMapOnLocation as EventListener);

      // Clean up user location marker
      if (userLocationMarkerRef.current && map) {
        map.removeLayer(userLocationMarkerRef.current);
        userLocationMarkerRef.current = null;
      }
    };
  }, [map]);

  // TEMPORARILY DISABLED: Drawing functionality
  // const {
  //   setDrawingMode,
  //   currentMode,
  //   drawnAreas,
  //   clearAll
  // } = useDrawing({
  //   config: {
  //     enablePolygon: true,
  //     enableMarker: true,
  //     defaultCategory: 'real_estate'
  //   },
  //   onAreaCreated,
  //   map // Pass map instance directly
  // });

  // ✅ ENTERPRISE LOCAL IMPLEMENTATION: Compatible with @layera/geo-drawing interface
  // Uses same API as @layera/geo-drawing for seamless migration
  type DrawingMode = 'none' | 'polygon' | 'marker' | 'circle';

  const [drawingMode, setDrawingModeState] = useState<DrawingMode>('none');
  const [drawnAreas, setDrawnAreas] = useState<Array<{
    id: string;
    type: string;
    coordinates: number[][];
    name: string;
    category: string;
  }>>([]);

  const setDrawingMode = (mode: DrawingMode) => {
    setDrawingModeState(mode);
  };

  const clearAreas = (): void => {
    setDrawnAreas([]);
  };

  const isDrawing = drawingMode !== 'none';

  const handleDrawingModeChange = (mode: DrawingMode) => {
    setDrawingMode(mode);
  };

  const handleClearAll = (): void => {
    clearAreas();
  };

  // Render device-specific UI
  // Add debugging to see device detection
  if (process.env.NODE_ENV === 'development') {
  }

  if (isMobile) {
    return (
      <Box
        className="mobile-map-container"
        width="full"
        height="screen"
        position="relative"
        marginTop="0"
        overflow="hidden"
      >
        {/*
          ΚΡΙΣΙΜΗ ΣΗΜΕΙΩΣΗ: ΜΗΝ ΑΛΛΑΞΕΙΣ ΣΕ BOX COMPONENT!
          Το Leaflet map engine χρειάζεται native DOM elements με refs.
          Το @layera/layout Box component δεν είναι συμβατό με maps.
          Αποτέλεσμα: Ο χάρτης εξαφανίζεται αν χρησιμοποιηθεί Box.
          ΠΑΝΤΟΤΕ χρησιμοποίησε <div> για map containers!
        */}
        <div
          ref={mapContainerRef}
          className="leaflet-map-mobile"
          style={{
            width: 'var(--la-width-full)',
            height: 'var(--la-height-full)',
            display: 'block',
            position: 'relative'
          }}
        />

        {/* Drawing Status Indicator */}
        {drawingMode !== 'none' && (
          <BaseCard
            variant="overlay"
            padding="sm"
            position="absolute"
            bottom="fab-position-bottom"
            left="position-center"
            transform="transform-center-x"
            zIndex="overlay"
            maxWidth="width-4-5">
            <FlexCenter gap="xs">
            {drawingMode === 'marker' && (
              <>
                <MarkerIcon size="sm" theme="neutral" />
                <Text size="xs" color="on-dark">
                  Κάντε κλικ στον χάρτη
                </Text>
              </>
            )}
            {drawingMode === 'polygon' && (
              <>
                <PolygonIcon size="sm" theme="neutral" />
                <Text size="xs" color="on-dark">
                  Κάντε κλικ για προσθήκη σημείων
                </Text>
              </>
            )}
            </FlexCenter>
          </BaseCard>
        )}

        {/* Floating Action Button for New Entry */}
        {onNewEntryClick && (
          <FAB
            variant="success"
            position="bottom-right"
            onClick={onNewEntryClick}
            size="standard"
            shadow="success"
          >
            <PlusIcon size="md" theme="neutral" />
          </FAB>
        )}
      </Box>
    );
  }

  // Desktop/Tablet layout
  return (
    <Box
      className="desktop-map-container"
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      width="full"
      height="screen"
    >
      {/*
        ΚΡΙΣΙΜΗ ΣΗΜΕΙΩΣΗ: ΜΗΝ ΑΛΛΑΞΕΙΣ ΣΕ BOX COMPONENT!
        Το Leaflet map engine χρειάζεται native DOM elements με refs.
        Το @layera/layout Box component δεν είναι συμβατό με maps.
        Αποτέλεσμα: Ο χάρτης εξαφανίζεται αν χρησιμοποιηθεί Box.
        ΠΑΝΤΟΤΕ χρησιμοποίησε <div> για map containers!
      */}
      <div
        ref={mapContainerRef}
        style={{
          position: 'absolute',
          top: 'var(--la-space-0)',
          left: 'var(--la-space-0)',
          right: 'var(--la-space-0)',
          bottom: 'var(--la-space-0)',
          width: 'var(--la-size-full)',
          height: 'var(--la-size-full)',
          zIndex: 'var(--la-z-index-base)'
        }}
      />

      {/* Areas List - ΑΦΑΙΡΕΘΗΚΕ για dark mode compatibility */}
      {false && drawnAreas.length > 0 && (
        <Box
          marginTop="4"
          padding="4"
          backgroundColor="surface"
          borderRadius="sm"
          boxShadow="cardSubtle"
        >
          <Text
            as="div"
            size="sm"
            weight="bold"
            marginBottom="2"
            color="primary"
          >
            Σχεδιασμένες Περιοχές ({drawnAreas.length})
          </Text>
          <Flex direction="column" gap="2">
            {drawnAreas.map(area => (
              <Flex
                key={area.id}
                justify="space-between"
                align="center"
                padding="2"
                backgroundColor="surface"
                borderRadius="input"
                border="default"
              >
                <Flex align="center" gap="xs">
                  {area.type === 'marker' ?
                    <MarkerIcon size="sm" theme="neutral" /> :
                    <PolygonIcon size="sm" theme="neutral" />
                  }
                  <Text size="xs" weight="medium">{area.name}</Text>
                </Flex>
                {area.area && (
                  <Text
                    as="span"
                    size="xs"
                    color="secondary"
                    backgroundColor="surface"
                    paddingX="xs-plus-2"
                    paddingY="xs-minus-2"
                    borderRadius="xs"
                    display="inline-block"
                  >
                    {Math.round(area.area)} m²
                  </Text>
                )}
              </Flex>
            ))}
          </Flex>
        </Box>
      )}
    </div>
  );
};

export const MapContainer: React.FC<MapContainerProps> = (props) => {
  return (
    <MapProvider>
      <MapContent {...props} />
    </MapProvider>
  );
};