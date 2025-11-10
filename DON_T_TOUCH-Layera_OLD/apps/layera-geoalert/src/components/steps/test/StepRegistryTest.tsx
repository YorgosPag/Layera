/**
 * StepRegistryTest.tsx - Simple Test Component για το νέο Step System
 *
 * Temporary test component για verification του νέου architecture
 */

import React from 'react';
import { stepRegistry } from '../StepRegistry';
import { StepOrchestrator } from '../StepOrchestrator';
import { SPACING_SCALE } from '@layera/constants';
import { Box } from '@layera/layout';
import { Heading } from '@layera/typography';
import type { StepContext } from '../types';

export const StepRegistryTest: React.FC = () => {
  const [context, setContext] = React.useState<StepContext>({
    currentStepId: 'category',
    selectedCategory: null,
    selectedIntent: null,
    selectedLocation: null,
    selectedDetails: null,
    selectedPricing: null,
    selectedReview: null,
    completedSteps: new Set(),
    featureFlags: {}
  });

  // Get registry status
  const registryStatus = stepRegistry.getRegistryStatus();

  return (
    <Box padding={`${SPACING_SCALE.LG}px`} fontFamily="var(--la-font-family-mono)">
      <Heading level={2}>🧪 Step Registry Test</Heading>

      <Box marginBottom={`${SPACING_SCALE.LG}px`}>
        <Heading level={3}>Registry Status:</Heading>
        <pre>{JSON.stringify(registryStatus, null, 2)}</pre>
      </Box>

      <Box marginBottom={`${SPACING_SCALE.LG}px`}>
        <Heading level={3}>Current Context:</Heading>
        <pre>{JSON.stringify(context, (key, value) => {
          if (value instanceof Set) {
            return Array.from(value);
          }
          return value;
        }, 2)}</pre>
      </Box>

      <Box>
        <Heading level={3}>Step Orchestrator:</Heading>
        <StepOrchestrator
          currentStepId={context.currentStepId}
          selectedCategory={context.selectedCategory}
          selectedIntent={context.selectedIntent}
          selectedLocation={context.selectedLocation}
          selectedDetails={context.selectedDetails}
          selectedPricing={context.selectedPricing}
          selectedReview={context.selectedReview}
          completedSteps={context.completedSteps}
          featureFlags={context.featureFlags}
          onStepChange={(stepId) => {
            console.log('Step changed to:', stepId);
            setContext(prev => ({
              ...prev,
              currentStepId: stepId
            }));
          }}
          onStepComplete={(stepId, data) => {
            console.log('Step completed:', stepId, data);
            setContext(prev => ({
              ...prev,
              completedSteps: new Set([...prev.completedSteps, stepId])
            }));
          }}
        />
      </Box>
    </Box>
  );
};