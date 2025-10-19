import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { IndustrialIcon, RestaurantIcon } from '@layera/icons';

export type Intent = 'offer' | 'search';

export interface IntentStepProps {
  category: 'property' | 'job';
  onNext: (intent: Intent) => void;
  onBack: () => void;
}

/**
 * IntentStep - Enterprise LEGO Component
 * Purpose: Intent selection (Offer vs Search) - EXACT from original UnifiedPipeline.tsx
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const IntentStep: React.FC<IntentStepProps> = ({ category, onNext, onBack }) => {
  return (
    <Stack spacing="md">
      <Heading as="h3" size="lg" color="primary">
        {category === 'property' ? 'Ακίνητα' : 'Εργασία'} - Τύπος Καταχώρησης
      </Heading>

      <Stack spacing="md">
        <BaseCard
          clickable
          onClick={() => onNext('offer')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <IndustrialIcon size="xl" theme="info" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">
                {category === 'property' ? 'Θέλω να Προσφέρω' : 'Θέλω να Προσφέρω Θέση'}
              </Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {category === 'property'
                  ? 'Καταχωρήστε ένα ακίνητο προς πώληση ή ενοικίαση.'
                  : 'Δημοσιεύστε μια αγγελία για μια διαθέσιμη θέση εργασίας.'
                }
              </Text>
            </Stack>
          </Flex>
        </BaseCard>

        <BaseCard
          clickable
          onClick={() => onNext('search')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <RestaurantIcon size="xl" theme="warning" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">
                {category === 'property' ? 'Θέλω να Αναζητήσω (Geo-Alert)' : 'Αναζητώ Εργασία'}
              </Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                {category === 'property'
                  ? 'Δημιουργήστε μια ειδοποίηση για μελλοντικά ακίνητα σε μια περιοχή.'
                  : 'Δηλώστε τη διαθεσιμότητά σας και τις δεξιότητές σας σε μια περιοχή.'
                }
              </Text>
            </Stack>
          </Flex>
        </BaseCard>
      </Stack>

      <FormActions>
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="layera-pipeline-button-secondary"
        >
          Πίσω
        </Button>
      </FormActions>
    </Stack>
  );
};