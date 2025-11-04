/**
 * TransactionCard.tsx - Transaction Type Selection Card Component
 *
 * BaseCard implementation για transaction type selection
 * Migrated πίσω στο BaseCard system ως Single Source of Truth
 */

import React from 'react';
import { BaseCard } from '@layera/cards';
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
 * Powered by BaseCard enterprise system
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

  const handleClick = React.useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onTransactionSelect?.(transactionType);
  }, [onTransactionSelect, transactionType]);

  const handleInfoClick = React.useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  }, [onInfoClick]);

  return (
    <BaseCard
      title={title}
      icon={icon}
      variant={category}
      clickable
      onClick={handleClick}
      onInfoClick={handleInfoClick}
      data-testid={`transaction-card-${transactionType}-${category}`}
      className="layera-card-uniform"
    />
  );
};