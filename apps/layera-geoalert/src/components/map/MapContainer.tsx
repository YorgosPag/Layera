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

interface MapContainerProps {
  onAreaCreated?: (area: any) => void;
  onNewEntryClick?: () => void;
}

const MapContent: React.FC<MapContainerProps> = ({ onAreaCreated, onNewEntryClick }) => {
  const { t } = useLayeraTranslation();
  const { isDesktop, isTablet, isMobile } = useViewportWithOverride();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Map initialization
  const { map, initializeMap, isLoading } = useMap();

  // Drawing functionality
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
    onAreaCreated
  });

  // Initialize map when component mounts
  useEffect(() => {
    if (mapContainerRef.current && !map) {
      initializeMap('geo-map', {
        center: [37.9755, 23.7348], // Athens
        zoom: 13
      });
    }
  }, [map, initializeMap]);

  const handleDrawingModeChange = (mode: DrawingMode) => {
    setDrawingMode(mode);
  };

  const handleClearAll = () => {
    clearAll();
  };

  // Render device-specific UI
  if (isMobile) {
    return (
      <div className="mobile-map-container">
        <div
          ref={mapContainerRef}
          id="geo-map"
          style={{
            width: '100%',
            height: '100vh',
            position: 'relative'
          }}
        />

        {/* Mobile Drawing Controls */}
        <div className="mobile-drawing-controls">
          <button
            onClick={() => handleDrawingModeChange('marker')}
            className={currentMode === 'marker' ? 'active' : ''}
          >
            {t('addMarker')}
          </button>
          <button
            onClick={() => handleDrawingModeChange('polygon')}
            className={currentMode === 'polygon' ? 'active' : ''}
          >
            {t('drawArea')}
          </button>
          <button onClick={handleClearAll}>
            {t('clearAll')}
          </button>
        </div>
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
      <div className="desktop-drawing-controls">
        <button
          onClick={() => handleDrawingModeChange('marker')}
          className={currentMode === 'marker' ? 'active' : ''}
        >
          {t('addMarker')}
        </button>
        <button
          onClick={() => handleDrawingModeChange('polygon')}
          className={currentMode === 'polygon' ? 'active' : ''}
        >
          {t('drawArea')}
        </button>
        <button onClick={handleClearAll}>
          {t('clearAll')}
        </button>
      </div>

      {/* Areas List */}
      <div className="areas-list">
        <h3>{t('drawnAreas')}</h3>
        {drawnAreas.map(area => (
          <div key={area.id} className="area-item">
            <span>{area.name}</span>
            <span>{area.type}</span>
            {area.area && <span>{Math.round(area.area)} m²</span>}
          </div>
        ))}
      </div>
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