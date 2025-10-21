/**
 * GeoMapNew.tsx - Enterprise Refactored Map Component
 *
 * Αντικαθιστά το monolithic GeoMap.tsx με modular architecture.
 * Χρησιμοποιεί @layera/map-core και @layera/map-drawing packages.
 */

import React from 'react';
import { useViewportWithOverride } from '@layera/viewport';
import { MapContainer } from './map/MapContainer';
import {
  GeoMap as iPhone14ProMaxGeoMap,
  FloatingStepper as iPhone14ProMaxFloatingStepper,
  CategoryStep as iPhone14ProMaxCategoryStep
} from './device-specific/mobile/iphone-14-pro-max';
import { DesktopGeoMap } from './device-specific/DesktopGeoMap';
import { TabletGeoMap } from './device-specific/TabletGeoMap';

interface DrawnArea {
  id: string;
  type: 'polygon' | 'marker';
  coordinates: number[][];
  name: string;
  nameTemplate?: string;
  nameNumber?: number;
  area?: number;
  category: 'real_estate' | 'jobs';
  isVisible?: boolean;
  opacity?: number;
  metadata?: {
    price?: number;
    squareMeters?: number;
    rooms?: number;
    propertyType?: string;
    salary?: number;
    workingHours?: string;
    company?: string;
    jobType?: string;
  };
}

interface GeoMapProps {
  onAreaCreated?: (area: DrawnArea) => void;
  onNewEntryClick?: () => void;
}

export const GeoMap: React.FC<GeoMapProps> = ({ onAreaCreated, onNewEntryClick }) => {
  const { isDesktop, isTablet, isMobile } = useViewportWithOverride();

  // Device detection για iPhone 14 Pro Max
  const detectiPhone14ProMax = (): boolean => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return (width === 430 && height === 932) ||
           /iPhone.*14.*Pro.*Max/i.test(navigator.userAgent);
  };

  const isIPhone14ProMaxDevice = detectiPhone14ProMax();

  // iPhone 14 Pro Max specific rendering
  if (isIPhone14ProMaxDevice) {
    return (
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <iPhone14ProMaxGeoMap />
        <iPhone14ProMaxFloatingStepper
          currentStep="category"
          totalSteps={7}
          stepIndex={0}
          canGoNext={true}
          canGoPrevious={false}
        />
        <iPhone14ProMaxCategoryStep isVisible={true} />
      </div>
    );
  }

  // Desktop specific rendering
  if (isDesktop) {
    return (
      <div style={{ width: '100%', height: '600px' }}>
        <DesktopGeoMap />
        <MapContainer onAreaCreated={onAreaCreated} onNewEntryClick={onNewEntryClick} />
      </div>
    );
  }

  // Tablet specific rendering
  if (isTablet) {
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <TabletGeoMap />
        <MapContainer onAreaCreated={onAreaCreated} onNewEntryClick={onNewEntryClick} />
      </div>
    );
  }

  // Default mobile rendering
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MapContainer onAreaCreated={onAreaCreated} onNewEntryClick={onNewEntryClick} />
    </div>
  );
};