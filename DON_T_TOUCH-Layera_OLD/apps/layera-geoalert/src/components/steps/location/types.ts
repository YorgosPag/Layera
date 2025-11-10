/**
 * location/types.ts - Enterprise Location Step Types
 *
 * 🏗️ EXTENDED για LEGO Geocoding Integration
 */

import type { GeocodeResult } from '@layera/geocoding';

export type LocationMethodType = 'upload' | 'drawing' | 'search';

export interface LocationDetails {
  method: LocationMethodType;
  uploadedFile?: File;
  fileType?: 'image' | 'pdf' | 'cad' | 'unknown';
  drawingData?: unknown;
  // LEGO Geocoding Integration
  searchResult?: GeocodeResult;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  address?: string;
}

export interface LocationStepData {
  locationDetails: LocationDetails;
  isComplete: boolean;
}