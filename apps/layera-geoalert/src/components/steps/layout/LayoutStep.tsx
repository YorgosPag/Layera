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
      title: t('placementTools.title'),
      description: t('placementTools.description'),
      isActive: selectedTools.includes('positioning')
    },
    {
      id: 'scale',
      title: t('placementTools.scale'),
      description: t('placementTools.scale'),
      isActive: selectedTools.includes('scale')
    },
    {
      id: 'rotation',
      title: t('placementTools.rotation'),
      description: t('placementTools.rotation'),
      isActive: selectedTools.includes('rotation')
    },
    {
      id: 'dimensions',
      title: t('placementTools.description'),
      description: t('placementTools.description'),
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
    top: 'var(--la-cards-top)',
    left: 'var(--la-side-margins)',
    right: 'var(--la-side-margins)',
    zIndex: 'var(--la-z-popover)', // Enterprise CSS Custom Property - Single Source of Truth
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--la-cards-gap)',
    padding: '0'
  };

  return (
    <Box style={containerStyles}>
      {/* Layout Tools */}
      {layoutTools.map((tool: unknown) => (
        <LayoutToolCard
          key={tool.id}
          tool={tool.id}
          title={tool.title}
          description={tool.description}
          isActive={tool.isActive}
          onClick={(): void => handleToolToggle(tool.id)}
          data-testid={`layout-tool-${tool.id}`}
        />
      ))}

      {/* Selected Tools Counter */}
      {selectedTools.length > 0 && (
        <Box
          padding="sm md"
          background="var(--color-semantic-success-bg)"
          borderRadius="sm"
          color="var(--color-semantic-success-text)"
        >
          <Text size="sm" color="inherit">
            {t('layout.selected.count', { count: selectedTools.length })}
          </Text>
        </Box>
      )}

      {/* Complete Card */}
      <BaseCard
        variant={selectedTools.length > 0 ? "success" : "neutral"}
        title={t('actions.complete')}
        description={selectedTools.length > 0 ? t('layout.complete.withTools') : t('layout.complete.withoutTools')}
        icon={<CheckIcon size="sm" theme="neutral" />}
        onClick={handleComplete}
        data-testid="layout-complete-card"
      />
    </Box>
  );
};