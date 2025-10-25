/**
 * @layera/pipelines - Enterprise UnifiedPipelineModal (Clean Architecture)
 *
 * 🚨 LEGACY/DEPRECATED SYSTEM - ΘΑ ΔΙΑΓΡΑΦΕΙ! 🚨
 *
 * Αυτό είναι το ΠΑΛΙΟ pipeline system που χρησιμοποιείται ως αναφορά.
 * Όταν ολοκληρωθεί 100% το ΝΕΟ Enterprise Step System με StepRegistry
 * (apps/layera-geoalert/src/components/steps/), ολόκληρο το
 * packages/pipelines/unified/ directory θα διαγραφεί.
 *
 * Προσωρινή χρήση: Modal container με κάρτες για migration reference.
 *
 * Purpose: Λεπτό shell που συνθέτει βήματα - ΚΑΜΙΑ επιχειρησιακή λογική εδώ
 * Architecture: Clean separation of concerns - ΟΧΙ inline CSS, ΟΧΙ state management
 */

import React, { useMemo } from 'react';
import { Modal } from '@layera/modals';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { Heading } from '@layera/typography';
import { LayeraProgressStepper } from '@layera/progress-stepper';
import { useModalContainer } from './hooks/useModalContainer';
import { SPACING_SCALE } from '@layera/constants';
import { useUnifiedPipeline } from './hooks/useUnifiedPipeline';
import { useLayeraTranslation } from '@layera/tolgee';
import { useMediaQuery } from './hooks/useMediaQuery';
import { createStepperConfig, getStepIndex, updateStepCompletion } from './utils/stepperConfig';
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
  const { t } = useLayeraTranslation();

  // SSR-safe container resolution
  const containerFn = useModalContainer({
    preferredId: 'layera-device-simulator-viewport',
    fallbackId: 'root'
  });

  // Enterprise state management - clean separation
  const { state, actions, can } = useUnifiedPipeline({ onSubmit, onClose });

  // Mobile detection for responsive design
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Stepper configuration based on current category
  const stepperSteps = useMemo(() => {
    const baseSteps = createStepperConfig(state.category, t);
    const completedSteps: string[] = [];

    // Determine completed steps based on current state
    if (state.category) completedSteps.push('category');
    if (state.intent) completedSteps.push('intent');
    if (state.transactionType || state.employmentType) {
      completedSteps.push(state.category === 'property' ? 'transactionType' : 'employmentType');
    }
    if (state.availability) completedSteps.push('availability');
    if (state.availabilityDetails) completedSteps.push('availabilityDetails');

    return updateStepCompletion(baseSteps, completedSteps as any);
  }, [state.category, state.intent, state.transactionType, state.employmentType, state.availability, state.availabilityDetails, t]);

  const currentStepIndex = getStepIndex(state.step, stepperSteps);

  // Use provided container or SSR-safe resolver
  const finalContainer = container !== undefined ? container : containerFn;

  return (
    <Modal
      open={isOpen}
      onClose={actions.reset}
      size="xs"
      variant="centered"
      closeOnOverlayClick={true}
      closeOnEscape={true}
      showCloseButton={true}
      overlayClassName="unified-pipeline-modal-overlay"
      className="unified-pipeline-modal"
      panelPadding={`${SPACING_SCALE.XS}px`}
      overlayPadding={`${SPACING_SCALE.XS}px`}
      container={finalContainer}
    >
      <Stack
        spacing="sm"
        style={{
          transform: 'scale(0.7)',
          transformOrigin: 'center',
        }}
      >
        <Flex justify="between" align="center">
          <Heading as="h2" size="xl" color="primary">
            {t('pipeline.newEntry.title')}
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

        {/* Enterprise Progress Stepper - Responsive & Compact with Horizontal Scroll */}
        {stepperSteps.length > 2 && (
          <div style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            width: '100%',
            paddingBottom: `${SPACING_SCALE.SM}px`,
            marginBottom: `${SPACING_SCALE.SM}px`
          }}>
            <LayeraProgressStepper
              steps={stepperSteps}
              activeStep={currentStepIndex}
              orientation="horizontal"
              alternativeLabel={false}
              sx={{
                minWidth: 'max-content',
                width: 'max-content',
                paddingX: `${SPACING_SCALE.SM}px`,
                '& .MuiStepLabel-label': {
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  lineHeight: '1.2',
                  whiteSpace: 'nowrap',
                },
                '& .MuiStepLabel-iconContainer': {
                  paddingRight: `${SPACING_SCALE.SM}px`,
                },
                '& .MuiStepConnector-root': {
                  top: '16px',
                },
                '& .MuiStep-root': {
                  paddingLeft: 0,
                  paddingRight: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
                  minWidth: '100px',
                },
                '& .MuiStepLabel-root': {
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                },
                '& .MuiStepLabel-labelContainer': {
                  textAlign: 'center',
                  maxWidth: '90px',
                }
              }}
            />
          </div>
        )}

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
              {t('pipelines.actions.cancel')}
            </Button>
          </FormActions>
        )}
      </Stack>
    </Modal>
  );
};