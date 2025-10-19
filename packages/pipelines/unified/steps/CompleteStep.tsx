import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { CheckIcon, AlertTriangleIcon } from '@layera/icons';

export interface CompleteStepProps {
  category: 'property' | 'job';
  intent: 'offer' | 'search';
  onComplete: () => void;
  onBack: () => void;
}

/**
 * CompleteStep - Enterprise LEGO Component
 * Purpose: Final confirmation and completion
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const CompleteStep: React.FC<CompleteStepProps> = ({
  category,
  intent,
  onComplete,
  onBack
}) => {
  const isProperty = category === 'property';
  const isOffer = intent === 'offer';

  const getSuccessMessage = () => {
    if (isProperty && isOffer) return 'Η προσφορά ακινήτου σας καταχωρήθηκε επιτυχώς!';
    if (isProperty && !isOffer) return 'Το Geo-Alert σας δημιουργήθηκε επιτυχώς!';
    if (!isProperty && isOffer) return 'Η αγγελία εργασίας σας καταχωρήθηκε επιτυχώς!';
    return 'Η αίτηση εργασίας σας καταχωρήθηκε επιτυχώς!';
  };

  const getNextSteps = () => {
    if (isProperty && !isOffer) {
      return [
        'Θα λαμβάνετε ειδοποιήσεις όταν βρεθούν νέα ακίνητα',
        'Μπορείτε να διαχειριστείτε τα alerts σας από το προφίλ',
        'Οι ειδοποιήσεις θα σταλούν στο email σας'
      ];
    }

    if (!isProperty && !isOffer) {
      return [
        'Οι εργοδότες θα μπορούν να δουν το προφίλ σας',
        'Θα λαμβάνετε ειδοποιήσεις για κατάλληλες θέσεις',
        'Μπορείτε να επεξεργαστείτε το προφίλ σας ανά πάσα στιγμή'
      ];
    }

    return [
      'Η καταχώρησή σας είναι πλέον ενεργή',
      'Οι ενδιαφερόμενοι θα μπορούν να σας επικοινωνήσουν',
      'Μπορείτε να διαχειριστείτε την καταχώρηση από το προφίλ σας'
    ];
  };

  return (
    <Stack spacing="lg">
      <BaseCard variant="outlined" size="lg" padding="lg" className="layera-unified-card">
        <Stack spacing="lg" style={{ textAlign: 'center' }}>
          <CheckIcon size="xl" theme="success" />

          <Heading as="h2" size="xl" color="success">
            Επιτυχής Ολοκλήρωση!
          </Heading>

          <Text size="lg" color="secondary">
            {getSuccessMessage()}
          </Text>
        </Stack>
      </BaseCard>

      <BaseCard variant="outlined" size="lg" padding="lg" className="layera-unified-card">
        <Stack spacing="md">
          <Flex align="center" gap="md">
            <AlertTriangleIcon size="lg" theme="primary" />
            <Heading as="h3" size="lg" color="primary">
              Επόμενα Βήματα
            </Heading>
          </Flex>

          <Stack spacing="sm">
            {getNextSteps().map((step, index) => (
              <Text key={index} size="base" color="secondary">
                • {step}
              </Text>
            ))}
          </Stack>
        </Stack>
      </BaseCard>

      <Stack spacing="md">
        <Button
          variant="primary"
          size="lg"
          onClick={onComplete}
          style={{ width: '100%' }}
        >
          Τέλος
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          style={{ width: '100%' }}
        >
          Πίσω για Αλλαγές
        </Button>
      </Stack>
    </Stack>
  );
};