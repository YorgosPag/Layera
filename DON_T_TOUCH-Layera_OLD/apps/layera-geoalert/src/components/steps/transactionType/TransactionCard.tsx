/**
 * TransactionCard.tsx - Transaction Type Selection Card Component
 *
 * Unified Card implementation για transaction type selection
 * Migrated από BaseCard wrapper στο νέο UnifiedCard system
 */

import React from 'react';
import { UnifiedCard, createSelectionCard } from '@layera/cards';
import type { StepCardProps, CategoryType } from '../types';
import type { TransactionType } from './types';

export interface TransactionCardProps extends StepCardProps {
  /** Transaction type που αντιπροσωπεύει αυτή η κάρτα */
  transactionType: TransactionType;

  /** Category context για proper styling */
  category: CategoryType;

  /** Card title */
  title: string;

  /** Card icon */
  icon: React.ReactNode;

  /** Click handler */
  onTransactionSelect?: (transactionType: TransactionType) => void;

  /** Info click handler */
  onInfoClick?: () => void;
}

/**
 * Transaction Type Selection Card
 * Powered by UnifiedCard configuration system
 */
export const TransactionCard: React.FC<TransactionCardProps> = ({
  context,
  transactionType,
  category,
  title,
  icon,
  onTransactionSelect,
  onInfoClick,
  opacity = 'transparent'
}) => {
  // Skip rendering for null values
  if (!transactionType || !category) {
    return null;
  }

  const handleTransactionSelect = React.useCallback((transaction: unknown) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onTransactionSelect?.(transaction as TransactionType);
  }, [onTransactionSelect]);

  const handleInfoClick = React.useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  }, [onInfoClick]);

  // Create unified card configuration
  const cardConfig = createSelectionCard({
    id: `transaction-${transactionType}`,
    title,
    icon,
    selectionValue: transactionType,
    category,
    theme: category,
    onClick: () => handleTransactionSelect(transactionType),
    onInfoClick: handleInfoClick,
    testId: `transaction-card-${transactionType}-${category}`
  });

  // Enhance config with step context
  const enhancedConfig = {
    ...cardConfig,
    selected: context.selectedTransactionType === transactionType,
    className: context.selectedTransactionType === transactionType ? 'selected' : ''
  };

  // Create card context
  const cardContext = {
    currentStep: 'transactionType',
    category,
    viewMode: 'mobile' as const
  };

  return (
    <UnifiedCard
      config={enhancedConfig}
      context={cardContext}
    />
  );
};