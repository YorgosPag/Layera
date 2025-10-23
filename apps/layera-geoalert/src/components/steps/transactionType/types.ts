/**
 * types.ts - Transaction Type Step Domain Types
 *
 * Transaction Type-specific types και interfaces
 */

import type { CategoryType } from '../types';

export type TransactionType = 'rent' | 'sale' | 'full_time' | 'part_time' | 'freelance' | 'internship';

export interface TransactionStepData {
  selectedTransactionType: TransactionType;
  selectedCategory: CategoryType;
  timestamp: number;
}

export interface TransactionCardData {
  id: string;
  transactionType: TransactionType;
  title: string;
  description?: string;
  categoryContext?: CategoryType;
  isRecommended?: boolean;
}

export type TransactionSelectionEvent = {
  transactionType: TransactionType;
  category: CategoryType;
  timestamp: number;
  source: 'user_click' | 'auto_selection' | 'navigation';
};