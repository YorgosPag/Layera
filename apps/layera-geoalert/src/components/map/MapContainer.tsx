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
import { useDrawing, DrawingMode } from '@layera/geo-drawing';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { Flex, FlexCenter } from '@layera/layout';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { useLayeraTranslation } from '@layera/tolgee';
import { useViewportWithOverride } from '@layera/viewport';
import { Button } from '@layera/buttons';
import { Text } from '@layera/typography';
import { MarkerIcon, PolygonIcon, TrashIcon, PlusIcon, LocationIcon } from '@layera/icons';
import { BaseCard } from '@layera/cards';
import L from 'leaflet';

// Extend window object for Leaflet icons fix
declare global {
  interface Window {
    leafletIconsFixed?: boolean;
  }
}

interface MapContainerProps {
  onAreaCreated?: (area: any) => void;
  onNewEntryClick?: () => void;
  hideDrawingControls?: boolean;
  isIPhone14ProMaxDevice?: boolean;
}

const MapContent: React.FC<MapContainerProps> = ({ onAreaCreated, onNewEntryClick, hideDrawingControls = false, isIPhone14ProMaxDevice = false }) => {
  const { t } = useLayeraTranslation();
  const { isDesktop, isTablet, isMobile } = useViewportWithOverride();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Map initialization
  const mapContext = useMap();
  const { map, initializeMap, isLoading } = mapContext;

  // Debug MapProvider context (run once)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🗺️ MapProvider context available:', {
        hasContext: !!mapContext,
        hasInitializeMap: !!initializeMap,
        initialLoadingState: isLoading
      });
    }
  }, []); // Run only once

  // User location marker state
  const userLocationMarkerRef = useRef<L.Marker | null>(null);

  // Create custom user location icon
  const createUserLocationIcon = () => {
    // Create a div element with just the LocationIcon
    const iconDiv = document.createElement('div');
    iconDiv.style.cssText = `
      width: ${SPACING_SCALE.XL}px;
      height: ${SPACING_SCALE.XL}px;
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

      // Wait for Leaflet CSS to be loaded and container to have dimensions
      const initMap = () => {
        if (!mapContainerRef.current) {
          initializingRef.current = false;
          return;
        }

        const hasValidSize = mapContainerRef.current.offsetWidth > 0 && mapContainerRef.current.offsetHeight > 0;

        if (process.env.NODE_ENV === 'development') {
          console.log('🚀 Map init attempt - Container size:', {
            width: mapContainerRef.current.offsetWidth,
            height: mapContainerRef.current.offsetHeight,
            hasValidSize
          });
        }

        if (!hasValidSize) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('⚠️ Container has zero dimensions, retrying...');
          }
          setTimeout(initMap, 100);
          return;
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('🚀 Starting map initialization...');
          console.log('🔧 initializeMap function available:', typeof initializeMap);
          console.log('🔧 initializeMap function source:', initializeMap.toString().substring(0, 200));
        }

        if (!initializeMap) {
          console.error('❌ initializeMap function not available');
          initializingRef.current = false;
          return;
        }

        try {
          if (process.env.NODE_ENV === 'development') {
            console.log('🚀 DIRECT LEAFLET: Bypassing mock initializeMap, creating real map...');
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

          // Create the map directly with Leaflet
          const mapInstance = L.map('geo-map', {
            zoomControl: false,
          }).setView([37.9755, 23.7348], 13);

          // Add tile layer
          const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
            minZoom: 8
          });

          tileLayer.addTo(mapInstance);

          // Add debugging
          if (process.env.NODE_ENV === 'development') {
            console.log('🗺️ DIRECT LEAFLET: Map instance created:', !!mapInstance);
            console.log('🗺️ DIRECT LEAFLET: Map container ID:', mapInstance.getContainer().id);
            console.log('🗺️ DIRECT LEAFLET: Map center:', mapInstance.getCenter());
            console.log('🗺️ DIRECT LEAFLET: Map zoom:', mapInstance.getZoom());
          }

          // Force resize and tile loading
          setTimeout(() => {
            mapInstance.invalidateSize();
            if (process.env.NODE_ENV === 'development') {
              console.log('✅ DIRECT LEAFLET: Map initialized successfully! Size:', mapInstance.getSize());
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

  // Drawing functionality - pass map instance directly
  const {
    setDrawingMode,
    currentMode,
    drawnAreas,
    clearAll
  } = useDrawing({
    config: {
      enablePolygon: true,
      enableMarker: true,
      defaultCategory: 'real_estate'
    },
    onAreaCreated,
    map // Pass map instance directly
  });

  const handleDrawingModeChange = (mode: DrawingMode) => {
    setDrawingMode(mode);
  };

  const handleClearAll = () => {
    clearAll();
  };

  // Render device-specific UI
  // Debug log removed to prevent console flooding

  if (isMobile) {
    return (
      <div className="mobile-map-container">
        {/*
          ΚΡΙΣΙΜΗ ΣΗΜΕΙΩΣΗ: ΜΗΝ ΑΛΛΑΞΕΙΣ ΣΕ BOX COMPONENT!
          Το Leaflet map engine χρειάζεται native DOM elements με refs.
          Το @layera/layout Box component δεν είναι συμβατό με maps.
          Αποτέλεσμα: Ο χάρτης εξαφανίζεται αν χρησιμοποιηθεί Box.
          ΠΑΝΤΟΤΕ χρησιμοποίησε <div> για map containers!
        */}
        <div
          ref={mapContainerRef}
          id="geo-map"
          style={{
            position: 'absolute',
            inset: 0
          }}
        />

        {/* Drawing Status Indicator */}
        {currentMode !== 'none' && (
          <BaseCard
            variant="overlay"
            padding="sm"
            style={{
              position: 'absolute',
              bottom: `${SPACING_SCALE.XXXL * 3 + SPACING_SCALE.LG}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              maxWidth: '80%'
            }}>
            <FlexCenter gap="xs">
            {currentMode === 'marker' && (
              <>
                <MarkerIcon size="sm" theme="neutral" />
                <Text size="xs" color="white">
                  Κάντε κλικ στον χάρτη
                </Text>
              </>
            )}
            {currentMode === 'polygon' && (
              <>
                <PolygonIcon size="sm" theme="neutral" />
                <Text size="xs" color="white">
                  Κάντε κλικ για προσθήκη σημείων
                </Text>
              </>
            )}
            </FlexCenter>
          </BaseCard>
        )}


        {/* Floating Action Button for New Entry */}
        {onNewEntryClick && (
          <FlexCenter
            onClick={onNewEntryClick}
            style={{
              position: 'absolute',
              bottom: `${SPACING_SCALE.LG}px`,
              right: `${SPACING_SCALE.LG}px`,
              width: `${SPACING_SCALE.XXXL}px`,
              height: `${SPACING_SCALE.XXXL}px`,
              backgroundColor: 'var(--color-semantic-success-bg)',
              borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
              boxShadow: BOX_SHADOW_SCALE.shadowSuccess,
              cursor: 'pointer',
              zIndex: 10001,
            }}
          >
            <PlusIcon size="md" theme="neutral" />
          </FlexCenter>
        )}
      </div>
    );
  }

  // Desktop/Tablet layout
  return (
    <div
      className="desktop-map-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100vh'
      }}>
      {/*
        ΚΡΙΣΙΜΗ ΣΗΜΕΙΩΣΗ: ΜΗΝ ΑΛΛΑΞΕΙΣ ΣΕ BOX COMPONENT!
        Το Leaflet map engine χρειάζεται native DOM elements με refs.
        Το @layera/layout Box component δεν είναι συμβατό με maps.
        Αποτέλεσμα: Ο χάρτης εξαφανίζεται αν χρησιμοποιηθεί Box.
        ΠΑΝΤΟΤΕ χρησιμοποίησε <div> για map containers!
      */}
      <div
        ref={mapContainerRef}
        id="geo-map"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />


      {/* Areas List - ΑΦΑΙΡΕΘΗΚΕ για dark mode compatibility */}
      {false && drawnAreas.length > 0 && (
        <div style={{
          marginTop: `${SPACING_SCALE.MD}px`,
          padding: `${SPACING_SCALE.MD}px`,
          backgroundColor: 'var(--color-bg-surface)',
          borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
          boxShadow: BOX_SHADOW_SCALE.cardSubtle
        }}>
          <Text size="sm" weight="bold" style={{
            margin: `0 0 ${SPACING_SCALE.SM}px 0`,
            color: 'var(--color-text-primary)',
            display: 'block'
          }}>
            Σχεδιασμένες Περιοχές ({drawnAreas.length})
          </Text>
          <Flex direction="column" style={{ gap: `${SPACING_SCALE.SM}px` }}>
            {drawnAreas.map(area => (
              <Flex
                key={area.id}
                justify="space-between"
                align="center"
                style={{
                  padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.SM}px`,
                  backgroundColor: 'white',
                  borderRadius: `${BORDER_RADIUS_SCALE.INPUT}px`,
                  border: '1px solid var(--color-border-default)',
                  // fontSize handled by Text component
                }}
              >
                <Flex align="center" gap="xs">
                  {area.type === 'marker' ?
                    <MarkerIcon size="sm" theme="neutral" /> :
                    <PolygonIcon size="sm" theme="neutral" />
                  }
                  <Text size="xs" weight="medium">{area.name}</Text>
                </Flex>
                {area.area && (
                  <Text size="xs" style={{
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-bg-surface)',
                    padding: `${SPACING_SCALE.XS - 2}px ${SPACING_SCALE.XS + 2}px`,
                    borderRadius: `${BORDER_RADIUS_SCALE.XS}px`,
                    display: 'inline-block'
                  }}>
                    {Math.round(area.area)} m²
                  </Text>
                )}
              </Flex>
            ))}
          </Flex>
        </div>
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