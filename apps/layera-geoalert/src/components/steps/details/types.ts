/**
 * types.ts - Details Step Domain Types
 *
 * Details-specific types και interfaces
 */

import type { DetailsType } from '../types';

export interface DetailsStepData {
  selectedDetails: DetailsType;
  selectedCategory: string;
  selectedIntent: string;
  selectedLocation: string;
  timestamp: number;
}

export interface DetailsCardData {
  id: string;
  detailsType: DetailsType;
  title: string;
  description?: string;
  categoryContext?: string;
  intentContext?: string;
  locationContext?: string;
  isRecommended?: boolean;
  formFields?: DetailsFormField[];
}

export interface DetailsFormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export type DetailsSelectionEvent = {
  details: DetailsType;
  category: string;
  intent: string;
  location: string;
  timestamp: number;
  source: 'user_click' | 'auto_selection' | 'navigation';
};