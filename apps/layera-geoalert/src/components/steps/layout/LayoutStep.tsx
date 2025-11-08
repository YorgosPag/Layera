/**
 * LayoutStep.tsx - Enterprise Modular Layout Step
 *
 * Καθαρό modular layout step που διαχειρίζεται τα positioning και scale tools
 */

import React, { useCallback, useState } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard } from '@layera/cards';
import { CheckIcon } from '@layera/icons';
import { SPACING_SCALE, BORDER_RADIUS_SCALE, getCardSuccessColor, Z_INDEX_LAYERS } from '@layera/constants';
import { Text } from '@layera/typography';
import { Box } from '@layera/layout';
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
      description: 'Εργαλείο τοποθέτησης ακινήτου στον χάρτη',
      isActive: selectedTools.includes('positioning')
    },
    {
      id: 'scale',
      title: 'Κλίμακα',
      description: 'Προσαρμογή μεγέθους και κλίμακας',
      isActive: selectedTools.includes('scale')
    },
    {
      id: 'rotation',
      title: 'Περιστροφή',
      description: 'Περιστροφή του ακινήτου',
      isActive: selectedTools.includes('rotation')
    },
    {
      id: 'dimensions',
      title: 'Διαστάσεις',
      description: 'Καθορισμός διαστάσεων ακινήτου',
      isActive: selectedTools.includes('dimensions')
    }
  ];

  const handleToolToggle = useCallback((tool: LayoutTool) => {
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
      setTimeout((): void => {
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
    top: 'var(--la-cards-top, 120px)', // Fallback value
    left: 'var(--la-space-6)',        // 🎯 SST: LG margin (24px) consistent με AreaMethodStep
    right: 'var(--la-space-6)',       // 🎯 SST: LG margin (24px) consistent με AreaMethodStep
    zIndex: Z_INDEX_LAYERS.STEPS_OVERLAY,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--la-space-4)', // 🎯 SST: MD gap (16px)
    padding: '0',                         // No extra padding - margins handle spacing
    boxSizing: 'border-box'
  };

  return (
    <Box>
      {/* Layout Tools */}
      {layoutTools.map((tool: LayoutToolOption) => (
        <BaseCard
          key={tool.id}
          variant="property"
          title={tool.title}
          description={tool.description}
          clickable
          onClick={(): void => handleToolToggle(tool.id)}
          data-testid={`layout-tool-${tool.id}`}
          className={`layera-card-uniform ${tool.isActive ? 'active' : ''}`}
        />
      ))}

      {/* Selected Tools Counter */}
      {selectedTools.length > 0 && (
        <Box
          padding="sm md"
          background={getCardSuccessColor()} // 🔴 SST: Success color από μοναδική πηγή αλήθειας
          borderRadius="sm"
          color="var(--color-semantic-success-text)"
        >
          <Text size="sm" color="inherit">
            {selectedTools.length} εργαλεία επιλεγμένα
          </Text>
        </Box>
      )}

      {/* Complete Card */}
      <BaseCard
        variant={selectedTools.length > 0 ? "success" : "neutral"}
        title="Ολοκλήρωση"
        description={selectedTools.length > 0 ? 'Ολοκλήρωση με επιλεγμένα εργαλεία κάτοψης' : 'Ολοκλήρωση χωρίς εργαλεία κάτοψης'}
        icon={<CheckIcon size="sm" theme="neutral" />}
        clickable
        onClick={handleComplete}
        data-testid="layout-complete-card"
        className="layera-card-uniform"
      />
    </Box>
  );
};