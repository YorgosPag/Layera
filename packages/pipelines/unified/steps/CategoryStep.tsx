import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { VillaIcon, BriefcaseIcon } from '@layera/icons';

export type Category = 'property' | 'job';

export interface CategoryStepProps {
  onNext: (category: Category) => void;
}

/**
 * CategoryStep - Enterprise LEGO Component
 * Purpose: Category selection (Property vs Job) - EXACT from original UnifiedPipeline.tsx
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const CategoryStep: React.FC<CategoryStepProps> = ({ onNext }) => {
  return (
    <Stack spacing="md">
      <Heading as="h3" size="lg" color="primary">
        Επιλογή Κατηγορίας
      </Heading>

      <Stack spacing="md">
        <BaseCard
          clickable
          onClick={() => onNext('property')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <VillaIcon size="xl" theme="primary" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">Ακίνητα</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                Καταχωρήστε ένα ακίνητο προς πώληση, ενοικίαση ή δημιουργήστε μια ειδοποίηση αναζήτησης.
              </Text>
            </Stack>
          </Flex>
        </BaseCard>

        <BaseCard
          clickable
          onClick={() => onNext('job')}
          variant="outlined"
          size="lg"
          padding="lg"
          hoverable
          className="layera-unified-card"
        >
          <Flex align="start" gap="lg">
            <BriefcaseIcon size="xl" theme="success" />
            <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text size="xl" weight="bold" className="card-title">Εργασία</Text>
              <Text
                size="base"
                color="secondary"
                className="card-text"
              >
                Προσφέρετε μια θέση εργασίας ή δηλώστε τη διαθεσιμότητά σας σε μια συγκεκριμένη περιοχή.
              </Text>
            </Stack>
          </Flex>
        </BaseCard>
      </Stack>
    </Stack>
  );
};