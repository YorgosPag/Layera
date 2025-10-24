/**
 * OccupationStep.tsx - Enterprise Modular Occupation Step με ESCO Integration
 *
 * Professional occupation selection με real-time ESCO database search
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
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

  // Handle occupation selection από ESCO search
  const handleOccupationSelection = useCallback(async (occupation: ESCOOccupation) => {
    console.log(`🎯 OCCUPATION STEP: Selected occupation: ${occupation.preferredLabel} (${occupation.id})`);

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
    top: '161px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '350px',
    zIndex: 10003,
    padding: '0 20px',
    boxSizing: 'border-box'
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#2c3e50'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px'
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.4'
  };

  const confirmationStyles: React.CSSProperties = {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '16px',
    textAlign: 'center',
    color: '#155724'
  };

  const selectedOccupationStyles: React.CSSProperties = {
    backgroundColor: '#e3f2fd',
    border: '2px solid #2196f3',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '16px'
  };

  return (
    <div style={containerStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <div style={titleStyles}>
          Επιλογή Επαγγέλματος
        </div>
        <div style={subtitleStyles}>
          Αναζητήστε και επιλέξτε το επάγγελμά σας από την επίσημη ESCO βάση δεδομένων της ΕΕ
        </div>
      </div>

      {/* ESCO Search Component */}
      <ESCOSearchComponent
        onOccupationSelected={handleOccupationSelection}
        placeholder="Αναζήτηση επαγγέλματος... (π.χ. γιατρός, μηχανικός, δικηγόρος)"
        maxResults={10}
        variant="default"
      />

      {/* Selected Occupation Display */}
      {selectedOccupation && !isConfirming && (
        <div style={selectedOccupationStyles}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            ✅ Επιλεγμένο: {selectedOccupation.preferredLabel}
          </div>
          {selectedOccupation.description && (
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
              {selectedOccupation.description}
            </div>
          )}
          {selectedOccupation.skillsCount > 0 && (
            <div style={{ fontSize: '12px', color: '#28a745' }}>
              💼 Σχετικές δεξιότητες: {selectedOccupation.skillsCount}
            </div>
          )}
        </div>
      )}

      {/* Confirmation Message */}
      {isConfirming && selectedOccupation && (
        <div style={confirmationStyles}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
            🎉 Επιτυχία!
          </div>
          <div>
            Το επάγγελμα "{selectedOccupation.preferredLabel}" επιλέχθηκε επιτυχώς.
          </div>
          <div style={{ fontSize: '14px', marginTop: '8px', opacity: 0.8 }}>
            Μετάβαση στο επόμενο βήμα...
          </div>
        </div>
      )}

      {/* Help Text */}
      {!selectedOccupation && (
        <div style={{
          marginTop: '24px',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#666',
          textAlign: 'center'
        }}>
          💡 Συμβουλή: Χρησιμοποιήστε ελληνικούς ή αγγλικούς όρους για καλύτερα αποτελέσματα
        </div>
      )}
    </div>
  );
};