/**
 * TransactionCard.tsx - Transaction Type Selection Card Component
 *
 * Reusable card component για transaction type selection (rent/sale για ακίνητα, full_time/part_time κλπ για εργασία)
 * Context-aware based on selected category
 */

import React from 'react';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
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
 * Adapts styling based on category context
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
  const handleClick = () => {
    onTransactionSelect?.(transactionType);
  };

  const handleInfoClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  };

  // Determine if this card is selected
  const isSelected = context.selectedTransactionType === transactionType;

  // Use category για variant styling
  const cardVariant = category || 'property';

  return (
    <BaseCard
      variant={cardVariant}
      title={title}
      icon={icon}
      onClick={handleClick}
      onInfoClick={handleInfoClick}
      data-testid={`transaction-card-${transactionType}-${category}`}
      className={isSelected ? 'selected' : ''}
    />
  );
};