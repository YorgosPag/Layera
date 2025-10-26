/**
 * OccupationStep.tsx - Enterprise Modular Occupation Step με ESCO Integration
 *
 * Professional occupation selection με real-time ESCO database search
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Heading, Text } from '@layera/typography';
import { Stack } from '@layera/layout';
import { SPACING_SCALE } from '@layera/constants';
import { ESCOSearchComponent } from './ESCOSearchComponent';
import type { StepProps } from '../types';
import type { ESCOOccupation, OccupationStepData } from './types';

export interface OccupationStepProps extends StepProps {
  /** Occupation selection callback */
  onOccupationSelected?: (occupation: ESCOOccupation) => void;
}

/**
 * Enterprise Occupation Step - ESCO-powered occupation selection
 */
export const OccupationStep: React.FC<OccupationStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onOccupationSelected,
  isVisible = true,
  deviceProps = {}
}) => {
  console.log('🚀 OCCUPATION STEP: Component mounted!', { isVisible, context });
  console.log('🔍 OCCUPATION STEP: Props received:', { onNext, onStepComplete, onOccupationSelected });
  const { t } = useLayeraTranslation();

  // Local state
  const [selectedOccupation, setSelectedOccupation] = useState<ESCOOccupation | null>(
    context.selectedOccupation || null
  );
  const [isConfirming, setIsConfirming] = useState(false);

  // Debug mount/unmount lifecycle
  React.useEffect(() => {
    console.log('🎯 OCCUPATION STEP: Component mounted and ready for interaction');
    return () => {
      console.log('🚪 OCCUPATION STEP: Component unmounting');
    };
  }, []);

  // Handle occupation selection από ESCO search
  const handleOccupationSelection = useCallback(async (occupation: ESCOOccupation) => {
    console.log(`🎯 OCCUPATION STEP: Selected occupation: ${occupation.preferredLabel} (${occupation.id})`);
    console.log('🔍 OCCUPATION DEBUG: Auto-selection triggered, this should NOT happen automatically!');

    setSelectedOccupation(occupation);
    setIsConfirming(true);

    try {
      // Ενημερώνουμε το StepOrchestrator
      if (onStepComplete) {
        const stepData: OccupationStepData = {
          selectedOccupation: occupation,
          searchQuery: occupation.preferredLabel,
          timestamp: Date.now()
        };
        onStepComplete('occupation', stepData);
      }

      // Legacy callback
      onOccupationSelected?.(occupation);

      // Auto-advance μετά από confirmation
      setTimeout(() => {
        onNext?.();
        setIsConfirming(false);
      }, 1500);

    } catch (error) {
      console.error('Occupation selection failed:', error);
      setIsConfirming(false);
    }
  }, [onStepComplete, onOccupationSelected, onNext]);

  if (!isVisible) {
    return null;
  }

  // Container styles
  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 'var(--layera-cards-top)',
    left: '50%',
    transform: 'translateX(-50%)',
    width: `${SPACING_SCALE.XXXL * 2}px`,
    zIndex: 10003,
    padding: `0 ${SPACING_SCALE.LG + SPACING_SCALE.XS}px`,
    boxSizing: 'border-box'
  };


  const confirmationStyles: React.CSSProperties = {
    backgroundColor: 'var(--color-semantic-success-bg)',
    border: '1px solid #c3e6cb',
    borderRadius: `${SPACING_SCALE.SM}px`,
    padding: `${SPACING_SCALE.MD}px`,
    marginTop: `${SPACING_SCALE.MD}px`,
    textAlign: 'center'
  };

  const selectedOccupationStyles: React.CSSProperties = {
    backgroundColor: 'var(--color-semantic-info-bg)',
    border: '2px solid #2196f3',
    borderRadius: `${SPACING_SCALE.SM}px`,
    padding: `${SPACING_SCALE.MD}px`,
    marginTop: `${SPACING_SCALE.MD}px`
  };

  return (
    <div style={containerStyles}>
      {/* Header */}
      <Stack spacing="sm" align="center" className="occupation-header">
        <Heading level={2} size="lg" color="primary" align="center">
          {t('occupation.title', 'Επιλογή Επαγγέλματος')}
        </Heading>
        <Text size="md" color="secondary" align="center" className="subtitle">
          {t('occupation.subtitle', 'Αναζητήστε και επιλέξτε το επάγγελμά σας από την επίσημη ESCO βάση δεδομένων της ΕΕ')}
        </Text>
      </Stack>

      {/* ESCO Search Component */}
      <ESCOSearchComponent
        onOccupationSelected={handleOccupationSelection}
        placeholder={t('occupation.search.placeholder', 'Αναζήτηση επαγγέλματος... (π.χ. γιατρός, μηχανικός, δικηγόρος)')}
        maxResults={10}
        variant="default"
      />

      {/* Selected Occupation Display */}
      {selectedOccupation && !isConfirming && (
        <div style={selectedOccupationStyles}>
          <Stack spacing="xs">
            <Text weight="bold" color="primary">
              {t('occupation.selected.prefix', '✅ Επιλεγμένο')}: {selectedOccupation.preferredLabel}
            </Text>
            {selectedOccupation.description && (
              <Text size="sm" color="secondary">
                {selectedOccupation.description}
              </Text>
            )}
            {selectedOccupation.skillsCount > 0 && (
              <Text size="xs" color="success">
                {t('occupation.skills.count', '💼 Σχετικές δεξιότητες')}: {selectedOccupation.skillsCount}
              </Text>
            )}
          </Stack>
        </div>
      )}

      {/* Confirmation Message */}
      {isConfirming && selectedOccupation && (
        <div style={confirmationStyles}>
          <Stack spacing="xs" align="center">
            <Text size="md" weight="bold" color="success">
              {t('occupation.success.title', '🎉 Επιτυχία!')}
            </Text>
            <Text size="md" align="center">
              {t('occupation.success.message', 'Το επάγγελμα "{{occupation}}" επιλέχθηκε επιτυχώς.', { occupation: selectedOccupation.preferredLabel })}
            </Text>
            <Text size="sm" color="secondary" align="center">
              {t('occupation.success.nextStep', 'Μετάβαση στο επόμενο βήμα...')}
            </Text>
          </Stack>
        </div>
      )}

      {/* Help Text */}
      {!selectedOccupation && (
        <div style={{
          marginTop: `${SPACING_SCALE.LG}px`,
          padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
          backgroundColor: 'var(--color-bg-surface)',
          borderRadius: `${SPACING_SCALE.XS + 2}px`
        }}>
          <Text size="sm" color="secondary" align="center">
            {t('occupation.help.tip', '💡 Συμβουλή: Χρησιμοποιήστε ελληνικούς ή αγγλικούς όρους για καλύτερα αποτελέσματα')}
          </Text>
        </div>
      )}
    </div>
  );
};