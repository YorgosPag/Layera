/**
 * GeoMapNew.tsx - Simplified Map Component
 *
 * Απλοποιημένο map component για OpenStreetMap χάρτη
 * Χρησιμοποιεί μόνο τα διαθέσιμα βασικά packages
 */

import React from 'react';
import { MapContainer } from '@layera/map-core';
import { Box } from '@layera/layout';

interface GeoMapProps {
  className?: string;
}

export const GeoMapNew: React.FC<GeoMapProps> = ({ className = '' }) => {
  return (
    <Box className={className}>
      <MapContainer />
    </Box>
  );
};

export default GeoMapNew;