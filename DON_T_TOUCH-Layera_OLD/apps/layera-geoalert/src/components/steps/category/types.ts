/**
 * types.ts - Category Step Domain Types
 *
 * Category-specific types και interfaces
 */

import type { CategoryType } from '../types';

export interface CategoryStepData {
  selectedCategory: CategoryType;
  timestamp: number;
}

export interface CategoryCardData {
  id: string;
  categoryType: CategoryType;
  title: string;
  description?: string;
  isRecommended?: boolean;
}

export type CategorySelectionEvent = {
  category: CategoryType;
  timestamp: number;
  source: 'user_click' | 'auto_selection' | 'navigation';
};