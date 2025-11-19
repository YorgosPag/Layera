import React from 'react';
import { Box } from '../../../../packages/layout/src';
import { Text } from '../../../../packages/typography/src';
import { type PipelineState } from '@layera/pipelines';
import { PipelineDebugInfoProps } from '../types/unified-interfaces';

/**
 * PipelineDebugInfo Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Pipeline Debug Info ενότητα
 * Γραμμές 155-172 από το αρχικό AppContent.tsx
 * Props interface moved to unified-interfaces.ts
 */

export const PipelineDebugInfo: React.FC<PipelineDebugInfoProps> = ({
  pipelineState
}) => {
  if (!pipelineState || !pipelineState.selectedCategory) {
    return null;
  }

  return (
    <Box className="layera-layout layera-debug-container">
      <Text size="sm">🚀 Pipeline: {pipelineState.selectedCategory}</Text>
      <Text size="sm">📍 Step: {pipelineState.currentStepId}</Text>
      <Text size="sm">📊 Progress: {pipelineState.currentStepIndex + 1}/{pipelineState.totalSteps}</Text>
    </Box>
  );
};