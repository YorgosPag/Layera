/**
 * StepRegistryTest.tsx - Simple Test Component για το νέο Step System
 *
 * Temporary test component για verification του νέου architecture
 */

import React from 'react';
import { stepRegistry } from '../StepRegistry';
import { StepOrchestrator } from '../StepOrchestrator';
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
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>🧪 Step Registry Test</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>Registry Status:</h3>
        <pre>{JSON.stringify(registryStatus, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Current Context:</h3>
        <pre>{JSON.stringify(context, (key, value) => {
          if (value instanceof Set) {
            return Array.from(value);
          }
          return value;
        }, 2)}</pre>
      </div>

      <div>
        <h3>Step Orchestrator:</h3>
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
      </div>
    </div>
  );
};