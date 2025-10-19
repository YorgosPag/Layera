/**
 * @layera/pipelines - Enterprise UnifiedPipelineModal (Clean Architecture)
 * Purpose: Λεπτό shell που συνθέτει βήματα - ΚΑΜΙΑ επιχειρησιακή λογική εδώ
 * Architecture: Clean separation of concerns - ΟΧΙ inline CSS, ΟΧΙ state management
 */

import React from 'react';
import { Modal } from '@layera/modals';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { Heading } from '@layera/typography';
import { useModalContainer } from './hooks/useModalContainer';
import { useUnifiedPipeline } from './hooks/useUnifiedPipeline';
import {
  CategoryStep, IntentStep, TransactionTypeStep, EmploymentTypeStep,
  AvailabilityStep, AvailabilityDetailsStep, LocationStep, LayoutStep,
  DetailsStep, CompleteStep
} from './steps';
// Import clean CSS - ΟΧΙ inline styles
import './styles/modal.css';

/**
 * Enterprise Modal Props - Strict typing
 */
export interface UnifiedPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  container?: Element | (() => Element) | null;
}

/**
 * Clean Enterprise Modal - Pure Composition
 * Μόνο wiring και rendering - ΚΑΜΙΑ επιχειρησιακή λογική
 */
export const UnifiedPipelineModal: React.FC<UnifiedPipelineModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  container
}) => {
  // SSR-safe container resolution
  const containerFn = useModalContainer({
    preferredId: 'layera-device-simulator-viewport',
    fallbackId: 'root'
  });

  // Enterprise state management - clean separation
  const { state, actions, can } = useUnifiedPipeline({ onSubmit, onClose });

  // Use provided container or SSR-safe resolver
  const finalContainer = container !== undefined ? container : containerFn;

  return (
    <Modal
      open={isOpen}
      onClose={actions.reset}
      size="lg"
      variant="centered"
      closeOnOverlayClick={true}
      closeOnEscape={true}
      showCloseButton={true}
      overlayClassName="unified-pipeline-modal-overlay"
      className="unified-pipeline-modal"
      container={finalContainer}
    >
      <Stack spacing="lg">
        <Flex justify="between" align="center">
          <Heading as="h2" size="xl" color="primary">
            Νέα Καταχώρηση
          </Heading>
          <Flex gap="xs">
            <Button
              variant="outline"
              size="sm"
              onClick={actions.reset}
            >
              RESET
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={actions.reset}
              style={{
                minWidth: '32px',
                height: '32px',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </Button>
          </Flex>
        </Flex>

        {/* Clean Step Rendering - Pure Composition */}
        {state.step === 'category' && (
          <CategoryStep onNext={actions.setCategory} />
        )}

        {state.step === 'intent' && state.category && (
          <IntentStep
            category={state.category}
            onNext={actions.setIntent}
            onBack={can.goBack ? actions.back : undefined}
          />
        )}

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

        {/* Fallback Actions για category step */}
        {state.step === 'category' && (
          <FormActions>
            <Button
              variant="outline"
              onClick={actions.reset}
            >
              Ακύρωση
            </Button>
          </FormActions>
        )}
      </Stack>
    </Modal>
  );
};