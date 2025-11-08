import React from "react";
/**
 * areaMethod/types.ts - Enterprise Area Method Step Types
 */

export type AreaMethodType = 'manual' | 'map' | 'floorplan' | 'auto';

export interface AreaMethodStepData {
  selectedMethod: AreaMethodType;
  calculatedArea?: number;
  manualArea?: number;
  measurementPoints?: Array<{lat: number, lng: number}>;
  osmBuildingId?: string;
  floorplanFile?: File;
}

export interface AreaMethodOption {
  id: AreaMethodType;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isRecommended?: boolean;
}