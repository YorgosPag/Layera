/**
 * OccupationStep.tsx - Enterprise Modular Occupation Step με ESCO Integration
 *
 * Professional occupation selection με real-time ESCO database search
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Heading, Text } from '@layera/typography';
import { Stack, Box } from '@layera/layout';
import { SPACING_SCALE } from '@layera/constants';
import { BaseCard } from '@layera/cards';
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
  const { t } = useLayeraTranslation();

  // Local state
  const [selectedOccupation, setSelectedOccupation] = useState<ESCOOccupation | null>(
    context.selectedOccupation || null
  );
  const [isConfirming, setIsConfirming] = useState(false);

  // Debug mount/unmount lifecycle
  React.useEffect(() => {
    return () => {
    };
  }, []);

  // Handle occupation selection από ESCO search
  const handleOccupationSelection = useCallback(async (occupation: ESCOOccupation) => {
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
      setTimeout((): void => {
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
    top: 'var(--la-cards-top)',
    left: '50%',
    transform: 'translateX(-50%)',
    width: `${SPACING_SCALE.XXXL * 2}px`,
    zIndex: 10003,
    padding: `0 ${SPACING_SCALE.LG + SPACING_SCALE.XS}px`,
    boxSizing: 'border-box'
  };

  // All styles converted to LEGO BaseCard components

  return (
    <Box style={containerStyles}>
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
        <BaseCard
          backgroundColor="var(--color-semantic-info-bg)"
          border="var(--la-border-accent-primary, 2px solid var(--la-color-primary))"
          padding="md"
          marginTop="md">
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
        </BaseCard>
      )}

      {/* Confirmation Message */}
      {isConfirming && selectedOccupation && (
        <BaseCard
          backgroundColor="var(--color-semantic-success-bg)"
          border="var(--la-border-success, 1px solid var(--la-color-success))"
          padding="md"
          marginTop="md">
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
        </BaseCard>
      )}

      {/* Help Text */}
      {!selectedOccupation && (
        <BaseCard
          variant="info"
          padding="md"
          marginTop="lg">
          <Text size="sm" color="secondary" align="center">
            {t('occupation.help.tip', '💡 Συμβουλή: Χρησιμοποιήστε ελληνικούς ή αγγλικούς όρους για καλύτερα αποτελέσματα')}
          </Text>
        </BaseCard>
      )}
    </Box>
  );
};