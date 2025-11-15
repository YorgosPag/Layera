import React from 'react';
import { Box } from '../../../../packages/layout/src';
import { Text } from '../../../../packages/typography/src';
import { type PipelineState } from '@layera/pipelines';

/**
 * PipelineDebugInfo Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Pipeline Debug Info ενότητα
 * Γραμμές 155-172 από το αρχικό AppContent.tsx
 */

interface PipelineDebugInfoProps {
  pipelineState: PipelineState | null;
}

export const PipelineDebugInfo: React.FC<PipelineDebugInfoProps> = ({
  pipelineState
}) => {
  if (!pipelineState || !pipelineState.selectedCategory) {
    return null;
  }

  return (
    <Box style={{
      position: 'fixed',
      top: '60px',
      right: '20px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <Text size="sm">🚀 Pipeline: {pipelineState.selectedCategory}</Text>
      <Text size="sm">📍 Step: {pipelineState.currentStepId}</Text>
      <Text size="sm">📊 Progress: {pipelineState.currentStepIndex + 1}/{pipelineState.totalSteps}</Text>
    </Box>
  );
};