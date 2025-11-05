/**
 * TransactionStep.tsx - Transaction Type Selection Step
 *
 * Semantic Step: "transactionType" - folder name never changes
 * Third step in the flow - handles transaction type selection based on category
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
//χρησιμοποιούμε StepOrchestrator μόνο
import { BaseCard } from '@layera/cards';
import { Box } from '@layera/layout';
import { InfoPanel } from '@layera/info-panels';
import {
  GEOALERT_INFO_CONTENT,
  StaticContentProvider
} from '@layera/info-panels';
import type { StepProps, CategoryType } from '../types';
import type { TransactionType } from './types';

// Local types
type CardId = string;

export interface TransactionStepProps extends StepProps {
  /** Legacy compatibility */
  onTransactionSelected?: (transactionType: TransactionType) => void;
}

/**
 * Enterprise Transaction Type Step - Third step in the flow
 * Handles transaction type selection based on category (rent/sale για ακίνητα, full_time/part_time κλπ για εργασία)
 */
export const TransactionStep: React.FC<TransactionStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onTransactionSelected,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();

  // Local state για transaction type selection
  const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionType>(
    context.selectedTransactionType
  );
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [currentInfoCard, setCurrentInfoCard] = useState<CardId | null>(null);

  // Info content provider
  const infoContentProvider = React.useMemo(() =>
    new StaticContentProvider(GEOALERT_INFO_CONTENT),
    []
  );

  // Get transaction type options based on category
  const getTransactionOptions = useCallback((category: CategoryType): Array<{
    type: TransactionType;
    title: string;
    description: string;
  }> => {
    if (category === 'property') {
      return [
        { type: 'rent', title: t('transaction.rent.title', 'Ενοικίαση'), description: t('transaction.rent.description', 'Αναζήτηση ακινήτου προς ενοικίαση') },
        { type: 'sale', title: t('transaction.sale.title', 'Πώληση'), description: t('transaction.sale.description', 'Αναζήτηση ακινήτου προς πώληση') }
      ];
    } else if (category === 'jobs') {
      return [
        { type: 'full_time', title: t('transaction.fullTime.title', 'Πλήρης Απασχόληση'), description: t('transaction.fullTime.description', 'Εργασία πλήρους απασχόλησης') },
        { type: 'part_time', title: t('transaction.partTime.title', 'Μερική Απασχόληση'), description: t('transaction.partTime.description', 'Εργασία μερικής απασχόλησης') },
        { type: 'freelance', title: t('transaction.freelance.title', 'Ελεύθερος Επαγγελματίας'), description: t('transaction.freelance.description', 'Ανεξάρτητη εργασία') },
        { type: 'internship', title: t('transaction.internship.title', 'Πρακτική Άσκηση'), description: t('transaction.internship.description', 'Θέση πρακτικής άσκησης') }
      ];
    }
    return [];
  }, [t]);

  // Handle transaction type selection
  const handleTransactionSelection = useCallback((transactionType: TransactionType) => {
    setSelectedTransactionType(transactionType);

    // Update context
    if (onStepComplete) {
      onStepComplete('transactionType', {
        selectedTransactionType: transactionType,
        selectedCategory: context.selectedCategory
      });
    }

    // Legacy callback
    onTransactionSelected?.(transactionType);

    // ✅ TODO: Μετάβαση σε StepOrchestrator
    // Auto-advance to next step
    setTimeout((): void => {
      onNext?.();
    }, 300);
  }, [context.selectedCategory, onStepComplete, onTransactionSelected, onNext]);

  // Handle info click
  const handleInfoClick = useCallback((cardId: CardId) => {
    setCurrentInfoCard(cardId);
    setShowInfoPanel(true);
  }, []);

  // Handle info panel close
  const handleInfoPanelClose = useCallback(() => {
    setShowInfoPanel(false);
    setCurrentInfoCard(null);
  }, []);

  if (!isVisible) {
    return null;
  }

  const transactionOptions = getTransactionOptions(context.selectedCategory);
  // Simplified card data logic

  return (
    <Box className="transaction-step">
      {transactionOptions.map((option: unknown) => (
        <BaseCard
          key={option.type}
          variant={context.selectedCategory}
          title={option.title}
          subtitle={option.description}
          className="layera-card-uniform"
          icon={null}
          onClick={(): void => handleTransactionSelection(option.type)}
          onInfoClick={() => handleInfoClick(`transaction-${option.type}` as CardId)}
          data-testid={`transaction-card-${option.type}`}
          className={selectedTransactionType === option.type ? 'selected' : ''}
        />
      ))}

      {/* Info Panel */}
      {showInfoPanel && currentInfoCard && (
        <InfoPanel
          isOpen={showInfoPanel}
          onClose={handleInfoPanelClose}
          content={infoContentProvider.getContent(currentInfoCard)}
          cardId={currentInfoCard}
        />
      )}
    </Box>
  );
};