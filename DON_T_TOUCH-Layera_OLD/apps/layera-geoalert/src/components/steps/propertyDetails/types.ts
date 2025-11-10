/**
 * propertyDetails/types.ts - Enterprise Property Details Step Types
 */

export interface PropertyDetails {
  price?: number;
  squareMeters?: number;
  rooms?: number;
  bathrooms?: number;
  floor?: number;
  yearBuilt?: number;
  hasParking?: boolean;
  hasGarden?: boolean;
  hasBalcony?: boolean;
  description?: string;
}

export interface PropertyDetailsStepData {
  propertyDetails: PropertyDetails;
  isComplete: boolean;
}

export interface PropertyDetailsFormField {
  id: keyof PropertyDetails;
  label: string;
  type: 'number' | 'text' | 'boolean' | 'textarea';
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
}