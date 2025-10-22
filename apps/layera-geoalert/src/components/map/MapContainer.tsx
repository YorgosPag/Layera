/**
 * MapContainer.tsx - Enterprise Map Orchestrator
 *
 * Ενορχηστρώνει όλα τα map services και components χρησιμοποιώντας LEGO architecture.
 * Αντικαθιστά το monolithic GeoMap.tsx με modular approach.
 */

import React, { useEffect, useRef } from 'react';
import { MapProvider, useMap } from '@layera/map-core';
import { useDrawing, DrawingMode } from '@layera/map-drawing';
import { useLayeraTranslation } from '@layera/tolgee';
import { useViewportWithOverride } from '@layera/viewport';
import { Button } from '@layera/buttons';
import { MarkerIcon, PolygonIcon, TrashIcon, PlusIcon } from '../icons/LayeraIcons';

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

  // Initialize map when component mounts
  useEffect(() => {
    if (mapContainerRef.current && !map) {
      initializeMap('geo-map', {
        center: [37.9755, 23.7348], // Athens
        zoom: 13
      });
    }
  }, [map, initializeMap]);

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
  console.log('🗺️ MapContainer - isMobile:', isMobile, 'hideDrawingControls:', hideDrawingControls);

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

        {/* Mobile Drawing Controls - ΚΡΥΜΜΕΝΑ για iPhone 14 Pro Max (όπως στο OLD_GeoMap.tsx) */}
        {!(hideDrawingControls || isIPhone14ProMaxDevice) && (
          <div style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            padding: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000
          }}>
            <Button
              onClick={() => handleDrawingModeChange('marker')}
              variant={currentMode === 'marker' ? 'success' : 'secondary'}
              size="xs"
              icon={<MarkerIcon size="sm" theme="neutral" />}
            >
              {t('marker')}
            </Button>
            <Button
              onClick={() => handleDrawingModeChange('polygon')}
              variant={currentMode === 'polygon' ? 'primary' : 'secondary'}
              size="xs"
              icon={<PolygonIcon size="sm" theme="neutral" />}
            >
              {t('polygon')}
            </Button>
            <Button
              onClick={handleClearAll}
              variant="danger"
              size="xs"
              icon={<TrashIcon size="sm" theme="neutral" />}
            >
              {t('clearAll')}
            </Button>
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
    <div className="desktop-map-container">
      <div
        ref={mapContainerRef}
        id="geo-map"
        style={{
          width: '100%',
          height: '600px',
          position: 'relative'
        }}
      />

      {/* Desktop Drawing Controls */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        marginTop: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <Button
          onClick={() => handleDrawingModeChange('marker')}
          variant={currentMode === 'marker' ? 'success' : 'secondary'}
          size="sm"
          icon={<MarkerIcon size="sm" theme="neutral" />}
        >
          {t('marker')}
        </Button>
        <Button
          onClick={() => handleDrawingModeChange('polygon')}
          variant={currentMode === 'polygon' ? 'primary' : 'secondary'}
          size="sm"
          icon={<PolygonIcon size="sm" theme="neutral" />}
        >
          {t('polygon')}
        </Button>
        <Button
          onClick={handleClearAll}
          variant="danger"
          size="sm"
          icon={<TrashIcon size="sm" theme="neutral" />}
        >
          {t('clearAll')}
        </Button>
      </div>

      {/* Areas List */}
      {drawnAreas.length > 0 && (
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