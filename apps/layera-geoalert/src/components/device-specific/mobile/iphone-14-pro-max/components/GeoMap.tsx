/**
 * GeoMap.tsx - ΜΟΝΟ για iPhone 14 Pro Max
 * Ειδικό αρχείο για iPhone 14 Pro Max με βελτιστοποιημένα UI elements
 *
 * Προδιαγραφές iPhone 14 Pro Max:
 * - Οθόνη: 6.7 inch (1290 x 2796 pixels)
 * - Αναλογία: 19.5:9
 * - Dynamic Island
 * - Safe Area considerations
 */

import React, { useEffect } from 'react';
import { MapContainer } from '../../../../map/MapContainer';

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

export interface GeoMapProps {
  onAreaCreated?: (area: DrawnArea) => void;
  onNewEntryClick?: () => void;
  isIPhone14ProMaxDevice?: boolean;
}

/**
 * iPhone 14 Pro Max-specific UI elements για το GeoMap
 * Βελτιστοποιημένο για την ειδική οθόνη και χαρακτηριστικά του iPhone 14 Pro Max
 */
export const GeoMap: React.FC<GeoMapProps> = ({ onAreaCreated, onNewEntryClick, isIPhone14ProMaxDevice = true }) => {
  // Debug info removed to prevent console flooding

  // Minimal setup - καμία global CSS modification
  useEffect(() => {
    // Setup complete - using MapContainer
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative'
    }}>
      <MapContainer
        onAreaCreated={onAreaCreated}
        onNewEntryClick={onNewEntryClick}
        hideDrawingControls={true}
        isIPhone14ProMaxDevice={isIPhone14ProMaxDevice}
      />
    </div>
  );
};