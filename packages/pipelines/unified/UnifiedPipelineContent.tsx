/**
 * @layera/pipelines - UnifiedPipelineContent (Inline Content Only)
 * Purpose: Extracted content από UnifiedPipelineModal χωρίς Modal wrapper
 * Usage: Για inline display μέσα σε custom containers
 */

import React, { useMemo } from 'react';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { Heading } from '@layera/typography';
import { useUnifiedPipeline } from './hooks/useUnifiedPipeline';
import { useLayeraTranslation } from '@layera/tolgee';
import { useMediaQuery } from './hooks/useMediaQuery';
import {
  CategoryStep, IntentStep, TransactionTypeStep, EmploymentTypeStep,
  AvailabilityStep, AvailabilityDetailsStep, LocationStep, LayoutStep,
  DetailsStep, CompleteStep
} from './steps';
// Import clean CSS - ΟΧΙ inline styles
import './styles/modal.css';

/**
 * Pipeline Content Props - Strict typing
 */
export interface UnifiedPipelineContentProps {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

/**
 * Clean Pipeline Content - Pure Content without Modal wrapper
 * Μόνο το content από το UnifiedPipelineModal
 */
export const UnifiedPipelineContent: React.FC<UnifiedPipelineContentProps> = ({
  onClose,
  onSubmit
}) => {
  const { t } = useLayeraTranslation();

  // Enterprise state management - clean separation
  const { state, actions, can } = useUnifiedPipeline({ onSubmit, onClose });


  return (
    <Stack
      spacing="sm"
      style={{
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'transparent',
        padding: '0'
      }}
    >


      {/* Clean Step Rendering - Pure Composition */}
      <div style={{
        backgroundColor: 'transparent',
        padding: '0'
      }}>


      {state.step === 'transactionType' && (
        <TransactionTypeStep
          onNext={actions.setTransactionType}
          onBack={can.goBack ? actions.back : undefined}
        />
      )}

      {state.step === 'employmentType' && (
        <EmploymentTypeStep
          onNext={actions.setEmploymentType}
          onBack={can.goBack ? actions.back : undefined}
        />
      )}

      {state.step === 'availability' && (
        <AvailabilityStep
          onNext={actions.setAvailability}
          onBack={can.goBack ? actions.back : undefined}
        />
      )}

      {state.step === 'availabilityDetails' && (
        <AvailabilityDetailsStep
          availabilityDate={state.availabilityDetails?.date || null}
          availabilityDuration={state.availabilityDetails?.duration || null}
          availabilityDurationUnit={state.availabilityDetails?.unit || null}
          onDateChange={(date) => actions.setAvailabilityDetails(date, state.availabilityDetails?.duration || 1, state.availabilityDetails?.unit || 'months')}
          onDurationChange={(duration) => actions.setAvailabilityDetails(state.availabilityDetails?.date || '', duration, state.availabilityDetails?.unit || 'months')}
          onUnitChange={(unit) => actions.setAvailabilityDetails(state.availabilityDetails?.date || '', state.availabilityDetails?.duration || 1, unit)}
          onNext={actions.locationReady}
          onBack={can.goBack ? actions.back : undefined}
        />
      )}

      {state.step === 'location' && (
        <LocationStep
          category={state.category!}
          intent={state.intent!}
          availability={state.availability!}
          onNext={actions.locationReady}
          onBack={can.goBack ? actions.back : undefined}
        />
      )}

      {state.step === 'layout' && (
        <LayoutStep
          onNext={actions.layoutReady}
          onBack={can.goBack ? actions.back : undefined}
        />
      )}

      {state.step === 'details' && (
        <DetailsStep
          category={state.category!}
          onSubmit={actions.detailsReady}
          onBack={can.goBack ? actions.back : undefined}
        />
      )}

      {state.step === 'complete' && (
        <CompleteStep
          pipelineState={state}
          onClose={actions.reset}
        />
      )}

      </div>
    </Stack>
  );
};