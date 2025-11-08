import React from "react";
/**
 * availability/types.ts - Enterprise Availability Step Types
 */

export type AvailabilityType = 'now' | 'future';

export interface AvailabilityStepData {
  selectedAvailability: AvailabilityType;
}

export interface AvailabilityOption {
  id: AvailabilityType;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}