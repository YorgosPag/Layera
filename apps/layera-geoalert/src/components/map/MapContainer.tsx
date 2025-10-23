/**
 * MapContainer.tsx - Enterprise Map Orchestrator
 *
 * Ενορχηστρώνει όλα τα map services και components χρησιμοποιώντας LEGO architecture.
 * Αντικαθιστά το monolithic GeoMap.tsx με modular approach.
 */

import React, { useEffect, useRef, useState } from 'react';
import { MapProvider, useMap } from '@layera/map-core';
import { useDrawing, DrawingMode } from '@layera/geo-drawing';
import { useLayeraTranslation } from '@layera/tolgee';
import { useViewportWithOverride } from '@layera/viewport';
import { Button } from '@layera/buttons';
import { MarkerIcon, PolygonIcon, TrashIcon, PlusIcon, LocationIcon } from '../icons/LayeraIcons';
import L from 'leaflet';

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
  const { map, initializeMap, isLoading } = useMap();

  // User location marker state
  const userLocationMarkerRef = useRef<L.Marker | null>(null);

  // Create custom user location icon
  const createUserLocationIcon = () => {
    // Create a div element with just the LocationIcon
    const iconDiv = document.createElement('div');
    iconDiv.style.cssText = `
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      animation: pulse-location 2s infinite;
      transform-origin: center bottom;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    `;

    // Add the LocationIcon SVG with proper styling
    iconDiv.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#10b981" stroke="#ffffff" stroke-width="1"/>
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
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          }
          50% {
            transform: scale(1.15);
            filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.4));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
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

    console.log('✅ MapContainer: User location marker added with animation');
  };

  // Initialize map when component mounts
  useEffect(() => {
    if (mapContainerRef.current && !map) {
      initializeMap('geo-map', {
        center: [37.9755, 23.7348], // Athens
        zoom: 13
      });
    }
  }, [map, initializeMap]);

  // Event listeners για location centering
  useEffect(() => {
    const handleCenterMapToLocation = (event: CustomEvent) => {
      if (!map) {
        console.warn('🗺️ MapContainer: Map not initialized yet, cannot center to location');
        return;
      }

      const { latitude, longitude, zoom = 16, animate = true } = event.detail;

      console.log('🎯 MapContainer: Centering map to location:', { latitude, longitude, zoom });

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

        console.log('✅ MapContainer: Map centered successfully');
      } catch (error) {
        console.error('❌ MapContainer: Error centering map:', error);
      }
    };

    const handleFocusMapOnLocation = (event: CustomEvent) => {
      if (!map) {
        console.warn('🗺️ MapContainer: Map not initialized yet, cannot focus on location');
        return;
      }

      const { latitude, longitude } = event.detail;

      console.log('🔍 MapContainer: Focusing map on location:', { latitude, longitude });

      try {
        // Additional focus logic - could add marker or highlight
        map.panTo([latitude, longitude]);
        console.log('✅ MapContainer: Map focused successfully');
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
          <div style={{
            position: 'absolute',
            bottom: '140px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '8px 12px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            borderRadius: '16px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 1000,
            maxWidth: '80%',
            textAlign: 'center'
          }}>
            {currentMode === 'marker' && (
              <>
                <MarkerIcon size="sm" theme="neutral" />
                {t('clickOnMap')}
              </>
            )}
            {currentMode === 'polygon' && (
              <>
                <PolygonIcon size="sm" theme="neutral" />
                {t('clickToAddPoints')}
              </>
            )}
          </div>
        )}


        {/* Floating Action Button for New Entry */}
        {onNewEntryClick && (
          <div
            onClick={onNewEntryClick}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '56px',
              height: '56px',
              backgroundColor: '#22c55e',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
              cursor: 'pointer',
              zIndex: 10001,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
            }}
          >
            <PlusIcon size="md" theme="neutral" />
          </div>
        )}
      </div>
    );
  }

  // Desktop/Tablet layout
  return (
    <div className="desktop-map-container" style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100vh'
    }}>
      <div
        ref={mapContainerRef}
        id="geo-map"
        style={{
          position: 'absolute',
          inset: 0
        }}
      />


      {/* Areas List - ΑΦΑΙΡΕΘΗΚΕ για dark mode compatibility */}
      {false && drawnAreas.length > 0 && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{
            margin: '0 0 12px 0',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151'
          }}>
            {t('drawnAreas')} ({drawnAreas.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {drawnAreas.map(area => (
              <div
                key={area.id}
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  fontSize: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {area.type === 'marker' ?
                    <MarkerIcon size="sm" theme="neutral" /> :
                    <PolygonIcon size="sm" theme="neutral" />
                  }
                  <span style={{ fontWeight: '500' }}>{area.name}</span>
                </div>
                {area.area && (
                  <span style={{
                    color: '#6b7280',
                    backgroundColor: '#f3f4f6',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '11px'
                  }}>
                    {Math.round(area.area)} m²
                  </span>
                )}
              </div>
            ))}
          </div>
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