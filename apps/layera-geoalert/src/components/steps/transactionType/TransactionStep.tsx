/**
 * TransactionStep.tsx - Transaction Type Selection Step
 *
 * Semantic Step: "transactionType" - folder name never changes
 * Third step in the flow - handles transaction type selection based on category
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { PipelineDiscovery } from '@layera/pipelines';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import { cardData, getCardsForStep, type CardConfig, type CardId } from '../../device-specific/mobile/iphone-14-pro-max/components/cardData';
import { InfoPanel } from '../../device-specific/mobile/iphone-14-pro-max/components/InfoPanel';
import {
  GEOALERT_INFO_CONTENT,
  StaticContentProvider
} from '@layera/info-panels';
import type { StepProps, CategoryType } from '../types';
import type { TransactionType } from './types';

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
        { type: 'rent', title: t('transaction.rent.title'), description: t('transaction.rent.description') },
        { type: 'sale', title: t('transaction.sale.title'), description: t('transaction.sale.description') }
      ];
    } else if (category === 'jobs') {
      return [
        { type: 'full_time', title: t('transaction.fullTime.title'), description: t('transaction.fullTime.description') },
        { type: 'part_time', title: t('transaction.partTime.title'), description: t('transaction.partTime.description') },
        { type: 'freelance', title: t('transaction.freelance.title'), description: t('transaction.freelance.description') },
        { type: 'internship', title: t('transaction.internship.title'), description: t('transaction.internship.description') }
      ];
    }
    return [];
  }, [t]);

  // Handle transaction type selection
  const handleTransactionSelection = useCallback((transactionType: TransactionType) => {
    console.log(`🎯 TRANSACTION: Selected transaction type: ${transactionType} for category: ${context.selectedCategory}`);

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

    // Pipeline discovery
    if (typeof PipelineDiscovery !== 'undefined') {
      const pipelineDiscovery = new PipelineDiscovery();
      pipelineDiscovery.markStepCompleted('transactionType');
    }

    // Auto-advance to next step
    setTimeout(() => {
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
  const stepCards = getCardsForStep('transactionType');

  return (
    <div className="transaction-step">
      {transactionOptions.map((option) => (
        <BaseCard
          key={option.type}
          variant={context.selectedCategory}
          title={option.title}
          subtitle={option.description}
          icon={null}
          onClick={() => handleTransactionSelection(option.type)}
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
    </div>
  );
};