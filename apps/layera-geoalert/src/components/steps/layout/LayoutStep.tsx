/**
 * LayoutStep.tsx - Enterprise Modular Layout Step
 *
 * Καθαρό modular layout step που διαχειρίζεται τα positioning και scale tools
 */

import React, { useCallback, useState } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { LayoutToolCard } from './LayoutToolCard';
import { BaseCard } from '@layera/cards';
import { CheckIcon } from '@layera/icons';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { Text } from '@layera/typography';
import type { StepProps } from '../types';
import type { LayoutTool, LayoutStepData, LayoutToolOption } from './types';

export interface LayoutStepProps extends StepProps {
  /** Layout tools selection callback */
  onLayoutConfigured?: (data: LayoutStepData) => void;
}

/**
 * Enterprise Layout Step - Καθαρό modular component για Layout Configuration
 */
export const LayoutStep: React.FC<LayoutStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onLayoutConfigured,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();
  const [selectedTools, setSelectedTools] = useState<LayoutTool[]>([]);

  const layoutTools: LayoutToolOption[] = [
    {
      id: 'positioning',
      title: 'Τοποθέτηση',
      description: 'Ρύθμιση θέσης',
      isActive: selectedTools.includes('positioning')
    },
    {
      id: 'scale',
      title: 'Κλίμακα',
      description: 'Ρύθμιση μεγέθους',
      isActive: selectedTools.includes('scale')
    },
    {
      id: 'rotation',
      title: 'Περιστροφή',
      description: 'Ρύθμιση γωνίας',
      isActive: selectedTools.includes('rotation')
    },
    {
      id: 'dimensions',
      title: 'Διαστάσεις',
      description: 'Ρύθμιση διαστάσεων',
      isActive: selectedTools.includes('dimensions')
    }
  ];

  const handleToolToggle = useCallback((tool: LayoutTool) => {
    console.log(`🎯 LAYOUT UI: Toggling tool: ${tool}`);

    setSelectedTools(prev => {
      const isSelected = prev.includes(tool);
      if (isSelected) {
        return prev.filter(t => t !== tool);
      } else {
        return [...prev, tool];
      }
    });
  }, []);

  const handleComplete = useCallback(async () => {
    console.log(`🎯 LAYOUT UI: Complete with tools: ${selectedTools.join(', ')}`);

    try {
      // Ενημερώνουμε το StepOrchestrator
      if (onStepComplete) {
        const stepData: LayoutStepData = {
          selectedTools,
          isComplete: true
        };
        onStepComplete('layout', stepData);
      }

      // Legacy callback
      onLayoutConfigured?.({
        selectedTools,
        isComplete: true
      });

      // Auto-advance
      setTimeout(() => {
        onNext?.();
      }, 300);

    } catch (error) {
      console.error('Layout step completion failed:', error);
    }
  }, [selectedTools, onStepComplete, onLayoutConfigured, onNext]);

  if (!isVisible) {
    return null;
  }

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 'var(--layera-cards-top)',
    left: 'var(--layera-side-margins)',
    right: 'var(--layera-side-margins)',
    zIndex: 10002,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--layera-cards-gap)',
    padding: '0'
  };

  return (
    <div style={containerStyles}>
      {/* Layout Tools */}
      {layoutTools.map((tool) => (
        <LayoutToolCard
          key={tool.id}
          tool={tool.id}
          title={tool.title}
          description={tool.description}
          isActive={tool.isActive}
          onClick={() => handleToolToggle(tool.id)}
          data-testid={`layout-tool-${tool.id}`}
        />
      ))}

      {/* Selected Tools Counter */}
      {selectedTools.length > 0 && (
        <div style={{
          padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.MD}px`,
          background: 'rgba(0, 255, 0, 0.1)',
          borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
          // fontSize handled by Text component
          color: '#008000'
        }}>
          <Text size="sm" style={{ color: 'inherit' }}>
            {selectedTools.length} εργαλεία επιλέχθηκαν
          </Text>
        </div>
      )}

      {/* Complete Card */}
      <BaseCard
        variant={selectedTools.length > 0 ? "success" : "neutral"}
        title="Ολοκλήρωση"
        description={selectedTools.length > 0 ? "Συνέχεια με τα επιλεγμένα εργαλεία" : "Συνέχεια χωρίς εργαλεία"}
        icon={<CheckIcon size="sm" theme="neutral" />}
        onClick={handleComplete}
        data-testid="layout-complete-card"
      />
    </div>
  );
};