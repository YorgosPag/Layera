/**
 * propertyType/types.ts - Enterprise Property Type Step Types
 */

export type PropertyType =
  | 'apartment'
  | 'office'
  | 'factory'
  | 'warehouse'
  | 'store'
  | 'land'
  | 'house'
  | 'studio';

export interface PropertyTypeStepData {
  selectedPropertyType: PropertyType;
}

export interface PropertyTypeOption {
  id: PropertyType;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}