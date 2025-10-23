/**
 * types.ts - Location Step Domain Types
 *
 * Location-specific types και interfaces
 */

import type { LocationType } from '../types';

export interface LocationStepData {
  selectedLocation: LocationType;
  selectedCategory: string;
  selectedIntent: string;
  timestamp: number;
}

export interface LocationCardData {
  id: string;
  locationType: LocationType;
  title: string;
  description?: string;
  categoryContext?: string;
  intentContext?: string;
  isRecommended?: boolean;
}

export type LocationSelectionEvent = {
  location: LocationType;
  category: string;
  intent: string;
  timestamp: number;
  source: 'user_click' | 'auto_selection' | 'navigation';
};