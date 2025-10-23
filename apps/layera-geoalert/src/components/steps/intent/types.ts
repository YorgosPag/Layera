/**
 * types.ts - Intent Step Domain Types
 *
 * Intent-specific types και interfaces
 */

import type { IntentType } from '../types';

export interface IntentStepData {
  selectedIntent: IntentType;
  selectedCategory: string;
  timestamp: number;
}

export interface IntentCardData {
  id: string;
  intentType: IntentType;
  title: string;
  description?: string;
  categoryContext?: string;
  isRecommended?: boolean;
}

export type IntentSelectionEvent = {
  intent: IntentType;
  category: string;
  timestamp: number;
  source: 'user_click' | 'auto_selection' | 'navigation';
};