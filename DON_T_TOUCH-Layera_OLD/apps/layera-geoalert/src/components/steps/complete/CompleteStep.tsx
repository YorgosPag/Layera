/**
 * CompleteStep.tsx - Enterprise Modular Complete Step
 *
 * Τελικό βήμα επιβεβαίωσης και ολοκλήρωσης με διαφορετικά μηνύματα ανάλογα με category/intent
 */

import React, { useCallback, useMemo } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Text } from '@layera/typography';
import { Stack, Flex, Box } from '@layera/layout';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { BaseCard } from '@layera/cards';
import { CheckIcon, AlertTriangleIcon, HomeIcon } from '@layera/icons';
import type { StepProps } from '../types';
import type { CompleteStepData, CompletionSummary } from './types';

export interface CompleteStepProps extends StepProps {
  /** Completion callback */
  onComplete?: () => void;
}

/**
 * Enterprise Complete Step - Καθαρό modular component για τελική επιβεβαίωση
 */
export const CompleteStep: React.FC<CompleteStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onComplete,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();

  const completionSummary: CompletionSummary = useMemo(() => {
    const isProperty = context?.selectedCategory === 'property';
    const isOffer = context?.selectedIntent === 'offer';

    let successMessage = 'Η καταχώρησή σας ολοκληρώθηκε επιτυχώς!';
    let nextSteps: string[] = [
      'Η καταχώρησή σας είναι πλέον ενεργή',
      'Μπορείτε να διαχειριστείτε την καταχώρηση από το προφίλ σας'
    ];

    if (isProperty && isOffer) {
      successMessage = 'Η προσφορά ακινήτου σας καταχωρήθηκε επιτυχώς!';
      nextSteps = [
        'Η προσφορά σας είναι πλέον ενεργή',
        'Οι ενδιαφερόμενοι θα μπορούν να σας επικοινωνήσουν',
        'Μπορείτε να διαχειριστείτε την προσφορά από το προφίλ σας'
      ];
    } else if (isProperty && !isOffer) {
      successMessage = 'Το Geo-Alert σας δημιουργήθηκε επιτυχώς!';
      nextSteps = [
        'Θα λαμβάνετε ειδοποιήσεις όταν βρεθούν νέα ακίνητα',
        'Μπορείτε να διαχειριστείτε τα alerts σας από το προφίλ',
        'Οι ειδοποιήσεις θα σταλούν στο email σας'
      ];
    } else if (!isProperty && isOffer) {
      successMessage = 'Η αγγελία εργασίας σας καταχωρήθηκε επιτυχώς!';
      nextSteps = [
        'Η αγγελία σας είναι πλέον ενεργή',
        'Οι υποψήφιοι θα μπορούν να δουν την αγγελία',
        'Μπορείτε να διαχειριστείτε την αγγελία από το προφίλ σας'
      ];
    } else if (!isProperty && !isOffer) {
      successMessage = 'Η αίτηση εργασίας σας καταχωρήθηκε επιτυχώς!';
      nextSteps = [
        'Οι εργοδότες θα μπορούν να δουν το προφίλ σας',
        'Θα λαμβάνετε ειδοποιήσεις για κατάλληλες θέσεις',
        'Μπορείτε να επεξεργαστείτε το προφίλ σας ανά πάσα στιγμή'
      ];
    }

    return {
      category: context?.selectedCategory || 'property',
      intent: context?.selectedIntent || 'offer',
      successMessage,
      nextSteps
    };
  }, [context?.selectedCategory, context?.selectedIntent]);

  const handleComplete = useCallback(async () => {
    console.log('🎯 COMPLETE UI: Completing process');

    try {
      // Ενημερώνουμε το StepOrchestrator
      if (onStepComplete) {
        const stepData: CompleteStepData = {
          isComplete: true,
          completedAt: new Date(),
          category: completionSummary.category,
          intent: completionSummary.intent
        };
        onStepComplete('complete', stepData);
      }

      // Complete callback
      onComplete?.();

      // Final completion
      setTimeout(() => {

        // Reset ή navigate away
      }, 500);

    } catch (error) {
      console.error('Completion failed:', error);
    }
  }, [onStepComplete, onComplete, completionSummary]);

  const handleGoBack = useCallback(() => {
    console.log('🎯 COMPLETE UI: Going back for changes');
    // Go back logic - μπορεί να χρησιμοποιήσει navigation service
  }, []);

  if (!isVisible) {
    return null;
  }

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 'var(--la-cards-top)',
    left: 'var(--la-side-margins)',
    right: 'var(--la-side-margins)',
    zIndex: 10002,
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING_SCALE.SM}px`,
    padding: '0'
  };

  return (
    <Box style={containerStyles}>
      {/* Success Card */}
      <BaseCard
        variant="job"
        title={t('complete.success.title', 'Επιτυχής Ολοκλήρωση!')}
        description={completionSummary.successMessage}
        icon={<CheckIcon size="sm" theme="neutral" />}
        data-testid="complete-success-card"
      />

      {/* Next Steps Card */}
      <Box
        padding="md"
        background="var(--color-semantic-info-bg)"
        borderRadius="card"
        border="1px solid var(--color-semantic-info-border)"
      >
        <Flex
          align="center"
          gap="var(--la-cards-gap)"
          marginBottom="md"
        >
          <AlertTriangleIcon size="sm" theme="primary" />
          <Text size="md" weight="bold" color="primary">
            {t('complete.nextSteps.title', 'Επόμενα Βήματα')}
          </Text>
        </Flex>
        <Stack spacing="xs">
          {completionSummary.nextSteps.map((step, index) => (
            <Text key={index} size="sm" color="secondary">
              • {step}
            </Text>
          ))}
        </Stack>
      </Box>

      {/* Complete Button */}
      <BaseCard
        variant="job"
        title={t('complete.finish.title', 'Τέλος')}
        description={t('complete.finish.description', 'Ολοκλήρωση διαδικασίας')}
        icon={<HomeIcon size="sm" theme="neutral" />}
        onClick={handleComplete}
        data-testid="complete-finish-card"
      />

      {/* Back Button */}
      <BaseCard
        variant="job"
        title={t('complete.back.title', 'Πίσω για Αλλαγές')}
        description={t('complete.back.description', 'Επιστροφή για τροποποιήσεις')}
        onClick={handleGoBack}
        data-testid="complete-back-card"
      />
    </Box>
  );
};